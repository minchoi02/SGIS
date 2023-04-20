package kostat.sop.OpenAPI3.service.dwelling.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.dwelling.SggIndexService;
import kostat.sop.OpenAPI3.service.dwelling.mapper.SggIndexMapper;

/**
 * @Class Name : SggIndexServiceImpl.java
 * @Description : SggIndexService 구현체
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.11.23           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.23
 * @version 1.0
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sggIndexService" )
public class SggIndexServiceImpl extends EgovAbstractServiceImpl
		implements SggIndexService
{
	@Resource( name = "sggIndexMapper" )
	private SggIndexMapper mapper;

	@Override
	public Map< String, Object > selectSggIndex( Map< String, String > parameter ) throws AbsException
	{
		parameter.put( "bnd_year", Properties.getDefult_bnd_year() );
		Map mapResult = mapper.selectSggIndex( parameter );

		if( mapResult == null || mapResult.isEmpty() ) {
			throw new NoResultException();
		}
		
		List liResult = mapper.selectSggIndexOrder( parameter );
		mapResult.put( "sgg_values", liResult );
		return mapResult;
	}

}
