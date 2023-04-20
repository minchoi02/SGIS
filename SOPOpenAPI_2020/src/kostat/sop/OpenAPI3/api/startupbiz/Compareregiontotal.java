package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class Compareregiontotal extends AbsAuthAPI< Map<String, Object> >
{
	private static final Log logger = LogFactory.getLog( Compareregiontotal.class );

	@Override
	public String getApiId()
	{
		return "API_0618";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		httpSession = req.getSession();

		Map result = new HashMap();
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

			if(mapParameter.containsKey("corp_cnt")){
				List<Map<String, Object>> litemp;
				// mng_s 20200218_김건민 
				mapParameter.put("base_year", 2018);
				// mng_e 20200218_김건민 
				litemp = session.selectList( "startupbiz.companycount", mapParameter );
				result.put("companyCount", litemp); 
			}
			
			if(mapParameter.containsKey("rate_change")){
				List<Map<String, Object>> litemp;
				litemp = session.selectList( "startupbiz.companyIncrease", mapParameter );
				result.put("companyIncrease", litemp);
			}
			
			if(mapParameter.containsKey("ppl_type")){
				String ppl_type = (String) mapParameter.get("ppl_type");
				if(ppl_type.equals("1")){
					List<Map<String, Object>> litemp;
					litemp = session.selectList( "startupbiz.staypeople", mapParameter );
					result.put("staypeople", litemp);
				} else if(ppl_type.equals("2")){
					List<Map<String, Object>> litemp;
					litemp = session.selectList( "startupbiz.jobpeople", mapParameter );
					result.put("jobpeople", litemp);
				}
			}
			
			if(mapParameter.containsKey("ppl_gender_type")){
				List<Map<String, Object>> litemp;
				litemp = session.selectList( "startupbiz.genderpeople", mapParameter );
				result.put("genderpeople", litemp); 
			}
			
			if(mapParameter.containsKey("ppl_age_type")){
				String ppl_age_type = (String) mapParameter.get("ppl_age_type");
				ArrayList ageTypeList = new ArrayList<>();
				String pplAgeTypeList[] = ppl_age_type.split(",");
				for(int i = 0; i < pplAgeTypeList.length; i++){
					ageTypeList.add(pplAgeTypeList[i]);
				}
				if(ageTypeList.contains("10_under")){
					mapParameter.put("ten_under",'Y');
					System.out.println("10_under");
				}
				if(ageTypeList.contains("10")){
					mapParameter.put("tens",'Y');
					System.out.println("10");
				}
				if(ageTypeList.contains("20")){
					mapParameter.put("twentys",'Y');
					System.out.println("20");
				}
				if(ageTypeList.contains("30")){
					mapParameter.put("thirtys",'Y');
					System.out.println("30");
				}
				if(ageTypeList.contains("40")){
					mapParameter.put("fortys",'Y');
					System.out.println("40");
				}
				if(ageTypeList.contains("50")){
					mapParameter.put("fiftys",'Y');
					System.out.println("50");
				}
				if(ageTypeList.contains("60")){
					mapParameter.put("sixtys",'Y');
					System.out.println("60");
				}
				if(ageTypeList.contains("70_over")){
					mapParameter.put("seventy_over",'Y');
					System.out.println("70_over");
				}
				List<Map<String, Object>> litemp;
				litemp = session.selectList( "startupbiz.agepeople", mapParameter );
				result.put("agepeople", litemp); 
				
			}
			
			if(mapParameter.containsKey("family_type")){
				String family_type = (String) mapParameter.get("family_type");
				List<Map<String, Object>> litemp;
				litemp = session.selectList( "startupbiz.household", mapParameter );
				result.put("household", litemp);
			}

			if(mapParameter.containsKey("occupy_type")){
//				String occupy_type = (String) mapParameter.get("occupy_type");
//				List<Map<String, Object>> litemp;
//				litemp = session.selectList( "startupbiz.occupytype", mapParameter );
//				result.put("occupytype", litemp);
			}
			
			if(mapParameter.containsKey("house_val")){
				List<Map<String, Object>> litemp;
				litemp = session.selectList( "startupbiz.housetype", mapParameter );
				result.put("housetype", litemp);
			}
			
			if(mapParameter.containsKey("apartprice")){
				List<Map<String, Object>> litemp;
				litemp = session.selectList( "startupbiz.apartprice", mapParameter );
				result.put("apartprice", litemp);
			}

			if(mapParameter.containsKey("house_old_val")){
				List<Map<String, Object>> litemp;
				litemp = session.selectList( "startupbiz.oldhouse", mapParameter );
				result.put("oldhouse", litemp);
			}
			
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

	private List<Map<String, Object>> selectList(String string, Map mapParameter) {
		// TODO Auto-generated method stub
		return null;
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
		String first_adm_cd = (String) mapParameter.get( MustParam.first_adm_cd.name() );
		String adm_cd = null;
		String year = null;
		
		if( first_adm_cd.length() == 5 )
		{
			adm_cd = first_adm_cd.substring( 0, 2 );
			mapParameter.put("adm_cd", adm_cd);
		}
		else if( first_adm_cd.length() == 7 )
		{
			adm_cd = first_adm_cd.substring( 0, 5 );
			mapParameter.put("adm_cd", adm_cd);
		}
		else
		{
			throw new ApiException( "동코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
		}
		
		//사업체 최신년도 체크
		String max_base_year = session.selectOne("startupbiz.SelectMaxBaseyear");
		mapParameter.put("base_year", max_base_year);
		
		//가구주택 최신년도 체크
		for(int i = 0; i < Properties.getYear_list().size(); i++ ){
			if(i == 0){
				year = (String) Properties.getYear_list().get(i);
			}else{
				if(Integer.parseInt((String) Properties.getYear_list().get(i)) > Integer.parseInt(year)){
					year = (String) Properties.getYear_list().get(i);
				}
			}
		}
		mapParameter.put("year", year);
		mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
	}

	@Override
	protected String getQueryStr()
	{
		return null;
	}

	enum MustParam
	{
		first_adm_cd
	}

	enum OptionParam
	{
		accessToken,
		second_adm_cd,
		third_adm_cd,
		theme_cd,
		corp_cnt,
		rate_change,
		family_type,
		family_val,
		occupy_type,
		occupy_val,
		house_type,
		house_val,
		house_old_val,
		apartprice,
		ppl_type,
		ppl_val,
		ppl_gender_type,
		ppl_gender_val,
		ppl_age_type,
		ppl_age_val
	}

}
