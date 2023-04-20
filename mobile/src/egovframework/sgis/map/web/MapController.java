package egovframework.sgis.map.web;

import java.security.Principal;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egovframework.sgis.map.service.CommunityService;
import egovframework.sgis.map.service.HouseService;
import egovframework.sgis.map.service.ThematicService;
import egovframework.sgis.member.service.MemberService;

@Controller
public class MapController {
	@Resource(name = "memberService")
	private MemberService memberService;
	@Resource(name = "communityService")
	private CommunityService communityService;
	@Resource(name = "thematicService")
	private ThematicService thematicService;
	@Resource(name = "houseService")
	private HouseService houseService;

	@RequestMapping(value = "/map/thematic.sgis", method = RequestMethod.GET)
	public String thematic(ModelMap model,String id, String ref_adm_id) throws Exception {
		return thematicService.getThematicPage(model,id,ref_adm_id);
	}
	@RequestMapping(value = "/map/interactive.sgis", method = RequestMethod.GET)
	public String interactive(ModelMap model,String id) throws Exception {
		model.addAttribute("bookmark",memberService.getBookmark(id));	
		return "map/interactive/map";
	}
	@RequestMapping(value = "/map/current.sgis", method = RequestMethod.GET)
	public String current() throws Exception {
		return "map/current/map";
	}
	@RequestMapping(value = "/community.sgis", method = RequestMethod.GET)
	public String intro() throws Exception {
		return "map/community/intro";
	}
	@RequestMapping(value = "/map/community.sgis", method = RequestMethod.GET)
	public String community(
			HttpServletResponse response,
			Principal principal,
			ModelMap model,
			String id) throws Exception {
		communityService.getCommunity(response,model,principal,id);
		return "map/community/map";
	}
	@RequestMapping(value = "/map/community/form.sgis", method = RequestMethod.GET)
	public String communityFormGet(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			ModelMap model,
			String id) throws Exception {
		communityService.forbiddenCommunityRegist(request, response, model, principal, id);
		return "map/community/form";
	}
	@RequestMapping(value = "/map/house.sgis", method = RequestMethod.GET)
	public String house(
			ModelMap model
			) throws Exception {
		model.addAttribute("mlsfcLists",houseService.getMlsfcLists());
		model.addAttribute("idealTypeLists",houseService.getIdealTypeLists());
		model.addAttribute("lifeStyle",houseService.selectLifeStyleLists());
		return "map/house/map";
	}
	
	@RequestMapping(value = "/map/biz.sgis", method = RequestMethod.GET)
	public String biz(
			ModelMap model
			) throws Exception {
		return "map/biz/map";
	}
	@RequestMapping(value = "/map/sample.sgis", method = RequestMethod.GET)
	public String sample(
			ModelMap model
			) throws Exception {
		return "map/sample/map";
	}
}
