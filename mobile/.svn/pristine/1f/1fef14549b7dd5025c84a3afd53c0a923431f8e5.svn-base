package egovframework.sgis.member.web;

import java.security.Principal;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egovframework.sgis.cmmn.util.PagedListHolder;
import egovframework.sgis.member.service.MemberService;

@Controller
public class MemberController {
	@Resource(name = "memberService")
	private MemberService memberService;
	@RequestMapping(value = "/choose/login.sgis", method = RequestMethod.GET)
	public String choose_login() throws Exception {
		return "member/login/login-choose";
	}
	@RequestMapping(value = "/login.sgis")
	public String login() throws Exception {
		return "member/login/login-local";
	}
	@RequestMapping(value = "/kosis/login.sgis")
	public String kosis_login() throws Exception {
		return "member/login/login-kosis";
	}
	@RequestMapping(value="/kosis/loginprocess.sgis")
	public String loginprocess(
			HttpServletRequest request, 
			HttpServletResponse response
			) throws Exception {
		return memberService.loginProcess(request, response);
	}
	@RequestMapping(value = "/mypage.sgis", method = RequestMethod.GET)
	public String mypage(
			HttpServletResponse response,
			Principal principal,
			ModelMap model,
			PagedListHolder holder
			) throws Exception {
		memberService.setBookmark(response, principal, holder, "IMAP");
		model.addAttribute("holder",holder);
		return "member/mypage";
	}
}
