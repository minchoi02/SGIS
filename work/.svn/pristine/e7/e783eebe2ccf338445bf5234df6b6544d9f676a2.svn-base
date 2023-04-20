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

import org.json.JSONException;
import org.json.JSONObject;

/**
 * @Class Name : PrjMngService.java
 * @Description : PrjMngService Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.7.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2019.7.17
 * @version 1.0
 */
public interface KostatDataService {
	/**
	 * 쿼리실행 결과 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject execPgQryResult(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	/**
	 * 테이블 목록 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject getPgTables(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	
	/**
	 * 지오코딩 실행
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public JSONObject geocodingAction(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	/**
	 * 카운트 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public int execPgQryResultOne(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	/**
	 * 지오코딩 상황 점검
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public JSONObject getGeoChk(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;

	
	/**
	 * 테이블 메타정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject getPgMetaInfo(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;

	/**
	 * 테이블 메타정보 저장하기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject setMetaInfo(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	/**
	 * 테이블 변동정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject getPgTblHst(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	/**
	 * Hive 쿼리실행 결과 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject execHiveQryResult(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	/**
	 * Hive 테이블 목록 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject getHiveTables(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
	
	/**
	 * Hive 테이블 메타정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject getHiveMetaInfo(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;

	/**
	 * Hive 테이블 변동정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject getHiveTblHst(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException;
}