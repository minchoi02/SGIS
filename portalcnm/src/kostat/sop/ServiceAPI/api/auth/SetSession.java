package kostat.sop.ServiceAPI.api.auth;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsCnm;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Success;

/**   
 *
 * @ClassName: SetSession
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月28日 上午9:13:12    
 * @version V1.0      
 *    
 */
public class SetSession extends AbsQuery<Success> {
	private static final Log logger = LogFactory.getLog(SetSession.class);
	@Override
	public String getApiId() {
		return "auth_setsession";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		if(getSession(req, "manager_id") == null){	
			Map param=getParameterMap(req);
			if(param.get("grade").equals("S")){
				req.getSession().setAttribute("manager_id", "admin1");
				req.getSession().setAttribute("manager_grade", "SA");
			}else if(param.get("grade").equals("M")){
				req.getSession().setAttribute("manager_id", "admin2");
				req.getSession().setAttribute("manager_grade", "MA");
			}else{
				req.getSession().setAttribute("manager_id", "admin3");
				req.getSession().setAttribute("manager_grade", "GA");
			}
			req.getSession().setAttribute("sessionId", req.getSession().getId());
			
			req.getSession().setAttribute("manager_nm", "윤지혜");
			req.getSession().setAttribute("last_access_ip", "211.41.186.163");
			if (logger.isDebugEnabled()) {
				logger.debug("================================================================");
				logger.debug("sessionId      = "  + req.getSession().getAttribute("sessionId"));				
				logger.debug("manager_id      = " + req.getSession().getAttribute("manager_id"));
				logger.debug("manager_nm      = " + req.getSession().getAttribute("manager_nm"));
				logger.debug("manager_grade   = " + req.getSession().getAttribute("manager_grade"));
				logger.debug("last_access_ip   = " + req.getSession().getAttribute("last_access_ip"));
				logger.debug("================================================================");
			}
			
		}
		return new Success(true,"this is for test. setsession ");
	}

	
	
	@Override
	public Class getMustParameter() throws AbsException {
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	
	private enum OptionParam{
		grade
	}

}
