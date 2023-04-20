package kostat.lbdms.ServiceAPI.data;

import java.beans.PropertyVetoException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import kostat.lbdms.ServiceAPI.common.util.CmdUtil;
import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.util.XExcelFileReader;
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.db.PgUtil;
import kostat.lbdms.ServiceAPI.common.web.util.FileUtil;

public class DataCreateFunc {
	private static Logger logger = Logger.getLogger(DataCreateFunc.class);
	private JSONObject tempParam = new JSONObject();
	private JSONObject tempObject = new JSONObject();
	private String errMessage = null;
	private static Properties props = null;
	
	public String tableCreate(InputStream file, InputStream file2, InputStream file3, InputStream file4, String param)
			throws JSONException, Exception {
		JSONObject params = new JSONObject(param);
		tempParam.put("PARAM", params);
		tempObject.put("VALUE", tempParam);
		String dataType = params.getString("DATA_TYPE").toLowerCase();

		switch (dataType) {
		case "text":
			return this.dataToPgTable(params, file, dataType);

		case "excel":
			return this.dataToPgTable(params, file, dataType);

		case "shp":
			return this.dataToShpTable(params, file, file2, file3, file4);
//			String result = null;
//			if(param == null) throw new Exception("파라미터가 없습니다.");
//			if(file == null) throw new Exception("파일이 없습니다");
//			
//			try {
//				if(file2 == null) throw new Exception("파일이 없습니다");
//				if(file3 == null) throw new Exception("파일이 없습니다");
//				result = this.shpToTable(file, file2, file3, params);
//			} catch (Exception e) {
//				throw new Exception(e.getMessage());
//			}
//			return result;
		}

		return null;
	}
	
	//shp생성(추적)
	private String dataToShpTable(JSONObject params, InputStream inStream1, InputStream inStream2, InputStream inStream3, InputStream inStream4) throws JSONException, Exception {
		
		String user = params.getString("USER_ID");
		String folderName = DateUtil.getGenerateId(user);
		String shpName = folderName + ".shp";
		String dbfName = folderName + ".dbf";
		String shxName = folderName + ".shx";
		String prjName = folderName + ".prj";
		String fileFullPath = props.getProperty("linuxfile.path") + folderName;
		params.put("SHP_FILE_PATH", fileFullPath + "/" + shpName);
		params.put("LINUX_FILE_PATH", fileFullPath);
		
		File shpFile = new File(fileFullPath + "/" + shpName);
		File dbfFile = new File(fileFullPath + "/" + dbfName);
		File shxFile = new File(fileFullPath + "/" + shxName);
		File prjFile = new File(fileFullPath + "/" + prjName);
		
		File desti = new File(fileFullPath);
		desti.mkdirs();
		
		if (!desti.exists()) {
			throw new Exception("Destination is not created");
		}
		
		
//		String sshConnectIp =  ApplicationData.getInstance().getAnalysis01Ip();
//		String sshUserIdRoot = ApplicationData.getInstance().getSshUserIdRoot();
//		String sshUserPwRoot = ApplicationData.getInstance().getSshUserPwRoot();
//		
//		SSHConnect sshConn = null;
//		String cmd = "chmod 777 " + fileFullPath;
//		
//		try {
//			sshConn = new SSHConnect(sshUserIdRoot, sshConnectIp, 22, sshUserPwRoot);
//			sshConn.connect();
//			sshConn.execShell(cmd);
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			sshConn.disconnect();
//		}
//		
//		String ip = EnvSettings.instance().getPostgresServerIp();
//		String username = EnvSettings.instance().getPostgresServerId();
//		String password = EnvSettings.instance().getPostgresServerPw();
//		SSHConnect connection = null;
//		
//		String cmd = "mkdir " + fileFullPath;
//		
//		try {
//			connection = new SSHConnect(username, ip, 22, password);
//			connection.connect();
//			connection.execShell(cmd);
//		} catch (Exception e) {
//			logger.error(e.getMessage(), e);
//			throw new Exception(e.getMessage());
//		} finally {
//			if (connection != null) {
//				connection.disconnect();
//			}
//		}
		
		try {
			logger.info("File Full Path: " + fileFullPath);
			logger.info("SHP File: " + shpFile);
			logger.info("DBF File: " + dbfFile);
			logger.info("SHX File: " + shxFile);
			
			FileUtil.inputStreamToFile( shpFile, inStream1 );
			FileUtil.inputStreamToFile( dbfFile, inStream2 );
			FileUtil.inputStreamToFile( shxFile, inStream3 );
			FileUtil.inputStreamToFile( prjFile, inStream4 );
			
			return this.shpToFile(params);
		} catch (PropertyVetoException e) {
			return CmdUtil.sendResponse("디비 접속에 실패 하였습니다.", "FAIL");		
		} catch (Exception e) {
			return CmdUtil.sendResponse(e.getMessage(), "FAIL");
		}

		
	}

