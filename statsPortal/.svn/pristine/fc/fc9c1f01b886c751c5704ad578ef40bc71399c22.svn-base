package kostat.sop.ServiceAPI.controller.view;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONString;
import org.json.simple.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kostat.sop.ServiceAPI.controller.service.IndoorService;
import kostat.sop.ServiceAPI.controller.service.KosisApiService;

/**
 * 1. 기능 : kosis 데이터 API 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     2021.05.25	wavus 초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : wavus
 * @version 1.0
 * @see
 * <p/>
 */
@Controller
//@RequestMapping(value="/kosisApi") API 배포시 운영서버
@RequestMapping(value="/view/kosisApi") //개발서버
public class KosisApiController {
	private static final String PROPERTY_PATH = "/globals.properties";
	
	/**
	  * @Method Name : getTotsurvKosisData
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 총조사 데이터 조회
	*/
	public String getTotSurvStatValidateParams(@RequestParam HashMap<String, Object> paramMap) throws JSONException 	{
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		ResultSet rs = null;
		
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String serverURL = props.getProperty("Globals.ETLDB.serverURL");
			String id = props.getProperty("Globals.ETLDB.id");
			String pw = props.getProperty("Globals.ETLDB.pw");
			
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			con = DriverManager.getConnection(serverURL, id, pw);			
			
			String orgId = (String) paramMap.get("org_id_list");				// 조직코드
			String[] tblId = paramMap.get("tbl_id_list").equals("") 
					? new String[0] 
					: ((String) paramMap.get("tbl_id_list")).split(",");	//	표특성항목 리스트
			
			String sql = "";
			
			sql += "	SELECT				"
					+ "		ORG_ID			"	// 조직번호
					+ "		, TBL_ID		"	// 통계표ID
					+ "		, OBJ_VAR_ID	"	// 대상항목분류
					+ "		, SCR_KOR		"	// 대상항목분류
					+ "		, VAR_ORD_SN	"	// 변수순서
					+ "	FROM TN_OBJ_ITM_CLS	"
					+ " WHERE ORG_ID = '" + orgId + "'";
			if(tblId.length == 1) {
				sql += "	  AND TBL_ID = '" + tblId[0] + "'";
			} else {
				sql += "	  AND TBL_ID IN (";
				for(int i=0; i<tblId.length; i++) {
					if(i == 0) {
						sql += "'" + tblId[i] + "'";
					} else {
						sql += ",'" + tblId[i] + "'";
					}
				}
				sql += ")";
			}
			//System.out.println("getTotSurvStatValidateParams : "+ sql);
			st = con.prepareStatement(sql);
			rs = st.executeQuery();
			
			while (rs.next()) {
				JSONObject  jo  = new JSONObject();
				ResultSetMetaData rmd = rs.getMetaData();
				
				for(int i=1; i<=rmd.getColumnCount(); i++ ){
					jo.put(rmd.getColumnName(i),rs.getString(rmd.getColumnName(i)));
				}
				resultData.put(jo);
			}
			
		} catch (SQLException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("SQLException Occured");
			resultData.put(e);
		} catch (ClassNotFoundException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("ClassNotFoundException Occured");
			resultData.put(e);
		} catch (IOException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("IOException Occured");
			resultData.put(e);
		} finally {
			if(st != null) try {st.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(rs != null) try {rs.close();} catch (SQLException e) {
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
		}
		
		return resultData.toString();
	}
	/**
	  * @Method Name : getTotsurvKosisData
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 총조사 데이터 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/TotsurvStatData.do", produces="application/json;charset=UTF-8")
	public String getTotsurvKosisData(@RequestParam HashMap<String, Object> paramMap) throws JSONException 	{
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		ResultSet rs = null;
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String serverURL = props.getProperty("Globals.ETLDB.serverURL");
			String id = props.getProperty("Globals.ETLDB.id");
			String pw = props.getProperty("Globals.ETLDB.pw");
			
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			con = DriverManager.getConnection(serverURL, id, pw);
			String[] surv_year_list = paramMap.get("surv_year_list").equals("") 
					? new String[0] 
					: ((String) paramMap.get("surv_year_list")).split(",");	//	수록시점
			String[] org_id_list = paramMap.get("org_id_list").equals("") ? new String[0] : ((String) paramMap.get("org_id_list")).split(",");			//	조직번호
			String[] tbl_id_list = paramMap.get("tbl_id_list").equals("") ? new String[0] : ((String) paramMap.get("tbl_id_list")).split(",");			//	통계표 ID
			String[] char_itm_id_list = paramMap.get("char_itm_id_list").equals("") 
					? new String[0] 
					: ((String) paramMap.get("char_itm_id_list")).split(",");	//	표특성항목 리스트
			String[] adm_cd = paramMap.get("adm_cd").equals("") 
					? new String[0] 
					: ((String) paramMap.get("adm_cd")).split(":");	//	행정구역 코드	
			String adm_unit = (String) paramMap.get("adm_unit");				//상위코드(분류, 지역)
			String[] list_var_ord_list = paramMap.get("list_var_ord_list").equals("")
					? new String[0] 
					: ((String) paramMap.get("list_var_ord_list")).split(",");	// 차트화 될 대상 리스트
			List<String[]> ov_lv_list = new ArrayList<String[]>();
			String up_itm_id = (String) paramMap.get("up_itm_id");				//상위코드(분류, 지역)
			String prt_type = (String) paramMap.get("prt_type");				//카테고리
			String category = (String) paramMap.get("category");				//카테고리
			ov_lv_list.add(paramMap.get("ov_l1_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l1_list")).split(","));			//	항목 1
			ov_lv_list.add(paramMap.get("ov_l2_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l2_list")).split(","));			//	항목 2
			ov_lv_list.add(paramMap.get("ov_l3_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l3_list")).split(","));			//	항목 3
			ov_lv_list.add(paramMap.get("ov_l4_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l4_list")).split(","));			//	항목 4
			ov_lv_list.add(paramMap.get("ov_l5_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l5_list")).split(","));			//	항목 	
			String odr_col_list = (String) paramMap.get("odr_col_list");					//	order by 조건
			String odr_type = (String) paramMap.get("odr_type");					//	order by 조건
			String ftn_val_lv = "", ftn_val_at = "";
			if((String) paramMap.get("ftn_val_lv") != "" && paramMap.get("ftn_val_lv") != null) {
				ftn_val_lv = (String) paramMap.get("ftn_val_lv");
			}
			if((String) paramMap.get("ftn_val_at") != "" && paramMap.get("ftn_val_at") != null) {
				ftn_val_at = (String) paramMap.get("ftn_val_at");
			}

			int row_num = 0;
			if(paramMap.get("row_num") != null) {
				row_num = Integer.parseInt((String)paramMap.get("row_num"));		//	받을 행 개수
			}
			
			org.json.JSONArray jArr = new org.json.JSONArray(getTotSurvStatValidateParams(paramMap));
			Boolean resultValid = true;
			for(int i=0; i<jArr.length(); i++) {
				org.json.JSONObject	jObj = jArr.getJSONObject(i);
				if(jObj.getString("VAR_ORD_SN").equals("0")) {
					if(char_itm_id_list.length == 0) {
						resultData.put("error: char_itm_id_list 값은 필수 입니다.");
					}
				} else {
					for(int j=0;j<ov_lv_list.size(); j++) {
						if(jObj.getString("VAR_ORD_SN").equals(String.valueOf(j+1))) {
							if(ov_lv_list.get(j).length == 0) {
								if((jObj.getString("SCR_KOR").indexOf("행정") != -1 ||
										jObj.getString("SCR_KOR").indexOf("시도") != -1 ||
										jObj.getString("SCR_KOR").indexOf("시군구") != -1 ||
										jObj.getString("SCR_KOR").indexOf("읍면동") != -1) ||
										jObj.getString("OBJ_VAR_ID").indexOf("SGG") != -1) { 
									if(adm_cd.length == 0) {
										resultData.put("error: ov_l" + String.valueOf(j+1) + "_list 또는 adm_cd 값(지역)은 필수 입니다."); 
										resultValid = false; 
									} 
								} else {
									resultData.put("error: ov_l" + String.valueOf(j+1) + "_list 값은 필수 입니다.");
									resultValid = false;
								}
							}
						}
					}
				}
			}
			  
			if(!resultValid) { return resultData.toString(); }
			 
			//JSONArray jArry = jObj.getJSONArray();
			//JSONString validParams = (JSONString) 
			//System.out.println("validation Check!!!: " + getTotSurvStatValidateParams(paramMap));
			
			String sql = "";

			sql += "	WITH LST AS (	"; 
			sql += "    	SELECT	";
			sql += "      	  LST.ORG_ID, LST.TBL_ID, LST.VAR_LVL_CO, LST.OBJ_VAR_ID, LST.ITM_ID, LST.UP_ITM_ID, LST.CHAR_ITM_SN "; 
			sql += "     	   , LST.SCR_KOR, LST.SCR_ENG, LST.STD_GRP_CD_ID, LST.STD_CD_CN, LST.REF_CD_CN, LST.UNIT_ID, LST.ITM_KD, CLS.VAR_ORD_SN, CLS.LVL_CO ";
			sql += "    	FROM ( SELECT * FROM TN_ITM_LIST WHERE 1=1	";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			sql += "			) LST,	";
			sql += "			( SELECT * FROM TN_OBJ_ITM_CLS WHERE 1=1	";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			sql += "			) CLS	";
			sql += "    	WHERE LST.ORG_ID = CLS.ORG_ID";
			sql += "      	  AND LST.TBL_ID = CLS.TBL_ID";
			sql += "      	  AND LST.VAR_LVL_CO = CLS.VAR_LVL_CO"; 
			sql += "      	  AND LST.OBJ_VAR_ID = CLS.OBJ_VAR_ID";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND LST.ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND LST.ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND LST.TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND LST.TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			sql += "	)";
			if(ftn_val_lv != "") {
				sql += " SELECT * FROM ( ";
			}
			sql += "	SELECT";
			sql += "    	DIM.ITM_RCGN_SN, DIM.ORG_ID, DIM.TBL_ID, DIM.ITM_LVL_CO, LST.OBJ_VAR_ID";
			sql += "		, DIM.CHAR_ITM_ID, LST.CHAR_ITM_SN, DT.PRD_DE, DT.SMBL_CN";
			sql += "		, ("
					+ "			SELECT SCR_KOR						"
					+ "			FROM LST							"
					+ "			WHERE ORG_ID = DIM.ORG_ID			"
					+ "			  AND TBL_ID = DIM.TBL_ID			"
					+ "			  AND ITM_ID = DIM.CHAR_ITM_ID		"
					+ "			  AND OBJ_VAR_ID = CLS.OBJ_VAR_ID	"
					+ "		) AS CHAR_ITM_NM, DIM.CUR_LVL_CO";
			for(int i=0; i<ov_lv_list.size(); i++) { // 현재 항목 최다가 5Lv
				int idx = i+1;
				if(adm_cd.length > 0) {
					if(String.valueOf(idx).equals(adm_cd[0].substring(1,2))) {
						sql += "    	, ( SELECT SCR_KOR FROM LST WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID ";
						sql += "			AND ITM_ID = DIM.OV_L" + idx + "_ID AND VAR_ORD_SN = '" + idx + "' ) AS UP_ADM_KOR";
						sql += "		, ( SELECT DECODE(UP_ITM_ID, NULL, DECODE(ITM_ID, '00', NULL, '00'), UP_ITM_ID) FROM lst";
						sql += "		  	WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + idx + "_ID ";
						sql += "		AND VAR_ORD_SN = '" + idx + "' ) AS UP_ADM_CD";
						sql += "		, DIM.OV_L" + idx + "_CO AS ADM_CO, DIM.OV_L" + idx + "_ID AS ADM_CD";
						sql += "    	, ( SELECT VAR_ORD_SN FROM LST";
						sql += "			WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + idx + "_ID ";
						sql += "		AND VAR_ORD_SN = '" + idx + "' ) AS ADM_ORD";
						sql += "    	, ( SELECT SCR_KOR FROM LST";
						sql += "			WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + idx + "_ID";
						sql += "		AND VAR_ORD_SN = '" + idx + "' ) AS ADM_KOR";
					}
				}
				sql += "    	, ( SELECT SCR_KOR FROM LST";
				sql += "			WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = ";
				sql += "				( SELECT UP_ITM_ID FROM lst";
				sql += "			  	WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + idx + "_ID AND VAR_ORD_SN = '" + idx + "' )";
				sql += "			AND VAR_ORD_SN = '" + idx + "' ) AS OV_L" + idx + "_UP_ITM_KOR";
				sql += "		, ( SELECT DECODE(UP_ITM_ID, NULL, DECODE(ITM_ID, '00', NULL, '00'), UP_ITM_ID) FROM lst";
				sql += "		  	WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + idx + "_ID AND VAR_ORD_SN = '" + idx + "' ) AS OV_L" + idx + "_UP_ITM_ID";
				sql += "		, DIM.OV_L" + idx + "_CO, DIM.OV_L" + idx + "_ID";
				sql += "    	, ( SELECT VAR_ORD_SN FROM LST";
				sql += "			WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + idx + "_ID AND VAR_ORD_SN = '" + idx + "' ) AS OV_L" + idx + "_ORD";
				sql += "    	, ( SELECT SCR_KOR FROM LST";
				sql += "			WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + idx + "_ID AND VAR_ORD_SN = '" + idx + "' ) AS OV_L" + idx + "_KOR";
				sql += "		, ("
						+ "			SELECT CHAR_ITM_SN"
						+ "			FROM LST"
						+ "			WHERE ORG_ID = DIM.ORG_ID"
						+ "			  AND TBL_ID = DIM.TBL_ID"
						+ "			  AND ITM_ID = DIM.OV_L" + idx + "_ID"
						+ "			  AND VAR_ORD_SN = '" + idx + "'"
						+ "		) AS OV_L" + idx + "_SN";
			}			
			sql += "		, NVL(NVL(DT.DTVAL_CO, DT.DTVAL_CN), 0) AS DTVAL_CO ";
			if(ftn_val_lv != "") {
				sql += "		, (SELECT FTN_VAL_AT FROM TN_ITM_LIST WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND ITM_ID = DIM.OV_L" + ftn_val_lv + "_ID";
				sql += "	AND FTN_VAL_AT = 'Y' ) AS FTN_VAL_AT ";
			}
			sql += "	FROM ( SELECT * FROM TN_DIM WHERE 1=1	";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			sql += "			) DIM,	";
			sql += "		( SELECT * FROM TN_DT WHERE 1=1	";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			sql += "			) DT,	";
			sql += "		( SELECT * FROM TN_ITM_LIST WHERE 1=1	";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			sql += "			) LST,	";
			sql += "		( SELECT * FROM TN_OBJ_ITM_CLS WHERE 1=1	";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			sql += "			) CLS	";
			sql += "	WHERE DIM.ORG_ID = DT.ORG_ID";
			sql += "	  AND DIM.TBL_ID = DT.TBL_ID";
			sql += "	  AND DIM.ORG_ID = LST.ORG_ID"; 
			sql += "	  AND DIM.TBL_ID = LST.TBL_ID";
			sql += "	  AND DIM.CHAR_ITM_ID = LST.ITM_ID";
			if(list_var_ord_list.length > 0) {
				sql += "	  AND LST.OBJ_VAR_ID IN (	";
				for(int i=0; i<list_var_ord_list.length; i++) {
					if(i > 0) {
						sql += "	, '" + list_var_ord_list[i] + "'";
					} else {
						sql += "	'" + list_var_ord_list[i] + "'";
					}
				}
				sql += "	)								";
			}
			sql += "	  AND LST.ORG_ID = CLS.ORG_ID"; 
			sql += "	  AND LST.TBL_ID = CLS.TBL_ID";
			sql += "	  AND LST.OBJ_VAR_ID = CLS.OBJ_VAR_ID";
			sql += "	  AND DIM.ITM_RCGN_SN = DT.ITM_RCGN_SN";
			sql += "	  AND DIM.USE_YN = 'Y'";
			if(org_id_list.length > 0) {
				if(org_id_list.length == 1) {
					sql += "	  AND DIM.ORG_ID = '" + org_id_list[0] + "'";
				} else {
					sql += "	  AND DIM.ORG_ID IN (";
					for(int i=0; i<org_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + org_id_list[i] + "'";
						} else {
							sql += ",'" + org_id_list[i] + "'";
						}
					}
					sql += ")";
				}				
			}
			
			if(tbl_id_list.length > 0) {
				if(tbl_id_list.length == 1) {
					sql += "	  AND DIM.TBL_ID = '" + tbl_id_list[0] + "'";
				} else {
					sql += "	  AND DIM.TBL_ID IN (";
					for(int i=0; i<tbl_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + tbl_id_list[i] + "'";
						} else {
							sql += ",'" + tbl_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}

			if(char_itm_id_list.length > 0) {
				if(char_itm_id_list.length == 1) {
					sql += "	 AND DIM.CHAR_ITM_ID = '" + char_itm_id_list[0] + "'";
				} else {
					sql += "	 AND DIM.CHAR_ITM_ID IN (";
					for(int i=0; i<char_itm_id_list.length; i++) {
						if(i == 0) {
							sql += "'" + char_itm_id_list[i] + "'";
						} else {
							sql += ",'" + char_itm_id_list[i] + "'";
						}
					}
					sql += ")";
				}
			}
			
			if(surv_year_list.length > 0) {
				if(surv_year_list.length == 1) {
					sql += "	 AND DT.PRD_DE = '" + surv_year_list[0] + "'";
				} else {
					sql += "	 AND DT.PRD_DE IN (";
					for(int i=0; i<surv_year_list.length; i++) {
						if(i == 0) {
							sql += "'" + surv_year_list[i] + "'";
						} else {
							sql += ",'" + surv_year_list[i] + "'";
						}
					}
					sql += ")";
				}				
			}

			for(int i=0; i<ov_lv_list.size(); i++) { // 현재 항목 최다가 5Lv				
				int idx = i+1;
				if(adm_cd.length > 0) {
					if(String.valueOf(idx).equals(adm_cd[0].substring(1,2))) {
						if(adm_unit != null) {
							if(adm_unit.equals("sgg")) {
								sql += "		AND DIM.OV_L" + idx + "_ID IN (";
								sql += "			SELECT ITM_ID";
								sql += "			FROM LST WHERE 1=1";
								if(org_id_list.length > 0) {
									if(org_id_list.length == 1) {
										sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
									} else {
										sql += "	  AND ORG_ID IN (";
										for(int j=0; j<org_id_list.length; i++) {
											if(i == 0) {
												sql += "'" + org_id_list[j] + "'";
											} else {
												sql += ",'" + org_id_list[j] + "'";
											}
										}
										sql += ")";
									}				
								}
								if(tbl_id_list.length > 0) {
									if(tbl_id_list.length == 1) {
										sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
									} else {
										sql += "	  AND TBL_ID IN (";
										for(int j=0; j<tbl_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + tbl_id_list[j] + "'";
											} else {
												sql += ",'" + tbl_id_list[j] + "'";
											}
										}
										sql += ")";
									}
								}
								sql += "			  AND VAR_ORD_SN = '" + idx + "'";
								if(prt_type.equals("total")) {
									sql += "			  	 AND ITM_ID LIKE '____0'";
								} else {
									sql += "			  	 AND ITM_ID LIKE '" + adm_cd[1].substring(0,2) + "%'";
								}
								sql += "			  AND LENGTH(ITM_ID) = 5";
								sql += "	)";
							} else if(adm_unit.equals("atdrc")) {
								sql += "		AND DIM.OV_L" + idx + "_ID IN (";
								sql += "			SELECT ITM_ID";
								sql += "			FROM LST WHERE 1=1";
								if(org_id_list.length > 0) {
									if(org_id_list.length == 1) {
										sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
									} else {
										sql += "	  AND ORG_ID IN (";
										for(int j=0; j<org_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + org_id_list[j] + "'";
											} else {
												sql += ",'" + org_id_list[j] + "'";
											}
										}
										sql += ")";
									}				
								}
								if(tbl_id_list.length > 0) {
									if(tbl_id_list.length == 1) {
										sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
									} else {
										sql += "	  AND TBL_ID IN (";
										for(int j=0; j<tbl_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + tbl_id_list[j] + "'";
											} else {
												sql += ",'" + tbl_id_list[j] + "'";
											}
										}
										sql += ")";
									}
								}
								sql += "			  AND ITM_ID IN (";
								sql += "			  	SELECT ITM_ID";
								sql += "			FROM LST WHERE 1=1";
								if(org_id_list.length > 0) {
									if(org_id_list.length == 1) {
										sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
									} else {
										sql += "	  AND ORG_ID IN (";
										for(int j=0; j<org_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + org_id_list[j] + "'";
											} else {
												sql += ",'" + org_id_list[j] + "'";
											}
										}
										sql += ")";
									}				
								}
								if(tbl_id_list.length > 0) {
									if(tbl_id_list.length == 1) {
										sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
									} else {
										sql += "	  AND TBL_ID IN (";
										for(int j=0; j<tbl_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + tbl_id_list[j] + "'";
											} else {
												sql += ",'" + tbl_id_list[j] + "'";
											}
										}
										sql += ")";
									}
								}								
								sql += "			     AND VAR_ORD_SN = '" + idx + "'";
								if(prt_type.equals("total")) {
									sql += "			  	 AND NOT ITM_ID LIKE '____0'";
								} else {
									sql += "			  	 AND ITM_ID LIKE '" + adm_cd[1] + "%'";
								}
								sql += "			  	 AND LENGTH(ITM_ID) = 5";
								sql += "			  )";
								sql += "		)";
							} else if(adm_unit.equals("emd")) {
								sql += "		AND NOT DIM.OV_L" + idx + "_ID IN (";
								sql += "			SELECT ITM_ID";
								sql += "			FROM LST WHERE 1=1";
								if(org_id_list.length > 0) {
									if(org_id_list.length == 1) {
										sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
									} else {
										sql += "	  AND ORG_ID IN (";
										for(int j=0; j<org_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + org_id_list[j] + "'";
											} else {
												sql += ",'" + org_id_list[j] + "'";
											}
										}
										sql += ")";
									}				
								}
								if(tbl_id_list.length > 0) {
									if(tbl_id_list.length == 1) {
										sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
									} else {
										sql += "	  AND TBL_ID IN (";
										for(int j=0; j<tbl_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + tbl_id_list[j] + "'";
											} else {
												sql += ",'" + tbl_id_list[j] + "'";
											}
										}
										sql += ")";
									}
								}
								sql += "			  AND ITM_ID IN (";
								sql += "			  	SELECT ITM_ID";
								sql += "			FROM LST WHERE 1=1";
								if(org_id_list.length > 0) {
									if(org_id_list.length == 1) {
										sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
									} else {
										sql += "	  AND ORG_ID IN (";
										for(int j=0; j<org_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + org_id_list[j] + "'";
											} else {
												sql += ",'" + org_id_list[j] + "'";
											}
										}
										sql += ")";
									}				
								}
								if(tbl_id_list.length > 0) {
									if(tbl_id_list.length == 1) {
										sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
									} else {
										sql += "	  AND TBL_ID IN (";
										for(int j=0; j<tbl_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + tbl_id_list[j] + "'";
											} else {
												sql += ",'" + tbl_id_list[j] + "'";
											}
										}
										sql += ")";
									}
								}
								sql += "			     AND VAR_ORD_SN = '" + idx + "'";
								sql += "			  	 AND NVL(UP_ITM_ID, '00') == '00'";
								sql += "			  )";
								sql += "		)";
							} else {
								//sql += "	  AND (DIM.OV_L" + idx + "_ID = '" + adm_cd[1] + "' OR DIM.OV_L" + idx + "_ID IN (";
								sql += "	  AND DIM.OV_L" + idx + "_ID IN (";
								sql += "			SELECT ITM_ID";
								sql += "			FROM LST WHERE 1=1";
								if(org_id_list.length > 0) {
									if(org_id_list.length == 1) {
										sql += "	  AND ORG_ID = '" + org_id_list[0] + "'";
									} else {
										sql += "	  AND ORG_ID IN (";
										for(int j=0; j<org_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + org_id_list[j] + "'";
											} else {
												sql += ",'" + org_id_list[j] + "'";
											}
										}
										sql += ")";
									}				
								}
								if(tbl_id_list.length > 0) {
									if(tbl_id_list.length == 1) {
										sql += "	  AND TBL_ID = '" + tbl_id_list[0] + "'";
									} else {
										sql += "	  AND TBL_ID IN (";
										for(int j=0; j<tbl_id_list.length; j++) {
											if(i == 0) {
												sql += "'" + tbl_id_list[j] + "'";
											} else {
												sql += ",'" + tbl_id_list[j] + "'";
											}
										}
										sql += ")";
									}
								}
								sql += "			  AND VAR_ORD_SN = '" + idx + "'";
								//sql += "			  AND NVL(UP_ITM_ID, '00') = '" + adm_cd[1] + "'";
								
								/**/
								String[] adm_cd_arr = adm_cd[1].split(",");
								
								if(adm_cd_arr.length == 1) {
									sql += "			  AND NVL(UP_ITM_ID, '00') = '" + adm_cd[1] + "'";
								}else {
									sql += "			  AND NVL(UP_ITM_ID, '00') IN (";
									if(tbl_id_list.length > 0) {
										for(int j=0; j<tbl_id_list.length; j++) {
											if(tbl_id_list[j].equals("DT_1NW1003") || tbl_id_list[j].equals("DT_1NW1005") || tbl_id_list[j].equals("DT_1NW1006") || tbl_id_list[j].equals("DT_1NW1014")|| tbl_id_list[j].equals("DT_1NW1016")
											 || tbl_id_list[j].equals("DT_1NW1017") || tbl_id_list[j].equals("DT_1NW1018") || tbl_id_list[j].equals("DT_1NW1020") || tbl_id_list[j].equals("DT_1NW1021") || tbl_id_list[j].equals("DT_1NW1022") || tbl_id_list[j].equals("DT_1NW1023")
											  || tbl_id_list[j].equals("DT_1NW1024") || tbl_id_list[j].equals("DT_1NW1025") || tbl_id_list[j].equals("DT_1NW1026") || tbl_id_list[j].equals("DT_1NW1027") || tbl_id_list[j].equals("DT_1NW1028") || tbl_id_list[j].equals("DT_1NW1029")
											   || tbl_id_list[j].equals("DT_1NW1030") || tbl_id_list[j].equals("DT_1NW1031") || tbl_id_list[j].equals("DT_1NW1035") || tbl_id_list[j].equals("DT_1NW2003") || tbl_id_list[j].equals("DT_1NW2011") || tbl_id_list[j].equals("DT_1NW2013")
											    || tbl_id_list[j].equals("DT_1NW2014") || tbl_id_list[j].equals("DT_1NW2015") || tbl_id_list[j].equals("DT_1NW2017") || tbl_id_list[j].equals("DT_1NW2018") || tbl_id_list[j].equals("DT_1NW2019") || tbl_id_list[j].equals("DT_1NW2020")
											     || tbl_id_list[j].equals("DT_1NW2021") || tbl_id_list[j].equals("DT_1NW2022") || tbl_id_list[j].equals("DT_1NW2023") || tbl_id_list[j].equals("DT_1NW2025") || tbl_id_list[j].equals("DT_1NW2026") || tbl_id_list[j].equals("DT_1NW2027")
											   	  || tbl_id_list[j].equals("DT_1NW2028") || tbl_id_list[j].equals("DT_1NW3003") || tbl_id_list[j].equals("DT_1NW3011") || tbl_id_list[j].equals("DT_1NW3013") || tbl_id_list[j].equals("DT_1NW3014") || tbl_id_list[j].equals("DT_1NW3015")
											       || tbl_id_list[j].equals("DT_1NW3017") || tbl_id_list[j].equals("DT_1NW3018") || tbl_id_list[j].equals("DT_1NW3019") || tbl_id_list[j].equals("DT_1NW3020") || tbl_id_list[j].equals("DT_1NW3021") || tbl_id_list[j].equals("DT_1NW3022")
												    || tbl_id_list[j].equals("DT_1NW3023") || tbl_id_list[j].equals("DT_1NW3025") || tbl_id_list[j].equals("DT_1NW3026") || tbl_id_list[j].equals("DT_1NW3027") || tbl_id_list[j].equals("DT_1NW3028")){
												//sql += " OR DIM.OV_L" + idx + "_ID = '"+ ov_lv_list.get(0)[0] +"'";
												sql += "'00',";
											}
										}
									}
									for(int m =0; m < adm_cd_arr.length; m++) {
										if(m > 0) {
											sql += ",";
										}
										sql +="'" + adm_cd_arr[m] + "'";
									}
									sql += ")";
								}
								
								//if(category.equals("ecnmy")) {
								//	sql += "		  AND	OBJ_VAR_ID = 'B' ";
								//}
								/* 특성별 통계 목록 지도 그릴때 전국 합계가 필요하므로 조건문 추가 csy 
								 * 특성별 통계 목록은 시도별 데이터만 조회하기로함 - 시도 : '2' + 일반 시도코드, 전국 : 000)
								 */
								//sql += "	))";
								sql += "	)";
								
								
								/* 특성별 통계 목록 지도 그릴때 전국 합계가 필요하므로 조건문 추가 csy */
								
								//sql += "	)";
								
								
								
							}
						} else {
							if(ov_lv_list.get(i).length == 1) {							
								if(ov_lv_list.get(i)[0].indexOf("up:") != -1) {
									sql += "	  AND DIM.OV_L" + idx + "_ID IN (";
									sql += "			SELECT ITM_ID";
									sql += "			FROM LST WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND OBJ_VAR_ID = LST.OBJ_VAR_ID";
									sql += "			  AND VAR_ORD_SN = '" + idx + "'";
									sql += "			  AND NVL(UP_ITM_ID, '00') = '" + ov_lv_list.get(i)[0].split(":")[1] + "'";
									sql += "	)";
								} else {
									sql += "	  AND DIM.OV_L" + idx + "_ID = '" + ov_lv_list.get(i)[0] + "'";
								}							
							} else if(ov_lv_list.get(i).length > 1) {
								sql += "	  AND DIM.OV_L" + idx + "_ID IN (";
								for(int j=0; j<ov_lv_list.get(i).length; j++) {
									if(j > 0) {
										sql += "	, '" + ov_lv_list.get(i)[j] + "'";
									} else {
										sql += "	'" + ov_lv_list.get(i)[j] + "'";
									}
								}
								sql += "	  )";
							} else {
								sql += " AND DIM.OV_" + adm_cd[0].substring(0,2).toUpperCase() + "_ID IN (";
								sql += "			SELECT ITM_ID";
								sql += "			FROM LST WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND OBJ_VAR_ID = LST.OBJ_VAR_ID";
								sql += "			  AND VAR_ORD_SN = '" + idx + "'";
								sql += "			  AND NVL(UP_ITM_ID, '00') = '" + adm_cd[1] + "'";
								sql += "	)";
							}
						}
					} else {
						if(ov_lv_list.get(i).length == 1) {							
							if(ov_lv_list.get(i)[0].indexOf("up:") != -1) {
								sql += "	  AND DIM.OV_L" + idx + "_ID IN (";
								sql += "			SELECT ITM_ID";
								sql += "			FROM LST WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND OBJ_VAR_ID = LST.OBJ_VAR_ID";
								sql += "			  AND VAR_ORD_SN = '" + idx + "'";
								sql += "			  AND NVL(UP_ITM_ID, '00') = '" + ov_lv_list.get(i)[0].split(":")[1] + "'";
								sql += "	)";
							} else {
								sql += "	  AND DIM.OV_L" + idx + "_ID = '" + ov_lv_list.get(i)[0] + "'";
							}							
						} else if(ov_lv_list.get(i).length > 1) {
							sql += "	  AND DIM.OV_L" + idx + "_ID IN (";
							for(int j=0; j<ov_lv_list.get(i).length; j++) {
								if(j > 0) {
									sql += "	, '" + ov_lv_list.get(i)[j] + "'";
								} else {
									sql += "	'" + ov_lv_list.get(i)[j] + "'";
								}
							}
							sql += "	  )";
						}
					}
				} else {
					if(ov_lv_list.get(i).length == 1) {
						if(ov_lv_list.get(i)[0].indexOf("up:") != -1) {
							sql += "	  AND DIM.OV_L" + idx + "_ID IN (";
							sql += "			SELECT ITM_ID";
							sql += "			FROM LST WHERE ORG_ID = DIM.ORG_ID AND TBL_ID = DIM.TBL_ID AND OBJ_VAR_ID = LST.OBJ_VAR_ID";
							sql += "			  AND VAR_ORD_SN = '" + idx + "'";
							sql += "			  AND NVL(UP_ITM_ID, '00') = '" + ov_lv_list.get(i)[0].split(":")[1] + "'";
							sql += "	)";
						} else {
							sql += "	  AND DIM.OV_L" + idx + "_ID = '" + ov_lv_list.get(i)[0] + "'";
						}
					} else if(ov_lv_list.get(i).length > 1) {
						sql += "	  AND DIM.OV_L" + idx + "_ID IN (";
						for(int j=0; j<ov_lv_list.get(i).length; j++) {
							if(j > 0) {
								sql += "	, '" + ov_lv_list.get(i)[j] + "'";
							} else {
								sql += "	'" + ov_lv_list.get(i)[j] + "'";
							}
						}
						sql += "	  )";
					}
				}
			}
			
			if(ftn_val_lv != "") {
				sql += " AND FTN_VAL_AT = '" + ftn_val_at + "' ";
			}
			
			if(row_num != 0) {
				if(row_num > 2000) {
					row_num = 2000;
				}
				sql += "	AND ROWNUM <= " + row_num;
			}
			
			if (odr_col_list != null) {
				if(odr_col_list != "") {
					sql += "	order by " + odr_col_list;
				}				
			}
			
			if (odr_type != null) {
				if(odr_type != "") {
					sql += "	" + odr_type;
				}
			}
			
			//System.out.println("쿼리 : "+ sql);
			
			
			st = con.prepareStatement(sql);
			rs = st.executeQuery();
			if(row_num != 0) {
				st.setInt(1, row_num);
			}
			
			while (rs.next()) {
				JSONObject  jo  = new JSONObject();
				ResultSetMetaData rmd = rs.getMetaData();
				
				for(int i=1; i<=rmd.getColumnCount(); i++ ){
					jo.put(rmd.getColumnName(i),rs.getString(rmd.getColumnName(i)));
				}
				resultData.put(jo);
			}
			
		} catch (SQLException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("SQLException Occured");
			resultData.put(e);
		} catch (ClassNotFoundException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("ClassNotFoundException Occured");
			resultData.put(e);
		} catch (IOException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("IOException Occured");
			resultData.put(e);
		} finally {
			if(st != null) try {st.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(rs != null) try {rs.close();} catch (SQLException e) {
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
		}
		
		return resultData.toString();
	}
	
	
	
	
	/**
	  * @Method Name : getListStblCategories
	  * @작성일 : 2021. 11. 18.
	  * @작성자 : lyh
	  * @변경이력 : 
	  * @Method 설명 : 총조사 카테고리
	*/
	@ResponseBody
	@RequestMapping(value = "/getListStblCategories.do", produces="application/json;charset=UTF-8")
	public String getListStblCategories(@RequestParam HashMap<String, Object> paramMap) throws JSONException {
		
		long beforeTime = System.currentTimeMillis();
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		ResultSet rs = null;
		
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String serverURL = props.getProperty("Globals.ETLDB.serverURL");
			String id = props.getProperty("Globals.ETLDB.id");
			String pw = props.getProperty("Globals.ETLDB.pw");
			
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			con = DriverManager.getConnection(serverURL, id, pw);			
					
			String sql = "";

			sql += "	SELECT STAT_NM FROM V_LIST_STBL_KOSIS	" + 
					"	WHERE VW_CD = 'MT_ZTITLE'				" + 
					"	AND ORG_ID = '101'						" + 
					"	GROUP BY STAT_NM						" + 
					"	ORDER BY STAT_NM ASC					";
			
			//System.out.println("getListStblCategories : " + sql);
			
			st = con.prepareStatement(sql);
			rs = st.executeQuery(sql);
			
			
			while (rs.next()) {
				JSONObject  jo  = new JSONObject();
				ResultSetMetaData rmd = rs.getMetaData();
				
				for(int i=1; i<=rmd.getColumnCount(); i++ ){
					jo.put(rmd.getColumnName(i),rs.getString(rmd.getColumnName(i)));
				}
				resultData.put(jo);
			}
			
		} catch (SQLException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("SQLException Occured");
			resultData.put(e);
		} catch (ClassNotFoundException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("ClassNotFoundException Occured");
			resultData.put(e);
		} catch (IOException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("IOException Occured");
			resultData.put(e);
		} finally {
			if(st != null) try {st.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(rs != null) try {rs.close();} catch (SQLException e) {
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
		}
		
		long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
		long secDiffTime = (afterTime - beforeTime); //두 시간에 차 계산
		System.out.println("시간차이(m) : "+secDiffTime);
		
		return resultData.toString();
	}
	
	

	
	
	/**
	  * @Method Name : getListStblList
	  * @작성일 : 2021. 11. 18.
	  * @작성자 : lyh
	  * @변경이력 : 
	  * @파라미터 : 통계표 카테고리명
	  * @Method 설명 : 총조사 통계표 목록
	*/
	@ResponseBody
	@RequestMapping(value = "/getStblList.do", produces="application/json;charset=UTF-8")
	public String getListStblList(@RequestParam HashMap<String, Object> paramMap) throws JSONException {
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		ResultSet rs = null;
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String serverURL = props.getProperty("Globals.ETLDB.serverURL");
			String id = props.getProperty("Globals.ETLDB.id");
			String pw = props.getProperty("Globals.ETLDB.pw");
			
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			con = DriverManager.getConnection(serverURL, id, pw);			
			
			String category = (String) paramMap.get("category");				//상위코드(분류, 지역)
			
			String sql = "";

			sql += "	SELECT '('||PUB.TBL_ID||')'||PUB.TBL_NM AS TBL_NM			" + 
					"                    , PUB.ORG_ID								" + 	
					"                    , PUB.TBL_ID								" + 
					"                    , PUB.STAT_NM								" + 
					"                    , MAX(CLS.VAR_ORD_SN) AS ITM_LV			" + 
					"                FROM (	SELECT * FROM V_LIST_STBL_PUB			" +
					"						WHERE ORG_ID = '101'					" +
					"						  AND VW_CD = 'MT_ZTITLE'				";
			if(category != "") {
				sql += "				   	  AND STAT_NM LIKE '%" + category + "%'			";
			}					
			sql += "                    ) PUB, TN_OBJ_ITM_CLS CLS						" + 
					"                WHERE PUB.ORG_ID = CLS.ORG_ID(+)				" + 
					"                  AND PUB.TBL_ID = CLS.TBL_ID(+)				" + 
					"                GROUP BY '('|| PUB.TBL_ID|| ')'|| PUB.TBL_NM, PUB.ORG_ID, PUB.TBL_ID , PUB.STAT_NM	";
			
			
			//System.out.println("getListStblList : "+ sql);
			st = con.prepareStatement(sql);
			rs = st.executeQuery();
			
			while (rs.next()) {
				JSONObject  jo  = new JSONObject();
				ResultSetMetaData rmd = rs.getMetaData();
				
				for(int i=1; i<=rmd.getColumnCount(); i++ ){
					jo.put(rmd.getColumnName(i),rs.getString(rmd.getColumnName(i)));
				}
				resultData.put(jo);
			}
			
		} catch (SQLException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("SQLException Occured");
			resultData.put(e);
		} catch (ClassNotFoundException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("ClassNotFoundException Occured");
			resultData.put(e);
		} catch (IOException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("IOException Occured");
			resultData.put(e);
		} finally {
			if(st != null) try {st.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(rs != null) try {rs.close();} catch (SQLException e) {
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
		}
		
		return resultData.toString();
	}
	
	/**
	  * @Method Name : getListStblList
	  * @작성일 : 2021. 11. 18.
	  * @작성자 : lyh
	  * @변경이력 : 
	  * @파라미터 : 통계표 카테고리명
	  * @Method 설명 : 총조사 통계표 목록
	*/
	@ResponseBody
	@RequestMapping(value = "/getStblItmList.do", produces="application/json;charset=UTF-8")
	public String getStblItmList(@RequestParam HashMap<String, Object> paramMap) throws JSONException {
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		ResultSet rs = null;
		
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String serverURL = props.getProperty("Globals.ETLDB.serverURL");
			String id = props.getProperty("Globals.ETLDB.id");
			String pw = props.getProperty("Globals.ETLDB.pw");
			
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			con = DriverManager.getConnection(serverURL, id, pw);			
			
			String orgId = (String) paramMap.get("orgId");				// 조직코드
			String[] stblList = paramMap.get("stblList").equals("") 
					? new String[0] 
					: ((String) paramMap.get("stblList")).split(",");	//	표특성항목 리스트
			
			String sql = "";

			sql += "	WITH LST AS (				";
			sql += "		SELECT					";
			sql += "			LST.ORG_ID,			";
			sql += "			LST.TBL_ID,			";
			sql += "			LST.VAR_LVL_CO, 	";
			sql += "			LST.OBJ_VAR_ID, 	";
			sql += "			LST.ITM_ID,			";
			sql += "			LST.UP_ITM_ID,		";
			sql += "			LST.CHAR_ITM_SN, 	";
			sql += "			LST.SCR_KOR,		";
			sql += "			LST.SCR_ENG,		";
			sql += "			LST.STD_GRP_CD_ID,	";
			sql += "			LST.STD_CD_CN,		";
			sql += "			LST.REF_CD_CN,		";
			sql += "			LST.UNIT_ID,		";
			sql += "			LST.ITM_KD,			";
			sql += "			CLS.VAR_ORD_SN,		";
			sql += "			CLS.LVL_CO			";
			sql += "		FROM (	SELECT * FROM TN_ITM_LIST WHERE ORG_ID='" + orgId + "' AND TBL_ID IN (	";
			for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}     	
	        }
			sql += "		)	) LST,				";
	        sql += "			( SELECT * FROM TN_OBJ_ITM_CLS WHERE ORG_ID='" + orgId + "' AND TBL_ID IN (	";
	        for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}     	
	        }
	        sql += "		)	) CLS	";
	        sql += "		WHERE LST.ORG_ID = CLS.ORG_ID(+)			";
	        sql += "		  AND LST.TBL_ID = CLS.TBL_ID(+)			";
	        sql += "		  AND LST.VAR_LVL_CO = CLS.VAR_LVL_CO(+)			";
	        sql += "		  AND LST.OBJ_VAR_ID = CLS.OBJ_VAR_ID(+)			";
	        sql += "		  AND LST.ORG_ID = '" + orgId + "'				";
	        sql += "	  	  AND LST.TBL_ID IN (	";
	        for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}     	
	        }
	        sql += "		)	";
	        sql += "	)	";
	        sql += "	SELECT				";
	        sql += "		LPAD(' ', 2*(LEVEL-1))||ITM_ID AS ITM_LV		";
	        sql += "		, A.*											";
	        sql += "	FROM	(											";
	        sql += "		SELECT				";
	        sql += "			ITM.ORG_ID		";
	        sql += "			, ITM.TBL_ID	";
	        sql += "			, KOS.TBL_NM	";
	        sql += "			, KOS.STAT_NM	";
	        sql += "			, INF.SVC_URL	";
	        sql += "			, KOS.LIST_NM_PATH	";
	        sql += "			, ITM.OBJ_VAR_ID	";
	        sql += "			, (					";
	        sql += "				SELECT MIN(PRD_DE) FROM TN_RECD_PRD WHERE ORG_ID = '" + orgId + "' AND TBL_ID IN (";
	        for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}      	
	        }
	        sql += "				)				";
	        sql += "			) AS PRD_START_DE	";
	        sql += "			, (					";
	        sql += "				SELECT MAX(PRD_DE) FROM TN_RECD_PRD WHERE ORG_ID = '" + orgId + "' AND TBL_ID IN (";
	        for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}      	
	        }
	        sql += "				)				";
	        sql += "			) AS PRD_END_DE		";
	        sql += "			, (					";
	        sql += "				SELECT PRD_SE FROM TN_RECD_PRD WHERE ORG_ID = '" + orgId + "' AND TBL_ID IN ("; 
    		for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}      	
	        }
    		sql += "				) AND ROWNUM = 1	";
	        sql += "			) AS PRD_SE				";
	        sql += "			, CLS.VAR_ORD_SN	";
	        sql += "			, ITM.CHAR_ITM_SN	";
	        sql += "			, ITM.ITM_ID		";
	        sql += "			, ITM.UP_ITM_ID		";
	        sql += "			, (			"
	        		+ "				SELECT							"
	        		+ "					CD_NM						"
	        		+ "				FROM NSI.TC_UNIT				"
	        		+ "				WHERE CD_ID = ITM.UNIT_ID		";
	        sql += "			) AS UNIT_NM		";
	        sql += "			, (			"
	        		+ "				SELECT							"
	        		+ "					CD_CN						"
	        		+ "				FROM NSI.TC_UNIT				"
	        		+ "				WHERE CD_ID = ITM.UNIT_ID		";
	        sql += "			) AS UNIT_CN		";
	        sql += "			, (			"
	        		+ "				SELECT							"
	        		+ "					CD_TP_SE					"
	        		+ "				FROM NSI.TC_UNIT				"
	        		+ "				WHERE CD_ID = ITM.UNIT_ID		";
	        sql += "			) AS UNIT_TP_SE						";
	        sql += "			, (			"
	        		+ "				SELECT							"
	        		+ "					CD_ENG_NM					"
	        		+ "				FROM NSI.TC_UNIT				"
	        		+ "				WHERE CD_ID = ITM.UNIT_ID		";
	        sql += "			) AS UNIT_ENG_NM					";
	        sql += "			, (			"
	        		+ "				SELECT							"
	        		+ "					CD_ABBR_NM				"
	        		+ "				FROM NSI.TC_UNIT				"
	        		+ "				WHERE CD_ID = ITM.UNIT_ID		";
	        sql += "			) AS UNIT_ABBR_NM					";
	        sql += "			, (			"
	        		+ "				SELECT							"
	        		+ "					CD_ABBR_ENG_NM			"
	        		+ "				FROM NSI.TC_UNIT				"
	        		+ "				WHERE CD_ID = ITM.UNIT_ID		";
	        sql += "			) AS UNIT_ABBR_ENG_NM				";
	        sql += "			, ITM.FTN_VAL_AT	";
	        sql += "			, (					";
	        sql += "				SELECT SCR_KOR	"; 
	        sql += "				FROM LST		"; 
	        sql += "				WHERE ORG_ID = ITM.ORG_ID		"; 
	        sql += "				  AND TBL_ID = ITM.TBL_ID		"; 
	        sql += "				  AND ITM_ID = ITM.ITM_ID		";
	        sql += "				  AND OBJ_VAR_ID = ITM.OBJ_VAR_ID	";
	        sql += "			) SCR_KOR			";
	        sql += "		FROM TN_ITM_LIST ITM	";
	        sql += "			, TN_OBJ_ITM_CLS CLS	";
	        sql += "			, (					";
	        sql += "				SELECT			";
	        sql += "					ORG_ID		";
	        sql += "					, TBL_ID	";
	        sql += "					, TBL_NM	";
	        sql += "					, STAT_NM	";
	        sql += "					, LIST_NM_PATH		";
	        sql += "				FROM V_LIST_STBL_KOSIS	";
	        sql += "				WHERE ORG_ID = '" + orgId + "'	";
	        sql += "	  			  AND TBL_ID IN (	";
	        for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}      	
	        }
	        sql += "		)	";
	        sql += "				  AND VW_CD = 'MT_ZTITLE'	";
	        sql += "		) KOS				";
	        sql += "		, (	SELECT * FROM TN_STBL_INFO WHERE ORG_ID = '" + orgId + "'	";
	        sql += "			AND TBL_ID IN (	";
	        for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}      	
	        }
	        sql += "	)	) INF	";
	        sql += "		WHERE ITM.ORG_ID = CLS.ORG_ID(+)	";
	        sql += "		  AND ITM.TBL_ID = CLS.TBL_ID(+)	";
	        sql += "		  AND ITM.OBJ_VAR_ID = CLS.OBJ_VAR_ID(+)	";
	        sql += "	 	  AND ITM.ORG_ID = KOS.ORG_ID(+)	";
	        sql += "		  AND ITM.TBL_ID = KOS.TBL_ID(+)	";
	        sql += "		  AND ITM.ORG_ID = INF.ORG_ID(+)	";
	        sql += "	 	  AND ITM.TBL_ID = INF.TBL_ID(+)	";
	        sql += "	  	  AND ITM.ORG_ID = '" + orgId + "'			";
	        sql += "	  	  AND ITM.TBL_ID IN (	";
	        for(int i=0; i<stblList.length; i++) {
	        	if(i != 0) {
	        		sql += ",'" + stblList[i] + "'";
	        	} else {
	        		sql += "'" + stblList[i] + "'";
	        	}       	
	        }
	        sql += "		)	";
	        sql += "	ORDER BY CLS.VAR_ORD_SN, ITM.CHAR_ITM_SN	";
			sql += "	) A											"; 
			sql += " START WITH UP_ITM_ID IS NULL CONNECT BY PRIOR ITM_ID = UP_ITM_ID ";
			sql += " AND PRIOR OBJ_VAR_ID = OBJ_VAR_ID	";
			sql += " AND LEVEL < 3	";
			
			//System.out.println("getStblItmList : "+ sql);
			st = con.prepareStatement(sql);
			rs = st.executeQuery();
			
			while (rs.next()) {
				JSONObject  jo  = new JSONObject();
				ResultSetMetaData rmd = rs.getMetaData();
				
				for(int i=1; i<=rmd.getColumnCount(); i++ ){
					jo.put(rmd.getColumnName(i),rs.getString(rmd.getColumnName(i)));
				}
				resultData.put(jo);
			}
			
		} catch (SQLException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("SQLException Occured");
			resultData.put(e);
		} catch (ClassNotFoundException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("ClassNotFoundException Occured");
			resultData.put(e);
		} catch (IOException e) {
			// 2021-12-07 [lyh] CWE-209 조치
			System.out.println("IOException Occured");
			resultData.put(e);
		} finally {
			if(st != null) try {st.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(rs != null) try {rs.close();} catch (SQLException e) {
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				// 2021-12-07 [lyh] CWE-209 조치
				System.out.println("SQLException Occured");
				resultData.put(e);
			}
		}
		
		return resultData.toString();
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/research.do", produces="application/json;charset=UTF-8")
	public String research(@RequestParam HashMap<String, Object> paramMap,Model model) throws JSONException 	{
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		
		String TEL_NO = (String)paramMap.get("TEL_NO");
		String PW = (String)paramMap.get("PW");
		String str = "";
		try {
			Class.forName("kr.co.realtimetech.kairos.jdbc.kairosDriver");
		 	con = DriverManager.getConnection("jdbc:kairos://lbdms.bplace.kr:5000/SGIS_TB","root","root");
			
			
			String sql = "select tb1.*,(select nvl(tb2.file_nm,'') from srv_dt_file tb2 where tb1.board_cd = tb2.board_cd and tb1.post_no = tb2.post_no ) as file_nm from TN_SURVEY tb1 WHERE tb1.TEL_NO ='"+TEL_NO+"' AND tb1.PW ='"+PW+"' ORDER BY SERIAL_NO DESC";
		
			st = con.prepareStatement(sql);
			
			
			ResultSet rs = st.executeQuery();
			ResultSetMetaData rmd = rs.getMetaData();
			int num = 0;
			while (rs.next()) {
				Map<String,Object> map = new HashMap<String,Object>();
				num++;
				map.put("NUM",num);
				
				for(int i=1; i<=rmd.getColumnCount(); i++ ){
					map.put(rmd.getColumnName(i),rs.getString(rmd.getColumnName(i)));
				}
				list.add(map);
			}
			
			
			ObjectMapper mapper = new ObjectMapper();
	        try {
	            str = mapper.writeValueAsString(list);
	        } catch (Exception e) {
	            System.out.println("first() mapper   ::    " + e.getMessage());
	        }
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println(e);
			resultData.put(e);
		}finally {
			if(st != null) try {st.close();} catch (SQLException e) {				
				e.printStackTrace();
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		model.addAttribute("list",list);
		
		return str;
	}	
	
	@ResponseBody
	@RequestMapping(value = "/researchInsert.do", produces="application/json;charset=UTF-8")
	public List<String> researchInsert(MultipartHttpServletRequest uploadFile,@RequestParam HashMap<String, Object> paramMap,Model model) throws JSONException, IllegalStateException, IOException 	{
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		List<String> list = new ArrayList<String>();
		String TEL_NO 		= paramMap.get("TEL_NO").equals("") 	? "" : (String)paramMap.get("TEL_NO") ;
		String PW 			= paramMap.get("PW").equals("") 		? "" : (String)paramMap.get("PW");
		String NAME 		= paramMap.get("NAME").equals("") 		? "" : (String)paramMap.get("NAME");
		String DEPT 		= paramMap.get("DEPT").equals("") 		? "" : (String)paramMap.get("DEPT");
		String ADM_BIGO 	= paramMap.get("ADM_BIGO").equals("")   ? "" : (String)paramMap.get("ADM_BIGO");
		String AGREEMENT 	= paramMap.get("AGREEMENT").equals("")  ? "" : (String)paramMap.get("AGREEMENT");
		
  		MultipartFile mf = uploadFile.getFile("files");
 		
        String uploadpath = "/DATA/docs/statsPotal/upload/board/";
        //String uploadpath = "C:\\Users\\gchrh\\OneDrive\\문서\\test";
        String board_cd = "resea_001";
        String originFilename ="";
        String extName="";
        String saveFileName="";
        String file_extn="";
        String file_content_type=""; 
        
        if(mf != null) {
        	originFilename = mf.getOriginalFilename();
        	extName = originFilename.substring(originFilename.lastIndexOf("."),originFilename.length());
        	saveFileName = genSaveFileName(extName);
        	file_extn = extName.replace(".", "");
        	file_content_type = mf.getContentType(); // file_content_type
        	
        	File file = new File(uploadpath, mf.getOriginalFilename()+saveFileName);
        	mf.transferTo(file);
        }
        
        
		try {
			Class.forName("kr.co.realtimetech.kairos.jdbc.kairosDriver");
		 	con = DriverManager.getConnection("jdbc:kairos://lbdms.bplace.kr:5000/SGIS_TB","root","root");
		 	
		 	String sql0 = "SELECT TEL_NO FROM TN_SURVEY WHERE TEL_NO ='"+TEL_NO+"'";
		 	st = con.prepareStatement(sql0);
		 	ResultSet rs0 = st.executeQuery();
		 	
		 	while (rs0.next()) {
				list.add("value");
			}
		 	model.addAttribute("list",list);
		 	if(list.size() != 0) {
		 		return list;
		 	}
		 	
		 	String sql2 = "";
			sql2 +=	"INSERT INTO srv_dt_file          ";
			sql2 +=	"(                                ";
			sql2 +=	"		board_cd                  ";
			sql2 +=	"	,	post_no                   ";
			sql2 +=	"	,	file_id                   ";
			sql2 +=	"	,	file_path                 ";
			sql2 +=	"	,	file_nm                   ";
			sql2 +=	"	,	file_extn                 ";
			sql2 +=	"	,	file_content_type         ";
			sql2 +=	")                                ";
			sql2 +=	"VALUES                           ";
			sql2 +=	"(                                ";
			sql2 +=	"'"+    board_cd              + "',";
			sql2 +=	"       (select nvl(max(post_no),0)+1 from srv_dt_file where board_cd = 'resea_001'),";
			sql2 +=	"'"+	saveFileName               + "',";
			sql2 +=	"'"+	uploadpath             + "',";
			sql2 +=	"'"+	originFilename               + "',";
			sql2 +=	"'"+	file_extn        + "',";
			sql2 +=	"'"+	file_content_type     + "'";
			sql2 +=	")                                ";
			
			if(mf != null) {
				st = con.prepareStatement(sql2);
				ResultSet rs = st.executeQuery();
			}
			
			String sql = "";
			sql +=	"INSERT INTO TN_SURVEY  ";
			sql +=	"(                      ";
			sql +=	"	SERIAL_NO,		    ";
			sql +=	"	ADM_BIGO,           ";
			sql +=	"	AGREEMENT,          ";
			sql +=	"	DEPT,               ";
			sql +=	"	NM,                 ";
			sql +=	"	TEL_NO,             ";
			sql +=	"	PW,                 ";
			sql +=	"	REG_DT,             ";
			if(mf != null) {
				sql +=	"	board_cd,           ";
				sql +=	"	POST_NO             ";
			}else {
				sql +=	"	board_cd           ";
			}
			sql +=	")VALUES(               ";
			sql +=	"(SELECT NVL(MAX(SERIAL_NO),0)+1 FROM TN_SURVEY)      ,";
			sql +=	"'"+ADM_BIGO	         +"',";
			sql +=	"'"+AGREEMENT	         +"',";
			sql +=	"'"+DEPT	         	 +"',";
			sql +=	"'"+NAME	         	 +"',";
			sql +=	"'"+TEL_NO	         	 +"',";
			sql +=	"'"+PW	        		 +"',";
			sql +=	"TO_CHAR(SYSDATE,'yyyyMMddhhmmss')	   ,";
			if(mf != null) {
				sql +=	"'"+board_cd	       	 +"',";
				sql +=	"   (select nvl(max(post_no),0) from srv_dt_file where board_cd = 'resea_001')";
			}else {
				sql +=	"'"+board_cd	       	 +"'";
			}
			sql +=	")                      ";
			st = con.prepareStatement(sql);
			ResultSet rs2 = st.executeQuery();
			
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println(e);
			resultData.put(e);
		}finally {
			if(st != null) try {st.close();} catch (SQLException e) {				
				e.printStackTrace();
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	}	
	
	@ResponseBody
	@RequestMapping(value = "/researchUpdate.do", produces="application/json;charset=UTF-8")
	public List<Map<String,Object>> researchUpdate(MultipartHttpServletRequest uploadFile,@RequestParam HashMap<String, Object> paramMap,Model model) throws JSONException, IllegalStateException, IOException 	{
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		String TEL_NO 		= paramMap.get("TEL_NO").equals("") 	? "" : (String)paramMap.get("TEL_NO") ;
		String PW 			= paramMap.get("PW").equals("") 		? "" : (String)paramMap.get("PW");
		String NAME 		= paramMap.get("NAME").equals("") 		? "" : (String)paramMap.get("NAME");
		String DEPT 		= paramMap.get("DEPT").equals("") 		? "" : (String)paramMap.get("DEPT");
		String ADM_BIGO 	= paramMap.get("ADM_BIGO").equals("")   ? "" : (String)paramMap.get("ADM_BIGO");
		String AGREEMENT 	= paramMap.get("AGREEMENT").equals("")  ? "" : (String)paramMap.get("AGREEMENT");
		String SERIAL_NO 	= paramMap.get("SERIAL_NO").equals("")  ? "" : (String)paramMap.get("SERIAL_NO");
		
		MultipartFile mf = uploadFile.getFile("files");
		
		String uploadpath = "/DATA/docs/statsPotal/upload/board/";
		//String uploadpath = "C:\\Users\\gchrh\\OneDrive\\문서\\test";
        String board_cd = "resea_001";
        String originFilename ="";
        String extName="";
        String saveFileName="";
        String file_extn="";
        String file_content_type=""; 
        
        if(mf != null) {
        	originFilename = mf.getOriginalFilename();
        	extName = originFilename.substring(originFilename.lastIndexOf("."),originFilename.length());
        	saveFileName = genSaveFileName(extName);
        	file_extn = extName.replace(".", "");
        	file_content_type = mf.getContentType(); // file_content_type
        	
        	File file = new File(uploadpath, mf.getOriginalFilename()+saveFileName);
        	mf.transferTo(file);
        }
        
		try {
			Class.forName("kr.co.realtimetech.kairos.jdbc.kairosDriver");
			con = DriverManager.getConnection("jdbc:kairos://lbdms.bplace.kr:5000/SGIS_TB","root","root");
			
			String sql2 = "";
			sql2 +=	"INSERT INTO srv_dt_file          ";
			sql2 +=	"(                                ";
			sql2 +=	"		board_cd                  ";
			sql2 +=	"	,	post_no                   ";
			sql2 +=	"	,	file_id                   ";
			sql2 +=	"	,	file_path                 ";
			sql2 +=	"	,	file_nm                   ";
			sql2 +=	"	,	file_extn                 ";
			sql2 +=	"	,	file_content_type         ";
			sql2 +=	")                                ";
			sql2 +=	"VALUES                           ";
			sql2 +=	"(                                ";
			sql2 +=	"'"+    board_cd              + "',";
			sql2 +=	"       (select nvl(max(post_no),0)+1 from srv_dt_file where board_cd = 'resea_001'),";
			sql2 +=	"'"+	saveFileName               + "',";
			sql2 +=	"'"+	uploadpath             + "',";
			sql2 +=	"'"+	originFilename               + "',";
			sql2 +=	"'"+	file_extn        + "',";
			sql2 +=	"'"+	file_content_type     + "'";
			sql2 +=	")                                ";
			
			if(mf != null) {
				st = con.prepareStatement(sql2);
				ResultSet rs = st.executeQuery();
			}
			
			String sql = "";
			sql +=	"UPDATE TN_SURVEY  ";
			sql +=	" SET              ";
			sql +=	"	ADM_BIGO	   ='"  +  ADM_BIGO  +"'";
			sql +=	"	,AGREEMENT	   ='"  +  AGREEMENT +"'";
			sql +=	"	,DEPT          ='"  +  DEPT      +"'";
			sql +=	"	,NM            ='"  +  NAME      +"'";
			sql +=	"	,TEL_NO        ='"  +  TEL_NO    +"'";
			sql +=	"	,PW            ='"  +  PW        +"'";
			sql +=	"	,MOD_DT        =  TO_CHAR(SYSDATE,'yyyyMMddhhmmss')";
			if(mf != null) {
				sql +=	"	,post_no       = (select nvl(max(post_no),0) from srv_dt_file where board_cd = 'resea_001')";
			}
			sql +=	"WHERE SERIAL_NO   ='"  +  SERIAL_NO +"'";
			st = con.prepareStatement(sql);
			ResultSet rs2 = st.executeQuery();
			
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println(e);
			resultData.put(e);
		}finally {
			if(st != null) try {st.close();} catch (SQLException e) {				
				e.printStackTrace();
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	}	
	
	@ResponseBody
	@RequestMapping(value = "/delete.do", produces="application/json;charset=UTF-8")
	public List<Map<String,Object>> delete(MultipartHttpServletRequest uploadFile,@RequestParam HashMap<String, Object> paramMap,Model model) throws JSONException, IllegalStateException, IOException 	{
		
		Connection con = null;
		PreparedStatement st = null;
		JSONArray resultData = new JSONArray();
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		String TEL_NO 		= paramMap.get("TEL_NO").equals("") 	? "" : (String)paramMap.get("TEL_NO") ;
		String SERIAL_NO 	= paramMap.get("SERIAL_NO").equals("")  ? "" : (String)paramMap.get("SERIAL_NO");
		
		try {
			Class.forName("kr.co.realtimetech.kairos.jdbc.kairosDriver");
			con = DriverManager.getConnection("jdbc:kairos://lbdms.bplace.kr:5000/SGIS_TB","root","root");
			
			String sql = "";
			sql +=	"UPDATE TN_SURVEY  ";
			sql +=	" SET              ";
			sql +=	"	post_no       = ''";
			sql +=	"WHERE SERIAL_NO   ='"  +  SERIAL_NO +"'";
			st = con.prepareStatement(sql);
			ResultSet rs2 = st.executeQuery();
			
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println(e);
			resultData.put(e);
		}finally {
			if(st != null) try {st.close();} catch (SQLException e) {				
				e.printStackTrace();
			}
			
			if(con != null) try {con.close();} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	}	
	
	private String genSaveFileName(String extName) {
        String fileName = "";
        
        Calendar calendar = Calendar.getInstance();
        fileName += calendar.get(Calendar.YEAR);
        fileName += calendar.get(Calendar.MONTH);
        fileName += calendar.get(Calendar.DATE);
        fileName += calendar.get(Calendar.HOUR);
        fileName += calendar.get(Calendar.MINUTE);
        fileName += calendar.get(Calendar.SECOND);
        fileName += calendar.get(Calendar.MILLISECOND);
        fileName += extName;
        
        return fileName;
    }
}
