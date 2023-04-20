package kostat.sop.ServiceAPI.api.mn.srvstat.mapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.RequestUtil;
//import oracle.net.aso.o;


import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: SRVStatDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月18日 下午1:50:11    
 * @version V1.0      
 *    
 */
@Component
public class SRVStatDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public Map getSRVStat1(Map paramMap){
		Map resultMap = new HashMap();
		paramMap.put("TOP3", "TOP3");
		String TIMETYPE=paramMap.get("TIMETYPE").toString();
		ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
		ArrayList<String> X_= new ArrayList<String>();
		ArrayList<Integer> Y= new ArrayList<Integer>();
		ArrayList<Integer> Y_ = new ArrayList<Integer>();
		ArrayList<Object> TOP3API=new ArrayList<Object>();

		
		//방문자수 이용테이블 SRV_DT_PAGEHOURLYSTAT	
		//select NVL(SUM(HOURLY_CALL_CNT),0) from SRV_DT_PAGEHOURLYSTAT
		int totalPageVist = (int) getSqlSession().selectOne("SRVStat.getTotalPageVist",paramMap);		
		//신규 가입자수 이용테이블 SRV_DT_MEMBERINFO
		//select NVL(COUNT(*),0) as count from SRV_DT_MEMBERINFO where 	REG_TS is not NULL
		int totalAccrueMember=(int) getSqlSession().selectOne("SRVStat.getTotalAccrueMember",paramMap);	//신규가입자수
		//기간별 방문자수 이용테이블 SRV_DT_PAGEHOURLYSTAT
		//select NVL(SUM(HOURLY_CALL_CNT),0)as count from SRV_DT_PAGEHOURLYSTAT
		int totalMainVist= (int) getSqlSession().selectOne("SRVStat.getTotalMainVist1", paramMap);		//기간별 방문자수 
		
		//뭔지 모르겠음
		//select NVL(ACC_CNT,0) as ACC_CNT from SRV_DT_ACCRUE where ACCRUE_STAT_ID	= '1000'
		int totalAccrueVist=(int) getSqlSession().selectOne("SRVStat.getTotalAccrueVist1");
		
		//.....
		List top3PAGE=getSqlSession().selectList("SRVStat.getPageVisitInfo",paramMap);
		List resultList=getSqlSession().selectList("SRVStat.getSRVStat1",paramMap);
		//
		RequestUtil.getHighChartData(X_, Y_, resultList, TIMETYPE);
		//
		RequestUtil.transHighCharData(X, X_, Y, Y_, TIMETYPE);
		//
		int day = 0;
		int averageVist =0;
		String TIMETYPE_ = paramMap.get("TIMETYPE").toString(); 
		if("MONTHLY".equals(TIMETYPE_))
		{
			String strtDate = paramMap.get("STARTDATE").toString();
			String endDate = paramMap.get("ENDDATE").toString();
			int strtYear = Integer.parseInt(strtDate.substring(0,4));
			int strtMonth = Integer.parseInt(strtDate.substring(4,6));

			int endYear = Integer.parseInt(endDate.substring(0,4));
			int endMonth = Integer.parseInt(endDate.substring(4,6));

			int month = (endYear - strtYear)* 12 + (endMonth - strtMonth);
			averageVist = totalMainVist/month;
		}else{
			String start = paramMap.get("STARTD").toString();
			String end = paramMap.get("ENDD").toString();

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			try {
				Date beginDate = formatter.parse(start);
				Date endDate = formatter.parse(end);

				// 시간차이를 시간,분,초를 곱한 값으로 나누면 하루 단위가 나옴
				long diff = endDate.getTime() - beginDate.getTime();
				long diffDays = diff / (24 * 60 * 60 * 1000);
				day = (int) diffDays;
				averageVist = totalMainVist/(day+1);
				logger.debug("날짜차이=" + day);
			} catch (ParseException e) {
				logger.debug("날짜 파싱 중 에러가 발생하였습니다.");
			}
			
		}


		logger.debug("====================" + averageVist + "//////////"+totalMainVist);
		/*Date START = (Date) paramMap.get("STARTDATE");
		Date END = (Date) paramMap.get("ENDDATE");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH");
		long temp = END.getTime()-START.getTime();
		int days=(int) ((temp/3600000+1)/24);
		 */
		//		int averageVist = totalMainVist/(days+1);
		//

