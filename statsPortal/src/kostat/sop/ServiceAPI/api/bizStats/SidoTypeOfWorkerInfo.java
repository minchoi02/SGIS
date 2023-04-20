package kostat.sop.ServiceAPI.api.bizStats;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfWorkerInfoService;

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
public class SidoTypeOfWorkerInfo extends AbsQuery< Map<String, Object> > {

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
		return null;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getOptionParameter() throws AbsException { return OptionParam.class; }

	@SuppressWarnings("rawtypes")
	protected void optimizeParameterMap( Map mapParameter ) throws AbsException { }

	@Override
	protected String getQueryStr() { return null; }
	
	private enum OptionParam
	{
		accessToken
	}
}
