package kostat.sop.ServiceAPI.api.mb.member;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;

import kostat.sop.ServiceAPI.api.mb.member.mapper.MemberDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SearchMamber
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月28日 下午3:19:08    
 * @version V1.0      
 *   
 */
public class SearchMember extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchMember.class);
	@Resource
	private MemberDao memberDao;
	@Override
	public String getApiId() {
		return "member_search";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			String MANAGER_ID= req.getSession().getAttribute("manager_id").toString();
			paramMap.put("MANAGER_ID", MANAGER_ID);
			String MEMBER_NM = (String) paramMap.get("MEMBER_NM");
			if(MEMBER_NM != null && MEMBER_NM.getBytes().length > 100)
				throw new ApiException("입력값을 체크 해 주세요");
			_transPagging(paramMap);
			
			String accessIp = req.getRemoteAddr();
			
			return memberDao.searchMember(paramMap, accessIp);
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
	private enum OptionParam{
		MEMBER_ID,MEMBER_NM,MEMBER_GRADE
	}
	private enum MustParam{
		order,sort,page,rows
	}
}
