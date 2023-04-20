package kostat.sop.ServiceAPI.service.stats.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : CompanyTotalForBoroughMapper.java
 * @Description : 대화형통계지도 > 전국 사업체 조사(비자치구 관련)
 * 원형 : kostat.sop.OpenAPI3.service.stats.mapper.CensusIndexMapper
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2020.04.10 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020. 04.10
 * @version 1.0
 * @see
 *
 */

@Repository( "companyTotalForBoroughMapper" )
public class CompanyTotalForBoroughMapper extends EgovAbstractMapper 
{
	public List< Map< String, Object > > selectCompanyTotal( Map< String, String > parameter )
	{
		return selectList( "stats.companyTotalForBorough", parameter );
	}
}
