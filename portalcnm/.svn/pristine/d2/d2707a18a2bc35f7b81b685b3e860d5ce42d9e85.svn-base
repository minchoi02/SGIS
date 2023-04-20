package kostat.sop.ServiceAPI.api.dt.policymapmanager.mapper;

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
 * @ClassName: UPLOADData
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:08:22    
 * @version V1.0      
 *     
 */
@Component
public class PolicyDataManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map getpolicyMapList(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("PolicyDataManage.getpolicyMapList",paramMap));
		resultMap.put("total", getSqlSession().selectList("PolicyDataManage.getpolicyMapListCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	public Success updatePolicyData(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("PolicyDataManage.updatePolicyData",paramMap) > 0){
			success.setSuccess(true);
		}
		if((int) getSqlSession().update("PolicyDataManage.updatePolicyRelList",paramMap) > 0){
			success.setSuccess(true);
		}
		if((int) getSqlSession().update("PolicyDataManage.updatePolicyCmmnty",paramMap) > 0){
			success.setSuccess(true);
		}
		if((int) getSqlSession().update("PolicyDataManage.updatePolicyApiParm",paramMap) > 0){
			success.setSuccess(true);
		}
		success.setMsg(Prompt.UPDATESUCCESS);
		return success;
	}
	public Success deletePOlicyData(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("PolicyDataManage.deletePOlicyData",list) > 0){
			success.setSuccess(true);
		}
		if((int)getSqlSession().delete("PolicyDataManage.deletePOlicyRelList",list) > 0){
			success.setSuccess(true);
		}
		if((int)getSqlSession().delete("PolicyDataManage.deletePOlicyCmmnty",list) > 0){
			success.setSuccess(true);
		}
		if((int)getSqlSession().delete("PolicyDataManage.deletePOlicyApiParm",list) > 0){
			success.setSuccess(true);
		}
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}
}
