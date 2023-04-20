package kostat.sop.OpenAPI3.api.technicalbiz;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.technicalbiz.SggCompanyInfoService;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 
* Table : 
* 
/**
 * @Class Name : SggCompanyInfo.java
 * @Description : 시군구별 기술업종별 사업체수, 사업체 비율, 사업체 증감율을 조회한다.
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.07
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggCompanyInfo extends AbsAuthAPI< List >
{
	private SggCompanyInfoService sggCompanyInfoService;

	public SggCompanyInfoService getSggCompanyInfoService()
	{
		return sggCompanyInfoService;
	}

	public void setSggCompanyInfoService( SggCompanyInfoService sggCompanyInfoService )
	{
		this.sggCompanyInfoService = sggCompanyInfoService;
	}

	@Override
	public String getApiId()
	{
		return "API_1103";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> mapParameter = getParameterMap( req );
		return sggCompanyInfoService.selectSggCompanyInfo( mapParameter );
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
		, techbiz_cd
	}
	
	private enum OptionParam
	{
	}

}
