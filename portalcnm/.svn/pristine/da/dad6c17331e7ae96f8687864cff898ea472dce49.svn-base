 package kostat.sop.ServiceAPI.api.dt.policyCategorymanage;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

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
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: AddThemaMap
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月5日 下午7:00:09    
 * @version V1.0      
 *    
 */
public class AddPolicyCategory extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddPolicyCategory.class);
	@Resource
	private PolicyCategoryManageDao policycategorymanagedao;
	@Override
	public String getApiId() {
		return "policycategorymanage_add";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "입력";
	}
	
	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			
			int count = policycategorymanagedao.searchCount();
			String stat_id="";
			
			if(count==0){
				stat_id = "CTGR_001";
				paramMap.put("CATEGORY_ID", Security.cleanXss(stat_id));
			}else{
				String maps = policycategorymanagedao.searchID();
				
				paramMap.put("CATEGORY_ID", "CTGR_"+Security.cleanXss(maps));
			}
			
			String cleanXssCATEGORY_NM = "";
			cleanXssCATEGORY_NM = Security.cleanXss((String) paramMap.get("CATEGORY_NM"));
			paramMap.put("CATEGORY_NM", cleanXssCATEGORY_NM);
			
			String cleanXssEXP = "";
			cleanXssEXP = Security.cleanXss((String) paramMap.get("EXP"));
			paramMap.put("EXP", cleanXssEXP);
			
			paramMap.put("MANAGER_ID", getSession(req, "manager_id"));
			
			String cleanXssDISP_RANK = "";
			cleanXssDISP_RANK = Security.cleanXss((String) paramMap.get("DISP_RANK"));
			paramMap.put("DISP_RANK", cleanXssDISP_RANK);
			
			return policycategorymanagedao.addPolicyCategory(paramMap);
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
		CATEGORY_NM,EXP,DISP_RANK 
	}
	private enum OptionParam{
	}

}
