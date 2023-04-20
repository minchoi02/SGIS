package kostat.lbdms.ServiceAPI.common.util;

import org.apache.commons.lang.StringUtils;

/**  
* <pre>
* QUERY 관련 유틸
* </pre>
*
* @author        Admin
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
* </pre>
*/
public class QueryUtil {
    public static final String TOTAL = "total";
	
	/**
	 * <pre>
	 * 쿼리의 SQLType을 체크한다
	 * </pre>
	 * @param query
	 * @param type
	 * @return boolean
	 */
	public static boolean getTypeOfSQL(String query, String type ){
		return ( query.toUpperCase().startsWith( type ) );
	}
	
	/**
	 * <pre>
	 * 쿼리 파싱하여 정제한다
	 * </pre>
	 * @param query
	 * @return String
	 */
	public static String cleanQuery( String query ){
		
		// 쿼리 주석을 제거한다
		query = query.replaceAll( "--.*|(\"(?:\\\\[^\"]|\\\\\"|.)*?\")|(?s)/\\*.*?\\*/", "$1 " );		
		
		// 쿼리 공백을 제거한다
		query = query.trim();
				
		if ( query.endsWith(";")  == false ) {
			query += ";";
		}
		
		// ; 콜론으로 구분되어 있는 경우 마지막 쿼리만 실행되도록 처리
		//query = splitSemicolon( query );

		// 공백 제거 한번 더!
		query = query.trim();
		
		return query;
	}
	
	/**
	 * <pre>
	 * 쿼리 파싱하여 정제한다
	 * </pre>
	 * @param query
	 * @return String
	 */
	public static String cleanStr( String query ){
		
		// 쿼리 주석을 제거한다
		query = query.replaceAll( "--.*|(\"(?:\\\\[^\"]|\\\\\"|.)*?\")|(?s)/\\*.*?\\*/", "$1 " );		
		
//		if( query != null && !query.isEmpty() ){
//			String[] injectionCodes = {"'", "--", "--, #", "/* */", "/*", "*/", "\\*", ";", "\n", 
//					"'or 1=1--", "-1 or", "-1' or", "../", "win.ini", "\"", "1=1", "union", ".ini", "'or"};
//			
//			for (int i = 0; i < injectionCodes.length; i++) {
//				String code = injectionCodes[i];
//				
//				if( query.indexOf( code ) >= 0 ){
//					query = query.replace(code, "");
//				}
//			}
//		}
			
		// 쿼리 공백을 제거한다
		query = query.trim();
		
		return query;
	}
	
	/**
	 * <pre>
	 * 세미콜론으로 구분지어진 쿼리의 마지막 쿼리를 반환한다
	 * </pre>
	 * @param query 
	 * @return String
	 */
	public static String splitSemicolon( String query ){
		String[] splited = query.split(";");
		for( int i = splited.length -1; i >= 0; i-- ){
			if ( !StringUtils.isEmpty( splited[i]) ){
				return splited[i];
			}
		}
		return splited[splited.length-1];
	}
	
	/**
	 * <pre>
	 * 전달된 쿼리문을 페이징처리 쿼리문으로 변환한다
	 * </pre>
	 * @param String ( query ) 쿼리문
	 * @param int ( offset ) 
	 * @param in ( limit ) 
	 * @return String
	 */
	public static String convertPagingQuery( String query, int offset, int limit ){
		
		StringBuffer sb = new StringBuffer();
		
		sb.append( " SELECT " );
		sb.append( " * " );
		sb.append( " FROM " );
		sb.append( " ( " );
		sb.append( query );
		sb.append( " ) sub " );
		sb.append( " OFFSET " + offset + " LIMIT " + limit );
		
		return sb.toString();
	}
	
	/**
	 * <pre>
	 * 전달된 쿼리문 결과 집계 쿼리 변환
	 * </pre>
	 * @param String ( query ) 쿼리문
	 * @return String 
	 */
	public static String convertCountingQuery(String query) {
		
		StringBuffer sb = new StringBuffer();
		
		sb.append( " SELECT " );
		sb.append( " COUNT(1) AS " + TOTAL + " " );
		sb.append( " FROM " );
		sb.append( " ( " );
		sb.append( query );
		sb.append( " ) sub " );
		
		return sb.toString();
	}
}
