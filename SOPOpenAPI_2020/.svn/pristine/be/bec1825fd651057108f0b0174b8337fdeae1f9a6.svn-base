package kostat.sop.OpenAPI3.common.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.exception.DatabaseException;
import com.neighborsystem.durian.restapi.api.AbsAPI;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.api.DurianMV;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.OpenAPI3.exception.ApiException;

public abstract class AbsQuery<T> extends AbsAPI<T> {
	private static final Log logger = LogFactory.getLog( AbsQuery.class );
	
//	private SqlSessionFactory sqlSessionFactory = null;
	
	protected HttpSession httpSession = null;
	
	protected SqlSession session;
	
	public void setSqlSession(SqlSession session) {
		this.session = session;
	}
	
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory를 설정한다. 
	 */
//	public void setSqlSessionFactory(SqlSessionFactory factory) {
//		sqlSessionFactory = factory;
//	}
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory 를 얻는다.
	 * 
	 * @return sqlSessionFactory DB 세션을 위한 Factory Object
	 */
//	public SqlSessionFactory getSqlSessionFactory() {
//		return sqlSessionFactory;
//	}
	abstract protected String getQueryStr(); // 쿼리 ID 를 가져 온다.
	
	protected void sessionRollback(SqlSession sqlsession)
			throws DatabaseException {

		try {
			if (!sqlsession.getConnection().getAutoCommit()) {
				try {
					sqlsession.getConnection().rollback();
				} catch (SQLException e) {
					logger.error(e);
					throw new DatabaseException("Database Rollback Exception.");
				}
			}
		} catch (SQLException e) {
			logger.error(e);
			throw new DatabaseException(e.getMessage());
		}
	}
	
	@Override
	public void prepareExecute(HttpServletRequest req, HttpServletResponse res)
			throws AbsException {
		// TODO Auto-generated method stub
		super.prepareExecute(req, res);
		res.addHeader("Access-Control-Allow-Origin", "*");
	}
	
