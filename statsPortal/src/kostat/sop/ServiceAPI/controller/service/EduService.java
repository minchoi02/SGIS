package kostat.sop.ServiceAPI.controller.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface EduService {

	
	public List selectEduContentsList(Map mapParameter);
	
	
	public int selectEduContentsListCount(Map mapParameter);
	
	/**
	 * 학교등급별 주제 목록 O
	 * @param mapParameter
	 * @return
	 */
	public List selectEduThemaList(Map mapParameter);
	
	
	/**
	 * 콘텐츠 조회 O
	 * @param mapParameter
	 * @return
	 */
	public Map selectEduContents(Map mapParameter);
	
	/**
	 * 콘텐츠 퀴즈 조회 O
	 * @param mapParameter
	 * @return
	 */
	public Map selectEduContentsQuiz(Map mapParameter);
	

	/**
	 * 콘텐츠 별 해시태그 목록 O
	 * @param mapParameter
	 * @return
	 */
	public List<String> selectEduContentsHashtagList(Map mapParameter);

	/**
	 * 메인 콘텐츠 목록 O
	 * @param mapParameter
	 * @return
	 */
	public List selectEduMainContentsList(Map<String, Object> mapParameter);

	/**
	 * 다음 콘텐츠 조회 O
	 * @param mapParameter
	 * @return
	 */
	public Map selectEduNextContents(Map mapParameter);
	
	/**
	 * 추천 콘텐츠
	 * @param mapParameter
	 * @return
	 */
	public List selectEduRecommendContents(Map mapParameter);


	/**
	 * 배우는지도 (교안) 해시태그 목록
	 * @param mapParameter
	 * @return
	 */
	public List selectEduTchpgmHashtagList(Map<String, Object> mapParameter);


	/**
	 * 배우는지도 (교안) 목록
	 * @param mapParameter
	 * @return
	 */
	public List<Map<String, Object>> selectEduTchpgmList(Map<String, Object> mapParameter);


	/**
	 * 주제별 인기 검색어 top5
	 * @param mapParameter
	 * @return
	 */
	public List selectPopularSrchwrdGroupByThema(Map<String, Object> mapParameter);


	/**
	 * 연관검색어 목록 조회
	 * @param mapParameter
	 * @return
	 */
	public List selectRelationKwrdList(Map<String, Object> mapParameter);


	/**
	 * 통합검색 : 수업하기 콘텐츠 목록 검색
	 * @param mapParameter
	 * @return
	 */
	public List selectSearchContentsList(Map<String, Object> mapParameter);

	/**
	 * 통합검색 : 배우는지도 교안 목록 검색
	 * @param mapParameter
	 * @return
	 */
	public List selectSearchTchpgmList(Map<String, Object> mapParameter);

	/**
	 * 통합검색 : 함께하는지도 목록 검색
	 * @param mapParameter
	 * @return
	 */
	public List selectSearchWithMapList(Map<String, Object> mapParameter);

	/**
	 * 통합검색 : 수업하기 콘텐츠 목록 검색 수
	 * @param mapParameter
	 * @return
	 */
	public int selectSearchContentsListCnt(Map<String, Object> mapParameter);

	/**
	 * 통합검색 : 배우는지도 교안 목록 검색 수
	 * @param mapParameter
	 * @return
	 */
	public int selectSearchTchpgmListCnt(Map<String, Object> mapParameter);

	/**
	 * 통합검색 : 함께하는지도 목록 검색 수
	 * @param mapParameter
	 * @return
	 */
	public int selectSearchWithMapListCnt(Map<String, Object> mapParameter);

	/**
	 * 검색어 카운트
	 * @param mapParameter
	 */
	public int insertSearchCnt(Map<String, Object> mapParameter);

	/**
	 * 함께하는지도 목록 
	 * @param mapParameter
	 * @return
	 */
	public List<Map<String, Object>> selectEduWithMapList(Map<String, Object> mapParameter);


	/**
	 * 함께하는지도 해시태그 조회
	 * @param mapParameter
	 * @return
	 */
	public List selectEduWithMapListHashtagList(Map<String, Object> mapParameter);

	
	/**
	 * 교사등록 
	 * @param mapParameter
	 * @return
	 */
	public int insertTeacher(Map<String, Object> mapParameter);

	/**
	 * 교사권한정보
	 * @param mapParameter
	 * @return
	 */
	public Map selectTeacherInfo(Map<String, Object> mapParameter);


	/**
	 * 메인 게시판 목록 top2
	 * @param mapParameter
	 * @return
	 */
	public List selectMainBoardList(Map<String, Object> mapParameter);

	/**
	 * 이슈목록
	 * @param mapParameter
	 * @return
	 */
	public List selectEduIssueList(Map mapParameter);

	/**
	 * 이슈 콘텐츠 목록
	 * @param mapParameter
	 * @return
	 */
	public List selectEduIssueContentsList(Map mapParameter);
	
	/**
	 * 이슈 보기 콘텐츠 수
	 * @param mapParameter
	 * @return
	 */
	public int selectEduIssueContentsListCount(Map mapParameter);
}

