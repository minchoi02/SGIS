package kostat.sop.OpenAPI3.api.transformation;

import java.awt.geom.Point2D;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.jhlabs.map.proj.Projection;
import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.coord.ProjectionFactory;
import kostat.sop.OpenAPI3.common.util.StringUtil;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;

/**
* 좌표변환 API 좌표변환을 제공
* 
* <pre>
* input : transformation.json/xml
* output : json/xml
* Table : TB_API_AUTH_INFO, TB_API_TOKEN_INFO
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

public class Coordinate extends AbsAuthAPI< Map >
{
	private static final Log logger = LogFactory.getLog( Coordinate.class );

	private ProjectionFactory fProj;

	public void setProjection( ProjectionFactory proj )
	{
		fProj = proj;
	}

	@Override
	public String getApiId()
	{
		return "API_0201";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		httpSession = req.getSession();

		Map resultMap = null;
		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			String strsrc = (String) mapParameter.get( "src" );
			String strdst = (String) mapParameter.get( "dst" );
			String posX = (String) mapParameter.get( "posX" );
			String posY = (String) mapParameter.get( "posY" );

			strsrc = strsrc.toUpperCase();
			strdst = strdst.toUpperCase();

			if( !strsrc.contains( "EPSG:" ) )
			{
				strsrc = "EPSG:" + strsrc;
			}
			if( !strdst.contains( "EPSG:" ) )
			{
				strdst = "EPSG:" + strdst;
			}
			if( !StringUtil.NumberChk( posX.replaceAll( "\\.", "" ) ) || !StringUtil.NumberChk( posY.replaceAll( "\\.", "" ) ) )
			{
				throw new ApiException( "좌표형은 숫자만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}

			/*CoordinateTransform coordinateTransform = null;
			CRSFactory crsFactory = new CRSFactory();
			CoordinateTransformFactory cd = new CoordinateTransformFactory();
			coordinateTransform = cd.createTransform( crsFactory.createFromName( strsrc ), crsFactory.createFromName( strdst ) );
			ProjCoordinate src = new ProjCoordinate( Double.valueOf( posX ), Double.valueOf( posY ) );
			ProjCoordinate tgt = new ProjCoordinate();
			coordinateTransform.transform( src, tgt );*/

			resultMap = new HashMap();
			/*resultMap.put( "toSrs", strdst );
			resultMap.put( "posX", tgt.x );
			resultMap.put( "posY", tgt.y );*/

			Point2D.Double srcPoint, dstPoint;
			srcPoint = new Point2D.Double( Double.valueOf( posX ), Double.valueOf( posY ) );
			dstPoint = new Point2D.Double();
			transform( fProj.getProjection( strsrc ), srcPoint, fProj.getProjection( strdst ), dstPoint );

			resultMap.put( "posX", dstPoint.getX() );
			resultMap.put( "posY", dstPoint.getY() );

			logger.info( "END Query - TXID[" + getApiId() + "] " );

		}
		catch( AbsAPIException e )
		{
			logger.error( e );
			throw e;
		}
		catch( IllegalArgumentException e )
		{
			logger.error( e );
			//			throw new ParameterException("입력값을 체크 해 주세요");
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다." );
		}
		return resultMap;
	}

	private Point2D.Double transform( Projection srcProj, Point2D.Double srcPoint,
			Projection dstProj, Point2D.Double dstPoint ) throws ApiException
	{

		if( srcProj == null || dstProj == null )
		{
			throw new ApiException( "정의된 EPSG 코드값이 아닙니다. EPSG코드 값을 확인하여 주세요", COMM_ERR_CODE.ERR_PARAM );
		}

		Point2D.Double inversePoint;

		if( srcProj.hasInverse() )
		{
			inversePoint = new Point2D.Double();
			srcProj.inverseTransform( srcPoint, inversePoint );
		}
		else
		{
			inversePoint = srcPoint;
		}

		dstProj.transform( inversePoint, dstPoint );

		return dstPoint;
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

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{
	}

	enum MustParam
	{
		src
		, dst
		, posX
		, posY
	}

	enum OptionParam
	{
		accessToken
	}
}