	public void _checkNullParameterValue(Map mRequestMap) throws ApiException {
		if (mRequestMap == null)
			return;
		Set<String> set = mRequestMap.keySet();
		Iterator<String> itr = set.iterator();

		List removeKeyList = new ArrayList();
		String key = null;
		String value = null;
		int count = 0, len = 0;
		while (itr.hasNext()) {
			key = itr.next();
			try {
				value = (String) mRequestMap.get(key);
				len = value.length();
				if (len == 0) {
					removeKeyList.add(key);
				}
			}catch (NullPointerException e) {
				logger.error(e);
				value = null;
			} catch (Exception e) {
				// parameter가 String 아니라면 예외가 발생 될 수도 있다.
				// 서비스엔 영향이 없으므로 예외만 찍고 넘어간다.
				logger.error(e);
				value = null;
			}
		}

		int idx = removeKeyList.size();
		for (int i = 0; i < idx; i++) {
			mRequestMap.remove(removeKeyList.get(i));
		}
	}
	
	
	/**
	 * 실제 API 구현 로직 담당, serlvet에서 호출시 이 함수를 호출해준다.
	 * @param req 클라이언트 요청 정보를 담은 객체
	 * @param res 서버측의 응답을 담을 객체
	 */
	public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse res) throws Exception {
		NFData datas = null;
		String strFormat = "json";
		String strTrId = null;
		Map paramsMap = null;
		String srv_id =null;
		
		try {
			
			datas = new NFData();
			
			datas.put(CommonTag.id.name(), this.getApiId());

			// API 고유번호를 할당한다.
			strTrId = createTrID(req);
			datas.put(CommonTag.trId.name(), strTrId);

			logger.info("START - TrID[" + strTrId + "] API[" + this.getApiId() + "]");
			
			paramsMap = req.getParameterMap();
			
//			session = Properties.getSqlSessionFactory().openSession();
			// API 공유의 기능을 수행한다.
			prepareExecute(req, res);
			
			// 클라이언트에게 응답할 형식을 찾아낸다.
			strFormat = _getViewType(req, res);

			// http Method를 검사한다.
			checkHttpMethod(req.getMethod());

			// http header 점검한다.
			checkHttpHeader(req, res, datas);

			// 필수 입력 파라미터를 점검한다.
			checkMustParam(paramsMap);

			// 정의되지 않은 파라미터 입력 여부를 점검한다.
			checkUndefineParameter(paramsMap);

			// 입력된 파라미터에 null이 존재하는지 검사한다.
			checkNullParameterValue(paramsMap);

			
			Map mapParameter = getParameterMap(req);
			
			// 인증 처리 부분을 검사한다.
			srv_id = checkAuth(mapParameter);
			
			datas.put(CommonTag.errCd.name(), 0);
			datas.put(CommonTag.errMsg.name(), "Success");
			T resultObj = executeAPI(req, res, strTrId);
			if (resultObj != null) {
				datas.put(CommonTag.result.name(), resultObj);
			}
			successExecute(session,srv_id, datas);
		}
		catch (AbsAPIException e) {
			successExecute(session,srv_id, datas);
			makeError(datas, e);
			logger.error("ERROR- TrID[" + strTrId + "] [" + datas.get(CommonTag.id.name()) + "] [" + e.getErrCode() + "] [" + e.getErrMessage() + "]");
			return new DurianMV(strFormat, datas);
		}
		catch (AbsHttpException e) {
			failExecute(session,srv_id, datas);
			logger.error("ERROR- TrID[" + strTrId + "] [" + datas.get(CommonTag.id.name()) + "] [" + e.getMessage() + "]");
			throw e;
		}catch (Exception e) {
			failExecute(session,srv_id, datas);
			logger.error("ERROR- TrID[" + strTrId + "] [" + datas.get(CommonTag.id.name()) + "] [" + e.getMessage() + "]");
			throw e;
		}
		finally {
//			if (session !=null){
//				session.close();
//			}
			afterExecute(req, res);
			logger.info("END - TrID[" + strTrId + "] API[" + this.getApiId() + "]");
		}
		// ----------------------------------------------------------

		return new DurianMV(strFormat, datas);
	}
	
	abstract public String checkAuth(Map mapParameter);
	
	public void successExecute(SqlSession session, String srv_id, NFData datas) throws AbsException {
		
		if(srv_id==null){
			logger.debug("srv_id is null");
			return;
		}
		HashMap<String,String> loginfomap = new HashMap<String,String>();
		loginfomap.put("srv_id", srv_id);
		loginfomap.put("succ_yn", "Y");
		loginfomap.put("api_id", datas.getString(CommonTag.id.name()));
		loginfomap.put("tr_id", datas.getString(CommonTag.trId.name()));
		insertlog(session, loginfomap);
		
	}
	
	public void failExecute(SqlSession session, String srv_id, NFData datas) throws AbsException {
		if(srv_id==null){
			logger.debug("srv_id is null");
			return;
		}
		HashMap<String,String> loginfomap = new HashMap<String,String>();
		loginfomap.put("srv_id", srv_id);
		loginfomap.put("succ_yn", "N");
		loginfomap.put("api_id", datas.getString(CommonTag.id.name()));
		loginfomap.put("tr_id", datas.getString(CommonTag.trId.name()));
		insertlog(session, loginfomap);
	}
	
	public void insertlog(SqlSession session,HashMap<String,String> loginfomap){
		
		try{
			session.insert("controller.insertapilog", loginfomap);
		}catch(Exception e){
			logger.error("ERROR- TrID[" + loginfomap.get("tr_id") + "] [" + loginfomap.get("api_id") + "] [" + e.getMessage() + "]");
//			session.close();
		}finally{
//			if (session !=null){
//				session.close();
//			}
		}
	}
}
