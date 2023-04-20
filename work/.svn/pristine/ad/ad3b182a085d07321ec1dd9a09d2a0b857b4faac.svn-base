package kostat.lbdms.ServiceAPI.common.web.core.network.process;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.lbdms.ServiceAPI.common.util.http.IResponseHandler;

public abstract class ResponseHandler<T> implements IResponseHandler{

    private final Log logger = LogFactory.getLog(ResponseHandler.class);
    protected HttpServletResponse response;
	
	protected boolean isWriteResponse = true;	// response에 값을 쓸 지 여부 체크
	
	public ResponseHandler( HttpServletResponse response ){
		this.response = response;
	}
	
	public ResponseHandler( HttpServletResponse response, boolean isWriteResponse ){
		this.response = response;
		this.isWriteResponse = isWriteResponse;
	}
	
	protected abstract void writeResponse( T data );
	
	public void processExceptResponse(int responseCode, InputStream inputStream) {

		
		try {
			if ( inputStream != null ){
				String responseData = getResponseData( inputStream ).toString();
				response.sendError( responseCode, responseData );
			} else {
				response.sendError( responseCode );				
			}
			
		} catch (IOException e) {
			logger.error( e.getMessage() );
		}
	}
	
	protected StringBuffer getResponseData( InputStream inputStream ){
		StringBuffer data = new StringBuffer();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader( inputStream,"UTF-8"));
		
			while(true) {
				String line = br.readLine();
				if(line == null) break;
				data.append(line+ '\n');
			}
		} catch( IOException ie ){
			logger.error( ie.getMessage() );
		} finally {
			if ( br != null ){
				try {
					br.close();
				} catch (IOException e) {
					logger.error( e.getMessage() );
				}
			}
		}
		return data;
	}

}
