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

public class EduContents extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(EduContents.class);
	
	@Resource(name = "eduService")
	private EduService eduService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13604";
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
		Map result = new HashMap();
		Map contents = new HashMap();
		Map quiz = new HashMap();
		Map nextContents = new HashMap();
		List recommendContents = new ArrayList();
		List tagList = new ArrayList();
		
		try{
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			contents = eduService.selectEduContents(mapParameter);
			quiz = eduService.selectEduContentsQuiz(mapParameter);
			tagList = eduService.selectEduContentsHashtagList(mapParameter);
			nextContents = eduService.selectEduNextContents(mapParameter);
			
			//다른 주제의 콘텐츠 추천
			mapParameter.put("thema_id", contents.get("thema_id"));
			recommendContents = eduService.selectEduRecommendContents(mapParameter);
			
			result.put("contents", contents);
			result.put("quiz", quiz);
			result.put("tagList",tagList);
			result.put("nextContents",nextContents);
			result.put("recommendContents",recommendContents);
			
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{}
	enum OptionParam{
		thema_id,
		contents_id,
		school_grade
		
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
