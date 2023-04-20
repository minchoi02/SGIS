package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.ArrayList;
import java.util.HashMap;
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

public class Regiontotal extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Regiontotal.class );

	@Override
	public String getApiId()
	{
		return "API_0610";
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
		HashMap resultmap = new HashMap< >();
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

			//					result= new ArrayList<>();
			//					HashMap ppl = new HashMap<>();
			//					ppl.put("apart_per", (int)(Math.random()*100)+1);
			//					ppl.put("lease_family_per", (int)(Math.random()*100)+1);
			//					ppl.put("monrent_family_per", (int)(Math.random()*100)+1);
			//					ppl.put("sixty_five_more_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl.put("twenty_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl.put("resid_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl.put("job_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl.put("one_person_family_per", (int)(Math.random()*100)+1);
			//					ppl.put("adm_cd", "1101054");
			//					ppl.put("adm_name", "삼청동");
			//					result.add(ppl);
			//					
			//					HashMap ppl1 = new HashMap<>();
			//					ppl1.put("apart_per", (int)(Math.random()*100)+1);
			//					ppl1.put("lease_family_per", (int)(Math.random()*100)+1);
			//					ppl1.put("monrent_family_per", (int)(Math.random()*100)+1);
			//					ppl1.put("sixty_five_more_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl1.put("twenty_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl1.put("resid_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl1.put("job_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl1.put("one_person_family_per", (int)(Math.random()*100)+1);
			//					ppl1.put("adm_cd", "11010");
			//					ppl1.put("adm_name", "종로구");
			//					result.add(ppl1);
			//					
			//					
			//					HashMap ppl2 = new HashMap<>();
			//					ppl2.put("apart_per", (int)(Math.random()*100)+1);
			//					ppl2.put("lease_family_per", (int)(Math.random()*100)+1);
			//					ppl2.put("monrent_family_per", (int)(Math.random()*100)+1);
			//					ppl2.put("sixty_five_more_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl2.put("twenty_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl2.put("resid_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl2.put("job_ppltn_per", (int)(Math.random()*100)+1);
			//					ppl2.put("one_person_family_per", (int)(Math.random()*100)+1);
			//					ppl2.put("adm_cd", "11");
			//					ppl2.put("adm_name", "서울특별시");
			//					result.add(ppl2);

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

		mapParameter.put( "year", Properties.getDefult_bnd_year() );
		if( adm_cd.length() == 5 )
		{
			String sido_cd = null;
			sido_cd = adm_cd.substring( 0, 2 );

			List adm_cd_list = new ArrayList< String >();
			adm_cd_list.add( sido_cd );
			adm_cd_list.add( adm_cd );
			mapParameter.put( "adm_cd_list", adm_cd_list );

		}
		else if( adm_cd.length() == 7 )
		{
			String sido_cd = null;
			sido_cd = adm_cd.substring( 0, 2 );

			List adm_cd_list = new ArrayList< String >();
			adm_cd_list.add( sido_cd );
			adm_cd_list.add( adm_cd );
			//			adm_cd_list.add(sido_cd+sgg_cd);
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
		return "startupbiz.regiontotal";
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
