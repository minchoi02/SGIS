package kostat.lbdms.ServiceAPI.common.web.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

/**  
* <pre>
* R 스크립트 실행결과
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
@Data
public class RScriptResult {
	
	/** 실행 결과 로그 */
	private String log;
	
	/** 이미지 경로 목록 */
	private List<String> images = new ArrayList<String>();
	
	public void addImages( String path ){
		this.images.add( path );
	}

}
