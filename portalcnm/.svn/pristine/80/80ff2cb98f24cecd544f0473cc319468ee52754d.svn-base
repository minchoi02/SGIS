package kostat.sop.ServiceAPI.api.dt.thbookmanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.relmanage.mapper.RELManageDao;
import kostat.sop.ServiceAPI.api.dt.thbookmanage.mapper.THBookManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
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
public class AddTHBook extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddTHBook.class);
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
			/*Boolean flag = paramMap.get("SEARCH_WORD").toString().getBytes().length < 50 && paramMap.get("REL_SEARCH_WORD").toString().getBytes().length < 4000;*/

			/*if(!flag)
				throw new ApiException("입력값을 체크 해 주세요");*/

			String STAT_ID = (String) paramMap.get("STAT_ID");
			paramMap.put("STAT_ID", STAT_ID);
			
			int count = relManageDao.searchCount(paramMap);
			String stat_id="";
			
			if(count==0){
				if(STAT_ID.equals("tma")) {
					stat_id="tma01";
				} else {
					stat_id="map01";
				}
				paramMap.put("STAT_ID", Security.cleanXss(stat_id));
			}else{
				String maps = relManageDao.searchID(paramMap);
				if(STAT_ID.equals("tma")) {
					paramMap.put("STAT_ID", "tma"+Security.cleanXss(maps));
				} else {
					paramMap.put("STAT_ID", "map"+Security.cleanXss(maps));
				}
			}
			
			if(STAT_ID.equals("tma")) {
				String cleanXssCATEGORY_NM = Security.cleanXss((String) paramMap.get("CATEGORY_NM"));
				paramMap.put("CATEGORY_NM", cleanXssCATEGORY_NM);
			}
			
			String cleanXssHOT_ICON_YN = "";
			cleanXssHOT_ICON_YN = Security.cleanXss((String) paramMap.get("HOT_ICON_YN"));
			paramMap.put("HOT_ICON_YN", cleanXssHOT_ICON_YN);
			String cleanXssRANK = ""; 
			cleanXssRANK = Security.cleanXss((String) paramMap.get("RANK"));
			paramMap.put("RANK", cleanXssRANK);
			String cleanXssSEARCH_WORD = "";
			cleanXssSEARCH_WORD = Security.cleanXss((String) paramMap.get("TITLE"));
			paramMap.put("TITLE", cleanXssSEARCH_WORD);			
			String cleanXssREL_SEARCH_WORD = "";
			cleanXssREL_SEARCH_WORD = Security.cleanXss((String) paramMap.get("SRV_YN"));
			paramMap.put("SRV_YN", cleanXssREL_SEARCH_WORD);
			String cleanXssREL_SEARCH_URL = "";
			cleanXssREL_SEARCH_URL = Security.cleanXss((String) paramMap.get("URL"));
			paramMap.put("URL", cleanXssREL_SEARCH_URL);
			
			logger.debug(cleanXssREL_SEARCH_URL);
			paramMap.put("MEMBER_ID", getSession(req, "manager_id"));

			logger.debug("시작-------------------------------------------------");
			return relManageDao.addTHBook(paramMap);
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
		TITLE,SRV_YN,URL,STAT_ID
	}
	private enum OptionParam{
		CATEGORY_NM,HOT_ICON_YN,RANK
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}
}
