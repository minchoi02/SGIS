package kostat.sop.OpenAPI3.service.figure.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.service.figure.FloorCompanyInfoService;
import kostat.sop.OpenAPI3.service.figure.mapper.FloorCompanyInfoMapper;

/**
 * @Class Name : FloorCompanyInfoServiceImpl.java
 * @Description : FloorCompanyInfoServiceImpl Class
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
@SuppressWarnings( { "rawtypes", "unchecked" } )
@Service( "floorCompanyInfoService" )
public class FloorCompanyInfoServiceImpl extends EgovAbstractServiceImpl
		implements FloorCompanyInfoService
{

	@Resource( name = "floorCompanyInfoMapper" )
	private FloorCompanyInfoMapper mapper;

	@Override
	public Map selectFloorCompanyInfoService( Map< String, String > parameters ) throws AbsException
	{
		Map result = new HashMap< String, Object >();
		List listTemp;

		// 층에 포함된 사업체 테마코드 리스트 조회
		listTemp = mapper.selectfloorThemeInfo( parameters );
		result.put( "theme_cd_list", listTemp );

		listTemp = mapper.selectfloorCompanyInfo( parameters );
		result.put( "companylist", listTemp );

		listTemp = mapper.selectfloorFacilityInfo( parameters );
		result.put( "facilitylist", listTemp );

		return result;
	}

}
