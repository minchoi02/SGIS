package kostat.sop.OpenAPI3.api.technicalbiz;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.service.technicalbiz.SggInduscomService;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 
* Table : 
* 
/**
 * @Class Name : SggInduscom.java
 * @Description : 시군구별 산업단지 정보를 조회한다.
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
public class SggInduscom extends AbsAuthAPI< Map< String, Object > >
{
	private SggInduscomService sggInduscomService;

	public SggInduscomService getSggInduscomService()
	{
		return sggInduscomService;
	}

	public void setSggInduscomService( SggInduscomService sggInduscomService )
	{
		this.sggInduscomService = sggInduscomService;
	}

	@Override
	public String getApiId()
	{
		return "API_1109";
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
		if( mapParameter.containsKey("induscom_cd")){
			String [] arrLct_type = ((String) mapParameter.get("induscom_cd")).split(",");
			mapParameter.put(OptionParam.induscom_cd.name(), arrLct_type);
		}
		//2017.09.26 개발팀 추가 종료
		mapParameter.put("bnd_year", Properties.getDefult_bnd_year() );
		return sggInduscomService.selectSggInduscom( mapParameter );
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
		, induscom_cd
	}

}
