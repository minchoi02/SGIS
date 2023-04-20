package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.util.HashMap;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.SpaceAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.controller.service.SpaceAnalysisService;
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

@Service("spaceAnalysisService")
//public class SpaceAnalysisService extends BaseService<SpaceAnalysis, Integer>{
public class SpaceAnalysisServiceImpl extends EgovAbstractServiceImpl implements SpaceAnalysisService {
	
	private static final Logger logger = LoggerFactory.getLogger(SpaceAnalysisService.class);
	
	@Resource(name="postgreCommandClient")
	private PostgreCommandClient client;
	
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

	public JSONObject approachCount(SpaceAnalysis spaceAnalysis) throws SystemFailException { 
		
		JSONObject res = null;
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put("SELECT_ADDR_TYPE", 	spaceAnalysis.getAddrType());
		parameters.put("SELECT_YEAR", 		spaceAnalysis.getYear());
		parameters.put("AREA_CODE", 		spaceAnalysis.getAddrCode());
		
		res = new RestService().call(Command.ANALYSIS, Command.SPACE_ANALYSIS, Command.COUNT_K, parameters);
		
		if( !"SUCCESS".equals(res.get("RESULT")) ){
			logger.debug( ""+res.get("MESSAGE") );
			return res;
		}
		
		return res;
	}
	
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

	public JSONObject spaceAnalysis(SpaceAnalysis spaceAnalysis) throws SystemFailException { 
		
		JSONObject res = null;
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put("USER_ID", 			spaceAnalysis.getUserid());
		parameters.put("SELECT_DATA_TYPE", 	spaceAnalysis.getDataType());
		parameters.put("SELECT_ADDR_TYPE", 	spaceAnalysis.getAddrType());
		parameters.put("SELECT_YEAR", 		spaceAnalysis.getYear());
		parameters.put("AREA_CODE", 		spaceAnalysis.getAddrCode());
		parameters.put("SELECT_K_AREA", 	spaceAnalysis.getKArea());
		
		if(spaceAnalysis.getAddrType().equals("2")){
			parameters.put("ACTION_TYPE", 	"SPACE_ANALY_SIDO");
		} else {
			parameters.put("ACTION_TYPE", 	"SPACE_ANALY_SGG");
		}
		
		res = new RestService().call(Command.ANALYSIS, Command.SPACE_ANALYSIS, Command.EXECUTE_QUERY, parameters);
		
		if( !"SUCCESS".equals(res.get("RESULT")) ){
			logger.debug( ""+res.get("MESSAGE") );
			return res;
		}
		
		JSONObject getObj =  (JSONObject) JSONSerializer.toJSON(res);
		JSONObject msgObj = getObj.getJSONObject("MESSAGE");
		
		String schema = spaceAnalysis.getUserid();
		String tblNm = schema + "." + msgObj.get("RESULT_TABLE").toString();
		String query = "";
		
		if(spaceAnalysis.getAddrType().equals("2")){
			query += "Select ";
			query += "(Select ST_X(ST_Centroid(geom)) From KOSTAT.bnd_sido_pg B Where B.sido_cd = A.cd) as x ";
			query += ",(Select ST_Y(ST_Centroid(geom)) From KOSTAT.bnd_sido_pg B Where B.sido_cd = A.cd) as y ";
			query += "From ";
			query += tblNm + " A ";
			query += "limit 1";
		}else{
			query += "Select ";
			query += "(Select ST_X(ST_Centroid(geom)) From KOSTAT.bnd_sigungu_pg B Where B.sigungu_cd = A.cd) as x ";
			query += ",(Select ST_Y(ST_Centroid(geom)) From KOSTAT.bnd_sigungu_pg B Where B.sigungu_cd = A.cd) as y ";
			query += "From ";
			query += tblNm + " A ";
			query += "limit 1";
		}
		
		schema = RequestKey.POSTGRE;
		String result = client.executeRawQuery( schema, query );
		
		JSONObject resultJson = (JSONObject) JSONSerializer.toJSON(result);
		JSONObject resultMsg = resultJson.getJSONObject("MESSAGE");
		JSONArray values = resultMsg.getJSONArray("VALUE");
		
		if (values != null) {
			JSONObject row = values.getJSONObject(0);
			res.put("x",  row.getString("x"));
			res.put("y",  row.getString("y"));
		}
		
		if( !"SUCCESS".equals(res.get("RESULT")) ){
			logger.debug( ""+res.get("MESSAGE") );
			return res;
		}
		
		return res;
	}
	
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

