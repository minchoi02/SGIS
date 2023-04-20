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

import kostat.sop.OpenAPI3.api.startupbiz.dto.CorpdistsummaryMap;
import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

public class Corpdistsummary extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Corpdistsummary.class );

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
		//				HashMap resultmap = new HashMap<>();
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

			result = new ArrayList< >();

			List adm_cd_list = (List) mapParameter.get( "adm_cd_list" );

			for( int i = 0; i < adm_cd_list.size(); i++ )
			{
				//						for(int i=0 ; i<1 ; i++){
				mapParameter.put( "adm", adm_cd_list.get( i ) );
				CorpdistsummaryMap resultList = (CorpdistsummaryMap) session.selectOne( getQueryStr(), mapParameter );
				result.add( resultList );
				//						result=resultList;
			}

			//					result= new ArrayList<>();
			//					
			//					String[] theme_cd_array = {
			//							"1001"
			//							,"2004"
			//							,"2006"
			//							,"1002"
			//							,"1003"
			//							,"1004"
			//							,"1005"
			//							,"1006"
			//							,"4002"
			//							,"5001"
			//							,"5002"
			//							,"5003"
			//							,"5005"
			//							,"5011"
			//							,"5006"
			//							,"5007"
			//							,"5008"
			//							,"5004"
			//							,"5009"
			//							,"5010"
			//							,"1013"
			//							,"1007"
			//							,"1008"
			//							,"1009"
			//					};
			//					String[] theme_nm_array = {
			//							"인테리어"
			//							,"식료품점"
			//							,"의류"
			//							,"철물점"
			//							,"서점"
			//							,"문구점"
			//							,"화장품/방향제"
			//							,"꽂집"
			//							,"여관"
			//							,"한식"
			//							,"중식"
			//							,"일식"
			//							,"서양식"
			//							,"기타 외국식"
			//							,"제과점"
			//							,"패스트푸드"
			//							,"치킨"
			//							,"분식"
			//							,"호프 및 간이주점"
			//							,"카페"
			//							,"PC방/노래방"
			//							,"이발소"
			//							,"미용실"
			//							,"세탁소"
			//					};
			//					
			//					HashMap adm_cd_Map = new HashMap<>();
			//					adm_cd_Map.put("adm_cd", "1101053");
			//					adm_cd_Map.put("adm_nm", "사직동");
			//					ArrayList<HashMap<String, String>> theme_list = new ArrayList<>();
			//					
			//					for(int i = 0; i<theme_cd_array.length; i++ ){
			//						HashMap ppl = new HashMap<>();
			//						ppl.put("theme_cd", theme_cd_array[i]);
			//						ppl.put("theme_nm", theme_nm_array[i]);
			//						ppl.put("dist_per", (int)(Math.random()*100)+1);
			//						theme_list.add(ppl);
			//					}
			//					adm_cd_Map.put("theme_list", theme_list);
			//					
			//					
			//					HashMap sgg_cd_Map = new HashMap<>();
			//					sgg_cd_Map.put("adm_cd", "11010");
			//					sgg_cd_Map.put("adm_nm", "종로구");
			//					
			//					theme_list = null;
			//					theme_list = new ArrayList<>();
			//					
			//					for(int i = 0; i<theme_cd_array.length; i++ ){
			//						HashMap ppl = new HashMap<>();
			//						ppl.put("theme_cd", theme_cd_array[i]);
			//						ppl.put("theme_nm", theme_nm_array[i]);
			//						ppl.put("dist_per", (int)(Math.random()*100)+1);
			//						theme_list.add(ppl);
			//					}
			//					sgg_cd_Map.put("theme_list", theme_list);
			//					
			//					HashMap sido_cd_Map = new HashMap<>();
			//					sido_cd_Map.put("adm_cd", "11");
			//					sido_cd_Map.put("adm_nm", "서울특별시");
			//					
			//					theme_list = null;
			//					theme_list = new ArrayList<>();
			//					
			//					for(int i = 0; i<theme_cd_array.length; i++ ){
			//						HashMap ppl = new HashMap<>();
			//						ppl.put("theme_cd", theme_cd_array[i]);
			//						ppl.put("theme_nm", theme_nm_array[i]);
			//						ppl.put("dist_per", (int)(Math.random()*100)+1);
			//						theme_list.add(ppl);
			//					}
			//					sido_cd_Map.put("theme_list", theme_list);
			//					
			//					result.add(adm_cd_Map);
			//					result.add(sgg_cd_Map);
			//					result.add(sido_cd_Map);
			//					

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
		String corp_cd = (String) mapParameter.get( OptionParam.corp_cd.name() );
		
		if(corp_cd != null){
			if(!(corp_cd.equals("10") || corp_cd.equals("20") || corp_cd.equals("40") || corp_cd.equals("50"))){
				throw new ApiException( "생활업종 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}
		}
		
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
		return "startupbiz.corpdistsummary";
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
