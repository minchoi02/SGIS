package kostat.sop.ServiceAPI.api.qa.devfaqmanage.mapper;

import java.io.File;
import java.util.ArrayList;
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
 * @ClassName: QAManageDao
 * @Description：
 *
 * @author xuliguo
 * @date：2014年10月24日 下午3:15:29
 * @version V1.0
 * 
 */
@Component
public class DevfaqManageDao extends SqlSessionDaoSupport {
	private static final String SYNC = "SYNC";

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	/**
	 * FAQ
	 * @param paramMap
	 * @return
	 */
	public Map searchFAQ(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap
				.put("rows",
						getSqlSession().selectList("DevfaqManage.searchFAQ",
								paramMap));
		resultMap.put(
				"total",
				getSqlSession().selectOne("DevfaqManage.searchFAQCount",
						paramMap));
		return resultMap;
	}
	
	public Map searchBanner(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap
				.put("rows",
						getSqlSession().selectList("DevfaqManage.searchBanner",
								paramMap));
		resultMap.put(
				"total",
				getSqlSession().selectOne("DevfaqManage.searchBannerCount",
						paramMap));
		return resultMap;
	}
	
	public int getFAQPostNO() {
		return (int) getSqlSession().selectOne("DevfaqManage.getFAQPostNO");
	}
	public int getbannerPostNO() {
		return (int) getSqlSession().selectOne("DevfaqManage.getbannerPostNO");
	}
	public Success deleteFAQ(String[] list) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		getSqlSession().delete("DevfaqManage.deleteFAQ", list);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}
	public Success deleteBanner(String[] list) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		getSqlSession().delete("DevfaqManage.deleteBanner", list);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}
	public Success addFAQ(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("DevfaqManage.addFAQ", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	public Success addBanner(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("DevfaqManage.addBanner", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	public Success addBannerFile(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("DevfaqManage.addBannerFile", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	public Success addFAQFile(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("DevfaqManage.addFAQFile", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	public Map getFAQ(String POST_NO) {
		Map resultMap = new HashMap();
		Map boardMap = (Map) getSqlSession().selectOne("DevfaqManage.getFAQ",
				POST_NO);
		resultMap.put("board", boardMap);
		return resultMap;
	}
	public Map getBanner(String POST_NO) {
		Map resultMap = new HashMap();
		Map boardMap = (Map) getSqlSession().selectOne("DevfaqManage.getBanner",
				POST_NO);
		resultMap.put("board", boardMap);
		return resultMap;
	}
	public Success updateFAQ(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().insert("DevfaqManage.updateFAQ", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public Success updateBanner(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().insert("DevfaqManage.updateBanner", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public void deleteFAQFile(String POST_NO) {
		Map map = null;
		synchronized (SYNC) {
			try {
				map = (Map) getSqlSession().selectOne(
						"DevfaqManage.getBoardFile", POST_NO);
				if (map != null && !map.isEmpty()) {

					File f = new File(map.get("FILE_PATH").toString(),
							map.get("FILE_ID") + "."
									+ map.get("FILE_EXTENSION"));
					if (f.exists()) {
						f.delete();
					}
				}

				getSqlSession().delete("DevfaqManage.deleteOneFile", POST_NO);
			} catch (NullPointerException e) {
				logger.error(e);
			} catch (Exception e) {
				logger.error(e);
			}

		}
	}
}
