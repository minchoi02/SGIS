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
package kostat.lbdms.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.Map;
import java.util.List;;

/**
 * @Class Name : CommonService.java
 * @Description : CommonService Class
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
public interface AnalysisService {

	/**
	 * 나의데이터 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUserDataList(Map mapParameter) throws SQLException;
	
	/**
	 * 활용사례 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getAnalysisGuideList(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 경계정보를 저장한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map insertUserPolyonInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 폴리곤 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUserPolygonDataList(Map mapParameter) throws SQLException;
	
	/**
	 * 분석결과정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 분석상세파라미터정보를 저장한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertAnalysisParamInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 분석결과 리소스아이디 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisExecuteInfo(Map mapParameter) throws SQLException;	
	
	/**
	 * 분석실행정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisExecuteInfoFromId(Map mapParameter) throws SQLException;	
	
	/**
	 * 분석결과 파라미터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAnalysisParamInfo(Map mapParameter) throws SQLException;	
	
	/**
	 * 분석 실패 또는 분석중인 분석결과 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFailAnalysisDataList(Map mapParameter) throws SQLException;	
	
	/**
	 * 사용자데이터의 사이즈 업데이트
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateUserDataSize(Map mapParameter) throws SQLException;
}