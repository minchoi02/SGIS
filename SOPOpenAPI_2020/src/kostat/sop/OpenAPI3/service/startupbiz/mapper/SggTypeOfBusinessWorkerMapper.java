package kostat.sop.OpenAPI3.service.startupbiz.mapper;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : SggTypeOfBusinessWorkerMapper.java
 * @Description : SggTypeOfBusinessWorkerMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.28 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Repository( "sggTypeOfBusinessWorkerMapper" )
public class SggTypeOfBusinessWorkerMapper extends EgovAbstractMapper
{
	public Map< String, Object > selectSggTypeOfBusinessWorker( Map< String, String > parameter )
	{
		return selectOne( "startupbiz.sggTypeOfBusinessWorker", parameter );
	}
}
