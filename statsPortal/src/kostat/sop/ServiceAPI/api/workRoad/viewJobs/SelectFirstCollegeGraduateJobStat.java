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
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 대졸자 첫 일자리 통계 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.16	초기 작성
 *     2018.10.17	ywKim	사용정지 : SelectJobStatData.java 에 통합
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectFirstCollegeGraduateJobStat extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectFirstCollegeGraduateJobStat.class);

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
		base_year,		// 데이터 기준 년도
		mode,			// 통계 구분
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
			logger.info("mode : " + req.getParameter("mode"));
			logger.info(">> ========================================== ");

			String target = "";
			List categoryes = new ArrayList<Object>();			
			Map<String, Object> series = new HashMap<String, Object>();
			List<Map> commonCdList = null;
			List seriesList = new ArrayList<Object>();
			int mode = Integer.parseInt(req.getParameter("mode"));
			String categoryCd = String.format("CGS%02dC", mode);
			String seriesCd = String.format("CGS%02dS", mode);
			
			// 대상 조회
			mapParameter.put("b_class_cd", "CGSTAR");
			mapParameter.put("s_class_cd", req.getParameter("base_year"));
			commonCdList = workRoadService.selectCommonCode(mapParameter);
			if (commonCdList.size() == 1 && commonCdList.get(0) != null) {
				target = commonCdList.get(0).get("nm").toString();
			}
			mapParameter.remove("s_class_cd");
			
			// 카테고리 생성
			mapParameter.put("b_class_cd", categoryCd);
			commonCdList = workRoadService.selectCommonCode(mapParameter);			
			for (int i = 0; i < commonCdList.size(); i++) {
				Map data = commonCdList.get(i);
				categoryes.add(data.get("nm"));
			}
			// 시리즈 생성
			mapParameter.put("b_class_cd", seriesCd);
			commonCdList = workRoadService.selectCommonCode(mapParameter);			
			for (int i = 0; i < commonCdList.size(); i++) {
				Map data = commonCdList.get(i);
				series.put(data.get("cd").toString(), data.get("nm"));
			}
			
			// 시리즈 구성
			List<Map<String, Object>> dataList = null;			
			mapParameter.put("mode", String.format("%02d", mode));
			dataList = workRoadViewJobsService.selectFirstCollegeGraduateJobStat(mapParameter);
			//List<Map> cntList = session.selectList("wrViewJobs.selectFirstCollegeGraduateJobStat", mapParameter);
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
					double seriesVal = ((BigDecimal)data.get("val")).doubleValue();
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
