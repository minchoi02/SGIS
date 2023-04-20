package kostat.sop.ServiceAPI.api.dt.ttipmanage;

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
import kostat.sop.ServiceAPI.api.dt.ttipmanage.mapper.TTIPManageDao;
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
public class AddTTIP extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddTTIP.class);
	@Resource
	private TTIPManageDao relManageDao;
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
			
			String menuNm = paramMap.get("MENU_CLASS_CD").toString();
			if("01".equals(menuNm)){
				String MENUNM = "메뉴1";
				paramMap.put("MENU_NM", Security.cleanXss(MENUNM));			
			}else if("02".equals(menuNm)){
				String MENUNM = "메뉴2";
				paramMap.put("MENU_NM", Security.cleanXss(MENUNM));	
			}else if("03".equals(menuNm)){
				String MENUNM = "메뉴3";
				paramMap.put("MENU_NM", Security.cleanXss(MENUNM));	
			}
			
			String cleanXssTTIP_ID = "";
			cleanXssTTIP_ID = Security.cleanXss((String) paramMap.get("TTIP_ID"));
			paramMap.put("TTIP_ID", cleanXssTTIP_ID);
			
			String cleanXssSEARCH_WORD = "";
			cleanXssSEARCH_WORD = Security.cleanXss((String) paramMap.get("TTIP_NM"));
			paramMap.put("TTIP_NM", cleanXssSEARCH_WORD);			
			String cleanXssREL_SEARCH_WORD = "";
			cleanXssREL_SEARCH_WORD = Security.cleanXss((String) paramMap.get("MENU_CLASS_CD"));
			paramMap.put("MENU_CLASS_CD", cleanXssREL_SEARCH_WORD);
			String cleanXssREL_SEARCH_URL = "";
			cleanXssREL_SEARCH_URL = Security.cleanXss((String) paramMap.get("TTIP_EXP"));
			paramMap.put("TTIP_EXP", cleanXssREL_SEARCH_URL);
		
			return relManageDao.addTTIP(paramMap);
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
		TTIP_NM,MENU_CLASS_CD,TTIP_EXP,TTIP_ID
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}
}
