package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : StartupBiz2015Mapper.java
 * @Description : StartupBiz2015Mapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.26 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.26
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "startupBizMapper" )
public class StartupBiz2015Mapper extends EgovAbstractMapper
{
	public List< Map< String, Object > > selectStartupBiz( Map< String, Object > parameter )
	{
		return selectList( "startupbiz2015.startupbiz", parameter );
	}
}
