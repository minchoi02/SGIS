package kostat.sop.ServiceAPI.api.dt.themamapmanage;

import java.io.IOException;
import java.sql.SQLException;
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
import kostat.sop.ServiceAPI.common.util.Prompt;
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
public class AddPlusThemaMap extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddPlusThemaMap.class);
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
			Boolean flag = paramMap.get("TITLE").toString().getBytes().length < 100;
			flag = flag && paramMap.get("EXP").toString().getBytes().length < 1000;
			String array1[] = null;
			String array2[] = null;
			String array3[] = null;
			String array4[] = null;
			String array5[] = null;
			String array6[] = null;
			String array7[] = null;
			String array8[] = null;
			
			String STAT_THEMA_MAP_ID =StringUtil.getRandomString(10).toString()+new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date())+StringUtil.getRandomString(10).toString();

			String cleanXsThemaMapid = "";
			cleanXsThemaMapid = Security.cleanXss(STAT_THEMA_MAP_ID);
			paramMap.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
			
			String type = paramMap.get("THEMA_MAP_TYPE").toString();
			
			if(!"07".equals(type)){
				String EXMPL_TYPE = paramMap.get("EXMPL_TYPE").toString();
				if("3".equals(EXMPL_TYPE)){
					if("04".equals(type)){
						if(paramMap.get("DATA_SIDO").toString()!=null){
							array1 = paramMap.get("DATA_SIDO").toString().split(",");	
						}
						if(paramMap.get("DATA_GUGUN").toString()!=null){
							array2 = paramMap.get("DATA_GUGUN").toString().split(",");	
						}
						if(paramMap.get("DATA_DONG").toString()!=null){
							array3 = paramMap.get("DATA_DONG").toString().split(",");	
						}
						if(paramMap.get("DATA_EX").toString()!=null){
							array4 = paramMap.get("DATA_EX").toString().split(",");	
						}
						
						if(array1.length>0){
							try {
								HashMap params = new HashMap();
								params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
								params.put("EXMPL_TYPE", EXMPL_TYPE);
								params.put("left_sep_cnt", array1[0]);
								for(int i=1; i<=array1.length-1; i++){
									params.put("left_sep_"+i, Integer.parseInt(array1[i]));
								}
								if(array1.length==6){
									for(int i=6; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array1.length==7){
									for(int i=7; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array1.length==8){
									for(int i=8; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array1.length==9){
									for(int i=9; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array1.length==10){
									params.put("left_sep_10", null);

								}
								params.put("right_sep_cnt", "");	
								for(int i=1; i<=10; i++){
									params.put("right_sep_"+i, null);
								}
								boolean b = themaMapManageDao.addNewThemaEXMPL(params);
							} catch (NullPointerException e) {
								logger.error(e);
								throw e;
							} 
						}
						if(array2.length>0){
							try {
								HashMap params = new HashMap();
								params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
								params.put("EXMPL_TYPE", EXMPL_TYPE);
								params.put("left_sep_cnt", array1[0]);
								for(int i=1; i<=array2.length-1; i++){
									params.put("left_sep_"+i, Integer.parseInt(array1[i]));
								}
								if(array2.length==6){
									for(int i=6; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array2.length==7){
									for(int i=7; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array2.length==8){
									for(int i=8; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array2.length==9){
									for(int i=9; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array2.length==10){
									params.put("left_sep_10", null);

								}
								params.put("right_sep_cnt", "");
								for(int i=1; i<=10; i++){
									params.put("right_sep_"+i, null);
								}
								boolean b = themaMapManageDao.addNewThemaEXMPL(params);
							} catch (NullPointerException e) {
								logger.error(e);
								throw e;
							} 
						}
						
						if(array3.length>0){
							try {
								HashMap params = new HashMap();
								params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
								params.put("EXMPL_TYPE", EXMPL_TYPE);
								params.put("left_sep_cnt", array1[0]);
								for(int i=1; i<=array3.length-1; i++){
									params.put("left_sep_"+i, Integer.parseInt(array1[i]));
								}
								if(array3.length==6){
									for(int i=6; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array3.length==7){
									for(int i=7; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array3.length==8){
									for(int i=8; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array3.length==9){
									for(int i=9; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array3.length==10){
									params.put("left_sep_10", null);

								}
								params.put("right_sep_cnt", "");
								for(int i=1; i<=10; i++){
									params.put("right_sep_"+i, null);
								}
								boolean b = themaMapManageDao.addNewThemaEXMPL(params);
							} catch (NullPointerException e) {
								logger.error(e);
								throw e;
							} 
						}
						
						if(array4.length>0){
							try {
								HashMap params = new HashMap();
								params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
								params.put("EXMPL_TYPE", EXMPL_TYPE);
								params.put("left_sep_cnt", array1[0]);
								for(int i=1; i<=array4.length-1; i++){
									params.put("left_sep_"+i, Integer.parseInt(array1[i]));
								}
								if(array4.length==6){
									for(int i=6; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array4.length==7){
									for(int i=7; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array4.length==8){
									for(int i=8; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array4.length==9){
									for(int i=9; i<=10; i++){
										params.put("left_sep_"+i, null);
									}
								}else if(array4.length==10){
									params.put("left_sep_10", null);

								}
								params.put("right_sep_cnt", "");					
								for(int i=1; i<=10; i++){
									params.put("right_sep_"+i, null);
								}
								boolean b = themaMapManageDao.addNewThemaEXMPL(params);
							} catch (NullPointerException e) {
								logger.error(e);
								throw e;
							} 
						}
					}else{
						if(paramMap.containsKey("DATA_SIDO")){
							array1 = paramMap.get("DATA_SIDO").toString().split(",");	
						}
						if(paramMap.containsKey("DATA_GUGUN")){
							array2 = paramMap.get("DATA_GUGUN").toString().split(",");	
						}
						if(paramMap.containsKey("DATA_DONG")){
							array3 = paramMap.get("DATA_DONG").toString().split(",");	
						}
						if(paramMap.containsKey("DATA_EX")){
							array4 = paramMap.get("DATA_EX").toString().split(",");	
						}
						if(paramMap.containsKey("DATA_SIDO_RIGHT")){
							array5 = paramMap.get("DATA_SIDO_RIGHT").toString().split(",");	
						}
						if(paramMap.containsKey("DATA_GUGUN_RIGHT")){
							array6 = paramMap.get("DATA_GUGUN_RIGHT").toString().split(",");	
						}
						if(paramMap.containsKey("DATA_DONG_RIGHT")){
							array7 = paramMap.get("DATA_DONG_RIGHT").toString().split(",");	
						}
						if(paramMap.containsKey("DATA_EX_RIGHT")){
							array8 = paramMap.get("DATA_EX_RIGHT").toString().split(",");	
						}
						
						
						if(array1 != null && array1.length>0){
							if(array5 != null && array5.length>0){
								logger.debug("array1 = "+array1.length + "//// array5 = "+array5.length);
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array1.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array1.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==10){
										params.put("left_sep_10", null);

									}

									params.put("right_sep_cnt", array5[0]);
									for(int i=1; i<=array5.length-1; i++){
										params.put("right_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array5.length==6){
										for(int i=6; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array5.length==7){
										for(int i=7; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array5.length==8){
										for(int i=8; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array5.length==9){
										for(int i=9; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array5.length==10){
										params.put("right_sep_10", null);

									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}else{
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array1.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array1.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array1.length==10){
										params.put("left_sep_10", null);

									}
									params.put("right_sep_cnt", "");					
									for(int i=1; i<=10; i++){
										params.put("right_sep_"+i, null);
									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}
						}
						
						if(array2 != null && array2.length>0){
							if(array6 !=null && array6.length>0){
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array2.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array2.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==10){
										params.put("left_sep_10", null);

									}

									params.put("right_sep_cnt", array6[0]);
									for(int i=1; i<=array6.length-1; i++){
										params.put("right_sep_"+i, array1[i]);
									}
									if(array6.length==6){
										for(int i=6; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array6.length==7){
										for(int i=7; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array6.length==8){
										for(int i=8; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array6.length==9){
										for(int i=9; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array6.length==10){
										params.put("right_sep_10", null);

									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}else{
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array2.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array2.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array2.length==10){
										params.put("left_sep_10", null);

									}
									params.put("right_sep_cnt", "");					
									for(int i=1; i<=10; i++){
										params.put("right_sep_"+i, null);
									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}
						}
						
						if(array3 != null && array3.length>0){
							if(array7 != null && array7.length>0){
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array3.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array3.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==10){
										params.put("left_sep_10", null);

									}

									params.put("right_sep_cnt", array6[0]);
									for(int i=1; i<=array7.length-1; i++){
										params.put("right_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array7.length==6){
										for(int i=6; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array7.length==7){
										for(int i=7; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array7.length==8){
										for(int i=8; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array7.length==9){
										for(int i=9; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array7.length==10){
										params.put("right_sep_10", null);

									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}else{
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array3.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array3.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array3.length==10){
										params.put("left_sep_10", null);

									}
									params.put("right_sep_cnt", "");					
									for(int i=1; i<=10; i++){
										params.put("right_sep_"+i, null);
									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}
						}
						if(array4 != null && array4.length>0){
							if(array8 != null && array8.length>0){
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array4.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array4.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==10){
										params.put("left_sep_10", null);

									}

									params.put("right_sep_cnt", array6[0]);
									for(int i=1; i<=array8.length-1; i++){
										params.put("right_sep_"+i, array1[i]);
									}
									if(array8.length==6){
										for(int i=6; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array8.length==7){
										for(int i=7; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array8.length==8){
										for(int i=8; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array8.length==9){
										for(int i=9; i<=10; i++){
											params.put("right_sep_"+i, null);
										}
									}else if(array8.length==10){
										params.put("right_sep_10", null);
									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}else{
								try {
									HashMap params = new HashMap();
									params.put("STAT_THEMA_MAP_ID", cleanXsThemaMapid);
									params.put("EXMPL_TYPE", EXMPL_TYPE);
									params.put("left_sep_cnt", array1[0]);
									for(int i=1; i<=array2.length-1; i++){
										params.put("left_sep_"+i, Integer.parseInt(array1[i]));
									}
									if(array4.length==6){
										for(int i=6; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==7){
										for(int i=7; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==8){
										for(int i=8; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==9){
										for(int i=9; i<=10; i++){
											params.put("left_sep_"+i, null);
										}
									}else if(array4.length==10){
										params.put("left_sep_10", null);

									}
									params.put("right_sep_cnt", "");		
									for(int i=1; i<=10; i++){
										params.put("right_sep_"+i, null);
									}
									boolean b = themaMapManageDao.addNewThemaEXMPL(params);
								} catch (NullPointerException e) {
									logger.error(e);
									throw e;
								} 
							}
						}
						
					}
				}
			}
			
			if(!flag) {
				throw new ApiException("입력값을 체크 해 주세요");
			}

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
			
			paramMap.put("SRV_YN","N");
			return themaMapManageDao.addNewThemaMap(paramMap);
		}  catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
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
		CATEGORY,TITLE,THEMA_MAP_TYPE,SRV_YN,EXP,START_X,START_Y,MAX_LEVEL,MIN_LEVEL,
		MOBILE_YN,DISP_MTHD,REL_STAT_INFO,PRIORTY_YN
	}
	
	private enum OptionParam{
		MOBILE_URL,DATA_YEAR,DATA_ID,MAP_YEAR,MAP_ID,EXMPL_TYPE,ATDRC_YN,LEFT_YEAR,YEAR_INFO,FIX_YN, 
		LEFT_NM, LEFT_UNIT, LEFT_TTIP, LEFT_CHART, LEFT_MAP_TTIP_TITLE, LEFT_SOURCE,LEFT_MAP_INFO,LEFT_MAP_UNIT,LEFT_MAP_TITLE,
		RIGHT_NM,RIGHT_UNIT,RIGHT_TTIP,RIGHT_CHART,RIGHT_MAP_TTIP_TITLE,RIGHT_SOURCE,RIGHT_MAP_INFO,RIGHT_MAP_UNIT,RIGHT_MAP_TITLE,
		DATA_SIDO,DATA_GUGUN,DATA_DONG,DATA_EX,DATA_SIDO_RIGHT,DATA_GUGUN_RIGHT,DATA_DONG_RIGHT,DATA_EX_RIGHT,POI_DISP_YN,THEME_CD
		// mng_s 2017. 08. 04 석진혁
		, CORP_CLASS_CD
		// mng_e 2017. 08. 04 석진혁
	}
}
