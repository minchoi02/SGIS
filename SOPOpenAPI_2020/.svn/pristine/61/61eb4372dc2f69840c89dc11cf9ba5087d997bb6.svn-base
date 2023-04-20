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
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.service.figure.FloorCompanyService;


/**
 * @Class Name : FloorCompany.java
 * @Description : sufid(건물식별번호)해당하는 건물 해당층 사업체의 경계 정보를 조회 API.
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.26               최초생성
 * 
 * 관련 TABLE
 * -----------------------------
 * SRV_NAT_COMP_IN_DRAW_PG
 * SRV_PG_CORPCENSUS_2013
 * CMM_CD_THEME
 * 
 * @author SGIS+ 개발팀
 * @since 2015. 10.26
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
public class FloorCompany extends AbsAuthAPI< List >
{

	private static final Log logger = LogFactory.getLog( FloorCompany.class );
	
	private FloorCompanyService floorCompanyService;

	public FloorCompanyService getFloorCompanyService()
	{
		return floorCompanyService;
	}

	public void setFloorCompanyService( FloorCompanyService floorCompanyService )
	{
		this.floorCompanyService = floorCompanyService;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String txId ) throws AbsException
	{

		Map mapParameter = getParameterMap( req );	
		mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
		return floorCompanyService.selectFloorCompanyService( mapParameter );
	}

	@Override
	public String getApiId()
	{
		return "API_0804";
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
		sufid, flr_no, accessToken
	}

}
