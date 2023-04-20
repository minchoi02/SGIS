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
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 공통코드 목록 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 :
 * 			이 소스는 샘플이기 때문에 숙지후 삭제하세요. 
 * 			대신 공통코드 목록 조회 api를 사용하고자 한다면
 * 			api.workRoad.SelectCommonCode를 사용할 것 <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.09.13	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectCommonCode extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectCommonCode.class);

	@Override
	public String getApiId() {
		return "112000";
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
		b_class_cd,		// 공통코드에서 분류코드 값
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
			
			List<Map> commonCdList = session.selectList("wrViewJobs.selectCommonCode",mapParameter);
			resultData.put("commonCdList", commonCdList);
			
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
