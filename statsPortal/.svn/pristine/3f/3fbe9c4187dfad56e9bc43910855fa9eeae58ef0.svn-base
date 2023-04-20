package kostat.sop.ServiceAPI.api.bizStats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.LqMapTypeOfCountrySidoLqService;

/**
 * @Class Name : LqMapTypeOfCountrySidoLq.java
 * @Description : 업종별 입지계수 지도 - 전국대비 시도 입지계수를 조회하기 위한 API
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_LIFEBIZ_LQ_REGIONTOTAL LQ
 * SRV_PG_SIDOBORD  
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
public class LqMapTypeOfCountrySidoLq extends AbsQuery< List< Map< String, Object > > > {
	

	private LqMapTypeOfCountrySidoLqService lqMapTypeOfCountrySidoLqService;

	public LqMapTypeOfCountrySidoLqService getSggTypeOfCountrySidoLqService()
	{
		return lqMapTypeOfCountrySidoLqService;
	}

	public void setLqMapTypeOfCountrySidoLqService( LqMapTypeOfCountrySidoLqService lqMapTypeOfCountrySidoLqService )
	{
		this.lqMapTypeOfCountrySidoLqService = lqMapTypeOfCountrySidoLqService;
	}

	@Override
	public String getApiId()
	{
		return "API_0627";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List< Map< String, Object > > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		
		Map<String, String> parameter = getParameterMap( req );
		return lqMapTypeOfCountrySidoLqService.selectLqMapTypeOfCountrySidoLq( parameter );
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	public Class getOptionParameter() throws AbsException
	{
		return OptionParam.class;
	}

	protected void optimizeParameterMap( Map mapParameter ) throws AbsException {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		theme_cd
		, year
	}
	
	private enum OptionParam 
	{
		accessToken
	}
	
}
