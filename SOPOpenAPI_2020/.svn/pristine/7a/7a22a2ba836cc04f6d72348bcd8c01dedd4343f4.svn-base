package kostat.sop.OpenAPI3.search.indexing;

import java.util.Map;

import kostat.sop.OpenAPI3.search.index.IndexFieldDefineEnum;
import kostat.sop.OpenAPI3.search.index.AbsEnumBaseIndexHandler;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.lucene.index.IndexWriter;

import com.neighborsystem.lucene.index.handler.IIndexFieldDefine;

public class GeocodeIndexingFromDBHandler extends AbsEnumBaseIndexHandler< Map<String, Object> > 
{
	private final Log logger = LogFactory.getLog( GeocodeIndexingFromDBHandler.class );

	@Override
	protected IIndexFieldDefine [] getIndexFieldDefine()
	{
		return IndexFieldDefineEnum.values();
	}

	@Override
	protected Object getFieldContents( Map< String, Object > obj, String fieldName, int index )
	{
		return obj.get( fieldName );
	}
}
