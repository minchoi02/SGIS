package kostat.sop.ServiceAPI.api.dt.thbookmanage.mapper;

import java.io.ObjectOutputStream.PutField;
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
 * @ClassName: RELSearchDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:08:22    
 * @version V1.0      
 *     
 */
@Component
public class THBookManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchREL(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("THBookManage.getSearchRELCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("THBookManage.getSearchREL",paramMap));
		return resultMap;
	}
	public int searchCount(Map paramMap){
		return (int) getSqlSession().selectOne("THBookManage.getSearchRELCount2", paramMap);
	}
	public String searchID(Map paramMap){
		return (String) getSqlSession().selectOne("THBookManage.selectID", paramMap);
	}
	public Success checkREL(String SEARCH_WORD){
		Success success = new Success();
		if((int) getSqlSession().selectOne("RELManage.checkREL",SEARCH_WORD) > 0)
		{
			success.setMsg("이미 등록된 검색어 입니다");
		}else {
			success.setSuccess(true);
			success.setMsg("등록하실 수 있습니다.");
		}
		return success;
	}
	public Success addTHBook(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("THBookManage.addTHBook",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		
		return success;
	}
	public Success updateREL(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("THBookManage.updateTHBook",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	public Success deleteREL(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("THBookManage.deleteTHBook",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
}
