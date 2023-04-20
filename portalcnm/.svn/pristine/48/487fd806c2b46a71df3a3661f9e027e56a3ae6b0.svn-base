package kostat.sop.ServiceAPI.api.dt.jitmanage.mapper;

import java.util.ArrayList;
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
 * @ClassName: JITManageDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午9:03:42    
 * @version V1.0      
 *    
 */
@Component
public class JITManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map getJITType(Map paramMap) {
		Map resultMap = new HashMap();
		if(paramMap.get("API_B_CLASS_CD")==null){
			resultMap.put("TYPE", "SRV_ATTR");
			resultMap.put("LIST", getSqlSession().selectList("JTIManage.getAPI_B_CLASS",paramMap));
		}else {
			resultMap.put("TYPE", "API_B_CLASS");
			resultMap.put("LIST", getSqlSession().selectList("JTIManage.getAPI_URL",paramMap));
		}
		return resultMap;
	}
	public Map searcJIT(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("total", (int)getSqlSession().selectOne("JTIManage.searchJITCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("JTIManage.searchJIT",paramMap));
		return resultMap;
	}
	public Success updateActiveState(Map paramMap) {
		getSqlSession().update("JTIManage.updateActiveState",paramMap);
		return new Success(true,Prompt.UPDATESUCCESS);
	}
	public Success deleteJIT(Map paramMap) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		List list = new ArrayList();
		String[] API_B_CLASS_CD_List = paramMap.get("API_B_CLASS_CD_List").toString().split(",");
		String[] API_M_CLASS_CD_List = paramMap.get("API_M_CLASS_CD_List").toString().split(",");
		String[] SEQ_List =  paramMap.get("SEQ_List").toString().split(",");
		for(int i=0;i<SEQ_List.length;i++){
			Map map = new HashMap();
			map.put("API_B_CLASS_CD", API_B_CLASS_CD_List[i]);
			map.put("API_M_CLASS_CD", API_M_CLASS_CD_List[i]);
			map.put("SEQ", SEQ_List[i]);
			list.add(map);
		}
		if((int) getSqlSession().delete("JTIManage.deleteJIT",list) > 0){
			getSqlSession().delete("JTIManage.deleteAPIPARAM",list) ;
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public int getSEQ(Map paramMap){
		int SEQ = 1;
		Object object = getSqlSession().selectOne("JTIManage.getSEQ",paramMap);
		if(object != null) SEQ = (int)object;
		return SEQ;
	}
	public Success addDATAJIT(Map paramMap){
		Success success = new Success(false,Prompt.ADDFAIL);
//		int SEQ = 1;
//		Object object = getSqlSession().selectOne("JTIManage.getSEQ",paramMap);
//		if(object != null) SEQ = (int)object +1;
//		paramMap.put("SEQ",SEQ);
//		List list = (List) paramMap.get("LIST");
//		for(int i=0;i<list.size();i++){
//			Map map =(Map) list.get(i);
//			map.put("SEQ", SEQ);
//		}
		if((int)getSqlSession().insert("JTIManage.addDATAJITInfo",paramMap) > 0){
			List<Map> list = (List)paramMap.get("LIST");
			if(list != null &&list.size() > 0){
				for (Map map : list) {
					getSqlSession().insert("JTIManage.addDATAJITParam",map);
				}
			}
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public void addDATAJITParam(Map paramMap){
		getSqlSession().insert("JTIManage.addDATAJITParam",paramMap);
	}
	public Success addMAPJIT(Map paramMap){
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int)getSqlSession().insert("JTIManage.addMAPJITInfo",paramMap)>0){
			if((int)getSqlSession().insert("JTIManage.addMAPJITParam",paramMap)>0){
				success.setSuccess(true);
				success.setMsg(Prompt.ADDSUCCESS);
			}
		}
		return success;
	}
	public Map loadJITInfo(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("JIT", getSqlSession().selectOne("JTIManage.loadJIT",paramMap));
		resultMap.put("JITParam",(List)getSqlSession().selectList("JTIManage.loadJITParam",paramMap));
		return resultMap;
	}
	public Success updateMAPJIT(Map paramMap) {
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("JTIManage.updateMAPJIT",paramMap) > 0){
			if((int) getSqlSession().update("JTIManage.updateMAPJITParam",paramMap) > 0){
				success.setSuccess(true);
				success.setMsg(Prompt.UPDATESUCCESS);
			}
		}
		return success;
	}
	public Success updateDATAJIT(Map paramMap) {
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int)getSqlSession().update("JTIManage.updateDATAJIT",paramMap) > 0){
			getSqlSession().delete("JTIManage.deleteJITParam",paramMap);
			List<Map> list = (List)paramMap.get("LIST");
			if(list != null &&list.size() > 0){
				for (Map map : list) {
					getSqlSession().insert("JTIManage.addDATAJITParam",map);
				}
			}
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
}
