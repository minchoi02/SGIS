package kostat.sop.ServiceAPI.api.excel;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.communitymanage.mapper.CommunityManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SearchCommunityMapList
 * @Description： 
 *
 * @author kwangheum   
 * @date：2015年11月23日    
 * @version V1.0      
 *     
 */
public class GetCommunityMapListExcel extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetCommunityMapListExcel.class);
	@Resource
	private CommunityManageDao communityManageDao;
	public String getApiId() {
		return "excel_getcommunitymaplistexcel";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Map<?,?> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map mapResult = new HashMap<String, Object>();
			Map<?,?> paramMap = getParameterMap(req);
			this._transPagging(paramMap);
			String filename = "통계 소통지도 리스트";
			String docName = null;
			String header = req.getHeader("User-Agent");
			if(header.contains("MSIE")||header.contains("Windows")) {
				docName = URLEncoder.encode(filename,"UTF-8").replaceAll("\\+", "%20");
			}else{
				docName = new String(filename.getBytes("UTF-8"), "ISO-8859-1");
			}
			mapResult.put("filename", docName+".xls");
			HSSFWorkbook wb = this.exportTable(communityManageDao.searchCommunityMapList(paramMap));
			mapResult.put("workbook",wb);
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
	private HSSFWorkbook exportTable(Map communityList){
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet("통계소통지도");
		sheet.setDefaultColumnWidth(10);
		
		this.createTitle(wb);
		HSSFCellStyle style = wb.createCellStyle();
		HSSFFont font = wb.createFont();
		font.setFontHeightInPoints((short) 7);
		style.setFont(font);
		
		List<Map> rows = (List<Map>) communityList.get("rows");
		if(rows!=null&&rows.size()>0){
			Iterator<Map> iter = rows.iterator();
			int rowCount = 1;
			while(iter.hasNext()){
				HSSFRow row = sheet.createRow(rowCount);
				Map data = iter.next();
				HSSFCell cell = row.createCell(0);
				cell.setCellValue(data.get("CMMNTY_MAP_NM").toString());
				cell.setCellStyle(style);
				cell = row.createCell(1);
				cell.setCellValue(data.get("USR_ID").toString());
				cell.setCellStyle(style);
				cell = row.createCell(2);
				cell.setCellValue(data.get("JOIN_CNT").toString());
				cell.setCellStyle(style);
				cell = row.createCell(3);
				cell.setCellValue(data.get("POI_CNT").toString());
				cell.setCellStyle(style);
				cell = row.createCell(4);
				cell.setCellValue(data.get("STTEMNT_CNT").toString());
				cell.setCellStyle(style);
				cell = row.createCell(5);
				cell.setCellValue(data.get("ADM_NM").toString());
				cell.setCellStyle(style);
				cell = row.createCell(6);
				cell.setCellValue(data.get("REG_DATE").toString());
				cell.setCellStyle(style);
				cell = row.createCell(7);
				cell.setCellValue(data.get("TAG_CNT").toString());
				cell.setCellStyle(style);
				cell = row.createCell(8);
				cell.setCellValue(data.get("STATS_CNT").toString());
				cell.setCellStyle(style);
				rowCount++;
			}
		}
		return wb;
	}
	private void createTitle(HSSFWorkbook wb){
		HSSFCellStyle style = wb.createCellStyle();
		style.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		HSSFFont font = wb.createFont();
		font.setFontHeightInPoints((short) 12);
		style.setFont(font);
		HSSFSheet sheet = wb.getSheetAt(0);
		HSSFRow row = sheet.createRow(0);
		HSSFCell cell = row.createCell(0);
		cell.setCellValue("소통지도명");
		cell.setCellStyle(style);
		cell = row.createCell(1);
		cell.setCellValue("개설자");
		cell.setCellStyle(style);
		cell = row.createCell(2);
		cell.setCellValue("참여자수");
		cell.setCellStyle(style);
		cell = row.createCell(3);
		cell.setCellValue("등록자료수");
		cell.setCellStyle(style);
		cell = row.createCell(4);
		cell.setCellValue("신고건수");
		cell.setCellStyle(style);
		cell = row.createCell(5);
		cell.setCellValue("지역");
		cell.setCellStyle(style);
		cell = row.createCell(6);
		cell.setCellValue("기간");
		cell.setCellStyle(style);
		cell = row.createCell(7);
		cell.setCellValue("태그건수");
		cell.setCellStyle(style);
		cell = row.createCell(8);
		cell.setCellValue("색지도건수");
		cell.setCellStyle(style);
	}
	private void _transPagging(Map paramMap){
		int pageNumber = Integer.parseInt(paramMap.get("page").toString());
		int pageSize = Integer.parseInt(paramMap.get("rows").toString());
		if (pageNumber==0)
			pageNumber=1;
		int beginIndex = (pageNumber-1)*pageSize+1;
		int endIndex = pageNumber*pageSize;
		paramMap.put("START_INDEX", beginIndex);
		paramMap.put("END_INDEX", endIndex);
	}
	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum MustParam{
		page,
		rows
	}
	private enum OptionParam{
		sort,
		order,
		COMMUNITYNAME,
		STARTDATE,
		ENDDATE,
		USR_ID,
		bnd_year
	}
	@Override
	public String getWorkNm() {
		return "엑셀다운";
	}
}
