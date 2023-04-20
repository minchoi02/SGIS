package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfBusinessInfoService;

/**
 * @Class Name : SidoTypeOfBusinessInfo.java
 * @Description : 시도 생활업종정보 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDOLIFEBIZ_INTRO
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.28 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SidoTypeOfBusinessInfo extends AbsAuthAPI< Map<String, Object> >
{

	private SidoTypeOfBusinessInfoService sidoTypeOfBusinessInfoService;
	
	public SidoTypeOfBusinessInfoService getSidoTypeOfBusinessInfoService()
	{
		return sidoTypeOfBusinessInfoService;
	}

	public void setSidoTypeOfBusinessInfoService( SidoTypeOfBusinessInfoService sidoTypeOfBusinessInfoService )
	{
		this.sidoTypeOfBusinessInfoService = sidoTypeOfBusinessInfoService;
	}

	@Override
	public String getApiId()
	{
		return "API_0611";
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
		HashMap<String, Object> map = new HashMap<>();
		map.put("data" , sidoTypeOfBusinessInfoService.selectSidoTypeOfBusinessInfo( parameter ));
		return map;
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException { return null; }

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception { }

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
		,sido_cd
	}
}
