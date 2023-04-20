package kostat.sop.OpenAPI3.api.stats;

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

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.common.util.StringUtil;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

/**
* 내부용 인구통계 조건검색 API 상세한 조건을 통한 인구 통계 정보 조회 API
* 
* <pre>
* input : searchpopulation.json/xml
* output : json/xml
* Table : SRV_PT_PPLTNCENSUS
* </pre>
*
* <pre>
* <b>History:</b> 
* 나재웅, 1.0, 2016/07/29 초기 작성
* </pre>
* 
* @author 나재웅
* @version 1.0, 2016/07/29 메서드 추가
* @see None
*/

public class InnerSearchpopulation extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( InnerSearchpopulation.class );

	@Override
	public String getApiId()
	{
		return "API_0302";
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

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}
			Map mapParameter = getParameterMap( req );

			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );

			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );
			
			//===================== mng_s grid ===============================
			String zoom = (String) mapParameter.get( "zoom" ); //mng_s
			String bnd_grid = (String) mapParameter.get( "bnd_grid" ); //mng_s
			
			if(zoom != null && !"".equals(zoom) && !"bnd_grid".equals(bnd_grid)) { //mng_s 그리드이면
				
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
				
				result = session.selectList( "stats.innersearchpopulation_grid", mapParameter );
			} else if("bnd_grid".equals(bnd_grid)) { //mng_s 행정구역 그리드이면
				
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
				
				result = session.selectList( "stats.innersearchpopulation_bnd_grid", mapParameter );
			} else {
				result = session.selectList( getQueryStr(), mapParameter );
			}

			if( result.size() == 0 )
			{
				throw new NoResultException();
			}

			logger.info( "END Query - ApiID[" + getApiId() + "] " );

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

	@Override
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
		String zoom = (String) mapParameter.get( "zoom" ); //mng_s

		// 2016.08.29 년도가 2015일때는 교육정도별, 혼인정보별 파라미터 입력 불가. 
		
		// mng_s 2017. 10. 30 j.h.Seok
		int tempYear = Integer.parseInt(year);
		//if(year.equals( "2015" ))
		if(tempYear >= 2015)
		// mng_e 2017. 10. 30 j.h.Seok
		{
			boolean booEdu = mapParameter.containsKey( OptionParam.edu_level.name() );
			boolean booMrg = mapParameter.containsKey( OptionParam.mrg_state.name() );
			
			if( booEdu && booMrg )
			{
				// throw Exception
				throw new ApiException( "해당 조사년도에서는 교육정도, 혼인정도를 검색할 수 없습니다." );
			}
			else if( booEdu )
			{
				
				throw new ApiException( "해당 조사년도에서는 교육정도를 검색할 수 없습니다." );
			}
			else if( booMrg )
			{
				
				throw new ApiException( "해당 조사년도에서는 혼인정도를 검색할 수 없습니다." );
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
			mapParameter.put( "low_search", "0" );
		}
		else if( !Properties.getLow_search_list().contains( low_search ) )
		{
			throw new ApiException( "하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		//교육수준
		// 2016.02.03 수학여부 빠짐
		if( mapParameter.containsKey( "edu_level" ) )
		{
			String [] arrEdu_levels = ((String) mapParameter.get( "edu_level" )).split( "," );
			mapParameter.put( OptionParam.edu_level.name(), arrEdu_levels );
			
//			if( edu_level.length() == 2 )
//			{
//				String study_level = edu_level.substring( 1, 2 );
//				edu_level = edu_level.substring( 0, 1 );
//				if( !Properties.getStudy_level_list().contains( study_level ) || !Properties.getEdu_level_list().contains( edu_level ) )
//				{
//					throw new ApiException( "교육정도가 정의되지 않은 값 입니다", COMM_ERR_CODE.ERR_PARAM );
//				}
//			}
//			else if( edu_level.length() == 1 )
//			{
//				if( !Properties.getEdu_level_list().contains( edu_level ) )
//				{
//					throw new ApiException( "교육정도가 정의되지 않은 값 입니다", COMM_ERR_CODE.ERR_PARAM );
//				}
//			}
//			else
//			{
//				throw new ApiException( "교육정도는 두자리만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
//			}
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

		//결혼 상태 체크
		if( mapParameter.containsKey( "mrg_state" ) )
		{
			String mrg_state[] = mapParameter.get( "mrg_state" ).toString().split( "," );
			mapParameter.put( "mrg_state", mrg_state );
			
			// 2015.10.23 결혼 상태 체크 일때 연령 시작이 15세이상으로 조건 수정.
			if( age_from != null )
			{
				int intAgeFrom = Integer.parseInt( age_from );
				if( intAgeFrom < 15 )
				{
					age_from = "15";
				}
				mapParameter.put( OptionParam.age_from.name(), age_from );
			}
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
					//				throw new ApiException("행정동 코드를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
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
				//			logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd+" "+adm_length+" "+low_search);
	
				//			System.out.println(sido_cd);
				//			mapParameter.put("sido_cd", sido_cd);
				//			
				//			SqlSession session = Properties.getSqlSessionFactory().openSession();
				//			List sidolist = session.selectList("sidocheck", mapParameter);
				//			session.close();
				//			mapParameter.put("sidolist", sidolist);
				mapParameter.put( "sido_cd", sido_cd );
				mapParameter.put( "sgg_cd", sgg_cd );
				mapParameter.put( "emdong_cd", emdong_cd );
				mapParameter.put( "adm_length", adm_length );
				mapParameter.put( "low_search", low_search );
				mapParameter.put( "zoom", zoom ); //mng_s
	
				//			for(int i=0 ; i<sidolist.size() ; i++){
				//				System.out.println(sidolist.get(i));
				//			}
	
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
		return "stats.innersearchpopulation";
	}

	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		adm_cd,
		gender,
		low_search,
		area,
		age_from,
		age_to,
		edu_level,
		mrg_state,
		accessToken,
		bnd_year,
		area_type,
		zoom, //mng_s
		bnd_grid //mng_s 20180220
	}

}
