package kostat.sop.OpenAPI3.search.query;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;

import kostat.sop.OpenAPI3.search.index.GeocodeIndexFieldDefineEnum;

/**
 * 리펙토리 GeocodeQueryInfo.java
 * 
 * @author htkim
 *
 */
public class RoadQueryInfo extends AddrQueryInfo
{

	private static final Log logger = LogFactory.getLog(RoadQueryInfo.class);
	
	public RoadQueryInfo( Map< String, String > qMap )
	{
		super( qMap );
	}

	@Override
	public Query createQuery()
	{
		Map<String, String> qMap = getQueryMap();
		BooleanQuery booQuery = new BooleanQuery();
		
		try {
			addSidoSggEmdong( qMap, booQuery );
			addBuldMainName( qMap, booQuery );
			addBuildingMainNumber( qMap, booQuery );
			addBuildingSubNumber( qMap, booQuery );
			
			// 해당되는 쿼리를 로그로 남긴다.
			//logger.info("RoadQuery=["+booQuery.toString()+"]");
			
		}catch( ParseException e ) {
			logger.error( e );
		}
		
		return booQuery;
	}
	
	public void addBuldMainName( Map<String, String> qMap, BooleanQuery booQuery ) throws ParseException {
		
		// 건물명검색을 위한 조건 
		// 영문뒤에 한글이 바로오게 되면 정상적인 파싱이 이루어지지 않는다. 
		// 검색을 위하여 [영문][한글] 조합을 [영문]_[한글]로 변경
		String bdMainNm = qMap.get( GeocodeIndexFieldDefineEnum.bd_main_nm_syn.name() );
		bdMainNm = bdMainNm.trim();
		bdMainNm = bdMainNm.replaceAll( "[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]", " ");
		bdMainNm = bdMainNm.toLowerCase();
		
		if( checkAddr( bdMainNm )) {
			String[] arrBdMainNm = bdMainNm.split(" ");
			int len = arrBdMainNm.length;
			String pcl = qMap.get( GeocodeIndexFieldDefineEnum.pcl.name() );
			String rMainNo = qMap.get( GeocodeIndexFieldDefineEnum.road_nm_main_no.name() );
			
			for( int ix = 0; ix < len; ix++ )
			{
				if(!arrBdMainNm[ix].equals("0")) {
					if( !checkAddr( pcl ) && !checkAddr(rMainNo) ) {
						
						addQeury( booQuery
								, GeocodeIndexFieldDefineEnum.bd_main_nm_syn.name()
								, arrBdMainNm[ix]
								, ( ix==0 ) ? BooleanClause.Occur.MUST:BooleanClause.Occur.SHOULD
								, true
								, QueryParser.OR_OPERATOR);
					} else {
						addQeury( booQuery
								, GeocodeIndexFieldDefineEnum.bd_main_nm_syn.name()
								, arrBdMainNm[ix]
								, BooleanClause.Occur.SHOULD
								, true
								, QueryParser.OR_OPERATOR);
					}
						
					if( arrBdMainNm[ix].contains( "동" ) ) {
						addQeury( booQuery
								, GeocodeIndexFieldDefineEnum.bd_main_nm_syn.name()
								, arrBdMainNm[ix].replaceAll( "동", "" )
								, BooleanClause.Occur.SHOULD
								, true
								, QueryParser.OR_OPERATOR);
					} else if( arrBdMainNm[ix].matches( "\\d+" ) ) {
						addQeury( booQuery
								, GeocodeIndexFieldDefineEnum.bd_main_nm_syn.name()
								, arrBdMainNm[ix] + "동"
								, BooleanClause.Occur.SHOULD
								, true
								, QueryParser.OR_OPERATOR);
					}
				}
			}
		} else {
			
		}
	}
		
	/**
	 * 도로명 주소 메인 번호 추가
	 * @param qMap
	 * @param booQuery
	 * @throws ParseException
	 */
	public void addBuildingMainNumber( Map<String, String> qMap, BooleanQuery booQuery ) throws ParseException {
		String rMainNo = qMap.get( GeocodeIndexFieldDefineEnum.road_nm_main_no.name() );
		
		if( checkAddr( rMainNo ) ) {
			addQeury( booQuery
					, GeocodeIndexFieldDefineEnum.road_nm_main_no.name()
					, rMainNo
					, BooleanClause.Occur.MUST
					, true
					, QueryParser.AND_OPERATOR);
		}
	}
	
	/**
	 * 도로명 주소 부번 추가
	 * @param qMap
	 * @param booQuery
	 * @throws ParseException
	 */
	public void addBuildingSubNumber( Map<String, String> qMap, BooleanQuery booQuery ) throws ParseException {
		String rMainNo = qMap.get( GeocodeIndexFieldDefineEnum.road_nm_main_no.name() );
		String rSubNo = qMap.get( GeocodeIndexFieldDefineEnum.road_nm_sub_no.name() );
		
		// 도로명 메인번호가 있는데 부번호가 없을 경우 0 으로 추가.
		if( checkAddr(rMainNo) && !checkAddr(rSubNo) ) {
			rSubNo = "0";
		}
		
		// 도로명 부번호가 있으면 추가.
		if( checkAddr(rSubNo) ) {
			addQeury(booQuery
					, GeocodeIndexFieldDefineEnum.road_nm_sub_no.name()
					, rSubNo
					, BooleanClause.Occur.SHOULD
					, false
					, QueryParser.AND_OPERATOR
					, "^5.0");
		}
	}
}
