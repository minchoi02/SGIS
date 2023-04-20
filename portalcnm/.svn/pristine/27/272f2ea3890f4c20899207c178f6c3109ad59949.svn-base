package kostat.sop.ServiceAPI.api.dt.workRoadStatsItemManage;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.workRoadStatsItemManage.mapper.WorkRoadStatsItemManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: WorkRoadStatsItemManage
 * @Description： 일자리 통계항목 관리 수정
 *
 * @author 한광희
 * @date：2019.08.05    
 * @version V1.0      
 *     
 */
public class UpdateWorkRoadStatsItemManage extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateWorkRoadStatsItemManage.class);
	@Resource
	private WorkRoadStatsItemManageDao workRoadStatsItemManageDao;
	@Override
	public String getApiId() {
		return "workroadstatsitemmanage_updateWorkRoadStatsItemManage";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			
			// 연계 ID
			paramMap.put("LINK_ID", paramMap.get("LINK_ID"));
			// 통계명
			paramMap.put("STAT_NM", paramMap.get("STAT_NM"));
			// 통계정의
			paramMap.put("STAT_DEFINITION", paramMap.get("STAT_DEFINITION"));
			// 통계설명
			String cleanXssSTAT_EXP = "";
			cleanXssSTAT_EXP = Security.cleanXss((String) paramMap.get("STAT_EXP"));
			paramMap.put("STAT_EXP", cleanXssSTAT_EXP);
			// 수집출처
			paramMap.put("COLCT_SOURCE", paramMap.get("COLCT_SOURCE"));
			// 갱신주기
			paramMap.put("UPDT_CYCLE", paramMap.get("UPDT_CYCLE"));
			// 통계경로
			paramMap.put("STAT_PATH", paramMap.get("STAT_PATH"));
			// 참조 URL
			paramMap.put("REFRN_URL", paramMap.get("REFRN_URL"));
					
			logger.debug("시작==============================================================");
			return  workRoadStatsItemManageDao.updateWorkRoadStatsItemManage(paramMap);
		}  catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum MustParam{
		LINK_ID
	}
	private enum OptionParam{
		STAT_NM, STAT_DEFINITION, STAT_EXP, COLCT_SOURCE, UPDT_CYCLE, STAT_PATH, REFRN_URL
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
