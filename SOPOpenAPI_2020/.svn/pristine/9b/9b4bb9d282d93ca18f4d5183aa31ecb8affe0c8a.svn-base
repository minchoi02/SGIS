package kostat.sop.OpenAPI3.search.indexing;

import com.neighborsystem.lucene.index.handler.IIndexFieldDefine;

import kostat.sop.OpenAPI3.search.index.AbsEnumBaseIndexHandler;
import kostat.sop.OpenAPI3.search.index.IndexFieldDefineEnum;

public class TEXTFileHandler extends AbsEnumBaseIndexHandler<String>
{                             
	@Override
	protected IIndexFieldDefine [] getIndexFieldDefine()
	{
		return IndexFieldDefineEnum.values();
	}

	@Override
	protected Object getFieldContents( String obj, String fieldName, int index )
	{
		// test
		//String strRtn[] =obj.split( "|" ))[index];
		String strRtn[] =obj.split( "\\|" );
		return strRtn[index];
	}
}
