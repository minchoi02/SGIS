package kostat.lbdms.ServiceAPI.api;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.MainService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataService;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 메인 화면 컨트롤러.<p>
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
@RequestMapping(value="/api/index")
public class MainAPI {
	private final Log logger = LogFactory.getLog(MainAPI.class);
	
	@Resource(name="mainService")
	private MainService mainService;
	
	@Resource(name="myDataService")
	private MyDataService myDataService;
	
	
	/**
	 * 대시보드 조회
	 * @param request
	 * @param response
	 * @return /view/index/getDashBoardList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getDashBoardList.do")
	public ModelAndView getDashBoardList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		try {
			String userId = (String)session.getAttribute("user_id");
			
			if (userId == null) {
				throw new AuthorityException ("나의데이터 조회 중 오류가 발생하였습니다.");
			}

			mapParameter.put("user_id", userId);
			//mapParameter.put("startIdx", Integer.parseInt(startIdx));
			//mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			
			List myDataListCnt = (List)myDataService.getDashBoardList(mapParameter); // 데이터 전체 목록	(수량 계산)
			List dashBoardList = (List)myDataService.getDashBoardOptList(mapParameter); // 대시보드 표출 설정 
			
			Map result = new HashMap();
			result.put("dashDataList", myDataListCnt.get(0));
			result.put("dashOptList", dashBoardList.get(0));
			
			
			model.put("id", "G2G12001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", result);
			
		} 
		catch (AuthorityException e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-100");
			model.put("errMsg", e.getErrMessage());
			logger.info(e);
		}
		catch (Exception e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
	
	/**
	 * 대시보드 설정 저장 API
	 * @param request
	 * @param response
	 * @return /view/index/saveDashBoardOpt.do
	 */
	@RequestMapping(value="/saveDashBoardOpt.do")
	public ModelAndView saveDashBoardOpt(HttpServletRequest request,HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			String userId = (String)session.getAttribute("user_id");
			
			String usr_data_yn = request.getParameter("usr_data_yn");
			String fav_yn = request.getParameter("fav_yn");
			String lc_data_yn = request.getParameter("lc_data_yn");
			String save_spacial_yn = request.getParameter("save_spacial_yn");
			String analysis_data_yn = request.getParameter("analysis_data_yn");
			String share_data_yn = request.getParameter("share_data_yn");
			
			mapParameter.put("user_id",  userId);
			mapParameter.put("usr_data_yn", usr_data_yn);
			mapParameter.put("fav_yn", fav_yn);
			mapParameter.put("lc_data_yn", lc_data_yn);
			mapParameter.put("save_spacial_yn", save_spacial_yn);
			mapParameter.put("analysis_data_yn", analysis_data_yn);
			mapParameter.put("share_data_yn", share_data_yn);
			 
			// 대시보드 설정 업데이트
			int result = myDataService.updateDashBoardOpt(mapParameter);
			
			if (result == 1) {
				model.put("id", "G2G00002");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
			}else {
				model.put("id", "G2G00002");
				model.put("errCd", "-1");
				model.put("errMsg", "Failed");
			}
			

		} catch (Exception e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	@RequestMapping(value="/proxy/**")
    public ResponseEntity<byte[]> proxy(HttpServletRequest request, HttpServletResponse response, @RequestBody(required = false) byte[] body) throws IOException, URISyntaxException {
	     
		HttpComponentsClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
		httpRequestFactory.setConnectTimeout(360000); //6m
		httpRequestFactory.setReadTimeout(360000); //6m
	 
		// restTempate tobe bean
		RestTemplate restTemplate = new RestTemplate(httpRequestFactory);
		 
		// url
		String originReqURL = request.getRequestURI().replaceAll("^/proxy", "");
		String originQueryString = request.getQueryString();
		String urlStr = "http://localhost:28909/" + originReqURL + (StringUtils.isEmpty(originQueryString) ? "" : "?"+originQueryString);
		 
		URI url = new URI(urlStr);

		// method
		String originMethod = request.getHeader("x-origin-method");
		HttpMethod method = HttpMethod.valueOf(originMethod.toUpperCase());

		// header
		Enumeration<String> headerNames = request.getHeaderNames();
		MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
		while(headerNames.hasMoreElements()) {
			String headerName = headerNames.nextElement();
			String headerValue = request.getHeader(headerName);

			headers.add(headerName, headerValue);
		}

		// http entity (body, header)
		HttpEntity<byte[]> httpEntity = new HttpEntity<>(body, headers);

		return restTemplate.exchange(url, method, httpEntity, byte[].class);
    }
}