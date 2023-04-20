package kostat.lbdms.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.BndDmcService;
import kostat.lbdms.ServiceAPI.controller.service.DnmtService;
import kostat.lbdms.ServiceAPI.controller.service.TimeSeriesService;

@Controller
@RequestMapping(value="/view/urban")
public class UrbanAdminController {


	@Resource(name = "dnmtService")
	private DnmtService dnmtService;

	@Resource(name = "bndDmcService")
	private BndDmcService bndDmcService;

	@Resource(name = "timeSeriesService")
	private TimeSeriesService timeSeriesService;

	@Interceptor("PageCallReg")
    @RequestMapping(value="/resultUrbar")
    public ModelAndView resultUrbar(ModelMap model,HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView("urban/resultUrbar");
    }

	@Interceptor("PageCallReg")
	@RequestMapping(value="/demarcation")
	public ModelAndView demarCation( HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("urban/demarcation");

	}

	@Interceptor("PageCallReg")
	@RequestMapping(value="/demarcation/demarcationDetail")
	public ModelAndView demarcationDetail(@ModelAttribute("selectedId")String selectedId ,ModelMap model,HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("urban/demarcationDetail");
	}
	@Interceptor("PageCallReg")
	@RequestMapping(value="/denomination")
	public ModelAndView denomination(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("urban/denomination");
	}

	@Interceptor("PageCallReg")
	@RequestMapping(value="/denomination/denominationDetail",method= {RequestMethod.POST})
	public ModelAndView denominationDetail(@ModelAttribute("selectedId")String selectedId,HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("urban/denominationDetail");
	}

	@Interceptor("PageCallReg")
	@RequestMapping(value="/timeSeries")
	public ModelAndView timeSeries(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("urban/timeSeries");
	}


	@Interceptor("PageCallReg")
	@RequestMapping(value="/timeSeries/timeSeriesDetail")
	public ModelAndView timeSeriesDetail(@ModelAttribute("selectedId")String selectedId,HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("urban/timeSeriesDetail");
	}


}
