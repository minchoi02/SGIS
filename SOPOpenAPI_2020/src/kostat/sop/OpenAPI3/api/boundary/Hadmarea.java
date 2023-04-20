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
* 행정동경계 API 행정동 코드를 이용한 행정동 경계 정보 제공 API
* 
* <pre>
* input : hadmarea.json/xml
* output : json/xml
* Table : SRV_PG_SIDOBORD
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

@SuppressWarnings( "unchecked" )
public class Hadmarea extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Hadmarea.class );

	/*	
		private List bnd_year_list = null;
		
		public void setBnd_year_list(List bnd_year_list) {
			this.bnd_year_list = bnd_year_list;
		}
	*/
	@Override
	public String getApiId()
	{
		return "API_0704";
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
			
			
			
			//집계구 막기 start 
			String low_search = (String) mapParameter.get( "low_search" );
			String adm_cd = (String) mapParameter.get( "adm_cd" );
			String temp_bnd_grid = (String) mapParameter.get( "bnd_grid" );
			int admCdlenth = 0;
			if(adm_cd != null){
				admCdlenth = adm_cd.length();
				
			}
			
			if(("1".equals(low_search) && admCdlenth == 7) || ("2".equals(low_search) && admCdlenth == 5)){
				if(!"bnd_grid".equals(temp_bnd_grid)){
					//throw new ApiException( "집계구는 당분간 조회할 수 없습니다", COMM_ERR_CODE.ERR_PARAM );
				}
			}
			//집계구 막기 end 
			 
			
			
			
			
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				mapParameter.put( "strFormat", "1" );
			}
			
			//grid mng_s
			String area = "";
			if ( mapParameter.get( "area" ) != null ) {
				 area =  (String) mapParameter.get( "area" );
			}
			String zoom = "";
			if ( mapParameter.get( "zoom" ) != null ) {
				zoom =  (String) mapParameter.get( "zoom" );
			}
			String nrbyAreaAYn = "";
			if ( mapParameter.get( "nrbyAreaAYn" ) != null ) {
				nrbyAreaAYn =  (String) mapParameter.get( "nrbyAreaAYn" );
			}
			//logger.debug( "zoom [" + zoom + "] " );
			System.out.println("[Hadmarea.java] zoom [" + zoom);
			
			//bnd_grid mng_s 20180206
			String bnd_grid = "";
			if ( mapParameter.get( "bnd_grid" ) != null ) {
				bnd_grid =  (String) mapParameter.get( "bnd_grid" );
			}
			
			
			if(checkBorough( mapParameter )) {
				logger.info( "Search Type : [ Borough ]" );
				result = session.selectList( "boundary.borougharea", mapParameter );
			} else if ("Y".equals(nrbyAreaAYn)) {	//mng_s 인접지역경계
				logger.info( "Search Type : [ nrbyAreaAYn ]" );
				result = session.selectList( "boundary.getNrbyArea", mapParameter );
			} else if (!"".equals(area)) {//grid mng_s
				logger.info( "Search Type : [ grid ]" );
				result = session.selectList( "boundary.gridarea", mapParameter );
			} else if (!"".equals(bnd_grid)) {//grid mng_s
				logger.info( "Search Type : [ bnd_grid ]" );
				result = session.selectList( "boundary.bnd_gridarea", mapParameter );
			} else {
				logger.info( "Search Type : [ hadmarea ]" );
				result = session.selectList( getQueryStr(), mapParameter );
			}

			
			//디버그용
			//			HashMap data =(HashMap) result.get(0);
			//			byte[] geobyte = (byte[]) data.get("geometry");
			//			Geometry goem= WKBAdapter.wkbToGeometry(geobyte);
			//			System.out.println("[Hadmarea.java] goem.asText() [" + goem.asText());
			
			
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
			//e.printStackTrace();
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
		
		System.out.println("[SOPOpenAPI3] [Hadmarea.java] [ adm_cd = " + adm_cd + " ]" );

		//경계년도 체크
		if( year == null )
		{
			mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
		}else if("99".equals(low_search)){
			
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
		else if( !( low_search.equals( "0" ) || low_search.equals( "1" ) || low_search.equals( "2" ) || "99".equals(low_search) || "100".equals(low_search)) )
		{
			throw new ApiException( "요청정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
		}

		String sido_cd = null;
		String sgg_cd = null;
		String emdong_cd = null;
		String adm_length = null;
		
		//mng_s 행정구역 그리드의 경우 "가나1234" 처럼 한글로 시작하는 adm_cd를 던지므로 기존의 adm_cd는 0,1,2,3으로 시작한다.
		//여기서 가나로 시작하는 행정구역 그리드의 adm_cd가 넘어오면 이 부분을 처리하기 위하여 이 조건을 추가하낟. 20180212
		if( adm_cd == null ) {
			adm_length = "0";
			adm_cd = "0";
		}
		//mng_s 20180921 adm_cd가 null 이면 아래 조건에서 널포인터익셉션이 난다. 그래서 위에 임의 값으로 세팅함
		if(  adm_cd.startsWith("0") || adm_cd.startsWith("1")  || adm_cd.startsWith("2")  || adm_cd.startsWith("3") 
				 || adm_cd.startsWith("4")  || adm_cd.startsWith("5")  || adm_cd.startsWith("6")  
				 || adm_cd.startsWith("7")  || adm_cd.startsWith("8")  || adm_cd.startsWith("9")  ) {
			
			if( adm_cd == null || "0".equals(adm_cd))
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
				else if( low_search.equals( "2" ) ) // 2015.12.15 low_search 2 일 경우 수정
				{
					adm_length = "7";
				}else if( "99".equals(low_search))
				{
					adm_length = "2";
				}else if("100".equals(low_search))
				{
					adm_length = "2";
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
		} else {
			
			if( adm_cd == null  || "0".equals(adm_cd) ) {
				adm_cd = "00";
			}
			
			String bnd_grid_adm_cd = "";
			bnd_grid_adm_cd = (String)session.selectOne( "boundary.bnd_grid_adm_cd", mapParameter );
			
			if( bnd_grid_adm_cd.length() == 2 )
			{
				if( low_search.equals( "0" ) )
				{
					adm_length = "2";
				}
				sido_cd = bnd_grid_adm_cd;
			}
			else if( bnd_grid_adm_cd.length() == 5 )
			{
	
				if( low_search.equals( "0" ) )
				{
					adm_length = "5";
				}
				
				sido_cd = bnd_grid_adm_cd.substring( 0, 2 );
				sgg_cd = bnd_grid_adm_cd.substring( 2, 5 );
			}
			else if( bnd_grid_adm_cd.length() == 7 )
			{
	
				if( low_search.equals( "0" ) )
				{
					adm_length = "7";
				}
				
				sido_cd = bnd_grid_adm_cd.substring( 0, 2 );
				sgg_cd = bnd_grid_adm_cd.substring( 2, 5 );
				emdong_cd = bnd_grid_adm_cd.substring( 5, 7 );
			}
			else
			{
				throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}
		}

		//		logger.info(sido_cd+" "+sgg_cd+" "+dong_cd);
		mapParameter.put( "sido_cd", sido_cd );
		mapParameter.put( "sgg_cd", sgg_cd );
		mapParameter.put( "emdong_cd", emdong_cd );
		mapParameter.put( "adm_length", adm_length );

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
		return "boundary.hadmarea";
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
		, area //mng_s kimjoonha
		, zoom //mng_s kimjoonha
		, bnd_grid //mng_s 20180206
		, zoom_level
		, nrbyAreaAYn
	}

}
