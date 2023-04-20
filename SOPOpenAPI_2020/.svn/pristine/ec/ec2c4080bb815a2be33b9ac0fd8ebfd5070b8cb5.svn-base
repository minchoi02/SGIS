package kostat.sop.OpenAPI3.api.search;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.search.address.AddressDivision;
import kostat.sop.OpenAPI3.search.index.GeocodeIndexFieldDefineEnum;

@SuppressWarnings({"rawtypes", "unchecked"})
public class Kosis extends AbsAuthAPI< Map >
{

	private static final Log logger = LogFactory.getLog( Kosis.class );

	@Override
	public Map executeAPI( HttpServletRequest req, HttpServletResponse res, String arg2 ) throws AbsException
	{
		System.out.println("Kosis executeAPI ... ");
		httpSession = req.getSession();

		//List result = new ArrayList();
		Map result = new HashMap();

		try
		{
			System.out.println( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			System.out.println( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );
			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );
			System.out.println( "---------" );
			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}
			/*			
						result = session.selectList(getQueryStr(), mapParameter);
						*/

			//String[] strSearchTemp = ((String)mapParameter.get(MustParam.searchword.name())).split(" ");

			mapParameter.put( "gis_se", "0" );

			// 두 단어로 들어올 경우 주소가 존재하는 걸로 간주한다.
			if( mapParameter.get( "addr_syn" ) != null )
			{

				// 주소분석 배열 0은 주소 배열 1은 검색어
				//AddressDivision ad 	= new AddressDivision((String) mapParameter.get("addr_syn"));
				AddressDivision ad = new AddressDivision( (String) mapParameter.get( "addr_syn" ) );

				Map mapAddress = ad.getResult();

				// 동단위 검색
				if( !mapAddress.get( GeocodeIndexFieldDefineEnum.emdong_syn.name() ).equals( "" ) )
				{
					mapParameter.put( "gis_se", "3" );
					// 시군구 단위
				}
				else if( !mapAddress.get( GeocodeIndexFieldDefineEnum.sgg_syn.name() ).equals( "" ) )
				{
					mapParameter.put( "gis_se", "2" );
					// 시도 단위
				}
				else if( !mapAddress.get( GeocodeIndexFieldDefineEnum.sido_syn.name() ).equals( "" ) )
				{
					mapParameter.put( "gis_se", "1" );
					// 주소가 없을 경우는 디폴트로 0을 설정 이때는 조건을 검색하지 않는다.
				}
				else
				{
					mapParameter.put( "gis_se", "0" );
				}

			}
			System.out.println( "11111111111" );
			/**
			 * 주소 확인을 위함 검색 종료
			 */
//			Map< String, Object > mapTemp = new HashMap();
//			Map< String, Object > mapResult = new HashMap();
//			Map< String, String > mapResultInfo = new HashMap();
			List ltResultTemp = null;

			// KOSIS 통계 조회
//			ltResultTemp = session.selectList( "search.relationkosis", mapParameter );
			ltResultTemp = session.selectList( "search.relationkosisNew", mapParameter );
			System.out.println(ltResultTemp.size());
			/*
			mapResultInfo.put("totalcount", 	(String) session.selectOne("search.relationkosistotal", mapParameter));			
			mapResultInfo.put("pagenum", 		""+ mapParameter.get("pagenum"));
			mapResultInfo.put("returncount", 	""+ltResultTemp.size());
			
			mapTemp.put("resultinfo", 		mapResultInfo);
			mapResult.put("resultdata", 	ltResultTemp);
			*/
			result.put( "totalcount", (String) session.selectOne( "search.relationkosistotalNew", mapParameter ) );
			result.put( "pagenum", "" + mapParameter.get( "pagenum" ) );
			result.put( "returncount", "" + ltResultTemp.size() );
			//result.put("resultinfo", 		mapResultInfo);
			result.put( "resultdata", ltResultTemp );
			//result.add(mapTemp);
			//result.add(mapResult);

			// 검색이력을 저장한다.
			mapParameter.put( "api_id", getApiId() );
			mapParameter.put( "search_data_cnt", ltResultTemp.size() );
			// error 때문에 잠시 주석 처리
			//session.insert( "search.insertsearchword", mapParameter );

			if( ltResultTemp.size() == 0 )
			{
				throw new NoResultException();
			}

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
	public String getApiId()
	{
		return "API_0503";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
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
		String resultcount = "5";
		String pagenum = "0";
		//String strSearchWord = (String) mapParameter.get(MustParam.searchword.name());

		mapParameter.put( MustParam.searchword.name(), URLDecoder.decode( (String) mapParameter.get( MustParam.searchword.name() ), "UTF-8" ) );

		String [] strSearchWord = ( (String) mapParameter.get( MustParam.searchword.name() ) ).split( " " );

		// 2단어 이상 입력시는 첫 단어를 주소로 인식한다.
		if( strSearchWord.length >= 2 )
		{
			mapParameter.put( "addr_syn", strSearchWord[0] );
			mapParameter.put( MustParam.searchword.name(), strSearchWord[1] );
		}
		else
		{
			mapParameter.put( "addr_syn", null );
			mapParameter.put( MustParam.searchword.name(), strSearchWord[0] );
		}

		// KOSIS통계 페이지 여부를 체크한다.
		//if((String) mapParameter.get("kosispagenum") == null){
		if( (String) mapParameter.get( "pagenum" ) == null )
		{
			mapParameter.put( "pagenum", pagenum );
		}
		else if( Integer.parseInt( (String) mapParameter.get( "pagenum" ) ) < 0 )
		{
			throw new ApiException( "페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		if( mapParameter.get( "resultcount" ) == null )
		{
			mapParameter.put( "resultcount", resultcount );
		}
		else if( Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) < 1 || Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) > 50 )
		{
			throw new ApiException( "최대 결과수를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		int intStartNum = ( Integer.parseInt( (String) mapParameter.get( "pagenum" ) ) * Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) ) + 1;

		mapParameter.put( "startnum", "" + intStartNum );
		mapParameter.put( "endnum", (String) mapParameter.get( "resultcount" ) );
	}

	@Override
	protected String getQueryStr()
	{
		return "";
	}

	enum MustParam
	{
		searchword
	}

	enum OptionParam
	{
		pagenum, resultcount, accessToken
	}
}
