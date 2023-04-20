package kostat.sop.OpenAPI3.service.technicalbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.technicalbiz.InduscomService;
import kostat.sop.OpenAPI3.service.technicalbiz.mapper.InduscomMapper;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


/**
 * @Class Name : InduscomServiceImpl.java
 * @Description : InduscomServiceImpl 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.07
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "induscomService" )
public class InduscomServiceImpl extends EgovAbstractServiceImpl
		implements InduscomService
{
	@Resource(name = "induscomMapper")
	private InduscomMapper mapper;
	
	@Override
	public List< Map< String, Object > > selectInduscom( Map< String, String > parameter ) throws AbsException
	{
		List< Map< String, Object > > result = mapper.selectInduscom( parameter );
		
		if( result == null || result.isEmpty() ) {
			throw new NoResultException();
		}

		return 	result;
	}
}
