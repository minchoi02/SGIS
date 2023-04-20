package kostat.sop.ServiceAPI.api.workRoad.common;

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
 * 1. 기능 : 일자리 맵 서비스 > 메인-일자리 현황 데이터 조회<p>
 * 2. 처리개요 : 주요지표에 대한 일자리 현황 데이터 조회 <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.12.06	초기 작성
 *		2018.12.19	ywKim	변경: 사용안함 (메인팝업화면에서 이 API 데이터 제외됨.)
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectMainJobStatusInfo extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectMainJobStatusInfo.class);

	@Override
	public String getApiId() {
		return "110004";
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
			
			List<Map> dataList = session.selectList("workRoad.selectMainJobStatusInfo",mapParameter);
			
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
