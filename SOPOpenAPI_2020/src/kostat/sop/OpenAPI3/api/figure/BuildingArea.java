package kostat.sop.OpenAPI3.api.figure;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.figure.BuildingAreaService;


/**
 * @Class Name : BuildingArea.java
 * @Description : 파라미터로 전달받은 영역 안에 포함되는 건물 영억 정보 조회 API
 * 
 * 관련 TABLE
 * -----------------------------
 * SRV_NAT_BAS_BLDG_PG
 * 
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.22           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.22
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( {"rawtypes", "unchecked"} )
public class BuildingArea extends AbsAuthAPI< List >
{
	private BuildingAreaService buildingAreaService;

	public BuildingAreaService getBuildingAreaService()
	{
		return buildingAreaService;
	}

	public void setBuildingAreaService( BuildingAreaService buildingAreaService )
	{
		this.buildingAreaService = buildingAreaService;
	}

	private static final Log logger = LogFactory.getLog( BuildingArea.class );

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map< String, String > mapParameters = getParameterMap( req );
		List result = buildingAreaService.selectBuildingAreaByRect( mapParameters );
		return result;
	}

	@Override
	public String getApiId()
	{
		return "API_0801";
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
		return OptionParam.class;
	}

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{
	}

	@Override
	protected String getQueryStr()
	{
		return "figure.select.buildingArea";
	}

	private enum MustParam
	{
		minx, miny, maxx, maxy
	}

	private enum OptionParam {
		accessToken
	}
}
