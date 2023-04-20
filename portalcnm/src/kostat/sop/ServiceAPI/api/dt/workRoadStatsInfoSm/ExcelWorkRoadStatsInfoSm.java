package kostat.sop.ServiceAPI.api.dt.workRoadStatsInfoSm;

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

import kostat.sop.ServiceAPI.api.dt.workRoadStatsInfoSm.mapper.WorkRoadStatsInfoSmDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 * 
 * @ClassName: ExcelWorkRoadStatsInfoSm
 * @Description：일자리 통계정보 집계 엑셀
 * 
 * @author 김남민
 * @date：2019.07.31    
 * @version V1.0      
 *     
 */
public class ExcelWorkRoadStatsInfoSm extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(ExcelWorkRoadStatsInfoSm.class);
	
	@Resource
	private WorkRoadStatsInfoSmDao workRoadStatsInfoSmDao;
	
	@Override
	public String getApiId() {
		return "workroadstatsinfosm_excel";
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
			list_header.add("등록ID");
			list_header.add("연계ID");
			list_header.add("메뉴명"); // 2020-07-22 [곽제욱] 필드 추가
			list_header.add("수급자료명");
			list_header.add("수집출처");
			list_header.add("표출단위"); // 2020-07-22 [곽제욱] 필드 추가
			list_header.add("KOSIS 연계여부"); // 2020-07-22 [곽제욱] 필드 추가
			list_header.add("접속URL");
			list_header.add("접속PORT");
			list_header.add("접속승인키");
			list_header.add("통계표명"); // 2020-07-22 [곽제욱] 필드 추가
			list_header.add("통계표정보"); // 2020-07-22 [곽제욱] 필드 추가
			list_header.add("KOSIS외 자료연계방법"); // 2020-07-22 [곽제욱] 필드 추가
			list_header.add("참조URL"); // 2020-07-22 [곽제욱] 필드 추가
			list_header.add("갱신주기");
			list_header.add("사용여부");
			list_header.add("최근수정일자"); // 2020-07-22 [곽제욱] 필드 추가
			
			// 데이터 컬럼명
			List<String> list_column = new ArrayList<>();
			list_column.add("ROW_NUM");
			list_column.add("REG_ID");
			list_column.add("LINK_ID");
			list_column.add("STAT_PATH"); // 2020-07-22 [곽제욱] 필드 추가
			list_column.add("LINK_NM");
			list_column.add("COLCT_SOURCE");
			list_column.add("DISP_TYPE"); // 2020-07-22 [곽제욱] 필드 추가
			list_column.add("LINK_YN"); // 2020-07-22 [곽제욱] 필드 추가
			list_column.add("CONECT_URL");
			list_column.add("CONECT_PORT");
			list_column.add("CONECT_CONFM_KEY");
			list_column.add("STAT_NM"); // 2020-07-22 [곽제욱] 필드 추가
			list_column.add("STAT_INFO"); // 2020-07-22 [곽제욱] 필드 추가
			list_column.add("ETC_LINK_MTH"); // 2020-07-22 [곽제욱] 필드 추가
			list_column.add("REFRN_URL"); // 2020-07-22 [곽제욱] 필드 추가
			list_column.add("UPDT_CYCLE");
			list_column.add("USE_YN");
			list_column.add("MOD_DT"); // 2020-07-22 [곽제욱] 필드 추가
			
			// 데이터 목록
			List dataList = (List) workRoadStatsInfoSmDao.searchWorkRoadStatsInfoSm(mapParameter).get("rows");
			
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
			String excelFileName = "일자리_통계정보_집계.xlsx";
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
