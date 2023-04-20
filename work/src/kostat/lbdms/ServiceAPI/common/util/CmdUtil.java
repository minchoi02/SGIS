package kostat.lbdms.ServiceAPI.common.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @brief command 공통 클래스
 */
public class CmdUtil {
	
	private static Logger logger = Logger.getLogger(CmdUtil.class);
	
	public static JSONObject getParams(JSONObject msgObject) throws JSONException {

		String command1 = null;
		String command2 = null;
		String command3 = null;
		String command4 = null;

		JSONObject obj1 = new JSONObject();
		JSONObject obj2 = new JSONObject();
		JSONObject obj3 = new JSONObject();
		JSONObject obj4 = new JSONObject();

		JSONObject params = new JSONObject();

		if (msgObject.has("PARAM")) {
			params = msgObject.getJSONObject("PARAM");
		} else {

			if (msgObject.has("CMD1")) {
				command1 = msgObject.getString("CMD1");
				obj1 = msgObject.getJSONObject(command1);

				if (obj1.has("CMD2")) {
					command2 = obj1.getString("CMD2");
					obj2 = obj1.getJSONObject(command2);
					if (obj2.has("CMD3")) {
						command3 = obj2.getString("CMD3");
						obj3 = obj2.getJSONObject(command3);
						if (obj3.has("CMD4")) {
							command4 = obj3.getString("CMD4");
							obj4 = obj3.getJSONObject(command4);
							boolean test = obj4.has("PARAM");
							System.out.println(test + "");
							if (obj4.has("PARAM")) {
								params = obj4.getJSONObject("PARAM");
								System.out.println(obj4.getJSONObject("PARAM").toString());
							} else {
								params.put("NO_PARAM", "NO_PARAM");
							}
						} else if (obj3.has("PARAM")) {
							params = obj3.getJSONObject("PARAM");
						} else {
							params.put("NO_PARAM", "NO_PARAM");
						}
					} else if (obj2.has("PARAM")) {
						params = obj2.getJSONObject("PARAM");
					} else {
						params.put("NO_PARAM", "NO_PARAM");
					}
				} else if (obj1.has("PARAM")) {
					params = obj1.getJSONObject("PARAM");
				} else {
					params.put("NO_PARAM", "NO_PARAM");
				}
			}
		}
		return params;
	}

	public static String sendResponse(Object message, String result) throws JSONException {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("RESULT", result);
		map.put("MESSAGE", message);
		map.put("REQUEST_TIME", DateUtil.getTimeStamp().toString());
		JSONObject resultObject = makeResult(map);
		return resultObject.toString();
	}

	public static JSONObject makeResult(HashMap<String, Object> param) throws JSONException {
		JSONObject object = new JSONObject();
		Set<String> key = param.keySet();
		for (Iterator<String> iterator = key.iterator(); iterator.hasNext();) {
			String keyName = (String) iterator.next();
			Object valueName = param.get(keyName);
			object.put(keyName, valueName);
		}
		return object;
	}

	public static JSONObject makePosDesc(boolean bAddTot, boolean bAddBas, String xColumn, String yColumn, String geomColumn, String columns, String method) throws JSONException {
		JSONObject colDesc = new JSONObject();
		JSONArray columnDescArray = new JSONArray();
		
		if (method != null && columns != null) {
			colDesc = makeColumnDescJson(method, columns, colDesc);
			columnDescArray.put(colDesc);
		}
		
		if (geomColumn != null) {
			colDesc = makeColumnDescJson("geom", geomColumn, colDesc);
			columnDescArray.put(colDesc);
		}
		
		if (xColumn != null && yColumn != null) {
			colDesc = makeColumnDescJson("XY", xColumn + "," + yColumn, colDesc);
			columnDescArray.put(colDesc);
		}
		
		if(bAddTot) {
			colDesc = makeColumnDescJson("집계구 XY", "tot_x,tot_y", colDesc);
			columnDescArray.put(colDesc);
			
			colDesc = makeColumnDescJson("집계구 코드", "tot_oa_cd", colDesc);
			columnDescArray.put(colDesc);
			
			colDesc = makeColumnDescJson("행정구 코드", "adm_dr_cd", colDesc);
			columnDescArray.put(colDesc);
		}
			
		
		if(bAddBas) {
			colDesc = makeColumnDescJson("기초단위구 XY", "bas_x,bas_y", colDesc);
			columnDescArray.put(colDesc);
			
			colDesc = makeColumnDescJson("기초단위구 코드", "bas_cd", colDesc);
			columnDescArray.put(colDesc);
		}
		
		
		JSONObject obj = new JSONObject();
		obj.put("pos_col_infos", columnDescArray);
		
		return obj;
	}
	public static JSONObject makeColumnDescJson(String desc, String column, JSONObject param) throws JSONException {
		param = new JSONObject();
		param.put("pos_method", desc);
		param.put("pos_columns", column);
		param.put("lable_columns", "");
		return param;
	}
	
	private static String hiveToPgType(String dataType) {
			
		return "character varying";


	}

	
	
}
