package kostat.sop.ServiceAPI.api.mn.srvstat;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.mn.srvstat.mapper.SRVStatDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SRVStatDetail
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月18日 下午9:10:45    
 * @version V1.0      
 *     
 */
public class SRVStatDetail extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SRVStatDetail.class);
	@Resource
	private SRVStatDao srvStatDao;
	@Override
	public String getApiId() {
		return "srvstat_srvstatdetail";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		SqlSession session  = null;
		try {
			Map paramMap= getParameterMap(req);

			String TIMETYPE = paramMap.get("TIMETYPE").toString();
			String STARTDATE = paramMap.get("STARTDATE").toString();
			String ENDDATE = paramMap.get("ENDDATE").toString();
			switch (TIMETYPE) {
			case "DAILY":
				STARTDATE = STARTDATE.substring(0,4) + STARTDATE.substring(5,7) + STARTDATE.substring(8,10); 
				ENDDATE = ENDDATE.substring(0,4) + ENDDATE.substring(5,7) + ENDDATE.substring(8,10); 
				break;
			case "MONTHLY":
				STARTDATE = STARTDATE.substring(0,4) + STARTDATE.substring(5,7); 
				ENDDATE = ENDDATE.substring(0,4) + ENDDATE.substring(5,7); 
				break;
			default:
				break;
			}
			RequestUtil.transSearchDate(paramMap);
			//
			paramMap.put("STARTDATE", STARTDATE);
			paramMap.put("ENDDATE", ENDDATE);
			
			session = getSqlSessionFactory().openSession();
			Map resultMap= new HashMap();
			ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
			TIMETYPE=paramMap.get("TIMETYPE").toString().trim();
			List seriesList = new ArrayList();
			//List B_M_List = session.selectList("SRVStat.getPageInfo",paramMap);
			//for(int i=0; i<B_M_List.size(); i++){
				//Map apiMap =  new HashMap();
				//apiMap = (Map) B_M_List.get(i);
				//paramMap.put("HPAGE_DEV", (String)apiMap.get("HPAGE"));
				List resultList= session.selectList("SRVStat.getSeriesData", paramMap);
				//logger.debug(paramMap.get("HPAGE")+"/......................");
				Map temp = new HashMap();
				ArrayList<String> X_=new ArrayList<String>();
				ArrayList<Integer> Y=new ArrayList<Integer>();
				ArrayList<Integer> Y_=new ArrayList<Integer>();
				RequestUtil.getHighChartData(X_, Y_, resultList, TIMETYPE);
				RequestUtil.transHighCharData(X, X_, Y, Y_, TIMETYPE);
				
				Map apiMap = (Map) resultList.get(0);
				
				temp.put("name",(String)apiMap.get("S_CLASS_NM"));
				temp.put("data", Y);
				temp.put("selected", true);
				temp.put("id", (String)apiMap.get("CLASS_NM"));
				seriesList.add(temp);
			//}
				resultMap.put("X", X);
				resultMap.put("Y", seriesList);
				return resultMap;
		}   catch (AbsAPIException e) {
			logger.error(e);
			throw e;
			
		} catch (IndexOutOfBoundsException e) {
			logger.error(e);
			throw new ApiException("데이터가 존재하지 않습니다.");
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
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}
	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}
	private enum MustParam{
		TIMETYPE,STARTDATE,ENDDATE,USR_LOG_B_CD,USR_LOG_S_CD
	}
}
