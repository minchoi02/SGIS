package kostat.sop.ServiceAPI.api.qa.qamanage.mapper;

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
public class QAManageDao extends SqlSessionDaoSupport {
	private static final String SYNC = "SYNC";

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public List getType(String BOARD_CD) {
		return getSqlSession().selectList("QAManage.getType", BOARD_CD);
	}

	public Map searchQA(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put(
				"total",
				(int) getSqlSession().selectOne("QAManage.searchQACount",
						paramMap));
		resultMap.put("rows",
				getSqlSession().selectList("QAManage.searchQA", paramMap));
		return resultMap;
	}
	// mng_s 20171109_김건민 
	public Map searchAPI(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put(
				"total",
				(int) getSqlSession().selectOne("QAManage.searchAPICount",
						paramMap));
		resultMap.put("rows",
				getSqlSession().selectList("QAManage.searchAPI", paramMap));
		return resultMap;
	}
	// mng_e 20171109_김건민 
	public Success deleteQA(Map paramMap) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		String[] BOARD_CD_List = paramMap.get("BOARD_CD_List").toString()
				.split(",");
		String[] PARENT_POST_ID_List = paramMap.get("PARENT_POST_ID_List")
				.toString().split(",");
		String[] POST_DEPTH_List = paramMap.get("POST_DEPTH_List").toString()
				.split(",");
		String[] POST_ORDER_List = paramMap.get("POST_ORDER_List").toString()
				.split(",");
		List list = new ArrayList();
		for (int i = 0; i < BOARD_CD_List.length; i++) {
			Map map = new HashMap();
			map.put("BOARD_CD", BOARD_CD_List[i]);
			map.put("PARENT_POST_ID", PARENT_POST_ID_List[i]);
			map.put("POST_DEPTH", POST_DEPTH_List[i]);
			map.put("POST_ORDER", POST_ORDER_List[i]);
			list.add(map);
		}
		List<Map> post_NO_List = getSqlSession().selectList(
				"QAManage.getPost_NO", list);
		if (post_NO_List.size() > 0) {
			for (Map map : post_NO_List) {
				String FILE_YN = (String) map.get("FILE_YN");
				if (FILE_YN != null && FILE_YN.toUpperCase().equals("Y")) {
					Map fileMap = null;
					try {
						fileMap = (Map) getSqlSession().selectOne(
								"QAManage.getQuestionFile", map);
						if (map != null && !map.isEmpty()) {
							File deleteFile = new File(map.get("FILE_PATH")
									.toString(), map.get("FILE_ID") + "."
									+ map.get("FILE_EXTENSION"));
							synchronized (deleteFile) {
								if (deleteFile.exists())
									deleteFile.delete();
							}
						}
					} catch (NullPointerException e) {
						logger.error(e);
					} catch (Exception e) {
						logger.error(e);
					}

				}
			}
			getSqlSession().delete("QAManage.deleteFiles", post_NO_List);
			getSqlSession().delete("QAManage.deleteQA", post_NO_List);
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}

	public Success updateQA(Map paramMap) {
		Success success = new Success();
		getSqlSession().delete("QAManage.updateQA");
		return success;
	}

	public Map getQuestion(Map paramMap) {
		Map resultMap = new HashMap();
		Map questionMap = (Map) getSqlSession().selectOne(
				"QAManage.getQuestion", paramMap);
		try {
			if ( questionMap.get("CP_NO") != null) {
				String CP_NO = (String) questionMap.get("CP_NO");
				questionMap.remove("CP_NO");
				questionMap.put("CP_NO", SecureDB.decryptAria256(CP_NO));
			}
			if ( questionMap.get("EMAIL") != null) {
				String EMAIL = (String) questionMap.get("EMAIL");
				questionMap.remove("EMAIL");
				questionMap.put("EMAIL", SecureDB.decryptAria256(EMAIL));
			}
		} catch (NullPointerException e) {
			e.printStackTrace();
			throw new ApiException("파라미터 값이 없습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			throw new ApiException("입력값을 체크 해 주세요");
		}
		resultMap.put("info", questionMap);
		String FILE_YN = (String) questionMap.get("FILE_YN");
		if (FILE_YN != null && FILE_YN.toUpperCase().equals("Y"))
			resultMap.put(
					"file",
					getSqlSession().selectOne("QAManage.getQuestionFile",
							paramMap));
		return resultMap;
	}
	// mng_s 20171113_김건민 
	public Map getAPIQuestion(Map paramMap) {
		Map resultMap = new HashMap();
		Map questionMap = (Map) getSqlSession().selectOne(
				"QAManage.getAPIQuestion", paramMap);
		try {
			String CP_NO = (String) questionMap.get("CP_NO");
			String EMAIL = (String) questionMap.get("EMAIL");
			if (CP_NO != null) {
				questionMap.remove("CP_NO");
				questionMap.put("CP_NO", SecureDB.decryptAria256(CP_NO));
			}
			if (EMAIL != null) {
				questionMap.remove("EMAIL");
				questionMap.put("EMAIL", SecureDB.decryptAria256(EMAIL));
			}
		} catch (NullPointerException e) {
			throw new ApiException("파라미터 값이 없습니다.");
		} catch (Exception e) {
			throw new ApiException("입력값을 체크 해 주세요");
		}
		resultMap.put("info", questionMap);
		String FILE_YN = (String) questionMap.get("FILE_YN");
		if (FILE_YN != null && FILE_YN.toUpperCase().equals("Y"))
			resultMap.put(
					"file",
					getSqlSession().selectOne("QAManage.getAPIQuestionFile",
							paramMap));
		return resultMap;
	}
	// mng_e 20171113_김건민 

	public Map getAnswer(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put(
				"question",
				(Map) getSqlSession().selectOne("QAManage.getQuestionOfAnswer",
						paramMap));
		resultMap
				.put("answer",
						(Map) getSqlSession().selectOne("QAManage.getAnswer",
								paramMap));
		return resultMap;
	}

	public Success replyQuestion(Map paramMap) {
		Success success = new Success(false, Prompt.REPLYFAIL);
		int POST_ORDER = (int) getSqlSession().selectOne(
				"QAManage.getAnswerOrder", paramMap);
		paramMap.remove("POST_ORDER");
		paramMap.put("POST_ORDER", POST_ORDER);
		if ((int) getSqlSession().insert("QAManage.replyQuestion", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.REPLYSUCCESS);
		}
		return success;
	}

	public Success updateAnswer(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().update("QAManage.updateAnswer", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
}
