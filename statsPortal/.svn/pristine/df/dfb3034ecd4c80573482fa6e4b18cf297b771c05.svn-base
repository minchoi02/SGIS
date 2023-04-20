package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfBusinessInfoService;
import kostat.sop.ServiceAPI.controller.service.mapper.SidoTypeOfBusinessInfoMapper;

/**
 * @Class Name : SidoTypeOfBusinessInfoServiceImpl.java
 * @Description : SidoTypeOfBusinessInfoService 인터페이스 구현
 *  
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.28 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sidoTypeOfBusinessInfoService" )
public class SidoTypeOfBusinessInfoServiceImpl extends EgovAbstractServiceImpl
		implements SidoTypeOfBusinessInfoService {

	@Resource( name = "sidoTypeOfBusinessInfoMapper")
	private SidoTypeOfBusinessInfoMapper mapper;
	
	@Override
	public List<Map< String, Object >> selectSidoTypeOfBusinessInfo( Map< String, String > parameter ) throws AbsException
	{
		return mapper.selectSidoTypeOfBusinessInfo( parameter );
	}

}
