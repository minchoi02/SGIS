package kostat.sop.OpenAPI3.service.dwelling.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggDwellingRankMapper.java
 * @Description : SggDwellingRankMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.23 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.23
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "sggDwellingRankMapper" )
public class SggDwellingRankMapper extends EgovAbstractMapper
{
	public List< Map< String, Object > > selectWholeCountryIndex( Map< String, String > parameter )
	{
		return selectList( "dwelling.wholeCountryIndex", parameter );
	}

	public List< Map< String, Object > > selectSidoIndex( Map< String, String > parameter )
	{
		return selectList( "dwelling.sidoIndex", parameter );
	}

	public List< Map< String, Object > > selectSggIndex( Map< String, String > parameter )
	{
		return selectList( "dwelling.sggIndex", parameter );
	}
}
