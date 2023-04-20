package kostat.sop.ServiceAPI.api.mn.srvstat;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.ak.uploaddata.mapper.UPLOADDataDao;
import kostat.sop.ServiceAPI.api.dt.accessmanage.mapper.AccessManageDao;
import kostat.sop.ServiceAPI.api.mn.srvstat.mapper.SRVStatDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SearchUser
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:09:04    
 * @version V1.0      
 *     
 */
public class SearchMemberValue extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchMemberValue.class);
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
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {	
			Map paramMap = getParameterMap(req);
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
			
			paramMap.put("STARTDATE", STARTDATE);
			paramMap.put("ENDDATE", ENDDATE);
			
			return srvStatDao.searchMemberValue(paramMap);
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
		return null;
	}
	private enum MustParam{
		MEMBER_ID,TIMETYPE,STARTDATE,ENDDATE
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}
}
