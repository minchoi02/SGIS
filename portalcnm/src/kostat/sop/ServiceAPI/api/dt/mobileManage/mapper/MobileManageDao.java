package kostat.sop.ServiceAPI.api.dt.mobileManage.mapper;

import java.io.ObjectOutputStream.PutField;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

@Component
public class MobileManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchMobileManage(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("MobileManage.getSearchMobileManageCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("MobileManage.getSearchMobileManage",paramMap));
		return resultMap;
	}
	public Success addMobileManage(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("MobileManage.addMobileManage",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		
		return success;
	}
	public Success updateMobileManage(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("MobileManage.updateMobileManage",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	public Success deleteMobileManage(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("MobileManage.deleteMobileManage",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
}
