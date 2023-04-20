package kostat.sop.ServiceAPI.api.dt.accessmanage.mapper;

import java.io.IOException;
import java.sql.SQLException;
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

import com.ksign.securedb.api.util.SDBException;

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
public class AccessManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map searchAccess(Map paramMap) throws NullPointerException, SQLException, IOException, SDBException {
		//Map resultMap = new HashMap();
		//resultMap.put("total", getSqlSession().selectList("AccessManage.searchAccessCount",paramMap));
		//resultMap.put("rows", getSqlSession().selectList("AccessManage.searchAccess",paramMap));
		//return resultMap;
		
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("AccessManage.searchAccessCount",paramMap));
		List<Map> list = (List) getSqlSession().selectList("AccessManage.searchAccess",paramMap);
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
		} catch (IOException e) {
			throw new ApiException("네트워크에 문제가 있습니다.");
		} catch (SDBException e) {
			throw new ApiException("복호화에 문제가 있습니다.");
		}
		resultMap.put("rows", list);
		return resultMap;
	}
	public Success updateAccess(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("AccessManage.updateAccess",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}	
	public Map SearchManagerInfo(Map paramMap) {	
		//Map resultMap = new HashMap();
		//resultMap.put("total", getSqlSession().selectList("AccessManage.searchManagerInfoCount",paramMap));
		//resultMap.put("rows", getSqlSession().selectList("AccessManage.searchManagerInfo",paramMap));
		//return resultMap;
		
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("AccessManage.searchManagerInfoCount",paramMap));
		List<Map> list = (List) getSqlSession().selectList("AccessManage.searchManagerInfo",paramMap);
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
	public Success addAccess(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("AccessManage.addAccess",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public Success deleteAccess(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("AccessManage.deleteAccess",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
}
