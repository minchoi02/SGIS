package kostat.sop.OpenAPI3.search.query;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TermQuery;

import kostat.sop.OpenAPI3.search.index.GeocodeIndexFieldDefineEnum;
/**
 * 리펙토리 GeocodeQueryInfo.java
 * 
 * @author htkim
 *
 */
public class JibunQueryInfo extends AddrQueryInfo
{

	private static final Log logger = LogFactory.getLog(JibunQueryInfo.class);
	
	public JibunQueryInfo( Map< String, String > qMap )
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
			addRi( qMap, booQuery );
			addPcl( qMap, booQuery );
			
			// 해당되는 쿼리를 로그로 남긴다.
			//logger.info("JibunQuery=["+booQuery.toString()+"]");
			
		} catch( ParseException e ) {
			logger.error(e.getMessage());
		}
		return booQuery;
	}
	
	/*
	 * 법정동 지번 본번, 부번 추가
	 */
	public void addPcl( Map<String, String> qMap, BooleanQuery booQuery ) throws ParseException {
		String pcl = qMap.get( GeocodeIndexFieldDefineEnum.pcl.name() );
		
		// 지번의 경우 지번포인트 테이블을 이용하여 조회하기 때문에 조건 검색에서 제외한다.
		// 제외 할 경우 주소정제 테이블에서 지번이 없는 동일한 동에 대한 데이터가 다수 존재할 경우는 여러개의 결과값이
		// 리턴되기 때문에 주의 할 것.
		if(checkAddr(pcl)) {
			pcl= pcl.replaceAll("호", "");
			pcl= pcl.replaceAll("번지", "");
			pcl = pcl.replaceAll( "산\\s*", "산 " );
			// pcl = "\"" + pcl + "\"";

			TermQuery termquery = new TermQuery(
					new Term(GeocodeIndexFieldDefineEnum.pcl.name(), pcl.equals( "" ) ? "null" : pcl));
			booQuery.add(termquery, BooleanClause.Occur.MUST);
		}
	}
	
	/*
	 * 법정동 리명 추가
	 */
	public void addRi( Map<String, String> qMap, BooleanQuery booQuery ) throws ParseException {
		String ri = qMap.get( GeocodeIndexFieldDefineEnum.ri_syn.name() );
		// 리 검색
		// 리만 빠지고 올 수 있음
		if( checkAddr(ri) ) {
			addQeury( booQuery
					, GeocodeIndexFieldDefineEnum.ri_syn.name()
					, ri
					, BooleanClause.Occur.MUST
					, false
					, QueryParser.AND_OPERATOR, "^2.0");
		}
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
}
