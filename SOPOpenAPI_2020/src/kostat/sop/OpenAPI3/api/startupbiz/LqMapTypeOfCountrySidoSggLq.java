package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.LqMapTypeOfCountrySidoSggLqService;

/**
 * @Class Name : LqMapTypeOfCountrySidoSggLq.java
 * @Description : 업종별 입지계수 지도 - 전국 및 시도 대비 시군구 입지계수를 조회하기 위한 API
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_LIFEBIZ_LQ_REGIONTOTAL LQ
 * SRV_PG_SGGBORD  
 * 
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.09.06 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class LqMapTypeOfCountrySidoSggLq extends AbsAuthAPI< List< Map< String, Object > > >
{
	
	private LqMapTypeOfCountrySidoSggLqService lqMapTypeOfCountrySidoSggLqService;

	public LqMapTypeOfCountrySidoSggLqService getSggTypeOfCountrySidoSggLqService()
	{
		return lqMapTypeOfCountrySidoSggLqService;
	}

	public void setLqMapTypeOfCountrySidoSggLqService( LqMapTypeOfCountrySidoSggLqService lqMapTypeOfCountrySidoSggLqService )
	{
		this.lqMapTypeOfCountrySidoSggLqService = lqMapTypeOfCountrySidoSggLqService;
	}

	@Override
	public String getApiId()
	{
		return "API_0628";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		
		Map<String, String> parameter = getParameterMap( req );
		return lqMapTypeOfCountrySidoSggLqService.selectLqMapTypeOfCountrySidoSggLq( parameter );
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getOptionParameter() throws AbsException
	{
		return null;
	}

	@SuppressWarnings("rawtypes")
	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
		,theme_cd
		,sido_cd
		,region
		,year
	}

}
