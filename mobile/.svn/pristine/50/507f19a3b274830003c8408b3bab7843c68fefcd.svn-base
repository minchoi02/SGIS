package egovframework.sgis.m2020.community.web;


import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap; //20200902 박은식 communityPoiListDelete 파라미터 타입 추가
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2020.map.service.ViewService; //20200902 박은식 viewService 추가 (communityPoiListDelete 서비스 로직)
import egovframework.sgis.map.command.CommonCommand; //20200902 박은식 CommonCommand VO 추가
import egovframework.sgis.map.command.CommunityPoiCommand;
import egovframework.sgis.map.model.CommunityPoiVO;
import egovframework.sgis.map.service.CommunityService;

/**
 * 공통코드 조회
 * @date 2020. 7. 16.
 * @author 박은식
 * @comment  CommunityMap 소통지도 등록
 * 			 등록이후 페이지 이동 URL 변경으로 
 * 			 신규작성 			 
 */

@Controller
public class CommunityController {
	@Resource(name = "communityService")
	private CommunityService communityService;
	//20200902 박은식 POI 삭제관련 서비스 등록 start
	@Resource(name = "viewService")
	private ViewService veiwService;
	//20200902 박은식 POI 삭제관련 서비스 등록 end
	
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	private final String PRODUCES = "application/json; charset=UTF-8;";
	
	@RequestMapping(value = "/m2020/community/registPoi.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData communityFormPost(
			@Valid CommunityPoiCommand command,
			BindingResult result,
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal) throws IOException {
		return communityService.registCommunityPoiFormJson(request, response, result, principal, command);
//		response.sendRedirect(request.getContextPath() + "/m2020/map/community/map/communityMap.sgis?id=" + request.getParameter("cmmnty_map_id")); 
	}
	//20200902 박은식 POI 삭제관련 컨트롤러 생성 start
	@RequestMapping(value = "/m2020/community/deletePoi.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData communityPoiListDelete(
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model,
			Principal principal,
			CommonCommand commonCommand) throws IOException {
		
		String result = veiwService.deleteListJson(commonCommand);
		
		if( "success".equals( result ) ){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
		} else {
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}	
	//20200902 박은식 POI 삭제관련 컨트롤러 생성 end
	
	@RequestMapping(value = "/m2020/community/idPwCheck.json", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public JsonData idPwCheck(HttpServletRequest request, HttpServletResponse response, Principal principal, CommonCommand commonCommand
			, ModelMap model, CommunityPoiVO communityPoiVO ) throws IOException {
		try {
			String login_id = null;
			
			if( principal != null ){
				login_id = principal.getName();
			}
						
			communityPoiVO.setCmmnty_poi_id( request.getParameter("id") );
			communityPoiVO.setUsr_id( request.getParameter("check_id") );
			communityPoiVO.setPw( request.getParameter("check_pw") );
			
			commonCommand.setId( communityPoiVO.getCmmnty_poi_id() );
			
			HashMap<String, Object> result = communityService.idPwCheck( login_id, communityPoiVO, commonCommand );
			
			if( (boolean) result.get("success") ){
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
			} else {
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN, (String) result.get("msg"), null);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}	
}
