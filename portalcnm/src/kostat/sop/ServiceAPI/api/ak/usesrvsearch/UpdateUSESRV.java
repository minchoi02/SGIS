package kostat.sop.ServiceAPI.api.ak.usesrvsearch;

import org.apache.log4j.Logger;

import java.text.SimpleDateFormat;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.ak.usesrvsearch.mapper.USESRVSearchDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.DateUtil;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: UpdateUSESRV
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午4:14:30    
 * @version V1.0      
 *     
 */
public class UpdateUSESRV extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateUSESRV.class);

	@Resource
	private USESRVSearchDao usesrvSearchDao;
	@Override
	public String getApiId() {
		return "usesrvsearch_update";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap=getParameterMap(req);
			paramMap.put("MANAGER_ID", getSession(req, "manager_id"));
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String SRV_END_DT = (String) paramMap.get("SRV_END_DT");
			if(SRV_END_DT != null){
				if(!DateUtil.checkDate(SRV_END_DT))
					throw new ApiException("유효하지 종료날짜 입니다.");
				try {
					paramMap.remove("SRV_END_DT");
					paramMap.put("SRV_END_DT", df.parse(SRV_END_DT));
				} catch (NullPointerException e) {
					throw new ApiException("입력값이 없습니다.");
				}catch (Exception e) {
					throw new ApiException("입력값을 체크 해 주세요");
				}
			}
			String CASE_APP_OPEN_YN = paramMap.get("CASE_APP_OPEN_YN").toString();
			String CASE_APP_SHARE_YN = paramMap.get("CASE_APP_SHARE_YN").toString();
			if(!CASE_APP_OPEN_YN.equals("Y")&&!CASE_APP_OPEN_YN.equals("N"))
				throw new ApiException("입력값을 체크 해 주세요");
			if(!CASE_APP_SHARE_YN.equals("Y")&&!CASE_APP_SHARE_YN.equals("N"))
				throw new ApiException("입력값을 체크 해 주세요");
			if(paramMap.get("CHG_REASON").toString().getBytes().length > 200)
				throw new ApiException("변경 사유는 200자를 넘을 수 없습니다.");
			return usesrvSearchDao.updateUSESRV(paramMap);
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요.");
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
		SRV_ID,
		CASE_APP_OPEN_YN, 
		CASE_APP_SHARE_YN, 
		GRANT_STATE,
		CHG_REASON,
		API_AUTH_KEY_TYPE
	}
	private enum OptionParam{
		SRV_END_DT
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
