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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * @Class Name : MemberMapper.java
 * @Description : MemberMapper DAO Class
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


@Repository("systemMapper")
public class SystemMapper extends EgovAbstractMapper {
	
	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	/**
	 * 공지사항을 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getNoticeLst(Map mapParameter) throws SQLException {
		 return selectList("sysmgt.getNoticeLst", mapParameter);
	}
	
	/**
	 * 공지사항 삭제.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteNotice(Map mapParameter) throws SQLException {
		 return delete("sysmgt.deleteNotice", mapParameter);
	}
	
	/**
	 * 공지사항 조회수 업데이트
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateViewCnt(Map mapParameter) throws SQLException {
		 return update("sysmgt.updateViewCnt", mapParameter);
	}
	
	/**
	 * 사용자 그룹멤버 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getGroupMemberList(Map mapParameter) throws SQLException {
		 return selectList("member.getGroupMemberList", mapParameter);
	}
	
	/**
	 * 사용자 정보를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberInfo(Map mapParameter) throws SQLException {
		return update("member.updateMemberInfo", mapParameter);
	}	
	
	/**
	 * 사용자 정보를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberPw(Map mapParameter) throws SQLException {
		return update("member.updateMemberPw", mapParameter);
	}	
	
	/**
	 * 사용자 정보를 삭제 탈퇴한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteMemberInfo(Map mapParameter) throws SQLException {
		return update("member.deleteMemberInfo", mapParameter);
	}	
	
	/**
	 * 사용자 비밀번호를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberPwd(Map mapParameter) throws SQLException {
		return update("member.updateMemberPwd", mapParameter);
	}
	
	/**
	 * 사용자 키를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateUserKey(Map mapParameter) throws SQLException {
		return update("member.updateUserKey", mapParameter);
	}
	
	/**
	 * 대시보드 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public HashMap getManageStatusCount(Map mapParameter) throws SQLException {
		 return selectOne("sysSts.getManageStatusCount", mapParameter);
	}

	/**
	 * 일자리 수집현황을 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCollectJobHistory(Map mapParameter) throws SQLException {
		 return selectList("sysSts.selectCollectJobHistory", mapParameter);
	}

	/**
	 * 가입신청 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMemberSts(Map mapParameter) throws SQLException {
		 return selectList("sysSts.selectMemberSts", mapParameter);
	}

	/**
	 * 전송승인 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectReqTransDataSts(Map mapParameter) throws SQLException {
		 return selectList("sysSts.selectReqTransDataSts", mapParameter);
	}

	/**
	 * 공지사항5를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectNotice5(Map mapParameter) throws SQLException {
		 return selectList("sysSts.selectNotice5", mapParameter);
	}

	/**
	 * QNA5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectQNA5(Map mapParameter) throws SQLException {
		 return selectList("sysSts.selectQNA5", mapParameter);
	}

	/**
	 * PopNotice5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPopNotice5(Map mapParameter) throws SQLException {
		 return selectList("sysSts.selectPopNotice5", mapParameter);
	}
	
	/**
	 * 공지사항 상세보기.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getNoticeDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getNoticeDetail", mapParameter);
	}

	/**
	 * 공지사항 상세보기.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getFaqDetail(Map mapParameter) throws SQLException {
		return selectOne("sysmgt.getFaqDetail", mapParameter);
	}
	
	/**
	 * 공지사항 삭제.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deletePost(Map mapParameter) throws SQLException {
		 return delete("sysmgt.deletePost", mapParameter);
	}
	
	/**
	 * qna 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getQnaLst(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getQnaLst", mapParameter);
	}
	/**
	 * qna 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getQnaDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getQnaDetail", mapParameter);
	}
	/**
	 * faq 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFaqLst() throws SQLException {
		return selectList("sysmgt.getFaqLst");
	}
	/**
	 * faq 순서 변경
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateOrderFaq(Map mapParameter) throws SQLException {
		return update("sysmgt.updateOrderFaq",mapParameter);
	}
	/**
	 * help 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUseInfoLst(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getUseInfoLst", mapParameter);
	}
	/**
	 * help 상세보기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUseInfoDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getUseInfoDetail", mapParameter);
	}
	/**
	 * 팝업 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPopAlimLst(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getPopAlimLst", mapParameter);
	}
	/**
	 * 팝업 상세 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPopAlimDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getPopAlimDetail", mapParameter);
	}
	/**
	 * 활용사례
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUseGuideLst(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getUseGuideLst", mapParameter);
	}
	/**
	 * 활용사례 상세보기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUseGuideDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getUseGuideDetail", mapParameter);
	}
	/**
	 * 따라하기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUseCopyLst(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getUseCopyLst", mapParameter);
	}
	/**
	 * 따라하기 상세보기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getUseCopyDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getUseCopyDetail", mapParameter);
	}
	/**
	 * 샘플데이터
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSampleLst(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getSampleLst", mapParameter);
	}
	/**
	 * 샘플데이터 상세보기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getSampleDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getSampleDetail", mapParameter);
	}
	/**
	 * 공유게시판
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getShareLst(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getShareLst", mapParameter);
	}
	/**
	 * 공유게시판 상세보기
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getShareDetail(Map mapParameter) throws SQLException {
		return selectList("sysmgt.getShareDetail", mapParameter);
	}
	/**
	 * share_board 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteShareBoard(Map mapParameter) throws SQLException {
		return delete("sysmgt.deleteShareBoard", mapParameter);
	}
	/**
	 * share_board 조회수 증가
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateShareBoardHits(Map mapParameter) throws SQLException {
		return update("sysmgt.updateShareBoardHits", mapParameter);
	}
	/**
	 * share_board 작성
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertShareBoard(Map mapParameter) throws SQLException {
		return insert("sysmgt.insertShareBoard", mapParameter);
	}
	/**
	 * share_board 작성
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateShareBoard(Map mapParameter) throws SQLException {
		return update("sysmgt.updateShareBoard", mapParameter);
	}
	
	public int getPostNo() throws SQLException {
		return selectOne("sysmgt.getPostNo");
	}
	
	/**
	 * 다운로드 로그
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertDownLog(Map mapParameter) throws SQLException {
		return insert("sysmgt.insertDownLog", mapParameter);
	}
	
	//SNS 수집 리스트
	public List getCollectSnsDb(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getCollectSnsDb", mapParameter);
	}
	
	//법정동 조례 리스트
	public List getLegalLst(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getLegalLst", mapParameter);
	}
	
	//법정동 조례 삭제
	public int deleteLegal(Map mapParameter) throws SQLException{
		return delete("sysmgt.deleteLegal", mapParameter);
	}
	
	//법정동 조례 상세
	public Map getLegalDetail(Map mapParameter) throws SQLException{
		return selectOne("sysmgt.getLegalDetail", mapParameter);
	}
	
	//게시판 수정
	public int updatePost(Map mapParameter) throws SQLException{
		return update("sysmgt.updatePost", mapParameter);
	}

	//게시판 답변
	public int updateAnswer(Map mapParameter) throws SQLException{
		return update("sysmgt.updateAnswer", mapParameter);
	}
	
	//게시판 등록
	public int insertPost(Map mapParameter) throws SQLException{
		return insert("sysmgt.insertPost", mapParameter);
	}
	
	//소속기관 리스트
	public List getInstitutionLst(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getInstitutionLst", mapParameter);
	}
	
	//소속기관 삭제
	public int deleteInstitution(Map mapParameter) throws SQLException{
		return delete("sysmgt.deleteInstitution", mapParameter);
	}
	
	//소속기관 수정
	public int updateInstitution(Map mapParameter) throws SQLException{
		return update("sysmgt.updateInstitution", mapParameter);
	}
	
	//소속기관 등록
	public int insertInstitution(Map mapParameter) throws SQLException{
		return insert("sysmgt.insertInstitution", mapParameter);
	}
	
	//소속기관 상세
	public Map getInstitutionDetail(Map mapParameter) throws SQLException{
		return selectOne("sysmgt.getInstitutionDetail", mapParameter);
	}

	//표준단어 리스트
	public List getStdWordLst(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getStdWordLst", mapParameter);
	}
	
	//표준단어 삭제
	public int deleteStdWord(Map mapParameter) throws SQLException{
		return delete("sysmgt.deleteStdWord", mapParameter);
	}
	
	//표준단어 수정
	public int updateStdWord(Map mapParameter) throws SQLException{
		return update("sysmgt.updateStdWord", mapParameter);
	}
	
	//표준단어 등록
	public int insertStdWord(Map mapParameter) throws SQLException{
		return insert("sysmgt.insertStdWord", mapParameter);
	}
	
	//표준단어 상세
	public Map getStdWordDetail(Map mapParameter) throws SQLException{
		return selectOne("sysmgt.getStdWordDetail", mapParameter);
	}
	
	//전송승인 리스트
	public List getAprovMoveLst(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getAprovMoveLst", mapParameter);
	}
	
	//전송승인 상세
	public Map getAprovMoveDetail(Map mapParameter) throws SQLException{
		return selectOne("sysmgt.getAprovMoveDetail", mapParameter);
	}
	
	//전송승인 삭제
	public int deleteAprovMove(Map mapParameter) throws SQLException{
		return delete("sysmgt.deleteAprovMove", mapParameter);
	}
	
	//전송승인 수정
	public int updateAprovMove(Map mapParameter) throws SQLException{
		return update("sysmgt.updateAprovMove", mapParameter);
	}
	
	//전송승인 등록
	public int insertAprovMove(Map mapParameter) throws SQLException{
		return insert("sysmgt.insertAprovMove", mapParameter);
	}
	
	//회원관리 로그인 이력 리스트
	public List getLoginLst(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getLoginLst", mapParameter);
	}

	//회원관리 리스트
	public List getUserMngLst(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getUserMngLst", mapParameter);
	}

	//회원관리 상세
	public Map getUserMngDetail(Map mapParameter) throws SQLException{
		return selectOne("sysmgt.getUserMngDetail", mapParameter);
	}
	
	//회원관리 삭제
	public int deleteUserMng(Map mapParameter) throws SQLException{
		return delete("sysmgt.deleteUserMng", mapParameter);
	}
	
	//회원관리 수정
	public int updateUserMng(Map mapParameter) throws SQLException{
		return update("sysmgt.updateUserMng", mapParameter);
	}
	
	//회원 리소스 초기화
	public int initUserResource(Map mapParameter) throws SQLException {
		return update("sysmgt.initUserResource",mapParameter);
	}
	
	//회원 패스워드 초기화
	public int initPassword(Map mapParameter) throws SQLException {
		return update("sysmgt.initPassword",mapParameter);
	}
	
	//회원관리 승인
	public int approveUserMng(Map mapParameter) throws SQLException{
		return update("sysmgt.approveUserMng", mapParameter);
	}

	//회원관리 사용중지/해지
	public int stopUserMng(Map mapParameter) throws SQLException{
		return update("sysmgt.stopUserMng", mapParameter);
	}

	//접속현황 통계
	public List selectCountByUserInstGrp(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectCountByUserInstGrp", mapParameter);
	}	

	//접속현황 집계
	public Map selectStatByUserAuth(Map mapParameter) throws SQLException{
		return selectOne("sysmgt.selectStatByUserAuth", mapParameter);
	}	
	
	
	public List<Map<String, Object>> selectDataUsedCategory() throws SQLException{
		return selectList("sysmgt.selectDataUsedCategory");
	}	

	public List<Map<String, Object>> selectDataUsedTotalCount(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectDataUsedTotalCount", mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataUsedTypeCount(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectDataUsedTypeCount", mapParameter);
	}	

	public List<Map<String, Object>> selectDataUsedCount(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectDataUsedCount", mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataUsedTCount(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectDataUsedTCount", mapParameter);
	}	
	
	//하단 그리드의 헤더값 (year)일때 
	public List<Map<String, Object>> selectDataUsedTh(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectDataUsedTh", mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataInstNm(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectDataInstNm", mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataUsedTotalNm(Map mapParameter) throws SQLException{
		return selectList("sysmgt.selectDataUsedTotalNm", mapParameter);
	}	

	//시스템 현황 모니터
	public List<Map<String, Object>> getSystemMonitor(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getSystemMonitor", mapParameter);
	}

	//에이전트 현황 모니터
	public List<Map<String, Object>> getAgentMonitor(Map mapParameter) throws SQLException{
		return selectList("sysmgt.getAgentMonitor", mapParameter);
	}
}