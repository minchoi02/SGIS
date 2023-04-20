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
public interface GuideService {
	
	/**
	 * 이용안내 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getGuideList(Map mapParameter) throws SQLException;
	
	/**
	 * 이용안내 상세정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getGuideDetailInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 첨부파일 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFileList(Map mapParameter) throws SQLException;
	
	/**
	 * 이용안내 조회수를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateViewCnt(Map mapParameter) throws SQLException;
}