package kostat.sop.ServiceAPI.api.mn.apistat.mapper;

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
 * @ClassName: APIHourlyStatDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月14日 下午2:06:18    
 * @version V1.0      
 *    
 */
@Component
public class APIStatDao extends SqlSessionDaoSupport  {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	
	public Map getAPIStat(Map paramMap){
		Map resultMap= new HashMap();
		ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
		List resultList=getSqlSession().selectList("APIStat.getStat", paramMap);
		List top3API=getSqlSession().selectList("APIStat.getTOP3API", paramMap);
		List top3Service=getSqlSession().selectList("APIStat.getTOP3SERVICE", paramMap);
		List top3Error=getSqlSession().selectList("APIStat.getTOP3ERROR", paramMap);
		ArrayList<String> X_=new ArrayList<String>();
		ArrayList<Integer> Y_=new ArrayList<Integer>();
		ArrayList<Integer> Y=new ArrayList<Integer>();
		ArrayList<Object> TOP3API=new ArrayList<Object>();
		ArrayList<Object> TOP3SERVICE=new ArrayList<Object>();
		ArrayList<Object> TOP3ERROR=new ArrayList<Object>();
		int totalCount=0,errorCount=0,top3Count=0,top3ServiceCount=0,top3ErrorCount=0;		
		String TIMETYPE=paramMap.get("TIMETYPE").toString().trim();
		RequestUtil.getHighChartData(X_, Y_, resultList, TIMETYPE);
		RequestUtil.transHighCharData(X, X_, Y, Y_, TIMETYPE);
		for (Object object : resultList) {
			Map result=(Map) object;
			totalCount+=Integer.parseInt(result.get("CALL_CNT").toString());
			errorCount+=Integer.parseInt(result.get("FAIL_CNT").toString());
		}	
		if(top3API.size()>0){
			for (Object object : top3API) {
				Map result=(Map) object;
				top3Count+=Integer.parseInt(result.get("HOURLY_CALL_CNT").toString());
				ArrayList<Object> array= new ArrayList<Object>();
				array.add(result.get("API_NM").toString());
				array.add(result.get("HOURLY_CALL_CNT").toString());
				TOP3API.add(array);
			}
			for (Object object : TOP3API) {
				ArrayList<Object> array= (ArrayList<Object>) object;
				float CALL_CNT=Float.parseFloat(array.get(1).toString());
				array.remove(1);
				float percent=(CALL_CNT/top3Count)*100;
				array.add(Float.parseFloat(String.format("%.2f", percent)));
			}
		}
		
		//
		if(top3Service.size()>0){
			for (Object object : top3Service) {
				Map result=(Map) object;
				top3ServiceCount+=Integer.parseInt(result.get("HOURLY_CALL_CNT").toString());
				ArrayList<Object> array= new ArrayList<Object>();
				array.add(result.get("SRV_NM").toString());
				array.add(result.get("HOURLY_CALL_CNT").toString());
				TOP3SERVICE.add(array);
			}
			for (Object object : TOP3SERVICE) {
				ArrayList<Object> array= (ArrayList<Object>) object;
				float CALL_CNT=Float.parseFloat(array.get(1).toString());
				float percent=(CALL_CNT/top3ServiceCount)*100;
				array.remove(1);
				array.add(Float.parseFloat(String.format("%.2f", percent)));
			}
		}
		
		//
		if(top3Error.size()>0){
			for (Object object : top3Error) {
				Map result=(Map) object;
				top3ErrorCount+=Integer.parseInt(result.get("FAIL_CNT").toString());
				ArrayList<Object> array= new ArrayList<Object>();
				array.add(result.get("API_NM").toString());
				array.add(result.get("FAIL_CNT").toString());
				TOP3ERROR.add(array);
			}
			for (Object object : TOP3ERROR) {
				ArrayList<Object> array= (ArrayList<Object>) object;
				float FAIL_CNT=Float.parseFloat(array.get(1).toString());
				array.remove(1);
				float percent=(FAIL_CNT/top3ErrorCount)*100;
				array.add(Float.parseFloat(String.format("%.2f", percent)));
			}
		}

		resultMap.put("X",X);
		resultMap.put("Y",Y);
		resultMap.put("totalCount",totalCount);
		resultMap.put("errorCount",errorCount);
		resultMap.put("top3API", TOP3API);
		resultMap.put("top3SERVICE", TOP3SERVICE);
		resultMap.put("top3Error", TOP3ERROR);
		
		resultMap.put("rowTop3Api", top3API);
		resultMap.put("rowTop3SERVICE", top3Service);
		resultMap.put("rowTop3Error", top3Error);
		
		resultMap.put("timeType",TIMETYPE);
				
		return resultMap;
	}
	
