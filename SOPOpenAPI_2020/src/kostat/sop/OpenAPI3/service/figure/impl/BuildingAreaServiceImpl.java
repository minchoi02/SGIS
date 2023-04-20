package kostat.sop.OpenAPI3.service.figure.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.figure.BuildingAreaService;
import kostat.sop.OpenAPI3.service.figure.mapper.BuildingAreaMapper;

/**
 * @Class Name : BuildingAreaServiceImpl.java
 * @Description : BuildingAreaServiceImpl Class
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
@Service( "buildingAreaService" )
public class BuildingAreaServiceImpl extends EgovAbstractServiceImpl
		implements BuildingAreaService
{

	@Resource( name = "buildingAreaMapper" )
	private BuildingAreaMapper buildingAreaMapper;

	@Override
	public List selectBuildingAreaByRect( Map< String, String > mapParameter ) throws AbsException
	{
		return buildingAreaMapper.selectArea( mapParameter );

	}

}
