package kostat.sop.ServiceAPI.api.catchmentArea;

import java.math.BigDecimal;
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

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

public class ServiceAreaStatistics extends AbsQuery<HashMap<String,Object>>{

	private static final Log logger = LogFactory.getLog( ServiceAreaStatistics.class );

	@Override
	public String getApiId()
	{
		return "API_202092";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.POST;
	}

	@Override
	public HashMap<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{

		httpSession = req.getSession();

		HashMap<String, Object> resultMap = new HashMap<>();
		List result = null;
		List result2 = null;

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );
			
			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}
			
			
			String isExistGridLevel = StringUtil.isNullToString(mapParameter.get("isExistGridLevel"));
			//String isExistShpArea = StringUtil.isNullToString(mapParameter.get("isExistShpArea"));			
			String girdUnit = "500m";	// 없으면 젤 큰거
			boolean areaValYn = false;
			
			if("Y".equals(isExistGridLevel)) {
				girdUnit = StringUtil.isNullToString(mapParameter.get("grid_level")); 
			}else{
				areaValYn = true;
				result = session.selectList("catchmentArea.selectSrvAreaSize", mapParameter );
				if(result != null && result.size() > 0){
					Map rstMap = (Map)result.get(0);
					BigDecimal srvAreaSize = (BigDecimal)rstMap.get("area_size");
					//BigDecimal area100k = new BigDecimal("100000000");			// 100㎢
					BigDecimal area30k = new BigDecimal("30000000");			// 30㎢	
					
					// 관리자 화면에서 격자 추가되면 여긴 어쩌냐 ??
					// 테이블명이야 대소문자 안가린다 치고 격자통계 테이블에 GRID_LEVEL_DIV 에 값이 소문자로 들어있으니 (아님 LOWER())
					if(srvAreaSize.compareTo(area30k) == -1 || srvAreaSize.compareTo(area30k) == 0) {
						girdUnit = "100m";
					}				
				}				
			}
			mapParameter.put("girdUnit", girdUnit);
			
			// 주의) 100m 보다 큰 격자는 100m 기반으로 bsca 구해야 함

			// areaSize:면적, pops:인구, family:가구, house:주택, copr:사업체/종사자, s3:인구/가구/주택, all:전체(보고서용)
			String workGb = (String) mapParameter.get("workGb");
			if("areaSize".equals(workGb) || "all".equals(workGb)) {
				if(!areaValYn) {
					result = session.selectList("catchmentArea.selectSrvAreaSize", mapParameter );
				}
				resultMap.put("areaSize", result);
			}
				
			if("pops".equals(workGb) || "s3".equals(workGb) || "all".equals(workGb)) {
				result = session.selectList("catchmentArea.selectSrvAreaGridPopsList", mapParameter );
				resultMap.put("pops", result);
				
				// 원본 총합 추가
				if(result != null && result.size() > 0 && result.get(0) != null){
					int man_cnt = ServiceAreaBSCA.getTotalSum(result, "man_", 5);
					int woman_cnt = ServiceAreaBSCA.getTotalSum(result, "wmn_", 5);
					int age_1_cnt = ServiceAreaBSCA.getTotalSum(result, "p01_", 5);
					int age_2_cnt = ServiceAreaBSCA.getTotalSum(result, "p02_", 5);
					int age_3_cnt = ServiceAreaBSCA.getTotalSum(result, "p03_", 5);
					int age_4_cnt = ServiceAreaBSCA.getTotalSum(result, "p04_", 5);
					int age_5_cnt = ServiceAreaBSCA.getTotalSum(result, "p05_", 5);
					int age_6_cnt = ServiceAreaBSCA.getTotalSum(result, "p06_", 5);
					int age_7_cnt = ServiceAreaBSCA.getTotalSum(result, "p07_", 5);
					int age_8_cnt = ServiceAreaBSCA.getTotalSum(result, "p08_", 5);
					int age_9_cnt = ServiceAreaBSCA.getTotalSum(result, "p09_", 5);
					int popsTot = ServiceAreaBSCA.getTotalSum(result, "tot_", 5);
				
					HashMap hm = (HashMap)result.get(0);
					hm.put("man_cnt", man_cnt);
					hm.put("woman_cnt", woman_cnt);
					hm.put("age_1_cnt", age_1_cnt);
					hm.put("age_2_cnt", age_2_cnt);
					hm.put("age_3_cnt", age_3_cnt);
					hm.put("age_4_cnt", age_4_cnt);
					hm.put("age_5_cnt", age_5_cnt);
					hm.put("age_6_cnt", age_6_cnt);
					hm.put("age_7_cnt", age_7_cnt);
					hm.put("age_8_cnt", age_8_cnt);
					hm.put("age_9_cnt", age_9_cnt);
					hm.put("tot_ppltn_cnt", (age_1_cnt + age_2_cnt + age_3_cnt + age_4_cnt + age_5_cnt + age_6_cnt + age_7_cnt + age_8_cnt + age_9_cnt));
					hm.put("tot_ppltn_cnt2", (man_cnt + woman_cnt));					
					hm.put("popsTotOgl", popsTot);					
				
//					result2 = session.selectList("catchmentArea.selectSrvAreaGridPopsBSCA", mapParameter );
//					int popsTot = ServiceAreaBSCA.getTotalSum(result2, "");
//					
//					HashMap hm = (HashMap)result.get(0);
//					hm.put("popsTotOgl", popsTot);
				}
			}
				
			if("family".equals(workGb) || "s3".equals(workGb) || "all".equals(workGb)) {
				result = session.selectList("catchmentArea.selectSrvAreaGridFamilyList", mapParameter );
				resultMap.put("family", result);
				
				// 원본 총합 추가
				if(result != null && result.size() > 0 && result.get(0) != null){
					int family_1_cnt = ServiceAreaBSCA.getTotalSum(result, "f01_", 5);
					int family_2_cnt = ServiceAreaBSCA.getTotalSum(result, "f02_", 5);
					int family_3_cnt = ServiceAreaBSCA.getTotalSum(result, "f03_", 5);
					int familyTot = ServiceAreaBSCA.getTotalSum(result, "tot_", 5);
					
					HashMap hm = (HashMap)result.get(0);
					hm.put("family_1_cnt", family_1_cnt);
					hm.put("family_2_cnt", family_2_cnt);
					hm.put("family_3_cnt", family_3_cnt);
					hm.put("tot_family_cnt", (family_1_cnt + family_2_cnt + family_3_cnt));
					hm.put("familyTotOgl", familyTot);					
					
//					result2 = session.selectList("catchmentArea.selectSrvAreaGridFamilyBSCA", mapParameter );
//					int familyTot = ServiceAreaBSCA.getTotalSum(result2, "");
//					
//					HashMap hm = (HashMap)result.get(0);
//					hm.put("familyTotOgl", familyTot);	
				}
			} 
				
			if("house".equals(workGb) || "s3".equals(workGb) || "all".equals(workGb)) {
				result = session.selectList("catchmentArea.selectSrvAreaGridHouseList", mapParameter );
				resultMap.put("house", result);
				
				// 원본 총합 추가
				if(result != null && result.size() > 0 && result.get(0) != null){
					int house_1_cnt = ServiceAreaBSCA.getTotalSum(result, "h01_", 5);
					int house_2_cnt = ServiceAreaBSCA.getTotalSum(result, "h02_", 5);
					int house_3_cnt = ServiceAreaBSCA.getTotalSum(result, "h03_", 5);
					int house_4_cnt = ServiceAreaBSCA.getTotalSum(result, "h04_", 5);
					int house_5_cnt = ServiceAreaBSCA.getTotalSum(result, "h05_", 5);
					int house_6_cnt = 0;			// ServiceAreaBSCA.getTotalSum(result, "h06_", 5)		, 주택이외의 거처 제외
					int houseTot = ServiceAreaBSCA.getTotalSum(result, "tot_", 5);
					
					HashMap hm = (HashMap)result.get(0);
					hm.put("house_1_cnt", house_1_cnt);
					hm.put("house_2_cnt", house_2_cnt);
					hm.put("house_3_cnt", house_3_cnt);
					hm.put("house_4_cnt", house_4_cnt);
					hm.put("house_5_cnt", house_5_cnt);
					hm.put("house_6_cnt", house_6_cnt);
					hm.put("tot_house_cnt", (house_1_cnt + house_2_cnt + house_3_cnt + house_4_cnt + house_5_cnt + house_6_cnt));					
					hm.put("houseTotOgl", houseTot);					
					
//					result2 = session.selectList("catchmentArea.selectSrvAreaGridHouseBSCA", mapParameter );
//					int houseTot = ServiceAreaBSCA.getTotalSum(result2, "");
//					
//					HashMap hm = (HashMap)result.get(0);
//					hm.put("houseTotOgl", houseTot);
				}
			}
				
			if("copr".equals(workGb) || "all".equals(workGb)) {
				// BSCA도 9016으로 구축
				if(mapParameter.containsKey("copr_base_year")){
					String copr_base_year = (String) mapParameter.get("copr_base_year");					
					if("2016".equals(copr_base_year)) {
						mapParameter.put("copr_base_year", "9016");
					}
				}
				//result = session.selectList("catchmentArea.selectSrvAreaGridCoprList", mapParameter );
				result = session.selectList("catchmentArea.selectSrvAreaGridCoprListVer2", mapParameter );

				// 원본 총합 추가
				if(result != null && result.size() > 0){					
					HashMap kwMap = new HashMap();
					kwMap.put("grid_level", girdUnit);					
					resultMap.put("copr", ServiceAreaBSCA.bscaT01(result, 3, kwMap));

//					int coprTot = ServiceAreaBSCA.getTotalSum(result, "cop_", 3);
//					int employeeTot = ServiceAreaBSCA.getTotalSum(result, "emp_", 3);
//					
//					HashMap hm = (HashMap)result.get(0);	// 첫번째에 전체 정보
//					hm.put("coprTotOgl", coprTot);				
//					hm.put("employeeTotOgl", employeeTot);					
					
//					result2 = session.selectList("catchmentArea.selectSrvAreaGridCoprBSCA", mapParameter );					
//					int coprTot = ServiceAreaBSCA.getTotalSum(result2, "cop_");
//					int employeeTot = ServiceAreaBSCA.getTotalSum(result2, "emp_");
//					
//					HashMap hm = (HashMap)result.get(0);	// 첫번째에 전체 정보
//					hm.put("coprTotOgl", coprTot);				
//					hm.put("employeeTotOgl", employeeTot);
				}else {
					resultMap.put("copr", null);
				}
			}

			if( resultMap.size() == 0 )
			{
				throw new NoResultException();
			}

			logger.info( "END Query - TXID[" + getApiId() + "] " );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "[ result = " + resultMap + " ]" );
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
			throw new ApiException( "입력값을 체크 해 주세요.", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
			logger.error(e);
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		return resultMap;
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

	protected void optimizeParameterMap( Map mapParameter )
	{
		// 도형 면적 존재 여부
//		mapParameter.put("isExistShpArea", "N");
//		if(mapParameter.containsKey("shpArea")) {
//			String shpArea = StringUtil.isNullToString(mapParameter.get("shpArea"));			
//			if(!"".equals(shpArea)){
//				mapParameter.put("isExistShpArea", "Y");
//			}								
//		}		

		// 그리드 크기 존재 여부
		mapParameter.put("isExistGridLevel", "N");
		if(mapParameter.containsKey("grid_level")) {
			String grid_level = StringUtil.isNullToString(mapParameter.get("grid_level"));			
			if(!"".equals(grid_level)){
				mapParameter.put("isExistGridLevel", "Y");
			}								
		}
		
		// 사전생성된 격자번호 사용 여부
		mapParameter.put("isUseGeneratedGridNumber", "N");
		if(mapParameter.containsKey("sufid") && mapParameter.containsKey("rangeCd")) {
			String sufid = StringUtil.isNullToString(mapParameter.get("sufid"));
			String rangeCd = StringUtil.isNullToString(mapParameter.get("rangeCd"));
			if(!"".equals(sufid) && !"".equals(rangeCd) ){
				mapParameter.put("isUseGeneratedGridNumber", "Y");
			}								
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "";
	}

	enum MustParam
	{
		classDeg
	}

	enum OptionParam
	{
		accessToken,
		base_year,
		copr_base_year,
		srvAreaType,
		grid_level,
		//shpArea,
		area,
		radius,
		workGb,
		sufid,
		rangeCd
	}
}
