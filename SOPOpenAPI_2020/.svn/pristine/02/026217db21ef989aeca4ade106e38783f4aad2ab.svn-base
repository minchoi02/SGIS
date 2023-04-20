package kostat.sop.OpenAPI3.api.search;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.lucene.document.Document;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.lucene.searcher.AbsSearchingInMultipleIndexSearcher;
import com.neighborsystem.lucene.searcher.ISearchHandler;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.search.GeocodeSearching;
import kostat.sop.OpenAPI3.search.address.AddressDivision;
import kostat.sop.OpenAPI3.search.handler.SearchingHandler;
import kostat.sop.OpenAPI3.search.index.GeocodeIndexFieldDefineEnum;
import kostat.sop.OpenAPI3.search.query.GeocodeQueryInfo;

public class RelSearch extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( RelSearch.class );
	
	private GeocodeSearching searcher;
	private SearchingHandler handler;
	//private int searchkind = 0;
	
	public GeocodeSearching getSearcher()
	{
		return searcher;
	}

	public void setSearcher( GeocodeSearching searcher )
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
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String arg2 ) throws AbsException
	{
		httpSession = req.getSession();

		int intTotalResultCount = 0;
		List< Object > result = new ArrayList();

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );
			optimizeParameterMap( mapParameter );

			//Map<String, Object> mapTemp = new HashMap();

			/*
			if(searchkind == 0){
				mapTemp.put("searchword", session.selectList("search.relsearchword", mapParameter));
				mapTemp.put("searchsop", session.selectList("search.relationsop", mapParameter));
				mapTemp.put("searchkosis", session.selectList("search.relationkosis", mapParameter));
			}
			*/
			/*
			//int intTotalCount = ;			
			Map<String, String> resultInfo = new HashMap(); 
			
			resultInfo.put("totalcount", ""+ session.selectList(search, mapParameter));			
			resultInfo.put("pagenum", ""+ mapParameter.get("pagenum"));
			resultInfo.put("returncount", ""+ docResult.size());
			result.add(resultInfo);
			*/

			/**
			 * 주소 확인을 위함 검색 시작
			 */
			String [] strSearchTemp = ( (String) mapParameter.get( MustParam.searchword.name() ) ).split( " " );

			logger.debug( "SearchKind =[" + mapParameter.get( OptionParam.searchkind.name() ) + "]" );
			//if(searchkind == 0 || searchkind == 1){
			if( (int) mapParameter.get( OptionParam.searchkind.name() ) == 0 || (int) mapParameter.get( OptionParam.searchkind.name() ) == 1 )
			{

				String strRelSearchWord = (String) session.selectOne( "search.relsearchword", mapParameter );

				if( strRelSearchWord != null && !strRelSearchWord.equals( "" ) )
				{
					String [] strTemp = strRelSearchWord.split( "\\|" );

					List< Map > lsTemp = new ArrayList();
					for( int ix = 0; ix < strTemp.length; ix++ )
					{
						Map< String, String > mapSearchWord = new HashMap();
						mapSearchWord.put( "search_word", strTemp[ix] );
						lsTemp.add( mapSearchWord );
					}
					Map< String, Object > mapWordTemp = new HashMap();
					mapWordTemp.put( "searchword", lsTemp );
					result.add( mapWordTemp );
				}
				//mapTemp.put("searchword", session.selectList("search.relsearchword", mapParameter));				

				//if(mapTemp.get("searchword")
				//setSelectMap(session, mapParameter, result, "searchword", "search.relsearchword" );
				if( result.size() > 0 )
					intTotalResultCount++;
			}
			//if(searchkind == 0 || searchkind == 2){
			if( (int) mapParameter.get( OptionParam.searchkind.name() ) == 0 || (int) mapParameter.get( OptionParam.searchkind.name() ) == 2 )
			{

				//mapTemp.put("searchsop", session.selectList("search.relationsop", mapParameter)); 

				//setSelectMap(session, mapParameter, result, "searchsop", "search.relationsop");//, "search.relationsoptotal");

				// 검색어만 검색키워드에 담는다.
				if( strSearchTemp.length > 1 )
				{
					mapParameter.put( MustParam.searchword.name(), strSearchTemp[1] );
				}

				Map< String, Object > mapTemp = new HashMap();
				Map< String, Object > mapResult = new HashMap();
				Map< String, Object > mapReulstInfo = new HashMap();

				List lsTT = setSelectMap( session, mapParameter, "search.relationsop" );
				mapReulstInfo.put( "totalcount", (String) session.selectOne( "search.relationsoptotal", mapParameter ) );
				mapReulstInfo.put( "pagenum", (String) mapParameter.get( "soppagenum" ) == null ? 0 : mapParameter.get( "soppagenum" ) );
				mapReulstInfo.put( "resultcount", lsTT.size() );

				mapTemp.put( "searchsopinfo", mapReulstInfo );
				mapResult.put( "searchsop", lsTT );
				result.add( mapTemp );
				result.add( mapResult );

				if( lsTT.size() > 0 )
					intTotalResultCount++;
			}

			//if(searchkind == 0 || searchkind == 3){
			if( (int) mapParameter.get( OptionParam.searchkind.name() ) == 0 || (int) mapParameter.get( OptionParam.searchkind.name() ) == 3 )
			{

				// 두 단어로 들어올 경우 주소가 존재하는 걸로 간주한다.
				if( strSearchTemp.length > 1 )
				{ //mapParameter.get("addr") != null){

					// 검색어만 검색키워드에 담는다.
					mapParameter.put( MustParam.searchword.name(), strSearchTemp[1] );

					// 주소분석 배열 0은 주소 배열 1은 검색어
					AddressDivision ad = new AddressDivision( strSearchTemp[0] );
					Map mapAddress = ad.getResult();

//					AbsSearchingInMultipleIndexSearcher searcher = new GeocodeSearching();
//					ISearchHandler handler = new SearchingHandler();
					GeocodeQueryInfo qInfo = new GeocodeQueryInfo( mapAddress );
					qInfo.setPage( 0 );
					qInfo.setCount( 1 );

//					searcher.closeIndexReaderAll();
					// 검색관련 인덱스를 설정하고 검색시작
//					searcher.initIndexSearcherMap();
					Object obj = searcher.search( qInfo, handler );
					Map< String, Object > searchResult = (Map<String, Object>) obj;
					Document docResult = new Document();

					if( (int) searchResult.get( "TotalCount" ) == 0 )
					{
						mapParameter.put( "gis_se", "0" );
					}
					else
					{
						//						System.out.println(searchResult.size());
						docResult = (Document) searchResult.get( "Document" );
						// 동단위 검색
						if( !docResult.get( GeocodeIndexFieldDefineEnum.emdong_syn.name() ).equals( "" ) )
						{
							mapParameter.put( "gis_se", "3" );
							// 시군구 단위
						}
						else if( !docResult.get( GeocodeIndexFieldDefineEnum.sgg_syn.name() ).equals( "" ) )
						{
							mapParameter.put( "gis_se", "2" );
							// 시도 단위
						}
						else if( !docResult.get( GeocodeIndexFieldDefineEnum.sido_syn.name() ).equals( "" ) )
						{
							mapParameter.put( "gis_se", "1" );
							// 주소가 없을 경우는 디폴트로 0을 설정 이때는 조건을 검색하지 않는다.
						}
						else
						{
							mapParameter.put( "gis_se", "0" );
						}
					}
				}
				//test
				//mapParameter.put("gis_se", "1");

				/**
				 * 주소 확인을 위함 검색 종료
				 */

				Map< String, Object > mapTemp = new HashMap();
				Map< String, Object > mapResult = new HashMap();
				Map< String, Object > mapReulstInfo = new HashMap();

				List lsTT = setSelectMap( session, mapParameter, "search.relationkosis" );
				mapReulstInfo.put( "totalcount", (String) session.selectOne( "search.relationkosistotal", mapParameter ) );
				mapReulstInfo.put( "pagenum", (String) mapParameter.get( "kosispagenum" ) == null ? 0 : mapParameter.get( "kosispagenum" ) );
				mapReulstInfo.put( "resultcount", lsTT.size() );

				mapTemp.put( "searchkosisinfo", mapReulstInfo );
				//mapResult.put("searchkosisinfo", 		mapReulstInfo);
				mapResult.put( "searchkosis", lsTT );

				result.add( mapTemp );
				result.add( mapResult );

				if( lsTT.size() > 0 )
					intTotalResultCount++;
			}

			session.insert( "search.insertsearchword", mapParameter );

			//result.add(mapTemp);

			if( intTotalResultCount == 0 )
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
	/*
	public static getGisSe(){
		
	}*/

	/*
		private void setResultInfo(SqlSession session, Map mapParameter, List result, String strSearchKind, String strQueryName ){
	
			// total카운트를 구한다 
			Map<String, Object> mapReulstInfo = new HashMap();
			
			mapReulstInfo.put("total", (String) session.selectOne(strTotalQueryName, mapParameter));
			mapReulstInfo.put("pagenum", (String) session.selectOne(strTotalQueryName, mapParameter));
			mapReulstInfo.put("resultcount", (String) session.selectOne(strTotalQueryName, mapParameter));
			
			Map<String, Object> mapTemp = new HashMap();
			
			mapTemp.put(strSearchKind, mapReulstInfo);
			
			if(((List)mapTemp.get(strSearchKind)).size() > 0)
				result.add(mapTemp);	
		}
		
		private void setSelectMap(SqlSession session, Map mapParameter, List result, String strSearchKind, String strQueryName , String strTotalQueryName){
	
			Map<String, Object> mapTemp = new HashMap();
			Map<String, Object> mapReulstInfo = new HashMap();
			
			mapTemp.put(strSearchKind, session.selectList(strQueryName, mapParameter));
			
			mapReulstInfo.put("total", (String) session.selectOne(strTotalQueryName, mapParameter));
			mapReulstInfo.put("pagenum", (String) session.selectOne(strTotalQueryName, mapParameter));
			mapReulstInfo.put("resultcount", mapTemp.get(strSearchKind));
			
			result.add(mapReulstInfo);
			if(((List)mapTemp.get(strSearchKind)).size() > 0)
				result.add(mapTemp);	
		}
	
	*/

	private List setSelectMap( SqlSession session, Map mapParameter, String strQueryName )
	{

		Map< String, Object > mapTemp = new HashMap();
		//mapTemp.put(strSearchKind, session.selectList(strQueryName, mapParameter));
		return session.selectList( strQueryName, mapParameter );
		/*
		if(((List)mapTemp.get(strSearchKind)).size() > 0)
			result.add(mapTemp);
		return mapTemp.size() > 0? mapTemp: null;
		*/
	}

	@Override
	public String getApiId()
	{
		return "API_0501";
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

		String strSearchWord = (String) mapParameter.get( MustParam.searchword.name() );

		String resultcount = "5";
		String pagenum = "0";

		mapParameter.put( MustParam.searchword.name(), URLDecoder.decode( (String) mapParameter.get( MustParam.searchword.name() ), "UTF-8" ) );

		//searchkind = mapParameter.get(OptionParam.searchkind.name()) == null?0:Integer.parseInt((String) mapParameter.get(OptionParam.searchkind.name()));
		int searchkind = mapParameter.get( OptionParam.searchkind.name() ) == null ? 0 : Integer.parseInt( (String) mapParameter.get( OptionParam.searchkind.name() ) );

		if( searchkind < 0 || searchkind > 3 )
		{
			throw new ApiException( "요청정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
		}

		mapParameter.put( OptionParam.searchkind.name(), searchkind );
		/*
		// SOP통계 페이지 여부를 체크한다.
		if((String) mapParameter.get("soppagenum") == null){
			mapParameter.put("soppagenum", "0");
			mapParameter.put("soppagenum", pagenum);
		}else if(Integer.parseInt((String) mapParameter.get("pagenum")) < 0){
			throw new ApiException("페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		mapParameter.put("soppagenum", mapParameter.get("soppagenum") == null?pagenum:URLDecoder.decode( (String) mapParameter.get("soppagenum"), "UTF-8"));
		
		
		// 최소 1에서 50까지 설정 가능 Default는 5
		if(mapParameter.get("sopresultcount") == null){
			mapParameter.put("sopresultcount", resultcount);
		}else if(Integer.parseInt((String) mapParameter.get("sopresultcount")) < 1 || 
				Integer.parseInt((String) mapParameter.get("sopresultcount")) > 50 ){
			throw new ApiException("페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		mapParameter.put("sopresultcount", URLDecoder.decode( (String) mapParameter.get("sopresultcount"), "UTF-8"));
		*/

		// SOP통계 페이지 여부를 체크한다.
		//if((String) mapParameter.get("kosispagenum") == null){
		if( (String) mapParameter.get( "soppagenum" ) != null )
		{

			// 페이지 데이터가 존재할 경우.
			if( Integer.parseInt( (String) mapParameter.get( "soppagenum" ) ) < 0 )
			{
				throw new ApiException( "페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}

			// 최소 1에서 50까지 설정 가능 Default는 5
			if( mapParameter.get( "sopresultcount" ) == null )
			{
				mapParameter.put( "sopresultcount", resultcount );
			}
			else if( Integer.parseInt( (String) mapParameter.get( "sopresultcount" ) ) < 1 || Integer.parseInt( (String) mapParameter.get( "sopresultcount" ) ) > 50 )
			{
				throw new ApiException( "최대 결과수를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}

			int intStartNum = ( Integer.parseInt( (String) mapParameter.get( "soppagenum" ) ) * Integer.parseInt( (String) mapParameter.get( "sopresultcount" ) ) ) + 1;
			//int intEndNum = (Integer.parseInt((String)mapParameter.get("kosispagenum"))+1 ) * Integer.parseInt((String)mapParameter.get("kosisresultcount"));
			mapParameter.put( "sopstartnum", "" + intStartNum );
			mapParameter.put( "sopendnum", (String) mapParameter.get( "sopresultcount" ) );
		}

		// KOSIS통계 페이지 여부를 체크한다.
		//if((String) mapParameter.get("kosispagenum") == null){
		if( (String) mapParameter.get( "kosispagenum" ) != null )
		{

			// 페이지 데이터가 존재할 경우.
			if( Integer.parseInt( (String) mapParameter.get( "kosispagenum" ) ) < 0 )
			{
				throw new ApiException( "페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}

			// 최소 1에서 50까지 설정 가능 Default는 5
			if( mapParameter.get( "kosisresultcount" ) == null )
			{
				mapParameter.put( "kosisresultcount", resultcount );
			}
			else if( Integer.parseInt( (String) mapParameter.get( "kosisresultcount" ) ) < 1 || Integer.parseInt( (String) mapParameter.get( "kosisresultcount" ) ) > 50 )
			{
				throw new ApiException( "최대 결과수를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}

			int intStartNum = ( Integer.parseInt( (String) mapParameter.get( "kosispagenum" ) ) * Integer.parseInt( (String) mapParameter.get( "kosisresultcount" ) ) ) + 1;
			//int intEndNum = (Integer.parseInt((String)mapParameter.get("kosispagenum"))+1 ) * Integer.parseInt((String)mapParameter.get("kosisresultcount"));
			mapParameter.put( "kosisstartnum", "" + intStartNum );
			mapParameter.put( "kosisendnum", (String) mapParameter.get( "kosisresultcount" ) );
		}

		//mapParameter.put("soppagenum", mapParameter.get("soppagenum") == null?pagenum:URLDecoder.decode( (String) mapParameter.get("soppagenum"), "UTF-8"));

	}

	@Override
	protected String getQueryStr()
	{
		return "search.relationkosis";
	}

	enum MustParam
	{
		searchword
	}

	enum OptionParam
	{
		searchkind,
		soppagenum,
		sopresultcount,
		kosispagenum,
		kosisresultcount,
		accessToken
	}
}
