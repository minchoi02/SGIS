package kostat.sop.ServiceAPI.api.catchmentArea;

import java.util.HashMap;
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
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class getSrvAreaGridStatDataList extends AbsQuery<HashMap<String,Object>>{

	
	private static final Log logger = LogFactory.getLog( getSrvAreaGridStatDataList.class );
	
	@Override
	public String getApiId()
	{
		return "API_202006";
	}
	
	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.POST;
	}
	
	@Override
	public HashMap<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		httpSession = req.getSession();

		HashMap<String, Object> result = new HashMap<>();

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );
			
			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}
			//면적
			result.put("areaSize",session.selectList( "catchmentArea.selectSrvAreaSize", mapParameter ));
			//인구통계
			result.put("pops",session.selectList( "catchmentArea.selectSrvAreaGridPopsList", mapParameter ));
			//가구통계
			result.put("family",session.selectList( "catchmentArea.selectSrvAreaGridFamilyList", mapParameter ));
			//주택통계
			result.put("house",session.selectList( "catchmentArea.selectSrvAreaGridHouseList", mapParameter ));
			//사업체,종사자 통계
			result.put("copr",session.selectList( "catchmentArea.selectSrvAreaGridCoprList", mapParameter ));
			
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
			throw new ApiException( "입력값을 체크 해 주세요.", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
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

	protected void optimizeParameterMap( Map mapParameter )
	{
	}
	
	@Override
	protected String getQueryStr()
	{
		return null;
	}
	enum MustParam
	{
	}

	enum OptionParam
	{
		accessToken,
		base_year,
		srvAreaType,
		grid_level,
		area,
		radius
	}


}
