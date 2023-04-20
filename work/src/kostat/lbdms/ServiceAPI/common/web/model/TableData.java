package kostat.lbdms.ServiceAPI.common.web.model;

import lombok.Data;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**  
 * <pre>
 * 테이블 데이터 변수 관련 클레스
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
public class TableData {

	/** 전체 row 수 */
	private int total;
	/** 데이터 row */
	private JSONArray rows = new JSONArray();
	/** 데이터 row */
	private JSONArray comments = new JSONArray();	
	/** 컬럼 목록 */
	private JSONArray columns = new JSONArray();
	/** 데이터정보 */
	private JSONObject history = new JSONObject();
	/** 로그정보 */
	private JSONObject logData = new JSONObject();
	/**output_resource_id*/
	private String output_resource_id;
	
	/**
	 * 컬럼 추가
	 * @param item
	 */
	public void addColumns(JSONObject item) {
		
		if ( this.getColumns() == null ){
			this.columns = new JSONArray();
		}
		this.columns.add( item );
	}

}
