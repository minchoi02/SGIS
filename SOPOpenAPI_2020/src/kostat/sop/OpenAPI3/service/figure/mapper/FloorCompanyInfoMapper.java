package kostat.sop.OpenAPI3.service.figure.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
* @Class Name : FloorCompanyInfoMapper.java
* @Description : FloorCompanyInfoMapper DAO Class
* @ 
* @ 수정일 수정자 수정내용 
* @ --------- --------- ------------------------------- 
* @ 2015.10.27 최초생성
*
* @author SGIS+ 개발팀
* @since 2015. 10.21
* @version 1.0
* @see
*
* Copyright (C) by NeighborSystem All right reserved.
*/
@Repository( "floorCompanyInfoMapper" )
public class FloorCompanyInfoMapper extends EgovAbstractMapper
{
	public List selectfloorThemeInfo( Map< String, String > parameter )
	{
		return selectList( "figure.floorThemeInfo", parameter );
	}
	
	public List selectfloorCompanyInfo( Map< String, String > parameter )
	{
		return selectList( "figure.floorCompanyInfo", parameter );
	}
	
	public List selectfloorFacilityInfo( Map< String, String > parameter )
	{
		return selectList( "figure.floorFacilityInfo", parameter );
	}
}
