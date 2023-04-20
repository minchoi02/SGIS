package kostat.sop.OpenAPI3.service.technicalbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;


/**
 * @Class Name : StartupBizFacMapper.java
 * @Description : StartupBizFacMapper DAO Class
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

@Repository( "startupBizFacMapper" )
public class StartupBizFacMapper extends EgovAbstractMapper
{
	public List< Map< String, Object > > selectStartupBizFac( Map<String, String> parameter )
	{
		return selectList( "technicalbiz.startupBizFac", parameter );
	}
}
