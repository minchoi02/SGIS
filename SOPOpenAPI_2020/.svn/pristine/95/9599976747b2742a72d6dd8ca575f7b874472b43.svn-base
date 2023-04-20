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

public class SOP extends AbsAuthAPI< Map >
{

	private static final Log logger = LogFactory.getLog( SOP.class );

	@Override
	public Map executeAPI( HttpServletRequest req, HttpServletResponse res, String arg2 ) throws AbsException
	{
		httpSession = req.getSession();

		//List result = new ArrayList();
		Map result = new HashMap();

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );
			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}
			//result = session.selectList(getQueryStr(), mapParameter);

			Map< String, Object > mapTemp = new HashMap();
			Map< String, Object > mapResult = new HashMap();
			Map< String, Object > mapResultInfo = new HashMap();
			List ltResultTemp = null;

			ltResultTemp = session.selectList( "search.relationsop", mapParameter );
			//List lsTT = setSelectMap(session, mapParameter, "search.relationsop");
			/*
			mapResultInfo.put("totalcount", 			(String) session.selectOne("search.relationsoptotal", mapParameter));
			mapResultInfo.put("pagenum", 		(String) mapParameter.get("soppagenum") == null? 0: mapParameter.get("soppagenum"));
			mapResultInfo.put("resultcount", 	ltResultTemp.size());
			
			mapTemp.put("resultinfo", 	mapResultInfo);
			mapResult.put("resultdata", ltResultTemp);
			
			result.add(mapTemp);
			result.add(mapResult);
			*/
			result.put( "totalcount", (String) session.selectOne( "search.relationsoptotal", mapParameter ) );
			result.put( "pagenum", (String) mapParameter.get( "soppagenum" ) == null ? 0 : mapParameter.get( "soppagenum" ) );
			result.put( "resultcount", ltResultTemp.size() );

			//result.put("resultinfo", 	mapResultInfo);
			result.put( "resultdata", ltResultTemp );

			mapParameter.put( "api_id", getApiId() );
			mapParameter.put( "search_data_cnt", ltResultTemp.size() );
			mapParameter.put( "addr_syn", null );
			session.insert( "search.insertsearchword", mapParameter );

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
		return "API_0502";
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

		mapParameter.put( MustParam.searchword.name(), URLDecoder.decode( (String) mapParameter.get( MustParam.searchword.name() ), "UTF-8" ) );
		String strSearchWord = (String) mapParameter.get( MustParam.searchword.name() );

		// SOP통계 페이지 여부를 체크한다.
		if( (String) mapParameter.get( "pagenum" ) == null )
		{
			mapParameter.put( "pagenum", pagenum );
		}
		else if( Integer.parseInt( (String) mapParameter.get( "pagenum" ) ) < 0 )
		{
			throw new ApiException( "페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		// 최소 1에서 50까지 설정 가능 Default는 5
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
		return "search.relationsop";
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
