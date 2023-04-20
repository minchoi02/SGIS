package kostat.sop.ServiceAPI.api.dt.pubdatamanage.mapper;

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
public class PubDataManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchPubData(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("PubDataManage.searchPubDataCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("PubDataManage.searchPubData",paramMap));
		return resultMap;
	}
	public Success updatePubData(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("PubDataManage.updatePubData",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}	
	public Success addPubData(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("PubDataManage.addPubData",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public Success deletePubData(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("PubDataManage.deletePubData",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public Success deletePubChData(Map paramMap) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("PubDataManage.deletePubChData",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public int getId(Map paramMap){
		int SEQ = 1;
		Object object = getSqlSession().selectOne("PubDataManage.getId",paramMap);
		if(object != null) SEQ = (int)object;
		return SEQ;
	}
	public Success regPubDataId(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("PubDataManage.regPubDataId",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public void regExcelData(Map paramMap) {
		if((int) getSqlSession().insert("PubDataManage.regExcelData",paramMap) > 0){
		}
	}
	public void regExcelChange(Map paramMap) {
		if((int) getSqlSession().insert("PubDataManage.regExcelChange",paramMap) > 0){
		}
	}
	public Success deleteRegPubData(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("PubDataManage.deleteRegDataPubData",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public Map getThemaID(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("PubDataManage.getThemaID",paramMap));
		resultMap.put("total", getSqlSession().selectList("PubDataManage.getThemaIDCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	public Map getRegThemaID(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("PubDataManage.getRegThemaID",paramMap));
		resultMap.put("total", getSqlSession().selectList("PubDataManage.getRegThemaIDCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	public Map getRegThemaChID(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("PubDataManage.getRegThemaChID",paramMap));
		resultMap.put("total", getSqlSession().selectList("PubDataManage.getRegThemaChIDCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	public Map getpolicyMapList(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("PubDataManage.getpolicyMapList",paramMap));
		resultMap.put("total", getSqlSession().selectList("PubDataManage.getpolicyMapListCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
}
