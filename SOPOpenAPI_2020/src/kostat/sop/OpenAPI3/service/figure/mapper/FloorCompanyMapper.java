package kostat.sop.OpenAPI3.service.figure.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : FloorCompanyMapper.java
 * @Description : FloorCompanyMapper Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.26           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.26
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "floorCompanyMapper" )
@SuppressWarnings( "rawtypes" )
public class FloorCompanyMapper extends EgovAbstractMapper
{
	public List selectFloorCompany( Map< String, String > parameter )
	{
		return selectList( "figure.floorCompany", parameter );
	}
}
