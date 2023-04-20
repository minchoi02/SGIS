package kostat.sop.ServiceAPI.api.edu;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.EduService;
import kostat.sop.ServiceAPI.exception.ApiException;

@SuppressWarnings("rawtypes")
public class EduSessionInfo extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(EduSessionInfo.class);
	
	
	@Resource(name = "eduService")
	private EduService eduService;
	
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13600";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
	}
	
	enum OptionParam
	{	
	}
	
	@SuppressWarnings({ "unchecked" })
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		
		httpSession = req.getSession();
		Map<String,Object> mapParameter = getParameterMap(req);
		Map<String,Object> result = new HashMap<String,Object>();
		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			
			//회원등급조회
			if(httpSession.getAttribute("member_id") !=null){
				mapParameter.put("member_id",httpSession.getAttribute("member_id") );
				try {
					result = eduService.selectTeacherInfo(mapParameter);
					
					if(null != result){
						httpSession.setAttribute("ss_grant_state", result.get("grant_state"));
					}else{
						httpSession.setAttribute("ss_grant_state", "");
					}
				} catch (Exception e) {
					// TODO: handle exception
				}
				
			}else {
			}
			
			resultData.put("sessionId", (String)httpSession.getAttribute("sessionId"));				//세션 고유 ID
			resultData.put("member_id", (String)httpSession.getAttribute("member_id"));		//ID
			resultData.put("ss_school_grade", (String)httpSession.getAttribute("ss_school_grade"));		//학교등급
			resultData.put("ss_grant_state", (String)httpSession.getAttribute("ss_grant_state"));		//권한
			
			
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
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