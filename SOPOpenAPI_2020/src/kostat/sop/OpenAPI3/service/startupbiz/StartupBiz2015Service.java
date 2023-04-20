package kostat.sop.OpenAPI3.service.startupbiz;

import java.util.List;
import java.util.Map;

/**
 * @Class Name : StartupBiz2015Servie.java
 * @Description : StartupBiz2015Servie interface
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2015.11.26 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.26
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
public interface StartupBiz2015Service
{
	public List< Map< String, Object > > selectStartupBiz( Map< String, Object > parameter );
}
