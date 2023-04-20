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
public class UrbanServiceManageController {
	
	@Resource
	private StstisticsCommonDao dao;
	
	@RequestMapping(value = "/urban/urbanServiceManage.do")
	public ModelAndView pageCall(@RequestParam HashMap<String, Object> paramMap) {
		
		HashMap<String, Object> paramInfo = new HashMap<String, Object>();
		
		return new ModelAndView("urban/urbanServiceManage", "paramInfo", paramInfo);
	}
	
	/**
	 * @comment 도시화 분석 지도 서비스 관리 목록을 조회합니다
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getUrbanSetInfoList.do")
	public HashMap<String, Object> getUrbanSetInfoList(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("UrbanManage.getUrbanTotal",paramMap));
		paramMap.put("data", dao.select("UrbanManage.getUrbanSetInfoList",paramMap));

		return paramMap;
	}
	
	/**
	 * @comment 도시화 분석 상세정보를 조회합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getUrbanDetailData.do")
	public HashMap<String, Object> getUrbanDetailData(@RequestParam HashMap<String, Object> paramMap) 	{
	
		paramMap.put("data", dao.select("UrbanManage.getUrbanDetailData",paramMap));
		
		return paramMap;
	}
	/**
	 * @comment 도시화 분석 도시정보를 조회합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getSidoDetailData.do")
	public HashMap<String, Object> getSidoDetailData(@RequestParam HashMap<String, Object> paramMap) 	{
	
		paramMap.put("data", dao.select("UrbanManage.getSidoDetailData",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 도시화 분석  상세정보(코드)를 조회합니다.
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getDstClasCd.do")
	public HashMap<String, Object> getDstClasCd(@RequestParam HashMap<String, Object> paramMap) 	{
		
		if(dao.selectInt("UrbanManage.checkSidoCd", paramMap) == 0) {
			paramMap.put("data", dao.select("UrbanManage.getSidoDetailDataCd",paramMap));
			paramMap.put("sidoCd",  0);
		}else {
			paramMap.put("data", dao.select("UrbanManage.getSidoDetailData",paramMap));
		}
		
		return paramMap;
	}
	
	/**
	 * @comment	도시화 분석 지도를 저장합니다.(Detail)
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/updataUbanList.do")
	public HashMap<String, Object> updataUbanList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("UrbanManage.getDstrctLclasCdExists", paramMap) == 0) {
			int result = dao.register("UrbanManage.registerUrbanMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}else {
			int result = dao.edit("UrbanManage.updateUrbanMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}
		
		return paramMap;
	}
	
	/**
	 * @comment	도시화 분석 시도코드를 저장합니다.(Detail)
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/updataSidoList.do")
	public HashMap<String, Object> updataSidoList(@RequestParam HashMap<String, Object> paramMap) 	{		
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("UrbanManage.checkSidoCdByTwoCd", paramMap) == 0) {
			int result = dao.register("UrbanManage.registerSidoCdMapping", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}else {
			int result = dao.edit("UrbanManage.updateSidoCdMapping", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}
		
		return paramMap;
	}
	
	/**
	 * @comment 서비스 활성화 여부 체크
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/checkSidoCd.do")
	public HashMap<String, Object> checkSidoCd(@RequestParam HashMap<String, Object> paramMap) 	{
		
		int result = dao.selectInt("UrbanManage.checkSidoCd",paramMap);
		paramMap.put("code", result < 1 ? -1 : 0);
		
		return paramMap;
	}
	
	/**
	 * @comment 권역코드 여부 체크
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/getDstrctLclasCdExists.do")
	public HashMap<String, Object> getDstrctLclasCdExists(@RequestParam HashMap<String, Object> paramMap) 	{
		
		int result = dao.selectInt("UrbanManage.getDstrctLclasCdExists",paramMap);
		paramMap.put("code", result < 1 ? -1 : 0);
		
		return paramMap;
	}
	
	/**
	 * @comment 서비스 활성화 여부 체크
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/checkServiceYn.do")
	public HashMap<String, Object> checkServiceYn(@RequestParam HashMap<String, Object> paramMap) 	{
		
		int result = dao.selectInt("UrbanManage.checkServiceYn",paramMap);
		paramMap.put("code", result < 1 ? -1 : 0);
		
		return paramMap;
	}
	/**
	 * @comment	도시화를 삭제 합니다.(매핑도 같이 삭제합니다.)
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/removeUrban.do" , method=RequestMethod.POST)
	public int removeUrban(@RequestParam HashMap<String, Object> paramMap) 	{
		
		int result = 0;
		paramMap.put("code",(dao.remove("UrbanManage.removeUrbanData",paramMap) < 1) ? -1 : 0);
		paramMap.put("code",(dao.remove("UrbanManage.removeUrbanMapping",paramMap) < 1) ? -1 : 0);
		
		return result;
	}
	
	/**
	 * @comment	도시화를 삭제 합니다.(매핑도 같이 삭제합니다.)
	 * @param 	paramMap
	 * @return
	 * @author 2021년 SGIS4 도시화 KSG
	 */
	@ResponseBody
	@RequestMapping(value = "/api/urban/removeUrbanMappingByTwoCd.do" , method=RequestMethod.POST)
	public int removeUrbanMappingByTwoCd(@RequestParam HashMap<String, Object> paramMap) 	{
		
		int result = 0;
		paramMap.put("code",(dao.remove("UrbanManage.removeUrbanMappingByTwoCd",paramMap) < 1) ? -1 : 0);
		
		return result;
	}
}
