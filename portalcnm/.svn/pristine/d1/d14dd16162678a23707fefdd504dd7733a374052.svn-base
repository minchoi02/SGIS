package kostat.sop.ServiceAPI.common.controller;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.security.Security;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.restapi.api.AbsAPI;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.api.DurianMV;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

/**   
 *
 * @ClassName: AbsGridQuery
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月12日 下午2:51:15    
 * @version V1.0      
 * @param <T>
 *    
 */
public abstract class AbsGridQuery<T> extends AbsAuth<T> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AbsGridQuery.class);
	
	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}
	public void _transPagging(Map paramMap){
		int pageNumber = Integer.parseInt(paramMap.get("page").toString());
		int pageSize = Integer.parseInt(paramMap.get("rows").toString());
		if (pageNumber==0)
			pageNumber=1;
		int beginIndex = (pageNumber-1)*pageSize+1;
		int endIndex = pageNumber*pageSize;
		paramMap.put("START_INDEX", beginIndex);
		paramMap.put("END_INDEX", endIndex);
	}
	@Override
	public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse res) throws AbsAPIException, AbsHttpException {
		NFData datas = null;
		String strFormat = "json";
		String strTrId = null;
		Map paramsMap = null;
		String headerKey = "";
		try {
			datas = new NFData();
			logger.info("START - TrID[" + strTrId + "] API[" + this.getApiId() + "]");
			paramsMap = req.getParameterMap();
			// 클라이언트에게 응답할 형식을 찾아낸다.
			strFormat = _getViewType(req, res);

			// http Method를 검사한다.
			checkHttpMethod(req.getMethod());

			// http header 점검한다.
			checkHttpHeader(req, res, datas);

			// 필수 입력 파라미터를 점검한다.
			checkMustParam(paramsMap);

			// 정의되지 않은 파라미터 입력 여부를 점검한다.
			checkUndefineParameter(paramsMap);

			// 입력된 파라미터에 null이 존재하는지 검사한다.
			checkNullParameterValue(paramsMap);

			// 인증 처리 부분을 검사한다.
			checkAuth(req, res);

			// API 공유의 기능을 수행한다.
			prepareExecute(req, res);
			T resultObj = executeAPI(req, res, strTrId);
			Map resultMap = new HashMap();
			if(resultObj !=null){
				resultMap= (Map) resultObj;
				Iterator<String> iter = resultMap.keySet().iterator();
				while (iter.hasNext()) {
					Object key=iter.next();
					datas.put(key, resultMap.get(key));
				}
			}
			logger.debug("데이타스 = "+datas+"");
			successExecute(req, res, datas);
		}
		catch (AbsAPIException e) {
			failExecute(req, res, datas);
//			makeError(datas, e);
			logger.error("ERROR- TrID[" + strTrId + "] [" + datas.get(CommonTag.id.name()) + "] [" + e.getErrCode() + "] [" + e.getErrMessage() + "]");
			return new DurianMV(strFormat, datas);
		}
		catch (AbsHttpException e) {
			failExecute(req, res, datas);
			logger.error("ERROR- TrID[" + strTrId + "] [" + datas.get(CommonTag.id.name()) + "]");
			throw e;
		}
		finally {
			//sha256으로 헤더키를 생성한다.
			headerKey = "timeStamp:" + req.getHeader("ts") + ";errCd:" + datas.get(CommonTag.errCd.name()) + ";trId:" + datas.get(CommonTag.trId.name()) + ";";
			res.setHeader("headerKey", Security.toSHA256(headerKey));
			afterExecute(req, res);
			logger.info("END - TrID[" + strTrId + "] API[" + this.getApiId() + "]");
		}
		// ----------------------------------------------------------

		return new DurianMV(strFormat, datas);
	}
}
