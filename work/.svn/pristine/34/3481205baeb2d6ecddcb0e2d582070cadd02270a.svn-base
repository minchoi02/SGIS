package kostat.lbdms.ServiceAPI.common.web.db;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public abstract class DBConnector {
    private final Log logger = LogFactory.getLog(DBConnector.class);

    Connection m_con = null;
    Statement m_stat = null;
    ResultSet m_result = null;
    
    public abstract void openConn() throws ClassNotFoundException, SQLException, IOException, PropertyVetoException;
    public abstract void openConn(String database, String user, String pass)
	    throws ClassNotFoundException, SQLException;

    public boolean execQuery(String strQuery) throws SQLException {
	logger.info("strQuery : " + strQuery);
	m_stat = m_con.createStatement();
	// m_stat = m_con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
	// ResultSet.CONCUR_UPDATABLE);
	boolean hasMoreResultSet = m_stat.execute(strQuery);
	if (hasMoreResultSet) {
	    m_result = m_stat.getResultSet();
	} else {
	    logger.info("return boolean false");
	    return false;
	}
	logger.info("return boolean true");
	return true;
    }

    public int execQueryOne(String strQuery) throws SQLException {
    	logger.info("strQuery : " + strQuery);
    	m_stat = m_con.createStatement();
    	// m_stat = m_con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
    	// ResultSet.CONCUR_UPDATABLE);
    	boolean hasMoreResultSet = m_stat.execute(strQuery);
    	if (hasMoreResultSet) {
    	    m_result = m_stat.getResultSet();
    	    int count = 0;
    	    if(m_result.next()) {
    	    	count = m_result.getInt(1);
    	    }
    	    return count;
    	} else {
    	    return -1;
    	}
    }
    

    public String execQueryStr(String strQuery) throws SQLException {
    	logger.info("strQuery : " + strQuery);
    	m_stat = m_con.createStatement();
    	// m_stat = m_con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
    	// ResultSet.CONCUR_UPDATABLE);
    	String retStr = "";
    	boolean hasMoreResultSet = m_stat.execute(strQuery);
    	if (hasMoreResultSet) {
    	    m_result = m_stat.getResultSet();
    	    if(m_result.next()) {
    	    	retStr = m_result.getString(1);
    	    }
    	} 
    	return retStr;
    }
    
    public boolean execQueryNoResult(String strQuery) throws SQLException {
	try {
	    logger.info("strQuery : " + strQuery);
	    m_stat = m_con.createStatement();
	    m_stat.execute(strQuery);
	    return true;
	} catch (SQLException ex) {
	    logger.error(ex);
	    return false;
	}
    }

    public boolean query(String strQuery) throws SQLException {
	boolean result = false;
	try {
	    logger.info("strQuery : " + strQuery);
	    m_stat = m_con.createStatement();
	    result = m_stat.execute(strQuery);
	    result = true;
	} catch (SQLException ex) {
	    logger.error(ex);
	    throw new SQLException(ex.getMessage());
	}
	return result;

    }

    // 나우드림 수정분 2016-10-27
    public boolean retExecQueryNoResult(String strQuery) {
		logger.info("execQueryNoResult : " + strQuery);
		try {
			m_stat = m_con.createStatement();
			m_stat.execute(strQuery);
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
    }

    // end
    public ResultSet getResultSet() {
	if (m_result == null)
	    return null;
	return m_result;
    }

    public DatabaseMetaData getMetaData() {
	try {
	    return m_con.getMetaData();
	} catch (SQLException e) {
	    logger.error(e);
	    return null;
	}
    }

    public ResultSetMetaData getResultSetMetaData() throws SQLException {
	if (m_result == null)
	    return null;
	return m_result.getMetaData();
    }

    public int getColumnCount() throws SQLException {
	if (m_result == null)
	    return 0;
	return m_result.getMetaData().getColumnCount();

    }

    public List<String> getColumnList() throws SQLException {
	if (m_result == null)
	    return null;
	List<String> colList = new ArrayList<String>();
	int colCount = getColumnCount();
	ResultSetMetaData meta = getResultSetMetaData();
	for (int col = 1; col <= colCount; col++) {
	    String colName = meta.getColumnName(col);
	    colList.add(colName);
	}
	return colList;
    }

    public JSONArray getResult(int limit) throws SQLException {
	if (m_result == null)
	    return null;
	JSONArray result = new JSONArray();
	List<String> colList = getColumnList();

	while (m_result.next()) {
	    int row = m_result.getRow();
	    JSONObject obj = new JSONObject();
	    for (String column : colList) {
		String value = m_result.getString(column);
		try {
		    if (value == null)
			obj.put(column, "NULL");
		    else
			obj.put(column, value);
		    
		    if (column.equalsIgnoreCase("geom")) {
		    	obj.put(column, "-");
		    }
		} catch (JSONException e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		}
	    }
	    result.put(obj);
	    if (row >= limit)
		break;

	}
	return result;
    }

    public net.sf.json.JSONArray getResult2(int limit) throws SQLException {
	if (m_result == null)
	    return null;
	net.sf.json.JSONArray result = new net.sf.json.JSONArray();
	List<String> colList = getColumnList();

	while (m_result.next()) {
	    int row = m_result.getRow();
	    JSONObject obj = new JSONObject();
	    for (String column : colList) {
		String value = m_result.getString(column);
		try {
		    if (value == null)
			obj.put(column, "NULL");
		    else
			obj.put(column, value);
		} catch (JSONException e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		}
	    }
	    result.add(obj.toString());
	    if (row >= limit)
		break;

	}
	return result;
    }

    public JSONObject getResultJsonObject(int limit) throws SQLException {
	JSONArray result = getResult(limit);

	JSONObject resultObject = new JSONObject();
	try {
	    resultObject.put("COLUMN", getColumnList());
	    resultObject.put("VALUE", result);
	} catch (JSONException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

	return resultObject;
    }

    public JSONObject getHiveResultJsonObject(int limit) throws SQLException {
    	JSONArray result = getResult(limit);

    	JSONObject resultObject = new JSONObject();
    	try {
    		resultObject.put("COLUMN", getColumnList());
    	    resultObject.put("VALUE", result);
    	} catch (JSONException e) {
    	    // TODO Auto-generated catch block
    	    e.printStackTrace();
    	}

    	return resultObject;
    }
    
    public void closeConn() {
	try {
	    if (m_stat != null) {
		m_stat.close();
	    }
	    if (m_con != null) {
		m_con.close();
	    }
	} catch (SQLException ex) {
	    logger.error(ex);
	}
    }

    public Connection getConn() {
	return m_con;
    }
}
