package egovframework.sgis.map.web;

import java.io.IOException;
import java.net.URLEncoder;
import java.security.Principal;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import egovframework.sgis.cmmn.exception.ValidExceptionToJson;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.map.command.CommonCommand;
import egovframework.sgis.map.command.CommunityPoiCommand;
import egovframework.sgis.map.service.CommunityService;
import egovframework.sgis.map.service.HouseService;
import egovframework.sgis.map.service.ThematicService;
import egovframework.sgis.member.service.MemberService;

@Controller
public class MapJsonController {
	@Resource(name = "memberService")
	private MemberService memberService;
	@Resource(name = "communityService")
	private CommunityService communityService;
	@Resource(name = "thematicService")
	private ThematicService thematicService;
	@Resource(name = "houseService")
	private HouseService houseService;
	private final String PRODUCES = "application/json; charset=UTF-8;";
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}	
	@RequestMapping(value = "/communityList.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData communityList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command) {
		return communityService.getCommunityJsonList(request,response,principal,command); 
	}
	@RequestMapping(value = "/community/poiList.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData poiList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command) {
		return communityService.getCmmntyPoiListJson(request,response,principal,command); 
	}
	@RequestMapping(value = "/community/poi.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData poi(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command) {
		return communityService.getCmmntyPoiJson(request,response,principal,command); 
	}
	@RequestMapping(value = "/community/registPoi.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public void communityFormPost(
			@Valid CommunityPoiCommand command,
			BindingResult result,
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal) throws IOException {
		communityService.registCommunityPoiFormJson(request, response, result, principal, command);
		response.sendRedirect(request.getContextPath() + "/map/community.sgis?id=" + request.getParameter("cmmnty_map_id"));
	}
	@RequestMapping(value = "/community/join.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData join(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			String id) throws Exception {
		return communityService.joinJson(request, response, principal, id);
	}
	@RequestMapping(value = "/community/dropuser.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData dropuser(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			String id) throws Exception {
		return communityService.dropuserJson(request, response, principal, id);
	}
	@RequestMapping(value = "/community/reply/regist.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData replyRegist(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			String cmmnty_map_id,
			String cmmnty_poi_id,
			String content) throws Exception {
		return communityService.registReplyJson(request, response, principal, cmmnty_map_id, cmmnty_poi_id,content);
	}
	@RequestMapping(value = "/community/reply/modify.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData replyModify(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal) throws Exception {
		return communityService.updateReplyJson(request, response, principal);
	}
	@RequestMapping(value = "/community/reply/delete.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData replyDelete(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal) throws Exception {
		return communityService.deleteReplyJson(request, response, principal);
	}
	
	/** 2020.09.16[한광희] 메인 지역현안 소통지도 수정 START */
	@RequestMapping(value = "/mainCommunityList.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData mainCommunityList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command) {
		return communityService.getMainCommunityJsonList(request,response,principal,command); 
	}
	/** 2020.09.16[한광희] 메인 지역현안 소통지도 수정 END */
}
