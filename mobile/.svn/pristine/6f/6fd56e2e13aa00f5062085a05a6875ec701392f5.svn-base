package egovframework.sgis.event.web;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import egovframework.sgis.member.service.MemberService;

@Controller
public class EventController {
	
	@Resource(name = "memberService")
	private MemberService memberService;

	@RequestMapping(value = "/event.sgis", method = RequestMethod.GET)
	public String event( ModelMap model ) throws Exception {
		return "event/event";
	}
}
