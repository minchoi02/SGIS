package kostat.sop.ServiceAPI.batch.run;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionException;

import kostat.sop.ServiceAPI.batch.AbsDetailTask;

/**
 * 1. 기능 : 1년이 지난 로그인 로그를 삭제한다.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/08  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see <p/>
 */
public class BatchUpdateUSESRV extends AbsDetailTask {
	private static final Log logger = LogFactory.getLog(BatchUpdateUSESRV.class);

	public void batchProcess() throws SqlSessionException, SQLException, IOException {
		SqlSession session = getSqlSession();
		try {
			session.update("batch.updateUSESRV");
		} catch (SqlSessionException e) {
			logger.error(e);
			throw e;
		} finally {
			if (session != null)
				session.close();
		}
	}
}