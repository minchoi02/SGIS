package kostat.sop.ServiceAPI.api.excel;

import org.apache.log4j.Logger;

import kostat.sop.ServiceAPI.api.mn.useCurrentState.mapper.UseCurrentStateDao;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFSimpleShape;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.OutputStream;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.utils.StrUtil;

import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: UseCurrentStateExcel
 * @Description： 
 *
 * @author leekh  
 * @date：20160426
 * @version V1.0      
 *     
다운 */
public class UseCurrentStateExcel extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UseCurrentStateExcel.class);
	
	private UseCurrentStateDao useCurrentStateDao;

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		
		Map paramMap=getParameterMap(req);
		Map mapResult = new HashMap<String, Object>();
		try {
			if("getServiceUseView".equals(paramMap.get("gubun"))){
				
				
				String fileName = "검색어통계현황"+paramMap.get("year").toString() + paramMap.get("month").toString()+".xls";
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				
				
				paramMap = useCurrentStateDao.getServiceUseView(paramMap);
				
				
				 mapResult.put("filename", StrUtil.encodeURL(fileName, "UTF-8"));
				
				return mapResult;
			}
			
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
		return null;
	}
	private enum MustParam{
		//DATA,STARTDATE,ENDDATE
		gubun,
		year,
		month
	}
	
	private enum OptionParam{

	}
	
	@Override
	public String getApiId() {
		return "excel_getapidetail";
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

	
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "엑셀다운";
	}
}
