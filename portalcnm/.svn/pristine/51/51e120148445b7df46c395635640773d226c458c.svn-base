package kostat.sop.ServiceAPI.api.dt.workRoadStatsInfoSm;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.workRoadStatsInfoSm.mapper.WorkRoadStatsInfoSmDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 * 
 * @ClassName: UpdateWorkRoadStatsInfoSm
 * @Description：일자리 통계정보 집계 수정
 * 
 * @author 김남민
 * @date：2019.07.31    
 * @version V1.0      
 *     
 */
public class UpdateWorkRoadStatsInfoSm extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateWorkRoadStatsInfoSm.class);
	
	@Resource
	private WorkRoadStatsInfoSmDao workRoadStatsInfoSmDao;
	
	@Override
	public String getApiId() {
		return "workroadstatsinfosm_update";
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
			return  workRoadStatsInfoSmDao.updateSearchWorkRoadStatsInfoSm(paramMap);
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
		REG_ID_ORIGIN
		,REG_ID
		,LINK_ID
		,LINK_NM
		//,COLCT_SOURCE
		,CONECT_URL
		,CONECT_PORT
		,CONECT_CONFM_KEY
		,UPDT_CYCLE
		,USE_YN
		/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수항목 추가 START */
		,STAT_PATH
		,DISP_TYPE
		/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수항목 추가 END */
	}
	
	private enum OptionParam{
		COLCT_SOURCE
		
		,apiKey
		,format
		,jsonVD
		,userStatsId
		,prdSe
		,newEstPrdCnt
		/** 2020-04-29 [곽제욱] 추가된 컬럼중 옵션항목 추가 START */
		,LINK_YN
		,STAT_NM
		,STAT_INFO
		,ETC_LINK_MTH
		,REFRN_URL
		/** 2020-04-29 [곽제욱] 추가된 컬럼중 옵션항목 추가 END */
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
