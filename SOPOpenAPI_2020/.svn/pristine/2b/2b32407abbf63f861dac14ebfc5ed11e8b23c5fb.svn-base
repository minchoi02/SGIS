package kostat.sop.OpenAPI3.service.technicalbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;


/**
 * @Class Name : SggStartupBizFacMapper.java
 * @Description : SggStartupBizFacMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.18
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Repository( "sggStartupBizFacMapper" )
public class SggStartupBizFacMapper extends EgovAbstractMapper
{
	public List selectSggStartupBizFac( Map<String, String> parameter )
	{
		return selectList( "technicalbiz.sggStartupBizFac", parameter );
	}
	
	public Map selectSggStartupBizFacCount( Map< String, String > parameter )
	{
		return selectOne( "technicalbiz.sggStartupBizFacCount", parameter );
	}
	

	
	
}
