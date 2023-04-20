package kostat.sop.ServiceAPI.api.bizStats;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.SggTypeOfAverageService;

/**
 * @Class Name : SggTypeOfAverage.java
 * @Description : 시도 생활업종 그룹별 속성 정보를 조회하기 위한 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDOLIFEBIZ_WORKER
 * SRV_DT_SIDOLIFEBIZ_corp
 * CMM_CD_THEME
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.31 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggTypeOfAverage extends AbsQuery< Map<String, Object> > {

	private SggTypeOfAverageService sggTypeOfAverageService;

	public SggTypeOfAverageService getSidoTypeOfAverageService()
	{
		return sggTypeOfAverageService;
	}

	public void setSggTypeOfAverageService( SggTypeOfAverageService sggTypeOfAverageService )
	{
		this.sggTypeOfAverageService = sggTypeOfAverageService;
	}
	
	@Override
	public String getApiId()
	{
		return "API_0625";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap( req );
		return sggTypeOfAverageService.selectSggTypeOfAverage( parameter );
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

	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		
		sido_cd
		, theme_cd
	}
	
	private enum OptionParam
	{
		accessToken
	}
	
}
