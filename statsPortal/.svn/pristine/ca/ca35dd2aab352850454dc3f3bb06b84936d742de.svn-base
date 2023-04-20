package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetLivingEnvironmentInfo extends AbsQuery<HashMap<String,Object>> {

	private static final Log logger = LogFactory.getLog(GetLivingEnvironmentInfo.class);

	enum MustParam {
		sido_cd,		// 시도 코드
	}
	
	enum OptionParam {
		sgg_cd,			// 시군구 코드
		emdong_cd,		// 읍면동 코드
		mode,			// ALL, NULL
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "112010";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String arg2) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		HashMap<String,Object> resultData = new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			logger.info(">> Parameters =============================== ");
			logger.info("sido_cd : " + req.getParameter("sido_cd"));
			logger.info("sgg_cd : " + req.getParameter("sgg_cd"));
			logger.info("emdong_cd : " + req.getParameter("emdong_cd"));
			logger.info("mode : " + req.getParameter("mode"));
			logger.info(">> ========================================== ");

			String mode = (String)req.getParameter("mode");
			
			if (mode != null) {
				mapParameter.put("mode", mode);
			}
			
			List<Map> pureDataList = session.selectList("wrViewJobs.selectLivingEnvironment", mapParameter);
			List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>(); 
			
			if (mode == null || mode.equals("ALL") == false) {
				// START 2018-12-12 생환환경 종합팝업 자연항목에서 대기오염도보다 생활날씨,녹지비율을 먼저 조회되게 수정 START
				int idxHMM0001 = 0; // 대기오염도 순서
				int idxHMM0002 = 0; // 생활날씨 순서
				int idxHMM0003 = 0; // 녹지비율 순서
				for (int i = 0; i < pureDataList.size(); i++) {
					String bClassIdx = StringUtil.isNullToString(pureDataList.get(i).get("b_class_idx_id"));
					String mClassIdx = StringUtil.isNullToString(pureDataList.get(i).get("m_class_idx_id"));
					
					if ("HML0001".equals(bClassIdx) && "HMM0001".equals(mClassIdx)) {
						idxHMM0001 = i;
					}
					else if ("HML0001".equals(bClassIdx) && "HMM0002".equals(mClassIdx)) {
						idxHMM0002 = i;
					}
					else if ("HML0001".equals(bClassIdx) && "HMM0003".equals(mClassIdx)) {
						idxHMM0003 = i;
					}
				}
				// 무조건 녹지비율 선택 - 2019.01.08	ywKim	변경
				if(idxHMM0001 < idxHMM0003 || idxHMM0002 < idxHMM0003) {
					if(idxHMM0001 < idxHMM0002) {
						Collections.swap(pureDataList, idxHMM0001, idxHMM0003);
					} else if(idxHMM0002 < idxHMM0001) {
						Collections.swap(pureDataList, idxHMM0002, idxHMM0003);
					}
				}
				// 대기오염이 가장 먼저인 경우 그다음과 순서 바꿈
	//			if(idxHMM0001 < idxHMM0002 && idxHMM0001 < idxHMM0003) {
	//				if(idxHMM0002 < idxHMM0003) Collections.swap(pureDataList, idxHMM0001, idxHMM0002);
	//				else  Collections.swap(pureDataList, idxHMM0001, idxHMM0003);
	//			}
				// END 2018-12-12 생환환경 종합팝업 자연항목에서 대기오염도보다 생활날씨,녹지비율을 먼저 조회되게 수정 END
				
				// 점수가 가장 높은 항목 추출
				// 대분류별로 점수가 가장 높은 항목이 첫번째로 조회된다.
				String prevClassIdx = "";
				for (int i = 0; i < pureDataList.size(); i++) {
					String classIdx = pureDataList.get(i).get("b_class_idx_id").toString();
					
					// 항목이 NULL 인것 제외
					if (pureDataList.get(i).get("m_class_idx_id") == null ||
						pureDataList.get(i).get("m_class_idx_id").toString().equals("")) {
						continue;
					}
					
					if (prevClassIdx.equals(classIdx) == false) {
						dataList.add(pureDataList.get(i));
					}
					
					prevClassIdx = classIdx;
				}

				resultData.put("dataList", dataList);
			} else {
				resultData.put("dataList", pureDataList);
			}
			
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
