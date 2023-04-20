package kostat.lbdms.ServiceAPI.common.web.core;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;

import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;


public class GetSize {
	
	private static final long K = 1024;
	private static final long M = K * K;
	private static final long G = M * K;
	private static final long T = G * K;
	
	
	public String convertToStringRepresentation(final long value) {
		
		final long[] dividers = new long[] { T, G, M, K, 1 };
		final String[] units = new String[] { "TB", "GB", "MB", "KB", "B" };

		String result = null;
		if (value < 1) {
			result = "0";
			return result;
		}
		for (int ii = 0; ii < dividers.length; ii++) {
			final long divider = dividers[ii];

			if (value >= divider) {
				result = format(value, divider, units[ii]);
				break;
			}
		}
		return result;
	}
	
	private String format(final long value, final long divider,
			final String unit) {
		final double result = divider > 1 ? (double) value / (double) divider : (double) value;
		return new DecimalFormat("#,##0.#").format(result) + " " + unit;
	}
	
	public static String getPgCount(DBConnector pgConn, String schema, String tableName) throws SQLException {
		String result = null;
		String sql = "select count(*) as cnt from " + schema + "." + tableName;
		pgConn.execQuery(sql);
		ResultSet rs = pgConn.getResultSet();
		while(rs.next()){
			result = rs.getString("cnt");
		}
		return result;
	}
	
	public static String getPgSize(DBConnector pgConn, String schema, String tableName) throws SQLException {
		String result = null;
		pgConn.execQuery("SELECT pg_total_relation_size('"+ schema + "." + tableName+"') as size");
		ResultSet res = pgConn.getResultSet();
		while(res.next()){
			result = res.getString("size");
		}
		return result;
	}

}
