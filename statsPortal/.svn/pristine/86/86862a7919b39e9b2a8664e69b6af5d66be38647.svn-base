package kostat.sop.ServiceAPI.api.urban;

import java.util.HashMap;
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
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

public class UrbarsGeometry extends AbsQuery<List> {

	private static final Log logger = LogFactory.getLog( UrbarsGeometry.class );
	
	@Override
	public String getApiId()
	{
		return "API_202172";
	}
	
	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.POST;
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
			logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );
			
			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				mapParameter.put( "strFormat", "1" );
			}
			
			String urban_cls_gb = StringUtil.isNullToString(mapParameter.get("urban_cls_gb"));
			if("cls_sgis".equals(urban_cls_gb)) {
				String urban_sido_list = StringUtil.isNullToString(mapParameter.get("urban_sido_list"));
				if(!"".equals(urban_sido_list)) {
					String[] splitStr = urban_sido_list.split("_");
					mapParameter.put( "urban_sido_list", splitStr);
				}
			}
			
			result = session.selectList( getQueryStr(), mapParameter );

			if( result == null || result.size() == 0 )
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
		return "urban.selectUrbanAreaGeometry";
	}

	enum MustParam
	{		
	}

	enum OptionParam
	{
		accessToken,
		base_year,
		urban_cls_gb,
		urban_id,
		urban_type,
		urban_sido_cd,
		urban_sgg_cd,
		urban_sido_list,
		comparison_gb,
		comparison_urban_id
	}
}
