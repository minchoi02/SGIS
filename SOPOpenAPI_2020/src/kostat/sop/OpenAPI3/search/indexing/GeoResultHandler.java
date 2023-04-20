package kostat.sop.OpenAPI3.search.indexing;



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


public class GeoResultHandler extends AbsResultHandler{
	private static final Log logger = LogFactory.getLog(GeoResultHandler.class);

	
	@Override
	public void handleResult(ResultContext context) {
		Map<String, Object> mapTmp = (Map<String, Object>) context.getResultObject();

		//System.out.println(mapTmp.get("sido_nm"));
		//mapTmp.put("sido_syn", (""+mapTmp.get("sido_syn")).replace(" ", ""));
		//mapTmp.put("sgg_syn", (""+mapTmp.get("sgg_syn")).replace(" ", ""));
		//mapTmp.put("emdong_syn", (""+mapTmp.get("emdong_syn")).replace(" ", ""));
		//mapTmp.put("ri_syn", (""+mapTmp.get("ri_syn")).replace(" ", ""));

		if(mapTmp.get("emdong_syn") != null){
//			String strEmdong = ((String)mapTmp.get("emdong_syn")).replace(" ", "");
			String strEmdong = ((String)mapTmp.get("emdong_syn"));
			mapTmp.remove("emdong_syn");
			mapTmp.put("emdong_syn", strEmdong);
		}

		if(mapTmp.get("bd_main_nm_syn") != null){
			String strtemp = (String) mapTmp.get("bd_main_nm_syn");
//			strtemp = strtemp.replace(" ", "");
			//strtemp = strtemp.replaceAll("[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]", "\\\\$0");
			//strtemp = QueryParser.escape(strtemp);
			
			//strtemp = "\""+strtemp+"\"";
			//strtemp = "\"BIZ\\-WELL종로오피스텔\"";
			mapTmp.remove("bd_main_nm_syn");
			mapTmp.put("bd_main_nm_syn", strtemp );
		}

			
		
		//mapTmp.put("pcl", ("\""+mapTmp.get("pcl")+"\""));
		//mapTmp.put("pcl", (""+mapTmp.get("pcl")).replace(" ", ""));
		
		logger.debug(mapTmp);
		try {
			handler.handleIndexing(writer, mapTmp);
		} catch (IOException e) {
//			e.printStackTrace();
			logger.error( e );
			throw new RuntimeException("IOException");
		}
	}

}
