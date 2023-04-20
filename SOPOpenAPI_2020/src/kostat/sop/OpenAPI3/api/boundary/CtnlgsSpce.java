package kostat.sop.OpenAPI3.api.boundary;

import java.util.Enumeration;
import java.util.HashMap;
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
import kostat.sop.OpenAPI3.common.geom.Geometry;
import kostat.sop.OpenAPI3.common.geom.WKBAdapter;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

/**
* 연속지적도 API
* 
* <pre>
* input : CtnlgsSpce.json/xml
* output : json/xml
* Table : LSMD_CONT_LDREG
* </pre>
*
* <pre>
* <b>History:</b> 
* 손원웅, 1.0, 2019/11/07 초기 작성
* </pre>
* 
* @author 손원웅
* @version 1.0, 2019/11/07 메서드 추가
* @see None
*/

@SuppressWarnings( "unchecked" )
public class CtnlgsSpce extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( CtnlgsSpce.class );

	/*	
		private List bnd_year_list = null;
		
		public void setBnd_year_list(List bnd_year_list) {
			this.bnd_year_list = bnd_year_list;
		}
	*/
	@Override
	public String getApiId()
	{
		return "API_0708";
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
			
			result = session.selectList( "boundary.CtnlgsSpce", mapParameter );
			
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
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
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

	enum MustParam
	{
	}

	enum OptionParam
	{
		accessToken
		,sw_x
		,sw_y
		,ne_x
		,ne_y
		,adm_cd
	}

	@Override
	protected void optimizeParameterMap(Map mapParameter) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
