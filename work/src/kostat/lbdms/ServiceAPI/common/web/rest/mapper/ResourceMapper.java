package kostat.lbdms.ServiceAPI.common.web.rest.mapper;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.postgresql.util.PSQLException;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import kostat.lbdms.ServiceAPI.controller.model.core.ListTypeParameter;
import kostat.lbdms.ServiceAPI.controller.model.core.ListTypeResult;
import kostat.lbdms.ServiceAPI.controller.model.resource.ResourceDetail;
import kostat.lbdms.ServiceAPI.controller.model.system.ResourceVO;

@Repository("resourceMapper")
public class ResourceMapper extends EgovAbstractMapper {

    @Resource(name = "sqlSessionSystem")
    public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
	super.setSqlSessionFactory(sqlSession);
    }

    /**
     * <pre>
     * 그룹 데이터 목록
     * </pre>
     * 
     * @param ListTypeParameter
     *            param
     * @return ListTypeResult<List<ResourceVO>>
     */
    public ListTypeResult<List<ResourceVO>> groupDataList(ListTypeParameter param) throws PSQLException {
	return (ListTypeResult<List<ResourceVO>>) selectList("resourceMapper.groupDataList",param);
    }

    /**
     * <pre>
     * 기관 데이터 or 내 데이터 중복 체크
     * </pre>
     * 
     * @param ResourceVO
     *            resourceVO
     * @return
     */
    public int grpDataDupCheck(ResourceVO resourceVO) throws PSQLException {
	return selectOne("resourceMapper.grpDataDupCheck",resourceVO);
    }

    /**
     * <pre>
     * resource 데이터 삭제
     * </pre>
     * 
     * @param ResourceVO
     *            resourceVO
     * @return
     */
    public void deleteData(ResourceVO resourceVO) throws PSQLException {
	delete("resourceMapper.deleteData",resourceVO);
    }

    /**
     * <pre>
     * resource action_type update
     * </pre>
     * 
     * @param ResourceVO
     *            resourceVO
     * @return
     */
    public void updateResourceActionType(ResourceVO resourceVO) throws PSQLException {
	update("resourceMapper.updateResourceActionType",resourceVO);
    }

    /**
     * <pre>
     * resource 데이터 insert
     * </pre>
     * 
     * @param ResourceVO
     *            resourceVO
     * @return
     */
    public int copyResource(ResourceVO resourceVO) throws PSQLException {
	return insert("resourceMapper.copyResource",resourceVO);
    }

    /**
     * <pre>
     * 리소스 아이디를 조회한다
     * </pre>
     * 
     * @param parameterMap
     * @return
     * @throws PSQLException
     */
    public int selectResourceId(HashMap<String, Object> parameterMap) {
	return selectOne("resourceMapper.selectResourceId",parameterMap);
    }

    /**
     * 테이블 미리보기용 리소스 조회
     * 
     * @param parameterMap
     * @return
     */
    public String selectResourceIdByPreview(HashMap<String, Object> parameterMap) {
	return selectOne("resourceMapper.selectResourceIdByPreview",parameterMap);
    }

    /**
     * 리소스 정보 조회
     * 
     * @param resourceId
     * @return
     */
    public ResourceVO detailResource(int resourceId) {
	return selectOne("resourceMapper.detailResource",resourceId);
    }

    /**
     * <pre>
     * 리소스 아이디를 조회한다
     * </pre>
     * 
     * @param parameterMap
     * @return
     * @throws PSQLException
     */
    public int selectResourceId2(HashMap<String, Object> parameterMap) {
	return selectOne("resourceMapper.selectResourceId2",parameterMap);
    }

    /**
     * 데이터관리 > 내 데이터의 목록을 조회한다.
     * 
     * @param parameterMap
     * @return
     */
    public List<HashMap> selectCategorize(HashMap parameterMap) throws PSQLException {
	return selectList("resourceMapper.selectCategorize",parameterMap);
    }

    /**
     * 데이터관리 > 내 데이터의 목록의 카운트를 조회한다.
     * 
     * @param parameterMap
     * @return
     * @throws PSQLException
     */
    public int selectCategorizeCount(HashMap parameterMap) throws PSQLException {
	return selectOne("resourceMapper.selectCategorizeCount",parameterMap);
    }

    /**
     * 데이터생성 > 테이블 선택 에서 목록을 조회한다.
     * 
     * @param parameterMap
     * @return
     * @throws PSQLException
     */
    public List<HashMap> selectCategorizeDownload(HashMap parameterMap) throws PSQLException {
	return selectList("resourceMapper.selectCategorizeDownload",parameterMap);
    }

    /**
     * 데이터생성 > 테이블 선택 에서 목록의 카운트를 조회 한다.
     * 
     * @param parameterMap
     * @return
     * @throws PSQLException
     */
    public int selectCategorizeDownloadCount(HashMap parameterMap) throws PSQLException {
	return selectOne("resourceMapper.selectCategorizeDownloadCount",parameterMap);
    }

    /**
     * <pre>
     * resource 데이터 insert
     * </pre>
     * 
     * @param ResourceVO
     *            resourceVO
     * @return
     */
    public int insertResource(ResourceDetail vo) throws PSQLException {
	return insert("resourceMapper.insertResource",vo);
    }

    /**
     * resource 데이터 update
     * 
     * @param vo
     * @return
     * @throws PSQLException
     */
    public int updateResource(ResourceDetail vo) throws PSQLException {
	return update("resourceMapper.updateResource",vo);
    }
}
