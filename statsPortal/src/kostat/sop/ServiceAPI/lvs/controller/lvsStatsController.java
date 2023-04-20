package kostat.sop.ServiceAPI.lvs.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.lvs.service.LvsStatsService;
import kostat.sop.ServiceAPI.lvs.vo.LvsSeekVO;
import kostat.sop.ServiceAPI.lvs.vo.LvsVO;

/**
 * 1. 기능 : 지역변화분석지도 컨트롤러 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : s.j.Doka, 1.0, 2022/10/7  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : s.j.Doka
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@RequestMapping(value = "/view/lvs")
public class lvsStatsController {
	
	/**
	 * 지역변화분석지도 > 프레임 > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/lvs/main
	 * @throws Exception 
	 */
	
	private final Log logger = LogFactory.getLog(lvsStatsController.class);
	
	@Resource(name = "lvsStatsService")
	private LvsStatsService lvsStatsService;
	
	@RequestMapping(value = "/main")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		return new ModelAndView("lvs/lvsStatsMain");
	}
	
	@RequestMapping(value = "/main2")
	public ModelAndView main2(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		return new ModelAndView("lvs/lvsStatsMain2");
	}

	@ResponseBody
	@RequestMapping(value = "/dataList", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectMainDataInfo(@RequestBody(required = false) LvsVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		return lvsStatsService.selectMainDataList(vo);
	}
	
	@ResponseBody
	@RequestMapping(value = "/dataCompareRegion", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectMainDataCompRegionInfo(@RequestBody(required = false) LvsVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		return lvsStatsService.selectMainDataCompRegionInfoInfo(vo);
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/dataRecList", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectRecDataList(@RequestBody(required = false) LvsVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		return lvsStatsService.selectRecDataList(vo);
	}
	
	@ResponseBody
	@RequestMapping(value = "/dataRecListByReg", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectRecDataListByReg(@RequestBody(required = false) LvsVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		return lvsStatsService.selectRecDataListByReg(vo);
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/dataRecListByYear", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectRecDataListByYear(@RequestBody(required = false) LvsVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		return lvsStatsService.selectRecDataListByYear(vo);
	}
	
	@ResponseBody
	@RequestMapping(value = "/dataCensusIndexYearList", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectCensusDataYearList(@RequestBody(required = false) LvsVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		return lvsStatsService.selectCensusIndexYearList(vo);
	}

	@ResponseBody
	@RequestMapping(value = "/dataStatList", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectAllDataList(@RequestBody(required = false) LvsSeekVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		//return null;
		return lvsStatsService.selectAllDataList(vo);
	}
	
	//url 테스트
	@ResponseBody
	@RequestMapping(value = "/datatype3", produces="application/json;charset=UTF-8")
	public List<Map<String, Object>> selectAllDataType3(@RequestBody(required = false) LvsSeekVO vo,  ModelMap model ) throws Exception {
		System.out.println(vo.toString());
		//return null;
		return lvsStatsService.selectAllDataList(vo);
	}


}
