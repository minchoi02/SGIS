package kostat.sop.ServiceAPI.api.dt.kosismanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.kosismanage.mapper.KOSISManageDao;
import kostat.sop.ServiceAPI.api.dt.relmanage.mapper.RELManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @author SseOk   
 * @date：2016. 07. 19    
 * @version V1.0      
 *     
 */
public class AllBaseYears extends AbsAuth<Map> {
	private static final Logger logger = Logger.getLogger(AllBaseYears.class);
	@Resource
	private KOSISManageDao kosisManageDao;
	@Override
	public String getApiId() {
		return "relmanage_add";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			logger.debug("시작==================================");
			Map paramMap = getParameterMap(req);
			
			String KOSIS_INST_CD = (String) paramMap.get("KOSIS_INST_CD");
			String KOSIS_TB_ID = (String) paramMap.get("KOSIS_TB_ID");
			
			if(KOSIS_INST_CD !=null){
				paramMap.put("KOSIS_INST_CD", KOSIS_INST_CD);
			}
			if(KOSIS_TB_ID !=null){
				paramMap.put("KOSIS_TB_ID", KOSIS_TB_ID);
			}
			
			logger.debug((String) paramMap.get("SEARCH_WORD1"));
			logger.debug("끝===================================");
			
			return kosisManageDao.searchAllBaseYears(paramMap);
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
	}
	
	private enum OptionParam{
		KOSIS_INST_CD,
		KOSIS_TB_ID
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return null;
	}
}
