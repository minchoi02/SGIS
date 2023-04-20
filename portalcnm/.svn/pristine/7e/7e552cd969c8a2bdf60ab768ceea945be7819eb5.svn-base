package kostat.sop.ServiceAPI.api.dt.kosismanage.mapper;

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
public class KOSISManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchKosis(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("KOSISManage.getSearchKOSISCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("KOSISManage.getSearchKOSIS",paramMap));
		return resultMap;
	}
	
	public Map searchNonMappingKosis(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("KOSISManage.getSearchNonMappingKOSISCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("KOSISManage.getSearchNonMappingKOSIS",paramMap));
		return resultMap;
	}
	
	public Map searchSIDO(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("KOSISManage.getSearchSIDOCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("KOSISManage.getSearchSido",paramMap));
		return resultMap;
	}
	
	public Map searchGUGUN(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("KOSISManage.getSearchGUGUNCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("KOSISManage.getSearchGUGUN",paramMap));
		return resultMap;
	}
	
	public Map searchDONG(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("KOSISManage.getSearchDONGCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("KOSISManage.getSearchDONG",paramMap));
		return resultMap;
	}
	
	public Success updateKosis(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("KOSISManage.updateKOSIS",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public Map searchAllBaseYears(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("KOSISManage.getAllBaseYears", paramMap));
		return resultMap;
	}
	
	public Map searchSopAdmCode(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("KOSISManage.getAdmCodesCount", paramMap));
		resultMap.put("rows", getSqlSession().selectList("KOSISManage.getAdmCodes", paramMap));
		return resultMap;
	}
	
	public Success deleteKosisCode(Map insertParamMap, Map deleteParamMap) {	
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int) getSqlSession().insert("KOSISManage.insertDeleteMappingCode", insertParamMap) > 0
				&& (int) getSqlSession().delete("KOSISManage.deleteMappingCode", deleteParamMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	
	public Success updateKosisCode(Map paramMap) {	
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("KOSISManage.updateMappingCode", paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public Success insertKosisCode(Map deleteParamMap, Map insertParamMap) {	
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().delete("KOSISManage.deleteMappingCode", deleteParamMap) > 0
				&& (int) getSqlSession().insert("KOSISManage.insertMappingCode", insertParamMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public Map searchKosisError(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("KOSISManage.getSearchKOSISErrorCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("KOSISManage.getSearchKOSISError",paramMap));
		return resultMap;
	}
}
