package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.KosisApiService;
import kostat.sop.ServiceAPI.controller.service.mapper.KosisApiMapper;

@Service( "kosisApiService" )
public class KosisApiServiceImpl extends EgovAbstractServiceImpl implements KosisApiService {

	@Resource( name = "kosisApiMapper" )
	private KosisApiMapper mapper;
	
	
	@Override
	public Map getData() throws Exception {
		// TODO Auto-generated method stub
		return mapper.getData();
	}


	@Override
	public List getStblCategory() throws Exception {
		// TODO Auto-generated method stub
		return mapper.getStblCategory();
	}


	@Override
	public List getStblList(Map paramMap) throws Exception {
		// TODO Auto-generated method stub
		return mapper.getStblList(paramMap);
	}


	@Override
	public List getStblItmList(HashMap<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		String[] stblList = paramMap.get("stblList").equals("") 
				? new String[0] 
				: ((String) paramMap.get("stblList")).split(",");	//	표특성항목 리스트
		paramMap.put("stblList", stblList);
		return mapper.getStblItmList(paramMap);
	}


	@Override
	public Map getTotSurvStatValidateParams(HashMap<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		String[] orgId = (String[]) paramMap.get("org_id_list");
		paramMap.put("orgId", orgId[0]);
		
		
		List jArr = mapper.getTotSurvStatValidateParams(paramMap);
		HashMap<String, Object> resultData = new HashMap<>();
		
		resultData.put("resultData",true);
		for(int i=0; i<jArr.size(); i++) {
			
			HashMap<String, Object> map = (HashMap<String, Object>) jArr.get(i);
			if(map.get("VAR_ORD_SN") == "" || map.get("VAR_ORD_SN") == null || map.get("VAR_ORD_SN").equals("0")) {
				String[] char_itm_id_list = (String[]) paramMap.get("char_itm_id_list");
				if(char_itm_id_list.length <= 0) {
					resultData.put("msg","error: char_itm_id_list 값은 필수 입니다.");
				}
			}else {
				
				List ov_lv_list = (List) paramMap.get("ov_lv_list");
				for(int j=0;j<ov_lv_list.size();j++) {
					
					if(map.get("VAR_ORD_SN").equals(String.valueOf(j+1))) {
						
						if(ov_lv_list.get(j).toString().length() == 0) {
							
							if(map.get("SCR_KOR").toString().indexOf("행정") != -1 ||
									map.get("SCR_KOR").toString().indexOf("시도") != -1 ||
									map.get("SCR_KOR").toString().indexOf("시군구") != -1 ||
									map.get("SCR_KOR").toString().indexOf("읍면동") != -1 ||
									map.get("SCR_KOR").toString().indexOf("SGG") != -1 ) {
								
									List adm_cd_list = (List) paramMap.get("adm_cd");
									if(adm_cd_list.size() == 0) {
										System.out.println("여기1");
										resultData.put("msg","error: ov_l" + String.valueOf(j+1) + "_list 또는 adm_cd 값(지역)은 필수 입니다."); 
										resultData.put("resultData",false);
									}
							}else {
								System.out.println("여기2");
								resultData.put("msg","error: ov_l" + String.valueOf(j+1) + "_list 값은 필수 입니다."); 
								resultData.put("resultData",false);
							}
							
						}
					}
				}
			}
		}
		resultData.put("msg","성공");
		return resultData;
	}


	@Override
	public List getTotsurvKosisData(HashMap<String, Object> paramMap) throws Exception {
		
		
		
		String[] surv_year_list = (String[]) paramMap.get("surv_year_list");
		
		String[] org_id_list = (String[]) paramMap.get("org_id_list");
		
		String[] tbl_id_list = (String[]) paramMap.get("tbl_id_list");
		
		String[] char_itm_id_list = (String[]) paramMap.get("char_itm_id_list");
		
		String[] adm_cd = (String[]) paramMap.get("adm_cd");
		
		
		String[] list_var_ord_list = (String[]) paramMap.get("list_var_ord_list");
		
		List<String[]> ov_lv_list =   (List<String[]>) paramMap.get("ov_lv_list");
		
		
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
		
		String adm_unit = (String) paramMap.get("adm_unit");				//상위코드(분류, 지역)
		String up_itm_id = (String) paramMap.get("up_itm_id");				//상위코드(분류, 지역)
		String prt_type = (String) paramMap.get("prt_type");				//카테고리
		String category = (String) paramMap.get("category");				//카테고리
		
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
		
		//System.out.println("sql : "+sql);
		HashMap<String, String> sqlMap = new HashMap<>();
		sqlMap.put("sql", sql);
		return mapper.getTotsurvKosisData(sqlMap);
		//return null;
	}



}
