package kostat.lbdms.ServiceAPI.common.web.rest.system;

import java.util.HashMap;
import java.util.List;

import kostat.lbdms.ServiceAPI.controller.model.rest.ResourceData;
import lombok.Getter;
import lombok.Setter;

/**  
* <pre>
* 자원 미리보기
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
public class TableResource extends ResourceData{
    /**테이블이름*/
	@Getter @Setter
	private String table;
	/**구분자*/
	@Getter @Setter
	private String delimiter;
	/**데이터베이스이름*/
	@Getter @Setter
	private String database;
	/**파일명*/
	@Getter @Setter
	private String file_name;
	/**컬럼 JSONArray형태*/
	@Getter @Setter
	private List<HashMap<String, Object>> columnList;
	/**헤더 유무*/
	@Getter @Setter
	private Boolean header;
}