	private String dataToPgTable(JSONObject params, InputStream inputStream, String dataType) throws JSONException {

		// 기본 파라미터 설정
		String outputTableName = params.getString("OUTPUT_TABLE_NAME");
		String userId = params.getString("USER_ID");
		String delimiter = params.getString("DELIMITER");
		boolean header = params.getBoolean("HEADER");
		String description = params.getString("DESCRIPTION");
		String encoding = null;
		if(params.has("ENCODING_TYPE")) {
			encoding = params.getString("ENCODING_TYPE");
		}
		
		// 2018.08.02 KTK
		// columnGridData가 있을 경우 JSONArray로 변환하는 부분 추가
		// columnGridData: [{column_nm, column_type}]
		JSONArray columnGridData = null;
		
		try {
			if (params.has("COLUMN_GRID_DATA")) {
				columnGridData = new JSONArray(params.getString("COLUMN_GRID_DATA"));
			}
		} catch (Exception e) {
			this.errMessage = e.getMessage();
			e.printStackTrace();
		}
		// --
		
		String outputEncoding = "UTF-8";
		String outputPath = props.getProperty("linuxfile.path") + DateUtil.getRandomTableName("TMP_FILE");
		DBConnector pgConn = new OpenPGSql();
		boolean result = true;
		
		try {
			int retI = 1;
			try {
				
				if (dataType.equals("text")) {
					// 텍스트일 경우 파일 인코딩 변경 하여 파일 복사만
					retI = FileUtil.inputStreamToFile(encoding, inputStream, outputEncoding, outputPath);

				} else if (dataType.equals("excel")) {
					// 엑셀일 경우 파일 복사해서 csv로 변경
					
					String tmpFilePath = props.getProperty("linuxfile.path") + DateUtil.getRandomTableName("TMP");
					File tmpFile = new File(tmpFilePath);
					try {
						retI = 	FileUtil.inputStreamToFile( tmpFile, inputStream );
						XExcelFileReader xExcelReader = new XExcelFileReader(tmpFilePath);
						xExcelReader.excelToCsv(outputPath, delimiter);
						tmpFile.delete();
					} catch (Exception e) {
						return CmdUtil.sendResponse("엑셀 파일을 확인 해 주세요: " + e.getMessage(), "FAIL");		
					}
				} else {
					return CmdUtil.sendResponse("데이터 타입을 설정 해 주세요.", "FAIL");
				}
			
			} catch (IOException e) {
				return CmdUtil.sendResponse("파일을 확인 해 주세요: " + e.getMessage(), "FAIL");
				// 제대로 된 파일이 아닙니다.
			}

			if (retI < 1) {
				// 제대로 된 파일이 아닙니다.
				return CmdUtil.sendResponse("파일을 확인 해 주세요.", "FAIL");
			}

			
			try {
				pgConn.openConn();
			} catch (ClassNotFoundException | SQLException | IOException | PropertyVetoException e) {
				
				// 디비 연결 실패
				return CmdUtil.sendResponse("디비 연결 실패: " + e.getMessage(), "FAIL");
			}

			try {
				String tableCheck = PgUtil.tableExistsCheck(pgConn, userId, outputTableName);
				if (tableCheck.equals("1")) {
					return CmdUtil.sendResponse("같은 이름의 테이블이 이미 존재 합니다.", "FAIL");
				}
			} catch (SQLException e) {
				// 테이블 존재 유무 파악 실패
				return CmdUtil.sendResponse("디비 쿼리 실패, 디비 연결을 확인 해 주세요: " + e.getMessage(), "FAIL");
			}

			// 테이블 생성
			try {
				// 컬럼명 자동 생성 여부 확인 (item1, item2...)
				boolean autoColumnName;
				
				autoColumnName = false;
				
				if (params.has("AUTO_COLUMN_NAME")) {
					autoColumnName = params.getBoolean("AUTO_COLUMN_NAME");
				}
				
				retI = this.createTable(userId, outputTableName, outputPath, delimiter, header, autoColumnName, pgConn);
			} catch (Exception e) {
				// 테이블 생성 실패
				return CmdUtil.sendResponse("테이블을 생성하는데 실패하였습니다. 컬럼명을 확인 해 주세요: " + e.getMessage(), "FAIL");
			}

			// 컬럼 갯수 조회
			int colCnt = 0;
			try {
				colCnt = PgUtil.getColumnCntWithException(pgConn, userId, outputTableName);
			} catch (Exception e) {
				return CmdUtil.sendResponse("컬럼 갯수 조회 실패, 디비 연결 상태를 확인 해 주세요: " + e.getMessage(), "FAIL");
			}

			// 컬럼 갯수와 다른 데이터 삭제
//			retI = FuncUtil.insertFile(outputPath, delimiter, colCnt);
//			if (retI < 1) {
//				return CmdUtil.sendResponse("데이터 정제 실패, 원본 데이터를 확인 해 주세요.", "FAIL");
//			}
			// 데이터 피지에 인서트
			try {
				PgUtil.dataPgInsertWithException(userId, outputTableName, delimiter, header, outputPath);
			} catch (Exception e) {
				return CmdUtil.sendResponse("데이터 업로드 실패, 디비 접속과 원본 데이터를 확인 해 주세요: " + e.getMessage(), "FAIL");
			}
			
			// rid 추가
			PgUtil.addSericalColumn(userId, outputTableName, pgConn, "rid");
			
			// 컬럼 리스트 조회해서 숫자타입으로 바꿀수 있는거 바꾸고, 값이 null인 애들은 0으로 변경
			DataContainer container = new DataContainer();
			PgUtil.makeColumnList(pgConn, userId, outputTableName, container);
			
			if (columnGridData != null) {
				// 2018.08.01 KTK
				// 컬럼 그리드 데이터가 있을 때 그리드 데이터를 이용해 columnType 변경
				PgUtil.autoColumnTypeChange(container.getTableMeta(), pgConn, columnGridData);
			} else {
				PgUtil.columnTypeChange(container.getTableMeta(), pgConn);
			}
			
			try {
				DBCRUDFunc.insertResourcePgDataWithException(pgConn, userId, outputTableName, description);
			} catch (Exception e) {
				return CmdUtil.sendResponse("LBDMS 등록 실패: " + e.getMessage(), "FAIL");
			}
			
			return CmdUtil.sendResponse("SUCCESS", "SUCCESS");
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return CmdUtil.sendResponse(e.getMessage(), "FAIL");
		} finally {
//			new File(outputPath).delete();
			if(!result) {
				pgConn.retExecQueryNoResult("DROP TABLE " + userId + "." + outputTableName);
			}
			pgConn.closeConn();
		}
		
	}

