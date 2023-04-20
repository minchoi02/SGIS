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
public class UpdatePlusThemaMap extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdatePlusThemaMap.class);
	@Resource
	private ThemaMapManageDao themaMapManageDao;
	@Override
	public String getApiId() {
		return "themamapmanage_update";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.ALL;
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
			Boolean flag = paramMap.get("TITLE").toString().getBytes().length < 100;
			flag = flag && paramMap.get("EXP").toString().getBytes().length < 1000;
			if(!flag) {
				throw new ApiException("입력값을 체크 해 주세요");
			}
			String STAT_THEMA_MAP_ID =StringUtil.getRandomString(10).toString()+new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date())+StringUtil.getRandomString(10).toString();
			
			String cleanXssContent = "";
			cleanXssContent = Security.cleanXss((String) paramMap.get("EXP"));
			paramMap.put("EXP", cleanXssContent);

			String cleanXssTitle = "";
			cleanXssTitle = Security.cleanXss((String) paramMap.get("TITLE"));
			paramMap.put("TITLE", cleanXssTitle);
			
			String cleanXssMobileUrl= "";
			cleanXssMobileUrl = Security.cleanXss((String) paramMap.get("MOBILE_URL"));
			paramMap.put("MOBILE_URL", cleanXssMobileUrl);

			String cleanXssDispMthd = "";
			cleanXssDispMthd = Security.cleanXss((String) paramMap.get("DISP_MTHD"));
			paramMap.put("DISP_MTHD", cleanXssDispMthd);
			
			String cleanXssStatInfo = "";
			cleanXssStatInfo = Security.cleanXss((String) paramMap.get("REL_STAT_INFO"));
			paramMap.put("REL_STAT_INFO", cleanXssStatInfo);
			
			String cleanXssLeftNm = "";
			cleanXssLeftNm = Security.cleanXss((String) paramMap.get("LEFT_NM"));
			paramMap.put("LEFT_NM", cleanXssLeftNm);
			
			String cleanXssrRightNm = "";
			cleanXssrRightNm = Security.cleanXss((String) paramMap.get("RIGHT_NM"));
			paramMap.put("RIGHT_NM", cleanXssrRightNm);
			
			String cleanXssLeftTTIP = "";
			cleanXssLeftTTIP = Security.cleanXss((String) paramMap.get("LEFT_TTIP"));
			paramMap.put("LEFT_TTIP", cleanXssLeftTTIP);
			
			String cleanXssRightTTIP = "";
			cleanXssRightTTIP = Security.cleanXss((String) paramMap.get("RIGHT_TTIP"));
			paramMap.put("RIGHT_TTIP", cleanXssRightTTIP);
			
			String cleanXssLeftSource = "";
			cleanXssLeftSource = Security.cleanXss((String) paramMap.get("LEFT_SOURCE"));
			paramMap.put("LEFT_SOURCE", cleanXssLeftSource);
			
			String cleanXssRightSource = "";
			cleanXssRightSource = Security.cleanXss((String) paramMap.get("RIGHT_SOURCE"));
			paramMap.put("RIGHT_SOURCE", cleanXssRightSource);
			
			String cleanXssYearInfo = "";
			cleanXssYearInfo = Security.cleanXss((String) paramMap.get("YEAR_INFO"));
			paramMap.put("YEAR_INFO", cleanXssYearInfo);
			
			paramMap.put("MANAGER_ID",getSession(req, "manager_id"));
			
			return themaMapManageDao.updateNewThemaMap(paramMap);
		}  catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("서버 입력값을 체크 해 주세요");
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
		STAT_THEMA_MAP_ID,
		CATEGORY,TITLE,THEMA_MAP_TYPE,SRV_YN,EXP,START_X,START_Y,MAX_LEVEL,MIN_LEVEL,
		MOBILE_YN,DISP_MTHD,REL_STAT_INFO,PRIORTY_YN
	}
	
	private enum OptionParam{
		MOBILE_URL,DATA_YEAR,DATA_ID,MAP_YEAR,MAP_ID,EXMPL_TYPE,ATDRC_YN,LEFT_YEAR,YEAR_INFO,FIX_YN, 
		LEFT_NM, LEFT_UNIT, LEFT_TTIP, LEFT_CHART, LEFT_MAP_TTIP_TITLE, LEFT_SOURCE,LEFT_MAP_INFO,LEFT_MAP_UNIT,LEFT_MAP_TITLE,
		RIGHT_NM,RIGHT_UNIT,RIGHT_TTIP,RIGHT_CHART,RIGHT_MAP_TTIP_TITLE,RIGHT_SOURCE,RIGHT_MAP_INFO,RIGHT_MAP_UNIT,RIGHT_MAP_TITLE,
		DATA_SIDO,DATA_GUGUN,DATA_DONG,DATA_EX,DATA_SIDO_RIGHT,DATA_GUGUN_RIGHT,DATA_DONG_RIGHT,DATA_EX_RIGHT,POI_DISP_YN,THEME_CD,
		DISP_RANK
		//lkh 2016.05.26추가
		//,HOT_ISSUE_YN

		// mng_s 2017. 08. 04 석진혁
		, CORP_CLASS_CD
		// mng_e 2017. 08. 04 석진혁
	}

}
