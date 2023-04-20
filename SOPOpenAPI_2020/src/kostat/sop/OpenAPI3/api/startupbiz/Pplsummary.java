package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.ArrayList;
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
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

public class Pplsummary extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Pplsummary.class );

	@Override
	public String getApiId()
	{
		return "API_0602";
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
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			result = session.selectList( getQueryStr(), mapParameter );

			/*
			result= new ArrayList<>();
			
			HashMap ppl = new HashMap<>();
			ppl.put("exp", "좋다");
			ppl.put("teenage_less_than_per", 20);
			ppl.put("teenage_per", 30);
			ppl.put("twenty_per", 20);
			ppl.put("thirty_per", 40);
			ppl.put("forty_per", 20);
			ppl.put("fifty_per", 40);
			ppl.put("sixty_per", 20);
			ppl.put("seventy_more_than_per", 10);
			ppl.put("adm_cd", "1104052");
			ppl.put("adm_name", "왕십리2동");
			result.add(ppl);
			
			HashMap ppl1 = new HashMap<>();
			ppl1.put("exp", "나쁘다");
			ppl1.put("teenage_less_than_per", 40);
			ppl1.put("teenage_per", 10);
			ppl1.put("twenty_per", 20);
			ppl1.put("thirty_per", 30);
			ppl1.put("forty_per", 40);
			ppl1.put("fifty_per", 50);
			ppl1.put("sixty_per", 20);
			ppl1.put("seventy_more_than_per", 10);
			ppl1.put("adm_cd", "11040");
			ppl1.put("adm_name", "성동구");
			result.add(ppl1);
			
			
			HashMap ppl2 = new HashMap<>();
			ppl2.put("exp", "그냥그렇다");
			ppl2.put("teenage_less_than_per", 45);
			ppl2.put("teenage_per", 75);
			ppl2.put("twenty_per", 24);
			ppl2.put("thirty_per", 45);
			ppl2.put("forty_per", 24);
			ppl2.put("fifty_per", 37);
			ppl2.put("sixty_per", 58);
			ppl2.put("seventy_more_than_per", 12);
			ppl2.put("adm_cd", "11");
			ppl2.put("adm_name", "서울특별시");
			result.add(ppl2);
			*/
			//					resultmap.put("pplsum",result);

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
//			e.printStackTrace();
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
		String adm_cd = (String) mapParameter.get( MustParam.adm_cd.name() );
		//		String adm_cd = "1104052";
		/*
		if(adm_cd.length()!=7){
			throw new ApiException("동코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM);
		}else{
			String sido_cd=null;
			String sgg_cd=null;
			String emdong_cd=null;
			sido_cd=adm_cd.substring(0, 2);
			sgg_cd=adm_cd.substring(2, 5);
			emdong_cd=adm_cd.substring(5, 7);
			mapParameter.put("sido_cd", sido_cd);
			mapParameter.put("sgg_cd", sgg_cd);
			mapParameter.put("emdong_cd", emdong_cd);
		}
		*/
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
			//			mapParameter.put("sido_cd", sido_cd);
			//			mapParameter.put("sgg_cd", sgg_cd);
			//			mapParameter.put("emdong_cd", emdong_cd);

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
		return "startupbiz.pplsummary";
	}

	enum MustParam
	{
		adm_cd
	}

	enum OptionParam
	{
		accessToken
	}
}
