package kostat.lbdms.ServiceAPI.controller.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kostat.lbdms.ServiceAPI.common.util.QueryUtil;
import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.MyDataAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
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
public interface MyDataAnalysisService {
	
	/**
	 * <pre>
	 * 분석조건에 따른 resource 데이터 분석 실행 (행정경계)
	 * </pre>
	 * @param resource_id
	 * @param data_table
	 * @param data_table_schema
	 * @param user_id
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject dataAnalysis(MyDataAnalysis myDataAnalysis, JSONArray condition_list) throws SystemFailException;

	/**
	 * 경계분석 결과데이터 가져오기
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getSpaData( JSONObject json, String userid) throws SystemFailException;

	
	/**
	 * 
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getBatchSpaData( JSONObject json, String userid) throws SystemFailException;
	
	
	
	/**
	 * 
	 * @param json 
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject getBatchAnalyzeData(JSONObject json) throws SystemFailException ;
	
	
	/**
	 * 결합분석 > 나의 행정경계분석결과 내역조회
	 * @param user_id
	 * @param limit
	 * @param offset
	 * @param category4
	 * @param extraParams
	 * @return
	 * @throws SystemFailException
	 *//*
	public ListTypeResult<List<ResourceVO>>  selectMyAdmAnalysRltList( 
			String user_id, 
			int limit, 
			int offset,
			String category4,
			HashMap<String,Object> extraParams ) throws PSQLException{
		
		ListTypeResult<List<ResourceVO>>  res = new ListTypeResult<List<ResourceVO>>();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		if ( user_id != null ){
			parameters.put( RequestKey.USER_ID, user_id );
		}
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		parameters.put( RequestKey.CATEGORY4 , category4 );
		
		parameters.putAll( extraParams );
		
		
		res = mapper.selectMyAdmAnalysRltList(parameters);
		
		return res;
	}*/
	
	
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
	public boolean selectTabInfo (MyDataAnalysis iQryCond, String column_name) throws SystemFailException;
	
	/**
	 * 테이블 필드에 xy 정보 존재여부 확인
	 * @param iQryCond
	 * @param column_name
	 * @param checkFg
	 * @return
	 * @throws SystemFailException
	 */
	public boolean existsPolColumn (MyDataAnalysis iQryCond) throws SystemFailException;
	
	
	/**
	 * 연산분석 실행
	 * @param json
	 * @param uerid
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject procAnalyOpt (JSONObject json, String uerid) throws SystemFailException;

	/**
	 * 연산분석 조건 체크
	 * @param json
	 * @param uerid
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject procAnalyOptAreaCheck (JSONObject json, String uerid) throws SystemFailException;
	
	
	/**
	 * <pre>
	 * 데이터 가져오기
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getPolyData( JSONObject json, String userid) throws SystemFailException;
	 
	/**
	 * <pre>
	 * 데이터 가져오기
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getSpaceDataN( JSONObject json, String userid) throws SystemFailException;
	
	public HashMap<String, Object> setTableProperties(HashMap<String, Object> parameters, String type, int space);
	
	public HashMap<String, Object> setSigunguProperties(HashMap<String, Object> parameters,String type,String admType,String sido,String sgg,String dong);
}
 