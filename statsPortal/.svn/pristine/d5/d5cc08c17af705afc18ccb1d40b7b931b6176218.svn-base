package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfBusinessChartInfoService;
import kostat.sop.ServiceAPI.controller.service.mapper.SidoTypeOfBusinessChartInfoMapper;

/**
 * @Class Name : SidoTypeOfBusinessChartInfoServiceImpl.java
 * @Description : SidoTypeOfBusinessChartInfoService 인터페이스 구현
 *  
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.13 최초생성
 *
 * @author SGIS+ 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sidoTypeOfBusinessChartInfoService" )
public class SidoTypeOfBusinessChartInfoServiceImpl extends EgovAbstractServiceImpl
		implements SidoTypeOfBusinessChartInfoService
{

	@Resource( name = "sidoTypeOfBusinessChartInfoMapper")
	private SidoTypeOfBusinessChartInfoMapper mapper;
////////////////박길섭////////////////////
	@Override
	public List<HashMap< String, Object >> selectSidoTypeOfBusinessChartInfo( Map< String, String > parameter ) throws AbsException
	{
		/////박길섭 디비고친거///////
		
		/////////////////////
		return mapper.selectSidoTypeOfBusinessChartInfo( parameter );
	}

}
