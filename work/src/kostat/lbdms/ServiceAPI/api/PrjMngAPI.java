package kostat.lbdms.ServiceAPI.api;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.common.web.util.FileUtil;
import kostat.lbdms.ServiceAPI.controller.service.PrjMngService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;
import net.sf.json.JSONArray;

/**
 * @Class Name : PrjMngMapper.java
 * @Description : PrjMngMapper Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.7.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2019.7.17
 * @version 1.0
 * @see
 *
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/prjmng/")
public class PrjMngAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(PrjMngAPI.class);
	
	@Resource(name="prjMngService")
	private PrjMngService prjMngService;
	
	/**
	 * 단위업무 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getWorkSetList.do")
	public ModelAndView getWorkSetList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("selectViewCount");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			String searchText = (String)request.getParameter("searchText");
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			searchText = Security.cleanXss(searchText);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "10";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			//검색어
			mapParameter.put("searchText", searchText);
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			
			List WorkSet = (List)prjMngService.getWorkSetList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", WorkSet);
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
	 * 단위업무 상세정보 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/workSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/workSetDetail.do")
	public ModelAndView workSetDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String job_setup_seq = (String)request.getParameter("job_setup_seq");
			job_setup_seq = Security.cleanXss(job_setup_seq);
			
			if (job_setup_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("job_setup_seq", Long.parseLong(job_setup_seq));
			
			
			//상세정보 조회
			Map dataMap = (Map)prjMngService.workSetDetail(mapParameter);

			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", dataMap);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	/**
	 * 프로젝트실행 단위업무 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/workSet.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjUnitModify.do")
	public ModelAndView prjUnitModify(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String prj_master_hst_seq = Security.cleanXss((String)request.getParameter("prj_master_hst_seq"));
			String job_order = Security.cleanXss((String)request.getParameter("job_order"));
			if (prj_master_hst_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("prj_master_hst_seq", Long.parseLong(prj_master_hst_seq));
			mapParameter.put("job_order", Long.parseLong(job_order));
			
			//상세정보 조회
			Map dataMap = (Map)prjMngService.prjUnitModify(mapParameter);

			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", dataMap);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 단위업무 등록
	 * @param request
	 * @param response
	 * @return workSetNew.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/workSetNew.do")
	public ModelAndView workSetNew(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    prjMngService.workSetNew(mapParameter);
			
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 단위업무 삭제
	 * @param request
	 * @param response
	 * @return deleteWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/deleteWorkSet.do")
	public ModelAndView deleteWorkSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    JSONArray array = JSONArray.fromObject(jsonStr);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("jsonArr", array);

		    	
		    prjMngService.deleteWorkSet(mapParameter);
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}

	/**
	 * 단위업무 수정
	 * @param request
	 * @param response
	 * @return updateWorkSet
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/updatePrjExec.do")
	public ModelAndView updatePrjExec(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    prjMngService.updatePrjExec(mapParameter);
			
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 단위업무 수정
	 * @param request
	 * @param response
	 * @return updateWorkSet
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/updateWorkSet.do")
	public ModelAndView updateWorkSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    prjMngService.updateWorkSet(mapParameter);
			
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 단위업무 수정
	 * @param request
	 * @param response
	 * @return updateWorkSet
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/updatePrjUnitSet.do")
	public ModelAndView updatePrjUnitSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    prjMngService.updateWorkSet(mapParameter);
		    prjMngService.updatePrjUnitSet(mapParameter);
		    
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 프로젝트 설정목록 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getPrjSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getPrjSetList.do")
	public ModelAndView getPrjSetList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			String searchText = (String)request.getParameter("searchText");
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			searchText = Security.cleanXss(searchText);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "10";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			//검색어
			mapParameter.put("searchText", searchText);
			
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			
			List PrjSet = (List)prjMngService.getPrjSetList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", PrjSet);
			
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
	 * 단위업무 상세정보 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/prjSet.do
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjSetDetail.do")
	public ModelAndView prjSetDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String project_id = (String)request.getParameter("project_id");
			project_id = Security.cleanXss(project_id);
			
			if (project_id == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			mapParameter.put("project_id", Long.parseLong(project_id));
			
			//상세정보 조회
			Map prjSetDetailInfo = (Map)prjMngService.prjSetDetail(mapParameter);
			List prjSetUnitList = (List)prjMngService.prjUnitSet(mapParameter);
			prjSetDetailInfo.put("unitList", prjSetUnitList);
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", prjSetDetailInfo);
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 단위업무 등록
	 * @param request
	 * @param response
	 * @return prjSetNew.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjSetNew.do")
	public ModelAndView prjSetNew(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
			Map<String, Object> mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    String project_id = prjMngService.prjGetId();
		    mapParameter.put("project_id", project_id);
		    List jobSet = (List)mapParameter.get("job_set");
		    
		    prjMngService.prjSetNew(mapParameter);
		    for (int i=0;i<jobSet.size();i++) {
		    	Map<String, Object> pMap = (Map<String, Object>)jobSet.get(i);
		    	//System.out.println(pMap.toString());
		    	int ord = i + 1;
		    	pMap.put("project_id", project_id);
		    	pMap.put("job_order", ord);
		    	prjMngService.prjSetUnitNew(pMap);
		    }
		    
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 프로젝트 단위업무 삭제
	 * @param request
	 * @param response
	 * @return deleteUnitPrjSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/deleteUnitPrjSet.do")
	public ModelAndView deleteUnitPrjSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);

		    prjMngService.deleteUnitPrjSet(mapParameter);
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 단위업무 삭제
	 * @param request
	 * @param response
	 * @return deletePrjSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/deletePrjSet.do")
	public ModelAndView deletePrjSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    JSONArray array = JSONArray.fromObject(jsonStr);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("jsonArr", array);

		    prjMngService.deleteUnitPrjSet(mapParameter);
		    prjMngService.deletePrjSet(mapParameter);
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 단위업무 수정
	 * @param request
	 * @param response
	 * @return updatePrjSet.do
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/updatePrjSet.do")
	public ModelAndView updatePrjSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    String project_id = mapParameter.get("project_id").toString();
		    List jobSet = (List)mapParameter.get("job_set");
		    
		    prjMngService.deleteUnitPrjSet(mapParameter);
		    prjMngService.updatePrjSet(mapParameter);
		    for (int i=0;i<jobSet.size();i++) {
		    	Map<String, Object> pMap = (Map<String, Object>)jobSet.get(i);
		    	//System.out.println(pMap.toString());
		    	
		    	int ord = i + 1;
		    	pMap.put("project_id", project_id);
		    	pMap.put("job_order", ord);
		    	prjMngService.prjSetUnitNew(pMap);
		    }
		    
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	

	/**
	 * 프로젝트 실행이력 목록 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getPrjSet.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getPrjHstList.do")
	public ModelAndView getPrjHstList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			String searchText = (String)request.getParameter("searchText");
			String clNm = (String)request.getParameter("clNm");
			String stateCd = (String)request.getParameter("stateCd");
			
			clNm = Security.cleanXss(clNm);
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			searchText = Security.cleanXss(searchText);
			stateCd = Security.cleanXss(stateCd);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "10";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			//상태값 필터링
			if (stateCd != null) {
				mapParameter.put("stateCd", stateCd);
			}
			
			//분류
			if (clNm != null) {
				mapParameter.put("clNm", clNm);
			}
			
			//검색어
			mapParameter.put("searchText", searchText);
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", 3);
			
			List PrjSet = (List)prjMngService.getPrjHstList(mapParameter);
			List PrjSetCopy = new ArrayList();
			for (int i=0;i<PrjSet.size();i++) {
				HashMap<String,Object> data = (HashMap<String, Object>) PrjSet.get(i);
				String prj_master_hst_seq = data.get("prj_master_hst_seq").toString();
				mapParameter.put("prj_master_hst_seq", prj_master_hst_seq);
				List PrjUnitSet = (List)prjMngService.getPrjHstUnitList(mapParameter);
				data.put("unitSet",PrjUnitSet);
				PrjSetCopy.add(data);
			}
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", PrjSetCopy);
			
		} catch (Exception e) {
			model.put("id", "G2G11001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
			System.out.println(e.getMessage());
			
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}

	/**
	 * 프로젝트 단일실행 등록
	 * @param request
	 * @param response
	 * @return addPrjExec.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/addPrjExec.do")
	public ModelAndView addPrjExec(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String project_id = (String)request.getParameter("project_id"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    
		    String schdType = (String)request.getParameter("schdType");
		    
		    Map mapParameter = new HashMap();
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			String prj_master_hst_seq = prjMngService.prjExecGetId();
			
			mapParameter.put("user_id", user_id);
			mapParameter.put("project_id", project_id);
		    mapParameter.put("prj_master_hst_seq", prj_master_hst_seq);
		    mapParameter.put("schd_type", schdType);
		    if (schdType.equalsIgnoreCase("즉시")) {
		    	mapParameter.put("project_state_cd", "standby");
		    } else {
		    	mapParameter.put("project_state_cd", "manual");
		    }
		    prjMngService.prjExecReg(mapParameter);
		    prjMngService.prjUnitExecReg(mapParameter);
		    
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	/**
	 * 프로젝트 단일실행 등록
	 * @param request
	 * @param response
	 * @return addPrjExec.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/delPrjExec.do")
	public ModelAndView delPrjExec(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String prj_master_hst_seq = (String)request.getParameter("prj_master_hst_seq"); 
		    Map mapParameter = new HashMap();
			mapParameter.put("prj_master_hst_seq", prj_master_hst_seq);
		    
		    prjMngService.delPrjUnitExec(mapParameter);
		    prjMngService.delPrjExec(mapParameter);
		    
			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G11002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	

	/**
	 * 단위업무 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/getWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getDataList.do")
	public ModelAndView getDataList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("selectViewCount");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			String searchText = (String)request.getParameter("searchText");
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			searchText = Security.cleanXss(searchText);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "10";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			//검색어
			mapParameter.put("searchText", searchText);
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			
			List WorkSet = (List)prjMngService.getDataList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", WorkSet);
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
	 * 격자자료제공 목록 조회
	 * @param request
	 * @param response
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getGridInfoList.do")
	public ModelAndView getGridInfoList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("start");
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			
			List gridInfoList = prjMngService.getGridInfoList(mapParameter);
			model.put("id", "G2G200011");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", gridInfoList);
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G200011");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G200011");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
}