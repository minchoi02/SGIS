package kostat.sop.ServiceAPI.api.bizStats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfBusinessChartInfoService;

public class SidoTypeOfBusinessChartInfo extends AbsQuery< Map<String, Object> >
{

	private SidoTypeOfBusinessChartInfoService sidoTypeOfBusinessChartInfoService;
	
	public SidoTypeOfBusinessChartInfoService getSidoTypeOfBusinessChartInfoService()
	{
		return sidoTypeOfBusinessChartInfoService;
	}

	public void setSidoTypeOfBusinessChartInfoService( SidoTypeOfBusinessChartInfoService SidoTypeOfBusinessChartInfoService )
	{
		this.sidoTypeOfBusinessChartInfoService = SidoTypeOfBusinessChartInfoService;
	}

	@Override
	public String getApiId()
	{
		return "API_0619";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap( req );
		List<HashMap<String, Object>> list = sidoTypeOfBusinessChartInfoService.selectSidoTypeOfBusinessChartInfo( parameter );
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", list);
		return resultMap;
	}
	
	@Override
	public Class getMustParameter() throws AbsException {
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException { return OptionParam.class; }

	protected void optimizeParameterMap( Map mapParameter ) throws AbsException { }

	@Override
	protected String getQueryStr() { return null; }
	
	
	private enum OptionParam
	{
		accessToken
	}
}
