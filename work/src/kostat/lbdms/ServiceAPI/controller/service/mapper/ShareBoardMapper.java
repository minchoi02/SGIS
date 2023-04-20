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
import java.util.Map;
import java.util.List;

import javax.annotation.Resource;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

/**
 * @Class Name : AuthentionMapper.java
 * @Description : AuthentionMapper DAO Class
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


@Repository("shareBoardMapper")
public class ShareBoardMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	public List<Map<String,Object>> getShareBoardList(Map<String, Object> mapParameter) throws SQLException{
		return selectList("shareBoard.getShareBoardList",mapParameter);
	}
	
	 /**
     * 공유데이터를 등록한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public Map insertShareDataInfo(Map mapParameter) throws SQLException {
    	return selectOne("shareBoard.insertShareDataInfo", mapParameter);
    }
    
    /**
     * 공유데이터를 등록한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public void deleteShareDataInfo(Map mapParameter) throws SQLException {
    	delete("shareBoard.deleteShareDataInfo", mapParameter);
    }
    /**
     * 공유데이터 상세정보를 조회한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public Map getShareBoardDetailInfo(Map mapParameter) throws SQLException {
    	return selectOne("shareBoard.getShareBoardDetailInfo", mapParameter);
    }
    
    /**
     * 공유데이터 댓글정보를 저장한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int insertShareBoardReplyInfo(Map mapParameter) throws SQLException {
    	return insert("shareBoard.insertShareBoardReplyInfo", mapParameter);
    }
    
    /**
     * 공유데이터 댓글정보를 조회한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public List getShareBoardReplyList(Map mapParameter) throws SQLException {
    	return selectList("shareBoard.getShareBoardReplyList", mapParameter);
    }
    
    /**
     * 공유데이터 댓글정보를 삭제한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int deleteShareBoardReplyInfo(Map mapParameter) throws SQLException {
    	return delete("shareBoard.deleteShareBoardReplyInfo", mapParameter);
    }
    
    /**
     * 공유데이터 정보를 삭제한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int deleteShareBoardInfo(Map mapParameter) throws SQLException {
    	return delete("shareBoard.deleteShareBoardInfo", mapParameter);
    }
    
    /**
     * resource 테이블 공유데이터 정보를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateResourceShareInfo(Map mapParameter) throws SQLException {
    	return update("shareBoard.updateResourceShareInfo", mapParameter);
    }
    
    
    /**
     * 공유데이터 조회수를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateViewCnt(Map mapParameter) throws SQLException {
    	return update("shareBoard.updateViewCnt", mapParameter);
    }
    
    /**
     * 공유데이터 댓글수를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateReplyCnt(Map mapParameter) throws SQLException {
    	return update("shareBoard.updateReplyCnt", mapParameter);
    }
    
    /**
     * 공유데이터 추천수를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateRecmdCnt(Map mapParameter) throws SQLException {
    	return update("shareBoard.updateRecmdCnt", mapParameter);
    }
    
    /**
     * 공유데이터 정보를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateShareBoardInfo(Map mapParameter) throws SQLException {
    	return update("shareBoard.updateShareBoardInfo", mapParameter);
    }
}