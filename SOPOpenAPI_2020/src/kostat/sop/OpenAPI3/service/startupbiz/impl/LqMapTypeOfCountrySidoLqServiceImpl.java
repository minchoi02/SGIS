package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.startupbiz.LqMapTypeOfCountrySidoLqService;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.LqMapTypeOfCountrySidoLqMapper;

/**
 * @Class Name : LqMapTypeOfCountrySidoLqServiceImpl.java
 * @Description : LqMapTypeOfCountrySidoLqService 인터페이스 구현
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

@Service( "lqMapTypeOfCountrySidoLqService" )
public class LqMapTypeOfCountrySidoLqServiceImpl extends EgovAbstractServiceImpl
		implements LqMapTypeOfCountrySidoLqService
{
	@Resource( name = "lqMapTypeOfCountrySidoLqMapper" )
	private LqMapTypeOfCountrySidoLqMapper mapper;
	
	@Override
	public List<Map< String, Object >> selectLqMapTypeOfCountrySidoLq( Map< String, String > parameter ) throws AbsException
	{
		//2019-04-15 박길섭 시작
		/*String ThemeCode = parameter.get("theme_cd");
		String theme = ThemeCode.substring(2, 4);
		String them = ThemeCode.substring(0, 2);
		
		System.out.println("theme = " + theme);
		System.out.println("them = " + them);
		Iterator<Map.Entry<String,String>> entries = parameter.entrySet().iterator();

		while(entries.hasNext()){

			Entry<String,String> entry = (Entry<String,String>)entries.next();

			System.out.println("key : " + entry.getKey() + " , value : " + entry.getValue());

		}
		parameter.put("theme", theme);
		parameter.put("them", them);*/
		String Year = parameter.get("year");
		if(Year.equals("9016")){
			parameter.put("census_year", Year);
			parameter.put("year", "2016");
		}
		else{
			parameter.put("census_year", Year);
		}
		//2019-04-15 박길섭 끝
		return mapper.selectLqMapTypeOfCountrySidoLq( parameter );
	}
}
