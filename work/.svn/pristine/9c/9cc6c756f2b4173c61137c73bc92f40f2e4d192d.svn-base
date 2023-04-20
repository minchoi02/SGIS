package kostat.lbdms.ServiceAPI.common.web.db;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public abstract class HIVEConnector {

	/**
	 * ndap은 아이디와 비번을 주어야 jdbc붙을 수 있음
	 * 하이브 오픈
	 * @param hiveConn
	 * @return
	 */
	public static DBConnector openHive(DBConnector hiveConn,String host,String dbName,String userId,String hivePw) {
		hiveConn = new OpenHiveSql();
		try {
			hiveConn.openConn(host, dbName, hivePw);
		} catch(Exception e) {
			e.printStackTrace();
			// 에러일때는 null
			return null;
		}
		
		return hiveConn;
	}


	

	/**
	 * 테이블 정보 상세조회
	 * @param hiveConn
	 * @param hiveDBName
	 * @param hiveTableName
	 * @return
	 * @throws SQLException
	 */
	public static JSONObject selectTableInfoObj(DBConnector hiveConn, String hiveDBName, String hiveTableName) throws SQLException {
		
		JSONObject resultObject = new JSONObject();
		try {
			JSONArray result = new JSONArray();
			List<String> colList = new ArrayList<String>();
			ResultSet res = null;
			String sql = "describe " + hiveTableName;
			hiveConn.execQuery(sql);
	
			res = hiveConn.getResultSet();
	
			ResultSetMetaData rsmd = res.getMetaData();
			for (int col = 1; col <= rsmd.getColumnCount(); col++) {
				String colName = rsmd.getColumnName(col);
				colList.add(colName);
			}
			while (res.next()) {
				JSONObject object = new JSONObject();
				HashMap<String, String> map = new HashMap<String, String>();
				for (String column : colList) {
					String value = res.getString(column);
					map.put(column, value);
					object.put(column, value);
				}
				result.put(object);
					resultObject.put("COLUMN", colList);
					resultObject.put("VALUE", result);
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return resultObject;
	}

	
}
