package kostat.sop.ServiceAPI.api.qa.communitymanage;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.qa.communitymanage.mapper.CommunityNoticeManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: AddBoard
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月3日 下午5:20:17    
 * @version V1.0      
 *    
 */
public class AddCommunityNotice extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddCommunityNotice.class);
	@Resource
	private CommunityNoticeManageDao communityNoticeManageDao;
	@Override
	public String getApiId() {
		return "communitymanage_addboard";
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
			paramMap.put("POST_NO", communityNoticeManageDao.getPostNO());
			paramMap.put("MEMBER_ID", getSession(req, "manager_id"));
			Boolean flag = paramMap.get("POST_TITLE").toString().length() <= 200;
			if (!flag)
				throw new ApiException("제목 길이가 200자를 초과했습니다.");
			flag = paramMap.get("POST_CONTENT").toString().getBytes().length < 4000;
			if (!flag)
				throw new ApiException("내용 길이가 4000자를 초과했습니다.");
			
			String cleanXssContent = "";
			cleanXssContent = Security.cleanXss((String) paramMap.get("POST_CONTENT"));
			paramMap.put("POST_CONTENT", cleanXssContent);

			String cleanXssTitle = "";
			cleanXssTitle = Security.cleanXss((String) paramMap.get("POST_TITLE"));
			paramMap.put("POST_TITLE", cleanXssTitle);
			
			communityNoticeManageDao.addBoard(paramMap);
            if(paramMap.get("FILE_YN").toString().equals("Y"))
            	communityNoticeManageDao.addBoardFile(paramMap);
			return new Success(true,Prompt.ADDSUCCESS);
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
//	private void encodingKorean(Map mapParameter) {
//		try {
//			String tempStr = (String) mapParameter.get(OptionParam.POST_TITLE.name());
//			mapParameter.put(OptionParam.POST_TITLE.name(), URLDecoder.decode(tempStr, "UTF-8"));
//			tempStr = (String) mapParameter.get(OptionParam.POST_CONTENT.name());
//			mapParameter.put(OptionParam.POST_TITLE.name(), URLDecoder.decode(tempStr, "UTF-8"));
//		} catch (UnsupportedEncodingException e) {
//			e.printStackTrace();
//		}
//	}
	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum MustParam{
		POST_TITLE,POST_CONTENT,FILE_YN,PRIORITY_DISP_YN
	}
	private enum OptionParam{
		FILE_ID,FILE_PATH,FILE_NM,FILE_EXTENSION,FILE_CONTENT_TYPE
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "추가";
	}

}
