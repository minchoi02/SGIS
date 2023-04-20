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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.controller.service.SystemService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.DataCreateMapper;
import kostat.lbdms.ServiceAPI.controller.service.mapper.SystemMapper;

/**
 * @Class Name : MemberServiceImpl.java
 * @Description : MemberServiceImpl Implement Class
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

@Service("systemService")
public class SystemServiceImpl extends EgovAbstractServiceImpl implements SystemService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);

	/** systemMapperDAO */
	@Resource(name="systemMapper")
	private SystemMapper systemMapper;
	
	@Resource(name = "dataCreateMapper")
	private DataCreateMapper dataCreateMapper;
	
	/**
	 * 사용자 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getNoticeLst(Map mapParameter) throws SQLException {
		return systemMapper.getNoticeLst(mapParameter);
	}
	
	public int deleteNotice(Map mapParameter) throws SQLException {
		return systemMapper.deleteNotice(mapParameter);
	}
	
	
	/**
	 * 대시보드 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public HashMap getManageStatusCount(Map mapParameter) throws SQLException {
		 return systemMapper.getManageStatusCount(mapParameter);
	}

	/**
	 * 일자리 수집현황을 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectCollectJobHistory(Map mapParameter) throws SQLException {
		 return systemMapper.selectCollectJobHistory(mapParameter);
	}

	/**
	 * 가입신청 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectMemberSts(Map mapParameter) throws SQLException {
		 return systemMapper.selectMemberSts(mapParameter);
	}

	/**
	 * 전송승인 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectReqTransDataSts(Map mapParameter) throws SQLException {
		 return systemMapper.selectReqTransDataSts(mapParameter);
	}

	/**
	 * 공지사항5를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectNotice5(Map mapParameter) throws SQLException {
		 return systemMapper.selectNotice5(mapParameter);
	}

	/**
	 * QNA5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectQNA5(Map mapParameter) throws SQLException {
		 return systemMapper.selectQNA5(mapParameter);
	}

	/**
	 * PopNotice5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectPopNotice5(Map mapParameter) throws SQLException {
		 return systemMapper.selectPopNotice5(mapParameter);
	}
	
	public List getNoticeDetail(Map mapParameter) throws SQLException {
		return systemMapper.getNoticeDetail(mapParameter);
	}
	
	public Map getFaqDetail(Map mapParameter) throws SQLException {
		return systemMapper.getFaqDetail(mapParameter);
	}
	
	public int deletePost(Map mapParameter) throws SQLException {
		return systemMapper.deletePost(mapParameter);
	}
	public int updateViewCnt(Map mapParameter) throws SQLException {
		return systemMapper.updateViewCnt(mapParameter);
	}
	public List getQnaLst(Map mapParameter) throws SQLException {
		return systemMapper.getQnaLst(mapParameter);
	}
	public List getQnaDetail(Map mapParameter) throws SQLException {
		return systemMapper.getQnaDetail(mapParameter);
	}
	public List getFaqLst() throws SQLException {
		return systemMapper.getFaqLst();
	}
	public int updateOrderFaq(Map mapParameter) throws SQLException {
		return systemMapper.updateOrderFaq(mapParameter);
	}
	public List getUseInfoLst(Map mapParameter) throws SQLException {
		return systemMapper.getUseInfoLst(mapParameter);
	}
	public List getUseInfoDetail(Map mapParameter) throws SQLException {
		return systemMapper.getUseInfoDetail(mapParameter);
	}
	public List getPopAlimLst(Map mapParameter) throws SQLException {
		return systemMapper.getPopAlimLst(mapParameter);
	}
	public List getPopAlimDetail(Map mapParameter) throws SQLException {
		return systemMapper.getPopAlimDetail(mapParameter);
	}
	public List getUseGuideLst(Map mapParameter) throws SQLException {
		return systemMapper.getUseGuideLst(mapParameter);
	}
	public List getUseGuideDetail(Map mapParameter) throws SQLException {
		return systemMapper.getUseGuideDetail(mapParameter);
	}
	public List getUseCopyLst(Map mapParameter) throws SQLException {
		return systemMapper.getUseCopyLst(mapParameter);
	}
	public List getUseCopyDetail(Map mapParameter) throws SQLException {
		return systemMapper.getUseCopyDetail(mapParameter);
	}
	public List getSampleLst(Map mapParameter) throws SQLException {
		return systemMapper.getSampleLst(mapParameter);
	}
	public List getSampleDetail(Map mapParameter) throws SQLException {
		return systemMapper.getSampleDetail(mapParameter);
	}
	public List getShareLst(Map mapParameter) throws SQLException {
		return systemMapper.getShareLst(mapParameter);
	}
	public List getShareDetail(Map mapParameter) throws SQLException {
		return systemMapper.getShareDetail(mapParameter);
	}
	public int deleteShareBoard(Map mapParameter) throws SQLException {
		return systemMapper.deleteShareBoard(mapParameter);
	}
	public int updateShareBoardHits(Map mapParameter) throws SQLException {
		return systemMapper.updateShareBoardHits(mapParameter);
	}
	public int insertShareBoard(Map mapParameter) throws SQLException {
		return systemMapper.insertShareBoard(mapParameter);
	}
	public int updateShareBoard(Map mapParameter) throws SQLException {
		return systemMapper.updateShareBoard(mapParameter);
	}
	
	public int getPostNo() throws SQLException {
		return systemMapper.getPostNo();
	}
	
	//다운로드 로그
	public int insertDownLog(Map mapParameter) throws SQLException{
		return systemMapper.insertDownLog(mapParameter);
	}
	
	//SNS 수집 리스트
	public List getCollectSnsDb(Map mapParameter) throws SQLException{
		return systemMapper.getCollectSnsDb(mapParameter);
	}
	
	//법정동 조례 리스트
	public List getLegalLst(Map mapParameter) throws SQLException{
		return systemMapper.getLegalLst(mapParameter);
	}
	
	//법정동 조례 삭제
	public int deleteLegal(Map mapParameter) throws SQLException{
		return systemMapper.deleteLegal(mapParameter);
	}
	
	//게시물 수정
	public int updatePost(Map mapParameter) throws SQLException{
		return systemMapper.updatePost(mapParameter);
	}

	//게시물 수정
	public int updateAnswer(Map mapParameter) throws SQLException{
		return systemMapper.updateAnswer(mapParameter);
	}
	
	//게시물 등록
	public int insertPost(Map mapParameter) throws SQLException{
		return systemMapper.insertPost(mapParameter);
	}
	
	//법정동 조례 상세
	public Map getLegalDetail(Map mapParameter) throws SQLException{
		return systemMapper.getLegalDetail(mapParameter);
	}
	
	//소속기관 리스트
	public List getInstitutionLst(Map mapParameter) throws SQLException{
		return systemMapper.getInstitutionLst(mapParameter);
	}
	
	//소속기관 삭제
	public int deleteInstitution(Map mapParameter) throws SQLException{
		return systemMapper.deleteInstitution(mapParameter);
	}
	
	//소속기관 수정
	public int updateInstitution(Map mapParameter) throws SQLException{
		return systemMapper.updateInstitution(mapParameter);
	}
	
	//소속기관 등록
	public int insertInstitution(Map mapParameter) throws SQLException{
		return systemMapper.insertInstitution(mapParameter);
	}
	
	//소속기관 상세
	public Map getInstitutionDetail(Map mapParameter) throws SQLException{
		return systemMapper.getInstitutionDetail(mapParameter);
	}
	
	//표준단어 리스트
	public List getStdWordLst(Map mapParameter) throws SQLException{
		return systemMapper.getStdWordLst(mapParameter);
	}
	
	//표준단어 삭제
	public int deleteStdWord(Map mapParameter) throws SQLException{
		return systemMapper.deleteStdWord(mapParameter);
	}
	
	//표준단어 수정
	public int updateStdWord(Map mapParameter) throws SQLException{
		return systemMapper.updateStdWord(mapParameter);
	}
	
	//표준단어 등록
	public int insertStdWord(Map mapParameter) throws SQLException{
		return systemMapper.insertStdWord(mapParameter);
	}
	
	//표준단어 상세
	public Map getStdWordDetail(Map mapParameter) throws SQLException{
		return systemMapper.getStdWordDetail(mapParameter);
	}
	
	//전송승인 리스트
	public List getAprovMoveLst(Map mapParameter) throws SQLException{
		return systemMapper.getAprovMoveLst(mapParameter);
	}
	
	//전송승인 상세
	public Map getAprovMoveDetail(Map mapParameter) throws SQLException{
		return systemMapper.getAprovMoveDetail(mapParameter);
	}
	
	//전송승인 삭제
	public int deleteAprovMove(Map mapParameter) throws SQLException{
		return systemMapper.deleteAprovMove(mapParameter);
	}
	
	//전송승인 수정
	public int updateAprovMove(Map mapParameter) throws SQLException{
		return systemMapper.updateAprovMove(mapParameter);
	}
	
	//전송승인 등록
	public int insertAprovMove(Map mapParameter) throws SQLException{
		return systemMapper.insertAprovMove(mapParameter);
	}
	
	//회원관리 로그인 이력 리스트
	public List getLoginLst(Map mapParameter) throws SQLException{
		return systemMapper.getLoginLst(mapParameter);
	}

	//회원관리 리스트
	public List getUserMngLst(Map mapParameter) throws SQLException{
		return systemMapper.getUserMngLst(mapParameter);
	}

	//회원관리 상세
	public Map getUserMngDetail(Map mapParameter) throws SQLException{
		return systemMapper.getUserMngDetail(mapParameter);
	}
	
	//회원관리 삭제
	public int deleteUserMng(Map mapParameter) throws SQLException{
		return systemMapper.deleteUserMng(mapParameter);
	}
	
	//회원관리 수정
	public int updateUserMng(Map mapParameter) throws SQLException{
		return systemMapper.updateUserMng(mapParameter);
	}

	//회원 패스워드 초기화
	public int initPassword(Map mapParameter) throws SQLException {
		return systemMapper.initPassword(mapParameter);
	}


	//회원 데이터 초기화
	public int initData(Map mapParameter) throws SQLException {
		systemMapper.initUserResource(mapParameter);
		dataCreateMapper.initData(mapParameter);
		return 1;
	}

	//회원관리 승인
	public int approveUserMng(Map mapParameter) throws SQLException{
		return systemMapper.approveUserMng(mapParameter);
	}

	//회원관리 사용중지/해지
	public int stopUserMng(Map mapParameter) throws SQLException{
		return systemMapper.stopUserMng(mapParameter);
	}	
	
	//접속현황 통계
	public List selectCountByUserInstGrp(Map mapParameter) throws SQLException{
		return systemMapper.selectCountByUserInstGrp(mapParameter);
	}	
	
	//접속현황 집계
	public Map selectStatByUserAuth(Map mapParameter) throws SQLException{
		return systemMapper.selectStatByUserAuth(mapParameter);
	}
	

	public List<Map<String, Object>> selectDataUsedCategory() throws SQLException{
		return systemMapper.selectDataUsedCategory();
	}	

	public List<Map<String, Object>> selectDataUsedTotalCount(Map mapParameter) throws SQLException{
		return systemMapper.selectDataUsedTotalCount(mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataUsedTypeCount(Map mapParameter) throws SQLException{
		return systemMapper.selectDataUsedTypeCount(mapParameter);
	}	

	public List<Map<String, Object>> selectDataUsedCount(Map mapParameter) throws SQLException{
		return systemMapper.selectDataUsedCount(mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataUsedTCount(Map mapParameter) throws SQLException{
		return systemMapper.selectDataUsedTCount(mapParameter);
	}	
	
	//하단 그리드의 헤더값 (year)일때 
	public List<Map<String, Object>> selectDataUsedTh(Map mapParameter) throws SQLException{
		return systemMapper.selectDataUsedTh(mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataInstNm(Map mapParameter) throws SQLException{
		return systemMapper.selectDataInstNm(mapParameter);
	}	
	
	public List<Map<String, Object>> selectDataUsedTotalNm(Map mapParameter) throws SQLException{
		return systemMapper.selectDataUsedTotalNm(mapParameter);
	}	

	public List<Map<String, Object>> getSystemMonitor(Map mapParameter) throws SQLException{
		return systemMapper.getSystemMonitor(mapParameter);
	}	

	public List<Map<String, Object>> getAgentMonitor(Map mapParameter) throws SQLException{
		return systemMapper.getAgentMonitor(mapParameter);
	}	
}
