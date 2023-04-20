package kostat.sop.ServiceAPI.api.dt.pubdatamanage;

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
public class AddPubData extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddPubData.class);
	@Resource
	private PubDataManageDao pubDataManageDao;
	@Override
	public String getApiId() {
		return "pubdatamanage_add";
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
			
			paramMap.put("PUB_DATA_ID", pubDataManageDao.getId(paramMap));
			
			String cleanXssDATA_NM = "";
			cleanXssDATA_NM = Security.cleanXss((String) paramMap.get("PUB_DATA_NM"));
			paramMap.put("PUB_DATA_NM", cleanXssDATA_NM);	
			
			String cleanXssDATA_YEAR = "";
			cleanXssDATA_YEAR = Security.cleanXss((String) paramMap.get("PUB_DATA_YEAR"));
			paramMap.put("PUB_DATA_YEAR", cleanXssDATA_YEAR);
			
			String cleanXssINTRACTVMAP_APPLY_YN = "";
			cleanXssINTRACTVMAP_APPLY_YN = Security.cleanXss((String) paramMap.get("INTRACTVMAP_APPLY_YN"));
			paramMap.put("INTRACTVMAP_APPLY_YN", cleanXssINTRACTVMAP_APPLY_YN);
			
			String cleanXssBIZSTATMAP_APPLY_YN = "";
			cleanXssBIZSTATMAP_APPLY_YN = Security.cleanXss((String) paramMap.get("BIZSTATMAP_APPLY_YN"));
			paramMap.put("BIZSTATMAP_APPLY_YN", cleanXssBIZSTATMAP_APPLY_YN);
			
			return pubDataManageDao.addPubData(paramMap);
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
		PUB_DATA_NM,PUB_DATA_YEAR,INTRACTVMAP_APPLY_YN,BIZSTATMAP_APPLY_YN
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}
}
