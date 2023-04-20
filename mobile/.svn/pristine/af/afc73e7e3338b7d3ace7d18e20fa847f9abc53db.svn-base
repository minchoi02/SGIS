package egovframework.sgis.m2019.workroad.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyNeighberhoodJobController {

	//내 주변 일자리
	@RequestMapping(value = "/m2019/workroad/myNeighberhoodJobMap.sgis", method = RequestMethod.GET)
	public String myNeighberhoodJobMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		model.put("params", params);
		return "m2019/workroad/myNeighberhoodJobMap";
	}
	
}