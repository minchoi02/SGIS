package kostat.sop.OpenAPI3.common.filter;

import java.util.Collections;
import java.util.Enumeration;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.exception.UnauthorizedException;

import kr.co.smartguru.apim.gateway.util.APIMGatewayUtil;

public class KDataPortalParameterWrapper extends HttpServletRequestWrapper
{

	//	private final Map< String, String [] > modifiableParameters;
	private Map< String, String [] > allParameters = null;

	private final String SG_APIM = "SG_APIM";

	private final String SERVICE_KEY = "";

	public KDataPortalParameterWrapper( HttpServletRequest request )
	{
		super( request );
	}

	private boolean isKDataPortalParameter()
	{
		String strKey = getParameterSuper( SG_APIM );
		return ( strKey != null ) ? true : false;
	}
	
	private String getParameterSuper(String name) {
		return super.getParameter( name );
	}

	public boolean keyCheck() throws AbsHttpException
	{
		if( isKDataPortalParameter() )
		{
			String strKey = getParameterSuper( SG_APIM );
			if( APIMGatewayUtil.SG_APIM_Check( strKey ) == 1 )
			{
				if( allParameters == null )
				{
					allParameters = new TreeMap< String, String [] >();
					allParameters.putAll( super.getParameterMap() );
					allParameters.remove( SG_APIM );
				}

				allParameters.put( "accessToken", new String []{"KDATA"} );
				return true;
			}
			throw new UnauthorizedException( "공공데이터포털 키체크 오류." );
		}

		return false;
	}

	@Override
	public String getParameter( final String name )
	{
		if( name.equals( SG_APIM ) )
		{
			return null;
		}

		String [] strings = getParameterMap().get( name );

		if( strings != null )
		{
			return strings[0];
		}
		return null;
	}

	@Override
	public Map< String, String [] > getParameterMap()
	{
		if( allParameters == null )
		{
			allParameters = new TreeMap< String, String [] >();
			allParameters.putAll( super.getParameterMap() );
			allParameters.remove( SG_APIM );
			// allParameters.putAll( modifiableParameters );
		}
		//Return an unmodifiable collection because we need to uphold the interface contract.
		return Collections.unmodifiableMap( allParameters );
	}

	@Override
	public Enumeration< String > getParameterNames()
	{
		return Collections.enumeration( getParameterMap().keySet() );
	}

	@Override
	public String [] getParameterValues( final String name )
	{
		return getParameterMap().get( name );
	}
}
