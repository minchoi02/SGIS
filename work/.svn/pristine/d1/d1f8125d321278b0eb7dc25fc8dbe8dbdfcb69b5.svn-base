package kostat.lbdms.ServiceAPI.controller.service;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.SpaceAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

/**  
* <pre>
* 공간상관분석 서비스
* </pre>
*
* @author        Admin
* @since         2016. 11. 02. 오후 2:18:53
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

//public class SpaceAnalysisService extends BaseService<SpaceAnalysis, Integer>{
public interface SpaceAnalysisService{
	
	/**
	 * <pre>
	 * 공간상관분석 근접 이웃수 검색
	 * </pre>
	 * @param resource_id
	 * @param data_table
	 * @param data_table_schema
	 * @param user_id
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 */

	public JSONObject approachCount(SpaceAnalysis spaceAnalysis) throws SystemFailException;
	
	/**
	 * <pre>
	 * 분석조건에 따른 resource 데이터 분석 실행 (공간상관분석)
	 * </pre>
	 * @param resource_id
	 * @param data_table
	 * @param data_table_schema
	 * @param user_id
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 */

	public JSONObject spaceAnalysis(SpaceAnalysis spaceAnalysis) throws SystemFailException;
	
	/**
	 * <pre>
	 * 공간상관분석 지도 데이터 가져와서 그리기
	 * </pre>
	 * @param resource_id
	 * @param data_table
	 * @param data_table_schema
	 * @param user_id
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 */

	public JSONObject spaceAnalysisGridMap(SpaceAnalysis spaceAnalysis) throws SystemFailException;
	
	
	public JSONObject spaceAnalysisGridMapBak(SpaceAnalysis spaceAnalysis) throws SystemFailException;
	
	/**
	 * <pre>
	 * 공간 상관 분석 배치
	 * </pre>
	 * @param json
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject getBatchAnalyzeSpace(JSONObject json) throws SystemFailException ;	
}
 