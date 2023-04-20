package kostat.sop.OpenAPI3.service.personal.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.personal.FindCodeInSmallAreaService;
import kostat.sop.OpenAPI3.service.personal.mapper.FindCodeInSmallAreaMapper;

/**
 * @Class Name : FindCodeInSmallAreaServieImpl.java
 * @Description : FindCodeInSmalAreaService 인터페이스 구현
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.11.03           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.03
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "findCodeInSmallAreaService" )
public class FindCodeInSmallAreaServieImpl extends EgovAbstractServiceImpl
		implements FindCodeInSmallAreaService
{
	@Resource( name = "findCodeInSmallAreaMapper" )
	private FindCodeInSmallAreaMapper mapper;

	@Override
	public Map< String, Object > selectFindCodeInSmallArea( Map< String, String > parameter )
	{
		return mapper.selectFindCodeInSmallArea( parameter );
	}

}
