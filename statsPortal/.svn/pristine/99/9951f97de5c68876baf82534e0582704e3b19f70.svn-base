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

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : WorkRoadMapper.java
 * @Description : WorkRoadMapper DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2018.10.01           최초생성
 *
 * @author SGIS+ 스마트플랫폼
 * @since 2018. 10.01
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */


@Repository("workRoadTodayStatusMapper")
public class WorkRoadTodayStatusMapper extends EgovAbstractMapper {
	
	/**
	 * 오늘의 구인현황 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTodayStatus(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("wrTodayStatus.getTodayStatus", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 상세조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTodayStatusDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("wrTodayStatus.getTodayStatusDetail", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 신규상세조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTodayStatusNewDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("wrTodayStatus.getTodayStatusNewDetail", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 마감상세조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTodayStatusCloseDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("wrTodayStatus.getTodayStatusCloseDetail", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 조회 (그래프)
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getIntroData(Map mapParameter) throws SQLException {
		return selectList("wrTodayStatus.getIntroData", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 상세조회 (그래프)
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getIntroDataDetail(Map mapParameter) throws SQLException {
		return selectList("wrTodayStatus.getIntroDataDetail", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 신규상세조회 (그래프)
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getIntroDataNewDetail(Map mapParameter) throws SQLException {
		return selectList("wrTodayStatus.getIntroDataNewDetail", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 마감상세조회 (그래프)
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getIntroDataCloseDetail(Map mapParameter) throws SQLException {
		return selectList("wrTodayStatus.getIntroDataCloseDetail", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 시도 데이터보드 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTodayStatusSidoDataBoard(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("wrTodayStatus.getTodayStatusSidoDataBoard", mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 시군구 데이터보드 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTodayStatusSggDataBoard(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return selectList("wrTodayStatus.getTodayStatusSggDataBoard", mapParameter);
	}

}