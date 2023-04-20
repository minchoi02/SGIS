package kostat.sop.ServiceAPI.api.catchmentArea;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class CorrelationAnalysis extends AbsQuery<ArrayList<Double>>{

	private static final Log logger = LogFactory.getLog( CorrelationAnalysis.class );

	static private final String GRID_LV = "1k";
	
	//@Resource( name = "srvArea_security_mode" )
	private String SECURITY_MODE = "NONE";
	
	@Override
	public String getApiId()
	{
		return "API_202094";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.POST;
	}

	@Override
	public ArrayList<Double> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{

		httpSession = req.getSession();
		Map mapParameter = getParameterMap( req );

		HashMap<String, Object> resultMap = new HashMap<>();
		// 계획
		
		// 1. 모든 조건들을 받아온다. 배열로 받아오자. 
		List<HashMap<String, Object>> conditionList = null;
		String json_str = (String)mapParameter.get("json_data");
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES,true);
		
		List<String> gridCdList = null;
		ArrayList<String> statsList = new ArrayList<String>();
		ArrayList<String> statsKeyList = new ArrayList<String>();
		ArrayList<LinkedList<HashMap<String, Object>>> allLists = new ArrayList<LinkedList<HashMap<String,Object>>>();
		
		try {
			conditionList = mapper.readValue(json_str, new TypeReference<ArrayList<HashMap<String, Object>>>(){});
			
			gridCdList = session.selectList("catchmentArea.selectIntersectGridCd", conditionList.get(0));
			
			for(HashMap<String, Object> item : conditionList) {
				optimizeParameterMap(item, statsKeyList);
				statsList.add((String)item.get("itemLbl"));
			}
			
		} catch (IOException e) {
			logger.error(e);
			throw new ApiException(e);
		}
		
		
		for(int i = 0 ; i < conditionList.size() ; i++) {
			HashMap<String, Object> param = conditionList.get(i);
			List<HashMap<String, Object>> result = null;
			if(("pops").equals(param.get("statType"))) {//인구
				result = session.selectList( "catchmentArea.selectGridSrvAreaGridPopsList", param );
			}else if(("family").equals(param.get("statType"))) {//가구
				result = session.selectList( "catchmentArea.selectGridSrvAreaGridFamilyList", param );
			}else if(("house").equals(param.get("statType"))) {//주택
				result = session.selectList( "catchmentArea.selectGridSrvAreaGridHouseList", param );
			}else if(("copr").equals(param.get("statType"))) {//사업체 종사자
				result = session.selectList( "catchmentArea.selectGridSrvAreaGridCoprList", param );
			}else {//공시지가
				result = session.selectList( "catchmentArea.selectGridSrvAreaGridOlnlpList", param );
			}
			
			allLists.add(new LinkedList<HashMap<String, Object>>(result));
			
		}
		
		/*
		for (LinkedList<HashMap<String, Object>> item : allLists) {
			System.out.println(item);
		}
		*/
		for(int i = 0 ; i < conditionList.size() ; i++) {
			normalizeList(allLists.get(i), statsKeyList.get(i));
		}
		/*
		for (LinkedList<HashMap<String, Object>> item : allLists) {
			System.out.println(item);
		}
		*/
		coverEmptyData(gridCdList, allLists);
		
		/*
		for (LinkedList<HashMap<String, Object>> item : allLists) {
			System.out.println(item);
		}
		*/
		ArrayList<double[]> doubleList = new ArrayList<double[]>();
		
		for(int j = 0 ; j <  conditionList.size() ; j++) {
			doubleList.add(getValueArray(allLists.get(j)));
			
			// 필요없는 코드
			//System.out.println(Arrays.toString(doubleList.get(j)));
		}
		
		PearsonsCorrelation corr = new PearsonsCorrelation();
		ArrayList<HashMap<String, Double>> result = new ArrayList<HashMap<String,Double>>();
		
		ArrayList<Double> result2 = new ArrayList<Double>();
		
		for(int i = 0 ; i < conditionList.size() - 1 ; i++) {
			
			for (int j = i + 1 ; j < conditionList.size() ; j++) {
				//System.out.println("i: " + i + ", j: " + j );
				//System.out.println();
//				if(i == j) {
//					result.add(resultItemWithSame(statsList, i));
//					continue;
//				}
				double r = corr.correlation(doubleList.get(i), doubleList.get(j));
				result2.add(r);
				//result.add(resultItem(corr, statsList, doubleList, i, j));
			}
		}
		
		return result2;
		
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		return OptionParam.class;
	}

	protected void optimizeParameterMap( Map mapParameter, ArrayList<String> keyList)
	{
		mapParameter.put("securityGb", SECURITY_MODE);
		mapParameter.put("byYear", "N");
		// 인구
		mapParameter.put("isCharacteristicsPops", "N");
		if(mapParameter.containsKey("pops_cond")) {
			mapParameter.put("statType","pops");
			keyList.add("ppltn_cnt");
			String pops_cond = StringUtil.isNullToString(mapParameter.get("pops_cond"));			
			if(!"".equals(pops_cond)){				
				String[] splitStr = pops_cond.split("_");
				if(splitStr.length >= 3) {
					String gender = StringUtil.isNullToString(splitStr[1]);
					String ageFromCd = StringUtil.isNullToString(splitStr[2]);
					String ageToCd = "";
					if(splitStr.length >= 4) {
						ageToCd = StringUtil.isNullToString(splitStr[3]);
					}
					
					if(!"".equals(gender) && !"all".equals(gender)){
						mapParameter.put("gender", gender);
					}
					
					if(!"".equals(ageFromCd) && !"all".equals(ageFromCd)){
						mapParameter.put("ageFromCd", ageFromCd);
						if(!"".equals(ageToCd) && !ageFromCd.equals(ageToCd)) {
							mapParameter.put("ageToCd", ageToCd);
							mapParameter.put("isRangeSch", "Y");
						} else {
							mapParameter.put("isRangeSch", "N");
						}						
					}
					
					//mapParameter.put("isCharacteristicsPops", "Y");
				}				
			}								
		}
		
		// 가구
		mapParameter.put("isCharacteristicsFamily", "N");
		if(mapParameter.containsKey("family_cond")) {
			mapParameter.put("statType","family");
			keyList.add("family_cnt");
			String family_cond = StringUtil.isNullToString(mapParameter.get("family_cond"));			
			if(!"".equals(family_cond)){
				
				String[] splitStr = family_cond.split("_");				
				if(splitStr.length >= 2) {
					
					String hType = StringUtil.isNullToString(splitStr[1]);
					if(!"".equals(hType) && !"all".equals(hType)){					
						String householdType[] = hType.split(",");				
						if(householdType.length > 0) {
							mapParameter.put("household_type", householdType);
						}
					}
					//mapParameter.put("isCharacteristicsFamily", "Y");
				}				
			}								
		}		
		
		// 주택
		mapParameter.put("isCharacteristicsHouse", "N");
		if(mapParameter.containsKey("house_cond")) {
			mapParameter.put("statType","house");
			keyList.add("resid_cnt");
			String house_cond = StringUtil.isNullToString(mapParameter.get("house_cond"));			
			if(!"".equals(house_cond)){								
				String[] splitStr = house_cond.split("_");
				if(splitStr.length >= 4) {
					String rType = StringUtil.isNullToString(splitStr[1]);
					if(!"".equals(rType) && !"all".equals(rType)){
						String rdResidType[] = rType.split(",");				
						if(rdResidType.length > 0) {
							mapParameter.put("rd_resid_type", rdResidType);
						}
					}
					
					String const_year = StringUtil.isNullToString(splitStr[2]);
					if(!"".equals(const_year) && !"all".equals(const_year)){
						mapParameter.put("const_year", const_year);
					}
					
					String house_area_cd = StringUtil.isNullToString(splitStr[3]);
					if(!"".equals(house_area_cd) && !"all".equals(house_area_cd)){
						String houseAreaCd[] = house_area_cd.split(",");				
						if(houseAreaCd.length > 0) {
							mapParameter.put("house_area_cd", houseAreaCd);
						}
					}					
					
					//mapParameter.put("isCharacteristicsHouse", "Y");
				}				
			}								
		}		

		// 사업체
		mapParameter.put("isCharacteristicsCopr", "N");
		if(mapParameter.containsKey("copr_cond")) {
			mapParameter.put("statType","copr");
			mapParameter.put("grdstatType","copr");
			keyList.add("copr_cnt");
			String copr_cond = StringUtil.isNullToString(mapParameter.get("copr_cond"));			
			if(!"".equals(copr_cond)){
				
				String[] splitStr = copr_cond.split("_");				
				if(splitStr.length >= 3) {
					
					String ksic_3_cd = StringUtil.isNullToString(splitStr[2]);
					if(!"".equals(ksic_3_cd) && !"all".equals(ksic_3_cd)){					
						mapParameter.put("copr_ksic_3_cd", ksic_3_cd);
					}
					//mapParameter.put("isCharacteristicsCopr", "Y");   
				}				
			}								
		}

		// 종사자
		mapParameter.put("isCharacteristicsEmployee", "N");
		if(mapParameter.containsKey("employee_cond")) {
			mapParameter.put("statType","copr");
			mapParameter.put("grdstatType","employee");
			keyList.add("employee_cnt");
			String employee_cond = StringUtil.isNullToString(mapParameter.get("employee_cond"));			
			if(!"".equals(employee_cond)){
				
				String[] splitStr = employee_cond.split("_");
				if(splitStr.length >= 3) {
					
					String ksic_3_cd = StringUtil.isNullToString(splitStr[2]);
					if(!"".equals(ksic_3_cd) && !"all".equals(ksic_3_cd)){					
						mapParameter.put("employee_ksic_3_cd", ksic_3_cd);
					}
					//mapParameter.put("isCharacteristicsEmployee", "Y");
				}				
			}								
		}
		
		// BSCA도 9016으로 구축
		if(mapParameter.containsKey("copr_base_year")){
			String copr_base_year = StringUtil.isNullToString(mapParameter.get("copr_base_year"));
			if("2016".equals(copr_base_year)) {
				mapParameter.put("copr_base_year", "9016");
			}
		}
		
		if(!mapParameter.containsKey("grid_level")){
			mapParameter.put("grid_level", "1k");
		}
	}
	
