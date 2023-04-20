package kostat.sop.ServiceAPI.controller.view;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.common.util.StringUtil;

/**
 * 1. 기능 : 행정통계시각화 대쉬보드 컨트롤러.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 *
 * <pre>
 *  <b>History:</b>
 *     2021.08.17	hjh	초기 작성
 * </pre>
 *
 * @author 최종 수정자 : hjh
 * @version 1.0
 * @see
 *      <p/>
 */
@Controller
@RequestMapping(value = "/view/administStats")
public class AdministStatsController {

	private final Log logger = LogFactory.getLog(AdministStatsController.class);

	/**
	 * 행정통계시각화 대쉬보드 > 프레임 > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/administStatsMain
	 */
	@RequestMapping(value = "/administStatsMain")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "newly");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "main");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임 > header
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/administStatsHeader
	 */
	@RequestMapping(value = "/administStatsHeader")
	public ModelAndView header(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		request.getAttribute("survGb");
		return new ModelAndView("administStats/administStatsHeader");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임 > left
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/administStatsLeft
	 */
	@RequestMapping(value = "/administStatsLeft")
	public ModelAndView leftMenu(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		request.getAttribute("survGb");
		return new ModelAndView("administStats/administStatsLeft");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임 > Map
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/administStatsMap
	 */
	@RequestMapping(value = "/administStatsMap")
	public ModelAndView administStatsMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("administStats/administStatsMap");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(신혼부부) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/newlyDash
	 */
	@RequestMapping(value = "/newlyDash")
	public ModelAndView newly(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "newly");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "newly");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(신혼부부) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/newlyDash/main
	 */
	@RequestMapping(value = "/newlyDash/main")
	public ModelAndView newlyMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStats/newlyDash");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(주택소유) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/houseDash
	 */
	@RequestMapping(value = "/houseDash")
	public ModelAndView house(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "house");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "house");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(주택소유) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/houseDash/main
	 */
	@RequestMapping(value = "/houseDash/main")
	public ModelAndView houseMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		return new ModelAndView("administStats/houseDash");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(중∙장년층) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/middlDash
	 */
	@RequestMapping(value = "/middlDash")
	public ModelAndView middl(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "middl");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "middl");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(중∙장년층) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/middlDash/main
	 */
	@RequestMapping(value = "/middlDash/main")
	public ModelAndView middlMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStats/middlDash");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(귀농∙귀어∙귀촌) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/retunDash
	 */
	@RequestMapping(value = "/retunDash")
	public ModelAndView retun(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "retun");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "retun");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(귀농∙귀어∙귀촌) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/retunDash/main
	 */
	@RequestMapping(value = "/retunDash/main")
	public ModelAndView retunMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStats/retunDash");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_일자리) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more1Dash
	 */
	@RequestMapping(value = "/more1Dash")
	public ModelAndView more1(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "more1");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "more1");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_일자리) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more1Dash/main
	 */
	@RequestMapping(value = "/more1Dash/main")
	public ModelAndView more1Main(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStats/more1Dash");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_퇴직연금) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more2Dash
	 */
	@RequestMapping(value = "/more2Dash")
	public ModelAndView more2(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "more2");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "more2");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_퇴직연금) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more2Dash/main
	 */
	@RequestMapping(value = "/more2Dash/main")
	public ModelAndView more2Main(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStats/more2Dash");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_임근근로 일자리 동향) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more3Dash
	 */
	@RequestMapping(value = "/more3Dash")
	public ModelAndView more3(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "more3");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "more3");

		return new ModelAndView("administStats/administStatsMain");
	}

	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_임근근로 일자리 동향) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more3Dash/main
	 */
	@RequestMapping(value = "/more3Dash/main")
	public ModelAndView more3Main(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStats/more3Dash");
	}
	
	@RequestMapping(value="/proxy")
	public void proxy(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestParam HashMap<String, Object> paramMap) throws IOException {
		String[] allowedHosts = {
		//local
				request.getServerName()+":"+request.getServerPort(), 
				"kosis.kr",
				"link.kostat.go.kr",
				"sgis.kostat.go.kr"
				//,"localhost"
		};
		HttpURLConnection con = null;
		try {
			String reqUrl = request.getQueryString();
			String decodedUrl = "";
			if (reqUrl != null) {

			} else {
				response.setStatus(400);
				logger.error("ERROR 400: No target specified for proxy.");
			}
			reqUrl = reqUrl.replaceAll(" ", "%20");
			
			String host = "";
			host = reqUrl.split("\\/")[2];
			boolean allowed = false;
			
			for (String surl : allowedHosts) {
				if (host.equalsIgnoreCase(surl)) {
					allowed = true;
					break;
				}
			}
			
			if(allowed) {
				String[] subUrl = reqUrl.split("\\/");
				String modifyUrl = subUrl[0] + "/" + subUrl[1] + "/" + subUrl[2];
				
				for(int i=0; i<subUrl.length; i++){
					if(i>2){
						modifyUrl = modifyUrl + "/" + URLEncoder.encode(subUrl[i], "UTF-8");
					}
				}
				
				//mng_s 20220315 개발서버에서 프록시가 않되서 호스트 네임으로 구분해서 처리함
				String hostName = InetAddress.getLocalHost().getHostName();
				System.out.println("[AdministStatsController.java] hostName [" + hostName);
				System.out.println("[AdministStatsController.java] reqUrl [" + reqUrl);
				if(  "mangWASZ".equals(hostName)  ) {
					reqUrl = reqUrl.replace("link.kostat.go.kr", "10.182.31.53:10190"); //개발서버
				} else {
					
				}
				
				System.out.println("[AdministStatsController.java] reqUrl replace [" + reqUrl);
				
				URL url = new URL(reqUrl);

				con = (HttpURLConnection)url.openConnection();
				con.setRequestMethod("POST"); // HTTP POST 메소드 설정
				con.setDoOutput(true); // POST 파라미터 전달을 위한 설정
				con.setConnectTimeout(10000);
				con.setReadTimeout(10000);
				String reqContenType = request.getContentType();
				if(reqContenType != null) {
					//con.setRequestProperty("Content-Type", reqContenType);
					con.setRequestProperty("Content-Type", "application/json");
				}
				else {
					con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
					//con.setRequestProperty("Content-Type", "application/json");
				}
				
				int clength = request.getContentLength();
				if(clength > 0) {
					con.setDoInput(true);
					byte[] idata = new byte[clength];
					request.getInputStream().read(idata, 0, clength);
					con.getOutputStream().write(idata, 0, clength);
				}

				response.setContentType(con.getContentType());
				BufferedInputStream bis = new BufferedInputStream(con.getInputStream());
				int bytesRead;
				byte[] buffer = new byte[256];
				
				while((bytesRead = bis.read(buffer)) > 0){
					response.getOutputStream().write(buffer, 0, bytesRead);
				}
				response.getOutputStream().flush();
				bis.close();
			}
			else {
				response.setStatus(502);
				logger.error("ERROR 502: This proxy does not allow you to access that location.");
			}
		} catch(Exception e) {
			System.out.println(response);
			response.setStatus(500);
			byte[] idata = new byte[5000];
			
			if(con.getErrorStream() != null) {
				con.getErrorStream().read(idata, 0, 5000);
			}
			
			logger.error("ERROR 500: An internal server error occured. " + e.getMessage() + " " + new String(idata));
		}
	}
}