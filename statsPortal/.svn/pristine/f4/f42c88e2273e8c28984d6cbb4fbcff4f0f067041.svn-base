package kostat.sop.ServiceAPI.controller.view;

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
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CatchmentAreaService;
import kostat.sop.ServiceAPI.exception.ApiException;

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/catchmentArea")
public class CatchmentAreaController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(CatchmentAreaController.class);
	
	@Resource(name="catchmentAreaService")
	private CatchmentAreaService catchmentAreaService;

	/**
	 * 배후권 서비스 메인 조회
	 * @param request
	 * @param response
	 * @return catchmentArea/catchmentAreaMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/main")
	public ModelAndView getMain(HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		HashMap<String, Object> paramInfo = new HashMap<String, Object>();
		try {
			logger.info("START Query - select catchmentArea param Info");

			HashMap<String, Object> mapParameter = new HashMap<String, Object>();
			List testInfoList = catchmentAreaService.selectTestInfo(mapParameter);
			if(testInfoList != null && testInfoList.size() > 0) {
				HashMap testInfo = (HashMap)testInfoList.get(0);
				
				paramInfo.put("col1", testInfo.get("col1"));
				paramInfo.put("col2", testInfo.get("col2"));
				paramInfo.put("col3", testInfo.get("col3"));
			}

			//중심시설유형 리스트 조회
			paramInfo.put("facilityList", catchmentAreaService.selectFacilityTypeList());
			//사업체및종사자 대분류 조회
			paramInfo.put("largeClassList", catchmentAreaService.selectLargeClassList());
			//gird 레벨  조회
			paramInfo.put("gridLevelList", catchmentAreaService.selectGridLevelList());
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		
		return new ModelAndView("catchmentArea/catchmentAreaMain", "paramInfo", paramInfo);
	}
	
	/**
	 * 배후권 서비스 Left 메뉴
	 * @param request
	 * @param response
	 * @return catchmentArea/catchmentAreaLeftMenu
	 */
	@RequestMapping(value="/catchmentAreaLeftMenu")
	public ModelAndView catchmentAreaLeftMenu(HttpServletRequest request, HttpServletResponse response) {
		
		return new ModelAndView("catchmentArea/catchmentAreaLeftMenu");
	}
	
	/**
	 * 배후권 서비스 데이터보드
	 * @param request
	 * @param response
	 * @return catchmentArea/catchmentAreaDataBoard
	 */
	@RequestMapping(value="/catchmentAreaDataBoard")
	public ModelAndView catchmentAreaDataBoard(HttpServletRequest request, HttpServletResponse response) {
		
		return new ModelAndView("catchmentArea/catchmentAreaDataBoard");
	}
	
	
	/**
	 * 사업체 + 종사자 유형 상세 > 대분류 항목을 찾는다.<br> SRV_DT_SRVAREA_FACTYPE_LCLAS 테이블 참고
	 * @return List<HashMap<String, Object>>
	 * @throws SQLException 
	 */
	@ResponseBody
	@RequestMapping(value = "/getCensusInfoGroupByLClass.do")
	public List<HashMap<String, Object>> getCensusInfoGroupByLClass(@RequestParam(defaultValue="") String lClass, @RequestParam int classDeg) throws SQLException 	{
		Map paramMap = new HashMap();
		paramMap.put("lClass", lClass);
		paramMap.put("classDeg", classDeg);
		List<HashMap<String, Object>> list = catchmentAreaService.selectCensusGroupByLClass(paramMap);
		return list;
	}
	
	/**
	 * 사업체 + 종사자 유형 상세 > 중분류 항목을 찾는다.
	 * @return List<HashMap<String, Object>>
	 * @throws SQLException 
	 */
	@ResponseBody
	@RequestMapping(value = "/getKsicThirdCdAndName.do")
	public List<HashMap<String, Object>> getKsicThirdCdAndName(@RequestParam(defaultValue="") String ksic_2_cd, @RequestParam int classDeg) throws SQLException 	{
		Map paramMap = new HashMap();
		paramMap.put("ksic_2_cd", ksic_2_cd);
		paramMap.put("classDeg", classDeg);
		List<HashMap<String, Object>> list = catchmentAreaService.selectKsicThirdCdAndNameGroupByKSIC2(paramMap);
		return list;
	}
	
}
