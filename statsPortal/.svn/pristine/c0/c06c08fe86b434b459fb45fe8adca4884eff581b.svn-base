package kostat.sop.ServiceAPI.api.workRoad.todayStatus;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetToday extends AbsQuery<String>{

	private static final Log logger = LogFactory.getLog(GetToday.class);

	enum MustParam {
	}
	
	enum OptionParam {
		separator,		// 년월일 구분자
		year,			// 년도 꼬리말
		month,			// 월 꼬리말
		day,			// 일 꼬리말
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "111106";
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
	public String executeAPI(HttpServletRequest req, HttpServletResponse res, String arg2) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		String result = "";
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String sepa = (mapParameter.get("separator") != null) ? mapParameter.get("separator").toString() : "";
			String year = (mapParameter.get("year") != null) ? mapParameter.get("year").toString() : "";
			String month = (mapParameter.get("month") != null) ? mapParameter.get("month").toString() : "";
			String day = (mapParameter.get("day") != null) ? mapParameter.get("day").toString() : "";
			
			String date = session.selectOne("wrTodayStatus.getLatestRegDate");
			String y = date.substring(0, 4); 
			String m = date.substring(4, 6);
			String d = date.substring(6, 8);
			
			result = y + year + sepa + m + month + sepa + d + day; 

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
