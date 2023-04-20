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
import java.util.List;
import java.util.Map;

/**
 * @Class Name : CollectService.java
 * @Description : CollectService Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.8.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2019.8.17
 * @version 1.0
 */
public interface CollectService {
	/**
	 * 주소DB수집현황 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getAddrDBStstList(Map mapParameter) throws SQLException;
	
	public List searchAdminSgg(Map mapParameter) throws SQLException;

	public List searchAdminEmd(Map mapParameter) throws SQLException;
	
	public List searchLegSgg(Map mapParameter) throws SQLException;
	
	public List searchLegEmd(Map mapParameter) throws SQLException;
	
	/**
	 * 수집현황 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCollectList(Map mapParameter) throws SQLException;

	public List getCollectKosis(Map mapParameter) throws SQLException;
	
	/**
	 * 단위업무를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int collectKosisNew(Map mapParameter) throws SQLException;
	
	/**
	 * 단위업무 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map collectKosisDetail(Map mapParameter) throws SQLException;
	
	/**
	 * 단위업무를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateCollectKosis(Map mapParameter) throws SQLException;
	
	public void deleteCollect(Map mapParameter) throws SQLException;


	
	
	/**
	 * 일자리 자동화 현황을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCollectJobSts(Map mapParameter) throws SQLException;
}