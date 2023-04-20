package kostat.lbdms.ServiceAPI.common.web.db;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;


public class PgDataSource {
	private static PgDataSource datasource;
	private static final String PROPERTY_PATH = "/globals.properties";
    private BasicDataSource ds;
    
    private PgDataSource() throws IOException, SQLException, PropertyVetoException {
    	ds = new BasicDataSource();
    	ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
    	Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String driverClassName = props.getProperty("driver.class.name");
		String userName = props.getProperty("user.name");  
		String dbPw = props.getProperty("db.pass");  
		String url = props.getProperty("db.url");  
		String minIdle = props.getProperty("db.min.idle");
		String maxIdle = props.getProperty("db.max.idle");
		String maxActive =props.getProperty("db.max.active");
		String maxPrepared = props.getProperty("db.max.open.prepared.statements"); 
		String initialSize = props.getProperty("db.initial.size");

		if (driverClassName == null || "".equals(driverClassName)) driverClassName = "org.postgresql.Driver";
		if (userName == null || "".equals(userName)) userName = "postgres";
		if (dbPw == null || "".equals(dbPw)) dbPw = "xhdrPcjd!@#";
		// 20180622 ktk original
		// if (url == null || "".equals(url)) url = "jdbc:postgresql://bigdata.bplace.kr:55444/sop2015";
		// end
		// 20180622 ktk add
		url = props.getProperty("");
		// end
		if (minIdle == null || "".equals(minIdle)) minIdle = "10";
		if (maxIdle == null || "".equals(maxIdle)) maxIdle = "20";
		if (maxActive == null || "".equals(maxActive)) maxActive = "20";
		if (maxPrepared == null || "".equals(maxPrepared)) maxPrepared = "180";
		if (initialSize == null || "".equals(initialSize)) initialSize = "10";
		
        ds.setDriverClassName(driverClassName);
        ds.setUsername(userName);
        ds.setPassword(dbPw);
        ds.setUrl(url);
        ds.setMinIdle(Integer.parseInt(minIdle)); // 최소한으로 유지할 커넥션 개수(기본값: 0)
        ds.setMaxIdle(Integer.parseInt(maxIdle)); // 커넥션 풀에 반납할 때 최대로 유지될 수 있는 커넥션 개수(기본값: 8)
        ds.setMaxActive(Integer.parseInt(maxActive)); // 	동시에 사용할 수 있는 최대 커넥션 개수(기본값: 8)
        ds.setMaxOpenPreparedStatements(Integer.parseInt(maxPrepared));
        ds.setInitialSize(Integer.parseInt(initialSize));
        ds.setValidationQuery("select 1 ");
//        ds.setAccessToUnderlyingConnectionAllowed(true);
    }

	public static PgDataSource getInstance() throws IOException, SQLException, PropertyVetoException {
        if (datasource == null) {
            datasource = new PgDataSource();
            return datasource;
        } else {
            return datasource;
        }
    }

    public Connection getConnection() throws SQLException {
        return this.ds.getConnection();
    }
    
}
