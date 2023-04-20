package kostat.sop.ServiceAPI.api.stats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.service.stats.CensusIndexForBoroughService;

/**
 * @Class Name : CensusIndexForBorough.java
 * @Description : 대화형통계지도에서 4시군구 5시군구 처리(4시군구 조회시에만 호출)
 * 원형 : kostat.sop.OpenAPI3.api.stats.CensusIndex
 * * 관련 TABLE
 * -----------------------------
 * SRV_DT_CENSUSINDEX
 * SRV_DT_TOTCENSUSINDEX
 * SRV_DT_ADM_TOT_REG_MATCH
 * 
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2020.04.02 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020. 04.02
 * @version 1.0
 * @see
 *
 */

@SuppressWarnings( "rawtypes" )
public class CensusIndexForBorough extends AbsQuery<List> {

	private static final Log logger = LogFactory.getLog( CensusIndexForBorough.class );
	
	private CensusIndexForBoroughService censusIndexForBoroughService;
	
	public CensusIndexForBoroughService getCensusIndexForBoroughService()
	{
		return censusIndexForBoroughService;
	}

	public void setCensusIndexForBoroughService( CensusIndexForBoroughService censusIndexForBoroughService )
	{
		this.censusIndexForBoroughService = censusIndexForBoroughService;
	}

	@Override
	public String getApiId()
	{
		return "API_0301";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		Map<String, String> parameter = getParameterMap( req );
		
		//2020년수정변경 시작 (ggm)
		if(parameter.get("is_zoom_lvl4") == null) {
			parameter.put("is_zoom_lvl4", "N");
		}
		if(parameter.get("is_non_self") == null) {
			parameter.put("is_non_self", "N");
		}
		//2020년수정변경 끝
		
		logger.debug("parameter.get(\"area\") [" + parameter.get("area"));
		logger.debug("parameter.get(\"year\") [" + parameter.get("year"));
		
		//mng_s kimjoonha grid
		if(parameter.get("area")!= null && !"".equals(parameter.get("area"))) {
			return censusIndexForBoroughService.selectCensusIndexGrid( parameter );
		} else if(parameter.get("bnd_grid")!= null && "bnd_grid".equals(parameter.get("bnd_grid"))) {
			return censusIndexForBoroughService.selectCensusIndexBndGrid( parameter );
		} else {
			return censusIndexForBoroughService.selectCensusIndex( parameter );
		}
		
		
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

	protected void optimizeParameterMap( Map mapParameter ) throws Exception {}

	@Override
	protected String getQueryStr() { return null; }

	private enum MustParam 
	{
		year
		, accessToken
	}
	
	private enum OptionParam 
	{
		adm_cd
		, low_search
		, bnd_year
		, area //mng_s kimjoonha grid
		, zoom //mng_s kimjoonha grid
		, bnd_grid //mng_s 행정구역 그리드 20180208
		//, sido_cd //mng_s 행정구역 그리드 20180208
		//, sgg_cd //mng_s 행정구역 그리드 20180208
		//, emdong_cd //mng_s 행정구역 그리드 20180208
		, filter //mng_s 20180903 행정구역 그리드에서 쿼리를 union all을 태우지 말고 나누기 위한 파라미터
		, is_zoom_lvl4	//2020년수정변경: 4시군구 조회여부 구분자-줌레벨이 4(ggm)
		, is_non_self		//2020년수정변경: 4시군구 조회여부 구분자-비자치구를 포함한 시 여부(ggm)
	}
}
