package kostat.sop.ServiceAPI.api.stats;

import java.util.ArrayList;/*SGIS4_1124_추가*/
import java.util.HashMap;/*SGIS4_1124_추가*/
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

import kostat.sop.ServiceAPI.api.catchmentArea.ServiceAreaBSCA;/*SGIS4_1124_추가*/
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 가구원 통계 API 농가,임가, 해수면어가, 내수면어가의 가구원 통계를 제공하기 위한 API
* 
* <pre>
* input : householdmemberForBorough.json/xml
* output : json/xml
* Table : SRV_DT_NONGIMOGACENSUSFAMILY
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

public class HouseholdmemberForBorough extends AbsQuery< List >
{
	private static final Log logger = LogFactory.getLog( HouseholdmemberForBorough.class );

	@Override
	public String getApiId()
	{
		return "API_0310";
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

		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();//SGIS4_1124_수정
		List result2 = null;//SGIS4_1124_추가

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
			//SGIS4_1124_BSCA적용 및 500m 격자 추가 시작
			if("bnd_grid".equals((String) mapParameter.get( "bnd_grid" ))) { //mng_s 행정구역 그리드이면
				String zoom = (String) mapParameter.get( "zoom" );
				
				String age_from = (String) mapParameter.get( "age_from" );
				String age_to = (String) mapParameter.get( "age_to" );
				
				if( age_from != null ) {
					if("0".equals(age_from)) {
						age_from = "01";
					} else if("5".equals(age_from)) {
						age_from = "02";
					} else if("10".equals(age_from)) {
						age_from = "03";
					} else if("15".equals(age_from)) {
						age_from = "04";
					} else if("20".equals(age_from)) {
						age_from = "05";
					} else if("25".equals(age_from)) {
						age_from = "06";
					} else if("30".equals(age_from)) {
						age_from = "07";
					} else if("35".equals(age_from)) {
						age_from = "08";
					} else if("40".equals(age_from)) {
						age_from = "09";
					} else if("45".equals(age_from)) {
						age_from = "10";
					} else if("50".equals(age_from)) {
						age_from = "11";
					} else if("55".equals(age_from)) {
						age_from = "12";
					} else if("60".equals(age_from)) {
						age_from = "13";
					} else if("65".equals(age_from)) {
						age_from = "14";
					} else if("70".equals(age_from)) {
						age_from = "15";
					} else if("75".equals(age_from)) {
						age_from = "16";
					} else if("80".equals(age_from)) {
						age_from = "17";
					} else if("85".equals(age_from)) {
						age_from = "18";
					} else if("90".equals(age_from)) {
						age_from = "19";
					} else if("95".equals(age_from)) {
						age_from = "20";
					} else if("100".equals(age_from)) {
						age_from = "21";
					}
					
					if("4".equals(age_to)) {
						age_to = "01";
					} else if("9".equals(age_to)) {
						age_to = "02";
					} else if("14".equals(age_to)) {
						age_to = "03";
					} else if("19".equals(age_to)) {
						age_to = "04";
					} else if("24".equals(age_to)) {
						age_to = "05";
					} else if("29".equals(age_to)) {
						age_to = "06";
					} else if("34".equals(age_to)) {
						age_to = "07";
					} else if("39".equals(age_to)) {
						age_to = "08";
					} else if("44".equals(age_to)) {
						age_to = "09";
					} else if("49".equals(age_to)) {
						age_to = "10";
					} else if("54".equals(age_to)) {
						age_to = "11";
					} else if("59".equals(age_to)) {
						age_to = "12";
					} else if("64".equals(age_to)) {
						age_to = "13";
					} else if("69".equals(age_to)) {
						age_to = "14";
					} else if("74".equals(age_to)) {
						age_to = "15";
					} else if("79".equals(age_to)) {
						age_to = "16";
					} else if("84".equals(age_to)) {
						age_to = "17";
					} else if("89".equals(age_to)) {
						age_to = "18";
					} else if("94".equals(age_to)) {
						age_to = "19";
					} else if("99".equals(age_to)) {
						age_to = "20";
					} else if("150".equals(age_to)) { //100세 이상은 age_to가 널로 들어올것으로 예상됨
						age_to = "21";
					}
					
					mapParameter.put( "age_from", age_from );
					mapParameter.put( "age_to", age_to );
				}
				
				String statType = "";
				String data_type = (String) mapParameter.get( "data_type" );
				String gender = (String) mapParameter.get( "gender" );
				String filter = (String) mapParameter.get("filter"); // SGIS4_0107 추가
				if(("0".equals(gender) || gender == null) && (age_from == null || ("01".equals(age_from) && "21".equals(age_to)))) {
					statType = "tot";
					mapParameter.put( "statType", statType );
				}
				
				result2 = session.selectList("stats.3f_household_bnd_grid", mapParameter );
				if(result2 != null && result2.size() > 0) {
					for(int i=0; i<result2.size(); i++) {
						HashMap<String, Object> kwMap = new HashMap<>();
						kwMap = ServiceAreaBSCA.getTotalSum2((HashMap) result2.get(i), "threef_" ,5 ,filter); // SGIS4_0107 수정
						if(kwMap != null) {
							result.add(kwMap);
						}
					}
				}
			} else {
			//SGIS4_1124_끝
				result = session.selectList( getQueryStr(), mapParameter );
			}//SGIS4_1124_추가
			

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
			logger.error( e );
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
		String gender = (String) mapParameter.get( "gender" );
		String area_type = (String) mapParameter.get( "area_type" );
		String low_search = (String) mapParameter.get( "low_search" );
		String age_from = (String) mapParameter.get( "age_from" );
		String age_to = (String) mapParameter.get( "age_to" );
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

		//성별 체크
		if( gender == null )
		{
			mapParameter.put( "gender", "0" );
		}
		else if( !Properties.getGender_list().contains( gender ) )
		{
			throw new ApiException( "성별 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
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
			mapParameter.put( "low_search", low_search );
		}
		else if( !Properties.getLow_search_list().contains( low_search ) )
		{
			throw new ApiException( "하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//연령정보체크
		if( age_from == null && age_to == null )
		{
		}
		else if( age_from == null || age_to == null || !StringUtil.NumberChk( age_from ) || !StringUtil.NumberChk( age_to ) )
		{
			throw new ApiException( "to from 연령정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		else if( Integer.parseInt( age_to ) < Integer.parseInt( age_from ) )
		{
			throw new ApiException( "to from 연령정보 범위를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		else if( Integer.parseInt( age_to ) > 150 || Integer.parseInt( age_from ) > 150 )
		{
			throw new ApiException( "to from 연령정보를 0~150사이의 범위로 입력해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		
		//SGIS4_1124_BSCA적용 및 500m 격자 추가 시작
		if("bnd_grid".equals((String) mapParameter.get( "bnd_grid" ))) { //mng_s 행정구역 그리드이면
			low_search = "0";
			mapParameter.put( "low_search", low_search );
		} else 
		//SGIS4_1124_BSCA적용 및 500m 격자 추가 끝
		//동코드 분할
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
			//					logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
			mapParameter.put( "sido_cd", sido_cd );
			mapParameter.put( "sgg_cd", sgg_cd );
			mapParameter.put( "emdong_cd", emdong_cd );
			mapParameter.put( "adm_length", adm_length );
			mapParameter.put( "low_search", low_search );
			
			//2020년수정변경 시작 (ggm)
			if("Y".equals(mapParameter.get("is_non_self"))) {
				String sgg_cd_nonSelf = (String) mapParameter.get("sgg_cd"); 
				if (sgg_cd_nonSelf != null) {
					if ((("5".equals(adm_length) && "0".equals(low_search)) || ("13".equals(adm_length) && "2".equals(low_search))) && sgg_cd_nonSelf.length() >= 2) {
						sgg_cd_nonSelf = sgg_cd_nonSelf.substring(0, 2);		// 시군구코드 끝자리 자르기
					}
				}
				mapParameter.put("sgg_cd_nonSelf", sgg_cd_nonSelf);
			}
			//2020년수정변경 끝			
		}
		else if( area_type.equals( "1" ) )
		{
			userareackeck( mapParameter );
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "stats.householdmemberForBorough";
	}

	enum MustParam
	{
		year, data_type
	}

	enum OptionParam
	{
		adm_cd,
		low_search,
		area,
		age_from,
		age_to,
		gender,
		accessToken,
		bnd_year,
		area_type
		, is_zoom_lvl4		//2020년수정변경: 4시군구 조회여부 구분자-줌레벨이 4(ggm)
		, is_non_self		//2020년수정변경: 4시군구 조회여부 구분자-비자치구를 포함한 시 여부(ggm)		
		, bnd_grid		//SGIS4_1124_추가
		, zoom			//SGIS4_1124_추가
		, filter //SGIS4_0107 추가
		, oga_div //SGIS4_0222_추가 		
	}
}
