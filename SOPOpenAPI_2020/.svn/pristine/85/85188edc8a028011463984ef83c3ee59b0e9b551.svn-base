package kostat.sop.OpenAPI3.service.statscommunity.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : StatsCommunityOpinionListMapper.java
 * @Description : StatsCommunityOpinionListMapper Mapper
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.10.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016. 10.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
@Repository( "statsCommunityOpinionListMapper" )
public class StatsCommunityOpinionListMapper extends EgovAbstractMapper
{
	public List selectStatsCommunityOpinionList( Map< String, String > parameter )
	{
		return selectList( "statscommunity.selectCommunityPoiListOfOrganization", parameter );
	}

	public Map selectStatsCommunityOpinionListTotalCount( Map< String, String > parameter )
	{
		return selectOne( "statscommunity.selectCommunityPoiCountOfOrganization", parameter );
	}
}
