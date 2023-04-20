package kostat.sop.ServiceAPI.api.dt.thbookmanage;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.dt.thbookmanage.mapper.THBookManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

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
public class UpdateTHBook extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateTHBook.class);
	@Resource
	private THBookManageDao relManageDao;
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
			
			String cleanXssSEARCH_WORD_NEW = "";
			cleanXssSEARCH_WORD_NEW = Security.cleanXss((String) paramMap.get("STAT_ID"));
			paramMap.put("STAT_ID", cleanXssSEARCH_WORD_NEW);	
			
			String cleanXssSEARCH_WORD_OLD = "";
			cleanXssSEARCH_WORD_OLD = Security.cleanXss((String) paramMap.get("URL"));
			paramMap.put("URL", cleanXssSEARCH_WORD_OLD);	
			
			String cleanXssREL_SEARCH_WORD = "";
			cleanXssREL_SEARCH_WORD = Security.cleanXss((String) paramMap.get("SRV_YN"));
			paramMap.put("SRV_YN", cleanXssREL_SEARCH_WORD);
			
			String cleanXssHOT_ICON_YN = "";
			cleanXssHOT_ICON_YN = Security.cleanXss((String) paramMap.get("HOT_ICON_YN"));
			paramMap.put("HOT_ICON_YN", cleanXssHOT_ICON_YN);
			
			String cleanXssRANK = "";
			cleanXssRANK = Security.cleanXss((String) paramMap.get("RANK"));
			paramMap.put("RANK", cleanXssRANK);
			
			if(cleanXssSEARCH_WORD_NEW.substring(0, 3).equals("tma")) {
				String cleanXssCATEGORY_NM = Security.cleanXss((String) paramMap.get("CATEGORY_NM"));
				paramMap.put("CATEGORY_NM", cleanXssCATEGORY_NM);
			}
			
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
		return OptionParam.class;
	}
	private enum MustParam{
		STAT_ID, URL, SRV_YN
	}
	
	private enum OptionParam{
		CATEGORY_NM,HOT_ICON_YN,RANK
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
