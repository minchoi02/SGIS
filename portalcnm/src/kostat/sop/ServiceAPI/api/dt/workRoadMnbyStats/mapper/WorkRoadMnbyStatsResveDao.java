package kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

/**
 *
 * @ClassName WorkRoadMnbyStatsResveDao
 * @Description 일자리 경계 현행화 관리
 *
 * @author hjh
 * @date 2021.06.22
 * @version V1.0
 *
 */
@Component
public class WorkRoadMnbyStatsResveDao extends SqlSessionDaoSupport {

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	/**
	 * 일자리 경계 현행화 관리 목록 페이징 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map searchWorkRoadMnbyStatsResve(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("WorkRoadMnbyStatsResve.searchWorkRoadMnbyStatsResveCount", paramMap));
		resultMap.put("rows", getSqlSession().selectList("WorkRoadMnbyStatsResve.searchWorkRoadMnbyStatsResve", paramMap));
		return resultMap;
	}

	/**
	 * 일자리 경계 현행화 관리 경계년도 건수 조회
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public int getWorkRoadMnbyStatsResveCount(Map paramMap) {
		return (int) getSqlSession().selectOne("WorkRoadMnbyStatsResve.getWorkRoadMnbyStatsResveCount", paramMap);
	}

	/**
	 * 일자리 경계 현행화 관리 등록
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Success addWorkRoadMnbyStatsResve(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		if ((int) getSqlSession().insert("WorkRoadMnbyStatsResve.addWorkRoadMnbyStatsResve", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	/**
	 * 일자리 경계 현행화 관리 삭제
	 *
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Success deleteWorkRoadMnbyStatsResve(Map paramMap) {
		Success success = new Success(false, Prompt.DELETEFAIL);

		List list = new ArrayList();
		String[] resveDtList = paramMap.get("RESVE_DT_LIST").toString().split(",");
		for (int i = 0; i < resveDtList.length; i++) {
			Map map = new HashMap();
			map.put("RESVE_DT", resveDtList[i]);
			list.add(map);
		}
		int successCnt = (int) getSqlSession().delete("WorkRoadMnbyStatsResve.deleteWorkRoadMnbyStatsResve", list);

		if (list.size() != successCnt) {
			success.setSuccess(true);
			success.setMsg("수행되거나 수행 중인 예약은 삭제되지 않습니다.");
		} else if (successCnt > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}

}
