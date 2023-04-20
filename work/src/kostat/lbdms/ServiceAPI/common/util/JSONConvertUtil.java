package kostat.lbdms.ServiceAPI.common.util;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @Class Name : JSONConvertUtil.java
 * @Description : JSONObject 자료 변환 유틸
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2018.07.16 최초생성
 *
 * @author 최재영
 * @since 2018. 08.09
 * @version 1.0
 * @see
 *
 *      Copyright (C) by NeighborSystem All right reserved.
 */
public class JSONConvertUtil {

    public static Map<String, Object> jsonToMap(JSONObject json) throws JSONException {
	Map<String, Object> retMap = new HashMap<String, Object>();

	if (json != JSONObject.NULL) {
	    retMap = toMap(json);
	}
	return retMap;
    }

    public static Map<String, Object> toMap(JSONObject object) throws JSONException {
	Map<String, Object> map = new HashMap<String, Object>();

	Iterator<String> keysItr = object.keys();
	while (keysItr.hasNext()) {
	    String key = keysItr.next();
	    Object value = object.get(key);

	    if (value instanceof JSONArray) {
		value = toList((JSONArray) value);
	    }

	    else if (value instanceof JSONObject) {
		value = toMap((JSONObject) value);
	    }
	    map.put(key, value);
	}
	return map;
    }

    public static List<Object> toList(JSONArray array) throws JSONException {
	List<Object> list = new ArrayList<Object>();
	for (int i = 0; i < array.length(); i++) {
	    Object value = array.get(i);
	    if (value instanceof JSONArray) {
		value = toList((JSONArray) value);
	    }

	    else if (value instanceof JSONObject) {
		value = toMap((JSONObject) value);
	    }
	    list.add(value);
	}
	return list;
    }
    
    public static JSONArray strToJSONArray(String str) throws JSONException {
	JSONArray jArray = new JSONArray(str);
	return jArray;
    }
    
    public static JSONObject mapToJson(Map<String,Object> map) throws JSONException{
	JSONObject json = new JSONObject(); 
	//1단계만 JSON
	for(Map.Entry<String, Object> elem : map.entrySet()) {
	    json.put(elem.getKey(), elem.getValue().toString());
	}
	 return json;
    }
    
    public static JSONArray ListToJSONArray(List<Map<String,Object>> list) throws JSONException {
	JSONArray jarray = new JSONArray();
	
	for(int i = 0 ; i < list.size();i++) {
	    Map <String,Object> map = list.get(i);
	    JSONObject jobj = mapToJson(map);
	    jarray.put(jobj);
	}
	
	return jarray;
    }
}
