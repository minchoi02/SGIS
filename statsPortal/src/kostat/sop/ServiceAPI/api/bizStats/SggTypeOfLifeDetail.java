package kostat.sop.ServiceAPI.api.bizStats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.SggTypeOfLifeDetailService;

public class SggTypeOfLifeDetail extends AbsQuery< Map<String, Object> > {

	private SggTypeOfLifeDetailService sggTypeOfLifeDetailService;

	public SggTypeOfLifeDetailService getSidoTypeOfLifeDetailService()
	{
		return sggTypeOfLifeDetailService;
	}

	public void setSggTypeOfLifeDetailService( SggTypeOfLifeDetailService sggTypeOfLifeDetailService )
	{
		this.sggTypeOfLifeDetailService = sggTypeOfLifeDetailService;
	}
	
	@Override
	public Map<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId )
			throws AbsException {
		Map<String, String> parameter = getParameterMap( req );
		List<Map<String, Object>> list = sggTypeOfLifeDetailService.selectSggTypeOfLifeDetail( parameter );
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", list);
		return resultMap;
	}

	@Override
	public String getApiId() {
		return "API_0626";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException { 
		return OptionParam.class; 
	}

	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}
	
	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		
		sido_cd
		, sgg_cd
		, theme_cd
	}
	
	private enum OptionParam 
	{
		accessToken
	}
}
