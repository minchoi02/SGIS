package kostat.sop.ServiceAPI.api.dt.workRoadCodeInfo;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.workRoadCodeInfo.mapper.WorkRoadCodeInfoDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 * 
 * @ClassName: ExcelWorkRoadCodeInfo
 * @Description：일자리 코드정보 엑셀다운로드
 * 
 * @author 곽제욱
 * @date：2020.05.12    
 * @version V1.0      
 *     
 */
public class ExcelWorkRoadCodeInfo extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(ExcelWorkRoadCodeInfo.class);
	
	@Resource
	private WorkRoadCodeInfoDao workRoadCodeInfoDao;
	
	@Override
	public String getApiId() {
		return "workroadcode_excel";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		//httpSession = req.getSession();
		
		Map resultData = new HashMap();
		
		//파일 다운로드
		FileInputStream fis = null;
		OutputStream out = null;
		FileOutputStream outFile = null;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			
			// 데이터 헤더
			List<String> list_header = new ArrayList<>();
			list_header.add("번호");
			list_header.add("분류코드");
			list_header.add("분류코드명");
			list_header.add("상세코드");
			list_header.add("상세코드명");
			list_header.add("설명");
			
			// 데이터 컬럼명
			List<String> list_column = new ArrayList<>();
			list_column.add("ROW_NUM");
			list_column.add("B_CLASS_CD");
			list_column.add("B_CLASS_CD_NM");
			list_column.add("S_CLASS_CD");
			list_column.add("S_CLASS_CD_NM");
			list_column.add("CD_EXP");
			
			// 데이터 목록
			List dataList = (List) workRoadCodeInfoDao.searchWorkRoadCodeInfo(mapParameter).get("rows");
			
			XSSFRow row;
			XSSFCell cell;
			
			XSSFWorkbook workbook = new XSSFWorkbook();
			XSSFSheet sheet = workbook.createSheet("Sheet1");		//Sheet명 설정
			
			// 엑셀 스타일
			// 해더 셀 스타일
			CellStyle cellStyleHeader = workbook.createCellStyle();
			cellStyleHeader.setFillForegroundColor(IndexedColors.SEA_GREEN.getIndex());
			cellStyleHeader.setFillPattern(CellStyle.SOLID_FOREGROUND);
			//cellStyleHeader.setWrapText(true); //(개행 "\n" 허용)
			cellStyleHeader.setAlignment(CellStyle.VERTICAL_CENTER);
			cellStyleHeader.setVerticalAlignment(CellStyle.ALIGN_CENTER);
			cellStyleHeader.setBorderTop(CellStyle.BORDER_THIN);
			cellStyleHeader.setBorderLeft(CellStyle.BORDER_THIN);
			cellStyleHeader.setBorderRight(CellStyle.BORDER_THIN);
			cellStyleHeader.setBorderBottom(CellStyle.BORDER_THIN);
			cellStyleHeader.setTopBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleHeader.setLeftBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleHeader.setRightBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleHeader.setBottomBorderColor(IndexedColors.BLACK.getIndex());

			// 내용 셀 스타일(좌측정렬)
			CellStyle cellStyleL = workbook.createCellStyle();
			//cellStyleL.setWrapText(true); //(개행 "\n" 허용)
			cellStyleL.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
			cellStyleL.setAlignment(CellStyle.ALIGN_LEFT);
			cellStyleL.setBorderTop(CellStyle.BORDER_THIN);
			cellStyleL.setBorderLeft(CellStyle.BORDER_THIN);
			cellStyleL.setBorderRight(CellStyle.BORDER_THIN);
			cellStyleL.setBorderBottom(CellStyle.BORDER_THIN);
			cellStyleL.setTopBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleL.setLeftBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleL.setRightBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleL.setBottomBorderColor(IndexedColors.BLACK.getIndex());
			
			// 내용 셀 스타일(중앙정렬)
			CellStyle cellStyleC = workbook.createCellStyle();
			//cellStyleC.setWrapText(true); //(개행 "\n" 허용)
			cellStyleC.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
			cellStyleC.setAlignment(CellStyle.ALIGN_CENTER);
			cellStyleC.setBorderTop(CellStyle.BORDER_THIN);
			cellStyleC.setBorderLeft(CellStyle.BORDER_THIN);
			cellStyleC.setBorderRight(CellStyle.BORDER_THIN);
			cellStyleC.setBorderBottom(CellStyle.BORDER_THIN);
			cellStyleC.setTopBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleC.setLeftBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleC.setRightBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleC.setBottomBorderColor(IndexedColors.BLACK.getIndex());
			
			// 내용 셀 스타일(우측정렬)
			CellStyle cellStyleR = workbook.createCellStyle();
			//cellStyleR.setWrapText(true); //(개행 "\n" 허용)
			cellStyleR.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
			cellStyleR.setAlignment(CellStyle.ALIGN_RIGHT);
			cellStyleR.setBorderTop(CellStyle.BORDER_THIN);
			cellStyleR.setBorderLeft(CellStyle.BORDER_THIN);
			cellStyleR.setBorderRight(CellStyle.BORDER_THIN);
			cellStyleR.setBorderBottom(CellStyle.BORDER_THIN);
			cellStyleR.setTopBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleR.setLeftBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleR.setRightBorderColor(IndexedColors.BLACK.getIndex());
			cellStyleR.setBottomBorderColor(IndexedColors.BLACK.getIndex());
			
			//헤더
			row = sheet.createRow(0);	//출력 row 생성
			int headI = 0;
			for (String string_header : list_header) {
				cell = row.createCell(headI++);
				cell.setCellStyle(cellStyleHeader);
				cell.setCellValue(string_header);
			}
			
			//목록
			for(int i=0; i<dataList.size(); i++) {
				row = sheet.createRow(i+1);
				Map dataMap = (Map)dataList.get(i);
				int bodyI = 0;
				for (String string_column : list_column) {
					cell = row.createCell(bodyI++);
					cell.setCellStyle(cellStyleL);
					cell.setCellValue(StringUtil.isNullToString(dataMap.get(string_column)));
				}
			}
			
			//셀 넓이 설정
			for(int i = 0; i < headI; i ++) {
				if(i == 0) sheet.setColumnWidth(i, 1500);
				else if(i == 1) sheet.setColumnWidth(i, 5000);
				else if(i == 2) sheet.setColumnWidth(i, 2000);
				else if(i == 3) sheet.setColumnWidth(i, 5000);
				else if(i == 4) sheet.setColumnWidth(i, 5000);
				else if(i == 5) sheet.setColumnWidth(i, 5000);
				else if(i == 6) sheet.setColumnWidth(i, 3500);
				else sheet.setColumnWidth(i, 3000);
			}
			
			//파일명
			String excelFileName = "일자리_코드정보_집계.xlsx";
			excelFileName = URLEncoder.encode(excelFileName, "utf-8");
			
			//바로 다운로드 처리(안함)
			/*
			String userAgent = req.getHeader("User-Agent");
			boolean isIe = userAgent.indexOf("MSIE") != -1;
			if (isIe) {
				excelFileName = URLEncoder.encode(excelFileName, "utf-8");
			} else {
				excelFileName = new String(excelFileName.getBytes("utf-8"));
			}
			*/
			/*
			res.setHeader("Content-Disposition", "attachment; filename=\"" + excelFileName + "\";");
			res.setHeader("Content-Transfer-Encoding", "binary");
			//response.setContentLength((int) downloadFile.length());
			
			out = res.getOutputStream();
			workbook.write(out);
			out.flush();
			*/
			
			//리턴 변수에 담아서 처리
			resultData.put("filename", excelFileName);
			resultData.put("workbook", workbook);
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {
			try {
				if (fis != null) fis.close();
				if (out != null) out.close();
				if (outFile != null) outFile.close();
			} catch (IOException e) {
				logger.error(e);
			}
		}
		
		return resultData;
	}
	
	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	
	private enum MustParam{
	}
	
	private enum OptionParam{
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "엑셀";
	}
}
