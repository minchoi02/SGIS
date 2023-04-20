package kostat.sop.ServiceAPI.controller.view;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONString;
import org.json.simple.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kostat.sop.ServiceAPI.controller.service.IndoorService;
import kostat.sop.ServiceAPI.controller.service.KosisApiService;

/**
 * 1. 기능 : kosis 데이터 API 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     2021.05.25	wavus 초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : wavus
 * @version 1.0
 * @see
 * <p/>
 */
@Controller
//@RequestMapping(value="/kosisApi") API 배포시 운영서버
@RequestMapping(value="/view/kosisApi2") //개발서버
public class KosisApiController2 {
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Resource(name="kosisApiService")
	private KosisApiService kosisApiService;
	
	/**
	  * @Method Name : getTotsurvKosisData
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 총조사 데이터 조회
	*/
	public Map getTotSurvStatValidateParams(@RequestParam HashMap<String, Object> paramMap) throws JSONException 	{
		
		Map resultData = null;
		
		try {
			resultData = kosisApiService.getTotSurvStatValidateParams(paramMap);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resultData;
	}
	/**
	  * @Method Name : getTotsurvKosisData
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 총조사 데이터 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/TotsurvStatData.do", produces="application/json;charset=UTF-8")
	public List getTotsurvKosisData(@RequestParam HashMap<String, Object> paramMap) throws JSONException 	{
		
		long beforeTime = System.currentTimeMillis();
		
		List list = null;
		
		String[] surv_year_list = paramMap.get("surv_year_list").equals("")? new String[0]: ((String) paramMap.get("surv_year_list")).split(",");	//	수록시점
		paramMap.put("surv_year_list", surv_year_list);
		
		String[] org_id_list = paramMap.get("org_id_list").equals("") ? new String[0] : ((String) paramMap.get("org_id_list")).split(",");			//	조직번호
		paramMap.put("org_id_list", org_id_list);
		
		String[] tbl_id_list = paramMap.get("tbl_id_list").equals("") ? new String[0] : ((String) paramMap.get("tbl_id_list")).split(",");			//	통계표 ID
		paramMap.put("tbl_id_list", tbl_id_list);
		
		String[] char_itm_id_list = paramMap.get("char_itm_id_list").equals("")? new String[0]: ((String) paramMap.get("char_itm_id_list")).split(",");	//	표특성항목 리스트
		paramMap.put("char_itm_id_list", char_itm_id_list);
		
		String[] adm_cd = paramMap.get("adm_cd").equals("")? new String[0]: ((String) paramMap.get("adm_cd")).split(":");	//	행정구역 코드
		paramMap.put("adm_cd", adm_cd);
		
		
		String[] list_var_ord_list = paramMap.get("list_var_ord_list").equals("")? new String[0]:((String) paramMap.get("list_var_ord_list")).split(",");	// 차트화 될 대상 리스트
		paramMap.put("list_var_ord_list", list_var_ord_list);
		
		List<String[]> ov_lv_list = new ArrayList<String[]>();
		ov_lv_list.add(paramMap.get("ov_l1_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l1_list")).split(","));			//	항목 1
		ov_lv_list.add(paramMap.get("ov_l2_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l2_list")).split(","));			//	항목 2
		ov_lv_list.add(paramMap.get("ov_l3_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l3_list")).split(","));			//	항목 3
		ov_lv_list.add(paramMap.get("ov_l4_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l4_list")).split(","));			//	항목 4
		ov_lv_list.add(paramMap.get("ov_l5_list").equals("") ? new String[0] : ((String) paramMap.get("ov_l5_list")).split(","));			//	항목
		paramMap.put("ov_lv_list", ov_lv_list);
		
		
		try {
			 Map checkData = getTotSurvStatValidateParams(paramMap);
			
			 boolean resultFalg = (boolean)checkData.get("resultData");
			 String  msg = (String)checkData.get("msg");
			 
			 if(!resultFalg) {
				 list.add((String)checkData.get("msg"));
				 return list; 
			 }
			 
			 list = kosisApiService.getTotsurvKosisData(paramMap);
				
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
		long secDiffTime = (afterTime - beforeTime); //두 시간에 차 계산
		System.out.println("소요시간(m) : "+secDiffTime);
		
		return list;
	}
	
	
	
	/**
	  * @throws Exception 
	 * @Method Name : getListStblCategories2
	  * @작성일 : 2021. 11. 18.
	  * @작성자 : lyh
	  * @변경이력 : 
	  * @Method 설명 : 총조사 카테고리 속도테스트 변경방식
	*/
	@ResponseBody
	@RequestMapping(value = "/getListStblCategories.do", produces="application/json;charset=UTF-8")
	public List getListStblCategories(@RequestParam HashMap<String, Object> paramMap) throws Exception {
		
		long beforeTime = System.currentTimeMillis();
		List list = kosisApiService.getStblCategory();
		
		long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
		long secDiffTime = (afterTime - beforeTime); //두 시간에 차 계산
		System.out.println("소요시간(m) : "+secDiffTime);
		return list;
	}
	
	
	
	/**
	  * @Method Name : getListStblList
	  * @작성일 : 2021. 11. 18.
	  * @작성자 : lyh
	  * @변경이력 : 
	  * @파라미터 : 통계표 카테고리명
	  * @Method 설명 : 총조사 통계표 목록
	*/
	@ResponseBody
	@RequestMapping(value = "/getStblList.do", produces="application/json;charset=UTF-8")
	public List getListStblList(@RequestParam HashMap<String, Object> paramMap) throws JSONException {
		
		long beforeTime = System.currentTimeMillis();
		
		List list = null;
		try {
			
			list = kosisApiService.getStblList(paramMap);
				
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
		long secDiffTime = (afterTime - beforeTime); //두 시간에 차 계산
		System.out.println("소요시간(m) : "+secDiffTime);
		return list;
	}
	
	/**
	  * @Method Name : getListStblList
	  * @작성일 : 2021. 11. 18.
	  * @작성자 : lyh
	  * @변경이력 : 
	  * @파라미터 : 통계표 카테고리명
	  * @Method 설명 : 총조사 통계표 목록
	*/
	@ResponseBody
	@RequestMapping(value = "/getStblItmList.do", produces="application/json;charset=UTF-8")
	public List getStblItmList(@RequestParam HashMap<String, Object> paramMap) throws JSONException {
		
		
		long beforeTime = System.currentTimeMillis();
		
		List list = null;
		try {
			
			list = kosisApiService.getStblItmList(paramMap);
				
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
		long secDiffTime = (afterTime - beforeTime); //두 시간에 차 계산
		System.out.println("시간차이(m) : "+secDiffTime);
		
		return list;
	}
	
	
}
