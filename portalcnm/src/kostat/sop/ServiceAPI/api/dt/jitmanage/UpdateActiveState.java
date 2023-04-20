package kostat.sop.ServiceAPI.api.dt.jitmanage;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.jitmanage.mapper.JITManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: UpdateActiveState
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月23日 上午10:18:12    
 * @version V1.0      
 *    
 */
public class UpdateActiveState extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateActiveState.class);
	@Resource
	private JITManageDao jitManageDao;
	@Override
	public String getApiId() {
		return "jitmanage_updateactive";
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
			String[] API_B_CLASS_CD_List = paramMap.get("API_B_CLASS_CD_List").toString().split(",");
			String[] API_M_CLASS_CD_List = paramMap.get("API_M_CLASS_CD_List").toString().split(",");
			String[] SEQ_List = paramMap.get("SEQ_List").toString().split(",");
			String[] ACTIVE_YN_List = paramMap.get("ACTIVE_YN_List").toString().split(",");
			for(int i=0;i<API_B_CLASS_CD_List.length;i++){
				Map map = new HashMap();
				map.put("API_B_CLASS_CD", API_B_CLASS_CD_List[i]);
				map.put("API_M_CLASS_CD", API_M_CLASS_CD_List[i]);
				map.put("SEQ", SEQ_List[i]);
				String ACTIVE_YN = ACTIVE_YN_List[i];
				if(!ACTIVE_YN.equals("Y") && !ACTIVE_YN.equals("N"))
					throw new ApiException("입력값을 체크 해 주세요");
				map.put("ACTIVE_YN",ACTIVE_YN);
				map.put("MEMBER_ID", getSession(req, "manager_id"));
				jitManageDao.updateActiveState(map);
			}
			return new Success(true,Prompt.UPDATESUCCESS);
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
		API_B_CLASS_CD_List,API_M_CLASS_CD_List,SEQ_List,ACTIVE_YN_List
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}

}
