package kostat.sop.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;
import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.UrbanService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.common.security.Security;

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/urban")
public class UrbanController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(UrbanController.class);

	@Resource(name="urbanService")
	private UrbanService urbanService;

	/**
	 * 도시화 분석 지도 메인 조회
	 * @param request
	 * @param response
	 * @return urban/urbanMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/main")
	public ModelAndView getMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		/*
		SqlSession session = null;
		HashMap<String, Object> paramInfo = new HashMap<String, Object>();
		try {
			logger.info("START Query - select urban param Info");

			HashMap<String, Object> mapParameter = new HashMap<String, Object>();
			List testInfoList = urbanService.selectTestInfo(mapParameter);
			if(testInfoList != null && testInfoList.size() > 0) {
				HashMap testInfo = (HashMap)testInfoList.get(0);

				paramInfo.put("col1", testInfo.get("col1"));
				paramInfo.put("col2", testInfo.get("col2"));
				paramInfo.put("col3", testInfo.get("col3"));
			}


		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}

		return new ModelAndView("urban/urbanMain", "paramInfo", paramInfo);
		*/

		String u_menu = StringUtil.isNullToString(Security.sqlInjectionCheck(Security.cleanXss(request.getParameter("u_menu"))));
		String u_class = StringUtil.isNullToString(Security.sqlInjectionCheck(Security.cleanXss(request.getParameter("u_class"))));
		String u_type = StringUtil.isNullToString(Security.sqlInjectionCheck(Security.cleanXss(request.getParameter("u_type"))));
		String u_year = StringUtil.isNullToString(Security.sqlInjectionCheck(Security.cleanXss(request.getParameter("u_year"))));
		String u_area = StringUtil.isNullToString(Security.sqlInjectionCheck(Security.cleanXss(request.getParameter("u_area"))));
		String u_dstrct = StringUtil.isNullToString(Security.sqlInjectionCheck(Security.cleanXss(request.getParameter("u_dstrct"))));
		String u_ksic = StringUtil.isNullToString(Security.sqlInjectionCheck(Security.cleanXss(request.getParameter("u_ksic"))));

		model.addAttribute("u_menu", u_menu);
		model.addAttribute("u_class", u_class);
		model.addAttribute("u_type", u_type);
		model.addAttribute("u_year", u_year);
		model.addAttribute("u_area", u_area);
		model.addAttribute("u_dstrct", u_dstrct);
		model.addAttribute("u_ksic", u_ksic);

		return new ModelAndView("urban/urbanMain");
	}

}
