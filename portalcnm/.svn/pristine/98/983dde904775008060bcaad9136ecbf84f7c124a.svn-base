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
 * @ClassName: AddREL
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午8:08:30    
 * @version V1.0      
 *     
 */
public class SGGKosis extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SGGKosis.class);
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
			String SEARCH_WORD1 = (String) paramMap.get("SEARCH_WORD1");
			if(SEARCH_WORD1 != null && SEARCH_WORD1.getBytes().length > 4)
				throw new ApiException("입력값을 체크 해 주세요");
			
			if(SEARCH_WORD1 !=null){
				paramMap.put("SEARCH_WORD1", "%"+SEARCH_WORD1+"%");
			}
			
			// 2016. 07. 14 j.h.Seok
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
			_transPagging(paramMap);
			return kosisManageDao.searchGUGUN(paramMap);
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
		rows,page
	}
	private enum OptionParam{
		SEARCH_WORD1,
		// 2016. 07. 14 j.h.Seok
		KOSIS_INST_CD,
		KOSIS_TB_ID
	}

}
