package kostat.sop.OpenAPI3.search.query;

import java.util.Map;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.queryparser.classic.QueryParser.Operator;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.util.Version;

import com.neighborsystem.lucene.searcher.AbsQueryInfo;

import kostat.sop.OpenAPI3.search.GeocodeSearching;
import kostat.sop.OpenAPI3.search.index.GeocodeIndexFieldDefineEnum;

public abstract class AddrQueryInfo extends AbsQueryInfo
{
	private  Version version = Version.LUCENE_44;

	public AddrQueryInfo(Map<String, String> qMap)
	{
		super(GeocodeSearching.KEY.KOREA.name());
		super.setQueryMap( qMap );
	}

	/*
	 * 시도, 시군구, 읍면동 쿼리 추가
	 * 법정동일 경우는 시도, 시군구, 읍면동
	 * 도로명일 경우는 시도, 시군구, 도로명
	 * 이 value 값에 들어 있음.
	 * 
	 * 파싱과정은 AddressDivision 생성자에서 처리 됨.
	 */
	public void addSidoSggEmdong( Map<String, String> qMap, BooleanQuery booQuery ) throws ParseException {
		String sido = qMap.get( GeocodeIndexFieldDefineEnum.sido_syn.name() );
		String sgg = qMap.get( GeocodeIndexFieldDefineEnum.sgg_syn.name() );
		String emdong = qMap.get( GeocodeIndexFieldDefineEnum.emdong_syn.name() );
		String bdMainNm = qMap.get(  GeocodeIndexFieldDefineEnum.bd_main_nm_syn.name() );
		
		// 시도 검색
		if(checkAddr(sido)) {
			addQeury( booQuery
					, GeocodeIndexFieldDefineEnum.sido_syn.name()
					, sido
					, BooleanClause.Occur.MUST
					, true
					, QueryParser.OR_OPERATOR);//.AND_OPERATOR);
		}
		// 시군구 검색
		if(checkAddr(sgg)){
			addQeury( booQuery
					, GeocodeIndexFieldDefineEnum.sgg_syn.name()
					, sgg
					, BooleanClause.Occur.MUST
					, true
					, QueryParser.OR_OPERATOR);
		}
		else if( !checkAddr(emdong) && !checkAddr(bdMainNm) )
		{
			TermQuery termquery = new TermQuery(
					new Term( GeocodeIndexFieldDefineEnum.sgg_syn.name(), "null"));
			booQuery.add(termquery, BooleanClause.Occur.MUST);
		}
		
		// 읍면동 검색
		if( checkAddr(emdong) ){
			addQeury( booQuery
					, GeocodeIndexFieldDefineEnum.emdong_syn.name()
					, emdong
					, BooleanClause.Occur.MUST
					, true
					, QueryParser.OR_OPERATOR);
			
		}
		else if(!checkAddr(bdMainNm)){
			TermQuery termquery = new TermQuery(
					new Term(GeocodeIndexFieldDefineEnum.emdong_syn.name() , "null"));
			booQuery.add(termquery, BooleanClause.Occur.MUST);
		}
	}
	
	protected boolean checkAddr(String addr) {
		if( addr == null ) {
			return false;
		} else {
			return (addr.length() > 0) ? true : false; 
		}
	}
	/**
	 * 
	 * @param booQuery
	 * @param strFiled
	 * @param query
	 * @param occ
	 * @param blAbsMatch
	 * @param operator
	 * @throws ParseException
	 */
	protected void addQeury(BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator) throws ParseException{

		String strPoint = "";	// 초기값 설정
		addQeury(booQuery, strFiled, query, occ, blAbsMatch, operator, strPoint);

	}
	
	/**
	 * 
	 * @param booQuery
	 * @param strFiled
	 * @param query
	 * @param occ
	 * @param blAbsMatch
	 * @param operator
	 * @param strPoint
	 * @throws ParseException
	 */
	protected void addQeury(BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator, String strPoint) throws ParseException{

		if(query == null || query.equals("")){
			if(blAbsMatch == true)	query= "\"null\"";
			else query= "NOT \"null\"";
		}
//		logger.debug("query : "+query);
		booQuery.add( getQueryParser(strFiled, query, operator, strPoint), occ );
		
	}
	
	/**
	 * 
	 * @param indexField
	 * @param query
	 * @param operator
	 * @return
	 * @throws ParseException
	 */
	protected Query getQueryParser(String indexField, String query, Operator operator, String strPoint) throws ParseException {

//		KoreanAnalyzer ka = new KoreanAnalyzer();		
		Analyzer st = new StandardAnalyzer(version);
//		QueryParser parser = new QueryParser(version, indexField, ka);
		QueryParser parser = new QueryParser(version, indexField, st);
		
		parser.setDefaultOperator(operator);
		query = QueryParser.escape(query);
//		logger.debug(indexField+"="+query);
//		logger.debug("strPoint"+"="+strPoint);
		
		if(!strPoint.equals("")) query = query+strPoint;

		return parser.parse(query);
	}
}
