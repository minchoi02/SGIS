package kostat.sop.OpenAPI3.service.technicalbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.technicalbiz.InduscomBordService;
import kostat.sop.OpenAPI3.service.technicalbiz.mapper.InduscomBordMapper;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


/**
 * @Class Name : InduscomBordImpl.java
 * @Description : InduscomBordImpl 인터페이스 구현
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
@Service( "induscomBordService" )
public class InduscomBordImpl extends EgovAbstractServiceImpl
		implements InduscomBordService
{
	@Resource(name = "induscomBordMapper")
	private InduscomBordMapper mapper;
	
	@Override
	public List< Map< String, Object > > selectInduscomBord( Map< String, String > parameter ) throws AbsException
	{
		List< Map< String, Object > > result = mapper.selectInduscomBord( parameter );
		
		if( result == null || result.isEmpty() ) {
			throw new NoResultException();
		}

		return 	result;
	}
}
