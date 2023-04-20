package kostat.sop.ServiceAPI.api.dt.jitmanage;

import org.apache.log4j.Logger;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.jitmanage.mapper.JITManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: DelJIT
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午9:27:44    
 * @version V1.0      
 *    
 */
public class DelJIT extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */ 
	private static final Logger logger = Logger.getLogger(DelJIT.class);
	@Resource
	private JITManageDao jitManageDao;
	@Override
	public String getApiId() {
		return "jitmanage_delete";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			return jitManageDao.deleteJIT(getParameterMap(req));
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
		API_B_CLASS_CD_List,API_M_CLASS_CD_List,SEQ_List
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "삭제";
	}
}
