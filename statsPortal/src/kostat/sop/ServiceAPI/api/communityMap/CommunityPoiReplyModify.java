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
 * 1. 기능 : 소통지도 POI 댓글 수정<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/01/15  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityPoiReplyModify extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityPoiReplyModify.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100031";
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
		poi_reply_id,
		reply_content
	}

	enum OptionParam{
		cmmnty_ipcd,
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
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			mapParameter.put("getPw", "Y");
			HashMap<String,Object> reply = session.selectOne("communityPoiReply.selectPoiReply", mapParameter);
			mapParameter.put("cmmnty_poi_id", reply.get("cmmnty_poi_id"));
			HashMap<String,Object> poi = session.selectOne("communityPoi.selectCmmntyPoi", mapParameter);
			mapParameter.put("cmmnty_map_id", poi.get("cmmnty_map_id"));
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(this.validation(login_id,community, reply, mapParameter)){
				resultData.put("success", (int)session.update("communityPoiReply.updatePoiReply", mapParameter)>0);
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
	private boolean validation(String login_id,HashMap<String,Object> community,HashMap<String,Object> reply,Map<String,Object> mapParameter) throws Exception,IllegalArgumentException{
		communityService.registCheckDate(community);
		if(reply==null){
			throw new ApiException("등록되지 않은 등록자료입니다");
		}else if(mapParameter.get("reply_content")==null||mapParameter.get("reply_content").toString().length()<=0){
			throw new ApiException("댓글 내용을 입력해주세요");
		}else if(mapParameter.get("reply_content").toString().length()>30){
			throw new ApiException("댓글 내용은 최대 30자까지 작성하실 수 있습니다");
		}
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		if(community.get("cmmnty_partcptn_grant_yn").equals("M")&&!community.get("usr_id").equals(login_id)){
			mapParameter.put("id",reply.get("usr_id"));
			if(mapParameter.get("pw")==null){
				throw new ApiException("비밀번호를 입력해주세요");
			}else{
				String pw = mapParameter.get("pw").toString();
				HashMap<String,Object> mber = session.selectOne("communityRegistMember.selectCmmntyMapRegMber", mapParameter);
				if(mber==null||!bcrypt.matches(pw,mber.get("pw").toString())){
					throw new ApiException("비밀번호를 확인해주세요");
				}else{
					mapParameter.put("member_id", mapParameter.get("id"));
				}
			}
		}else if(community.get("cmmnty_partcptn_grant_yn").equals("P")&&!community.get("usr_id").equals(login_id)){
			if(mapParameter.get("id")==null||community.get("usr_id").equals(mapParameter.get("id").toString())||!reply.get("usr_id").equals(mapParameter.get("id"))){
				throw new ApiException("아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요");
			}else{
				String pw = mapParameter.get("pw").toString();
				String communityPw = session.selectOne("communityMap.selectCmmntyMapPassword", mapParameter);
				if(!bcrypt.matches(pw,communityPw)){
					throw new ApiException("아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요");
				}else{
					mapParameter.put("member_id", mapParameter.get("id"));
				}
			}
		}else if(community.get("cmmnty_partcptn_grant_yn").equals("A")&&!community.get("usr_id").equals(login_id)){
			mapParameter.put("id",reply.get("usr_id"));
			if(mapParameter.get("pw")==null){
				throw new ApiException("비밀번호를 입력해주세요");
			}else{
				String pw = mapParameter.get("pw").toString();
				String replyPw = null;
				if(reply.get("pw")!=null){
					replyPw = reply.get("pw").toString();
				}
				if(!bcrypt.matches(pw,replyPw)){
					throw new ApiException("비밀번호를 확인해주세요");
				}else{
					mapParameter.put("member_id", mapParameter.get("id"));
				}
			}
		}else{
			if(login_id==null){
				throw new ApiException("로그인 후 수정이 가능합니다");
			}else if(!reply.get("usr_id").equals(login_id)){
				throw new ApiException("본인이 작성한 글만 수정할 수 있습니다");
			}
		}
		return true;
	}
}
