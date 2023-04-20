package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggTypeOfLifeDetailMapper.java
 * @Description : SggTypeOfLifeDetailMapper DAO Class
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
@Repository( "sggTypeOfLifeDetailMapper" )
public class SggTypeOfLifeDetailMapper extends EgovAbstractMapper
{
	public String selectCorpCount( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.totalCorpCnt", parameter );
	}
	public String selectWorkerCount( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.totalWorkerCnt", parameter );
	}
	public List< Map< String, Object > > selectSggTypeOfLifeDetail( Map< String, String > parameter )
	{
		return selectList( "startupbiz.sggTypeOfLifeDetail", parameter );
	}
}
