package kostat.sop.ServiceAPI.quiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class survey extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(survey.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "919100";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
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
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}
	
	enum MustParam
	{
		name,
		tel_no
	}
	
	enum OptionParam
	{
		sex,
		survay1, survay2, survay3, survay4,  survay5, survay6, survay7, survay8, survay9, survay10,
		survay11, survay12, survay13, survay14, survay15, survay16, survay17, survay18, survay19, survay20,
		etc1, etc2, etc3, etc4, etc5, etc6, etc7, etc8, etc9, etc10,
		etc11, etc12, etc13, etc14, etc15, etc16, etc17, etc18, etc19, etc20
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, 
			String trId) throws AbsException {
		// TODO Auto-generated method stub

	httpSession = req.getSession();
		
		Map result = new HashMap();
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			
			int resultCnt = session.selectOne("quiz.selectSurveyEvent", mapParameter);
			result.put("resultCnt", resultCnt);
			
			if(resultCnt <= 0 ){
				session.insert("quiz.insertSurvey", mapParameter);
			} else {
				session.update("quiz.updateSurvey", mapParameter);
			}
				
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			logger.error(e);
			e.printStackTrace();
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			e.printStackTrace();
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
}
