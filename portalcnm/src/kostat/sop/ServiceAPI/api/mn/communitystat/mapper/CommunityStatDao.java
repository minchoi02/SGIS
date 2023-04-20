package kostat.sop.ServiceAPI.api.mn.communitystat.mapper;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

import kostat.sop.ServiceAPI.exception.ApiException;


/**   
 *
 * @ClassName: CommunityStatDao
 * @Description： 
 *
 * @author kwangheum   
 * @date：2016年05月27日 下午2:06:18    
 * @version V1.0      
 *    
 */
@Component
public class CommunityStatDao extends SqlSessionDaoSupport  {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public List<HashMap<String,Object>> getAllCommunityList(Map<?,?> paramMap) {
		return getSqlSession().selectList("CommunityStat.selectAllCmmntyList",paramMap);
	} 
	public HashMap<String,Object> getSymbolDateStat(Map<?,?> paramMap) {
		HashMap<String,Object> community = (HashMap<String,Object>)getSqlSession().selectOne("CommunityStat.selectCmmnty",paramMap);
		if(community==null){
			throw new ApiException("존재하지 않는 소통지도입니다");
		}else{
			this.transSearchDate(paramMap);
			HashMap<String,Object> resultMap = new HashMap<String,Object>();
			this.getHighchart(paramMap,community,resultMap);
			return resultMap;
		}
	}
	private void getHighchart(Map<?,?> paramMap,HashMap<String,Object> community,HashMap<String,Object> resultMap){
		HashMap<String,Object> symbol = new HashMap<String,Object>();
		
		List<HashMap<String,Object>> symbolList = getSqlSession().selectList("CommunityStat.selectSymbolList",paramMap);;
		for(HashMap<String,Object> data:symbolList){
			HashMap<String,Object> dataMap = new HashMap<String,Object>(data);
			dataMap.put("CNT", 0);
			if(community.get("REG_SYMBOL")==null){
				symbol.put(dataMap.get("CUSTOM_SYMBOL_ID").toString(), dataMap);
			}else{
				symbol.put(dataMap.get("ORDER").toString(), dataMap);
			}
		}
		resultMap.put("symbol", symbolList);
		
		List<String> categories = new ArrayList<String>();
		HashMap<String,Object> categoryMap = new HashMap<String,Object>();
		for(String data:(List<String>)paramMap.get("X")){
			categories.add(data);
			categoryMap.put(data, new HashMap<String,Object>(symbol));
		}
		resultMap.put("categories", categories);
		
		List<HashMap<String,Object>> symbolDataList = getSqlSession().selectList("CommunityStat.selectSymbolDateStat",paramMap);
		
		for(HashMap<String,Object> symbolData:symbolDataList){
			HashMap<String,Object> categorySymbol = (HashMap<String,Object>)categoryMap.get(symbolData.get("REG_DATE").toString());
			if(categorySymbol.get(symbolData.get("SYMBOL").toString())!=null){
				HashMap<String,Object> symbolMap = new HashMap<String,Object>((HashMap<String,Object>)categorySymbol.get(symbolData.get("SYMBOL").toString()));
				symbolMap.put("CNT", (int)symbolMap.get("CNT")+(int)symbolData.get("CNT"));
				categorySymbol.put(symbolData.get("SYMBOL").toString(), symbolMap);
			}
		}
		List<HashMap<String,Object>> series = new ArrayList<HashMap<String,Object>>();
		for(String key : symbol.keySet()){
			HashMap<String,Object> putData = new HashMap<String,Object>();
			HashMap<String,Object> symbolMap = (HashMap<String,Object>)symbol.get(key);
			List<Object> data = new ArrayList<Object>(); 
			for(String category:categories){
				HashMap<String,Object> categorySymbol = (HashMap<String,Object>)categoryMap.get(category);
				HashMap<String,Object> categorySymbolData = (HashMap<String,Object>)categorySymbol.get(key);
				data.add(categorySymbolData.get("CNT"));
			}
			putData.put("name", symbolMap.get("LABEL_NM"));
			putData.put("data", data);
			series.add(putData);
		}
		resultMap.put("series", series);
	}
	private void transSearchDate(Map paramMap) {
		String TIMETYPE = paramMap.get("TIMETYPE").toString();
		String STARTDATE = paramMap.get("STARTDATE").toString();
		String ENDDATE = paramMap.get("ENDDATE").toString();
		ArrayList<String> X = new ArrayList<String>();
		String formart = "";
		if (TIMETYPE.equals(null) || STARTDATE.equals(null) || ENDDATE.equals(null)) {
			throw new ApiException("서버로 전달된 정보에 오류가 있습니다.");
		}
		switch (TIMETYPE) {
		case "HOURLY":
			formart = "yyyy-MM-dd HH";
			break;
		case "DAILY":
			formart = "yyyy-MM-dd";
			break;
		case "MONTHLY":
			formart = "yyyy-MM";
			break;
		default:
			break;
		}
		SimpleDateFormat df = new SimpleDateFormat(formart);
		Calendar cal = Calendar.getInstance();
		try {
			Date START = df.parse(STARTDATE);
			Date END = df.parse(ENDDATE);
			long temp = END.getTime() - START.getTime();
			if (temp > 0) {
				switch (TIMETYPE) {
				case "DAILY":
					long days = temp / 3600000 / 24;
					if (days > 29)
						throw new ApiException("일간 30일까지 조회가능합니다. 다시 선택해 주세요.");
					else {
						cal.setTime(START);
						X.add(STARTDATE);
						for (int i = 0; i < days; i++) {
							cal.add(Calendar.DATE, 1);
							X.add(df.format(cal.getTime()));
						}
						cal.setTime(END);
						cal.add(Calendar.DATE, 1);
						END = cal.getTime();

					}
					break;
				case "MONTHLY":
					cal.setTime(START);
					cal.add(Calendar.MONTH, 23);
					Date endMax = cal.getTime();
					long months = endMax.getTime() - END.getTime();
					if (months < 0)
						throw new ApiException("월간 24개월 까지 조회 가능합니다. 다시 선택해 주세요.");
					else {
						cal.setTime(START);
						X.add(STARTDATE);
						while ((END.getTime() - cal.getTime().getTime()) != 0) {
							cal.add(Calendar.MONTH, 1);
							X.add(df.format(cal.getTime()));
						}
						cal.setTime(END);
						cal.add(Calendar.MONTH, 1);
						END = cal.getTime();
					}
					break;
				default:
					throw new ApiException("선택된 날짜 타입이 없습니다. 시간, 일간 또는 월간을 다시 선택해 주세요.");
				}
			} else {
				throw new ApiException("잘못된 기간입니다. 날짜를 확인한 다음 다시 선택해 주세요.");
			}
		} catch (ApiException e) {
			throw (e);
		} catch (Exception e) {
			logger.error(e);
		}
		paramMap.put("X", X);

	}
}
