package kostat.sop.ServiceAPI.common.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.UnauthorizedException;

public abstract class AbsAuth<T> extends AbsCnm<T> {
	private static final Log logger = LogFactory.getLog(AbsAuth.class);

	@Override
	public void checkAuth(HttpServletRequest req, HttpServletResponse res)
			throws AbsException {

		logger.info("START Query - ApiID[" + this.getApiId() + "] ");
		SqlSession session = null;
		session = getSqlSessionFactory().openSession();
		try {
			/*Map<String, String> mapParameter = getParameterMap(req);

			String sessionId = (String) getSession(req, "sessionId");
			if (sessionId == null) {
				throw new UnauthorizedException("세션이 만료되었습니다. 로그인 페이지로 이동합니다");
			}

			// String member_key = (String) getSession(req, "member_key");
			// String session_key = (String) getSession(req,
			// "DUPL_LOGIN_SESSION_KEY");

			mapParameter.put("DUPL_LOGIN_SESSION_KEY", sessionId);

			if (logger.isDebugEnabled()) {
				logger.debug("DUPL_LOGIN_SESSION_KEY = " + sessionId);
				logger.debug("##### mapParameter = " + mapParameter);

			}
			int getCount = (int) session.selectOne("Login.dupl_login",
					mapParameter);

			if (getCount != 1) {
				req.getSession().removeAttribute("sessionId");
				req.getSession().removeAttribute("manager_id");
				req.getSession().removeAttribute("manager_nm");
				req.getSession().removeAttribute("manager_grade");
				req.getSession().removeAttribute("last_access_ip");
				throw new UnauthorizedException("중복로그인 되었습니다. 로그인 페이지로 이동합니다");
			}*/

		} catch (UnauthorizedException e) {
			throw e;
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApiException(
					"서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {
			if (session != null) {
				session.close();
			}
		}
		logger.info("END Query - TXID[" + getApiId() + "] ");
	}

	/*
	 * @Override public void checkAuth(HttpServletRequest req,
	 * HttpServletResponse res) throws AbsException{
	 * 
	 * logger.info("START Query - ApiID[" + this.getApiId() + "] "); SqlSession
	 * session = null; session = getSqlSessionFactory().openSession(); try {
	 * Map<String, String> mapParameter = getParameterMap(req);
	 *//**
	 * req.getSession().setAttribute("manager_id", "admin");
	 * req.getSession().setAttribute("manager_nm", "윤지혜");
	 * req.getSession().setAttribute("manager_grade", "MA");
	 * req.getSession().setAttribute("last_access_ip", "211.41.186.163");
	 */
	/*
	 * 
	 * String sessionId = (String) getSession(req, "sessionId"); if (sessionId
	 * == null) { throw new
	 * UnauthorizedException("세션이 만료되었습니다. 로그인 페이지로 이동합니다"); }
	 * 
	 * // String member_key = (String) getSession(req, "member_key"); // String
	 * session_key = (String) getSession(req, "DUPL_LOGIN_SESSION_KEY");
	 * 
	 * 
	 * 
	 * mapParameter.put("DUPL_LOGIN_SESSION_KEY", sessionId);
	 * 
	 * if(logger.isDebugEnabled()) { logger.debug("DUPL_LOGIN_SESSION_KEY = " +
	 * sessionId); logger.debug("##### mapParameter = " + mapParameter);
	 * 
	 * } int getCount = (int)
	 * session.selectOne("Login.dupl_login",mapParameter);
	 * 
	 * if (getCount != 1) { req.getSession().removeAttribute("sessionId");
	 * req.getSession().removeAttribute("manager_id");
	 * req.getSession().removeAttribute("manager_nm");
	 * req.getSession().removeAttribute("manager_grade");
	 * req.getSession().removeAttribute("last_access_ip"); throw new
	 * UnauthorizedException("중복로그인 되었습니다. 로그인 페이지로 이동합니다"); }
	 * 
	 * } catch (Exception e) { // TODO: handle exception throw new ApiException(
	 * "서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터로 문의하시기 바랍니다."); } finally { if
	 * (session != null) { session.close(); } } logger.info("END Query - TXID["
	 * + getApiId() + "] "); }
	 */
}
