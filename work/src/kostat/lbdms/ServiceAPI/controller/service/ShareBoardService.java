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
import java.util.List;

/**
 * @Class Name : ShareBoardService.java
 * @Description : ShareBoardService Class
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2018.08.07 최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2018.08.07
 * @version 1.0
 * @see
 *
 *      Copyright (C) by NeighborSystem All right reserved.
 */
public interface ShareBoardService {

    /**
     * 공유데이터 정보를 가져온다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public List<Map<String,Object>> getShareBoardList(Map<String,Object> mapParameter) throws SQLException;
    
    /**
     * 공유데이터를 등록한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public Map insertShareDataInfo(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터를 삭제한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public void deleteShareDataInfo(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 상세정보를 조회한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public Map getShareBoardDetailInfo(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 댓글정보를 저장한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int insertShareBoardReplyInfo(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 댓글정보를 조회한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public List getShareBoardReplyList(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 댓글정보를 삭제한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int deleteShareBoardReplyInfo(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 정보를 삭제한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int deleteShareBoardInfo(Map mapParameter) throws SQLException;
    
    /**
     * resource 테이블 공유데이터 정보를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateResourceShareInfo(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 조회수를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateViewCnt(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 댓글수를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateReplyCnt(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 추천수를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateRecmdCnt(Map mapParameter) throws SQLException;
    
    /**
     * 공유데이터 정보를 업데이트한다.
     * 
     * @param mapParameter
     * @exception Exception
     */
    public int updateShareBoardInfo(Map mapParameter) throws SQLException;
}