package kostat.lbdms.ServiceAPI.data;


import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.web.core.GetSize;
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.controller.model.system.ResourceVO;

public class DBCRUDFunc {
	private static Logger logger = Logger.getLogger(DBCRUDFunc.class);
	
	public static int insertResource(DBConnector pgConn, String tableName, String userId,
			JSONObject params, JSONObject postInfo, String dataStorageType) throws JSONException, SQLException {
		
		ResourceVO resourceVo = new ResourceVO();
		resourceVo.setData_storage_type(dataStorageType);
		
		if(postInfo!=null) {
			resourceVo.setPos_column_desc(postInfo.toString());
		}
		if(params.has("DESCRIPTION")) {
			resourceVo.setDescription(params.getString("DESCRIPTION"));
		}
		if(params.has("ACTION_TYPE")) {
			resourceVo.setAction_type(params.getString("ACTION_TYPE"));
		}
		if(params.has("NEW_CATEGORY1")) {
			resourceVo.setCategory1(params.getString("NEW_CATEGORY1"));
		}
		if(params.has("NEW_CATEGORY2")) {
			resourceVo.setCategory2(params.getString("NEW_CATEGORY2"));
		}
		if(params.has("NEW_CATEGORY3")) {
			resourceVo.setCategory3(params.getString("NEW_CATEGORY3"));
		}
		if(params.has("NEW_CATEGORY4")) {
			resourceVo.setCategory4(params.getString("NEW_CATEGORY4"));
		}
		resourceVo.setData_name(tableName);
		resourceVo.setUser_id(userId);
		resourceVo.setData_storage_type(dataStorageType);
		if(params.has("USER_DIV")) {
			String userDiv = params.getString("USER_DIV");
			if(!userDiv.equals("o")) {
				resourceVo.setDownload_apply("1");
				
			}
		}
		resourceVo.setData_cnt( GetSize.getPgCount(pgConn, userId, tableName));
		resourceVo.setData_size("" + Long.parseLong(GetSize.getPgSize(pgConn, userId, tableName)));
		resourceVo.setData_create_time("" + DateUtil.getTimeStamp());
		resourceVo.setUser_id(userId);
		
		return insertRes(resourceVo);
		
	}

	public static void sendResourceInsertAndExecuteUpdate(  JSONObject resourceParam ) throws JSONException, SQLException {
		insertResourceUpdateExecute(resourceParam);
	}
	
	
	public static void sendResourceInsertOrUdate(String userId, String tableName, String description, String actionType,
			String executeId, String category4) throws JSONException{
		JSONObject param = new JSONObject();
		
		if (description != null) {
			param.put("DESCRIPTION", description);
		}
		param.put("ACTION_TYPE", actionType);
		param.put("EXECUTE_ID", executeId);
		param.put("USER_ID", userId);
		param.put("DATA_STORAGE_TYPE", "PG");
		param.put("DATA_SIZE", "10");
		param.put("DATA_CNT", "1");
		param.put("DATA_NAME", tableName);
		param.put("CATEGORY4", category4);
		param.put("DATA_CREATE_TIME", DateUtil.getNowTime());
		insertOrUpdate(param);
	}
	
	
	public static int insertResourcePgData(DBConnector pgConn, String userId, String tableName, String description) {

		try {
			JSONObject param = new JSONObject();
			if (description != null) {
				param.put("DESCRIPTION", description);
			}
			param.put("USER_ID", userId);
			param.put("DATA_STORAGE_TYPE", "PG");
			param.put("DATA_SIZE", GetSize.getPgSize(pgConn, userId, tableName ));
			param.put("DATA_CNT", GetSize.getPgCount(pgConn, userId, tableName));
			param.put("DATA_NAME", tableName);
			param.put("CATEGORY4", "STORAGE");
			param.put("DATA_CREATE_TIME", DateUtil.getNowTime());

			int retB = insertResource(param);
			return retB;

		} catch (SQLException | JSONException e) {

			return -3;
		}
	}

	public static void insertResourcePgDataWithException(DBConnector pgConn, String userId, String tableName, String description) throws Exception {

		try {
			JSONObject param = new JSONObject();
			if (description != null) {
				param.put("DESCRIPTION", description);
			}
			param.put("USER_ID", userId);
			param.put("DATA_STORAGE_TYPE", "PG");
			param.put("DATA_SIZE", GetSize.getPgSize(pgConn, userId, tableName ));
			param.put("DATA_CNT", GetSize.getPgCount(pgConn, userId, tableName));
			param.put("DATA_NAME", tableName);
			param.put("CATEGORY4", "STORAGE");
			param.put("DATA_CREATE_TIME", DateUtil.getNowTime());

			int retB = insertResource(param);
		} catch (SQLException | JSONException e) {
			logger.error(e.getMessage(), e);
			throw new Exception(e.getMessage());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new Exception(e.getMessage());
		}
	}

	public static void sendResourceInsertOrUdate(DBConnector pgConn, String userId, String tableName, String xColumn,
			String yColumn, String description, String actionType, String executeId, JSONObject obj,
			String geometryType) throws JSONException, SQLException {

		JSONObject param = new JSONObject();
		if (description != null) {
			param.put("DESCRIPTION", description);
		}
		param.put("ACTION_TYPE", actionType);
		param.put("EXECUTE_ID", executeId);
		param.put("USER_ID", userId);
		param.put("DATA_STORAGE_TYPE", "PG");
		param.put("DATA_SIZE", GetSize.getPgSize(pgConn, userId, tableName));
		param.put("DATA_CNT", GetSize.getPgCount(pgConn, userId, tableName));
		param.put("DATA_NAME", tableName);
		param.put("CATEGORY4", "STORAGE");
		param.put("DATA_CREATE_TIME", DateUtil.getNowTime());
		param.put("X_COLUMN", xColumn);
		param.put("Y_COLUMN", yColumn);
		param.put("GEOMETRY_TYPE", geometryType);
		if (obj != null) {
			param.put("POS_COLUMN_DESC", obj);
		}
		param.put("DATA_CREATE_TIME", DateUtil.getNowTime());
		insertOrUpdate(param);

	}
	
	public static int insertResource(JSONObject JSON) {
		
		return 0;
	}
	public static int insertRes(ResourceVO resourceVo) {
		
		return 0;
	}
	
	public static void insertOrUpdate(JSONObject JSON) {
		
		return;
	}

	public static void insertResourceUpdateExecute(JSONObject JSON) {
		
		return;
	}
}

 