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
package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import kostat.sop.ServiceAPI.controller.service.TotSurvDetailService;
import kostat.sop.ServiceAPI.controller.service.mapper.TotSurvDetailMapper;

/**
 * @Class Name : TotSurvDetailServiceImpl.java
 * @Description : TotSurvDetailServiceImpl Implement Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2020.08.10           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020. 08.10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */

@Service("totSurvDetailService")
public class TotSurvDetailServiceImpl extends EgovAbstractServiceImpl implements TotSurvDetailService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TotSurvDetailServiceImpl.class);

	/** totSurvDetailMapperDAO */
	@Resource(name="totSurvDetailMapper")
	private TotSurvDetailMapper totSurvDetailMapper;

	/**
	 * 상세페이지 마지막년도 조회
	 * @param 
	 * @exception Exception
	 */
	@Override
	public String getTotLastYear() throws SQLException {
		return totSurvDetailMapper.getTotLastYear();
	}
	
	/**
	 * 상세 목록 조회 Type1 ( 조회 특성의 갯수가 0이고 하위특성)
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List getTypeOneDetailSearch(Map mapParameter) throws SQLException {
		return totSurvDetailMapper.getTypeOneDetailSearch(mapParameter);
	}

	/**
	 * 화면 표출 옵션 (관리자모드에서 설정)
	 * 2021-12-17 [이영호] 총조사 대쉬보드
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List<EgovMap> getDispSrvList(HashMap<String, Object> params) throws SQLException {
		return totSurvDetailMapper.getDispSrvList(params);
	}
	
	/**
	 * 화면 표출 옵션 (관리자모드에서 설정)
	 * 2021-12-17 [이영호] 총조사 상세
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List<EgovMap> getDispSrvDetailList(HashMap<String, Object> params) throws SQLException {
		return totSurvDetailMapper.getDispSrvDetailList(params);
	}
	
	/**
	 * 통계표 기본 정보 가져오기
	 * 2021-08-19 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List<EgovMap> getStblInfo(HashMap<String, Object> params) throws SQLException {
		return totSurvDetailMapper.getStblInfo(params);
	}
	
	/**
	 * 통계표 전체 리스트 가져오기
	 * 2022-01-27 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List<EgovMap> getAllTblList() throws SQLException {
		return totSurvDetailMapper.getAllTblList();
	}
	
	/**
	 * 통계표 전체 리스트 ID 가져오기
	 * 2022-01-27 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List<EgovMap> getAllListIdList() throws SQLException {
		return totSurvDetailMapper.getAllListIdList();
	}
	
	/**
	 * 통계표 ID 가져오기
	 * 2022-03-18 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List<EgovMap> getTblIdFromSurvId(HashMap<String, Object> params) throws SQLException {
		return totSurvDetailMapper.getTblIdFromSurvId(params);
	}
}