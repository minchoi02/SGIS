package kostat.lbdms.ServiceAPI.common.web.core.network.process;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * <pre>
 * 파일전송 응답처리를 담당하는 핸들러 클래스
 * </pre>
 *
 * @author Admin
 * @since 2015. 10. 20. 오후 2:18:53
 * @version 1.0
 * @see
 * 
 *      <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *      </pre>
 */

public class ImageWriteResponseHandler extends ResponseHandler<InputStream> {

    private final Log logger = LogFactory.getLog(ImageWriteResponseHandler.class);

    public ImageWriteResponseHandler(HttpServletResponse response) {
	super(response);
    }

    /**
     * <pre>
     * 
     * 응답처리
     * </pre>
     */
    @Override
    public void process(int responseCode, String contentType, InputStream inputStream) {

	response.setStatus(responseCode);

	writeResponse(inputStream);

    }

    /**
     * <pre>
     * 
     * 쓰기응답처리
     * </pre>
     */
    @Override
    protected void writeResponse(InputStream inputStream) {

	response.setContentType("image/png");

	byte buffer[] = new byte[204800];
	int bytesRead = 0;
	BufferedOutputStream bos = null;
	try {
	    bos = new BufferedOutputStream(response.getOutputStream());
	    while ((bytesRead = inputStream.read(buffer, 0, buffer.length)) > 0) {
		bos.write(buffer, 0, bytesRead);
	    }
	    inputStream.close();

	} catch (IOException e) {
	    logger.error(" 이미지 응답 처리 오류 " + e.getMessage());
	} finally {
	    if (bos != null) {
		try {
		    bos.close();
		} catch (IOException ioe) {
		    logger.error(" 이미지 응답 처리 오류 " + ioe.getMessage());
		}
	    }
	}
    }

    /**
     * <pre>
     * 
     * 응답내용
     * </pre>
     */
    @Override
    public String getResponseContent() {
	return null;
    }
}
