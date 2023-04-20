package egovframework.sgis.m2020.statsMe.service.impl;

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
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2019.workroad.service.mapper.kairos.WorkRoadMapper;
import egovframework.sgis.m2020.statsMe.service.StateMeService;
import egovframework.sgis.m2020.statsMe.service.mapper.kairos.StateMeMapper;

@Service("statsMeService")
@PropertySource("classpath:globals.properties")
public class StatsMeServiceImpl extends EgovAbstractServiceImpl implements StateMeService{
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Autowired
	private Environment env;
	
	@Resource(name="stateMeMapper")
	private StateMeMapper stateMeMapper;
	
	/**
	 * 공통코드 조회
	 * @date 2020. 6. 8.
	 * @author (주)아이티밴드 주형식
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectCmmCdComcd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			List<Map<String, Object>> resultList = stateMeMapper.selectCmmCdComcd(params);
			result.put("resultList", resultList);
			if(resultList != null && resultList.size() > 0) result.put("resultCount", resultList.size()); 
			else result.put("resultCount", 0);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}

	@Override
	public JsonData selectCatalogData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			// 통계지리 정보 목록 조회
			List<Map<String, Object>> statsGrphInfoList = stateMeMapper.selectStatsGrphInfoList(params);
			result.put("statsGrphInfoList", statsGrphInfoList);
			
			// 통계지리 정보 관련 SGIS 서비스 목록 조회
			List<Map<String, Object>> statsGrphInfoSgisSrvList = stateMeMapper.selectStatsGrphInfoSgisSrvList(params);
			result.put("statsGrphInfoSgisSrvList", statsGrphInfoSgisSrvList);
			
//			if(resultList != null && resultList.size() > 0) result.put("resultCount", resultList.size()); 
//			else result.put("resultCount", 0);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 카탈로그 1,2차 키워드검색 목록 조회
	@Override
	public JsonData selectCtlgKwrdList(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			Map<String,Object> mapParameter = params;
			
			// 생애주기
			String lifeCycleItemId = (String) mapParameter.get("lifeCycleItemId");
			System.err.println("lifeCycleItemId = " + lifeCycleItemId);
			String[] lifeCycleItemIdList = null;
			if(lifeCycleItemId != null && !lifeCycleItemId.equals("")) {
				lifeCycleItemIdList = lifeCycleItemId.split(",");
			}
			mapParameter.put("lifeCycleItemIdList", lifeCycleItemIdList);
			// 관심분야
			String interestRealmItemId = (String) mapParameter.get("interestRealmItemId");
			String[] interestRealmItemIdList = null;
			if(interestRealmItemId != null && !interestRealmItemId.equals("")) {
				interestRealmItemIdList = interestRealmItemId.split(",");
			}
			mapParameter.put("interestRealmItemIdList", interestRealmItemIdList);
			List<Map<String, Object>> ctlgKwrdList2 = stateMeMapper.selectCtlgKwrdList(mapParameter);
			result.put("ctlgKwrdList2", ctlgKwrdList2);
			
			mapParameter.remove("lifeCycleItemIdList");
			mapParameter.remove("interestRealmItemIdList");
			List<Map<String, Object>> ctlgKwrdList = stateMeMapper.selectCtlgKwrdList(mapParameter);
			result.put("ctlgKwrdList", ctlgKwrdList);
			
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}

	@Override
	public JsonData getStatsMeCatalogData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			Map<String,Object> mapParameter = params;
			
			// 생애주기
			String lifeCycleItemId = (String) mapParameter.get("lifeCycleItemId");
			System.err.println("lifeCycleItemId = " + lifeCycleItemId);
			String[] lifeCycleItemIdList = null;
			if(lifeCycleItemId != null && !lifeCycleItemId.equals("")) {
				lifeCycleItemIdList = lifeCycleItemId.split(",");
			}
			mapParameter.put("lifeCycleItemIdList", lifeCycleItemIdList);
			// 관심분야
			String interestRealmItemId = (String) mapParameter.get("interestRealmItemId");
			String[] interestRealmItemIdList = null;
			if(interestRealmItemId != null && !interestRealmItemId.equals("")) {
				interestRealmItemIdList = interestRealmItemId.split(",");
			}
			mapParameter.put("interestRealmItemIdList", interestRealmItemIdList);
			
			// 모바일 검색화면에서 조회 시 통계지리정보ID 셋팅 
			String statDataId = (String)mapParameter.get("statDataId");
			
			List<Map<String, Object>> statsGrphInfoList = null;
			int statsGrphInfoListCount = 0; 	// 2020.09.16[한광희] 통계지리목록 건수 추가
			if(statDataId != null && !statDataId.equals("")) {
				// 검색화면 조회시 통계지리 정보 목록 조회
				statsGrphInfoList = stateMeMapper.selectMainSearchStatsInfoList(mapParameter);
			} else {
				// 통계지리 정보 목록 조회
				statsGrphInfoList = stateMeMapper.selectStatsGrphInfoList(mapParameter);
				statsGrphInfoListCount = stateMeMapper.selectStatsGrphInfoListCount(mapParameter);	// 2020.09.16[한광희] 통계지리목록 건수 추가 
			}
			result.put("statsGrphInfoList", statsGrphInfoList);
			result.put("statsGrphInfoListCount", statsGrphInfoListCount);	//2020.09.16[한광희] 통계지리목록 건수 추가
			
			/* 2020.09.21[한광희] My통계로 쿼리 수정 START
			// 통계지리 정보 관련 SGIS 서비스 목록 조회
			List<Map<String, Object>> statsGrphInfoSgisSrvList = stateMeMapper.selectStatsGrphInfoSgisSrvList(mapParameter);
			result.put("statsGrphInfoSgisSrvList", statsGrphInfoSgisSrvList);
			2020.09.21[한광희] My통계로 쿼리 수정 END */
			
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 메인화면 생애주기/관심분야 조회
	@Override
	public JsonData getMainStatsMe(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			Map<String,Object> mapParameter = params;
			
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 START */
			// 생애주기
			String lifeCycleItemId = (String) mapParameter.get("lifeCycleItemId");
			String[] lifeCycleItemIdList = null;
			if(lifeCycleItemId != null && !lifeCycleItemId.equals("")) {
				lifeCycleItemIdList = lifeCycleItemId.split(",");
			}
			mapParameter.put("lifeCycleItemIdList", lifeCycleItemIdList);
			// 관심분야
			String interestRealmItemId = (String) mapParameter.get("interestRealmItemId");
			String[] interestRealmItemIdList = null;
			if(interestRealmItemId != null && !interestRealmItemId.equals("")) {
				interestRealmItemIdList = interestRealmItemId.split(",");
			}
			mapParameter.put("interestRealmItemIdList", interestRealmItemIdList);
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 END */
			
			List<Map<String, Object>> statsMeList = stateMeMapper.selectMainStatsMeList(mapParameter);
			
			result.put("statsMeList", statsMeList);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
}
