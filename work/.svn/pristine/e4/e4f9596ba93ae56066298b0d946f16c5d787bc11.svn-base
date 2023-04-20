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
package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.AnalysisMapper;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : CommonServiceImpl.java
 * @Description : CommonServiceImpl Implement Class
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

@Service("analysisService")
public class AnalysisServiceImpl extends EgovAbstractServiceImpl implements AnalysisService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AnalysisServiceImpl.class);

	/** CommonDAO */
	@Resource(name="analysisMapper")
	private AnalysisMapper analysisMapper;

	/**
	 * 나의데이터 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUserDataList(Map mapParameter) throws SQLException {
		return analysisMapper.getUserDataList(mapParameter);
	}
	
	/**
	 * 활용사례 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getAnalysisGuideList(Map mapParameter) throws SQLException {
		return analysisMapper.getAnalysisGuideList(mapParameter);
	}
	
	/**
	 * 사용자 경계정보를 저장한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map insertUserPolyonInfo(Map mapParameter) throws SQLException {
		return analysisMapper.insertUserPolyonInfo(mapParameter);
	}
	
	/**
	 * 사용자 폴리곤 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUserPolygonDataList(Map mapParameter) throws SQLException {
		return analysisMapper.getUserPolygonDataList(mapParameter);
	}
	
	/**
	 * 분석결과정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisInfo(Map mapParameter) throws SQLException {
		return analysisMapper.getAnalysisInfo(mapParameter);
	}
	
	/**
	 * 분석상세파라미터정보를 저장한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertAnalysisParamInfo(Map mapParameter) throws SQLException {
		return analysisMapper.insertAnalysisParamInfo(mapParameter);
	}
	
	/**
	 * 분석결과 리소스아이디 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisExecuteInfo(Map mapParameter) throws SQLException {
		return analysisMapper.getAnalysisExecuteInfo(mapParameter);
	}
	
	/**
	 * 분석실행정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisExecuteInfoFromId(Map mapParameter) throws SQLException {
		return analysisMapper.getAnalysisExecuteInfoFromId(mapParameter);
	}
	
	/**
	 * 분석결과 파라미터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisParamInfo(Map mapParameter) throws SQLException {
		return analysisMapper.getAnalysisParamInfo(mapParameter);
	}
	
	/**
	 * 분석 실패 또는 분석중인 분석결과 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFailAnalysisDataList(Map mapParameter) throws SQLException {
		return analysisMapper.getFailAnalysisDataList(mapParameter);
	}
	
	/**
	 * 사용자데이터의 사이즈 업데이트
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateUserDataSize(Map mapParameter) throws SQLException {
		return analysisMapper.updateUserDataSize(mapParameter);
	}
}