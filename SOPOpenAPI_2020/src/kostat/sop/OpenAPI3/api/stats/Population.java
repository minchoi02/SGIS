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
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

/**
* 인구 통계 API 통계청 센서스 정보중 전체적인 인구 통계 정보를 조회하기 위한 API
* 
* <pre>
* input : population.json/xml
* output : json/xml
* Table : SRV_DT_PPLTNSUM
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

/**
 * censusIndex.java 파일로 교체됨.
 * @author htkim
 *
 */
@Deprecated
public class Population extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Population.class );

	@Override
	public String getApiId()
	{
		return "API_0301";
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

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

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
			//			throw new ParameterException("입력값을 체크 해 주세요");
			throw new ApiException( "입력값을 체크 해 주세요.", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
//			e.printStackTrace();
			logger.error(e);

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
		String year = (String) mapParameter.get( "year" );
		String area_type = (String) mapParameter.get( "area_type" );
		String low_search = (String) mapParameter.get( "low_search" );
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get( "bnd_year" );

		//경계년도 체크
		if( bnd_year == null )
		{
			mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
		}
		else if( !Properties.getBnd_year_list().contains( bnd_year ) )
		{
			throw new ApiException( "경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//년도 체크
		if( !Properties.getYear_list().contains( year ) )
		{
			throw new ApiException( "년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//영역 체크
		//		if(area_type==null){
		//			area_type="0";
		//			mapParameter.put("area_type", "0");
		//		}else if(!Properties.getArea_type_list().contains(area_type)){
		//			throw new ApiException("영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		//		}

		//하위 경계 체크
		if( low_search == null )
		{
			low_search = "0";
			mapParameter.put( "low_search", "0" );
		}
		else if( !Properties.getLow_search_list().contains( low_search ) )
		{
			throw new ApiException( "하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//동코드 분할
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

			sido_cd = adm_cd.substring( 0, 2 );
			sgg_cd = adm_cd.substring( 2, 5 );
			emdong_cd = adm_cd.substring( 5, 7 );
		}
		else
		{
			throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		//							logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
		mapParameter.put( "sido_cd", sido_cd );
		mapParameter.put( "sgg_cd", sgg_cd );
		mapParameter.put( "emdong_cd", emdong_cd );
		mapParameter.put( "adm_length", adm_length );
	}

	@Override
	protected String getQueryStr()
	{
		return "stats.population";
	}

	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		low_search, adm_cd, accessToken, bnd_year
	}

}
