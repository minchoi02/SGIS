package kostat.sop.OpenAPI3.search.index;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Iterator;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.el.parser.Token;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.analysis.tokenattributes.OffsetAttribute;
import org.apache.lucene.analysis.tokenattributes.TypeAttribute;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.util.Attribute;

import com.neighborsystem.lucene.index.IIndexingHandler;
import com.neighborsystem.lucene.index.handler.IIndexFieldDefine;

public abstract class AbsEnumBaseIndexHandler<T> implements IIndexingHandler< T >
{
	protected Log logger = LogFactory.getLog( getClass() );
	
	
	@Override
	public void handleIndexing( IndexWriter writer, T obj ) throws IOException
	{
		if( logger.isDebugEnabled() )
		{
			logger.debug( getClass() + " handleIndexing." );
			logger.debug( "------- IndexWriter : " + writer );
			logger.debug( "------- readLine : " + obj );
		}
		
		Document doc = makeEnumBaseDocument( obj );
		
		if( doc != null )
		{
			writer.addDocument( doc );			
			/*
			//TokenStream ts = writer.getAnalyzer().tokenStream("syn", "장인구두");
			TokenStream ts = writer.getAnalyzer().tokenStream("syn", "맥도날드");
			OffsetAttribute offsetAttribute = ts.addAttribute(OffsetAttribute.class);
			CharTermAttribute charTermAttribute = ts.addAttribute(CharTermAttribute.class);

			ts.reset();
			while (ts.incrementToken()) {
			    int startOffset = offsetAttribute.startOffset();
			    int endOffset = offsetAttribute.endOffset();
			    String term = charTermAttribute.toString();
			    System.out.println("term="+term);
			}
			*/
		}
	}

	protected Document makeEnumBaseDocument(T obj)
	{
		Document doc = new Document();
		IIndexFieldDefine [] defined =  getIndexFieldDefine();
		Constructor<? extends Field> constructor;
		String name;
		Store store;
		int index;
		Class< ? extends Field > clz;
		Class [] clzArg = { String.class, null, Field.Store.class };
		Field field = null;
		Class fieldValueType;
		Object fieldContents;
		for( IIndexFieldDefine i : defined )
		{
			name = i.fieldName();
			store = i.fieldStore();
			index = i.columIndex();
			clz = i.fieldClass();
			fieldValueType = i.fieldValueType();
			fieldContents = getFieldContents( obj, name, index );
			clzArg[1] = fieldValueType;
			try
			{
				constructor = clz.getConstructor( clzArg );
				fieldContents = convertType(fieldContents, fieldValueType);
				field = constructor.newInstance( name, fieldContents, store );
			}
			catch( NoSuchMethodException | SecurityException 
					| InstantiationException | IllegalAccessException 
					| IllegalArgumentException | InvocationTargetException e )
			{
				e.printStackTrace();
				logger.error( "------- Reflection fail." );
				doc = null;
				break;
			}
			doc.add( field );
		}
		return doc;
	}

	private Object convertType(Object obj, Class fieldValueType )
	{
		if( obj == null )
		{
			//return "";
			return "null";
		}
		String objType = obj.getClass().getName();
		String defineType = fieldValueType.getName();
		
		if( objType.equals( defineType ) )
			return obj;
		else
		{
			if( defineType.equals( "java.lang.String" ) )
			{
				return String.valueOf( obj );
			}
//			else if( defineType.equals( "java.lang.Integer" ))
//			{
//				Integer.valueOf( obj );
//			}
		}
		return null;
	}
	
	protected abstract IIndexFieldDefine [] getIndexFieldDefine();
	protected abstract Object getFieldContents( T obj, String fieldName, int index );
}
