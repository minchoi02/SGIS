package kostat.sop.ServiceAPI.api.stats;

import java.util.ArrayList;/*SGIS4_0107_추가*/
import java.util.HashMap;/*SGIS4_0107_추가*/
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;
import org.junit.Test.None;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.catchmentArea.ServiceAreaBSCA;/*SGIS4_0107_추가*/
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;
/**
 * 가구 통계 API 통계청 센서스의 가구 통계를 제공하기 위한 API
 * 
 * <pre>
* input : householdForBorough.json/xml
* output : json/xml
* Table : SRV_PT_FAMILYCENSUS
 * </pre>
 *
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2020.04.09 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020. 04.09
 * @version 1.0
 * @see
 */

public class HouseholdForBorough extends AbsQuery< List > 
{

	private static final Log logger = LogFactory.getLog( HouseholdForBorough.class );

	@Override
	public String getApiId()
	{
		return "API_0305";
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

		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();//SGIS4_0107_수정
		List result2 = null;//SGIS4_0107_추가

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

			//===================== mng_s grid ===============================
			String zoom = (String) mapParameter.get( "zoom" ); //mng_s
			String bnd_grid = (String) mapParameter.get( "bnd_grid" ); //mng_s
			
			if(zoom != null && !"".equals(zoom) && !"bnd_grid".equals(bnd_grid)) { //mng_s 그리드이면
				result = session.selectList( "stats.household_grid", mapParameter );
			} else if("bnd_grid".equals(bnd_grid)) { //mng_s 행정구역 그리드이면
				//SGIS4_0107_BSCA적용 및 500m 격자 추가 시작
				//result = session.selectList( "stats.household_bnd_grid", mapParameter );
				String statType = "";
				
				if(mapParameter.get( "household_type" ) == null){
					statType = "tot";
					mapParameter.put("statType", statType);
				}
				
				result2 = session.selectList( "stats.household_bnd_grid", mapParameter );//211029_SGIS_4 수정
				//SGIS4_1112_BSCA적용 및 500m 격자 추가 시작
				if(result2 != null && result2.size() > 0) {
					for(int i=0; i<result2.size(); i++) {
						HashMap<String, Object> kwMap = new HashMap<>();
						kwMap = ServiceAreaBSCA.getTotalSum2((HashMap) result2.get(i), "fam_" ,5 ,null);
						if(kwMap != null) {
							result.add(kwMap);
						}
					}
				}
				//SGIS4_0107_BSCA적용 및 500m 격자 추가  끝
			} else {
				result = session.selectList( getQueryStr(), mapParameter );
			}
			
			//			HashMap data =(HashMap) result.get(0);
			//			byte[] geobyte = (byte[]) data.get("geometry");
			//			Geometry goem= WKBAdapter.wkbToGeometry(geobyte);
			//			System.out.println(goem.asText());
			if(result == null || result.size() == 0 ) //SGIS4_0107_추가 
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
		String year = (String) mapParameter.get( "year" );
		String area_type = (String) mapParameter.get( "area_type" );
		String low_search = (String) mapParameter.get( "low_search" );
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get( "bnd_year" );

		//2020년수정변경 시작 (ggm)
		String is_zoom_lvl4 = (String) mapParameter.get("is_zoom_lvl4");
		if(is_zoom_lvl4 == null) {
			mapParameter.put("is_zoom_lvl4", "N");
		}
		String is_non_self = (String) mapParameter.get("is_non_self");
		if(is_non_self == null) {
			mapParameter.put("is_non_self", "N");
		}
		//2020년수정변경 끝	
		
		// 2016.08.29 년도가 2015일때는 교육정도별, 혼인정보별 파라미터 입력 불가. 
		// mng_s 2017. 10. 30 j.h.Seok
		int tempYear = Integer.parseInt(year);
		//if(year.equals( "2015" ))
		if(tempYear >= 2015)
		// mng_e 2017. 10. 30 j.h.Seok
		{
			if(mapParameter.containsKey( OptionParam.ocptn_type.name() ))
			{
				throw new ApiException( "해당 조사년도에서는 점유형태를 검색할 수 없습니다.", COMM_ERR_CODE.ERR_PARAM );
			}
		}

		//경계년도 체크
		if( bnd_year == null || true)
		{
			mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
//			mapParameter.put( "bnd_year", "2014" );
		}
		else if( !Properties.getBnd_year_list().contains( bnd_year ) )
		{
			throw new ApiException( "경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		
		//년도 체크
		if( !Properties.getYear_list().contains( year ) )
		{
			throw new ApiException( "년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//영역 체크
		if( area_type == null )
		{
			area_type = "0";
			mapParameter.put( "area_type", "0" );
		}
		else if( !Properties.getArea_type_list().contains( area_type ) )
		{
			throw new ApiException( "영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//하위 경계 체크
		if( low_search == null )
		{
			low_search = "0";
			mapParameter.put( "low_search", "0" );
		}
		else if( !Properties.getLow_search_list().contains( low_search ) )
		{
			throw new ApiException( "하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		if( mapParameter.containsKey( "household_type" ) )
		{
			String household_type[] = mapParameter.get( "household_type" ).toString().split( "," );

			if( household_type.length > 3 )
			{
				throw new ApiException( "household_type 중복은 3개까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}

			for( int i = 0; i < household_type.length; i++ )
			{
				if( !Properties.getHousehold_type_list().contains( household_type[i] ) )
				{
					throw new ApiException( "household_type정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
				}
			}

			mapParameter.put( "household_type", household_type );
		}

		if( mapParameter.containsKey( "ocptn_type" ) )
		{
			String ocptn_type[] = mapParameter.get( "ocptn_type" ).toString().split( "," );
			mapParameter.put( "ocptn_type", ocptn_type );
		}

		if( !mapParameter.containsKey( "household_type" ) || !mapParameter.containsKey( "ocptn_type" ) )
		{
			mapParameter.put( "search_type", "Y" );
		}

		//동코드 분할
		if("bnd_grid".equals((String) mapParameter.get( "bnd_grid" ))) { //mng_s 행정구역 그리드이면
			low_search = "0";
			mapParameter.put( "low_search", low_search );
		} else {
			if( area_type.equals( "0" ) )
			{
				String adm_cd = (String) mapParameter.get( "adm_cd" );
				String sido_cd = null;
				String sgg_cd = null;
				String emdong_cd = null;
				if( adm_cd == null )
				{
					adm_length = "0";
					low_search = "1";
					mapParameter.put( "low_search", low_search );
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
						//2020년수정변경 시작 (ggm)
						//is_non_self 가 "Y"일 때 한단계 아래는 비자치구
						if("Y".equals(is_non_self)) {
							adm_length = "5";
						}else {
							adm_length = "7";
						}
						//2020년수정변경 끝						
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
						adm_length = "13";
					}
					else if( low_search.equals( "2" ) )
					{
						adm_length = "13";
						low_search = "1";
					}
	
					sido_cd = adm_cd.substring( 0, 2 );
					sgg_cd = adm_cd.substring( 2, 5 );
					emdong_cd = adm_cd.substring( 5, 7 );
				}
				else
				{
					throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
				}
				//			logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
				mapParameter.put( "sido_cd", sido_cd );
				mapParameter.put( "sgg_cd", sgg_cd );
				mapParameter.put( "emdong_cd", emdong_cd );
				mapParameter.put( "adm_length", adm_length );
				mapParameter.put( "low_search", low_search );
			}
			else if( area_type.equals( "1" ) )
			{
				userareackeck( mapParameter );
			}
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "stats.householdForBorough";
	}

	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		adm_cd,
		low_search,
		area,
		household_type,
		ocptn_type,
		accessToken,
		bnd_year,
		area_type,
		zoom, //mng_s
		bnd_grid //mng_s 20180221
		, is_zoom_lvl4		//2020년수정변경: 4시군구 조회여부 구분자-줌레벨이 4(ggm)
		, is_non_self		//2020년수정변경: 4시군구 조회여부 구분자-비자치구를 포함한 시 여부(ggm)		
	}

}
