package kostat.sop.ServiceAPI.api.edu_gallery;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.edu_gallery.DeleteGalleryLikeInfo.MustParam;
import kostat.sop.ServiceAPI.api.edu_gallery.DeleteGalleryLikeInfo.OptionParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.EduGalleryService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

@SuppressWarnings("rawtypes")
public class DeleteGalleryReply extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GalleryListAll.class);
	
	@Resource(name="eduGalleryService")
	private EduGalleryService galleryService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13504";
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
		data_id,
		replyOrder,
		del_reply_nick,
		del_reply_pwd
	}
	
	enum OptionParam
	{
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			String login_id = httpSession.getAttribute("member_id")==null?" ":httpSession.getAttribute("member_id").toString();
			HashMap<String, String> gallery = galleryService.selectGallery(mapParameter);
			String writer_id = gallery.get("member_id"); //교안 작성자는 비밀번호 체크 없이 삭제가능하다.
			
			if( !"".equals(login_id) && writer_id.equals(login_id) ) {
				//교안 작성자는 비밀번호 체크 없이 삭제가능하다.
			} else {
				String replyPwdParam = mapParameter.get("del_reply_pwd")==null?"":(String)mapParameter.get("del_reply_pwd");
				mapParameter.put("replyPwd", replyPwdParam);
				
				//패스워드 일치여부 조회
				int replyPwd = galleryService.selectGalleryReplyPwd(mapParameter);
				if ( replyPwd == 0 ) { //패스워드가 일치하지 않으면
					throw new ApiException("비밀번호를 체크 해 주세요");
				}
				
				//닉네임 일치여부 조회
				int replyNick = galleryService.selectGalleryReplyNick(mapParameter);
				if ( replyNick == 0 ) { //닉네임 일치하지 않으면
					throw new ApiException("닉네임을 체크 해 주세요");
				}
			}
			
			
			
		
			/*
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();

			if(login_id == null){
				throw new ApiException("로그인한 사용자만 사용할 수 있습니다");
			}
			mapParameter.put("member_id", login_id);
			*/
			
			//통계갤러리 데이터 추천 회원정보 삭제
			
			galleryService.deleteGalleryReply(mapParameter);
			resultData.put("data_id", mapParameter.get("data_id").toString());
			
			
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