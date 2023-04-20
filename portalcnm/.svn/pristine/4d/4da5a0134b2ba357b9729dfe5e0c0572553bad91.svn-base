package kostat.sop.ServiceAPI.api.dt.ststistics.mapper;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

import egovframework.rte.psl.dataaccess.util.EgovMap;

@Component
public class StstisticsCommonDao extends SqlSessionDaoSupport {

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	@SuppressWarnings("unchecked")
	public HashMap<String, Object> selectMap(String query , HashMap<String, Object> paramMap){
		return (HashMap<String, Object>) getSqlSession().selectOne(query,paramMap);
	}
	@SuppressWarnings("unchecked")
	public List<HashMap<String, Object>> select(String query, HashMap<String, Object> paramMap){
		return getSqlSession().selectList(query, paramMap);
	}
	@SuppressWarnings("unchecked")
	public List<HashMap<String, Object>> select(String query){
		return getSqlSession().selectList(query);
	}
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectList(String query , HashMap<String, Object> paramMap){
		return getSqlSession().selectList(query, paramMap);
	}
	
	public int selectInt(String query , HashMap<String, Object> paramMap){
		return (int) getSqlSession().selectOne(query,paramMap);
	}
	
	public int register(String query , HashMap<String, Object> paramMap){
		return (int) getSqlSession().insert(query,paramMap);
	}
	
	public int register(String query , List<HashMap<String, Object>> paramMap){
		return (int) getSqlSession().insert(query,paramMap);
	}
	
	public int edit(String query , HashMap<String, Object> paramMap){
		return (int) getSqlSession().update(query,paramMap);
	}
	
	public int remove(String query , HashMap<String, Object> paramMap){
		return (int) getSqlSession().delete(query,paramMap);
	}
	/*2020�� SGIS��ȭ 3�� ����*/
	public String selectString(String query , HashMap<String, Object> paramMap) {
		return (String) getSqlSession().selectOne(query,paramMap);
	}
	/*2020�� SGIS��ȭ 3�� ��*/
}
