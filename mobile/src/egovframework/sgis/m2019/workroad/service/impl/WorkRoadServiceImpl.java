package egovframework.sgis.m2019.workroad.service.impl;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.EgovStringUtil;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2019.workroad.service.WorkRoadService;
import egovframework.sgis.m2019.workroad.service.mapper.kairos.WorkRoadMapper;


@Service("workRoadService")
@PropertySource("classpath:globals.properties")
public class WorkRoadServiceImpl extends EgovAbstractServiceImpl implements WorkRoadService {
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Autowired
	private Environment env;
	
	@Resource(name="workRoadMapper")
	private WorkRoadMapper workRoadMapper;
	
	/**
	 * 공통코드 조회
	 * @date 2019. 6. 24.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectCmmCdComcd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			List<Map<String, Object>> resultList = workRoadMapper.selectCmmCdComcd(params);
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
	
	//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
	/**
	 * 공통코드 조회(한번에 불러오기)
	 * @date 2019. 9. 30.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectCmmCdComcdAll(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			List<Map<String, Object>> resultList = new ArrayList<>(); 
			
			//기업형태
			params.clear();
			params.put("b_class_cd", "ENTTYP");
			resultList = workRoadMapper.selectCmmCdComcd(params);
			result.put("ENTTYP", resultList);
			if(resultList != null && resultList.size() > 0) result.put("ENTTYP_count", resultList.size()); 
			else result.put("ENTTYP_count", 0);
			
			//직종분류
			params.clear();
			params.put("b_class_cd", "RCRJSS");
			params.put("s_class_cd_len", 2);
			resultList = workRoadMapper.selectCmmCdComcd(params);
			result.put("RCRJSS", resultList);
			if(resultList != null && resultList.size() > 0) result.put("RCRJSS_count", resultList.size()); 
			else result.put("RCRJSS_count", 0);
			
			//급여수준
			params.clear();
			params.put("b_class_cd", "WAGETY");
			resultList = workRoadMapper.selectCmmCdComcd(params);
			result.put("WAGETY", resultList);
			if(resultList != null && resultList.size() > 0) result.put("WAGETY_count", resultList.size()); 
			else result.put("WAGETY_count", 0);
			for (Map<String, Object> resultMap : resultList) {
				String cd = EgovStringUtil.isNullToString(resultMap.get("cd"));
				params.clear();
				params.put("b_class_cd", "WGTY_"+cd);
				List<Map<String, Object>> resultList2 = workRoadMapper.selectCmmCdComcd(params);
				result.put("WGTY_"+cd, resultList2);
				if(resultList2 != null && resultList2.size() > 0) result.put("WGTY_"+cd+"_count", resultList2.size()); 
				else result.put("WGTY_"+cd+"_count", 0);
			}
			
			//고용형태
			params.clear();
			params.put("b_class_cd", "EMPTYP");
			resultList = workRoadMapper.selectCmmCdComcd(params);
			result.put("EMPTYP", resultList);
			if(resultList != null && resultList.size() > 0) result.put("EMPTYP_count", resultList.size()); 
			else result.put("EMPTYP_count", 0);

			//학력
			params.clear();
			params.put("b_class_cd", "ACDMCR");
			resultList = workRoadMapper.selectCmmCdComcd(params);
			result.put("ACDMCR", resultList);
			if(resultList != null && resultList.size() > 0) result.put("ACDMCR_count", resultList.size()); 
			else result.put("ACDMCR_count", 0);
			
			//경력
			params.clear();
			params.put("b_class_cd", "CAREER");
			resultList = workRoadMapper.selectCmmCdComcd(params);
			result.put("CAREER", resultList);
			if(resultList != null && resultList.size() > 0) result.put("CAREER_count", resultList.size()); 
			else result.put("CAREER_count", 0);
			
			//산업분류
	    	params.clear();
			params.put("b_class_cd", "INDCLA");
			params.put("s_class_cd_len", 1);
			resultList = workRoadMapper.selectCmmCdComcd(params);
			result.put("INDCLA", resultList);
			if(resultList != null && resultList.size() > 0) result.put("INDCLA_count", resultList.size()); 
			else result.put("INDCLA_count", 0);
			
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
	
	/**
	 * 일자리맞춤형서비스정보 조회
	 * @date 2019. 7. 2.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectSrvDtJobClmserInfo(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			List<Map<String, Object>> resultList = workRoadMapper.selectSrvDtJobClmserInfo(params);
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
	
	/**
	 * 일자리맞춤형서비스정보 수정/등록
	 * @date 2019. 7. 2.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData mergeSrvDtJobClmserInfo(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			int resultCount = 0;
			resultCount = workRoadMapper.updateSrvDtJobClmserInfo(params);
			if(resultCount == 0) resultCount = workRoadMapper.insertSrvDtJobClmserInfo(params);
			result.put("resultCount", resultCount);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 시도코드 조회
	 * @date 2019. 07. 04.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectSidoCd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("resultList", workRoadMapper.selectSidoCd(params));
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 시군구코드 조회
	 * @date 2019. 07. 08.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectSggCd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("resultList", workRoadMapper.selectSggCd(params));
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 일자리 맵 서비스 통계 데이터 조회 - 2018.10.17	ywKim	신규
	 * @date 2019. 07. 15.
	 * @author 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectJobStatData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
//			logger.info(">> Parameters =============================== ");
//			logger.info("type : " + params.get("type"));
//			logger.info("base_year : " + params.get("base_year"));
//			logger.info("mode : " + params.get("mode"));
//			logger.info("series_cd : " + params.get("series_cd"));
//			logger.info(">> ========================================== ");

			String target = "";	// 대상(2016년 데이터 or 2017년 데이터) 내용
			List<Object> categoryes = new ArrayList<Object>();			
			Map<String, Object> series = new HashMap<String, Object>();
			List<Map<String,Object>> commonCdList = null;
			List<Object> seriesList = new ArrayList<Object>();
			String type = params.get("type").toString();
			int mode = EgovStringUtil.zeroConvert(params.get("mode"));
			String categoryComCd = String.format("%s%02dC", type, mode);
			String seriesComCd = String.format("%s%02dS", type, mode);
			String seriesCd = EgovStringUtil.isNullToString(params.get("series_cd"));
//			int labrrCnt = EgovStringUtil.zeroConvert(params.get("labrrCnt"));
			String link_id = params.get("link_id").toString();	// 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경
			
			/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 START */
			params.put("mode", String.format("%02d", mode));
			String tempBaseYear = workRoadMapper.selectJobStatDataBaseYear(params);
			if(tempBaseYear != null) {
				params.put("base_year", tempBaseYear);
			}
			/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 END */
			
