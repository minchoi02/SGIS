package kostat.sop.OpenAPI3.search.query;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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

public class GeocodeQueryInfo extends AbsQueryInfo
{
	private static final Log logger = LogFactory.getLog(GeocodeQueryInfo.class);
	private  Version version = Version.LUCENE_44;
	
	public GeocodeQueryInfo(Map<String, String> qMap)
	{
		super(GeocodeSearching.KEY.KOREA.name());
		super.setQueryMap( qMap );
	}
	
	@Override
	public Query createQuery()
	{
		Query query = null;
		BooleanQuery booQuery = new BooleanQuery();
		
		try
		{
			GeocodeIndexFieldDefineEnum enSearchIndex = null;

			// 시도 검색
			if(!getQueryMap().get(enSearchIndex.sido_syn.name()).equals("")) {
				addQeury( booQuery
						, enSearchIndex.sido_syn.name()
						, getQueryMap().get(enSearchIndex.sido_syn.name())
						, BooleanClause.Occur.MUST
						, true
						, QueryParser.OR_OPERATOR);//.AND_OPERATOR);
			
//			WildcardQuery wildQuery = new WildcardQuery(new Term( enSearchIndex.sido_syn.name(), "*"+getQueryMap().get(enSearchIndex.sido_syn.name())+"*"));
//			TermQuery termquery = new TermQuery(new Term(enSearchIndex.sido_syn.name(), getQueryMap().get(enSearchIndex.sido_syn.name())));
//			booQuery.add(termquery, BooleanClause.Occur.MUST);
			// 시군구 검색
			}
			if(!getQueryMap().get(enSearchIndex.sgg_syn.name()).equals("")){
				addQeury( booQuery
						, enSearchIndex.sgg_syn.name()
//						, getQueryMap().get(enSearchIndex.sgg_syn.name()).replaceAll("([가-힣]*시)\\s?([가-힣]+)","$2")
						, getQueryMap().get(enSearchIndex.sgg_syn.name())
						, BooleanClause.Occur.MUST
						, true
						, QueryParser.OR_OPERATOR);
//				WildcardQuery wildQuery = new WildcardQuery(new Term( enSearchIndex.sgg_syn.name(), "*"+getQueryMap().get(enSearchIndex.sgg_syn.name()).replaceAll("([가-힣]*시)\\s?([가-힣]+)","$2")+"*"));
//				booQuery.add(wildQuery, BooleanClause.Occur.MUST);
			
			}else if(getQueryMap().get(enSearchIndex.emdong_syn.name()).equals("") &&
					 getQueryMap().get(enSearchIndex.bd_main_nm_syn.name()).equals("")){
//				logger.debug("sgg 2");
				TermQuery termquery = new TermQuery(new Term(enSearchIndex.sgg_syn.name(), "null"));
				booQuery.add(termquery, BooleanClause.Occur.MUST);
			}
			
			/*
			// 읍면동 검색. 불행하게도 읍면동이 안들어오는 케이스도 있다......
			if(!getQueryMap().get(IndexFieldDefineEnum.emdong_syn.name()).equals(""))
				addQeury( booQuery
						, enSearchIndex.emdong_syn.name()
						, getQueryMap().get(enSearchIndex.emdong_syn.name())
						//, "한강로동"//.replaceAll("([가-힣]*)([0-9]+)", "$1 $2")
						, BooleanClause.Occur.MUST
						, false
						, QueryParser.AND_OPERATOR
						, "^4.5");
			*/
			

			// 읍면동 검색
			if(!getQueryMap().get(enSearchIndex.emdong_syn.name()).equals("")){
				
//				String[] arrEmd = getQueryMap().get(enSearchIndex.emdong_syn.name()).replaceAll("([0-9]*)([가-힣]+)", "$1 $2")
//																				    .trim()
//																				    .replaceAll("[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]", " ").toLowerCase()
//																				    .split(" ");
//				String[] arrEmd = getQueryMap().get(enSearchIndex.emdong_syn.name()).replaceAll("([0-9]*)([가-힣]+)", "$1 $2")
//																			.trim()
//																			.replaceAll("[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]", " ").toLowerCase()
//																			.split(" ");
//				WildcardQuery wildQuery = new WildcardQuery(new Term(enSearchIndex.emdong_syn.name(), "*"+getQueryMap().get(enSearchIndex.emdong_syn.name())+"*"));
				
				addQeury( booQuery
						, enSearchIndex.emdong_syn.name()
						, getQueryMap().get(enSearchIndex.emdong_syn.name())
						, BooleanClause.Occur.MUST
						, true
						, QueryParser.OR_OPERATOR);
//				TermQuery termquery = new TermQuery(new Term(enSearchIndex.emdong_syn.name(), getQueryMap().get(enSearchIndex.emdong_syn.name())));
//				booQuery.add(termquery, BooleanClause.Occur.MUST);
//				for(int ix=0; ix < arrEmd.length;ix++){
//					logger.debug("arrEmd : "+arrEmd[ix]);
////					WildcardQuery wildQuery = new WildcardQuery(new Term(enSearchIndex.emdong_syn.name(), "*"+arrEmd[ix]+"*"));
//					TermQuery termquery = new TermQuery(new Term(enSearchIndex.emdong_syn.name(), arrEmd[ix]));
//					booQuery.add(termquery, BooleanClause.Occur.MUST);
					
//				}
				
			}else if(getQueryMap().get(enSearchIndex.bd_main_nm_syn.name()).equals("")){
				TermQuery termquery = new TermQuery(new Term(enSearchIndex.emdong_syn.name(), "null"));
//				WildcardQuery wildQuery = new WildcardQuery(new Term( enSearchIndex.emdong_syn.name(), "null"));
				booQuery.add(termquery, BooleanClause.Occur.MUST);
			}
			
			// 리 검색
			// 리만 빠지고 올 수 있음
			if(!getQueryMap().get(enSearchIndex.ri_syn.name()).equals("")) {
				addQeury( booQuery
						, enSearchIndex.ri_syn.name()
						, getQueryMap().get(enSearchIndex.ri_syn.name())
						, BooleanClause.Occur.MUST
						, false
						, QueryParser.AND_OPERATOR, "^2.0");
				
//				WildcardQuery wildQuery = new WildcardQuery(new Term( enSearchIndex.ri_syn.name(), "*"+getQueryMap().get(enSearchIndex.ri_syn.name())+"*"));
//				booQuery.add(wildQuery, BooleanClause.Occur.MUST);
			}
		
			
			// 건물명검색을 위한 조건 
			// 영문뒤에 한글이 바로오게 되면 정상적인 파싱이 이루어지지 않는다. 
			// 검색을 위하여 [영문][한글] 조합을 [영문]_[한글]로 변경
			String strBdMainNmSyn = getQueryMap().get(enSearchIndex.bd_main_nm_syn.name())
												 //.replaceAll("\\s", "")
												 //.replaceAll("([a-zA-Z]*)([가-힣]+)", "$1 $2")
//												 .replaceAll("([0-9]*)([가-힣]+)", "$1 $2")
												 .trim().replaceAll("[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]", " ").toLowerCase();
//			System.out.println(strBdMainNmSyn);
			logger.debug(strBdMainNmSyn);
			// 동 까지만을 검색한다고 간주한다
			if( getQueryMap().get(enSearchIndex.bd_main_nm_syn.name()).equals("") &&
				getQueryMap().get(enSearchIndex.pcl.name()).equals("") &&
				getQueryMap().get(enSearchIndex.road_nm_main_no.name()).equals("") &&
				getQueryMap().get(enSearchIndex.road_nm_sub_no.name()).equals("") ){
				
				strBdMainNmSyn = "null";
			}
			
			//
			if(!strBdMainNmSyn.equals("")){
//				System.out.println("strBdMainNmSyn : "+strBdMainNmSyn.toLowerCase());
				String[] arrBdMainNmSyn = strBdMainNmSyn.toLowerCase().split(" ");
				/*
				if(arrBdMainNmSyn.length == 1){
					WildcardQuery wildQuery = new WildcardQuery(new Term( enSearchIndex.bd_main_nm_syn.name()
																		, ("*"+strBdMainNmSyn+"*") ));
																		//, (arrBdMainNmSyn[ix]) ));
					booQuery.add(wildQuery, BooleanClause.Occur.MUST);	
				// 공백으로 분리된 주소의 경우는 제외한다.
				}else{
				*/	
				for(int ix=0; ix < arrBdMainNmSyn.length;ix++){
					
//					if(ix<2){
						if(!arrBdMainNmSyn[ix].equals("0")){
							if(getQueryMap().get(enSearchIndex.pcl.name()).equals("")&&getQueryMap().get(enSearchIndex.road_nm_main_no.name()).equals("")){
//								System.out.println(arrBdMainNmSyn[ix]);
								addQeury( booQuery
										, enSearchIndex.bd_main_nm_syn.name()
										, arrBdMainNmSyn[ix].equals("null")?"null":arrBdMainNmSyn[ix]
										, ix==0?BooleanClause.Occur.MUST:BooleanClause.Occur.SHOULD
										, true
										, QueryParser.OR_OPERATOR);
							}else{
//								System.out.println(arrBdMainNmSyn[ix]);
								addQeury( booQuery
										, enSearchIndex.bd_main_nm_syn.name()
										, arrBdMainNmSyn[ix].equals("null")?"null":arrBdMainNmSyn[ix]
										, BooleanClause.Occur.SHOULD
										, true
										, QueryParser.OR_OPERATOR);
							}
							
							if( arrBdMainNmSyn[ix].contains( "동" ) ) {
								addQeury( booQuery
										, enSearchIndex.bd_main_nm_syn.name()
										, arrBdMainNmSyn[ix].equals("null")?"null":arrBdMainNmSyn[ix].replaceAll( "동", "" )
										, BooleanClause.Occur.SHOULD
										, true
										, QueryParser.OR_OPERATOR);
							} else if( arrBdMainNmSyn[ix].matches( "\\d+" ) ) {
								addQeury( booQuery
										, enSearchIndex.bd_main_nm_syn.name()
										, arrBdMainNmSyn[ix].equals("null")?"null":arrBdMainNmSyn[ix] + "동"
										, BooleanClause.Occur.SHOULD
										, true
										, QueryParser.OR_OPERATOR);
							}
							
//							TermQuery termquery = new TermQuery(new Term(enSearchIndex.bd_main_nm_syn.name(), arrBdMainNmSyn[ix].equals("null")?"null":(arrBdMainNmSyn[ix])));
//							booQuery.add(termquery, BooleanClause.Occur.MUST);
							
//							WildcardQuery wildQuery = new WildcardQuery(new Term( enSearchIndex.bd_main_nm_syn.name().replaceAll(" ", "")
//																				, arrBdMainNmSyn[ix].equals("null")?"null":("*"+arrBdMainNmSyn[ix]+"*"))
//																	   );
//																					//, (arrBdMainNmSyn[ix]) ));
//							booQuery.add(wildQuery, BooleanClause.Occur.SHOULD);
						}
//					}
				}
			/*		
				}
			*/
			} 
				
			
			// 지번의 경우 지번포인트 테이블을 이용하여 조회하기 때문에 조건 검색에서 제외한다.
			// 제외 할 경우 주소정제 테이블에서 지번이 없는 동일한 동에 대한 데이터가 다수 존재할 경우는 여러개의 결과값이
			// 리턴되기 때문에 주의 할 것.
			if(!getQueryMap().get(enSearchIndex.pcl.name()).equals("") ||
			   (strBdMainNmSyn.equals("null") && getQueryMap().get(enSearchIndex.road_nm_main_no.name()).equals(""))) {
				String pcl= getQueryMap().get(enSearchIndex.pcl.name()).replaceAll("호", "");
				pcl= pcl.replaceAll("번지", "");
				pcl = pcl.replaceAll( "산\\s*", "산 " );
				// pcl = "\"" + pcl + "\"";

				TermQuery termquery = new TermQuery(new Term(enSearchIndex.pcl.name(), pcl.equals( "" ) ? "null" : pcl));
				booQuery.add(termquery, BooleanClause.Occur.MUST);

//				addQeury( booQuery
//						, enSearchIndex.pcl.name()
//						, pcl
//						, BooleanClause.Occur.MUST
//						, true
//						, QueryParser.AND_OPERATOR);
			}

			// 도로명번호 본번			
			if(!getQueryMap().get(enSearchIndex.road_nm_main_no.name()).equals("") ||
			   (strBdMainNmSyn.equals("null") && getQueryMap().get(enSearchIndex.pcl.name()).equals("") ))
				addQeury( booQuery
						, enSearchIndex.road_nm_main_no.name()
						, getQueryMap().get(enSearchIndex.road_nm_main_no.name())
						, BooleanClause.Occur.MUST
						, true
						, QueryParser.AND_OPERATOR);
			
			// 도로명번호 부번
			if(!getQueryMap().get(enSearchIndex.road_nm_sub_no.name()).equals(""))
				addQeury(booQuery
						, enSearchIndex.road_nm_sub_no.name()
						, getQueryMap().get(enSearchIndex.road_nm_sub_no.name())
						, BooleanClause.Occur.SHOULD
						, false
						, QueryParser.AND_OPERATOR);

			// 빌딩 서브네임도 빌딩 메인네임 유의어에 편입시키기로 결정되어 검색조건에서 별도로 조회하지 않는다.			
			//addQeury(booQuery, enSearchIndex.bd_sub_nm.name(), getQueryMap().get(enSearchIndex.bd_sub_nm.name()), BooleanClause.Occur.MUST, false, QueryParser.AND_OPERATOR);
			
		}
		catch( ParseException e )
		{
			logger.error(e.getMessage());
			
		}
		
		// 해당되는 쿼리를 로그로 남긴다.
		logger.info("GeocodeQuery=["+booQuery.toString()+"]");
		
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
	public void addQeury(BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator) throws ParseException{

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
	public void addQeury(BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator, String strPoint) throws ParseException{

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
	private Query getQueryParser(String indexField, String query, Operator operator, String strPoint) throws ParseException {

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
	
	private boolean SearchIgnore(){
		return true;
	}
}
