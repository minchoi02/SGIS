package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

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

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.WorkRoadService;
import kostat.sop.ServiceAPI.controller.service.WorkRoadViewJobsService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 일자리 맵 서비스 통계 데이터 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 * 		대상화면: 
 * 			1. 구인정보 목록 상세
 * 			2. 경력 선택 > 대졸자 첫 일자리  이동경로 조사
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.17	초기 작성
 *     2018.11.28	ywKim	변경: 구인정보 목록 상세화면의 챠트에서 1개 시리즈만 대상으로 하는 로직 적용
 *     2018.11.29	ywKim	변경: 이전 변경으로 인해 대졸자~ 챠트에 에러발생하여 일부소스 복구함.
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectJobStatData extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectJobStatData.class);

	@Resource(name="workRoadService")
	private WorkRoadService workRoadService;
	@Resource(name="workRoadViewJobsService")
	private WorkRoadViewJobsService workRoadViewJobsService;
	
	@Override
	public String getApiId() {
		return "112002";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		type,			// 데이터 유형 (공통코드 WRMTYP 참고)
						//   1. CGS : 대졸자 첫 일자리 통계
						//   2. JDS : 선택한 회사 상세 정보 통계
		base_year,		// 데이터 기준 년도 (공통코드 CGSTAR, JDSTAR 참고)
		mode,			// 통계 구분 (공통코드 CGSTYP, JDSTYP 참고)
		 				//   1. 첫 일자리 사업체 규모
		 				//   2. 전공계열별 첫 일자리 진출분야(산업)
		 				//   3. 전공계열별 사업체 규모
		 				//   4. 첫 일자리 월평균 소득
		 				//   5. 첫 일자리 적응의 어려운 점
		 				//   6. 대학 재학시 배웠으면 업무에 도움이 되었을 능력
		 				//   7. 첫 일자리 만족도
		 				//   8. 첫 일자리 유지 여부별 첫 일자리 적응의 어려운 점
		 				//   9. 성별 및 학교유형별 첫 일자리 그만둔 이유
		 				//   10. 전공계열별 첫 일자리 그만둔 이유
	}

	enum OptionParam{
		series_cd,		// 시리즈 코드 (구인정보 상세에서 단일 시리즈 조회용으로 변경됨 - 2018.11.28)
		
//		indust_class,	// 대분류코드 (1자리)
//		labrrCnt,		// 근로자수
		/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
		link_id,
		itm_id
		/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			logger.info(">> Parameters =============================== ");
			logger.info("type : " + req.getParameter("type"));
			logger.info("base_year : " + req.getParameter("base_year"));
			logger.info("mode : " + req.getParameter("mode"));
			logger.info("series_cd : " + req.getParameter("series_cd"));
			logger.info(">> ========================================== ");

			String target = "";	// 대상(2016년 데이터 or 2017년 데이터) 내용
			List categoryes = new ArrayList<Object>();			
			Map<String, Object> series = new HashMap<String, Object>();
			List<Map> commonCdList = null;
			List seriesList = new ArrayList<Object>();
			String type = req.getParameter("type").toString();
			int mode = Integer.parseInt(req.getParameter("mode"));
			String categoryComCd = String.format("%s%02dC", type, mode);
			String seriesComCd = String.format("%s%02dS", type, mode);
			String seriesCd = req.getParameter("series_cd");
//			int labrrCnt = Integer.parseInt(req.getParameter("labrrCnt"));
			String link_id = req.getParameter("link_id");	// 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경
			
			/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 START */
			mapParameter.put("mode", String.format("%02d", mode));
			String tempBaseYear = workRoadViewJobsService.selectJobStatDataBaseYear(mapParameter);
			if(tempBaseYear != null) {
				mapParameter.put("base_year", tempBaseYear);
			}
			/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 END */
			
			// 1. 대상(2016년 데이터 or 2017년 데이터) 조회
			mapParameter.put("b_class_cd", String.format("%sTAR", type));
			/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 START */
			mapParameter.put("s_class_cd", mapParameter.get("base_year"));
			/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 END */
			commonCdList = workRoadService.selectCommonCode(mapParameter);
			if (commonCdList.size() == 1 && commonCdList.get(0) != null) {
				target = commonCdList.get(0).get("nm").toString();
			}
			mapParameter.remove("s_class_cd");
			
			// 2. 카테고리 생성
			mapParameter.put("b_class_cd", categoryComCd);
			/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
			//commonCdList = workRoadService.selectCommonCode(mapParameter);			
			commonCdList = workRoadViewJobsService.selectJobStatDataCommonCd(mapParameter);
			/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
			for (int i = 0; i < commonCdList.size(); i++) {
				Map data = commonCdList.get(i);
				/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
				//categoryes.add(data.get("nm"));
				if("D3501".equals(link_id)) {
					categoryes.add(data.get("c1_nm"));
				} else {
					categoryes.add(data.get("c2_nm"));
				}
				/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
			}
			
			// 3. 시리즈 생성
			/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
			/*mapParameter.put("b_class_cd", seriesComCd);
			if (seriesCd != null) {
				mapParameter.put("s_class_cd", seriesCd);
			}
			commonCdList = workRoadService.selectCommonCode(mapParameter);			
			for (int i = 0; i < commonCdList.size(); i++) {
				Map data = commonCdList.get(i);
				series.put(data.get("cd").toString(), data.get("nm"));
			}
			mapParameter.remove("s_class_cd");*/
			
			Map seriesMapData = commonCdList.get(0);
			if("D3501".equals(link_id)) {
				series.put(seriesMapData.get("c2").toString(), seriesMapData.get("c2_nm"));
			} else {
				series.put(seriesMapData.get("c1").toString(), seriesMapData.get("c1_nm"));
			}
			/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
			
//			// 4. 시리즈 구성 (데이터 조회)
//			List<Map<String, Object>> dataList = null;			
//			mapParameter.put("mode", String.format("%02d", mode));
//			if (seriesCd != null) {
//				mapParameter.put("series_cd", seriesCd);
//			}
//			dataList = workRoadViewJobsService.selectJobStatData(mapParameter);
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
			mapParameter.put("mode", String.format("%02d", mode));
			dataList = workRoadViewJobsService.selectJobStatData(mapParameter);
			String prevSeriesCd = "";
			List seriesData = null;
			Map<String, Object> map = null;
			
			for (int i = 0; i < dataList.size(); i++) {
				Map data = dataList.get(i);
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
					/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
					//double seriesVal = ((BigDecimal)data.get("val")).doubleValue();
					double seriesVal = Double.parseDouble((String) data.get("val"));
					/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
					seriesData.add(seriesVal);
				} else {
					seriesData.add(null);
				}
				
				prevSeriesCd = data.get("series_cd").toString();
			}

			resultData.put("target", target);
			resultData.put("categoryes", categoryes);
			resultData.put("series", seriesList);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
			
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return resultData;
	}
}
