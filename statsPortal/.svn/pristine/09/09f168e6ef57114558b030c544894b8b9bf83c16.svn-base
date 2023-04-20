package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.controller.service.SggTypeOfLifeDetailService;
import kostat.sop.ServiceAPI.controller.service.mapper.SggTypeOfLifeDetailMapper;

/**
 * @Class Name : SggTypeOfLifeDetailServiceImpl.java
 * @Description : SggTypeOfLifeDetailService 인터페이스 구현
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
@Service( "sggTypeOfLifeDetailService" )
@SuppressWarnings( "unchecked" )
public class SggTypeOfLifeDetailServiceImpl extends EgovAbstractServiceImpl implements SggTypeOfLifeDetailService {

	@Resource( name = "sggTypeOfLifeDetailMapper" )
	private SggTypeOfLifeDetailMapper mapper;
	
	@Resource ( name = "themeCdCommon")
	private ThemeCdCommon themeCdCommon;
	
	@SuppressWarnings("null")
	@Override
	public List<Map<String, Object>> selectSggTypeOfLifeDetail(Map<String, String> parameter) throws AbsException {
		String corpTotalCount;
		String workerTotalCount;
		
		// 2017. 11. 09 [개발팀] 추가 수정 START
		/*String tempThemeCode = parameter.get( "theme_cd" );
		if(tempThemeCode.length() > 2) {
			tempThemeCode = tempThemeCode.substring(0, 2);
			parameter.put("theme_cd", tempThemeCode);
		}*/
		themeCdCommon.bigThemeCdFindInsert(parameter, parameter.get("theme_cd"));
		//테마별 카운트 조회
		corpTotalCount = mapper.selectCorpCount(parameter);
		parameter.put("corp_total", corpTotalCount);
		workerTotalCount = mapper.selectWorkerCount(parameter);
		parameter.put("worker_total", workerTotalCount);
		
		//사업체, 종사자 수 및 비율 조회
		
		
		return mapper.selectSggTypeOfLifeDetail(parameter);
	}
	
}
