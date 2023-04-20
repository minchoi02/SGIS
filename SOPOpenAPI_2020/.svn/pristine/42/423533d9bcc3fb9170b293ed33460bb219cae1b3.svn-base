package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfLifeDetailService;

/**
 * @Class Name : SggTypeOfLifeDetail.java
 * @Description : 시도 생활업종 그룹별 속성 정보를 조회하기 위한 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_BIZCATEGORYMAP_SGG
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
public class SggTypeOfLifeDetail extends AbsAuthAPI< Map<String, Object> >
{
	
	private SggTypeOfLifeDetailService sggTypeOfLifeDetailService;

	public SggTypeOfLifeDetailService getSidoTypeOfLifeDetailService()
	{
		return sggTypeOfLifeDetailService;
	}

	public void setSggTypeOfLifeDetailService( SggTypeOfLifeDetailService sggTypeOfLifeDetailService )
	{
		this.sggTypeOfLifeDetailService = sggTypeOfLifeDetailService;
	}

	@Override
	public String getApiId()
	{
		return "API_0626";
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
		List<Map<String, Object>> list = sggTypeOfLifeDetailService.selectSggTypeOfLifeDetail( parameter );
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", list);
		return resultMap;
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		return null;
	}

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }
	
	private enum MustParam 
	{
		accessToken
		, sido_cd
		, sgg_cd
		, theme_cd
	}

}
