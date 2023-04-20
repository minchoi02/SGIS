package kostat.sop.OpenAPI3.api.search;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.lucene.document.Document;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.apache.lucene.search.SortField.Type;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.search.POISearching;
import kostat.sop.OpenAPI3.search.handler.SearchingHandler;
import kostat.sop.OpenAPI3.search.index.POIIndexFieldDefineEnum;
import kostat.sop.OpenAPI3.search.query.POISearchQueryInfo;

public class POI extends AbsAuthAPI< Map >
{
	private static final Log logger = LogFactory.getLog( POI.class );
	/*
		private String resultcount = "5";
		private String pagenum = "0";*/

	private POISearching searcher;
	private SearchingHandler handler;
	
	public POISearching getSearcher()
	{
		return searcher;
	}

	public void setSearcher( POISearching searcher )
	{
		this.searcher = searcher;
	}

	
	public SearchingHandler getHandler()
	{
		return handler;
	}

	public void setHandler( SearchingHandler handler )
	{
		this.handler = handler;
	}

	@Override
	public Map executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{

		//List result = new ArrayList();
		Map result = new HashMap();

//		AbsSearchingInMultipleIndexSearcher searcher = new POISearching();
		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			//strAddress = (String) getParameterMap(req).get("address");
			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			// 파라메터 값이 널인지 체크한다.
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

//			ISearchHandler handler = new SearchingHandler();
			POISearchQueryInfo qInfo = new POISearchQueryInfo( mapParameter );

			// 페이지넘버를 설정한다
			qInfo.setPage( Integer.parseInt( (String) mapParameter.get( "pagenum" ) ) + 1 );
			qInfo.setCount( Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) );

			Sort sort = new Sort();
			sort.setSort( new SortField( POIIndexFieldDefineEnum.nm.name(), Type.STRING_VAL ) );
			qInfo.setSort( sort );

			// 검색관련 인덱스를 설정하고 검색시작
//			searcher.initIndexSearcherMap();

			//List<Map<String, String>> docResult= searcher.search( qInfo, handler );
//			Map< String, Object > searchResult = searcher.search( qInfo, handler );
			Object obj = searcher.search( qInfo, handler );
			Map<String, Object> searchResult = (Map<String, Object>) obj;
			Map< String, String > resultInfo = new HashMap();
			List resultData = new ArrayList();

			// 검색결과 정보를 담는다.
			List< Document > docResult = (List< Document >) searchResult.get( "Document" );

			// 검색이력을 저장한다.
			mapParameter.put( "api_id", getApiId() );
			mapParameter.put( "search_data_cnt", docResult.size() );
			session.insert( "search.insertsearchword", mapParameter );

			if( docResult.size() == 0 )
			{
				throw new NoResultException();
			}
			/*
			resultInfo.put("totalcount", ""+ searchResult.get("TotalCount"));			
			resultInfo.put("pagenum", ""+ mapParameter.get("pagenum"));
			resultInfo.put("returncount", ""+ docResult.size());
			//result.add(resultInfo);
			result.put("resultinfo", resultInfo);
			*/
			result.put( "totalcount", "" + searchResult.get( "TotalCount" ) );
			result.put( "pagenum", "" + mapParameter.get( "pagenum" ) );
			result.put( "returncount", "" + docResult.size() );

			// 취득한 도큐먼트대로 결과값을 생성한다.
			for( int ix = 0; ix < docResult.size(); ix++ )
			{
				//for(int ix = 0; ix < 2; ix++){
				Map< String, String > mapResult = new LinkedHashMap< String, String >();
				Map< String, String > mapCoor = new HashMap();

				mapResult.put( "nm", docResult.get( ix ).get( POIIndexFieldDefineEnum.nm.name() ) );
				//mapResult.put("syn", 				docResult.get(ix).get(POIIndexFieldDefineEnum.syn.name()));
				mapResult.put( "theme_cd", docResult.get( ix ).get( POIIndexFieldDefineEnum.theme_cd.name() ) );
				mapResult.put( "theme_nm", docResult.get( ix ).get( POIIndexFieldDefineEnum.theme_nm.name() ) );
				mapResult.put( "category", docResult.get( ix ).get( POIIndexFieldDefineEnum.category.name() ) );
				mapResult.put( "category_nm", docResult.get( ix ).get( POIIndexFieldDefineEnum.category_nm.name() ) );
				mapResult.put( "data_type", docResult.get( ix ).get( POIIndexFieldDefineEnum.data_type.name() ) );
				mapResult.put( "adm_cd", docResult.get( ix ).get( POIIndexFieldDefineEnum.adm_cd.name() ) );
				mapResult.put( "adm_addr", docResult.get( ix ).get( POIIndexFieldDefineEnum.naddr.name() ) );
				mapResult.put( "road_cd", docResult.get( ix ).get( POIIndexFieldDefineEnum.road_cd.name() ) );
				//				mapResult.put("adm_addr", 			docResult.get(ix).get(POIIndexFieldDefineEnum.adm_addr.name()));
				mapResult.put( "base_year", docResult.get( ix ).get( POIIndexFieldDefineEnum.base_year.name() ) );
				mapResult.put( "ed_no", docResult.get( ix ).get( POIIndexFieldDefineEnum.ed_no.name() ) );
				mapResult.put( "corp_no", docResult.get( ix ).get( POIIndexFieldDefineEnum.corp_no.name() ) );
				mapResult.put( "sufid", docResult.get( ix ).get( POIIndexFieldDefineEnum.sufid.name() ) );
				mapResult.put( "route_cd", docResult.get( ix ).get( POIIndexFieldDefineEnum.route_cd.name() ) );
				mapResult.put( "route_nm", docResult.get( ix ).get( POIIndexFieldDefineEnum.route_nm.name() ) );
				mapResult.put( "x", docResult.get( ix ).get( POIIndexFieldDefineEnum.x.name() ) );
				mapResult.put( "y", docResult.get( ix ).get( POIIndexFieldDefineEnum.y.name() ) );

				resultData.add( mapResult );
			}

