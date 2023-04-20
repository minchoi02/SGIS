package kostat.sop.ServiceAPI.api.addr;

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

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class RgeocodeForBorough extends AbsQuery<List> {

	private static final Log logger = LogFactory.getLog( RgeocodeForBorough.class );

	@Override
	public String getApiId()
	{
		return "API_0711";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		System.out.println("executeAPI");
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
			logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
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

	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{
		String addr_type = null;
		String bnd_year = null;
		String accuracy = null;

		addr_type = (String) mapParameter.get( "addr_type" );
		if( addr_type == null )
		{
			mapParameter.put( "addr_type", "10" );
		}
		else if( !( Integer.parseInt( addr_type ) == 10 || Integer.parseInt( addr_type ) == 20 || Integer.parseInt( addr_type ) == 21 || Integer.parseInt( addr_type ) == 30 ) )
		{
			throw new ApiException( "주소종류 값을 확인하세요.", COMM_ERR_CODE.ERR_PARAM );
		}
		
		// 경계 년도가 있으면
		if( mapParameter.containsKey( OptionParam.bnd_year.name() ) )
		{
			bnd_year = (String) mapParameter.get( OptionParam.bnd_year.name() );
			
			if( ! Properties.getBnd_year_list().contains( bnd_year ) ) 
			{
				bnd_year = Properties.getDefult_bnd_year();
			}
		}
		else
		{
			bnd_year = Properties.getDefult_bnd_year();
		}
		mapParameter.put( "bnd_year", bnd_year );
		
		if( mapParameter.containsKey( OptionParam.accuracy.name() ) )
		{
			accuracy = (String) mapParameter.get( OptionParam.accuracy.name() );
			
			// accuracy 옵션이 1이 아니면 0으로 바꾼다.
			if( !accuracy.equals( "1" ) )
			{
				mapParameter.put( OptionParam.accuracy.name(), "0" );
			}
		}
	}
	
	@Override
	protected String getQueryStr()
	{
		return "addr.rgeocodeForBorough";
	}

	enum MustParam
	{
		x_coor
		, y_coor
	}

	enum OptionParam
	{
		accessToken
		, addr_type
		, bnd_year
		, accuracy
	}
}
