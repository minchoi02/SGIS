package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

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
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 선택조건 목록 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 * 	<p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.11.19	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectConditionList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectConditionList.class);

	@Override
	public String getApiId() {
		return "112008";
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
		b_class_cd,			// 공통코드에서 분류코드 값
		
		condition_type,		// 
							// COMPANY_TYPE	기업형태
							// INDUSTRY_CLASSIFICATION	산업분류
							// JOB_CLASSIFICATION	직종분류(m모집직종)		
		latest_reg_date,	// 최신 등록일 (조회 기준일)
	}

	enum OptionParam{
		s_class_cd_len,		// 공통코드에서 코드길이
		sido_cd,			// 시도 코드
		sgg_cd,				// 시군구 코드
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			List<Map> dataList = session.selectList("wrViewJobs.selectConditionList",mapParameter);
			resultData.put("dataList", dataList);
			
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
