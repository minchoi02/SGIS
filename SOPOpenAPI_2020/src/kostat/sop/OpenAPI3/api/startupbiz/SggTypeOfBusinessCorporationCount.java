package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBusinessCorporationCountService;

public class SggTypeOfBusinessCorporationCount
		extends AbsAuthAPI< List< Map< String, Object > > >
{
	private SggTypeOfBusinessCorporationCountService sggTypeOfBusinessCorporationCountService;
	
	public SggTypeOfBusinessCorporationCountService getSggTypeOfBusinessCorporationCountService()
	{
		return sggTypeOfBusinessCorporationCountService;
	}

	public void setSggTypeOfBusinessCorporationCountService( SggTypeOfBusinessCorporationCountService sggTypeOfBusinessCorporationCountService )
	{
		this.sggTypeOfBusinessCorporationCountService = sggTypeOfBusinessCorporationCountService;
	}

	@Override
	public String getApiId()
	{
		return "API_0615";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List< Map< String, Object > > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map< String, String > parameter = getParameterMap( req );
		return sggTypeOfBusinessCorporationCountService.selectSggTypeOfBusinessCorporationCount( parameter );
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException { return null; }

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam
	{
		accessToken
		, theme_cd
	}
}
