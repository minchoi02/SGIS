package kostat.sop.ServiceAPI.pyramid;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.bizStats.Houseprice;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.codehaus.jackson.annotate.JsonTypeInfo.None;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
/**
* 피라미드 정보
* <pre>
* input : pyramid.json/xml
* output : json/xml
* Table : 
* </pre>
*
* <pre>
* <b></b>
* 이경현, 1.0, 2015/04/30 초기 작성
* </pre>
* 
* @author 이경현
* @version 1.0, 2015/0
* @see None
*/

public class PyramidExcel extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(Houseprice.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10100";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return "pyramid.excelDown";
	}
	
	enum MustParam
	{
	}
	
	enum OptionParam
	{
	}
	
	
	
	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest request, HttpServletResponse response,
			String trId) throws AbsException {
		
		httpSession = request.getSession();
		
		Map mapResult = new HashMap<String, Object>();
		
		List makeData = new ArrayList();
		
			HSSFWorkbook book = null;
			OutputStream out = null;
			
			try{
				String sido_cd = "test";
				String sgg_cd = "test";
				String adm_cd = "test";
				String adm_nm = "";
				String total = "";
				
				int idx = 1;
				
				Map mapParameter = getParameterMap(request);
				makeData = session.selectList(getQueryStr(), mapParameter);
				
				book = new HSSFWorkbook();
				HSSFSheet sheet = book.createSheet();
				
				String[] excelDataArr = request.getParameterValues("excelData");
				
				int value = 999999;
				
				for (int i =0; i < makeData.size();i++){
					//{total=30855, sgg_cd=11230, emdong_cd=1123067, sido_nm=서울특별시, emdong_nm=도곡2동, sgg_nm=강남구, sido_cd=11}
					
					HashMap map = (HashMap) makeData.get(i);
					
					HSSFCell cell1 = null;
					HSSFCell cell2 = null;
					HSSFCell cell3 = null;
					
					HSSFRow row = null;
					
					total = map.get("total").toString();
					
					if( sido_cd.equals( map.get("sido_cd").toString() ) ){
						if( sgg_cd.equals( map.get("sgg_cd").toString() ) ){
							adm_cd =  map.get("emdong_cd").toString();
							adm_nm = map.get("emdong_nm").toString();
						} else {
							row = sheet.createRow(i+idx);
							idx++;
							adm_cd =  map.get("sgg_cd").toString();
							sgg_cd = map.get("sgg_cd").toString();
							adm_nm = map.get("sgg_nm").toString();
							
							cell1 = row.createCell(0);
							cell2 = row.createCell(1);
							cell3 = row.createCell(2);
							
							cell1.setCellValue( adm_cd );
							cell2.setCellValue( adm_nm );
							cell3.setCellValue( ""  );
							
							adm_cd =  map.get("emdong_cd").toString();
							adm_nm = map.get("emdong_nm").toString();
						}
					} else {
						row = sheet.createRow(i+idx);
						idx++;
						sido_cd = map.get("sido_cd").toString();
						adm_cd =  map.get("sido_cd").toString();
						adm_nm = map.get("sido_nm").toString();
						
						cell1 = row.createCell(0);
						cell2 = row.createCell(1);
						cell3 = row.createCell(2);
						
						cell1.setCellValue( adm_cd );
						cell2.setCellValue( adm_nm );
						cell3.setCellValue( ""  );
						
						adm_cd =  map.get("emdong_cd").toString();
						adm_nm = map.get("emdong_nm").toString();
					}
					
					row = sheet.createRow(i + idx);
					
					cell1 = row.createCell(0);
					cell2 = row.createCell(1);
					cell3 = row.createCell(2);
					
					cell1.setCellValue( adm_cd );
					cell2.setCellValue( adm_nm );
					cell3.setCellValue( total  );
				}
				
				File xlsFile = new File("D:/test39.xls");
				FileOutputStream fileOut = new FileOutputStream( xlsFile );
				book.write( fileOut );
			}catch (Exception e) {
				e.printStackTrace();
			}
			
			return mapResult;
			
		}

}

