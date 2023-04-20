package kostat.sop.ServiceAPI.api.qa.devfaqmanage;

import org.apache.log4j.Logger;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.qa.boardmanage.mapper.BoardManageDao;
import kostat.sop.ServiceAPI.api.qa.devfaqmanage.mapper.DevfaqManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: DelBoard
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月3日 下午5:11:04    
 * @version V1.0      
 *    
 */
public class DevDelFAQ extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(DevDelFAQ.class);
	@Resource
	private DevfaqManageDao devFAQManageDao;
	@Override
	public String getApiId() {
		return "boardmanage_deleteboard";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			return devFAQManageDao.deleteFAQ(req.getParameter(MustParam.POST_NO_List.name()).toString().split(","));
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
		return null;
	}
	private enum MustParam{
		POST_NO_List
	}
	private enum OptionParam{
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "삭제";
	}

}
