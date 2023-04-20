package kostat.sop.ServiceAPI.controller.view;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.EduCommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
//2017.12.06 [개발팀] 취약점점검

/**
 * 1. 기능 : 참여형 소통시도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠, 1.0, 2016/01/13  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping("/view/edu/{level}/community")
public class EduCommunityMapController {
	private final Log logger = LogFactory.getLog(EduCommunityMapController.class);
	
	@Resource(name="eduCommunityService")
	private EduCommunityService communityService;
	 
	/**
	 * 함께하는 지도 공통 header
	 */
	@RequestMapping(value="/header")
	public ModelAndView eduHeader( @PathVariable("level") String level, HttpServletRequest request, ModelMap model ) {
		try {
			getGrade( model, level );
			return new ModelAndView("edu/communityMap/communityHeader", model);
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
	}
	
	/**
	 * 함께하는 지도 목록 화면
	 */
	@RequestMapping(value="/together_list")
	public ModelAndView together_list( @PathVariable("level") String level, HttpServletRequest request, ModelMap model ) {
		try {
			getGrade( model, level );
			model.addAttribute("ss_grant_state", request.getSession().getAttribute("ss_grant_state"));
			model.addAttribute("ss_page_info", request.getSession().getAttribute("ss_page_info"));
			return new ModelAndView("edu/communityMap/together_list", model);
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
	}
	
	@RequestMapping(value="/together_form")
	public ModelAndView form( @PathVariable("level") String level, HttpServletRequest request, HttpServletResponse response, ModelMap model ) throws Exception, IllegalArgumentException {
		try {
			getGrade( model, level );
			return communityService.getForm(request, model);
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
		
	}
	
	@RequestMapping(value="/together_view")
	public ModelAndView view( @PathVariable("level") String level, HttpServletRequest request, HttpServletResponse response, ModelMap model ) throws Exception, IllegalArgumentException {
		try {
			getGrade( model, level );
			return communityService.view(request, model);
		} catch (Exception e) {
			e.printStackTrace();
			return new ModelAndView("redirect:/view/edu/index");
		}
	}
	
	@RequestMapping(value="/together_upload")
	public ModelAndView upload( @PathVariable("level") String level, HttpServletRequest request, HttpServletResponse response, ModelMap model ) throws Exception, IllegalArgumentException {
		try {
			getGrade( model, level );
			return communityService.dataUpload(request, response, model);
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
	}
	
	@RequestMapping(value = "/sample/download", method = RequestMethod.GET)
	public void sampleExcelDownload( @PathVariable("level") String level, HttpServletRequest request, HttpServletResponse response, ModelMap model ) throws Exception,IllegalArgumentException{
		communityService.getBatchSampleExcel(request, response);
	}
	
	@RequestMapping(value="/communityPath")
	public ModelAndView communityPath() throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/communityPath");
	}
	@RequestMapping(value="/communityLeftMenu")
	public ModelAndView communityLeftMenu() throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/view/communityLeftMenu");
	}
	@RequestMapping(value="/communityDataBoard")
	public ModelAndView communityDataBoard() throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/view/communityDataBoard");
	}
	@RequestMapping(value="/layerPopup/{type}")
	public ModelAndView include(@PathVariable String type) throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/view/layerPopup/"+type);
	}
	@RequestMapping(value="/form/layerPopup/{type}")
	public ModelAndView includeForm(@PathVariable String type) throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/form/"+type);
	}
	@RequestMapping(value="/form/layerPopup/{type}/{file}")
	public ModelAndView includeForm(@PathVariable String type,@PathVariable String file) throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/form/"+type+"/"+file);
	}
	@RequestMapping(value="/auth")
	public ModelAndView auth() throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/communityMapAuth");
	}
	
	@RequestMapping(value="/popup/joso")
	public ModelAndView juso(
			HttpServletRequest request, 
			HttpServletResponse response,
			ModelMap model
			) throws Exception,IllegalArgumentException {
		return communityService.juso(request, response, model);
	}
	@Interceptor("PageCallReg")
	@RequestMapping(value="/notice/{type}")
	public ModelAndView noticelist(
			HttpServletRequest request,
			HttpServletResponse response,
			@PathVariable String type
			) throws Exception,IllegalArgumentException {
		return new ModelAndView("edu/communityMap/notice/"+type);
	}
	@RequestMapping(value = "/getData", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String getData(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		return communityService.getFileDataToHandsontable(request);
	}
	@RequestMapping(value = "/member/regist", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String memberRegist(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		return communityService.memberRegist(request);
	}
	@RequestMapping(value = "/getBatchData", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String getBatchData(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		return communityService.getBatchFileDataToHandsontable(request);
	}
	
	@RequestMapping(value = "/poi/regist", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String poiRegist(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		return communityService.poiRegist(request);
	}
	@RequestMapping(value="/fileDownLoadSHP",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getSHPFile( @PathVariable("level") String level, HttpServletRequest request, HttpServletResponse response, ModelMap model ) throws Exception,IllegalArgumentException{
		getGrade( model, level );
		communityService.getPoiSHPFile(request, response);
	}
	@RequestMapping(value = "/check/password", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String checkPassword(
			@PathVariable("level") String level, HttpServletRequest request, ModelMap model
			) throws Exception,IllegalArgumentException{
		getGrade( model, level );
		return communityService.checkPassword(request);
	}
	@RequestMapping(value="/organUser", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String organUser(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException{
		return communityService.insertOrganUser(request, response);
	}
	
	public ModelMap getGrade( ModelMap model, String level ){
		String grade_nm = "";
		String grade = "";
		
		if( level != null && !"".equals( level ) ){
			grade_nm = ( "ele".equals( level ) ? "초등" : ( "mid".equals( level ) ? "중학" : "고교" ) );
			grade = ( "ele".equals( level ) ? "E" : ( "mid".equals( level ) ? "M" : "H" ) );
			
			if( ( !"ele".equals( level ) && !"mid".equals( level ) && !"high".equals( level ) ) ){
				throw new ApiException("잘못된 세션 정보 입니다.");
			}
		} else {
			throw new ApiException("잘못된 세션 정보 입니다.");
		}
		
		System.out.println("==	================================ grade >> " + grade);
		
		model.addAttribute("ss_school_level", level);
		model.addAttribute("ss_school_grade", grade);
		model.addAttribute("ss_school_grade_nm", grade_nm);
		
		return model;
	}
}