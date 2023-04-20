package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfBusinessGroupService;

/**
 * @Class Name : SidoTypeOfBusinessGroup.java
 * @Description : 시도 생활업종 그룹별 속성 정보를 조회하기 위한 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDOLIFEBIZ_CORP
 * SRV_DT_SIDOLIFEBIZ_CORPRATE
 * CMM_CD_THEME
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
public class SidoTypeOfBusinessGroup extends AbsAuthAPI< Map<String, Object> >
{
	
	private SidoTypeOfBusinessGroupService sidoTypeOfBusinessGroupService;

	public SidoTypeOfBusinessGroupService getSidoTypeOfBusinessGroupService()
	{
		return sidoTypeOfBusinessGroupService;
	}

	public void setSidoTypeOfBusinessGroupService( SidoTypeOfBusinessGroupService sidoTypeOfBusinessGroupService )
	{
		this.sidoTypeOfBusinessGroupService = sidoTypeOfBusinessGroupService;
	}

	@Override
	public String getApiId()
	{
		return "API_0613";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap( req );
		return sidoTypeOfBusinessGroupService.selectSidoTypeOfBusinessGroup( parameter );
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		return null;
	}

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
