package kostat.sop.ServiceAPI.api.ak.usesrvsearch.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: USESRVSearchDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月19日 下午3:40:17    
 * @version V1.0      
 *     
 */
@Component
public class USESRVSearchDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map getSumStat() {
		Map resultMap=new HashMap();
		resultMap.put("SRV_APPLCT", getSqlSession().selectOne("USESRVSearch.getUSESRV_CNT","APPLCT"));
		resultMap.put("SRV_RETURN", getSqlSession().selectOne("USESRVSearch.getUSESRV_CNT","RETURN"));
		resultMap.put("SRV_TOTAL",  getSqlSession().selectOne("USESRVSearch.getUSESRV_CNT"));
		resultMap.put("SRV_ASSENT", getSqlSession().selectOne("USESRVSearch.getUSESRV_CNT","ASSENT"));
		return resultMap;
	}
	public Map searchUSESRV(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("total", (int) getSqlSession().selectOne("USESRVSearch.searchTotalCount",paramMap));
		List resultList=getSqlSession().selectList("USESRVSearch.searchUSERSERV",paramMap);
		resultMap.put("rows", resultList);
		return resultMap;
	}
	public Map getUSESRVInfo(String SRV_ID){
		Map resultMap = new HashMap();
		resultMap.put("info", (Map) getSqlSession().selectOne("USESRVSearch.getUSESRVDetail",SRV_ID));
		resultMap.put("history", getSqlSession().selectList("USESRVSearch.getUSESRVChangeHistory",SRV_ID));
		return resultMap;
	}
	public Success deleteUSESRV(String [] IDS) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int) getSqlSession().delete("USESRVSearch.deleteUSESRV",IDS) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public Success updateUSESRV(Map paramMap) {
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int)getSqlSession().update("USESRVSearch.updateUSESRV",paramMap) > 0){
			getSqlSession().insert("USESRVSearch.addUSESRVChangeHistory",paramMap);
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
}
