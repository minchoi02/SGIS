package kostat.sop.ServiceAPI.api.edu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.EduService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class EduIssueList extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(EduIssueList.class);
	
	@Resource(name = "eduService")
	private EduService eduService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13613";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.GET;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		
		httpSession = req.getSession();
		List resultList = new ArrayList();
		Map result = new HashMap();
		
		try{
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			mapParameter.put("member_id",(String)httpSession.getAttribute("member_id"));
			mapParameter.put("school_grade", httpSession.getAttribute("ss_school_grade"));
			
			resultList = eduService.selectEduIssueList(mapParameter);
			result.put("resultList", resultList);
			
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{}
	enum OptionParam{
		thema_id,
		school_grade,
		main_yn
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
