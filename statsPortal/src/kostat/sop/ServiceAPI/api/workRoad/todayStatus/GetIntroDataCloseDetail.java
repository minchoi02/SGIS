package kostat.sop.ServiceAPI.api.workRoad.todayStatus;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

//import kostat.sop.ServiceAPI.api.technicalBiz.GetSigunguRank.MustParam;
//import kostat.sop.ServiceAPI.api.technicalBiz.GetSigunguRank.OptionParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.WorkRoadTodayStatusService;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetIntroDataCloseDetail extends AbsQuery<Map>{

	private static final Log logger = LogFactory.getLog(GetIntroDataCloseDetail.class);

	@Resource(name = "workRoadTodayStatusService")
	private WorkRoadTodayStatusService workRoadTodayStatusService;

	enum MustParam {
	}
	
	enum OptionParam {
		today,
		search_type
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "111202";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String arg2) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			// today 파라미터가 없는 경우 최신데이터등록일로 설정 - 2018.11.07	ywKim	추가
			if (mapParameter.get("today") == null) {
				String dt = session.selectOne("wrTodayStatus.getLatestRegDate");
				mapParameter.put("today", dt);
			}

			result.put("introData", workRoadTodayStatusService.getIntroDataCloseDetail(mapParameter));
			result.put("today", mapParameter.get("today"));
			
			String search_type = (String) mapParameter.get(OptionParam.search_type.name());
			logger.info("search_type[" + search_type + "] ");
			if(!search_type.equals("none")){
				if(search_type.equals("btn1")){
					result.put("btnValue", "2");
				}else if(search_type.equals("btn2")){
					result.put("btnValue", "7");
				}else if(search_type.equals("btn3")){
					result.put("btnValue", "30");
				}else if(search_type.equals("btn4")){
					result.put("btnValue", "90");
				}else if(search_type.equals("btn5")){
					result.put("btnValue", "180");
				}
			} else {
				result.put("btnValue", "1");
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");
			
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
	
}
