package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggTypeOfBusinessRankMapper.java
 * @Description : SggTypeOfBusinessRankMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.02 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.02
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "sggTypeOfBusinessRankMapper" )
public class SggTypeOfBusinessRankMapper extends EgovAbstractMapper
{
	public Map<String, Object> selectSidoName( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.sidoNameBySidoCode", parameter );
	}
	
	public Map<String, Object> selectThemeName( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.themeNameBythemeCode", parameter );
	}
	
	public List<Map< String, Object > > selectSggTypeOfBusinessInfo( Map< String, String > parameter )
	{
		return selectList( "startupbiz.sggTypeOfBusinessRank", parameter );
	}
}
