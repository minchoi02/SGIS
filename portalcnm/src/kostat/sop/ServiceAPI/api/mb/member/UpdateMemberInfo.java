package kostat.sop.ServiceAPI.api.mb.member;

import java.util.Map;

import org.apache.log4j.Logger;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.mb.member.mapper.MemberDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: UpdateMemberInfo
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月28日 下午6:39:40    
 * @version V1.0      
 *   
 */
public class UpdateMemberInfo extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateMemberInfo.class);
	@Resource
	private MemberDao memberDao;
	@Override
	public String getApiId() {
		return "member_update";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			paramMap.put("MANAGER_ID", getSession(req, "manager_id"));
			
			String accessIp = req.getRemoteAddr();
			
			return memberDao.updateMemberInfo(paramMap,accessIp);
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
		MEMBER_ID
	}
	private enum OptionParam{
		MEMBER_GRADE,LOGIN_LIMIT_YN,PW_FAIL_CNT
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