			result.put( "resultdata", resultData );

		}
		catch( ApiException e )
		{
			logger.error( e );
			throw e;
		}
		catch( IllegalArgumentException e )
		{
			logger.error( e );
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		finally
		{
//			searcher.closeIndexReaderAll();
		}

		return result;
	}

	@Override
	public String getApiId()
	{
		return "API_0504";
		//return "12345566";
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
	protected String getQueryStr()
	{
		return "addr.geocode";
	}

	enum MustParam
	{
		searchword
	}

	enum OptionParam
	{
		adm_cd, road_cd, resultcount, pagenum, accessToken, theme_cd
		//min,
		//max
	}

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{

		String resultcount = "5";
		String pagenum = "0";

		//  
		if( mapParameter.get( "searchword" ) == null )
		{
			throw new ApiException( "검색어를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		if( mapParameter.containsKey( "theme_cd" ) == false )
		{
			mapParameter.put( "theme_cd", "" );
		}

		String [] strSearchWord = URLDecoder.decode( (String) mapParameter.get( "searchword" ), "UTF-8" ).split( " " );
		mapParameter.put( POIIndexFieldDefineEnum.syn.name(), URLDecoder.decode( (String) mapParameter.get( "searchword" ), "UTF-8" ) );

		// 2단어 이상 입력시는 첫 단어를 주소로 인식한다.
		if( strSearchWord.length >= 2 )
		{
			mapParameter.put( POIIndexFieldDefineEnum.addr_syn.name(), strSearchWord[0] );
			mapParameter.put( POIIndexFieldDefineEnum.syn.name(), strSearchWord[1] );
			mapParameter.put( "searchword", strSearchWord[1] );
		}
		else
		{
			mapParameter.put( POIIndexFieldDefineEnum.addr_syn.name(), null );
			mapParameter.put( POIIndexFieldDefineEnum.syn.name(), strSearchWord[0] );
		}

		mapParameter.put( "searchword", URLDecoder.decode( (String) mapParameter.get( "searchword" ), "UTF-8" ) );

		if( mapParameter.get( POIIndexFieldDefineEnum.adm_cd.name() ) == null )
		{
			mapParameter.put( POIIndexFieldDefineEnum.adm_cd.name(), "" );
		}
		else
		{
			mapParameter.put( POIIndexFieldDefineEnum.adm_cd.name(), mapParameter.get( POIIndexFieldDefineEnum.adm_cd.name() ) );
		}

		if( mapParameter.get( POIIndexFieldDefineEnum.road_cd.name() ) == null )
		{
			mapParameter.put( POIIndexFieldDefineEnum.road_cd.name(), "" );
		}
		else
		{
			mapParameter.put( POIIndexFieldDefineEnum.road_cd.name(), mapParameter.get( POIIndexFieldDefineEnum.road_cd.name() ) );
		}

		// 페이지 번호 입력
		/*
		if(mapParameter.get("pagenum") == null){
			mapParameter.put("pagenum", pagenum);
		}else if(Integer.parseInt((String) mapParameter.get("pagenum")) < 0){
			throw new ApiException("페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		 */

		if( (String) mapParameter.get( "pagenum" ) == null )
		{
			mapParameter.put( "pagenum", pagenum );
		}
		else if( Integer.parseInt( (String) mapParameter.get( "pagenum" ) ) < 0 )
		{
			throw new ApiException( "페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		mapParameter.put( "pagenum", mapParameter.get( "pagenum" ) == null ? pagenum : URLDecoder.decode( (String) mapParameter.get( "pagenum" ), "UTF-8" ) );

		// 최소 1에서 50까지 설정 가능 Default는 5
		if( mapParameter.get( "resultcount" ) == null )
		{
			mapParameter.put( "resultcount", resultcount );
		}
		else if( Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) < 1 || Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) > 50 )
		{
			throw new ApiException( "최대 결과수를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		mapParameter.put( "resultcount", URLDecoder.decode( (String) mapParameter.get( "resultcount" ), "UTF-8" ) );
	}

}
