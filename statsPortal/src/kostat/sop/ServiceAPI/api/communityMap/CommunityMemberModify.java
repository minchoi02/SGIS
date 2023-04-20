package kostat.sop.ServiceAPI.api.communityMap;


import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 참여자 수정<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/05/25  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityMemberModify extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityMemberModify.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100053";
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
		cmmnty_map_id,
		cmmnty_ipcd,
		nm
	}

	enum OptionParam{
		cmmnty_ppcd
	}

	@Override
	public HashMap<String,Object> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			communityService.replaceIdPw(mapParameter);
			if(this.validation(mapParameter)){
				resultData.put("success", session.update("communityRegistMember.updateCmmntyMapRegMber",mapParameter)>0);
			}
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
	private boolean validation(Map<String,Object> mapParameter) throws Exception,IllegalArgumentException{
		String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
		mapParameter.put("member_id", login_id);
		HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
		communityService.registCheckDate(community);
		if(!community.get("usr_id").equals(login_id)){
			throw new ApiException("회원 관리 권한이 존재하지 않습니다");
		}else{
			if(session.selectOne("communityRegistMember.selectCmmntyMapRegMber",mapParameter)==null){
				throw new ApiException("존재하지 않는 아이디 입니다.");
			}else{
				if(mapParameter.get("nm").toString().length()>30){
					throw new ApiException("이름은 최대 30자까지 작성하실 수 있습니다");
				}else{
					if(mapParameter.get("pw")!=null){
						String pw = mapParameter.get("pw").toString();
						BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
						mapParameter.put("pw",bcrypt.encode(pw));
					}
					return true;
				}
			}
		}
	}
}
