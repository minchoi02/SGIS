package kostat.sop.ServiceAPI.controller.service;

import java.util.List;
import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : SggTypeOfLifeDetailService.java
 * @Description : SggTypeOfLifeDetailService 인터페이스
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.08.31 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public interface SggTypeOfLifeDetailService {
	public List< Map< String, Object > > selectSggTypeOfLifeDetail(Map<String, String> parameter) throws AbsException;
}
