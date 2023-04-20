package kostat.sop.ServiceAPI.api.stats;

import java.util.ArrayList;
import java.util.HashMap;/*SGIS4_0107_추가*/
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

import kostat.sop.ServiceAPI.api.catchmentArea.ServiceAreaBSCA;/*SGIS4_0107_추가*/
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 주택 통계 API 통계청 센서스의 주택에 대한 통계를 제공하기 위한 API
* 
* <pre>
* input : houseForBorough.json/xml
* output : json/xml
* Table : SRV_PT_HOUSECENSUS
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

public class HouseForBorough extends AbsQuery< List >
{
	private static final Log logger = LogFactory.getLog( HouseForBorough.class );
	
	private Map<String, Map<String, String>> houseAreaCodeMap;

	public Map< String, Map< String, String > > getHouseAreaCodeMap()
	{
		return houseAreaCodeMap;
	}
	
	public void setHouseAreaCodeMap( Map< String, Map< String, String > > houseAreaCodeMap )
	{
		this.houseAreaCodeMap = houseAreaCodeMap;
	}

	@Override
	public String getApiId()
	{
		return "API_0306";
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
			
			// 2016.08.31 house_area_cd, house_use_prid_cd 추가로 변경됨.
			Integer year = Integer.valueOf( (String) mapParameter.get( MustParam.year.name() ) );
			String strAreaType = (String) mapParameter.get( OptionParam.area_type.name() );
			if( year > 2010 && strAreaType.equals( "0" ))
			{
				if( mapParameter.containsKey(OptionParam.house_area_cd.name()) )
				{
					String house_area_str = mapParameter.get("house_area_cd").toString();
					String house_area_cd[] = house_area_str.split(",");
					mapParameter.put( "house_area_cd", house_area_cd );
				}
				if( mapParameter.containsKey(OptionParam.const_year.name()) )
				{
					String const_year = mapParameter.get("const_year").toString();
					//String const_year_cd[] = const_year_str.split(",");
					mapParameter.put( "const_year", const_year );
				}
				
				
				//===================== mng_s grid ===============================
				String zoom = (String) mapParameter.get( "zoom" ); //mng_s
				String bnd_grid = (String) mapParameter.get( "bnd_grid" ); //mng_s
				
				if(zoom != null && !"".equals(zoom) && !"bnd_grid".equals(bnd_grid)) { //mng_s 그리드이면
					result = session.selectList( "stats.house_grid", mapParameter );
				} else if("bnd_grid".equals(bnd_grid)) { //mng_s 행정구역 그리드이면
					//SGIS4_0107_시작
					//result = session.selectList( "stats.house_bnd_grid", mapParameter );
					String statType = "";
					String const_year = (String) mapParameter.get( "const_year" );
					//String[] house_area_cd = (String[]) mapParameter.get( "house_area_cd" ); //mng_s 20220224 캐스팅 오류로 주석처리 후 아래 if문 로직 변경
					
					if(mapParameter.get( "house_type" ) == null && const_year == null && mapParameter.get( "house_area_cd" ) == null) { //mng_s 20220224 캐스팅 오류로 로직 변경
						statType = "tot";
						mapParameter.put("statType", statType);
					}
					result2 = session.selectList( "stats.house_bnd_grid", mapParameter );//211029_SGIS_4 수정
				
					if(result2 != null && result2.size() > 0) {
						for(int i=0; i<result2.size(); i++) {
							HashMap<String, Object> kwMap = new HashMap<>();
							kwMap = ServiceAreaBSCA.getTotalSum2((HashMap) result2.get(i), "hou_" ,5 ,null);
							if(kwMap != null) {
								result.add(kwMap);
							}
						}
					}
					//SGIS4_0107_BSCA적용 및 500m 격자 추가  끝
				} else {
					// 주택사용기간코드
					// 주택면적코드 사용하여 쿼리 조회
					// SRV_DT_HOUSEREG_2015, SRV_DT_HOUSESGG_2015 에서 조회쿼리를 생성.
					result = session.selectList( "stats.house2015ForBorough", mapParameter );
				}
				
				
			}
			else
			{
				if( mapParameter.containsKey(OptionParam.house_area_cd.name()) )
				{
					String house_area_param = null;
					String house_area_str = mapParameter.get("house_area_cd").toString();
					String house_area_cd[] = house_area_str.split(",");
					
					mapParameter.put( "house_area_cd", house_area_cd ); //mng_s 20220225 뒷단로직 xsql에서 오류발생하여 추가함.
					
					List tmp_list = new ArrayList< String >();
					for(int i = 0; i < house_area_cd.length; i ++){
						Map<String, String> tmp = houseAreaCodeMap.get(house_area_cd[i]);
//						tmp_list.add( tmp.get("from"));
//						tmp_list.add( tmp.get("to"));
						
						if(house_area_cd.length == 1){
							house_area_param = "house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to");
						}else if(i==0){
							house_area_param = "((house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to") + ")";
						}else if(i==house_area_cd.length-1){
							house_area_param = house_area_param + " or (house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to") + "))";
						}else{
							house_area_param = house_area_param + " or (house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to") + ")";
						}
					}
