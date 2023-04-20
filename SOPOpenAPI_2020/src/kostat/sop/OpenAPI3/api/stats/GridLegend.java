package kostat.sop.OpenAPI3.api.stats;

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

import kostat.sop.OpenAPI3.api.stats.House.MustParam;
import kostat.sop.OpenAPI3.api.stats.House.OptionParam;
import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.common.util.StringUtil;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

public class GridLegend extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( GridLegend.class );
	
	/*
	private Map<String, Map<String, String>> houseAreaCodeMap;

	public Map< String, Map< String, String > > getHouseAreaCodeMap()
	{
		return houseAreaCodeMap;
	}
	
	public void setHouseAreaCodeMap( Map< String, Map< String, String > > houseAreaCodeMap )
	{
		this.houseAreaCodeMap = houseAreaCodeMap;
	}
	*/

	@Override
	public String getApiId()
	{
		return "GRD_0301";
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

			/*
			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}
			*/

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );
			
			String what_service = (String) mapParameter.get( "what_service" );
			String what_query = "";
			if("API_0301".equals(what_service)){
				what_query = "stats.gridlegend_0301";
			} else if("API_0302".equals(what_service)){ //인구
				what_query = "stats.gridlegend_0302";
			} else if("API_0303".equals(what_service)){
				what_query = "stats.gridlegend_0303";
			} else if("API_0304".equals(what_service)){ //사업체 title=5(사업체수), titile=6(종사자수)
				what_query = "stats.gridlegend_0301";
			} else if("API_0305".equals(what_service)){ //가구
				what_query = "stats.gridlegend_0305";
			} else if("API_0306".equals(what_service)){ //주택
				what_query = "stats.gridlegend_0306";
			}

			result = session.selectList( what_query, mapParameter );

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
		catch( Exception e )
		{
			e.printStackTrace();
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		finally
		{
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
		String year = (String) mapParameter.get( "year" );
		String title = (String) mapParameter.get( "title" );
		String zoom = (String) mapParameter.get( "zoom" );
		
		String age_from = (String) mapParameter.get( "age_from" );
		String age_to = (String) mapParameter.get( "age_to" );
		
		if( age_from != null ) {
			if("0".equals(age_from)) {
				age_from = "01";
			} else if("5".equals(age_from)) {
				age_from = "02";
			} else if("10".equals(age_from)) {
				age_from = "03";
			} else if("15".equals(age_from)) {
				age_from = "04";
			} else if("20".equals(age_from)) {
				age_from = "05";
			} else if("25".equals(age_from)) {
				age_from = "06";
			} else if("30".equals(age_from)) {
				age_from = "07";
			} else if("35".equals(age_from)) {
				age_from = "08";
			} else if("40".equals(age_from)) {
				age_from = "09";
			} else if("45".equals(age_from)) {
				age_from = "10";
			} else if("50".equals(age_from)) {
				age_from = "11";
			} else if("55".equals(age_from)) {
				age_from = "12";
			} else if("60".equals(age_from)) {
				age_from = "13";
			} else if("65".equals(age_from)) {
				age_from = "14";
			} else if("70".equals(age_from)) {
				age_from = "15";
			} else if("75".equals(age_from)) {
				age_from = "16";
			} else if("80".equals(age_from)) {
				age_from = "17";
			} else if("85".equals(age_from)) {
				age_from = "18";
			} else if("90".equals(age_from)) {
				age_from = "19";
			} else if("95".equals(age_from)) {
				age_from = "20";
			} else if("100".equals(age_from)) {
				age_from = "21";
			}
			
			if("4".equals(age_to)) {
				age_to = "01";
			} else if("9".equals(age_to)) {
				age_to = "02";
			} else if("14".equals(age_to)) {
				age_to = "03";
			} else if("19".equals(age_to)) {
				age_to = "04";
			} else if("24".equals(age_to)) {
				age_to = "05";
			} else if("29".equals(age_to)) {
				age_to = "06";
			} else if("34".equals(age_to)) {
				age_to = "07";
			} else if("39".equals(age_to)) {
				age_to = "08";
			} else if("44".equals(age_to)) {
				age_to = "09";
			} else if("49".equals(age_to)) {
				age_to = "10";
			} else if("54".equals(age_to)) {
				age_to = "11";
			} else if("59".equals(age_to)) {
				age_to = "12";
			} else if("64".equals(age_to)) {
				age_to = "13";
			} else if("69".equals(age_to)) {
				age_to = "14";
			} else if("74".equals(age_to)) {
				age_to = "15";
			} else if("79".equals(age_to)) {
				age_to = "16";
			} else if("84".equals(age_to)) {
				age_to = "17";
			} else if("89".equals(age_to)) {
				age_to = "18";
			} else if("94".equals(age_to)) {
				age_to = "19";
			} else if("99".equals(age_to)) {
				age_to = "20";
			} else if("150".equals(age_to)) { //100세 이상은 age_to가 널로 들어올것으로 예상됨
				age_to = "21";
			}
			
			mapParameter.put( "start_age_cd", age_from );
			mapParameter.put( "end_age_cd", age_to );
			
		}
		
		/*
		if( mapParameter.containsKey( "household_type" ) )
		{
			String household_type[] = mapParameter.get( "household_type" ).toString().split( "," );
			
			if( household_type.length > 3 )
			{
				throw new ApiException( "household_type 중복은 3개까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}
			
			for( int i = 0; i < household_type.length; i++ )
			{
				if( !Properties.getHousehold_type_list().contains( household_type[i] ) )
				{
					throw new ApiException( "household_type정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
				}
			}
			mapParameter.put( "household_type", household_type );
		}
		*/
		//범례에서는 가구의 세대구성에서 '01,02' 이런식으로 다중 구성시 in 조건을 사용하지않고
		//값 자체가 들어가 있으므로 위와같이 스트링 배열로 넘길 필요가 없다.
		String household_type = (String) mapParameter.get( "household_type" );
		mapParameter.put( "household_type", household_type );
		
		String house_type = (String) mapParameter.get( "house_type" );
		mapParameter.put( "house_type", house_type );
		String house_use_prid_cd = (String) mapParameter.get( "house_use_prid_cd" );
		mapParameter.put( "house_use_prid_cd", house_use_prid_cd );
		//String house_area_cd = (String) mapParameter.get( "house_area_cd" );
		//mapParameter.put( "house_area_cd", house_area_cd );
		String const_year = (String) mapParameter.get( "const_year" );
		mapParameter.put( "const_year", const_year );
		
		//주택의 경우 연면적은 년도에 따라 파라미터가 다르므로 이렇게 처리한다.
		
		if( Integer.parseInt(year) > 2010)
		{
			if( mapParameter.containsKey(OptionParam.house_area_cd.name()) )
			{
				String house_area_str = mapParameter.get("house_area_cd").toString();
				String house_area_cd[] = house_area_str.split(",");
				mapParameter.put( "start_house_area_cd", house_area_cd[0] );
				mapParameter.put( "end_house_area_cd", house_area_cd[(house_area_cd.length-1)] );
			}
			
		}
		else
		{
			if( mapParameter.containsKey(OptionParam.house_area_cd.name()) )
			{
				String house_area_param = null;
				String house_area_str = mapParameter.get("house_area_cd").toString();
				logger.debug( "[ house_area_str = " + house_area_str + " ]" );
				String house_area_cd[] = house_area_str.split(",");
				
				String from = "";
				String to = "";
				
				if(house_area_cd.length == 1){
					
					if ( "01".equals(house_area_cd[0]) ) {
						from = "0";
						to = "20";
					} else if ( "02".equals(house_area_cd[0]) ) {
						from = "20";
						to = "40";
					} else if ( "03".equals(house_area_cd[0]) ) {
						from = "40";
						to = "60";
					} else if ( "04".equals(house_area_cd[0]) ) {
						from = "60";
						to = "85";
					} else if ( "05".equals(house_area_cd[0]) ) {
						from = "85";
						to = "100";
					} else if ( "06".equals(house_area_cd[0]) ) {
						from = "100";
						to = "130";
					} else if ( "07".equals(house_area_cd[0]) ) {
						from = "130";
						to = "165";
					} else if ( "08".equals(house_area_cd[0]) ) {
						from = "165";
						to = "230";
					} else if ( "09".equals(house_area_cd[0]) ) {
						from = "230";
						to = "";
					}
					
					mapParameter.put( "start_house_area_cd", from );
					mapParameter.put( "end_house_area_cd", to );
					
				} else {
					if ( "01".equals(house_area_cd[0]) ) {
						from = "0";
					} else if ( "02".equals(house_area_cd[0]) ) {
						from = "20";
					} else if ( "03".equals(house_area_cd[0]) ) {
						from = "40";
					} else if ( "04".equals(house_area_cd[0]) ) {
						from = "60";
					} else if ( "05".equals(house_area_cd[0]) ) {
						from = "85";
					} else if ( "06".equals(house_area_cd[0]) ) {
						from = "100";
					} else if ( "07".equals(house_area_cd[0]) ) {
						from = "130";
					} else if ( "08".equals(house_area_cd[0]) ) {
						from = "165";
					} else if ( "09".equals(house_area_cd[0]) ) {
						from = "230";
					}
					
					if ( "01".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "20";
					} else if ( "02".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "40";
					} else if ( "03".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "60";
					} else if ( "04".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "85";
					} else if ( "05".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "100";
					} else if ( "06".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "130";
					} else if ( "07".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "165";
					} else if ( "08".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = "230";
					} else if ( "09".equals(house_area_cd[house_area_cd.length-1]) ) {
						to = null;
					}
				}
				
				mapParameter.put( "start_house_area_cd", from );
				mapParameter.put( "end_house_area_cd", to );
				
			}
			
			
		}
	}

	

	@Override
	protected String getQueryStr()
	{
		return "stats.gridlegend";
	}

	enum MustParam
	{
		accessToken
	}

	enum OptionParam
	{
		accessToken
		, zoom
		, year
		, title
		, what_service
		, age_from
		, age_to
		, gender
		, household_type
		, house_type
		, house_use_prid_cd
		, house_area_cd
		, const_year
	}

}
