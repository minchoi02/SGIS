package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.SidoTypeOfWorkerInfoService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SidoTypeOfWorkerInfoMapper;

/**
 * @Class Name : SidoTypeOfWorkerInfoServiceImpl.java
 * @Description : SidoTypeOfWorkerInfoService 인터페이스 구현
 *  
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.11
 *
 * @author (주)웨이버스 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sidoTypeOfWorkerInfoService" )
public class SidoTypeOfWorkerInfoServiceImpl extends EgovAbstractServiceImpl
		implements SidoTypeOfWorkerInfoService
{

	@Resource( name = "sidoTypeOfWorkerInfoMapper")
	private SidoTypeOfWorkerInfoMapper mapper;

	@Override
	public List<HashMap< String, Object >> selectSidoTypeOfWorkerInfo( Map< String, String > parameter ) throws AbsException
	{
		
		return mapper.selectSidoTypeOfWorkerInfo( parameter );
	}

}
