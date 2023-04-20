package kostat.sop.ServiceAPI.api.dt.policyCategorymanage.mapper;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: ThemaManageDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月5日 下午6:42:46    
 * @version V1.0      
 *    
 */
@Component
public class PolicyCategoryManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchThemaMap(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("PolicyCategoryManage.searchPolicyCategory",paramMap));
		resultMap.put("total", getSqlSession().selectList("PolicyCategoryManage.searchPolicyCategoryCount",paramMap));
		return resultMap;
	}
	public Success deletePolicyCategory(String[] STAT_THEMA_MAP_ID){
		Success success = new Success(false,Prompt.DELETEFAIL);
		if(getSqlSession().delete("PolicyCategoryManage.deletePolicyCategory",STAT_THEMA_MAP_ID)  > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public Success updatePolicyCategory(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if(getSqlSession().update("PolicyCategoryManage.updatePolicyCategory",paramMap) >0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	public Success addPolicyCategory(Map paramMap){
		Success success = new Success(false,Prompt.ADDFAIL);
		int insertNum=getSqlSession().insert("PolicyCategoryManage.addPolicyCategory",paramMap);
		if(insertNum >0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public int searchCount(){
		return (int) getSqlSession().selectOne("PolicyCategoryManage.getSearchCategoryCount");
	}
	public String searchID(){
		String test = "";
		test = getSqlSession().selectOne("PolicyCategoryManage.selectID").toString();
		return test;
	}
	public Map getTipDiv(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("PolicyCategoryManage.getTipDiv",paramMap));
		return resultMap;
	}
}
