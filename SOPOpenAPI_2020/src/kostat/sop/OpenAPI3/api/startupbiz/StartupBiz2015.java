package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.StartupBiz2015Service;

/**
* 
* Table : 
* SRV_DT_SEARCHPPLTN, SRV_PG_CORPCENSUS, SRV_DT_SEARCHRESID, SRV_DT_SEARCHAPARTPRICE, SRV_DT_SEARCHCORP, SRV_DT_SEARCHCORP
/**
 * @Class Name : SggTypeOfBusinessRank.java
 * @Description : 시도, 시군구에서 입력받은 조건에 해당하는 지역 찾기 API
* 업종별 사업장수, 업종별 사업체수 증감, 가구유형, 점유형태, 주택종류 등 해당조건에서
* 가장 점수가 높은 지역을 조회한다.
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.26 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015.11.26
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class StartupBiz2015 extends AbsAuthAPI< List >
{
	private StartupBiz2015Service startupBizService;

	public StartupBiz2015Service getStartupBizService()
	{
		return startupBizService;
	}

	public void setStartupBizService( StartupBiz2015Service startupBizService )
	{
		this.startupBizService = startupBizService;
	}

	@Override
	public String getApiId()
	{
		return "API_0601";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, Object> mapParameter = getParameterMap( req );
		return startupBizService.selectStartupBiz( mapParameter );
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
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
		, adm_cd
	}
	
	private enum OptionParam
	{
		theme_cd
		, corp_cnt
		, rate_change
		, family_type
		, family_val
		, occupy_type
		, occupy_val
		, house_type
		, house_val
		, house_old_val
		, apartprice
		, ppl_type
		, ppl_val
		, ppl_gender_type
		, ppl_gender_val
		, ppl_age_type
		, ppl_age_val
	}

}
