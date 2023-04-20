package kostat.sop.ServiceAPI.api.dt.opendatamapmanager.mapper;

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
public class OpenDataManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map getopenDataMapList(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("OpenDataManage.getopenDataMapList",paramMap));
		resultMap.put("total", getSqlSession().selectList("OpenDataManage.getopenMapListCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	public Success updateOpenData(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("OpenDataManage.updateOpenData",paramMap) > 0){
			success.setSuccess(true);
		}
		success.setMsg(Prompt.UPDATESUCCESS);
		return success;
	}
	public Success deleteOpenData(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("OpenDataManage.deletePubData",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
}
