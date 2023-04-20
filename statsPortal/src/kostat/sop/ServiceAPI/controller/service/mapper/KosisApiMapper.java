package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository( "kosisApiMapper" )
public class KosisApiMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSession3")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	/**
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getData() throws SQLException {
		return selectOne("kosisApiRequest.selectData");
	}

	public List getStblCategory() {
		// TODO Auto-generated method stub
		return selectList("kosisApiRequest.selectStblCategory");
	}

	public List getStblList(Map paramMap) {
		// TODO Auto-generated method stub
		return selectList("kosisApiRequest.getStblList",paramMap);
	}

	public List getStblItmList(HashMap<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return selectList("kosisApiRequest.getStblItmList",paramMap);
	}

	public List getTotSurvStatValidateParams(HashMap<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return selectList("kosisApiRequest.getTotSurvStatValidateParams",paramMap);
	}

	/*public List getTotsurvKosisData(HashMap<String, Object> paramMap) {
		// TODO Auto-generated method stub
		///return selectList("kosisApiRequest.getTotsurvKosisData",paramMap);
		return selectList("kosisApiRequest.getSqlTest",paramMap);
		
	}*/

	public List getTotsurvKosisData(Map sql) {
		// TODO Auto-generated method stub
		return selectList("kosisApiRequest.getTotsurvKosisData",sql);
	}
	
}
