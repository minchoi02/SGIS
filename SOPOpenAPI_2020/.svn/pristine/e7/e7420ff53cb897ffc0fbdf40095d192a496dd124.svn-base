package kostat.sop.OpenAPI3.service.stats.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.stats.CensusIndexService;
import kostat.sop.OpenAPI3.service.stats.mapper.CensusIndexMapper;

/**
 * @Class Name : CensusIndexServiceImpl.java
 * @Description : CensusIndexServiceImpl Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @
 * @  2015.10.28 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.28
 * @version 1.0
 * @see
 *
 * 		Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "censusIndexService" )
public class CensusIndexServiceImpl extends EgovAbstractServiceImpl
		implements CensusIndexService
{
	private static final Log logger = LogFactory.getLog( CensusIndexServiceImpl.class );

	@Resource( name = "censusIndexMapper" )
	private CensusIndexMapper mapper;

	private final int EMDONG_ADDR_LEN = 7;

	private final String DEFAULT_LOW_SEARCH = "0";

	private final int LOW_SEARCH = 1;
	private final int LOW_SEARCH2 = 2;

//	private final String DEFAULT_BND_YEAR = "2014";
	@Resource( name = "stats_defult_bnd_year" )
	private String DEFAULT_BND_YEAR;

	@Override
	public List< Map< String, Object > > selectCensusIndex( Map< String, String > parameter )
	{
		List< Map< String, Object > > result = null;
		Integer intAdmCdLen, intLowSearch, intInfoDiv;
		String strTemp = parameter.get( "low_search" );
		strTemp = ( strTemp == null ) ? DEFAULT_LOW_SEARCH : strTemp;
		intLowSearch = Integer.valueOf( strTemp );

		strTemp = parameter.get( "adm_cd" );
		strTemp = ( strTemp == null ) ? "" : strTemp;
		intAdmCdLen = Integer.valueOf( strTemp.length() );
		intInfoDiv = getInfoDivValue( intAdmCdLen );
		
//		parameter.put( "info_div", getInfoDivValue( intAdmCdLen ) );

		strTemp = parameter.get( "bnd_year" );
		strTemp = ( strTemp == null ) ? DEFAULT_BND_YEAR : strTemp; //2017.11.24 [개발팀] 왜 주석처리되어있는지 모르겠음
		// 디폴트 경계를 최신으로 사용 한다.
		//strTemp = ( strTemp == null ) ? DEFAULT_BND_YEAR : DEFAULT_BND_YEAR;
		
		parameter.put( "bnd_year", strTemp );

		// 전국 시도 코드로 검색
		if( intAdmCdLen == 0 )
		{
			if (intLowSearch != 0) {
				intInfoDiv += 1;
			}
			parameter.put( "info_div", String.valueOf( intInfoDiv ));
			result = mapper.selectCensusIndexSidoAll( parameter );
		}
		else if(intLowSearch == LOW_SEARCH) // 주소 길이가 0이 아니고 상세검색일 경우
		{
			intInfoDiv += 1;
			parameter.put( "info_div", String.valueOf( intInfoDiv ) );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "SEARCH TYPE   : [ LOW_SEARCH1 ]" );
				logger.debug( "INFO DIV TYPE : [ " + intInfoDiv + " ]" );
			}
			
			if( intInfoDiv > 3 )
			{
				// 집계구 총조사 테이블에서 검색.
				result = mapper.selectTotCensusIndex( parameter );
			}
			else
			{
				// 총조사 시군구 테이블에서 조회.
				result = mapper.selectCensusIndexLowSearch( parameter );
			}
//			result = mapper.selectTotCensusIndex( parameter );
		}
		else if( intLowSearch == LOW_SEARCH2 )
		{
			intInfoDiv += 2;
			parameter.put( "info_div", String.valueOf( intInfoDiv ) );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "SEARCH TYPE : [ LOW_SEARCH2 ]" );
				logger.debug( "INFO DIV TYPE : [ " + intInfoDiv + " ]" );
			}

			// 집계구 검색
			if( intInfoDiv > 3 )
			{
				// 집계구 테이블에서 조회
				result = mapper.selectTotCensusIndex( parameter );
			}
			else
			{
				// 시도테이블 검색
				// 시군구 테이블에서 조회
				result = mapper.selectCensusIndexLowSearch( parameter );
			}
		}
		else
		{
			parameter.put( "info_div", String.valueOf( intInfoDiv ));
			// 해당 코드만 검색 함.
			result = mapper.selectCensusIndex( parameter );
		}

		if( result == null || result.isEmpty() )
		{
			throw new NoResultException();
		}

		return result;
	}
	
	//mng_s grid kimjoonha
	@Override
	public List< Map< String, Object > > selectCensusIndexGrid( Map< String, String > parameter )
	{
		List< Map< String, Object > > result = null;
		Integer intAdmCdLen, intLowSearch, intInfoDiv;
		String strTemp = parameter.get( "low_search" );
		strTemp = ( strTemp == null ) ? DEFAULT_LOW_SEARCH : strTemp;
		intLowSearch = Integer.valueOf( strTemp );

		strTemp = parameter.get( "adm_cd" );
		strTemp = ( strTemp == null ) ? "" : strTemp;
		intAdmCdLen = Integer.valueOf( strTemp.length() );
		intInfoDiv = getInfoDivValue( intAdmCdLen );
		
//		parameter.put( "info_div", getInfoDivValue( intAdmCdLen ) );

		strTemp = parameter.get( "bnd_year" );
//		strTemp = ( strTemp == null ) ? DEFAULT_BND_YEAR : strTemp;
		// 디폴트 경계를 최신으로 사용 한다.
		strTemp = ( strTemp == null ) ? DEFAULT_BND_YEAR : DEFAULT_BND_YEAR;
		
		parameter.put( "bnd_year", strTemp );

		/*
		// 전국 시도 코드로 검색
		if( intAdmCdLen == 0 )
		{
			parameter.put( "info_div", String.valueOf( intInfoDiv ));
			result = mapper.selectCensusIndexSidoAll( parameter );
		}
		else if(intLowSearch == LOW_SEARCH) // 주소 길이가 0이 아니고 상세검색일 경우
		{
			intInfoDiv += 1;
			parameter.put( "info_div", String.valueOf( intInfoDiv ) );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "SEARCH TYPE   : [ LOW_SEARCH1 ]" );
				logger.debug( "INFO DIV TYPE : [ " + intInfoDiv + " ]" );
			}
			
			if( intInfoDiv > 3 )
			{
				// 집계구 총조사 테이블에서 검색.
				result = mapper.selectTotCensusIndex( parameter );
			}
			else
			{
				// 총조사 시군구 테이블에서 조회.
				result = mapper.selectCensusIndexLowSearch( parameter );
			}
//			result = mapper.selectTotCensusIndex( parameter );
		}
		else if( intLowSearch == LOW_SEARCH2 )
		{
			intInfoDiv += 2;
			parameter.put( "info_div", String.valueOf( intInfoDiv ) );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "SEARCH TYPE : [ LOW_SEARCH2 ]" );
				logger.debug( "INFO DIV TYPE : [ " + intInfoDiv + " ]" );
			}

			// 집계구 검색
			if( intInfoDiv > 3 )
			{
				// 집계구 테이블에서 조회
				result = mapper.selectTotCensusIndex( parameter );
			}
			else
			{
				// 시도테이블 검색
				// 시군구 테이블에서 조회
				result = mapper.selectCensusIndexLowSearch( parameter );
			}
		}
		else
		{
			parameter.put( "info_div", String.valueOf( intInfoDiv ));
			// 해당 코드만 검색 함.
			result = mapper.selectCensusIndex( parameter );
		}
		*/
		
		result = mapper.selectCensusIndexGrid( parameter );

		if( result == null || result.isEmpty() )
		{
			throw new NoResultException();
		}

		return result;
	}

	//mng_s bnd_grid 20180208 행정구역 그리드 kimjoonha
	@Override
	public List< Map< String, Object > > selectCensusIndexBndGrid( Map< String, String > parameter )
	{
		List< Map< String, Object > > result = null;
		Integer intAdmCdLen, intLowSearch, intInfoDiv;
		String strTemp = parameter.get( "low_search" );
		strTemp = ( strTemp == null ) ? DEFAULT_LOW_SEARCH : strTemp;
		intLowSearch = Integer.valueOf( strTemp );

		strTemp = parameter.get( "adm_cd" );
		strTemp = ( strTemp == null ) ? "" : strTemp;
		intAdmCdLen = Integer.valueOf( strTemp.length() );
		intInfoDiv = getInfoDivValue( intAdmCdLen );
		

		strTemp = parameter.get( "bnd_year" );

		// 디폴트 경계를 최신으로 사용 한다.
		strTemp = ( strTemp == null ) ? DEFAULT_BND_YEAR : DEFAULT_BND_YEAR;
		
		parameter.put( "bnd_year", strTemp );
		
		result = mapper.selectCensusIndexBndGrid( parameter );

		if( result == null || result.isEmpty() )
		{
			throw new NoResultException();
		}

		return result;
	}
	
	
	/**
	 * 반환값
	 * 1 : 시도
	 * 2 : 시군구
	 * 3 : 읍면동
	 * 
	 * @param admCodeLen
	 * @return
	 */
	private Integer getInfoDivValue( int admCodeLen )
	{
		if( admCodeLen == 2 )
		{
			return 1;
		}
		else if( admCodeLen == 5 )
		{
			return 2;
		}
		else if( admCodeLen == 7 )
		{
			return 3;
		}
		//2017.11.24 [개발팀] 총조사주요지표 남한경계 조회
		else if (admCodeLen == 0)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	}

}
