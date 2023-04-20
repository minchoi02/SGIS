package kostat.sop.ServiceAPI.api.catchmentArea;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

public class SrvAreaHadmarea extends AbsQuery< List > {
	private static final Log logger = LogFactory.getLog( SrvAreaHadmarea.class );

	/*	
		private List bnd_year_list = null;
		
		public void setBnd_year_list(List bnd_year_list) {
			this.bnd_year_list = bnd_year_list;
		}
	*/
	@Override
	public String getApiId()
	{
		return "API_202011";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.POST;
	}

	
	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		httpSession = req.getSession();

		List result = null;
		
		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			
			_checkNullParameterValue( mapParameter );


			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				mapParameter.put( "strFormat", "1" );
			}
			
			result = session.selectList( getQueryStr(), mapParameter );

		}
		
		catch( ApiException e )
		{
			//e.printStackTrace();
			logger.error(e);
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

	@Override
	protected String getQueryStr()
	{
		return "catchmentAreaBoundary.gridSrvarea";
	}

	enum MustParam
	{
	}

	enum OptionParam
	{
		accessToken
		, area
		, radius
		, grid_level
		, srvAreaType
	}

}
