package kostat.sop.ServiceAPI.api.dt.srvAreaManager.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class SrvAreaSetInfoMngController {
	
	@Resource
	private StstisticsCommonDao dao;
	

	@RequestMapping(value = "/srvAreaMng/srvAreaSetInfoMng.do")
	public ModelAndView pageCall(@RequestParam HashMap<String, Object> paramMap) {
		HashMap<String, Object> paramInfo = new HashMap<String, Object>();
		return new ModelAndView("srvAreaMng/srvAreaSetInfoMng", "paramInfo", paramInfo);
	}
	
	/**
	 * @comment 생활권역 통계지도 서비스 관리 목록을 조회합니다
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getSrvareaSetInfoList.do")
	public HashMap<String, Object> getSrvareaSetInfoList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaInfoMng.getSrvareaSetInfoList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 시설유형 분류 상세정보를 조회합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getSrvAreaUpperDetailData.do")
	public HashMap<String, Object> getSrvAreaUpperDetailData(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("srvAreaInfoMng.getSrvAreaUpperDetailData",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 격자유형 분류 상세정보를 조회합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getSrvAreaGridDetailData.do")
	public HashMap<String, Object> getSrvAreaGridDetailData(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("srvAreaInfoMng.getSrvAreaGridDetailData",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 범위유형 분류 상세정보를 조회합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getSrvAreaScopeDetailData.do")
	public HashMap<String, Object> getSrvAreaScopeDetailData(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("srvAreaInfoMng.getSrvAreaScopeDetailData",paramMap));
		
		return paramMap;
	}
	
	
	/**
	 * @comment	시설유형 분류을 저장합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/updataUpperFactypeList.do")
	public HashMap<String, Object> updataUpperFactypeList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("srvAreaInfoMng.getFactypeLclasCdExists", paramMap) == 0) {
			int result = dao.register("srvAreaInfoMng.registerUpperFactypeMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}else {
			int result = dao.edit("srvAreaInfoMng.updateUpperFactypeMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}
		
		return paramMap;
	}
	
	/**
	 * @comment	격자유형을 저장합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/updataGridList.do")
	public HashMap<String, Object> updataGridList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("srvAreaInfoMng.getGridCdExists", paramMap) == 0) {
			int result = dao.register("srvAreaInfoMng.registerGirdMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}else {
			int result = dao.edit("srvAreaInfoMng.updateGirdMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}
		return paramMap;
	}
	
	/**
	 * @comment	범위유형을 저장합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/updataScopeList.do")
	public HashMap<String, Object> updataScopeList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("srvAreaInfoMng.getScopeCdExists", paramMap) == 0) {
			int result = dao.register("srvAreaInfoMng.registerScopeMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}else {
			int result = dao.edit("srvAreaInfoMng.updateScopeMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}
		return paramMap;
	}
	
	/**
	 * @comment 서비스 활성화 여부 체크
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/checkServiceYn.do")
	public HashMap<String, Object> checkServiceYn(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = dao.selectInt("srvAreaInfoMng.checkServiceYn",paramMap);
		paramMap.put("code", result < 1 ? -1 : 0);
		
		return paramMap;
	}
	
}
 