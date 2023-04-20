package kostat.sop.ServiceAPI.api.dt.policyCategorymanage;

import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.policyCategorymanage.mapper.PolicyCategoryManageDao;
import kostat.sop.ServiceAPI.api.dt.themamapmanage.mapper.ThemaMapManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 
 * @ClassName: DelThemaMap
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年11月5日 下午7:01:22
 * @version V1.0
 * 
 */
public class DelPolicyCategory extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(DelPolicyCategory.class);
	@Resource
	private PolicyCategoryManageDao policycategorymanagedao;

	@Override
	public String getApiId() {
		return "policycategorymanage_delete";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "삭제";
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Success success = new Success(false, Prompt.DELETEFAIL);
			String STAT_CATEGORY_ID_List = req.getParameter(OptionParam.STAT_CATEGORY_ID_List.name());
			if (STAT_CATEGORY_ID_List != null) {
				success = policycategorymanagedao.deletePolicyCategory(STAT_CATEGORY_ID_List.split(","));
			}
			return success;
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
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	private enum OptionParam {
		STAT_CATEGORY_ID_List
	}
}
