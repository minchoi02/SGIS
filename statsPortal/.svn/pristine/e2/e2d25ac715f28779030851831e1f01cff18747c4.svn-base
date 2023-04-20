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
package kostat.sop.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

/**
 * @Class Name : ECountryService.java
 * @Description : ECountryService Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 * @author JRJ
 * @since 2019. 09.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
public interface ECountryService {
	/**
	 * e지방지표 카테고리 목록
	 * @param String upper_list_id 상위목록아이디
	 * @exception Exception
	 */
	public List selectCategory( String upper_list_id ) throws SQLException;
	/**
	 * e지방지표 목록
	 * @param 
	 * @exception Exception
	 */
	public List selectEcountryList( HashMap<String, Object> map ) throws SQLException;
	/**
	 * e지방지표 목록 개수
	 * @param 
	 * @exception Exception
	 */
	public int selectEcountryCount( HashMap<String, Object> map ) throws SQLException;
	/**
	 * e지방지표 항목 목록
	 * @param 
	 * @exception Exception
	 */
	public List selectItemList( String tbl_id ) throws SQLException;
	/**
	 * e지방지표 기본 항목 목록
	 * @param 
	 * @exception Exception
	 */
	public List selectBaseItemList( String tbl_id ) throws SQLException;
	/**
	 * e지방지표 추가 항목 목록
	 * @param 
	 * @exception Exception
	 */
	public List selectAddItemList( HashMap<String, Object> map ) throws SQLException;
	/**
	 * e지방지표 주기 목록
	 * @param 
	 * @exception Exception
	 */
	public List selectPrdList( String tbl_id ) throws SQLException;
	/**
	 * e지방지표 주기 값 목록
	 * @param 
	 * @exception Exception
	 */
	public List selectPrdValueList( HashMap<String, Object> map ) throws SQLException;
	/**
	 * e지방지표 주석 목록
	 * @param 
	 * @exception Exception
	 */
	public List selectExpList( String tbl_id ) throws SQLException;
	/**
	 * e지방지표 데이터
	 * @param 
	 * @exception Exception
	 */
	public HashMap<String, Object> selectDataList( HashMap<String, Object> map ) throws SQLException;
	
}