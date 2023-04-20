package kostat.sop.OpenAPI3.service.startupbiz;

import java.util.List;
import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : LqMapTypeOfCountrySidoSggLqService.java
 * @Description : LqMapTypeOfCountrySidoSggLqService 인터페이스
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2018.09.06 최초생성
 *
 * @author SGIS+ 개발팀 박길섭
 * @since 2018. 08.01
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public interface LqMapTypeOfCountrySidoSggLqService
{
	public List<Map< String, Object >> selectLqMapTypeOfCountrySidoSggLq( Map< String, String > parameter ) throws AbsException;

}
