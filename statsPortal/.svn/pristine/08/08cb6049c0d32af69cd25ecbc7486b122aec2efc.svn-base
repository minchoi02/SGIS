package kostat.sop.ServiceAPI.api.bizStats;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfBusinessRankService;

/**
 * @Class Name : SidoTypeOfBusinessRank.java
 * @Description : 시도 생활업종 순위 정보 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDOLIFEBIZ_CORP_2020
 * SRV_DT_SIDOLIFEBIZ_CORPRATE_2020
 * SRV_DT_SIDOLIFBIZ_CORPCHANGE_2020
 * SRV_DT_SIDOLIFBIZ_WORKER_2020
 * SRV_DT_SIDOLIFBIZ_WORKERRATE_2020
 * SRV_DT_SIDOLIFBIZ_WORKERCHANGE_2020
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.28 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SidoTypeOfBusinessRank extends AbsQuery< Map< String, Object > > 
{
	private SidoTypeOfBusinessRankService sidoTypeOfBusinessRankService;
	
	public SidoTypeOfBusinessRankService getSidoTypeOfBusinessRankService()
	{
		return sidoTypeOfBusinessRankService;
	}

	public void setSidoTypeOfBusinessRankService( SidoTypeOfBusinessRankService sidoTypeOfBusinessRankService )
	{
		this.sidoTypeOfBusinessRankService = sidoTypeOfBusinessRankService;
	}

	@Override
	public String getApiId()
	{
		return "API_0612";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap(req);
		return sidoTypeOfBusinessRankService.selectSidoTypeOfBusinessRank( parameter );
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

	protected void optimizeParameterMap( Map mapParameter ) throws AbsException { }

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam
	{
		
		sido_cd
	}
	
	private enum OptionParam
	{
		accessToken
		, theme_cd
	}

}