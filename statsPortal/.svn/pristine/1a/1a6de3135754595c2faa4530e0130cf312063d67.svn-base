package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("urbanMapper")
public class UrbanMapper extends EgovAbstractMapper {

	/**
	 * 테스트 정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTestInfo(Map mapParameter) throws SQLException {
		return selectList("urban.selectTestInfo", mapParameter);
	}

}
