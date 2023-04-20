package kostat.sop.ServiceAPI.api.catchmentArea;

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
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class FacilityTypeSearchList extends AbsQuery< List > {
	
	private static final Log logger = LogFactory.getLog( FacilityTypeSearchList.class );
	
	@Override
	public String getApiId()
	{
		return "API_202002";
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
		String mode = StringUtil.isNullToString(mapParameter.get("mode"));
		
		if("screen".equals(mode)) {
			String area = StringUtil.isNullToString(mapParameter.get("area"));

			if("".equals(area)) {
				try {
					throw new ApiException( "도형 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
				} catch (ApiException e) {
					logger.error(e);
					throw e;
				}
				
			}
		}else {
			String sidoCd = StringUtil.isNullToString(mapParameter.get("sidoCd"));
			String sggCd = StringUtil.isNullToString(mapParameter.get("sggCd"));
			String emdCd = StringUtil.isNullToString(mapParameter.get("emdCd"));
			
			if("".equals(sggCd) || "0".equals(sggCd) || sggCd.length() < 3) {
				try {
					throw new ApiException( "시군구 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
				} catch (ApiException e) {
					logger.error(e);
					throw e;
				}
				
			}else {
				String areaCd = sidoCd + sggCd;
				if(!"".equals(emdCd) && !"0".equals(emdCd)) {
					areaCd = areaCd + emdCd;
				}
				mapParameter.put("areaCd", areaCd);
				mapParameter.put("areaCd_len", areaCd.length());
			}
		}
		
		if(mapParameter.containsKey("copr_base_year")){
			String copr_base_year = StringUtil.isNullToString(mapParameter.get("copr_base_year"));
			if("2016".equals(copr_base_year)) {
				mapParameter.put("copr_base_year", "9016");
			}
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "catchmentArea.selectFacilityTypeSearchList";
	}

	enum MustParam
	{
		classDeg,
		mode,
		copr_base_year
	}

	enum OptionParam
	{
		accessToken,
		factypeCd,
		area,
		sidoCd,
		sggCd,
		emdCd		
	}
}
