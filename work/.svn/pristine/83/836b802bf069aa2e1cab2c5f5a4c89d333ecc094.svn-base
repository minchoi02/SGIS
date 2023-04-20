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
public interface SopService {
	/**
	 * 시도정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSidoList(Map mapParameter) throws SQLException;
	
	/**
	 * 시군구정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSggList(Map mapParameter) throws SQLException;
	
	/**
	 * 읍면동정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getAdmList(Map mapParameter) throws SQLException;
	
	/**
	 * 시도경계정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSidoBoundaryInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 시군구경계정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSggBoundaryInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 읍면동경계정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDongBoundaryInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 집계구경계정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getTotaloaBoundaryInfo(Map mapParameter) throws SQLException;
	
}