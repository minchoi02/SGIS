/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.io.BufferedReader;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.util.GeoCodingUtil;
import kostat.lbdms.ServiceAPI.common.util.JSONConvertUtil;
import kostat.lbdms.ServiceAPI.common.util.ShpFileUtil;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.controller.service.DataCreateService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.DataCreateMapper;
import kostat.lbdms.ServiceAPI.controller.service.mapper.MyDataMapper;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mozilla.universalchardet.UniversalDetector;
import org.opengis.referencing.FactoryException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Class Name : DataCreateServiceImpl.java
 * @Description : DataCreateService Implement Class
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2018.07.16 최초생성
 *
 * @author 최재영
 * @since 2018.07.16
 * @version 1.0
 * @see
 *
 * 		Copyright (C) by NeighborSystem All right reserved.
 */

@Service("dataCreateService")
public class DataCreateServiceImpl extends EgovAbstractServiceImpl implements DataCreateService {

	private final Log logger = LogFactory.getLog(DataCreateServiceImpl.class);
	
	/** CommonDAO */
	@Resource(name = "dataCreateMapper")
	private DataCreateMapper dataCreateMapper;

	@Resource(name = "myDataMapper")
	private MyDataMapper myDataMapper;

	public GeoCodingUtil geoCodingUtil;

	/**
	 * getEncoding 텍스트 csv 내용 미리보기
	 * 
	 * @param MultipartFile
	 *            file
	 * @param String[]
	 *            charsets
	 * @return JSONObject
	 */
	@Override
	public JSONObject getEncoding(MultipartFile file, String[] charsets) throws IOException {
		JSONObject resultObject = new JSONObject();
		for (int i = 0; i < charsets.length; i++) {
			StringBuffer sb = new StringBuffer();
			BufferedReader br = null;
			String line = "";
			int readCnt = 0;

			br = new BufferedReader(new InputStreamReader(file.getInputStream(), charsets[i]), 2048);
			while ((line = br.readLine()) != null) {
				readCnt++;
				sb.append(line.toString() + "\n");
			}

			br.close();

			try {
				resultObject.put(charsets[i], sb.toString());
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				logger.error(e);
			}

		}
		return resultObject;
	}

	/**
	 * getCharset
	 * 
	 * @param MultipartFile
	 *            file
	 * @return String
	 */
	@Override
	public String getCharset(MultipartFile file) throws IOException {
		String encoding = null;
		String charset = null;

		// encoding 정보 읽어오기 start
		byte[] buf = new byte[4096];

		UniversalDetector detector = new UniversalDetector(null);

		int nread;
		InputStream is = file.getInputStream();

		while ((nread = is.read(buf)) > 0 && !detector.isDone()) {
			detector.handleData(buf, 0, nread);
		}
		detector.dataEnd();

		encoding = detector.getDetectedCharset();

		detector.reset();

		if (encoding != null) {
			if (encoding.indexOf("UTF") >= 0 && encoding.indexOf("8") >= 0) {
				charset = "UTF8";
			} else if (encoding.indexOf("EUC") >= 0) {
				charset = "EUC-KR";
			} else {
				charset = "UTF8";
			}
		} else {
			charset = "UTF8";
		}

		return charset;
	}