	private int createTable(String userId, String outputTableName, String outputPath, String delimiter, boolean header, boolean autoColumnName,
			DBConnector pgConn) throws JSONException, IOException, Exception {

		BufferedReader in = new BufferedReader(new FileReader(outputPath));
		String readLine = in.readLine();
		in.close();

		String delemiterCnt[] = null;
		if (readLine.equals(null) || readLine.equals("")) {
			return -1;
		}

		if (delimiter.equals("|") || delimiter.equals("^")) {
			delemiterCnt = readLine.split("\\" + delimiter);
		} else {
			delemiterCnt = readLine.split(delimiter);
		}

		boolean columnNameYn = false;
		// 파일의 첫줄을 읽는다
		if (header) {
			// 파일 첫줄의 내용을 확인해 컬럼이름으로 사용할수없을지 판단한다.
			columnNameYn = PgUtil.firstRowYN(delemiterCnt);
		} // 파일 첫줄내용이 아닐때는 retB가 default false이기때문에 item으로 컬럼생성.
		
		/**
		 * autoColumnName이 true일 때
		 * 컬럼명 사용할 수 없도록 강제 설정
		 */
		if (autoColumnName) {
			columnNameYn = false;
		}
		
		String alterQuery = "";
		String createSql = "CREATE TABLE " + userId + "." + outputTableName + "(";
		// 컬럼이름으로 사용할수있으면 true 없으면 false
		if (!columnNameYn) {
			// false 이므로 컬럼 갯수만큼 item이름에 번호를 붙여 테이블 생
			for (int ii = 0; ii < delemiterCnt.length; ii++) {
				if (ii == (delemiterCnt.length - 1)) {
					createSql += " item" + (ii + 1) + " character varying)";
				} else {
					createSql += " item" + (ii + 1) + " character varying,";
				}
				alterQuery += " COMMENT ON COLUMN " + userId + "." + outputTableName + ".item" + (ii + 1) + " IS '"
						+ delemiterCnt[ii] + "';";
			}
		} else {
			// true 이므로 첫줄내용으로 컬럼이름 만듦
			for (int ii = 0; ii < delemiterCnt.length; ii++) {
				if (delemiterCnt[ii].equalsIgnoreCase("addr")) {
					delemiterCnt[ii] = "address";
				} else if (delemiterCnt[ii].equalsIgnoreCase("rid")) {
					delemiterCnt[ii] = "_rid";
				}
				if (ii == (delemiterCnt.length - 1)) {
					if (delemiterCnt[ii].contains("geom")) {
						createSql += " " + delemiterCnt[ii] + " geometry)";
					} else {
						createSql += " " + delemiterCnt[ii] + " character varying)";
					}
				} else {
					if (delemiterCnt[ii].contains("geom")) {
						createSql += " " + delemiterCnt[ii] + " geometry,";
					} else {
						createSql += " " + delemiterCnt[ii] + " character varying,";
					}
				}
				alterQuery += " COMMENT ON COLUMN " + userId + "." + outputTableName + "." + delemiterCnt[ii] + " IS '"
						+ delemiterCnt[ii] + "';";
			}

		}

		boolean retB;
		
		pgConn.execQuery(createSql);
		pgConn.execQuery(alterQuery);

		String ownerChagneSql = "ALTER TABLE " + userId + "." + outputTableName + " OWNER TO " + userId;
		logger.info("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrid");
		logger.info(userId);
		pgConn.execQuery(ownerChagneSql);

		return 1;
	}

