package egovframework.sgis.m2019.workroad.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.EgovStringUtil;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2019.workroad.service.MyNeighberhoodJobService;
import egovframework.sgis.m2019.workroad.service.mapper.kairos.MyNeighberhoodJobMapper;
import egovframework.sgis.m2019.workroad.service.mapper.kairos.WorkRoadMapper;


@Service("myNeighberhoodJobService")
@PropertySource("classpath:globals.properties")
public class MyNeighberhoodJobServiceImpl extends EgovAbstractServiceImpl implements MyNeighberhoodJobService {
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Autowired
	private Environment env;
	
	@Resource(name="myNeighberhoodJobMapper")
	private MyNeighberhoodJobMapper myNeighberhoodJobMapper;
	
	@Resource(name="workRoadMapper")
	private WorkRoadMapper workRoadMapper;
	
	
	/**
	 * 내 주변 일자리 건수
	 * @date 2019. 7. 3.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData myNeighberhoodJobListCount(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			String list_gubun = EgovStringUtil.isNullToString(params.get("list_gubun"));
			String my_sido_cd = EgovStringUtil.isNullToString(params.get("my_sido_cd"));
			String my_sgg_cd = EgovStringUtil.isNullToString(params.get("my_sgg_cd"));
			
			//일자리맞춤형서비스정보 조회
			List<Map<String, Object>> lvClmserInfoList = workRoadMapper.selectSrvDtJobClmserInfo(params);
			if(lvClmserInfoList != null && lvClmserInfoList.size() > 0) {
				Map<String, Object> lvClmserInfoMap = lvClmserInfoList.get(0);
				String member_id = EgovStringUtil.isNullToString(lvClmserInfoMap.get("member_id"));
				String lc_info_agree_yn = EgovStringUtil.isNullToString(lvClmserInfoMap.get("lc_info_agree_yn"));
				String sido_cd = EgovStringUtil.isNullToString(lvClmserInfoMap.get("sido_cd"));
				String sgg_cd = EgovStringUtil.isNullToString(lvClmserInfoMap.get("sgg_cd"));
				String entrprs_class_content = EgovStringUtil.isNullToString(lvClmserInfoMap.get("entrprs_class_content"));
				String jssfc_class_content = EgovStringUtil.isNullToString(lvClmserInfoMap.get("jssfc_class_content"));
				String salary_class_content = EgovStringUtil.isNullToString(lvClmserInfoMap.get("salary_class_content"));
				String emplym_class_content = EgovStringUtil.isNullToString(lvClmserInfoMap.get("emplym_class_content"));
				String acdmcr_class_content = EgovStringUtil.isNullToString(lvClmserInfoMap.get("acdmcr_class_content"));
				String career_class_content = EgovStringUtil.isNullToString(lvClmserInfoMap.get("career_class_content"));
				String indust_class_content = EgovStringUtil.isNullToString(lvClmserInfoMap.get("indust_class_content"));
				
				params.put("sido_cd",sido_cd);
				params.put("sgg_cd",sgg_cd);
				params.put("company_type",entrprs_class_content);
				params.put("classification",jssfc_class_content);
				params.put("salaly",salary_class_content);
				params.put("employment_type",emplym_class_content);
				params.put("academic_ability",acdmcr_class_content);
				params.put("career",career_class_content);
				params.put("industry_classification",indust_class_content);
			}
			
			//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박)
			if("1".equals(list_gubun)) {
				//시도코드 없으면 데이터 조회 불가 처리
				if("".equals(my_sido_cd)) my_sido_cd = "!";
				params.put("sido_cd",my_sido_cd);
				params.put("sgg_cd",my_sgg_cd);
			}
			else if("2".equals(list_gubun) || "3".equals(list_gubun)) {
				//시도코드 없으면 데이터 조회 불가 처리
				String sido_cd = EgovStringUtil.isNullToString(params.get("sido_cd"));
				if("".equals(sido_cd)) sido_cd = "!";
				params.put("sido_cd",sido_cd);
			}
			
			//기업형태
			String company_type = EgovStringUtil.isNullToString(params.get("company_type"));
			if(!"".equals(company_type)) {
				params.put("company_type_list", company_type.split(","));
			}
			//직종분류
			String classification = EgovStringUtil.isNullToString(params.get("classification"));
			if(!"".equals(classification)) {
				params.put("classification_list", classification.split(","));
			}
			//급여수준
			String salaly = EgovStringUtil.isNullToString(params.get("salaly"));
			if(!"".equals(salaly)) {
				params.put("salaly_list", salaly.split(","));
				String[] salaly_list = salaly.split(",");
				StringBuffer salaly_sql = new StringBuffer();
				salaly_sql.append("and ");
				salaly_sql.append("( ");
				salaly_sql.append("1=2 ");
				for (String salaly_str : salaly_list) {
					if(salaly_str.lastIndexOf("_") >= 0) {
						String salaly_b_class_cd = salaly_str.substring(0,salaly_str.lastIndexOf("_"));
						String salaly_s_class_cd = salaly_str.substring(salaly_str.lastIndexOf("_")+1);
						String salaly_wage_type = salaly_b_class_cd.substring(salaly_b_class_cd.lastIndexOf("_")+1);
						Map<String,Object> tempParams = new HashMap<String,Object>();
						tempParams.put("b_class_cd", salaly_b_class_cd);
						tempParams.put("s_class_cd", salaly_s_class_cd);
						List<Map<String, Object>> tempResultList = workRoadMapper.selectCmmCdComcd(tempParams);
						if(tempResultList != null && tempResultList.size() > 0) {
							String lvTempExp = EgovStringUtil.isNullToString(tempResultList.get(0).get("exp"));
							BigDecimal lvTempSalaryFromBigDecimal = new BigDecimal(0.0);
							BigDecimal lvTempSalaryToBigDecimal = new BigDecimal(1000000000000.0);
							String[] lvTempSalaryList = lvTempExp.split("~");
							if(lvTempSalaryList.length == 1 || lvTempSalaryList.length == 2) {
								lvTempSalaryFromBigDecimal = new BigDecimal(EgovStringUtil.zeroConvert(lvTempSalaryList[0]));
								if(lvTempSalaryList.length == 2 && EgovStringUtil.zeroConvert(lvTempSalaryList[1]) != 0) {
									lvTempSalaryToBigDecimal = new BigDecimal(EgovStringUtil.zeroConvert(lvTempSalaryList[1]));
								}
								salaly_sql.append("or ( ");
								salaly_sql.append("t.wage_type = '"+salaly_wage_type+"' ");
								salaly_sql.append("and t.salary between "+lvTempSalaryFromBigDecimal+" and "+lvTempSalaryToBigDecimal+" ");
								salaly_sql.append(") ");
							}
						}
					}
				}
				salaly_sql.append(")");
				params.put("salaly_sql", salaly_sql.toString());
			}
			//고용형태
			String employment_type = EgovStringUtil.isNullToString(params.get("employment_type"));
			if(!"".equals(employment_type)) {
				params.put("employment_type_list", employment_type.split(","));
			}
			//학력
			String academic_ability = EgovStringUtil.isNullToString(params.get("academic_ability"));
			if(!"".equals(academic_ability)) {
				params.put("academic_ability_list", academic_ability.split(","));
			}
			//경력
			String career = EgovStringUtil.isNullToString(params.get("career"));
			if(!"".equals(career)) {
				params.put("career_list", career.split(","));
			}
			//산업분류
			String industry_classification = EgovStringUtil.isNullToString(params.get("industry_classification"));
			if(!"".equals(industry_classification)) {
				params.put("industry_classification_list", industry_classification.split(","));
			}
			
			//조회
			int resultCount = myNeighberhoodJobMapper.myNeighberhoodJobListCount(params);
			result.put("resultCount", resultCount);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 내 주변 일자리 목록
	 * @date 2019. 6. 24.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData myNeighberhoodJobList(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			//기업형태
			String company_type = EgovStringUtil.isNullToString(params.get("company_type"));
			if(!"".equals(company_type)) {
				params.put("company_type_list", company_type.split(","));
			}
			//직종분류
			String classification = EgovStringUtil.isNullToString(params.get("classification"));
			if(!"".equals(classification)) {
				params.put("classification_list", classification.split(","));
			}
			//급여수준
			String salaly = EgovStringUtil.isNullToString(params.get("salaly"));
			if(!"".equals(salaly)) {
				params.put("salaly_list", salaly.split(","));
				String[] salaly_list = salaly.split(",");
				StringBuffer salaly_sql = new StringBuffer();
				salaly_sql.append("and ");
				salaly_sql.append("( ");
				salaly_sql.append("1=2 ");
				for (String salaly_str : salaly_list) {
					if(salaly_str.lastIndexOf("_") >= 0) {
						String salaly_b_class_cd = salaly_str.substring(0,salaly_str.lastIndexOf("_"));
						String salaly_s_class_cd = salaly_str.substring(salaly_str.lastIndexOf("_")+1);
						String salaly_wage_type = salaly_b_class_cd.substring(salaly_b_class_cd.lastIndexOf("_")+1);
						Map<String,Object> tempParams = new HashMap<String,Object>();
						tempParams.put("b_class_cd", salaly_b_class_cd);
						tempParams.put("s_class_cd", salaly_s_class_cd);
						List<Map<String, Object>> tempResultList = workRoadMapper.selectCmmCdComcd(tempParams);
						if(tempResultList != null && tempResultList.size() > 0) {
							String lvTempExp = EgovStringUtil.isNullToString(tempResultList.get(0).get("exp"));
							BigDecimal lvTempSalaryFromBigDecimal = new BigDecimal(0.0);
							BigDecimal lvTempSalaryToBigDecimal = new BigDecimal(1000000000000.0);
							String[] lvTempSalaryList = lvTempExp.split("~");
							if(lvTempSalaryList.length == 1 || lvTempSalaryList.length == 2) {
								lvTempSalaryFromBigDecimal = new BigDecimal(EgovStringUtil.zeroConvert(lvTempSalaryList[0]));
								if(lvTempSalaryList.length == 2 && EgovStringUtil.zeroConvert(lvTempSalaryList[1]) != 0) {
									lvTempSalaryToBigDecimal = new BigDecimal(EgovStringUtil.zeroConvert(lvTempSalaryList[1]));
								}
								salaly_sql.append("or ( ");
								salaly_sql.append("t.wage_type = '"+salaly_wage_type+"' ");
								salaly_sql.append("and t.salary between "+lvTempSalaryFromBigDecimal+" and "+lvTempSalaryToBigDecimal+" ");
								salaly_sql.append(") ");
							}
						}
					}
				}
				salaly_sql.append(")");
				params.put("salaly_sql", salaly_sql.toString());
			}
			//고용형태
			String employment_type = EgovStringUtil.isNullToString(params.get("employment_type"));
			if(!"".equals(employment_type)) {
				params.put("employment_type_list", employment_type.split(","));
			}
			//학력
			String academic_ability = EgovStringUtil.isNullToString(params.get("academic_ability"));
			if(!"".equals(academic_ability)) {
				params.put("academic_ability_list", academic_ability.split(","));
			}
			//경력
			String career = EgovStringUtil.isNullToString(params.get("career"));
			if(!"".equals(career)) {
				params.put("career_list", career.split(","));
			}
			//산업분류
			String industry_classification = EgovStringUtil.isNullToString(params.get("industry_classification"));
			if(!"".equals(industry_classification)) {
				params.put("industry_classification_list", industry_classification.split(","));
			}
			
			//조회
			List<Map<String, Object>> resultList = myNeighberhoodJobMapper.myNeighberhoodJobList(params);
			if(resultList != null && resultList.size() > 0) result.put("resultCount", resultList.size()); 
			else result.put("resultCount", 0);
			
			//거리계산
			double my_x = EgovStringUtil.zeroConvertDouble(params.get("my_x"));
			double my_y = EgovStringUtil.zeroConvertDouble(params.get("my_y"));
			for (Map<String, Object> resultMap : resultList) {
				double pt_x = EgovStringUtil.zeroConvertDouble(resultMap.get("pt_x"));
				double pt_y = EgovStringUtil.zeroConvertDouble(resultMap.get("pt_y"));
				//거리 있음
				if(my_x != 0.0 && my_y != 0.0 && pt_x != 0.0 && pt_y != 0.0) {
					//거리계산 미터
					double pt_distance = Math.round(Math.sqrt(Math.pow(Math.abs(my_x-pt_x),2) + Math.pow(Math.abs(my_y-pt_y),2)));
					String pt_distance_nm = pt_distance+"m";
					//거리계산 킬로미터 (10km미만)
					if(pt_distance >= 1000.0 && pt_distance < 10000.0) {
						pt_distance_nm = (Math.round(pt_distance/100.0)/10.0)+"km";
					}
					//거리계산 킬로미터 (10km이상)
					else if (pt_distance >= 10000.0) {
						pt_distance_nm = Math.round(pt_distance/1000.0)+"km";
					}
					resultMap.put("pt_distance", pt_distance);
					resultMap.put("pt_distance_nm", pt_distance_nm);
				}
				//거리 없음
				else {
					resultMap.put("pt_distance", -1.0);
					resultMap.put("pt_distance_nm", "-m");
				}
			}
			
			//생활환경 정보 상세조회
			Map<String, Object> tempParams = new HashMap<String,Object>();
			tempParams.put("sido_cd", params.get("sido_cd"));
			tempParams.put("sgg_cd", params.get("sgg_cd"));
			tempParams.put("main_yn", "Y");
			List<Map<String, Object>> resultList2 = myNeighberhoodJobMapper.livingEnvironmentSelect2(tempParams);
			if(resultList2 != null && resultList2.size() > 0) result.put("resultCount2", resultList2.size());
			else result.put("resultCount2", 0);
			result.put("resultList2", resultList2);
			
			result.put("resultList", resultList);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 내 주변 일자리 조회
	 * @date 2019. 6. 24.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData myNeighberhoodJobSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			//조회
			Map<String, Object> resultData = myNeighberhoodJobMapper.myNeighberhoodJobSelect(params);
			if(resultData != null) result.put("resultCount", 1); 
			else result.put("resultCount", 0);
			result.put("resultData", resultData);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 생활환경 정보 조회
	 * @date 2019. 7. 8.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData livingEnvironmentSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			//생활환경 정보 상세조회
			List<Map<String, Object>> resultList2 = myNeighberhoodJobMapper.livingEnvironmentSelect2(params);
			if(resultList2 != null && resultList2.size() > 0) result.put("resultCount2", resultList2.size()); 
			else result.put("resultCount2", 0);
			result.put("resultList2", resultList2);
			
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 생활환경 정보 상세 조회
	 * @date 2020.09.21
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData livingEnvironmentDetailSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			//지역정보 조회 (시군구/시도/읍면동)
			Map<String, Object> resultAdmInfo = workRoadMapper.selectAdmInfo(params);
			result.put("resultAdmInfo", resultAdmInfo);
			
			//생활환경 정보 조회(전국평균)
			Map<String, Object> tempParams = new HashMap<String,Object>();
			List<Map<String, Object>> resultList0 = myNeighberhoodJobMapper.livingEnvironmentSelect(tempParams);
			if(resultList0 != null && resultList0.size() > 0) result.put("resultCount0", resultList0.size()); 
			else result.put("resultCount0", 0);
			result.put("resultList0", resultList0);
			
			//생활환경 정보 조회
			List<Map<String, Object>> resultList1 = myNeighberhoodJobMapper.livingEnvironmentSelect(params);
			if(resultList1 != null && resultList1.size() > 0) result.put("resultCount1", resultList1.size()); 
			else result.put("resultCount1", 0);
			result.put("resultList1", resultList1);
			
			//생활환경 정보 상세조회
			List<Map<String, Object>> resultList2 = myNeighberhoodJobMapper.livingEnvironmentSelect2(params);
			if(resultList2 != null && resultList2.size() > 0) result.put("resultCount2", resultList2.size()); 
			else result.put("resultCount2", 0);
			result.put("resultList2", resultList2);
			
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
}	