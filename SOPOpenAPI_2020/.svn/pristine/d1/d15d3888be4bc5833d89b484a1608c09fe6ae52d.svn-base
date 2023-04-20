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
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

/**
* 산업체분류 API
* 통계청 센서스의 산업체 분류 코드를 제공하기 위한 API
* <pre>
* input : industrycode.json/xml
* output : json/xml
* Table : CMM_CD_CORPCLASS
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

public class Industrycode extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Industrycode.class );

	@Override
	public String getApiId()
	{
		return "API_0303";
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

			_checkNullParameterValue( mapParameter );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
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
		finally
		{
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

	@Override
	protected String getQueryStr()
	{
		return "stats.industrycode";
	}

	enum MustParam
	{
		class_deg
	}

	enum OptionParam
	{
		class_code
		, accessToken
	}

}
