package kostat.sop.ServiceAPI.service.stats.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : CensusIndexForBoroughMapper.java
 * @Description : 대화형통계지도에서 4시군구 5시군구 처리
 * 원형 : kostat.sop.OpenAPI3.service.stats.mapper.CensusIndexMapper
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2020.04.02 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020. 04.02
 * @version 1.0
 * @see
 *
 */

@Repository( "censusIndexForBoroughMapper" )
public class CensusIndexForBoroughMapper extends EgovAbstractMapper {

	public List< Map< String, Object > > selectCensusIndex( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndexForBorough", parameter );
	}
	
	public List< Map< String, Object > > selectCensusIndexSidoAll( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndexSidoAll", parameter );
	}

	public List< Map< String, Object > > selectCensusIndexLowSearch( Map< String, String > parameter )
	{
		return selectList( "stats.censusIndexLowSearchForBorough", parameter );
	}

	public List< Map< String, Object > > selectTotCensusIndex( Map< String, String > parameter )
	{
		return selectList( "stats.totCensusIndexForBorough", parameter );
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
