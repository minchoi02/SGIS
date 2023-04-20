/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.stereotype.Repository;

/**
 * @Class Name : BizStatsMapMapper.java
 * @Description : BizStatsMapMapper DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.21
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */


@Repository("bizStatsMapMapper")
public class BizStatsMapMapper extends EgovAbstractMapper {

	/**
	 * 테마별 업종 밀집도 정보 - 사업체 POI
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyDensity(Map mapParameter) throws SQLException {
		/*return selectList("bizStats.poiCompanyDensity", mapParameter);*/
		return selectList("bizStats.poiCompanyDensity_Test", mapParameter);
	}
	
	/**
	 * 지자체 인허가 통계 업종별 개업 현황 - 사업체 POI
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyOpen(Map mapParameter) throws SQLException {
		/*return selectList("bizStats.poiCompanyDensity", mapParameter);*/
		return selectList("bizStats.poiCompanyOpen", mapParameter);
	}
	
	/**
	 * mng_s 업종별 뜨는 지역
	 * 
	 */
	public List selectGetCompanyBestArea(Map mapParameter) throws SQLException {
		/*return selectList("bizStats.poiCompanyDensity", mapParameter);*/
		return selectList("bizStats.getCompanyBestArea", mapParameter);
	}
	
	public List selectjobBestTab10(Map mapParameter) throws SQLException {
		return selectList("bizStats.selectjobBestTab10", mapParameter);
	}
	
	public List selectjobBestTab20(Map mapParameter) throws SQLException {
		return selectList("bizStats.selectjobBestTab20", mapParameter);
	}
	
	public List selectjobBestTab30(Map mapParameter) throws SQLException {
		return selectList("bizStats.selectjobBestTab30", mapParameter);
	}
	
	public List selectjobBestTab40(Map mapParameter) throws SQLException {
		return selectList("bizStats.selectjobBestTab40", mapParameter);
	}
	
	public List selectjobBestTab50(Map mapParameter) throws SQLException {
		return selectList("bizStats.selectjobBestTab50", mapParameter);
	}
	
	public List selectjobBestTabFull(Map mapParameter) throws SQLException {
		return selectList("bizStats.selectjobBestTabFull", mapParameter);
	}
	
	/**
	 * 테마별 업종 밀집도 정보 - 사업체 년도별 개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiCompanyTimeSeries(Map mapParameter) throws SQLException {
		return selectList("bizStats.poiCompanyTimeSeries", mapParameter);
	}
	
	/**
	 * 지자체 인허가 통계 업종별 개업 현황 - 사업체 년도별 개수
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPoiOpenTimeSeries(Map mapParameter) throws SQLException {
		return selectList("bizStats.poiOpenTimeSeries", mapParameter);
	}
	
	/**
	 * 지역 종합정보 조회 - 총사업체, 총인구, 총가구, 총주택 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAllCompanyPplHouse(Map mapParameter) throws SQLException {
		return selectOne("bizStats.allCompanyPplHouse", mapParameter);
	}
	
	/**
	 * 상권정보 - 선택영역 비율 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getTradeSelectAreaRatio(Map mapParameter) throws SQLException {
		return selectOne("bizStats.tradeSelectAreaRatio", mapParameter);
	}
	
	/**
	 * 상권정보 - 전국평균 비율 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getTradeCountryAvgRatio(Map mapParameter) throws SQLException {
		return selectOne("bizStats.tradeCountryAvgRatio", mapParameter);
	}
	
	/**
	 * 상권정보 - 영역 내 선택업종 현황
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTradeAreaCorp(Map mapParameter) throws SQLException {
		return selectList("bizStats.tradeAreaCorp", mapParameter);
	}
	
	/**
	 * 지역종합정보 - 주요시설물 정보
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map mainFacilityList(Map mapParameter) throws SQLException {
		return selectOne("bizStats.mainFacilityList", mapParameter);
	}
	
	/**
	 * 지역종합정보 - 주요시설물 정보(테마코드 조회)
	 * @param mapParameter
	 * @exception Exception
	 */	
	public List mainFacilityList_thcd(Map mapParameter) throws SQLException {
		return selectList("bizStats.mainFacilityList_thcd", mapParameter);
	}
	
	/**
	 * 업종밀집도 - 시군구별 소속 읍면동 조회
	 * @param mapParameter
	 * @exception Exception
	 */	
	public List getEmdongListBySgg(Map mapParameter) throws SQLException {
		return selectList("bizStats.getEmdongListBySgg", mapParameter);
	}
	
}