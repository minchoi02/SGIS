package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SidoIndexOrderService;

/**
 * @Class Name : SidoIndexOrder.java
 * @Description : 지표별 시도 순위를 조회하기 위한 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDOLIFEBIZ_INTRO
 * SRV_PG_SIDOBORD
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.30 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.30
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( { "rawtypes", "unchecked" } )
public class SidoIndexOrder extends AbsAuthAPI< Map< String, Object > >
{

	private SidoIndexOrderService sidoIndexOrderService;

	public SidoIndexOrderService getSidoIndexOrderService()
	{
		return sidoIndexOrderService;
	}

	public void setSidoIndexOrderService( SidoIndexOrderService sidoIndexOrderService )
	{
		this.sidoIndexOrderService = sidoIndexOrderService;
	}

	@Override
	public String getApiId()
	{
		return "API_0614";
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
		return sidoIndexOrderService.selectSidoIndexOrder( parameter );
	}

	
	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	// 2016. 03. 24 j.h.Seok modify
	@Override
	public Class getOptionParameter() throws AbsException 
	{
		return OptionParam.class; 
	}
//	@Override
//	public Class getOptionParameter() throws AbsException { return null; }

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam
	{
		accessToken
		, type
	}
	
	private enum OptionParam
	{
		sido_cd
	}
}
