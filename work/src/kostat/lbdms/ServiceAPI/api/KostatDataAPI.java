package kostat.lbdms.ServiceAPI.api;
/**
 * @Class Name : PrjMngMapper.java
 * @Description : PrjMngMapper Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.8.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2019.8.17
 * @version 1.0
 * @see
 *
 */

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.util.StringUtil;
import kostat.lbdms.ServiceAPI.common.util.http.HttpRequestKey;
import kostat.lbdms.ServiceAPI.common.util.http.HttpResponseConnector;
import kostat.lbdms.ServiceAPI.common.util.http.IResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.core.network.process.FileWriteResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.core.network.process.NormalResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.controller.service.KostatDataService;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

@Controller
@Interceptor("CallLogger")
@SuppressWarnings({ "unchecked", "rawtypes" })
@RequestMapping(value="/api/datasvc/")
public class KostatDataAPI {
	private static final String PROPERTY_PATH = "/globals.properties";
	private final Log logger = LogFactory.getLog(KostatDataAPI.class);
	
	@Resource(name="kostatDataService")
	private KostatDataService kostatDataService;
	
	@Autowired
	private RestService restService;
	
	/**
	 * 테이블 목록 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getTables.do")
	public ModelAndView getTables(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String db_type = (String)request.getParameter("db_type");
			if (db_type == null || db_type.equalsIgnoreCase("")) {
				db_type = "pg";
			} else {
				db_type = Security.cleanXss(db_type);
			}
			db_type = "pg";
			
			String schema = (String)request.getParameter("schema");
			if (schema == null || schema.equalsIgnoreCase("")) {
				schema = "kostat";
			} else {
				schema = Security.cleanXss(schema);
			}
			mapParameter.put("db_type", db_type);
			mapParameter.put("schema", schema);
			
			JSONObject jsonObj = new JSONObject();
			if (db_type.equalsIgnoreCase("hive")) {
				jsonObj = (JSONObject)kostatDataService.getHiveTables(mapParameter);
			} else {
				jsonObj = (JSONObject)kostatDataService.getPgTables(mapParameter);
			}
			
			if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				
				model.put("column", StringUtil.toList(jsonObj.getJSONArray("COLUMN")));
				model.put("result", StringUtil.toList(jsonObj.getJSONArray("VALUE")));
			} else {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			}
			
		} catch (Exception e) {
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 테이블 정보 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getMetaInfo.do")
	public ModelAndView getMetaInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String db_type = (String)request.getParameter("db_type");
			if (db_type == null || db_type.equalsIgnoreCase("")) {
				db_type = "pg";
			} else {
				db_type = Security.cleanXss(db_type);
			}
			
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			String schema = (String)request.getParameter("schema");
			if (schema == null || schema.equalsIgnoreCase("")) {
				schema = user_id;
			} else {
				schema = Security.cleanXss(schema);
			}

			String table = (String)request.getParameter("table");
			table = Security.cleanXss(table);
			
			mapParameter.put("db_type", db_type);
			mapParameter.put("schema", schema);
			mapParameter.put("USER_ID", schema);
			mapParameter.put("table", table);
			
			//수정 : 최인섭
			JSONObject jsonObj = null;
			if (db_type.equalsIgnoreCase("hive")) {
				//jsonObj = (JSONObject)kostatDataService.getHiveMetaInfo(mapParameter);
				String data = restService.callByWeb(response, "/getMetaInfo", mapParameter);
				jsonObj = new JSONObject(data);
				//JSONParser jsonParser = new JSONParser();
				//jsonObj = (JSONObject)jsonParser.parse(data);
			} else {
				jsonObj = (JSONObject)kostatDataService.getPgMetaInfo(mapParameter);
			}
			//VALUE":[{"data_type":"string","comment":"시도코드","col_name":"sido_cd"
			if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				
				if (!db_type.equalsIgnoreCase("hive")) {
					model.put("column", StringUtil.toList(jsonObj.getJSONArray("COLUMN")));
					model.put("result", StringUtil.toList(jsonObj.getJSONArray("VALUE")));
				} else {
					model.put("result", StringUtil.toList(jsonObj.getJSONObject("RESULT").getJSONArray("VALUE")));
				}
				JSONObject jsonObj2 = new JSONObject();
				if (db_type.equalsIgnoreCase("hive")) {
					jsonObj2 = (JSONObject)kostatDataService.getHiveTblHst(mapParameter);
				} else {
					jsonObj2 = (JSONObject)kostatDataService.getPgTblHst(mapParameter);
				}
				
				if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
					model.put("result2", StringUtil.toList(jsonObj2.getJSONArray("VALUE")));
				}
				
			} else {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 테이블 정보 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/execQryResult.do")
	public ModelAndView execQryResult(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String db_type = (String)request.getParameter("db_type");
			if (db_type == null || db_type.equalsIgnoreCase("")) {
				db_type = "pg";
			} else {
				db_type = Security.cleanXss(db_type);
			}
			
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			String schema = (String)request.getParameter("schema");
			if (schema == null || schema.equalsIgnoreCase("")) {
				schema = user_id;
			} else {
				schema = Security.cleanXss(schema);
			}
			
			String tbl_nm = (String)request.getParameter("tbl_nm");
			if (tbl_nm == null || tbl_nm.equalsIgnoreCase("")) {
				tbl_nm = "";
			} else {
				tbl_nm = Security.cleanXss(tbl_nm);
			}
			
			String qry_txt = (String)request.getParameter("qry_txt");
			if (qry_txt.equals("")) {
				qry_txt = "select * from " + schema + "." + tbl_nm + " limit 5";	
			}
			mapParameter.put("exe_query", qry_txt.replaceAll(";", ""));
			mapParameter.put("USER_ID", schema);
			
			JSONObject jsonObj = null;
			if (db_type.equalsIgnoreCase("hive")) {
				//jsonObj = (JSONObject)kostatDataService.execHiveQryResult(mapParameter);
				String data = restService.callByWeb(response, "/execHiveQryResult", mapParameter);
				jsonObj = new JSONObject(data);
				//JSONParser jsonParser = new JSONParser();
				//jsonObj = (JSONObject)jsonParser.parse(data);
			} else {
				jsonObj = (JSONObject)kostatDataService.execPgQryResult(mapParameter);
			}
			
			if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				if (!db_type.equalsIgnoreCase("hive")) {
					model.put("column", StringUtil.toList(jsonObj.getJSONArray("COLUMN")));
					model.put("result", StringUtil.toList(jsonObj.getJSONArray("VALUE")));
				} else {
					model.put("column", StringUtil.toList(jsonObj.getJSONObject("RESULT").getJSONArray("COLUMN")));
					model.put("result", StringUtil.toList(jsonObj.getJSONObject("RESULT").getJSONArray("VALUE")));	
				}
			} else {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			}
			
		} catch (Exception e) {
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 테이블 정보 수정
	 * @param request
	 * @param response
	 * @return /view/prjmng/getWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/setMetaInfo.do")
	public ModelAndView setMetaInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String db_type = (String)request.getParameter("db_type");
			if (db_type == null || db_type.equalsIgnoreCase("")) {
				db_type = "pg";
			} else {
				db_type = Security.cleanXss(db_type);
			}
			mapParameter.put("db_type",  db_type);
			mapParameter.put("tbl_sch",  (String)request.getParameter("tbl_sch"));
			mapParameter.put("tbl_nm",  (String)request.getParameter("tbl_nm"));
			mapParameter.put("tbl_nm_ko",  (String)request.getParameter("tbl_nm_ko"));
			mapParameter.put("cl_nm",  (String)request.getParameter("cl_nm"));
 			mapParameter.put("col_org",  (String)request.getParameter("col_org"));
			mapParameter.put("col_mng",  (String)request.getParameter("col_mng"));
			mapParameter.put("col_tel",  (String)request.getParameter("col_tel"));
			mapParameter.put("col_method",  (String)request.getParameter("col_method"));
			mapParameter.put("col_period",  (String)request.getParameter("col_period"));
			mapParameter.put("sop_geo_ok",  (String)request.getParameter("sop_geo_ok"));
			mapParameter.put("daum_geo_ok",  (String)request.getParameter("daum_geo_ok"));
			mapParameter.put("fail_geo_ok",  (String)request.getParameter("fail_geo_ok"));
			mapParameter.put("meta_tag",  (String)request.getParameter("meta_tag"));
			
			//String qry_txt = "";
			//mapParameter.put("exe_query", qry_txt);
			
			JSONObject jsonObj = new JSONObject();
			jsonObj = (JSONObject)kostatDataService.setMetaInfo(mapParameter);
			
			if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				
				//model.put("column", StringUtil.toList(jsonObj.getJSONArray("COLUMN")));
				//model.put("result", StringUtil.toList(jsonObj.getJSONArray("VALUE")));
			} else {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			}
			
		} catch (Exception e) {
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	

	/**
	 * 테이블 정보 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getWorkSet.do
	 * /api/datasvc/downloadHive.do?schemaNm=kostat&tableNm=sti_pop_person_info_2017
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/downloadHive.do")
	public void downloadHive(
    		@RequestParam(value="schemaNm", required=false) String schemaNm, 
    		@RequestParam(value="tableNm", required=false) String tableNm,
    		@RequestParam(value="qryTxt", required=false) String qryTxt, 
			HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
 			String fileName = DateUtil.getGenerateId(tableNm);
			
 			if (qryTxt!=null && !qryTxt.equals("")) tableNm = "";
 			
			HashMap<String,Object> parameterMap = new HashMap<String,Object>();
			JSONObject paramObj = new JSONObject();
			paramObj.put("schemaNm", schemaNm);
			paramObj.put("tableNm", tableNm);
			if (qryTxt!=null && !qryTxt.equals("")) paramObj.put("qryTxt", qryTxt.replaceAll(";", ""));
			paramObj.put("fileName", fileName);
			parameterMap.put( "PARAM", paramObj.toString() );
					
			fileName = fileName + ".zip";
			HttpResponseConnector client = new HttpResponseConnector( ConfigUtil.getString("rest.url") + "/downloadHive", HttpRequestKey.POST,  parameterMap);
			IResponseHandler handler = new FileWriteResponseHandler( response, fileName );
			client.setResponseHandler( handler );
			client.connect();
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		/*
		Map mapParameter = new HashMap();
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		
		ZipOutputStream zos = null;
		try {
			String query = "";
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			String fileDownSrc = "";
			if (schemaNm == null) {
				schemaNm = user_id;
			}
			if (tableNm == null && qryTxt == null) {
				throw new AuthorityException ("잘못된 접근입니다.");
			} else {
				if (tableNm != null && !tableNm.trim().equals("")) {
					fileDownSrc = "/user/hive/warehouse/" + schemaNm + ".db/" + tableNm;
				} else {
					fileDownSrc = "/user/hive/warehouse/" + schemaNm + ".db/download_tbl";
					
					query = "DROP TABLE IF EXISTS " + schemaNm + ".download_tbl;";
					query += "CREATE TABLE " + schemaNm + ".download_tbl ";
					query += " row format delimited fields terminated by '|' stored as textfile ";
					query += " AS " + qryTxt ;
					
					mapParameter.put("exe_query", query);
					
					JSONObject jsonObj = new JSONObject();
					jsonObj = (JSONObject)kostatDataService.execHiveQryResult(mapParameter);
					String successChk = jsonObj.getString("MESSAGE");
					if (!successChk.equalsIgnoreCase("SUCCESS")) return;
				}
			}
			
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String hdpUser = props.getProperty("Globals.hadoop_user"); 
			String hdpDefault = props.getProperty("Globals.hadoop_location"); 
			System.setProperty("hadoop.home.dir", props.getProperty("Globals.hadoop_home"));
			System.setProperty("javax.xml.parsers.DocumentBuilderFactory", "com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
			
			org.apache.hadoop.conf.Configuration conf = new org.apache.hadoop.conf.Configuration();
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/core-site.xml"));
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/hdfs-site.xml"));
			conf.set("fs.defaultFS", hdpDefault);
			
			org.apache.hadoop.fs.FileSystem dfs = org.apache.hadoop.fs.FileSystem.get(URI.create(hdpDefault), conf, hdpUser);
			
			//String hdfsFile = user_id + "_" + DateUtil.getGenerateId("download") + ".txt";
			//String downloadFile = "/tmp/hive_download/" + hdfsFile ;
			//org.apache.hadoop.fs.Path filenamePath = new org.apache.hadoop.fs.Path(fileDownSrc);
			//org.apache.hadoop.fs.Path downloadFilePath = new org.apache.hadoop.fs.Path(downloadFile);
			//FileUtil.copyMerge(dfs, filenamePath, dfs,  downloadFilePath, true, conf, "");
			
			FSFile fsf = new FSFile( dfs, dfs.getFileStatus(new Path(fileDownSrc) ));
			
			String zipFileName = user_id + "_" + DateUtil.getGenerateId("download") + ".zip";
			
			//String zipFilePath = "/data2/hive_download/" + zipFileName;
			//"C:/data2/hive_download/" + zipFileName;
			String zipFilePath = props.getProperty("Globals.hive_download") + zipFileName;  
			File zipFile = new File(zipFilePath);
			
			byte[] buffer = new byte[4096];
			FileOutputStream fos = new FileOutputStream(zipFile);
			zos = new ZipOutputStream(fos);
			
			List<FSFile> fileList = fsf.getListAll();
			for(FSFile fsFile: fileList){
				org.apache.hadoop.fs.FSDataInputStream hdfsInputStream = dfs.open(fsFile.getPath());
				String outputFileName = fsFile.getPath().getName();
				//System.out.println(outputFileName);
				ZipEntry entity = new ZipEntry(outputFileName);
				zos.putNextEntry(entity);
				int len;
				while ((len = hdfsInputStream.read(buffer)) > 0) {
					zos.write(buffer, 0, len);
				}
				hdfsInputStream.close();
			}   
			if(zos != null){
				try {
					zos.closeEntry();
					zos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment;filename=\"" +zipFileName+"\";");
			
		    OutputStream out = response.getOutputStream();
			FileInputStream fis = new FileInputStream(zipFilePath);
			FileCopyUtils.copy(fis, out);
			out.flush();
			
			if (fos != null) fos.close();
			if (fis != null) fis.close();
			if (out != null) out.close();
		} catch (IllegalArgumentException e1) {
			logger.info(e1.getMessage());
		} catch (IOException e1) {
			logger.info(e1.getMessage());
		} catch (InterruptedException e1) {
			logger.info(e1.getMessage());
		} catch (ClassNotFoundException e1) {
			logger.info(e1.getMessage());
		} catch (SQLException e1) {
			logger.info(e1.getMessage());
		} catch (JSONException e1) {
			logger.info(e1.getMessage());
		} finally {
			if(zos != null){
				try {
					zos.closeEntry();
					zos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		*/
	}
	
    /**
     * @brief PG 테이블 다운로드 후 하둡으로 
     * @param resVo
     * @param downloadFileName
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     * @throws IOException
     * http://localhost:8080/api/datasvc/movePGToHDFS.do?schemaNm=kostat&tableNm=sti_pop_person_info_2017
     */
	@RequestMapping(value = "/movePGtoHive.do")
	@ResponseBody
    public ModelAndView movePGtoHive(
    		@RequestParam(value="schemaNm", required=false) String schemaNm, 
    		@RequestParam(value="tableNm", required=false) String tableNm,
    		@RequestParam(value="qryTxt", required=false) String qryTxt, 
    		HttpServletRequest request, HttpServletResponse response, 
    		ModelMap model)
	    throws ClassNotFoundException, SQLException, IOException {
		String query = "";
		String fileName = "";
		if (schemaNm == null) {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			schemaNm = user_id;
		}
		if (tableNm == null && qryTxt == null) {
			throw new AuthorityException ("잘못된 접근입니다.");
		} else {
			if (tableNm != null && !tableNm.trim().equals("")) {
				query = "select * from " + schemaNm + "." + tableNm ;
				fileName = tableNm + ".csv";
			} else {
				query = qryTxt;
				fileName = DateUtil.getGenerateId("") + ".csv";
			}
		}
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		
		try {
			mapParameter.put("schemaNm", schemaNm);
			mapParameter.put("tableNm", tableNm);
			
			HashMap<String,Object> parameterMap = new HashMap<String,Object>();
			parameterMap.put( "PARAM", mapParameter.toString() );
			
 			HttpResponseConnector client = new HttpResponseConnector(ConfigUtil.getString("rest.url") + "/movePGtoHive", "POST",  parameterMap);
			IResponseHandler handler = new NormalResponseHandler( response, false );
			client.setResponseHandler(handler);
			
			model.put("result", client.connect());
			model.put("errCd", "0");
			model.put("success", "true");
		}catch(Exception e) {
			model.put("errCd", "-1");
			model.put("success", "false");
		}
		
		return new ModelAndView("jsonV", model);
		
		/*
		String outPath = ConfigUtil.getString("fileUpload.defaultPath");
		FileWriter pgWriter = new FileWriter(outPath + fileName);
		DBConnector pgConn = new OpenPGSql();
	
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
		String pass = ConfigUtil.getString("jdbc.userdb.password");
		String dbname = ConfigUtil.getString("jdbc.userdb.username");
	
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		try {
	
		    pgConn.openConn(database, dbname, pass);
		    CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());
		    String copyQuery = "COPY (" + query + ") TO STDOUT WITH DELIMITER AS ',' NULL AS '' CSV HEADER ";
	
		    //logger.info("쿼리 : " + copyQuery);
		    copyManager.copyOut(copyQuery, pgWriter);
		    pgWriter.close();
		    
		    //String fileName2 = DateUtil.getGenerateId("encoding") + ".csv";
		    //FileUtil.changeEncoding("UTF-8", outPath + fileName, "MS949", outPath + fileName2);

			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String hdpUser = props.getProperty("Globals.hadoop_user"); 
			String hdpDefault = props.getProperty("Globals.hadoop_location"); 
			System.setProperty("hadoop.home.dir", props.getProperty("Globals.hadoop_home"));
			System.setProperty("javax.xml.parsers.DocumentBuilderFactory", "com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
			
			org.apache.hadoop.conf.Configuration conf = new org.apache.hadoop.conf.Configuration();
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/core-site.xml"));
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/hdfs-site.xml"));
			conf.set("fs.defaultFS", hdpDefault);
			org.apache.hadoop.fs.FileSystem dfs = org.apache.hadoop.fs.FileSystem.get(URI.create(hdpDefault), conf, hdpUser);
			
			String hadoopPath = "/tmp/upload/" + fileName;
			Path localPath = new Path(outPath + fileName);
			Path remotePath = new Path(hadoopPath);
			dfs.moveFromLocalFile(localPath, remotePath);
			
			//LOAD DATA INPATH '/user/data/sample.csv' INTO TABLE tbl;;

			query = "LOAD DATA INPATH '" + hadoopPath + "' OVERWRITE INTO TABLE " + schemaNm + "." + tableNm;
			
			Map mapParameter = new HashMap();
			mapParameter.put("exe_query", query);
			
			JSONObject jsonObj = new JSONObject();
			jsonObj = (JSONObject)kostatDataService.execHiveQryResult(mapParameter);
			
			if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
			} else {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			}
		} catch (InterruptedException | JSONException e) {
			logger.info(e.getMessage());
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} finally {
		    pgConn.closeConn();
		    if (pgWriter != null) pgWriter.close();
		}
		
		return new ModelAndView("jsonV", model);
		*/
    }
	

    /**
     * @brief PG 테이블 다운로드 후 하둡으로 
     * @param resVo
     * @param downloadFileName
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     * @throws IOException
     * http://localhost:8080/api/datasvc/movePGToHDFS.do?schemaNm=kostat&tableNm=sti_pop_person_info_2017
     */
	@RequestMapping(value = "/moveHivetoPG.do")
	@ResponseBody
    public ModelAndView moveHivetoPG(
    		@RequestParam(value="schemaNm", required=false) String schemaNm, 
    		@RequestParam(value="tableNm", required=false) String tableNm,
    		HttpServletRequest request, HttpServletResponse response, 
    		ModelMap model)
	    throws ClassNotFoundException, SQLException, IOException {
		String fileName = "";
		if (schemaNm == null) {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			schemaNm = user_id;
		}
		if (tableNm == null) {
			throw new AuthorityException ("잘못된 접근입니다.");
		} 
		
		fileName = tableNm + ".csv";
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		
		try {
			mapParameter.put("schemaNm", schemaNm);
			mapParameter.put("tableNm", tableNm);
			mapParameter.put("fileName", fileName);
			
			HashMap<String,Object> parameterMap = new HashMap<String,Object>();
			parameterMap.put( "PARAM", mapParameter.toString() );
			
 			HttpResponseConnector client = new HttpResponseConnector(ConfigUtil.getString("rest.url") + "/moveHivetoPG", "POST",  parameterMap);
			IResponseHandler handler = new NormalResponseHandler( response, false );
			client.setResponseHandler(handler);
			
			model.put("result", client.connect());
			model.put("errCd", "0");
			model.put("success", "true");
		}catch(Exception e) {
			model.put("errCd", "-1");
			model.put("success", "false");
		}
		return new ModelAndView("jsonV", model);
		
		/*
		String outPath = ConfigUtil.getString("fileUpload.defaultPath");
		FileWriter pgWriter = new FileWriter(outPath + fileName);
		DBConnector pgConn = new OpenPGSql();
	
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
		String pass = ConfigUtil.getString("jdbc.userdb.password");
		String dbname = ConfigUtil.getString("jdbc.userdb.username");
	
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		try {
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String hdpUser = props.getProperty("Globals.hadoop_user"); 
			String hdpDefault = props.getProperty("Globals.hadoop_location"); 
			System.setProperty("hadoop.home.dir", props.getProperty("Globals.hadoop_home"));
			System.setProperty("javax.xml.parsers.DocumentBuilderFactory", "com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
			
			org.apache.hadoop.conf.Configuration conf = new org.apache.hadoop.conf.Configuration();
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/core-site.xml"));
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/hdfs-site.xml"));
			conf.set("fs.defaultFS", hdpDefault);
			org.apache.hadoop.fs.FileSystem dfs = org.apache.hadoop.fs.FileSystem.get(URI.create(hdpDefault), conf, hdpUser);
			
			
			pgConn.openConn(database, dbname, pass);
		    CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());
		    String copyQuery = "COPY " + schemaNm + "." + tableNm + " FROM STDOUT WITH DELIMITER AS '|' NULL AS '\\N'";
			String fileDownSrc = "/user/hive/warehouse/" + schemaNm + ".db/" + tableNm;
			FSFile fsf = new FSFile( dfs, dfs.getFileStatus(new Path(fileDownSrc) ));
			List<FSFile> fileList = fsf.getListAll();
			for(FSFile fsFile: fileList){
				org.apache.hadoop.fs.FSDataInputStream hdfsInputStream = dfs.open(fsFile.getPath());
				copyManager.copyIn(copyQuery, hdfsInputStream);
				hdfsInputStream.close();
			}   
			
		
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
		} catch (InterruptedException e) {
			logger.info(e.getMessage());
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} finally {
		    pgConn.closeConn();
		    if (pgWriter != null) pgWriter.close();
		}
		*/
    }
	
	/**
	 * 지오코딩 실행
	 * @param request
	 * @param response
	 * @return /view/prjmng/geocodingAction.do
	 * /api/datasvc/geocodingAction.do?schemaNm=kostat&tableNm=sti_pop_person_info_2017
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/geocodingAction.do")
	public ModelAndView geocodingAction(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			String table = (String)request.getParameter("table");
			String addr_col = (String)request.getParameter("geo_field");
			String geo_method = (String)request.getParameter("sop_daum");
			String geofld_type = (String)request.getParameter("geofld_type");
			
			mapParameter.put("schema_nm", user_id);
			mapParameter.put("geo_method", geo_method);
			mapParameter.put("addr_col", addr_col);
			mapParameter.put("table", table);
			mapParameter.put("geofld_type", geofld_type);
			
			JSONObject jsonObj = new JSONObject();
			jsonObj = (JSONObject)kostatDataService.geocodingAction(mapParameter);
				
 			if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
				model.put("id", "G2G11001");
				model.put("job_seq", jsonObj.getString("job_seq"));
				model.put("errCd", "0");
				model.put("errMsg", "Success");
			} else {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			}
		} catch (Exception e) {
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}	

	/**
	 * 지오코딩 상황 체크
	 * @param request
	 * @param response
	 * @return /view/prjmng/geocodingAction.do
	 * /api/datasvc/geocodingAction.do?schemaNm=kostat&tableNm=sti_pop_person_info_2017
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getGeoChk.do")
	public ModelAndView getGeoChk(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			String job_seq = (String)request.getParameter("job_seq");
			mapParameter.put("job_seq", job_seq);
			mapParameter.put("schema", user_id);
			
			JSONObject jsonObj = new JSONObject();
			jsonObj = (JSONObject)kostatDataService.getGeoChk(mapParameter);
				
			//VALUE":[{"data_type":"string","comment":"시도코드","col_name":"sido_cd"
			if (jsonObj.getString("MESSAGE").equalsIgnoreCase("success")) {
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("workSts", jsonObj.getString("workSts"));
				model.put("okCnt", jsonObj.getInt("okCnt"));
				model.put("errMsg", "Success");
			} else {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			}
			
		} catch (Exception e) {
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
}
