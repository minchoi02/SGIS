package kostat.sop.ServiceAPI.common.controller;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.util.StringUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.neighborsystem.durian.restapi.model.NFData;

public abstract class AbsCnm<T> extends AbsQuery<T> {
	private static final Log logger = LogFactory.getLog(AbsCnm.class);

	private SqlSessionFactory sqlSessionFactory = null;

	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory 를 얻는다.
	 * 
	 * @return sqlSessionFactory DB 세션을 위한 Factory Object
	 */
	public void setSqlSessionFactory(SqlSessionFactory factory) {
		sqlSessionFactory = factory;
	}

	public SqlSessionFactory getSqlSessionFactory() {
		return sqlSessionFactory;
	}

	public abstract String getWorkNm();

	@Override
	public void successExecute(HttpServletRequest req, HttpServletResponse res, NFData data) {
		logger.info("START Query - ApiID[" + this.getApiId() + "] ");
		SqlSession session = null;
		session = sqlSessionFactory.openSession();
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("================================================================");
				logger.debug("manager_id      = " + req.getSession().getAttribute("manager_id"));
				logger.debug("manager_nm      = " + req.getSession().getAttribute("manager_nm"));
				logger.debug("manager_grade   = " + req.getSession().getAttribute("manager_grade"));
				logger.debug("last_access_ip  = " + req.getSession().getAttribute("last_access_ip"));
				logger.debug("================================================================");
			}

			Map<String, String> mapParameter = getParameterMap(req);
			String url = req.getRequestURI();
			String work_nm = this.getWorkNm();
			String parmString = "";
			Enumeration Parmeters = req.getParameterNames();
			while (Parmeters.hasMoreElements()) {
				String paramKey = (String) Parmeters.nextElement();
				String[] paramValue = req.getParameterValues(paramKey);
				for (int i = 0; i < paramValue.length; i++) {
					if (i == paramValue.length - 1) {
						parmString += paramKey + "=" + paramValue[i];
					} else {
						parmString += paramKey + "=" + paramValue[i] + "&";
					}
				}
			}
			mapParameter.put("manager_id", getSession(req, "manager_id"));
			mapParameter.put("manager_nm", getSession(req, "manager_nm"));
			mapParameter.put("connect_ip", getSession(req, "last_access_ip"));
			mapParameter.put("work_nm", work_nm);
			mapParameter.put("work_serial", StringUtil.getRandomString(5));
			String work_content = url + "?" + parmString;
			
			// 2016. 03. 25 j.h.Seok
			work_content = cutStr(work_content,899);
			mapParameter.put("work_content",work_content);

			int resultCode = new Integer(0);
			resultCode = session.insert("USESRVStat.mng_dt_workhistory", mapParameter);

			if (logger.isDebugEnabled()) {
				logger.debug("[ resultCode = " + resultCode + " ]");
			}
		} finally {
			if (session != null) {
				session.close();
			}
		}
		logger.info("END Query - TXID[" + getApiId() + "] ");

	}
	
    public static String cutStr(String str,int cutByte)
    {
    	byte [] strByte = str.getBytes();
    	if( strByte.length < cutByte ) {
    		return str;
    	}
    	int cnt = 0;
    	for( int i = 0; i < cutByte; i++ )
    	{
    		if( strByte[i] < 0 )
    			cnt++;
    	}

    	String r_str;
    	if(cnt%2==0) {
    		r_str = new String(strByte, 0, cutByte );
    	} else {
    		r_str = new String(strByte, 0, cutByte + 1 );
    	}
     return r_str;
    }
}
