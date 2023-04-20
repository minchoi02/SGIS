package kostat.sop.OpenAPI3.service.dwelling.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggIndexMapper.java
 * @Description : SggIndexMapper 구현체
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.11.23           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.23
 * @version 1.0
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@Repository("sggIndexMapper")
public class SggIndexMapper extends EgovAbstractMapper
{

	public Map< String, Object > selectSggIndex( Map< String, String > parameter )
	{
		parameter.put( "isSggList", "0" );
		return selectOne( "dwelling.detailSggIndex", parameter );
	}

	public List< Map< String, Object > > selectSggIndexOrder( Map< String, String > parameter )
	{
		parameter.put( "isSggList", "1" );
		return selectList( "dwelling.detailSggIndex", parameter );
	}
}
