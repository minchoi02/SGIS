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
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.WorkRoadTodayStatusService;
import kostat.sop.ServiceAPI.controller.service.mapper.WorkRoadTodayStatusMapper;

/**
 * @Class Name : WorkRoadServiceImpl.java
 * @Description : WorkRoadServiceImpl DAO Class
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

@Service("workRoadTodayStatusService")
public class WorkRoadTodayStatusServiceImpl extends EgovAbstractServiceImpl implements WorkRoadTodayStatusService {

	private static final Logger LOGGER = LoggerFactory.getLogger(WorkRoadTodayStatusServiceImpl.class);
	
	@Resource(name="workRoadTodayStatusMapper")
	private WorkRoadTodayStatusMapper workRoadTodayStatusMapper;
	/**
	 * 오늘의 구인현황 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	@Override
	public List getTodayStatus(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getTodayStatus(mapParameter);
	}
	
	/**
	 * 오늘의구인현황 상세 조회
	 */
	@Override	
	public List getTodayStatusDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getTodayStatusDetail(mapParameter);
	}
	
	/**
	 * 오늘의 구인현황 조회 (그래프)
	 * @param mapParameter 
	 * @exception Exception
	 */
	public List getIntroData(Map mapParameter) throws SQLException {
		return workRoadTodayStatusMapper.getIntroData(mapParameter);
	}
	

	@Override
	public List getTodayStatusNewDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getTodayStatusNewDetail(mapParameter);
	}

	@Override
	public List getTodayStatusCloseDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getTodayStatusCloseDetail(mapParameter);
	}

	@Override
	public List getIntroDataDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getIntroDataDetail(mapParameter);
	}

	@Override
	public List getIntroDataNewDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getIntroDataNewDetail(mapParameter);
	}

	@Override
	public List getIntroDataCloseDetail(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getIntroDataCloseDetail(mapParameter);
	}

	@Override
	public List getTodayStatusSidoDataBoard(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getTodayStatusSidoDataBoard(mapParameter);
	}

	@Override
	public List getTodayStatusSggDataBoard(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return workRoadTodayStatusMapper.getTodayStatusSggDataBoard(mapParameter);
	}
}