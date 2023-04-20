package kostat.sop.OpenAPI3.api.dwelling;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.dwelling.SggIndexService;

/**
 * @Class Name : SggIndex.java
 * @Description : 시군구 지표 조회 API
 *  
 * 관련 TABLE
 * -----------------------------
 * SRV_DT_SGG_IX_ORDER
 * SRV_DT_LCLAS_IX 
 * SRV_DT_MLSFC_IX
 * 
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.24 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.24
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggIndex extends AbsAuthAPI< Map<String, Object> >
{

	private static final Log logger = LogFactory.getLog( SggIndex.class );
	
	private SggIndexService sggIndexService;
	
	public SggIndexService getSggIndexService()
	{
		return sggIndexService;
	}

	public void setSggIndexService( SggIndexService sggIndexService )
	{
		this.sggIndexService = sggIndexService;
	}

	@Override
	public String getApiId()
	{
		return "API_1002";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map mapParameter = getParameterMap( req );
		return sggIndexService.selectSggIndex( mapParameter );
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
		, b_class_id
		, m_class_id
	}

}