			// 1. 대상(2016년 데이터 or 2017년 데이터) 조회
			params.put("b_class_cd", String.format("%sTAR", type));
			params.put("s_class_cd", params.get("base_year"));
			commonCdList = workRoadMapper.selectCmmCdComcd(params);
			if (commonCdList.size() == 1 && commonCdList.get(0) != null) {
				target = commonCdList.get(0).get("nm").toString();
			}
			params.remove("s_class_cd");
			
			// 2. 카테고리 생성
			params.put("b_class_cd", categoryComCd);
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			//commonCdList = workRoadMapper.selectCmmCdComcd(params);			
			commonCdList = workRoadMapper.selectJobStatDataCommonCd(params);
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			for (int i = 0; i < commonCdList.size(); i++) {
				Map data = commonCdList.get(i);
				/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
				//categoryes.add(data.get("nm"));
				if("D3501".equals(link_id)) {
					categoryes.add(data.get("c1_nm"));
				} else {
					categoryes.add(data.get("c2_nm"));
				}
				/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			}	
			
			// 3. 시리즈 생성
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			/*params.put("b_class_cd", seriesComCd);
			if (seriesCd != null) {
				params.put("s_class_cd", seriesCd);
			}
			commonCdList = workRoadMapper.selectCmmCdComcd(params);			
			for (int i = 0; i < commonCdList.size(); i++) {
				Map data = commonCdList.get(i);
				series.put(data.get("cd").toString(), data.get("nm"));
			}
			params.remove("s_class_cd");*/
			Map seriesMapData = commonCdList.get(0);
			if("D3501".equals(link_id)) {
				series.put(seriesMapData.get("c2").toString(), seriesMapData.get("c2_nm"));
			} else {
				series.put(seriesMapData.get("c1").toString(), seriesMapData.get("c1_nm"));
			}
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
//			// 4. 시리즈 구성 (데이터 조회)
//			List<Map<String, Object>> dataList = null;			
//			params.put("mode", String.format("%02d", mode));
//			if (seriesCd != null) {
//				params.put("series_cd", seriesCd);
//			}
//			dataList = workRoadViewJobsService.selectJobStatData(params);
//			List seriesData = new ArrayList<Object>();
//			Map<String, Object> map = new HashMap<String, Object>();
//
//			// 4-1. 시리즈 이름 설정
//			String seriesName = (String)series.get(seriesCd);
//			map.put("name", seriesName);
//			
//			// 4-2. 시리즈 데이터 설정
//			for (int i = 0; i < dataList.size(); i++) {
//				Map data = dataList.get(i);
//				String sCd = data.get("series_cd").toString();
//								
//				if (data.containsKey("val")) {
//					double seriesVal = ((BigDecimal)data.get("val")).doubleValue();					
//					seriesData.add(seriesVal);
//				} else {
//					seriesData.add(null);
//				}
//			}			
//			map.put("data", seriesData);
//			
//			seriesList.add(map);
//			// End of 4. 시리즈 구성 (데이터 조회)
			List<Map<String, Object>> dataList = null;			
			params.put("mode", String.format("%02d", mode));
			dataList = workRoadMapper.selectJobStatData(params);
			String prevSeriesCd = "";
			List<Object> seriesData = null;
			Map<String, Object> map = null;
			
			for (int i = 0; i < dataList.size(); i++) {
				Map<String, Object> data = dataList.get(i);
				String sCd = data.get("series_cd").toString();
				
				// 새로운 시리즈 발견
				if (sCd.equals(prevSeriesCd) == false) {
					map = new HashMap<String, Object>();
					String seriesName = (String)series.get(data.get("series_cd").toString());
					
					map.put("name", seriesName);
					seriesData = new ArrayList<Object>();
					map.put("data", seriesData);
					
					seriesList.add(map);
				}
				
				if (data.containsKey("val")) {
					/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
					//double seriesVal = ((BigDecimal)data.get("val")).doubleValue();
					double seriesVal = Double.parseDouble((String) data.get("val"));
					/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
					seriesData.add(seriesVal);
				} else {
					seriesData.add(null);
				}
				
				prevSeriesCd = data.get("series_cd").toString();
			}

			result.put("target", target);
			result.put("categoryes", categoryes);
			result.put("series", seriesList);
			//logger.info("END Query - TXID[" + getApiId() + "] ");
			
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
}	