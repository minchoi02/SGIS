package kostat.lbdms.ServiceAPI.controller.service;

import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;

import kostat.lbdms.ServiceAPI.common.util.QueryUtil;
import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.DenseAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisUtils;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

/**  
* <pre>
* 나의 데이터 분석 관련 서비스
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

@SuppressWarnings("unused")
public interface DenseAnalysisService {
	

	
	/**
	 * 공간자기상관 분석 처리
	 * @param denseAnalysis
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 * @throws Exception 
	 */
	public JSONObject spaceSelfAnalysis( DenseAnalysis denseAnalysis, JSONArray condition_list ) throws SystemFailException, Exception;
	
		
	/**
	 * 보로노이 분석 처리
	 * @param denseAnalysis
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 * @throws Exception 
	 */
	public JSONObject voronoiAnalysis( DenseAnalysis denseAnalysis, JSONArray condition_list ) throws SystemFailException, Exception;
	
	/**
	 * <pre>
	 * 분석조건에 따른 resource 데이터 분석 실행 (밀집 분석)
	 * </pre>
	 * @param resource_id
	 * @param data_table
	 * @param data_table_schema
	 * @param user_id
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 * @throws Exception 
	 */
	public JSONObject denseAnalysis(DenseAnalysis denseAnalysis, JSONArray condition_list) throws SystemFailException, Exception ;

	
	/**
	 * <pre>
	 * 군집밀집 결과데이터 가져오기
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getSpaData( JSONObject json, String userid) throws SystemFailException;

	
	/**
	 * <pre>
	 * 데이터 조건 =>> SQL WHERE조건으로 변경
	 * </pre>
	 * @param JSONArray condition_list
	 * @return where
	 */
	public JSONObject whereMake( JSONArray condition_list );
	
	
	/**
	 * 
	 * @param iQryCond
	 * @param column_name
	 * @param checkFg
	 * @return
	 * @throws SystemFailException
	 */
	public boolean selectTabInfo (DenseAnalysis iQryCond, String column_name) throws SystemFailException;
	
	/**
	 * <pre>
	 * 테이블 필드에 xy 정보 존재여부 확인
	 * </pre>
	 * @param iQryCond
	 * @param column_name
	 * @param checkFg
	 * @return
	 * @throws SystemFailException
	 */
	public boolean existsPolColumn (DenseAnalysis iQryCond) throws SystemFailException;
	
	
	/**
	 * <pre>
	 * 밀집 배치 데이터
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getBatchSpaDense( JSONObject json, String userid) throws SystemFailException;

	/**
	 * 군집분석 결과 데이터 조회
	 * @param resource_id
	 * @return
	 * @throws SystemFailException 
	 */
	public String getCrowdAnalysisResults( String schema, String table ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 밀집분석 배치
	 * </pre>
	 * @param json
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject getBatchAnalyzeDense(JSONObject json) throws SystemFailException;
}
 