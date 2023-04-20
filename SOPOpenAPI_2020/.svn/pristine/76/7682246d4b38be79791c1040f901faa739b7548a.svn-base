package kostat.sop.OpenAPI3.api.boundary;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

/**
 * 집계구경계 API 행정동코드를 이용한 집계구 경계 정보를 제공하는 API
 * 
 * <pre>
* input : statsarea.json/xml
* output : json/xml
* Table : SRV_PG_TOTREGBORD
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

public class Statsarea extends AbsAuthAPI< List >
{

	private static final Log logger = LogFactory.getLog( Statsarea.class );

	@Override
	public String getApiId()
	{
		return "API_0705";
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
				mapParameter.put( "strFormat", "1" );
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
			// e.printStackTrace();
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
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
			// e.printStackTrace();
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
		String adm_cd = (String) mapParameter.get( MustParam.adm_cd.name() );
		String year = (String) mapParameter.get( "year" );

		mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );

		if( adm_cd.length() != 7 )
		{
			throw new ApiException( "동코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
		}
		else
		{
			String sido_cd = null;
			String sgg_cd = null;
			String emdong_cd = null;
			sido_cd = adm_cd.substring( 0, 2 );
			sgg_cd = adm_cd.substring( 2, 5 );
			emdong_cd = adm_cd.substring( 5, 7 );
			mapParameter.put( "sido_cd", sido_cd );
			mapParameter.put( "sgg_cd", sgg_cd );
			mapParameter.put( "emdong_cd", emdong_cd );
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "boundary.statsarea";
	}

	enum MustParam
	{
		adm_cd
	}

	enum OptionParam
	{
		accessToken
		, year
	}

}
