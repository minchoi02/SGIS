package kostat.sop.ServiceAPI.controller.view;

import java.io.IOException;		// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import java.io.OutputStream;	// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import java.net.URLEncoder;		// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;//2017.08.11 [개발팀]
import kostat.sop.ServiceAPI.controller.service.PolicyStaticService;//2017.08.11 [개발팀]
import kostat.sop.ServiceAPI.controller.service.SSOService;//2017.08.11 [개발팀]

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;		// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import org.apache.poi.hssf.usermodel.HSSFRow;		// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import org.apache.poi.hssf.usermodel.HSSFSheet;		// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import org.apache.poi.hssf.usermodel.HSSFWorkbook;	// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import org.json.JSONArray; //2017.05.29 [개발팀]
import org.json.JSONObject; //2017.05.29 [개발팀]
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable; //2016.05.29 [개발팀]
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;	// 2018.06.12	ywKim	추가 [v180611] - 엑셀다운/정렬 기능 추가
import org.springframework.web.servlet.ModelAndView;
import kostat.sop.ServiceAPI.common.security.Security; //2017.12.06 [개발팀] 취약점점검

/**
 * 1. 기능 : 정책통계지도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 송종대, 1.0, 2016/11/25  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 송종대
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/map")
public class PolicyStaticController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(PolicyStaticController.class);
	@Resource(name="ssoService")
	private SSOService ssoService;
	@Resource(name="policystaticService")   //2017.08.11 [개발팀]
	private PolicyStaticService policystaticService; //2017.08.11 [개발팀]
	/**
	 * 정책통계지도
	 * @param request
	 * @param response
	 * @return policyStatic/policyStaticMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/policyStaticMap")
	public ModelAndView interactiveMap(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		//로그인 여부 확인
		HttpSession session = request.getSession();
		String member_id = (String)session.getAttribute("member_id");
		model.addAttribute("writeAble", false);
		if(member_id != null) {
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("member_id", member_id);
			try {
				Map member = ssoService.memberInfo(mapParameter);
				String member_grade = (String)member.get("member_grade");
				if(member!=null){
					session.setAttribute("member_grade", member_grade); //2018.01.03 [개발팀]
					if (!member_grade.equals("GM")) {
						model.addAttribute("writeAble", true);
					}
				}
			} catch (SQLException e) {
				logger.error(e);
			}
		}
		//========== 2017.08.10 [개발팀] 정책통계지도-카테고리리스트조회  START ==========//
		try {
			List<Map> categoryList = policystaticService.policyStaticCategoryList();  //2017.08.11 [개발팀]
			model.addAttribute("categoryList", categoryList);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		//========== 2017.08.10 [개발팀] 정책통계지도-카테고리리스트조회  END ==========//
		return new ModelAndView("policyStatic/policyStaticMap");
	}
	
	//================ 2017.05.29 [개발팀] 지자체 연계 START ===================//
	/**
	 * 정책통계지도 (지자체)
	 * @param request
	 * @param response
	 * @return policyStatic/policyStaticMap/{type}
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/policyStaticMap/{type}")
	public ModelAndView interactiveMap(@PathVariable String type, HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map paramInfo = new HashMap();
		try {
			//로그인 여부 확인
			HttpSession session = request.getSession();
			String member_id = (String)session.getAttribute("member_id");
			model.addAttribute("writeAble", false);
			if(member_id != null) {
				HashMap<String,Object> mapParameter = new HashMap<String,Object>();
				mapParameter.put("member_id", member_id);
				Map member = ssoService.memberInfo(mapParameter);
				if(member!=null){
					String member_grade = (String)member.get("member_grade"); //2018.01.03 [개발팀]
					session.setAttribute("member_grade", member_grade); //2018.01.03 [개발팀]
					model.addAttribute("writeAble", member!=null&&"PM".equals(member_grade)); //2018.01.03 [개발팀]
				}
			}
			
			JSONArray paramList = new JSONArray();
			JSONObject params = new JSONObject();
			
			//2017.12.06 [개발팀] 취약점점검
			type = Security.cleanXss(type);
			
			//2017.09.29 [개발팀]
			switch(type) {
				case "localgov":
					//지자체 시도시군구 코드
					String code = request.getParameter("code");
					String isBnu = request.getParameter("isbnu");
					
					//2017.05.29 지자체 URL연게 - 줌, 좌표정보 추가
					String zoom = request.getParameter("zoom");
					String coord_x = request.getParameter("coord_x");
					String coord_y = request.getParameter("coord_y");
					
					params.put("code", code);
					params.put("isbnu", isBnu);
					
					//2017.05.29 지자체 URL연게 - 줌, 좌표정보 추가
					params.put("zoom", zoom);
					params.put("coord_x", coord_x);
					params.put("coord_y", coord_y);
					break;
				case "temp":
					String idx_id = request.getParameter("idx_id");
					String category_id = request.getParameter("category_id");
					String region_cd = request.getParameter("region_cd");
					params.put("idx_id", idx_id);
					params.put("category_id", category_id);
					params.put("region_cd", region_cd);
					break;
			}
			
			paramList.put(params.toString());
			paramInfo.put("type", type);
			paramInfo.put("paramObj", paramList.toString());

			List<Map> categoryList = policystaticService.policyStaticCategoryList();
			model.addAttribute("categoryList", categoryList);

		} catch (SQLException e) {
			logger.error(e);
		} catch (Exception e) {
			logger.error(e);
		}
		return new ModelAndView("policyStatic/policyStaticMap", "paramInfo", paramInfo);
	}
	//================ 2017.05.29 [개발팀] 지자체 연계 END ===================//
	
	/**
	 * 정책통계지도 (왼쪽 메뉴)
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/policyStaticMapLeftMenu")
	public ModelAndView policyStaticMapLeftMenu(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		/**
		 * 3 종류에 해당하는 지표 목록 조회
		 * [년도 , API 검색용 조건값, (수, 율%)]
		 * 1. 인구의 변화 List: 총조사 주요지표 + 인구주택총조사
		 * 2. 가구 및 주택변화 List : 인구주택총조사
		 * 3. 사업체 변화 List : 전국사업체조사
		 */
		
		model.addAttribute("fisrtList", new ArrayList());
		model.addAttribute("secondeList", new ArrayList());
		model.addAttribute("thirdList", new ArrayList());
		
		return new ModelAndView("policyStatic/policyStaticMapLeftMenu");
	}
	
	/**
	 * 정책통계지도 (데이터보드)
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/policyStaticMapDataBoard")
	public ModelAndView policyStaticMapDataBoard(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("policyStatic/policyStaticMapDataBoard");
	}
	
	/**
	 * 정책통계지도 융합화면
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/policyStaticCombineMap")
	public ModelAndView policyStaticCombineMap(HttpServletRequest request, ModelMap model) {   //2017.09.12 [개발팀] 기능수정
		HttpSession session = request.getSession();   //2017.09.12 [개발팀] 기능수정
		String member_id = (String)session.getAttribute("member_id");  //2017.09.12 [개발팀] 기능수정
		model.addAttribute("memberId", member_id);  //2017.09.12 [개발팀] 기능수정
		return new ModelAndView("policyStatic/policyStaticCombineMap");
	}
	
	/**
	 * 데이터 저장화면
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/policyWriteCombineStep2")
	public ModelAndView policyWriteCombineStep2(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("policyWrite/policyWriteCombineStep2");
	}
	
	/* 엑셀 내보내기
	 * 2018.06.12	ywKim	추가: 데이터를 받아서 엑셀파일을 생성  [v180611] - 엑셀다운/정렬 기능 추가
	 */
	@RequestMapping(value="/excelDown",produces="text/plain;charset=UTF-8")
	@ResponseBody	
	public void getExcelFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HSSFWorkbook book = null;
		OutputStream out = null;
		
		try{
			book = new HSSFWorkbook();
			HSSFSheet sheet = book.createSheet();
			
			String isLocal = request.getParameter("isLocal");
			String[] excelDataArr = request.getParameterValues("excelData");
			
			ArrayList makeData =  new ArrayList();
			
			for (String excelData : excelDataArr) {
				String[] tempData = excelData.toString().split(",");
				ArrayList rowData = new ArrayList();
				for (String data : tempData) {
					if (isLocal.equals("Y")) {
						rowData.add(new String(data.getBytes("iso-8859-1"), "UTF-8"));// 로컬						
					} else {
						rowData.add(new String(data.getBytes("UTF-8"), "UTF-8"));// 운영
					}
				}
				
				makeData.add( rowData );
			}
			
			for (int i =0; i < makeData.size();i++){
				HSSFCell cell = null;
				HSSFRow row = null;
				row = sheet.createRow(i);
				ArrayList rowList = (ArrayList) makeData.get(i);
				
				for(int j = 0; j < rowList.size(); j++){
					cell = row.createCell(j);
					
					if( rowList.get(j) == null ){
						cell.setCellValue("");
					} else{
						
						// Data : 순위 / 지역명 / 행정동코드 / 증감(명)
						if (i == 0 || (i != 0 && j == 1))
							cell.setCellValue( rowList.get(j).toString() );
						else
							cell.setCellValue( Integer.parseInt( rowList.get(j).toString() ) );
					}
				}
			}
			
			response.setContentType("application/vnd.ms-excel; charset=UTF-8");
			String userAgent = request.getHeader("User-Agent");
			
			String filename = "융합결과데이터.xls";
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11

            String browserType = request.getHeader("user-agent");
			if(browserType.indexOf("Firefox") > -1) {
				filename = new String (filename.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\";");
			} else if(browserType.indexOf("Safari") > -1 && browserType.indexOf("Chrome") < 0) {
				filename = new String (filename.getBytes ("UTF-8"), "iso-8859-1");
				response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\";");
			} else {
				response.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(filename, "utf-8") + "\";");
			}
            
			//추가
			response.setHeader("Content-Type", "application/octet-stream");
            response.setHeader("Content-Transfer-Encoding", "binary");
            
            out = response.getOutputStream();
            book.write(out);
           
            out.flush();
            
		} catch(IOException e){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);			
		} finally{
			if(out != null){
				out.close();
			}
			if(book != null) {
				book = null;
			}
			if(out != null) {
				out = null;
			}
		}
	}
}