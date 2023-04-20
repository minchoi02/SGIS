package kostat.sop.OpenAPI3.service.startupbiz;

import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : SggTypeOfBusinessInfoService.java
 * @Description : SggTypeOfBusinessInfoService interface
 *  
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.02 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.02
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public interface SggTypeOfBusinessInfoService
{
	public Map< String, Object > selectSggTypeOfBusinessInfo( Map< String, String > parameter ) throws AbsException;
}
