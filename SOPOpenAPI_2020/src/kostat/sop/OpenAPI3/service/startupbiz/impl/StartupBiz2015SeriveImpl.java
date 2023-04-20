package kostat.sop.OpenAPI3.service.startupbiz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.startupbiz.StartupBiz2015Service;
import kostat.sop.OpenAPI3.service.startupbiz.mapper.StartupBiz2015Mapper;

/**
 * @Class Name : StartupBiz2015SeriveImpl.java
 * @Description : StartupBiz2015SeriveImpl 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.26 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015.11.26
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "startupBizService" )
public class StartupBiz2015SeriveImpl extends EgovAbstractServiceImpl
		implements StartupBiz2015Service
{
	@Resource( name = "startupBizMapper" )
	private StartupBiz2015Mapper mapper;

	@Override
	public List< Map< String, Object > > selectStartupBiz( Map< String, Object > parameter )
	{
		String strAgeType = (String) parameter.get( "ppl_age_type" );
		if(strAgeType != null) {
			String [] arrAgeType = strAgeType.split( "," );
			parameter.put( "ppl_age_type_list", arrAgeType );
		}
		
		// 2017. 03. 28 개발팀 수정요청
		parameter.put("bnd_year", Properties.defult_bnd_year);
		List liResult = mapper.selectStartupBiz( parameter );
		if( liResult == null || liResult.isEmpty() )
		{
			throw new NoResultException();
		}
		
		return liResult;
	}

}
