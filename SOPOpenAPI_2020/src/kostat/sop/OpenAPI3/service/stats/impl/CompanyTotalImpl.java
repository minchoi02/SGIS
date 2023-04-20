package kostat.sop.OpenAPI3.service.stats.impl;

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
import kostat.sop.OpenAPI3.service.stats.CompanyTotalService;
import kostat.sop.OpenAPI3.service.stats.mapper.CompanyTotalMapper;

/**
 * @Class Name : CompanyTotalImpl.java
 * @Description : CompanyTotalImpl Class
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @
 * @  2016.08.29 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016. 08.29
 * @version 1.0
 * @see
 *
 * 		Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "companyTotalService" )
public class CompanyTotalImpl extends EgovAbstractServiceImpl
		implements CompanyTotalService
{
	private static final Log logger = LogFactory.getLog( CompanyTotalImpl.class );

	@Resource( name = "companyTotalMapper" )
	private CompanyTotalMapper mapper;
	
	@Resource( name = "stats_defult_bnd_year" )
	private String BND_YEAR;
	
	@Resource( name = "stats_bnd_year_list" )
	private List BND_YEAR_LIST;
	
	@Resource( name = "company_year_list" )
	private List COMPANY_YEAR_LIST;
	
	@Resource( name = "stats_area_type_list" )
	private List AREA_TYPE_LIST;

	@Resource( name = "stats_low_search_list" )
	private List LOW_SEARCH_LIST;

	@Override
	public List< Map< String, Object > > selectCompanyTotal( Map< String, String > parameter ) throws AbsException
	{
		optimizeParameterMap( parameter );
		return mapper.selectCompanyTotal( parameter );
	}

	private void optimizeParameterMap( Map mapParameter ) throws AbsException
	{
		String class_code = (String) mapParameter.get( "class_code" );
		String code_length = null;
		String year = (String) mapParameter.get( "year" );
		String area_type = (String) mapParameter.get( "area_type" );
		String low_search = (String) mapParameter.get( "low_search" );
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get( "bnd_year" );
		String class_deg = (String) mapParameter.get( "class_deg" );

		//경계년도 체크
		if( bnd_year == null || true)
		{
			mapParameter.put( "bnd_year", BND_YEAR );
		}
		else if( !BND_YEAR_LIST.contains( bnd_year ) )
		{
			throw new ApiException( "경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//년도 체크
		//2019-04-23 [김남민] 오픈API > 정책통계지도 데이터 조회 관련 Validation 수정. START
		/*
		if( !COMPANY_YEAR_LIST.contains( year ) )
		{
			//		if(!year_list.contains(year)){
			throw new ApiException( "년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		*/
		//2019-04-23 [김남민] 오픈API > 정책통계지도 데이터 조회 관련 Validation 수정.END
		
		// 년도 - > 차수 변환
		// mapParameter.put("corp_num", convertYearToNumber( year ));

		//영역 체크
		if( area_type == null )
		{
			area_type = "0";
			mapParameter.put( "area_type", "0" );
		}
		else if( !AREA_TYPE_LIST.contains( area_type ) )
		{
			throw new ApiException( "영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//하위 경계 체크
		if( low_search == null )
		{
			low_search = "0";
			mapParameter.put( "low_search", low_search );
		}
		else if( !LOW_SEARCH_LIST.contains( low_search ) )
		{
			throw new ApiException( "하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//산업체 분류 차수
		if( class_deg == null )
		{
			mapParameter.put( "class_deg", "9" );
		}
		else if( !class_deg.equals( "9" ) && !class_deg.equals( "8" )&& !class_deg.equals( "10" ) )
		{
			throw new ApiException( "산업체 분류코드 차수는 8,9,10차 입니다", COMM_ERR_CODE.ERR_PARAM );
		}

		//동코드 분할
		if( area_type.equals( "0" ) )
		{
			String adm_cd = (String) mapParameter.get( "adm_cd" );
			String sido_cd = null;
			String sgg_cd = null;
			String emdong_cd = null;
			if( adm_cd == null )
			{
				adm_length = "0";
				low_search = "1";
				mapParameter.put( "low_search", low_search );
			}
			else if( adm_cd.length() == 2 )
			{

				if( low_search.equals( "0" ) )
				{
					adm_length = "2";
				}
				else if( low_search.equals( "1" ) )
				{
					adm_length = "5";
				}
				else if( low_search.equals( "2" ) )
				{
					adm_length = "7";
				}

				sido_cd = adm_cd;
			}
			else if( adm_cd.length() == 5 )
			{

				if( low_search.equals( "0" ) )
				{
					adm_length = "5";
				}
				else if( low_search.equals( "1" ) )
				{
					adm_length = "7";
				}
				else if( low_search.equals( "2" ) )
				{
					adm_length = "13";
				}

				sido_cd = adm_cd.substring( 0, 2 );
				sgg_cd = adm_cd.substring( 2, 5 );
			}
			else if( adm_cd.length() == 7 )
			{

				if( low_search.equals( "0" ) )
				{
					adm_length = "7";
				}
				else if( low_search.equals( "1" ) )
				{
					adm_length = "13";
				}
				else if( low_search.equals( "2" ) )
				{
					adm_length = "13";
					low_search = "1";
				}

				sido_cd = adm_cd.substring( 0, 2 );
				sgg_cd = adm_cd.substring( 2, 5 );
				emdong_cd = adm_cd.substring( 5, 7 );
//			mapParameter.put( "adm_length", adm_length );
			}
			else
			{
				throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}
			//					logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
			mapParameter.put( "sido_cd", sido_cd );
			mapParameter.put( "sgg_cd", sgg_cd );
			mapParameter.put( "emdong_cd", emdong_cd );
			mapParameter.put( "adm_length", adm_length );
			mapParameter.put( "low_search", low_search );
		}

		if( class_code != null && class_code.length() == 1 )
		{
			String ksic1 = class_code;
			code_length = String.valueOf( class_code.length() );
			mapParameter.put( "ksic1", ksic1 );
			mapParameter.put( "code_length", code_length );
		}
		else if( class_code != null && class_code.length() >= 3 && class_code.length() <= 6 )
		{
			String ksic1 = class_code.substring( 0, 1 );
			String ksic5 = class_code.substring( 1, class_code.length() );
			code_length = String.valueOf( class_code.length() );
			mapParameter.put( "ksic1", ksic1 );
			mapParameter.put( "ksic5", ksic5 );
			mapParameter.put( "code_length", code_length );
		}
//		else
//		{
//			throw new ApiException( "코드 값을 다시입력하세요", COMM_ERR_CODE.ERR_PARAM );
//		}
	}

}
