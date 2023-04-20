package kostat.sop.ServiceAPI.api.mn.apistat;

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

import kostat.sop.ServiceAPI.api.mn.apistat.mapper.APIStatDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GetLines
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月15日 下午4:42:04    
 * @version V1.0      
 *   
 */
public class GetSeriesData extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetSeriesData.class);
	
	@Resource
	private APIStatDao apiStatDao;
	@Override
	public String getApiId() {
		return "apistatdetail_getseriesdata";
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
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		SqlSession session  = null;
		try {
			Map paramMap=getParameterMap(req);
			RequestUtil.transSearchDate(paramMap);
			return apiStatDao.getSeriesData(paramMap);
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
		
		/*try {
			Map paramMap=getParameterMap(req);
			RequestUtil.transSearchDate(paramMap);
			//return apiStatDao.getSeriesData(paramMap);
			session = getSqlSessionFactory().openSession();
			Map resultMap= new HashMap();
			ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
			String TIMETYPE=paramMap.get("TIMETYPE").toString().trim();
			List seriesList = new ArrayList();
//			List B_M_List = session.selectList("Common.getAPIMClassList",paramMap);
			List B_M_List = session.selectList("APIStat.getAPI",paramMap);
			for(int i = 0;i<B_M_List.size();i++){
				Map apiMap =  (Map) B_M_List.get(i);
				paramMap.put("API_ID", (String)apiMap.get("API_ID"));
				Map temp = new HashMap();
				List resultList= session.selectList("APIStat.getSeriesData", paramMap);
				ArrayList<String> X_=new ArrayList<String>();
				ArrayList<Integer> Y=new ArrayList<Integer>();
				ArrayList<Integer> Y_=new ArrayList<Integer>();
				RequestUtil.getHighChartData(X_, Y_, resultList, TIMETYPE);
				RequestUtil.transHighCharData(X, X_, Y, Y_, TIMETYPE);
				temp.put("name",(String)apiMap.get("API_NM"));
				temp.put("data", Y);
				temp.put("selected", true);
				temp.put("id", (String)apiMap.get("API_ID"));
				seriesList.add(temp);
			}
			resultMap.put("X", X);
			resultMap.put("Y", seriesList);
			
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
		finally{
			if (session != null) {
				session.close();
			}
		}*/
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
		API_B_CLASS_CD,SRV_ID_YN
	}
	private enum MustParam{
		TIMETYPE,STARTDATE,ENDDATE
	}

}
