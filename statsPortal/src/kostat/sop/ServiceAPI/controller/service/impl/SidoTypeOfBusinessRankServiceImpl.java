package kostat.sop.ServiceAPI.controller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.controller.service.SidoTypeOfBusinessRankService;
import kostat.sop.ServiceAPI.controller.service.mapper.SidoTypeOfBusinessRankMapper;

/**
 * @Class Name : SidoTypeOfBusinessRankImpl.java
 * @Description : SidoTypeOfBusinessRankService 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.10.29 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "sidoTypeOfBusinessRankService" )
public class SidoTypeOfBusinessRankServiceImpl extends EgovAbstractServiceImpl
		implements SidoTypeOfBusinessRankService {

	@Resource( name = "sidoTypeOfBusinessRankMapper" )
	private SidoTypeOfBusinessRankMapper mapper;
	
	@Resource( name = "themeCdCommon")
	private ThemeCdCommon themeCdCommon;

	@Override
	public Map< String, Object > selectSidoTypeOfBusinessRank( Map< String, String > parameter )
	{
		Map< String, Object > result = mapper.selectSidoName( parameter );

		String corpTotalCount;
		
		
		if(parameter.get("theme_cd") != null){
			themeCdCommon.bigThemeCdFindInsert(parameter, parameter.get("theme_cd"));
			corpTotalCount = mapper.selectCorpCount(parameter);
			parameter.put("corp_total", corpTotalCount);
		}
		
		List< Map< String, Object > > liTypeOfBusinessRank = mapper.selectSidoTypeOfBusinessRank( parameter );
		result.put( "tob_rank", liTypeOfBusinessRank );
		return result;
	}

}
