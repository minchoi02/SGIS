package kostat.sop.OpenAPI3.search;

import java.util.Map;
import java.util.logging.Logger;

import kostat.sop.OpenAPI3.search.common.QueryUtil;
import kostat.sop.OpenAPI3.search.index.IndexFieldDefineEnum;
import kostat.sop.OpenAPI3.search.index.POIIndexFieldDefineEnum;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.lucene.analysis.kr.KoreanAnalyzer;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.queryparser.classic.QueryParser.Operator;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.WildcardQuery;
import org.apache.lucene.util.Version;

import com.neighborsystem.lucene.searcher.AbsQueryInfo;

public class POISearchQueryInfo extends AbsQueryInfo
{
	private static final Log logger = LogFactory.getLog(POISearchQueryInfo.class);
	private static Version version = Version.LUCENE_44;
	
	public POISearchQueryInfo(Map<String, String> qMap)
	{
		super(POISearching.KEY.KOREA.name());
		super.setQueryMap( qMap );
	}
	
	@Override
	public Query createQuery()
	{
		Query query = null;
		BooleanQuery booQuery = new BooleanQuery();
		
		try
		{
			POIIndexFieldDefineEnum enSearchIndex = null;

			// 유의어 검색
			if(!getQueryMap().get(enSearchIndex.syn.name()).equals("")) {
/*
				addQeury( booQuery
						, enSearchIndex.syn.name()
						, getQueryMap().get(enSearchIndex.syn.name())
						, BooleanClause.Occur.MUST
						, true
						, QueryParser.AND_OPERATOR);//.AND_OPERATOR);
*/				

				BooleanQuery tmpBbooQuery = new BooleanQuery();
				
				/*
				addQeury( tmpBbooQuery
						, enSearchIndex.syn.name()
						, getQueryMap().get(enSearchIndex.syn.name())
						//, BooleanClause.Occur.MUST
						, BooleanClause.Occur.SHOULD
						, true
						, QueryParser.AND_OPERATOR);//.AND_OPERATOR);
				*/

				WildcardQuery wildQuery1 = new WildcardQuery( new Term(enSearchIndex.syn.name()
														   , "*"+getQueryMap().get(enSearchIndex.syn.name())+"*"));
				tmpBbooQuery.add(wildQuery1, BooleanClause.Occur.SHOULD);

				/*
				addQeury( tmpBbooQuery
						, enSearchIndex.nm.name()
						, getQueryMap().get(enSearchIndex.syn.name())
						, BooleanClause.Occur.SHOULD
						, true
						, QueryParser.AND_OPERATOR
						, "^5");//.AND_OPERATOR);
				*/
				// 업체명을 검색해서 가산점을 부여한다.
				WildcardQuery wildQuery2 = new WildcardQuery( new Term(enSearchIndex.nm.name()
														   , "*"+getQueryMap().get(enSearchIndex.syn.name())+"*"));
				// 가산점 부여
				wildQuery2.setBoost(5);
				tmpBbooQuery.add(wildQuery2, BooleanClause.Occur.SHOULD);

				
				booQuery.add(tmpBbooQuery, BooleanClause.Occur.MUST);

				/*
				WildcardQuery wildQuery = new WildcardQuery( new Term(enSearchIndex.syn.name()
														   , "*"+getQueryMap().get(enSearchIndex.syn.name())+"*"));
				booQuery.add(wildQuery, BooleanClause.Occur.MUST);
				*/
			}

			// 주소 검색
			//if(!getQueryMap().get(enSearchIndex.addr_syn.name()).equals("")) {
			if(getQueryMap().get(enSearchIndex.addr_syn.name()) != null) {

				BooleanQuery tmpBbooQuery2 = new BooleanQuery();
				String strAddrSyn = ""+getQueryMap().get(enSearchIndex.addr_syn.name());
				
				String[] arrAddrSyn = strAddrSyn.replaceAll("([0-9]*)([가-힣]+)", "$1 $2").replaceAll("([가-힣]+)([0-9]*)", "$1 $2")
												.trim()
												.replaceAll("[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]", " ").toLowerCase()
												.split(" ");

				for(int ix=0; ix < arrAddrSyn.length;ix++){

					WildcardQuery wildQuery = new WildcardQuery(new Term( enSearchIndex.addr_syn.name(), "*"+arrAddrSyn[ix]+"*"));

					tmpBbooQuery2.add(wildQuery, BooleanClause.Occur.MUST);
				}
				booQuery.add(tmpBbooQuery2, BooleanClause.Occur.MUST);
				
				/*
				WildcardQuery wildQuery = new WildcardQuery( new Term(enSearchIndex.addr_syn.name()
														   , "*"+getQueryMap().get(enSearchIndex.addr_syn.name())+"*"));
				booQuery.add(wildQuery, BooleanClause.Occur.MUST);
				*/
			}
			
			// 행정동코드 검색
			if(!getQueryMap().get(enSearchIndex.adm_cd.name()).equals("")) {
				addQeury( booQuery
						, enSearchIndex.adm_cd.name()
						, getQueryMap().get(enSearchIndex.adm_cd.name())
						, BooleanClause.Occur.MUST
						, true
						, QueryParser.AND_OPERATOR);//.AND_OPERATOR);
			}

			// 도로명코드 검색
			if(!getQueryMap().get(enSearchIndex.road_cd.name()).equals("")){
				
				addQeury( booQuery
						, enSearchIndex.road_cd.name()
						, getQueryMap().get(enSearchIndex.road_cd.name())
						, BooleanClause.Occur.MUST
						, true
						, QueryParser.AND_OPERATOR);//.AND_OPERATOR);
			}
			
			// 테마코드 검색
			if(!getQueryMap().get(enSearchIndex.theme_cd.name()).equals("")) {
				
				QueryUtil.addQeury( version
								  , booQuery
								  , enSearchIndex.theme_cd.name()
								  , getQueryMap().get(enSearchIndex.theme_cd.name())
								  , BooleanClause.Occur.MUST
								  , true
								  , QueryParser.AND_OPERATOR);//.AND_OPERATOR);

			}
			
		}
		catch( ParseException e )
		{
			logger.error(e.getMessage());
			
		}
		System.out.println("booQuery="+booQuery.toString());
		
		return booQuery;
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
	public static void addQeury(BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator) throws ParseException{

		String strPoint = "";	// 초기값 설정
		//if(query != null) addQeury(booQuery, strFiled, query, occ, blAbsMatch, operator, strPoint);
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
	public static void addQeury(BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator, String strPoint) throws ParseException{

		if(query == null || query.equals("")){
			if(blAbsMatch == true)	query= "\"null\"";
			else query= "NOT \"null\"";
		}//else if(blAbsMatch == true)
			//query ="\""+query+"\"";
		
		 
		//booQuery.add( getQueryParser(strFiled, query, operator, blAbsMatch), occ );
		booQuery.add( getQueryParser(strFiled, query, operator, strPoint), occ );
		
		// 가중치를 부여한다.
		//if(!strPoint.equals("")) booQuery.setBoost(Float.parseFloat(strPoint)); 
	}
	
	/**
	 * 
	 * @param indexField
	 * @param query
	 * @param operator
	 * @return
	 * @throws ParseException
	 */
	private static Query getQueryParser(String indexField, String query, Operator operator, String strPoint) throws ParseException {

		KoreanAnalyzer ka = new KoreanAnalyzer();
		//ka.setOriginCNoun(true);
//		ka.setBigrammable(true);
//		ka.setExactMatch(true);
		
		QueryParser parser = new QueryParser(version, indexField, ka);
		// BooleanClause.Occur.MUST
		//parser
		parser.setDefaultOperator(operator);
		//System.out.println("query1="+query);
		
		query = QueryParser.escape(query);
		System.out.println(indexField+"="+query);
		//parser.Clause(indexField);
		if(!strPoint.equals("")) query = query+strPoint;
		//parser.parse(query).;
		return parser.parse(query);
		//return parser.parse("emdong_syn:종로3길");
	}
	
	private boolean SearchIgnore(){
		return true;
	}
}
