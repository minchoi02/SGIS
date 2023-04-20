package kostat.lbdms.ServiceAPI.common.util;

import java.sql.Timestamp;
import java.util.Date;

public class DataUtil {


	public static String getRandomTableName(String tableName) {
		Date date = new Date();
		long time = date.getTime();
		Timestamp ts = new Timestamp(time);
		long longTime = Long.valueOf(ts.getTime());

		return new String(tableName + longTime);
	}

	/**
	 * @brief 현재 날짜와 user ID를 조합해서 ID 생성
	 * @param user
	 * @return
	 */
	public static String getGenerateId(String user) {
		Date date = new Date();
		long time = date.getTime();
		Timestamp ts = new Timestamp(time);
		long longTime = Long.valueOf(ts.getTime());

		return new String(longTime + "_" + user);
	}

	
}
