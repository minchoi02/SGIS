package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import kostat.sop.ServiceAPI.api.common.CustomObjectMapper;
import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

/**
 * @author 	djlee
 * @date	2019-07-10
 * @comment	공통
 */
@Controller
public class StstisticsUSCommonMngController {

	@Resource
	private StstisticsCommonDao dao;
	
	public static final String PATH = "\\sgis\\workspace2\\portalcnm\\WebContent\\upload\\ststistics\\";
	
	@Resource(name="downloadView")
    private View downloadView;

	/**
	 * @param paramMap
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 * @comment 엑셀을 다운로드 합니다.
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/excelTempleteDownLoad.do")
	public ModelAndView  excelTempleteDownLoad(@RequestParam HashMap<String, Object> paramMap) throws JsonParseException, JsonMappingException, IOException 	{
		 ModelAndView mav = new ModelAndView();
		 mav.setView(this.downloadView);
		 String path = StstisticsUtils.getRequest().getServletContext().getRealPath("upload/ststistics/excel");
		 String type = (String)paramMap.get("type");
		 String sample = "";
		 if(type.equals("lifeCycle")) {
			 sample =  "lifeCycleSample.xlsx";
		 }else if(type.equals("interests")) {
			 sample =  "interestsSample.xlsx";
		 }else if(type.equals("keyWord")) {
			 sample =  "keyWordSample.xlsx";
		 }else if(type.equals("subKeyWord")) {
			 sample =  "subKeyWordSample.xlsx";
		 }else if(type.equals("data")) {
			 sample =  "dataSample.xlsx";
		 }
		 File downloadFile = new File(path , sample);
		 mav.addObject("path", path);
		 mav.addObject("downloadFile", downloadFile);
		 return mav;
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/excelDataDownLoad.do")
	public ModelAndView  excelDataDownLoad(@RequestParam HashMap<String, Object> paramMap) throws JsonParseException, JsonMappingException, IOException 	{
		ModelAndView mav = new ModelAndView("excelView");
	    Map<String, Object> dataMap = new HashMap<String, Object>();
	    String type = (String)paramMap.get("type");
	    String filename = "";
	    String[] columnArr = null;
	    String[] columnVarArr = null;
	    List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
	    
	    //2020년 SGIS고도화 3차 시작
	    //List<HashMap<String, Object>> list = dao.select("ststisticsCmmn.getExcelDownload",paramMap);
	    if(type.equals("accumulateKeyWord")) {
	    	list = dao.select("ststisticsCmmn.getAccKwrdExcelDownload",paramMap);
	    }else {
	    	list = dao.select("ststisticsCmmn.getExcelDownload",paramMap);
	    }
	  //2020년 SGIS고도화 3차 끝
	    if(type.equals("lifeCycle")) {
		    filename = "생애주기 게시물 목록";
		    columnArr = new String[]{"생애주기아이디", "생애주기명", "사용여부", "표출순위", "경로명", "아이콘설명", "저장파일이름", "원본파일이름", "등록일시", "등록관리자ID", "수정일시", "수정관리자ID"};
		    columnVarArr = new String[]{"lfeCycleId", "lfeCycleNm", "useYn", "dispRank", "pathNm", "iconExp", "saveFileNm", "oriFileNm", "regTs", "regManagerId", "modTs", "modManagerId"};
	    }else if(type.equals("interests")) {
		    filename = "통계거리 게시물 목록";
		    columnArr = new String[]{"통계거리아이디", "통계거리명", "사용여부", "표출순위", "경로명", "아이콘설명", "저장파일이름", "원본파일이름", "등록일시", "등록관리자ID", "수정일시", "수정관리자ID"};
		    columnVarArr = new String[]{"statDstncId", "statDstncNm", "useYn", "dispRank", "pathNm", "iconExp", "saveFileNm", "oriFileNm", "regTs", "regManagerId", "modTs", "modManagerId"};
	    }else if(type.equals("keyWord")) {
		    filename = "키워드 게시물 목록";
		    columnArr = new String[]{"메인키워드일련번호","메인키워드명", "사용여부", "등록일시","등록관리자ID","수정일시","수정관리자ID"};
		    columnVarArr = new String[]{"ctlgMainKwrdSerial", "ctlgMainKwrd", "useYn", "regTs","regManagerId","modTs","modManagerId"};
	    }else if(type.equals("subKeyWord")) {
		    filename = "서브키워드 게시물 목록";
		    columnArr = new String[]{"유사키워드일련번호","유사키워드명", "사용여부", "등록일시","등록관리자ID","수정일시","수정관리자ID"};
		    columnVarArr = new String[]{"ctlgSubKwrdSerial", "ctlgSubKwrd", "useYn", "regTs","regManagerId","modTs","modManagerId"};
	    }else if(type.equals("accumulateKeyWord")) {
		    filename = "누적키워드 게시물 목록";
		    columnArr = new String[]{"시도코드","시도명", "시군구코드","시군구명", "읍면동코드", "읍면동명", "누적키워드","누적횟수"};
		    columnVarArr = new String[]{"sidoCd", "sidoNm", "sggCd", "sggNm", "emdongCd", "emdongNm", "accKwrd", "accCnt"};
	    }else if(type.equals("data")) {
		    filename = "서비스 게시물 목록";
		    columnArr = new String[]{"통계자료코드", "통계자료명", "서비스명", "메뉴명", "대분류명", "중분류명", "세분류명", "출처", "기준년도", "통계데이터기준년도", "갱신주기", "시도표출여부", "시군구표출여부", "읍면동표출여부", "집계구표출여부", "격자표출여부", "색상지도표출여부", "버블지도표출여부", "열지도표출여부", "POI지도표출여부", "서비스여부", "순위", "통계자료설명","통계자료부가설명", "등록일시", "등록관리자ID", "수정일시", "수정관리자ID", "설명관련테이블", "설명관련컬럼", "설명관련아이디", "누적횟수"};
		    columnVarArr = new String[]{"statDataId","statDataNm","srvNm","menuNm","BClassNm","MClassNm","SClassNm","source","baseYear","statDataBaseYear","updtPeriod","sidoDispYn","sggDispYn","emdongDispYn","totRegDispYn","gridDispYn","colorDispYn","ballnDispYn","tpDispYn","poiDispYn","srvYn","rank","statDataExp","statDataAddExp","regTs","regManagerId","modTs","modManagerId","expRelTb","expRelCol","expRelId","accCnt"};
		    	    
	    }
	    dataMap.put("columnArr", columnArr);
	    dataMap.put("columnVarArr", columnVarArr);
	    dataMap.put("sheetNm", "게시물 목록");    
	    dataMap.put("list", list);
	    mav.addObject("dataMap", dataMap);
	    mav.addObject("filename", filename);
	    return mav;
	}
	
	/**
	 * @comment	생애주기 맵핑 등록.
	 * @param 	paramMap
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/interestsMappingStstisticsUSMng.do")
	public HashMap<String, Object> interestsMappingStstisticsUSMng(@RequestParam String parameter) throws JsonParseException, JsonMappingException, IOException 	{
		HashMap<String, Object> paramMap = new HashMap<String,Object>();
		parameter = StringEscapeUtils.unescapeHtml3(parameter);
		List<HashMap<String, Object>> list = CustomObjectMapper.getInstance().readValue(parameter,new TypeReference<List<HashMap<String, Object>>>() {});
		if(list != null && list.size() > 0) {
			String from = (String) list.get(0).get("from");
			paramMap.put("param" , list);
			//삭제된 데이터 삭제 처리
			dao.remove("ststisticsCmmn.removeMapping",paramMap);
			for(HashMap<String, Object> map  :list) {
				if("LifeCycle".equals(from) || "Interests".equals(from)) {
					if(dao.selectInt("ststisticsCmmn.checkMappingStstisticsUSCycleDstncMng", map) == 0) {
						paramMap.put("code",(dao.register("ststisticsCmmn.registerMappingCycleDstncMng", StstisticsUtils.addSessionMap(map)) < 1) ? -1 : 0);
					}
				}else if("KeyWord".equals(from) || "SubKeyWord".equals(from)) {
					if(dao.selectInt("ststisticsCmmn.checkMappingStstisticsUSMainSubMng", map) == 0) {
						paramMap.put("code",(dao.register("ststisticsCmmn.registerMappingMainSubMng", StstisticsUtils.addSessionMap(map)) < 1) ? -1 : 0);
					}
				}else if("MainKeyWord".equals(from)) {
					if(dao.selectInt("ststisticsCmmn.checkMappingStstisticsUSMainDataMng", map) == 0) {
						paramMap.put("code",(dao.register("ststisticsCmmn.registerMappingMainDataMng", StstisticsUtils.addSessionMap(map)) < 1) ? -1 : 0);
					}
				}else if("Datainterests".equals(from)) {
					if(dao.selectInt("ststisticsCmmn.checkMappingStstisticsUSDstncMng", map) == 0) {
						paramMap.put("code",(dao.register("ststisticsCmmn.registerMappingDstncMng", StstisticsUtils.addSessionMap(map)) < 1) ? -1 : 0);
					}
				}else if("Service".equals(from)) {
					if(dao.selectInt("ststisticsCmmn.checkMappingStstisticsUSMainDataMng", map) == 0) {
						paramMap.put("code",(dao.register("ststisticsCmmn.registerMappingMainDataMng", StstisticsUtils.addSessionMap(map)) < 1) ? -1 : 0);
					}
				}
			}
		}else {
			paramMap.put("code" , -1);
		}
		return paramMap;
	}
	
	/**
	 * @comment	생애주기 맵핑 목록 조회.
	 * @param 	paramMap
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSMappingDataMng.do")
	public HashMap<String, Object> getStstisticsUSMappingDataMng(@RequestParam HashMap<String, Object> paramMap) {
		String from = (String)paramMap.get("from");
		for(String key : paramMap.keySet()) {
			System.out.println("key = " + key + " , value = " + paramMap.get(key));
		}
		if("LifeCycle".equals(from) || "Interests".equals(from)|| "Datainterests".equals(from)) {
			paramMap.put("data",dao.select("ststisticsCmmn.getSrvDtCltgCycleDstnc" , paramMap));
		} else if("KeyWord".equals(from) || "SubKeyWord".equals(from)) {
			paramMap.put("data",dao.select("ststisticsCmmn.getSrvDtCtlgMainSubKwrd" , paramMap));
		} else if("MainKeyWord".equals(from) ) {
			paramMap.put("data",dao.select("ststisticsCmmn.getSrvDtCtlgMainKwrd" , paramMap));
		} else if("Service".equals(from)) {
			paramMap.put("data",dao.select("ststisticsCmmn.getSrvDtCtlgDataList" , paramMap));
		} 
		return paramMap;
	}
	
	/**
	 * @comment	생애주기 맵핑 목록 조회.
	 * @param 	paramMap
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@RequestMapping(value = "/api/ststistics/imageView.do")
	public void imageView(HttpServletRequest request , HttpServletResponse response) throws IOException {
	      // Get the absolute path of the image
	      String filename = request.getParameter("imageName");
	      // retrieve mimeType dynamically
	      String mime = request.getServletContext().getMimeType(filename);
	      if (mime == null) {
	    	  response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	        return;
	      }

	      response.setContentType(mime);
	      File file = new File(filename);
	      response.setContentLength((int)file.length());

	      FileInputStream in = new FileInputStream(file);
	      OutputStream out = response.getOutputStream();

	      // Copy the contents of the file to the output stream
	       byte[] buf = new byte[1024];
	       int count = 0;
	       while ((count = in.read(buf)) >= 0) {
	         out.write(buf, 0, count);
	      }
	    out.close();
	    in.close();
	}
	
	/**
	 * @comment	엑셀다운로드
	 * @param 	paramMap
	 * @return
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@RequestMapping(value="/api/ststistics/excelDown.do",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getExcelFile(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HSSFWorkbook book = null;
		OutputStream out = null;
		
		try{
			book = new HSSFWorkbook();
			HSSFSheet sheet = book.createSheet();
			
			String[] excelDataArr = request.getParameterValues("excelData");
			
			ArrayList makeData =  new ArrayList();
			
			for (String excelData : excelDataArr) {
				String[] tempData = excelData.toString().split(",");
				ArrayList rowData = new ArrayList();
				for (String data : tempData) {
					//운영
					//rowData.add(new String(data.getBytes("UTF-8"), "UTF-8"));
					//로컬
					rowData.add(new String(data.getBytes("iso-8859-1"), "UTF-8"));
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
					}else{
						cell.setCellValue( rowList.get(j).toString() );
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
            
		} catch(IOException e){
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
	//2020년 SGIS고도화 3차 시작
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/statusExcelDataDownLoad.do")
	public ModelAndView  statusExcelDataDownLoad(@RequestParam HashMap<String, Object> paramMap) throws JsonParseException, JsonMappingException, IOException 	{
		System.out.println(paramMap);
		ModelAndView mav = new ModelAndView("excelView");
	    Map<String, Object> dataMap = new HashMap<String, Object>();
	    String type = (String)paramMap.get("type");
	    String filename = "";
	    String[] columnArr = null;
	    String[] columnVarArr = null;
	    
	    List<HashMap<String, Object>> list = null;
	    
	    if(type.equals("service")) {
	    	 list = dao.select("ststisticsCmmn.getKwrdContentServiceExcelDownload",paramMap);
	    	
	    	 filename = "키워드 콘텐츠 현황 - 추천서비스";
	    	 columnArr = new String[]{"대표키워드", "대화형 통계지도", "살고싶은 우리동네", "기술업종 통계지도","생활업종 통계지도", "일자리맵", "정책통계지도", "통계주제도"};
			 columnVarArr = new String[]{"slctnKwrd", "emCnt", "lvbotCnt", "techbizCnt", "lvlhbizCnt", "wmCnt", "psmCnt", "tmCnt"};
	    }else if(type.equals("maptype")) {
	    	 list = dao.select("ststisticsCmmn.getKwrdContentMaptypeExcelDownload",paramMap);
	    	
	    	 filename = "키워드 콘텐츠 현황 - 지도유형";
	    	 columnArr = new String[]{"대표키워드", "전국", "시도", "시군구", "읍명동", "격자", "색상지도", "버블지도", "열지도", "POI"};
			 columnVarArr = new String[]{"slctnKwrd", "jeongugCnt", "sidoCnt", "sigunguCnt", "eupmyeondongCnt", "gyeogjaCnt", "colorCnt", "bubbleCnt", "heatCnt" ,"poiCnt"};
	    }else if(type.equals("lifecycle")) {
	    	 list = dao.select("ststisticsCmmn.getKwrdContentLifecycleExcelDownload",paramMap);
	    	
	    	 filename = "키워드 콘텐츠 현황 - 생애주기";
	    	 columnArr = new String[]{"대표키워드", "영유아/어린이", "청소년", "청년", "장년", "노년", "임신/출산/육아여성", "1인가구"};
			 columnVarArr = new String[]{"slctnKwrd", "infantChildCnt", "yngbgsCnt", "ygmnCnt", "adultCnt", "odsnCnt", "pccfCnt", "family1Cnt"};
	    }else if(type.equals("interests")) {
	    	 list = dao.select("ststisticsCmmn.getKwrdContentInterestsExcelDownload",paramMap);
	    	
	    	 filename = "키워드 콘텐츠 현황 - 통계거리";
	    	 columnArr = new String[]{"대표키워드", "먹거리", "살거리", "일거리", "탈거리", "배울거리", "보고놀거리", "건강거리", "안전거리"};
			 columnVarArr = new String[]{"slctnKwrd", "fdCnt", "houseCnt", "jobCnt", "trnsportCnt", "eduCnt", "plyCnt", "healthCnt", "safeCnt"};
	    }
	    
	    dataMap.put("columnArr", columnArr);
	    dataMap.put("columnVarArr", columnVarArr);
	    dataMap.put("sheetNm", "게시물 목록");    
	    dataMap.put("list", list);
	    mav.addObject("dataMap", dataMap);
	    mav.addObject("filename", filename);
	    return mav;
	}
	//2020년 SGIS고도화 3차 끝
}