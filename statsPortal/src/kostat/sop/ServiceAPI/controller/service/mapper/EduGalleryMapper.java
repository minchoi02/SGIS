package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;


/**
 * @Class Name : EduGalleryMapper.java
 * @Description : EduGalleryMapper DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.08.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.08.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */


@Repository("eduGalleryMapper")
public class EduGalleryMapper extends EgovAbstractMapper {

	/**
	 * selectGalleryList
	 * 갤러리 리스트
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryList(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("edu_gallery.selectGalleryList", mapParameter);
	}
	
	/**
	 * selectGalleryListMyGallery
	 * 갤러리 리스트
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryListMyGallery(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("edu_gallery.selectGalleryListMyGallery", mapParameter);
	}
	
	
	/**
	 * selectGalleryListResult
	 * (일반)갤러리 목록 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryListResult(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("edu_gallery.selectGalleryListResult", mapParameter);
	}
	
	
	
	
	/**
	 * selectGalleryListTotalCnt
	 * 갤러리 카운트
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryListTotalCnt(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectOne("edu_gallery.selectGalleryListTotalCnt", mapParameter);
	}
	
	/**
	 * selectMyGalleryListTotalCnt
	 * 수집 갤러리 목록 개수 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectMyGalleryListTotalCnt(Map mapParameter){
		return selectOne("edu_gallery.selectMyGalleryListTotalCnt",mapParameter);
	}
	
	/**
	 * selectGalleryListTotalCnt
	 * 일반 총계 갤러리 카운트
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryListTotalCntResult(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectOne("edu_gallery.selectGalleryListTotalCntResult", mapParameter);
	}
	
	
	/**
	 * selectGallery
	 * @param Map
	 * @exception Exception
	 */
	public HashMap<String, String> selectGallery(Map mapParameter){
		return selectOne("edu_gallery.selectGallery", mapParameter);
	}
	
