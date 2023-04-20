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
* 그리드경계 API 행정동 코드를 이용한 그리드 경계 정보 제공 API
* 
* <pre>
* input : gridarea.json/xml
* output : json/xml
* Table : SRV_PG_SIDOBORD
* </pre>
*
* <pre>
* <b>History:</b> 
* kimjoonha, 1.0, 2017/07/18 초기 작성
* </pre>
* 
*/

@SuppressWarnings( "unchecked" )
public class Gridarea extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Gridarea.class );

	/*	
		private List bnd_year_list = null;
		
		public void setBnd_year_list(List bnd_year_list) {
			this.bnd_year_list = bnd_year_list;
		}
	*/
	@Override
	public String getApiId()
	{
		return "API_0709";
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
			
			if(checkBorough( mapParameter )) {
				logger.info( "Search Type : [ Borough ]" );
				result = session.selectList( "boundary.borougharea", mapParameter );
			} else {
				logger.info( "Search Type : [ gridarea ]" );
				result = session.selectList( getQueryStr(), mapParameter );
			}

			
			//			HashMap data =(HashMap) result.get(0);
			//			byte[] geobyte = (byte[]) data.get("geometry");
			//			Geometry goem= WKBAdapter.wkbToGeometry(geobyte);
			//			System.out.println(goem.asText());
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

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{

		String adm_cd = (String) mapParameter.get( OptionParam.adm_cd.name() );
		String low_search = (String) mapParameter.get( OptionParam.low_search.name() );
		String year = (String) mapParameter.get( "year" );
		String area = (String) mapParameter.get( "area" );

		//경계년도 체크
		if( year == null )
		{
			mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
		}
		else if( !Properties.getBnd_year_list().contains( year ) )
		{
			throw new ApiException( "경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		
		if( low_search == null )
		{
			low_search = "1";
			mapParameter.put( OptionParam.low_search.name(), "1" );
		}
		else if( !( low_search.equals( "0" ) || low_search.equals( "1" ) || low_search.equals( "2" )) )
		{
			throw new ApiException( "요청정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
		}

		String sido_cd = null;
		String sgg_cd = null;
		String emdong_cd = null;
		String adm_length = null;
		if( adm_cd == null )
		{
			adm_length = "0";
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
			else if( low_search.equals( "2" ) )
			{
				adm_length = "7";
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
			else if( low_search.equals( "2" ) )
			{
				adm_length = "13";
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
				adm_length = "7";
			}
			else if( low_search.equals( "2" ) )
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

		//		logger.info(sido_cd+" "+sgg_cd+" "+dong_cd);
		mapParameter.put( "sido_cd", sido_cd );
		mapParameter.put( "sgg_cd", sgg_cd );
		mapParameter.put( "emdong_cd", emdong_cd );
		mapParameter.put( "adm_length", adm_length );
		mapParameter.put( "area", area );

	}
	
	private boolean checkBorough( Map< String, String > parameters )
	{
		String value = parameters.get( OptionParam.borough.name() );
		String strAdmCd = parameters.get( OptionParam.adm_cd.name());
		String strLowSearch = parameters.get( OptionParam.low_search.name() );
		
		if( value == null || strAdmCd == null) {
			return false;
		}
		
		boolean isSidoCode = ((strAdmCd.length() == 2) && strLowSearch.equals( "1" )) ? true : false;
		boolean isSggCode = ((strAdmCd.length() == 5) && strLowSearch.equals( "0" )) ? true : false;
		
		
		if( value.equals( "1" ) && (isSidoCode || isSggCode ) )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "boundary.gridarea";
	}

	enum MustParam
	{
	}

	enum OptionParam
	{
		accessToken
		, adm_cd
		, low_search
		, year
		, borough
		, area
	}

}
