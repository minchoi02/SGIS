package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfBusinessRankService;
import kostat.sop.OpenAPI3.service.startupbiz.impl.SidoTypeOfBusinessGroupServiceImpl.ThemeCodeInvalidValueException;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SidoTypeOfBusinessRankMapper;

/**
 * @Class Name : SidoTypeOfBusinessRankImpl.java
 * @Description : SidoTypeOfBusinessRankService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.29 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sidoTypeOfBusinessRankService" )
public class SidoTypeOfBusinessRankServiceImpl extends EgovAbstractServiceImpl
		implements SidoTypeOfBusinessRankService
{
	@Resource( name = "sidoTypeOfBusinessRankMapper" )
	private SidoTypeOfBusinessRankMapper mapper;

	@Override
	public Map< String, Object > selectSidoTypeOfBusinessRank( Map< String, String > parameter )
	{
		Map< String, Object > result = mapper.selectSidoName( parameter );

		String corpTotalCount;
		
		if(parameter.get("theme_cd") != null){
			checkThemeCode( parameter.get( "theme_cd" ) );
			corpTotalCount = mapper.selectCorpCount(parameter);
			parameter.put("corp_total", corpTotalCount);
		}
		
		List< Map< String, Object > > liTypeOfBusinessRank = mapper.selectSidoTypeOfBusinessRank( parameter );
		result.put( "tob_rank", liTypeOfBusinessRank );
		return result;
	}
	
	private void checkThemeCode(String themeCode) throws AbsException
	{
		Integer intThemeCode = Integer.valueOf( themeCode );
		if( !((intThemeCode == 10) 
				|| (intThemeCode == 20) 
				|| (intThemeCode == 40) 
				|| (intThemeCode == 50)) ) {
			throw new ThemeCodeInvalidValueException("허용된 테마코드를 입력하세요. 입력한 테마코드 : [ " + themeCode + " ]");
		}
	}
	
	@SuppressWarnings( "serial" )
	@ResponseStatus( value = HttpStatus.UNPROCESSABLE_ENTITY, reason = "허용된 테마코드를 입력하세요." )
	class ThemeCodeInvalidValueException extends AbsHttpException{

		public ThemeCodeInvalidValueException( String message )
		{
			super( message );
		}
		
	}
	
}
