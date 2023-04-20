package kostat.sop.ServiceAPI.common.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.security.Security;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.restapi.api.AbsAPI;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.api.DurianMV;
import com.neighborsystem.durian.restapi.model.NFData;


public abstract class AbsQuery<T> extends AbsAPI<T> {
	private static final Log logger = LogFactory.getLog( AbsQuery.class );
	private static final String perpertyPath = "/globals.properties";
	/**
	 * globals.properties의 위치를 얻는다. 
	 * 
	 * @return perpertyPath 를 위한 String
	 */
	public String getPerpertyPath() {
		return perpertyPath;
	}
	public String getSession(HttpServletRequest req,String name){
		if(req.getSession().getAttribute(name)!=null)
		return req.getSession().getAttribute(name).toString();
		else
		return null;
	}
	/**
	 * 실제 API 구현 로직 담당, serlvet에서 호출시 이 함수를 호출해준다.
	 * @param req 클라이언트 요청 정보를 담은 객체
	 * @param res 서버측의 응답을 담을 객체
	 */
	@Override
	public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse res) throws AbsAPIException, AbsHttpException {
		NFData datas = null;
		String strFormat = "json";
		String strTrId = null;
		Map paramsMap = null;
		String headerKey = "";
		
		try {
			datas = new NFData();
			
			datas.put(CommonTag.id.name(), this.getApiId());

			// API 고유번호를 할당한다.
			strTrId = createTrID(req);
			datas.put(CommonTag.trId.name(), strTrId);

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
			datas.put(CommonTag.errCd.name(), 0);
			datas.put(CommonTag.errMsg.name(), "Success");
			
			//보안 타임스탬프 추가
			datas.put("ts", req.getHeader("ts"));
			
			T resultObj = executeAPI(req, res, strTrId);
			if (resultObj != null) {
				datas.put(CommonTag.result.name(), resultObj);
			}
			
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