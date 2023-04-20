package kostat.sop.OpenAPI3.api.personal;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.personal.FindCodeInSmallAreaService;

/**
 * @Class Name : FindCodeInSmallArea.java
 * @Description : 좌표를 이용한 집계구, 행정동코드 정보를 조회하기 위한 API
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
public class FindCodeInSmallArea extends AbsAuthAPI< Map<String, Object> >
{
	private FindCodeInSmallAreaService findCodeInSmallAreaService;

	public FindCodeInSmallAreaService getFindCodeInSmallAreaService()
	{
		return findCodeInSmallAreaService;
	}

	public void setFindCodeInSmallAreaService( FindCodeInSmallAreaService findCodeInSmallAreaService )
	{
		this.findCodeInSmallAreaService = findCodeInSmallAreaService;
	}

	@Override
	public String getApiId()
	{
		return "API_9901";
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
		return findCodeInSmallAreaService.selectFindCodeInSmallArea( parameter );
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
	protected String getQueryStr() {return null;}
	
	private enum MustParam
	{
		accessToken
		, x_coor
		, y_coor
	}
}
