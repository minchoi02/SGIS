package kostat.lbdms.ServiceAPI.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class GeoCodingUtil {

	private final Log logger = LogFactory.getLog(GeoCodingUtil.class);
	private static GeoCodingUtil instance;
	// String openApiPath ="http://sgisapi.kostat.go.kr";
	String openApiPath = "http://211.41.186.149:8080/SOPOpenAPI";
	String accessToken = "BYPASS";
	String year = "2016";

	private GeoCodingUtil() {

	}

	/*
	 * public GeoCodingUtil getGeoCodingUtil() { if(instance == null) { instance =
	 * new GeoCodingUtil(); } return instance; }
	 */

	public static GeoCodingUtil getGeoCodingUtil() {
		if (instance == null) {
			synchronized (GeoCodingUtil.class) {
				if (instance == null) {
					instance = new GeoCodingUtil();
				}
			}
		}
		return instance;

		// 첫번째 if문에서 instance 가 null인 경우
		// synchronized 블럭에 접근하고 한번 더
		// if문으로 instance가 null 유무를 체크합니다.
		// instance가 null인 경우에 new를 통해 인스턴스화 시킵니다.
		// 그 후에 instance가 null이 아니기 때문에 synchronized 블럭을 타지 않습니다.
		// 이런 Double-checked locking기법을 통해 성능저하를 보완할 수 있습니다.
	}

	private JSONObject getHttpConnection(String address) {
		URL url;
		HttpURLConnection conn;

		StringBuffer sb = null;
		BufferedReader br = null;
		JSONObject jsonObj = null;
		try {
			url = new URL(openApiPath + address);
			conn = (HttpURLConnection) url.openConnection();
			conn.setDoInput(true);
			conn.setDoOutput(true);
			conn.setUseCaches(false);
			conn.setReadTimeout(100000);
			conn.setRequestMethod("GET");

			sb = new StringBuffer();
			br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String str = null;
			while ((str = br.readLine()) != null) {
				sb.append(str);
			}

			jsonObj = new JSONObject(sb.toString());

		} catch (MalformedURLException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		} catch (JSONException e) {
			logger.error(e);
		}

		return jsonObj;
	}

	/**
	 *
	 * sopGeoCode 주소를 통한 지오코딩
	 * 
	 * @param map
	 * @return JSONObject
	 * @throws JSONException
	 */
	public JSONObject sopGeoCode(Map paramMap) throws JSONException {
		StringBuffer url = new StringBuffer();
		url.append("/OpenAPI3/addr/geocode.json?accessToken=");
		url.append(accessToken);
		url.append("&address=" + paramMap.get("addr"));
		JSONObject jsonObj = getHttpConnection(url.toString());
		jsonObj.put("index", paramMap.get("index").toString());
		return jsonObj;
	}

	/**
	 *
	 * sopReverseGeoCode 좌표를 통한 지오코딩
	 * 
	 * @param map
	 * @return JSONObject
	 * @throws JSONException
	 */
	public JSONObject sopReverseGeoCode(Map paramMap) throws JSONException {
		StringBuffer url = new StringBuffer();
		url.append("/OpenAPI3/addr/rgeocode.json?accessToken=");
		url.append(accessToken);
		url.append("&x_coor=" + paramMap.get("x_coor"));
		url.append("&y_coor=" + paramMap.get("y_coor"));
		JSONObject jsonObj = getHttpConnection(url.toString());
		jsonObj.put("index", paramMap.get("index").toString());
		return jsonObj;
	}
	
	
	/**
	 *
	 * admcdGeoCode adm_cd값의 중심 좌표를 찾아내 리턴
	 * 
	 * @param map
	 * @return JSONObject
	 * @throws JSONException
	 */
	public JSONObject admcdCenterGeoCode(Map paramMap) throws JSONException{
	    
	    //7 - > 5 동에서 구
	    //5 - > 2 구에서 시
	    
	    String adm_cd = paramMap.get("adm_cd").toString();
	    String param_cd = null;
	    JSONObject rObj = new JSONObject();
	    if(adm_cd.length() == 7) {
		param_cd = adm_cd.substring(0,5);
	    }else if(adm_cd.length() == 5) {
		param_cd = adm_cd.substring(0,2);
	    }
	    StringBuffer url = new StringBuffer();
		url.append("/OpenAPI3/addr/stage.json?accessToken=");
		url.append(accessToken);
		url.append("&cd=" + param_cd);
		url.append("&pg_yn=" + 0);
		JSONObject jsonObj = getHttpConnection(url.toString());
		JSONArray jsonArray = jsonObj.getJSONArray("result");
		for(int i = 0 ; i < jsonArray.length(); i ++) {
		    JSONObject obj = jsonArray.getJSONObject(i);
		    if(obj.get("cd").toString().equalsIgnoreCase(adm_cd)) {
			rObj = obj;
		    }
		}
		return rObj;
	}

}
