package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SidoTypeOfBusinessRankMapper.java
 * @Description : SidoTypeOfBusinessRankMapper DAO Class
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
@Repository( "sidoTypeOfBusinessRankMapper" )
public class SidoTypeOfBusinessRankMapper extends EgovAbstractMapper 
{
	public String selectCorpCount( Map< String, String > parameter )
	{
		return selectOne( "startupbiz2020.corpCountByThemeCode", parameter );
	}
	
	public List< Map< String, Object > > selectSidoTypeOfBusinessRank( Map< String, String > parameter )
	{
		return selectList( "startupbiz2020.sidoTypeOfBusinessRank", parameter );
	}

	public Map< String, Object > selectSidoName( Map< String, String > parameter )
	{
		return selectOne( "startupbiz2020.sidoNameBySidoCode", parameter );
	}
}
