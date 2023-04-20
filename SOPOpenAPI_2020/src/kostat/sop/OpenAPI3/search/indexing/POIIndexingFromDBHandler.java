package kostat.sop.OpenAPI3.search.indexing;

import java.util.Map;

import kostat.sop.OpenAPI3.search.index.POIIndexFieldDefineEnum;
import kostat.sop.OpenAPI3.search.index.AbsEnumBaseIndexHandler;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.lucene.index.IndexWriter;

import com.neighborsystem.lucene.index.handler.IIndexFieldDefine;

public class POIIndexingFromDBHandler extends AbsEnumBaseIndexHandler< Map<String, Object> > 
{
	private final Log logger = LogFactory.getLog( POIIndexingFromDBHandler.class );

	@Override
	protected IIndexFieldDefine [] getIndexFieldDefine()
	{
		//return IndexFieldDefineEnum.values();
		return POIIndexFieldDefineEnum.values();
	}

	@Override
	protected Object getFieldContents( Map< String, Object > obj, String fieldName, int index )
	{
		return obj.get( fieldName );
	}
}
