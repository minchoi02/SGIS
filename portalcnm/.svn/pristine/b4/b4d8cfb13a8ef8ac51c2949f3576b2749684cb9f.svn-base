package kostat.sop.ServiceAPI.api.qa.reqBoard.mapper;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

import org.apache.commons.lang3.StringEscapeUtils;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/** 
 * @ClassName: ReqBoardDaoDao
 * @Description：운영이력관리 관리
 * 
 * @author jrj
 * @date：2018.01.30
 * @version V1.0
 * 
 */
@Component
public class ReqBoardDao extends SqlSessionDaoSupport {
	private static final String SYNC = "SYNC";

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public List searchReqBoard(Map paramMap){
		return getSqlSession().selectList("ReqBoard.searchReqBoard", paramMap);
	}
	
	public int searchReqBoardCount(Map paramMap){
		return (Integer) getSqlSession().selectOne("ReqBoard.searchReqBoardCount", paramMap);
	}
	
	public int addReqBoard(Map paramMap) {
		return (int) getSqlSession().insert("ReqBoard.addReqBoard", paramMap);
	}

	public Map getReqBoard(String POST_NO) {
		Map resultMap = new HashMap();
		
		Map boardMap = (Map) getSqlSession().selectOne("ReqBoard.getReqBoard", POST_NO);
		
		if( boardMap != null && boardMap.get("REQ_TITLE") != null ){
			boardMap.put("REQ_TITLE", StringEscapeUtils.unescapeHtml3( boardMap.get("REQ_TITLE").toString() ) );
		}
		
		resultMap.put("board", boardMap);
		
		return resultMap;
	}
	
	public List getLineChartData(String searchYear) {
		return getSqlSession().selectList("ReqBoard.getLineChartData", searchYear);
	}
	
	public List getPieChartData(String searchYear) {
		return getSqlSession().selectList("ReqBoard.getPieChartData", searchYear);
	}
	
	public Success deleteReqBoard(String[] list) {
		Success success = new Success(false, Prompt.DELETEFAIL);
//		for (int i = 0; i < list.length; i++) {
//			//시큐어코딩(2016-12-05) 경로조작 및 자원삽입
//			String FILE_PATH = map.get("FILE_PATH").toString();
//			String FILE_EXTENSION = map.get("FILE_EXTENSION").toString();
//			String SAVE_FILE_NM = map.get("SAVE_FILE_NM").toString();
//			
//			if(FILE_PATH != null && !"".equals(FILE_PATH)) {
//				FILE_PATH = Security.cleanXss(FILE_PATH); //외부 입력값 필터링 
//			}
//			if(SAVE_FILE_NM != null && !"".equals(SAVE_FILE_NM)) {
//				SAVE_FILE_NM = Security.cleanXss(SAVE_FILE_NM); //외부 입력값 필터링 
//			}
//			if(FILE_EXTENSION != null && !"".equals(FILE_EXTENSION)) {
//				FILE_EXTENSION = Security.cleanXss(FILE_EXTENSION); //외부 입력값 필터링 
//			}
//			File f = new File(FILE_PATH, SAVE_FILE_NM + "." + FILE_EXTENSION);
//			synchronized (SYNC) {
//				try {
//					if (f.exists() && f.isFile())
//						f.delete();
//				} catch (NullPointerException e) {
//					logger.error(e);
//				} catch (Exception e) {
//					logger.error(e);
//				}
//			}
//
//		}
		
		getSqlSession().delete("ReqBoard.deleteReqBoard", list);
		success.setSuccess(true);
		success.setMsg(Prompt.DELETESUCCESS);
		return success;
	}

	public Success updateReqBoard(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		
		//int len = (Integer) getSqlSession().selectOne("ReqBoard.lengthCheck", paramMap.get("REQ_SEQ"));
		
		if ((int) getSqlSession().update("ReqBoard.updateReqBoard", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public Success updateFile(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		if ((int) getSqlSession().insert("ReqBoard.updateFile", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
	
	public void deleteFile(String POST_NO) {
		Map map = null;
		synchronized (SYNC) {
			try {
				map = (Map) getSqlSession().selectOne("ReqBoard.getReqBoardFile", POST_NO);
				if (map != null && !map.isEmpty()) {
					File f = new File(map.get("FILE_PATH").toString(),
							map.get("FILE_ID") + "."
									+ map.get("FILE_EXTENSION"));
					if (f.exists()) {
						f.delete();
					}
				}

				getSqlSession().delete("ReqBoard.deleteOneFile", POST_NO);
			} catch (NullPointerException e) {
				logger.error(e);
			} catch (Exception e) {
				logger.error(e);
			}
		}
	}
	
}
