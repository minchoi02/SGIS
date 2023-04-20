package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfLqService;

/**
 * @Class Name : SggTypeOfLq.java
 * @Description : 시군구 생활업종 입지계수 정보를 조회하기 위한 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_LIFEBIZ_LQ_REGIONTOTAL
 * SRV_PG_SggBORD
 * 
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.27 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggTypeOfLq extends AbsAuthAPI< Map<String, Object> >
{
	
	private SggTypeOfLqService sggTypeOfLqService;

	public SggTypeOfLqService getSggTypeOfLqService()
	{
		return sggTypeOfLqService;
	}

	public void setSggTypeOfLqService( SggTypeOfLqService sggTypeOfLqService )
	{
		this.sggTypeOfLqService = sggTypeOfLqService;
	}

	@Override
	public String getApiId()
	{
		return "API_0623";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		
		Map<String, String> parameter = getParameterMap( req );
		List<Map<String, Object>> list = sggTypeOfLqService.selectSggTypeOfLq( parameter );
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", list);
		return resultMap;
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
		, sido_cd
		, sgg_cd
		, region
	}

}
