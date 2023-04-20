package kostat.sop.OpenAPI3.api.technicalbiz;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.technicalbiz.InduscomBordService;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 
* Table : 
* 
/**
 * @Class Name : InduscomBord.java
 * @Description : 전국의 창업지원시설 정보를 조회한다.
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.18 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.18
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class InduscomBord extends AbsAuthAPI< List >
{
	private InduscomBordService induscomBordService;

	public InduscomBordService getInduscomBordService()
	{
		return induscomBordService;
	}

	public void setInduscomBordService( InduscomBordService induscomBordService )
	{
		this.induscomBordService = induscomBordService;
	}

	@Override
	public String getApiId()
	{
		return "API_1110";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> mapParameter = getParameterMap( req );
//		String strFormat = _getViewType( req, res );

//		if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
//		{
//			mapParameter.put( "strFormat", "1" );
//		}
//		
//		System.out.println("STFORMAT::::::::::::::: " + mapParameter.get("strFormat"));
		return induscomBordService.selectInduscomBord( mapParameter );
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
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
		, complex_no
	}
	
	private enum OptionParam
	{
	}

}
