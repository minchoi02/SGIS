package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfWorkerGroupService;
import kostat.sop.ServiceAPI.controller.service.mapper.SidoTypeOfWorkerGroupMapper;

/**
 * @Class Name : SidoTypeOfWorkerGroupServiceImpl.java
 * @Description : SidoTypeOfWorkerGroupService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.14 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */

@Service( "sidoTypeOfWorkerGroupService" )
@SuppressWarnings( "unchecked" )
public class SidoTypeOfWorkerGroupServiceImpl extends EgovAbstractServiceImpl 
		implements SidoTypeOfWorkerGroupService 
{
	@Resource( name = "sidoTypeOfWorkerGroupMapper" )
	private SidoTypeOfWorkerGroupMapper mapper;
	
	@Resource( name = "themeCdCommon" )
	private ThemeCdCommon themeCdCommon;
	
	@Override
	public Map< String, Object > selectSidoTypeOfWorkerGroup( Map< String, String > parameter ) throws AbsException
	{
		Map<String, Object> result = null, mapTemp;
		List<Map<String, Object>> litemp;
		String workerTotalCount;
		
		themeCdCommon.bigThemeCdFindInsert(parameter, parameter.get( "theme_cd" ));
		
		// 시도코드, 시도명 조회
		result = mapper.selectSidoName( parameter );
		// 2017. 11. 09 [개발팀] 추가 수정 END
		
		// 테마코드, 테마명 조회
		mapTemp = mapper.selectThemeCodeByThemeName( parameter );
		result.putAll( mapTemp );
		
		//테마별 카운트 조회
		workerTotalCount = mapper.selectWokerCount(parameter);
		parameter.put("worker_total", workerTotalCount);
		
		// 그룹별 종사자비율, 종사자비율순위, 종사자수순위, 종사자수 조회
		litemp = mapper.selectSidoTypeOfWorkerGroup( parameter );
		result.put( "group_attribute", litemp );
		return result;
	}


}
