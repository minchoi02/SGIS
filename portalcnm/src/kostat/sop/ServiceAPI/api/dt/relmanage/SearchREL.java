package kostat.sop.ServiceAPI.api.dt.relmanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.relmanage.mapper.RELManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SearchREL
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:09:04    
 * @version V1.0      
 *     
 */
public class SearchREL extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchREL.class);
	@Resource
	private RELManageDao relManageDao;
	@Override
	public String getApiId() {
		return "relmanage_search";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {	
			Map paramMap = getParameterMap(req);	
			String SEARCH_TYPE = (String) paramMap.get("SEARCH_TYPE");
			String SEARCH_WORD = (String) paramMap.get("SEARCH_WORD");
			if(SEARCH_WORD != null && SEARCH_WORD.getBytes().length > 50)
				throw new ApiException("입력값을 체크 해 주세요");
			_transPagging(paramMap);
			if(SEARCH_WORD !=null){
				paramMap.put("SEARCH_TYPE", SEARCH_TYPE);
				paramMap.put("SEARCH_WORD", "%"+SEARCH_WORD+"%");
			}
			return relManageDao.searchREL(paramMap);
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
		SEARCH_WORD,SEARCH_TYPE
	}
}
