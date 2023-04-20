package kostat.sop.ServiceAPI.api.catchmentArea;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLConnection;
import java.net.UnknownHostException;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.CaptchaServiceSingleton;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

public class ServiceAreaGeometry extends AbsQuery< String > {

	private static final Log logger = LogFactory.getLog( ServiceAreaGeometry.class );

	@Override
	public String getApiId()
	{
		return "API_202091";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public String executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		//String sUrl =  "http://121.153.140.124:6080/arcgis/rest/services/test01/division_verify_area_route_testgg/NAServer/Service%20Area/solveServiceArea";
		//String sUrl = "http://121.153.140.124:6080/arcgis/rest/services/test01/division_verify_area_route/NAServer/Service%20Area/solveServiceArea";
		//String sUrl = "https://link.kostat.go.kr/arcgis/rest/services/test01/division_verify_area_route/NAServer/Service%20Area/solveServiceArea";
		//String sUrl = "http://121.153.140.124:6080/arcgis/rest/services/test/Service_area/NAServer/Service%20Area/solveServiceArea";
		//String sUrl = "https://link.kostat.go.kr/arcgis/rest/services/test03/Service_area/NAServer/Service%20Area/solveServiceArea";
		//String requestQueryString = "f=json&facilities=%7B%22features%22:%5B%7B%22geometry%22:%7B%22x%22:929539,%22y%22:1947688,%22spatialReference%22:%7B%22wkid%22:5179,%22latestWkid%22:5179%7D%7D%7D%5D%7D&defaultBreaks=300&outSR=5179&returnFacilities=false&returnBarriers=false&returnPolylineBarriers=false&returnPolygonBarriers=false&outputLines=esriNAOutputLineNone&outputPolygons=esriNAOutputPolygonSimplified";
		
		//mng_s 20210218 개발서버에서 arcgis 서버 접속 URL을 호스트 네임으로 구분해서 처리함
		String hostName ="";
		try {
			hostName = InetAddress.getLocalHost().getHostName();
		} catch (UnknownHostException e1) {
			e1.printStackTrace();
		}
		String sUrl = "https://link.kostat.go.kr/arcgis/rest/services/test03/Service_area/NAServer/Service%20Area/solveServiceArea";
		if("sgis_dev".equals(hostName) || "mangWASZ".equals(hostName) || "gsks-was1".equals(hostName) || "gsks-was2".equals(hostName)) {
			sUrl = "http://10.175.80.221:6080/arcgis/rest/services/test03/Service_area/NAServer/Service%20Area/solveServiceArea"; //개발서버
		} else {
			//sUrl = "https://link.kostat.go.kr/arcgis/rest/services/test03/Service_area/NAServer/Service%20Area/solveServiceArea"; //운영
			sUrl = "http://27.101.210.68/arcgis/rest/services/test03/Service_area/NAServer/Service%20Area/solveServiceArea"; //운영(host파일에 link.kostat.go.kr이 등록이 않되어있을경우 이 구문을 사용한다.)
			
			//stime test
			//sUrl = "http://27.101.207.230:6080/arcgis/rest/services/test/Service_area/NAServer/Service%20Area/solveServiceArea"; //stime
		}
		
		
		String requestQueryString = req.getQueryString();
		logger.info( "requestQueryString[" + requestQueryString + "] " );
		
		ByteArrayOutputStream bStream = null;
		InputStream is = null;
		OutputStream os = null;
		String result = "";

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
			
			//_checkNullParameterValue( mapParameter );

			//optimizeParameterMap( mapParameter );
			
			String strFormat = _getViewType( req, res );
			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			bStream = new ByteArrayOutputStream();
			URL url = new URL(sUrl);
			URLConnection urlConnection = null;
			if(sUrl.startsWith("https")) {
				System.setProperty("https.protocols", "TLSv1,TLSv1.1,TLSv1.2");
				urlConnection = (HttpsURLConnection)url.openConnection();
			}else {
				urlConnection = url.openConnection();
			}
			//URLConnection urlConnection = url.openConnection();
			//HttpsURLConnection urlConnection = (HttpsURLConnection)url.openConnection();
			urlConnection.setDoOutput(true);
			
			os = urlConnection.getOutputStream();
			printByOutputStream(os, requestQueryString);
			
			is = urlConnection.getInputStream();
			printByInputStream(is, bStream);
			
			result = bStream.toString("UTF-8");
	
		}
		catch( ApiException e )
		{
			logger.error( e );
			throw e;
		}
		catch( IllegalArgumentException e )
		{
			logger.error( e );
			throw new ApiException( "입력값을 체크 해 주세요.", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( IOException e )
		{
			logger.error( e );
			throw new ApiException( "IO ERROR" );
		}
//		catch( UnsupportedEncodingException e )
//		{
//			logger.error( e );
//			throw new ApiException( "UnsupportedEncoding ERROR" );
//		}
		catch( Exception e )
		{
			logger.error(e);
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		finally {
			try {
				if(os != null && is != null && bStream != null){
					os.close();
					is.close();
					bStream.close();
				}
			} catch (IOException e) {
				logger.error(e);
				//LOGGER.error("IOException 예외", "IOException 예외");

			}
		}
		return result;
	}

	private void printByOutputStream(OutputStream os, String msg) throws IOException {
		byte[] msgBuf = msg.getBytes("UTF-8");
		os.write(msgBuf, 0, msgBuf.length);
		os.flush();
	}

	private void printByInputStream(InputStream is, ByteArrayOutputStream boStream) throws IOException {
		BufferedInputStream bis = null;
		try {
			bis = new BufferedInputStream(is);
			int imgByte;
			while ((imgByte = bis.read()) != -1) {
				boStream.write(imgByte);
			}
//		} catch (FileNotFoundException e) {
//			logger.error("FileNotFoundException 예외", e);
//		} catch (IOException e) {
//			logger.error("IOException 예외", e);
//		} catch (Exception e) {
//			LOGGER.error(e.getMessage(), e);
		} finally {
			if(bis != null){
				bis.close();
			}
		}
	}
	
	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		return OptionParam.class;
	}

	protected void optimizeParameterMap( Map mapParameter )
	{
	}

	@Override
	protected String getQueryStr()
	{
		return "";
	}

	enum MustParam
	{
	}

	enum OptionParam
	{
		accessToken,
		f,
		facilities,
		impedanceAttributeName,
		defaultBreaks,
		outSR,
		returnFacilities,
		returnBarriers,
		returnPolylineBarriers,
		returnPolygonBarriers,
		outputLines,
		outputPolygons
	}
}