	/**
	 * createTable Excel,Text 나의 데이터 테이블 생성
	 * 
	 * @param List
	 *            list,String data_type, String output_table_name, String
	 *            description, boolean header, String delimiter, String
	 *            target_agent, String user_id, String encoding_type
	 * @return void
	 */
	@Override
	public Map createTable(List list, String data_type, String output_table_name, String description, boolean header,
			String delimiter, String target_agent, String user_id, String encoding_type)
			throws IOException, SQLException {
	    	//기존 코드 주석 처리
		Map paramMap = new HashMap();
		paramMap.put("user_id", user_id);
		String sequenceSql = "CREATE SEQUENCE " + user_id + "." + output_table_name + "_rid_seq START 1";
		String createSql = "CREATE TABLE " + user_id + "." + output_table_name + "(";
		String alterQuery = "";

		List insertRow = new ArrayList();
		List columnList = new ArrayList();
		if (header == false) {
			String columnSql = "";
			String[] row = (String[]) list.get(0);
			for (int i = 0; i < row.length; i++) {
				if (i == (row.length - 1)) {
					createSql += " item" + (i + 1) + " character varying , rid bigint NOT NULL DEFAULT nextval('"
							+ user_id + "." + output_table_name + "_rid_seq'::regclass))";
					columnSql += " item" + (i + 1) + ",rid";
				} else {
					createSql += " item" + (i + 1) + " character varying,";
					columnSql += " item" + (i + 1) + ",";
				}
				alterQuery += " COMMENT ON COLUMN " + user_id + "." + output_table_name + ".item" + (i + 1) + " IS '"
						+ row[i] + "';";
				Map columnMap = new HashMap();
				columnMap.put("column_id", "item" + (i + 1));
				columnMap.put("column_name", "item" + (i + 1));
				columnList.add(columnMap);
			}

			for (int i = 0; i < list.size(); i++) {
				String insertQuery = "insert into " + user_id + "." + output_table_name + "(" + columnSql
						+ ") values (";
				String[] values = (String[]) list.get(i);
				for (int j = 0; j < values.length; j++) {
					if (j == (values.length - 1)) {
						insertQuery += "'" + values[j] + "',nextval('" + user_id + "." + output_table_name
								+ "_rid_seq')";
					} else {
						insertQuery += "'" + values[j] + "',";
					}
				}
				insertQuery += ")";
				insertRow.add(insertQuery);
			}

		} else {
			String columnSql = "";
			String[] row = (String[]) list.get(0);

			for (int i = 0; i < row.length; i++) {
				if (i == (row.length - 1)) {
					createSql += " item" + (i + 1) + " character varying , rid bigint NOT NULL DEFAULT nextval('"
							+ user_id + "." + output_table_name + "_rid_seq'::regclass))";
					columnSql += " item" + (i + 1) + ",rid";
				} else {
					createSql += " item" + (i + 1) + " character varying,";
					columnSql += " item" + (i + 1) + ",";
				}
				alterQuery += " COMMENT ON COLUMN " + user_id + "." + output_table_name + ".item" + (i + 1) + " IS '"
						+ row[i] + "';";
				Map columnMap = new HashMap();
				columnMap.put("column_id", "item" + (i + 1));
				columnMap.put("column_name", row[i]);
				columnList.add(columnMap);
			}

			for (int i = 1; i < list.size(); i++) {
				String insertQuery = "insert into " + user_id + "." + output_table_name + "(" + columnSql
						+ ") values (";
				String[] values = (String[]) list.get(i);
				for (int j = 0; j < values.length; j++) {
					if (j == (values.length - 1)) {
						insertQuery += "'" + values[j] + "',nextval('" + user_id + "." + output_table_name
								+ "_rid_seq')";
					} else {
						insertQuery += "'" + values[j] + "',";
					}
				}
				insertQuery += ")";
				insertRow.add(insertQuery);
			}

		}
		paramMap.put("sequenceSql", sequenceSql);
		paramMap.put("createSql", createSql);
		int hasOwn = dataCreateMapper.schemaHsOwn(paramMap);
		if (hasOwn == 0) {
			dataCreateMapper.createSchma(paramMap);
		}
		dataCreateMapper.createSequence(paramMap);
		dataCreateMapper.createTable(paramMap);

		for (int i = 0; i < insertRow.size(); i++) {
			Map insertSql = new HashMap();
			insertSql.put("insertQuery", insertRow.get(i).toString());
			dataCreateMapper.insertRow(insertSql);
		}

		double data_size = 0;
		String data_cnt = "0";

		String pos_column_desc = "";
		try {
			pos_column_desc = makeColumnInfo(columnList).toString();
		} catch (JSONException e) {
			logger.info(e);
		}

		insertMyData(user_id, "PG", null, data_size, data_cnt, null, null, null, null, description,
				user_id + "." + output_table_name, output_table_name, "TABLE_CREATE", null, null, pos_column_desc);
		Map infoMap = new HashMap();
		infoMap.put("user_id", user_id);
		infoMap.put("relation_resource_id", user_id + "." + output_table_name);
		return myDataMapper.searchMyDataInfo(infoMap);
	}


