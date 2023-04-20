package kostat.lbdms.ServiceAPI.common.web.model;

import net.sf.json.JSONArray;

/**  
* <pre>
* 쿼리 결과
* </pre>
*
* @author        오범용
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      오범용                        최초생성
* 
*/

public class QueryResult {
	/** 값 */
	private JSONArray values;
	/** 컬럼 */
	private JSONArray columns;
	
	public JSONArray getValues() {
		if ( values == null ){
			values = new JSONArray();
		}
		return values;
	}
	
	public void setValues(JSONArray values) {
		this.values = values;
	}
	
	public JSONArray getColumns() {
		if ( columns == null ){
			columns = new JSONArray();
		}
		return columns;
	}
	
	public void setColumns(JSONArray columns) {
		this.columns = columns;
	}
	
	

}
