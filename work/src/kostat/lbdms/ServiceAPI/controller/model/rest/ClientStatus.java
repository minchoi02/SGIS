package kostat.lbdms.ServiceAPI.controller.model.rest;

import lombok.Data;

/**  
* <pre>
* 내부망 수집 분석 관리
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
public class ClientStatus {
	/** 내부망수집관리데몬 */
	private boolean inner = false;
	/** 외부망수집관리데몬 */
	private boolean outer = false;
	/** 분석관리데몬 */
	private boolean analysis = false;
	/** 하둡관리데몬 */
	private boolean namenode2 = false;
	/** 전체관리데몬 */
	private boolean lbdms = false;

}