	public Map searchAPI(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("ROWS", getSqlSession().selectList("APIStat.searchAPIList",paramMap));
		resultMap.put("TOTAL", getSqlSession().selectOne("APIStat.searchAPICount",paramMap));
		return resultMap;
	}
	
	public Map getSeriesData(Map paramMap){
		
		//api_id별로 select를 50회 이상 하여 속도저하 현상이 발생했었음.
		//한번에 조회하도록 변경함. leekh 20190611
		Map resultMap= new HashMap();
		ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
		String TIMETYPE=paramMap.get("TIMETYPE").toString().trim();
		List seriesList = new ArrayList();
		List B_M_List = getSqlSession().selectList("APIStat.getAPI",paramMap);
		
		List resultList= getSqlSession().selectList("APIStat.getSeriesData", paramMap);

		for(int i = 0;i<B_M_List.size();i++){
			System.out.println("i : " + i);
			Map apiMap =  (Map) B_M_List.get(i);
			paramMap.put("API_ID", (String)apiMap.get("API_ID"));
			Map temp = new HashMap();
			
			List resultList2 = new ArrayList();
			for(int j=0; j<resultList.size(); j++){
				Map rst = (Map)resultList.get(j);
				if(apiMap.get("API_ID").toString().equals(rst.get("API_ID").toString())){
					resultList2.add(rst);
				}
			}
			
			ArrayList<String> X_=new ArrayList<String>();
			ArrayList<Integer> Y=new ArrayList<Integer>();
			ArrayList<Integer> Y_=new ArrayList<Integer>();
			RequestUtil.getHighChartData(X_, Y_, resultList2, TIMETYPE);
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
	}
	
	/*
	public Map getSeriesData(Map paramMap){
		Map resultMap= new HashMap();
		ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
		String TIMETYPE=paramMap.get("TIMETYPE").toString().trim();
		List seriesList = new ArrayList();
		List B_M_List =getSqlSession().selectList("Common.getAPIMClassList",paramMap);
		for(int i = 0;i<B_M_List.size();i++){
			Map map = (Map) B_M_List.get(i);
			if(paramMap.get("API_B_CLASS_CD")!=null)
				paramMap.remove("API_B_CLASS_CD");
			paramMap.put("API_B_CLASS_CD",map.get("API_B_CLASS_CD").toString());
			paramMap.put("API_M_CLASS_CD",map.get("API_M_CLASS_CD").toString());
			Map temp = new HashMap();
			List resultList=getSqlSession().selectList("APIStat.getSeriesData", paramMap);
			ArrayList<String> X_=new ArrayList<String>();
			ArrayList<Integer> Y=new ArrayList<Integer>();
			ArrayList<Integer> Y_=new ArrayList<Integer>();
			RequestUtil.getHighChartData(X_, Y_, resultList, TIMETYPE);
			RequestUtil.transHighCharData(X, X_, Y, Y_, TIMETYPE);
			temp.put("name", map.get("API_M_CLASS_NM").toString());
			temp.put("data", Y);
			temp.put("id", map.get("API_B_CLASS_CD").toString()+map.get("API_M_CLASS_CD").toString());
			seriesList.add(temp);
			paramMap.remove("API_B_CLASS_CD");
			paramMap.remove("API_M_CLASS_CD");
		}
		resultMap.put("X", X);
		resultMap.put("Y", seriesList);
		return resultMap;
	}
	*/

}
