package kostat.sop.ServiceAPI.api.statsMe.catalog;

import java.util.HashMap;
import java.util.Map;

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

public class SetStatsMeCatalogRecmdSrvUsageHistory extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SetStatsMeCatalogRecmdSrvUsageHistory.class);

	@Override
	public String getApiId() {
		return "115103";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return "statsMeCatalog.insertCtlgRecmdSrvUsgHist";
	}

	enum MustParam{
		statDataId
	}

	enum OptionParam{
		slctnKwrdSeq
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		//리턴 변수 선언
		HashMap<String,Object> result = new HashMap<String,Object>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
						
			int cnt = session.insert(getQueryStr(), mapParameter);
			result.put("seq", mapParameter.get("seq"));
			
			logger.info("END Query - TXID[" + getApiId() + "] " + "Cnt: " + cnt);
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
