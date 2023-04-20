package kostat.lbdms.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("dataTransferMapper")
public class DataTransferMapper extends EgovAbstractMapper {
    @Resource(name = "sqlSessionSystem")
    public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
	super.setSqlSessionFactory(sqlSession);
    }
    
    /**
	 * 해당 id 전송 개수 파악
	 * selectCountTransferReq
	 * @param selectCountDataTransReq
	 * @exception SQLException
	 */
    public int selectCountDataTransReq(Map<String,Object> paramMap) throws SQLException{
	return selectOne("dataTransfer.selectCountDataTransReq",paramMap);
    }
    
    /**
	 * 해당 id 전송 개수 파악
	 * selectCountTransferReq
	 * @param mapParameter
	 * @exception SQLException
	 */
    public List<Map<String,Object>> selectDataTransReq(Map<String,Object> paramMap) throws SQLException{
	return selectList("dataTransfer.selectDataTransReq",paramMap);
    }

    public Map<String, Object> selectReqNo(Map<String, Object> paramMap) throws SQLException{
	return selectOne("dataTransfer.selectReqNo",paramMap);
    }

    public void insertTransDataReq(Map<String, Object> paramMap) throws SQLException{
	insert("dataTransfer.insertTransDataReq",paramMap);
    }
    
    public void updateTransDataReq(Map<String , Object> paramMap) throws SQLException{
	update("dataTransfer.updateTransDataReq", paramMap);
    }

   
}