	/**
	 * selectGalleryPoll
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryPoll(Map mapParameter){
		return selectOne("edu_gallery.selectGalleryPollCount",mapParameter);
	}
	
	/**
	 * selectGalleryPollDetailCount
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryPollDetailCount(Map mapParameter){
		return selectOne("edu_gallery.selectGalleryPollDetailCount",mapParameter);
	}
	/**
	 * selectGalleryPollDetailList
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryPollDetailList(Map mapParameter){
		return selectList("edu_gallery.selectGalleryPollDetailList", mapParameter);
	}
	
	/**
	 * selectGalleryImgList
	 * 갤러리 이미지 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImg(Map mapParameter){
		return selectList("edu_gallery.selectGalleryImg", mapParameter);
	}
	
	/**
	 * selectGalleryImgIconList
	 * imgIcon 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImgIconList(Map mapParameter){
		return selectList("edu_gallery.selectGalleryImgIconList", mapParameter);
	}
	
	/**
	 * selectGalleryReplyList
	 * 갤러리 댓글 리스트
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryReplyList(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("edu_gallery.selectGalleryReplyList", mapParameter);
	}
	
	/**
	 * selectGalleryReplyNextOrder
	 * 갤러리 댓글 next reply_order 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryReplyNextOrder(Map mapParameter){
		return selectOne("edu_gallery.selectGalleryReplyNextOrder", mapParameter);
	}
	
	/**
	 * insertGalleryReply
	 * 갤러리 댓글 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryReply(Map mapParameter){
		return insert("edu_gallery.insertGalleryReply", mapParameter);
	}
	
	/**
	 * insertGalleryLikeInfo
	 * 갤러리 추천 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryLikeInfo(Map mapParameter){
		return insert("edu_gallery.insertGalleryLikeInfo", mapParameter);
	}
	
	/**
	 * deleteGalleryLikeInfo
	 * 갤러리 추천 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryLikeInfo(Map mapParameter){
		return insert("edu_gallery.deleteGalleryLikeInfo", mapParameter);
	}
	
	/**addMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public void addMyGallery(Map mapParameter){
		// 2016.12.02 시큐어코딩 삭제
		insert("edu_gallery.addMyGallery",mapParameter);
	};
	
	
	/**
	 * deleteGalleryPollVoteInfo
	 * 설문조사 참여자 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollVoteInfo(Map mapParameter){
		return delete("edu_gallery.deleteGalleryPollVoteInfo", mapParameter);
	}

	/**
	 * deleteGalleryPollDetail
	 * 설문조사 문항 상세 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollDetail(Map mapParameter){
		return delete("edu_gallery.deleteGalleryPollDetail", mapParameter);
	}

	/**
	 * deleteGalleryPoll
	 * 설문조사 문항 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPoll(Map mapParameter){
		return delete("edu_gallery.deleteGalleryPoll", mapParameter);
	}
	
	/**
	 * deleteGalleryImgIconList
	 * 이미지 아이콘 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIconList(Map mapParameter){
		return delete("edu_gallery.deleteGalleryImgIconList", mapParameter);
	}

	/**
	 * deleteGalleryImgList
	 * 통계갤러리 이미지 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgList(Map mapParameter){
		return delete("edu_gallery.deleteGalleryImgList", mapParameter);
	}
	
	/**
	 * deleteGalleryImg
	 * 통계갤러리 이미지 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImg(Map mapParameter){
		return delete("edu_gallery.deleteGalleryImg", mapParameter);
	}
	/**
	 * deleteGalleryImgIcon
	 * 통계갤러리 이미지 아이콘 (해당이미지) 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIcon(Map mapParameter){
		return delete("edu_gallery.deleteGalleryImgIcon", mapParameter);
	}

	/**
	 * deleteGalleryImgIconOri
	 * 통계갤러리 이미지 아이콘 개별  삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIconOri(Map mapParameter){
		return delete("edu_gallery.deleteGalleryImgIconOri", mapParameter);
	}
	
	
	
	
	/**
	 * deleteReply
	 * 댓글 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteReply(Map mapParameter){
		return delete("edu_gallery.deleteReply", mapParameter);
	}

	/**
	 * deleteGallery
	 * 통계 갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGallery(Map mapParameter){
		return delete("edu_gallery.deleteGallery", mapParameter);
	}
	
	/**
	 * deleteGalleryMyGallery
	 * 통계 갤러리 마이갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryMyGallery(Map mapParameter){
		return delete("edu_gallery.deleteGalleryMyGallery",mapParameter);
	}
	
	/**
	 * insertGalleryPollVoteInfo
	 * 갤러리 설문조사 투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryPollVoteInfo(Map mapParameter){
		return insert("edu_gallery.insertGalleryPollVoteInfo", mapParameter);
	}
	
	/**
	 * updateGalleryPollVoteInfo
	 * 갤러리 설문조사 재투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int updateGalleryPollVoteInfo(Map mapParameter){
		return update("edu_gallery.updateGalleryPollVoteInfo", mapParameter);
	}
	
	/**
	 * selectGalleryPollVoteInfo
	 * 갤러리 설문조사 재투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryPollVoteInfo(Map mapParameter){
		return selectList("edu_gallery.selectGalleryPollVoteInfo", mapParameter);
	}
	
	
	/**
	 * addGallery
	 * 갤러리 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void addGallery(Map map) {
		// TODO Auto-generated method stub
		insert("edu_gallery.addGallery",map);
	}
	
	public void insertGalleryTag(Map map) {
		insert("edu_gallery.insertGalleryTag",map);
	}
	
	
	/**
	 * insertSurveyPoll
	 * 설문조사 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertSurveyPoll(Map map){
		insert("edu_gallery.insertSurveyPoll",map);
	}
	
	/**
	 * insertSurveyPollDetail
	 * 설문조사 상세 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertSurveyPollDetail(Map map){
		insert("edu_gallery.insertSurveyDetail",map);
	}
	
	/**
	 * insertGalleryImg
	 * 이미지 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertGalleryImg(Map map){
		insert("edu_gallery.insertGalleryImg",map);
	}
	/**
	 * insertIcon
	 * 이미지 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertIconList(Map map){
		insert("edu_gallery.insertIconList",map);
	}
	
	/**
	 * selectBookMarkListCount
	 * 즐겨찾기 개수
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectBookMarkListCount(Map map){
		int count = 0;
		count = selectOne("edu_gallery.selectBookMarkListCount",map);
		return count;
	}
	
	/**
	 * defenceAutometicAttack
	 * 즐겨찾기 개수
	 * @param Map mapParameter
	 * @exception 
	 */
	public String defenceAutometicAttack(Map map){
		String defenceAutometicAttack = selectOne("edu_gallery.defenceAutometicAttack",map);
		return defenceAutometicAttack;
	}
	/**
	 * selectBookMarkList
	 * 북마크 리스트 가져오기
	 * @param Map map
	 * @exception 
	 */
	public List selectBookMarkList(Map map){
		return selectList("edu_gallery.selectBookMarkList",map);
	}
	public List selectBookMarkList2(Map map){
		return selectList("edu_gallery.selectBookMarkList2",map);
	}
	
	/**selectGalleryAllCountList
	 * 즐겨찾기, 작성 갤러리 , 수집갤러리 개수
	 * @param String member_id
	 * @exception 
	 */
	public Map selectGalleryAllCountList(String member_id){		
		return selectOne("edu_gallery.selectGalleryAllCountList",member_id);
	}

