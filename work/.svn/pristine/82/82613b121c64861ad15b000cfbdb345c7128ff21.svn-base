package kostat.lbdms.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;


@Repository("dnmtMapper")
public class DnmtMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSessionSystemUrbar")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	/**
	 * 명명 프로그램 목록 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectDnmtInfoList(Map mapParameter) throws SQLException {
		 return selectList("urbar_dnmt.selectDnmtInfoList",mapParameter);
	}

	/**
	 * 신규 명명 작업을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public void createDnmtInfo(Map mapParameter) throws SQLException {
		insert("urbar_dnmt.createDnmtInfo", mapParameter);
	}

	public Map selectDnmtDetail(Map mapParameter)throws SQLException{
        return selectOne("urbar_dnmt.selectDnmtInfoDetail",mapParameter);
    }

	public void deleteDnmt(Map mapParameter) throws SQLException {
        update("urbar_dnmt.deleteDnmt", mapParameter);
    }

	public Map countNaming(Map mapParameter)throws SQLException{
        return selectOne("urbar_dnmt.CountNaming",mapParameter);
    }

	public List selectNamingList(Map mapParameter)throws SQLException{
        return selectList("urbar_dnmt.selectNamingList",mapParameter);
    }



}
