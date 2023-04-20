package kostat.sop.ServiceAPI.api.qa.reqBoard;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.qa.reqBoard.mapper.ReqBoardDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**   
 *
 * @ClassName: AddReqBoard
 * @Description： 
 *
 * @author jrj
 * @date：2018.01.30    
 * @version V1.0      
 *    
 */
public class AddReqBoard extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddReqBoard.class);
	@Resource
	private ReqBoardDao reqBoardDao;
	@Override
	public String getApiId() {
		return "reqboard_addreqboard";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			Map resultMap = new HashMap<String, Object>();
			
			Boolean flag = true;
			
			String REQ_PRGRS_STATS_CD = paramMap.get("REQ_PRGRS_STATS_CD").toString();
			
			if( "01".equals( REQ_PRGRS_STATS_CD ) ){
				if ( !( paramMap.get("REQ_TITLE").toString().length() <= 200 ) ){
					throw new ApiException("제목 길이가 200자를 초과했습니다.");
				}
				
				if ( !( paramMap.get("REQ_CONTENT").toString().getBytes().length < 4000 ) ) {
					throw new ApiException("내용 길이가 4000자를 초과했습니다.");
				}
				
				paramMap.put("REQ_USER_ID", getSession(req, "manager_id")); 
				paramMap.put("REQ_TITLE", Security.cleanXss((String) paramMap.get("REQ_TITLE")));
				paramMap.put("REQ_CONTENT", Security.cleanXss((String) paramMap.get("REQ_CONTENT")));
				paramMap.put("REQ_DIV_CD", Security.cleanXss((String) paramMap.get("REQ_DIV_CD")));
			} else if( "04".equals( REQ_PRGRS_STATS_CD ) ){
				paramMap.put("MOD_AFTER_REQ_CONTENT", Security.cleanXss((String) paramMap.get("MOD_AFTER_REQ_CONTENT")));
			} else if( "07".equals( REQ_PRGRS_STATS_CD ) ){
				paramMap.put("RE_REQ_CONTENT", Security.cleanXss((String) paramMap.get("RE_REQ_CONTENT")));
			}
			
			if( paramMap.get("REQ_SEQ") != null && paramMap.get("REQ_SEQ").toString() != "" &&
					!"0".equals( paramMap.get("REQ_SEQ").toString() ) ){
				reqBoardDao.updateReqBoard( paramMap );
			} else {
				reqBoardDao.addReqBoard( paramMap );
			}
			
			resultMap.put("success", true);
			resultMap.put("msg", Prompt.REQSUCCESS);
			resultMap.put("REQ_SEQ", paramMap.get("REQ_SEQ"));
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
		REQ_SEQ, REQ_PRGRS_STATS_CD, REQ_DIV_CD, REQ_TITLE, REQ_CONTENT,
		MOD_AFTER_REQ_CONTENT, RE_REQ_CONTENT,
		FILE_ID, FILE_PATH, FILE_NM, FILE_EXTENSION, FILE_CONTENT_TYPE
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "추가";
	}

}
