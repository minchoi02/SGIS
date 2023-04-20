package kostat.sop.OpenAPI3.service.statscommunity.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.service.statscommunity.StatsCommunityListService;
import kostat.sop.OpenAPI3.service.statscommunity.mapper.StatsCommunityListMapper;

/**
 * @Class Name : StatsCommunityListServiceImpl.java
 * @Description : StatsCommunityListServiceImpl class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.27           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.26
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
@Service( "statsCommunityListService" )
public class StatsCommunityListServiceImpl extends EgovAbstractServiceImpl
		implements StatsCommunityListService
{
	private static final Log logger = LogFactory.getLog( StatsCommunityListServiceImpl.class );
	
	@Resource( name = "statsCommunityListMapper" )
	private StatsCommunityListMapper mapper;

	@Override
	public Map selectStatsCommunityList( Map< String, String > parameter ) throws AbsException
	{
		try
		{
			if( parameter.containsKey( "name" ) )
			{
				String strName = URLDecoder.decode( parameter.get( "name" ), "UTF-8" );
				parameter.put( "name", strName );
			}
		}
		catch( UnsupportedEncodingException e )
		{
			throw new ApiException( "파라미터를 확인해 주세요.", COMM_ERR_CODE.ERR_PARAM );
		}

		Map<String, Integer> mapTotalCnt = mapper.selectStatsCommunityListTotalCount( parameter );
		Map<String, Object> mapResult;
		
		int intPage, intCount, intTotalCount;
		intPage = Integer.valueOf( parameter.get( "page" ) );
		intCount = Integer.valueOf( parameter.get( "count" ) );
		
		intTotalCount = mapTotalCnt.get( "total_cnt" );
		
		if( logger.isDebugEnabled() )
		{
			logger.debug( String.format( "Total count : %5d", intTotalCount ));
			logger.debug( String.format( "Page number : %5d", intPage ));
			logger.debug( String.format( "Count number: %5d", intCount ));
		}
		
		mapResult = new HashMap<String, Object>();
		mapResult.put( "page_num", intPage );
		mapResult.putAll( mapTotalCnt );
		
		// Total count 0 일 경우 리턴.
		if( intTotalCount == 0 ) 
		{
			mapResult.put( "count", 0 );
			return mapResult;
		}
		
		if( intPage == 0 || intPage == 1 )
		{
			intPage = 1;
		}
		else
		{
		    // SQL limit 시작 번호 계산.
			intPage = ( intPage - 1 ) * intCount + 1;
		}
		
		parameter.put( "startnum", String.valueOf( intPage ) );
		parameter.put( "count", String.valueOf( intCount ) );
		
		List liCommunityList = mapper.selectStatsCommunityList( parameter );
		
		mapResult.put( "community_list", liCommunityList );
		mapResult.put( "count", liCommunityList.size() );
		 
		return mapResult;
	}
}
