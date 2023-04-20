package kostat.lbdms.ServiceAPI.common.web.db;

import java.sql.DriverManager;
import java.sql.SQLException;


public class OpenHiveSql extends DBConnector{
	@Override
	public void openConn()
			throws ClassNotFoundException, SQLException {
		
	}
	
	@Override
	public void openConn(String host, String user, String pa)
			throws ClassNotFoundException, SQLException {
		
		Class.forName("org.apache.hive.jdbc.HiveDriver");
		m_con = DriverManager.getConnection(host,user,pa);
	}
}
