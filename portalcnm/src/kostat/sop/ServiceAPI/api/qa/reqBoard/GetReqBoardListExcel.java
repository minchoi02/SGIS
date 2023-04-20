package kostat.sop.ServiceAPI.api.qa.reqBoard;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.qa.reqBoard.mapper.ReqBoardDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.utils.StrUtil;

/**   
 *
 * @ClassName: GetReqBoardListExcel
 * @Description： 
 *
 * @author jrj  
 * @date：2018.02.06    
 * @version V1.0      
 *     
다운 */
public class GetReqBoardListExcel extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetReqBoardListExcel.class);

	@Resource
	private ReqBoardDao reqBoardDao;
	
	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
				Map mapResult = new HashMap<String, Object>();
				Map paramMap = getParameterMap(req);
				
				List listX= new ArrayList();
				List listY= new ArrayList();
				
				String dt = paramMap.get("REQ_STARTDATE").toString() + "~" + paramMap.get("REQ_ENDDATE").toString();
				String filename = "작업요청목록" + dt + ".xls";
				
				paramMap.put("EXCEL_YN", "Y");
				List list = reqBoardDao.searchReqBoard( paramMap );
				
			    mapResult.put("filename", StrUtil.encodeURL( filename, "UTF-8" ) );
				mapResult.put("workbook", exportTable( list ) );
				
				return mapResult;
				
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	
	private enum MustParam {
		
	}

	private enum OptionParam {
		REQ_DIV_CD, REQ_PRGRS_STATS_CD, REQ_STARTDATE, REQ_ENDDATE, searchWordType, searchWord, sort, order, pageNumber
	}
	
	@Override
	public String getApiId() {
		return "excel_getreqboardlist";
	}
	
	public HSSFWorkbook exportTable( List list ){
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet("sheet1");
		sheet.setColumnWidth(1, 10000);
		sheet.setColumnWidth(3, 4000);
		sheet.setColumnWidth(5, 4000);
		
//		HSSFFont font = wb.createFont();
//		font.setFontHeightInPoints((short) 12);
		
//		HSSFCellStyle style = wb.createCellStyle();
//		style.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);
//		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
//		style.setFont(font);
		
		HSSFCell cell = null; 
		HSSFRow row = sheet.createRow(0);
		row.createCell(0).setCellValue("순번");
		row.createCell(1).setCellValue("제목");
		row.createCell(2).setCellValue("작업구분");
		row.createCell(3).setCellValue("진행상태");
		row.createCell(4).setCellValue("작성자");
		row.createCell(5).setCellValue("요청일");
		row.createCell(6).setCellValue("접수자");
		row.createCell(7).setCellValue("접수일");
		row.createCell(8).setCellValue("변경요청자");
		row.createCell(9).setCellValue("변경요청일");
		row.createCell(10).setCellValue("변경후요청일");
		row.createCell(11).setCellValue("진행자");
		row.createCell(12).setCellValue("진행일");
		row.createCell(13).setCellValue("작업자");
		row.createCell(14).setCellValue("확인요청일");
		row.createCell(15).setCellValue("재확인요청일");
		row.createCell(16).setCellValue("완료일");
		
		for (int i = 0; i < list.size(); i++) {
			Map map = (Map) list.get(i);
			row = sheet.createRow( i+1 );
			row.createCell(0).setCellValue( i+1 );
			row.createCell(1).setCellValue( isNullValue(map.get("REQ_TITLE")) );
			row.createCell(2).setCellValue( isNullValue(map.get("REQ_DIV_CD_NM")) );
			row.createCell(3).setCellValue( isNullValue(map.get("REQ_PRGRS_STATS_CD_NM")) );
			row.createCell(4).setCellValue( isNullValue(map.get("REQ_USER_NM")) );
			row.createCell(5).setCellValue( isNullValue(map.get("REQ_DT")) );
			row.createCell(6).setCellValue( isNullValue(map.get("RECV_USER_NM")) );
			row.createCell(7).setCellValue( isNullValue(map.get("RECV_DT")) );
			row.createCell(8).setCellValue( isNullValue(map.get("MOD_REQ_USER_NM")) );
			row.createCell(9).setCellValue( isNullValue(map.get("MOD_REQ_DT")) );
			row.createCell(10).setCellValue( isNullValue(map.get("MOD_AFTER_REQ_DT")) );
			row.createCell(11).setCellValue( isNullValue(map.get("PRGRS_USER_NM")) );
			row.createCell(12).setCellValue( isNullValue(map.get("PRGRS_DT")) );
			row.createCell(13).setCellValue( isNullValue(map.get("WORK_USER_NM")) );
			row.createCell(14).setCellValue( isNullValue(map.get("WORK_COMPLETE_DT")) );
			row.createCell(15).setCellValue( isNullValue(map.get("RE_REQ_DT")) );
			row.createCell(16).setCellValue( isNullValue(map.get("COMPLETE_DT")) );
		}
		
		return wb;
	}
	
	public String isNullValue( Object obj ){
		return ( obj == null ? "" : obj.toString() );
	}
	
	public String getWorkNm() {
		return "엑셀다운";
	}
}
