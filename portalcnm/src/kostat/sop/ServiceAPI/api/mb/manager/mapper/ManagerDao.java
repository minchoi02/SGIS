package kostat.sop.ServiceAPI.api.mb.manager.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**
 * 
 * @ClassName: ManageDao
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年10月28日 下午3:26:02
 * @version V1.0
 * 
 */
@Component
public class ManagerDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public Map searchManager(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("total", (int) getSqlSession().selectOne("Manager.searchManagerCount", paramMap));
		List<Map> list = (List) getSqlSession().selectList("Manager.searchManager", paramMap);
		try {
			for (Map map : list) {
				String TEL_NO = (String) map.get("TEL_NO");
				String EXT_NO = (String) map.get("EXT_NO");
				if (TEL_NO != null) {
					map.remove("TEL_NO");
					map.put("TEL_NO", SecureDB.decryptAria256(TEL_NO));
				}
				if (EXT_NO != null) {
					map.remove("EXT_NO");
					map.put("EXT_NO", SecureDB.decryptAria256(EXT_NO));
				}
			}
		} catch (NullPointerException e) {
			throw new ApiException("파라미터 값이 없습니다.");
		} catch (Exception e) {
			throw new ApiException("복호화에 문제가 있습니다.");
		}
		resultMap.put("rows", list);
		return resultMap;
	}

	public Map getManagerInfo(String MANAGER_ID) {
		Map resultMap = new HashMap();
		Map managerInfoMap = (Map) getSqlSession().selectOne("Manager.getManagerInfo", MANAGER_ID);
		try {
			String TEL_NO = (String) managerInfoMap.get("TEL_NO");
			String CP_NO = (String) managerInfoMap.get("CP_NO");
			String EMAIL = (String) managerInfoMap.get("EMAIL");
			String EXT_NO = (String) managerInfoMap.get("EXT_NO");
			if (TEL_NO != null) {
				managerInfoMap.remove("TEL_NO");
				managerInfoMap.put("TEL_NO", SecureDB.decryptAria256(TEL_NO));
			}
			if (CP_NO != null) {
				managerInfoMap.remove("CP_NO");
				managerInfoMap.put("CP_NO", SecureDB.decryptAria256(CP_NO));
			}
			if (EMAIL != null) {
				managerInfoMap.remove("EMAIL");
				managerInfoMap.put("EMAIL", SecureDB.decryptAria256(EMAIL));
			}
			if (EXT_NO != null) {
				managerInfoMap.remove("EXT_NO");
				managerInfoMap.put("EXT_NO", SecureDB.decryptAria256(EXT_NO));
			}
		} catch (NullPointerException e) {
			throw new ApiException("파라미터 값이 없습니다.");
		} catch (Exception e) {
			throw new ApiException("암호화 해제 없습니다.");
		}
		resultMap.put("info", managerInfoMap);
		resultMap.put("accesshits", (List) getSqlSession().selectList("Manager.getManagerAccessHist", MANAGER_ID));
		return resultMap;
	}

	public Success deleteManager(String MANAGER_ID_List) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		String[] MANAGER_ID = MANAGER_ID_List.split(",");
		if ((int) getSqlSession().delete("Manager.deleteManager", MANAGER_ID) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}

	public Success updateManagerInfo(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().update("Manager.updateManagerInfo", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
}
