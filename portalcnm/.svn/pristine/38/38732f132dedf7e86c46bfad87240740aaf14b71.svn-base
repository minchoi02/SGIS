package kostat.sop.ServiceAPI.api.dt.policyCategorymanage;

import java.util.Map;

import org.apache.log4j.Logger;

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
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: UpdateThemaMap
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月5日 下午7:02:43    
 * @version V1.0      
 *    
 */
public class UpdatePolicyCategory extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdatePolicyCategory.class);
	@Resource
	private PolicyCategoryManageDao policycategorymanagedao;
	@Override
	public String getApiId() {
		return "policycategory_update";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);

			String cleanXssCATEGORY_ID = "";
			cleanXssCATEGORY_ID = Security.cleanXss((String) paramMap.get("CATEGORY_ID"));
			paramMap.put("CATEGORY_ID", cleanXssCATEGORY_ID);
			
			
			String cleanXssCATEGORY_NM = "";
			cleanXssCATEGORY_NM = Security.cleanXss((String) paramMap.get("CATEGORY_NM"));
			paramMap.put("CATEGORY_EM", cleanXssCATEGORY_NM);
			
			
			String cleanXssEXP = "";
			cleanXssEXP = Security.cleanXss((String) paramMap.get("EXP"));
			paramMap.put("EXP", cleanXssEXP);
			
			String cleanXssDISP_RANK = "";
			cleanXssDISP_RANK = Security.cleanXss((String) paramMap.get("DISP_RANK"));
			paramMap.put("DISP_RANK", cleanXssDISP_RANK);
			
			return policycategorymanagedao.updatePolicyCategory(paramMap);
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
		CATEGORY_NM,CATEGORY_ID,EXP,DISP_RANK 
	}
//	private enum OptionParam{
//		
//	}

}
