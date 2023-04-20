package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.util.DataUtil;
import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.util.JSONConvertUtil;
import kostat.lbdms.ServiceAPI.common.util.QueryMakeUtil;
import kostat.lbdms.ServiceAPI.common.util.http.HttpJSONConnector;
import kostat.lbdms.ServiceAPI.common.util.http.HttpRequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.DataCreateCommandClient;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.command.resource.ResourceCommandClient;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.mapper.ExecuteMapper;
import kostat.lbdms.ServiceAPI.common.web.rest.mapper.ResourceMapper;
import kostat.lbdms.ServiceAPI.common.web.rest.mapper.STSMapper;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.common.web.util.FileCreateUtil;
import kostat.lbdms.ServiceAPI.controller.model.rest.Execute;
import kostat.lbdms.ServiceAPI.controller.model.system.ResourceVO;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.DataCreateMapper;
import kostat.lbdms.ServiceAPI.controller.service.mapper.MyDataMapper;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONObject;

@Service("myDataService")
public class MyDataServiceImpl extends EgovAbstractServiceImpl implements MyDataService {
	
	private static final Logger		logger	= LoggerFactory.getLogger(MyDataServiceImpl.class);
	
	/** CommonDAO */
	@Resource(name = "myDataMapper")
	private MyDataMapper			myDataMapper;
	
	@Resource(name = "dataCreateMapper")
	private DataCreateMapper		dataCreateMapper;
	
	@Autowired
	private DataCreateCommandClient	client;
	
	@Autowired
	private RestService				restService;
	
	@Resource(name = "stsMapper")
	private STSMapper				stsMapper;
	
	@Resource(name = "executeMapper")
	private ExecuteMapper			executeMapper;
	
	@Resource(name = "resourceMapper")
	private ResourceMapper			resourceMapper;
	
	@Autowired
	private ResourceCommandClient	resourceCommandClient;
	
	@Resource(name="analysisService")
	private AnalysisService analysisService;
	
	/**
	 * TEXT, CSV , EXCEL 읽기
	 * 
	 * @param List<MultipartFile>
	 *            list,String data_type,String delimiter,String charsets,int
	 *            startLine, int endLine
	 * @return List
	 * @exception IOException
	 */
	public List getMetaData(List<MultipartFile> list, String data_type, String delimiter, String charsets, int startLine, int endLine) throws IOException {
		List dataList = new ArrayList();
		
		if (data_type.equalsIgnoreCase("TEXT")) {
			StringBuffer sb = new StringBuffer();
			BufferedReader br = null;
			
			int readCnt = 0;
			int endCnt = endLine;
			
			String line = "";
			
			if (delimiter.equals("|")) {
				delimiter = "\\|";
			}
			
			br = new BufferedReader(new InputStreamReader(list.get(0).getInputStream(), charsets));
			
			while ((line = br.readLine()) != null) {
				readCnt++;
				line = line.replaceAll("\"", "");
				String[] cells = line.split(delimiter);
				dataList.add(cells);
				
				if (endCnt != 0) {
					if (readCnt == endCnt) {
						break;
					}
				}
			}
		} else {
			InputStream is = list.get(0).getInputStream();
			XSSFWorkbook xworkBook = new XSSFWorkbook(is);
			XSSFSheet xsheet = null;
			XSSFRow xrow = null;
			XSSFCell xcell = null;
			
			xsheet = xworkBook.getSheetAt(0);
			int rows = xsheet.getPhysicalNumberOfRows();
			// endLine이 0일 경우 모두 뽑아 오는걸로 보통 미리 보기의 경우 5개로 던지기
			
			if (endLine != 0) {
				rows = endLine;
			}
			for (int i = startLine; i < rows; i++) {
				xrow = xsheet.getRow(i);
				short cells = xrow.getLastCellNum();
				String rowArray[] = new String[cells];
				for (int j = 0; j < cells; j++) {
					xcell = xrow.getCell(j);
					if(xcell == null) {
						rowArray[j] = "";
					}else {
						switch (xcell.getCellType()) {
							case 0:
								rowArray[j] = String.valueOf((long) xcell.getNumericCellValue());
								break;
							case 1:
								rowArray[j] = xcell.getStringCellValue();
								break;
						}
					}
					
					
				}
				dataList.add(rowArray);
			}
		}
		return dataList;
	}
	
	/**
	 * TEXT, CSV , EXCEL 테이블 생성 컬럼 없이
	 * 
	 * @param HttpServletResponse
	 *            response, InputStream inputStream, String data_type, String
	 *            output_table_name, String description, String header, String
	 *            delimiter, String target_agent, String user_id, String
	 *            encoding_type
	 * @return void
	 * @exception IOException
	 */
	public void createTable(HttpServletResponse response, InputStream inputStream, String data_type, String output_table_name, String description, String header, String delimiter, String target_agent,
			String user_id, String encoding_type) throws SystemFailException {
		
		JSONObject res = client.createTable(response, inputStream, data_type, output_table_name, description, header, delimiter, target_agent, user_id, encoding_type);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
	}
	
	/**
	 * TEXT, CSV , EXCEL 테이블 생성 컬럼 있음
	 * 
	 * @param HttpServletResponse
	 *            response, InputStream inputStream, String data_type, String
	 *            output_table_name, String description, String header, String
	 *            delimiter, String target_agent, String user_id, String
	 *            encoding_type, org.json.JSONArray columnGridData
	 * @return void
	 * @exception IOException
	 */
	public void createTableWithColumns(HttpServletResponse response, InputStream inputStream, String data_type, String output_table_name, String description, String header, String delimiter,
			String target_agent, String user_id, String encoding_type, org.json.JSONArray columnGridData) throws SystemFailException {
		JSONObject res = client.createTableWithColumns(response, inputStream, data_type, output_table_name, description, header, delimiter, target_agent, user_id, encoding_type, columnGridData);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
	}
	
	/**
	 * SHP 파일 테이블 생성 @param HttpServletResponse response, InputStream[]
	 * inputStreamArray, String data_type, String output_table_name, String
	 * description, String user_id, String encode_type @return void @exception
	 */
	public void createTableByAgent(HttpServletResponse response, InputStream[] inputStreamArray, String data_type, String output_table_name, String description, String user_id, String encode_type, String shp_coord_by_geom) {
		restService.callByCreateTableByAgent(response, inputStreamArray, data_type, output_table_name, description, user_id, encode_type, shp_coord_by_geom);
	}
	
