package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggTypeOfBarChart.java
 * @Description : SggTypeOfBarChart DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.09.11 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "sggTypeOfBarChartMapper" )
public class SggTypeOfBarChartMapper extends EgovAbstractMapper
{
	public List<Map< String, Object >> selectSggTypeOfBarChart( Map< String, String > parameter )
	{
		return selectList( "startupbiz.sggTypeOfBarChart", parameter );
	}
	

}
