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
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: AddJIT
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月23日 下午3:50:21    
 * @version V1.0      
 *    
 */
public class AddMAPJIT extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddMAPJIT.class);
	@Resource
	private JITManageDao jitManageDao;
	@Override
	public String getApiId() {
		return "jitmanage_addmapjit";
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
			paramMap.put("API_M_CLASS_CD", "01");
			paramMap.put("SEQ", jitManageDao.getSEQ(paramMap));
			paramMap.put("MEMBER_ID", getSession(req, "manager_id"));
			
			String PARAM_VALUE = paramMap.get("PARAM_VALUE").toString();
			
			Boolean flag = paramMap.get("NM").toString().getBytes().length < 100 && PARAM_VALUE.getBytes().length < 4000;
			if(!flag)
				throw new ApiException("입력값을 체크 해 주세요");
			paramMap.remove("PARAM_VALUE");
			paramMap.put("PARAM_VALUE", StringUtil.getHtmlStrCnvr(PARAM_VALUE));
			
			String cleanXssNM = "";
			cleanXssNM = Security.cleanXss((String) paramMap.get("NM"));
			paramMap.put("NM", cleanXssNM);
			
			return  jitManageDao.addMAPJIT(paramMap);
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
		NM,API_B_CLASS_CD,PARAM_VALUE
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "입력";
	}

}
