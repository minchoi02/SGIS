package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBusinessWorkerService;

/**
 * @Class Name : SggTypeOfBusinessWorker.java
 * @Description : 시군구 생활업종 사업자 종사자 수 및 퍼센트를 조회하기 위한 API
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.28 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018.08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggTypeOfBusinessWorker
		extends AbsAuthAPI< Map< String, Object > >
{
	private SggTypeOfBusinessWorkerService sggTypeOfBusinessWorkerService;
	
	public SggTypeOfBusinessWorkerService getSggTypeOfBusinessWorkerService()
	{
		return sggTypeOfBusinessWorkerService;
	}

	public void setSggTypeOfBusinessWorkerService( SggTypeOfBusinessWorkerService sggTypeOfBusinessWorkerService )
	{
		this.sggTypeOfBusinessWorkerService = sggTypeOfBusinessWorkerService;
	}

	@Override
	public String getApiId()
	{
		return "API_0624";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map< String, String > parameter = getParameterMap( req );
		return sggTypeOfBusinessWorkerService.selectSggTypeOfBusinessWorker( parameter );
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException { return null; }

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam
	{
		accessToken
		, sido_cd
		, sgg_cd
		
	}
}
