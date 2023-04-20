package kostat.sop.ServiceAPI.api.dt.kosismanage;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.dt.kosismanage.mapper.KOSISManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**   
 *
 * @ClassName: SearchKosisError
 * @Description： 
 *
 * @author jrj
 * @date：2018.02.26    
 * @version V1.0      
 *     
 */
public class SearchKosisError extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchKosisError.class);
	@Resource
	private KOSISManageDao kosisManageDao;
	@Override
	public String getApiId() {
		return "kosiserror_search";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {	
			Map paramMap = getParameterMap(req);
			_transPagging(paramMap);
			
			String searchWord = (String) paramMap.get("searchWord");
			if(searchWord != null && searchWord.getBytes().length > 50){
				throw new ApiException("입력값을 체크 해 주세요");
			}
			
			Map resultMap = new HashMap<String,Object>();
			resultMap.putAll(kosisManageDao.searchKosisError(paramMap) );
			
			return resultMap;
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
		searchWordType, searchWord, startDate, endDate
	}
}
