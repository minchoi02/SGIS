package kostat.sop.OpenAPI3.service.statscommunity;

import java.util.Map;

import com.neighborsystem.durian.exception.AbsException;

/**
 * @Class Name : StatsCommunityOpinionListService.java
 * @Description : StatsCommunityOpinionListService Interface
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2016.10.17 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016. 10.17
 * @version 1.0
 * @see
 *
 * 		Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
public interface StatsCommunityOpinionListService
{
	public Map selectStatsCommunityOpinionList( Map< String, String > parameter ) throws AbsException;

}
