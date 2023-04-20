package kostat.sop.OpenAPI3.api.dwelling;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.dwelling.SggDwellingRankService;

/**
 * @Class Name : SggDwellingRank.java
 * @Description : 시군구 주거지 현황 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SIDO_IX_ORDER
 * SRV_DT_LCLAS_IX 
 * SRV_DT_MLSFC_IX
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.23 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.23
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggDwellingRank extends AbsAuthAPI< Map >
{
	private static final Log logger = LogFactory.getLog( SggDwellingRank.class );
	
	private SggDwellingRankService sggDwellingRankService;
	
	public SggDwellingRankService getSggDwellingRankService()
	{
		return sggDwellingRankService;
	}

	public void setSggDwellingRankService( SggDwellingRankService sggDwellingRankService )
	{
		this.sggDwellingRankService = sggDwellingRankService;
	}

	@Override
	public String getApiId()
	{
		return "API_1001";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> mapParameter = getParameterMap( req );
		return sggDwellingRankService.selectSggDwellingRank( mapParameter );
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
		, adm_cd
	}


}
