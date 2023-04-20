package kostat.sop.ServiceAPI.api.stats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.service.stats.CompanyTotalForBoroughService;

/**
* 사업체 통계 API 통계청 센서스 정보중 사업체 통계를 조회하기 위한 API
* 
* <pre>
* input : companyForBorough.json/xml
* output : json/xml
* Table : SRV_DT_CORPCLASSSGG
* SRV_DT_CORPTHEMESGG
* SRV_DT_CORPCLASSREG
* SRV_DT_CORPTHEMEREG
* </pre>
* 
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2020.04.10 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020. 04.10
 * @version 1.0
 * @see
*/
public class CompanyTotalForBorough extends AbsQuery< List >
{
	private static final Log logger = LogFactory.getLog( CompanyTotalForBorough.class );

	private CompanyTotalForBoroughService companyTotalForBoroughService;
	
	public CompanyTotalForBoroughService getCompanyTotalForBoroughService()
	{
		return companyTotalForBoroughService;
	}

	public void setCompanyTotalForBoroughService( CompanyTotalForBoroughService companyTotalForBoroughService )
	{
		this.companyTotalForBoroughService = companyTotalForBoroughService;
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

		//2020년수정변경 시작 (ggm)
		if(mapParameter.get("is_zoom_lvl4") == null) {
			mapParameter.put("is_zoom_lvl4", "N");
		}
		if(mapParameter.get("is_non_self") == null) {
			mapParameter.put("is_non_self", "N");
		}
		//2020년수정변경 끝
		
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
		
		List result = companyTotalForBoroughService.selectCompanyTotal( mapParameter );
		return result;
	}

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
		, is_zoom_lvl4		//2020년수정변경: 4시군구 조회여부 구분자-줌레벨이 4(ggm)
		, is_non_self		//2020년수정변경: 4시군구 조회여부 구분자-비자치구를 포함한 시 여부(ggm)		
	}

}
