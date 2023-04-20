package kostat.sop.OpenAPI3.api.stats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.stats.CensusIndexService;

/**
 * @Class Name : CensusIndex.java
 * @Description : 총조사 주요지표 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_CENSUSINDEX
 * SRV_DT_TOTCENSUSINDEX
 * SRV_DT_ADM_TOT_REG_MATCH
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.28 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
public class CensusIndex extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( CensusIndex.class );
	
	private CensusIndexService censusIndexService;
	
	public CensusIndexService getCensusIndexService()
	{
		return censusIndexService;
	}

	public void setCensusIndexService( CensusIndexService censusIndexService )
	{
		this.censusIndexService = censusIndexService;
	}

	@Override
	public String getApiId()
	{
		return "API_0301";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap( req );
		
		logger.debug("parameter.get(\"area\") [" + parameter.get("area"));
		logger.debug("parameter.get(\"year\") [" + parameter.get("year"));
		
		//mng_s kimjoonha grid
		if(parameter.get("area")!= null && !"".equals(parameter.get("area"))) {
			return censusIndexService.selectCensusIndexGrid( parameter );
		} else if(parameter.get("bnd_grid")!= null && "bnd_grid".equals(parameter.get("bnd_grid"))) {
			return censusIndexService.selectCensusIndexBndGrid( parameter );
		} else {
			return censusIndexService.selectCensusIndex( parameter );
		}
		
		
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
		year
		, accessToken
	}
	
	private enum OptionParam 
	{
		adm_cd
		, low_search
		, bnd_year
		, area //mng_s kimjoonha grid
		, zoom //mng_s kimjoonha grid
		, bnd_grid //mng_s 행정구역 그리드 20180208
		//, sido_cd //mng_s 행정구역 그리드 20180208
		//, sgg_cd //mng_s 행정구역 그리드 20180208
		//, emdong_cd //mng_s 행정구역 그리드 20180208
		, filter //mng_s 20180903 행정구역 그리드에서 쿼리를 union all을 태우지 말고 나누기 위한 파라미터
	}
}
