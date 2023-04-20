package kostat.sop.OpenAPI3.api.technicalbiz;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.technicalbiz.SidoStartupBizFacCountService;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 
* Table : 
* 
/**
 * @Class Name : SidoStartupBizFacCount.java
 * @Description : 시도별 창업지원시설수를 조회한다.
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
public class SidoStartupBizFacCount extends AbsAuthAPI< List >
{
	private SidoStartupBizFacCountService sidoStartupBizFacCountService;

	public SidoStartupBizFacCountService getSidoStartupBizFacCountService()
	{
		return sidoStartupBizFacCountService;
	}

	public void setSidoStartupBizFacCountService( SidoStartupBizFacCountService sidoStartupBizFacCountService )
	{
		this.sidoStartupBizFacCountService = sidoStartupBizFacCountService;
	}

	@Override
	public String getApiId()
	{
		return "API_1105";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map mapParameter = getParameterMap( req );
		if( mapParameter.containsKey("lct_type"))
		{
			String [] arrLct_type = ((String) mapParameter.get("lct_type")).split(",");
			mapParameter.put(OptionParam.lct_type.name(), arrLct_type);
		}
		
		return sidoStartupBizFacCountService.selectSidoStartupBizFacCount( mapParameter );
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
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {
	}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
	}
	
	private enum OptionParam
	{
		lct_type
	}

}
