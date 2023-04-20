package egovframework.sgis.m2021.totSurv.web;


import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.m2021.catchmentarea.service.catchmentareaService;
import egovframework.sgis.m2021.totSurv.service.TotSurvService;

@Controller
public class Map2021Controller {
	@Resource(name = "totSurvService")
	private TotSurvService totSurvService;
	
	//SGI4_생활권역_모바일 start
	@Resource(name = "catchmentareaService")
	private catchmentareaService catchmentareaService;
	//SGI4_생활권역_모바일 end
		
	//총조사 시각화 지도
	@RequestMapping(value = "/m2021/map/totSurv.sgis", method = RequestMethod.GET)
	public String totSurv(String theme){		
		return "m2021/map/totSurv/"+theme;
	}
	@RequestMapping(value = "/m2021/map/administStats.sgis", method = RequestMethod.GET)
	public String administStatsMap(String theme){		
		return "m2021/map/administStats/"+theme;
	}
	@RequestMapping(value = "/m2021/administStats.sgis", method = RequestMethod.GET)
	public String administStats(String theme){		
		return "m2021/map/administStats/"+theme;
	}
	//총조사 시각화 시계열 지도
	@RequestMapping(value = "/m2021/map/totSurvTms.sgis", method = RequestMethod.GET)
	public String statsMeTmsMap(String theme){		
		return "m2021/map/totSurvTms/"+theme;
	}
	@RequestMapping(value = "/a.sgis", method = RequestMethod.GET)
	public String statsMeMap(){		
		return "redirect:/m2021/map/totSurv.sgis?theme=population";
	}
	@RequestMapping(value = "/m2021/map/totSurv/getSggList.json", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public JsonData sggList(
		HttpServletRequest request,
		HttpServletResponse response,
		String year, 
		String sido_cd 
	) {
		return totSurvService.getSggListJsonList(request, response, year, sido_cd); 
	}
	
	@RequestMapping(value = "/m2021/map/catchmentareaMap.sgis", method = RequestMethod.GET)
	public ModelAndView catchmentarea(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		HashMap<String, Object> paramInfo = new HashMap<String, Object>();
		
		try {
			paramInfo.put("facilityList", catchmentareaService.selectFacilityTypeList());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("paraminfo :: " + paramInfo);

		return new ModelAndView("m2021/map/catchmentArea/catchmentAreaMap","paramInfo",paramInfo);	
	}
	
	@RequestMapping(value = "/m2021/map/catchmentareaMap_report.sgis", method = RequestMethod.GET)
	public String test(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2021/map/catchmentArea/catchmentAreaMap_report";
	}
	
	/**
	 * Cross Domain 해결을 위한 proxy
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping(value="/m2021/proxy.sgis")
	public void proxy(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws IOException {
		String[] allowedHosts = {
		//local
				request.getServerName()+":"+request.getServerPort(), 
				"kosis.kr",
				"sgisapi.kostat.go.kr",
				"sgissmart.kro.kr"
		};
		HttpURLConnection con = null;
		try {
			String reqUrl = request.getQueryString();
			String decodedUrl = "";
			if (reqUrl != null) {

			} else {
				response.setStatus(400);
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
				
				URL url = new URL(reqUrl);

				con = (HttpURLConnection)url.openConnection();
				con.setDoOutput(true);
				con.setRequestMethod(request.getMethod());
				con.setConnectTimeout(10000);
				con.setReadTimeout(10000);
				String reqContenType = request.getContentType();
				con.setRequestProperty("Content-Type", "application/json");
								
				int clength = request.getContentLength();
				if(clength > 0) {
					con.setDoInput(true);
					byte[] idata = new byte[clength];
					request.getInputStream().read(idata, 0, clength);
					con.getOutputStream().write(idata, 0, clength);
				}

				response.setContentType(con.getContentType());
				//response.setContentType("application/json");				
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
			}
		} catch(Exception e) {
			System.out.println(response);
			response.setStatus(500);
			byte[] idata = new byte[5000];
			
			if(con.getErrorStream() != null) {
				con.getErrorStream().read(idata, 0, 5000);
			}
		}
	}
	@RequestMapping(value = "/m2021/privacy.sgis", method = RequestMethod.GET)
	public String privacy(){		
		return "m2021/privacy";
	}
	@RequestMapping(value = "/m2021/rule.sgis", method = RequestMethod.GET)
	public String rule(){		
		return "m2021/rule";
	}
}
