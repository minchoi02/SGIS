package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.SggTypeOfBarChartService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.SggTypeOfBarChartMapper;

/**
 * @Class Name : SggTypeOfCountrySidoSggLqServiceImpl.java
 * @Description : SggTypeOfCountrySidoSggLqService 인터페이스 구현
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

@Service( "sggTypeOfBarChartService" )
public class SggTypeOfBarChartServiceImpl extends EgovAbstractServiceImpl
		implements SggTypeOfBarChartService
{
	@Resource( name = "sggTypeOfBarChartMapper" )
	private SggTypeOfBarChartMapper mapper;
	
	@Override
	public List<Map< String, Object >> selectSggTypeOfBarChart( Map< String, String > parameter ) throws AbsException
	{
		return mapper.selectSggTypeOfBarChart( parameter );
	}
}
