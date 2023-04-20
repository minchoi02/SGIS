package kostat.sop.ServiceAPI.api.ak.usesrvsearch;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.ak.usesrvsearch.mapper.USESRVSearchDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 
 * @ClassName: USESRVSearch
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年10月19日 下午3:41:48
 * @version V1.0
 * 
 */
public class USESRVSearch extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(USESRVSearch.class);
	@Resource
	private USESRVSearchDao usesrvSearchDao;

	@Override
	public String getApiId() {
		return "usersrvsearch_search";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		Map paramMap = getParameterMap(req);
		// RequestUtil.transSearchDate(paramMap);
		_transPagging(paramMap);
		String SEARCHTYPE = paramMap.get("SEARCHTYPE").toString();
		String CASE_APP_OPEN_YN = paramMap.get("CASE_APP_OPEN_YN").toString();
		String CASE_APP_SHARE_YN = paramMap.get("CASE_APP_SHARE_YN").toString();
		if (!CASE_APP_OPEN_YN.equals("Y") && !CASE_APP_OPEN_YN.equals("N") && !CASE_APP_OPEN_YN.equals("ALL"))
			throw new ApiException("입력값을 체크 해 주세요");
		if (!CASE_APP_SHARE_YN.equals("Y") && !CASE_APP_SHARE_YN.equals("N") && !CASE_APP_SHARE_YN.equals("ALL"))
			throw new ApiException("입력값을 체크 해 주세요");
		if (!SEARCHTYPE.equals("SRV_GRANT_DT") && !SEARCHTYPE.equals("SRV_APPLY_DT") && !paramMap.containsKey("TYPE"))
			throw new ApiException("입력값을 체크 해 주세요");
		try {
			return usesrvSearchDao.searchUSESRV(paramMap);
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	private enum MustParam {
		page, rows, sort, order, API_AUTH_KEY_TYPE, CASE_APP_OPEN_YN, CASE_APP_SHARE_YN, TIMETYPE, SEARCHTYPE
	}

	private enum OptionParam {
		STARTDATE, ENDDATE, TYPE, GRANT_STATE
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}

}
