package kostat.sop.OpenAPI3.service.stats.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : CensusIndexMapper.java
 * @Description : CensusIndexMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.21 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Repository( "censusIndexMapper" )
public class CensusIndexMapper extends EgovAbstractMapper
{
	public List< Map< String, Object > > selectCensusIndex( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndex", parameter );
	}
	
	public List< Map< String, Object > > selectCensusIndexSidoAll( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndexSidoAll", parameter );
	}

	public List< Map< String, Object > > selectCensusIndexLowSearch( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndexLowSearch", parameter );
	}

	public List< Map< String, Object > > selectTotCensusIndex( Map< String, String > parameter )
	{
		return selectList( "stats.totCensusIndex", parameter );
	}
	
	//mng_s grid
	public List< Map< String, Object > > selectCensusIndexGrid( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndexGrid", parameter );
	}

	//mng_s bnd_grid 행정구역 그리드 20180208
	public List< Map< String, Object > > selectCensusIndexBndGrid( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndexBndGrid", parameter );
	}
}
