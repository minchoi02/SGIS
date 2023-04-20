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

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.NoResultException;

public class RelWord extends AbsAuthAPI< List >
{

	private static final Log logger = LogFactory.getLog( RelWord.class );

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String arg2 ) throws AbsException
	{
		httpSession = req.getSession();

		List result = new ArrayList();

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

			String strRelSearchWord = (String) session.selectOne( "search.relsearchword", mapParameter );

			if( strRelSearchWord != null && !strRelSearchWord.equals( "" ) )
			{
				String [] strTemp = strRelSearchWord.split( "\\|" );

				List< Map > lsTemp = new ArrayList();
				for( int ix = 0; ix < strTemp.length; ix++ )
				{
					Map< String, String > mapSearchWord = new HashMap();
					mapSearchWord.put( "rel_search_word", strTemp[ix] );
					result.add( mapSearchWord );
				}
				/*
				Map<String, Object> mapWordTemp = new HashMap();
				mapWordTemp.put("searchword", lsTemp);
				result.add(mapWordTemp);
				*/
			}

			// 검색이력을 저장한다.
			mapParameter.put( "api_id", getApiId() );
			mapParameter.put( MustParam.searchword.name(), mapParameter.get( "tmp" + MustParam.searchword.name() ) );
			mapParameter.put( "search_data_cnt", result.size() );
			mapParameter.put( "addr_syn", mapParameter.get( "addr_syn" ) );
			session.insert( "search.insertsearchword", mapParameter );

			if( result.size() == 0 )
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
			e.printStackTrace();
			//			logger.error(e);
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );

		}
		return result;
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
		mapParameter.put( MustParam.searchword.name(), URLDecoder.decode( (String) mapParameter.get( MustParam.searchword.name() ), "UTF-8" ) );

		String [] strSearchWord = ( (String) mapParameter.get( MustParam.searchword.name() ) ).split( " " );

		// 2단어 이상 입력시는 첫 단어를 주소로 인식한다.
		// tmpsearchword는 검색이력의 검색어 입력을 위해 분리 저장
		if( strSearchWord.length >= 2 )
		{
			mapParameter.put( "addr_syn", strSearchWord[0] );
			mapParameter.put( "tmp" + MustParam.searchword.name(), strSearchWord[1] );
		}
		else
		{
			mapParameter.put( "addr_syn", null );
			mapParameter.put( "tmp" + MustParam.searchword.name(), strSearchWord[0] );
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "search.relsearchword";
	}

	enum MustParam
	{
		searchword
	}

	enum OptionParam
	{
		accessToken
	}

}
