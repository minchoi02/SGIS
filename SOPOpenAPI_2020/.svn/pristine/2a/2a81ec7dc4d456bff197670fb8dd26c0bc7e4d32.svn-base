package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfLqService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SidoTypeOfLqMapper;

/**
 * @Class Name : SidoTypeOfLqServiceImpl.java
 * @Description : SidoTypeOfLqService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.23 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Service( "sidoTypeOfLqService" )
public class SidoTypeOfLqServiceImpl extends EgovAbstractServiceImpl
		implements SidoTypeOfLqService
{
	@Resource( name = "sidoTypeOfLqMapper" )
	private SidoTypeOfLqMapper mapper;
	
	@Override
	public List<Map< String, Object >> selectSidoTypeOfLq( Map< String, String > parameter ) throws AbsException
	{
		return mapper.selectSidoTypeOfLq( parameter );
	}
}
