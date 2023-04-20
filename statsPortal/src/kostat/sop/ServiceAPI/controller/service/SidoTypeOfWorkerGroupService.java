package kostat.sop.ServiceAPI.controller.service;

import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : SidoTypeOfWorkerGroupService.java
 * @Description : SidoTypeOfWorkerGroupService 인터페이스
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.14 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public interface SidoTypeOfWorkerGroupService
{
	public Map<String, Object> selectSidoTypeOfWorkerGroup(Map<String, String> parameter) throws AbsException;
}
