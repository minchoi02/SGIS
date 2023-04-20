package egovframework.sgis.member.web;

import java.security.Principal;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.sgis.cmmn.util.EncryptPassword;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.member.model.StatsearchhistoryVO;
import egovframework.sgis.member.service.MemberService;

@Controller
public class MemberJsonController {
	@Resource(name = "memberService")
	private MemberService memberService;
	@RequestMapping(value = "/history.json", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public JsonData history(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			StatsearchhistoryVO history
			) {
		return memberService.insertHistoryJson(request, response, principal, history); 
	}
	@RequestMapping(value = "/kosis/pwencoding.json", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public JsonData pwencoding(
			HttpServletRequest request,
			HttpServletResponse response,
			String pw) {
		if(pw.isEmpty()){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_PARAM, "패스워드가 존재하지 않습니다", null);
		}else{
			EncryptPassword encryptPassword = new EncryptPassword();
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("pw", encryptPassword.encryptPassword_SHA256(pw));
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}
	}
	@RequestMapping(value = "/local/check.json", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public JsonData check(
			HttpServletRequest request,
			HttpServletResponse response) {
		return memberService.localLoginCheck(request, response);
	}
}
