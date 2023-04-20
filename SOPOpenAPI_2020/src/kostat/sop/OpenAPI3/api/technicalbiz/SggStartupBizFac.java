package kostat.sop.OpenAPI3.api.technicalbiz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.service.technicalbiz.SggStartupBizFacService;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 
* Table : 
* 
/**
 * @Class Name : SggStartupBizFac.java
 * @Description : 시군구별 창업지원시설 정보를 조회한다.
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.18 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.18
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public class SggStartupBizFac extends AbsAuthAPI< Map< String, Object > >
{
	private SggStartupBizFacService sggStartupBizFacService;

	public SggStartupBizFacService getSggStartupBizFacService()
	{
		return sggStartupBizFacService;
	}

	public void setSggStartupBizFacService( SggStartupBizFacService sggStartupBizFacService )
	{
		this.sggStartupBizFacService = sggStartupBizFacService;
	}

	@Override
	public String getApiId()
	{
		return "API_1106";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		//2017.09.26 개발팀 수정
		/*Map<String, String> mapParameter = getParameterMap( req );*/
		Map mapParameter = getParameterMap( req );
		//2017.09.26 개발팀 수정 종료
		
		if( !mapParameter.containsKey( OptionParam.page.name() ) ) {
			mapParameter.put( OptionParam.page.name(), "1" );
		}
		if( !mapParameter.containsKey( OptionParam.count.name() ) ) {
			mapParameter.put( OptionParam.count.name(), "10" );
		}
		
		//2017.09.26 개발팀 추가
		if( mapParameter.containsKey("lct_type")){
			String [] arrLct_type = ((String) mapParameter.get("lct_type")).split(",");
			mapParameter.put(OptionParam.lct_type.name(), arrLct_type);
		}
		//2017.09.26 개발팀 추가 종료
		
		return sggStartupBizFacService.selectSggStartupBizFac( mapParameter );
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
		page
		, count
		, lct_type
	}

}
