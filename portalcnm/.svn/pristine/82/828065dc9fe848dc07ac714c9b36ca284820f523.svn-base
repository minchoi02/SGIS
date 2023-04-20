package kostat.sop.ServiceAPI.api.dt.pubdatamanage;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.dt.pubdatamanage.mapper.PubDataManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**   
 *
 * @ClassName: AddREL
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午8:08:30    
 * @version V1.0      
 *     
 */
public class RegPubData extends AbsAuth<List> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(RegPubData.class);
	@Resource
	private PubDataManageDao pubDataManageDao;
	
	@Override
	public String getApiId() {
		return "pubdatamanage_reg";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			Map resultMap = new HashMap();
			Boolean f = false;
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload fileUpload = new ServletFileUpload(factory);
			fileUpload.setSizeMax(20000000);
			List items = fileUpload.parseRequest(req);
			Iterator iterator = items.iterator();
			
			List list = new ArrayList();
			Map<Object, Object> paraMap = new HashMap<Object, Object>();
			String data_id="";
			String data_type="";
			while (iterator.hasNext()) {
				
				FileItem file = (FileItem) iterator.next();
				if (file.isFormField() && "DATA_ID".equals(file.getFieldName())) {
					data_id= file.getString();
				}
				if (file.isFormField() && "DATA_TYPE".equals(file.getFieldName())) {
					data_type= file.getString();
				}
				if (!file.isFormField() && "FILE".equals(file.getFieldName()) && file.getSize() > 0) {
					String originName = file.getName();
					// originName = new String (originName.getBytes
					// ("iso-8859-1"), "UTF-8");
					String FILE_EXTENSION = originName.substring(originName.lastIndexOf(".") + 1);
					String FILE_NM = originName.substring(originName.lastIndexOf("\\") + 1, originName.lastIndexOf("."));
					long curTime = System.currentTimeMillis();
					String FILE_ID = FILE_NM.replaceAll("[()]", "") + "_" + Long.toString(curTime);
					String FILE_CONTENT_TYPE = file.getContentType();
					// String FILE_PATH =
					// req.getSession().getServletContext().getRealPath("/upload/BOARD_001");
					ClassPathResource resource = new ClassPathResource(getPerpertyPath());
					Properties props = PropertiesLoaderUtils.loadProperties(resource);
					String FILE_PATH = props.getProperty("Globals.File.Excel.TempPath");
					
					if (RequestUtil.writeFile(file, FILE_PATH, FILE_ID, FILE_EXTENSION)) {
						f = true;
						Map fileMap = new HashMap();
						fileMap.put("FILE_ID", FILE_ID);
						fileMap.put("FILE_PATH", FILE_PATH);
						fileMap.put("FILE_NM", FILE_NM);
						fileMap.put("FILE_EXTENSION", FILE_EXTENSION);
						fileMap.put("FILE_CONTENT_TYPE", FILE_CONTENT_TYPE);
						//resultMap.put("FILE", fileMap);
					} else {
						throw new ApiException(Prompt.UPLOADERROR);
					}
					
					//2017.12.04 [개발팀] 시큐어코딩
					FileInputStream fis = null;
					 try {
				            if(data_type.equalsIgnoreCase("THEMAMAPDATA")){
				            	fis = new FileInputStream(FILE_PATH+"/"+FILE_ID+"."+FILE_EXTENSION);
				            	XSSFWorkbook workbook=new XSSFWorkbook(fis);
					            
					            int rowindex=0;
					            int columnindex=0;
					            //시트 수 (첫번째에만 존재하므로 0을 준다)
					            //만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
					            XSSFSheet sheet=workbook.getSheetAt(0);
					            //행의 수
					            int rows=sheet.getPhysicalNumberOfRows();
					            
					            list = new ArrayList();
					            for(rowindex=1;rowindex<rows;rowindex++){
					                //행을읽는다
					                XSSFRow row=sheet.getRow(rowindex);
					                Map excelMap = new HashMap();
					                if(row !=null){
					                    //셀의 수
					                    int cells=row.getPhysicalNumberOfCells();
					                    for(columnindex=0;columnindex<=cells;columnindex++){
					                        //셀값을 읽는다
					                        XSSFCell cell=row.getCell(columnindex);
					                        String value="";
					                        //셀이 빈값일경우를 위한 널체크
					                        if(cell==null){
					                            continue;
					                        }else{
					                            //타입별로 내용 읽기
					                            switch (cell.getCellType()){
					                            case XSSFCell.CELL_TYPE_FORMULA:
					                                value=cell.getCellFormula();
					                                break;
					                            case XSSFCell.CELL_TYPE_NUMERIC:
					                                value=cell.getNumericCellValue()+"";
					                                break;
					                            case XSSFCell.CELL_TYPE_STRING:
					                                value=cell.getStringCellValue()+"";
					                                break;
					                            case XSSFCell.CELL_TYPE_BLANK:
					                                value=cell.getBooleanCellValue()+"";
					                                break;
					                            case XSSFCell.CELL_TYPE_ERROR:
					                                value=cell.getErrorCellValue()+"";
					                                break;
					                            }
					                            if(columnindex == 0){
						                        	excelMap.put("THEMA_MAP_DATA_ID", data_id);
						                        	String region_div = value.replace(".0", "");
						                        	excelMap.put("REGION_DIV", region_div);
						                        }else if(columnindex == 1){
						                        	String base_year = value.replace(".0", "");
						                        	excelMap.put("BASE_YEAR", base_year);
						                        }else if(columnindex == 2){
						                        	String adm_cd = value.replace(".0", "");
						                        	excelMap.put("ADM_CD", adm_cd);
						                        }else if(columnindex == 3){
						                        	float left_sep_value = Float.parseFloat(value);
						                        	excelMap.put("LEFT_SEP_VALUE", left_sep_value);
						                        }else if(columnindex == 4){
						                        	float right_sep_value = Float.parseFloat(value);
						                        	excelMap.put("RIGHT_SEP_VALUE", right_sep_value);
						                        }
					                        }
					                    }
					                    list.add(excelMap);
					                    //fis.close(); //2017.12.04 [개발팀] 시큐어코딩
					                    File delFile = new File(FILE_PATH+"/"+FILE_ID+"."+FILE_EXTENSION);
						            	delFile.delete();
					                }
					                
					            }
				            }else if(data_type.equalsIgnoreCase("THEMAMAPCHANGE")){
				            	fis = new FileInputStream(FILE_PATH+"/"+FILE_ID+"."+FILE_EXTENSION);
					            XSSFWorkbook workbook=new XSSFWorkbook(fis);
					            
					            int rowindex=0;
					            int columnindex=0;
					            //시트 수 (첫번째에만 존재하므로 0을 준다)
					            //만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
					            XSSFSheet sheet=workbook.getSheetAt(0);
					            //행의 수
					            int rows=sheet.getPhysicalNumberOfRows();
					            for(rowindex=1;rowindex<rows;rowindex++){
					                //행을읽는다
					                XSSFRow row=sheet.getRow(rowindex);
					                if(row !=null){
					                    //셀의 수
					                    int cells=row.getPhysicalNumberOfCells();
					                    Map excelMap = new HashMap();
					                    for(columnindex=0;columnindex<=cells;columnindex++){
					                        //셀값을 읽는다
					                        XSSFCell cell=row.getCell(columnindex);
					                        String value="";
					                        //셀이 빈값일경우를 위한 널체크
					                        if(cell==null){
					                            continue;
					                        }else{
					                            //타입별로 내용 읽기
					                            switch (cell.getCellType()){
					                            case XSSFCell.CELL_TYPE_FORMULA:
					                                value=cell.getCellFormula();
					                                break;
					                            case XSSFCell.CELL_TYPE_NUMERIC:
					                                value=cell.getNumericCellValue()+"";
					                                break;
					                            case XSSFCell.CELL_TYPE_STRING:
					                                value=cell.getStringCellValue()+"";
					                                break;
					                            case XSSFCell.CELL_TYPE_BLANK:
					                                value=cell.getBooleanCellValue()+"";
					                                break;
					                            case XSSFCell.CELL_TYPE_ERROR:
					                                value=cell.getErrorCellValue()+"";
					                                break;
					                            }
					                           
					                            if(columnindex == 0){
						                        	excelMap.put("THEMA_MAP_DATA_ID", data_id);
						                        	String region_div = value.replace(".0", "");
						                        	excelMap.put("REGION_DIV", region_div);
						                        }else if(columnindex == 1){
						                        	String base_year = value.replace(".0", "");
						                        	excelMap.put("BASE_YEAR", base_year);
						                        }else if(columnindex == 2){
						                        	String adm_cd = value.replace(".0", "");
						                        	excelMap.put("ADM_CD", adm_cd);
						                        }else if(columnindex == 3){
						                        	String irds_year =  value.replace(".0", "");
						                        	excelMap.put("IRDS_YEAR", irds_year);
						                        }else if(columnindex == 4){
						                        	float chart_value = Float.parseFloat(value);
						                        	excelMap.put("CHART_VALUE", chart_value);
						                        }
					                        }
					                    }
					                    list.add(excelMap);
					                    //fis.close(); //2017.12.04 [개발팀] 시큐어코딩
					                    File delFile = new File(FILE_PATH+"/"+FILE_ID+"."+FILE_EXTENSION);
						            	delFile.delete();
					                }
					            }
				            }
				        } catch (IOException e) {
				            //e.printStackTrace();
				        	 System.out.println("서버처리 중 오류가 발생하였습니다."); //2017.12.04 [개발팀] 시큐어코딩
				        }finally { //2017.12.04 [개발팀] 시큐어코딩
				        	if (fis != null) {
				        		fis.close();
				        	}
				        }
				}
			}
			resultMap.put("total", list.size());
			resultMap.put("row", list);
			//resultMap.put("success", list);
			return list;
			
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
		//return null;
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
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}
 
}
