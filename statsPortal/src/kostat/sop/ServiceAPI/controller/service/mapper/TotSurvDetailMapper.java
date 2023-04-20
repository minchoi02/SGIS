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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : TotSurvDetailMapper.java
 * @Description : TotSurvDetailMapper DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2020.08.11           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2020. 08.11
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */


@Repository("totSurvDetailMapper")
public class TotSurvDetailMapper extends EgovAbstractMapper {

	/**
	 * 상세페이지 마지막년도 조회
	 * @param 
	 * @exception Exception
	 */
	public String getTotLastYear() throws SQLException {
		return selectOne("totSurvDetail.getTotLastYear", "");
	}
	
	
	/**
	 * 상세 목록 조회 Type1 ( 조회 특성의 갯수가 0이고 하위특성)
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTypeOneDetailSearch(Map mapParameter) throws SQLException {
		return selectList("totSurvDetail.getTypeOneDetailSearch", mapParameter);
	}
	
	/**
	 * 화면 표출 옵션 (관리자모드에서 설정)
	 * 2021-08-19 [이영호] 총조사 대쉬보드
	 * @param mapParameter
	 * @exception Exception
	 */
	public List<EgovMap> getDispSrvList(HashMap<String, Object> params) throws SQLException {
		return selectList("totSurvDetail.getDispSrvList", params);
	}
	
	/**
	 * 화면 표출 옵션 (관리자모드에서 설정)
	 * 2021-08-19 [이영호] 총조사 상세
	 * @param mapParameter
	 * @exception Exception
	 */
	public List<EgovMap> getDispSrvDetailList(HashMap<String, Object> params) throws SQLException {
		return selectList("totSurvDetail.getDispSrvDetailList", params);
	}
	
	/**
	 * 통계표 기본 정보 가져오기
	 * 2021-08-19 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	public List<EgovMap> getStblInfo(HashMap<String, Object> params) throws SQLException {
		return selectList("totSurvDetail.getDispSrvDetailList", params);
	}
	
	/**
	 * 통계표 전체 리스트 가져오기
	 * 2022-01-27 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	public List<EgovMap> getAllTblList() throws SQLException {
		return selectList("totSurvDetail.getAllTblList");
	}
	
	/**
	 * 통계표 전체 리스트 ID 가져오기
	 * 2022-01-27 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	public List<EgovMap> getAllListIdList() throws SQLException {
		return selectList("totSurvDetail.getAllListIdList");
	}
	
	/**
	 * 통계표 ID 가져오기
	 * 2022-03-18 [이영호] 총조사
	 * @param mapParameter
	 * @exception Exception
	 */
	public List<EgovMap> getTblIdFromSurvId(HashMap<String, Object> params) throws SQLException {
		return selectList("totSurvMain.getTblIdFromSurvId", params);
	}
}