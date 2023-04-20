package kostat.lbdms.ServiceAPI.api;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.common.util.FileUtils;
import kostat.lbdms.ServiceAPI.common.util.JSONConvertUtil;
import kostat.lbdms.ServiceAPI.common.util.StringUtil;
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.TargetAgent;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.controller.service.AttachFileService;
import kostat.lbdms.ServiceAPI.controller.service.KostatDataService;
import kostat.lbdms.ServiceAPI.controller.service.MemberService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataService;
import kostat.lbdms.ServiceAPI.controller.service.ShareBoardService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONObject;

/**
 * 1. 기능 : Mydata 컨트롤러
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 *  <b>History:</b> 
 *     작성자 : 최재영, 1.0, 2018/07/02  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 최재영
 * @version 1.0
 * @see
 *      <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value = "/api/myData")
public class MyDataAPI {
	private final Log			logger		= LogFactory.getLog(MyDataAPI.class);
	
	@Resource(name = "myDataService")
	private MyDataService		myDataService;
	
	@Resource(name = "memberService")
	private MemberService		memberService;
	
	@Resource(name = "shareBoardService")
	private ShareBoardService	shareBoardService;
	
	@Resource(name = "attachFileService")
	private AttachFileService	attachFileService;
	
	@Resource(name="kostatDataService")
	private KostatDataService kostatDataService;
	
	String						charsets[]	= { "UTF8", "CP949" };
	
	private static final String PROPERTY_PATH = "/globals.properties";
	
	/**
	 * 나의 데이터 업로드 미리 보기
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/previewData
	 * @throws IOException
	 */
	@RequestMapping(value = "/previewData.do")
	@ResponseBody
	public ModelAndView previewData(HttpServletRequest request, ModelMap model) {
		DBConnector pgConn = new OpenPGSql();
		Map<String, Object> map = new HashMap<String, Object>();
		String delimiter = request.getParameter("delimiter");
		//String charsetsType = request.getParameter("charsets");
		String header = request.getParameter("header");
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		String table_name = request.getParameter("table_name");
		String save_table_name = "";
		
		if (!table_name.startsWith("saupche")) {
			save_table_name = user_id + "." + table_name;
		} else {
			save_table_name = "saupche." + table_name;
		}
		
		boolean headerB = false;
		
		if (header!=null && header.equalsIgnoreCase("")) {
			headerB = true;
		}
		
		
		try {
			MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) request;
			MultipartFile multiFile = multiReq.getFile("oneFile");

			if(multiFile != null) {
				String originName = multiFile.getOriginalFilename();
				
				//시큐어코딩 삭제
				String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
				String fileName = originName.substring(0, originName.lastIndexOf("."));
				
				
				String filePath = "/home/lbdms/upload";
				
				// time + random number
				String fileId = FileUtils.getDateNum() + FileUtils.randomNum();
				
				//파일 업로드
				if(FileUtils.writeFile(multiFile, filePath, fileId, fileExtension)) {
					String fullPath = filePath + "/" + fileId + "." + fileExtension;
					//pgConn.openConn();
					
					String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
					String pass = ConfigUtil.getString("jdbc.userdb.password");
					String dbname = ConfigUtil.getString("jdbc.userdb.username");
				
					try {
					    pgConn.openConn(database, dbname, pass);
					    
					    if (!save_table_name.startsWith("saupche")) {
					    	pgConn.execQueryNoResult("DROP TABLE IF EXISTS " + save_table_name + ";create table " + save_table_name + "(like saupche." + table_name + ")");
					    } else {
						    pgConn.execQueryNoResult("truncate table " + save_table_name);					    	
					    }
					    
					    CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());

						String copySql = "COPY " + save_table_name + " FROM STDIN with delimiter '" + delimiter
								+ "' NULL AS ''";
						if (headerB) {
							copySql += " CSV HEADER;";
						} else {
							copySql += " CSV;";

						}
						//FileInputStream input=new FileInputStream(fullPath);
				        //InputStreamReader reader=new InputStreamReader(input,"UTF-8");
				        
				        InputStream inputStream = new FileInputStream(fullPath);
				          
			            String steamToString = IOUtils.toString(inputStream, "UTF-8");
			            
			            steamToString = steamToString.replaceAll("\\\\", "");
			            
			            InputStream reader = new ByteArrayInputStream(steamToString.getBytes(StandardCharsets.UTF_8));
			            
							
						System.out.println(copySql);
						copyManager.copyIn(copySql, reader);
						reader.close();
						
						Map mapParameter = new HashMap();
						String qry_txt = "select * from " +  save_table_name + " limit 10";
						mapParameter.put("exe_query", qry_txt.replaceAll(";", ""));
						mapParameter.put("USER_ID", user_id);
						
						org.json.JSONObject jsonObj = (org.json.JSONObject)kostatDataService.execPgQryResult(mapParameter);
						
						map.put("headerList", StringUtil.toList(jsonObj.getJSONArray("COLUMN")));
						map.put("metaDataList", StringUtil.toList(jsonObj.getJSONArray("VALUE")));	
					} catch(Exception e) {
						throw new AuthFailedException("파일 업로드에 실패 하였습니다.");
					}
				} else {
					throw new AuthFailedException("파일 업로드에 실패 하였습니다.");
				}
			}
			
			model.put("id", "G2G00002");
			model.put("errCd", "0");
			model.put("errMsg", "");
		} catch (Exception e) {
			// TODO: handle exception
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "IOException");
		}
		
		model.put("result", map);
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 나의 데이터 생성(추적)
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/createTable
	 * @throws IOException
	 */
	@RequestMapping(value = "/createTable.do")
	@ResponseBody
	public ModelAndView createTable(HttpServletRequest request, HttpServletResponse response, MultipartHttpServletRequest fileRequest, ModelMap model) {
		JSONObject res = new JSONObject();
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		String output_table_name = request.getParameter("output_table_name");
		String description = request.getParameter("description");
		String data_type = request.getParameter("data_type");
		String filename = data_type.equalsIgnoreCase("SHP") ? "multiFile" : "oneFile";
		String encoding_type = request.getParameter("charsets");
		String shp_enc_type = request.getParameter("shp_enc_type");
		String shp_coord_by_geom = request.getParameter("shp_coord_by_geom");
		org.json.JSONArray columnGridData = null;
		
		List<MultipartFile> list = fileRequest.getFiles(filename);
		
		if (!"SHP".equalsIgnoreCase(data_type)) {
			try {
				columnGridData = new org.json.JSONArray(request.getParameter("columnGridData"));
			} catch (org.json.JSONException e) {
				logger.error(e);
			}
		}
		
		try {
			if (list.size() == 0)
				throw new IOException("파일을 찾을수 없습니다.");
			
			if (data_type.equalsIgnoreCase("SHP")) {
				InputStream[] is = new InputStream[list.size()];
				
				int index = 0;
				
				for (MultipartFile file : list) {
					is[index] = file.getInputStream();
					index++;
				}
				
				
				myDataService.createTableByAgent(response, is, data_type, output_table_name, description, user_id, shp_enc_type, shp_coord_by_geom);
				
				// user_id
				// output_table_name
				// input_coord_by_geom
				// geom_column
				//
				// 좌표계 변환 필요
				
				
			} else if (data_type.equalsIgnoreCase("TEXT") || data_type.equalsIgnoreCase("EXCEL")) {
				String delimiter = request.getParameter("delimiter");
				String headerCheck = request.getParameter("headerCheck");
				String header = null;
				if(data_type.equalsIgnoreCase("EXCEL")) {
					delimiter = "|";
				}
				if (headerCheck == null) {
					header = "false";
				} else {
					header = "true";
				}
				
				if (!header.equalsIgnoreCase("true")) {
					// 컬럼 데이터가 없을때
					myDataService.createTable(response, list.get(0).getInputStream(), data_type, output_table_name, description, header, delimiter, TargetAgent.ANALYSIS, user_id, encoding_type);
				} else {
					// 컬럼 데이터가 있을때
					myDataService.createTableWithColumns(response, list.get(0).getInputStream(), data_type, output_table_name, description, header, delimiter, TargetAgent.ANALYSIS, user_id,
							encoding_type, columnGridData);
				}
				// kor_desc 생성
			}
			
			model.addAttribute("success", true);
			res.put("schema", user_id);
			res.put("table_name", output_table_name.toLowerCase());
			HashMap map = new HashMap();
			map.put("data_nm", output_table_name.toLowerCase());
			map.put("user_id", user_id);
			res.put("resource_id", myDataService.selectResourceId2(map));
			res.put("user_id", user_id);
			
			// 새로 추가된 한글 명 변경
			Map paramMap = new HashMap();
			paramMap.put("resource_id", Integer.parseInt(res.get("resource_id").toString()));
			paramMap.put("data_nm", output_table_name.toLowerCase());
			
			paramMap.put("description", description);
			
			if (!data_type.equalsIgnoreCase("SHP")) {
				myDataService.updateKorColumnGridData(columnGridData, Integer.parseInt(res.get("resource_id").toString()));
			}
			
			myDataService.updateKorSubject(paramMap);
			
			// resource에 대한 한글 컬럼명 필요
			// 한글 제목 명 역시 필요
			
			model.put("id", "G2G00002");
			model.put("errCd", "0");
			model.put("errMsg", "");
			model.put("result", res);
			model.put("data_type", data_type);
		} catch (SystemFailException e) {
			logger.error(e);
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "SystemFailException");
			model.put("data_type", data_type);
		} catch (IOException e) {
			logger.error(e);
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "IOException");
			model.put("data_type", data_type);
		} catch (Exception e) {
			logger.error(e);
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "Exception");
			model.put("data_type", data_type);
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 테이블 내용 조회
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/preViewTable
	 * @throws IOException
	 */
	@RequestMapping(value = "/preViewTable.do", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public ModelAndView getTablePreview(HttpServletRequest request, HttpServletResponse response, @RequestParam("schema") String schema, @RequestParam("table_name") String table_name,
			@RequestParam("resource_id") String resource_id, @RequestParam("view_cnt") int view_cnt, ModelMap model) {
		
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		JSONObject res = null;
		try {
			res = myDataService.previewTable(user_id, schema, table_name, view_cnt, 0, null, null, resource_id, "");
			model.put("result", res);
			model.put("id", "G2G00002");
			model.put("errCd", "0");
			model.put("errMsg", "");
		} catch (SQLException e) {
			logger.error(e);
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "SQLException");
		} catch (org.json.JSONException e) {
			logger.error(e);
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "JSONException");
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 나의데이터 조회
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/getMyDataList.do
	 */
	@RequestMapping(value = "/getMyDataList.do")
	public ModelAndView getMyDataList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		try {
			String userId = (String) session.getAttribute("user_id");
			
			if (userId == null) {
				throw new AuthorityException("나의데이터 조회 중 오류가 발생하였습니다.");
			}
			
			String startIdx = (String) request.getParameter("startIdx");
			String resultCnt = (String) request.getParameter("resultCnt");
			String sort = (String) request.getParameter("sort");
			String order = (String) request.getParameter("order");
			String standard = request.getParameter("standard");
			String searchWord = request.getParameter("searchWord");
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			
			// 시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			// 한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "5";
			}
			
			// 정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			} /*
				 * else { mapParameter.put("sort", "resource_id"); }
				 */
			
			// 정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			} /*
				 * else { mapParameter.put("order", "desc"); }
				 */
			
			if (standard != null && standard.length() > 0) {
				mapParameter.put("standard", standard);
			}
			
			if (searchWord != null && searchWord.length() > 0) {
				mapParameter.put("searchWord", searchWord);
			}
			
			mapParameter.put("user_id", userId);
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt) - Integer.parseInt(startIdx));
			
			List myDataList = (List) myDataService.getMyDataList(mapParameter);
			
			model.put("id", "G2G12001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", myDataList);
			
		} catch (AuthorityException e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-100");
			model.put("errMsg", e.getErrMessage());
			logger.info(e);
		} catch (Exception e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	@RequestMapping(value = "/deleteMyDataList.do", method = { RequestMethod.POST, RequestMethod.GET }, produces = "application/json")
	public ModelAndView deleteMyDataList(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "datas[]", required = false, defaultValue = "") String[] datas,
			ModelMap model) {
		
		HttpSession session = request.getSession();
		String schema = (String) session.getAttribute("user_id");
		
		try {
			Map<String, Object> map = myDataService.deleteMyDataList(datas, schema);
			
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", map);
			
		} catch (SQLException e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	@RequestMapping(value = "/deleteErrorMyData.do", method = { RequestMethod.POST, RequestMethod.GET }, produces = "application/json")
	public ModelAndView deleteMyData(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "data_nm", required = false, defaultValue = "") String data_nm, ModelMap model) {
		HttpSession session = request.getSession();
		String schema = (String) session.getAttribute("user_id");
		model.put("schema", schema);
		
		try {
			if (!data_nm.equalsIgnoreCase("")) {
				model.put("data_nm", data_nm);
				Map<String, Object> paramMap = new HashMap<String, Object>();
				paramMap.put("schema", schema);
				paramMap.put("data_nm", data_nm);
				myDataService.dropTable(paramMap);
				
			}
			
		} catch (SQLException e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 지오코딩
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/geoCoding
	 */
	@RequestMapping(value = "/geoCoding.do", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public ModelAndView geoCoding(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String geoCodingType = request.getParameter("geoCodingType");
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		
		JSONObject jObj = null;
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("user_id", user_id);
		
		paramMap.put("cm", "/data" + request.getParameter("cm"));
		
		try {
			if (geoCodingType.equalsIgnoreCase("addr")) {
				// mapping
				paramMap.put("output_table_name", request.getParameter("output_table_name"));
				paramMap.put("addr_column", request.getParameter("addr_column"));
				paramMap.put("mappingMethod", request.getParameter("mappingMethod"));// api_name ,sop_api
				paramMap.put("target_agent", "INNER");// target_agent
				paramMap.put("base_boolean", request.getParameter("base_boolean"));
				paramMap.put("tot_boolean", request.getParameter("tot_boolean"));
				
				if (!request.getParameter("cm").equalsIgnoreCase("")) {
					paramMap.put("rid", request.getParameter("rids"));
				}
				jObj = myDataService.mapping(paramMap);
			} else if (geoCodingType.equalsIgnoreCase("xy")) {
				// coordinateChange coordinateChangeAuto 참고
				paramMap.put("output_table_name", request.getParameter("output_table_name"));
				paramMap.put("x_column", request.getParameter("x_column"));
				paramMap.put("y_column", request.getParameter("y_column"));
				paramMap.put("input_coord", request.getParameter("input_coord"));
				paramMap.put("out_put_coord", request.getParameter("output_coord"));
				paramMap.put("target_agent", "INNER");
				paramMap.put("base_boolean", request.getParameter("base_boolean"));
				paramMap.put("tot_boolean", request.getParameter("tot_boolean"));
				if (!request.getParameter("cm").equalsIgnoreCase("")) {
					paramMap.put("rid", request.getParameter("rids[]"));
				}
				jObj = myDataService.coordinateChange(paramMap);
			} else if (geoCodingType.equalsIgnoreCase("geom")) {
				// coordinateChangeByGeom
				paramMap.put("output_table_name", request.getParameter("output_table_name"));
				paramMap.put("geom_column", request.getParameter("geom_column"));
				paramMap.put("input_coord_by_geom", request.getParameter("input_coord_by_geom"));
				if (!request.getParameter("cm").equalsIgnoreCase("")) {
					paramMap.put("rid", request.getParameter("rids[]"));
				}
				jObj = myDataService.coordinateChangeByGeom(paramMap);
			} else if (geoCodingType.equalsIgnoreCase("admCd")) {
				// bndChange
				paramMap.put("output_table_name", request.getParameter("output_table_name"));
				paramMap.put("bnd_cd_column", request.getParameter("bnd_cd_column"));
				paramMap.put("description", request.getParameter("description"));
				paramMap.put("base_boolean", request.getParameter("base_boolean"));
				paramMap.put("tot_boolean", request.getParameter("tot_boolean"));
				paramMap.put("bnd_cd_level", request.getParameter("bnd_cd_level"));
				if (!request.getParameter("cm").equalsIgnoreCase("")) {
					paramMap.put("rid", request.getParameter("rids[]"));
				}
				jObj = myDataService.bndChange(paramMap);
			}
			model.put("result", jObj);
			model.put("id", "G2G12001");
			model.put("errCd", "0");
			model.put("errMsg", "");
		} catch (SystemFailException sfe) {
			logger.error(sfe.getReason());
			model.put("id", "G2G12001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			
		}
		
		// return jObj;
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 지오코딩 CHECK
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/checkMapping
	 */
	@RequestMapping(value = "/checkMapping.do", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map checkMapping(HttpServletRequest request, HttpServletResponse respones, @RequestParam("execute_id") String execute_id) {
		JSONObject result = null;
		Map returnMap = new HashMap();
		try {
			result = myDataService.findByExecuteProcess(execute_id);
			returnMap.put("result", result.get("MESSAGE"));
			
		} catch (SystemFailException e) {
			e.printStackTrace();
			
		}
		return returnMap;
	}
	
	
	/**
	 * 지오코딩 CHECK
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/checkMapping
	 */
	@RequestMapping(value = "/getColumn.do", method = { RequestMethod.GET,
		    RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map getColumns(HttpServletRequest request, HttpServletResponse respones, 
			@RequestParam("data_nm") String table_name) {
		//JSONObject result = null;
		Map<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object> returnMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultMap = null;
		
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		if (user_id == null) {
			throw new AuthorityException("세션이 만료되었습니다.");
		}
		
		try {
			paramMap.put("schema", user_id);
			paramMap.put("table_name", table_name);
			resultMap = myDataService.getColumns(paramMap);
			returnMap.put("errCd", 0);
			returnMap.put("result", resultMap);
		} catch (SQLException e) {
			returnMap.put("errCd", 500);
			returnMap.put("errMsg", e.getMessage());
		}
		
		return returnMap;
	}
	
	/**
	 * 리소스 테이블과 생성 스키마 검색
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/selectResourceInfo
	 */
	@RequestMapping(value = "/selectResourceInfo.do", 
			method = { RequestMethod.GET, RequestMethod.POST }, 
			produces = "application/json")
	@ResponseBody
	public Map selectResourceInfo(HttpServletRequest request, @RequestParam(value = "schema", required = false, defaultValue = "") String schema,
			@RequestParam(value = "data_nm", required = false, defaultValue = "") String data_nm, @RequestParam(value = "resultCnt", required = false, defaultValue = "") String resultCnt,
			@RequestParam(value = "startIdx", required = false, defaultValue = "0") String startIdx, @RequestParam(value = "resource_id", required = false, defaultValue = "") String resource_id,
			@RequestParam(value = "status", required = false) String status, @RequestParam(value = "sort_column", required = false, defaultValue = "rid") String sortColumn,
			@RequestParam(value = "sort_type", required = false, defaultValue = "asc") String sortType) {
		
		if (schema.equals("") || schema == null) {
			HttpSession session = request.getSession();
			schema = (String) session.getAttribute("user_id");
		}
		
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object> returnMap = new HashMap<String, Object>();
		paramMap.put("data_nm", data_nm);
		paramMap.put("user_id", schema);
		
		try {
			if (resource_id.equals("") || resource_id == null) {
				paramMap.put("resource_id", myDataService.selectResourceId2(paramMap));
			} else {
				paramMap.put("resource_id", resource_id);
			}
			
			// 시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
				paramMap.put(RequestKey.OFFSET, 0);
			} else {
				paramMap.put(RequestKey.OFFSET, Integer.parseInt(startIdx));
				// RequestKey.OFFSET
			}
			
			// 한페이지당 결과 수
			if (resultCnt.equals("") || resultCnt == null) {
				paramMap.put(RequestKey.LIMIT, 10);
			} else {
				paramMap.put(RequestKey.LIMIT, Integer.parseInt(resultCnt) - Integer.parseInt(startIdx));
			}
			if (status != null) {
				paramMap.put("status", Boolean.parseBoolean(status));
			}
			
			paramMap.put(RequestKey.SORT_COLUMN, sortColumn);
			paramMap.put(RequestKey.SORT_TYPE, sortType);
			
			returnMap.put("data", myDataService.selectResourceInfo(paramMap));
			returnMap.put("successResult", myDataService.getModifyResultByPg(resource_id));
			// returnMap.put("successResult", paramMap.get("resource_id").toString());
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			logger.error(e);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return returnMap;
	}
	
	@RequestMapping(value = "/conditionList.do", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public Map conditionList(@RequestParam(value = "page", required = false, defaultValue = "1") int page, HttpServletRequest request) throws JSONException {
		String json_str = request.getParameter("json_str");
		JSONArray array = JSONConvertUtil.strToJSONArray(json_str);
		String schema = request.getParameter("schema");
		String data_nm = request.getParameter("data_nm");
		return myDataService.conditionList(schema, data_nm, array);
	}
	
	/**
	 * 데이터 수정 및 지오코딩 재 가공
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/fixGeoCoding
	 * @throws SQLException
	 */
	@RequestMapping(value = "/updateRecordColumnData.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map<String, Object> updateRecordColumnData(HttpServletRequest request, @RequestParam(value = "schema", required = false, defaultValue = "") String schema,
			@RequestParam(value = "data_nm", required = false, defaultValue = "") String data_nm, @RequestParam(value = "rid", required = false, defaultValue = "") String rid,
			@RequestParam(value = "resource_id", required = false, defaultValue = "") String resource_id, @RequestParam(value = "fix_value", required = false, defaultValue = "") String fix_value,
			@RequestParam(value = "geoCodingType", required = false, defaultValue = "") String geoCodingType, @RequestParam(value = "x_column", required = false, defaultValue = "") String x_column,
			@RequestParam(value = "y_column", required = false, defaultValue = "") String y_column, @RequestParam(value = "x_value", required = false, defaultValue = "") String x_value,
			@RequestParam(value = "y_value", required = false, defaultValue = "") String y_value, @RequestParam(value = "input_coord", required = false, defaultValue = "") String input_coord)
			throws SQLException {
		
		// 먼저 값을 수정한 이후
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		if (geoCodingType.equals("xy")) {
			paramMap.put(x_column, x_value);
			paramMap.put(y_column, y_value);
			
			myDataService.updateRecordColumnData(paramMap, schema, data_nm, rid);
		} else {
			// key
			paramMap.put(input_coord, fix_value);
			myDataService.updateRecordColumnData(paramMap, schema, data_nm, rid);
		}
		return paramMap;
	}
	
	/**
	 * 테이블 변경
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/modify
	 * @throws SQLException
	 * @throws JSONException
	 */
	@RequestMapping(value = "/modify.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map modifyTable(HttpServletRequest request, HttpServletResponse response) throws SQLException, JSONException {
		Map map = myDataService.modifyTable(request);
		
		return map;
	}
	
	/**
	 * 제목 및 설명 변경
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/saveData.do
	 * @throws SQLException
	 * @throws JSONException
	 */
	@RequestMapping(value = "/saveData.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map saveData(HttpServletRequest request, HttpServletResponse response) {
		String resource_id = request.getParameter("resource_id");
		String desc = request.getParameter("desc");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resource_id", resource_id);
		map.put("description", desc);
		try {
			myDataService.saveData(map);
			map.put("errCd", 0);
		} catch (SQLException e) {
			logger.error(e);
			map.put("errCd", 500);
			map.put("errMessage", e);
		}
		return map;
	}
	
	/**
	 * 데이터 이름 중복 검사
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/dataNameExists
	 * @throws SQLException
	 * @throws JSONException
	 */
	@RequestMapping(value = "/dataNameExists.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map dataNameExists(HttpServletRequest request, HttpServletResponse response) throws SQLException {
		
		HttpSession session = request.getSession();
		String schema = (String) session.getAttribute("user_id");
		String copy_nm = request.getParameter("copy_nm");
		Map<String, Object> map = new HashMap();
		int count = 0;
		try {
			count = myDataService.dataNameExists(schema, copy_nm);
			map.put("errCd", 0);
			map.put("count", count);
			map.put("schema", schema);
			map.put("data_nm", copy_nm);
		} catch (SQLException e) {
			logger.error(e);
			map.put("errCd", 500);
			map.put("errMessage", e);
		}
		
		return map;
	}
	
	/**
	 * 데이터 카피
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/copyData
	 * @throws SQLException
	 * @throws JSONException
	 */
	@RequestMapping(value = "/copyData.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map copyData(HttpServletRequest request, HttpServletResponse response) throws SQLException {
		HttpSession session = request.getSession();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", (String) session.getAttribute("user_id"));// 현재 유저
		map.put("resource_id", Integer.parseInt((String)request.getParameter("resource_id")));// 리소스 아이디
		map.put("schema", request.getParameter("schema"));// 원본 스키마명
		map.put("oriName", request.getParameter("oriName"));// 원본 테이블명
		map.put("description", request.getParameter("description"));//설명
		map.put("execute_id", request.getParameter("execute_id"));//execute_id
		return myDataService.copyData(map);
	}
	
	/**
	 * 다운로드 파일 생성
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/downLoad
	 * @throws SQLException
	 * @throws JSONException
	 */
	@RequestMapping(value = "/downLoad.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map downLoad(HttpServletRequest request, HttpServletResponse response) {
		// 파일 업로드 경로 수정 해야한다.
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			String schema = request.getParameter("schema");
			String listStr = request.getParameter("list");
			JSONArray jArray = JSONConvertUtil.strToJSONArray(listStr);
			String fileName = myDataService.downLoadFileInfo(schema, jArray);
			map.put("errCd", 0);
		} catch (JSONException e) {
			map.put("errCd", 500);
			map.put("errMsg", "jsonParse error");
			logger.error(e);
		} catch (SQLException e) {
			map.put("errCd", 500);
			map.put("errMsg", "SQL Exception");
			logger.error(e);
		}
		return map;
	}
	
	/**
	 * 파일 반환
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/downLoad
	 */
	@RequestMapping(value = "/getFile.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public void getFile(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		if (user_id == null) {
			throw new AuthorityException("세션이 만료되었습니다.");
		}
		
		String dnPath = "/home/sop/tomcat/apache-tomcat-7.0.55/webapps/attach/download/"+user_id+"/"+user_id+".zip"; 
		
		FileInputStream fis = null;
		OutputStream out = null;
		
		File file = new File(dnPath);
		byte[] arBytes = new byte[(int) file.length()];
		
		try {
			fis = new FileInputStream(dnPath);
			fis.read(arBytes);
			response.setContentType("application/zip; charset=utf-8");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + user_id + ".zip" + "\";");
			response.setHeader("Content-Transfer-Encoding", "binary");
			out = response.getOutputStream();
			out.write(arBytes);
			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		}
	}
	
	/**
	 * 파일 반환
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/downLoad
	 */
	@RequestMapping(value = "/dnFile.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public void dnFile(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		if (user_id == null) {
			throw new AuthorityException("세션이 만료되었습니다.");
		}
		
		String fn = request.getParameter("fn");
		
		String dnPath = "/data2/bigfile/data/"+fn; 
		
		FileInputStream fis = null;
		OutputStream out = null;
		
		File file = new File(dnPath);
		byte[] arBytes = new byte[(int) file.length()];
		
		try {
			fis = new FileInputStream(dnPath);
			fis.read(arBytes);
			response.setContentType("application/zip; charset=utf-8");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + fn + "\";");
			response.setHeader("Content-Transfer-Encoding", "binary");
			out = response.getOutputStream();
			out.write(arBytes);
			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		}
	}
	
	/**
	 * 즐겨 찾기
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/favorite
	 */
	@RequestMapping(value = "/favorite.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map<String, Object> favorite(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		String yn = request.getParameter("yn");
		String resource_id = request.getParameter("resource_id");
		try {
			myDataService.favorite(yn, resource_id);
			map.put("errCd", "0");
		} catch (SQLException e) {
			logger.info(e);
			map.put("errCd", "-1");
			map.put("error", e);
		} finally {
			map.put("yn", yn);
			map.put("resource_id", resource_id);
		}
		return map;
	}
	
	/**
	 * 공유
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/share
	 */
	@RequestMapping(value = "/share.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public Map<String, Object> share(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			
			HttpSession session = request.getSession();
			String user_id = (String) session.getAttribute("user_id");
			if (user_id == null) {
				throw new AuthorityException("세션이 만료되었습니다.");
			} else {
				map.put("user_id", user_id);
			}
			
			Map<String, Object> memberInfo = memberService.getMemberInfo(map);
			String inst_seq = memberInfo.get("inst_seq").toString();
			String yn = request.getParameter("yn");
			String resource_id = request.getParameter("resource_id");
			String content = request.getParameter("content");
			String attach = request.getParameter("attach");
			
			if (resource_id == null) {
				throw new AuthorityException("필수 파라미터가 누락되었습니다.");
			}
			
			if (content == null) {
				content = "";
			}
			
			content = Security.cleanXss(content);
			yn = Security.cleanXss(yn);
			resource_id = Security.cleanXss(resource_id);
			
			// 리소스 공유칼럼 변경
			myDataService.share(yn, resource_id, inst_seq);
			
			// 공유게시판저장
			Map<String, Object> mapParameter = new HashMap<String, Object>();
			mapParameter.put("resource_id", Long.parseLong(resource_id));
			mapParameter.put("user_id", user_id);
			mapParameter.put("inst_seq", Long.parseLong(inst_seq));
			mapParameter.put("content", content);
			
			// 캡쳐이미지 정보
			if (attach != null) {
				JSONObject tmpAttach = JSONObject.fromObject(attach);
				String attachNm = (String) tmpAttach.get("attach");
				String extention = (String) tmpAttach.get("extention");
				String fileNm = (String) tmpAttach.get("file_nm");
				int fileSize = (int) tmpAttach.get("file_size");
				String path = (String) tmpAttach.get("path");
				
				mapParameter.put("attach", attachNm);
				mapParameter.put("ext", extention);
				mapParameter.put("file_nm", fileNm);
				mapParameter.put("file_size", fileSize);
				mapParameter.put("download_cnt", 0);
				mapParameter.put("path", path);
			}
			
			if (yn.equalsIgnoreCase("Y")) {
				// 공유게시판 저장
				Map shareBoardInfo = (Map) shareBoardService.insertShareDataInfo(mapParameter);
				if (shareBoardInfo != null) {
					
					// 첨부파일정보 저장
					if (attach != null) {
						Long shareBoardNo = (Long) shareBoardInfo.get("share_board_no");
						mapParameter.put("post_no", shareBoardNo);
						attachFileService.insertAttachFile(mapParameter);
					}
				}
			} else {
				shareBoardService.deleteShareDataInfo(mapParameter);
			}
			
			map.put("errCd", "0");
			map.put("yn", yn);
			map.put("resource_id", resource_id);
			
		} catch (AuthorityException e) {
			map.put("errCd", "-100");
			map.put("errMsg", e.getMessage());
			logger.info(e);
		} catch (SQLException e) {
			logger.info(e);
			map.put("errCd", "-1");
			map.put("error", e);
		} finally {
			// map.put("yn", yn);
			// map.put("resource_id", resource_id);
		}
		return map;
	}
	
	/**
	 * 물리컬럼 정보
	 * 
	 * @param request
	 * @param response
	 * @return /api/myData/columnInfo
	 */
	@RequestMapping(value = "/columnInfo.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json")
	@ResponseBody
	public ModelAndView columnInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String data_name = request.getParameter("data_nm");
		String user_id = request.getParameter("schema");
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("data_nm", data_name);
		param.put("user_id", user_id);
		List<Map<String, Object>> list = null;
		try {
			list = myDataService.selectColumnsDataType(param);
			model.put("errCd", 0);
		} catch (SQLException e) {
			model.put("errCd", -100);
		}
		model.put("result", list);
		return new ModelAndView("jsonV", model);
	}
	
}
