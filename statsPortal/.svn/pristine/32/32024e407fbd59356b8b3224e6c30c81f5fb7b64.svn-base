package kostat.sop.ServiceAPI.api.addr;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;

/**
* 리버스 지오코딩 API
* 입력된 좌표의 주소를 조회하는 API
* <pre>
* input : rgeocode.json/xml
* output : json/xml
* Table : SRV_PG_CENSUSBD
* </pre>
*
* <pre>
* <b>History:</b> 
* 나재웅, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 나재웅
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Rgeocode extends AbsQuery< List >
{
	private static final Log logger = LogFactory.getLog( Rgeocode.class );

	@Override
	public String getApiId()
	{
		return "API_0703";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		System.out.println("executeAPI");
		httpSession = req.getSession();

		List result = null;

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			Map mapParameter = getParameterMap( req );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			result = session.selectList( getQueryStr(), mapParameter );
		}
		
		catch( Exception e )
		{
			logger.error( e );
			try {
				throw new Exception( "서버에서 처리 중 에러가 발생하였습니다." );
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		return result;
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

	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{
		String addr_type = null;
		String bnd_year = null;
		String accuracy = null;

		addr_type = (String) mapParameter.get( "addr_type" );
		if( addr_type == null )
		{
			mapParameter.put( "addr_type", "10" );
		}
		else if( !( Integer.parseInt( addr_type ) == 10 || Integer.parseInt( addr_type ) == 20 || Integer.parseInt( addr_type ) == 21 || Integer.parseInt( addr_type ) == 30 ) )
		{
			throw new Exception( "주소종류 값을 확인하세요.");
		}
		
		
//		mapParameter.put( "bnd_year", bnd_year );
		
		if( mapParameter.containsKey( OptionParam.accuracy.name() ) )
		{
			accuracy = (String) mapParameter.get( OptionParam.accuracy.name() );
			
			// accuracy 옵션이 1이 아니면 0으로 바꾼다.
			if( !accuracy.equals( "1" ) )
			{
				mapParameter.put( OptionParam.accuracy.name(), "0" );
			}
		}
	}
	
	@Override
	protected String getQueryStr()
	{
		return "addr.rgeocode";
	}

	enum MustParam
	{
		x_coor
		, y_coor
	}

	enum OptionParam
	{
		accessToken
		, addr_type
		, bnd_year
		, accuracy
		, zoom // djlee 2019-05-16 수정
		, beforeZoom // djlee 2019-05-16 수정
		, interactiveLike // djlee 2019-05-16 수정
	}
}
