package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggTypeOfBusinessCorporationCountMapper.java
 * @Description : SggTypeOfBusinessCorporationCountMapper DAO Class
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
@Repository( "sggTypeOfBusinessCorporationCountMapper" )
public class SggTypeOfBusinessCorporationCountMapper extends EgovAbstractMapper
{
	public List< Map< String, Object > > selectSggTypeOfBusinessCorporationCount( Map< String, String > parameter )
	{
		return selectList( "startupbiz.sggTypeOfBusinessCorporationCount", parameter );
	}
}
