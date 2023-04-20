package kostat.sop.OpenAPI3.api.stats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;

/**
* 사업체 통계 API 통계청 센서스 정보중 사업체 통계를 조회하기 위한 API
* 
* <pre>
* input : company.json/xml
* output : json/xml
* Table : SRV_PG_CORPCENSUS
* </pre>
* 
* <pre>
* <b>History:</b> 
* 심홍헌, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 심홍헌
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Company extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Company.class );

	@Override
	public String getApiId()
	{
		return "API_0304";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		httpSession = req.getSession();

		List result = null;

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			result = session.selectList( getQueryStr(), mapParameter );

			if( result.size() == 0 )
			{
				throw new NoResultException();
			}

			logger.info( "END Query - TXID[" + getApiId() + "] " );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "[ result = " + result + " ]" );
			}
		}
		catch( PersistenceException e )
		{
//			e.printStackTrace();
			logger.error( e );
			throw new DurianSQLException( "SQL ERROR" );
		}
		catch( ApiException e )
		{
			logger.error( e );
			throw e;
		}
		catch( IllegalArgumentException e )
		{
			logger.error( e );
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		return result;
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		return OptionParam.class;
	}

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{
		String class_code = (String) mapParameter.get( OptionParam.class_code.name() );
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
			mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
//			mapParameter.put( "bnd_year", "2014" );
		}
		else if( !Properties.getBnd_year_list().contains( bnd_year ) )
		{
			throw new ApiException( "경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//년도 체크
		//2019-04-23 [김남민] 오픈API > 정책통계지도 데이터 조회 관련 Validation 수정. START
		/*
		if( !Properties.getCompany_year_list().contains( year ) )
		{
			//		if(!year_list.contains(year)){
			throw new ApiException( "년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		*/
		//2019-04-23 [김남민] 오픈API > 정책통계지도 데이터 조회 관련 Validation 수정. END
		
		// 년도 - > 차수 변환
		mapParameter.put("corp_num", convertYearToNumber( year ));

		//영역 체크
		if( area_type == null )
		{
			area_type = "0";
			mapParameter.put( "area_type", "0" );
		}
		else if( !Properties.getArea_type_list().contains( area_type ) )
		{
			throw new ApiException( "영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//하위 경계 체크
		if( low_search == null )
		{
			low_search = "0";
			mapParameter.put( "low_search", low_search );
		}
		else if( !Properties.getLow_search_list().contains( low_search ) )
		{
			throw new ApiException( "하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//산업체 분류 차수
		if( class_deg == null )
		{
			mapParameter.put( "class_deg", "9" );
		}
		else if( !class_deg.equals( "9" ) && !class_deg.equals( "8" ) && !class_deg.equals( "10" ) )
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
		else if( area_type.equals( "1" ) )
		{
			userareackeck( mapParameter );
		}

		if( class_code == null )
		{
		}
		else if( class_code != null && class_code.length() == 1 )
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
		else
		{
			throw new ApiException( "코드 값을 다시입력하세요", COMM_ERR_CODE.ERR_PARAM );
		}
	}

	private String convertYearToNumber(String year) {
		String strDefaultNum = "9";
		String strNumber;
		if( year == null || year.length() == 0)
		{
			return strDefaultNum;
		}
		
		int intYear = Integer.valueOf( year );
		
		switch( intYear )
		{
			case 2000:
			case 2001:
			case 2002:
			case 2003:
			case 2004:
			case 2005:
				strNumber = "8";
				break;
			case 2006:
			case 2007:
			case 2008:
			case 2009:
			case 2010:
			case 2011:
			case 2012:
			case 2013:
			case 2014:
				strNumber = "9";
				break;
			default:
				strNumber = strDefaultNum;
		}
		return strNumber;
	}

	@Override
	protected String getQueryStr()
	{
		return "stats.company";
	}

	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		adm_cd,
		low_search,
		area,
		class_code,
		accessToken,
		bnd_year,
		theme_cd,
		area_type,
		class_deg
	}

}
