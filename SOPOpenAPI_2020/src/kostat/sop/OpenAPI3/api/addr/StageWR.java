package kostat.sop.OpenAPI3.api.addr;

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
* 단계별 주소조회 API 행정동 및 도로명 주소에 대해서 단계별로 조회하는 API
* 
* <pre>
* input : stageWR.json/xml
* output : json/xml
* Table : SRV_PG_SIDOBORD
* </pre>
*
* <pre>
* <b>History:</b> 
* 이금은, 1.0, 2019/10/31 초기 작성
* </pre>
* 
* @author 이금은
* @version 1.0, 2019/10/31 <(모바일)일자리 맵>에서 년도 제어
* @see None
*/

@SuppressWarnings( "rawtypes" )
public class StageWR extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Stage.class );

	@Override
	public String getApiId()
	{
		return "API_0701";
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
			throw new ApiException( "입력값을 체크 해 주세요" );
		}
		catch( Exception e )
		{
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다." );
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
		String cd = null;
		String sido_cd = null;
		String sgg_cd = null;
		String pg_yn = null;
		String bnd_year = null;

		cd       = (String) mapParameter.get( "cd" );
		bnd_year = (String) mapParameter.get( "bnd_year" );
		if( cd == null )
		{
			mapParameter.put( "sido_cd", null );
			mapParameter.put( "sgg_cd", null );
		}
		else
		{
			if( !( cd.length() == 2 || cd.length() == 5 ) )
			{
				throw new ApiException( "코드 자릿수를 확인하세요.", COMM_ERR_CODE.ERR_PARAM );
			}
			if( cd.length() >= 2 )
			{
				sido_cd = cd.substring( 0, 2 );
			}
			if( cd.length() >= 5 )
			{
				sgg_cd = cd.substring( 2, 5 );
			}
			mapParameter.put( "sido_cd", sido_cd );
			mapParameter.put( "sgg_cd", sgg_cd );
		}
		pg_yn = (String) mapParameter.get( "pg_yn" );
		if( pg_yn == null )
		{
			mapParameter.put( "pg_yn", "0" );
		}
		else
		{
			if( !( Integer.parseInt( pg_yn ) == 0 || Integer.parseInt( pg_yn ) == 1 ) )
			{
				throw new ApiException( "경계포함유무 값을 확인하세요.", COMM_ERR_CODE.ERR_PARAM );
			}
			else
			{
				mapParameter.put( "pg_yn", pg_yn );
			}
		}
		if(bnd_year == null) bnd_year = Properties.getDefult_bnd_year();
		mapParameter.put( "bnd_year", bnd_year );
	}

	@Override
	protected String getQueryStr()
	{
		return "addr.stage";
	}

	enum MustParam
	{
	}

	enum OptionParam
	{
		accessToken
		, cd
		, pg_yn
		, bnd_year
	}
}
