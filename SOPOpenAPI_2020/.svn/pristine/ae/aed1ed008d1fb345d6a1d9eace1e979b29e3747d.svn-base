package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBusinessRankService;

/**
 * @Class Name : SggTypeOfBusinessRank.java
 * @Description : 시군구 생활업종 순위를 조회하기 위한 API
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.02 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015.11.02
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggTypeOfBusinessRank
		extends AbsAuthAPI< Map< String, Object > >
{
	private SggTypeOfBusinessRankService sggTypeOfBusinessRankService;
	
	public SggTypeOfBusinessRankService getSggTypeOfBusinessRankService()
	{
		return sggTypeOfBusinessRankService;
	}

	public void setSggTypeOfBusinessRankService( SggTypeOfBusinessRankService sggTypeOfBusinessRankService )
	{
		this.sggTypeOfBusinessRankService = sggTypeOfBusinessRankService;
	}

	@Override
	public String getApiId()
	{
		return "API_0617";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map< String, String > parameter = getParameterMap( req );
		return sggTypeOfBusinessRankService.selectSggTypeOfBusinessRank( parameter );
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
		, sido_cd
		, theme_cd
	}
}
