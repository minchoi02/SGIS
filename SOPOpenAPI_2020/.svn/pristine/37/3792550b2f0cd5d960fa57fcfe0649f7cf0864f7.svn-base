package kostat.sop.OpenAPI3.service.figure.mapper;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : BuildingAttributeMapper.java
 * @Description : BuildingAttributeMapper DAO Class
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
@Repository( "buildingAttributeMapper" )
public class BuildingAttributeMapper extends EgovAbstractMapper
{

	public Map selectBuildingAttribution( Map< String, String > parameter )
	{
		Map results = selectOne( "figure.buildingAttribution", parameter );
		return results;
	}

}
