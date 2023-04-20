package kostat.sop.OpenAPI3.search.common;

import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.kr.KoreanAnalyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.queryparser.classic.QueryParser.Operator;
import org.apache.lucene.search.BooleanClause.Occur;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.WildcardQuery;
import org.apache.lucene.util.Version;

public class QueryUtil {
	
	public Query getBooleanQuery(){
		return null;
	}

	
	/**
	 * 
	 * @param strFieldNm
	 * @param strWord 검색 필드명 
	 * @param occur 
	 * @return
	 */
	public Query getTermQuery(String strFieldNm, String strWord, Occur occur){
		//TermQeury tq = new Term("", "");
		return getWildCardQuery(strFieldNm, strWord, occur, (float) 0);
	}
	/**
	 * 
	 * @param strFieldNm
	 * @param strWord
	 * @param occur
	 * @return
	 */
	public Query getWildCardQuery(String strFieldNm, String strWord, Occur occur){
		return getWildCardQuery(strFieldNm, strWord, occur, (float) 0);
	}
	
	/**
	 * 
	 * @param strFieldNm
	 * @param strWord
	 * @param occur
	 * @param boost
	 * @return
	 */
	public Query getWildCardQuery(String strFieldNm, String strWord, Occur occur, Float boost){

		BooleanQuery booleanqeury = new BooleanQuery();
		List ltWildCard = new ArrayList();
		
		String[] arrWord = strWord.trim()
								  .replaceAll("([0-9]*)([가-힣]+)|([가-힣]+)([0-9]*)", "$1 $2")
								  .replaceAll("[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]", " ")
								  .toLowerCase()
								  .split(" ");

		for(int ix=0; ix < arrWord.length;ix++){

			WildcardQuery wildQuery = new WildcardQuery(new Term( strFieldNm, "*"+arrWord[ix]+"*"));
			booleanqeury.add(wildQuery, occur);
		}
		
		return (Query)booleanqeury;
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
	public static void addQeury(Version version, BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator) throws ParseException{

		String strPoint = "";	// 초기값 설정
		addQeury(version, booQuery, strFiled, query, occ, blAbsMatch, operator, strPoint);

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
	public static void addQeury(Version version, BooleanQuery booQuery, String strFiled, String query, BooleanClause.Occur occ, boolean blAbsMatch, Operator operator, String strPoint) throws ParseException{

		if(query == null || query.equals("")){
			if(blAbsMatch == true)	query= "\"null\"";
			else query= "NOT \"null\"";
		}
		
		booQuery.add( getQueryParser(version, strFiled, query, operator, strPoint), occ );
		
	}
	
	/**
	 * 
	 * @param indexField
	 * @param query
	 * @param operator
	 * @return
	 * @throws ParseException
	 */
	private static Query getQueryParser(Version version, String indexField, String query, Operator operator, String strPoint) throws ParseException {

		KoreanAnalyzer ka = new KoreanAnalyzer();		
//		Analyzer st = new StandardAnalyzer(version.LUCENE_44);		
		QueryParser parser = new QueryParser(version, indexField, ka);
		
		parser.setDefaultOperator(operator);
		query = QueryParser.escape(query);
		//System.out.println(indexField+"="+query);
		
		if(!strPoint.equals("")) query = query+strPoint;

		return parser.parse(query);
	}
	
	private boolean SearchIgnore(){
		return true;
	}
}
