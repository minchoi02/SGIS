package kostat.sop.ServiceAPI.controller.view;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.MapService;

/**
 * 1. 기능 : 일자리 맵 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     2018.09.01	ywKim	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/job")
public class WorkRoadControllerTest {
	private final Log logger = LogFactory.getLog(WorkRoadControllerTest.class);
	
	@Resource(name="mapService")
	private MapService mapService;
	
	/**
	 * 일자리 맵 > 프레임 > Main
	 * @param request
	 * @param response
	 * @return workRoad/common/workRoadMap
	 */
	@RequestMapping(value="/main")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		model.addAttribute("mode", "main");
		model.addAttribute("is_dev_test", "Y");
		return new ModelAndView("workRoad/common/workRoad");
	}
	@RequestMapping(value="/workRoadMain")
	public ModelAndView Main(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadMain");
	}		
	@RequestMapping(value="/todayStatus")
	public ModelAndView todayStatus(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		model.addAttribute("mode", "todayStatus");
		model.addAttribute("is_dev_test", "Y");
		return new ModelAndView("workRoad/common/workRoad");
	}
	@RequestMapping(value="/viewJobs")
	public ModelAndView viewJobs(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		model.addAttribute("mode", "viewJobs");
		model.addAttribute("is_dev_test", "Y");
		return new ModelAndView("workRoad/common/workRoad");
	}
	@RequestMapping(value="/myNeighberhoodJob")
	public ModelAndView myNeighberhoodJob(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		model.addAttribute("mode", "myNeighberhoodJob");
		model.addAttribute("is_dev_test", "Y");
		return new ModelAndView("workRoad/common/workRoad");
	}
	@RequestMapping(value="/statusAnls")
	public ModelAndView statusAnls(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		model.addAttribute("mode", "statusAnls");
		model.addAttribute("is_dev_test", "Y");
		return new ModelAndView("workRoad/common/workRoad");
	}
	@RequestMapping(value="/statsAnls")
	public ModelAndView statsAnls(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		model.addAttribute("mode", "statsAnls");
		model.addAttribute("is_dev_test", "Y");
		return new ModelAndView("workRoad/common/workRoad");
	}

	/**
	 * 일자리 맵 > 프레임 > Header
	 * @param request
	 * @param response
	 * @return workRoad/common/workRoadHeader
	 */
	@RequestMapping(value="/workRoadHeader")
	public ModelAndView workRoadHeader(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadHeader");
	}

	/**
	 * 일자리 맵 > 프레임 > Footer
	 * @param request
	 * @param response
	 * @return workRoad/common/workRoadFooter
	 */
	@RequestMapping(value="/workRoadFooter")
	public ModelAndView workRoadFooter(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadFooter");
	}

	/**
	 * 일자리 맵 > 프레임 > LeftMenu
	 * @param request
	 * @param response
	 * @return workRoad/common/workRoadLeftMenu
	 */
	@RequestMapping(value="/workRoadLeftMenu")
	public ModelAndView workRoadLeftMenu(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadLeftMenu");
	}

	/**
	 * 일자리 맵 > 프레임 > 우측 데이터보드
	 * 2018.12.21 현재 사용안함 But 데이터보드를 합치려면 사용하게 될 수도 있음
	 * @param request
	 * @param response
	 * @return workRoad/common/workRoadDataboard
	 */
	@RequestMapping(value="/workRoadDataBoard")
	public ModelAndView workRoadDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadDataBoard");
	}

	/**
	 * 일자리 맵 > 공통화면 > 페이징 버튼 
	 * @param request
	 * @param response
	 * @return workRoad/common/workRoadPaging
	 */
	@RequestMapping(value="/workRoadPaging")
	public ModelAndView workRoadPaging(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadPaging");
	}
	
	/**
	 * 일자리 맵 > 공통화면 > 선택항목
	 * @param request
	 * @param response
	 * @return workRoad/statusAnls/workRoadSelection
	 */
	@RequestMapping(value="/workRoadSelection")
	public ModelAndView workRoadSelection(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadSelection");
	}
		
	/**
	 * 일자리 맵 > 공통화면 > 로딩바
	 * @param request
	 * @param response
	 * @return workRoad/common/workRoadLoading
	 */
	@RequestMapping(value="/workRoadLoading")
	public ModelAndView workRoadLoading(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/common/workRoadLoading");
	}

	
	/**
	 * 통계주제도 iframe 화면 04
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapFrame04")
	public ModelAndView thematicMapFrame04(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/mapSample/thematicMapFrame04");
	}
	
	@RequestMapping(value="/excelDown",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getExcelFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HSSFWorkbook book = null;
		OutputStream out = null;
		try{
			
			book = new HSSFWorkbook();
			HSSFSheet sheet = book.createSheet();
			
			String[] excelDataArr = request.getParameterValues("excelData");
			
			ArrayList makeData =  new ArrayList();
			//System.out.println("Type : request.getCharcterEncoding() " + request.getCharacterEncoding());
			//System.out.println("Type : reponse.getCharcterEncoding() " + response.getCharacterEncoding());
			for (String excelData : excelDataArr) {
				String[] tempData = excelData.toString().split(",");
				ArrayList rowData = new ArrayList();
				for (String data : tempData) {
					//운영
					rowData.add(new String(data.getBytes("UTF-8"), "UTF-8"));
					//로컬
					//rowData.add(new String(data.getBytes("iso-8859-1"), "UTF-8"));
				}
				makeData.add(rowData);
			}
			
			int value = 999999;
			int value2 = 999999;
			for (int i =0; i < makeData.size();i++){
				
				HSSFCell cell = null;
				HSSFRow row = null;
				row = sheet.createRow(i);
				ArrayList rowList = (ArrayList) makeData.get(i);
				for(int j = 0; j < rowList.size(); j++){
					cell = row.createCell(j);
					if(i==0 && "값".equals(rowList.get(j).toString())){
						value = j;
					}else if(i == 0 && "비율(%)".equals(rowList.get(j).toString())){
						value2 = j;
					}
					if(rowList.get(j)==null){
						cell.setCellValue("");
					}else if(i!= 0 && value == j){
						cell.setCellValue( Double.parseDouble(rowList.get(j).toString()));
					}else if (i != 0 && value2 == j){
						cell.setCellValue(Double.parseDouble(rowList.get(j).toString()));
					}else{
						cell.setCellValue(rowList.get(j).toString());
					}
					
				}
			}
			
			response.setContentType("application/vnd.ms-excel; charset=UTF-8");
			String userAgent = request.getHeader("User-Agent");
			
			String filename = "데이터_보기.xls";
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

		}catch(IOException e){
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);			
		}finally{
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