package kostat.sop.OpenAPI3.service.figure;

import java.util.List;
import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : FloorEtcFacilityService.java
 * @Description : FloorEtcFacilityService Interface
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

@SuppressWarnings( "rawtypes" )
public interface FloorEtcFacilityService
{
	public List selectFloorEtcFacilityService(Map<String, String> parameters) throws AbsException;
}
