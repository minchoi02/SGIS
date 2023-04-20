package kostat.sop.ServiceAPI.api.cm.login.mapper;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: LoginDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月15日 下午7:11:55    
 * @version V1.0      
 *    
 */
@Component
public class LoginDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public String loginPost(String MANAGER_ID){
		return (String) getSqlSession().selectOne("Login.loginPost",MANAGER_ID);
	}
	public int loginSuccess(Map paramMap){
		return getSqlSession().update("Login.loginSuccess",paramMap);
	}
	public int loginFail(String MANAGER_ID){
		return getSqlSession().update("Login.loginFail",MANAGER_ID);
	}
	/*GPKI manager 회원등록 */
	public int gpkiInsert(Map paramMap){
		return getSqlSession().insert("Login.gpkiManagerInsert", paramMap);
	}
	/*GPKI Login */
	public List gpkiManagerInfoLogin(Map paramMap){
		return getSqlSession().selectList("Login.gpkiManagerInfo", paramMap);
	}
	/*GPKI manager grade정보 */
	public Map gpkiManagerInfo(Map paramMap){
		return (Map) getSqlSession().selectOne("Login.gpkiManagerInfoGrade", paramMap);
	}
	/*GPKI managerkey정보 */
	public List gpkiManagerKeyCheck(Map paramMap){
		return getSqlSession().selectList("Login.gpkiManagerKeyCheck", paramMap);
	}
	/*GPKI session managerList */
	public Map gpkiManagerlist(Map paramMap){
		return (Map)getSqlSession().selectList("Login.gpkiManagerKeyCheck", paramMap);
	}	
	/*GPKI 중복가입 체크 */
	public int getManagerOverlapCheck(Map paramMap){
		return (Integer)getSqlSession().selectOne("Login.getManagerOverlapCheck", paramMap);
	}
	/*GPKI key 업데이트*/
	public int gpkiManagerKeyUpdate(Map paramMap){
		return (Integer)getSqlSession().update("Login.gpkiManagerKeyUpdate", paramMap);
	}
	/*GPKI 중복로그인 */
	public int gpkiManagerDuplLogin(Map paramMap){
		return (Integer)getSqlSession().selectOne("Login.dupl_login", paramMap);
	}
	/*IP ACCESS체크*/
	public int ipAccessCheck(Map paramMap){
		return (Integer)getSqlSession().selectOne("Login.ipCheck", paramMap);
	}
	
}
