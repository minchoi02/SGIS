package kostat.sop.ServiceAPI.batch;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;


/**
 * 1. 기능 : 배치클래스 최상위 클래스<p>
 * 2. 처리개요 : 배치로그 저장기능 추가<p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/08  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
public abstract class AbsDetailTask {
	
	private static final Log logger = LogFactory.getLog(AbsDetailTask.class);
	
	private String ErrMsg = null;
	private String trID = null;
	private SqlSession sqlSession = null;
	
	public String getErrMsg() {
		return this.ErrMsg;
	}
	
	public String getTrID() {
		return this.trID;
	}
	
	public void setTrID(String trID) {
		this.trID = trID;
	}

	public void setErrMsg(String errMsg) {
		this.ErrMsg = errMsg;
	}
	
	public SqlSession getSqlSession() {
		return this.sqlSession;
	}
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory를 설정한다. 
	 */
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		this.sqlSession = new SqlSessionTemplate(sqlSessionFactory);
	}
	
}