package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.exception.InvalidAdmCodeException;
import kostat.sop.OpenAPI3.exception.InvalidThemeCodeException;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBusinessInfoService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SggTypeOfBusinessInfoMapper;

/**
 * @Class Name : SggTypeOfBusinessInfoImpl.java
 * @Description : SggTypeOfBusinessInfoImpl 인터페이스 구현
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
@Service( "sggTypeOfBusinessInfoService" )
public class SggTypeOfBusinessInfoImpl extends EgovAbstractServiceImpl
		implements SggTypeOfBusinessInfoService
{
	@Resource( name = "sggTypeOfBusinessInfoMapper" )
	private SggTypeOfBusinessInfoMapper mapper;

	@Override
	public Map< String, Object > selectSggTypeOfBusinessInfo( Map< String, String > parameter ) throws AbsException
	{
		String strSggCode = parameter.get( "sgg_cd" );
		String strThemeCode = parameter.get( "theme_cd" );
		
		if( strSggCode.length() != 5 )
		{
			throw new InvalidAdmCodeException("시군구 코드는 시도(2자리) + 시군구(3자리) 입니다.");
		}
		
		if( strThemeCode.length() != 4)
		{
			throw new InvalidThemeCodeException( "테마코드는 대분류(2자리) + 소분류(2자리) 입니다. 현재 입력받은 테마코드 : [ " + strThemeCode + " ]");
		}
		
		return mapper.selectSggTypeOfBusinessInfo( parameter );
	}

}
