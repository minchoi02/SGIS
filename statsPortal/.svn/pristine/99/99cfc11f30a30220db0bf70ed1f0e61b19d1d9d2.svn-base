package kostat.sop.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.PolicyStaticService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 1. 기능 : 정책통계지도 경상북도청 생활SOC 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : jrj, 1.0, 2021/07/09  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/soc")
public class PolicyStaticSocController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(PolicyStaticSocController.class);
	
	@Resource(name="policystaticService")
	private PolicyStaticService policystaticService;
	
	/**
	 * 정책통계지도 경상북도청 생활SOC 화면
	 * @param request
	 * @param response
	 * @return policyStatic/policyStaticSocMap
	 */
	@SuppressWarnings("unchecked")
	@Interceptor("PageCallReg")
	@RequestMapping(value="/policyStaticSocMap")
	public ModelAndView policyStaticSocMap(HttpServletRequest request, ModelMap model) {
		try {
			//=================================URL 로 접근시 해당 parameter로 지표 설정
			JSONObject json = new JSONObject();
			json.put("idx_id", request.getParameter("idx_id") );
			json.put("adm_cd", request.getParameter("adm_cd") );
			json.put("fac_cd", request.getParameter("fac_cd") );
			json.put("region_div", request.getParameter("region_div") );
			json.put("dstnc_ctgry", request.getParameter("dstnc_ctgry") );
			
			model.addAttribute("soc_param", json);
			//=============================================================
			
			List<Map> socFacTypeList = policystaticService.selectSocFacTypeCodeList();		//시설 유형 코드 목록
			model.addAttribute("fac_type_list", socFacTypeList);
			
			List<Map> socDstncCtgryList = policystaticService.selectSocDstncCtgryList();	//거리 범주 목록
			model.addAttribute("dstnc_ctgry_list", socDstncCtgryList);
			
			List<Map> categoryList = policystaticService.policyStaticCategoryList();		//지표 목록
			model.addAttribute("categoryList", categoryList);
			
			model.addAttribute("soc_yn", true);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return new ModelAndView("policyStatic/policyStaticSocMap");
	}
	
	/**
	 * 정책통계지도 경상북도청 생활SOC - 시설 분류 코드 목록 조회
	 * @param request
	 * @param response
	 * @return policyStatic/policyStaticSocMap
	 */
	@RequestMapping(value="/getFacCodeList", produces="text/plain;charset=UTF-8")
	public ModelAndView socFacCodeList(HttpServletRequest request, ModelMap model) {
		try {
			String fac_ty_cd = request.getParameter("fac_ty_cd");
			String access_yn = request.getParameter("access_yn");
			
			fac_ty_cd = ( ( fac_ty_cd == null || fac_ty_cd == "" ) ? "A" : fac_ty_cd );
			access_yn = ( ( access_yn == null || access_yn == "" ) ? "N" : access_yn );
			
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("fac_ty_cd", fac_ty_cd);
			param.put("access_yn", access_yn);
			
			List<Map> socFacCodeList = policystaticService.selectSocFacClCodeList( param );
			model.addAttribute("fac_cl_list", socFacCodeList);
			model.addAttribute("success", true);
		} catch (SQLException e) {
			model.addAttribute("success", false);
			e.printStackTrace();
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 정책통계지도 경상북도청 생활SOC - 데이터 조회(왼쪽맵)
	 * @param request
	 * @param response
	 * @return policyStatic/policyStaticSocMap
	 */
	@RequestMapping(value="/getDataList", produces="text/plain;charset=UTF-8")
	public ModelAndView getDataList(HttpServletRequest request, ModelMap model) {
		try {
			String idx_id = request.getParameter("idx_id");
			String adm_cd = request.getParameter("adm_cd");
			String fac_cd = request.getParameter("fac_cd");
			String region_div = request.getParameter("region_div");
			String map_id = request.getParameter("map_id");
			
			nullCheck( idx_id );
			nullCheck( adm_cd );
			nullCheck( fac_cd );
			nullCheck( region_div );
			nullCheck( map_id );
			
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("adm_cd", adm_cd);
			param.put("fac_cd", fac_cd);
			param.put("region_div", region_div);
			
			
			List<Map> data = null;
			
			System.out.println("=============================idx_id >>> " + idx_id);
			
			if( "soc_ppltn".equals( idx_id ) ){											//인구대비시설 수
				if( "1".equals( String.valueOf( map_id ) ) ){
					data = policystaticService.selectSocSvcFacCnt( param );				//서비스시설수
				} else {
					data = policystaticService.selectSocSvcPpltnCnt( param );			//서비스인구수
				}
			} else if( "soc_wghvr".equals( idx_id ) ){									//인구가중평균거리
				data = policystaticService.selectSocWghvrList( param );
			} else if( "soc_ctgry".equals( idx_id ) ){									//거리범주별인구
				String dstnc_ctgry = request.getParameter("dstnc_ctgry");
				nullCheck( dstnc_ctgry );
				
				param.put("dstnc_ctgry", dstnc_ctgry);
				data = policystaticService.selectSocDstncCtgryPpltnList( param );
			}
			
			model.addAttribute("result", data);
			model.addAttribute("success", true);
		} catch (SQLException e) {
			model.addAttribute("success", false);
			e.printStackTrace();
		} catch (Exception e) {
			model.addAttribute("success", false);
			e.printStackTrace();
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 정책통계지도 경상북도청 생활SOC - POI 조회(오른쪽맵)
	 * @param request
	 * @param response
	 * @return policyStatic/policyStaticSocMap
	 */
	@RequestMapping(value="/getPoiList", produces="text/plain;charset=UTF-8")
	public ModelAndView getPoiList(HttpServletRequest request, ModelMap model) {
		try {
			String adm_cd = request.getParameter("adm_cd");
			String fac_cd = request.getParameter("fac_cd");
			String region_div = request.getParameter("region_div");
			
			nullCheck( adm_cd );
			nullCheck( fac_cd );
			nullCheck( region_div );
			
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("adm_cd", adm_cd);
			param.put("fac_cd", fac_cd);
			param.put("region_div", region_div);
			
			List<Map> data = null;
			
			if( "37010".equals( adm_cd ) ){		//포항시
				param.put("adm_cd", "37011");	//포항시북구
				data = policystaticService.selectSocFacPoiList( param );
				
				param.put("adm_cd", "37012");	//포항시남구
				List<Map> data2 = policystaticService.selectSocFacPoiList( param );
				
				if( data2 != null && data2.size() > 0 ){
					data.addAll( data2 );
				}
			} else {
				data = policystaticService.selectSocFacPoiList( param );
			}
			
			model.addAttribute("result", data);
			model.addAttribute("success", true);
		} catch (SQLException e) {
			model.addAttribute("success", false);
			e.printStackTrace();
		} catch (Exception e) {
			model.addAttribute("success", false);
			e.printStackTrace();
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	public void nullCheck( String parameter ) throws Exception{
		if( parameter == null || "".equals( parameter ) ){
			throw new Exception("서버오류가 발생하였습니다.");
		}
	}
	
}