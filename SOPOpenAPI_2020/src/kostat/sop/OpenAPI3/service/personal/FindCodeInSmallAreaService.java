package kostat.sop.OpenAPI3.service.personal;

import java.util.Map;

/**
 * @Class Name : FindCodeInSmallAreaService.java
 * @Description : FindCodeInSmallAreaService interface
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.11.03           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 11.03
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
public interface FindCodeInSmallAreaService
{
	public Map< String, Object > selectFindCodeInSmallArea( Map< String, String > parameter );
}
