package kostat.sop.ServiceAPI.api.mn.srvstat;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.mn.srvstat.mapper.SRVStatDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class SRVPageView extends AbsAuth<Map>{
	private static final Logger logger = Logger.getLogger(SRVStat.class);
	@Resource
	private SRVStatDao srvStatDao;
	@Override
	public String getApiId() {
		return "srvstat_srvstat";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		Map paramMap=getParameterMap(req);
		
		String TIMETYPE = paramMap.get("TIMETYPE").toString();
		String STARTDATE = paramMap.get("STARTDATE").toString();
		String ENDDATE = paramMap.get("ENDDATE").toString();
		paramMap.put("STARTD", STARTDATE);
		paramMap.put("ENDD", ENDDATE);
		switch (TIMETYPE) {
		case "DAILY":
			STARTDATE = STARTDATE.substring(0,4) + STARTDATE.substring(5,7) + STARTDATE.substring(8,10); 
			ENDDATE = ENDDATE.substring(0,4) + ENDDATE.substring(5,7) + ENDDATE.substring(8,10); 
			break;
		case "MONTHLY":
			STARTDATE = STARTDATE.substring(0,4) + STARTDATE.substring(5,7); 
			ENDDATE = ENDDATE.substring(0,4) + ENDDATE.substring(5,7); 
			break;
		default:
			break;
		}
		RequestUtil.transSearchDate(paramMap);	
		try {
			String MAIN_PAGE = (String) paramMap.get("MAIN_PAGE");
			if(MAIN_PAGE != null && MAIN_PAGE.getBytes().length > 200)
				throw new ApiException("입력값을 체크 해 주세요");

			paramMap.put("STARTDATE", STARTDATE);
			paramMap.put("ENDDATE", ENDDATE);
			
			return srvStatDao.getSRVStat1(paramMap);
		}   catch (AbsAPIException e) {
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
		TIMETYPE,STARTDATE,ENDDATE,
	}
	private enum OptionParam{
		MAIN_PAGE
	}
}
