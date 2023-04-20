package kostat.sop.ServiceAPI.api.qa.communitymanage.mapper;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**
 * 
 * @ClassName: BoardManageDao
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年11月3日 下午4:19:16
 * @version V1.0
 * 
 */
@Component
public class CommunityNoticeManageDao extends SqlSessionDaoSupport {
	private static final String SYNC = "SYNC";

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public Map searchBoard(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap
				.put("rows",
						getSqlSession().selectList("CommunityNoticeManage.searchBoard",
								paramMap));
		resultMap.put(
				"total",
				getSqlSession().selectOne("CommunityNoticeManage.searchBoardCount",
						paramMap));
		return resultMap;
	}

	public Map getBoard(String POST_NO) {
		Map resultMap = new HashMap();
		Map boardMap = (Map) getSqlSession().selectOne("CommunityNoticeManage.getBoard",
				POST_NO);
		resultMap.put("board", boardMap);
		String FILE_YN = (String) boardMap.get("FILE_YN");
		if (FILE_YN != null && FILE_YN.toUpperCase().equals("Y"))
			resultMap.put(
					"file",
					getSqlSession().selectOne("CommunityNoticeManage.getBoardFile",
							POST_NO));
		return resultMap;
	}

	public int getPostNO() {
		return (int) getSqlSession().selectOne("CommunityNoticeManage.getPostNO");
	}

	public Success deleteBoard(String[] list) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		for (int i = 0; i < list.length; i++) {
			List<Map> tempList = getSqlSession().selectList(
					"CommunityNoticeManage.getBoardFile", list[i]);
			for (Map map : tempList) {
				//시큐어코딩(2016-12-05) 경로조작 및 자원삽입
				String FILE_PATH = map.get("FILE_PATH").toString();
				String FILE_ID = map.get("FILE_ID").toString();
				String FILE_EXTENSION = map.get("FILE_EXTENSION").toString();
				
				if(FILE_PATH != null && !"".equals(FILE_PATH)) {
					FILE_PATH = Security.cleanXss(FILE_PATH); //외부 입력값 필터링 
				}
				if(FILE_ID != null && !"".equals(FILE_ID)) {
					FILE_ID = Security.cleanXss(FILE_ID); //외부 입력값 필터링 
				}
				if(FILE_EXTENSION != null && !"".equals(FILE_EXTENSION)) {
					FILE_EXTENSION = Security.cleanXss(FILE_EXTENSION); //외부 입력값 필터링 
				}
				File f = new File(FILE_PATH, FILE_ID+ "." + FILE_EXTENSION);
				synchronized (SYNC) {
					try {
						if (f.exists() && f.isFile())
							f.delete();
					} catch (NullPointerException e) {
						logger.error(e);
					} catch (Exception e) {
						logger.error(e);
					}
				}

			}
		}
		getSqlSession().delete("CommunityNoticeManage.deleteBoardFile", list);
		getSqlSession().delete("CommunityNoticeManage.deleteBoard", list);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}

	public Success addBoard(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("CommunityNoticeManage.addBoard", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	public Success addBoardFile(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("CommunityNoticeManage.addBoardFile", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	public Success updateBoard(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().insert("CommunityNoticeManage.updateBoard", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}

	public void deleteFile(String POST_NO) {
		Map map = null;
		synchronized (SYNC) {
			try {
				map = (Map) getSqlSession().selectOne(
						"CommunityNoticeManage.getBoardFile", POST_NO);
				if (map != null && !map.isEmpty()) {
					//시큐어코딩(2016-12-05) 경로조작 및 자원삽입
					String FILE_PATH = map.get("FILE_PATH").toString();
					String FILE_ID = map.get("FILE_ID").toString();
					String FILE_EXTENSION = map.get("FILE_EXTENSION").toString();
					
					if(FILE_PATH != null && !"".equals(FILE_PATH)) {
						FILE_PATH = Security.cleanXss(FILE_PATH); //외부 입력값 필터링 
					}
					if(FILE_ID != null && !"".equals(FILE_ID)) {
						FILE_ID = Security.cleanXss(FILE_ID); //외부 입력값 필터링 
					}
					if(FILE_EXTENSION != null && !"".equals(FILE_EXTENSION)) {
						FILE_EXTENSION = Security.cleanXss(FILE_EXTENSION); //외부 입력값 필터링 
					}
					File f = new File(FILE_PATH, FILE_ID+ "." + FILE_EXTENSION);
					if (f.exists()) {
						f.delete();
					}
				}

				getSqlSession().delete("CommunityNoticeManage.deleteOneFile", POST_NO);
			} catch (NullPointerException e) {
				logger.error(e);
			} catch (Exception e) {
				logger.error(e);
			}

		}
	}
}
