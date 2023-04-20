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
import kostat.sop.OpenAPI3.service.figure.FloorEtcFacilityService;

/**
 * @Class Name : FloorEtcFacility.java
 * @Description : sufid(건물식별번호)해당하는 건물 해당층 기타시설 경계 조회 API.
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.27               최초생성
 * 
 * 관련 TABLE
 * -----------------------------
 * SRV_NAT_FW_IN_DRAW_PG
 * 
 * @author SGIS+ 개발팀
 * @since 2015. 10.26
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
public class FloorEtcFacility extends AbsAuthAPI< List >
{

	private static final Log logger = LogFactory.getLog( FloorEtcFacility.class );
	
	private FloorEtcFacilityService floorEtcFacilityService;
	
	public FloorEtcFacilityService getFloorEtcFacilityService()
	{
		return floorEtcFacilityService;
	}

	public void setFloorEtcFacilityService( FloorEtcFacilityService floorEtcFacilityService )
	{
		this.floorEtcFacilityService = floorEtcFacilityService;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String txId ) throws AbsException
	{
		Map mapParameter = getParameterMap( req );
		return floorEtcFacilityService.selectFloorEtcFacilityService( mapParameter );
	}

	@Override
	public String getApiId()
	{
		return "API_0805";
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
	public Class getOptionParameter() throws AbsException {return null;}
	
	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception{}
	
	@Override
	protected String getQueryStr() {return null;}
	
	private enum MustParam {
		sufid
		, flr_no
		, accessToken
	}

}
