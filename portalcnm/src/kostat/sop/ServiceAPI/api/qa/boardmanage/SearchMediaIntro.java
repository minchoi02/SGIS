package kostat.sop.ServiceAPI.api.qa.boardmanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;

import kostat.sop.ServiceAPI.api.qa.boardmanage.mapper.BoardManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 
 * @ClassName: SearchBoard
 * @Description：
 * 
 * @author leekh
 * @date：2016.08.18
 * @version V1.0
 * 
 */
public class SearchMediaIntro extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchMediaIntro.class);
	@Resource
	private BoardManageDao boardManageDao;

	@Override
	public String getApiId() {
		return "boardmanage_search";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			_transPagging(paramMap);
			String POST_TITLE = (String) paramMap.get("POST_TITLE");
			String POST_CONTENT = (String) paramMap.get("POST_CONTENT");
			Boolean flag = true;
			if (POST_TITLE != null)
				flag = flag && POST_TITLE.getBytes().length < 200;
			if (!flag)
				throw new ApiException("제목 길이가 200자를 초과했습니다.");

			if (POST_CONTENT != null)
				flag = flag && POST_CONTENT.getBytes().length < 4000;
			if (!flag)
				throw new ApiException("내용 길이가 4000자를 초과했습니다.");

			return boardManageDao.searchMediaIntro(paramMap);
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
		return OptionParam.class;
	}

	private enum MustParam {
		sort, order, page, rows
	}

	private enum OptionParam {
		POST_TITLE, POST_CONTENT, REG_MEMBER_ID, PRIORITY_DISP_YN,MANAGER_NM
	}

}
