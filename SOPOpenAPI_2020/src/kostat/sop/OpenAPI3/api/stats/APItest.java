package kostat.sop.OpenAPI3.api.stats;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;
import org.apache.ibatis.session.SqlSession;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.AbsQuery;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;

public class APItest extends AbsQuery< String >
{
	private static final Log logger = LogFactory.getLog( APItest.class );

	@Override
	public String getApiId()
	{
		return "API_0320";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public String executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		//		List result = null;
		//		SqlSession session = null;

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );
			//			session = Properties.getSqlSessionFactory().openSession();

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			Map mapParameter = getParameterMap( req );

			_checkNullParameterValue( mapParameter );

			//			optimizeParameterMap(mapParameter);

			//			result = session.selectList(getQueryStr(), mapParameter);

			//			if (result.size() == 0) {
			//				throw new NoResultException();
			//			}

			//			logger.info("END Query - TXID[" + getApiId() + "] ");

			//			if (logger.isDebugEnabled()) {
			//				logger.debug("[ result = " + result + " ]");
			//			}
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
		finally
		{
			//			if (session != null) {
			//				session.close();
			//			}
		}
		return "OK";
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr()
	{
		// TODO Auto-generated method stub
		return null;
	}

	enum MustParam
	{
	}

	enum OptionParam
	{
	}

	public void successExecute( SqlSession session, String srv_id, NFData datas ) throws AbsException
	{
	}

	@Override
	public String checkAuth( Map mapParameter )
	{
		// TODO Auto-generated method stub
		return null;
	}
}
