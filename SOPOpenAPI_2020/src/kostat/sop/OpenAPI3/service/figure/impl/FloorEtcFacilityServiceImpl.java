package kostat.sop.OpenAPI3.service.figure.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.figure.FloorEtcFacilityService;
import kostat.sop.OpenAPI3.service.figure.mapper.FloorEtcFacilityMapper;

/**
 * @Class Name : FloorEtcFacilityServiceImpl.java
 * @Description : FloorEtcFacilityServiceImpl Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.27           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.26
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings("rawtypes")
@Service("floorEtcFacilityService")
public class FloorEtcFacilityServiceImpl extends EgovAbstractServiceImpl implements FloorEtcFacilityService
{

	@Resource( name = "floorEtcFacilityMapper")
	private FloorEtcFacilityMapper mapper;
	
	@Override
	public List selectFloorEtcFacilityService( Map< String, String > parameter ) throws AbsException
	{
		List result = mapper.selectFloorEtcFacility( parameter ); 
		if( result.isEmpty() ) {
			throw new NoResultException();
		}
		return result;
	}

}
