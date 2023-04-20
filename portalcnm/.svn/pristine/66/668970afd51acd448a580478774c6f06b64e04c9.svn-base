package kostat.sop.ServiceAPI.api.dt.pubdatamanage;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.accessmanage.mapper.AccessManageDao;
import kostat.sop.ServiceAPI.api.dt.pubdatamanage.mapper.PubDataManageDao;
import kostat.sop.ServiceAPI.api.dt.relmanage.mapper.RELManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Prompt;
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
public class RegPubDataChange extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(RegPubDataChange.class);
	@Resource
	private PubDataManageDao pubDataManageDao;
	@Override
	public String getApiId() {
		return "RegPubDataChange_add";
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
			
			
			String cleanXssdataId = "";
			cleanXssdataId = Security.cleanXss((String) paramMap.get("DATA_ID"));
			paramMap.put("dataId", cleanXssdataId);
			
			String cleanXssTitle = "";
			cleanXssTitle = Security.cleanXss((String) paramMap.get("TITLE"));
			paramMap.put("TITLE", cleanXssTitle);
			
			String data = "";
			data = (String) paramMap.get("DATA");
			
			String change = "";
			change = (String) paramMap.get("CHANGE");
			
			paramMap.remove("DATA");
			pubDataManageDao.regPubDataId(paramMap);
			
	        JSONArray jsonArr = new JSONArray(data);
	        for (int i = 0; i < jsonArr.length(); i++)
	        {
	        	JSONObject jsonObj = jsonArr.getJSONObject(i);
	            jsonObj.remove("THEMA_MAP_DATA_ID");
	            jsonObj.put("THEMA_MAP_DATA_ID", cleanXssdataId);
	            pubDataManageDao.regExcelData(getMap(jsonObj));
	        }
	        
	        JSONArray jsonArrs = new JSONArray(change);
	        for (int i = 0; i < jsonArrs.length(); i++)
	        {
	        	JSONObject jsonObj = jsonArrs.getJSONObject(i);
	            jsonObj.remove("THEMA_MAP_DATA_ID");
	            jsonObj.put("THEMA_MAP_DATA_ID", cleanXssdataId);
	            pubDataManageDao.regExcelChange(getMap(jsonObj));
	        }
	        Success success = new Success(false,Prompt.ADDFAIL);
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
			return success;
			
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
		TITLE, DATA_ID, DATA, CHANGE
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}
	private static Map getMap(JSONObject object) {
        Map<String, Object> map = new HashMap<String, Object>();

        Object jsonObject = null;
        String key = null;
        Object value = null;

        try {
            Iterator<String> keys = object.keys();
            while (keys.hasNext()) {
                key = null;
                value = null;
                key = keys.next();
                if (null != key && !object.isNull(key)) {
                    value = object.get(key);
                }
                if (value instanceof JSONObject) {
                    map.put(key, getMap((JSONObject) value));
                    continue;
                }
                if (value instanceof JSONArray) {
                    JSONArray array = ((JSONArray) value);
                    List list = new ArrayList();
                    for (int i = 0 ; i < array.length() ; i++) {
                        jsonObject = array.get(i);
                        if (jsonObject instanceof JSONObject) {
                            list.add(getMap((JSONObject) jsonObject));
                        } else {
                            list.add(jsonObject);
                        }
                    }
                    map.put(key, list);
                    continue;
                }
                map.put(key, value);
            }
        } 
        //2017.12.04 [개발팀] 시큐어코딩
        catch (IllegalArgumentException e) {
			logger.error("서버 처리중 오류가 발생했습니다.");
		}
        catch (Exception e) {
            System.out.println("서버 처리중 오류가 발생했습니다.");
        }
        return map;
    }
}
