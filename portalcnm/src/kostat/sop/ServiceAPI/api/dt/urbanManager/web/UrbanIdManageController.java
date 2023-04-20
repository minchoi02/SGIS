package kostat.sop.ServiceAPI.api.dt.urbanManager.web;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class UrbanIdManageController {

	@Resource
	private StstisticsCommonDao dao;
	
	@RequestMapping(value = "/urban/urbanIdManage.do")
	public ModelAndView pageCall(@RequestParam HashMap<String, Object> paramMap) {
		HashMap<String, Object> paramInfo = new HashMap<String, Object>();
		return new ModelAndView("urban/urbanIdManage", "paramInfo", paramInfo);
	}
	
	/**
	 * @comment 도시화 분석 지도 서비스 관리 목록을 조회합니다
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getIdSetInfoList.do")
	public HashMap<String, Object> getUrbanSetInfoList(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("UrbanIdManage.getIdTotal",paramMap));
		
		paramMap.put("data", dao.select("UrbanIdManage.getIdSetInfoList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 메인도시 상세정보를 조회합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getMainIdDetailData.do")
	public HashMap<String, Object> getMainIdDetailData(@RequestParam HashMap<String, Object> paramMap) 	{
	
		paramMap.put("data", dao.select("UrbanIdManage.getMainIdDetailData",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 메인도시 맵핑 정보를 선택합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getMainIdDataByPk.do")
	public HashMap<String, Object> getMainIdDataByPk(@RequestParam HashMap<String, Object> paramMap) 	{
	
		paramMap.put("data", dao.select("UrbanIdManage.getMainIdDataByPk",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 대표ID (상세정보) 를 조회합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getMainIdDetailCd.do")
	public HashMap<String, Object> getMainIdDetailCd(@RequestParam HashMap<String, Object> paramMap) 	{
		
		if(dao.selectInt("UrbanIdManage.checkCityId", paramMap) == 0) {
			paramMap.put("data", dao.select("UrbanIdManage.getIdDetailDataCd",paramMap));
			paramMap.put("urbarId",  0);
		}else {
			paramMap.put("data", dao.select("UrbanIdManage.getIdDetailData",paramMap));
		}
		
		return paramMap;
	}
	/**
	 * @comment 대표ID 존재여부 확인
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getMainIdExists.do")
	public HashMap<String, Object> getMainIdExists(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = dao.selectInt("UrbanIdManage.getMainIdExists",paramMap);
		paramMap.put("code", result < 1 ? -1 : 0);
		
		return paramMap;
	}
	/**
	 * @comment	메인도시를 저장합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/updataMainIdList.do")
	public HashMap<String, Object> updataMainIdList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("UrbanIdManage.getMainIdExists", paramMap) == 0) {
			int result = dao.register("UrbanIdManage.registerMainIdMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}else {
			int result = dao.edit("UrbanIdManage.updateMainIdMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}
		
		return paramMap;
	}
	/**
	 * @comment	메인도시 맵핑을 저장합니다.(Detail)
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/updataMainIdMappingList.do")
	public HashMap<String, Object> updataMainIdMappingList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("UrbanIdManage.checkMainIdByPk", paramMap) == 0) {
			int result = dao.register("UrbanIdManage.registerMainIdMapping", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}else {
			int result = dao.edit("UrbanIdManage.updateMainIdMapping", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}
		
		return paramMap;
	}
	/**
	 * @comment	대표도시를 삭제 합니다.(매핑도 같이 삭제합니다.)
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/removeMainId.do" , method=RequestMethod.POST)
	public int removeMainId(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = 0;
		
		paramMap.put("code",(dao.remove("UrbanIdManage.removeMainIdData",paramMap) < 1) ? -1 : 0);
		paramMap.put("code",(dao.remove("UrbanIdManage.removeIdMapping",paramMap) < 1) ? -1 : 0);
		
		return result;
	}
	
	/**
	 * @comment	메인ID 메핑 정보 디테일 삭제 합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/removeMainIdMappingByPk.do" , method=RequestMethod.POST)
	public int removeMainIdMappingByPk(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = 0;
		
		paramMap.put("code",(dao.remove("UrbanIdManage.removeMainIdMappingByPk",paramMap) < 1) ? -1 : 0);
		
		return result;
	}
}
