package kostat.sop.OpenAPI3.api.figure;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.figure.BuildingAttributeService;
import kostat.sop.OpenAPI3.service.figure.mapper.BuildingAttributeMapper;

/**
 * @Class Name : BuildingAttribute.java
 * @Description : sufid(건물식별번호)해당하는 건물 속성 정보를 조회 API
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.22               최초생성
 * 
 * 관련 TABLE
 * -----------------------------
 * SRV_NAT_BAS_BLDG_PG
 * 
 * @author SGIS+ 개발팀
 * @since 2015. 10.22
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
public class BuildingAttribute extends AbsAuthAPI< Map >
{
	private static final Log logger = LogFactory.getLog( BuildingAttribute.class );

	private BuildingAttributeService buildingAttributeService;
	
	public BuildingAttributeService getBuildingAttributeService()
	{
		return buildingAttributeService;
	}

	public void setBuildingAttributeService( BuildingAttributeService buildingAttributeService )
	{
		this.buildingAttributeService = buildingAttributeService;
	}

	@Override
	public Map executeAPI( HttpServletRequest req, HttpServletResponse res, String txId ) throws AbsException
	{
		Map< String, String > mapParameters = getParameterMap( req );
		return buildingAttributeService.selectBuildingAttribute( mapParameters );
	}

	@Override
	public String getApiId()
	{
		return "API_0802";
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
	protected String getQueryStr() { return null; }

	private enum MustParam
	{
		sufid
		, accessToken
	}
	
}
