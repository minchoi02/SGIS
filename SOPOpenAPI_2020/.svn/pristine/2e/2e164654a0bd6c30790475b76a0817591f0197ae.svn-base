package kostat.sop.OpenAPI3.service.figure.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.figure.BuildingAttributeService;
import kostat.sop.OpenAPI3.service.figure.mapper.BuildingAttributeMapper;

/**
 * @Class Name : BuildingAttributeServiceImpl.java
 * @Description : BuildingAttributeServiceImpl Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.22           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.22
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
@Service("buildingAttributeService")
public class BuildingAttributeServiceImpl extends EgovAbstractServiceImpl implements BuildingAttributeService
{
	
	@Resource( name = "buildingAttributeMapper" )
	private BuildingAttributeMapper buildingAttributeMapper;

	
	@Override
	public Map selectBuildingAttribute( Map< String, String > mapParameter ) throws AbsException
	{
		return buildingAttributeMapper.selectBuildingAttribution( mapParameter );
	}

}
