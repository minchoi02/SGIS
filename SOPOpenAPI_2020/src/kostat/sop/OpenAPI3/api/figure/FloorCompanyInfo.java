package kostat.sop.OpenAPI3.api.figure;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.service.figure.FloorCompanyInfoService;

/**
 * @Class Name : FloorCompanyInfo.java
 * @Description : sufid(건물식별번호)해당하는 건물 사업체정보 조회 API.
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.27               최초생성
 * 
 * 관련 TABLE
 * -----------------------------
 * SRV_NAT_COMP_IN_DRAW_PG
 * SRV_PG_CORPCENSUS_2013
 * 
 * SRV_NAT_FW_IN_DRAW_PT
 * CMM_CD_THEME
 * 
 * @author SGIS+ 개발팀
 * @since 2015. 10.26
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( {"rawtypes", "unchecked"} )
public class FloorCompanyInfo extends AbsAuthAPI< Map >
{
	private static final Log logger = LogFactory.getLog( FloorCompanyInfo.class );
	
	private FloorCompanyInfoService floorCompanyInfoService;

	public FloorCompanyInfoService getFloorCompanyInfoService()
	{
		return floorCompanyInfoService;
	}

	public void setFloorCompanyInfoService( FloorCompanyInfoService floorCompanyInfoService )
	{
		this.floorCompanyInfoService = floorCompanyInfoService;
	}

	@Override
	public Map executeAPI( HttpServletRequest req, HttpServletResponse res, String txId ) throws AbsException
	{
		Map mapParameter = getParameterMap( req );
		mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
		return floorCompanyInfoService.selectFloorCompanyInfoService( mapParameter );
	}

	@Override
	public String getApiId()
	{
		return "API_0806";
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
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() {return null;}

	private enum MustParam
	{
		sufid, flr_no, accessToken
	}

}
