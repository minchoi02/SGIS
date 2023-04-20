package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.exception.InvalidAdmCodeException;
import kostat.sop.OpenAPI3.exception.InvalidThemeCodeException;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBusinessRankService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SggTypeOfBusinessRankMapper;

/**
 * @Class Name : SggTypeOfBusinessRankImpl.java
 * @Description : SggTypeOfBusinessRank 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.02 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.02
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sggTypeOfBusinessRankService" )
public class SggTypeOfBusinessRankServiceImpl extends EgovAbstractServiceImpl
		implements SggTypeOfBusinessRankService
{
	@Resource( name = "sggTypeOfBusinessRankMapper" )
	private SggTypeOfBusinessRankMapper mapper;

	@Override
	public Map< String, Object > selectSggTypeOfBusinessRank( Map< String, String > parameter ) throws AbsException
	{
		Map< String, Object> result, mapTemp;
		List< Map<String, Object>> liTemp;
		String strSidoCode, strThemeCode;
		strSidoCode = parameter.get( "sido_cd" );
		strThemeCode =  parameter.get( "theme_cd" );
		
		if( strSidoCode.length() != 2 )
		{
			throw new InvalidAdmCodeException("시군구 코드는 시도(2자리) 입니다.");
		}
		
		if( strThemeCode.length() != 4)
		{
			throw new InvalidThemeCodeException( "테마코드는 대분류(2자리) + 소분류(2자리) 입니다. 현재 입력받은 테마코드 : [ " + strThemeCode + " ]");
		}
		
		result = mapper.selectSidoName( parameter );
		if( result == null || result.isEmpty()) 
		{
			throw new InvalidAdmCodeException("행정동 코드가 존재 하지 않습니다. adm code : [ " + parameter.get( "sido cd") + " ]");
		}
		
		mapTemp = mapper.selectThemeName( parameter );
		if( mapTemp == null || result.isEmpty())
		{
			throw new InvalidThemeCodeException("테마코드가 존재 하지 않습니다. theme code : [ " + parameter.get( "theme_cd" ) + " ]");
		}
		
		result.putAll( mapTemp );
		
		liTemp = mapper.selectSggTypeOfBusinessInfo( parameter );
		
		result.put( "sgg_info", liTemp );
		
		return result;
	}

}
