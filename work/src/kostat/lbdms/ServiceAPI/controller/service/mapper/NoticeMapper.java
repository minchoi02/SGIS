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
package kostat.lbdms.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

/**
 * @Class Name : CommonMapper.java
 * @Description : CommonMapper DAO Class
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


@Repository("noticeMapper")
public class NoticeMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	/**
	 * 공지사항 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getNoticeList(Map mapParameter) throws SQLException {
		return selectList("notice.getNoticeList", mapParameter);
	}
	
	/**
	 * 공지사항 상세정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getNoticeDetailInfo(Map mapParameter) throws SQLException {
		return selectOne("notice.getNoticeDetailInfo", mapParameter);
	}
	
	/**
	 * 첨부파일 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFileList(Map mapParameter) throws SQLException {
		return selectList("notice.getFileList", mapParameter);
	}
	
	/**
	 * 공지사항 조회수를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateViewCnt(Map mapParameter) throws SQLException {
		return update("notice.updateViewCnt", mapParameter);
	}
}