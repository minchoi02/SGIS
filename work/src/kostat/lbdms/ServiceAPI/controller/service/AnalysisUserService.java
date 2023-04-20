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
public interface AnalysisUserService {
	
	/**
	 * 임의영역 경계 테이블을 생성한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int createPolyonTable(Map mapParameter) throws SQLException;
	
	/**
	 * 임의영역 POI 테이블을 생성한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int createPoiTable(Map mapParameter) throws SQLException;
	
	/**
	 * 임의영역 경계정보 저장
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map insertPolyonData(Map mapParameter) throws SQLException;
	
	/**
	 * 임의영역 POI 정보 저장
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map insertPoiData(Map mapParameter) throws SQLException;
	
	/**
	 * 경계분석 결과데이터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getBoundaryAnalysisResultData(Map mapParameter) throws SQLException;
	
	/**
	 * 보로노이분석 결과데이터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getVoronoiAnalysisResultData(Map mapParameter) throws SQLException;
	
	/**
	 * 데이터간연산분석 결과데이터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getOperationAnalysisResultData(Map mapParameter) throws SQLException;
	
	/**
	 * 입지계수분석 결과데이터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getLqAnalysisResultData(Map mapParameter) throws SQLException;
	
	/**
	 * 버퍼분석 결과데이터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getBufferAnalysisResultData(Map mapParameter) throws SQLException;
	
	/**
	 * 공간자기상관분석 결과데이터 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSpatialAnalysisResultData(Map mapParameter) throws SQLException;
	
	/**
	 * 데이터간연산분석 경계데이터 체크
	 * @param mapParameter
	 * @exception Exception
	 */
	public int getOperationAnalysisBoundaryCheck(Map mapParameter) throws SQLException;
	
	/**
	 * 두 경계가 같은지 체크
	 * @param mapParameter
	 * @exception Exception
	 */
	public int getIsBoundarySameCheck(Map mapParameter) throws SQLException;
	
	/**
	 * 도로망 경계조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getRoadPolygonData(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자경계정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getBoundaryData(Map mapParameter) throws SQLException;
	
	/**
	 * 사업체 POI 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCompanyPoiData(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 POI 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUserPoiData(Map mapParameter) throws SQLException;


}