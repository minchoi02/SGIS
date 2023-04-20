package kostat.sop.ServiceAPI.api.dt.jitmanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.jitmanage.mapper.JITManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GetJITType
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月23日 下午6:37:12    
 * @version V1.0      
 *    
 */
public class GetJITType extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */ 
	private static final Logger logger = Logger.getLogger(GetJITType.class);
	@Resource
	private JITManageDao jitManageDao;
	@Override
	public String getApiId() {
		return "jitmanage_getjittype";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			String SRV_ATTR= paramMap.get("SRV_ATTR").toString();
			if(!SRV_ATTR.equals("DATA") && !SRV_ATTR.equals("MAP"))
				throw new ApiException("입력값을 체크 해 주세요");
			return jitManageDao.getJITType(paramMap);
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
		SRV_ATTR
	}
	private enum OptionParam{
		API_B_CLASS_CD
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}

}
