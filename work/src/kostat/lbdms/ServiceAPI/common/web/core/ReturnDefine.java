package kostat.lbdms.ServiceAPI.common.web.core;

import org.json.JSONException;
import org.json.JSONObject;

import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.web.core.Params.Param;


/**
 * @brief 결과 값을 json 형태로 설정하기 위한 클래스 
 */
public class ReturnDefine {
	

	public static String successAction(String actionId) throws JSONException {
		
		JSONObject object = new JSONObject();
		object.put("ID", actionId);
		object.put(Param.RESULT.getName(), Param.SUCCESS.getName());
		object.put(Param.MESSAGE.getName(), Param.SUCCESS.getName());
		object.put(Param.REQUEST_TIME.getName(), DateUtil.getTimeStamp(DateUtil.getToday()));
		return object.toString();
	}
	
	public static String successResult(Object message) throws JSONException 
	{
		JSONObject object = new JSONObject();
		object.put(Param.RESULT.getName(), Param.SUCCESS.getName());
		object.put(Param.MESSAGE.getName(), message);
		object.put(Param.REQUEST_TIME.getName(), DateUtil.getTimeStamp(DateUtil.getToday()));
		return object.toString();
	}
 
	public static String success() throws JSONException 
	{
		JSONObject object = new JSONObject();
		object.put(Param.RESULT.getName(), Param.SUCCESS.getName());
		object.put(Param.MESSAGE.getName(), Param.SUCCESS.getName());
		object.put(Param.REQUEST_TIME.getName(), DateUtil.getTimeStamp(DateUtil.getToday()));
		return object.toString();
	}
}
