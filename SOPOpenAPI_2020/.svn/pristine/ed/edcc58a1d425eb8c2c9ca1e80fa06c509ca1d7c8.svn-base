package kostat.sop.OpenAPI3.api.stats;

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

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.service.stats.CompanyTotalService;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;

/**
* 사업체 통계 API 통계청 센서스 정보중 사업체 통계를 조회하기 위한 API
* 
* <pre>
* input : company.json/xml
* output : json/xml
* Table : SRV_DT_CORPCLASSSGG
* SRV_DT_CORPTHEMESGG
* SRV_DT_CORPCLASSREG
* SRV_DT_CORPTHEMEREG
* </pre>
* 
* <pre>
* <b>History:</b> 
* 김현태 1.0, 2016/08/29 초기 작성
* </pre>
* 
* @author 김현태
* @version 1.0, 2016/08/26
* @see None
*/
public class CompanyTotal extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( CompanyTotal.class );

	private CompanyTotalService companyTotalService;
	
	public CompanyTotalService getCompanyTotalService()
	{
		return companyTotalService;
	}

	public void setCompanyTotalService( CompanyTotalService companyTotalService )
	{
		this.companyTotalService = companyTotalService;
	}

	@Override
	public String getApiId()
	{
		return "API_0304";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@SuppressWarnings( {"rawtypes", "unchecked"} )
	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		String strFormat = _getViewType( req, res );
		if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
		{
			throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
		}

		Map<String, String> mapParameter = getParameterMap( req );
		
		// 영역타입이 사용자 지정 일경우
		String strAreaType = mapParameter.get( OptionParam.area_type.name());
		
		// 2017. 11. 09 [개발팀] 추가
		if( strAreaType == null) {
			strAreaType = "0";
		}
		
		// mng_s 2017. 08. 08 석진혁
		if( strAreaType != null && strAreaType.equals( "1" )) {
			userareackeck( mapParameter );
		}
		// mng_e 2017. 08. 08 석진혁
		
		List result = companyTotalService.selectCompanyTotal( mapParameter );
		return result;
	}

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

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
	protected String getQueryStr() { return null; }

	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		adm_cd,
		low_search,
		area,
		class_code,
		accessToken,
		bnd_year,
		theme_cd,
		area_type,
		class_deg
	}

}
