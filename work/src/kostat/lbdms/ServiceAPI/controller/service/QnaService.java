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
public interface QnaService {
	
	/**
	 * Q&A 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getQnaList(Map mapParameter) throws SQLException;
	
	/**
	 * Q&A 상세정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getQnaDetailInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 첨부파일 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFileList(Map mapParameter) throws SQLException;
	
	/**
	 * Q&A 조회수를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateViewCnt(Map mapParameter) throws SQLException;
	
	/**
	 * Q&A 게시글을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map insertQnaInfo(Map mapParameter) throws SQLException;
	
	/**
	 * Q&A 게시글을 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateQnaInfo(Map mapParameter) throws SQLException;
	
	/**
	 * Q&A 게시글을 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteQnaInfo(Map mapParameter) throws SQLException;

}