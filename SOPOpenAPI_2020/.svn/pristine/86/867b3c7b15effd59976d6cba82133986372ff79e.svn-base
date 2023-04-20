package kostat.sop.OpenAPI3.service.stats.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : CompanyTotalMapper.java
 * @Description : CompanyTotalMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.08.29 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.08.29
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Repository( "companyTotalMapper" )
public class CompanyTotalMapper extends EgovAbstractMapper
{
	public List< Map< String, Object > > selectCompanyTotal( Map< String, String > parameter )
	{
		return selectList( "stats.companyTotal", parameter );
	}
}