	/**
	 * 한글로 또는 지정한 컬럼명 입력
	 * 
	 * @param JSONObject
	 *            columnGridData ,int resource_id
	 * @return
	 * @exception SQLException
	 * @throws org.json.JSONException
	 */
	public void updateKorColumnGridData(org.json.JSONArray columnGridData, int resource_id) throws SQLException, org.json.JSONException {
		if (columnGridData.length() > 0) {
			org.json.JSONArray columnNameArray = new org.json.JSONArray();
			
			for (int i = 0; i < columnGridData.length(); i++) {
				org.json.JSONObject jObj = (org.json.JSONObject) columnGridData.get(i);
				org.json.JSONObject inputObj = new org.json.JSONObject();
				inputObj.put("column_id", jObj.get("name").toString());
				inputObj.put("column_name", jObj.get("kor_name").toString());
				
				columnNameArray.put(inputObj);
			}
			
			String columnNameString = columnNameArray.toString();
			
			Map paramMap = new HashMap();
			paramMap.put("columnInfo", columnNameString);
			paramMap.put("resource_id", resource_id);
			
			myDataMapper.updateKorColumnGridData(paramMap);
		}
	}
	
	/**
	 * korColumnDesc가 없을때 생성 하기 @param String schema , String data_nm @return
	 * JSONArray @exception
	 */
	public org.json.JSONArray createKorColumnGridData(String schema, String data_nm, String resource_id) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("user_id", schema);
		paramMap.put("data_nm", data_nm);
		List<Map<String, Object>> columnInfoList = dataCreateMapper.selectColumns(paramMap);
		org.json.JSONArray jsonArray = new org.json.JSONArray();
		try {
			for (int i = 0; i < columnInfoList.size(); i++) {
				Map<String, Object> column = columnInfoList.get(i);
				String column_name = column.get("column_name").toString();
				if (columnIdValidate(column_name)) {
					org.json.JSONObject jobj = new org.json.JSONObject();
					jobj.put("column_id", column_name);
					jobj.put("column_name", column_name);
					
					jsonArray.put(jobj);
				}
			}
			
			String columnNameString = jsonArray.toString();
			
			paramMap.put("columnInfo", columnNameString);
			paramMap.put("resource_id", resource_id);
			myDataMapper.updateKorColumnGridData(paramMap);
			
		} catch (JSONException e) {
			logger.error(e.toString());
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		
		return jsonArray;
	}
	
	/**
	 * 컬럼 id 검증기 @param String schema , String data_nm) @return JSONArray @exception
	 */
	public boolean columnIdValidate(String columnName) {
		
		boolean validate = true;
		
		String[] mappingColumnNames = { "x", "y", "mapping_status", "tot_oa_cd", "adm_dr_cd", "bas_cd", "tot_x", "tot_y", "bas_x", "bas_y", "mapping_addr", "rid", "mapping_result" };
		String[] checkedColumnNames = { "targetx", "targety", "meter", "verify_status", "tot_oa_cd", "adm_dr_cd", "bas_cd", "tot_x", "tot_y", "bas_x", "bas_y", "mapping_addr", "rid",
				"verify_result" };
		String[] geoCodingColumnNames = { "targetx", "targety", "tot_oa_cd", "adm_dr_cd", "bas_cd", "tot_x", "tot_y", "bas_x", "bas_y" };
		/* String[] customColumnNames = {"rid","gid","geom"}; */
		String[] customColumnNames = { "rid", "gid" };
		for (int i = 0; i < mappingColumnNames.length; i++) {
			if (columnName.equalsIgnoreCase(mappingColumnNames[i])) {
				validate = false;
			}
		}
		
		for (int i = 0; i < checkedColumnNames.length; i++) {
			if (columnName.equalsIgnoreCase(checkedColumnNames[i])) {
				validate = false;
			}
		}
		
		for (int i = 0; i < geoCodingColumnNames.length; i++) {
			if (columnName.equalsIgnoreCase(geoCodingColumnNames[i])) {
				validate = false;
			}
		}
		
		for (int i = 0; i < customColumnNames.length; i++) {
			if (columnName.equalsIgnoreCase(customColumnNames[i])) {
				validate = false;
			}
		}
		
		return validate;
	}
	
	/**
	 * 한글로 지정된 이름 입력
	 * 
	 * @param String
	 *            subject
	 * @return
	 * @exception SQLException
	 */
	public void updateKorSubject(Map<String, Object> map) throws SQLException {
		myDataMapper.updateKorSubject(map);
	}
	
	/**
	 * 리소스 테이블 id 가져오기
	 * 
	 * @param HashMap<String,Object>
	 *            parameterMap
	 * @return int
	 * @exception SQLException
	 */
	public int selectResourceId2(HashMap<String, Object> parameterMap) throws SQLException {
		return myDataMapper.selectResourceId2(parameterMap);
	}
	
	/**
	 * 테이블 내용 미리보기 조회 기존에는 컨트롤러에서 호출 하는것인데 이제 그냥 내가 구현할것이다.
	 * 
	 * @param String
	 *            ( userId ) 사용자 아이디
	 * @param String
	 *            ( schema ) 스키마
	 * @param String
	 *            ( tableName ) 테이블 명
	 * @param int
	 *            ( limit ) 조회할 개수
	 * @return 테이블 내용
	 * @throws SQLException
	 * @throws JSONException
	 * @throws SystemFailException
	 */
	public JSONObject previewTable(String userId, String schema, String tableName, int limit, int offset, String sort_column, String sort_type, String resourceId, String storageTypeCd)
			throws SQLException, org.json.JSONException {
		HashMap<String, Object> parameters = new HashMap<String, Object>();
		parameters.put(RequestKey.RESPONSE, "TRUE");
		parameters.put(RequestKey.SCHEMA, schema);
		parameters.put(RequestKey.TABLE_NAME, tableName);
		parameters.put("DATA_NAME", tableName);
		parameters.put(RequestKey.LIMIT, String.valueOf(limit));
		parameters.put(RequestKey.OFFSET, String.valueOf(offset));
		parameters.put(RequestKey.STORAGE_TYPE_CD, String.valueOf(storageTypeCd));
		
		if (sort_column != null && sort_column != "") {
			parameters.put("SORT_COLUMN", sort_column);
		}
		
		if (sort_type != null && sort_type != "") {
			parameters.put("SORT_TYPE", sort_type);
		}
		
		parameters.put(RequestKey.USER_ID, userId);
		
		JSONObject res = new JSONObject();
		res.put("resourceTable", dataCreateMapper.selectResourceInfo(parameters));
		Map resourceInfo = myDataMapper.getMyDataInfo(resourceId);
		res.put("resourceInfo", resourceInfo);
		
		return res;
	}
	
