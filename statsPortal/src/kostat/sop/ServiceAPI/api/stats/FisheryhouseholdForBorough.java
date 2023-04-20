package kostat.sop.ServiceAPI.api.stats;

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
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 어가 통계 API 어가에 대한 통계를 제공하기 위한 API
* 
* <pre>
* input : fisheryhouseholdForBorough.json/xml
* output : json/xml
* Table : SRV_PT_OGACENSUS
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

public class FisheryhouseholdForBorough extends AbsQuery< List >
{
	private static final Log logger = LogFactory.getLog( FisheryhouseholdForBorough.class );

	@Override
	public String getApiId()
	{
		return "API_0309";
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
			logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

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
			// throw new ParameterException("입력값을 체크 해 주세요");
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
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
		String area_type = (String) mapParameter.get( "area_type" );
		String low_search = (String) mapParameter.get( "low_search" );
		String oga_div = (String) mapParameter.get( "oga_div" );
		String adm_length = "0";
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

		// 년도 체크
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

		// 하위 경계 체크
		if( low_search == null )
		{
			low_search = "0";
			mapParameter.put( "low_search", "0" );
		}
		else if( !Properties.getLow_search_list().contains( low_search ) )
		{
			throw new ApiException( "하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		// 어가구분
		if( oga_div == null )
		{
		}
		else if( !Properties.getOga_div_list().contains( oga_div ) )
		{
			throw new ApiException( "어가구분 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
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
			//							logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
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
		return "stats.fisheryhouseholdForBorough";
	}

	enum MustParam
	{
		year, oga_div
	}

	enum OptionParam
	{
		accessToken
		, adm_cd
		, low_search
		, area
		, bnd_year
		, area_type
		, is_zoom_lvl4		//2020년수정변경: 4시군구 조회여부 구분자-줌레벨이 4(ggm)
		, is_non_self		//2020년수정변경: 4시군구 조회여부 구분자-비자치구를 포함한 시 여부(ggm)		
	}

}
