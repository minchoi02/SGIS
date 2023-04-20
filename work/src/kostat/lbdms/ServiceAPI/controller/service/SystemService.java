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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Class Name : SystemService.java
 * @Description : SystemService Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 *
 */
public interface SystemService {

	/**
	 * 사용자 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getNoticeLst(Map mapParameter) throws SQLException;
	
	public int deleteNotice(Map mapParameter) throws SQLException;
	
	
	/**
	 * 대시보드 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public HashMap getManageStatusCount(Map mapParameter) throws SQLException;
	

	/**
	 * 일자리 수집현황을 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCollectJobHistory(Map mapParameter) throws SQLException;
	

	/**
	 * 가입신청 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMemberSts(Map mapParameter) throws SQLException;
	

	/**
	 * 전송승인 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectReqTransDataSts(Map mapParameter) throws SQLException;
	

	/**
	 * 공지사항5를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectNotice5(Map mapParameter) throws SQLException;
	

	/**
	 * QNA5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectQNA5(Map mapParameter) throws SQLException;
	

	/**
	 * PopNotice5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPopNotice5(Map mapParameter) throws SQLException;
	
	
	public List getNoticeDetail(Map mapParameter) throws SQLException;
	
	public Map getFaqDetail(Map mapParameter) throws SQLException;
	
	
	public int deletePost(Map mapParameter) throws SQLException;
	
	public int updateViewCnt(Map mapParameter) throws SQLException;
	
	
	public List getQnaLst(Map mapParameter) throws SQLException;
	
	public List getQnaDetail(Map mapParameter) throws SQLException;
	
	public List getFaqLst() throws SQLException;
	
	public int updateOrderFaq(Map mapParameter) throws SQLException;
	
	
	public List getUseInfoLst(Map mapParameter) throws SQLException;
	
	public List getUseInfoDetail(Map mapParameter) throws SQLException;
	
	public List getPopAlimLst(Map mapParameter) throws SQLException;
	
	public List getPopAlimDetail(Map mapParameter) throws SQLException;
	
	
	public List getUseGuideLst(Map mapParameter) throws SQLException;
	
	public List getUseGuideDetail(Map mapParameter) throws SQLException;
	
	public List getUseCopyLst(Map mapParameter) throws SQLException;
	
	public List getUseCopyDetail(Map mapParameter) throws SQLException;
	
	public List getSampleLst(Map mapParameter) throws SQLException;
	
	public List getSampleDetail(Map mapParameter) throws SQLException;
	
	
	public List getShareLst(Map mapParameter) throws SQLException;
	
	public List getShareDetail(Map mapParameter) throws SQLException;
	
	public int deleteShareBoard(Map mapParameter) throws SQLException;
	
	public int updateShareBoardHits(Map mapParameter) throws SQLException;
	
	public int insertShareBoard(Map mapParameter) throws SQLException;
	
	public int updateShareBoard(Map mapParameter) throws SQLException;
	
	public int getPostNo() throws SQLException;

	
	//다운로드 로그
	public int insertDownLog(Map mapParameter) throws SQLException;
	
	//SNS 리스트
	public List getCollectSnsDb(Map mapParameter) throws SQLException;
	
	//법정동 조례 리스트
	public List getLegalLst(Map mapParameter) throws SQLException;
	
	//법정동 조례 삭제
	public int deleteLegal(Map mapParameter) throws SQLException;
	
	//게시판 수정
	public int updatePost(Map mapParameter) throws SQLException;
	
	//게시판 답변
	public int updateAnswer(Map mapParameter) throws SQLException;
	
	//게시판 등록
	public int insertPost(Map mapParameter) throws SQLException;
	
	
	//법정동 조례 상세
	public Map getLegalDetail(Map mapParameter) throws SQLException;
	
	
	//소속기관 리스트
	public List getInstitutionLst(Map mapParameter) throws SQLException;
	
	//소속기관 삭제
	public int deleteInstitution(Map mapParameter) throws SQLException;
	
	//소속기관 수정
	public int updateInstitution(Map mapParameter) throws SQLException;
	
	//소속기관 등록
	public int insertInstitution(Map mapParameter) throws SQLException;
	
	//소속기관 상세
	public Map getInstitutionDetail(Map mapParameter) throws SQLException;
	
	
	//표준단어 리스트
	public List getStdWordLst(Map mapParameter) throws SQLException;
	
	//표준단어 삭제
	public int deleteStdWord(Map mapParameter) throws SQLException;
	
	//표준단어 수정
	public int updateStdWord(Map mapParameter) throws SQLException;
	
	//표준단어 등록
	public int insertStdWord(Map mapParameter) throws SQLException;
	
	//표준단어 상세
	public Map getStdWordDetail(Map mapParameter) throws SQLException;
	
	
	//전송승인 리스트
	public List getAprovMoveLst(Map mapParameter) throws SQLException;
	
	//전송승인 상세
	public Map getAprovMoveDetail(Map mapParameter) throws SQLException;
	
	//전송승인 삭제
	public int deleteAprovMove(Map mapParameter) throws SQLException;
	
	//전송승인 수정
	public int updateAprovMove(Map mapParameter) throws SQLException;
	
	//전송승인 등록
	public int insertAprovMove(Map mapParameter) throws SQLException;
	

	//회원관리 리스트
	public List getUserMngLst(Map mapParameter) throws SQLException;
	
	//로그인 히스토리
	public List getLoginLst(Map mapParameter) throws SQLException;
	
	//회원관리 상세
	public Map getUserMngDetail(Map mapParameter) throws SQLException;
	
	//회원관리 삭제
	public int deleteUserMng(Map mapParameter) throws SQLException;
	
	//회원관리 수정
	public int updateUserMng(Map mapParameter) throws SQLException;

	//회원 패스워드 초기화
	public int initPassword(Map mapParameter) throws SQLException;

	//회원 데이터 초기화
	public int initData(Map mapParameter) throws SQLException;
	
	//회원관리 승인
	public int approveUserMng(Map mapParameter) throws SQLException;

	//회원관리 사용중지/해지
	public int stopUserMng(Map mapParameter) throws SQLException;

	
	//접속현황 통계
	public List selectCountByUserInstGrp(Map mapParameter) throws SQLException;
	
	//접속현황 집계
	public Map selectStatByUserAuth(Map mapParameter) throws SQLException;
	
	
	public List<Map<String, Object>> selectDataUsedCategory() throws SQLException;

	public List<Map<String, Object>> selectDataUsedTotalCount(Map mapParameter) throws SQLException;
	
	public List<Map<String, Object>> selectDataUsedTypeCount(Map mapParameter) throws SQLException;

	public List<Map<String, Object>> selectDataUsedCount(Map mapParameter) throws SQLException;
	
	public List<Map<String, Object>> selectDataUsedTCount(Map mapParameter) throws SQLException;
	
	//하단 그리드의 헤더값 (year)일때 
	public List<Map<String, Object>> selectDataUsedTh(Map mapParameter) throws SQLException;
	
	public List<Map<String, Object>> selectDataInstNm(Map mapParameter) throws SQLException;
	
	public List<Map<String, Object>> selectDataUsedTotalNm(Map mapParameter) throws SQLException;
	
	//시스템 현황 모니터
	public List<Map<String, Object>> getSystemMonitor(Map mapParameter) throws SQLException;
	
	//에이전트 현황 모니터
	public List<Map<String, Object>> getAgentMonitor(Map mapParameter) throws SQLException;
}