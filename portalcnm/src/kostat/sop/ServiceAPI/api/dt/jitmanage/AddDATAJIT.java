package kostat.sop.ServiceAPI.api.dt.jitmanage;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
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
public class AddDATAJIT extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddDATAJIT.class);
	@Resource
	private JITManageDao jitManageDao;

	@Override
	public String getApiId() {
		return "jitmanage_adddatajit";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			List list = new ArrayList();
			paramMap.put("MEMBER_ID", getSession(req, "manager_id"));
			JSONObject json=null;
			try {
				json = new JSONObject(paramMap.get("PARAM_List").toString());
			} 
			//2017.12.04 [개발팀] 시큐어코딩
			catch (IllegalArgumentException e) {
				throw new ApiException("입력값을 체크 해 주세요");
			}
			catch (Exception e) {
				throw new ApiException("파라미터값을 확인해주세요.");
			}
			JSONArray array = json.getJSONArray("LIST");

			int SEQ = jitManageDao.getSEQ(paramMap);
			paramMap.put("SEQ", SEQ);

			Boolean flag = paramMap.get("NM").toString().getBytes().length < 100;

			for (int i = 0; i < array.length(); i++) {
				Map map = new HashMap();
				JSONObject object = (JSONObject) array.get(i);
				Iterator iter = object.keys();
				map.put("API_B_CLASS_CD", paramMap.get("API_B_CLASS_CD"));
				map.put("API_M_CLASS_CD", paramMap.get("API_M_CLASS_CD"));
				map.put("SEQ", SEQ);
				while (iter.hasNext()) {
					String key = (String) iter.next();
					String val = (String) object.get(key);
					map.put(key, val);
				}

				flag = flag && map.get("PARAM_NM").toString().getBytes().length < 20 && map.get("PARAM_VALUE").toString().getBytes().length < 4000;
				flag = flag && map.get("PARAM_EXP").toString().getBytes().length < 200;
				if (!flag)
					throw new ApiException("입력값을 체크 해 주세요");

				String cleanXssPARAMNM = "";
				cleanXssPARAMNM = Security.cleanXss((String) map.get("PARAM_NM"));
				map.put("PARAM_NM", cleanXssPARAMNM);

				String cleanXssPARAM_EXP = "";
				cleanXssPARAM_EXP = Security.cleanXss((String) map.get("PARAM_EXP"));
				map.put("PARAM_EXP", cleanXssPARAM_EXP);
				list.add(map);
			}
			String cleanXssNM = "";
			cleanXssNM = Security.cleanXss((String) paramMap.get("NM"));
			paramMap.put("NM", cleanXssNM);

			paramMap.remove("PARAM_List");
			paramMap.put("LIST", list);
			return jitManageDao.addDATAJIT(paramMap);
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (JSONException e) {
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

	private enum MustParam {
		NM, API_B_CLASS_CD, API_M_CLASS_CD, API_CALL_URL, API_CONTENT_TYPE, API_METHOD_TYPE, PARAM_List
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "입력";
	}

}
