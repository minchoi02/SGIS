package kostat.sop.ServiceAPI.api.dt.thmetamanage.mapper;

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
 * @ClassName: ThMetaManage
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:08:22    
 * @version V1.0      
 *     
 */
@Component
public class ThMetaManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchMetaData(Map paramMap) {	logger.debug("!wwwwwwwwwwwwwwwwwwwwwwwwwww!!!!!!!!!!!!!");	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("ThMetaManage.searchMetaDataCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("ThMetaManage.searchMetaData",paramMap));
		return resultMap;
	}
	public Success updateMetaData(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("ThMetaManage.updateMetaData",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}	
	public Success addMetaData(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("ThMetaManage.addMetaData",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public Success deleteMetaData(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("ThMetaManage.deleteMetaData",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public int getId(Map paramMap){
		int SEQ = 1;
		Object object = getSqlSession().selectOne("ThMetaManage.getId",paramMap);
		if(object != null) SEQ = (int)object;
		return SEQ;
	}
}
