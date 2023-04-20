package kostat.sop.ServiceAPI.api.bizStats;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfBusinessGroupService;

public class SidoTypeOfBusinessGroup extends AbsQuery< Map<String, Object> > {
	
	private SidoTypeOfBusinessGroupService sidoTypeOfBusinessGroupService;

	public SidoTypeOfBusinessGroupService getSidoTypeOfBusinessGroupService()
	{
		return sidoTypeOfBusinessGroupService;
	}

	public void setSidoTypeOfBusinessGroupService( SidoTypeOfBusinessGroupService sidoTypeOfBusinessGroupService )
	{
		this.sidoTypeOfBusinessGroupService = sidoTypeOfBusinessGroupService;
	}

	@Override
	public String getApiId()
	{
		return "API_0613";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap( req );
		return sidoTypeOfBusinessGroupService.selectSidoTypeOfBusinessGroup( parameter );
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		return OptionParam.class;
	}

	protected void optimizeParameterMap( Map mapParameter ) throws AbsException {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		sido_cd
		, theme_cd
	}
	
	private enum OptionParam 
	{
		accessToken
	}
	
}
