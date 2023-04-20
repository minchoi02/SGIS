package kostat.lbdms.ServiceAPI.common.web.db;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class OpenPGSql extends DBConnector {

    private final Log logger = LogFactory.getLog(OpenPGSql.class);

	@Override
	public void openConn() throws ClassNotFoundException, SQLException, IOException, PropertyVetoException {
 
		try {
			m_con = PgDataSource.getInstance().getConnection();
		}catch (SQLException | IOException | PropertyVetoException e) {
			logger.debug(e);
			logger.debug("SQLState CODE : "+e.getMessage());
			throw new SQLException("POSTGRE 연결 실패");
		}

	}
	
	
    @Override
    public void openConn(String database, String user, String pass) throws ClassNotFoundException, SQLException {
	try {
	    Class.forName("org.postgresql.Driver");
	} catch (ClassNotFoundException e) {
	    logger.error(e);
	    throw new ClassNotFoundException(e.getMessage());
	}
	DriverManager.setLogWriter(new PrintWriter(System.err));
	try {
	    m_con = DriverManager.getConnection(database, user, pass);
	} catch (SQLException e) {
	    logger.debug(e);
	    logger.debug("SQLState CODE : " + e.getSQLState());
	    throw new SQLException(e.getMessage());
	}

    }
}
