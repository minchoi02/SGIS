package kostat.sop.OpenAPI3.service.figure.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.figure.FloorBoundaryService;
import kostat.sop.OpenAPI3.service.figure.mapper.FloorBoundaryMapper;

/**
 * @Class Name : FloorBoundaryServiceImpl.java
 * @Description : FloorBoundaryServiceImpl Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.22           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.22
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@Service("floorBoundaryService")
@SuppressWarnings("rawtypes")
public class FloorBoundaryServiceImpl extends EgovAbstractServiceImpl implements FloorBoundaryService
{
	@Resource( name = "floorBoundaryMapper")
	private FloorBoundaryMapper mapper;

	@Override
	public List selectFloorBoundaryService( Map< String, String > mapParameter ) throws AbsException
	{
		List liFloorBoundary = mapper.selectFloorBoundary( mapParameter );
		if( liFloorBoundary.isEmpty() )
		{
			throw new NoResultException();
		}
		
		return liFloorBoundary;
	}

}
