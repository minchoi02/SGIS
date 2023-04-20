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

public class quiz extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(quiz.class);

	@Override
	public String getApiId() {
		return "919100";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		name,
		tel_no
	}
	
	enum OptionParam
	{
		ox_1,ox_2,ox_3,ox_4,ox_5,ox_6,ox_7,ox_8,ox_9,ox_10,ox_11,ox_12,ox_13,ox_14,ox_15,bigo1,bigo2,bigo3,bigo4,bigo5,sex
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, 
			String trId) throws AbsException {

		httpSession = req.getSession();
		Map result = new HashMap();
		
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			
			_checkNullParameterValue(mapParameter);
			
			int dupCnt = session.selectOne("quiz.selectQuizEvent", mapParameter);
			if( dupCnt > 0 ){
				session.update( "quiz.updateQuizEvent", mapParameter );
			} else {
				session.insert( "quiz.insertQuizEvent", mapParameter );
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return result;
	}
}
