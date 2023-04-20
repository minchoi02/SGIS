package kostat.sop.ServiceAPI.api.thematicMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetNetworkData extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(GetNetworkData.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9049";
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
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		area
	}
	
	enum OptionParam
	{
		base_year, region, stat_thema_map_id, data_type, weight, adm_cd, stat_data_base_year
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		
		httpSession = req.getSession();
		
		String type = "";
		List result = null;
		
		Map mapParameter= getParameterMap(req);
		
		_checkNullParameterValue(mapParameter);
		
		if(mapParameter.get( "data_type" ) != null)
			type = (String) mapParameter.get( "data_type" );
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			if (type.equals("pt"))
				result = (List) session.selectList("thematicMap.select.networkDataPTList", mapParameter);
			else 
				result = (List) session.selectList("thematicMap.select.getNetworkData", mapParameter);
						
			
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