	/**updateGalleryList
	 * 갤러리 메인 수전
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryList(Map map){
		update("edu_gallery.updateGalleryList",map);
	}
	
	/**updateGalleryPoll
	 * 설문조사 수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryPoll(Map map){
		update("edu_gallery.updateGalleryPoll",map);
	}
	
	/**updateGalleryPollDetail
	 * 설문조사 상세 수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryPollDetail(Map map){ //2017.12.04 [개발팀] 시큐어코딩
		update("edu_gallery.updateGalleryPollDetail",map);
	}
	
	/**updateGalleryImgList
	 * 이미지 수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryImgList(Map map){
		update("edu_gallery.updateGalleryImgList",map);
	}
	
	/**updateGalleryImgIconList
	 * 아이콘 리스트  수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryImgIconList(Map map){
		update("edu_gallery.updateIconList",map);
	}
	/**deleteGalleryPollDetailAns
	 * 설문항목 삭제
	 * @param Map map
	 * @exception 
	 */
	public void deleteGalleryPollDetailAns(Map map){
		delete("edu_gallery.deleteGalleryPollDetailAns",map);
	}

	public void deleteGalleryPollVoteInfoDetail(Map map) {
		// TODO Auto-generated method stub
		delete("edu_gallery.deleteGalleryPollVoteInfoDetail",map);
	}
	
	/**deleteGalleryPollVoteInfoUser
	 * 유저 설문 항목 삭제
	 * @param Map map
	 * @exception 
	 */
	public void deleteGalleryPollVoteInfoUser(Map map){
		delete("edu_gallery.deleteGalleryPollVoteInfoUser",map);
	}
	
	/**deleteGalleryHist
	 * 캡쳐된 통계갤러리 ID와 사진을 삭제 
	 * @param String hist_id
	 * @exception 
	 */
	public void deleteGalleryHist(Map map){
		delete("edu_gallery.deleteGalleryHist",map);
		delete("edu_gallery.deleteStatistcsHistoryParamInfo",map);
	}
	
	
	/**updateGalleryHit
	 * 갤러리 조회수 증가 
	 * @param String data_id
	 * @exception 
	 */
	public void updateGalleryHit(String data_id){
		update("edu_gallery.updateGalleryHit",data_id);
	}
	
	/**existMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public int existMyGallery(Map mapParameter){
		int count = 0;
		count = selectOne("edu_gallery.existMyGallery",mapParameter);
		return count;
	}
	
	/**deleteGalleryReply
	 * 갤러리 조회수 증가 
	 * @param Map mapParameter
	 * @exception 
	 */
	public void deleteGalleryReply(Map mapParameter){
		delete("edu_gallery.deleteGalleryReply",mapParameter);
	}
	
	/**getMemberMn
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public String getMemberNm(Map mapParameter){
		Map map = selectOne("edu_gallery.getMemberNm",mapParameter);
		String member_nm = map.get("member_nm").toString();
		return member_nm;
	}
	
	/**updateReply
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public void updateReply(Map mapParameter){
		update("edu_gallery.updateReply",mapParameter);
	}
	
	/**selectBookMarkData
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public Map selectBookMarkData(Map mapParameter){
		return selectOne("edu_gallery.selectBookMarkData",mapParameter);
	}

	/**selectAllCountWriteCount
	 * 작성개수 가져오기
	 * @param Map  mapParameter
	 * @exception 
	 */
	public int selectAllCountWriteCount(Map result) {
		// TODO Auto-generated method stub
		return selectOne("edu_gallery.selectAllCountWriteCount",result);
	}
	
	/**selectAllCountCollectCount
	 * 수집개수 가져오기
	 * @param Map  mapParameter
	 * @exception 
	 */
	public int selectAllCountCollectCount(Map result){
		return selectOne("edu_gallery.selectAllCountCollectCount",result);
	}
	
	public int selectAllCountLikeCount(Map result){
		return selectOne("edu_gallery.selectAllCountLikeCount",result);
	}
	
	public int selectAllTempWriteCount(Map result){
		return selectOne("edu_gallery.selectAllTempWriteCount",result);
	}

	public void deleteGalleryTag(Map map) {
		delete("edu_gallery.deleteGalleryTag",map);
	}

	public int selectGalleryReplyPwd(Map mapParameter) {
		return selectOne("edu_gallery.selectGalleryReplyPwd",mapParameter);
	}
	public int selectGalleryReplyNick(Map mapParameter) {
		return selectOne("edu_gallery.selectGalleryReplyNick",mapParameter);
	}
	
}
