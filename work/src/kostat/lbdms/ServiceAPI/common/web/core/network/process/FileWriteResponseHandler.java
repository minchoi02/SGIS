package kostat.lbdms.ServiceAPI.common.web.core.network.process;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**  
 * <pre>
 * 파일전송 응답처리를 담당하는 핸들러 클래스
 * </pre>
 *
 * @author		Admin
 * @since 		2015. 10. 20. 오후 2:18:53
 * @version 	    1.0
 * @see
 * <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *</pre>
 */
public class FileWriteResponseHandler extends ResponseHandler<InputStream>{
    private static final String HEADER_APPLICATION_ZIP = "application/zip";
    
    private final Log logger = LogFactory.getLog(FileWriteResponseHandler.class);
    
    private String filename;
	
	private String contentType;
	
	/**
	 * <pre>
	 * 파일쓰기 응답 핸들러
	 * </pre>
	 * @param response
	 */
	public FileWriteResponseHandler(HttpServletResponse response) {
		super(response);
	}
	
	/**
	 * <pre> 
	 * 파일쓰기 응답 핸들러
	 * </pre>
	 * @param response
	 * @param filename
	 */
	public FileWriteResponseHandler(HttpServletResponse response, String filename) {
		super(response);
		this.filename = filename;
	}
	
	/**
	 * <pre> 
	 * 응답 예외처리
	 * </pre> 
	 */
	@Override
	public void processExceptResponse(int responseCode, InputStream inputStream) {

		
		try {
			if ( inputStream != null ){
				String responseData = getResponseData( inputStream ).toString();
				response.sendError( responseCode, responseData );
			} else {
				// 404 이외의 오류에 대해서도 404로 임의 처리 
				response.sendError( 404, "파일을 찾을 수 없습니다" );
			}
			
		} catch (IOException e) {
			logger.error( e.getMessage() );
		}
		
		/*String responseData = getResponseData( inputStream ).toString();
		
		PrintWriter out = null;
		
		try {
			if ( isWriteResponse ){
				out = response.getWriter();
				out.println(responseData);
				out.flush();
				out.close();
			}
		
		} catch (IOException e) {
			logger.error( e.getMessage() );
		}*/

	}
	
	/**
	 * <pre> 
	 * 응답처리
	 * </pre> 
	 */
	@Override
	public void process(int responseCode, String contentType, InputStream inputStream) {
		
		if ( contentType != null ){
			this.contentType = contentType;
		}
		
		response.setStatus( responseCode );
		writeResponse( inputStream );
		
	}
	
	/**
	 * <pre> 
	 * 쓰기응답처리
	 * </pre> 
	 */
	@Override
	protected void writeResponse(InputStream inputStream) {
		
		String name = StringUtils.defaultString( this.filename, "download" );
		
		try {
			name = URLEncoder.encode(name, "UTF8").replaceAll("\\+", " ");
		} catch (UnsupportedEncodingException e1) {
			name = "download";
		}

		if( StringUtils.equalsIgnoreCase( this.contentType, HEADER_APPLICATION_ZIP ) ){
			response.setHeader("Content-Type", HEADER_APPLICATION_ZIP );
			if ( this.filename.lastIndexOf(".zip") < 0 ){
				name = name + ".zip";
			}
		} else {
			response.setContentType("application/force-download");
			response.setHeader("Content-Type","application/x-www-form-urlencoded");
		}
		response.setHeader("Content-Transfer-Encoding", "binary");		
		response.setHeader("Content-Disposition","attachment; filename=\"" + name + "\"");
		logger.info( "final conten_type : "+this.contentType );
		logger.info( "final filename : "+name );
		
	   
		byte buffer[] = new byte[204800];
		int bytesRead=0;
		BufferedOutputStream bos = null;
		try {
			bos = new BufferedOutputStream(response.getOutputStream());
			
			/*// 참조 : http://blog.wystan.net/2007/08/18/bom-byte-order-mark-problem
			// 엑셀인 경우 UTF-8 다운로드가 가능하도록 BOM 문자열 바이트를 넣는다.
			if ( name.indexOf(".csv") != -1 ){
				bos.write(new byte[] { (byte)0xEF, (byte)0xBB, (byte)0xBF });	
			}*/
			logger.info(name+" 다운로드 시작");
			while ((bytesRead = inputStream.read(buffer, 0, buffer.length)) > 0) {
				//System.out.println( bytesRead );
				bos.write(buffer, 0, bytesRead);
			}	
			
			bos.flush();
			response.flushBuffer();
			logger.info(name+" 다운로드 완료");
			
		} catch (IOException e) {
			logger.error( " 파일 다운로드 오류 " + e.getMessage()  );
		} finally {
			if( inputStream!=null){
				try {
					inputStream.close();
				} catch (IOException ioe) {
					logger.error( " InputStream Close 오류 " + ioe.getMessage()  );
				}
			}
			if(bos!=null){
				try {
					bos.close();
				} catch (IOException ioe) {
					logger.error( " BufferedOutputStream Close 오류 " + ioe.getMessage()  );
				}
			}
		}
	}

	@Override
	public String getResponseContent() {
		return null;
	}

}
