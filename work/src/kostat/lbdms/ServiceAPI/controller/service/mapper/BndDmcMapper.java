package kostat.lbdms.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import kostat.lbdms.ServiceAPI.controller.model.urbar.BndDmcVO;
import kostat.lbdms.ServiceAPI.controller.model.urbar.Criteria;


@Repository("bndDmcMapper")
public class BndDmcMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSessionSystemUrbar")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}

	/**
	 * 획정 프로그램 목록 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectBndInfoList(Map mapParameter) throws SQLException {
		 return selectList("urbar_bnd.selectBndInfoList", mapParameter);
	}

	public Map selectBndInfoDetail(Map mapParameter)throws SQLException{
		return selectOne("urbar_bnd.selectBndInfoDetail",mapParameter);
	}

	public int selectBndInfoListCnt()throws SQLException{
		return selectOne("urbar_bnd.getTotalCount");
	}

	/**
	 * 신규 획정 작업을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public void createBndInfo(Map mapParameter) throws SQLException {
		insert("urbar_bnd.createBndInfo", mapParameter);
	}
	   /**
     *  획정 선택한 작업을 삭제한다
     * @param mapParameter
     * @exception Exception
     */

	public void deleteBnd(Map mapParameter) throws SQLException {
        insert("urbar_bnd.deleteBnd", mapParameter);
    }
}
