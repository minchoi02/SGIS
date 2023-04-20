package kostat.lbdms.ServiceAPI.controller.service;

import java.util.HashMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class AnalysisUtils {
HashMap<String, Object> conditionObject;
	public String createCensusWhereClause(org.json.JSONArray conditions) throws Exception {
		int i;
		JSONArray netJson;
		
		netJson = new JSONArray();
		
		for (i = 0;i < conditions.length(); i++) {
			netJson.add(conditions.get(i));
		}
		
		return this.createCensusWhereClause(netJson);
	}
	
	public String createCensusWhereClause(JSONArray conditions) throws Exception {
		String where = "";
		String dataType = "";
		
		where = " 1=1 ";
		this.conditionObject = this.createConditionObject(conditions);
		
		dataType = this.get("depth1") + "|" + 
				((this.get("depth2").contains("UOGA")) ? "UOGA" : this.get("depth2"));
		System.out.println(">>>>>>>>>>>>>>>>5_1>" + dataType);
		
		switch (dataType) {
			// 인구조건
			case "POPULATION_HOUSE|POPULATION": {
				where += this.createPopulationQuery();
				break;
			}
			// 가구조건
			case "POPULATION_HOUSE|HOUSE1": {
				where += this.createHouseHoldQuery();
				break;
			}
			// 주택조건
			case "POPULATION_HOUSE|HOUSE2": {
				where += this.createHousingQuery();
				break;
			}
			// 농가조건
			case "AGRICULTRUE_FISHERY|NONGGA": {
				System.out.println(">>>>>>>>>>>>>>>>5_2>" + where);
				where += this.createFarmHouseQuery();
				System.out.println(">>>>>>>>>>>>>>>>5_2>" + where);
				break;
			}
			// 임가조건
			case "AGRICULTRUE_FISHERY|IMGA": {
				where += this.createForestHouseQuery();
				break;
			}
			// 어가조건
			case "AGRICULTRUE_FISHERY|UOGA": {
				where += this.createFisheryHouseQuery();
				break;
			}
			// 전산업조건
			case "ALL_COMPANY|INDUSTRY": {
				where += this.createAllCompanyQuery();
				break;
			}
			// 테마업종조건
			case "ALL_COMPANY|THEME": {
				where += this.createThemeBuisnessQuery();
				break;
			}
			default: {
				System.out.println(">>>>>>>>>>>>>>>>5_3>" + where);
				//최인섭 수정
				//throw new Exception("센서스 검색 조건이 잘못 되었습니다: " + conditions);
			}
		}
		return where;
	}
	
	/**
	 * 인구조건 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createPopulationQuery() throws Exception {
		String query;
		
		query = "";
		query += this.createAgeQuery();
		query += this.createGenderQuery();
		query += this.createMultiSelectableQuery("edu_level", false); // 교육수준
		query += this.createMultiSelectableQuery("mrg_state", false); // 혼인정도
		
		return query;
	}
	
	/**
	 * 가구조건 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createHouseHoldQuery() throws Exception {
		String query;
		
		query = "";
		query += this.createMultiSelectableQuery("household_type", "rd_household_type", false); // 세대구성
		query += this.createMultiSelectableQuery("ocptn_type", "ocptn_2_type", false); // 점유형태
		
		return query;
	}
	
	/**
	 * 주택조건 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createHousingQuery() throws Exception {
		String query;
		
		query = "";
		query += this.createSingleSelectableQuery("const_year", false); // 건축년도
		query += this.createSingleSelectableQuery("house_use_prid_cd", false); // 노후년수
		query += this.createMultiSelectableQuery("house_type", "resid_1_type", false); // 주택유형
		query += this.createMultiSelectableQuery("house_area_cd", false); // 연면적
		
		return query;
	}
	
	/**
	 * 농가조건 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createFarmHouseQuery() throws Exception {
		String query = "";
		
		query += this.createAgeQuery();
		query += this.createGenderQuery();
		
		return query;
	}
	
	/**
	 * 임가조건 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createForestHouseQuery() throws Exception {
		String query;
		
		query = "";
		query += this.createAgeQuery();
		query += this.createGenderQuery();
		
		return query;
	}
	
	/**
	 * 어가조건 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createFisheryHouseQuery() throws Exception {
		String query;
		
		query = "";
		query += this.createAgeQuery();
		query += this.createGenderQuery();
		
		return query;
	}
	
	/**
	 * 전산업 조건문 생성
	 * @return
	 * @throws Exception
	 */
	private String createAllCompanyQuery() throws Exception {
		String query;
		
		query = "";
		query += this.createCompanyClassCodeQuery();
		
		return query;
	}
	
	
	/**
	 * 테마업종 조건문 생성
	 * @return
	 * @throws Exception
	 */
	private String createThemeBuisnessQuery() throws Exception {
		String query;
		
		query = "";
		query += this.createSingleSelectableQuery("theme_cd", "theme_biz_cd", false);
		
		return query;
	}
	
	/**
	 * 컬럼명과 property 명이 동일할 때
	 * @param column
	 * @param isNumber
	 * @return
	 * @throws Exception
	 */
	private String createSingleSelectableQuery(String column, boolean isNumber) throws Exception {
		return this.createSingleSelectableQuery(column, column, isNumber);
	}
	
	/**
	 * 컬럼명과 property 명이 동일할 때
	 * @param column
	 * @param isNumber
	 * @return
	 * @throws Exception
	 */
	private String createMultiSelectableQuery(String column, boolean isNumber) throws Exception {
		return this.createMultiSelectableQuery(column, column, isNumber);
	}
	
	/**
	 * 다중 선택 데이터 쿼리 생성
	 * @param prop
	 * @param isNumber
	 * @return
	 * @throws Exception
	 */
	private String createMultiSelectableQuery(String prop, String column, boolean isNumber) throws Exception {
		if (!this.has(prop)) {
			return "";
		}
		
		if (isNumber) {
			return " AND " + column + " in (" + this.get(prop) + ")";
		} else {
			return " AND " + column + " in (" + this.wrappingStringDataList(prop) + ")";
		}
	}
	
	/**
	 * 단일 선택 데이터 쿼리 생성
	 * @param column
	 * @param isNumber
	 * @return
	 * @throws Exception
	 */
	private String createSingleSelectableQuery(String prop, String column, boolean isNumber) throws Exception {
		if (!this.has(prop)) {
			return "";
		}
		
		if (isNumber) {
			return " AND " + column + " = " + this.get(prop);
		} else {
			return " AND " + column + " = '" + this.get(prop) + "'";
		}
	}
	
	/**
	 * 연령 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createAgeQuery() throws Exception {
		if (!this.has("age_from") || !this.has("age_to")) {
			return "";
		}
		return " AND (cast(age AS integer) >= " + this.get("age_from") + " AND cast(age AS integer) < " + this.get("age_to") + ")";
	}
	
	/**
	 * 성별 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createGenderQuery() throws Exception {
		if (!this.has("gender")) {
			return "";
		}
		
		if ("0".equals(this.get("gender"))) {
			return " AND gender IN ('1', '2')";
		}
		
		return " AND gender = '" + this.get("gender") + "'";
	}
	
	/**
	 * 사업체 클래스 코드 쿼리 생성
	 * @return
	 * @throws Exception
	 */
	private String createCompanyClassCodeQuery() throws Exception {
		if (!this.has("class_code")) {
			return "";
		}
		
		int size;
		String code;
		
		code = this.get("class_code");
		size = code.length();
		
		if (size == 1) {
			return " AND ksic_1_cd = '" + code + "'";
		} else {
			return " AND ksic_" + (size - 1) + "_cd = '" + code.substring(1, code.length()) + "'";
		}
	}
	
	/**
	 * JSONArray로 된 키를 HashMap으로 변환
	 * @param conditions
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> createConditionObject(
			JSONArray conditions) throws Exception {
		
		int i;
		HashMap<String, Object> conditionObject;
		
		conditionObject = new HashMap<String, Object>();
		
		for (i = 0; i < conditions.size(); i++) {
			JSONObject object;
			
			object = conditions.getJSONObject(i);
			conditionObject.put(
					object.getString("key").toLowerCase(), // key는 무조건 소문자로
					object.get("value"));
		}
		
		return conditionObject;
	}
	
	/**
	 * HashMap에서 데이터 추출
	 * @param prop
	 * @return
	 * @throws Exception
	 */
	private String get(String prop) throws Exception {
		if (this.conditionObject.get(prop) != null
			&& String.valueOf(this.conditionObject.get(prop)) != ""
			&& !String.valueOf(this.conditionObject.get(prop)).equalsIgnoreCase("null")) {
			
			return String.valueOf(this.conditionObject.get(prop));
		} else {
			return "";
		}
	}
	
	/**
	 * 해당 프로퍼티가 있는지 조회
	 * @param prop
	 * @return
	 * @throws Exception
	 */
	private boolean has(String prop) throws Exception {
		return (this.get(prop).equals("")) ? false : true;
	}
	
	/**
	 * 데이터 배열을 문자형으로 만들기
	 * @param column
	 * @return "'1','2','3'..."
	 * @throws Exception
	 */
	private String wrappingStringDataList(String column) throws Exception {
		int i;
		String result;
		String[] targetData;
		
		result = "";
		targetData = this.get(column).split(",");
		
		for (i = 0; i < targetData.length; i++) {
			result += (i == 0) ? "" : ",";
			result += "'" + targetData[i] + "'";
		}
		
		return result;
	}
}
