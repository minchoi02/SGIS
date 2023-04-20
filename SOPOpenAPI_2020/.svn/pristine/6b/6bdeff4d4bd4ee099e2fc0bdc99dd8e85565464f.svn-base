package kostat.sop.OpenAPI3.service.dwelling.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.model.NFData;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.dwelling.SggDwellingRankService;
import kostat.sop.OpenAPI3.service.dwelling.mapper.SggDwellingRankMapper;

/**
 * @Class Name : SggDwellingRankServiceImpl.java
 * @Description : SggDwellingRankService 구현체
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.11.23           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.23
 * @version 1.0
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */

@Service( "sggDwellingRankService" )
public class SggDwellingRankServiceImpl extends EgovAbstractServiceImpl
		implements SggDwellingRankService
{
	@Resource( name = "sggDwellingRankMapper" )
	private SggDwellingRankMapper mapper;

	@Override
	public Map< String, Object > selectSggDwellingRank( Map< String, String > parameter ) throws AbsException
	{
		NFData mapResult = new NFData();
		mapResult.put( "whole_country_val", mapper.selectWholeCountryIndex( parameter ) );
		mapResult.put( "sido_val", mapper.selectSidoIndex( parameter ));
		mapResult.put( "sgg_val", mapper.selectSggIndex( parameter ));
		return mapResult;
	}
}
