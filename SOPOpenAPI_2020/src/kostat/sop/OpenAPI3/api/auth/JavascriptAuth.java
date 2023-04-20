package kostat.sop.OpenAPI3.api.auth;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.api.DurianMV;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.OpenAPI3.common.controller.AbsQuery;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;

/**
 * JavaScript제공 API JavaScript API를 제공하기위한 인증 API
 * 
 * <pre>
* input : javascriptauth
* output : js
* Table : None
 * </pre>
 *
 * <pre>
* <b>History:</b> 
* 심홍헌, 1.0, 2014/09/24 초기 작성
 * </pre>
 * 
 * @author 심홍헌
 * @version 1.0, 2014/09/24 메서드 추가
 * @see None
 */

public class JavascriptAuth extends AbsQuery< List >
{
	private static final Log logger = LogFactory.getLog( JavascriptAuth.class );

	private String srv_id = null;
	
	private String mobilePath;
	
	private String webPath;
	
	public void setMobileScript(String filePath) {
		mobilePath = filePath;
	}
	
	public void setWebScript(String filePath) {
		webPath = filePath;
	}
	
	public String getMobileScript() {
		return mobilePath;
	}
	
	public String getWebScript() {
		return webPath;
	}

	@Override
	public String getApiId()
	{
		return "API_0102";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	public ModelAndView handleRequest( HttpServletRequest req, HttpServletResponse res ) throws Exception
	{
		NFData datas = null;
		String strFormat = "json";
		String strTrId = null;
		Map paramsMap = null;

		try
		{
			datas = new NFData();

			datas.put( CommonTag.id.name(), this.getApiId() );

			// API 고유번호를 할당한다.
			strTrId = createTrID( req );
			datas.put( CommonTag.trId.name(), strTrId );

			logger.info( "START - TrID[" + strTrId + "] API[" + this.getApiId() + "]" );

			paramsMap = req.getParameterMap();

			// 클라이언트에게 응답할 형식을 찾아낸다.
			strFormat = _getViewType( req, res );

			// http Method를 검사한다.
			checkHttpMethod( req.getMethod() );

			// http header 점검한다.
			checkHttpHeader( req, res, datas );

			// 필수 입력 파라미터를 점검한다.
			checkMustParam( paramsMap );

			// 정의되지 않은 파라미터 입력 여부를 점검한다.
			checkUndefineParameter( paramsMap );

			// 입력된 파라미터에 null이 존재하는지 검사한다.
			checkNullParameterValue( paramsMap );

			// 인증 처리 부분을 검사한다.
			checkAuth( req, res );

			// API 공유의 기능을 수행한다.
			prepareExecute( req, res );
			datas.put( CommonTag.errCd.name(), 0 );
			datas.put( CommonTag.errMsg.name(), "Success" );
			executeAPI( req, res, strTrId );
//			if (resultObj != null) {
//				datas.put(CommonTag.result.name(), resultObj);
//			}
			successExecute( req, res, datas );
		}
		catch( AbsAPIException e )
		{
			failExecute( req, res, datas );
			makeError( datas, e );
			logger.error( "ERROR- TrID[" + strTrId + "] [" + datas.get( CommonTag.id.name() ) + "] [" + e.getErrCode() + "] [" + e.getErrMessage() + "]" );
			return new DurianMV( strFormat, datas );
		}
		catch( AbsHttpException e )
		{
			failExecute( req, res, datas );
			logger.error( "ERROR- TrID[" + strTrId + "] [" + datas.get( CommonTag.id.name() ) + "] [" + e.getMessage() + "]" );
			throw e;
		}
		finally
		{
			afterExecute( req, res );
			logger.info( "END - TrID[" + strTrId + "] API[" + this.getApiId() + "]" );
		}
		// ----------------------------------------------------------

		//		return new DurianMV(strFormat, datas);
		return null;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

		FileReader filereader = null;
		BufferedReader reader = null;

		String strFormat = _getViewType( req, res );
		Map mapParameter = getParameterMap( req );

		_checkNullParameterValue( mapParameter );
		try
		{

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			String consumer_key = (String) mapParameter.get( MustParam.consumer_key.name() );
			int authcount = (Integer) session.selectOne( "auth.getJavascriptAuth", mapParameter );

			if( authcount == 0 )
			{
				throw new ApiException( "인증정보가 존재하지 않습니다", COMM_ERR_CODE.AUTH_FAILE );
			}
			else
			{
				srv_id = consumer_key;
			}

			byte [] buffer = new byte [1024];
			
			// 2015.09.30 mobile 버전 지원을 위해 수정.(Line 181 ~ 192)
			String path = _getTypePath( (String) mapParameter.get( OptionParam.type.name() ) );
			
			File file = new File( path );
			filereader = new FileReader( file );
			reader = new BufferedReader( filereader );

			StringBuffer sb = new StringBuffer();
			char [] cbuf = new char[512];
			int intLen = 0;
//			String line = null;
			
			while((intLen = reader.read( cbuf )) != -1) {
				sb.append( cbuf, 0, intLen );
			}
			
//			while( ( line = reader.readLine() ) != null )
//			{
//				res.getOutputStream().write( line.getBytes() );
//			}
			
			res.getOutputStream().write( sb.toString().getBytes() );

			res.getOutputStream().flush();

		}
		catch( AbsAPIException e )
		{
			logger.error( e );
			throw e;
		}
		catch( IllegalArgumentException e )
		{
			logger.error( e );
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( IOException e )
		{
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		catch( Exception e )
		{
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		finally
		{
			try
			{
				if( reader != null )
				{
					reader.close();
				}

				if( filereader != null )
				{
					filereader.close();
				}
			}
			catch( IOException e )
			{
				throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
			}
		}

		return null;
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

	@Override
	protected String getQueryStr()
	{
		return null;
	}

	enum MustParam
	{
		consumer_key
	}

	enum OptionParam
	{
		consumer_secret,
		type
	}

	@Override
	public String checkAuth( Map mapParameter )
	{
		return null;
	}

	@Override
	public void successExecute( SqlSession session, String srv_id, NFData datas ) throws AbsException
	{

		if( this.srv_id == null )
		{
			logger.debug( "srv_id is null" );
			return;
		}
		HashMap< String, String > loginfomap = new HashMap< String, String >();
		loginfomap.put( "srv_id", this.srv_id );
		loginfomap.put( "succ_yn", "Y" );
		loginfomap.put( "api_id", datas.getString( CommonTag.id.name() ) );
		loginfomap.put( "tr_id", datas.getString( CommonTag.trId.name() ) );
		insertlog( session, loginfomap );
		this.srv_id = null;
	}
	
	/**
	 * 입력받은 타입에 맞는 자바스크립트 Path를 반환 한다.
	 * 
	 * @param type
	 * @return
	 */
	private String _getTypePath(String type) {
		if(type == null) {
			return webPath;
		} else if(type.equals( "mobile" )) {
			return mobilePath;
		} else {
			return webPath;
		}
	}
}
