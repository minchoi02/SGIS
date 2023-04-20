package kostat.sop.ServiceAPI.api.dt.thmetamanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.accessmanage.mapper.AccessManageDao;
import kostat.sop.ServiceAPI.api.dt.pubdatamanage.mapper.PubDataManageDao;
import kostat.sop.ServiceAPI.api.dt.relmanage.mapper.RELManageDao;
import kostat.sop.ServiceAPI.api.dt.thmetamanage.mapper.ThMetaManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: AddREL
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午8:08:30    
 * @version V1.0      
 *     
 */
public class AddMetaData extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddMetaData.class);
	@Resource
	private ThMetaManageDao thMetaManageDao;
	@Override
	public String getApiId() {
		return "thmetamanage_add";
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
			
			paramMap.put("META_DATA_ID", thMetaManageDao.getId(paramMap));
			
			String cleanXssTITLE = "";
			cleanXssTITLE = Security.cleanXss((String) paramMap.get("TITLE"));
			paramMap.put("TITLE", cleanXssTITLE);	
				
			String cleanXssTB_NM = "";
			cleanXssTB_NM = Security.cleanXss((String) paramMap.get("TB_NM"));
			paramMap.put("TB_NM", cleanXssTB_NM);
			
			paramMap.put("MANAGER_ID", "");
			
			String cleanXssEXP = "";
			cleanXssEXP = Security.cleanXss((String) paramMap.get("EXP"));
			paramMap.put("EXP", cleanXssEXP);
			
			return thMetaManageDao.addMetaData(paramMap);
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
		TITLE,TB_NM,EXP		
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}
}
