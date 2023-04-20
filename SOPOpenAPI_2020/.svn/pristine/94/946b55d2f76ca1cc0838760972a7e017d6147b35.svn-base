package kostat.sop.OpenAPI3.search.handler;



import java.io.IOException;
import java.util.Map;

import kostat.sop.OpenAPI3.search.address.AddressDivision;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.queryparser.classic.QueryParser;

import com.neighborsystem.lucene.index.IIndexingHandler;

/**
 * 
 * @author neighbor21
 *
 */
public class POIResultHandler extends AbsResultHandler{
	private static final Log logger = LogFactory.getLog(POIResultHandler.class);

	
	@Override
	public void handleResult(ResultContext context) {
		Map<String, Object> mapTmp = (Map<String, Object>) context.getResultObject();


		logger.debug(mapTmp);
		try {
			handler.handleIndexing(writer, mapTmp);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			logger.error(e);
		}
	}

}
