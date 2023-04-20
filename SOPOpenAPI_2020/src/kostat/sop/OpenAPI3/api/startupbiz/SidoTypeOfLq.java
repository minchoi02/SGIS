package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfLqService;

/**
 * @Class Name : SidoTypeOfLq.java
 * @Description : 시도 생활업종 입지계수 정보를 조회하기 위한 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_LIFEBIZ_LQ_REGIONTOTAL
 * SRV_PG_SIDOBORD
 * 
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.23 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SidoTypeOfLq extends AbsAuthAPI< Map<String, Object> >
{
	
	private SidoTypeOfLqService sidoTypeOfLqService;

	public SidoTypeOfLqService getSidoTypeOfLqService()
	{
		return sidoTypeOfLqService;
	}

	public void setSidoTypeOfLqService( SidoTypeOfLqService sidoTypeOfLqService )
	{
		this.sidoTypeOfLqService = sidoTypeOfLqService;
	}

	@Override
	public String getApiId()
	{
		return "API_0622";
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
		/*System.out.println("executeAPI start .. ");
		Map<String, Object>  map = null;
		try {
			Map<String, String> parameter = getParameterMap( req );
			
			for(String str : parameter.keySet()){
				System.out.println(str);
			}
			
			List<Map<String, Object>> list =  sidoTypeOfLqService.selectSidoTypeOfLq(parameter);
			
		} catch(Exception e){
			e.printStackTrace();
		}
		return map;*/
		Map<String, String> parameter = getParameterMap( req );
		List<Map<String, Object>> list = sidoTypeOfLqService.selectSidoTypeOfLq( parameter );
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
	}

}
