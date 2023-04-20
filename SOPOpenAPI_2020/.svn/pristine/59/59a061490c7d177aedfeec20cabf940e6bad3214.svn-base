package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.internal.matchers.SubstringMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfBusinessGroupService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SidoTypeOfBusinessGroupMapper;

/**
 * @Class Name : SidoTypeOfBusinessGroupServiceImpl.java
 * @Description : SidoTypeOfBusinessGroupService 인터페이스 구현
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

@Service( "sidoTypeOfBusinessGroupService" )
@SuppressWarnings( "unchecked" )
public class SidoTypeOfBusinessGroupServiceImpl extends EgovAbstractServiceImpl
		implements SidoTypeOfBusinessGroupService
{
	@Resource( name = "sidoTypeOfBusinessGroupMapper" )
	private SidoTypeOfBusinessGroupMapper mapper;
	
	@Override
	public Map< String, Object > selectSidoTypeOfBusinessGroup( Map< String, String > parameter ) throws AbsException
	{
		Map<String, Object> result = null, mapTemp;
		List<Map<String, Object>> litemp;
		String corpTotalCount;
		
		// 2017. 11. 09 [개발팀] 추가 수정 START
		String tempThemeCode = parameter.get( "theme_cd" );
		if(tempThemeCode.length() > 2) {
			tempThemeCode = tempThemeCode.substring(0, 2);
			parameter.put("theme_cd", tempThemeCode);
		}
		
		checkThemeCode( tempThemeCode );
		// 시도코드, 시도명 조회
		result = mapper.selectSidoName( parameter );
		// 2017. 11. 09 [개발팀] 추가 수정 END
		
		// 테마코드, 테마명 조회
		mapTemp = mapper.selectThemeCodeByThemeName( parameter );
		result.putAll( mapTemp );
		
		//테마별 카운트 조회
		corpTotalCount = mapper.selectCorpCount(parameter);
		parameter.put("corp_total", corpTotalCount);
		
		// 그룹별 사업체비율, 사업체비율순위, 사업체수순위, 사업체수 조회
		litemp = mapper.selectSidoTypeOfBusinessGroup( parameter );
		result.put( "group_attribute", litemp );
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
