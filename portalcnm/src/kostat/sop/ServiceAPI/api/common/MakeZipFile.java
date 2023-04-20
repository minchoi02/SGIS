package kostat.sop.ServiceAPI.api.common;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.log4j.Logger;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.common.mapper.CommonDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GetAPIMClass
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月15日 下午3:05:42    
 * @version V1.0      
 *    
 */
public class MakeZipFile extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(MakeZipFile.class);
	@Resource
	private CommonDao commonDao;
	@Override
	public String getApiId() {
		return "common_makefile";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "생성";
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		
		try {
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			FileInputStream input = null;
		    FileOutputStream output = null;
		    File cenfile =null;
		    File desti=null;
			Map paramMap = getParameterMap(req);
			
			//System.out.println("[MakeZipFile.java] paramMap [" + paramMap);
			
			List list = commonDao.getFileList(paramMap);
			//24290
			
			String tbPath = "/DATA/docs/statsPotal/upload";
			//dokadoka 필수 수정
			//String tbPath = "C:\\\\projects\\sgis\\upload";
			//System.out.println("[MakeZipFile.java] list [" + list);
			
			System.out.println("[MakeZipFile.java] list size  :::: " + list.size()) ;
			
			
			for(int i=0; i<list.size(); i++){
				Map listMap = (Map) list.get(i);
				String dir = getStringMap(listMap,"dir");
				
				String fileName = getStringMap(listMap,"file_name");
			        try{
			            // 복사할 대상 파일을 지정해준다.
			            cenfile = new File(tbPath+dir+"/"+fileName);
			            System.out.println("[MakeZipFile.java] tbPath [" + tbPath);
			            System.out.println("[MakeZipFile.java] dir [" + dir);
			            System.out.println("[MakeZipFile.java] cenfile [" + cenfile);
			            // FileInputStream 는 File object를 생성자 인수로 받을 수 있다.         
			            input = new FileInputStream(cenfile);
			            timestamp.getTime();
			            //디렉토리 생성 
			        	  desti = new File(tbPath+"/census/reqdoc/temp_"+timestamp.getTime());
			        	  
			        	if(!desti.exists()){
		        		  //없다면 생성
			        		//2017.12.04 [개발팀] 시큐어코딩
			        		desti.setExecutable(true);
			        		desti.setReadable(true);
			        		desti.setWritable(true);
		        			desti.mkdirs(); 
		        			}
			            // 복사된 파일의 위치를 지정해준다.
			            output = new FileOutputStream(new File(desti+"/"+fileName));
			            int readBuffer = 0;
			            byte [] buffer = new byte[1028];
			            while((readBuffer = input.read(buffer)) != -1) {
			                output.write(buffer, 0, readBuffer);
			            }
			            
			        } catch (IOException e) { //2017.12.04 [개발팀] 시큐어코딩
			            System.out.println("서버처리 중 오류가 발생하였습니다.");
			        } finally {
			            try{
			                // 생성된 InputStream Object를 닫아준다.
			                input.close();
			                // 생성된 OutputStream Object를 닫아준다.
			                output.close();
			            } catch(IOException io) {}
			        }
		    	}  // end for
			
			
			// 20220627 통계격자 파일 추가
			List fileList2 =  commonDao.getFileListArea(paramMap);
			
			String filePathMap = "/grid_data/gd_#file_code#/gd_#file_code#_#year#/gd_#file_code#_#year#_#gridcode#/";
			String fileNameTemp = "#year#년_#kind#_#gridcode#_#gridlevel#.txt";
			String kindValue[] = {"인구","가구","주택","사업체","종사자"};
			String fileCode[] = {"in","ga","ho","cp","em"};
			
			if (fileList2 != null && fileList2.size()>0) { 
			
				for(int i=0; i<fileList2.size(); i++){
					Map listMap = (Map) fileList2.get(i);
					
					String year = getStringMap(listMap,"sgis_census_req_year");
					String sgis_census_data_id = getStringMap(listMap,"sgis_census_data_id");
					String mapData = getStringMap(listMap,"sgis_census_detail_data_id");
				
					
					String strArray[] = mapData.split("_");
					int index = Integer.parseInt(sgis_census_data_id);
					
					
					String fullPath = filePathMap.replaceAll("#year#", year);
				    	   fullPath = fullPath.replaceAll("#kind#", kindValue[index]);
				           fullPath = fullPath.replaceAll("#gridcode#", strArray[0]);
				           fullPath = fullPath.replaceAll("#gridlevel#", strArray[1]);
				           fullPath = fullPath.replaceAll("#file_code#", fileCode[index]);
					
				    String fullfilName = fileNameTemp.replaceAll("#year#", year);
					       fullfilName = fullfilName.replaceAll("#kind#", kindValue[index]);
					       fullfilName = fullfilName.replaceAll("#gridcode#", strArray[0]);
					       fullfilName = fullfilName.replaceAll("#gridlevel#", strArray[1]);
					       fullfilName = fullfilName.replaceAll("#file_code#", fileCode[index]);
					
				        try{
				            // 복사할 대상 파일을 지정해준다.
				            cenfile = new File(tbPath+fullPath+"/"+fullfilName);
				            System.out.println("[MakeZipFile.java] tbPath [" + tbPath);
				            System.out.println("[MakeZipFile.java] dir [" + fullPath);
				            System.out.println("[MakeZipFile.java] cenfile [" + cenfile);
				            // FileInputStream 는 File object를 생성자 인수로 받을 수 있다.         
				            input = new FileInputStream(cenfile);
				            timestamp.getTime();
				            //디렉토리 생성 
				        	  desti = new File(tbPath+"/census/reqdoc/temp_"+timestamp.getTime());
				        	  System.out.println(desti);
				        	if(!desti.exists()){
			        		  //없다면 생성
				        		//2017.12.04 [개발팀] 시큐어코딩
				        		desti.setExecutable(true);
				        		desti.setReadable(true);
				        		desti.setWritable(true);
			        			desti.mkdirs(); 
			        			}
				            // 복사된 파일의 위치를 지정해준다.
				            output = new FileOutputStream(new File(desti+"/"+fullfilName));
				            int readBuffer = 0;
				            byte [] buffer = new byte[1028];
				            while((readBuffer = input.read(buffer)) != -1) {
				                output.write(buffer, 0, readBuffer);
				            }
				            
				        } catch (IOException e) { //2017.12.04 [개발팀] 시큐어코딩
				            System.out.println("서버처리 중 오류가 발생하였습니다.");
				        } finally {
				            try{
				                // 생성된 InputStream Object를 닫아준다.
				                input.close();
				                // 생성된 OutputStream Object를 닫아준다.
				                output.close();
				            } catch(IOException io) {}
				        }
			    	} // for end
			    } // if end
			
			    String path = "";
			    if(desti != null) path = desti.getPath();
			    else             {
			    	return new Success(true,"DOWNLOAD SUCCESS!");
			    }
			 	
			 	System.out.println("[MakeZipFile.java] path [" + path);
		        File tempfile = new File(path);
		        String files[] = null;
		        //파일이 디렉토리 일경우 리스트를 읽어오고
		        //파일이 디렉토리가 아니면 첫번째 배열에 파일이름을 넣는다.
		        if( tempfile.isDirectory() ){
		            files = tempfile.list();
		        }else{
		            files = new String[1];
		            files[0] = tempfile.getName();
		        }
		        //buffer size
		        int size = 1024;
		        byte[] buf = new byte[size];
		        
		        String outZipNm = tbPath+"/census/reqdoc/"+timestamp.getTime()+".zip";

		        FileInputStream fis = null;
		        ZipArchiveOutputStream zos = null;
		        BufferedInputStream bis = null;
		         
		        try {
		            // Zip 파일생성
		            zos = new ZipArchiveOutputStream(new BufferedOutputStream(new FileOutputStream(outZipNm)));
		             
		            for( int j=0; j < files.length; j++ ){
		                //해당 폴더안에 다른 폴더가 있다면 지나간다.
		                if( new File(path+"/"+files[j]).isDirectory() ){
		                    continue;
		                }
		                //encoding 설정
		                zos.setEncoding("UTF-8");
		                 
		                //buffer에 해당파일의 stream을 입력한다.
		                fis = new FileInputStream(path + "/" + files[j]);
		                bis = new BufferedInputStream(fis,size);
		                 
		                //zip에 넣을 다음 entry 를 가져온다.
		                zos.putArchiveEntry(new ZipArchiveEntry(files[j]));
		                 
		                //준비된 버퍼에서 집출력스트림으로 write 한다.
		                int len;
		                while((len = bis.read(buf,0,size)) != -1){
		                    zos.write(buf,0,len);
		                }
		                 
		                bis.close();
		                fis.close();
		                zos.closeArchiveEntry();
		  
		            }
		            zos.close();
		 
		        } catch (FileNotFoundException e) {
		            e.printStackTrace();
		        	 System.out.println("서버처리 중 오류가 발생하였습니다."); //2017.12.04 [개발팀] 시큐어코딩
		        }finally{
		            if( zos != null ){
		                zos.close();
		            }
		            if( fis != null ){
		                fis.close();
		            }
		            if( bis != null ){
		                bis.close();
		            }
		        }
			//임시 폴더 및 파일 삭제
			deleteFolder(tbPath+"/census/reqdoc/temp_"+timestamp.getTime());
			
			//sgis_census_dynamic_zipfile 데이터 insert
			Map paramMap2 = new HashMap();
			paramMap2.put("sgis_census_req_id", paramMap.get("SGIS_CENSUS_REQ_ID"));
			paramMap2.put("filePath", "/census/reqdoc/");
			paramMap2.put("fileName", timestamp.getTime()+".zip");
			commonDao.addDynamicZipFile(paramMap2);
			
			return new Success(true,"DOWNLOAD SUCCESS!");
		} 
		 catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			e.printStackTrace();
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
		SGIS_CENSUS_REQ_ID
	}
	private enum OptionParam{
	}

	public void copyDirectory(File sourcelocation , File targetdirectory) 
     throws IOException {
             
         }
	public void deleteFolder(String parentPath) {
	    File file = new File(parentPath);
	    String[] fnameList = file.list();
	    int fCnt = fnameList.length;
	    String childPath = "";
	    
	    for(int i = 0; i < fCnt; i++) {
	      childPath = parentPath+"/"+fnameList[i];
	      File f = new File(childPath);
	      if( ! f.isDirectory()) {
	        f.delete();   //파일이면 바로 삭제
	      }
	      else {
	        deleteFolder(childPath);
	      }
	    }
	    
	    File f = new File(parentPath);
	    f.delete();   //폴더는 맨 나중에 삭제
	    
	}
	
	public String getStringMap(Map map, String key) {
		String result ="" ;
		if(map.containsKey(key))           			 result = map.get(key).toString();
		else if (map.containsKey(key.toUpperCase())) result = map.get(key.toUpperCase()).toString();			
		else if (map.containsKey(key.toLowerCase())) result = map.get(key.toLowerCase()).toString();
		return result ;
	}

	
}
