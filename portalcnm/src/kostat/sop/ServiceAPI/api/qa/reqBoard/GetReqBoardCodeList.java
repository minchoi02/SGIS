package kostat.sop.ServiceAPI.api.qa.reqBoard;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.common.mapper.CommonDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetReqBoardCodeList extends AbsAuth<Map>{
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddReqBoard.class);
	
	@Resource
	private CommonDao commonDao;
	
	@Override
	public String getApiId() {
		return "reqboard_getreqcodelist";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		Map resultMap = new HashMap<String, Object>();
		
		try {
			Map paramMap=RequestUtil.getParaMap( req );
			
			if( paramMap.get("B_CLASS_CD") != null ){
				resultMap.putAll( commonDao.getBCommonCode( paramMap.get("B_CLASS_CD").toString() ) );
			}
			
			resultMap.put("selId", paramMap.get("selId"));
			
		}  catch (AbsAPIException e) {
			logger.error(e);
			e.printStackTrace();
			throw e;
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
		
		return resultMap;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}
	
	@Override
	public String getWorkNm() {
		return "조회";
	}
	
}
