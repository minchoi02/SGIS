package kostat.sop.ServiceAPI.api.statsMe.catalog;

import java.util.HashMap;
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
 * 1. 기능 : My통계로 > 카탈로그 1,2차 키워드검색 목록 조회  <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 한광희 1.0, 2019.10.28	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 한광희
 * @version 1.0
 * @see
 * <p/>
 */
public class GetCtlgKwrdList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetCtlgKwrdList.class);

	@Override
	public String getApiId() {
		return "115004";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return null;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		
	}

	enum OptionParam{
		//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 START
		lifeCycleItemId,
		interestRealmItemId
		//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 END
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		//리턴 변수 선언
		HashMap<String,Object> result = new HashMap<String,Object>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 START
			// 생애주기
			String lifeCycleItemId = (String) mapParameter.get(OptionParam.lifeCycleItemId.name());
			String[] lifeCycleItemIdList = null;
			if(lifeCycleItemId != null && !lifeCycleItemId.equals("")) {
				lifeCycleItemIdList = lifeCycleItemId.split(",");
			}
			mapParameter.put("lifeCycleItemIdList", lifeCycleItemIdList);
			// 관심분야
			String interestRealmItemId = (String) mapParameter.get(OptionParam.interestRealmItemId.name());
			String[] interestRealmItemIdList = null;
			if(interestRealmItemId != null && !interestRealmItemId.equals("")) {
				interestRealmItemIdList = interestRealmItemId.split(",");
			}
			mapParameter.put("interestRealmItemIdList", interestRealmItemIdList);
			result.put("ctlgKwrdList2", session.selectList("statsMeCatalog.selectCtlgKwrdList", mapParameter));
			mapParameter.remove("lifeCycleItemIdList");
			mapParameter.remove("interestRealmItemIdList");
			result.put("ctlgKwrdList", session.selectList("statsMeCatalog.selectCtlgKwrdList", mapParameter));
			//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 END
			
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
