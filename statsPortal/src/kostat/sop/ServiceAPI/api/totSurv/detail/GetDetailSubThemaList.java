package kostat.sop.ServiceAPI.api.totSurv.detail;

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

import kostat.sop.ServiceAPI.api.totSurv.population.GetTotPopulation;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetDetailSubThemaList extends AbsQuery<Map>{

private static final Log logger = LogFactory.getLog(GetTotPopulation.class);
	
	enum MustParam
	{	
	}

	enum OptionParam
	{
		selYear,
		selAdmCd
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116701";
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
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();	
		HashMap<String, Object> result =  new HashMap<String, Object>();

		//HashMap<String, String> subThemaMap =  new HashMap<String, String>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			
			// 년도 조회
			if(mapParameter.get("selYear") != null) {
				mapParameter.put("yearLength", mapParameter.get("selYear").toString().length());
			};
			
			// 지역 코드
			if(mapParameter.get("selAdmCd") != null) {
				mapParameter.put("admCdLength", mapParameter.get("selAdmCd").toString().length());
			};
			
			// 관심주제 목록 조회 
			List<Map> subThemaData = session.selectList("totSurvDetail.getDetailSubThemaList", mapParameter);
			
			result.put("subThemaData", subThemaData);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
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
