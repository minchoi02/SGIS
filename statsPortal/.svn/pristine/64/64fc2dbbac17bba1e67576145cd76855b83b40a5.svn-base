package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.controller.service.LqChartOfYearService;
import kostat.sop.ServiceAPI.controller.service.mapper.LqChartOfYearMapper;

/**
 * @Class Name : LqChartOfYearServiceImpl.java
 * @Description : LqChartOfYearService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.10.04 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Service( "lqChartOfYearService" )
public class LqChartOfYearServiceImpl extends EgovAbstractServiceImpl
		implements LqChartOfYearService
{
	@Resource( name = "lqChartOfYearMapper" )
	private LqChartOfYearMapper mapper;
	
	@Resource( name = "themeCdCommon" )
	private ThemeCdCommon themeCdCommon;
	
	@Override
	public List<Map< String, Object >> selectLqChartOfYear( Map< String, String > parameter ) throws AbsException
	{
		String theme_cd = parameter.get("theme_cd");
		if(themeCdCommon.bigThemeCdList().contains(theme_cd)) {
			parameter.put("theme_cd", theme_cd +"000");
		}
		return mapper.selectLqChartOfYear( parameter );
	}
}
