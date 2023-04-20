package kostat.sop.OpenAPI3.api.figure;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.figure.FloorBoundaryService;

/**
 * @Class Name : FloorBoundary.java
 * @Description : sufid(건물식별번호), 층별 해당하는 건물 외각 경계 정보를 조회 API
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.22               최초생성
 * 
 * 관련 TABLE
 * -----------------------------
 * SRV_NAT_OUT_DRAW_PG
 * 
 * @author SGIS+ 개발팀
 * @since 2015. 10.22
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
public class FloorBoundary extends AbsAuthAPI< List >
{


	private static final Log logger = LogFactory.getLog( FloorBoundary.class );
	
	private FloorBoundaryService floorBoundaryService;
	
	public FloorBoundaryService getFloorBoundaryService()
	{
		return floorBoundaryService;
	}

	public void setFloorBoundaryService( FloorBoundaryService floorBoundaryService )
	{
		this.floorBoundaryService = floorBoundaryService;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String txId ) throws AbsException
	{
		List result;

		Map mapParameter = getParameterMap( req );
		result = floorBoundaryService.selectFloorBoundaryService( mapParameter );
		

		return result;
	}

	@Override
	public String getApiId()
	{
		return "API_0803";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
//		return HttpMethod.POST;
		return HttpMethod.GET;
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
	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{
	}

	@Override
	protected String getQueryStr()
	{
		return null;
	}

	private enum MustParam
	{
		sufid
		, flr_no
		, accessToken
	}

}
