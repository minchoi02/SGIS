package kostat.sop.ServiceAPI.api.dt.mobileManage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.mobileManage.mapper.MobileManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

public class AddMobileManage extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddMobileManage.class);
	@Resource
	private MobileManageDao mobileManageDao;
	@Override
	public String getApiId() {
		return "mobileManage_add";
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

			String cleanXssMENU_NM = "";
			cleanXssMENU_NM = Security.cleanXss((String) paramMap.get("MENU_NM"));
			paramMap.put("MENU_NM", cleanXssMENU_NM);			
			String cleanXssURL = "";
			cleanXssURL = Security.cleanXss((String) paramMap.get("URL"));
			paramMap.put("URL", cleanXssURL);
			String cleanXssUSE_YN = "";
			cleanXssUSE_YN = Security.cleanXss((String) paramMap.get("USE_YN"));
			paramMap.put("USE_YN", cleanXssUSE_YN);

			return mobileManageDao.addMobileManage(paramMap);
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
		MENU_NM, URL, USE_YN
	}
	private enum OptionParam{
		
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}
}
