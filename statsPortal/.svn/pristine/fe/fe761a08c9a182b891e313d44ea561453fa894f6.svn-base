package kostat.sop.ServiceAPI.api.bizStats;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.bizStats.dto.CorpdistsummaryMap;
import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class Corpdistsummary extends AbsQuery< List > {

	private static final Log logger = LogFactory.getLog( Corpdistsummary.class );

	@Resource( name = "themeCdCommon" )
	private ThemeCdCommon themeCdCommon;
	
	@Override
	public String getApiId()
	{
		return "API_0607";
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

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] , Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			result = new ArrayList< >();

			List adm_cd_list = (List) mapParameter.get( "adm_cd_list" );

			for( int i = 0; i < adm_cd_list.size(); i++ )
			{
				mapParameter.put( "adm", adm_cd_list.get( i ) );
				CorpdistsummaryMap resultList = (CorpdistsummaryMap) session.selectOne( getQueryStr(), mapParameter );
				result.add( resultList );
			}
			
			//result.add("b_theme",themeCdCommon.bigThemeCdList());
			

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
		String adm_cd = (String) mapParameter.get( MustParam.adm_cd.name() );
		String corp_cd = (String) mapParameter.get( OptionParam.corp_cd.name() );
		
		
		if(corp_cd != null){
			if(!(corp_cd.equals("10") || corp_cd.equals("20") || corp_cd.equals("40") || corp_cd.equals("50"))){
				throw new ApiException( "생활업종 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}
		}
		
		mapParameter.put( "year", Properties.getDefult_bnd_year() );
		if( adm_cd.length() == 5 )
		{
			String sido_cd = null;
			String sgg_cd = null;
			sido_cd = adm_cd.substring( 0, 2 );
			sgg_cd = adm_cd.substring( 2, 5 );

			List adm_cd_list = new ArrayList< String >();
			adm_cd_list.add( adm_cd );
			adm_cd_list.add( sido_cd );

			mapParameter.put( "adm_cd_list", adm_cd_list );

		}
		else if( adm_cd.length() == 7 )
		{
			String sido_cd = null;
			String sgg_cd = null;
			String emdong_cd = null;
			sido_cd = adm_cd.substring( 0, 2 );
			sgg_cd = adm_cd.substring( 2, 5 );
			emdong_cd = adm_cd.substring( 5, 7 );

			List adm_cd_list = new ArrayList< String >();
			adm_cd_list.add( adm_cd );
			adm_cd_list.add( sido_cd + sgg_cd );
			adm_cd_list.add( sido_cd );

			mapParameter.put( "adm_cd_list", adm_cd_list );

		}
		else
		{
			throw new ApiException( "동코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
		}

	}

	@Override
	protected String getQueryStr()
	{
		return "startupbiz2020.corpdistsummary";
	}

	enum MustParam
	{
		adm_cd
	}

	enum OptionParam
	{
		accessToken,
		corp_cd
	}

}
