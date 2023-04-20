package kostat.sop.ServiceAPI.api.qa.reqBoard;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.qa.reqBoard.mapper.ReqBoardDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetReqBoard extends AbsAuth<Map>{
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddReqBoard.class);
	
	@Resource
	private ReqBoardDao reqBoardDao;
	
	@Override
	public String getApiId() {
		return "reqboard_getreqboard";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map resultMap = new HashMap<String, Object>();
			String REQ_SEQ = req.getParameter("REQ_SEQ");
			
			if( REQ_SEQ != null && !"0".equals( REQ_SEQ ) ){
				resultMap = reqBoardDao.getReqBoard( REQ_SEQ );
			} else {
				resultMap.put("req_user_nm", getSession(req, "manager_nm"));
			}
			
			return resultMap;
		}  catch (AbsAPIException e) {
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
	
	private enum MustParam{
		
	}
	
	private enum OptionParam{
		REQ_SEQ
	}
	
	@Override
	public String getWorkNm() {
		return "조회";
	}
	
}
