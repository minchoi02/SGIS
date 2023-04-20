package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfBusinessRankService;

/**
 * @Class Name : SidoTypeOfBusinessRank.java
 * @Description : 시도 생활업종 순위 정보 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDOLIFEBIZ_CORP
 * SRV_DT_SIDOLIFEBIZ_CORPRATE
 * SRV_DT_SIDOLIFBIZ_CORPCHANGE
 * SRV_DT_SIDOLIFBIZ_WORKER
 * SRV_DT_SIDOLIFBIZ_WORKERRATE
 * SRV_DT_SIDOLIFBIZ_WORKERCHANGE
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
public class SidoTypeOfBusinessRank extends AbsAuthAPI< Map< String, Object > >
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

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception { }

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam
	{
		accessToken
		, sido_cd
	}
	
	private enum OptionParam
	{
		theme_cd
	}

}
