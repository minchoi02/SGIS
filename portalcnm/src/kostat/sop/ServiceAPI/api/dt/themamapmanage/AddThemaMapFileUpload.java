 package kostat.sop.ServiceAPI.api.dt.themamapmanage;

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
public class AddThemaMapFileUpload extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddThemaMapFileUpload.class);
	@Resource
	private ThemaMapManageDao themaMapManageDao;
	@Override
	public String getApiId() {
		return "themamapmanage_add";
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
			
			int count = themaMapManageDao.searchCount();

			String STAT_THEMA_MAP_ID =StringUtil.getRandomString(10).toString()+new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date())+StringUtil.getRandomString(10).toString();
			
			String cleanXsThemaMapid = "";
			cleanXsThemaMapid = Security.cleanXss(STAT_THEMA_MAP_ID);
			paramMap.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
			
			String cleanXssTHEMA_MAP_TYPE = "";
			cleanXssTHEMA_MAP_TYPE = Security.cleanXss((String) paramMap.get("THEMA_MAP_TYPE"));
			paramMap.put("THEMA_MAP_TYPE", cleanXssTHEMA_MAP_TYPE);
			
			String cleanXssSRVY_YN = "";
			cleanXssSRVY_YN = Security.cleanXss((String) paramMap.get("SRV_YN"));
			paramMap.put("SRV_YN", cleanXssSRVY_YN);
			
			String cleanXssCATEGORY = "";
			cleanXssCATEGORY = Security.cleanXss((String) paramMap.get("CATEGORY"));
			paramMap.put("CATEGORY", cleanXssCATEGORY);
			
			String cleanXssTITLE = "";
			cleanXssTITLE = Security.cleanXss((String) paramMap.get("TITLE"));
			paramMap.put("TITLE", cleanXssTITLE);
			
			
			String cleanXssEXP = "";
			cleanXssEXP = Security.cleanXss((String) paramMap.get("EXP"));
			paramMap.put("EXP", cleanXssEXP);
			
			String cleanXssSTAT_THEMA_MAP_FILE_URL = "";
			cleanXssSTAT_THEMA_MAP_FILE_URL = Security.cleanXss((String) paramMap.get("STAT_THEMA_MAP_FILE_URL"));
			paramMap.put("STAT_THEMA_MAP_FILE_URL", cleanXssSTAT_THEMA_MAP_FILE_URL);
			
			
			String cleanXssSTAT_DISP_LEVEL = "";
			cleanXssSTAT_DISP_LEVEL= Security.cleanXss((String) paramMap.get("STAT_DISP_LEVEL"));
			paramMap.put("STAT_DISP_LEVEL", cleanXssSTAT_DISP_LEVEL);
			
			String cleanXssMETHOD = "";
			cleanXssMETHOD = Security.cleanXss((String) paramMap.get("METHOD"));
			paramMap.put("METHOD", cleanXssMETHOD);
			
			String cleanXssRELATEINFO = "";
			cleanXssRELATEINFO = Security.cleanXss((String) paramMap.get("RELATEINFO"));
			paramMap.put("RELATEINFO", cleanXssRELATEINFO);
			
			paramMap.put("MANAGER_ID", getSession(req, "manager_id"));
			
			return themaMapManageDao.addThemaMapFileUpload(paramMap);
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
		THEMA_MAP_TYPE,CATEGORY,TITLE,SRV_YN,
		STAT_THEMA_MAP_FILE_URL,EXP
		,METHOD,RELATEINFO,STAT_DISP_LEVEL
	}
	private enum OptionParam{
	}

}
