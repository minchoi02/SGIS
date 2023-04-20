package kostat.lbdms.ServiceAPI.api;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.SrvLogWriteService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 1. 기능 : SrvLogWrite 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : SGIS+ 운영팀 1.0, 2019/05/30  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : SGIS+ 운영팀
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/srv/log")
public class SrvLogWriteAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(SrvLogWriteAPI.class);
	
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Resource(name="SrvLogWriteService")
	private SrvLogWriteService srvLogWriteService;
	
	/**
	 * SrvLogWrite 등록
	 * @param request
	 * @param response
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="srvLogWrite.do")
	public ModelAndView insertQnaInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			String fClass1Cd = (String)request.getParameter("f_class_1_cd");
			String fClass2Cd = (String)request.getParameter("f_class_2_cd");
			String fClass3Cd = (String)request.getParameter("f_class_3_cd");
			String fClass4Cd = (String)request.getParameter("f_class_4_cd");
			String detCd = (String)request.getParameter("det_cd");
			String param = (String)request.getParameter("param");
			
			String userId = (String)session.getAttribute("user_id");
			String ip = Security.getRemoteAddr(request);
			
			//sql indjection
			fClass1Cd = Security.sqlInjectionCheck(fClass1Cd);
			fClass2Cd = Security.sqlInjectionCheck(fClass2Cd);
			fClass3Cd = Security.sqlInjectionCheck(fClass3Cd);
			fClass4Cd = Security.sqlInjectionCheck(fClass4Cd);
			detCd = Security.sqlInjectionCheck(detCd);
			param = Security.sqlInjectionCheck(param);
			
			if(detCd == null || detCd.equals("undefined")) { 
				detCd = null; 
			}
			
			if(param == null || param.equals("undefined")) { 
				param = null; 
			}

			mapParameter.put("f_class_1_cd", fClass1Cd);
			mapParameter.put("f_class_2_cd", fClass2Cd);
			mapParameter.put("f_class_3_cd", fClass3Cd);
			mapParameter.put("f_class_4_cd", fClass4Cd);
			mapParameter.put("det_cd", detCd);
			mapParameter.put("param", param);
			mapParameter.put("member_id", userId);
			mapParameter.put("ip", ip);
			
			//운영이관시 복원 최인섭
			srvLogWriteService.SrvLogWrite(mapParameter);
		
			model.put("id", "G2G13003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G13003");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G13003");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
}