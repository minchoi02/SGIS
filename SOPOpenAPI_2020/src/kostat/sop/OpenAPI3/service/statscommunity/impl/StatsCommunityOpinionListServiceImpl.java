package kostat.sop.OpenAPI3.service.statscommunity.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.service.statscommunity.StatsCommunityOpinionListService;
import kostat.sop.OpenAPI3.service.statscommunity.mapper.StatsCommunityOpinionListMapper;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : StatsCommunityOpinionListServiceImpl.java
 * @Description : StatsCommunityOpinionListServiceImpl class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.10.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016. 10.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
@SuppressWarnings( "rawtypes" )
@Service( "statsCommunityOpinionListService" )
public class StatsCommunityOpinionListServiceImpl extends EgovAbstractServiceImpl
		implements StatsCommunityOpinionListService
{
	private static final Log logger = LogFactory.getLog( StatsCommunityOpinionListServiceImpl.class );
	
	@Resource( name = "statsCommunityOpinionListMapper" )
	private StatsCommunityOpinionListMapper mapper;

	@Override
	public Map selectStatsCommunityOpinionList( Map< String, String > parameter ) throws AbsException
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

		Map<String, Integer> mapTotalCnt = mapper.selectStatsCommunityOpinionListTotalCount( parameter );
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
		
		List liCommunityList = mapper.selectStatsCommunityOpinionList( parameter );
		
		mapResult.put( "poi_list", liCommunityList );
		mapResult.put( "count", liCommunityList.size() );
		
		return mapResult;
	}
}
