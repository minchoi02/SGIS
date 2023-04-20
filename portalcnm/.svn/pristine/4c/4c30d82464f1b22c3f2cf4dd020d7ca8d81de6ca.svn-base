package kostat.sop.ServiceAPI.api.qa.qamanage;

import java.util.Map;

import org.apache.log4j.Logger;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.qa.qamanage.mapper.QAManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 
 * @ClassName: UpdateAnswer
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年11月3日 下午2:34:05
 * @version V1.0
 * 
 */
public class UpdateAnswer extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateAnswer.class);
	@Resource
	private QAManageDao qaManageDao;

	@Override
	public String getApiId() {
		return "qamanage_updateanswer";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			Boolean flag = paramMap.get("POST_CONTENT").toString().getBytes().length < 4000;
			if (!flag)
				throw new ApiException("내용 길이가 4000자를 초과했습니다.");

			String cleanXssContent = "";
			cleanXssContent = Security.cleanXss((String) paramMap.get("POST_CONTENT"));
			paramMap.put("POST_CONTENT", cleanXssContent);

			String cleanXssTitle = "";
			cleanXssTitle = Security.cleanXss((String) paramMap.get("POST_TITLE"));
			paramMap.put("POST_TITLE", cleanXssTitle);

			paramMap.put("MEMBER_ID", getSession(req, "manager_id"));
			return qaManageDao.updateAnswer(paramMap);
		} catch (AbsAPIException e) {
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
		return null;
	}

	private enum MustParam {
		BOARD_CD, POST_NO, POST_CONTENT, POST_TITLE
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}
}