	public JSONObject spaceAnalysisGridMap(SpaceAnalysis spaceAnalysis) throws SystemFailException {
		JSONObject res = null;
		try{
			String schema = spaceAnalysis.getUserid();
			String tblNm = schema + "." + spaceAnalysis.getRESULT_TABLE();
			
			String query = "";
			/*
			"morani"
			"expec"
			"va"
			"std"
			"p_v"
			"intercp"
			"moran_coef"
			 */
			query += "Select \"moranI\" morani, expec, va, std, p_v, intercp, moran_coef from " + tblNm;
			
			schema = RequestKey.POSTGRE;			
			res = client.executeQuery( schema, query );
			return res;
		} catch (SystemFailException e) {
			logger.info(e.getMessage(),e);	
			return res;
		} catch (Exception e) {
			logger.info(e.getMessage(),e);	
			return res;
		}
	}
	
	
	public JSONObject spaceAnalysisGridMapBak(SpaceAnalysis spaceAnalysis) throws SystemFailException {
		JSONObject res = null;
		try{
			String schema = spaceAnalysis.getUserid();
			String tblNm = schema + "." + spaceAnalysis.getRESULT_TABLE();
			
			String query = "";

			query += "Select ";
			query += "A.data, A.legend, A.category_nm, A.year, A.adm_nm, ";
			if(spaceAnalysis.getAddrType().equals("2")){
				query += "B.sido_nm AS name, ";
//				query += "A.data, A.legend, st_x(st_centroid(geom)) AS center_x, st_y(st_centroid(geom)) AS center_y, ";
				query += "ST_AsGeoJson(geom) AS geom ";
				query += "From ";
				query += tblNm + " A ";
				query += "Left Outer Join ";
				query += "KOSTAT.bnd_sido_pg B ";
				query += "On A.cd = B.sido_cd ";
				query += "Where A.cd != ''";
			}else{
				query += "B.sigungu_nm AS name, ";
//				query += "A.data, A.legend, st_x(st_centroid(geom)) AS center_x, st_y(st_centroid(geom)) AS center_y, ";
				query += "ST_AsGeoJson(geom) AS geom ";
				query += "From ";
				query += tblNm + " A ";
				query += "Left Outer Join ";
				query += "KOSTAT.bnd_sigungu_pg B ";
				query += "On A.cd = B.sigungu_cd ";
				query += "Where A.cd != ''";
			}
			schema = RequestKey.POSTGRE;			
			res = client.executeQuery( schema, query );
			return res;
		} catch (SystemFailException e) {
			logger.info(e.getMessage(),e);	
			return res;
		} catch (Exception e) {
			logger.info(e.getMessage(),e);	
			return res;
		}
	}
	
	/**
	 * <pre>
	 * 공간 상관 분석 배치
	 * </pre>
	 * @param json
	 * @return
	 * @throws SystemFailException
	 */
public JSONObject getBatchAnalyzeSpace(JSONObject json) throws SystemFailException {
		JSONObject res = new JSONObject();
		
		String action_type = "";
		String target_table = "";
		String query = "";
		String Schema = "";
		
		try{
			if ( ( !json.containsKey("TABLE_NM") && !json.containsKey("TABLE_SCHEMA") )||  
				  json.getString("TABLE_NM") == null      || "".equals(json.getString("TABLE_NM")) ||
				  json.getString("TABLE_SCHEMA") == null  || "".equals(json.getString("TABLE_SCHEMA")) )
			{
				throw new SystemFailException("입력값에 오류가 발생했습니다.");
				
			}
			
			Schema = json.getString("TABLE_SCHEMA");
			target_table = json.getString("TABLE_SCHEMA") + "." + json.getString("TABLE_NM");
			action_type = json.getString("ACTION_TYPE");
			
			if( action_type != null && !"".equals(action_type) ){
				if("SPACE_ANALY_SIDO".equals(action_type)){
					query += "Select ";
					query += "(Select ST_X(ST_Centroid(geom)) From KOSTAT.bnd_sido_pg B Where B.sido_cd = A.cd) as x ";
					query += ",(Select ST_Y(ST_Centroid(geom)) From KOSTAT.bnd_sido_pg B Where B.sido_cd = A.cd) as y ";
					query += "From ";
					query += target_table + " A ";
					query += "limit 1";
				}else{
					query += "Select ";
					query += "(Select ST_X(ST_Centroid(geom)) From KOSTAT.bnd_sigungu_pg B Where B.sigungu_cd = A.cd) as x ";
					query += ",(Select ST_Y(ST_Centroid(geom)) From KOSTAT.bnd_sigungu_pg B Where B.sigungu_cd = A.cd) as y ";
					query += "From ";
					query += target_table + " A ";
					query += "limit 1";
				}
			}
			
			Schema = RequestKey.POSTGRE;
			res = client.executeQuery( Schema, query );
			
			if( !"SUCCESS".equals(res.get("RESULT")) ){
				logger.debug( ""+res.get("MESSAGE") );
				return res;
			}
		} catch (SystemFailException e) {
			logger.info(e.getMessage());
			return res;
		} catch (Exception e) {
			logger.info(e.getMessage());	
			return res;
		}
		
		return res;
	}
	
}
 