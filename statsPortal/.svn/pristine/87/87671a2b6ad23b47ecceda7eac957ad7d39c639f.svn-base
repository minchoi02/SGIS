package kostat.sop.ServiceAPI.api.catchmentArea;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
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

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

public class CharacteristicStatistics extends AbsQuery<HashMap<String, Object>>{

	private static final Log logger = LogFactory.getLog( CharacteristicStatistics.class );

	@Resource( name = "srvArea_security_mode" )
	private String SECURITY_MODE;
	
	@Override
	public String getApiId()
	{
		return "API_202094";
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

			Map rtnMap = null;
			HashMap kwMap = new HashMap();
			kwMap.put("base_year", StringUtil.isNullToString(mapParameter.get("base_year")));
			//SGIS4_생활권역 시작
			kwMap.put("grid_level", mapParameter.get("grid_level"));
			//SGIS4_생활권역 끝
			
			// pops:인구
			if("Y".equals((String)mapParameter.get("isCharacteristicsPops"))) {
//				result = session.selectList("catchmentArea.selectCharacteristicsPopsList", mapParameter );
//				resultMap.put("pops", result);	
				
				result = session.selectList("catchmentArea.selectPopsList", mapParameter);					
				if(result != null && result.size() > 0){						
					kwMap.put("kw_year", "base_year");
					//kwMap.put("kw_gridCd", "grid_cd");
					kwMap.put("kw_org", "ppltn_cnt");
					kwMap.put("kw_sca", "bsca");						
					kwMap.put("rt_col_tot_byChartr", "ppltn_cnt");
					
					rtnMap = ServiceAreaBSCA.bscaT02(result, 5, kwMap, "C");	
				}
				
				if(rtnMap != null && rtnMap.get("byChartr") != null) {
					resultMap.put("pops", (List)rtnMap.get("byChartr"));
				}else {
					resultMap.put("pops", null);
				}
				
				//SGIS4_1025_생활권역 시작
				// 1. 선택 조건 내 남여 인구 구하기 
				Map rtnMap2 = null;
				if(result != null && result.size() > 0){						
					kwMap.put("kw_year", "gender");
					kwMap.put("kw_org", "ppltn_cnt");
					kwMap.put("kw_sca", "bsca");						
					kwMap.put("rt_col_tot_byChartr", "ppltn_cnt");
					
					rtnMap2 = ServiceAreaBSCA.bscaT02(result, 5, kwMap, "C");	
				}
				
				if(rtnMap2 != null && rtnMap2.get("byChartr") != null) {
					resultMap.put("pops_gender", (List)rtnMap2.get("byChartr"));
				}else {
					resultMap.put("pops_gender", null);
				}				
				
				// 2. Bar 차트용 
				result = session.selectList("catchmentArea.selectSrvAreaGridPopsList", mapParameter);

				if(result != null && result.size() > 0 && result.get(0) != null){
					
					String stats_class_gb = StringUtil.isNullToString(mapParameter.get("stats_class_gb"));
					
					if("age_5".equals(stats_class_gb)){	// 5세 단위
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
						int age_10_cnt = ServiceAreaBSCA.getTotalSum(result, "p10_", 5);
						int age_11_cnt = ServiceAreaBSCA.getTotalSum(result, "p11_", 5);
						int age_12_cnt = ServiceAreaBSCA.getTotalSum(result, "p12_", 5);
						int age_13_cnt = ServiceAreaBSCA.getTotalSum(result, "p13_", 5);
						int age_14_cnt = ServiceAreaBSCA.getTotalSum(result, "p14_", 5);
						int age_15_cnt = ServiceAreaBSCA.getTotalSum(result, "p15_", 5);
						int age_16_cnt = ServiceAreaBSCA.getTotalSum(result, "p16_", 5);
						int age_17_cnt = ServiceAreaBSCA.getTotalSum(result, "p17_", 5);
						int age_18_cnt = ServiceAreaBSCA.getTotalSum(result, "p18_", 5);
						int age_19_cnt = ServiceAreaBSCA.getTotalSum(result, "p19_", 5);
						//SGIS4_1210_생활권역 시작
						int age_20_cnt = 0;	//ServiceAreaBSCA.getTotalSum(result, "p20_", 5);
						int age_21_cnt = 0;	//ServiceAreaBSCA.getTotalSum(result, "p21_", 5);
						//SGIS4_1210_생활권역 끝
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
						hm.put("age_10_cnt", age_10_cnt);
						hm.put("age_11_cnt", age_11_cnt);
						hm.put("age_12_cnt", age_12_cnt);
						hm.put("age_13_cnt", age_13_cnt);
						hm.put("age_14_cnt", age_14_cnt);
						hm.put("age_15_cnt", age_15_cnt);
						hm.put("age_16_cnt", age_16_cnt);
						hm.put("age_17_cnt", age_17_cnt);
						hm.put("age_18_cnt", age_18_cnt);
						hm.put("age_19_cnt", age_19_cnt);
						hm.put("age_20_cnt", age_20_cnt);
						hm.put("age_21_cnt", age_21_cnt);
						hm.put("tot_ppltn_cnt", (age_1_cnt + age_2_cnt + age_3_cnt + age_4_cnt + age_5_cnt + age_6_cnt + age_7_cnt + age_8_cnt + age_9_cnt + age_10_cnt + age_11_cnt + age_12_cnt + age_13_cnt + age_14_cnt + age_15_cnt + age_16_cnt + age_17_cnt + age_18_cnt + age_19_cnt + age_20_cnt + age_21_cnt));
						hm.put("tot_ppltn_cnt2", (man_cnt + woman_cnt));					
						hm.put("popsTotOgl", popsTot);						
					}else if("age_define".equals(stats_class_gb)){	// 주요 구간
						int man_cnt = ServiceAreaBSCA.getTotalSum(result, "man_", 5);
						int woman_cnt = ServiceAreaBSCA.getTotalSum(result, "wmn_", 5);
						int age_1_cnt = ServiceAreaBSCA.getTotalSum(result, "p01_", 5);
						int age_2_cnt = ServiceAreaBSCA.getTotalSum(result, "p02_", 5);
						int age_3_cnt = ServiceAreaBSCA.getTotalSum(result, "p03_", 5);
						int age_4_cnt = ServiceAreaBSCA.getTotalSum(result, "p04_", 5);
						int age_5_cnt = ServiceAreaBSCA.getTotalSum(result, "p05_", 5);
						int age_6_cnt = ServiceAreaBSCA.getTotalSum(result, "p06_", 5);
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
						hm.put("tot_ppltn_cnt", (age_1_cnt + age_4_cnt + age_5_cnt));	// 01 ~ 21 까지 중복없는 구간 3개의 합
						hm.put("tot_ppltn_cnt2", (man_cnt + woman_cnt));					
						hm.put("popsTotOgl", popsTot);						
					}else {	// 기본값: 10세 단위
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
						int age_10_cnt = ServiceAreaBSCA.getTotalSum(result, "p10_", 5);
						int age_11_cnt = 0;	//ServiceAreaBSCA.getTotalSum(result, "p11_", 5);	//SGIS4_1210_생활권역
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
						hm.put("age_10_cnt", age_10_cnt);
						hm.put("age_11_cnt", age_11_cnt);
						hm.put("tot_ppltn_cnt", (age_1_cnt + age_2_cnt + age_3_cnt + age_4_cnt + age_5_cnt + age_6_cnt + age_7_cnt + age_8_cnt + age_9_cnt + age_10_cnt + age_11_cnt));
						hm.put("tot_ppltn_cnt2", (man_cnt + woman_cnt));					
						hm.put("popsTotOgl", popsTot);
					}
					
					resultMap.put("pops_class", result);
				}else {
					resultMap.put("pops_class", null);
				}				
				//SGIS4_1025_생활권역 끝
			}

			// family:가구
			if("Y".equals((String)mapParameter.get("isCharacteristicsFamily"))) {
//				result = session.selectList("catchmentArea.selectCharacteristicsFamilyList", mapParameter );
//				resultMap.put("family", result);
				
				result = session.selectList("catchmentArea.selectFamilyList", mapParameter);					
				if(result != null && result.size() > 0){						
					kwMap.put("kw_year", "base_year");
					//kwMap.put("kw_gridCd", "grid_cd");
					kwMap.put("kw_org", "family_cnt");
					kwMap.put("kw_sca", "family_bsca");						
					kwMap.put("rt_col_tot_byChartr", "family_cnt");
					
					rtnMap = ServiceAreaBSCA.bscaT02(result, 5, kwMap, "C");	
				}
				
				if(rtnMap != null && rtnMap.get("byChartr") != null) {
					resultMap.put("family", (List)rtnMap.get("byChartr"));
				}else {
					resultMap.put("family", null);
				}
				
				//SGIS4_1025_생활권역 시작
				// 2. Bar 차트용 
				result = session.selectList("catchmentArea.selectSrvAreaGridFamilyList", mapParameter);
				if(result != null && result.size() > 0 && result.get(0) != null){
					int F01_cnt = ServiceAreaBSCA.getTotalSum(result, "f01_", 5); //1인가구
					int F02_cnt = ServiceAreaBSCA.getTotalSum(result, "f02_", 5); //비혈연가구
					int F03_cnt = ServiceAreaBSCA.getTotalSum(result, "f03_", 5); //혈연가구
					int F04_cnt = ServiceAreaBSCA.getTotalSum(result, "f04_", 5); //1세대
					int F05_cnt = ServiceAreaBSCA.getTotalSum(result, "f05_", 5); //2세대
					int F06_cnt = ServiceAreaBSCA.getTotalSum(result, "f06_", 5); //3세대
					int F07_cnt = ServiceAreaBSCA.getTotalSum(result, "f07_", 5); //4세대, 5세대
	
					HashMap hm = (HashMap)result.get(0);
					hm.put("f01_cnt", F01_cnt);
					hm.put("f02_cnt", F02_cnt);
					hm.put("f03_cnt", F03_cnt);
					hm.put("f04_cnt", F04_cnt);
					hm.put("f05_cnt", F05_cnt);
					hm.put("f06_cnt", F06_cnt);
					hm.put("f07_cnt", F07_cnt);
					hm.put("tot_family_cnt", (F01_cnt + F02_cnt + F03_cnt));
					
					resultMap.put("family_class", result);
				}else {
					resultMap.put("family_class", null);
				}
				//SGIS4_1025_생활권역 끝
			}			

			// house:주택
			if("Y".equals((String)mapParameter.get("isCharacteristicsHouse"))) {
//				result = session.selectList("catchmentArea.selectCharacteristicsHouseList", mapParameter );
//				resultMap.put("house", result);
				
				result = session.selectList("catchmentArea.selectHouseList", mapParameter);					
				if(result != null && result.size() > 0){						
					kwMap.put("kw_year", "base_year");
					//kwMap.put("kw_gridCd", "grid_cd");
					kwMap.put("kw_org", "resid_cnt");
					kwMap.put("kw_sca", "bsca");					
					kwMap.put("rt_col_tot_byChartr", "resid_cnt");
					
					rtnMap = ServiceAreaBSCA.bscaT02(result, 5, kwMap, "C");	
				}
				
				if(rtnMap != null && rtnMap.get("byChartr") != null) {
					resultMap.put("house", (List)rtnMap.get("byChartr"));
				}else {
					resultMap.put("house", null);
				}
				
				//SGIS4_1025_생활권역 시작
				//bar차트용
				result = session.selectList("catchmentArea.selectSrvAreaGridHouseList", mapParameter);
				if(result != null && result.size() > 0 && result.get(0) != null){
					String stats_class_gb = StringUtil.isNullToString(mapParameter.get("stats_class_gb"));
					
					if("area".equals(stats_class_gb)){	//연 면적
						int H01_cnt = ServiceAreaBSCA.getTotalSum(result, "h01_", 5); //20㎡ 이하	
						int H02_cnt = ServiceAreaBSCA.getTotalSum(result, "h02_", 5); //20㎡ ~ 40	
						int H03_cnt = ServiceAreaBSCA.getTotalSum(result, "h03_", 5); //40㎡ ~ 60㎡	
						int H04_cnt = ServiceAreaBSCA.getTotalSum(result, "h04_", 5); //60㎡ ~ 85㎡
						int H05_cnt = ServiceAreaBSCA.getTotalSum(result, "h05_", 5); //85㎡ ~ 100㎡
						int H06_cnt = ServiceAreaBSCA.getTotalSum(result, "h06_", 5); //100㎡ ~ 130㎡
						int H07_cnt = ServiceAreaBSCA.getTotalSum(result, "h07_", 5); //130㎡ ~ 165㎡	
						int H08_cnt = ServiceAreaBSCA.getTotalSum(result, "h08_", 5); //165㎡ ~ 230㎡	
						int H09_cnt = ServiceAreaBSCA.getTotalSum(result, "h09_", 5); //230㎡ 초과
		
						HashMap hm = (HashMap)result.get(0);
						hm.put("h01_cnt", H01_cnt);
						hm.put("h02_cnt", H02_cnt);
						hm.put("h03_cnt", H03_cnt);
						hm.put("h04_cnt", H04_cnt);
						hm.put("h05_cnt", H05_cnt);
						hm.put("h06_cnt", H06_cnt);
						hm.put("h07_cnt", H07_cnt);
						hm.put("h08_cnt", H08_cnt);
						hm.put("h09_cnt", H09_cnt);
						hm.put("tot_house_cnt", (H01_cnt + H02_cnt + H03_cnt + H04_cnt + H05_cnt + H06_cnt +H07_cnt+H08_cnt+H09_cnt));
					}else {	//주택유형
						int H01_cnt = ServiceAreaBSCA.getTotalSum(result, "h01_", 5); //단독주택	
						int H02_cnt = ServiceAreaBSCA.getTotalSum(result, "h02_", 5); //아파트	
						int H03_cnt = ServiceAreaBSCA.getTotalSum(result, "h03_", 5); //연립주택	
						int H04_cnt = ServiceAreaBSCA.getTotalSum(result, "h04_", 5); //다세대주택
						int H05_cnt = ServiceAreaBSCA.getTotalSum(result, "h05_", 5); //비거주용 건물(상가,공장,여관 등)내 주택
		
						HashMap hm = (HashMap)result.get(0);
						hm.put("h01_cnt", H01_cnt);
						hm.put("h02_cnt", H02_cnt);
						hm.put("h03_cnt", H03_cnt);
						hm.put("h04_cnt", H04_cnt);
						hm.put("h05_cnt", H05_cnt);
						hm.put("tot_house_cnt", (H01_cnt + H02_cnt + H03_cnt + H03_cnt + H04_cnt + H05_cnt));
					}
					resultMap.put("house_class", result);
				}else {
					resultMap.put("house_class", null);
				}
				//SGIS4_1025_생활권역 끝
			}
			
			// copr:사업체
			if("Y".equals((String)mapParameter.get("isCharacteristicsCopr"))) {
//				result = session.selectList("catchmentArea.selectCharacteristicsCoprList", mapParameter );
//				resultMap.put("copr", result);
				
				result = session.selectList("catchmentArea.selectCoprList", mapParameter);					
				if(result != null && result.size() > 0){						
					kwMap.put("kw_year", "base_year");
					//kwMap.put("kw_gridCd", "grid_cd");
					kwMap.put("kw_org", "copr_cnt");
					kwMap.put("kw_sca", "copr_bsca");					
					kwMap.put("rt_col_tot_byChartr", "copr_cnt");
					
					rtnMap = ServiceAreaBSCA.bscaT02(result, 3, kwMap, "C");	
				}
				
				if(rtnMap != null && rtnMap.get("byChartr") != null) {
					resultMap.put("copr", (List)rtnMap.get("byChartr"));
				}else {
					resultMap.put("copr", null);
				}				
				
				//SGIS4_1025_생활권역 시작
				String isLifeBiz = StringUtil.isNullToString(mapParameter.get("isLifeBiz"));
				if("Y".equals(isLifeBiz)) {				
					Map rtnMap2 = null;
					result = session.selectList("catchmentArea.selectCoprList2", mapParameter);
					if(result != null && result.size() > 0){						
						kwMap.put("kw_year", "theme_cd");
						kwMap.put("kw_grpNm", "s_theme_cd_nm");
						kwMap.put("kw_org", "copr_cnt");
						kwMap.put("kw_sca", "copr_bsca");						
						kwMap.put("rt_col_tot_byChartr", "copr_cnt");
						
						rtnMap2 = ServiceAreaBSCA.bscaT02(result, 3, kwMap, "C");	
					}
					
					if(rtnMap2 != null && rtnMap2.get("byChartr") != null) {
						resultMap.put("copr_class", (List)rtnMap2.get("byChartr"));
					}else {
						resultMap.put("copr_class", null);
					}
				}else {
					String ksicCdLen = StringUtil.isNullToString(mapParameter.get("ksicCdLen"));
					if("3".equals(ksicCdLen) || "4".equals(ksicCdLen) || "5".equals(ksicCdLen)) {						
						result = session.selectList("catchmentArea.selectCoprList5", mapParameter);
						if(result != null && result.size() > 0 && result.get(0) != null){

							int ksic_1_cnt = ServiceAreaBSCA.getTotalSum(result, "c01_", 3);
							int ksic_2_cnt = ServiceAreaBSCA.getTotalSum(result, "c02_", 3);
							int ksic_3_cnt = ServiceAreaBSCA.getTotalSum(result, "c03_", 3);
							int ksic_4_cnt = 0;
							if("4".equals(ksicCdLen) || "5".equals(ksicCdLen)) {	
								ksic_4_cnt = ServiceAreaBSCA.getTotalSum(result, "c04_", 3);
							}
							int ksic_5_cnt = 0;
							if("5".equals(ksicCdLen)) {
								ksic_5_cnt = ServiceAreaBSCA.getTotalSum(result, "c05_", 3);
							}
						
							HashMap hm = (HashMap)result.get(0);
							if(ksic_1_cnt > -1) {
								hm.put("ksic_1_cnt", ksic_1_cnt);
							}else {
								hm.put("ksic_1_cnt", 0);
							}
							if(ksic_2_cnt > -1) {
								hm.put("ksic_2_cnt", ksic_2_cnt);
							}else {
								hm.put("ksic_2_cnt", 0);
							}
							if(ksic_3_cnt > -1) {
								hm.put("ksic_3_cnt", ksic_3_cnt);
							}else {
								hm.put("ksic_3_cnt", 0);
							}
							if("4".equals(ksicCdLen) || "5".equals(ksicCdLen)) {
								if(ksic_4_cnt > -1) {
									hm.put("ksic_4_cnt", ksic_4_cnt);
								}else {
									hm.put("ksic_4_cnt", 0);
								}
							}
							if("5".equals(ksicCdLen)) {
								if(ksic_5_cnt > -1) {
									hm.put("ksic_5_cnt", ksic_5_cnt);
								}else {
									hm.put("ksic_5_cnt", 0);
								}
							}

							resultMap.put("copr_class", result);
						}else {
							// 코드명 생성절 때문에 여기가 수행되진 않음
							resultMap.put("copr_class", null);
						}	
					}else {
						Map rtnMap2 = null;
						result = session.selectList("catchmentArea.selectCoprList3", mapParameter);
						if(result != null && result.size() > 0){						
							kwMap.put("kw_year", "ksic_cd");
							kwMap.put("kw_grpNm", "ksic_nm");
							kwMap.put("kw_org", "copr_cnt");
							kwMap.put("kw_sca", "copr_bsca");						
							kwMap.put("rt_col_tot_byChartr", "copr_cnt");
							
							rtnMap2 = ServiceAreaBSCA.bscaT02(result, 3, kwMap, "C");	
						}
						
						if(rtnMap2 != null && rtnMap2.get("byChartr") != null) {
							resultMap.put("copr_class", (List)rtnMap2.get("byChartr"));
						}else {
							resultMap.put("copr_class", null);
						}						
					}	
				}
				//SGIS4_1025_생활권역 끝
			}
			
			// employee:종사자
			if("Y".equals((String)mapParameter.get("isCharacteristicsEmployee"))) {
//				result = session.selectList("catchmentArea.selectCharacteristicsCoprList", mapParameter );
//				resultMap.put("employee", result);
				
				result = session.selectList("catchmentArea.selectCoprList", mapParameter);					
				if(result != null && result.size() > 0){						
					kwMap.put("kw_year", "base_year");
					//kwMap.put("kw_gridCd", "grid_cd");
					kwMap.put("kw_org", "employee_cnt");
					kwMap.put("kw_sca", "employee_bsca");					
					kwMap.put("rt_col_tot_byChartr", "employee_cnt");
					
					rtnMap = ServiceAreaBSCA.bscaT02(result, 3, kwMap, "C");	
				}
				
				if(rtnMap != null && rtnMap.get("byChartr") != null) {
					resultMap.put("employee", (List)rtnMap.get("byChartr"));
				}else {
					resultMap.put("employee", null);
				}
				
				//SGIS4_1025_생활권역 시작
				String isLifeBiz = StringUtil.isNullToString(mapParameter.get("isLifeBiz"));
				if("Y".equals(isLifeBiz)) {				
					Map rtnMap2 = null;
					result = session.selectList("catchmentArea.selectCoprList2", mapParameter);
					if(result != null && result.size() > 0){						
						kwMap.put("kw_year", "theme_cd");
						kwMap.put("kw_grpNm", "s_theme_cd_nm");
						kwMap.put("kw_org", "employee_cnt");
						kwMap.put("kw_sca", "employee_bsca");						
						kwMap.put("rt_col_tot_byChartr", "employee_cnt");
						
						rtnMap2 = ServiceAreaBSCA.bscaT02(result, 3, kwMap, "C");	
					}
					
					if(rtnMap2 != null && rtnMap2.get("byChartr") != null) {
						resultMap.put("employee_class", (List)rtnMap2.get("byChartr"));
					}else {
						resultMap.put("employee_class", null);
					}
				}else {
					String ksicCdLen = StringUtil.isNullToString(mapParameter.get("ksicCdLen"));
					if("3".equals(ksicCdLen) || "4".equals(ksicCdLen) || "5".equals(ksicCdLen)) {						
						result = session.selectList("catchmentArea.selectCoprList5", mapParameter);
						if(result != null && result.size() > 0 && result.get(0) != null){

							int ksic_1_cnt = ServiceAreaBSCA.getTotalSum(result, "c01_", 3);
							int ksic_2_cnt = ServiceAreaBSCA.getTotalSum(result, "c02_", 3);
							int ksic_3_cnt = ServiceAreaBSCA.getTotalSum(result, "c03_", 3);
							int ksic_4_cnt = 0;
							if("4".equals(ksicCdLen) || "5".equals(ksicCdLen)) {	
								ksic_4_cnt = ServiceAreaBSCA.getTotalSum(result, "c04_", 3);
							}
							int ksic_5_cnt = 0;
							if("5".equals(ksicCdLen)) {
								ksic_5_cnt = ServiceAreaBSCA.getTotalSum(result, "c05_", 3);
							}
						
							HashMap hm = (HashMap)result.get(0);
							if(ksic_1_cnt > -1) {
								hm.put("ksic_1_cnt", ksic_1_cnt);
							}else {
								hm.put("ksic_1_cnt", 0);
							}
							if(ksic_2_cnt > -1) {
								hm.put("ksic_2_cnt", ksic_2_cnt);
							}else {
								hm.put("ksic_2_cnt", 0);
							}
							if(ksic_3_cnt > -1) {
								hm.put("ksic_3_cnt", ksic_3_cnt);
							}else {
								hm.put("ksic_3_cnt", 0);
							}
							if("4".equals(ksicCdLen) || "5".equals(ksicCdLen)) {
								if(ksic_4_cnt > -1) {
									hm.put("ksic_4_cnt", ksic_4_cnt);
								}else {
									hm.put("ksic_4_cnt", 0);
								}
							}
							if("5".equals(ksicCdLen)) {
								if(ksic_5_cnt > -1) {
									hm.put("ksic_5_cnt", ksic_5_cnt);
								}else {
									hm.put("ksic_5_cnt", 0);
								}
							}

							resultMap.put("employee_class", result);							
						}else {
							// 코드명 생성절 때문에 여기가 수행되진 않음
							resultMap.put("employee_class", null);
						}	
					}else {
						Map rtnMap2 = null;
						result = session.selectList("catchmentArea.selectCoprList3", mapParameter);
						if(result != null && result.size() > 0){						
							kwMap.put("kw_year", "ksic_cd");
							kwMap.put("kw_grpNm", "ksic_nm");
							kwMap.put("kw_org", "employee_cnt");
							kwMap.put("kw_sca", "employee_bsca");						
							kwMap.put("rt_col_tot_byChartr", "employee_cnt");
							
							rtnMap2 = ServiceAreaBSCA.bscaT02(result, 3, kwMap, "C");	
						}
						
						if(rtnMap2 != null && rtnMap2.get("byChartr") != null) {
							resultMap.put("employee_class", (List)rtnMap2.get("byChartr"));
						}else {
							resultMap.put("employee_class", null);
						}						
					}	
				}
				//SGIS4_1025_생활권역 끝				
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
		mapParameter.put("securityGb", SECURITY_MODE);
		
		// 인구
		mapParameter.put("isCharacteristicsPops", "N");
		if(mapParameter.containsKey("pops_cond")) {
			String pops_cond = StringUtil.isNullToString(mapParameter.get("pops_cond"));			
			if(!"".equals(pops_cond)){				
				String[] splitStr = pops_cond.split("_");
				if(splitStr.length >= 3) {
					String gender = StringUtil.isNullToString(splitStr[1]);
					String ageFromCd = StringUtil.isNullToString(splitStr[2]);
					String ageToCd = "";
					if(splitStr.length >= 4) {
						ageToCd = StringUtil.isNullToString(splitStr[3]);
					}
					
					if(!"".equals(gender) && !"all".equals(gender)){
						mapParameter.put("gender", gender);
					}
					
					if(!"".equals(ageFromCd) && !"all".equals(ageFromCd)){
						mapParameter.put("ageFromCd", ageFromCd);
						if(!"".equals(ageToCd) && !ageFromCd.equals(ageToCd)) {
							mapParameter.put("ageToCd", ageToCd);
							mapParameter.put("isRangeSch", "Y");
						} else {
							mapParameter.put("isRangeSch", "N");
						}						
					}
					
					mapParameter.put("isCharacteristicsPops", "Y");
				}				
			}								
		}
		
		// 가구
		mapParameter.put("isCharacteristicsFamily", "N");
		if(mapParameter.containsKey("family_cond")) {
			String family_cond = StringUtil.isNullToString(mapParameter.get("family_cond"));			
			if(!"".equals(family_cond)){
				
				String[] splitStr = family_cond.split("_");				
				if(splitStr.length >= 2) {
					
					String hType = StringUtil.isNullToString(splitStr[1]);
					if(!"".equals(hType) && !"all".equals(hType)){					
						String householdType[] = hType.split(",");				
						if(householdType.length > 0) {
							mapParameter.put("household_type", householdType);
						}
					}
					mapParameter.put("isCharacteristicsFamily", "Y");
				}				
			}								
		}		
		
		// 주택
		mapParameter.put("isCharacteristicsHouse", "N");
		if(mapParameter.containsKey("house_cond")) {
			String house_cond = StringUtil.isNullToString(mapParameter.get("house_cond"));			
			if(!"".equals(house_cond)){								
				String[] splitStr = house_cond.split("_");
				if(splitStr.length >= 4) {
					String rType = StringUtil.isNullToString(splitStr[1]);
					if(!"".equals(rType) && !"all".equals(rType)){
						String rdResidType[] = rType.split(",");				
						if(rdResidType.length > 0) {
							mapParameter.put("rd_resid_type", rdResidType);
						}
					}
					
					String const_year = StringUtil.isNullToString(splitStr[2]);
					if(!"".equals(const_year) && !"all".equals(const_year)){
						mapParameter.put("const_year", const_year);
					}
					
					String house_area_cd = StringUtil.isNullToString(splitStr[3]);
					if(!"".equals(house_area_cd) && !"all".equals(house_area_cd)){
						String houseAreaCd[] = house_area_cd.split(",");				
						if(houseAreaCd.length > 0) {
							mapParameter.put("house_area_cd", houseAreaCd);
						}
					}					
					
					mapParameter.put("isCharacteristicsHouse", "Y");
				}				
			}								
		}		

		// 사업체
		mapParameter.put("isCharacteristicsCopr", "N");
		if(mapParameter.containsKey("copr_cond")) {
			String copr_cond = StringUtil.isNullToString(mapParameter.get("copr_cond"));			
			if(!"".equals(copr_cond)){
				
				String[] splitStr = copr_cond.split("_");
				//SGIS4_생활권역 시작
				if(splitStr.length >= 3) {
					String isLifeBiz = "N";		// 주요 생활업종 여부
					if(splitStr.length >= 4) {
						isLifeBiz = StringUtil.isNullToString(splitStr[3]);												
					}
					mapParameter.put("isLifeBiz", isLifeBiz);

					String ksic_3_cd = StringUtil.isNullToString(splitStr[2]);
					if(!"".equals(ksic_3_cd) && !"all".equals(ksic_3_cd)){					
						mapParameter.put("copr_ksic_3_cd", ksic_3_cd);
						
						if(!"Y".equals(isLifeBiz) && ksic_3_cd.length() == 1) {
							mapParameter.put("isMainCl", "Y");
						}
						
						//SGIS4_1025_생활권역 시작
						mapParameter.put("ksicCdLen", ksic_3_cd.length());
						//SGIS4_1025_생활권역 끝
					}					
					
					mapParameter.put("isCharacteristicsCopr", "Y");   
				}
				//SGIS4_생활권역 끝
			}								
		}

		// 종사자
		mapParameter.put("isCharacteristicsEmployee", "N");
		if(mapParameter.containsKey("employee_cond")) {
			String employee_cond = StringUtil.isNullToString(mapParameter.get("employee_cond"));			
			if(!"".equals(employee_cond)){
				
				String[] splitStr = employee_cond.split("_");
				//SGIS4_생활권역 시작
				if(splitStr.length >= 3) {
					String isLifeBiz = "N";		// 주요 생활업종 여부
					if(splitStr.length >= 4) {
						isLifeBiz = StringUtil.isNullToString(splitStr[3]);												
					}
					mapParameter.put("isLifeBiz", isLifeBiz);
					
					String ksic_3_cd = StringUtil.isNullToString(splitStr[2]);
					if(!"".equals(ksic_3_cd) && !"all".equals(ksic_3_cd)){					
						mapParameter.put("employee_ksic_3_cd", ksic_3_cd);
						
						if(!"Y".equals(isLifeBiz) && ksic_3_cd.length() == 1) {
							mapParameter.put("isMainCl", "Y");
						}
						
						//SGIS4_1025_생활권역 시작
						mapParameter.put("ksicCdLen", ksic_3_cd.length());
						//SGIS4_1025_생활권역 끝						
					}
					
					mapParameter.put("isCharacteristicsEmployee", "Y");
				}
				//SGIS4_생활권역 끝
			}								
		}

		// BSCA도 9016으로 구축
		if(mapParameter.containsKey("copr_base_year")){
			String copr_base_year = StringUtil.isNullToString(mapParameter.get("copr_base_year"));			
			if("2016".equals(copr_base_year)) {
				mapParameter.put("copr_base_year", "9016");
			}
		}
		
		//SGIS4_1025_생활권역 시작
		if(!mapParameter.containsKey("grid_level")){
			mapParameter.put("grid_level", "1k");
			mapParameter.put("girdUnit", "1k");
		}else {
			mapParameter.put("girdUnit", mapParameter.get("grid_level"));		// 영역 내 전체정보 쿼리(selectSrvAreaGridPopsList)를 같이 사용하기 위해서 추가
		}		
		
		String stats_class_gb = StringUtil.isNullToString(mapParameter.get("stats_class_gb"));			
		if("".equals(stats_class_gb)){
			mapParameter.put("stats_class_gb", "default");
		}
		
		mapParameter.put("isUseGeneratedGridNumber", "N");		// 영역 내 전체정보 쿼리(selectSrvAreaGridPopsList)를 같이 사용하기 위해서 추가 
		//SGIS4_1025_생활권역 끝
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
		area,
		radius,		
		pops_cond,
		family_cond,
		house_cond,
		copr_cond,
		//SGIS4_1025_생활권역 시작
		employee_cond,
		/*
		 * 인구: age_5(5세 단위), age_10(10세 단위, 기본값), age_define(주요 구간)
		 */
		stats_class_gb
		//SGIS4_1025_생활권역 끝
	}
}
