package kostat.sop.OpenAPI3.service.technicalbiz;

import java.util.List;
import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : SidoCompanyInfoService.java
 * @Description : SidoCompanyInfoService interface
 *  
 * @
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.07
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public interface SidoCompanyInfoService
{
	public List<Map<String, Object>> selectSidoCompanyInfo( Map< String, String > parameter ) throws AbsException;
}
