package kostat.sop.ServiceAPI.pss.controller;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.utils.DateTime;


import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.CommonService;
import kostat.sop.ServiceAPI.controller.view.CommonController;
import kostat.sop.ServiceAPI.pss.service.PssRequestService;
import kostat.sop.ServiceAPI.pss.vo.PssVo;
import kr.co.offton.jdf.db.RecordModel;
import kr.co.offton.jdf.util.StringUtil;
import kr.co.offton.pdf.Const;
import kr.co.offton.pdf.basis.GeneralBroker;
import kr.co.offton.pdf.basis.LData;

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/pss")
public class PssRequestController {
	
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(CommonController.class);
	
	@Resource(name="commonService")
	private CommonService commonService;
	
	@Resource(name="pssRequestService")
	private PssRequestService pssRequestService;
	
	
	/**
	 * 잘못된 페이지 접근
	 * @param request
	 * @param response
	 * @return common/errorCode
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/errorCode")
	public ModelAndView errorCode(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/errorCode");
	}
	
	/**
	 * 자료제공 소개
	 * @param request
	 * @param response
	 * @return common/searchList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/dataProvdIntrcn")
	public ModelAndView info(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("pss/dataProvdIntrcn");
	}
	

	/**
	 * 자료제공 목록
	 * @param request
	 * @param response
	 * @return common/searchList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/openDataIntrcn")
	public ModelAndView shortcutList(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("pss/openDataIntrcn");
	}
	
	
	/**
	 * 자료제공 자료신청
	 * @param request
	 * @param response
	 * @return common/searchList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/downloadList")
	public ModelAndView dwonloadList(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("pss/downloadList");
	}
	
	/**
	 * 자료제공 신청내역
	 * @param request
	 * @param response
	 * @return common/searchList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/requstDataList")
	public ModelAndView appList(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("pss/requstDataList");
	}
	
	
	/**
	 * 센서스 공간 통계 자료신청 내역
	 * @param request
	 * @param response
	 * @return common/searchList
	 * @throws SQLException 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/requstDataListDtl")
	public ModelAndView appInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("code", "001");
		
		List<Object> list = pssRequestService.selectCategoryCode(map);
		model.addAttribute("sgisCensusCode",list);
		
		map.put("code", "002");
		List<Object> list2 = pssRequestService.selectCategoryCode(map);
		model.addAttribute("purposeCode",list2);
		
		List<Object> list3 = pssRequestService.selectCensusCode(map);
		model.addAttribute("censusCode",list3);
		
		//CENSUS_APPLY_INFO
		
		return new ModelAndView("pss/requstDataListDtl");
	}
	
	/**
	 * 자료제공 신청자료 삭제
	 * @param request
	 * @param response
	 * @return common/searchList
	 */
	@ResponseBody
	@RequestMapping(value="/deleteRequestData", produces="application/json;charset=UTF-8")
	public String addDelete(HttpServletRequest request, HttpServletResponse response, ModelMap model, HttpSession session) {
		
		GeneralBroker broker = null;
		RecordModel rm = null;
		
		LData lData  = new LData();
		String msg = "";
		//sgis_census_req_id
		//sgis_census_req_id
		//
		//lData.setString("sgis_census_req_sosok", sgis_census_req_sosok);
		//census_output_area_year = ;
		String str = request.getParameter("sgis_census_req_id");
		if(str =="" || str ==null) return "정상적으로 처리되지 않았습니다.";
		
		try {

			broker = new GeneralBroker("ceaa00");
			
			lData.setString("sgis_census_req_id",str );

		    // 센서스자료신청년도 삭제
			lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
			broker.process(Const.P_DEL, lData);
			
		    // 센서스자료신청 삭제
			lData.setString("PARAM", "REMOVE_CENSUS_REQ");
			broker.process(Const.P_DEL, lData);			    
			
			msg = "삭제되었습니다.";	
		}catch(Exception e) {
				System.out.print("sgisWebError : ");
				msg = "정상적으로 처리되지 않았습니다.";
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		
		return msg;
	}
	
	
	
	/**
	 * 자료제공 신청
	 * @param request
	 * @param response
	 * @return common/searchList
	 * @throws SQLException 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/requestData")
	public ModelAndView mapApp(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("code", "001");
		
		List<Object> list = pssRequestService.selectCategoryCode(map);
		model.addAttribute("sgisCensusCode",list);
		
		map.put("code", "002");
		List<Object> list2 = pssRequestService.selectCategoryCode(map);
		model.addAttribute("purposeCode",list2);
		
		List<Object> list3 = pssRequestService.selectCensusCode(map);
		model.addAttribute("censusCode",list3);
		
		return new ModelAndView("pss/requestData");
	}
	
	/**
	 * 자료제공 옵션
	 * @param request
	 * @param response
	 * @return common/searchList
	 * @throws SQLException 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/requestOptionData")
	public ModelAndView shortcutData(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		
		HashMap<String, Object> map = new HashMap<>();
		String mode = request.getParameter("mode");  
		
		
		
		
		if(mode.equals("1")) {
			map.put("code", request.getParameter("sgis_census_id"));
			List<Object> list = pssRequestService.selectCensusData(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","radio");
			model.addAttribute("fromName","sgis_census_data_id");
			model.addAttribute("functionName","radioCleck");
			
		}else if(mode.equals("2")) {
			
			map.put("sgis_census_id", request.getParameter("sgis_census_id"));
			map.put("sgis_census_data_id", request.getParameter("sgis_census_data_id"));
			map.put("census_output_area_year", request.getParameter("census_output_area_year"));
			
			List<Object> list = pssRequestService.selectCensusYear(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","select");
			model.addAttribute("fromName","detail_data_id");
			model.addAttribute("functionName","selectCheang");
			model.addAttribute("census_output_area_year",request.getParameter("census_output_area_year"));;
			
		}else if(mode.equals("4")) {
			
			map.put("sgisCensusDataId", request.getParameter("sgis_census_id"));
			map.put("sgisCensusYear", request.getParameter("sgis_census_year"));
			map.put("sgisCensusDataId", request.getParameter("sgis_census_data_id"));
			map.put("census_output_area_year", request.getParameter("census_output_area_year"));
			
			
			List<Object> list = pssRequestService.selectCensusDetail(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","checkBox");
			model.addAttribute("fromName","detail_data_id");
			model.addAttribute("functionName","selectCheang");
			
			
			
		}else if(mode.equals("5")) {
			
			map.put("sgis_census_id", request.getParameter("sgis_census_id"));
			map.put("sgis_census_data_id", request.getParameter("sgis_census_data_id"));
			map.put("base_year", request.getParameter("sgis_census_year"));
			map.put("census_output_area_year", request.getParameter("census_output_area_year"));
			
			
			List<Object> list = pssRequestService.selectCensusSido(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","sidoSelect");
			model.addAttribute("functionName","selectCheang");
			
		}else if(mode.equals("6")) {
			
			map.put("sgis_census_id", request.getParameter("sgis_census_id"));
			map.put("sgis_census_data_id", request.getParameter("sgis_census_data_id"));
			map.put("census_output_area_year", request.getParameter("census_output_area_year"));
			map.put("sgis_census_data_id", request.getParameter("sgis_census_data_id"));
			
			String yearSido = request.getParameter("year_sido");
			String sidoCode = yearSido.substring(4,6);
			String sidoYear = yearSido.substring(0,4);
			
			
			map.put("base_year", sidoYear);
			map.put("sido_cd", sidoCode);
			
			
			List<Object> list = pssRequestService.selectCensusSigungu(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","sigunguSelect");
			model.addAttribute("functionName","selectCheang");
			
		}else if(mode.equals("7")) {
			map.put("code", request.getParameter("codeValue"));
			List<Object> list = pssRequestService.selectCodeList(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","selectCode");
			model.addAttribute("fromName","detail_data_id");
			model.addAttribute("functionName","selectCheang");
			model.addAttribute("census_output_area_year",request.getParameter("census_output_area_year"));;
			
		}else if(mode.equals("8")) {
			map.put("code", "1");
			List<Object> list = pssRequestService.selectCodeList(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","selectCode");
			model.addAttribute("fromName","detail_data_id");
			model.addAttribute("functionName","selectCheang");
			model.addAttribute("census_output_area_year",request.getParameter("census_output_area_year"));;
			
		}else if(mode.equals("9")) {
			map.put("code", "10");
			List<Object> list = pssRequestService.selectAreaCodeList(map);
			model.addAttribute("listData",list);
			model.addAttribute("viewType","sidoSelect2");
			model.addAttribute("fromName","detail_data_id");
			model.addAttribute("functionName","selectCheang");
			model.addAttribute("census_output_area_year",request.getParameter("census_output_area_year"));;
			
		}
		
		
		model.addAttribute("sgis_census_id",request.getParameter("sgis_census_id"));
		model.addAttribute("sgis_census_data_id",request.getParameter("sgis_census_data_id"));
		model.addAttribute("sgis_census_year",request.getParameter("sgis_census_year"));
		model.addAttribute("census_output_area_year",request.getParameter("census_output_area_year"));
		
		return new ModelAndView("pss/requestOptionData");
	}
	
	
	/**
	 * 자료제공 소개
	 * @param request
	 * @param response
	 * @return common/searchList
	 * @throws SQLException 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/requestGridMap")
	public ModelAndView  shortcutMap(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		return new ModelAndView("pss/requestGridMap");
	}
	
	/**
	 * 자료제공 소개
	 * @param request
	 * @param response
	 * @return common/searchList
	 * @throws SQLException 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/requestGridMapSub")
	public ModelAndView  shortcutMapSub(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		return new ModelAndView("pss/requestGridMapSub");
	}
	
	/**
	 *  자료신청 저장 (2022 06 28 이준혁 
	 * @param request
	 * @param response
	 * @return board/qnaModify
	 * @throws Exception 
	 */
	
	@ResponseBody
	@RequestMapping(value="/saveRequestData", produces="application/json;charset=UTF-8")
	public String saveData(HttpServletRequest request, HttpServletResponse response, ModelMap model, HttpSession session, PssVo pssVo) throws Exception {
		
		pssVo.setSgis_userkey(request.getParameter("param_userkey"));
		pssVo.setSec_reg_time(((String)session.getAttribute("sec_reg_time")));
        Map resultMap = pssRequestService.savePssData(pssVo);
		return resultMap.get("msg").toString();
	}

}