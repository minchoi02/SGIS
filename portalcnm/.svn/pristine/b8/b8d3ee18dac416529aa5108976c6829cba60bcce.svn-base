package kostat.sop.ServiceAPI.api.common;

import org.apache.log4j.Logger;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.common.mapper.CommonDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GetAPIMClass
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月15日 下午3:05:42    
 * @version V1.0      
 *    
 */
public class GetAPIClass extends AbsAuth<List> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetAPIClass.class);
 
	@Resource
	private CommonDao commonDao;
	@Override
	public String getApiId() {
		return "common_getapiclass";
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
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		Map paramMap=getParameterMap(req);
		String CLASSTYPE=paramMap.get("CLASSTYPE").toString();
		
		try {	
			switch (CLASSTYPE) {
			case "B":
				if(paramMap.get("API_B_CLASS_CD")!=null)
				throw new ApiException("입력값을 체크 해 주세요");
				else
				return commonDao.getAPIBClassList(paramMap);
			case "M":
				return commonDao.getAPIMClassList(paramMap);
			case "X":
				return commonDao.getLogBCdList(paramMap);
			case "Y":
				return commonDao.getLogSCdList(paramMap);
			case "T":
				return commonDao.getLogTCdList(paramMap);
			default:
				throw new ApiException("입력값을 체크 해 주세요");
			}
		} 
		 catch (AbsAPIException e) {
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
		CLASSTYPE
	}
	private enum OptionParam{
		API_B_CLASS_CD,SRV_ATTR
	}

}
