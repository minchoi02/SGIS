package kostat.sop.ServiceAPI.api.ak.uploaddata;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.ak.uploaddata.mapper.UPLOADDataDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: UpdateUserData
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:09:04    
 * @version V1.0      
 *     
 */ 
public class updateUserData extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(updateUserData.class);
	@Resource
	private UPLOADDataDao upLoadDataDao;
	@Override
	public String getApiId() {
		return "uploaddata_updataUserData";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			
			String cleanXssDATA_ID = "";
			cleanXssDATA_ID = Security.cleanXss((String) paramMap.get("DATA_ID"));
			paramMap.put("DATA_ID", cleanXssDATA_ID);	
			
			String cleanXssEND_DT = "";
			cleanXssEND_DT = Security.cleanXss((String) paramMap.get("END_DT"));
			paramMap.put("END_DT", cleanXssEND_DT);
			
			String cleanXssSHARE_YN = "";
			cleanXssSHARE_YN = Security.cleanXss((String) paramMap.get("SHARE_YN"));
			paramMap.put("SHARE_YN", cleanXssSHARE_YN);
			
			String cleanXssUSE_YN = "";
			cleanXssUSE_YN = Security.cleanXss((String) paramMap.get("USE_HISTORY"));
			paramMap.put("USE_HISTORY", cleanXssUSE_YN);
			
			String cleanXssSHARE_YN_OLD = "";
			cleanXssSHARE_YN_OLD = Security.cleanXss((String) paramMap.get("SHARE_YN_OLD"));
			paramMap.put("SHARE_YN_OLD", cleanXssSHARE_YN_OLD);
			
			return  upLoadDataDao.updateUserData(paramMap);
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
		DATA_ID,END_DT,SHARE_YN,SHARE_YN_OLD,USE_HISTORY
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
