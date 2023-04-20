package kostat.lbdms.ServiceAPI.api;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.xmlbeans.XmlException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.mozilla.universalchardet.UniversalDetector;
import org.opengis.referencing.FactoryException;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.util.ShpFileUtil;
import kostat.lbdms.ServiceAPI.common.util.XExcelFileReader;
import kostat.lbdms.ServiceAPI.controller.service.DataCreateService;

/**
 * <pre>
 * 데이터베이스 테이블/파일 관리 contorller
 * </pre>
 *
 * @author Admin
 * @since 2018. 07. 09.
 * @version 1.0
 * @see
 * 
 *      <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2018.07.09.      최재영				        최초생성
 *
 *      </pre>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value = "/api/data")
public class DataCreateAPI {

	private final Log logger = LogFactory.getLog(DataCreateAPI.class);

	@Resource(name = "dataCreateService")
	private DataCreateService dataCreateService;

	String charsets[] = { "UTF8", "CP949" };

	/**
	 * 텍스트 파일 읽기
	 * 
	 * @param MultipartHttpServletRequest
	 *            HttpServletRequest
	 * @return map
	 */
	@RequestMapping(value = "/readText", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map readText(MultipartHttpServletRequest fileRequest, HttpServletRequest request) {

		JSONObject resultObject = new JSONObject();
		Map map = new HashMap();
		StringBuffer sb = new StringBuffer();
		String encodingType = request.getParameter("encoding_type");
		System.out.println("!!!!!!!!!!");
		System.out.println(request.getParameter("headerCheck"));
		
		/*String charset = "CP949";*/
		String charset = encodingType;

		try {
			Iterator<String> iter = fileRequest.getFileNames();

			while (iter.hasNext()) {
				String fileName = iter.next();
				System.out.println(fileName);
				MultipartFile file = fileRequest.getFile(fileName);
				System.out.println(file);

				// charset = dataCreateService.getCharset(file);
				if ("EUC-KR".equals(charset)) {
					charset = "CP949";
				}

				resultObject = dataCreateService.getEncoding(file, charsets);
			}

			map.put("result", resultObject.get(charset));
			map.put("charset", charset);
			System.out.println(map);
		} catch (IOException e) {
			logger.error(e);
		} catch (Exception e) {
			logger.error(e);

		}
		System.out.println(map);
		return map;
	}

	/**
	 * 엑셀 파일 읽기
	 * 
	 * @param MultipartHttpServletRequest
	 *            HttpServletRequest
	 * @return map
	 */
	@RequestMapping(value = "/readExcel", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map readExcel(MultipartHttpServletRequest fileRequest, HttpServletRequest request) {
		JSONObject res = new JSONObject();
		JSONArray values = new JSONArray();
		Map map = new HashMap();

		File convFile = null;

		try {
			Iterator<String> iter = fileRequest.getFileNames();
			while (iter.hasNext()) {
				String filename = iter.next();
				MultipartFile file = fileRequest.getFile(filename);

				String orgname = file.getOriginalFilename();
				String ext = orgname.substring(orgname.lastIndexOf("."), orgname.length());

				convFile = File.createTempFile("tmp_", ext);
				file.transferTo(convFile);

				XExcelFileReader reader = new XExcelFileReader(convFile.getPath());

				values = reader.readRow(11);
				res.put("data", values);
				map.put("result", res.get("data").toString());
			}
		} catch (IOException e) {
			logger.error(e);
		} catch (NullPointerException e) {
			logger.error(e);
		} catch (Exception e) {
			logger.error(e);
		} finally {
			if (convFile != null) {
				convFile.deleteOnExit();
			}
		}
		return map;

	}

	/**
	 * 테이블생성
	 * 
	 * @param MultipartHttpServletRequest
	 *            HttpServletRequest
	 * @return map
	 * @throws SQLException
	 * @throws FactoryException 
	 */
	@RequestMapping(value = "/createTable", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map createTable(MultipartHttpServletRequest files, HttpServletRequest request, HttpServletResponse response)
			throws IOException, SQLException, FactoryException {
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		String output_table_name = request.getParameter("output_table_name").toLowerCase();
		String description = request.getParameter("description");
		String data_type = request.getParameter("data_type");
		String encoding_type = request.getParameter("encoding_type");
		String delimiter = request.getParameter("delimiter"); // "|";
		String filename = data_type.equalsIgnoreCase("SHP") ? "multiPartFile" : "oneFile";
		String headerCheck = request.getParameter("headerCheck");
		if(headerCheck == null) {
		    headerCheck = "";
		}
		
		boolean header = headerCheck.equalsIgnoreCase("on") ? true:false;
		List<MultipartFile> list = files.getFiles(filename);

		Map retunMap = new HashMap();
		if(data_type.equals("SHP")) {
		    retunMap = dataCreateService.createShpTable(list, data_type, output_table_name, description, header, delimiter,
				"ANALYSIS", user_id, encoding_type);
		}else {
		    List metaDataList = dataCreateService.getMetaData(list, data_type, delimiter, encoding_type);
		    retunMap =  dataCreateService.createTable(metaDataList, data_type, output_table_name, description, header, delimiter,
				"ANALYSIS", user_id, encoding_type);
		    /*retunMap =  dataCreateService.createTable(list,response, data_type, output_table_name, description, header, delimiter,
				"ANALYSIS", user_id, encoding_type);*/
		    
		}
		
		return retunMap;
	}

	/**
	 * getMyDataInfo 나의 데이터 정보 가져오기
	 * 
	 * @param MultipartHttpServletRequest
	 *            HttpServletRequest
	 * @return map
	 * @throws SQLException
	 */
	@RequestMapping(value = "/getMyDataInfo", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map getMyDataInfo(HttpServletRequest request, HttpServletResponse response,
			@RequestBody Map<String, String> paramsMap) throws SQLException {
		String data_id = paramsMap.get("data_id");
		String relation_id = paramsMap.get("relation_id");
		Map<String, Object> map = dataCreateService.getMyDataInfo(data_id, relation_id);
		return map;

	}

	/**
	 * geoCoding 나의 데이터 정보 가져오기
	 * 
	 * @param MultipartHttpServletRequest
	 *            HttpServletRequest
	 * @return map
	 * @throws SQLException
	 */
	@RequestMapping(value = "/geoCoding", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map geoCoding(HttpServletRequest request, HttpServletResponse response,
			@RequestBody Map<String, Object> paramsMap) throws SQLException {
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		String geoCodingType = paramsMap.get("geoCodingType").toString();
		String selectColumns = paramsMap.get("selectColumns").toString();
		String input_table_name = paramsMap.get("tableName").toString();
		String input_table_id = paramsMap.get("tableId").toString();

		paramsMap.put("user_id", user_id);
		paramsMap.put("api_name", "sop_api");
		paramsMap.put("target", "INNER");

		return dataCreateService.geoCoding(paramsMap);
	}

	/**
	 * checkMappingCoord 나의 데이터 정보 가져오기
	 * 
	 * @param MultipartHttpServletRequest
	 *            HttpServletRequest
	 * @return map
	 * @throws SQLException
	 */
	@RequestMapping(value = "/checkMappingCoord", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map checkMappingCoord(HttpServletRequest request, HttpServletResponse response,
			@RequestBody Map<String, String> paramsMap) throws SQLException {
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		return null;
	}

}
