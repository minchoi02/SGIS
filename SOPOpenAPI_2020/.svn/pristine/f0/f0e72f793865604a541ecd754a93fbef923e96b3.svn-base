package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.LqChartOfYearService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.LqChartOfYearMapper;

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
	
	@Override
	public List<Map< String, Object >> selectLqChartOfYear( Map< String, String > parameter ) throws AbsException
	{
		String ThemeCode = parameter.get("theme_cd");
		String theme = ThemeCode.substring(2, 4);
		String them = ThemeCode.substring(0, 2);
		parameter.put("theme", theme);
		parameter.put("them", them);
		return mapper.selectLqChartOfYear( parameter );
	}
}