	/**
	 * columnGridData가 있을 경우
	 * 해당 데이터를 이용해 테이블 생성
	 * @param userId
	 * @param outputTableName
	 * @param outputPath
	 * @param delimiter
	 * @param header
	 * @param pgConn
	 * @param columnGridData
	 * @return
	 * @throws JSONException
	 * @throws IOException
	 */
	private int createTableWithColumn(String userId, String outputTableName, String outputPath, String delimiter, boolean header,
			DBConnector pgConn, JSONArray columnGridData) throws JSONException, IOException {

		BufferedReader in = new BufferedReader(new FileReader(outputPath));

		String alterQuery = "";
		String createSql = "CREATE TABLE " + userId + "." + outputTableName + "(";
		
		int columnCount = columnGridData.length(); // 컬럼 수
		
		// 컬럼 수만큼 반복
		for (int i = 0; i < columnCount; i++) {
			JSONObject columnData = null;
			String name = "";
			String type = "";
			String suffix = "";
			
			try {
				columnData = (JSONObject) columnGridData.get(i);
				name = columnData.getString("name");
				type = columnData.getString("type");
			} catch (Exception e) {
				e.printStackTrace();
				continue;
			}
			
			// 맵핑 시 생성되는 컬럼과 겹치지 않게 이름 변경
			if ("ADDR".equalsIgnoreCase(name)) {
				name = "address";
			} else if ("RID".equalsIgnoreCase(name)) {
				name = "_rid";
			}
			
			// type이 AUTO일 경우 character varying 으로 저장
			type = ("AUTO".equalsIgnoreCase(type)) ? "character varying" : type;
			suffix = (i == columnCount - 1) ? " " + type + ")" : " " + type + ",";
			createSql += " " + name + suffix;
		}

		boolean retB = pgConn.retExecQueryNoResult(createSql);
		if (!retB) {
			return -2;
		}
		retB = pgConn.retExecQueryNoResult(alterQuery);

		if (!retB) {
			return -3;
		}

		String ownerChagneSql = "ALTER TABLE " + userId + "." + outputTableName + " OWNER TO " + userId;
		retB = pgConn.retExecQueryNoResult(ownerChagneSql);

		if (!retB) {
			return -4;
		}

		return 1;
	}
	
	
	
