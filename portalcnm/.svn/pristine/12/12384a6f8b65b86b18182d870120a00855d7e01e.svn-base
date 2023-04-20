package kostat.sop.ServiceAPI.api.dt.policymapmanager;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.accessmanage.mapper.AccessManageDao;
import kostat.sop.ServiceAPI.api.dt.policymapmanager.mapper.PolicyDataManageDao;
import kostat.sop.ServiceAPI.api.dt.pubdatamanage.mapper.PubDataManageDao;
import kostat.sop.ServiceAPI.api.dt.relmanage.mapper.RELManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: AddREL
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午8:08:30    
 * @version V1.0      
 *     
 */
public class PolicyMapDataUpdate extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(PolicyMapDataUpdate.class);
	@Resource
	private PolicyDataManageDao policydatamanagedao;
	@Override
	public String getApiId() {
		return "policymapdataupdate_update";
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
			String cleanXssIDX_ID = "";
			cleanXssIDX_ID = Security.cleanXss((String) paramMap.get("IDX_ID"));
			paramMap.put("IDX_ID", cleanXssIDX_ID);	
			
			String cleanXssCATEGORY_TYPE = "";
			cleanXssCATEGORY_TYPE = Security.cleanXss((String) paramMap.get("CATEGORY_TYPE"));
			paramMap.put("CATEGORY_TYPE", cleanXssCATEGORY_TYPE);
			String cleanXssIDX_NM = "";
			cleanXssIDX_NM = Security.cleanXss((String) paramMap.get("IDX_NM"));
			paramMap.put("IDX_NM", cleanXssIDX_NM);
			
			String cleanXssDISP_RANK = "";
			cleanXssDISP_RANK = Security.cleanXss((String) paramMap.get("DISP_RANK"));
			paramMap.put("DISP_RANK", cleanXssDISP_RANK);
			
			String cleanXssSRV_YN = "";
			cleanXssSRV_YN = Security.cleanXss((String) paramMap.get("SRV_YN"));
			paramMap.put("SRV_YN", cleanXssSRV_YN);
			
			String cleanXssEXP = "";
			cleanXssEXP = Security.cleanXss((String) paramMap.get("EXP"));
			paramMap.put("EXP", cleanXssEXP);
			
			return  policydatamanagedao.updatePolicyData(paramMap);
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
		IDX_ID,CATEGORY_TYPE,SRV_YN,IDX_NM,DISP_RANK
	}
	private enum OptionParam{
		EXP
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
