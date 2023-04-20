
package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;



@Repository("eduMapper")
public class EduMapper extends EgovAbstractMapper {

	
	public List selectEduContentsList(Map mapParameter){
		return selectList("edu.selectEduContentsList", mapParameter);
	};
	
	
	public int selectEduContentsListCount(Map mapParameter) {
		return selectOne("edu.selectEduContentsListCount", mapParameter);
	}
	
	
	public List selectEduThemaList(Map mapParameter) {
		return selectList("edu.selectEduThemaList", mapParameter);
	}
	
	
	public Map selectEduContents(Map mapParameter) {
		return selectOne("edu.selectEduContents", mapParameter);
	}
	
	
	public Map selectEduContentsQuiz(Map mapParameter) {
		return selectOne("edu.selectEduContentsQuiz", mapParameter);
	}


	public List<String> selectEduContentsHashtagList(Map mapParameter) {
		return selectList("edu.selectEduContentsHashtagList", mapParameter);
	}


	public List selectEduMainContentsList(Map<String, Object> mapParameter) {
		return selectList("edu.selectEduMainContentsList", mapParameter);
	}


	public Map selectEduNextContents(Map mapParameter) {
		return selectOne("edu.selectEduNextContents", mapParameter);
	}


	public List selectEduRecommendContents(Map mapParameter) {
		return selectList("edu.selectEduRecommendContents", mapParameter);
	}


	public List selectEduTchpgmHashtagList(Map<String, Object> mapParameter) {
		return selectList("edu.selectEduTchpgmHashtagList", mapParameter);
	}


	public List<Map<String, Object>> selectEduTchpgmList(Map<String, Object> mapParameter) {
		return selectList("edu.selectEduTchpgmList", mapParameter);
	}


	public List selectPopularSrchwrdGroupByThema(Map<String, Object> mapParameter) {
		return selectList("edu.selectPopularSrchwrdGroupByThema", mapParameter);
	}


	public List selectRelationKwrdList(Map<String, Object> mapParameter) {
		return selectList("edu.selectRelationKwrdList", mapParameter);
	}


	public List selectSearchContentsList(Map<String, Object> mapParameter) {
		return selectList("edu.selectSearchContentsList", mapParameter);
	}


	public List selectSearchTchpgmList(Map<String, Object> mapParameter) {
		return selectList("edu.selectSearchTchpgmList", mapParameter);
	}


	public List selectSearchWithMapList(Map<String, Object> mapParameter) {
		return selectList("edu.selectSearchWithMapList", mapParameter);
	}


	public int selectSearchContentsListCnt(Map<String, Object> mapParameter) {
		return selectOne("edu.selectSearchContentsListCnt", mapParameter);
	}


	public int selectSearchTchpgmListCnt(Map<String, Object> mapParameter) {
		return selectOne("edu.selectSearchTchpgmListCnt", mapParameter);
	}


	public int selectSearchWithMapListCnt(Map<String, Object> mapParameter) {
		return selectOne("edu.selectSearchWithMapListCnt", mapParameter);
	}


	public int insertSearchCnt(Map<String, Object> mapParameter) {
		return insert("edu.insertSearchCnt", mapParameter);
	}


	public List<Map<String, Object>> selectEduWithMapList(Map<String, Object> mapParameter) {
		return selectList("edu.selectEduWithMapList", mapParameter);
	}


	public List selectEduWithMapListHashtagList(Map<String, Object> mapParameter) {
		return selectList("edu.selectEduWithMapListHashtagList", mapParameter);
	}


	public int insertTeacher(Map<String, Object> mapParameter) {
		return insert("edu.insertTeacher", mapParameter);
	}


	public Map selectTeacherInfo(Map<String, Object> mapParameter) {
		return selectOne("edu.selectTeacherInfo", mapParameter);
	}

	
	public List selectMainBoardList(Map<String, Object> mapParameter) {
		return selectList("edu.selectMainBoardList", mapParameter);
	}

	public List selectEduIssueList(Map mapParameter) {
		return selectList("edu.selectEduIssueList", mapParameter);
	}

	public List selectEduIssueContentsList(Map mapParameter) {
		return selectList("edu.selectEduIssueContentsList", mapParameter);
	}
	
	public int selectEduIssueContentsListCount(Map mapParameter) {
		return selectOne("edu.selectEduIssueContentsListCount", mapParameter);
	}
	
}
