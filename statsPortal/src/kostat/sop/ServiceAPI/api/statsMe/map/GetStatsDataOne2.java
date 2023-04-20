package kostat.sop.ServiceAPI.api.statsMe.map;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.StatsMeService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : My통계로 > 통계자료 조회  <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김남민 1.0, 2019.08.08	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김남민
 * @version 1.0
 * @see
 * <p/>
 */
public class GetStatsDataOne2 extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetStatsDataOne2.class);
	
	//My통계로 관련 서비스
	@Resource(name="statsMeService")
	private StatsMeService statsMeService;
	
	@Override
	public String getApiId() {
		return "115000";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		stat_data_id
	}

	enum OptionParam{
		map_ty,
		area_bndry_se,
		sido_cd,
		sgg_cd,
		emdong_cd
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		Map<String,Object> mapParameter = getParameterMap(req);
		
		//리턴 변수 선언
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		//임시 파라미터 선언
		Map<String,Object> temp_params = new HashMap<String,Object>();
		
		//파라미터 변수 선언
		String stat_data_id = StringUtil.isNullToString(mapParameter.get("stat_data_id"));
		String stat_data_nm = "";
		String menu_nm = "";
		String srv_nm = "";
		String b_class_nm = "";
		String m_class_nm = "";
		String s_class_nm = "";
		String base_year = "";
		String stat_data_base_year = "";
		String map_ty = StringUtil.isNullToString(mapParameter.get("map_ty"));
		String area_bndry_se = StringUtil.isNullToString(mapParameter.get("area_bndry_se"));
		String sido_cd = StringUtil.isNullToString(mapParameter.get("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(mapParameter.get("sgg_cd"));
		String emdong_cd = StringUtil.isNullToString(mapParameter.get("emdong_cd"));
		
		//통계자료관리 조회
		Map<String, Object> data = session.selectOne("statsMeMap.selectOneSrvDtCtlgDataList", mapParameter);
		if(data != null) {
			stat_data_nm = StringUtil.isNullToString(data.get("stat_data_nm"));
			menu_nm = StringUtil.isNullToString(data.get("menu_nm"));
			srv_nm = StringUtil.isNullToString(data.get("srv_nm"));
			b_class_nm = StringUtil.isNullToString(data.get("b_class_nm"));
			m_class_nm = StringUtil.isNullToString(data.get("m_class_nm"));
			s_class_nm = StringUtil.isNullToString(data.get("s_class_nm"));
			base_year = StringUtil.isNullToString(data.get("stat_data_base_year"));
			stat_data_base_year = StringUtil.isNullToString(data.get("stat_data_base_year"));
		}
		
		// 통계자료 코드매핑
		if(data != null) {
			try {
				mapParameter.putAll(statsMeService.mappingSrvDtCtlgDataList(data));
			} catch (SQLException e) {
				throw new ApiException(StringUtil.getErrMsg());
			}
		}
		
		//데이터마트 조회
		if("정책통계지도".equals(menu_nm)) {
			Map<String, Object> params1 = (Map<String, Object>) mapParameter.get("params1"); // 좌측
			Map<String, Object> params2 = (Map<String, Object>) mapParameter.get("params2"); // 우측
			String fusion_yn = StringUtil.isNullToString(mapParameter.get("fusion_yn")); // 융합 여부
			String idx_type = StringUtil.isNullToString(mapParameter.get("idx_type")); // 융합 관련
			String nomfrm_base_map_div = StringUtil.isNullToString(mapParameter.get("nomfrm_base_map_div")); // 융합 관련
			String nomfrm_cd = StringUtil.isNullToString(mapParameter.get("nomfrm_cd")); // 융합 관련
			params1.put("area_bndry_se", area_bndry_se);
			params1.put("sido_cd", sido_cd);
			params1.put("sgg_cd", sgg_cd);
			params1.put("emdong_cd", emdong_cd);
			params2.put("area_bndry_se", area_bndry_se);
			params2.put("sido_cd", sido_cd);
			params2.put("sgg_cd", sgg_cd);
			params2.put("emdong_cd", emdong_cd);
			if("Y".equals(fusion_yn)) {
				//조회
				List<Map<String, Object>> list1 = session.selectList("statsMeMap2.selectListSrvDtCtlgDtwrh", params1); // 좌측 조회
				List<Map<String, Object>> list2 = session.selectList("statsMeMap2.selectListSrvDtCtlgDtwrh", params2); // 우측 조회
				String params1_unit = StringUtil.isNullToString(params1.get("unit"));
				String params2_unit = StringUtil.isNullToString(params2.get("unit"));
				//융합 (nomfrm_base_map_div 값이 2인 경우 좌우 변경) 
				if("2".equals(nomfrm_base_map_div)) {
					resultData.put("list", fusionSrvDtCtlgDtwrh(list2, list1, idx_type, nomfrm_cd, params2_unit, params1_unit));
				}
				//융합
				else {
					resultData.put("list", fusionSrvDtCtlgDtwrh(list1, list2, idx_type, nomfrm_cd, params1_unit, params2_unit));
				}
			}
			else {
				String params1_map_ty = StringUtil.isNullToString(params1.get("map_ty"));
				String params2_map_ty = StringUtil.isNullToString(params2.get("map_ty"));
				if(params1_map_ty.equals(map_ty)) {
					List<Map<String, Object>> list = session.selectList("statsMeMap2.selectListSrvDtCtlgDtwrh", params1);
					resultData.put("list", list);
				}
				else {
					List<Map<String, Object>> list = session.selectList("statsMeMap2.selectListSrvDtCtlgDtwrh", params2);
					resultData.put("list", list);
				}
			}
		}
		else {
			List<Map<String, Object>> list = session.selectList("statsMeMap2.selectListSrvDtCtlgDtwrh", mapParameter);
			resultData.put("list", list);
		}
		
		//리턴
		resultData.put("params", mapParameter);
		return resultData;
	}
	
	//정책통계지도 데이터마트 융합
	private List<Map<String, Object>> fusionSrvDtCtlgDtwrh(List<Map<String, Object>> list1, List<Map<String, Object>> list2, String idx_type, String nomfrm_cd, String unit1, String unit2) {
		//융합 유형 체크
		String fusion_type = "";
		String unit = unit1;
		if("1".equals(idx_type)) {
			fusion_type = "minus"; //증감
			if(!unit1.equals(unit2)) unit = unit1+"-"+unit2;
		}
		else if("2".equals(idx_type)) {
			if("1".equals(nomfrm_cd)) {
				fusion_type = "plus"; //더하기
				if(!unit1.equals(unit2)) unit = unit1+"*"+unit2;
			} else if("2".equals(nomfrm_cd)) {
				fusion_type = "minus"; //빼기
				if(!unit1.equals(unit2)) unit = unit1+"-"+unit2;
			} else if("3".equals(nomfrm_cd)) {
				fusion_type = "multiplication"; //곱하기
				if(!unit1.equals(unit2)) unit = unit1+"*"+unit2;
			} else if("4".equals(nomfrm_cd)) {
				fusion_type = "division"; //나누기
				if(!unit1.equals(unit2)) unit = unit1+"/"+unit2;
			}
		}
		
		//융합 (list1 기준으로 list2 반영)
		for (Map<String, Object> map1 : list1) {
			String map1_adm_cd = StringUtil.isNullToString(map1.get("adm_cd"));
			Double map1_stats_dta_co = zeroConvertDouble(map1.get("stats_dta_co"));
			String map1_adm_yn = "N";
			for (Map<String, Object> map2 : list2) {
				String map2_adm_cd = StringUtil.isNullToString(map2.get("adm_cd"));
				Double map2_stats_dta_co = zeroConvertDouble(map2.get("stats_dta_co"));
				
				//같은 지역인 경우 list1에 반영
				if(map1_adm_cd.equals(map2_adm_cd)) {
					map1_adm_yn = "Y";
					Double stats_dta_co = 0.0;
					if("plus".equals(fusion_type)) {
						stats_dta_co = map1_stats_dta_co + map2_stats_dta_co;
					} else if("minus".equals(fusion_type)) {
						stats_dta_co = map1_stats_dta_co - map2_stats_dta_co;
					} else if("multiplication".equals(fusion_type)) {
						stats_dta_co = map1_stats_dta_co * map2_stats_dta_co;
					} else if("division".equals(fusion_type)) {
						try {
							stats_dta_co = map1_stats_dta_co / map2_stats_dta_co;
						} catch(Exception e) {
							stats_dta_co = 0.0;
						}
					}
					map1.put("stats_dta_co", Math.round(stats_dta_co*10.0)/10.0);
				}
			}
			
			//같은 지역 없는 경우 별도 처리
			if("N".equals(map1_adm_yn)) {
				Double stats_dta_co = 0.0;
				if("plus".equals(fusion_type)) {
					stats_dta_co = map1_stats_dta_co;
				} else if("minus".equals(fusion_type)) {
					stats_dta_co = map1_stats_dta_co;
				} else if("multiplication".equals(fusion_type)) {
					stats_dta_co = 0.0;
				} else if("division".equals(fusion_type)) {
					stats_dta_co = 0.0;
				}
				map1.put("stats_dta_co", Math.round(stats_dta_co*10.0)/10.0);
			}
		}
		//융합 (list2 기준으로 list1 반영)
		List<Map<String, Object>> list1_add = new ArrayList<Map<String, Object>>();
		for (Map<String, Object> map2 : list2) {
			String map2_adm_cd = StringUtil.isNullToString(map2.get("adm_cd"));
			Double map2_stats_dta_co = zeroConvertDouble(map2.get("stats_dta_co"));
			String map2_adm_yn = "N";
			//같은 지역 있는지 체크
			for (Map<String, Object> map1 : list1) {
				String map1_adm_cd = StringUtil.isNullToString(map1.get("adm_cd"));
				if(map1_adm_cd.equals(map2_adm_cd)) {
					map2_adm_yn = "Y";
				}
			}
			//같은 지역 없는 경우 list1_add에 추가
			if("N".equals(map2_adm_yn)) {
				Double stats_dta_co = 0.0;
				if("plus".equals(fusion_type)) {
					stats_dta_co = map2_stats_dta_co;
				} else if("minus".equals(fusion_type)) {
					stats_dta_co = - map2_stats_dta_co;
				} else if("multiplication".equals(fusion_type)) {
					stats_dta_co = 0.0;
				} else if("division".equals(fusion_type)) {
					stats_dta_co = 0.0;
				}
				map2.put("stats_dta_co", Math.round(stats_dta_co*10.0)/10.0);
				list1_add.add(map2);
			}
		}
		//list1_add을 list1에 추가
		if(list1_add != null && list1_add.size() > 0) {
			list1.addAll(list1_add);
		}
		//unit, tooltip_cn 융합데이터로 변경
		for (Map<String, Object> map1 : list1) {
			map1.put("unit", unit);
			map1.put("tooltip_cn", "융합데이터");
		}
		
		return list1;
	}
	
	private double zeroConvertDouble(Object src) {
		if (src == null || src.equals("null")) {
			return 0.0;
		} else {
			return Double.parseDouble((""+src).trim());
		}
    }

	private double zeroConvertDouble(String src) {
		if (src == null || src.equals("null") || "".equals(src) || " ".equals(src)) {
			return 0.0;
		} else {
			return Double.parseDouble(src.trim());
		}
    }
}