package kostat.lbdms.ServiceAPI.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.MetaMngService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;
import net.sf.json.JSONArray;

/**
 * @Class Name : MetaMngMapper.java
 * @Description : MetaMngMapper Class
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
@RequestMapping(value="/api/metamng")
public class MetaMngAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MetaMngAPI.class);
	
	@Resource(name="metaMngService")
	private MetaMngService metaMngService;
	/*---------------*/
	/*   용어 사전	 */
	/*---------------*/
	/**
	 * 표준용어 목록 조회
	 * @param request
	 * @param response
	 * @return /view/metaMng/getWordList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaWordList.do")
	public ModelAndView metaWordList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
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
			
			List metaWordList = (List)metaMngService.metaWordList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaWordList);
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
	 * 표준용어 상세정보 조회
	 * @param request
	 * @param response
	 * @return /view/prjmng/workSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaWordDetail.do")
	public ModelAndView metaWordDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String job_setup_seq = (String)request.getParameter("job_setup_seq");
			job_setup_seq = Security.cleanXss(job_setup_seq);
			
			if (job_setup_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("job_setup_seq", Long.parseLong(job_setup_seq));
			
			
			//상세정보 조회
			Map dataMap = (Map)metaMngService.metaWordDetail(mapParameter);

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
	 * 표준용어 등록
	 * @param request
	 * @param response
	 * @return metaWordAdd.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaWordAdd.do")
	public ModelAndView metaWordAdd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaWordAdd(mapParameter);
			
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
	 * 표준용어 수정
	 * @param request
	 * @param response
	 * @return updateWorkSet
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaWordEdit.do")
	public ModelAndView metaWordEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaWordEdit(mapParameter);
			
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
	 * 표준용어 삭제
	 * @param request
	 * @param response
	 * @return deleteWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaWordDel.do")
	public ModelAndView metaWordDel(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    JSONArray array = JSONArray.fromObject(jsonStr);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("jsonArr", array);

		    	
		    metaMngService.metaWordDel(mapParameter);
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
	
	/*---------------*/
	/*   도메인	     */
	/*---------------*/
	
	/**
	 * 도메인 목록  조회
	 * @param request
	 * @param response
	 * @return /view/metaMng/getWordList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaDomainList.do")
	public ModelAndView metaDomainList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
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
			
			List metaDomainList = (List)metaMngService.metaDomainList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaDomainList);
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
	 * 도메인 상세정보 조회
	 * @param request
	 * @param response
	 * @return /view/metaMng/metaDomainDetail.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaDomainDetail.do")
	public ModelAndView metaDomainDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String job_setup_seq = (String)request.getParameter("job_setup_seq");
			job_setup_seq = Security.cleanXss(job_setup_seq);
			
			if (job_setup_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("job_setup_seq", Long.parseLong(job_setup_seq));
			
			
			//상세정보 조회
			Map metaDomainDetail = (Map)metaMngService.metaDomainDetail(mapParameter);

			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaDomainDetail);
			
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
	 * 도메인 등록
	 * @param request
	 * @param response
	 * @return workSetNew.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaDomainAdd.do")
	public ModelAndView metaDomainAdd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaDomainAdd(mapParameter);
			
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
	 * 도메인 수정
	 * @param request
	 * @param response
	 * @return updateWorkSet
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaDomainEdit.do")
	public ModelAndView metaDomainEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaDomainEdit(mapParameter);
			
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
	 * 도메인 삭제
	 * @param request
	 * @param response
	 * @return deleteWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaDomainDel.do")
	public ModelAndView metaDomainDel(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    JSONArray array = JSONArray.fromObject(jsonStr);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("jsonArr", array);

		    	
		    metaMngService.metaDomainDel(mapParameter);
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
	
	
	/*---------------*/
	/*   코드	     */
	/*---------------*/
	
	/**
	 * 단위업무 조회
	 * @param request
	 * @param response
	 * @return /view/metaMng/getWordList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaCodeList.do")
	public ModelAndView metaCodeList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
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
			
			List metaCodeList = (List)metaMngService.metaCodeList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaCodeList);
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
	@RequestMapping(value="/metaCodeDetail.do")
	public ModelAndView metaCodeDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String job_setup_seq = (String)request.getParameter("job_setup_seq");
			job_setup_seq = Security.cleanXss(job_setup_seq);
			
			if (job_setup_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("job_setup_seq", Long.parseLong(job_setup_seq));
			
			
			//상세정보 조회
			Map metaCodeDetail = (Map)metaMngService.metaCodeDetail(mapParameter);

			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaCodeDetail);
			
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
	@RequestMapping(value="/metaCodeAdd.do")
	public ModelAndView metaCodeAdd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaCodeAdd(mapParameter);
			
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
	@RequestMapping(value="/metaCodeEdit.do")
	public ModelAndView metaCodeEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaCodeEdit(mapParameter);
			
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
	@RequestMapping(value="/metaCodeDel.do")
	public ModelAndView metaCodeDel(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    JSONArray array = JSONArray.fromObject(jsonStr);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("jsonArr", array);

		    	
		    metaMngService.metaCodeDel(mapParameter);
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
	
	
	/*---------------*/
	/*   정보시스템        */
	/*---------------*/
	
	/**
	 * 단위업무 조회
	 * @param request
	 * @param response
	 * @return /view/metaMng/metaSysInfoList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaSysInfoList.do")
	public ModelAndView metaSysInfoList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
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
			
			List metaSysInfoList = (List)metaMngService.metaSysInfoList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaSysInfoList);
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
	@RequestMapping(value="/metaSysInfoDetail.do")
	public ModelAndView metaSysInfoDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String job_setup_seq = (String)request.getParameter("job_setup_seq");
			job_setup_seq = Security.cleanXss(job_setup_seq);
			
			if (job_setup_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("job_setup_seq", Long.parseLong(job_setup_seq));
			
			
			//상세정보 조회
			Map metaSysInfoDetail = (Map)metaMngService.metaSysInfoDetail(mapParameter);

			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaSysInfoDetail);
			
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
	@RequestMapping(value="/metaSysInfoAdd.do")
	public ModelAndView metaSysInfoAdd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaSysInfoAdd(mapParameter);
			
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
	 * @return metaSysInfoEdit
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaSysInfoEdit.do")
	public ModelAndView metaSysInfoEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaSysInfoEdit(mapParameter);
			
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
	@RequestMapping(value="/metaSysInfoDel.do")
	public ModelAndView metaSysInfoDel(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    JSONArray array = JSONArray.fromObject(jsonStr);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("jsonArr", array);

		    	
		    metaMngService.metaSysInfoDel(mapParameter);
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
	
	
	/*---------------*/
	/*   테이블        */
	/*---------------*/
	
	/**
	 * 단위업무 조회
	 * @param request
	 * @param response
	 * @return /view/metaMng/metaTblList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaTblList.do")
	public ModelAndView metaTblList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
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
			
			List metaTblList = (List)metaMngService.metaTblList(mapParameter);
			
			model.put("id", "G2G11001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaTblList);
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
	@RequestMapping(value="/metaTblDetail.do")
	public ModelAndView metaTblDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String job_setup_seq = (String)request.getParameter("job_setup_seq");
			job_setup_seq = Security.cleanXss(job_setup_seq);
			
			if (job_setup_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("job_setup_seq", Long.parseLong(job_setup_seq));
			
			
			//상세정보 조회
			Map metaTblDetail = (Map)metaMngService.metaTblDetail(mapParameter);

			model.put("id", "G2G11002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", metaTblDetail);
			
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
	 * @return metaTblAdd.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaTblAdd.do")
	public ModelAndView metaTblAdd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaTblAdd(mapParameter);
			
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
	 * @return metaTblEdit
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaTblEdit.do")
	public ModelAndView metaTblEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
		    metaMngService.metaTblEdit(mapParameter);
			
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
	@RequestMapping(value="/metaTblDel.do")
	public ModelAndView metaTblDel(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request); 
		    //JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    JSONArray array = JSONArray.fromObject(jsonStr);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("jsonArr", array);

		    	
		    metaMngService.metaTblDel(mapParameter);
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
	
}