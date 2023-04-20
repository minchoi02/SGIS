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
public class SOPAdmCode extends AbsGridQuery<Map> {
	private static final Logger logger = Logger.getLogger(SOPAdmCode.class);
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
			
			String SEARCH_WORD = (String) paramMap.get("search_word");
			if(SEARCH_WORD != null && SEARCH_WORD.getBytes().length < 1)
				throw new ApiException("검색어를 입력해 주세요.");
			
			if(SEARCH_WORD != null){
				paramMap.put("search_word", "%" + SEARCH_WORD + "%");
			}
			
			logger.debug((String) paramMap.get("search_word"));
			logger.debug("끝===================================");
			
			_transPagging(paramMap);
			
			Map tempMap = kosisManageDao.searchSopAdmCode(paramMap);
			
			return tempMap;
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
		search_word,
		area_type
	}
	
	private enum OptionParam{
		page,
		rows
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return null;
	}
}
