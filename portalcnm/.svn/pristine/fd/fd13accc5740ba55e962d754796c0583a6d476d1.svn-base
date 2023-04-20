package kostat.sop.ServiceAPI.api.dt.workRoadStatsItemManage.mapper;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

/**   
 *
 * @ClassName: WorkRoadStatsItemManageDao
 * @Description： 일자리 통계항목 관리 DAO
 *
 * @author 한광희
 * @date：2019.07.31    
 * @version V1.0      
 *     
 */
@Component
public class WorkRoadStatsItemManageDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	
	/** 일자리 통계항목 조회 */
	public Map searchWorkRoadStatsItemManage(Map paramMap) {	
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("WorkRoadStatsItemManage.getSearchWorkRoadStatsItemManage",paramMap));
		resultMap.put("total", getSqlSession().selectList("WorkRoadStatsItemManage.getSearchWorkRoadStatsItemManageCount",paramMap));
		return resultMap;
	}
	
	/** 일자리 통계항목 상세 조회 */
	public Map getWorkRoadStatsItemManage(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("WorkRoadStatsItemManage.getWorkRoadStatsItemManage",paramMap));
		return resultMap;
	}
	
	/** 일자리 통계항목 삭제 */
	public Success deleteWorkRoadStatsItemManage(String[] list) {
		Success success = new Success(false,Prompt.DELETEFAIL);
		if((int)getSqlSession().delete("WorkRoadStatsItemManage.deleteWorkRoadStatsItemManage",list) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	
	/** 일자리 통계항목 연계 ID 중복 체크 */
	public Success checkLINKID(Map paramMap){
		Success success = new Success();
		int a = (int) getSqlSession().selectOne("WorkRoadStatsItemManage.checkLINKID",paramMap);
		logger.debug("----------------------------------------"+a);
		if(a > 0){
			success.setMsg("이미 등록된 아이디 입니다");
		}else{
			success.setSuccess(true);
			success.setMsg("등록하실 수 있습니다.");
		}
		return success;
	}
	
	/** 일자리 통계항목 신규 추가 */
	public Success addWorkRoadStatsItemManage(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("WorkRoadStatsItemManage.addWorkRoadStatsItemManage",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	/** 일자리 통계항목 수정 */
	public Success updateWorkRoadStatsItemManage(Map paramMap){
		Success success = new Success(false,Prompt.UPDATEFAIL);
		if((int) getSqlSession().update("WorkRoadStatsItemManage.updateWorkRoadStatsItemManage",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}
}
