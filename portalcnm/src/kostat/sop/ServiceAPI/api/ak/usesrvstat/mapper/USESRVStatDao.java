package kostat.sop.ServiceAPI.api.ak.usesrvstat.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.RequestUtil;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: UseSRVStatDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月19日 下午3:35:56    
 * @version V1.0      
 *    
 */
@Component
public class USESRVStatDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map getUSESRVStat(Map paramMap) {
		Map resultMap = new HashMap();
		String TIMETYPE=paramMap.get("TIMETYPE").toString();
		ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
		ArrayList<String> X_= new ArrayList<String>();
		ArrayList<Integer> Y= new ArrayList<Integer>();
		ArrayList<Integer> Y_ = new ArrayList<Integer>();
		List<Map> resultList = getSqlSession().selectList("USESRVStat.getUSESRVStat",paramMap);
		if(resultList.size()>0){
			for (Map map : resultList) {
				int callCount =Integer.parseInt(map.get("CALL_CNT").toString());
				X_.add(map.get("CALL_TS").toString().substring(5,7)+"월");
				Y_.add(callCount);
			}
		}
		//转换数据
		RequestUtil.transHighCharData(X, X_, Y, Y_, TIMETYPE);
		resultMap.put("X", X);
		resultMap.put("Y", Y);
		return resultMap;
	}
	public Map getUSESRVSumStat() {
		Map resultMap=new HashMap();
		int accrueSum = 0,accrueUseSum = 0,accrueTestSum = 0;
		int lastMonthSum = 0,lastMonthUseSum = 0,lastMonthTestSum = 0;
		int thisMonthSum = 0,thisMonthUseSum = 0,thisMonthTestSum = 0;
		int staySum = 0,stayUseSum = 0,stayTestSum = 0;
		
		List accrueList = getSqlSession().selectList("USESRVStat.getAccrueSum");
		List lastMonthList = getSqlSession().selectList("USESRVStat.getLastMonthSum");
		List thisMonthList = getSqlSession().selectList("USESRVStat.getThisMonthSum");
		List stayList = getSqlSession().selectList("USESRVStat.getStaySum");
		
		if(accrueList != null && accrueList.size() > 0){
			for (Object object : accrueList) {
				Map accrueMap = (Map) object;
				if(accrueMap.get("API_AUTH_KEY_TYPE")!=null && accrueMap.get("API_AUTH_KEY_TYPE").toString().equals("USE"))
					accrueUseSum = Integer.parseInt(accrueMap.get("CNT").toString());
				else if(accrueMap.get("API_AUTH_KEY_TYPE")!=null && accrueMap.get("API_AUTH_KEY_TYPE").toString().equals("TEST"))
					accrueTestSum = Integer.parseInt(accrueMap.get("CNT").toString());
			}
			accrueSum = accrueUseSum + accrueTestSum;
		}

		if(lastMonthList != null && lastMonthList.size() > 0){
			for (Object object : lastMonthList) {
			Map lastMonthMap = (Map) object;
			if(lastMonthMap.get("API_AUTH_KEY_TYPE")!=null && lastMonthMap.get("API_AUTH_KEY_TYPE").toString().equals("USE"))
				lastMonthUseSum = Integer.parseInt(lastMonthMap.get("CNT").toString());
			else if(lastMonthMap.get("API_AUTH_KEY_TYPE")!=null && lastMonthMap.get("API_AUTH_KEY_TYPE").toString().equals("TEST"))
				lastMonthTestSum = Integer.parseInt(lastMonthMap.get("CNT").toString());
			}
			lastMonthSum = lastMonthUseSum + lastMonthTestSum;
		}
		if(thisMonthList != null && thisMonthList.size() > 0){
			for (Object object : thisMonthList) {
			Map thisMonthMap = (Map) object;
			if(thisMonthMap.get("API_AUTH_KEY_TYPE")!=null && thisMonthMap.get("API_AUTH_KEY_TYPE").toString().equals("USE"))
				thisMonthUseSum = Integer.parseInt(thisMonthMap.get("CNT").toString());
			else if(thisMonthMap.get("API_AUTH_KEY_TYPE")!=null && thisMonthMap.get("API_AUTH_KEY_TYPE").toString().equals("TEST"))
				thisMonthTestSum = Integer.parseInt(thisMonthMap.get("CNT").toString());
			}
			thisMonthSum = thisMonthUseSum + thisMonthTestSum;
		}
		if(stayList != null && stayList.size() > 0){
			for (Object object : stayList) {
			Map stayMap = (Map) object;
			if(stayMap.get("API_AUTH_KEY_TYPE")!=null && stayMap.get("API_AUTH_KEY_TYPE").toString().equals("USE"))
				stayUseSum = Integer.parseInt(stayMap.get("CNT").toString());
			else if(stayMap.get("API_AUTH_KEY_TYPE")!=null && stayMap.get("API_AUTH_KEY_TYPE").toString().equals("TEST"))
				stayTestSum = Integer.parseInt(stayMap.get("CNT").toString());
			}
			staySum = stayUseSum + stayTestSum;
		}
		
		resultMap.put("accrueSum",accrueSum);
		resultMap.put("lastMonthSum",lastMonthSum);
		resultMap.put("thisMonthSum",thisMonthSum);
		resultMap.put("staySum",staySum);
		
		resultMap.put("accrueUseSum",accrueUseSum);
		resultMap.put("lastMonthUseSum",lastMonthUseSum);
		resultMap.put("thisMonthUseSum",thisMonthUseSum);
		resultMap.put("stayUseSum",stayUseSum);
		
		resultMap.put("accrueTestSum",accrueTestSum);
		resultMap.put("lastMonthTestSum",lastMonthTestSum);
		resultMap.put("thisMonthTestSum", thisMonthTestSum);
		resultMap.put("stayTestSum", stayTestSum);
		
		return resultMap;
	}
}
