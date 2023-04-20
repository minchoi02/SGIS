package kostat.sop.ServiceAPI.api.catchmentArea;

import java.util.HashMap;
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
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

public class KSICInfo extends AbsQuery<HashMap<String, Object>> {

	private static final Log logger = LogFactory.getLog( KSICInfo.class );
	
	@Override
	public String getApiId()
	{
		return "API_202081";
	}
	
	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.POST;
	}
	
	@Override
	public HashMap<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		httpSession = req.getSession();

		HashMap<String, Object> resultMap = new HashMap<>();
		List result = null;

		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );
			
			String strFormat = _getViewType( req, res );

			if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			String workGb = StringUtil.isNullToString(mapParameter.get("workGb"));
			if("S".equals(workGb)){
				int listCnt = (int)session.selectOne("catchmentArea.selectKSICCnt", mapParameter);
				resultMap.put("total_count", listCnt);
				
				if(listCnt > 0) {
					result = session.selectList( getQueryStr(), mapParameter );
					resultMap.put("list", result);
				}
			} else if("T".equals(workGb)){
				result = session.selectList( getQueryStr(), mapParameter );
				resultMap.put("list", result);
			} else if("D".equals(workGb)){
				result = session.selectList( "catchmentArea.selectKSICdetail", mapParameter );
				resultMap.put("list", result);
			}

			if( result == null || result.size() == 0 )
			{
				throw new NoResultException();
			}

			logger.info( "END Query - TXID[" + getApiId() + "] " );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "[ result = " + resultMap + " ]" );
			}
		}
		catch( PersistenceException e )
		{
			logger.error( e );
			throw new DurianSQLException( "SQL ERROR" );
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
		catch( Exception e )
		{
			logger.error(e);
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		return resultMap;
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
		String workGb = StringUtil.isNullToString(mapParameter.get("workGb"));			
		if("T".equals(workGb)){
			String classCd = (String) mapParameter.get( OptionParam.classCd.name() );
			String code_length = null;

			if( classCd == null )
			{
			}
			else if( classCd != null && classCd.length() == 1 )
			{
				String ksic1 = classCd;
				code_length = String.valueOf( classCd.length() );
				mapParameter.put( "ksic1", ksic1 );
				mapParameter.put( "code_length", code_length );
			}
			else if( classCd != null && classCd.length() >= 3 && classCd.length() <= 6 )
			{
				String ksic1 = classCd.substring( 0, 1 );
				String ksic5 = classCd.substring( 1, classCd.length() );
				code_length = String.valueOf( classCd.length() );
				mapParameter.put( "ksic1", ksic1 );
				mapParameter.put( "ksic5", ksic5 );
				mapParameter.put( "code_length", code_length );
			}
			else
			{
				throw new ApiException( "코드 값을 다시입력하세요", COMM_ERR_CODE.ERR_PARAM );
			}			
		}else if("S".equals(workGb)){
			
			int startRowNo = 1;		// 시작행 번호
			int rowsPerPage = 10;	// 페이지당 로우수
			int minDepth = 3;
			String pageNo = StringUtil.isNullToString(mapParameter.get("pageNo"));
			String pageSize = StringUtil.isNullToString(mapParameter.get("pageSize"));
			String schMinDepth = StringUtil.isNullToString(mapParameter.get("schMinDepth"));
			
			if(StringUtil.NumberChk(pageNo) && StringUtil.NumberChk(pageSize)) {
				// NumberChk : char48 ~ 57 ?				
				rowsPerPage = Integer.parseInt(pageSize);
				if(Integer.parseInt(pageNo) > 0) {
					startRowNo = ((Integer.parseInt(pageNo) - 1) * rowsPerPage) + 1;
				}
			}
			
			if(StringUtil.NumberChk(schMinDepth)) {
				minDepth = Integer.parseInt(schMinDepth);
			}

			mapParameter.put("startRowNo", startRowNo);
			mapParameter.put("rowsPerPage", rowsPerPage);
			mapParameter.put("minDepth", minDepth);
		}
	}

	@Override
	protected String getQueryStr()
	{
		return "catchmentArea.selectKSIClist";
	}

	enum MustParam
	{
		classDeg,
		workGb
	}

	enum OptionParam
	{
		accessToken,		
		classCd,
		schWord,
		schClassCd,
		schMinDepth,
		pageNo,
		pageSize,
		ksicCd
	}
}
