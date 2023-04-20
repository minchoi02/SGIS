package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfWorkerInfoService;

/**
 * @Class Name : SidoTypeOfWorkerInfo.java
 * @Description : 시도 생활업종정보 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDOLIFEBIZ_INTRO
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.11
 *
 * @author (주)웨이버스 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SidoTypeOfWorkerInfo extends AbsAuthAPI< Map<String, Object> >
{

	private SidoTypeOfWorkerInfoService sidoTypeOfWorkerInfoService;
	
	public SidoTypeOfWorkerInfoService getSidoTypeOfWorkerInfoService()
	{
		return sidoTypeOfWorkerInfoService;
	}

	public void setSidoTypeOfWorkerInfoService( SidoTypeOfWorkerInfoService sidoTypeOfWorkerInfoService )
	{
		this.sidoTypeOfWorkerInfoService = sidoTypeOfWorkerInfoService;
	}

	@Override
	public String getApiId()
	{
		return "API_0620";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap( req );
		List<HashMap<String, Object>> list = sidoTypeOfWorkerInfoService.selectSidoTypeOfWorkerInfo( parameter );
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", list);
		return resultMap;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getOptionParameter() throws AbsException { return null; }

	@SuppressWarnings("rawtypes")
	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception { }

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
//		, sido_cd
	}
}
