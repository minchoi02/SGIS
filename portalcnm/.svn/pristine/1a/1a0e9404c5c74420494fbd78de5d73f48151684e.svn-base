package kostat.sop.ServiceAPI.api.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


public class StstisticsUtils {

	public static HashMap<String, Object> extend(HashMap<String, Object> target1 , HashMap<String, Object> target2) {
		if(target2 == null) target2 = new HashMap<>();
		if(target1 == null) target1 = new HashMap<>();
		for(String key : target2.keySet()) {
			if(target1.get(key) == null) {
				target1.put(key , target2.get(key));
			}
		}
		return target1;
	}
	
	/**
	 * @param paraMap
	 * @param totalCount
	 * @comment 페이징 정보를 반환 합니다.
	 */
	public static void pageOperation(HashMap<String, Object> paraMap , int totalCount) {
		StstisticsPaging paging = new StstisticsPaging();
		paging.setPageNo(paraMap.get("pageNo") != null ? Integer.parseInt((String)paraMap.get("pageNo")) : 1);
        paging.setTotalCount(totalCount);
        paraMap.put("paging" , paging);
	}
	
	/**
	 * @param paraMap
	 * @return
	 * @comment 셋션 값의 아이디를 넘어온 HashMap에 반환 합니다.
	 */
	public static HashMap<String, Object> addSessionMap(HashMap<String, Object> paraMap ) {
		String user_id = (String)getRequest().getSession().getAttribute("manager_id");
		paraMap.put("regManagerId" , user_id);
		paraMap.put("modManagerId" , user_id);
		return paraMap;
	}
	
	/**
	 * @return
	 * @comment request 객체를 반환 합니다.
	 */
	public static HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}
	
	/**
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 * @comment MultipartHttpServletRequest객체에서 파라미터를 읽어 HashMap 형태로 반환 합니다.
	 */
	public static HashMap<String, Object> convertRequestToMap(MultipartHttpServletRequest request) throws UnsupportedEncodingException{
		HashMap<String, Object> resultMap = new HashMap<String,Object>();
		Enumeration<String> e = request.getParameterNames(); 
		while(e.hasMoreElements()){
			String name = e.nextElement();
			resultMap.put(name , new String(request.getParameter(name).getBytes("8859_1") , "UTF-8"));
		}
		return resultMap;
	}
	
	/**
	 * @param request
	 * @return
	 * @throws IOException
	 * @comment 객체에서 파일을 파싱해 FileInputStream객체와 fileName을 HashMap 형태로 반환 합니다.
	 */
	@SuppressWarnings("unused")
	public static HashMap<String, Object> excelParse(MultipartHttpServletRequest request) throws IOException {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		FileInputStream fis = null;
		Iterator<String> itr =  request.getFileNames();
		if(itr.hasNext()) {
        	List<MultipartFile> mpf = request.getFiles(itr.next());
            for(int i = 0; i < mpf.size(); i++) {
            	resultMap.put("stream" , (FileInputStream) mpf.get(i).getInputStream());
            	resultMap.put("name" , new String(mpf.get(i).getOriginalFilename().getBytes("8859_1") , "UTF-8"));
            }
        }
		return resultMap;
	}
	
	/**
	 * @param request
	 * @return
	 * @throws IOException
	 * @comment 객체에서 파일을 파싱해 FileInputStream객체와 fileName을 HashMap 형태로 반환 합니다.
	 */
	@SuppressWarnings("unused")
	public static List<HashMap<String, Object>> excelDataParse(Workbook wb) throws IOException {
		List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		HashMap<String , Object> resultMap;
		Sheet sheet = wb.getSheetAt(0);
		int rows = sheet.getPhysicalNumberOfRows();
		int numOfCells = 0;
		System.out.println("rows = " + rows);
		for (int rowIndex = 1; rowIndex < rows; rowIndex++) {
			Row row = sheet.getRow(rowIndex); // 각 행을 읽어온다
            if (row != null) {
            	resultMap = new HashMap<>();
                int cells = row.getPhysicalNumberOfCells();
                System.out.println("cells = " + cells);
                for (int columnIndex = 0; columnIndex <= cells -1; columnIndex++) {
                    Cell cell = row.getCell(columnIndex); // 셀에 담겨있는 값을 읽는다.
                    String value = "";
                    switch (cell.getCellType()) { // 각 셀에 담겨있는 데이터의 타입을 체크하고 해당 타입에 맞게 가져온다.
                    case Cell.CELL_TYPE_NUMERIC:
                        value = cell.getNumericCellValue() + "";
                        break;
                    case Cell.CELL_TYPE_STRING:
                        value = cell.getStringCellValue() + "";
                        break;
                    case Cell.CELL_TYPE_BLANK:
                        value = cell.getBooleanCellValue() + "";
                        break;
                    case Cell.CELL_TYPE_ERROR:
                        value = cell.getErrorCellValue() + "";
                        break;
                    }
                    System.out.println(value);
                    resultMap.put("column" +columnIndex , value);
                }
                list.add(resultMap);
            }
		}
		return list;
	}
	
	/**
	 * @param fis
	 * @param filePath
	 * @return
	 * @throws IOException 
	 * @comment 엑셀을 FileInputStream객체에서 읽어 리턴 합니다.
	 */
	public static Workbook getWorkbook(FileInputStream fis , String filePath) throws IOException {
		Workbook wb = null;
        if(filePath.toUpperCase().endsWith(".XLS")) return new HSSFWorkbook(fis);
        else if(filePath.toUpperCase().endsWith(".XLSX")) return new XSSFWorkbook(fis);
		return wb;
	}
	
	/**
	 * @param request
	 * @return
	 * @throws IOException
	 * @comment 파일을 업로드 합니다.
	 */
	public static HashMap<String, Object> fileUpload(MultipartHttpServletRequest request) throws IOException {
		Iterator<String> itr =  request.getFileNames();
		String path = getRequest().getServletContext().getRealPath("/upload/ststistics/");
		HashMap<String, Object> resultMap = new HashMap<String,Object>();
		UUID uuid = UUID.randomUUID();
		Date today = new Date();
		SimpleDateFormat datetime = new SimpleDateFormat("yyyyMMddhhmmss");
		File pathFile = new File(path , new SimpleDateFormat("yyyyMMdd").format(today));
		if(!pathFile.exists())pathFile.mkdirs();
		try {
			if(itr.hasNext()) {
	        	List<MultipartFile> mpf = request.getFiles(itr.next());
	            for(int i = 0; i < mpf.size(); i++) {
	            	String oriFileNm = new String(mpf.get(i).getOriginalFilename().getBytes("8859_1") , "UTF-8");
	            	String saveName = uuid + datetime.format(today) + oriFileNm.substring(oriFileNm.lastIndexOf("."));
	                File file = new File(pathFile.toString() , saveName);
	                resultMap.put("pathNm", pathFile.toString() + File.separator);
	                resultMap.put("saveFileNm", saveName);
	                resultMap.put("oriFileNm", oriFileNm);
	                mpf.get(i).transferTo(file);
	            }
	        }
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
	}

}
