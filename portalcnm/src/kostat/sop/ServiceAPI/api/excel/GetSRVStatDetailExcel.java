package kostat.sop.ServiceAPI.api.excel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.excel.mapper.ExcelDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFSimpleShape;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.utils.StrUtil;

/**   
 *
 * @ClassName: GetSRVStatDetailExcel
 * @Description： 
 *
 * @author dukechen   
 * @date：2014年11月18日 20:58:17    
 * @version V1.0      
 *    
 */
public class GetSRVStatDetailExcel extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetSRVStatDetailExcel.class);
	@Resource
	private ExcelDao excelDao;
	@Override
	public String getApiId() {
		return "excel_getsrvstatetailexcel";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			/*Map mapResult = new HashMap<String, Object>();
			Map paramMap = getParameterMap(req);
			String filename = "서비스통계현황"+(String)paramMap.get("STARTDATE")+"~"+(String)paramMap.get("ENDDATE")+".xls";
			RequestUtil.transSearchDate(paramMap);
			List<Map> list = excelDao.getSRVStatDetail(paramMap);
			mapResult.put("filename", StrUtil.encodeURL(filename, "UTF-8"));
			mapResult.put("workbook",exportTable(list));*/
			Map mapResult = new HashMap<String, Object>();
			List listX= new ArrayList();
			List listY= new ArrayList();
			Map paramMap = getParameterMap(req);
			String filename = "페이지상세통계"+(String)paramMap.get("STARTDATE")+"~"+(String)paramMap.get("ENDDATE")+".xls";
			logger.info("Data : "+ req.getParameter(MustParam.DATA.name()));
//			String DATA = req.getParameter(MustParam.DATA.name());
			String DATA =new String (req.getParameter(MustParam.DATA.name()).getBytes(("8859_1")),"utf-8");
			logger.info("getBtye change DATA : "+ new String (req.getParameter(MustParam.DATA.name()).getBytes(("8859_1")),"utf-8"));
			String [] temp1 = DATA.split("\\$");
			String xString[] = temp1[0].split(";");
			for(int i=1;i<xString.length;i++)
				listX.add(xString[i]);
			for (int i = 1; i < temp1.length; i++) 
				listY.add(temp1[i].split(";"));
		    mapResult.put("filename", StrUtil.encodeURL(filename, "UTF-8"));
			mapResult.put("workbook",exportTable(listX,listY));
			
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
		DATA,STARTDATE,ENDDATE
	}
	private enum OptionParam{
	}
	public HSSFWorkbook exportTable(List listX,List listY)
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
		HSSFFont font1 = wb.createFont();
		font1.setFontHeightInPoints((short) 7);
		style.setFont(font);
		style1.setFont(font1);
		HSSFRow row = sheet.createRow(0);
		HSSFCell cell = row.createCell(0);
		cell.setCellValue("타임              API명칭");
		cell.setCellStyle(style1);
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();  
        HSSFClientAnchor a = new HSSFClientAnchor(0, 0, 1023, 255, (short)0, 0, (short)0, 0);  
        HSSFSimpleShape shape1 = patriarch.createSimpleShape(a);  
        shape1.setShapeType(HSSFSimpleShape.OBJECT_TYPE_LINE);   
        shape1.setLineStyle(HSSFSimpleShape.LINESTYLE_SOLID) ;  
		
        for (int i = 0; i < listX.size(); i++)
		{
			String xVal = (String)listX.get(i);
			row.createCell(i+1).setCellValue(xVal);
		}
        for (int i = 0; i < listY.size(); i++)
		{
			row = sheet.createRow((int) i +1);
			String [] ListYMap = (String[]) listY.get(i);
			for(int t=0;t<ListYMap.length;t++)
			{
				row.createCell(t).setCellValue(ListYMap[t]);
			}
		}
		return wb;
	}
	/*public HSSFWorkbook exportTable(List<Map> list)
	{
		int index =0;
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet("WorkSheet1");
		sheet.setDefaultColumnWidth(10);
		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
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
		cell.setCellValue("페이지URL");		
		cell.setCellStyle(style);
		cell = row.createCell(2);
		cell.setCellValue("페이지뷰(PV)");
		cell.setCellStyle(style);
		cell = row.createCell(3);
		cell.setCellValue("페이지명");
		cell.setCellStyle(style);
		cell = row.createCell(4);
		cell.setCellValue("비율");
		cell.setCellStyle(style);
		for(int i=0; i<5;i++){
			sheet.autoSizeColumn(i);
			
		}
		sheet.setColumnWidth(1, 90*254 );  // 윗줄만으로는 컬럼의 width 
		sheet.setColumnWidth(2, 15*254 ); 
		sheet.setColumnWidth(3, 60*254 );  // 윗줄만으로는 컬럼의 width 
		sheet.setColumnWidth(4, 10*254 );  // 윗줄만으로는 컬럼의 width 
		sheet.setHorizontallyCenter(true);
		sheet.setVerticallyCenter(true);
		for (int i = 0; i < list.size(); i++)
		{
			row = sheet.createRow((int) i +1);
			Map ListAMap = (Map) list.get(i);
			row.createCell(0).setCellValue(i+1);
			row.createCell(1).setCellValue(ListAMap.get("HPAGE").toString());
			row.createCell(2).setCellValue(ListAMap.get("CALL_CNT").toString());
			if(ListAMap.containsKey("HPAGE_NM")){
				row.createCell(3).setCellValue(ListAMap.get("HPAGE_NM").toString());
			}
			else{
				row.createCell(3).setCellValue("");
			}
			row.createCell(4).setCellValue(ListAMap.get("PERCENT").toString());
		}
		return wb;
	}*/

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "엑셀다운";
	}

}