		int top3Count=0;
		if(top3PAGE.size()>0){
			for (Object object : top3PAGE) {
				Map result=(Map) object;
				top3Count+=Integer.parseInt(result.get("CALL_CNT").toString());
				ArrayList<Object> array= new ArrayList<Object>();
				array.add(result.get("HPAGE_NM").toString());
				array.add(result.get("CALL_CNT").toString());
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
		//logger.debug("데이터==========="+TOP3API+"");
		resultMap.put("X", X);
		resultMap.put("Y", Y);
		resultMap.put("totalPageVist", totalPageVist);
		resultMap.put("totalAccrueMember", totalAccrueMember);
		resultMap.put("totalMainVist", totalMainVist);
		resultMap.put("totalAccrueVist", totalAccrueVist);
		resultMap.put("averageVist", averageVist);
		resultMap.put("top3PAGE", TOP3API);
		return resultMap;
	}

	public Map getSRVStat(Map paramMap){
		Map resultMap = new HashMap();
		paramMap.put("TOP3", "TOP3");
		String TIMETYPE=paramMap.get("TIMETYPE").toString();
		ArrayList<String> X=(ArrayList<String>) paramMap.get("X");
		ArrayList<String> X_= new ArrayList<String>();
		ArrayList<Integer> Y= new ArrayList<Integer>();
		ArrayList<Integer> Y_ = new ArrayList<Integer>();
		ArrayList<Object> TOP3API=new ArrayList<Object>();
		int totalPageVist = (int) getSqlSession().selectOne("SRVStat.getTotalPageVist",paramMap);
		int totalAccrueMember=(int) getSqlSession().selectOne("SRVStat.getTotalAccrueMember",paramMap);
		int totalMainVist= (int) getSqlSession().selectOne("SRVStat.getTotalMainVist1", paramMap);
		int totalAccrueVist=(int) getSqlSession().selectOne("SRVStat.getTotalAccrueVist");

		List top3PAGE=getSqlSession().selectList("SRVStat.getPageVisitInfo",paramMap);
		
		
		
		List resultList=getSqlSession().selectList("SRVStat.getSRVStat",paramMap);
		
		//
		for (Object object : resultList) {	
			Map result = (Map) object;
			int callCount = Integer.parseInt(result.get("CALL_CNT").toString());
		}
		RequestUtil.getHighChartData(X_, Y_, resultList, TIMETYPE);
		//
		RequestUtil.transHighCharData(X, X_, Y, Y_, TIMETYPE);
		//
		int day = 0;
		int averageVist =0;
		String TIMETYPE_ = paramMap.get("TIMETYPE").toString(); 
		if("MONTHLY".equals(TIMETYPE_))
		{
			String strtDate = paramMap.get("STARTDATE").toString();
			String endDate = paramMap.get("ENDDATE").toString();
			int strtYear = Integer.parseInt(strtDate.substring(0,4));
			int strtMonth = Integer.parseInt(strtDate.substring(4,6));

			int endYear = Integer.parseInt(endDate.substring(0,4));
			int endMonth = Integer.parseInt(endDate.substring(4,6));

			int month = (endYear - strtYear)* 12 + (endMonth - strtMonth);
			averageVist = totalMainVist/month;
		}else{
			String start = paramMap.get("STARTD").toString();
			String end = paramMap.get("ENDD").toString();

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			try {
				Date beginDate = formatter.parse(start);
				Date endDate = formatter.parse(end);

				// 시간차이를 시간,분,초를 곱한 값으로 나누면 하루 단위가 나옴
				long diff = endDate.getTime() - beginDate.getTime();
				long diffDays = diff / (24 * 60 * 60 * 1000);
				day = (int) diffDays;
				logger.debug("날짜차이=" + day);
			} catch (ParseException e) {
				logger.debug("날짜 파싱 중 에러가 발생하였습니다.");
			}
			averageVist = totalMainVist/(day+1);
		}
		//
		int top3Count=0;
		if(top3PAGE.size()>0){
			for (Object object : top3PAGE) {
				Map result=(Map) object;
				top3Count+=Integer.parseInt(result.get("CALL_CNT").toString());
				ArrayList<Object> array= new ArrayList<Object>();
				array.add(result.get("HPAGE_NM").toString());
				array.add(result.get("CALL_CNT").toString());
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
		//logger.debug("데이터==========="+TOP3API+"");
		resultMap.put("X", X);
		resultMap.put("Y", Y);
		resultMap.put("totalPageVist", totalPageVist);
		resultMap.put("totalAccrueMember", totalAccrueMember);
		resultMap.put("totalMainVist", totalMainVist);
		resultMap.put("totalAccrueVist", totalAccrueVist);
		resultMap.put("averageVist", averageVist);
		resultMap.put("top3PAGE", TOP3API);
		return resultMap;
	}
	public List getSRVStatDetail(Map paramMap) {
		List resultList=getSqlSession().selectList("SRVStat.getPageVisitInfo",paramMap);
		int totalCount=0;
		for (Object object : resultList) {
			Map result = (Map) object;
			totalCount+=Integer.parseInt(result.get("CALL_CNT").toString());
		}
		for (Object object : resultList) {
			Map result = (Map) object;
			float CALL_CNT=Float.parseFloat(result.get("CALL_CNT").toString());
			float percent=(CALL_CNT/totalCount)*100;
			result.put("PERCENT",String.format("%.2f", percent)+"%");
		}
		return resultList;
	}
	public Map searchMember(Map paramMap) {	
		Map resultMap = new HashMap();

		resultMap.put("total", getSqlSession().selectList("SRVStat.searchMemberCount",paramMap));
		resultMap.put("rows", getSqlSession().selectList("SRVStat.searchMember",paramMap));
		return resultMap;
	}

	public Map searchMemberValue(Map paramMap){
		Map resultMap = new HashMap();
		Map resultMapTag = new HashMap();
		String TIMETYPE=paramMap.get("TIMETYPE").toString();
		ArrayList<String> X_= new ArrayList<String>();
		ArrayList<Integer> Y_= new ArrayList<Integer>();
		int datTotalVist = (int) getSqlSession().selectOne("SRVStat.selectMemberTotal",paramMap);
		List resultList=getSqlSession().selectList("SRVStat.selectMemberValue",paramMap);
		int totalMainVist= (int) getSqlSession().selectOne("SRVStat.getMembervisitCnt", paramMap);

		RequestUtil.getHighChartData1(X_, Y_, resultList, TIMETYPE);
		
		int averageVist =0;
		int day=0;
		String TIMETYPE_ = paramMap.get("TIMETYPE").toString(); 
		if("MONTHLY".equals(TIMETYPE_))
		{
			String strtDate = paramMap.get("STARTDATE").toString();
			String endDate = paramMap.get("ENDDATE").toString();
			int strtYear = Integer.parseInt(strtDate.substring(0,4));
			int strtMonth = Integer.parseInt(strtDate.substring(4,6));

			int endYear = Integer.parseInt(endDate.substring(0,4));
			int endMonth = Integer.parseInt(endDate.substring(4,6));

			int month = (endYear - strtYear)* 12 + (endMonth - strtMonth);
			averageVist = totalMainVist/month;
		}else{
			String start = paramMap.get("STARTD").toString();
			String end = paramMap.get("ENDD").toString();

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			try {
				Date beginDate = formatter.parse(start);
				Date endDate = formatter.parse(end);

				// 시간차이를 시간,분,초를 곱한 값으로 나누면 하루 단위가 나옴
				long diff = endDate.getTime() - beginDate.getTime();
				long diffDays = diff / (24 * 60 * 60 * 1000);
				day = (int) diffDays;
				averageVist = totalMainVist/(day+1);
				logger.debug("날짜차이=" + day);
			} catch (ParseException e) {
				logger.debug("날짜 파싱 중 에러가 발생하였습니다.");
			}
			
		}

		resultMap.put("averageVist", averageVist+"");
		resultMap.put("total",getSqlSession().selectList("SRVStat.getMembervisitCnt",paramMap));
		resultMap.put("X", X_);
		resultMap.put("Y", Y_);

		return resultMap;
	}
}
