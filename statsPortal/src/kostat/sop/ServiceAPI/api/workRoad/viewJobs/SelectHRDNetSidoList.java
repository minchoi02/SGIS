package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

import java.util.ArrayList;
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
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 직업훈련포털(HRD-Net) 시도 목록 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.18	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectHRDNetSidoList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectHRDNetSidoList.class);

	@Override
	public String getApiId() {
		return "112005";
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

			List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();			
			dataList.add(keyValuePair("11", "서울"));			
			dataList.add(keyValuePair("26", "부산"));
			dataList.add(keyValuePair("27", "대구"));
			dataList.add(keyValuePair("28", "인천"));
			dataList.add(keyValuePair("29", "광주"));
			dataList.add(keyValuePair("30", "대전"));
			dataList.add(keyValuePair("31", "울산"));
			dataList.add(keyValuePair("36", "세종"));
			dataList.add(keyValuePair("41", "경기"));
			dataList.add(keyValuePair("42", "강원"));
			dataList.add(keyValuePair("43", "충북"));
			dataList.add(keyValuePair("44", "충남"));
			dataList.add(keyValuePair("45", "전북"));
			dataList.add(keyValuePair("46", "전남"));
			dataList.add(keyValuePair("47", "경북"));
			dataList.add(keyValuePair("48", "경남"));
			dataList.add(keyValuePair("50", "제주"));
			
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
	
	Map<String, Object> keyValuePair(Object key, Object value) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("cd", key);
		data.put("nm", value);
		
		return data;
	}
}
