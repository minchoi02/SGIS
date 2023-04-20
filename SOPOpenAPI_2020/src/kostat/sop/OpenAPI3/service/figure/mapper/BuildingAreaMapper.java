package kostat.sop.OpenAPI3.service.figure.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : BuildingAreaMapper.java
 * @Description : BuildingAreaMapper DAO Class
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

@Repository( "buildingAreaMapper" )
public class BuildingAreaMapper extends EgovAbstractMapper
{
	public List selectArea( Map< String, String > parameter )
	{
		List results = selectList( "figure.buildingArea", parameter );
		return results;
	}

}
