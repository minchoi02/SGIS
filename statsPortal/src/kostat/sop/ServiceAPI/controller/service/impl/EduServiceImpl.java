package kostat.sop.ServiceAPI.controller.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.controller.service.EduService;
import kostat.sop.ServiceAPI.controller.service.mapper.EduMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("eduService")
public class EduServiceImpl extends EgovAbstractServiceImpl implements EduService{
	private static final Logger logger = LoggerFactory.getLogger(MypageServiceImpl.class);
	
	@Resource(name = "eduMapper")
	private EduMapper eduMapper;

	@Override
	public List selectEduContentsList(Map mapParameter) {
		// TODO Auto-generated method stub
		return eduMapper.selectEduContentsList(mapParameter);
	}

	@Override
	public int selectEduContentsListCount(Map mapParameter) {
		return eduMapper.selectEduContentsListCount(mapParameter);
	}

	@Override
	public List selectEduThemaList(Map mapParameter) {
		return eduMapper.selectEduThemaList(mapParameter);
	}

	@Override
	public Map selectEduContents(Map mapParameter) {
		return eduMapper.selectEduContents(mapParameter);
	}

	@Override
	public Map selectEduContentsQuiz(Map mapParameter) {
		return eduMapper.selectEduContentsQuiz(mapParameter);
	}

	@Override
	public List<String> selectEduContentsHashtagList(Map mapParameter) {
		return eduMapper.selectEduContentsHashtagList(mapParameter);
	}

	@Override
	public List selectEduMainContentsList(Map<String, Object> mapParameter) {
		return eduMapper.selectEduMainContentsList(mapParameter);
	}

	@Override
	public Map selectEduNextContents(Map mapParameter) {
		return eduMapper.selectEduNextContents(mapParameter);
	}

	@Override
	public List selectEduRecommendContents(Map mapParameter) {
		return eduMapper.selectEduRecommendContents(mapParameter);
	}

	@Override
	public List selectEduTchpgmHashtagList(Map<String, Object> mapParameter) {
		return eduMapper.selectEduTchpgmHashtagList(mapParameter);
	}

	@Override
	public List<Map<String, Object>> selectEduTchpgmList(Map<String, Object> mapParameter) {
		return eduMapper.selectEduTchpgmList(mapParameter);
	}

	@Override
	public List selectPopularSrchwrdGroupByThema(Map<String, Object> mapParameter) {
		return eduMapper.selectPopularSrchwrdGroupByThema(mapParameter);
	}

	@Override
	public List selectRelationKwrdList(Map<String, Object> mapParameter) {
		return eduMapper.selectRelationKwrdList(mapParameter);
	}

	@Override
	public List selectSearchContentsList(Map<String, Object> mapParameter) {
		return eduMapper.selectSearchContentsList(mapParameter);
	}

	@Override
	public List selectSearchTchpgmList(Map<String, Object> mapParameter) {
		return eduMapper.selectSearchTchpgmList(mapParameter);
	}

	@Override
	public List selectSearchWithMapList(Map<String, Object> mapParameter) {
		return eduMapper.selectSearchWithMapList(mapParameter);
	}

	@Override
	public int selectSearchContentsListCnt(Map<String, Object> mapParameter) {
		return eduMapper.selectSearchContentsListCnt(mapParameter);
	}

	@Override
	public int selectSearchTchpgmListCnt(Map<String, Object> mapParameter) {
		return eduMapper.selectSearchTchpgmListCnt(mapParameter);
	}

	@Override
	public int selectSearchWithMapListCnt(Map<String, Object> mapParameter) {
		return eduMapper.selectSearchWithMapListCnt(mapParameter);
	}

	@Override
	public int insertSearchCnt(Map<String, Object> mapParameter) {
		 return eduMapper.insertSearchCnt(mapParameter);
	}

	@Override
	public List<Map<String, Object>> selectEduWithMapList(Map<String, Object> mapParameter) {
		return eduMapper.selectEduWithMapList(mapParameter);
	}

	@Override
	public List selectEduWithMapListHashtagList(Map<String, Object> mapParameter) {
		return eduMapper.selectEduWithMapListHashtagList(mapParameter);
	}

	@Override
	public int insertTeacher(Map<String, Object> mapParameter) {
		return eduMapper.insertTeacher(mapParameter);
	}

	@Override
	public Map selectTeacherInfo(Map<String, Object> mapParameter) {
		return eduMapper.selectTeacherInfo(mapParameter);
	}

	@Override
	public List selectMainBoardList(Map<String, Object> mapParameter) {
		return eduMapper.selectMainBoardList(mapParameter);
	}

	@Override
	public List selectEduIssueList(Map mapParameter) {
		return eduMapper.selectEduIssueList(mapParameter);
	}

	@Override
	public List selectEduIssueContentsList(Map mapParameter) {
		return eduMapper.selectEduIssueContentsList(mapParameter);
	}

	@Override
	public int selectEduIssueContentsListCount(Map mapParameter) {
		return eduMapper.selectEduIssueContentsListCount(mapParameter);
	}

}
