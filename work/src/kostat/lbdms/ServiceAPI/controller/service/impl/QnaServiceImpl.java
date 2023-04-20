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
import kostat.lbdms.ServiceAPI.controller.service.QnaService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.QnaMapper;

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

@Service("qnaService")
public class QnaServiceImpl extends EgovAbstractServiceImpl implements QnaService {

	private static final Logger LOGGER = LoggerFactory.getLogger(QnaServiceImpl.class);

	/** CommonDAO */
	@Resource(name="qnaMapper")
	private QnaMapper qnaMapper;

	/**
	 * Q&A 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getQnaList(Map mapParameter) throws SQLException {
		return qnaMapper.getQnaList(mapParameter);
	}
	
	/**
	 * Q&A 상세정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getQnaDetailInfo(Map mapParameter) throws SQLException {
		return qnaMapper.getQnaDetailInfo(mapParameter);
	}
	
	/**
	 * 첨부파일 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFileList(Map mapParameter) throws SQLException {
		return qnaMapper.getFileList(mapParameter);
	}
	
	/**
	 * Q&A 조회수를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateViewCnt(Map mapParameter) throws SQLException {
		return qnaMapper.updateViewCnt(mapParameter);
	}
	
	/**
	 * Q&A 게시글을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map insertQnaInfo(Map mapParameter) throws SQLException {
		return qnaMapper.insertQnaInfo(mapParameter);
	}
	
	/**
	 * Q&A 게시글을 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateQnaInfo(Map mapParameter) throws SQLException {
		return qnaMapper.updateQnaInfo(mapParameter);
	}
	
	/**
	 * Q&A 게시글을 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteQnaInfo(Map mapParameter) throws SQLException {
		return qnaMapper.deleteQnaInfo(mapParameter);
	}
}