//	private String getKey(HashMap<String, Object> map) {
//		String statType = (String)map.get("statType");
//		String grdstatType = (String)map.get("grdstatType");
//		
//		if(grdstatType != null) {
//			if("employee".equals(grdstatType)) return EMPLOYEE_KEY;
//			else if("copr".equals(grdstatType)) return COPR_KEY;
//		}
//		
//		if(statType)
//		
//		return null;
//	}
	

	@Override
	protected String getQueryStr()
	{
		return "";
	}

//	enum MustParam
//	{
//		classDeg
//	}

	enum OptionParam
	{
		json_data
	}
	
	// 비어있는 격자 데이터를 채워주는 메소드이다.
		// 예제 설명
		// 인덱스           		: |    0    |    1    |    2    |    3    |    4    |
		// standard 		:    [가]       [나]       [다]      [라]        [바]
		// allList.get(1)	:    [가]       [나]       [다]      [라]
		// allList.get(2)   :    [나]       [라]
		//
		// 위처럼 있으면 standard에서 격자 이름 값을 읽어온다. 0인덱스는 "가"라는 값을 갖는다.
		// allList.get(1)로 가져온 LinkedList에서 같은 인덱스(0)에서 격자 이름이 "가" 로 똑같으니 넘어간다.
		// allList.get(2)로 가져온 LinkedList에서는 같은 인덱스(0)에서의 격자 이름이 "나"이다. standard와 같은 인덱스 상에서 격자 이름이 다르다.
		// 이때 [가]를 allList.get(2)로 가져온 LinkedList에 넣어준다. 
		// 이후 상태는 다음과 같을 것이다.
		//
		// 인덱스           		: |    0    |    1    |    2    |    3    |    4    |
		// standard 		:    [가]       [나]       [다]      [라]        [바]
		// allList.get(1)	:    [가]       [나]       [다]      [라]
		// allList.get(2)   :    [가]       [나]		  [라]
		// 이렇게 계속 비교해가면서 해당 인덱스에 값이 없으면, 해당 인덱스에 값을 채우는 방식이다. 그리고 기존에 있던 값은 바로 옆의 인덱스로 옮겨진다.
		// 유일하게 주의할 점은 allList.get(1) 처럼 끝에만 다른 겨우에는 IndexOutOfBoundsException를 catch하는 부분에서 처리해준다는 점이다.
		private void coverEmptyData(List<String> standard,ArrayList<LinkedList<HashMap<String, Object>>> allLists /*, ArrayList<double[]> doubleList */) {
			
//			int howMany = allLists.size();
//			for(int z = 0; z < howMany ; z++) {
//				doubleList.add(new double[standard.size()]);
//			}
			
			// standard 와 allLists의 사이즈는 변경이 되지 않으니 안심하고 for 문에서 사용해도 된다.
			for(int i = 0 ; i < standard.size(); i++) {
				String gridCd = standard.get(i);
				
				
				for(int j = 0 ; j < allLists.size() ; j++) {
					LinkedList<HashMap<String, Object>> list = allLists.get(j);
					String compareGridCd = null;
//					double[] arr = doubleList.get(j);
					try {
						compareGridCd = (String)list.get(i).get("adm_cd");
					} catch (IndexOutOfBoundsException e) {
						HashMap<String, Object> coverEmpty = new HashMap<String, Object>();
						coverEmpty.put("adm_cd", gridCd);
						coverEmpty.put("adm_nm", "새로들어온값");
						coverEmpty.put("value", 0);
						coverEmpty.put("base_year", 2019);
						list.addLast(coverEmpty);
						continue;
//						arr[i] = 0;
					}
					// 만약 기준이 되는 standard의 인덱스와  list의 같은 인덱스의 grid_cd 가 같지 않으면
					// 그것은 list에 현재 격자가 빈다는 뜻이다! list.add 를 사용해서 해당 인덱스에
					// grid_cd=gridCd, grid_nm=gridCd, value, base_year를 내포하고 있는 HashMap을 만들어서 넣어준다.
					if(!gridCd.equals(compareGridCd)) {
						HashMap<String, Object> coverEmpty = new HashMap<String, Object>();
						coverEmpty.put("grid_cd", gridCd);
						coverEmpty.put("grid_nm", "새로들어온값");
						coverEmpty.put("value", 0);
						coverEmpty.put("base_year", 2019);
						list.add(i,coverEmpty);
						
//						arr[i] = 0;
					} 
//					else {
//						
//						arr[i] = (int)list.get(i).get("grid_cd");
//					}
					
					
				}
				
			}
			
		}
		
		// 조건에 의해서 구해진 다양한 리스트가 있는데, 모든 리스트들이 값을 갖는 key이름이 달라서 공통된 코드를 돌리는데 어려움이 있다.
		// 그래서 해당 값을 갖는 key이름을 모두 "value"로 수정하는 작업을 해준다.
		private void normalizeList(List<HashMap<String, Object>> list, String valueKeyName) {
			
			// jdk 1.5 부터 for( : )를 사용할 수 있다.
			for(HashMap<String, Object> item : list) {
				int value = (int)item.get(valueKeyName);
				item.remove(valueKeyName);
				item.put("value", value);
				//String gridCd = (String)item.get("adm_cd");
				//item.remove("adm_cd");
				//item.put("grid_cd", gridCd);
				
			}
			
		}
		
		private double[] getValueArray(List<HashMap<String, Object>> list) {
			
			double[] result = new double[list.size()];
			
			for (int i = 0; i < list.size(); i++) {
				result[i] = (int)list.get(i).get("value");
			}
			
			return result;
		}
		
		private HashMap<String, Double> resultItem(PearsonsCorrelation corr, ArrayList<String> statsList, ArrayList<double[]> doubleList, int i, int j) {
			HashMap<String, Double> item = new HashMap<String, Double>();
			double r = corr.correlation(doubleList.get(i), doubleList.get(j));
			String statsNm1 = statsList.get(i);
			String statsNm2 = statsList.get(j);
			String resultNm = statsNm1 + "," + statsNm2;
			item.put(resultNm, r);
			return item;
		}
		
		private HashMap<String, Double> resultItemWithSame(ArrayList<String> statsList, int i) {
			HashMap<String, Double> item = new HashMap<String, Double>();
			String resultNm = statsList.get(i) + "," + statsList.get(i);
			item.put(resultNm, 1.0);
			return item;
		}
		
		// 디버깅용으로만 사용한다.
		protected void showGridDataList(List<HashMap<String, Object>> gridDataList, String HeaderName) {
			System.out.println("********************** " +HeaderName + "(시작) **********************");
			for(int i = 0 ; i < gridDataList.size() ; i++) {
				System.out.println(gridDataList.get(i));
			}
			System.out.println("********************** " +HeaderName + "(끝) **********************\n");
		}
		
		
}
