package kostat.sop.ServiceAPI.api.statsMe.catalog;

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

/**
 * 1. 기능 : My통계로 > 카탈로그 누적횟수 증가  <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 한광희 1.0, 2019.08.28	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 한광희
 * @version 1.0
 * @see
 * <p/>
 */
public class SetStatsMeCatalogAccCntDataAdd extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SetStatsMeCatalogAccCntDataAdd.class);

	@Override
	public String getApiId() {
		return "115002";
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
		statDataId,
		my_location_yn,
		my_sido_cd,
		my_sgg_cd,
		my_emdong_cd
	}

	enum OptionParam{
		
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		//리턴 변수 선언
		HashMap<String,Object> result = new HashMap<String,Object>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			
			// 카탈로그 누적
			String statDataId = (String) mapParameter.get(MustParam.statDataId.name());
			String[] statDataIdList = null;
			statDataIdList = statDataId.split(",");
			mapParameter.put("statDataIdList", statDataIdList);
			session.update("statsMeCatalog.updateStatDataAccCnt", mapParameter);
			
			// 위치동의에 따른 키워드 누적
			String my_location_yn = (String) mapParameter.get(MustParam.my_location_yn.name());
			if("Y".equals(my_location_yn)) {
				List<Map<String, Object>> kwrdList = session.selectList("statsMeCatalog.selectCtlgDataMainKwrdList", mapParameter);
				if(kwrdList.size() > 0) {
					for (Map<String, Object> kwrdMap : kwrdList) {
						String main_kwrd = StringUtil.isNullToString(kwrdMap.get("main_kwrd"));
						mapParameter.put("main_kwrd", main_kwrd);
						// 위치동의에 따른 키워드 저장
						session.update("statsMeCatalog.updateCtlgAccKwrdCnt", mapParameter);
					}		
				}
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
		//조회 결과
		
		return result;
	}
}
