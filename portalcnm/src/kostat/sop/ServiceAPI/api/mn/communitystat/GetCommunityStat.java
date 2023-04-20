package kostat.sop.ServiceAPI.api.mn.communitystat;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.mn.communitystat.mapper.CommunityStatDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GetAllCommunityList
 * @Description： 
 *
 * @author kwangheum   
 * @date：2016年06月27日 下午4:42:04    
 * @version V1.0      
 *   
 */
public class GetCommunityStat extends AbsAuth<HashMap<String,Object>> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetCommunityStat.class);
	
	@Resource
	private CommunityStatDao communityStatDao;
	@Override
	public String getApiId() {
		return "communitystat_getcommunitystat";
	}
	
	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		return "조회";
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		SqlSession session  = null;
		try {
			Map<?,?> paramMap = getParameterMap(req);
			return communityStatDao.getSymbolDateStat(paramMap);
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
		finally{
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}
	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum OptionParam{
	}
	private enum MustParam{
		CMMNTY_MAP_ID,
		TIMETYPE,
		STARTDATE,
		ENDDATE
	}

}
