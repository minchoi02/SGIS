package kostat.lbdms.ServiceAPI.common.web.rest.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import kostat.lbdms.ServiceAPI.controller.model.rest.Execute;

@Repository("executeMapper")
public class ExecuteMapper extends EgovAbstractMapper{
    @Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
    /**
   	 * 이력 생성
   	 * @param execute
   	 * @return
   	 */
   	public int insertExecute( Execute execute ) {
   	    return insert("executeMapper.insertExecute",execute);
   	}
   	
   	 /**
   	 * 이력 생성
   	 * @param Map map
   	 * @return
   	 */
   	public int insertExecuteR( Map<String,Object> map ) {
   	    return insert("executeMapper.insertExecuteR",map);
   	}
   	
   	
   	
   	/**
   	 * 이력 생성
   	 * @param execute
   	 * @return
   	 */
   	public int insertExecuteWithMap(HashMap<String, Object> execute) {
   	    return insert("executeMapper.insertExecuteWithMap",execute);
   	}
   	
   	/**
   	 * 상태 수정
   	 * @param execute
   	 * @return
   	 */
   	public int updateExecuteState( Execute execute ) {
   	    return update("executeMapper.updateExecuteState",execute);
   	}
   	//hts
   	
   	public int insertSchduleExecute( Execute execute ) {
   	    return insert("executeMapper.insertSchduleExecute",execute);
   	}
   	/**
   	 * 이력 생성
   	 * @param execute
   	 * @return
   	 */
   	public int deleteExecute( Execute execute ) {
   	 return delete("executeMapper.deleteExecute",execute);
   	}
   	
   	/**
   	 * 이력 수정
   	 * @param execute
   	 * @return
   	 */
   	public int updateExecute( Execute execute ) {
   	    return update("executeMapper.updateExecute",execute);
   	}
   	
   	/**
   	 * 분석 이력 생성
   	 * @param execute
   	 * @return
   	 */
   	public int insertSgisLog( HashMap<String, String> map) {
   	 return insert("executeMapper.insertSgisLog",map);
   	}
   	
   	/**
   	 * 쿼리 실행
   	 * @param execute
   	 * @return
   	 */
   	public String executeQry(HashMap<String, String> map) {
   	    return selectOne("executeMapper.executeQry",map);
   	}
   	
   	/**
   	 * 쿼리 실행 목록리턴
   	 * @param execute
   	 * @return
   	 */
   	public List<HashMap<String, Object>> executeQryList(HashMap<String, String> map) {
   	    return selectList("executeMapper.executeQry",map);
   	}
   	
   	/**
   	 * 데이서 생성 위치 정보 생성 이력 조회
   	 * @param category
   	 * @return
   	 */
   	public List<HashMap<String, Object>> selectCategorize(HashMap<String, Object> category) {
   	    return selectList("executeMapper.selectCategorize",category);
   	}
   	
   	/**
   	 * @brief 데이서 생성 위치 정보 생성 총 갯수 조회
   	 * @param map
   	 * @return
   	 */
   	public int selectCategorizeCount(HashMap<String, Object> map) {
   	    return selectOne("executeMapper.selectCategorizeCount",map);
   	}
   	
   	/**
   	 * 전송이력 상세정보 조회
   	 * @param execute_id
   	 * @return
   	 */
   	public HashMap<String, Object> detailExecute(String execute_id) {
   	 return selectOne("executeMapper.detailExecute",execute_id);
   	}
   	/**
   	 * 실패 작업 현황 목록 조회
   	 * @param category
   	 * @return
   	 */
   	public List<HashMap<String, Object>> selectFailExecuteList(HashMap<String, Object> category) {
   	    return selectList("executeMapper.selectFailExecuteList",category);
   	}

   	/**
   	 * 전송이력 삭제
   	 * @param map
   	 * @return
   	 */
   	public int deleteExecute(HashMap<String, Object> map) {
   	    return delete("executeMapper.deleteExecute",map);
   	}
   	/**
   	 * 실패 작업 현황 총 갯수 조회
   	 * @param category
   	 * @return
   	 */
   	public int selectFailExecuteListCount(HashMap<String, Object> category) {
   	    return selectOne("executeMapper.selectFailExecuteListCount",category);
   	}
   	
   	/**
   	 * 프로젝트 실행 이력 ID를 이용해 execute 조회
   	 * @param query
   	 * @return
   	 */
   	public HashMap<String, Object> selectExecuteById(HashMap<Object, String> query) {
   	 return selectOne("executeMapper.selectExecuteById",query);
   	}
   	
   	/**
   	 * ExecuteVO 반환하는 detailExecute
   	 * @param executeId
   	 * @return
   	 */
   	public Execute detailExecuteReturnExecute(String executeId) {
   	    return selectOne("executeMapper.detailExecuteReturnExecute",executeId);
   	}
   	
   	/**
   	 * execute action_type 변경
   	 * @param queryMap
   	 */
   	public void changeExecuteActionType(HashMap<String, Object> queryMap) {
   	    update("executeMapper.changeExecuteActionType",queryMap);
   	}
   	
   	/**
   	 * 단일 실행을 일괄 실행으로 변경
   	 * @param executeId
   	 */
   	public void changeExecuteSingleToBundle(String executeId) {
   	    update("executeMapper.changeExecuteSingleToBundle",executeId);
   	}
   	
   	public int insertExecuteAction(HashMap<String, Object> map) {
   	    return insert("executeMapper.insertExecuteAction",map);
   	}
}
