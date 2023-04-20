package kostat.lbdms.ServiceAPI.common.web.rest.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import kostat.lbdms.ServiceAPI.controller.model.rest.Download;

/**  
 * <pre>
 * 사용자 서포트 영역 관리 mapper
 * </pre>
 *
 * @author		Admin
 * @since 		2015. 10. 20. 오후 2:18:53
 * @version 	    1.0
 * @see
 * <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *</pre>
 */
@Repository("stsMapper")
public class STSMapper extends EgovAbstractMapper{
    	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
    /**
	 * <pre>
	 * 사용자 서포트 영역 게시글 카운트 조회
	 * </pre>
	 * @return
	 */
	public HashMap<String, Object> getUserManageStatusCount(){
	    return selectOne("stsMapper.getUserManageStatusCount");
	}
	/**
	 * <pre>
	 * 서포트 영역 게시글 카운트 조회
	 * </pre> 
	 * @return
	 */
	public HashMap<String, Object> getManageStatusCount(){
	    return selectOne("stsMapper.getManageStatusCount");
	}
	/**
	 * <pre>
	 * 사용자 승인요청 건수 조회
	 * </pre>
	 * @param user_id
	 * @return
	 */
	public HashMap<String, Object> selectGrantCnt( String user_id ){
	    return selectOne("stsMapper.selectGrantCnt",user_id);
	}

	/**
	 * <pre>
	 * 다운로드 목록 조회
	 * </pre>
	 * @param paramsMap
	 * @return
	 */
	public List<Download> selectDownloadList(Map<String, Object> paramsMap){
	    return selectList("stsMapper.selectDownloadList",paramsMap);
	}

	/**
	 * <pre>
	 * 다운로드 목록 총 갯수 조회
	 * </pre>
	 * @param paramsMap
	 * @return
	 */
	public int selectDownloadListTotalCount(Map<String, Object> paramsMap){
	    return selectOne("stsMapper.selectDownloadListTotalCount",paramsMap);
	}


	/**
	 * <pre>
	 * 다음(DAUM) API 사용 유무 설정
	 * </pre>
	 * @param useYn
	 * @return
	 */
	public int updateDaumApiUseYn(String useYn){
	    return update("stsMapper.updateDaumApiUseYn",useYn);
	}


	/**
	 * <pre>
	 * 다음(API) API 사용 유무 조회
	 * </pre>
	 * @param useYn
	 * @return
	 */
	public String selectDaumApiUseYn(){
	    return selectOne("stsMapper.selectDaumApiUseYn");
	}

	public List<Map<String, Object>> selectDataUsedCategory(){
	    return selectList("stsMapper.selectDataUsedCategory");
	}

	public List<Map<String, Object>> selectDataUsedTotalCount(Map paramsMap){
	    return selectList("stsMapper.selectDataUsedTotalCount",paramsMap);
	}

	public List<Map<String, Object>> selectDataUsedCount(Map paramsMap){
	    return selectList("stsMapper.selectDataUsedCount",paramsMap);
	}
}
