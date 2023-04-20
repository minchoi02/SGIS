package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBusinessCorporationCountService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SggTypeOfBusinessCorporationCountMapper;

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
@Service( "sggTypeOfBusinessCorporationCountService" )
public class SggTypeOfBusinessCorporationCountServiceImpl extends EgovAbstractServiceImpl
		implements SggTypeOfBusinessCorporationCountService
{

	@Resource(name = "sggTypeOfBusinessCorporationCountMapper")
	private SggTypeOfBusinessCorporationCountMapper mapper;
	
	@Override
	public List< Map< String, Object > > selectSggTypeOfBusinessCorporationCount( Map< String, String > parameter ) throws AbsException
	{
		List< Map< String, Object > > result = mapper.selectSggTypeOfBusinessCorporationCount( parameter );
		
		if( result == null || result.isEmpty() ) {
			throw new NoResultException();
		}

		return 	result;
	}
}
