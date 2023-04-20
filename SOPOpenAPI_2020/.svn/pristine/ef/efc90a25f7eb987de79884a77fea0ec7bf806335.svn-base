package kostat.sop.OpenAPI3.service.technicalbiz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.service.statscommunity.impl.StatsCommunityListServiceImpl;
import kostat.sop.OpenAPI3.service.technicalbiz.SggStartupBizFacService;
import kostat.sop.OpenAPI3.service.technicalbiz.mapper.SggStartupBizFacMapper;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


/**
 * @Class Name : SggStartupBizFacServiceImpl.java
 * @Description : SggStartupBizFacServiceImpl 인터페이스 구현
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
@Service( "sggStartupBizFacService" )
public class SggStartupBizFacServiceImpl extends EgovAbstractServiceImpl
		implements SggStartupBizFacService
{
	private static final Log logger = LogFactory.getLog( StatsCommunityListServiceImpl.class );
	@Resource(name = "sggStartupBizFacMapper")
	private SggStartupBizFacMapper mapper;
	
	@Override
	public Map selectSggStartupBizFac( Map< String, String > parameter ) throws AbsException
	{
		String adm_cd = (String) parameter.get( "adm_cd" );
		String sido_cd = null;
		String sgg_cd = null;
		
		if(adm_cd.length() == 2)
		{
			sido_cd = adm_cd;
		}
		else if(adm_cd.length() == 5)
		{
			sido_cd = adm_cd.substring(0,2);
			sgg_cd = adm_cd.substring(2,5);
		}
		else{
			throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		
		parameter.put("sido_cd", sido_cd);
		parameter.put("sgg_cd", sgg_cd);
		
		Map<String, Integer> mapTotalCnt = mapper.selectSggStartupBizFacCount( parameter );
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
		
		List liCommunityList = mapper.selectSggStartupBizFac( parameter );
		
		mapResult.put( "community_list", liCommunityList );
		mapResult.put( "count", liCommunityList.size() );
		 
		return mapResult;
	}
}
