package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.LqMapTypeOfCountrySidoSggLqService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.LqMapTypeOfCountrySidoSggLqMapper;

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
	
	@Override
	public List<Map< String, Object >> selectLqMapTypeOfCountrySidoSggLq( Map< String, String > parameter ) throws AbsException
	{	
		//2019-04-15 박길섭 시작
		/*String workerTotalCount;
		String tempThemeCode=parameter.get("theme_cd");
		String theme=tempThemeCode.substring(2,4);
		System.out.println(theme);
		parameter.put("theme", theme);
		if(theme.equals("00")){
			workerTotalCount=mapper.selectWokerCountForAll(parameter);
			parameter.put("worker_total", workerTotalCount);
		}
		else{
			String the=tempThemeCode.substring(0,2);
			parameter.put("the", the);
			workerTotalCount=mapper.selectWokerCountForPart(parameter);
			parameter.put("worker_total", workerTotalCount);
		}*/
		String Year = parameter.get("year");
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
