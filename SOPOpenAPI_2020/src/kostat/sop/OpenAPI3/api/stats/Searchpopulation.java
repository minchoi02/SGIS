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
* 인구통계 조건검색 API 상세한 조건을 통한 인구 통계 정보 조회 API
* 
* <pre>
* input : searchpopulation.json/xml
* output : json/xml
* Table : SRV_PT_PPLTNCENSUS
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

public class Searchpopulation extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Searchpopulation.class );

	@Override
	public String getApiId()
	{
		return "API_0312";
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

			result = session.selectList( getQueryStr(), mapParameter );

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
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get( "bnd_year" );
		String age_type = (String) mapParameter.get( "age_type" );
		String age_to = null;
		String age_from = null;
		
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

		if(age_type != null){
			//나이타입, age_type에 따른 age_from, age_to값 set
			if(age_type.equals("01")){
				age_from = "0";
				age_to = "4";
			}else if(age_type.equals("02")){
				age_from = "5";
				age_to = "9";
			}else if(age_type.equals("03")){
				age_from = "10";
				age_to = "14";
			}else if(age_type.equals("04")){
				age_from = "15";
				age_to = "19";
			}else if(age_type.equals("05")){
				age_from = "20";
				age_to = "24";
			}else if(age_type.equals("06")){
				age_from = "25";
				age_to = "29";
			}else if(age_type.equals("07")){
				age_from = "30";
				age_to = "34";
			}else if(age_type.equals("08")){
				age_from = "35";
				age_to = "39";
			}else if(age_type.equals("09")){
				age_from = "40";
				age_to = "44";
			}else if(age_type.equals("10")){
				age_from = "45";
				age_to = "49";
			}else if(age_type.equals("11")){
				age_from = "50";
				age_to = "54";
			}else if(age_type.equals("12")){
				age_from = "55";
				age_to = "59";
			}else if(age_type.equals("13")){
				age_from = "60";
				age_to = "64";
			}else if(age_type.equals("14")){
				age_from = "65";
				age_to = "69";
			}else if(age_type.equals("15")){
				age_from = "70";
				age_to = "74";
			}else if(age_type.equals("16")){
				age_from = "75";
				age_to = "79";
			}else if(age_type.equals("17")){
				age_from = "80";
				age_to = "84";
			}else if(age_type.equals("18")){
				age_from = "85";
				age_to = "89";
			}else if(age_type.equals("19")){
				age_from = "90";
				age_to = "94";
			}else if(age_type.equals("20")){
				age_from = "95";
				age_to = "99";
			}else if(age_type.equals("21")){
				//100세 이상
				age_from = "100";
			}else if(age_type.equals("22")){
				//15세 미만
				age_to = "14";
			}else if(age_type.equals("23")){
				age_from = "15";
				age_to = "64";
			}else if(age_type.equals("24")){
				//65세 이상
				age_from = "65";
			}else if(age_type.equals("25")){
				//85세 이상
				age_from = "85";
			}else if(age_type.equals("26")){
				//유아
				age_to = "7";
			}else if(age_type.equals("27")){
				//초등학생
				age_from = "8";
				age_to = "13";
			}else if(age_type.equals("28")){
				//중학생
				age_from = "14";
				age_to = "16";
			}else if(age_type.equals("29")){
				//고등학생
				age_from = "17";
				age_to = "19";
			
			}
			//20160728 - 9월 서비스
			else if(age_type.equals("30")){
				//10대 이하
				age_to = "10";
			}else if(age_type.equals("31")){
				//10대
				age_from = "10";
				age_to = "19";
			}else if(age_type.equals("32")){
				//20대
				age_from = "20";
				age_to = "29";
			}else if(age_type.equals("33")){
				//30대
				age_from = "30";
				age_to = "39";
			}else if(age_type.equals("34")){
				//40대
				age_from = "40";
				age_to = "49";
			}else if(age_type.equals("35")){
				//50대
				age_from = "50";
				age_to = "59";
			}else if(age_type.equals("36")){
				//60대
				age_from = "60";
				age_to = "69";
			}else if(age_type.equals("37")){
				//70대
				age_from = "70";
				age_to = "79";
			}else if(age_type.equals("38")){
				//80대
				age_from = "80";
				age_to = "89";
			}else if(age_type.equals("39")){
				//90대
				age_from = "90";
				age_to = "99";
			}else if(age_type.equals("40")){
				//70대 이상
				age_from = "70";
			}else if(age_type.equals("41")){
				//80대 이상
				age_from = "80";
			}else{
				throw new ApiException( "나이타입 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}
			
			if(age_to != null){
				mapParameter.put("age_to", age_to);
			}
			if(age_from != null){
				mapParameter.put("age_from", age_from);
			}
		}
		
		
		//연령정보체크
//		if( age_from == null && age_to == null )
//		{
//		}
//		else if( age_from == null || age_to == null || !StringUtil.NumberChk( age_from ) || !StringUtil.NumberChk( age_to ) )
//		{
//			throw new ApiException( "to from 연령정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM );
//		}
//		else if( Integer.parseInt( age_to ) < Integer.parseInt( age_from ) )
//		{
//			throw new ApiException( "to from 연령정보 범위를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
//		}
//		else if( Integer.parseInt( age_to ) > 150 || Integer.parseInt( age_from ) > 150 )
//		{
//			throw new ApiException( "to from 연령정보를 0~150사이의 범위로 입력해주세요", COMM_ERR_CODE.ERR_PARAM );
//		}

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
				mapParameter.put("age_from", age_from );
			}
		}

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

			//			for(int i=0 ; i<sidolist.size() ; i++){
			//				System.out.println(sidolist.get(i));
			//			}

		}
		else if( area_type.equals( "1" ) )
		{
			userareackeck( mapParameter );
		}

	}

	@Override
	protected String getQueryStr()
	{
		return "stats.searchpopulation";
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
		age_type,
		edu_level,
		mrg_state,
		accessToken,
		bnd_year,
		area_type
	}

}
