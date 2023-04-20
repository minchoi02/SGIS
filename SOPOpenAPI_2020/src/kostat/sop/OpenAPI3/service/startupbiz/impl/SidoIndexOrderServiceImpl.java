package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.InvalidValueException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.SidoIndexOrderService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SidoIndexOrderMapper;

/**
 * @Class Name : SidoIndexOrderServiceImpl.java
 * @Description : SidoIndexOrderService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.30 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.30
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sidoIndexOrderService" )
public class SidoIndexOrderServiceImpl extends EgovAbstractServiceImpl
		implements SidoIndexOrderService
{

	@Resource( name = "sidoIndexOrderMapper" )
	private SidoIndexOrderMapper mapper;

	@Override
	public Map< String, Object > selectSidoIndexOrder( Map< String, String > parameter ) throws AbsException
	{
		String strType = parameter.get( "type" );
		String strSidoCode = parameter.get( "sido_cd" );
		String strTypeName = null;
		Integer intType = null;
		Map< String, Object > result = null;

		intType = Integer.valueOf( strType );
		if(strSidoCode != null && strSidoCode.length() != 2 )
		{
			throw new InvalidValueException( "지원하지 않는 요청 값입니다. 요청 받은 파라미터 : " + parameter );
		}

		switch( intType )
		{
			// 음식점
			case 0:
				strTypeName = "음식점";
				result = mapper.selectEaterySidoIndexOrder( parameter );
				break;
			// 도소매
			case 1:
				strTypeName = "도소매";
				result = mapper.selectWrsaleSidoIndexOrder( parameter );
				break;
			// 서비스
			case 2:
				strTypeName = "서비스";
				result = mapper.selectServiceSidoIndexOrder( parameter );
				break;
			// 숙박
			case 3:
				strTypeName = "숙박";
				result = mapper.selectLodgeSidoIndexOrder( parameter );
				break;
			default:
				throw new InvalidValueException( "지원하지 않는 타입입니다. 요청 받은 타입 : [ " + strType + " ]" );
		}

		result.put( "type", strType );
		result.put( "type_name", strTypeName );

		return result;
	}

}
