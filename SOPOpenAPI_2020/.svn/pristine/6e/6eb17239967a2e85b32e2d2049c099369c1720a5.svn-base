package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SidoTypeOfBusinessGroupMapper.java
 * @Description : SidoTypeOfBusinessGroupMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.29 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "sidoTypeOfBusinessGroupMapper" )
public class SidoTypeOfBusinessGroupMapper extends EgovAbstractMapper
{
	public String selectCorpCount( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.corpCountByThemeCode", parameter );
	}
	
	public List< Map< String, Object > > selectSidoTypeOfBusinessGroup( Map< String, String > parameter )
	{
		return selectList( "startupbiz.sidoTypeOfBusinessGroup", parameter );
	}
	
	public Map< String, Object > selectThemeCodeByThemeName( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.baseThemeNameBybaseThemeCode", parameter );
	}
	
	public Map< String, Object > selectSidoName( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.sidoNameBySidoCode", parameter );
	}
}
