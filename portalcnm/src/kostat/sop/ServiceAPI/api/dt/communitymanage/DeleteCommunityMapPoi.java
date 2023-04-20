package kostat.sop.ServiceAPI.api.dt.communitymanage;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.communitymanage.mapper.CommunityManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: DeleteCommunityMapPoi
 * @Description： 
 *
 * @author kwangheum   
 * @date：2015年11月23日    
 * @version V1.0      
 *     
 */
public class DeleteCommunityMapPoi extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(DeleteCommunityMapPoi.class);
	@Resource
	private CommunityManageDao communityManageDao;
	public String getApiId() {
		return "communitymanage_updatecommunitymappoidel";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			return communityManageDao.updateCommunityMapPoiDel(getParameterMap(req));
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
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum MustParam{
		CMMNTY_POI_ID
	}
	private enum OptionParam{
	}
	@Override
	public String getWorkNm() {
		return "수정";
	}
}
