package kostat.lbdms.ServiceAPI.common.web.core.network.process;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class NormalResponseHandler extends ResponseHandler<String> {
    private final Log logger = LogFactory.getLog(NormalResponseHandler.class);
    private String responseTemp = StringUtils.EMPTY;

    public NormalResponseHandler(HttpServletResponse response) {
	super(response);
    }

    /**
     * <pre>
     * NormalResponseHandler()
     * </pre>
     * 
     * @param response
     * @param isWriteResponse
     *            false인 경우 응답결과를 response에 쓰지 않는다
     */
    public NormalResponseHandler(HttpServletResponse response, boolean isWriteResponse) {

	super(response, isWriteResponse);
    }

    /**
     * <pre>
    	 * changeResponseData() responseData의 값을 변조할 시 사용한다
     * </pre>
     * 
     * @param responseData
     * @return
     */
    public String changeResponseData(String responseData) {
	// -- 클래스 재정의시에 사용

	return responseData;
    }

    @Override
    public void process(int responseCode, String contentType, InputStream inputStream) {

	String responseData = getResponseData(inputStream).toString();
	response.setStatus(responseCode);

	// 값 변조 시 사용
	responseData = changeResponseData(responseData);

	logger.info("reponse :  " + responseData);

	this.responseTemp = responseData;

	if (isWriteResponse) {
	    writeResponse(responseData);
	}

    }

    @Override
    protected void writeResponse(String responseData) {

	response.setContentType("text/html; charset=utf-8");
	response.setHeader("pragma", "no-cache");
	response.setHeader("cache-control", "no-cache");
	response.setHeader("expires", "0");

	PrintWriter out = null;

	try {
	    out = response.getWriter();
	    out.println(responseData);
	    out.flush();
	    out.close();

	} catch (IOException e) {
	    logger.error(e.getMessage());
	}
    }

    public String getResponseContent() {
	return responseTemp;
    }
}