	/**
	 * createShpTable Shp 나의 데이터 테이블 생성
	 * 
	 * @param List
	 *            list,String data_type, String output_table_name, String
	 *            description, boolean header, String delimiter, String
	 *            target_agent, String user_id, String encoding_type
	 * @return void
	 */
	public Map createShpTable(List list, String data_type, String output_table_name, String description, boolean header,
			String delimiter, String target_agent, String user_id, String encoding_type)
			throws IOException, SQLException, FactoryException {

		return null;
	}

	public JSONObject makeColumnInfo(List list) throws JSONException {
		JSONObject jobj = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			Map map = (Map) list.get(i);
			JSONObject innerObj = new JSONObject();
			innerObj.put("column_id", map.get("column_id").toString());
			innerObj.put("column_name", map.get("column_name").toString());
			jsonArray.put(innerObj);
		}
		jobj.put("column_infos", jsonArray);

		return jobj;
	}

	/**
	 * insertMyData
	 * 
	 * @param String
	 *            user_id,String data_storage_type,String data_path,double data_size
	 *            ,String category1,String category2,String category3,String
	 *            category4,String description,String relation_resource_id,String
	 *            data_name,String action_type,String x_column,String
	 *            y_columnm,String pos_column_desc
	 * @return List
	 * @throws SQLException
	 */
	public void insertMyData(String user_id, String data_storage_type, String data_path, double data_size,
			String data_cnt, String category1, String category2, String category3, String category4, String description,
			String relation_resource_id, String data_name, String action_type, String x_column, String y_column,
			String pos_column_desc) throws SQLException {

		Map<String, Object> paramMap = new HashMap<String, Object>();

		paramMap.put("user_id", user_id);
		paramMap.put("data_storage_type", data_storage_type); // PG
		paramMap.put("data_path", data_path);
		paramMap.put("data_size", data_size);
		paramMap.put("data_cnt", data_cnt);
		paramMap.put("category1", category1);
		paramMap.put("category2", category2);
		paramMap.put("category3", category3);
		paramMap.put("category4", category4);
		paramMap.put("description", description);
		paramMap.put("relation_resource_id", relation_resource_id);
		paramMap.put("data_name", data_name);
		paramMap.put("action_type", action_type);// TABLE_CREAET , MAPPING , COORD
		paramMap.put("x_column", x_column);
		paramMap.put("y_column", y_column);
		paramMap.put("pos_column_desc", pos_column_desc);

		myDataMapper.insertMyData(paramMap);

	}


	/**
	 * insertMyData
	 * 
	 * @param String
	 *            user_id,String data_storage_type,String data_path,double data_size
	 *            ,String category1,String category2,String category3,String
	 *            category4,String description,String relation_resource_id,String
	 *            data_name,String action_type,String x_column,String
	 *            y_columnm,String pos_column_desc
	 * @return List
	 * @throws SQLException
	 */
	
	/**
	 * updateMyData 지오코딩 등 resource table에 변경 사항을 업데이트 한다.
	 * 
	 * @param Map
	 *            map
	 * @return List
	 * @throws SQLException
	 */
	public void updateMyData(Map map) throws SQLException {

	}

	/**
	 * getMetaData
	 * 
	 * @param List<MultipartFile>list,
	 *            String data_type, String delimiter, String charsets
	 * @return List
	 */
	@Override
	public List getMetaData(List<MultipartFile> list, String data_type, String delimiter, String charsets)
			throws IOException {
		// TODO Auto-generated method stub
		List dataList = new ArrayList();
		if (data_type.equalsIgnoreCase("SHP")) {
			InputStream[] is = new InputStream[list.size()];
		} else {

			if (data_type.equalsIgnoreCase("TEXT")) {

				StringBuffer sb = new StringBuffer();
				BufferedReader br = null;
				String line = "";

				br = new BufferedReader(new InputStreamReader(list.get(0).getInputStream(), charsets));

				while ((line = br.readLine()) != null) {
					String[] cells = line.split(delimiter);
					dataList.add(cells);
				}

			} else if (data_type.equalsIgnoreCase("EXCEL")) {
				InputStream is = list.get(0).getInputStream();
				XSSFWorkbook xworkBook = new XSSFWorkbook(is);
				XSSFSheet xsheet = null;
				XSSFRow xrow = null;
				XSSFCell xcell = null;

				xsheet = xworkBook.getSheetAt(0);
				int rows = xsheet.getPhysicalNumberOfRows();

				for (int i = 0; i < rows; i++) {
					xrow = xsheet.getRow(i);
					short cells = xrow.getLastCellNum();
					String rowArray[] = new String[cells];
					for (int j = 0; j < cells; j++) {
						xcell = xrow.getCell(j);

						switch (xcell.getCellType()) {
						case 0:
							rowArray[j] = String.valueOf((long) xcell.getNumericCellValue());
							break;
						case 1:
							rowArray[j] = xcell.getStringCellValue();
							break;
						}

					}
					dataList.add(rowArray);
				}
			}
		}

		return dataList;
	}

	/**
	 * getMyDataInfo
	 * 
	 * @param String
	 *            data_id,String relation_id
	 * @return Map
	 */
	public Map<String, Object> getMyDataInfo(String data_id, String relation_id) throws SQLException {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String relationTableSql = "select * from " + relation_id + " order by rid asc";
		System.out.println("data_id = " + data_id + " :: relation_id = " + relation_id);
		Map paramsMap = new HashMap();

		paramsMap.put("user_id", relation_id.split("\\.")[0]);
		paramsMap.put("relation_id", relation_id.split("\\.")[1]);
		resultMap.put("info", myDataMapper.getMyDataInfo(data_id));

		resultMap.put("dataList", dataCreateMapper.getMyDataInfo(relationTableSql));
		resultMap.put("columnList", dataCreateMapper.selectColumns(paramsMap));
		return resultMap;
	}

	/**
	 * geoCoding
	 * 
	 * @param Map
	 *            paramsMap
	 * @return Map
	 */
	@Override
	public Map geoCoding(Map paramsMap) throws SQLException {
		String type = paramsMap.get("geoCodingType").toString();

		List rowList = dataCreateMapper.getResourceInfo(paramsMap);
		geoCodingUtil = geoCodingUtil.getGeoCodingUtil();
		if (type.equalsIgnoreCase("addr")) {
			String[] selectColumns = paramsMap.get("selectColumns").toString().split(",");
			paramsMap.put("result", addrGeoCoding(rowList, selectColumns));

		} else if (type.equalsIgnoreCase("xy")) {
			String xColumn = paramsMap.get("xColumn").toString();
			String yColumn = paramsMap.get("yColumn").toString();
			paramsMap.put("result", xyReverseGeoCoding(rowList, xColumn, yColumn));

		} else {

		}

		updateTableGeoCoding(paramsMap);
		return null;
	}

	public void updateTableGeoCoding(Map paramsMap) {

		String[] queryArr;
		// 지오코딩한 결과를 Table에 반영하기
		// tableId, tableName 에 반영

		// addr, xy , geom, 행정동경계코드
		String type = paramsMap.get("geoCodingType").toString();
		String tableName = paramsMap.get("tableName").toString();

		// 기존 지오코딩된 결과가 있을수 있기 때문에 기존 컬럼을 삭제한다.
		String alterDropQuery = "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS x;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS y;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS mapping_status;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS api_name;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS addr;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS tot_oa_cd;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS tot_x;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS tot_y;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS pnu;"; // 지번번호 번지까지
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS mgt;"; // 건물관리번호 건물의 고유식별번호

		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS bas_x;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS bas_y;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS bas_cd;";
		alterDropQuery += "ALTER TABLE " + tableName + " DROP COLUMN IF EXISTS adm_dr_cd;";

		dataCreateMapper.tableModify(alterDropQuery);

		// 기본 컬럼 추가
		String alterQuery = "ALTER TABLE " + tableName + " ADD x double precision;";
		alterQuery += "ALTER TABLE " + tableName + " ADD y double precision;";
		alterQuery += "ALTER TABLE " + tableName + " ADD mapping_status integer;";
		alterQuery += "ALTER TABLE " + tableName + " ADD api_name varchar;";
		alterQuery += "ALTER TABLE " + tableName + " ADD addr varchar;";

		if (type.equalsIgnoreCase("addr") || type.equalsIgnoreCase("xy")) {
			// 집계구 단위로
			alterQuery += "ALTER TABLE " + tableName + " ADD tot_oa_cd varchar;";
			alterQuery += "ALTER TABLE " + tableName + " ADD tot_x double precision;";
			alterQuery += "ALTER TABLE " + tableName + " ADD tot_y double precision;";
		} else {

			// bas 기초단위구 행정동
			// 기초단위구 adm_cd
			alterQuery += "ALTER TABLE " + tableName + " ADD adm_dr_cd varchar;";
			alterQuery += "ALTER TABLE " + tableName + " ADD bas_x double precision;";
			alterQuery += "ALTER TABLE " + tableName + " ADD bas_y double precision;";
			alterQuery += "ALTER TABLE " + tableName + " ADD bas_cd varchar;";
		}

		dataCreateMapper.tableModify(alterQuery);

		Map geoCodingResult = (Map) paramsMap.get("result");
		List<JSONObject> resultList = (List<JSONObject>) geoCodingResult.get("resultList");
		geoCodingUtil = geoCodingUtil.getGeoCodingUtil();
		for (int i = 0; i < resultList.size(); i++) {
			JSONObject jObj = resultList.get(i);
			// x
			// y
			// mapping_status
			// api_name = sop_api
			// addr
			if (type.equalsIgnoreCase("addr") || type.equalsIgnoreCase("xy")) {
				int errCd = -200;
				try {
					errCd = Integer.parseInt(jObj.get("errCd").toString());
				} catch (NumberFormatException e) {
					logger.error(e);
				} catch (JSONException e) {
					logger.error(e);
				}

				if (errCd != 200) {
					try {
						JSONObject resultObj = jObj.getJSONObject("result");
						JSONArray resultData = resultObj.getJSONArray("resultdata");

						for (int j = 0; j < resultData.length(); j++) {
							System.out.println("j  =" + j + " 번째");
							System.out.println(resultData.getJSONObject(j));
							Map totMap = JSONConvertUtil.jsonToMap(resultData.getJSONObject(j));
							JSONObject totObj = geoCodingUtil.admcdCenterGeoCode(totMap);
							Map sendMap = new HashMap();
							sendMap.put("tableName", tableName);
							sendMap.put("x", totMap.get("x").toString());
							sendMap.put("y", totMap.get("y").toString());
							sendMap.put("mapping_status", "1");
							sendMap.put("api_name", "sop_api");
							sendMap.put("addr", totObj.get("full_addr").toString());
							sendMap.put("tot_oa_cd", totObj.get("cd").toString());
							sendMap.put("tot_x", totObj.get("x_coor").toString());
							sendMap.put("tot_y", totObj.get("y_coor").toString());
							sendMap.put("rid", jObj.get("index"));

							System.out.println("sendMap ===");
							System.out.println(sendMap);
							dataCreateMapper.geoCodingUpdate(sendMap);
						}
					} catch (JSONException e) {
						logger.error(e);
					}

				} else {

				}

			} else {
				// bas 기초단위구 행정동
				// 기초단위구 adm_cd
				/*
				 * String strQuery = "update " + schema + "." + table +
				 * " as a set adm_dr_cd = c.adm_dr_cd, bas_x = c.bas_x, bas_y = c.bas_y, bas_cd = c.bas_cd from "
				 * +
				 * "(select  b.rid, a.adm_dr_cd, a.bas_cd, ST_X(ST_PointOnSurface(a.geom))::float "
				 * + "as bas_x, ST_Y(ST_PointOnSurface(a.geom))::float as bas_y from " + schema
				 * + "." + table + " as b " + "inner join " + tbNm + " as a on ST_Contains" +
				 * "(a.geom,ST_SetSRID(ST_MakePoint(b.x , b.y) , 5179))) as c where a.rid = c.rid"
				 * ;
				 */
			}

		}

	}

	/**
	 * addrGeoCoding
	 * 
	 * @param List
	 *            rowList, String[] selectColumns
	 * @return Map
	 */
	public Map addrGeoCoding(List rowList, String[] selectColumns) throws SQLException {
		Map returnMap = new HashMap<String, Object>();
		List<JSONObject> resultList = new ArrayList<JSONObject>();
		int successCount = 0;
		int errorCount = 0;

		for (int i = 0; i < rowList.size(); i++) {
			Map<String, Object> resultMap = (Map<String, Object>) rowList.get(i);
			Map<String, Object> sendMap = new HashMap<String, Object>();
			sendMap.put("index", i + 1);

			String addr = "";
			for (int j = 0; j < selectColumns.length; j++) {
				addr += resultMap.get(selectColumns[j]).toString() + " ";
			}

			try {
				sendMap.put("addr", URLEncoder.encode(addr, "UTF-8"));
				JSONObject jobj = geoCodingUtil.sopGeoCode(sendMap);
				resultList.add(jobj);
				int errCd = (int) jobj.get("errCd");
				if (errCd != 0) {
					errorCount = errorCount + 1;
				} else {
					successCount = successCount + 1;
				}
				System.out.println(jobj.toString());
			} catch (UnsupportedEncodingException e) {
				logger.error(e);
			} catch (JSONException e) {
				logger.error(e);
			}

		}

		returnMap.put("resultList", resultList);
		returnMap.put("successCount", successCount);
		returnMap.put("errorCount", errorCount);
		System.out.println("returnMap=======");
		System.out.println(returnMap);
		return returnMap;
	}

	/**
	 * xyReverseGeoCoding
	 * 
	 * @param List
	 *            rowList, String xColumn, String yColumn
	 * @return Map
	 */
	public Map xyReverseGeoCoding(List rowList, String xColumn, String yColumn) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * admGeoCoding
	 * 
	 * @param List
	 *            rowList, String xColumn, String yColumn
	 * @return Map
	 */
	public Map admGeoCoding(List rowList, String[] selectColumns) throws SQLException {
		Map returnMap = new HashMap<String, Object>();
		List<JSONObject> resultList = new ArrayList<JSONObject>();
		int successCount = 0;
		int errorCount = 0;

		for (int i = 0; i < rowList.size(); i++) {
			Map<String, Object> resultMap = (Map<String, Object>) rowList.get(i);
			Map<String, Object> sendMap = new HashMap<String, Object>();
			sendMap.put("index", i + 1);

			String adm_cd = "";
			for (int j = 0; j < selectColumns.length; j++) {
				adm_cd += resultMap.get(selectColumns[j]).toString();
			}

			try {
				sendMap.put("adm_cd", adm_cd);
				JSONObject jobj = geoCodingUtil.admcdCenterGeoCode(sendMap);
				resultList.add(jobj);
				int errCd = (int) jobj.get("errCd");
				if (errCd != 0) {
					errorCount = errorCount + 1;
				} else {
					successCount = successCount + 1;
				}
				System.out.println(jobj.toString());
			} catch (JSONException e) {
				logger.error(e);
			}

		}

		returnMap.put("resultList", resultList);
		returnMap.put("successCount", successCount);
		returnMap.put("errorCount", errorCount);
		System.out.println("returnMap=======");
		System.out.println(returnMap);
		return returnMap;
	}

	/**
	 * existSubjectData
	 * 
	 * @param List
	 *            rowList, String xColumn, String yColumn
	 * @return Map
	 * @throws SQLException
	 */
	public boolean existSubjectData(Map map) throws SQLException {
		int count = myDataMapper.existsSubjectData(map);
		if (count != 0) {
			return false;
		} else {
			return true;
		}
	}
	
	public int schemaHsOwn(Map paramMap) throws SQLException {
		return dataCreateMapper.schemaHsOwn(paramMap);
	}
	
	public void createSchma(Map paramMap) throws SQLException {
		dataCreateMapper.createSchma(paramMap);
	}
	
	public List getCollectCareerList(Map mapParameter) throws SQLException{
		return dataCreateMapper.getCollectCareerList(mapParameter);
	}
	public List getCollectCareerList2(Map mapParameter) throws SQLException{
		return dataCreateMapper.getCollectCareerList2(mapParameter);
	}
	
	public List getCollectCareerList3(Map mapParameter) throws SQLException{
		return dataCreateMapper.getCollectCareerList3(mapParameter);
	}

	public void deleteCollectCareer(Map mapParameter) throws SQLException{
		dataCreateMapper.deleteCollectCareer(mapParameter);
	}
	
	public void deleteCollectCareer2(Map mapParameter) throws SQLException{
		dataCreateMapper.deleteCollectCareer2(mapParameter);
	}
	
	public void deleteCollectCareer3(Map mapParameter) throws SQLException{
		dataCreateMapper.deleteCollectCareer3(mapParameter);
	}
	
}