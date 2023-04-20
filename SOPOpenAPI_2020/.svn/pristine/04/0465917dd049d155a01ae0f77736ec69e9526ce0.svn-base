package kostat.sop.OpenAPI3.common.intercepter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import junit.framework.Assert;

@Deprecated
public class KoreaDataPortalHandlerInterceptorAdapter
		extends HandlerInterceptorAdapter
{
	private static final Log logger = LogFactory.getLog( KoreaDataPortalHandlerInterceptorAdapter.class );
	@Override
	public boolean preHandle( HttpServletRequest request, HttpServletResponse response, Object handler ) throws Exception
	{
		if( logger.isDebugEnabled() )
		{
			logger.debug( "HandlerInterCeptor preHandler called." );
		}
		
		Map mapParameter = request.getParameterMap();
		mapParameter.remove( "test" );

		Assert.assertEquals( mapParameter.get( "test" ), request.getParameter( "test" ) );
		return true;
	}


}
