package kostat.sop.OpenAPI3.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class KDataPortalHttpServletFilter implements Filter
{

	@Override
	public void init( FilterConfig filterConfig ) throws ServletException
	{
		// Do Nothing
	}

	@Override
	public void doFilter( ServletRequest request, ServletResponse response, FilterChain chain ) throws IOException, ServletException
	{
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		KDataPortalParameterWrapper wRequest = new KDataPortalParameterWrapper( httpRequest );

		// 공공데이터포탈 리퀘스트일 경우 키체크를 시도 하고 실패시 ServletException 발생.
		if( wRequest.keyCheck() ) 
		{
			chain.doFilter( wRequest, response );
		}
		else
		{
			chain.doFilter( request, response );
		}

	}

	@Override
	public void destroy()
	{
		// Do Nothing
	}

}
