package kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats.mapper;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**
 *
 * @ClassName WorkRoadMnbyStatsDao
 * @Description 일자리 월별 집계
 *
 * @author hjh
 * @date 2021.06.10
 * @version V1.0
 *
 */
@Component
public class WorkRoadMnbyStatsDao extends SqlSessionDaoSupport {

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	/**
	 * 일자리 월별 집계 목록 페이징 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map searchWorkRoadMnbyStats(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("WorkRoadMnbyStats.searchWorkRoadMnbyStatsCount", paramMap));
		resultMap.put("rows", getSqlSession().selectList("WorkRoadMnbyStats.searchWorkRoadMnbyStats", paramMap));
		return resultMap;
	}

	/**
	 * 일자리 월별 집계 등록년 목록 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getWorkRoadMnbyStatsRegYearList(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("WorkRoadMnbyStats.getWorkRoadMnbyStatsRegYearList", paramMap));
		return resultMap;
	}

	/**
	 * 일자리 월별 집계 등록월 목록 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getWorkRoadMnbyStatsRegMonthList(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("WorkRoadMnbyStats.getWorkRoadMnbyStatsRegMonthList", paramMap));
		return resultMap;
	}

	/**
	 * 일자리 월별 집계 경계 비교 목록 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getWorkRoadMnbyStatsCmprList(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("result", getSqlSession().selectList("WorkRoadMnbyStats.getWorkRoadMnbyStatsCmprList", paramMap));
		return resultMap;
	}

}