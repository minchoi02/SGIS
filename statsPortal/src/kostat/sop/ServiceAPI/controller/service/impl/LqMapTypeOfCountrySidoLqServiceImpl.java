package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.controller.service.LqMapTypeOfCountrySidoLqService;
import kostat.sop.ServiceAPI.controller.service.mapper.LqMapTypeOfCountrySidoLqMapper;

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
		implements LqMapTypeOfCountrySidoLqService {

	@Resource( name = "lqMapTypeOfCountrySidoLqMapper" )
	private LqMapTypeOfCountrySidoLqMapper mapper;
	
	@Resource( name = "themeCdCommon" )
	private ThemeCdCommon themeCdCommon;
	
	@Override
	public List<Map< String, Object >> selectLqMapTypeOfCountrySidoLq( Map< String, String > parameter ) throws AbsException
	{
		
		String theme_cd = parameter.get("theme_cd");
		
		if(themeCdCommon.bigThemeCdList().contains(theme_cd)) {
			parameter.put("theme_cd", theme_cd + "000");	// 테이블 특성상 대분류의 모든 총합을 의미하는 값이 [ 대분류코드 값 (ex: "H") + 000 ]으로 한다. 참고 테이블 SRV_DT_LIFEBIZ_LQ_REGIONTOTAL
		}
		String Year = parameter.get("year");
		if(Year.equals("9016")){
			parameter.put("census_year", Year);
			parameter.put("year", "2016");
		}
		else{
			parameter.put("census_year", Year);
		}
		
		return mapper.selectLqMapTypeOfCountrySidoLq( parameter );
	}

}
