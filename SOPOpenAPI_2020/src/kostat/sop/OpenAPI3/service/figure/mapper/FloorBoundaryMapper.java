package kostat.sop.OpenAPI3.service.figure.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : FloorBoundaryMapper.java
 * @Description : FloorBoundaryMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.21 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.21
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Repository( "floorBoundaryMapper" )
@SuppressWarnings( "rawtypes" )
public class FloorBoundaryMapper extends EgovAbstractMapper
{
	
	public List selectFloorBoundary( Map< String, String > parameter )
	{
		List results = selectList( "figure.floorBoundary", parameter );
		return results;
	}

}
