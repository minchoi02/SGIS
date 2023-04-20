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
import java.util.Map;

/**
 * @Class Name : StatsMeService.java
 * @Description : StatsMeService DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.10.31   김남민      최초생성
 *
 * @author SGIS+ 스마트플랫폼
 * @since 2019.10.31
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
public interface StatsMeService {

	/*
	 * 데이터마트 생성 배치
	 * @param data
	 * @exception Exception
	 */
	public void makeSrvDtCtlgDtwrhBatch() throws SQLException;
	
	/*
	 * 데이터마트 생성 (일괄)
	 * @param data
	 * @exception Exception
	 */
	public void makeSrvDtCtlgDtwrhAll(Map<String, Object> data) throws SQLException;
	
	/*
	 * 데이터마트 생성 (단건)
	 * @param data
	 * @exception Exception
	 */
	public void makeSrvDtCtlgDtwrhOne(Map<String, Object> data) throws SQLException;
	
	/*
	 * 데이터마트 생성
	 * @param data
	 * @exception Exception
	 */
	public void makeSrvDtCtlgDtwrh(Map<String, Object> data) throws SQLException;

	/*
	 * 통계자료 코드매핑
	 * @param data
	 * @exception Exception
	 */
	public Map<String,Object> mappingSrvDtCtlgDataList(Map<String,Object> params) throws SQLException;
	
	/*
	 * 통계자료 하드코드매핑
	 * @param data
	 * @exception Exception
	 */
	public Map<String,Object> mappingHardSrvDtCtlgDataList(Map<String,Object> params);
}