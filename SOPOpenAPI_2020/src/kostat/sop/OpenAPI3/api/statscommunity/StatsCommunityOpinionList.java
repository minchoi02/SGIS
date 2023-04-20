package kostat.sop.OpenAPI3.api.statscommunity;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.statscommunity.StatsCommunityOpinionListService;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * @Class Name : StatsCommunityOpinionList.java
 * @Description : 통계커뮤니티 상세 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * CMMNTY_MAP
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.17 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016. 10.17
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class StatsCommunityOpinionList
		extends AbsAuthAPI< Map< String, Object > >
{
	private StatsCommunityOpinionListService statsCommunityOpinionListService;

	public StatsCommunityOpinionListService getStatsCommunityOpinionListService()
	{
		return statsCommunityOpinionListService;
	}

	public void setStatsCommunityOpinionListService( StatsCommunityOpinionListService statsCommunityOpinionListService )
	{
		this.statsCommunityOpinionListService = statsCommunityOpinionListService;
	}

	@Override
	public String getApiId()
	{
		return "API_0902";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> mapParameter = getParameterMap( req );
		
		if( !mapParameter.containsKey( OptionParam.page.name() ) ) {
			mapParameter.put( OptionParam.page.name(), "1" );
		}
		if( !mapParameter.containsKey( OptionParam.count.name() ) ) {
			mapParameter.put( OptionParam.count.name(), "10" );
		}
		
		return statsCommunityOpinionListService.selectStatsCommunityOpinionList( mapParameter );
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
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() {return null;}
	
	private enum MustParam {
		accessToken
		, cmmnty_map_id
	}
	
	private enum OptionParam {
		page
		, count
		, x_coor
		, y_coor
	}

}
