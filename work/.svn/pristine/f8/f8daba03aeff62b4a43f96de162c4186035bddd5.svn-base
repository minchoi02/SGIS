package kostat.lbdms.ServiceAPI.common.util.http;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.lbdms.ServiceAPI.common.util.SystemInfoUtil;

public class HttpMultipartConnector extends HttpResponseConnector{

	private final Log logger = LogFactory.getLog(HttpMultipartConnector.class);
	
	private InputStream inputStream;
	private InputStream[] inputStreamArray;
	private boolean fileIndex = false;
	
	private final static String CONTENT_TYPE = "Content-Type: application/x-www-form-urlencoded";
	private final static String DISPOSITION="Content-Disposition: form-data; name=";
	private final static String BOUNDARY="-----------------------------7db3b9140e84";
	private final static String TWO_HYPHENS = "--";
	
	public HttpMultipartConnector(String urlString, HashMap<String, Object> parameters, InputStream inputStream) {
		super(urlString, HttpRequestKey.POST, parameters);
		this.urlString = urlString;
		this.parameters = parameters;
		this.inputStream = inputStream;
	}
	
	public HttpMultipartConnector(String urlString, HashMap<String, Object> parameters, InputStream[] inputStreamArray, boolean fileIndex) {
		super(urlString, HttpRequestKey.POST, parameters);
		this.urlString = urlString;
		this.parameters = parameters;
		
		// 시큐어코딩 관련 수정
		this.inputStreamArray = new InputStream[ inputStreamArray.length ];
		for ( int i = 0; i < inputStreamArray.length; i++ ){
			this.inputStreamArray[i] = inputStreamArray[i];
		}
		this.fileIndex = fileIndex;
	}
	
	public HttpMultipartConnector(String urlString, HashMap<String, Object> parameters) {
		super(urlString, HttpRequestKey.POST, parameters);
		this.urlString = urlString;
		this.parameters = parameters;
	}
	
	public HttpMultipartConnector( String urlString, InputStream inputStream ){
		this( urlString, new HashMap<String,Object>(), inputStream );
	}
	
	/**
	 * <pre>
	 * HttpURLConnection을 생성해 반환한다
	 * </pre>
	 * @param url
	 * @param String ( method ) Http Method ( POST, GET, PUT, DELETE )
	 * @return HttpURLConnection
	 */
	@Override
	protected HttpURLConnection  newHttpConnection( URL url, String method ){
		HttpURLConnection connection = null;
		try {
			
			connection = (HttpURLConnection) url.openConnection();		
			connection.setDoInput(true);
			connection.setDoOutput(true);
			connection.setUseCaches(false);
			connection.setRequestProperty("Accept-Charset", "UTF-8"); 
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type","multipart/form-data; boundary=---------------------------7db3b9140e84" );
			connection.setConnectTimeout( HttpRequestKey.TIME_OUT );
			connection.setReadTimeout( HttpRequestKey.TIME_OUT ); 
			
		} catch ( IOException err ){
			logger.error( err.getMessage(), err );
		}
		return connection;
	}
	
	/**
	 * <pre>
	 * POST 요청
	 * </pre>
	 * @return HttpURLConnection
	 * @throws IOException 
	 * @throws Exception
	 */
	@Override
	protected HttpURLConnection post() throws IOException {
		
		URL url = new URL( urlString );
		HttpURLConnection connection = this.newHttpConnection( url, HttpRequestKey.POST );
		logger.info("POST =======================================");
		
		// write data
		if ( connection != null ){
			
			// 메모리 참조 관련 처리
			connection.setChunkedStreamingMode(1024);
			
			InputStream[] is;
			
			if( inputStreamArray != null && inputStreamArray.length > 0 ){
				is = new InputStream[ inputStreamArray.length ];
				is = this.inputStreamArray;
			} else {
				is = new InputStream[ 1 ];
				is[0] = this.inputStream;
			}
			
			DataOutputStream dos = new DataOutputStream( connection.getOutputStream() );
			Set<String> key = parameters.keySet();
			Iterator<String> ito= key.iterator();
			
			String filename = "FILE";
			logger.info("filename : " + filename + "=======================================");
			
			while(ito.hasNext())
			{
				String keyValue = ito.next();
				dos.writeBytes(BOUNDARY+"\r\n");
				dos.writeBytes(DISPOSITION+"\""+ keyValue+"\""+"\r\n");
				dos.writeBytes("\r\n");
				dos.write((parameters.get(keyValue)+"\r\n").getBytes("UTF-8"));
				logger.info( keyValue + " : "+ parameters.get(keyValue ) );
				//dos.writeBytes( (postList.get(keyValue)+"\r\n") );
			}
	
			dos.writeBytes(BOUNDARY+"\r\n");
			
			for (int i = 0; i < is.length; i++) {
				if( is[i] != null ){
					////////////////////////////////////////////////////////////////////////////////
					String name = "FILE";
					
					if( this.fileIndex ){
						if( i > 0 ){
							name = name+(i+1);
						}
					}
					
					//System.out.println("##############namenamenamename : " + name);
					
					//DISPOSITION에 file_name 이 파일명으로 전달
					///////////////////////////////////////////////////////////////////////////////
					dos.writeBytes( BOUNDARY + "\r\n" );
					dos.writeBytes( CONTENT_TYPE + "\r\n");
					dos.writeBytes( DISPOSITION+"\""+ name +"\";"+" filename="+"\""+ filename +"\""+"\r\n" );
					dos.writeBytes( "\r\n" );
					
					int bufferSize = Math.min(is[i].available(), 10240 );
					byte buffer[] = new byte[bufferSize];
					int bytesRead=0;
					SystemInfoUtil util = new SystemInfoUtil();
					logger.info ( util.getMemInfo() );
					// read image
					while ((bytesRead = is[i].read(buffer, 0, buffer.length)) > 0) {
						dos.write(buffer, 0, bytesRead);
						dos.flush();
						//logger.info ( util.getMemInfo() );
					}
					
					dos.writeBytes("\r\n");
					
					is[i].close();
				}
			}
			
			dos.writeBytes( BOUNDARY+TWO_HYPHENS+"\r\n");
			
			//System.out.println("#########dos###" + dos.toString());
			
			dos.flush();
			dos.close();
				
		}
		return connection;
		
		
	}	
}
