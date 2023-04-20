package kostat.lbdms.ServiceAPI.api;

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

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.SopService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 회원 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/sop")
public class SopAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(SopAPI.class);
	
	@Resource(name="sopService")
	private SopService sopService;

	/**
	 * 전국지역정보 조회
	 * @param request
	 * @param response
	 * @return /view/notice/getNoticeDetailInfo.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getAllAddressList.do")
	public ModelAndView getAllAddressList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		Map resultData = new HashMap();
		try {
		
			String base_year = (String)request.getParameter("base_year");
			String sido_cd = (String)request.getParameter("sido_cd");
			String sgg_cd = (String)request.getParameter("sgg_cd");
			String dong_cd = (String)request.getParameter("dong_cd");
			
			
			mapParameter.put("base_year", base_year);
			
			if (sido_cd != null) {
				mapParameter.put("sido_cd", sido_cd);
			}
			
			if (sgg_cd != null) {
				mapParameter.put("sgg_cd", sgg_cd);
			}
			
			if (dong_cd != null) {
				mapParameter.put("dong_cd", dong_cd);
			}
			
			//시도 목록 가져오기
			List sidoList = sopService.getSidoList(mapParameter);
			resultData.put("sidoList", sidoList);
			
			//시군구 목록 가져오기
			if(sido_cd != null) {
				List sggList = sopService.getSggList( mapParameter);
				resultData.put("sggList", sggList);	
			}
			
			//읍면동 목록 가져오기
			if(sido_cd != null && sgg_cd != null) {
				List admList = sopService.getAdmList(mapParameter);
				resultData.put("admList", admList);	
			}
			
			resultData.put("sido_cd", sido_cd);
			resultData.put("sgg_cd", sgg_cd);
			resultData.put("dong_cd", dong_cd);
			
			model.put("id", "G2G20001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G20001");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G20001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
	/**
	 * 시도정보 조회
	 * @param request
	 * @param response
	 * @return /getSidoAddressList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getSidoAddressList.do")
	public ModelAndView getSidoAddressList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		Map resultData = new HashMap();
		try {
		
			String base_year = (String)request.getParameter("base_year");			
			mapParameter.put("base_year", base_year);

			//시도 목록 가져오기
			List sidoList = sopService.getSidoList(mapParameter);
			resultData.put("sidoList", sidoList);
			
			model.put("id", "G2G20002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", resultData);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G20002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G20002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 시군구정보 조회
	 * @param request
	 * @param response
	 * @return /getSggAddressList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getSggAddressList.do")
	public ModelAndView getSggAddressList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		Map resultData = new HashMap();
		try {
		
			String base_year = (String)request.getParameter("base_year");
			String sido_cd = (String)request.getParameter("sido_cd");
			
			//시군구 목록 가져오기
			if(sido_cd != null) {
				mapParameter.put("base_year", base_year);
				mapParameter.put("sido_cd", sido_cd);
				
				List sggList = sopService.getSggList( mapParameter);
				resultData.put("sggList", sggList);	
			}else {
				throw new AuthFailedException("행정동코드가 올바르지 않습니다.");
			}
			
			model.put("id", "G2G20003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", resultData);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G20003");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G20003");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 읍면동정보 조회
	 * @param request
	 * @param response
	 * @return /getAdmAddressList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getAdmAddressList.do")
	public ModelAndView getAdmAddressList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		Map resultData = new HashMap();
		try {
		
			String base_year = (String)request.getParameter("base_year");
			String sido_cd = (String)request.getParameter("sido_cd");
			String sgg_cd = (String)request.getParameter("sgg_cd");
			
			//읍면동 목록 가져오기
			if(sido_cd != null && sgg_cd != null) {
				mapParameter.put("base_year", base_year);
				mapParameter.put("sido_cd", sido_cd);
				mapParameter.put("sgg_cd", sgg_cd);
				
				List admList = sopService.getAdmList(mapParameter);
				resultData.put("admList", admList);	
			}else {
				throw new AuthFailedException("행정동코드가 올바르지 않습니다.");
			}
			
			model.put("id", "G2G20004");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", resultData);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G20004");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G20004");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 경계정보 조회
	 * @param request
	 * @param response
	 * @return /getAdmAddressList.do
	 */
	@SuppressWarnings({ "rawtypes", "unused" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getBoundaryInfo.do")
	public ModelAndView getBoundaryInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		Map resultData = new HashMap();
		try {
			String admCd = (String)request.getParameter("adm_cd");
			String lowSearch = (String)request.getParameter("low_search");
			admCd = Security.cleanXss(admCd);
			lowSearch = Security.cleanXss(lowSearch);
			
			if (admCd == null || admCd.length() == 0) {
				throw new AuthorityException("필수파라미터 누락입니다.");
			}
			
			int length = admCd.length();
			String sidoCd, sggCd, dongCd = null;
			List admList = null;
			
			if (lowSearch == null) {
				lowSearch = "1";
			}
			mapParameter.put("low_search", lowSearch);
			
			if (lowSearch.equals("0")) {
				switch(length) {
					case 2:
						sidoCd = admCd.substring(0, 2);
						mapParameter.put("sido_cd", sidoCd);
						admList = sopService.getSidoBoundaryInfo(mapParameter);
						break;
					case 5:
						sidoCd = admCd.substring(0, 2);
						sggCd = admCd.substring(2, 5);
						mapParameter.put("sido_cd", sidoCd);
						mapParameter.put("sgg_cd", sggCd);
						admList = sopService.getSggBoundaryInfo(mapParameter);
						break;
					case 7:
						sidoCd = admCd.substring(0, 2);
						sggCd = admCd.substring(2, 5);
						dongCd = admCd.substring(5, 7);
						mapParameter.put("sido_cd", sidoCd);
						mapParameter.put("sgg_cd", sggCd);
						mapParameter.put("dong_cd", dongCd);
						admList = sopService.getDongBoundaryInfo(mapParameter);
						break;
					default:
						break;
				}	
			}else {
				switch(length) {
					case 2:
						sidoCd = admCd.substring(0, 2);
						mapParameter.put("sido_cd", sidoCd);
						admList = sopService.getSggBoundaryInfo(mapParameter);
						break;
					case 5:
						sidoCd = admCd.substring(0, 2);
						sggCd = admCd.substring(2, 5);
						mapParameter.put("sido_cd", sidoCd);
						mapParameter.put("sgg_cd", sggCd);
						admList = sopService.getDongBoundaryInfo(mapParameter);
						break;
					case 7:
						sidoCd = admCd.substring(0, 2);
						sggCd = admCd.substring(2, 5);
						dongCd = admCd.substring(5, 7);
						mapParameter.put("sido_cd", sidoCd);
						mapParameter.put("sgg_cd", sggCd);
						mapParameter.put("dong_cd", dongCd);
						admList = sopService.getTotaloaBoundaryInfo(mapParameter);
						break;
					default:
						break;
				}
			}
			
			model.put("id", "G2G20005");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", admList);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G20005");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G20005");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
}