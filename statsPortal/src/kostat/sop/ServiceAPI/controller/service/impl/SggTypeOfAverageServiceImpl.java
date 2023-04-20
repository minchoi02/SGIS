package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.controller.service.SggTypeOfAverageService;
import kostat.sop.ServiceAPI.controller.service.mapper.SggTypeOfAverageMapper;

/**
 * @Class Name : SggTypeOfAverageServiceImpl.java
 * @Description : SggTypeOfAverageService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.31 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Service( "sggTypeOfAverageService" )
@SuppressWarnings( "unchecked" )
public class SggTypeOfAverageServiceImpl extends EgovAbstractServiceImpl
		implements SggTypeOfAverageService
{
	@Resource( name = "sggTypeOfAverageMapper" )
	private SggTypeOfAverageMapper mapper;
	
	@Resource( name = "themeCdCommon" )
	private ThemeCdCommon themeCdCommon;
	
	@Override
	public Map< String, Object > selectSggTypeOfAverage( Map< String, String > parameter ) throws AbsException
	{
		Map<String, Object> result = null, mapTemp;
		List<Map<String, Object>> litemp;
		String corpTotalCount;
		String workerTotalCount;
		
		// 2017. 11. 09 [개발팀] 추가 수정 START
		/*
		String tempThemeCode = parameter.get( "theme_cd" );
		if(tempThemeCode.length() > 2) {
			tempThemeCode = tempThemeCode.substring(0, 2);
			parameter.put("theme_cd", tempThemeCode);
		}
		
		checkThemeCode( tempThemeCode );
		*/
		themeCdCommon.temporaryChangeToNewBigThemeCd(parameter, parameter.get("theme_cd"));
		themeCdCommon.bigThemeCdFindInsert(parameter, parameter.get("theme_cd"));
		
		// 시도코드, 시도명 조회
		result = mapper.selectSidoName( parameter );
		// 2017. 11. 09 [개발팀] 추가 수정 END
		
		// 테마코드, 테마명 조회
		mapTemp = mapper.selectThemeCodeByThemeName( parameter );
		result.putAll( mapTemp );
		
		
		
		//테마별 카운트 조회
		corpTotalCount = mapper.selectCorpCount(parameter);
		parameter.put("corp_total", corpTotalCount);
		workerTotalCount = mapper.selectWokerCount(parameter);
		parameter.put("worker_total", workerTotalCount);
		
		// 그룹별 종사자비율, 종사자비율순위, 종사자수순위, 종사자수 조회
		litemp = mapper.selectSggTypeOfAverage( parameter );
		result.put( "group_attribute", litemp );
		return result;
	}

}
