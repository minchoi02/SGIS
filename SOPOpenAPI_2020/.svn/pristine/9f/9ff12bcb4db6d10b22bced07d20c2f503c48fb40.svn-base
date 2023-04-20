package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBarChartService;

/**
 * @Class Name : SggTypeOfBarChart.java
 * @Description : 시군구 막대차트를 조회하기 위한 API
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_LIFEBIZ_CORPCNT_SGG,SRV_DT_LIFEBIZ_CORPPER_SGG, SRV_DT_LIFEBIZ_PPLTNRATE_SGG, SRV_DT_LIFEBIZ_WORKERRATE_SGG, SRV_DT_LIFEBIZ_FAMILYRATE_SGG, SRV_DT_LIFEBIZ_WORKERCNT_SGG, SRV_DT_LIFEBIZ_AVGWORKER_SGG 
 * SRV_PG_SGGBORD  
 * 
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.09.11 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggTypeOfBarChart extends AbsAuthAPI< List< Map< String, Object > > >
{
	
	private SggTypeOfBarChartService sggTypeOfBarChartService;

	public SggTypeOfBarChartService getSggTypeOfBarChartService()
	{
		return sggTypeOfBarChartService;
	}

	public void setSggTypeOfBarChartService( SggTypeOfBarChartService sggTypeOfBarChartService )
	{
		this.sggTypeOfBarChartService = sggTypeOfBarChartService;
	}

	@Override
	public String getApiId()
	{
		return "API_0629";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List< Map< String, Object > > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		/*Map<String, String> parameter = getParameterMap( req );
		List<Map<String, Object>> list = sggTypeOfBarChartService.selectSggTypeOfBarChart( parameter );
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", list);
		return resultMap;*/
		Map< String, String > parameter = getParameterMap( req );
		return sggTypeOfBarChartService.selectSggTypeOfBarChart( parameter );
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getOptionParameter() throws AbsException
	{
		return null;
	}

	@SuppressWarnings("rawtypes")
	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
		,theme_cd
		,sido_cd
		,chart_or_map
		
	}

}
