package kostat.sop.OpenAPI3.service.technicalbiz.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.OpenAPI3.service.technicalbiz.CompanyInfoService;
import kostat.sop.OpenAPI3.service.technicalbiz.mapper.CompanyInfoMapper;

import org.springframework.stereotype.Service;

import com.neighborsystem.durian.exception.AbsException;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


/**
 * @Class Name : CompanyInfoServiceImpl.java
 * @Description : CompanyInfoServiceImpl 인터페이스 구현
 * @ 
 * @ 수정일 수정자 수정내용 
 * @ --------- --------- ------------------------------- 
 * @ 2016.10.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.10.07
 * @version 1.0
 * @see
 *
 * Copyright (C) by NeighborSystem All right reserved.
 */
@Service( "companyInfoService" )
public class CompanyInfoServiceImpl extends EgovAbstractServiceImpl
		implements CompanyInfoService
{
	@Resource(name = "companyInfoMapper")
	private CompanyInfoMapper mapper;
	
	@Override
	public List< Map< String, Object > > selectCompanyInfo( Map< String, String > parameter ) throws AbsException
	{
		List< Map< String, Object > > result = new ArrayList<Map<String,Object>>(); 
		List< Map< String, String > > listTemp = null;
		Map< String, Object > mapTemp = null;
		
		//최근 5개년도 조회
		List yearList = mapper.selectYearInfo(parameter);
		
		for(int i=0; i<yearList.size(); i++){
			mapTemp = new HashMap< String, Object >();
			
			String year = yearList.get(i).toString();
			parameter.put("year", year);
			
			listTemp = mapper.selectCompanyInfo(parameter);
			
			mapTemp.put("year", year);
			mapTemp.put("techbiz_corp_total_cnt", mapper.selectTotalCorpCnt(parameter));
			mapTemp.put("techbiz_list", listTemp);
			
			result.add(mapTemp);
		}
		return 	result;
	}
}
