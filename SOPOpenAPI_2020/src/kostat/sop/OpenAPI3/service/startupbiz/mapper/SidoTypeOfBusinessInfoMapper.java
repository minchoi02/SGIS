package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SidoTypeOfBusinessInfoMapper.java
 * @Description : SidoTypeOfBusinessInfoMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.28 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Repository( "sidoTypeOfBusinessInfoMapper" )
public class SidoTypeOfBusinessInfoMapper extends EgovAbstractMapper
{
	public List<Map< String, Object >> selectSidoTypeOfBusinessInfo( Map< String, String > parameter )
	{
		return selectList( "startupbiz.sidoTypeOfBusinessInfo", parameter );
	}
}
