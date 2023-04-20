package kostat.lbdms.ServiceAPI.common.web.db;

import java.beans.PropertyVetoException;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.postgresql.PGConnection;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.data.Column;
import kostat.lbdms.ServiceAPI.data.DataContainer;
import kostat.lbdms.ServiceAPI.data.TableMeta;


public class PgUtil {
	private static Logger logger = Logger.getLogger(PgUtil.class);

	/**
	 * 테이블 유무 조회
	 * 
	 * @param pgConn
	 * @param user
	 * @param tableName
	 * @return
	 * @throws SQLException
	 * @throws ClassNotFoundException
	 */
	public static boolean tableExistsCheckB(DBConnector pgConn, String user, String tableName)
			throws SQLException, ClassNotFoundException {

		int tableExistsCheck = 0;
		String query = "SELECT COUNT(*) as cnt FROM pg_tables WHERE schemaname='" + user + "' AND tablename='"
				+ tableName + "';";

		pgConn.execQuery(query);
		ResultSet rs = pgConn.getResultSet();
		while (rs.next()) {
			tableExistsCheck = rs.getInt("cnt");
		}
		if (tableExistsCheck > 0) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * 피지 테이블 삭제
	 * 
	 * @param schema
	 * @param tableNm
	 * @param pgConn
	 * @throws SQLException
	 */
	public static void dropTable(String schema, String tableNm, DBConnector pgConn) throws SQLException {
		pgConn.execQuery("DROP TABLE IF EXISTS " + schema + "." + tableNm);
	}
	

	/**
	 * pg truncate
	 * 
	 * @param schema
	 * @param tableNm
	 * @param pgConn
	 * @throws SQLException
	 */
	public static void truncateTable(String schema, String tableNm, DBConnector pgConn) throws SQLException {
		pgConn.execQuery("TRUNCATE TABLE " + schema + "." + tableNm);
	}


	
	
	/**
	 * 테이블 유무 조회
	 * @param pgConn
	 * @param user
	 * @param tableName
	 * @return
	 * @throws SQLException
	 */
	public static String tableExistsCheck(DBConnector pgConn, String user , String tableName) throws SQLException {
		
		String tableExistsCheck = "";
		String query = "SELECT COUNT(*) as cnt FROM pg_tables WHERE schemaname='"
						+ user + "' AND tablename='" + tableName +"';";
		
		pgConn.execQuery(query);
		ResultSet rs = pgConn.getResultSet();
		while(rs.next()) {
			tableExistsCheck = rs.getString("cnt");
		}
		return tableExistsCheck;
		
	}
	
	
	/**
	 * 테이블 유무 조회
	 * @param pgConn
	 * @param user
	 * @param tableName
	 * @return
	 * @throws SQLException
	 * @throws ClassNotFoundException 
	 * @throws IOException 
	 */
	public static boolean tableExistsCheck(String user , String tableName) throws SQLException, ClassNotFoundException, IOException {
		DBConnector pgConn = new OpenPGSql();
		ClassPathResource resource = new ClassPathResource("/globals.properties");
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		
		String tableNameLS = tableName.toLowerCase(); 
		try {
			pgConn.openConn(props.getProperty("db.url"), user, props.getProperty("db.pass"));
			
			int tableExistsCheck = 0;
			String query = "SELECT COUNT(*) as cnt FROM pg_tables WHERE schemaname='"
					+ user + "' AND tablename='" + tableNameLS +"';";
			
			pgConn.execQuery(query);
			ResultSet rs = pgConn.getResultSet();
			while(rs.next()) {
				tableExistsCheck = rs.getInt("cnt");
			}
			if(tableExistsCheck>0) {
				return true;
			} else {
				return false;
			}
			
		} finally {
			pgConn.closeConn();
		}
		
	}
	
	
	
	
	

	/**
	 * 테이블 유무 조회
	 * @param pgConn
	 * @param user
	 * @param tableName
	 * @return
	 * @throws SQLException
	 * @throws ClassNotFoundException 
	 */
	public static boolean tableExistsCheckB(String user , String tableName) 
			throws PropertyVetoException, IOException, SQLException, ClassNotFoundException {
		DBConnector pgConn = new OpenPGSql();
		try {
			//pgConn.openConn(props.getProperty("db.url"), dbName, props.getProperty("db.pass"));
			pgConn.openConn();
			
			int tableExistsCheck = 0;
			String query = "SELECT COUNT(*) as cnt FROM pg_tables WHERE schemaname='"
					+ user + "' AND tablename='" + tableName +"';";
			
			pgConn.execQuery(query);
			ResultSet rs = pgConn.getResultSet();
			while(rs.next()) {
				tableExistsCheck = rs.getInt("cnt");
			}
			if(tableExistsCheck>0) {
				return true;
			} else {
				return false;
			}
			
		} finally {
			pgConn.closeConn();
		}
		
	}

	/**
	 * 피지 숫자타입 체크
	 * 
	 * @param columnType
	 * @return
	 */
	public static boolean pgColumnTypeNumCheck(String columnType) {

		if (columnType.equals("smallint") || columnType.equals("integer") || columnType.equals("bigint")
				|| columnType.equals("numeric") || columnType.equals("double precision") || columnType.equals("real")
				|| columnType.equals("float") || columnType.equals("int2") || columnType.equals("int4")
				|| columnType.equals("int8") || columnType.equals("numeric") || columnType.equals("float4")
				|| columnType.equals("float8") || columnType.equals("serial") || columnType.equals("bigserial")) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 피지 숫자 타입 체크
	 * 
	 * @param schema
	 * @param tableName
	 * @param columnName
	 * @param pgConn
	 * @return
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 */
	public static boolean getColumnType(String schema, String tableName, String columnName, DBConnector pgConn)
			throws ClassNotFoundException, SQLException {
		boolean numType = false;
		try {
			String strQuery = "select data_type as type from information_schema.columns " + "where table_schema = '"
					+ schema + "' and table_name = '" + tableName + "' and column_name = '" + columnName + "'";
			pgConn.execQuery(strQuery);

			ResultSet rs = pgConn.getResultSet();
			while (rs.next()) {
				String value = rs.getString("type");
				if (value.equals("smallint") || value.equals("integer") || value.equals("bigint")
						|| value.equals("numeric") || value.equals("double precision") || value.equals("real")) {
					numType = true;
				}
			}
		} finally {
			pgConn.closeConn();
		}

		return numType;
	}

	/**
	 * 컬럼 갯수 체크
	 * 
	 * @param dbConn
	 * @param schema
	 * @param tableNm
	 * @return
	 * @throws SQLException
	 */
	public static int getColumnCnt(DBConnector dbConn, String schema, String tableNm) throws SQLException {

		tableNm = tableNm.toLowerCase();
		int cnt = 0;
		dbConn.execQuery("select count(*) as cnt from information_schema.columns where table_name='" + tableNm
				+ "' and table_schema = '" + schema + "'");
		ResultSet result = dbConn.getResultSet();
		while (result.next()) {
			cnt = result.getInt("cnt");
		}

		return cnt;
	}
	
	
	public static int getColumnCntWithException(DBConnector dbConn, String schema, String tableNm) throws Exception {

		tableNm = tableNm.toLowerCase();
		int cnt = 0;
		dbConn.execQuery("select count(*) as cnt from information_schema.columns where table_name='" + tableNm
				+ "' and table_schema = '" + schema + "'");
		ResultSet result = dbConn.getResultSet();
		while (result.next()) {
			cnt = result.getInt("cnt");
		}

		return cnt;
	}

	/**
	 * shp테이블 인덱스 생성
	 * 
	 * @param pgConn
	 * @param userId
	 * @param tableName
	 * @return
	 * @throws SQLException
	 */
	public static void shpTableMakeIndex(DBConnector pgConn, String userId, String tableName) throws SQLException {

		String indexName = DateUtil.getRandomTableName(tableName);
		
//		String sql = "CREATE INDEX " + userId + "_" + tableName + "_" + "index ON " + userId + "." + tableName
//				+ " USING gist (geom);";

		String sql = "CREATE INDEX " + indexName + " ON " + userId + "." + tableName
				+ " USING gist (geom);";
		pgConn.retExecQueryNoResult(sql);
		
		
	}

	/**
	 * 테이블 토탈 카운트
	 * 
	 * @param pgConn
	 * @return
	 * @throws SQLException
	 */
	public static String readTotalCountFromPg(DBConnector pgConn, String schema, String tbNm) throws SQLException {
		String strQuery = "select count(*) from " + schema + "." + tbNm;
		pgConn.execQuery(strQuery);
		String totalCount = "";
		ResultSet result = pgConn.getResultSet();
		while (result.next()) {
			totalCount = result.getString("count");
		}
		return totalCount;
	}

	/**
	 * 테이블 웨어조건 카운트
	 * 
	 * @param pgConn
	 * @param schema
	 * @param tbNm
	 * @param query
	 * @return
	 * @throws SQLException
	 */
	public static String readTotalCntFromPgWhereQ(DBConnector pgConn, String schema, String tbNm, String query)
			throws SQLException {
		String strQuery = "select count(*) from " + schema + "." + tbNm + " WHERE " + query;
		pgConn.execQuery(strQuery);
		String totalCount = "";
		ResultSet result = pgConn.getResultSet();
		while (result.next()) {
			totalCount = result.getString("count");
		}
		return totalCount;
	}

	/**
	 * 컬럼 유무 조회
	 * 
	 * @param pgConn
	 * @param schema
	 * @param tableName
	 * @param columnName
	 * @return
	 * @throws SQLException
	 */
	public static boolean columnExistsCheck(DBConnector pgConn, String schema, String tableName, String columnName)
			throws SQLException {

		String checkColumn = "SELECT column_name FROM information_schema.columns WHERE table_name='" + tableName
				+ "' and table_schema='" + schema + "'";
		boolean check = false;
		pgConn.execQuery(checkColumn);
		ResultSet rs = pgConn.getResultSet();
		while (rs.next()) {
			String colName = rs.getString("column_name");
			if (columnName.equals(colName)) {
				check = true;
				break;
			}
		}
		return check;
	}

	/**
	 * 컬럼 유무 조회
	 * 
	 * @param pgConn
	 * @param schema
	 * @param tableName
	 * @param arrColumnName
	 * @return
	 * @throws SQLException
	 */
	public static boolean columnExistsCheck(DBConnector pgConn, String schema, String tableName,
			ArrayList<?> arrColumnName) throws SQLException {

		String checkColumn = "SELECT column_name FROM information_schema.columns WHERE table_name='" + tableName
				+ "' and table_schema='" + schema + "'";
		pgConn.execQuery(checkColumn);
		ResultSet rs = pgConn.getResultSet();
		while (rs.next()) {
			if (arrColumnName.size() == 0) {
				break;
			}
			String colName = rs.getString("column_name");
			for (int ii = 0; ii < arrColumnName.size(); ii++) {
				if (colName.equals(arrColumnName.get(ii))) {
					arrColumnName.remove(ii);
					break;
				}
			}
		}
		if (arrColumnName.size() == 0) {
			return true;
		} else {
			return false;
		}
	}

	
	public static int dataPgInsert(String userId, String outputTableName, String delimiter, boolean header,
			String path) {
		Connection connection = null;

		FileReader reader = null;

		try {

			reader = new FileReader(path);
			connection = PgDataSource.getInstance().getConnection();
			CopyManager copyManager = connection.unwrap(PGConnection.class).getCopyAPI();

			String copySql = "COPY " + userId + "." + outputTableName + " FROM STDIN with delimiter '" + delimiter
					+ "' NULL AS ''";
			if (header) {
				copySql += " CSV HEADER;";
			} else {
				copySql += " CSV;";

			}
			System.out.println(copySql);
			copyManager.copyIn(copySql, reader);
			reader.close();

		} catch (SQLException | IOException e) {
			e.printStackTrace();
			return -2;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally {
			try {
				connection.close();
				reader.close();
			} catch (SQLException | IOException e) {
				return -0;
			}
		}

		return 1;
	}
	
	public static void dataPgInsertWithException(String userId, String outputTableName, String delimiter, boolean header,
			String path) throws Exception {
		Connection connection = null;

		FileReader reader = null;

		try {

			reader = new FileReader(path);
			connection = PgDataSource.getInstance().getConnection();
			CopyManager copyManager = connection.unwrap(PGConnection.class).getCopyAPI();

			String copySql = "COPY " + userId + "." + outputTableName + " FROM STDIN with delimiter '" + delimiter
					+ "' NULL AS ''";
			if (header) {
				copySql += " CSV HEADER;";
			} else {
				copySql += " CSV;";

			}
			System.out.println(copySql);
			copyManager.copyIn(copySql, reader);
			reader.close();

		} catch (SQLException | IOException e) {
			logger.error(e.getMessage(), e);
			throw new Exception(e.getMessage(), e);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new Exception(e.getMessage(), e);
		} finally {
			try {
				connection.close();
				reader.close();
			} catch (SQLException | IOException e) {
				logger.error(e.getMessage(), e);
				throw new Exception(e.getMessage());
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				throw new Exception(e.getMessage());
			}
		}
	}

	/**
	 * 인서트문 생성
	 * 
	 * @param schema
	 * @param outputTableName
	 * @param pgConn
	 * @return
	 */
	public static String makeInsertQuery(String schema, String outputTableName, DBConnector pgConn) {
		String query = "SELECT * FROM " + schema + "." + outputTableName + " limit 1";
		String insertQuery = "INSERT INTO " + schema + "." + outputTableName + " (";

		try {
			pgConn.execQuery(query);
			ResultSet resultRs = pgConn.getResultSet();
			ResultSetMetaData resultMeta = resultRs.getMetaData();
			for (int ii = 0; ii < resultMeta.getColumnCount(); ii++) {
				if (ii < resultMeta.getColumnCount() - 1) {
					insertQuery += resultMeta.getColumnLabel(ii + 1) + ",";
				} else {
					insertQuery += resultMeta.getColumnLabel(ii + 1) + ")";
				}
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		logger.info("인서트쿼리 : " + insertQuery);
		return insertQuery;
	}

	/**
	 * 컬럼 존재유무 체크
	 * 
	 * @param schema
	 * @param tableName
	 * @param columnList
	 * @return
	 * @throws PropertyVetoException
	 * @throws IOException
	 * @throws JSONException
	 */
	public static JSONArray columnListExistCheck(String schema, String tableName, ArrayList<String> columnList)
			throws IOException, PropertyVetoException, JSONException {

		DBConnector pgConn = new OpenPGSql();

		JSONArray resultArray = new JSONArray();
		try {
			pgConn.openConn();
			String query = "SELECT * FROM " + schema + "." + tableName + " limit 1";
			pgConn.execQuery(query);

			ResultSet result = pgConn.getResultSet();

			ResultSetMetaData meta = result.getMetaData();

			String colName = null;
			String colType = null;
			int nColumnCnt = meta.getColumnCount();

			for (int ii = 0; ii < nColumnCnt; ii++) {
				JSONObject columnObj = new JSONObject();
				colName = meta.getColumnName(ii + 1);
				colType = meta.getColumnTypeName(ii + 1);

				String checkColumn = "";
				for (int columnSize = 0; columnSize < columnList.size(); columnSize++) {
					checkColumn = columnList.get(columnSize);

					if (checkColumn.equalsIgnoreCase(colName)) {
						columnObj.put("COLUMN_NAME", checkColumn);
						columnObj.put("COLUMN_TYPE", colType);
						columnObj.put("COLUMN_YN", true);
						resultArray.put(columnObj);
						break;
					}

				}

			}
			return resultArray;

		} catch (SQLException | ClassNotFoundException e) {
			return resultArray;
		} finally {
			pgConn.closeConn();
		}

	}

	/**
	 * 지오메트리 컬럼 타입 조회
	 * 
	 * @param schema
	 * @param tableName
	 * @param pgConn
	 * @param geomColumnNm
	 * @return
	 * @throws SQLException
	 */
	public static String getGeometryType(String schema, String tableName, DBConnector pgConn, String geomColumnNm)
			throws SQLException {
		String result = null;
		String selectQuery = "select geometrytype(" + geomColumnNm + ") from " + schema + "." + tableName + " limit 1";
		pgConn.execQuery(selectQuery);
		ResultSet res = pgConn.getResultSet();
		while (res.next()) {
			result = res.getString("geometrytype");
		}

		return result;
	}

	/**
	 * 지오메트리 컬럼이름 조회
	 * 
	 * @param schema
	 * @param tableName
	 * @param pgConn
	 * @return
	 * @throws SQLException
	 */
	public static String getGeometryColumnName(String schema, String tableName, DBConnector pgConn)
			throws SQLException {
		String selectSql = "SELECT * FROM " + schema + "." + tableName + " limit 1";
		pgConn.execQuery(selectSql);
		ResultSet result = pgConn.getResultSet();
		ResultSetMetaData metaData = result.getMetaData();
		String geomColumnNm = null;
		while (result.next()) {
			for (int jj = 1; jj < metaData.getColumnCount() + 1; jj++) {
				String columnType = metaData.getColumnTypeName(jj);
				if (columnType.equals("geometry")) {
					geomColumnNm = metaData.getColumnLabel(jj);
					break;
				}
			}
		}

		return geomColumnNm;
	}

	/**
	 * gis 테이블 생성
	 * 
	 * @param pgConn
	 * @param schema
	 * @return
	 * @throws SQLException
	 */
	public static String createGisTable(DBConnector pgConn, String schema) throws SQLException {

		String createTableName = DateUtil.getRandomTableName("gis");
		String createSql = "CREATE TABLE " + schema + "." + createTableName + "(gid bigserial, geom geometry)";
		pgConn.execQueryNoResult(createSql);

		return createTableName;

	}

	/**
	 * geoJson insert
	 * 
	 * @param pgConn
	 * @param schema
	 * @param tableName
	 * @param geoJsonList
	 * @throws SQLException
	 * @throws JSONException
	 */
	public static void insertGeoJson(DBConnector pgConn, String schema, String tableName, JSONArray geoJsonList)
			throws SQLException, JSONException {

		for (int goeJsonSize = 0; goeJsonSize < geoJsonList.length(); goeJsonSize++) {
			String geoJson = geoJsonList.get(goeJsonSize).toString();
			String insertQuery = "INSERT INTO " + schema + "." + tableName + "(geom) VALUES (ST_GeomFromGeoJSON('"
					+ geoJson + "' ));";
			pgConn.execQueryNoResult(insertQuery);
		}
	}

	public static void insertWkt(DBConnector pgConn, String schema, String tableName, JSONArray geoJsonList)
			throws SQLException, JSONException {
		for (int goeJsonSize = 0; goeJsonSize < geoJsonList.length(); goeJsonSize++) {
			String geoJson = geoJsonList.get(goeJsonSize).toString();
			String insertQuery = "INSERT INTO " + schema + "." + tableName + "(geom) VALUES (st_geomfromtext('"
					+ geoJson + "', 5179 ));";
			pgConn.execQueryNoResult(insertQuery);
		}

	}

	/**
	 * srid 세팅
	 * 
	 * @param pgConn
	 * @param schema
	 * @param tableName
	 * @throws SQLException
	 */
	public static void setSrid(DBConnector pgConn, String schema, String tableName) throws SQLException {
		String sqlSetSrid = "SELECT UpdateGeometrySRID('" + schema + "', '" + tableName.toLowerCase()
				+ "' , 'geom', 5179)";
		pgConn.execQueryNoResult(sqlSetSrid);
	}

	public static String getPgCount(DBConnector pgConn, String schema, String tableName) throws SQLException {
		String result = null;
		String sql = "select count(*) as cnt from " + schema + "." + tableName;
		pgConn.execQuery(sql);
		ResultSet rs = pgConn.getResultSet();
		while (rs.next()) {
			result = rs.getString("cnt");
		}
		return result;
	}

	public static String getPgSize(DBConnector pgConn, String schema, String tableName) throws SQLException {
		String result = null;
		pgConn.execQuery("SELECT pg_total_relation_size('" + schema + "." + tableName + "') as size");
		ResultSet res = pgConn.getResultSet();
		while (res.next()) {
			result = res.getString("size");
		}
		return result;
	}

	/**
	 * @brief 테이블 결과 갯수 조회
	 */
	public static int selectTableCount(DBConnector dbConn, String userId, String tableName) throws SQLException {
		int count = 0;
		String sql = "SELECT COUNT(*) FROM " + userId + "." + tableName;
		dbConn.execQuery(sql);
		ResultSet result = dbConn.getResultSet();
		while (result.next()) {
			int colunmCnt = result.getMetaData().getColumnCount();
			for (int ii = 1; ii < colunmCnt + 1; ii++) {
				count = result.getInt(ii);
			}
		}
		return count;
	}

	/**
	 * 사용자 오픈
	 * 
	 * @return
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 * @throws PropertyVetoException
	 * @throws IOException
	 */
	public static DBConnector openPg() throws ClassNotFoundException, SQLException, IOException, PropertyVetoException {
		DBConnector pgConn = new OpenPGSql();
		pgConn.openConn();

		return pgConn;
	}

	
	public static DBConnector openPg(String userId) throws ClassNotFoundException, SQLException, IOException {
		ClassPathResource resource = new ClassPathResource("/globals.properties");
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		
		DBConnector pgConn = new OpenPGSql();
		pgConn.openConn(props.getProperty("db.url"), userId, props.getProperty("db.pass"));
		
		return pgConn;
	}

	
	// 컬럼 리스트 생성
	public static DataContainer makeColumnList(DBConnector pgConn, String schema, String tbNm,
			DataContainer container) {

		try {
			String query = "SELECT * FROM " + schema + "." + tbNm + " limit 1";
			logger.info("쿼리 : " + query);
			pgConn.execQuery(query);
			ResultSet result = pgConn.getResultSet();

			ResultSetMetaData meta = result.getMetaData();
			int nColumCnt = meta.getColumnCount();
			container.getTableMeta().setTableName(tbNm);
			container.getTableMeta().setSchema(schema);

			for (int ii = 0; ii < nColumCnt; ii++) {
				Column col = new Column();

				String colName = meta.getColumnName(ii + 1);
				String type = meta.getColumnTypeName(ii + 1);
				String[] arr = colName.split("\\.");
				if (arr.length > 1) {
					colName = arr[1];
				} else {
					colName = arr[0];
				}

				col.setLabel(colName);
				col.setType(type);

				container.getTableMeta().getColumnList().add(col);
			}

		} catch (SQLException e) {
			container = null;
		}
		return container;
	}

	public static void dbLinkCopyTable(DBConnector myDbConn, String cpIp, String cpPort, String cpDbNm, String cpPass,
			String superUser, String myTbNm, String mySchema, String cpTbNm, String cpSchema, DataContainer container)
			throws SQLException {

		String connectionNm = DateUtil.getRandomTableName("con");
		try {
			String connectQuery = "SELECT dblink_connect('" + connectionNm + "','hostaddr=" + cpIp + " port=" + cpPort
					+ " dbname=" + cpDbNm + " user=" + "postgres" + " password=" + cpPass + "');";
			myDbConn.retExecQueryNoResult(connectQuery);

			String copyQuery = "CREATE TABLE " + mySchema + "." + myTbNm + " as (SELECT * FROM dblink('" + connectionNm
					+ "','select * from " + cpSchema + "." + cpTbNm + "') AS t1 (";

			ArrayList<Column> colMeta = container.getTableMeta().getColumnList();
			for (int ii = 0; ii < colMeta.size(); ii++) {
				Column field = colMeta.get(ii);
				String label = field.getLabel();
				String type = field.getType();
				if (type.equalsIgnoreCase("bigserial"))
					type = "float8";
				if (colMeta.size() - 1 == ii) {
					copyQuery += label + " ";
					copyQuery += type;
				} else {
					copyQuery += label + " ";
					copyQuery += type + " , ";
				}
			}
			copyQuery += "));";
			myDbConn.retExecQueryNoResult(copyQuery);
		} finally {
			String disconnectQuery = "SELECT dblink_disconnect('" + connectionNm + "')";
			myDbConn.retExecQueryNoResult(disconnectQuery);
		}

	}

	/**
	 * 첫줄 컬럼 데이터 가능 여부 체크
	 * @param firstColumn
	 * @return
	 */
	public static boolean firstRowYN(String[] firstColumn){

		//컬럼이름 검사하기.
		for(int ii = 0;  ii < firstColumn.length; ii++){
			//첫번째 문자가 숫자이면 안됨.
			//한글이면안됨.
			//컬럼길이가 30 넘으면 안됨 default가 31
			//특수문자가 들어가면 안
			String imsiValue = firstColumn[ii];
			boolean numBool = Pattern.matches("^[0-9]*$", imsiValue.substring(0, 1)); //매칭이되면 true 반환
			boolean korBool = Pattern.matches("^[ㄱ-ㅎ가-힣]*$", imsiValue);
			boolean spBool = Pattern.matches("/[!@#$%^&*()?+=\\'\"/]", imsiValue);
			boolean lenBool = imsiValue.length() > 30 ? true : false;
			
			if(numBool || korBool || spBool || lenBool){
				return false;
			}
			
		}
		return true;
		
	}
	
	
	public static boolean ownerChange(String userId, String outputTableName, DBConnector pgConn) {
		String ownerChagneSql = "ALTER TABLE " + userId + "." + outputTableName + " OWNER TO " + userId;
		return pgConn.retExecQueryNoResult(ownerChagneSql);
	}
	
	public static boolean addSericalColumn(String userId, String outputTableName, DBConnector pgConn, String colNm) {
		String addGidColumnQuery = "ALTER TABLE " + userId + "." + outputTableName + " ADD COLUMN "+colNm+" bigserial;";
		return pgConn.retExecQueryNoResult(addGidColumnQuery);
		
	}
	
	//srid변경(추적)
	public static boolean updateSrid(String userId, String outputTableName, DBConnector pgConn ) {
		String setSrid = "SELECT UpdateGeometrySRID('"+userId+"', '"+outputTableName+"' , 'geom', 5179);";
		return pgConn.retExecQueryNoResult(setSrid);
		
	}
	
	public static int makeXYColumn(String userId, String outputTableName, DBConnector pgConn ) {
		boolean retB = false;
		String createXYSql = "alter table "+userId+"."+outputTableName+" add column x double  precision DEFAULT 0;";
		createXYSql += "alter table "+userId+"."+outputTableName+" add column y double  precision DEFAULT 0;";
		retB = pgConn.retExecQueryNoResult(createXYSql);
		if(!retB) return -1;
		
		String generateXYSql = "update "+userId+"."+outputTableName+" set x=st_x(ST_Centroid(geom));";
		generateXYSql += "update "+userId+"."+outputTableName+" set y=st_y(ST_Centroid(geom));";
		retB = pgConn.retExecQueryNoResult(generateXYSql);
		if(!retB) return -2;
		
		return 1;
	}
	
	public static String getGeomColumnName(String userId, String outputTableName, DBConnector pgConn) throws SQLException {
		

		String selectSql = "SELECT * FROM " + userId + "." + outputTableName + " limit 1";
		pgConn.execQuery(selectSql);
		ResultSet result = pgConn.getResultSet();
		ResultSetMetaData metaData = result.getMetaData();
		String geomColumnNm = null;
		while (result.next()) {
			for (int jj = 1; jj < metaData.getColumnCount() + 1; jj++) {
				String columnType = metaData.getColumnTypeName(jj);
				if (columnType.equals("geometry")) {
					geomColumnNm = metaData.getColumnLabel(jj);
					break;
				}
			}
		}
		return geomColumnNm;
		
	}
	
	
	
	public static void columnTypeChange(TableMeta meta, DBConnector pgConn) {
		ArrayList<Column> colList = meta.getColumnList();
		String tableName = meta.getTableName();
		String schema = meta.getSchema();

		for (int colListSize = 0; colListSize < colList.size(); colListSize++) {
			String columnName = colList.get(colListSize).getLabel();
			String alterQuery = "ALTER TABLE " + schema + "." + tableName + " ALTER COLUMN " + columnName
					+ " TYPE integer using " + columnName + " ::integer";
			boolean retB = pgConn.retExecQueryNoResult(alterQuery);
			if(retB) {
				String updateQuery = "update "+schema+"."+tableName+" set "+columnName+" = 0 where "+columnName+" is null";
				pgConn.retExecQueryNoResult(updateQuery);
			}
		}

	}
	
	/**
	 * 컬럼 타입 자동 변경
	 * 컬럼 타입을 AUTO로 지정한 부분에만 영향
	 * @param meta
	 * @param pgConn
	 * @param columnGridData
	 */
	public static void autoColumnTypeChange(TableMeta meta, DBConnector pgConn, JSONArray columnGridData) {
		ArrayList<Column> colList = meta.getColumnList();
		String tableName = meta.getTableName();
		String schema = meta.getSchema();
		int threadCount = 5; // 한 번에 실행할 thread 수

		for (int i = 0; i < colList.size(); i = i + threadCount) {
			// 데이터가 많을 경우 처리 속도가 느리기 때문에
			// 한 번에 threadCount개의 thread 생성하여 실행
			ArrayList<Thread> threads = new ArrayList<Thread>(); // thread array 생성
			int lastCount = (i + threadCount > colList.size()) ? colList.size() : i + threadCount; // 값이 size보다 클 경우 size, 작을 경우 i + threadCount
			
			// i 값으로부터 lastCount 만큼 반복 (기본 5개)
			for (int j = i; j < lastCount; j++) {
				JSONObject gridData = null;
				String gridType = null;
				
				try {
					gridData = (JSONObject) columnGridData.get(j);
					gridType = gridData.getString("type");
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				String columnName = colList.get(j).getLabel();
				Thread thread = null;
				
				thread = new ChangeColumnType(schema, tableName, columnName, gridType, pgConn);
				thread.start();
				threads.add(thread);
				
				logger.info("::::: Thread Count: " + threads.size() + " :::::");
			}
			
			// 모든 thread가 정지됐는지 판별
			while (true) {
				int stoppedCount = 0;
				
				for (int k = 0; k < threads.size(); k++) {
					Thread thread = threads.get(k);
					String state = String.valueOf(thread.getState());
					
					if ("TERMINATED".equalsIgnoreCase(state)) {
						stoppedCount++;
					}
				}
				
				if (stoppedCount == threads.size()) {
					break;
				}
			}
		}
	}
	
	// 2018.08.03 KTK
	// 컬럼 타입 변경 클래스
	public static class ChangeColumnType extends Thread {
		private String schema;
		private String tableName;
		private String columnName;
		private String gridType;
		
		private DBConnector conn;
		
		public ChangeColumnType(String schema, String tableName, String columnName, String gridType, DBConnector conn) {
			this.schema = schema;
			this.tableName = tableName;
			this.columnName = columnName;
			this.gridType = gridType;
			
			this.conn = conn;
		}
		
		@Override
		public void run() {
			boolean retB = false;
			String alterQuery = null;
			
			// gridType이 AUTO거나 null이거나 공백일 경우
			// integer 형태로 변환
			if ("AUTO".equalsIgnoreCase(gridType) || gridType == null || "".equals(gridType)) {
				alterQuery = "ALTER TABLE " + schema + "." + tableName + " ALTER COLUMN " + columnName
						+ " TYPE integer using " + columnName + " ::integer";
			} else {
				String updateQuery = "UPDATE " + schema + "." + tableName + " SET " + columnName + " = NULL WHERE "
						+ columnName + " = ''";
				
				conn.retExecQueryNoResult(updateQuery); // 공백 값을 null로 변환
				
				alterQuery = "ALTER TABLE " + schema + "." + tableName + " ALTER COLUMN " + columnName
						+ " TYPE " + gridType + " using " + columnName + " ::" + gridType;
			}
			
			retB = conn.retExecQueryNoResult(alterQuery);
			
			// 형변환 성공 시
			if(retB) {
				String updateQuery = "update "+schema+"."+tableName+" set "+columnName+" = 0 where "+columnName+" is null";
				conn.retExecQueryNoResult(updateQuery);
			}
			
			// 현재 thread 종료
			Thread.currentThread().interrupt();
		}
	}
	
	/**
	 * 피지 테이블 파일로 변환
	 * @param schema
	 * @param path
	 * @param tableName
	 * @param offset
	 * @param limit
	 * @throws IOException 
	 */
	public static void pgTableToFile(String schema, String path, String tableName, int offset, int limit) throws IOException{
		String postgresUser = "postgres";
		DBConnector pgConn = null;
		FileWriter fileWriter = null;
		
		try {
			
			pgConn = PgUtil.openPg(postgresUser);
			
			CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());
			String copySql = "copy (select * from " + schema + "."+ tableName + " offset " +offset + " limit "+ limit +") TO "+"'"+path+"'"+"  with delimiter '|' NULL AS '' CSV ";
			logger.info("copy sql : " + copySql);
		
			copyManager.copyOut(copySql, fileWriter);			
			
			new File(path).delete();
		} catch (SQLException e) {
			logger.info(e.getMessage());
		} catch (ClassNotFoundException e) {
			logger.info(e.getMessage());
		} finally {
			pgConn.closeConn();
			if(fileWriter!=null)
				try {
					fileWriter.close();
				} catch (IOException e) {
					logger.info(e.getMessage());
				}
		}
	}
 
	
	
}
