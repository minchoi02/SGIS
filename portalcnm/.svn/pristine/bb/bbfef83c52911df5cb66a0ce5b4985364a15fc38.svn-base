package kostat.sop.ServiceAPI.api.dt.themamapmanage.mapper;

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
public class ThemaMapManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchThemaMap(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("ThemaMapManage.searchThemaMap",paramMap));
		resultMap.put("total", getSqlSession().selectList("ThemaMapManage.searchThemaMapCount",paramMap));
		return resultMap;
	}
	public Map searchThemaMapMain(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("ThemaMapManage.searchThemaMapMain",paramMap));
		resultMap.put("total", getSqlSession().selectList("ThemaMapManage.searchThemaMapMainCount",paramMap));
		return resultMap;
	}
	
	public Map searchThemaMapOne(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("ThemaMapManage.searchThemaOne",paramMap));
		logger.debug("데이터 확인 ==================== \n"+resultMap);
		return resultMap;
	}
	public Map getThemaMapParam(String STAT_THEMA_MAP_ID){
		Map resultMap = new HashMap();
		resultMap.put("param", getSqlSession().selectList("ThemaMapManage.getThemaMapParam",resultMap));
		return resultMap;
	}
	public Success deleteThemaMap(String[] STAT_THEMA_MAP_ID){
		Success success = new Success(false,Prompt.DELETEFAIL);
		if(getSqlSession().delete("ThemaMapManage.deleteThemaMap",STAT_THEMA_MAP_ID)  > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	
	public Success deleteThemaMapList(String[] STAT_THEMA_MAP_ID){
		Success success = new Success(false,Prompt.DELETEFAIL);
		if(getSqlSession().delete("ThemaMapManage.deleteThemaMapList",STAT_THEMA_MAP_ID)  > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	public Success updateThemaMap(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if(getSqlSession().update("ThemaMapManage.updateThemaMap",paramMap) >0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	public Success registerThemaMap(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if(getSqlSession().update("ThemaMapManage.registerThemaMap",paramMap) >0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	public Success updateThemaMapt(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if(getSqlSession().update("ThemaMapManage.updateThemaMapT",paramMap) >0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	public Success addThemaMap(Map paramMap){
		Success success = new Success(false,Prompt.ADDFAIL);
		int insertNum=getSqlSession().insert("ThemaMapManage.addThemaMap",paramMap);
		if(insertNum >0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public int searchCount(){
		return (int) getSqlSession().selectOne("ThemaMapManage.getSearchCategoryCount");
	}
	public String searchID(){
		String test = "";
		test = getSqlSession().selectOne("ThemaMapManage.selectID").toString();
		return test;
	}
	public Success addNewThemaMap(Map paramMap){
		Success success = new Success(false,Prompt.ADDFAIL);
		int insertNum=getSqlSession().insert("ThemaMapManage.addNewThemaMap",paramMap);
		if(insertNum >0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	public boolean addNewThemaEXMPL(Map paramMap){
		boolean success = false;
		int insertNum=getSqlSession().insert("ThemaMapManage.addNewThemaEXMPL",paramMap);
		if(insertNum >0){
			success =true;
		}
		return success;
	}
	
	public Success updateNewThemaMap(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if(getSqlSession().update("ThemaMapManage.updateNewThemaMap",paramMap) >0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public void addThemaMapParam(Map paramMap){
		getSqlSession().insert("ThemaMapManage.addThemaMapParam",paramMap);
	}
	
	public Map getThemaID(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("ThemaMapManage.getThemaID",paramMap));
		resultMap.put("total", getSqlSession().selectList("ThemaMapManage.getThemaIDCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	
	public Map getThemaICON(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("ThemaMapManage.getThemaICON",paramMap));
		resultMap.put("total", getSqlSession().selectList("ThemaMapManage.getThemaICONCount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	public Success addThemaMapFileUpload(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		int insertNum=getSqlSession().insert("ThemaMapManage.addThemaMapFileUpload",paramMap);
		if(insertNum >0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	public Map getPOICODE(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("ThemaMapManage.getPOICODE",paramMap));
		resultMap.put("total", getSqlSession().selectList("ThemaMapManage.getPOICODECount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	
	// mng_s 2017. 08. 04 석진혁
	public Map getPOICorpClassCODE(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("ThemaMapManage.getPOICorpClassCODE",paramMap));
		resultMap.put("total", getSqlSession().selectList("ThemaMapManage.getPOICorpClassCODECount",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	// mng_e 2017. 08. 04 석진혁
	
	public Map getThemaList(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("ThemaMapManage.getThemaList",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
	public Map getThemaModyList(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("ThemaMapManage.getThemaModyList",paramMap));
		logger.debug("data set = "+ resultMap);
		return resultMap;
	}
}