//					mapParameter.put( "house_area_param", tmp_list );
					mapParameter.put( "house_area_param", house_area_param );
				}
				
				//===================== mng_s grid ===============================
				String zoom = (String) mapParameter.get( "zoom" ); //mng_s
				String bnd_grid = (String) mapParameter.get( "bnd_grid" ); //mng_s
				if(zoom != null && !"".equals(zoom) && !"bnd_grid".equals(bnd_grid)) { //mng_s 그리드이면
					result = session.selectList( "stats.house_grid", mapParameter );
				} else if("bnd_grid".equals(bnd_grid)) { //mng_s 행정구역 그리드이면
					//SGIS4_0107_시작
					//result = session.selectList( "stats.house_bnd_grid", mapParameter );
					String statType = "";
					//String house_type = (String) mapParameter.get( "house_type" );
					String const_year = (String) mapParameter.get( "const_year" );
					//String house_area_cd = (String) mapParameter.get( "house_area_cd" ); //mng_s 20220225 개발팀 코딩오류 수정
					
					if(mapParameter.get( "house_type" ) == null && const_year == null &&  mapParameter.get( "house_area_cd" ) == null) { //mng_s 20220225 개발팀 코딩오류 수정
						statType = "tot";
						mapParameter.put("statType", statType);
					}
					result2 = session.selectList( "stats.house_bnd_grid", mapParameter );
					if(result2 != null && result2.size() > 0) {
						for(int i=0; i<result2.size(); i++) {
							HashMap<String, Object> kwMap = new HashMap<>();
							kwMap = ServiceAreaBSCA.getTotalSum2((HashMap) result2.get(i), "hou_" ,5 ,null);
							if(kwMap != null) {
								result.add(kwMap);
							}
						}
					}
					//SGIS4_0107_BSCA적용 및 500m 격자 추가  끝
				} else {
					result = session.selectList( getQueryStr(), mapParameter );
				}
				
				
				
				// 주택 면적 코드르 이용하여 from, to 값을 구한다.
//				if( mapParameter.containsKey( OptionParam.house_area_cd.name() ))
//				{
//					String strHouseAreaCd =  (String) mapParameter.get( OptionParam.house_area_cd.name() );
//					Map<String, String> tmp = houseAreaCodeMap.get( strHouseAreaCd );
//					if(tmp != null)
//					{
//						mapParameter.put( OptionParam.bdspace_from.name(), tmp.get( "from" ) );
//						mapParameter.put( OptionParam.bdspace_to.name(), tmp.get( "to" ) );
//					}
//				}
//				result = session.selectList( getQueryStr(), mapParameter );
				
			}

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
			e.printStackTrace();
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
		//		String house_type = (String) mapParameter.get("house_type");
		String const_year = (String) mapParameter.get( "const_year" );
		String bdspace_from = (String) mapParameter.get( "bdspace_from" );
		String bdspace_to = (String) mapParameter.get( "bdspace_to" );
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get( "bnd_year" );
		String bnd_grid = (String) mapParameter.get( "bnd_grid" );/*SGIS_0107_추가*/
		
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

		if( const_year != null && !Properties.getConst_year_list().contains( const_year ) )
		{
			throw new ApiException( "const_year정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		
		//const_year > 2010 이상일 경우 새로 작성하는 쿼리를 실행 해야 함.
		
		if( bdspace_from == null && bdspace_to == null )
		{
		}
		else if( bdspace_from == null || bdspace_to == null || !StringUtil.NumberChk( bdspace_from ) || !StringUtil.NumberChk( bdspace_to ) )
		{
			throw new ApiException( "to from bdspace정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		if( mapParameter.containsKey( "house_type" ) )
		{
			String house_type_str = mapParameter.get( "house_type" ).toString();

			String house_type[] = house_type_str.split( "," );

			if( house_type.length > 3 )
			{
				throw new ApiException( "house_type 중복은 3개까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}
			//주택 외 거주시설 병합 요청으로 06요청을 받았을 시 코드값을 늘림
			if( house_type_str.contains( "06" ) )
			{
				house_type_str = house_type_str.replaceAll( "06", "06,07,08,09,10,99" );
			}
			System.out.println( house_type_str );
			house_type = house_type_str.split( "," );

			for( int i = 0; i < house_type.length; i++ )
			{
				if( !Properties.getHouse_type_list().contains( house_type[i] ) )
				{
					throw new ApiException( "house_type정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
				}
			}

			mapParameter.put( "house_type", house_type );
		}

		// 2016.03.16 house_type 옵션이 있을때 쿼리 조건 수정.
		if( !mapParameter.containsKey( "house_type" ) )
		{
			mapParameter.put( "search_type", "Y" );
		}
//		if( !mapParameter.containsKey( "const_year" ) && !mapParameter.containsKey( "bdspace_from" ) && !mapParameter.containsKey( "bdspace_to" ) && !mapParameter.containsKey( "house_type" ) )
//		{
//			mapParameter.put( "search_type", "Y" );
//		}

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
		return "stats.houseForBorough";
	}

	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		accessToken,
		adm_cd,
		low_search,
		area,
		house_type,
		const_year,
		bdspace_from,
		bdspace_to,
		bnd_year,
		area_type,
		// 주택사용기간 코드
		house_use_prid_cd,
		// 주거면적코드
		house_area_cd,
		zoom, //mng_s
		bnd_grid, //mng_s 20180221
		is_zoom_lvl4		//2020년수정변경: 4시군구 조회여부 구분자-줌레벨이 4(ggm)
		, is_non_self		//2020년수정변경: 4시군구 조회여부 구분자-비자치구를 포함한 시 여부(ggm)		
	}

}