	/**
	 * 나의데이터 정보를 가져온다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getMyDataList(Map mapParameter) throws SQLException {
		return myDataMapper.getMyDataList(mapParameter);
	}
	
	/**
	 * 메인화면 대시보드 정보를 가져온다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDashBoardList(Map mapParameter) throws SQLException {
		return myDataMapper.getDashBoardList(mapParameter);
	}
	
	/**
	 * 메인화면 대시보드 정보를 가져온다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDashBoardOptList(Map mapParameter) throws SQLException {
		return myDataMapper.getDashBoardOptList(mapParameter);
	}
	
	/**
	 * 메인화면 대시보드 설정을 업데이트한다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateDashBoardOpt(Map mapParameter) throws SQLException {
		return myDataMapper.updateDashBoardOpt(mapParameter);
	}
	
	/**
	 * 메인화면 대시보드 최초설정을 생성한다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertDashBoardOpt(Map mapParameter) throws SQLException {
		return myDataMapper.insertDashBoardOpt(mapParameter);
	}
	
	/**
	 * 메시지큐 저장
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertMsgQue(Map mapParameter) throws SQLException {
		return myDataMapper.insertMsgQue(mapParameter);
	}
	
	
	/**
	 * 주소 지오코딩 변환
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject mapping(Map paramMap) throws SystemFailException {
		JSONObject res = null;
		
		String input_table_name = paramMap.get("output_table_name").toString().toLowerCase();
		String addr_column = paramMap.get("addr_column").toString().toLowerCase().toLowerCase();
		String user_id = paramMap.get("user_id").toString();
		String api_name = paramMap.get("mappingMethod").toString();
		String target_agent = paramMap.get("target_agent").toString();
		Boolean base_boolean = Boolean.parseBoolean(paramMap.get("base_boolean").toString());
		Boolean tot_boolean = Boolean.parseBoolean(paramMap.get("tot_boolean").toString());
		
		String REQUEST_AUTO_AGENT_URI = ConfigUtil.getString("autoagent.url");
		String METHOD = HttpRequestKey.POST;
		
		String executeId = DateUtil.getGenerateId(user_id);
		String actionType = "MAPPING";
		String category4 = "USER";
		String state = "RUNNING";
		String useYn = "N";
		
		useYn = stsMapper.selectDaumApiUseYn();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("INPUT_TABLE_NAME", input_table_name);
		map.put("ADDR_COLUMN", addr_column);
		map.put("USER_ID", user_id);
		map.put("API_NAME", api_name);
		map.put("BASE_BOOLEAN", base_boolean == null ? false : base_boolean);
		map.put("TOT_BOOLEAN", tot_boolean == null ? false : tot_boolean);
		map.put("DAUM_MAPPING_YN", useYn);
		map.put("EXECUTE_ID", executeId);
		map.put("DATA_NAME", input_table_name);
		map.put("MAPPING_WAY", "ADDR_NAME");
		
		JSONObject executeDefinition = JSONObject.fromObject(map);
		
		Execute execute = new Execute();
		
		execute.setExecute_id(executeId);
		execute.setUser_id(user_id);
		execute.setState(state);
		execute.setCategory4(category4);
		execute.setAction_type(actionType);
		execute.setAction_id(user_id);
		execute.setData_name(input_table_name);
		execute.setExecute_definition(executeDefinition.toString());
		
		executeMapper.insertExecute(execute);
		
		if (paramMap.get("cm").toString().equals("/data/modify")) {
			if (paramMap.containsKey("rid")) {
				map.put("RID", paramMap.get("rid"));
			}
		}
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		org.json.JSONObject mapObject = new org.json.JSONObject(map);
		param.put("PARAM", mapObject.toString());
		
		
		HttpJSONConnector client = new HttpJSONConnector(REQUEST_AUTO_AGENT_URI + "/data/modify" + "/mapping", METHOD, param);
		res = client.connectWithParse();
		return res;
		
		/*
		res = new JSONObject();
		try {
			insertMsgQue(msg);
			
			JSONObject result = new JSONObject();
			result.put("EXECUTE_ID", "");
			result.put("ADDR_COLUMN", mapObject.getString("addr_column"));
			result.put("MAPPING_WAY", "ADDR_NAME");
			result.put("INPUT_TABLE_NAME", mapObject.getString("output_table_name"));
			result.put("API_NAME", mapObject.getString("mappingMethod"));
			result.put("BASE_BOOLEAN", mapObject.getString("base_boolean"));
			result.put("DATA_NAME", mapObject.getString("output_table_name"));
			result.put("TOT_BOOLEAN", mapObject.getString("tot_boolean"));
			result.put("USER_ID", user_id);
			
			res.put("errCd", "0");
			res.put("id", "G2G12001");
			res.put("result", result);
		} catch (Exception e) {
			res.put("errCd", "-1");
			res.put("id", "G2G12001");
			res.put("result", null);
			
			logger.debug(e.getMessage());
		}
		
		return res;
		*/
	}
	
	/**
	 * getColumn
	 * @param Map paramMAp
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Map<String, Object>> getColumns(Map<String, Object> paramMap) throws SQLException {
		List selectColumns = dataCreateMapper.getColumns(paramMap);
		return selectColumns;
	}
	
	/**
	 * xy 변환
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject coordinateChange(Map paramMap) throws SystemFailException {
		JSONObject jobj = null;
		String table_name = paramMap.get("output_table_name").toString().toLowerCase();
		String x_column = paramMap.get("x_column").toString().toLowerCase();
		String y_column = paramMap.get("y_column").toString().toLowerCase();
		String user_id = paramMap.get("user_id").toString();
		String input_coord = paramMap.get("input_coord").toString();
		String output_coord = paramMap.get("out_put_coord").toString();
		String target_agent = paramMap.get("target_agent").toString();
		Boolean base_boolean = Boolean.parseBoolean(paramMap.get("base_boolean").toString());
		Boolean tot_boolean = Boolean.parseBoolean(paramMap.get("tot_boolean").toString());
		
		String REQUEST_AUTO_AGENT_URI = ConfigUtil.getString("autoagent.url");
		String METHOD = HttpRequestKey.POST;
		
		String executeId = DateUtil.getGenerateId(user_id);
		String actionType = "COORD";
		String category4 = "USER";
		String state = "RUNNING";
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("TABLE_NAME", table_name);
		map.put("X_COLUMN", x_column);
		map.put("Y_COLUMN", y_column);
		map.put("USER_ID", user_id);
		map.put("INPUT_COORD", input_coord);
		map.put("OUTPUT_COORD", output_coord);
		
		map.put("BASE_BOOLEAN", base_boolean == null ? false : base_boolean);
		map.put("TOT_BOOLEAN", tot_boolean == null ? false : tot_boolean);
		map.put("EXECUTE_ID", executeId);
		
		Execute execute = new Execute();
		
		execute.setExecute_id(executeId);
		execute.setUser_id(user_id);
		execute.setState(state);
		execute.setCategory4(category4);
		execute.setAction_type(actionType);
		execute.setAction_id(user_id);
		execute.setData_name(table_name);
		
		executeMapper.insertExecute(execute);
		
		if (paramMap.get("cm").toString().equals("/data/modify")) {
			map.put("FAIL", true);
			map.put("MAPPING_WAY", "ADDR_NAME");
			map.put("DATA_NM", table_name);
			map.put("SAVE_TYPE", "SAVE");
			map.put("SRC_COORD", input_coord);
			map.put("DST_COORD", output_coord);
			map.put("ACTION_DESCRIPTION", "geo");
			map.put("RID", paramMap.get("rid"));
		} else {
			/*
			 * map.put("FAIL", true); map.put("MAPPING_WAY", "ADDR_NAME");
			 * map.put("DATA_NM", table_name); map.put("SAVE_TYPE", "SAVE");
			 * map.put("SRC_COORD", input_coord); map.put("DST_COORD", output_coord);
			 * map.put("ACTION_DESCRIPTION", "geo"); paramMap.put("cm", "/data/modify");
			 */
		}
		HashMap<String, Object> param = new HashMap<String, Object>();
		org.json.JSONObject mapObject = new org.json.JSONObject(map);
		param.put("PARAM", mapObject.toString());
		
		HttpJSONConnector client = new HttpJSONConnector(REQUEST_AUTO_AGENT_URI + paramMap.get("cm").toString() + "/coord", METHOD, param);
		jobj = client.connectWithParse();
		
		return jobj;
	}
	
	/**
	 * geom 변환
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject coordinateChangeByGeom(Map paramMap) throws SystemFailException {
		
		JSONObject res = null;
		
		String user_id = paramMap.get("user_id").toString();
		String table_name = paramMap.get("output_table_name").toString();
		String input_coord_by_geom = paramMap.get("input_coord_by_geom").toString();
		String geom_column = paramMap.get("geom_column").toString();
		String REQUEST_AUTO_AGENT_URI = ConfigUtil.getString("autoagent.url");
		String METHOD = HttpRequestKey.POST;
		
		HashMap<String, Object> resourceQuery = new HashMap<String, Object>();
		
		resourceQuery.put("user_id", user_id);
		resourceQuery.put("data_nm", table_name);
		resourceQuery.put("data_storage_type", "PG");
		
		int resourceId = resourceMapper.selectResourceId(resourceQuery);
		ResourceVO resource = resourceMapper.detailResource(resourceId);
		String executeId = DateUtil.getGenerateId(user_id);
		String actionType = "COORD";
		String category4 = "USER";
		String state = "RUNNING";
		String uuid = UUID.randomUUID().toString();
		String dataStorageType = resource.getData_storage_type();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("TABLE_NAME", table_name);
		map.put("SRID", input_coord_by_geom);
		map.put("USER_ID", user_id);
		map.put("EXECUTE_ID", executeId);
		map.put("RESOURCE_ID", resourceId);
		map.put("UUID", uuid);
		map.put("DATA_STORAGE_TYPE", dataStorageType);
		
		if ("geom".equals(geom_column)) {
			map.put("GEOM_COL_NM", geom_column);
		} else {
			/* map.put("GEOM_COL_NM", "geom"); */
			map.put("GEOM_COL_NM", geom_column);
		}
		
		if (paramMap.get("cm").toString().equals("/data/modify")) {
			if (paramMap.containsKey("rid")) {
				map.put("RID", paramMap.get("rid"));
			}
		}
		
		Execute execute = new Execute();
		
		execute.setExecute_id(executeId);
		execute.setUser_id(user_id);
		execute.setState(state);
		execute.setCategory4(category4);
		execute.setAction_type(actionType);
		execute.setAction_id(user_id);
		execute.setData_name(table_name);
		execute.setOutput_resource_id("" + resourceId);
		execute.setData_storage_type(dataStorageType);
		
		executeMapper.insertExecute(execute);
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		org.json.JSONObject mapObject = new org.json.JSONObject(map);
		param.put("PARAM", mapObject.toString());
		
		HttpJSONConnector client = new HttpJSONConnector(REQUEST_AUTO_AGENT_URI + paramMap.get("cm").toString() + "/geom", METHOD, param);
		
		res = client.connectWithParse();
		
		return res;
		
	}
	
	/**
	 * admCd 변환
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject bndChange(Map paramMap) throws SystemFailException {
		JSONObject res = new JSONObject();
		
		String table_name = paramMap.get("output_table_name").toString();
		String bnd_cd_column = paramMap.get("bnd_cd_column").toString();
		String user_id = paramMap.get("user_id").toString();
		// String description = paramMap.get("description").toString();
		String target_agent = "INNER";
		Boolean base_boolean = Boolean.parseBoolean(paramMap.get("base_boolean").toString());
		Boolean tot_boolean = Boolean.parseBoolean(paramMap.get("tot_boolean").toString());
		String bnd_cd_level = paramMap.get("bnd_cd_level").toString();
		
		String REQUEST_AUTO_AGENT_URI = ConfigUtil.getString("autoagent.url");
		String METHOD = HttpRequestKey.POST;
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, Object> resourceQuery = new HashMap<String, Object>();
		
		resourceQuery.put("user_id", user_id);
		resourceQuery.put("data_nm", table_name);
		resourceQuery.put("data_storage_type", "PG");
		
		int resourceId = resourceMapper.selectResourceId(resourceQuery);
		String executeId = DateUtil.getGenerateId(user_id);
		String state = "RUNNING";
		String actionType = "COORD";
		String dataStorageType = "PG";
		String category4 = "USER";
		
		map.put("TOT_BOOLEAN", tot_boolean.booleanValue());
		map.put("BASE_BOOLEAN", base_boolean.booleanValue());
		map.put("BND_CD_COLUMN", bnd_cd_column);
		// map.put("DESCRIPTION", description);
		map.put("USER_ID", user_id);
		map.put("INPUT_TABLE_NAME", table_name);
		map.put("BND_CD_LEVEL", bnd_cd_level);
		map.put("EXECUTE_ID", executeId);
		map.put("ACTION_TYPE", actionType);
		
		if (paramMap.get("cm").toString().equals("/data/modify")) {
			if (paramMap.containsKey("rid")) {
				map.put("RID", paramMap.get("rid"));
			}
		}
		
		Execute execute = new Execute();
		
		execute.setExecute_id(executeId);
		execute.setUser_id(user_id);
		execute.setState(state);
		execute.setCategory4(category4);
		execute.setAction_type(actionType);
		execute.setAction_id(user_id);
		execute.setData_name(table_name);
		execute.setOutput_resource_id("" + resourceId);
		execute.setData_storage_type(dataStorageType);
		
		executeMapper.insertExecute(execute);
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		org.json.JSONObject mapObject = new org.json.JSONObject(map);
		param.put("PARAM", mapObject.toString());
		
		String geoUrl = REQUEST_AUTO_AGENT_URI + paramMap.get("cm").toString() + "/bnd";
		
		
		System.out.println(geoUrl);
		System.out.println(param);
		
		HttpJSONConnector client = new HttpJSONConnector(geoUrl, METHOD, param);
		
		res = client.connectWithParse();
		
		return res;
	}
	
	/**
	 * 프로세스 진행 현황
	 * 
	 * @param String
	 *            execute_id
	 * @throws SystemFailException
	 * @exception Exception
	 */
	public JSONObject findByExecuteProcess(String execute_id) throws SystemFailException {
		
		JSONObject res = new JSONObject();
		
		HashMap<String, Object> parameters = new HashMap<String, Object>();
		parameters.put(RequestKey.EXECUTE_ID, execute_id);
		
		res = restService.call(Command.EXECUTE, Command.DETAIL, parameters);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * 리소스 테이블과 생성 스키마 검색
	 * 
	 * @param Map
	 *            paramMAp
	 * @exception Exception
	 */
	public Map<String, Object> selectResourceInfo(Map<String, Object> paramMap) throws SQLException {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		
		Map<String, Object> info = myDataMapper.getMyDataInfo(paramMap.get("resource_id").toString());
		
		if (!info.containsKey("kor_column_desc")) {
			this.createKorColumnGridData(paramMap.get("user_id").toString(), paramMap.get("data_nm").toString(), paramMap.get("resource_id").toString());
			info = myDataMapper.getMyDataInfo(paramMap.get("resource_id").toString());
		}
		paramMap.put(RequestKey.TABLE_NAME, paramMap.get("data_nm").toString());
		paramMap.put(RequestKey.SCHEMA, paramMap.get("user_id").toString());
		returnMap.put("info", info);
		
		// schema
		// data_nm
		boolean existsColumn = false;
		List<Map<String, Object>> columnList = this.selectColumnsDataType(paramMap);
		
		if (!paramMap.containsKey(RequestKey.SORT_COLUMN)) {
			paramMap.put(RequestKey.SORT_COLUMN, "rid");
		}
		for (int i = 0; i < columnList.size(); i++) {
			Map<String, Object> columnInfo = columnList.get(i);
			if (columnInfo.get("column_name").toString().equalsIgnoreCase(paramMap.get(RequestKey.SORT_COLUMN).toString())) {
				existsColumn = true;
			}
		}
		
		if (!existsColumn) {
			if (paramMap.get(RequestKey.SORT_COLUMN).toString().equalsIgnoreCase("rid")) {
				// rid - > gid
				paramMap.put(RequestKey.SORT_COLUMN, "gid");
			} else {
				paramMap.put(RequestKey.SORT_COLUMN, "rid");
			}
		}
		
		if (info.containsKey("action_type")) {
			if (info.get("action_type").toString().equalsIgnoreCase("SHP") || info.get("action_type").toString().equalsIgnoreCase("SPACE_ANALY")) {
				returnMap.put("resource", dataCreateMapper.selectResourceGeom(paramMap));
			} else if (info.get("action_type").toString().equalsIgnoreCase("GEOM")) {
				returnMap.put("resource", dataCreateMapper.selectResourceGeom(paramMap));
			} else {
				returnMap.put("resource", dataCreateMapper.selectResourceInfo(paramMap));
			}
		} else {
			returnMap.put("resource", dataCreateMapper.selectResourceInfo(paramMap));
		}
		
		// selectResourceInfo
		// selectResourceGeom
		
		return returnMap;
	}
	
	/**
	 * 리소스 테이블과 속성검색
	 * 
	 * @param Map
	 *            paramMAp
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Map<String, Object>> selectColumnsDataType(Map<String, Object> paramMap) throws SQLException {
		List selectColumns = dataCreateMapper.selectColumns(paramMap);
		return selectColumns;
	}
	
	/**
	 * 타입 리턴
	 * 
	 * @param String
	 *            data_nm , String user_id , String spacialColumn
	 * @return
	 * @exception SQLException
	 */
	public String getColumnType(String data_nm, String user_id, String spacialColumn) throws SQLException {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		String type = "string";
		paramMap.put("data_nm", data_nm);
		paramMap.put("user_id", user_id);
		paramMap.put("spacialColumn", spacialColumn);
		
		List<Map<String, Object>> list = this.selectColumnsDataType(paramMap);
		
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map = list.get(i);
			if (map.get("column_name").toString().equalsIgnoreCase(spacialColumn)) {
				String dataType = map.get("data_type").toString();
				if ("integer".equalsIgnoreCase(dataType) || "bigint".equalsIgnoreCase(dataType) || "double precision".equalsIgnoreCase(dataType)) {
					type = "integer";
				}
			}
		}
		
		return type;
	}
	
	/**
	 * 지오코딩 결과 조회
	 * 
	 * @param String
	 *            id, String start, String display, String status
	 * @return
	 * @exception SQLException
	 * @throws JSONException
	 */
	public Map<String, Object> getModifyResultByPg(String resource_id) throws SQLException, JSONException {
		
		ResourceVO resourceVo = resourceMapper.detailResource(Integer.parseInt(resource_id));
		Map<String, Object> returnMap = new HashMap<String, Object>();
		
		// data from resource
		String resourceUserId = String.valueOf(resourceVo.getUser_id());
		String dataStorageType = resourceVo.getData_storage_type();
		String resourceTable = resourceVo.getData_name();
		String resourceTableWithSchema = resourceUserId + "." + resourceTable;
		String actionType = resourceVo.getAction_type();
		Map<String, Object> map = new HashMap<String, Object>();
		
		String pos_column_desc = resourceVo.getPos_column_desc();
		
		map.put("resourceTableWithSchema", resourceTableWithSchema);
		map.put("actionType", actionType);
		
		returnMap.put("successInfo", dataCreateMapper.getGeoCodingSuccessResultCount(map));
		
		return returnMap;
	}
	
	/**
	 * 데이터 수정
	 * 
	 * @param Map
	 *            paramMap
	 * @return
	 * @exception SQLException
	 */
	public void updateRecordColumnData(Map<String, Object> paramMap, String schema, String data_nm, String rid) throws SQLException {
		for (Map.Entry<String, Object> elem : paramMap.entrySet()) {
			// System.out.println("key = " + elem.getKey() + " :: value = " +
			// elem.getValue().toString());
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("schema", schema);
			map.put("data_nm", data_nm);
			map.put("rid", rid);
			map.put("key", elem.getKey());
			map.put("fixValue", elem.getValue().toString());
			
			String type = this.getColumnType(data_nm, schema, elem.getKey());
			map.put("paramType", type);
			
			dataCreateMapper.updateRecordColumnData(map);
		}
	}
	
	/**
	 * 데이터 검색
	 * 
	 * @param Map
	 *            paramMap user_id, resource_id
	 * @return
	 * @exception SQLException
	 */
	public Map searchMyDataInfo(Map paramMap) throws SQLException {
		return myDataMapper.searchMyDataInfo(paramMap);
	}
	
	/**
	 * 나의 데이터 조건 검색
	 * 
	 * @param Map
	 *            paramMap schema, data_nm , jsonArray jArray
	 * @return
	 * @throws JSONException
	 * @exception SQLException
	 */
	public Map conditionList(String schema, String data_nm, org.json.JSONArray jArray) throws org.json.JSONException {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("schema", schema);
		paramMap.put("data_nm", data_nm);
		String query = QueryMakeUtil.whereMakeQuery(jArray);
		paramMap.put("where", query);
		List list = dataCreateMapper.selectConditionList(paramMap);
		paramMap.put("selectList", list);
		return paramMap;
	}
	
	/**
	 * 테이블 변경
	 * 
	 * @param Map
	 *            paramMap
	 * @return
	 * @exception SQLException
	 * @throws JSONException
	 */
	public Map modifyTable(HttpServletRequest request) throws SQLException, JSONException {
		String cmd = request.getParameter("profile_cmd");
		Map<String, Object> returnMap = new HashMap<String, Object>();
		// defaultParam
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("table_name", request.getParameter("table_name"));
		paramMap.put("data_nm", request.getParameter("table_name"));
		paramMap.put("schema", request.getParameter("schema"));
		paramMap.put("output_resource_id", request.getParameter("output_resource_id"));
		paramMap.put("resource_id", request.getParameter("output_resource_id"));
		
		if (cmd.equalsIgnoreCase("ADD_COLUMN")) {
			paramMap.put("new_column_name", request.getParameter("column_name"));
			paramMap.put("new_data_type", request.getParameter("data_type"));
			// paramMap.put("new_data_type", request.getParameter("new_data_type"));
			paramMap.put("column_length", request.getParameter("column_length"));
			paramMap.put("new_column_comment", request.getParameter("new_column_comment"));
			paramMap.put("columnInfo", request.getParameter("kor_column_desc"));
			logger.info("========ADD_COLUMN=====" + paramMap.toString());
			
			dataCreateMapper.addColumn(paramMap);
			myDataMapper.updateKorColumnGridData(paramMap);
			
		} else if (cmd.equalsIgnoreCase("DEL_COLUMN")) {
			// kor_column_desc 업데이트 필요
			paramMap.put("drop_column_name", request.getParameter("drop_column_name"));
			paramMap.put("columnInfo", request.getParameter("kor_column_desc"));
			dataCreateMapper.dropColumn(paramMap);
			myDataMapper.updateKorColumnGridData(paramMap);
			
		} else if (cmd.equalsIgnoreCase("MODIFY_COLUMN_DATA")) {
			
			// modify_column_name
			// modify_text
			paramMap.put("modify_text", request.getParameter("modeStr"));
			paramMap.put("data_nm", request.getParameter("table_name") + " as a");
			paramMap.put("modify_column_type", request.getParameter("modify_column_type"));
			paramMap.put("modify_column_name", request.getParameter("modify_column_name"));
			paramMap.put("where", request.getParameter("where"));// where
			
			String type = this.getColumnType(request.getParameter("table_name"), paramMap.get("schema").toString(), paramMap.get("modify_column_name").toString());
			paramMap.put("paramType", type);
			dataCreateMapper.columnDataModify(paramMap);
		} else if (cmd.equalsIgnoreCase("DEL_RECORD")) {
			// 행 삭제
			// rid가 아닌 gid가 들어올 경우 문제 발생 할수 있으므로 수정 필요
			paramMap.put("rid", request.getParameter("rid"));
			paramMap.put("standardColumn", request.getParameter("standardColumn"));
			dataCreateMapper.deleteRow(paramMap);
			
			int cnt = dataCreateMapper.selectRowCount(paramMap);
			paramMap.put("cnt", Integer.toString(cnt));
			myDataMapper.updateDataCnt(paramMap);
			returnMap.put("action", cmd);
		} else if (cmd.equalsIgnoreCase("ADD_RECORD")) {
			String json_str = request.getParameter("json_str");
			org.json.JSONArray jsonArray = JSONConvertUtil.strToJSONArray(json_str);
			StringBuffer insertSQL = new StringBuffer();
			StringBuffer valueSQL = new StringBuffer();
			String sequenceName = this.getTableSequence(paramMap.get("schema").toString(), paramMap.get("table_name").toString());
			
			for (int i = 0; i < jsonArray.length(); i++) {
				insertSQL.append("insert into " + paramMap.get("schema").toString() + "." + paramMap.get("table_name").toString());
				insertSQL.append(" (rid,");
				valueSQL.append(" values((select " + sequenceName + " as nextseq),");
				org.json.JSONArray jArray = jsonArray.getJSONArray(i);
				for (int j = 0; j < jArray.length(); j++) {
					org.json.JSONObject jobj = jArray.getJSONObject(j);
					jobj.get("column_id");
					jobj.get("column_value");
					
					insertSQL.append(jobj.get("column_id").toString());
					valueSQL.append("'" + jobj.get("column_value").toString() + "'");
					
					if (j < jArray.length() - 1) {
						insertSQL.append(",");
						valueSQL.append(",");
					}
				}
				
				insertSQL.append(" )");
				valueSQL.append(")");
				insertSQL.append(valueSQL.toString());
				
				logger.info("========isnertSQL=====" + insertSQL.toString());
				paramMap.put("insertQuery", insertSQL.toString());
				dataCreateMapper.insertRow(paramMap);
				
				insertSQL.setLength(0);
				valueSQL.setLength(0);
				
			}
			
			int cnt = dataCreateMapper.selectRowCount(paramMap);
			paramMap.put("cnt", Integer.toString(cnt));
			myDataMapper.updateDataCnt(paramMap);
			
		}
		
		return returnMap;
	}
	
	/**
	 * 주석 업데이트
	 * 
	 * @param Map
	 *            paramMap
	 * @return
	 * @exception SQLException
	 */
	public Map<String, Object> saveData(Map<String, Object> paramMap) throws SQLException {
		myDataMapper.updateKorSubject(paramMap);
		return paramMap;
	}
	
	/**
	 * 데이터 삭제
	 * 
	 * @param String[]
	 *            data_id
	 * @return
	 * @exception SQLException
	 */
	public Map<String, Object> deleteMyDataList(String[] data_ids, String schema) throws SQLException {
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> deleteItemList = new ArrayList<String>();
		for (int i = 0; i < data_ids.length; i++) {
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("user_id", schema);
			paramMap.put("schema", schema);
			
			Map info = null;
			if (isStringDouble(data_ids[i])) {
				paramMap.put("resource_id", data_ids[i]);
				info = myDataMapper.searchMyDataInfo(paramMap);
				
				if (info != null) {
					paramMap.put("data_nm", info.get("data_nm").toString());
					deleteItemList.add(info.get("data_nm").toString());
					myDataMapper.deleteMyData(paramMap);
					dataCreateMapper.dropTable(paramMap);
				}
				
			} else {
				paramMap.put("execute_id", data_ids[i]);
				myDataMapper.deleteExecute(paramMap);
			}
			
		}
		
		map.put("schema", schema);
		map.put("data_id", data_ids.toString());
		map.put("data_nm", deleteItemList);
		map.put("count", data_ids.length);
		
		return map;
	}
	
	/**
	 * dropTable
	 * 
	 * @param
	 * @return
	 * @exception SQLException
	 */
	public void dropTable(Map<String, Object> paramMap) throws SQLException {
		dataCreateMapper.dropTable(paramMap);
	}
	
	/**
	 * 데이터 존재 유무 확인
	 * 
	 * @param String[]
	 *            data_id
	 * @return Map
	 * @exception SQLException
	 */
	public int dataNameExists(String schema, String copy_nm) throws SQLException {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("user_id", schema);
		paramMap.put("data_subject", copy_nm);
		int count = myDataMapper.existsSubjectData(paramMap);
		return count;
	}
	
	/**
	 * 데이터 복사
	 * 
	 * @param Map
	 *            map (user_id, schema , copy_nm , oriName)
	 * @return Map (생성된 resource_id)
	 * @exception SQLException
	 */
	public Map<String, Object> copyData(Map<String, Object> paramMap) throws SQLException {
		String user_id = paramMap.get("user_id").toString();
		String schema = paramMap.get("schema").toString();
		String output_table_name = "copy_" + DateUtil.getGenerateId(user_id);
		
		Map<String, Object> executeMap = new HashMap<String, Object>();
		executeMap.put("EXECUTE_ID", DataUtil.getGenerateId(user_id));
		executeMap.put("USER_ID", user_id);
		executeMap.put("DATA_NAME", output_table_name);
		executeMap.put("STATE", "END");
		executeMap.put("ORG_EXECUTE_ID", paramMap.get("execute_id").toString());
		executeMapper.insertExecuteR(executeMap);
		
		Map<String, String> sqlMap = new HashMap<String, String>();
		String copySql = "CREATE TABLE " + user_id + "." + output_table_name + " AS SELECT * FROM " + schema + "." + paramMap.get("oriName").toString();
		sqlMap.put("createSql", copySql);
		dataCreateMapper.createTable(sqlMap);
		
		// resource
		Map<String, Object> resourceMap = new HashMap<String, Object>();
		resourceMap.put("user_id", user_id);
		resourceMap.put("resource_id", paramMap.get("resource_id"));
		resourceMap.put("data_name", output_table_name);
		resourceMap.put("description", paramMap.get("description").toString());
		myDataMapper.copyMyData(resourceMap);
		
		return resourceMap;
	}
	
	/**
	 * 데이터 다운로드 (다운로드 할수 있게 생성을 호출 하고 리턴으로 생성 데이터에 대한 정보를 전달한다)
	 * 
	 * @param String
	 *            schema , JSONArray
	 * @return Zip
	 * @throws JSONException
	 * @throws SQLException
	 * 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String downLoadFileInfo(String schema, org.json.JSONArray jsonArray) throws JSONException, SQLException {
		String zipFileName = "";
		FileCreateUtil.deleteFiles(FileCreateUtil.filePath + "/" + schema);
		for (int i = 0; i < jsonArray.length(); i++) {
			org.json.JSONObject jObj = jsonArray.getJSONObject(i);
			String resource_id = jObj.getString("id");
			String type = jObj.getString("type");
			Map<String, Object> resourceInfo = myDataMapper.getMyDataInfo(resource_id);
			
			Map<String, Object> searchInfo = new HashMap<String, Object>();
			searchInfo.put("data_nm", resourceInfo.get("data_nm").toString());
			searchInfo.put("user_id", schema);
			searchInfo.put("SCHEMA", resourceInfo.get("user_id").toString());
			searchInfo.put("TABLE_NAME", resourceInfo.get("data_nm").toString());
			searchInfo.put("LIMIT", 0);
			searchInfo.put("OFFSET", 0);
			
			String dataInfo = "";
			String analysis_type = "";
			
			try {
				searchInfo.put("execute_id", resourceInfo.get("execute_id").toString());
			} catch(Exception ee) {
				searchInfo.put("execute_id", "");
			}

			try {
				Map analysisParamInfo = (Map)analysisService.getAnalysisParamInfo(searchInfo);
				String params = (String)analysisParamInfo.get("param");
				org.json.JSONObject paramJson = new org.json.JSONObject(params);
				
				dataInfo = paramJson.getString("dataInfo");
				analysis_type = (String)analysisParamInfo.get("analysis_type");
			} catch(Exception ex) {
				logger.error(ex.toString());
			}
			
			List<Map> columnList = dataCreateMapper.selectColumns(searchInfo);
			
			List<Map<String, Object>> metaDataOrg = null;
			List<Map<String, Object>> metaData = null;
			String action_type = "";
			
			if (resourceInfo.containsKey("action_type")) { 
				action_type = resourceInfo.get("action_type").toString();
			}
			
			if (resourceInfo.containsKey("geometry_type")) {
				if (resourceInfo.get("geometry_type").toString().equalsIgnoreCase("MULTIPOLYGON") || resourceInfo.get("action_type").toString().contains("ANALY")) {
					metaDataOrg = dataCreateMapper.selectResourceGeom(searchInfo);
				} else {
					metaDataOrg = dataCreateMapper.selectResourceInfo(searchInfo);
				}
			} else {
				metaDataOrg = dataCreateMapper.selectResourceInfo(searchInfo);
			}
			if (metaDataOrg != null && !metaDataOrg.isEmpty() 
					&&
				(analysis_type.equalsIgnoreCase("BOUNDARY") || analysis_type.equalsIgnoreCase("BUFFER"))
					&&
				(
						dataInfo.indexOf("인구조건") >= 0 ||
						dataInfo.indexOf("가구조건") >= 0 ||
						dataInfo.indexOf("주택조건") >= 0 ||
						dataInfo.indexOf("산업조건") >= 0 ||
						dataInfo.indexOf("테마업종조건") >= 0 ||
						dataInfo.indexOf("농가조건") >= 0 ||
						dataInfo.indexOf("임가조건") >= 0 ||
						dataInfo.indexOf("어가조건") >= 0
				)
			) {
				metaData = new ArrayList();
				for (int ri = 0; ri < metaDataOrg.size(); ri ++) {
					HashMap<String, Object> map = (HashMap<String, Object>)metaDataOrg.get(ri); 
					Long data = null;
					if (map.containsKey("data") && map.get("data") != null) data = (Long)map.get("data");
					if (data == null || data < 5) {
						map.put("data", "N/A");
					}
					
					if (map.containsKey("x")) map.remove("x");
					if (map.containsKey("y")) map.remove("y");
					if (map.containsKey("employee_cnt")) map.remove("employee_cnt");

					metaData.add(map);
				}
			} else {
				metaData = new ArrayList();
				if ( analysis_type.equalsIgnoreCase("VORONOI_ANALY")) {
					for (int ri = 0; ri < metaDataOrg.size(); ri ++) {
						HashMap<String, Object> map = (HashMap<String, Object>)metaDataOrg.get(ri); 
						if (map.containsKey("x")) map.remove("x");
						if (map.containsKey("y")) map.remove("y");
						if (map.containsKey("employee_cnt")) map.remove("employee_cnt");
						
						/*
						if (analysis_type.equalsIgnoreCase("OPERATION")) {
							Long data1 = null;
							Long data2 = null;
							Long data = null;
							if (map.containsKey("data") && map.get("data") != null) data = (Long)map.get("data");
							if (map.containsKey("data1") && map.get("data1") != null) data1 = (Long)map.get("data1");
							if (map.containsKey("data2") && map.get("data2") != null) data2 = (Long)map.get("data2");
							if (data1 <= 5 || data2 <= 5 || data <= 5) {
								map.put("data", "N/A");
								map.put("data1", "N/A");
								map.put("data2", "N/A");
							}
						}
						*/
						
						metaData.add(map);
					}
				} else {
					metaData = metaDataOrg;
				}
			}
			// 필요한것 정리
			// tableName - > 파일의 폴더명과 파일명으로 변환 할것이다.
			// columnList -> 컬럼 타입 정보니까 당연히 필요하겠지
			// resouceInfo.get("kor_column_desc")
			// 한글 컬럼명과 columnList를 연결 해서 있으면 변경 해주고 없으면 그냥 물리명 때려 넣고
			// 실제데이터 리스트
			// 지오코딩에 대한 정보를 가지고 있는게 필요한데
			
			// 1.컬럼 네임 리스트 완성
			List<Map<String, String>> columnListInfo = new ArrayList<Map<String, String>>();
			if (resourceInfo.containsKey("kor_column_desc")) {
				org.json.JSONArray korColumnArray = JSONConvertUtil.strToJSONArray(resourceInfo.get("kor_column_desc").toString());
				for (int j = 0; j < columnList.size(); j++) {
					Map<String, String> columnMap = columnList.get(j);
					boolean searchVal = false;
					if (korColumnArray.length() > 0) {
						for (int k = 0; k < korColumnArray.length(); k++) {
							org.json.JSONObject korObj = korColumnArray.getJSONObject(k);
							if (columnMap.get("column_name").toString().equalsIgnoreCase(korObj.get("column_id").toString())) {
								searchVal = true;
								columnMap.put("column_kor_name", korObj.get("column_id").toString());
							}
						}
						
						if (searchVal == false) {
							columnMap.put("column_kor_name", columnMap.get("column_name").toString());
						}
					}
					columnListInfo.add(columnMap);
				}
			} else {
				for (int j = 0; j < columnList.size(); j++) {
					Map<String, String> columnMap = columnList.get(j);
					columnMap.put("column_kor_name", columnMap.get("column_name").toString());
					columnListInfo.add(columnMap);
				}
			}
			
			// 2.지오코딩 정보
			List<Map<String, Object>> geoInfoList = new ArrayList<Map<String, Object>>();
			try {
				if (resourceInfo.containsKey("pos_column_desc")) {
					// pos_column_desc 정보가 있을경우
					org.json.JSONObject posColInfo = new org.json.JSONObject(resourceInfo.get("pos_column_desc").toString());
					org.json.JSONArray posArray = posColInfo.getJSONArray("pos_col_infos");
					
					for (int j = 0; j < posArray.length(); j++) {
						org.json.JSONObject posObj = posArray.getJSONObject(j);
						Map<String, Object> geoInfo = new HashMap<String, Object>();
						geoInfo.put("pos_method", posObj.get("pos_method")); // XY , 집계구 XY ,집계구 코드 , 행정구 코드 ,기초단위구 XY ,
						// 기초단위구 코드 //GEOM
						geoInfo.put("pos_columns", posObj.get("pos_columns")); // x,y tot_x,tot_y //geom
						geoInfoList.add(geoInfo);
					}
				}
			} catch(Exception eg) {
				logger.debug(eg.getMessage());
			}
			
			// 2-1 지오코딩 정보 2
			// action_type = MAPPING , COORD , SHP , 다 되니까 null 만 아니면 ㅇㅇ
			// geometry_type
			// x_column , y_column
			
			// 3.리스트 정보 metaData
			
			// columnListInfo , geoInfoList , metaData
			FileCreateUtil fileUtil = FileCreateUtil.getInstance(type);
			fileUtil.createFile(schema, resourceInfo.get("data_nm").toString(), columnListInfo, geoInfoList, metaData, action_type);
			
			if (i == jsonArray.length() - 1) {
				String rootPath = fileUtil.filePath + "/" + schema;
				zipFileName = fileUtil.getZipfile(rootPath, schema);
			}
			
		}
		
		return zipFileName;
	}
	
	/**
	 * 즐겨찾기
	 * 
	 * @param String
	 *            yn , String data_id
	 * @return Map
	 * @exception SQLException
	 */
	public void favorite(String yn, String resource_id) throws SQLException {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("yn", yn);
		paramMap.put("resource_id", resource_id);
		myDataMapper.favorite(paramMap);
	}
	
	/**
	 * 공유
	 * 
	 * @param String
	 *            yn , String data_id ,String inst_seq
	 * @return
	 * @exception SQLException
	 */
	public void share(String yn, String resource_id, String inst_seq) throws SQLException {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("yn", yn);
		paramMap.put("resource_id", resource_id);
		paramMap.put("inst_seq", inst_seq);
		myDataMapper.share(paramMap);
	}
	
	/**
	 * 문자열이 숫자가 될수 있는지 @param String ㄴ @return @exception
	 */
	public boolean isStringDouble(String s) {
		try {
			Double.parseDouble(s);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
	
	/**
	 * 시퀀스명 리턴
	 * 
	 * @param String
	 *            schema , String data_nm
	 * @return
	 * @exception SQLException
	 */
	public String getTableSequence(String schema, String data_nm) throws SQLException {
		String sequenceName = null;
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("user_id", schema);
		paramMap.put("data_nm", data_nm);
		// rid or gid
		String ridSeq = null;
		String gidSeq = null;
		List<Map<String, Object>> columnList = dataCreateMapper.selectColumns(paramMap);
		for (int i = 0; i < columnList.size(); i++) {
			Map<String, Object> columnInfo = columnList.get(i);
			if (columnInfo.containsKey("column_default")) {
				if (columnInfo.get("column_name").toString().equalsIgnoreCase("rid")) {
					ridSeq = columnInfo.get("column_default").toString();
				}
				
				if (columnInfo.get("column_name").toString().equalsIgnoreCase("gid")) {
					gidSeq = columnInfo.get("column_default").toString();
				}
			}
		}
		
		if (ridSeq != null) {
			sequenceName = ridSeq;
		} else {
			sequenceName = gidSeq;
		}
		
		return sequenceName;
	}
}
