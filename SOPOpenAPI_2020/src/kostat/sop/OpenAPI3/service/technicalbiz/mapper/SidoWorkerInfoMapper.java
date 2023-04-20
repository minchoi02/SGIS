package kostat.sop.OpenAPI3.service.technicalbiz.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;


/**
 * @Class Name : CompanyInfoMapper.java
 * @Description : CompanyInfoMapper DAO Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.07
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Repository( "sidoWorkerInfoMapper" )
public class SidoWorkerInfoMapper extends EgovAbstractMapper
{
	public List<Map<String, Object>> selectSidoWorkerInfo( Map<String, String> parameter ) //2017.03.24 String->Object
	{
		return selectList( "technicalbiz.sidoWorkerInfo", parameter );
	}
	
	public List selectSidoInfo( Map<String, String> parameter )
	{
		return selectList( "technicalbiz.sidoInfo", parameter );
	}
	
	public List selectSidoTotalInfo( Map<String, String> parameter )
	{
		return selectList( "technicalbiz.sidoWorkerTotalInfo", parameter );
	}
	
	public String selectSidoTotalCorpCnt( Map<String, String> parameter )
	{
		return selectOne( "technicalbiz.sidoTotalWorkerCnt", parameter );
	}
	
}
