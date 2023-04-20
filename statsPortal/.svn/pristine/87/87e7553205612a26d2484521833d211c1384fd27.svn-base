package kostat.sop.ServiceAPI.api.bizStats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.LqChartOfYearService;

/**
 * @Class Name : LqChartOfYear.java
 * @Description : 업종별 입지계수 지도 - 연도별 입지계수를 조회하기 위한 API
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_LIFEBIZ_LQ_REGIONTOTAL LQ
 *   
 * 
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.10.04 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class LqChartOfYear extends AbsQuery< List< Map< String, Object > > > {
	
	private LqChartOfYearService lqChartOfYearService;

	public LqChartOfYearService getSggTypeOfCountrySidoLqService()
	{
		return lqChartOfYearService;
	}

	public void setLqChartOfYearService( LqChartOfYearService lqChartOfYearService )
	{
		this.lqChartOfYearService = lqChartOfYearService;
	}

	@Override
	public String getApiId()
	{
		return "API_0630";
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
		return lqChartOfYearService.selectLqChartOfYear( parameter );
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
		return OptionParam.class;
	}

	@SuppressWarnings("rawtypes")
	protected void optimizeParameterMap( Map mapParameter ) throws AbsException {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		theme_cd
		, sido_cd
		, sgg_cd
		, censusCheck //2019-04-17 박길섭 
	}
	
	private enum OptionParam
	{
		accessToken
	}
}
