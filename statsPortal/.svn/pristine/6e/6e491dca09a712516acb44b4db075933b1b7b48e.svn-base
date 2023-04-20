package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.controller.service.LqMapTypeOfCountrySidoSggLqService;
import kostat.sop.ServiceAPI.controller.service.mapper.LqMapTypeOfCountrySidoSggLqMapper;

/**
 * @Class Name : LqMapTypeOfCountrySidoSggLqServiceImpl.java
 * @Description : LqMapTypeOfCountrySidoSggLqService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.09.06 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Service( "lqMapTypeOfCountrySidoSggLqService" )
public class LqMapTypeOfCountrySidoSggLqServiceImpl extends EgovAbstractServiceImpl
		implements LqMapTypeOfCountrySidoSggLqService
{
	@Resource( name = "lqMapTypeOfCountrySidoSggLqMapper" )
	private LqMapTypeOfCountrySidoSggLqMapper mapper;
	
	@Resource( name = "themeCdCommon" )
	private ThemeCdCommon themeCdCommon;
	
	@Override
	public List<Map< String, Object >> selectLqMapTypeOfCountrySidoSggLq( Map< String, String > parameter ) throws AbsException
	{	
		String theme_cd = parameter.get("theme_cd");
		String Year = parameter.get("year");

		if(themeCdCommon.bigThemeCdList().contains(theme_cd)) {
			parameter.put("theme_cd", theme_cd+"000");			// 테이블의 데이터 특성상 어쩔 수 없다. 대분류가 들어오면 뒤에 000 을 붙여준다.
		}
		
		if(Year.equals("9016")){
			parameter.put("census_year", Year);
			parameter.put("year", "2016");
		}
		else{
			parameter.put("census_year", Year);
		}
		//2019-04-15 박길섭 끝
		return mapper.selectLqMapTypeOfCountrySidoSggLq( parameter );
	}
}
