package kostat.sop.OpenAPI3.service.technicalbiz;

import java.util.List;
import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : InduscomService.java
 * @Description : InduscomService interface
 *  
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.18
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public interface InduscomService
{
	public List< Map< String, Object > > selectInduscom( Map< String, String > parameter ) throws AbsException;
}
