package kostat.sop.ServiceAPI.api.qa.boardmanage.mapper;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/** 2016.08.18
 *  leekh 미디어소개 추가
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
public class BoardManageDao extends SqlSessionDaoSupport {
	private static final String SYNC = "SYNC";

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public Map searchBoard(Map paramMap) {
		String BOARD_CD = ( paramMap.get("BOARD_CD") == null ? "BOARD_001" : (String)paramMap.get("BOARD_CD") );
		paramMap.put("BOARD_CD", BOARD_CD);
		
		Map resultMap = new HashMap();
		resultMap
				.put("rows",
						getSqlSession().selectList("BoardManage.searchBoard",
								paramMap));
		resultMap.put(
				"total",
				getSqlSession().selectOne("BoardManage.searchBoardCount",
						paramMap));
		return resultMap;
	}
	
	//2016.08.18 leekh 미디어 소개 검색 추가
	public Map searchMediaIntro(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap
		.put("rows",
				getSqlSession().selectList("BoardManage.searchMediaIntro",
						paramMap));
		resultMap.put(
				"total",
				getSqlSession().selectOne("BoardManage.searchMediaIntroCount",
						paramMap));
		return resultMap;
	}
	
	public Map DevsearchBoard(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap
				.put("rows",
						getSqlSession().selectList("BoardManage.DevsearchBoard",
								paramMap));
		resultMap.put(
				"total",
				getSqlSession().selectOne("BoardManage.DevsearchBoardCount",
						paramMap));
		return resultMap;
	}

	public Map getBoard( Map paramMap ) {
		Map resultMap = new HashMap();
		
		String BOARD_CD = ( paramMap.get("BOARD_CD") == null ? "BOARD_001" : (String)paramMap.get("BOARD_CD") );
		paramMap.put("BOARD_CD", BOARD_CD);
		
		Map boardMap = (Map) getSqlSession().selectOne("BoardManage.getBoard",
				paramMap);
		resultMap.put("board", boardMap);
		String FILE_YN = (String) boardMap.get("FILE_YN");
		if (FILE_YN != null && FILE_YN.toUpperCase().equals("Y"))
			resultMap.put(
					"file",
					getSqlSession().selectOne("BoardManage.getBoardFile",
							paramMap));
		return resultMap;
	}
	
	public Map getMediaIntro(String POST_NO) {
		Map resultMap = new HashMap();
		Map boardMap = (Map) getSqlSession().selectOne("BoardManage.getMediaIntro",
				POST_NO);
		resultMap.put("board", boardMap);
		String FILE_YN = (String) boardMap.get("FILE_YN");
		if (FILE_YN != null && FILE_YN.toUpperCase().equals("Y"))
			resultMap.put(
					"file",
					getSqlSession().selectOne("BoardManage.getMediaIntroFile",
							POST_NO));
		return resultMap;
	}

	public Map DevgetBoard(String POST_NO) {
		Map resultMap = new HashMap();
		Map boardMap = (Map) getSqlSession().selectOne("BoardManage.DevgetBoard",
				POST_NO);
		resultMap.put("board", boardMap);
		String FILE_YN = (String) boardMap.get("FILE_YN");
		if (FILE_YN != null && FILE_YN.toUpperCase().equals("Y"))
			resultMap.put(
					"file",
					getSqlSession().selectOne("BoardManage.DevgetBoardFile",
							POST_NO));
		return resultMap;
	}
	
	public int getPostNO(String BOARD_CD) {
		return (int) getSqlSession().selectOne("BoardManage.getPostNO", BOARD_CD);
	}
	
	public int DevgetPostNO() {
		return (int) getSqlSession().selectOne("BoardManage.DevgetPostNO");
	}

	public Success deleteBoard(Map paramMap) {
		String[] list = paramMap.get("POST_NO_List").toString().split(",");
		
		String BOARD_CD = ( paramMap.get("BOARD_CD") == null ? "BOARD_001" : (String)paramMap.get("BOARD_CD") );
		paramMap.put("BOARD_CD", BOARD_CD);
		paramMap.put("list", list);
		
		Success success = new Success(false, Prompt.DELETEFAIL);
		for (int i = 0; i < list.length; i++) {
			paramMap.put("POST_NO", list[i]);
			List<Map> tempList = getSqlSession().selectList(
					"BoardManage.getBoardFile", paramMap);
			
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
		getSqlSession().delete("BoardManage.deleteBoardFile", paramMap);
		getSqlSession().delete("BoardManage.deleteBoard", paramMap);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}
	
	public Success deleteMediaIntro (String[] list) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		for (int i = 0; i < list.length; i++) {
			List<Map> tempList = getSqlSession().selectList(
					"BoardManage.getMediaIntroFile", list[i]);
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
		getSqlSession().delete("BoardManage.deleteMediaIntroFile", list);
		getSqlSession().delete("BoardManage.deleteMediaIntro", list);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}
	
	public Success DevdeleteBoard(String[] list) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		for (int i = 0; i < list.length; i++) {
			List<Map> tempList = getSqlSession().selectList(
					"BoardManage.DevgetBoardFile", list[i]);
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
		getSqlSession().delete("BoardManage.DevdeleteBoardFile", list);
		getSqlSession().delete("BoardManage.DevdeleteBoard", list);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}

	public Success addBoard(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("BoardManage.addBoard", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	public Success DevaddBoard(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("BoardManage.DevaddBoard", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	public Success addBoardFile(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("BoardManage.addBoardFile", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	public Success DevaddBoardFile(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("BoardManage.DevaddBoardFile", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	public Success updateBoard(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().insert("BoardManage.updateBoard", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public Success DevupdateBoard(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().insert("BoardManage.DevupdateBoard", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}

	public void deleteFile(Map paramMap) {
		Map map = null;
		synchronized (SYNC) {
			try {
				map = (Map) getSqlSession().selectOne(
						"BoardManage.getBoardFile", paramMap);
				if (map != null && !map.isEmpty()) {

					File f = new File(map.get("FILE_PATH").toString(),
							map.get("FILE_ID") + "."
									+ map.get("FILE_EXTENSION"));
					if (f.exists()) {
						f.delete();
					}
				}

				getSqlSession().delete("BoardManage.deleteOneFile", paramMap);
			} catch (NullPointerException e) {
				logger.error(e);
			} catch (Exception e) {
				logger.error(e);
			}

		}
	}
	
	public void DevdeleteFile(String POST_NO) {
		Map map = null;
		synchronized (SYNC) {
			try {
				map = (Map) getSqlSession().selectOne(
						"BoardManage.DevgetBoardFile", POST_NO);
				if (map != null && !map.isEmpty()) {

					File f = new File(map.get("FILE_PATH").toString(),
							map.get("FILE_ID") + "."
									+ map.get("FILE_EXTENSION"));
					if (f.exists()) {
						f.delete();
					}
				}

				getSqlSession().delete("BoardManage.DevdeleteOneFile", POST_NO);
			} catch (NullPointerException e) {
				logger.error(e);
			} catch (Exception e) {
				logger.error(e);
			}

		}
	}
	
	/**
	 * FAQ
	 * @param paramMap
	 * @return
	 */
	public Map searchFAQ(Map paramMap) {
		String BOARD_CD = ( paramMap.get("BOARD_CD") == null ? "BOARD_002" : (String)paramMap.get("BOARD_CD") );
		paramMap.put("BOARD_CD", BOARD_CD);
		
		Map resultMap = new HashMap();
		resultMap
				.put("rows",
						getSqlSession().selectList("BoardManage.searchFAQ",
								paramMap));
		resultMap.put(
				"total",
				getSqlSession().selectOne("BoardManage.searchFAQCount",
						paramMap));
		return resultMap;
	}
	
	public int getFAQPostNO() {
		return (int) getSqlSession().selectOne("BoardManage.getFAQPostNO");
	}

	public Success deleteFAQ( Map paramMap ) {
		String BOARD_CD = ( paramMap.get("BOARD_CD") == null ? "BOARD_002" : (String)paramMap.get("BOARD_CD") );
		paramMap.put("BOARD_CD", BOARD_CD);
		
		String[] list = paramMap.get("POST_NO_List").toString().split(",");
		paramMap.put("list", list);
		
		Success success = new Success(false, Prompt.DELETEFAIL);
		getSqlSession().delete("BoardManage.deleteFAQ", paramMap);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}

	public Success addFAQ(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("BoardManage.addFAQ", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	public Success addFAQFile(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("BoardManage.addFAQFile", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	public Map getFAQ( Map paramMap ) {
		Map resultMap = new HashMap();
		
		String BOARD_CD = ( paramMap.get("BOARD_CD") == null ? "BOARD_002" : (String)paramMap.get("BOARD_CD") );
		paramMap.put("BOARD_CD", BOARD_CD);
		
		Map boardMap = (Map) getSqlSession().selectOne("BoardManage.getFAQ", paramMap);
		resultMap.put("board", boardMap);
		return resultMap;
	}
	
	public Success updateFAQ(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().insert("BoardManage.updateFAQ", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public void deleteFAQFile(Map paramMap) {
		Map map = null;
		synchronized (SYNC) {
			try {
				String BOARD_CD = ( paramMap.get("BOARD_CD") == null ? "BOARD_002" : (String)paramMap.get("BOARD_CD") );
				paramMap.put("BOARD_CD", BOARD_CD);
				
				map = (Map) getSqlSession().selectOne(
						"BoardManage.getBoardFile", paramMap);
				if (map != null && !map.isEmpty()) {

					File f = new File(map.get("FILE_PATH").toString(),
							map.get("FILE_ID") + "."
									+ map.get("FILE_EXTENSION"));
					if (f.exists()) {
						f.delete();
					}
				}

				getSqlSession().delete("BoardManage.deleteBoardFile", paramMap);
			} catch (NullPointerException e) {
				logger.error(e);
			} catch (Exception e) {
				logger.error(e);
			}

		}
	}
	// mng_s 20171123_김건민 
	public Map searchGrid(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put(
				"total",
				(int) getSqlSession().selectOne("BoardManage.searchGridCount",
						paramMap));
		resultMap.put("rows",
				getSqlSession().selectList("BoardManage.searchGrid", paramMap));
		return resultMap;
	}
	// mng_e 20171123_김건민
	public Map getGridQuestion(Map paramMap) {
	Map resultMap = new HashMap();
	Map questionMap = (Map) getSqlSession().selectOne(
			"BoardManage.getGridQuestion", paramMap);
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
				getSqlSession().selectOne("BoardManage.getGridQuestionFile",
						paramMap));
	return resultMap;
}
	// mng_e 20171123_김건민
}
