package kostat.lbdms.ServiceAPI.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisUserService;
import kostat.lbdms.ServiceAPI.controller.service.DataCreateService;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 데이터분석 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱 1.0, 2018/07/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/analysis")
public class AnalysisAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(AnalysisAPI.class);
	
	@Resource(name="analysisService")
	private AnalysisService analysisService;
	
	@Resource(name="analysisUserService")
	private AnalysisUserService analysisUserService;
	
	@Resource(name = "dataCreateService")
	private DataCreateService dataCreateService;

	
	/**
	 * 사용자데이터 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getUserDataList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getUserDataList.do")
	public ModelAndView getUserDataList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "5";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			mapParameter.put("type", type);
			
			List userDataList = (List)analysisService.getUserDataList(mapParameter);
			
			model.put("id", "G2G30001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", userDataList);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30001");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 임의영역 데이터 저장
	 * @param request
	 * @param response
	 * @return /view/analysis/getUserDataList.do
	 */
	@Interceptor("PageCallReg")
	@SuppressWarnings("rawtypes")
	@RequestMapping(value="/setUserPolygonData.do")
	public ModelAndView setUserPolygonData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String dataNm = (String)request.getParameter("data_nm");
			String geom = (String)request.getParameter("geom");
			String description = (String)request.getParameter("description");
			String actionType = (String)request.getParameter("action_type");
			String posColumnDesc = (String)request.getParameter("pos_column_desc");
			String geometryType = (String)request.getParameter("geometry_type");
			String polygonType = (String)request.getParameter("polygon_type");
			
			dataNm = Security.cleanXss(dataNm);
			description = Security.cleanXss(description);
			actionType = Security.cleanXss(actionType);
			geometryType = Security.cleanXss(geometryType);
			polygonType = Security.cleanXss(polygonType);
						
			mapParameter.put("user_id", user_id);
			mapParameter.put("schema", user_id);
			mapParameter.put("data_nm", dataNm);
			mapParameter.put("geom", geom);
			mapParameter.put("description", description);
			mapParameter.put("action_type", actionType);
			mapParameter.put("pos_column_desc", posColumnDesc);
			mapParameter.put("geometry_type", geometryType);
			
			
			Map userPolygonInfo = (Map)analysisService.insertUserPolyonInfo(mapParameter);
			if (userPolygonInfo != null) {
				int resourceId = (int)userPolygonInfo.get("resource_id");
				int cnt = (int)dataCreateService.schemaHsOwn(mapParameter);
				if (cnt == 0) {
					dataCreateService.createSchma(mapParameter);
				}
				//테이블 생성
				analysisUserService.createPolyonTable(mapParameter);
				
				//폴리곤경계 설정
				Map tableSizeInfo = null;
				String[] geomList = geom.split("@");
				for (String polygon : geomList) {
					HashMap tmpParameter = new HashMap();
					tmpParameter.put("user_id", user_id);
					tmpParameter.put("data_nm", dataNm);
					tmpParameter.put("geom", polygon);
					tableSizeInfo = (Map)analysisUserService.insertPolyonData(tmpParameter);
				}
				
				//데이터 사이즈 업데이트
				if (tableSizeInfo != null) {
					Long size = (Long)tableSizeInfo.get("size");
					mapParameter.put("size", size.intValue());
					analysisService.updateUserDataSize(mapParameter);
				}
				
				model.put("id", "G2G30002");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("resource_id", resourceId);

			}else {
				throw new AuthorityException("처리 중 에러가 발생하였습니다.");
			}
	
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30002");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
	/**
	 * 사용자 경계데이터 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getUserPolygonDataList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getUserPolygonDataList.do")
	public ModelAndView getUserPolygonDataList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "5";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			mapParameter.put("type", type);
			
			List userDataList = (List)analysisService.getUserPolygonDataList(mapParameter);
			
			model.put("id", "G2G30003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", userDataList);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30003");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30003");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 분석결과데이터 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getUserPolygonDataList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getAnalysisResultData.do")
	public ModelAndView getAnalysisResultData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String test1 = null;
		String test2 = null;
		
		Map mapParameter = new HashMap();
		try {
			String dataNm = (String)request.getParameter("table_nm");
			String actionType = (String)request.getParameter("action_type");
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String scheme = (String)request.getParameter("scheme");
			String dataInfo = (String)request.getParameter("dataInfo");
			
			dataNm = Security.cleanXss(dataNm);
			actionType = Security.cleanXss(actionType);
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			scheme = Security.cleanXss(scheme);
			
			mapParameter.put("table_nm", dataNm);
			mapParameter.put("action_type", actionType);
			mapParameter.put("dataInfo", dataInfo);
			
			//시작 인덱스
			if (startIdx != null) {
				mapParameter.put("startIdx", Integer.parseInt(startIdx));
			}
			
			//한페이지당 결과 수
			if (resultCnt != null) {
				mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			}
			
			if (scheme == null) {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}else {
				mapParameter.put("scheme", scheme);
			}
			
			List resultData = null;	
			switch (actionType) {
				case "BOUNDARY": //경계분석
					resultData = new ArrayList();
					List resultDataBd = (List)analysisUserService.getBoundaryAnalysisResultData(mapParameter);
					if (resultDataBd != null && !resultDataBd.isEmpty()) {
						for (int ri = 0; ri < resultDataBd.size(); ri ++) {
							HashMap<String, Object> map = (HashMap<String, Object>)resultDataBd.get(ri); 
							double data = 0;
							if (map.containsKey("data") && map.get("data") != null) data = Double.parseDouble(String.valueOf(map.get("data")));
							if ((data < 5) && dataInfo != null &&
								(
										dataInfo.indexOf("인구조건") >= 0 ||
										dataInfo.indexOf("가구조건") >= 0 ||
										dataInfo.indexOf("주택조건") >= 0 ||
										dataInfo.indexOf("농가조건") >= 0 ||
										dataInfo.indexOf("임가조건") >= 0 ||
										dataInfo.indexOf("어가조건") >= 0
								)
							) {
								map.put("data", "N/A");
							}
							if ((data < 5) && dataInfo != null &&
								(
										dataInfo.indexOf("산업조건") >= 0 ||
										dataInfo.indexOf("테마업종조건") >= 0 
								)
							) {
								map.put("data", "N/A");
							}
							resultData.add(map);
						}
					}

					break;
				case "VORONOI": //보로노이다이어그램
					resultData = (List)analysisUserService.getVoronoiAnalysisResultData(mapParameter);
					break;
				case "BUFFER":	//버퍼분석
					resultData = new ArrayList();
					List resultDataBf = (List)analysisUserService.getBufferAnalysisResultData(mapParameter);
					if (resultDataBf != null && !resultDataBf.isEmpty()) {
						for (int ri = 0; ri < resultDataBf.size(); ri ++) {
							HashMap<String, Object> map = (HashMap<String, Object>)resultDataBf.get(ri); 
							double data = 0;
							if (map.containsKey("data") && map.get("data") != null) data = Double.parseDouble(String.valueOf(map.get("data")));
							if ((data < 5) && dataInfo != null &&
									(
										dataInfo.indexOf("인구조건") >= 0 ||
										dataInfo.indexOf("가구조건") >= 0 ||
										dataInfo.indexOf("주택조건") >= 0 ||
										dataInfo.indexOf("농가조건") >= 0 ||
										dataInfo.indexOf("임가조건") >= 0 ||
										dataInfo.indexOf("어가조건") >= 0
								)
							) {
								map.put("data", "N/A");
							}
							if ((data < 5) && dataInfo != null &&
									(
										dataInfo.indexOf("산업조건") >= 0 ||
										dataInfo.indexOf("테마업종조건") >= 0
								)
							) {
								map.put("data", "N/A");
							}
							resultData.add(map);
						}
					}
					break;
				case "LQ":	//입지계수
					resultData = (List)analysisUserService.getLqAnalysisResultData(mapParameter);
					break;
				case "OPERATION":	//데이터간연산분석
					resultData = (List)analysisUserService.getOperationAnalysisResultData(mapParameter);
					break;
				case "SPATIAL":	//공간자기상관분석
					resultData = (List)analysisUserService.getSpatialAnalysisResultData(mapParameter);
					break;
				default:
					break;
			}
			
			model.put("id", "G2G30004");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", resultData);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30004");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.error(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30004");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.error(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 분석결과 파라미터정보 저장
	 * @param request
	 * @param response
	 * @return /view/analysis/insertAnalysisParamInfo.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/insertAnalysisParamInfo.do")
	public ModelAndView insertAnalysisParamInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String executeId = (String)request.getParameter("execute_id");
			String analysisType = (String)request.getParameter("analysis_type");
			String bordType = (String)request.getParameter("bord_type");
			String param = (String)request.getParameter("param");
			
			executeId = Security.cleanXss(executeId);
			analysisType = Security.cleanXss(analysisType);
			bordType = Security.cleanXss(bordType);
			
			mapParameter.put("execute_id", executeId);
			mapParameter.put("analysis_type", analysisType);
			mapParameter.put("bord_type", bordType);
			mapParameter.put("param", param.toString());
			
			Map executeInfo = (Map)analysisService.getAnalysisExecuteInfo(mapParameter);
			String inputResourceId = (String)executeInfo.get("input_resource_id");
			String outputResourceId = (String)executeInfo.get("output_resource_id");
			
			if (inputResourceId != null) {
				mapParameter.put("resource_id", Long.parseLong(inputResourceId));
			}else if (outputResourceId != null) {
				mapParameter.put("resource_id", Long.parseLong(outputResourceId));
			}
			
			int result = (int)analysisService.insertAnalysisParamInfo(mapParameter);
			
			model.put("id", "G2G30005");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", result);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30005");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30005");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 임의영역 POI 데이터 저장
	 * @param request
	 * @param response
	 * @return /view/analysis/getUserDataList.do
	 */
	@SuppressWarnings("rawtypes")
	@Interceptor("PageCallReg")
	@RequestMapping(value="/setUserPoiData.do")
	public ModelAndView setUserPoiData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String dataNm = (String)request.getParameter("data_nm");
			String poi = (String)request.getParameter("poi");
			String description = (String)request.getParameter("description");
			String actionType = (String)request.getParameter("action_type");
			String posColumnDesc = (String)request.getParameter("pos_column_desc");
			String geometryType = (String)request.getParameter("geometry_type");
			
			dataNm = Security.cleanXss(dataNm);
			description = Security.cleanXss(description);
			actionType = Security.cleanXss(actionType);
			geometryType = Security.cleanXss(geometryType);
						
			mapParameter.put("user_id", user_id);
			mapParameter.put("schema", user_id);
			mapParameter.put("data_nm", dataNm);
			mapParameter.put("description", description);
			mapParameter.put("action_type", actionType);
			mapParameter.put("pos_column_desc", posColumnDesc);
			mapParameter.put("geometry_type", geometryType);
			
			Map userPolygonInfo = (Map)analysisService.insertUserPolyonInfo(mapParameter);
			if (userPolygonInfo != null) {
				int resourceId = (int)userPolygonInfo.get("resource_id");
				int cnt = (int)dataCreateService.schemaHsOwn(mapParameter);
				if (cnt == 0) {
					dataCreateService.createSchma(mapParameter);
				}
				//테이블 생성
				analysisUserService.createPoiTable(mapParameter);
				
				//POI경계 설정
				String[] poiList = poi.split("@");
				Map tableSizeInfo = null;
				for (String poiInfo : poiList) {
					JSONObject tmpPoi = new JSONObject(poiInfo);
					HashMap tmpParameter = new HashMap();
					tmpParameter.put("user_id", user_id);
					tmpParameter.put("data_nm", dataNm);
					tmpParameter.put("corp_nm", tmpPoi.get("corp_nm"));
					tmpParameter.put("x", tmpPoi.get("x"));
					tmpParameter.put("y", tmpPoi.get("y"));
					tableSizeInfo = (Map)analysisUserService.insertPoiData(tmpParameter);
				}
				
				//데이터 사이즈 업데이트
				if (tableSizeInfo != null) {
					Long size = (Long)tableSizeInfo.get("size");
					mapParameter.put("size", size.intValue());
					analysisService.updateUserDataSize(mapParameter);
				}
				
				model.put("id", "G2G30006");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("resource_id", resourceId);

			}else {
				throw new AuthorityException("처리 중 에러가 발생하였습니다.");
			}
	
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30006");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30006");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 데이터간 연산분석 경계체크
	 * @param request
	 * @param response
	 * @return /view/analysis/getCheckOperationBoundary.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getCheckOperationBoundary.do")
	public ModelAndView getCheckOperationBoundary(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String jsonStr = (String)request.getParameter("jsonStr");
			JSONObject tmpJson = new JSONObject(jsonStr);
			JSONObject data1Info = (JSONObject)tmpJson.get("data1");
			JSONObject data2Info = (JSONObject)tmpJson.get("data2");
			
			int result = 0;
			
			//스키마 권한체크
			int cnt = (int)dataCreateService.schemaHsOwn(mapParameter);
			if (cnt == 0) {
				dataCreateService.createSchma(mapParameter);
			}
			
			//경계1 존재여부 체크
			Map tmpParam = new HashMap();
			tmpParam.put("scheme", data1Info.get("user_id"));
			tmpParam.put("table_nm", data1Info.get("data_nm"));
			result = (int)analysisUserService.getOperationAnalysisBoundaryCheck(tmpParam);
			if (result <= 0) {
				throw new AuthorityException("해당 데이터는 분석 결과 데이터가 아닙니다.");
			}
			
			tmpParam.put("type", "isNull");
			result = (int)analysisUserService.getOperationAnalysisBoundaryCheck(tmpParam);
			if (result <= 0) {
				throw new AuthorityException("해당 데이터는 분석결과가 0인 데이터라 분석에 사용할 수 없습니다.");
			}
			
			//경계2 존재여부 체크
			Map tmpParam2 = new HashMap();
			tmpParam2.put("scheme", data2Info.get("user_id"));
			tmpParam2.put("table_nm", data2Info.get("data_nm"));
			result = (int)analysisUserService.getOperationAnalysisBoundaryCheck(tmpParam2);
			if (result <= 0) {
				throw new AuthorityException("해당 데이터는 분석 결과 데이터가 아닙니다.");
			}
			
			tmpParam2.put("type", "isNull");
			result = (int)analysisUserService.getOperationAnalysisBoundaryCheck(tmpParam2);
			if (result <= 0) {
				throw new AuthorityException("해당 데이터는 분석결과가 0인 데이터라 분석에 사용할 수 없습니다.");
			}
			
			//두 경계가 같은지 체크
			mapParameter.put("scheme1", data1Info.get("user_id"));
			mapParameter.put("table_nm1", data1Info.get("data_nm"));
			mapParameter.put("scheme2", data2Info.get("user_id"));
			mapParameter.put("table_nm2", data2Info.get("data_nm"));
			result = (int)analysisUserService.getIsBoundarySameCheck(mapParameter);
			if (result <= 0) {
				throw new AuthorityException("두 테이블간 지역이 달라 분석을 할 수 없습니다.");
			}
			
			model.put("id", "G2G30007");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30007");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30007");
			model.put("errCd", "-1");
			model.put("errMsg", "해당 데이터는 분석에 사용할 수 없는 데이터입니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 도로망경계 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getRoadPolygonData.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getRoadPolygonData.do")
	public ModelAndView getRoadPolygonData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String admCd = (String)request.getParameter("adm_cd");
			admCd = Security.cleanXss(admCd);
			
			if (admCd == null || admCd.length() == 0) {
				throw new AuthorityException("필수파라미터 누락입니다.");
			}
			
			int length = admCd.length();
			String sidoCd, sggCd, dongCd = null;
			
			switch(length) {
				case 2:
					sidoCd = admCd.substring(0, 2);
					mapParameter.put("sido_cd", sidoCd);
					mapParameter.put("type", "sido");
					break;
				case 5:
					sidoCd = admCd.substring(0, 2);
					sggCd = admCd.substring(2, 5);
					mapParameter.put("sido_cd", sidoCd);
					mapParameter.put("sgg_cd", sggCd);
					mapParameter.put("type", "sgg");
					break;
				case 7:
					sidoCd = admCd.substring(0, 2);
					sggCd = admCd.substring(2, 5);
					dongCd = admCd.substring(5, 7);
					mapParameter.put("sido_cd", sidoCd);
					mapParameter.put("sgg_cd", sggCd);
					mapParameter.put("dong_cd", dongCd);
					mapParameter.put("type", "dong");
					break;
				default:
					break;
			}
			
			List roadList = (List)analysisUserService.getRoadPolygonData(mapParameter);
			model.put("id", "G2G30008");
			model.put("errCd", "0");
			model.put("errMsg", "success");
			model.put("result", roadList);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30008");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30008");
			model.put("errCd", "-1");
			model.put("errMsg", "도로망 경계를 조회할 수 없습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 분석결과데이터 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getUserPolygonDataList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getBoundaryData.do")
	public ModelAndView getBoundaryData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String dataNm = (String)request.getParameter("table_nm");
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String scheme = (String)request.getParameter("scheme");
			
			dataNm = Security.cleanXss(dataNm);
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			scheme = Security.cleanXss(scheme);
			
			mapParameter.put("table_nm", dataNm);
			
			//시작 인덱스
			if (startIdx != null) {
				mapParameter.put("startIdx", Integer.parseInt(startIdx));
			}else {
				mapParameter.put("startIdx", 0);
			}
			
			//한페이지당 결과 수
			if (resultCnt != null) {
				mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			}else {
				mapParameter.put("resultCnt", 10);
			}
			
			if (scheme == null) {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}else {
				mapParameter.put("scheme", scheme);
			}
			
			List resultData = (List)analysisUserService.getBoundaryData(mapParameter);
			
			model.put("id", "G2G30009");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", resultData);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30009");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30009");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 활용사례 정보 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getAnalysisGuideList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getAnalysisGuideList.do")
	public ModelAndView getAnalysisGuideList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}

			List guideDataList = (List)analysisService.getAnalysisGuideList(mapParameter);
			
			model.put("id", "G2G30010");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", guideDataList);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30010");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30010");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 사업체 POI정보 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getCompanyPoiData.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getCompanyPoiData.do")
	public ModelAndView getCompanyPoiData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String admCd = (String)request.getParameter("adm_cd");
			String themeCd = (String)request.getParameter("theme_cd");
			String classCd = (String)request.getParameter("class_cd");
			String year = (String)request.getParameter("year");
			
			admCd = Security.cleanXss(admCd);
			themeCd = Security.cleanXss(themeCd);
			classCd = Security.cleanXss(classCd);
			year = Security.cleanXss(year);
			
			if (admCd == null || admCd.length() == 0) {
				throw new AuthorityException("필수파라미터 누락입니다.");
			}
			
			if (year == null) {
				throw new AuthorityException("필수파라미터 누락입니다.");
			}
			
			if (themeCd != null) {
				mapParameter.put("theme_cd", themeCd);
			}
			
			if (classCd != null) {
				classCd = classCd.substring(1);
				mapParameter.put("class_cd", classCd);
			}
			
			mapParameter.put("adm_cd", admCd);
			mapParameter.put("year", year);
			List companyPoiList = (List)analysisUserService.getCompanyPoiData(mapParameter);
			
			model.put("id", "G2G30011");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", companyPoiList);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30011");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30011");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 사업체 POI정보 조회
	 * @param request
	 * @param response
	 * @return /view/analysis/getUserPoiData.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getUserPoiData.do")
	public ModelAndView getUserPoiData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String scheme = (String)request.getParameter("scheme");
			String dataNm = (String)request.getParameter("data_name");
			
			scheme = Security.cleanXss(scheme);
			dataNm = Security.cleanXss(dataNm);
			
			if (scheme == null || scheme.length() == 0) {
				throw new AuthorityException("필수파라미터 누락입니다.");
			}
			
			if (dataNm == null || dataNm.length() == 0) {
				throw new AuthorityException("필수파라미터 누락입니다.");
			}
			
			mapParameter.put("scheme", scheme);
			mapParameter.put("table_nm", dataNm);
			List companyPoiList = (List)analysisUserService.getUserPoiData(mapParameter);
			
			model.put("id", "G2G30012");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", companyPoiList);
			
		}
		catch (AuthorityException e) {
			model.put("id", "G2G30012");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G30012");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
}