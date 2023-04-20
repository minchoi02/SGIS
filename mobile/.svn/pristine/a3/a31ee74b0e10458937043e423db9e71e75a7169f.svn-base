package egovframework.sgis.etc.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class CommonController {
	@RequestMapping(value = "/forbidden.sgis")
	public String error() throws Exception {
		return "errors/403";
	}
	@RequestMapping(value = "/popup/juso.sgis")
	public String juso(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		res.addHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept");
		
		return "popup/juso";
	}
	@RequestMapping(value = "/search.sgis",method = RequestMethod.GET)
	public String search() throws Exception {
		return "search";
	}
	@RequestMapping(value = "/board/{jsp}.sgis",method = RequestMethod.GET)
	public String introduction(@PathVariable String jsp) throws Exception {
		return "board/"+jsp;
	}
}
