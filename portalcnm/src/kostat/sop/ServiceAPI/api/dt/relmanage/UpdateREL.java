package kostat.sop.ServiceAPI.api.dt.relmanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

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
public class UpdateREL extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateREL.class);
	@Resource
	private RELManageDao relManageDao;
	@Override
	public String getApiId() {
		return "relmanage_add";
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
			Boolean flag = paramMap.get("SEARCH_WORD_OLD").toString().getBytes().length < 50 && paramMap.get("SEARCH_WORD_NEW").toString().getBytes().length < 50;
			flag = flag && paramMap.get("REL_SEARCH_WORD").toString().getBytes().length < 4000;
			if(!flag)
				throw new ApiException("입력값을 체크 해 주세요");
			String cleanXssSEARCH_WORD_NEW = "";
			cleanXssSEARCH_WORD_NEW = Security.cleanXss((String) paramMap.get("SEARCH_WORD_NEW"));
			paramMap.put("SEARCH_WORD_NEW", cleanXssSEARCH_WORD_NEW);	
			
			String cleanXssSEARCH_WORD_OLD = "";
			cleanXssSEARCH_WORD_OLD = Security.cleanXss((String) paramMap.get("SEARCH_WORD_OLD"));
			paramMap.put("SEARCH_WORD_OLD", cleanXssSEARCH_WORD_OLD);	
			
			String cleanXssREL_SEARCH_WORD = "";
			cleanXssREL_SEARCH_WORD = Security.cleanXss((String) paramMap.get("REL_SEARCH_WORD"));
			paramMap.put("REL_SEARCH_WORD", cleanXssREL_SEARCH_WORD);
			
			return  relManageDao.updateREL(paramMap);
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
		SEARCH_WORD_OLD,REL_SEARCH_WORD,SEARCH_WORD_NEW
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
