package kostat.sop.ServiceAPI.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/personal")
public class PersonalOpinionController {

	@Interceptor("PageCallReg")
	@RequestMapping(value="/personalMain")
	public ModelAndView getMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		return new ModelAndView("personal/personalMain");
	}
}
