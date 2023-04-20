package kostat.sop.ServiceAPI.api.qa.qamanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;

import kostat.sop.ServiceAPI.api.qa.qamanage.mapper.QAManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: QASearch
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月25日 下午2:51:02    
 * @version V1.0      
 *   
 */
public class SearchAPI extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchAPI.class);
	@Resource
	private QAManageDao qaManageDao;
	@Override
	public String getApiId() {
		return "qamanage_search";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap =getParameterMap(req);
			_transPagging(paramMap);
			String POST_TITLE = (String) paramMap.get("POST_TITLE");
			String POST_CONTENT = (String) paramMap.get("POST_CONTENT");
			String POST_CD = (String) paramMap.get("POST_CD");
			logger.debug(POST_CD);
			Boolean flag = true;
			if(POST_TITLE != null)
				flag = flag && POST_TITLE.getBytes().length < 200;
			if(POST_CONTENT != null)
				flag = flag && POST_CONTENT.getBytes().length < 4000;
			if(!flag)
				throw new ApiException("입력값을 체크 해 주세요");
			
			return qaManageDao.searchAPI(paramMap);
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
		page,rows,BOARD_CD
	}
	
	private enum OptionParam{
		BOARD_S_CLASS_CD,POST_TITLE,POST_CONTENT,REG_MEMBER_ID,POST_CD
	}
}
