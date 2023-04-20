package kostat.sop.ServiceAPI.controller.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : SidoTypeOfWorkerInfoService.java
 * @Description : SidoTypeOfWorkerInfoService interface
 *  
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.11 최초생성
 *
 * @author wavus 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
////////////////박길섭////////////////////
public interface SidoTypeOfWorkerInfoService
{
	public List<HashMap< String, Object >> selectSidoTypeOfWorkerInfo( Map< String, String > parameter ) throws AbsException;

}