	//shp2pgsql(추적)
	private String createShapeToPgsqlCommand(JSONObject params) throws Exception {
		String command;
		
		command =  "bin/shp2pgsql"
				+ " -W " + params.getString("ENCODE_TYPE") + " " 
				+ params.getString("SHP_FILE_PATH") + " " 
				+ params.getString("USER_ID") + "." + params.getString("OUTPUT_TABLE_NAME").toLowerCase() 
				+ " | PGPASSWORD='" + props.getProperty("db.pass") + "' "
				+ "bin/psql -d resource"
				+ " -p xhdrPcjd!@#" 
				+ " -U postgres";
		
		return command;
	}

	//shp (추적)
	public String shpToFile(JSONObject params) throws JSONException, PropertyVetoException, Exception {
		
		
		String description = null;
		if(params.has("DESCRIPTION")) {
			description = params.getString("DESCRIPTION");
		}
		String outputTableName = params.getString("OUTPUT_TABLE_NAME").toLowerCase();
		String userId = params.getString("USER_ID");
		String linuxFilePath = params.getString("LINUX_FILE_PATH");
//		String shpFilePath = params.getString("SHP_FILE_PATH");
//		String encode = params.getString("ENCODE_TYPE");
		
		DBConnector pgConn = new OpenPGSql();
		try {
			pgConn.openConn();
			
			String command;
			String tableCheck = PgUtil.tableExistsCheck(pgConn, userId, outputTableName);
			
			if(tableCheck.equals("1")) {
				return CmdUtil.sendResponse("테이블이 이미 존재 합니다.", "FAIL");
			}
			
			
			command = this.createShapeToPgsqlCommand(params);
			this.runShapeToPgsqlCommand(command);
			
//			String cmd = ApplicationData.getInstance().getAnalysisShpPath() + "bin/shp2pgsql ";
//
//			String server = ApplicationData.getInstance().getKostatServerBoolean();
//			boolean flag = Boolean.parseBoolean(server);
//			if (flag) {
////				cmd += "-W " + encode + " " + shpFilePath + " " + userId + "." + outputTableName + " | PGPASSWORD='"
////						+ ApplicationData.getInstance().getPostgrePw()
////						+ "' /tmp/experdb/postgresql-9.6.2/src/bin/psql/psql -d "
////						+ ApplicationData.getInstance().getDataBaseName() + " -p "
////						+ ApplicationData.getInstance().getPostgrePort() + " -U postgres";
//				
//				cmd += "-W " + encode + " " + shpFilePath + " " + userId + "." + outputTableName + " | PGPASSWORD='"
//						+ props.getProperty("db.pass") + "' "
//						+ ApplicationData.getInstance().getAnalysisShpPath() + "/bin/psql -d "
//						+ ApplicationData.getInstance().getDataBaseName() + " -p 5444 -U postgres";
//			} else {
//				cmd += "-W " + encode + " " + shpFilePath + " " + userId + "." + outputTableName + " | PGPASSWORD='"
//						+ ApplicationData.getInstance().getPostgrePw() + "' "
//						+ ApplicationData.getInstance().getAnalysisShpPath() + "/bin/psql -d "
//						+ ApplicationData.getInstance().getDataBaseName() + " -p 5432 -U postgres";
//			}
//			
//			System.out.println(command);
		
			
//			String sshConnectIp =  "127.0.0.1";
//			String sshConnectIp =  ApplicationData.getInstance().getAnalysis01Ip();
//			String sshUserIdLbdms = ApplicationData.getInstance().getSshUserIdRoot();
//			String sshUserPwLbdms = ApplicationData.getInstance().getSshUserPwRoot();
			
//			String sshConnectIp = EnvSettings.instance().getPostgresServerIp();
//			String sshUserIdLbdms = EnvSettings.instance().getPostgresServerId();
//			String sshUserPwLbdms = EnvSettings.instance().getPostgresServerPw();
////			String sshConnectPass = ApplicationData.getInstance().getPostgrePw();
//			SSHConnect sshConn = null;
//			
//			logger.info("SSH Connect IP: " + sshConnectIp);
//			logger.info("SSH Connect ID: " + sshUserIdLbdms);
//			logger.info("SSH Connect Password: " + sshUserPwLbdms);
//			
//			System.out.println(sshUserIdLbdms);
//			System.out.println(sshUserPwLbdms);
//			
//			if (flag) {
//				String sendCmd;
//				
//				sendCmd = "sshpass -p '" + sshUserPwLbdms + "' "
//						+ "scp -r " + linuxFilePath + " " + sshUserIdLbdms + "@" + sshConnectIp + ":" + props.getProperty("linuxfile.path");
//				
//				logger.info("send cmd: " + sendCmd);
//				
//				try {
//					sshConn = new SSHConnect("lbdms", EnvSettings.instance().getCurrentHost(), 22, sshUserPwLbdms);
//					sshConn.connect();
//					sshConn.execShell(sendCmd);
//				} catch (Exception e) {
//					e.printStackTrace();
//				} finally {
//					sshConn.disconnect();
//				}
//			}
//			
//			try {
//				sshConn = new SSHConnect(sshUserIdLbdms, sshConnectIp, 22, sshUserPwLbdms);
//				sshConn.connect();
//				sshConn.execShell(cmd);
//			} catch (Exception e) {
//				e.printStackTrace();
//			} finally {
//				sshConn.disconnect();
//			}
			
			// 오너 변경
			boolean retB = PgUtil.ownerChange(userId, outputTableName, pgConn);
			if(!retB) {
				return CmdUtil.sendResponse("쉐입 테이블 생성 실패, 쉐입 파일을 확인해 주세요.", "FAIL");
			}
			
			// 시리얼 추가
			PgUtil.addSericalColumn(userId, outputTableName, pgConn, "gid");
			PgUtil.addSericalColumn(userId, outputTableName, pgConn, "rid");

			// srid 세팅
			PgUtil.updateSrid(userId, outputTableName, pgConn);
			
			// 인덱스 생성
			PgUtil.shpTableMakeIndex(pgConn, userId, outputTableName);
			
			//x, y가 없다는 가정하에 엑스와이 컬럼을 생성하고 쥐옴으로 엑스와이 좌표를 생성
			PgUtil.makeXYColumn(userId, outputTableName, pgConn);
			
			// geom 컬럼명 조회
			String geometryColumnNm = PgUtil.getGeomColumnName(userId, outputTableName, pgConn);
		
			
			JSONObject geomObj = new JSONObject();
			geomObj.put("geom", geometryColumnNm);
			
			if(geomObj.has("geom")){
				String query = "";
				query =  "select count(*) from "+ userId + "." + outputTableName
						+ " where (GeometryType(geom) != 'POINT') and (GeometryType(geom) != 'MULTIPOINT')";
				pgConn.execQuery(query);
				
				ResultSet resultGeomType = pgConn.getResultSet();
				String count = null;
				String geomType = "";
				while(resultGeomType.next()) {
					count = resultGeomType.getString("count");
				}
				if(Integer.parseInt(count) > 0 ){
					//POLYGON
					geomType = "지오매트리(면)";
					params.put("GEOM_TYPE", geomType);
				}else{
					//POINT
					geomType = "지오매트리(점)";
					params.put("GEOM_TYPE", geomType);
				}
			}
			JSONObject obj = CmdUtil.makePosDesc(false, false, null, null, "geom", null, null);
			
			// 지오메트리 타입 조회
			String geometryType = PgUtil.getGeometryType(userId, outputTableName, pgConn, geometryColumnNm);
			DBCRUDFunc.sendResourceInsertOrUdate(pgConn, userId, outputTableName, "", "", description, "SHP", "", obj, geometryType);
			return CmdUtil.sendResponse("SUCCESS", "SUCCESS");
			
		} catch(ClassNotFoundException e){
			return CmdUtil.sendResponse("디비 접속 실패", "FAIL");
		} catch(SQLException e) {
			return CmdUtil.sendResponse("쿼리 실패 : " + e.getMessage(), "FAIL");
		} catch(IOException e){
			return CmdUtil.sendResponse("shp 테이블 생성 명령어 실패", "FAIL");
		/*} catch(JSchException e){
			return CmdUtil.sendResponse("shp 테이블 생성 명령어 실패", "FAIL");*/
		} finally {
			
			pgConn.closeConn();
			try {
				String delCmd = "rm -rf " + linuxFilePath;
//				Process process=  Runtime.getRuntime().exec(delCmd);
				Runtime.getRuntime().exec(delCmd);
			} catch(IOException e){
				return null;
			}
		}
		
	}
	
	private void runShapeToPgsqlCommand(String command) throws Exception {
		//System.out.println("cmd start: " + command);

		String[] commands = {
			"/bin/sh",
			"-c",
			command
		};
		
		String line = null;
		Process process = Runtime.getRuntime().exec(commands);
		BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
		
		logger.info("ProcessReadLineStart");
		
		while ((line = br.readLine()) != null) {
			logger.info(line);
		}
	}
}
