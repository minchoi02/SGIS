package kostat.sop.ServiceAPI.api.cm.mapper;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

import com.ksign.securedb.api.util.SDBException;

/**
 * 
 * @ClassName: MyPage
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年10月15日 下午7:27:30
 * @version V1.0
 * 
 */
@Component
public class MyPageDao extends SqlSessionDaoSupport {
	private static final Logger logger = Logger.getLogger(MyPageDao.class);

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public Map loadInfo(String MANAGER_ID) throws SQLException, ApiException, SDBException, IOException {
		Map managerInfoMap = (Map) getSqlSession().selectOne("MyPage.loadInfo", MANAGER_ID);
		try {
			String TEL_NO = (String) managerInfoMap.get("TEL_NO");
			String EXT_NO = (String) managerInfoMap.get("EXT_NO");
			String CP_NO = (String) managerInfoMap.get("CP_NO");
			String EMAIL = (String) managerInfoMap.get("EMAIL");
			if (TEL_NO != null) {
				managerInfoMap.remove("TEL_NO");
				managerInfoMap.put("TEL_NO", SecureDB.decryptAria256(TEL_NO));
			}
			if (EXT_NO != null) {
				managerInfoMap.remove("EXT_NO");
				managerInfoMap.put("EXT_NO", SecureDB.decryptAria256(EXT_NO));
			}
			if (CP_NO != null) {
				managerInfoMap.remove("CP_NO");
				managerInfoMap.put("CP_NO", SecureDB.decryptAria256(CP_NO));
			}
			if (EMAIL != null) {
				managerInfoMap.remove("EMAIL");
				managerInfoMap.put("EMAIL", SecureDB.decryptAria256(EMAIL));
			}
		} catch (ApiException e) {
			logger.error(e);
			throw e;
		} catch (SDBException e) {
			logger.error(e);
			throw e;
		} catch (IOException e) {
			logger.error(e);
			throw e;
		}
		
		return managerInfoMap;
	}

	public Success updateInfo(Map paramMap) throws SQLException, ApiException, SDBException, IOException {
		try {
			String TEL_NO = (String) paramMap.get("TEL_NO");
			String EXT_NO = (String) paramMap.get("EXT_NO");
			String CP_NO = (String) paramMap.get("CP_NO");
			String EMAIL = (String) paramMap.get("EMAIL");
			if (TEL_NO != null) {
				paramMap.remove("TEL_NO");
				paramMap.put("TEL_NO", SecureDB.encryptAria256(TEL_NO));
			}
			if (EXT_NO != null) {
				paramMap.remove("EXT_NO");
				paramMap.put("EXT_NO", SecureDB.encryptAria256(EXT_NO));
			}
			if (CP_NO != null) {
				paramMap.remove("CP_NO");
				paramMap.put("CP_NO", SecureDB.encryptAria256(CP_NO));
			}
			if (EMAIL != null) {
				paramMap.remove("EMAIL");
				paramMap.put("EMAIL", SecureDB.encryptAria256(EMAIL));
			}
		} catch (ApiException e) {
			logger.error(e);
			throw e;
		} catch (SDBException e) {
			logger.error(e);
			throw e;
		} catch (IOException e) {
			logger.error(e);
			throw e;
		}
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().update("MyPage.updateInfo", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}

	public Map getGrade(String MANAGER_ID) {
		return (Map) getSqlSession().selectOne("MyPage.getGrade", MANAGER_ID);
	}

	public Success Logout(String MANAGER_ID) {
		Success success = new Success(false, Prompt.LOGOUTFAIL);
		if (MANAGER_ID != null && (int) getSqlSession().update("MyPage.logout", MANAGER_ID) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.LOGOUTSUCCESS);
		}
		return success;
	}
}
