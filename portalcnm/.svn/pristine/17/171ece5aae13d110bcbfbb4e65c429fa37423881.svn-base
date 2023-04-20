package kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats.mapper;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**
 *
 * @ClassName WorkRoadMnbyStatsAddressDao
 * @Description 행정구역 목록 조회
 *
 * @author hjh
 * @date 2021.06.10
 * @version V1.0
 *
 */
@Component
public class WorkRoadMnbyStatsAddressDao extends SqlSessionDaoSupport {

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	/**
	 * 시도 목록 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getSidoList(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("WorkRoadMnbyStatsAddress.getSidoList", paramMap));
		return resultMap;
	}

	/**
	 * 시군구 목록 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getSggList(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("WorkRoadMnbyStatsAddress.getSggList", paramMap));
		return resultMap;
	}

	/**
	 * 읍면동 목록 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getEmdongList(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("WorkRoadMnbyStatsAddress.getEmdongList", paramMap));
		return resultMap;
	}

}