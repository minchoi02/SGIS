package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggTypeOfAverageMapper.java
 * @Description : SggTypeOfAverageMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.31 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "sggTypeOfAverageMapper" )
public class SggTypeOfAverageMapper extends EgovAbstractMapper
{
	public String selectCorpCount( Map< String, String > parameter )
	{
		return selectOne( "startupbiz2020.corpCountByThemeCode", parameter );
	}
	
	public String selectWokerCount( Map< String, String > parameter )
	{
		return selectOne( "startupbiz2020.workerCountByThemeCode", parameter );
	}
	
	public List< Map< String, Object > > selectSggTypeOfAverage( Map< String, String > parameter )
	{
		return selectList( "startupbiz2020.sggTypeOfAverage", parameter );
	}
	
	public Map< String, Object > selectThemeCodeByThemeName( Map< String, String > parameter )
	{
		return selectOne( "startupbiz2020.baseThemeNameBybaseThemeCode", parameter );
	}
	
	public Map< String, Object > selectSidoName( Map< String, String > parameter )
	{
		return selectOne( "startupbiz2020.sidoNameBySidoCode", parameter );
	}
}
