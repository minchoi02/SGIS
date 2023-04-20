package kostat.lbdms.ServiceAPI.controller.model.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import lombok.Data;
import org.springframework.util.StringUtils;
/*import kostat.lbdms.ServiceAPI.controller.rest.constant.RequestKey;*/

/**  
 * <pre>
 * 리스트 타입 파라미터 관련 클레스
 * </pre>
 *
 * @author		Admin
 * @since 		2015. 10. 20. 오후 2:18:53
 * @version 	    1.0
 * @see
 * <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *</pre>
 */
@Data
public class ListTypeParameter {
	/** 컬럼 */
	public static final String COLUMNS = "cols";
	/** 또는 */
	private static final String OR = ";";
	/** 구분자 */
	private static final String DELIM = ":";
	/** 배열 */
	private static final String ARRAY_TYPE ="[]";
	/** 쿼리 */
	private String query;
	/** 시작점 */
	private int start = 0;
	/** 페이지 로우수 */
	private int display = 20;
	/** 정렬 */
	private String sort;
	/** 정렬구분 */
	private String order="desc";
	
	public boolean isSearch(){
		return ( !StringUtils.isEmpty( this.getQuery() ) );
	}
	/**
	 * 페이징관련 변수조회
	 * @return
	 */
	public HashMap<String,Object> getPagination(){
		
		HashMap<String,Object> parameter = new HashMap<String,Object>();
		
		// 조회 수 오프셋
		parameter.put("offset", this.getStart() );
		
		// 조회 수 제한
		parameter.put("limit", this.getDisplay() );
		
		// 정렬 방법
		parameter.put("order", this.getOrder() );
		
		// 정렬 컬럼
		if ( !StringUtils.isEmpty( this.getSort() ) ){
			parameter.put("sort", this.getSort() );
		}
		return parameter;
	}
	/**
	 * 내역 조회조건
	 * @return
	 */
	public HashMap<String,Object> getParameter(){
		
		HashMap<String,Object> parameter = new HashMap<String,Object>();
		HashMap<String,Object> map = this.getParsedQuery();
		String[] cols = (String[])map.get( COLUMNS );
		for ( String col : cols ){
			parameter.put( col, map.get( col ) );
		}
		
		if( !StringUtils.isEmpty(this.getSort() ) ){
			/*parameter.put(RequestKey.SORT_COLUMN, this.getSort());
			parameter.put(RequestKey.SORT_TYPE, this.getOrder());*/
		    	parameter.put("SORT_COLUMN", this.getSort());
			parameter.put("SORT_TYPE", this.getOrder());
		}
		return parameter;
	}
	/**
	 * 조회조건 파싱
	 * @return
	 */
	private HashMap<String,Object> getParsedQuery(){
		HashMap<String,Object> map = new HashMap<String,Object>();
		String temp = this.getQuery();
			if ( temp != null ){
			String[] queryParams = temp.split(OR);
			for ( String param : queryParams ){
				
				String keyValue[] = param.split( DELIM );
				
				if ( keyValue.length >= 2 ){
					
					String key = keyValue[0];
					String value = keyValue[1];
					
					// key가 배열형태로 온 경우에 대한 처리
					if ( key.contains( ARRAY_TYPE ) ){
						if ( map.containsKey( key ) ){
							if (map.get(key) instanceof List ){
								@SuppressWarnings("unchecked")
								List<String> list = (List<String>)map.get(key);
								list.add( value );
								map.put(key,list);
							}
						} else {
							List<String> list = new ArrayList<String>();
							list.add( value );
							map.put(key,list);
						}
					} else {
						map.put( key, value );
					}
				}
			}
		}
		
		Set<String> keySet = map.keySet();
		String[] cols = keySet.toArray(new String[map.size()]);
		map.put( COLUMNS , cols);
		
		return map;
	}
	
}
