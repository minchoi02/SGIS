package kostat.sop.ServiceAPI.api.excel;

import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.utils.StrUtil;

import kostat.sop.ServiceAPI.api.excel.mapper.ExcelDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: AddBoard
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月3日 下午5:20:17    
 * @version V1.0      
 *    
 */
public class GetRELStatExcel extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetRELStatExcel.class);
	@Resource
	private ExcelDao excelDao;
	@Override
	public String getApiId() {
		return "excel_getrelstatexcel";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {	
			Map paramMap = getParameterMap(req);
			Map mapResult = new HashMap<String, Object>();
			String fileName = "검색어통계현황"+(String)paramMap.get("STARTDATE")+"~"+(String)paramMap.get("ENDDATE")+".xls";
			RequestUtil.transSearchDate(paramMap);
			List<Map> listA = excelDao.getSearchArea(paramMap);
			List<Map> listB = excelDao.getSearchWord(paramMap);
			
			mapResult.put("filename", StrUtil.encodeURL(fileName,"UTF-8"));
			mapResult.put("workbook",exportTable(listA,listB));
			return mapResult;
		}  catch (AbsAPIException e) {
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
	private enum MustParam{
		STARTDATE,ENDDATE,TIMETYPE
	}
	private enum OptionParam{
		SEARCH_WORD,SEARCH_AREA
	}
	public HSSFWorkbook exportTable(List<Map> listA,List<Map> listB)
	{			
		int index =0;
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet("WorkSheet1");
		sheet.setDefaultColumnWidth(10);
		HSSFCellStyle style = wb.createCellStyle();
		HSSFCellStyle style1 = wb.createCellStyle();
		style1.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);
		style1.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		HSSFFont font = wb.createFont();
		font.setFontHeightInPoints((short) 12);
		style.setFont(font);
		HSSFRow row = sheet.createRow(0);
		HSSFCell cell = row.createCell(0);
		cell.setCellValue("순위");
		cell.setCellStyle(style);
		cell = row.createCell(1);
		cell.setCellValue("검색지역 ");
		cell.setCellStyle(style);
		cell = row.createCell(2);
		cell.setCellValue("건수");
		cell.setCellStyle(style);
		cell = row.createCell(3);
		cell.setCellValue(" ");
		cell.setCellStyle(style);
		cell = row.createCell(4);
		cell.setCellValue("순위");
		cell.setCellStyle(style);
		cell = row.createCell(5);
		cell.setCellValue("검색어");
		cell.setCellStyle(style);
		cell = row.createCell( 6);
		cell.setCellValue("건수");
		int indexTemp=0;
		int listASize=listA.size();
		int listBSize=listB.size();
		if(listASize>=listBSize)
		{
			for (int i = 0; i < listA.size(); i++)
			{
				row = sheet.createRow((int) i +1);
				Map ListAMap = (Map) listA.get(i);
				row.createCell(0).setCellValue(ListAMap.get("R").toString());
				row.createCell(1).setCellValue(ListAMap.get("SEARCH_AREA").toString());
				row.createCell(2).setCellValue(ListAMap.get("CNT").toString());
			}
			for (int i = 0; i < listB.size(); i++)
			{
				row = sheet.getRow((int) i +1);
				Map ListBMap = (Map) listB.get(i);
				row.createCell(4).setCellValue(ListBMap.get("R").toString());
				row.createCell(5).setCellValue(ListBMap.get("SEARCH_WORD").toString());
				row.createCell(6).setCellValue(ListBMap.get("CNT").toString());
			}
		}else{
			for (int i = 0; i < listB.size(); i++)
			{
				row = sheet.createRow((int) i +1);
				Map ListBMap = (Map) listB.get(i);
				row.createCell(4).setCellValue(ListBMap.get("R").toString());
				row.createCell(5).setCellValue(ListBMap.get("SEARCH_WORD").toString());
				row.createCell(6).setCellValue(ListBMap.get("CNT").toString());
			}
			for (int i = 0; i < listA.size(); i++)
			{
				row = sheet.getRow((int) i +1);
				Map ListAMap = (Map) listA.get(i);
				row.createCell(0).setCellValue(ListAMap.get("R").toString());
				row.createCell(1).setCellValue(ListAMap.get("SEARCH_AREA").toString());
				row.createCell(2).setCellValue(ListAMap.get("CNT").toString());
			}
		}
		
		return wb;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "엑셀다운";
	}

}
