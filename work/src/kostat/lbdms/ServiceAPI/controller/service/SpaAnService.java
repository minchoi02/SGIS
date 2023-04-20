package kostat.lbdms.ServiceAPI.controller.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.Meta;
import kostat.lbdms.ServiceAPI.common.web.model.TableData;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.ResultKey;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

/**  
* <pre>
* 공간분석 관리 서비스
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
*  </pre>
*/

public interface SpaAnService {
		
	/**
	 * <pre>
	 * 좌표변환, 맵핑, 검증 시 선택한 데이터의 일부 내용을 조회한다
	 * </pre>
	 * @param String ( dbName )	데이터베이스 명 
	 * @param String ( tableName ) 테이블 명
	 * @param String ( userId ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public TableData getTablePreview( 
			String schema, 
			String tableName, 
			String userId ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 좌표변환, 맵핑, 검증 시 선택한 데이터의 일부 내용을 조회한다
	 * </pre>
	 * @param String ( resourceId ) 리소스 아이디
	 * @param String ( userId ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public TableData getPointsView( 
			String resourceId, 
			String userId ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 테이블 상세정보 조회
	 * </pre>
	 * @param String ( table_name ) 테이블 명
	 * @return 테이블 상세정보 
	 * @throws SystemFailException
	 */
	public List<Meta> getTableInfo( String table_name ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 테이블 상세정보 조회
	 * </pre>
	 * @param String ( table_name ) 테이블 명
	 * @param String ( schema ) 스키마
	 * @param String ( user_id ) 사용자 아이디
	 * @return 테이블 상세정보 
	 * @throws SystemFailException
	 */
	public List<Meta> getTableInfo( String schema, String table_name, String user_id ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 데이터 제약조건 사전 점검
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject chkSpaData( 
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 데이터조건설정
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject resultSpaData( 
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 결과데이터 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject importData( 
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 범례만들기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject getRange(	
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 범례적용 
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject applyRange(	
			HashMap<String,Object> parameters ) throws SystemFailException;

	/**
	 * <pre>
	 * 공간분석 결과처리
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject spaProc(	
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 공간분석 결과 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject getSpaResult(	
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	/**
	 * <pre>
	 * 공간분석 결과저장
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject spaSave(	
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	
	/**
	 * <pre>
	 * 영역선택 
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject selBoundary(	
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	
	/**
	 * <pre>
	 * 결합데이터 구성 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject selectUnionData( 
			HashMap<String,Object> parameters ) throws SystemFailException;
	
	
	/**
	 * <pre>
	 * 공간자기 구성 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject selectSpaceData( 
			HashMap<String,Object> parameters ) throws SystemFailException;
}
