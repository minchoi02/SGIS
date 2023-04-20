package kostat.lbdms.ServiceAPI.common.web.rest;

import java.util.HashMap;

import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;

/**  
* <pre>
* 파라메타 맵을 반환 한다.
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
public interface IConverter {
    	/**
	 * <pre>
	 * 등록 시 전달되는 파라메타 맵을 반환한다
	 * </pre>
	 * @return HashMap
	 * @throws SystemFailException
	 */
	public HashMap<String,Object> toAdderMap() throws SystemFailException;
	
	/**
	 * <pre>
	 * 수정 시 전달되는 파라메타 맵을 반환한다
	 * </pre>
	 * @return HashMap
	 * @throws SystemFailException
	 */
	public HashMap<String,Object> toModifierMap() throws SystemFailException;
}
