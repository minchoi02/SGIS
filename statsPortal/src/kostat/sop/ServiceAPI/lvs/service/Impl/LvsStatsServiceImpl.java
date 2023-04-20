package kostat.sop.ServiceAPI.lvs.service.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.lvs.mapper.LvsStatsMapper;
import kostat.sop.ServiceAPI.lvs.service.LvsStatsService;
import kostat.sop.ServiceAPI.lvs.vo.LvsSeekVO;
import kostat.sop.ServiceAPI.lvs.vo.LvsVO;

@Service("lvsStatsService")
public class LvsStatsServiceImpl  extends EgovAbstractServiceImpl implements LvsStatsService {
	
	@Resource( name = "lvsStatsMapper" )
	private LvsStatsMapper lvsStatsMapper;
	

	@Override
	public List<Map<String, Object>> selectMainDataList(LvsVO vo) throws Exception {
		// TODO Auto-generated method stub
		System.out.println(vo.toString());
		

		
		List<Map<String, Object>> resultList = new ArrayList<>();
		Map<String, Object> result  = new HashMap<String,Object>();
		Map<String, Object> subResult  = new HashMap<String,Object>();
		
		
		for(int i=0; i<vo.getList().size(); i++) {
			String statName = vo.getList().get(i);
			vo.setDatakind(statName.toString());
			LvsVO vo2 = vo.clone() ;
			if (statName.equals("tot_ppltn")) setData1(vo,subResult);		//step1 총인구데이터
			if (statName.equals("tot_family"))setData2(vo,subResult);		//step2  가구수
			if (statName.equals("tot_house")) setData3(vo,subResult);		//step3  주택수
			
			if (statName.equals("corp_cnt"))setData4(vo,subResult);		    //step4  사업체수
			if (statName.equals("employee_cnt")) setData5(vo,subResult);	//step5  종업원수
			if (statName.equals("tot_one_family")) {
				vo2.setSeekCd("stat_house_psn_1_family_cnt");
				vo2.setDatakind("tot_one_family");
				vo2.setDatakindNm("1인 가구");
				vo2.setUnit("가구");				
				setData6(vo2,subResult);	//step6  1인가구
			}
			if (statName.equals("apart_cnt")) {
				vo2.setSeekCd("stat_apt_cnt_per");
				vo2.setDatakind("apart_cnt");
				vo2.setDatakindNm("아파트수");
				vo2.setUnit("호");				
				setData6(vo2,subResult);	//step6  아파트수
			}
			if (statName.equals("old_age_cnt")) {
				vo2.setSeekCd("stat_age_65_mt1_ppltn_cnt");
				vo2.setDatakind("old_age_cnt");
				vo2.setDatakindNm("노령인구수(65세인구)");
				vo2.setUnit("명");				
				setData6(vo2,subResult);	//step6  노령인구수
			}
			if (statName.equals("dead_cnt")) {
				vo2.setSeekCd("kosis_death_cnt_cnt");
				vo2.setDatakind("dead_cnt");
				vo2.setDatakindNm("사망자수");
				vo2.setUnit("명");				
				setData6(vo2,subResult);	//step6  사망자수
			}
			if (statName.equals("marrige_cnt")) {
				vo2.setSeekCd("kosis_mrg_cnt_cnt");
				vo2.setDatakind("marrige_cnt");
				vo2.setDatakindNm("혼인건수");
				vo2.setUnit("건");				
				setData6(vo2,subResult);	//step6  사망자수
			}
			if (statName.equals("divorce_cnt")) {
				vo2.setSeekCd("kosis_dvrc_cnt_cnt");
				vo2.setDatakind("divorce_cnt");
				vo2.setDatakindNm("이혼건수");
				vo2.setUnit("건");				
				setData6(vo2,subResult);	//step6  사망자수
			}
			if (statName.equals("old_oneman_cnt")) {
				vo2.setSeekCd("stat_house_age_65_mt1_psn_1_family_cnt");
				vo2.setDatakind("old_oneman_cnt");
				vo2.setDatakindNm("독거노인 가구수");
				vo2.setUnit("호");				
				setData6(vo2,subResult);	//step6  독거노인가구수
			}
			if (statName.equals("employ_rt")) {
				vo2.setSeekCd("kosis_empymn_ppltn_cnt_per");
				vo2.setDatakind("employ_rt");
				vo2.setDatakindNm("고용률");
				vo2.setUnit("%");				
				setData6(vo2,subResult);	//step6  사망자수
			}
			if (statName.equals("unemploy_rt")) {
				vo2.setSeekCd("kosis_unempl_rt");
				vo2.setDatakind("employ_rt");
				vo2.setDatakindNm("실업률");
				vo2.setUnit("%");				
				setData6(vo2,subResult);	//step6  사망자수
			}
			if (statName.equals("employ_cnt")) {
				vo2.setSeekCd("kosis_empymn_ppltn_cnt_per");
				vo2.setDatakind("employ_cnt");
				vo2.setDatakindNm("취업자수");
				vo2.setUnit("명");				
				setData6(vo2,subResult);	//step6  사망자수
			}
			if (statName.equals("traffic_accdt_cnt")) {
				vo2.setSeekCd("otr_inst_transport_acdnt_cnt");
				vo2.setDatakind("traffic_accdt_cnt");
				vo2.setDatakindNm("교통사고 발생건수");
				vo2.setUnit("건");				
				setData6(vo2,subResult);	//step6  사망자수
			}
			if (statName.equals("traffic_dead_cnt")) {
				vo2.setSeekCd("otr_inst_transport_acdnt_death_cnt");
				vo2.setDatakind("traffic_accdt_cnt");
				vo2.setDatakindNm("교통사고 사망자 수");
				vo2.setUnit("명");				
				setData6(vo2,subResult);	//step6  사망자수
			}
		}
		
		//이지방지표
		vo.setSubDiv("");
		List<Map<String, Object>> ecountryList = lvsStatsMapper.selectEcountryWithAllData(vo) ;   // step1 기본정보
		LvsVO vo3 = vo.clone() ;
		List<Map<String, Object>> ecountrySubList = new ArrayList<>(); 
		if (vo.getViewCd().equals("sido")) {
			vo3.setSubDiv("2");
			ecountrySubList = lvsStatsMapper.selectEcountryWithAllData(vo3) ;  // step2 년도별 데이터			
		}
		
		/*
		 * 
		 *             	sido:  ["tot_ppltn","fam_stats","house_cnt","tot_one_family","business_cnt","employ_cnt"
						,"newbaby_cnt","dead_cnt","newlyweds_cnt","population_in_cnt","population_out_cnt","old_age_cnt"
						,"marrige_cnt","divorce_cnt","old_oneman_cnt","old_oneman_rt","apart_cnt","house_own_rt"
						,"employ_rt","unemploy_rt","employ_cnt","walker_accdt_cnt","traffic_accdt_cnt","fire_accdt_cnt"
						,"car_own_cnt","water_supply_rt","life_waste_cnt"],

		 */

		for(int i=0; i<vo.getList().size(); i++) {
			String statName = vo.getList().get(i);
			vo.setDatakind(statName.toString());
			if (statName.equals("newbaby_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("신생아수");
				vo3.setUnit("명");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	//step6  사망자수
			} else if (statName.equals("dead_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("사망자수");
				vo3.setUnit("명");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	//step6  사망자수
			} else if (statName.equals("newlyweds_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("신혼부부수");
				vo3.setUnit("쌍");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	//step6  사망자수
			} else if (statName.equals("population_in_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("전입인구수");
				vo3.setUnit("명");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	//step6  사망자수
			} else if (statName.equals("population_out_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("전출인구수");
				vo3.setUnit("명");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	//step6  사망자수
			} else if (statName.equals("marrige_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("혼인건수");
				vo3.setUnit("건");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	//step6  사망자수
			} else if (statName.equals("divorce_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("이혼건수");
				vo3.setUnit("건");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );
			} else if (statName.equals("house_own_rt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("일반가구의 주택소유율");
				vo3.setUnit("%");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );
			} else if (statName.equals("car_own_rt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("1인당 자동차등록대수");
				vo3.setUnit("대");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );
			} else if (statName.equals("water_supply_rt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("상수도 보급률");
				vo3.setUnit("%");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	
			} else if (statName.equals("employ_rt1") || statName.equals("employ_rt2")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("고용률");
				vo3.setUnit("%");				
				setData7(vo3,subResult,ecountryList,ecountrySubList );	
			} else if (statName.equals("unemploy_rt1") || statName.equals("unemploy_rt2")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("실업률");
				vo3.setUnit("%");				
				setData7(vo3,subResult,ecountryList,ecountrySubList);	
			} else if (statName.equals("employ_cnt1") || statName.equals("employ_cnt2")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("취업자수");
				vo3.setUnit("명");				
				setData7(vo3,subResult,ecountryList,ecountrySubList);	
			} else if (statName.equals("life_waste_cnt")) {
				vo3.setDatakind(statName.toString());
				vo3.setDatakindNm("주민 1인당 생활폐기물 배출량");
				vo3.setUnit("kg/인,일");				
				setData7(vo3,subResult,ecountryList,ecountrySubList);
			} 
			
		}
		
		
		result.put(vo.getRegionCd(), subResult);
		result.put("errMsg", "Success");
		result.put("errCd", "0");
		
		resultList.add(result);
		return  resultList ;
	}
	
	@Override
	public List<Map<String, Object>> selectMainDataCompRegionInfoInfo(LvsVO vo) throws Exception {
		// TODO Auto-generated method stub
		System.out.println(vo.toString());
		List<Map<String, Object>> resultList =  new ArrayList<>();
		
		Map<String, Object> result  = new HashMap<String,Object>();
		List<Map<String, Object>> subResult =  lvsStatsMapper.selectCensusIndex_with_story(vo) ;  //				
		
		result.put("data", subResult);
		result.put("errMsg", "Success");
		result.put("errCd", "0");
		
		resultList.add(result);
		return  resultList ;
	}
		
	
	
	//총인구데이터 세팅
	private void setData1(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		List<Map<String, Object>> list = lvsStatsMapper.selectTotPpltn(vo) ;
		List<Map<String, Object>> subList = lvsStatsMapper.selectTotPpltnYear(vo) ;  //년도별 데이터
		
		
		if (list.size() >0) {
			Map<String, Object> data = list.get(0);
			Map<String, Object> data_year = new HashMap<String,Object>();
			
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> title1_data = new ArrayList<>();  //남자데이터			
			ArrayList<Integer> title2_data = new ArrayList<>();  //여자데이터
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			String key1 = "";
			String key2 = "";			
			
			for(int i=0; i<subList.size(); i++) {
				Map<String, Object> row = subList.get(i);
				yearList.add((String) row.get("year"));
				
				title1_data.add(Integer.parseInt(String.valueOf(row.get("val1"))));
				title2_data.add(Integer.parseInt(String.valueOf(row.get("val2"))));
				tot_data.add(Integer.parseInt(String.valueOf(row.get("val"))));
				key1 = (String)row.get("key1");
				key1 = (String)row.get("key2");				
			}
			
			data_year.put("title1", key1) ;
			data_year.put("title2", key2) ;
			data_year.put("year", yearList) ;			
			data_year.put("title1_data", title1_data) ;
			data_year.put("title2_data", title2_data) ;
			data_year.put("tot_data", tot_data) ;
			
			
			//인구데이터를 
			
			for(int i=0; i<subList.size(); i++) {
				Map<String, Object> row = subList.get(i);
				yearList.add((String) row.get("year"));
			}
			
			LvsVO vo2 = vo.clone() ;
			if (vo2.getViewCd().equals("emdong")) {
				vo2.setRegionCd(vo2.getSidoCd()+vo2.getSggCd());
				vo2.setViewCd("sgg");				
			}
			List<Map<String, Object>> censusIndexList = lvsStatsMapper.selectCensusIndex(vo2) ;		
			
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<censusIndexList.size(); i++) {
				divList.add(censusIndexList.get(i));
			}
			data.put("yearData",data_year);
			data.put("subDiv",divList);
			subResult.put("tot_ppltn", data);
		}
	}
	
	//총가구데이터 세팅
	private void setData2(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		LvsVO vo2 = vo.clone();
		vo2.setDatakind("tot_family");
		vo2.setUnit("수");
		List<Map<String, Object>> list = lvsStatsMapper.selectMainDataInfo_tot_family_house(vo2) ; //기본정보
		List<Map<String, Object>> yearlistData = lvsStatsMapper.selectCensusIndexYear(vo2) ; //년도데이터
		
		
		List<Map<String, Object>> subDivlistData = lvsStatsMapper.selectCensusIndexSubDiv(vo2) ; //하위행정구역데이터
		
		if (list.size() >0) {
			Map<String, Object> data = list.get(0);
			
			//년도별 데이터
			Map<String, Object> data_year = new HashMap<String,Object>();
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			for(int i=0; i<yearlistData.size(); i++) {
				Map<String, Object> row = yearlistData.get(i);
				yearList.add((String) row.get("base_year"));
				tot_data.add(Integer.parseInt(String.valueOf(row.get("tot_family"))));
			}
			data_year.put("year", yearList) ;			
			data_year.put("tot_data", tot_data) ;
			
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<subDivlistData.size(); i++) {
				divList.add(subDivlistData.get(i));
			}
			data.put("yearData",data_year);
			data.put("subDiv",divList);
			
			subResult.put("tot_family", data);
		}
	}	
	
	//총가구데이터 세팅
	private void setData3(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		LvsVO vo2 = vo.clone();
		vo2.setDatakind("tot_house");
		vo2.setUnit("수");
		List<Map<String, Object>> list = lvsStatsMapper.selectMainDataInfo_tot_family_house(vo2) ; //기본정보
		List<Map<String, Object>> yearlistData = lvsStatsMapper.selectCensusIndexYear(vo2) ; //년도데이터
		
		List<Map<String, Object>> subDivlistData = lvsStatsMapper.selectCensusIndexSubDiv(vo2) ; //하위행정구역데이터
		
		if (list.size() >0) {
			Map<String, Object> data = list.get(0);
			
			//년도별 데이터
			Map<String, Object> data_year = new HashMap<String,Object>();
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			for(int i=0; i<yearlistData.size(); i++) {
				Map<String, Object> row = yearlistData.get(i);
				yearList.add((String) row.get("base_year"));
				tot_data.add(Integer.parseInt(String.valueOf(row.get("tot_house"))));
			}
			data_year.put("year", yearList) ;			
			data_year.put("tot_data", tot_data) ;
			
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<subDivlistData.size(); i++) {
				divList.add(subDivlistData.get(i));
			}
			data.put("yearData",data_year);
			data.put("subDiv",divList);
			
			subResult.put("tot_house", data);
		}
	}
	
	//사업체수이터 세팅
	private void setData4(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		LvsVO vo2 = vo.clone();
		vo2.setDatakind("corp_cnt");
		List<Map<String, Object>> list = lvsStatsMapper.selectMainDataInfo_corp_employee_cnt(vo2) ; //기본정보
		List<Map<String, Object>> yearlistData = lvsStatsMapper.selectCorpCensusIndexYear(vo2) ; //년도데이터
		
		List<Map<String, Object>> subDivlistData = lvsStatsMapper.selectCorpCensusIndexSubDiv(vo2) ; //하위행정구역데이터
		
		if (list.size() >0) {
			Map<String, Object> data = list.get(0);
			
			//년도별 데이터
			Map<String, Object> data_year = new HashMap<String,Object>();
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			for(int i=0; i<yearlistData.size(); i++) {
				Map<String, Object> row = yearlistData.get(i);
				yearList.add((String) row.get("base_year"));
				tot_data.add(Integer.parseInt(String.valueOf(row.get("corp_cnt"))));
			}
			data_year.put("year", yearList) ;			
			data_year.put("tot_data", tot_data) ;
			
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<subDivlistData.size(); i++) {
				divList.add(subDivlistData.get(i));
			}
			data.put("yearData",data_year);
			data.put("subDiv",divList);
			
			subResult.put("corp_cnt", data);
		}
	}
	
	// 종업원수
	private void setData5(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		LvsVO vo2 = vo.clone();
		vo2.setDatakind("employee_cnt");
		List<Map<String, Object>> list = lvsStatsMapper.selectMainDataInfo_corp_employee_cnt(vo2) ; //기본정보
		List<Map<String, Object>> yearlistData = lvsStatsMapper.selectCorpCensusIndexYear(vo2) ; //년도데이터

		List<Map<String, Object>> subDivlistData = lvsStatsMapper.selectCorpCensusIndexSubDiv(vo2) ; //하위행정구역데이터
		
		if (list.size() >0) {
			Map<String, Object> data = list.get(0);
			
			//년도별 데이터
			Map<String, Object> data_year = new HashMap<String,Object>();
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			for(int i=0; i<yearlistData.size(); i++) {
				Map<String, Object> row = yearlistData.get(i);
				yearList.add((String) row.get("base_year"));
				tot_data.add(Integer.parseInt(String.valueOf(row.get("employee_cnt"))));
			}
			data_year.put("year", yearList) ;			
			data_year.put("tot_data", tot_data) ;
			
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<subDivlistData.size(); i++) {
				divList.add(subDivlistData.get(i));
			}
			data.put("yearData",data_year);
			data.put("subDiv",divList);
			
			subResult.put("employee_cnt", data);
		}
	}
	
	// 
	private void setData6(LvsVO vo2, Map<String, Object> subResult) throws CloneNotSupportedException {
		
		if (vo2.getViewCd().equals("sido"))  {
			vo2.setInfoDiv("1");   //시도 모드라면 시군구 조회
			vo2.setSubDiv("2");
		} else if (vo2.getViewCd().equals("sgg"))  {  
			vo2.setInfoDiv("2");   //시군구 또는 동조회 동조회  2 구단위 3 동단위
			vo2.setSubDiv("3");			
			vo2.setViewCd("sgg");
		} else {  
			vo2.setInfoDiv("3");   //시군구 또는 동조회 동조회
			vo2.setSubDiv("3");			
			vo2.setViewCd("sgg");
		}
		
		List<Map<String, Object>> list = lvsStatsMapper.selectMainDataInfo_themaMapData(vo2) ; //기본정보
		List<Map<String, Object>> yearlistData = lvsStatsMapper.selectMainDataInfo_themaMapDataYear(vo2) ; //년도데이터
		

		List<Map<String, Object>> subDivlistData = lvsStatsMapper.selectMainDataInfo_themaMapDataSubDiv(vo2) ; //하위행정구역데이터
		
		if (list.size() >0) {
			Map<String, Object> data = list.get(0);
			
			//년도별 데이터
			Map<String, Object> data_year = new HashMap<String,Object>();
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			ArrayList<Float> tot_data_float = new ArrayList<>();  //합계데이터
			
			boolean is_float = false ;
			for(int i=0; i<yearlistData.size(); i++) {
				Map<String, Object> row = yearlistData.get(i);				
				String num =  String.valueOf(row.get("val")) ;
				if (num.contains(".") && isNumeric(num)) {
					is_float = true ;
					break ;
				}
			}			
			
			for(int i=0; i<yearlistData.size(); i++) {
				Map<String, Object> row = yearlistData.get(i);
				yearList.add((String) row.get("base_year"));
				if (is_float) tot_data_float.add(Float.parseFloat(String.valueOf(row.get("val"))));
				else tot_data.add(Integer.parseInt(String.valueOf(row.get("val"))));
									
				    					
			}
			data_year.put("year", yearList) ;
			if (is_float) data_year.put("tot_data", tot_data_float) ;
			else data_year.put("tot_data", tot_data) ;
			
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<subDivlistData.size(); i++) {
				divList.add(subDivlistData.get(i));
			}
			data.put("yearData",data_year);
			data.put("subDiv",divList);
			data.put("name", vo2.getDatakindNm().toString());
			data.put("unit", vo2.getUnit().toString());
			
			subResult.put(vo2.getDatakind().toString(), data);   //데이터 종류
		}
	}
	
	
	//
	private boolean isNumeric(String input) { // 문자열에서 숫자인지 아닌지 확인
		 try {
			 Double.parseDouble(input);
			 return true;
		 }
		 catch (NumberFormatException e) {
			 return false;
		 }
	}	
	
	// e지방지표
	private void setData7(LvsVO vo, Map<String, Object> subResult, List<Map<String, Object>> list, List<Map<String, Object>> subList) throws CloneNotSupportedException {
		if (list.size() >0) {
			Map<String, Object> data = new HashMap<String,Object>();
			Map<String, Object> data_year = new HashMap<String,Object>();
			
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> title1_data = new ArrayList<>();  //남자데이터			
			ArrayList<Integer> title2_data = new ArrayList<>();  //여자데이터
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			
			ArrayList<Float> title1_data_float = new ArrayList<>();  //남자데이터 실수형			
			ArrayList<Float> title2_data_float = new ArrayList<>();  //여자데이터 실수형
			ArrayList<Float> tot_data_float = new ArrayList<>();  //합계데이터 실수형
			
			
			int yearCnt = 0 ;
			for(int i=0; i<list.size(); i++) {
				Map<String, Object> row = list.get(i);				
				if(!vo.getDatakind().equals((String) row.get("datakind"))) {
					continue ;
				}
				
				if(yearCnt==0) {
					data.put("title", vo.getDatakindNm().toString());
					data.put("name", vo.getDatakindNm().toString());
					data.put("unit", vo.getUnit().toString());
					
					if (row.get("datayear").toString().length() ==4)
						data.put("thisyear", (String) row.get("datayear") +"년");
					else if (row.get("datayear").toString().length() ==6)
						data.put("thisyear", (String) row.get("datayear").toString().substring(0,4) +"년" + row.get("datayear").toString().substring(4)+"월");
					else 
						data.put("thisyear", (String) row.get("datayear") +"년");
					
					String val = String.valueOf(row.get("val"));
					if (val==null)
						data.put("thisyearval", null);					
					else if (val.contains(".") && isNumeric(val))
						data.put("thisyearval", Float.parseFloat(val));
					else if (isNumeric(val))					
						data.put("thisyearval", Integer.parseInt(val));
					
					String val1 = String.valueOf(row.get("val1"));
					if (val1 !=null) {
						data.put("thisyearkey1", "남자");						
					   if (val1.contains(".") && isNumeric(val1)) data.put("thisyearval1", Float.parseFloat(val1));
					   else if (isNumeric(val1)) data.put("thisyearval1", Integer.parseInt(val1));
					   else data.put("thisyearval1", null);
					}
					
					String val2 = String.valueOf(row.get("val2"));
					if (val2 !=null) {
						data.put("thisyearkey2", "여자");						
					   if (val2.contains(".") && isNumeric(val2)) data.put("thisyearval2", Float.parseFloat(val2));
					   else if (isNumeric(val2)) data.put("thisyearval2", Integer.parseInt(val2));
					   else data.put("thisyearval2", null);
					}
					
				}
				
				if(yearCnt==1) {
					if (row.get("datayear").toString().length() ==4)
						data.put("lastyear", (String) row.get("datayear") +"년");
					else if (row.get("datayear").toString().length() ==6)
						data.put("lastyear", (String) row.get("datayear").toString().substring(0,4) +"년" + row.get("datayear").toString().substring(4)+"월");
					else 
						data.put("lastyear", (String) row.get("datayear")+"년");						
					
					
					String val = String.valueOf(row.get("val"));
					if (val==null)
						data.put("lastyearval", null);					
					else if (val.contains(".") && isNumeric(val))
						data.put("lastyearval", Float.parseFloat(val));
					else if (isNumeric(val))					
						data.put("lastyearval", Integer.parseInt(val));
					
					String val1 = String.valueOf(row.get("val1"));
					if (val1 !=null) {
					   if (val1.contains(".") && isNumeric(val1)) data.put("lastyearval1", Float.parseFloat(val1));
					   else if (isNumeric(val1)) data.put("lastyearval1", Integer.parseInt(val1));
					}
					
					String val2 = String.valueOf(row.get("val2"));
					if (val2 !=null) {
					   if (val2.contains(".") && isNumeric(val2)) data.put("lastyearval2", Float.parseFloat(val2));
					   else if (isNumeric(val2)) data.put("lastyearval2", Integer.parseInt(val2));
					}
				}
				
				yearCnt++ ;
				if (yearCnt==2) break ;
			}
			
			boolean isFloat = false ;
			
			// 실수인지 아닌지 체크
			for(int i=0; i<list.size(); i++) {			
				Map<String, Object> row = list.get(i);
				if(!vo.getDatakind().equals((String) row.get("datakind"))) {
					continue ;
				}
				String val = String.valueOf(row.get("val"));
				String val1 = String.valueOf(row.get("val1"));
				String val2 = String.valueOf(row.get("val2"));				
			    if (val.contains(".") && isNumeric(val)) {
			        isFloat =true ;
			    	break ;	
			    }
			    if (val1.contains(".") && isNumeric(val1)) {
			        isFloat =true ;
			    	break ;	
			    }
			    if (val2.contains(".") && isNumeric(val2)) {
			        isFloat =true ;
			    	break ;	
			    }
			}
			
			String maxYear = "1900" ;
			yearCnt = 0 ;
			for(int i=0; i<list.size(); i++) {
				Map<String, Object> row = list.get(i);
				if(!vo.getDatakind().equals((String) row.get("datakind"))) {
					continue ;
				}
				
				if ( Integer.parseInt(String.valueOf(row.get("datayear"))) >  Integer.parseInt(maxYear)) { 
					maxYear = (String) row.get("datayear") ;
				}
				
				yearList.add((String) row.get("datayear").toString());
				
				if (row.containsKey("val")) {				
					String val = String.valueOf(row.get("val"));
					if   (isFloat && val==null) tot_data_float.add(null);
					else if (!isFloat && val==null) tot_data.add(null);
					else if (isFloat) tot_data_float.add(Float.parseFloat(val));
				    else  tot_data.add(Integer.parseInt(val));
				} else {
				     tot_data.add(null);					
				}
				
				if (row.containsKey("val1")) {
					String val1 = String.valueOf(row.get("val1"));
					if   (isFloat && val1==null) title1_data_float.add(null);
					else if (!isFloat && val1==null) title1_data.add(null);
					else if (isFloat) title1_data_float.add(Float.parseFloat(val1));
				    else title1_data.add(Integer.parseInt(val1));
				} else {
					title1_data.add(null);
				}
			    
				if (row.containsKey("val2")) { 				
					String val2 = String.valueOf(row.get("val2"));
					if   (isFloat && val2==null) title1_data_float.add(null);
					else if (!isFloat && val2==null) title2_data.add(null);
					else if (isFloat) title2_data_float.add(Float.parseFloat(val2));
				    else title2_data.add(Integer.parseInt(val2));
				} else {
					title2_data.add(null);					
				}
				
				//yearCnt++ ;
				//if (yearCnt==10) break ;
			}

			
			data_year.put("title1", "남자") ;
			data_year.put("title2", "여자") ;
			data_year.put("year",  cutStringArrData(yearList,9));
			
			if (!isFloat) {
				data_year.put("title1_data", cutIntArrData(title1_data,9));
				data_year.put("title2_data", cutIntArrData(title2_data,9));
				data_year.put("tot_data"   , cutIntArrData(tot_data,9));
			} else {
				data_year.put("title1_data", cutFloatArrData(title1_data_float,9)) ;
				data_year.put("title2_data", cutFloatArrData(title2_data_float,9)) ;
				data_year.put("tot_data"   , cutFloatArrData(tot_data_float,9)) ;
			}
			
			//하위지역
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<subList.size(); i++) {
				
				Map<String, Object> row = subList.get(i);
				if(!vo.getDatakind().equals((String) row.get("datakind"))) {  //같은 데이터지표가 아니라면 무시
					continue ;
				}
				
				if(!maxYear.equals((String) row.get("datayear"))) {   //당해년도 하위지역이 아니라면 무시
					continue ;
				}
				
				String val = String.valueOf(row.get("val"));
				if (val==null)
					row.put(vo.getDatakind().toString(),null);
				else if(isFloat)
					row.put(vo.getDatakind().toString(),Float.parseFloat(val));
				else
					row.put(vo.getDatakind().toString(),Integer.parseInt(val));
				
				divList.add(row);
			}
			
			data.put("yearData",data_year);
			data.put("subDiv",divList);
			subResult.put(vo.getDatakind().toString(), data);
		}
	}
	
	//뒷에서 cnt까지 자르기	
	private  ArrayList<String> cutStringArrData(ArrayList<String> inputArr, int cnt){
		ArrayList<String> tempArr = new ArrayList<>();  // 지표리스트
		ArrayList<String> tempArr2 = new ArrayList<>();  // 지표리스트
		
		for(int i=0; i<inputArr.size(); i++) {
			tempArr.add((String)inputArr.get(i));
			if (i>=cnt) break ;
		}
		
		//다시 정렬
		for(int i=0; i<tempArr.size(); i++) {
			tempArr2.add((String)tempArr.get(tempArr.size()-1-i));
		}
		
		return tempArr2 ;
	}
	
	//뒷에서 cnt까지 자르기
	private  ArrayList<Integer> cutIntArrData(ArrayList<Integer> inputArr, int cnt){
		ArrayList<Integer> tempArr = new ArrayList<>();  // 지표리스트
		ArrayList<Integer> tempArr2 = new ArrayList<>();  // 지표리스트		
		
		for(int i=0; i<inputArr.size(); i++) {
			tempArr.add((Integer)inputArr.get(i));
			if (i>=cnt) break ;
		}
		
		//다시 정렬
		for(int i=0; i<tempArr.size(); i++) {
			tempArr2.add((Integer)tempArr.get(tempArr.size()-1-i));
		}
		
		return tempArr2 ;
	}
	
	//뒷에서 cnt까지 자르기
	private  ArrayList<Float> cutFloatArrData(ArrayList<Float> inputArr, int cnt){
		ArrayList<Float> tempArr = new ArrayList<>();  // 지표리스트
		ArrayList<Float> tempArr2 = new ArrayList<>();  // 지표리스트
		
		for(int i=0; i<inputArr.size(); i++) {
			tempArr.add((Float)inputArr.get(i));
			if (i>=cnt) break ;
		}
		
		//다시 정렬
		for(int i=0; i<tempArr.size(); i++) {
			tempArr2.add((Float)tempArr.get(tempArr.size()-1-i));
		}
		
		return tempArr2 ;
	}
	
	
  /***추천지표데이터**/
	@Override
	public List<Map<String, Object>> selectRecDataList(LvsVO vo) throws Exception {
		// TODO Auto-generated method stub
		
		List<Map<String, Object>> resultList = new ArrayList<>();
		Map<String, Object> result  = new HashMap<String,Object>();
		Map<String, Object> subResult  = new HashMap<String,Object>();
		Map<String, Object> kindResult  = new HashMap<String,Object>();
		
		vo.setEmdongLen(); //경계년도에 따라 자리수를 달리 세팅한다.
		
		//setRecData1(vo,subResult);		//step1 추천지표 첫번째 카테고리 전부 다 가져오기
		
		//boolean dulchk = true ;

		for(int i=0; i<vo.getList().size(); i++) {
			String datakind = vo.getList().get(i).toString() ;
			if (datakind==null || datakind.equals("")) continue ;
			
			if (datakind.equals("tot_ppltn")){
				setRecData1(vo,subResult,"tot_ppltn","총인구","명");		//step1 추천지표 첫번째 카테고리 전부 다 가져오기  
			} else if (datakind.equals("tot_family")) {
				setRecData1(vo,subResult,"tot_family","총가구","가구");		//step1 추천지표 첫번째 카테고리 전부 다 가져오기
			} else if (datakind.equals("tot_house")) {
				setRecData1(vo,subResult,"tot_house","총주택","호");		//step1 추천지표 첫번째 카테고리 전부 다 가져오기				
			} else if (datakind.equals("tot_man") || datakind.equals("tot_woman")){
				if (datakind.equals("tot_man")) { 
					vo.setDatakindNm("남자인구");
					vo.setSeekCd("1");
				} else if (datakind.equals("tot_woman")) { 
					vo.setDatakindNm("여자인구");
					vo.setSeekCd("2");
				}
				vo.setUnit("명");				
				vo.setDatakind(datakind);
				setRecData2(vo,subResult);		//남자 여자
				
			} else if (datakind.equals("tot_one_family") 
						|| datakind.equals("old_fmly_cnt")
						|| datakind.equals("old_15_under_cnt")
						|| datakind.equals("old_man_cnt")
						|| datakind.equals("apart_cnt")
						|| datakind.equals("cat_own_cnt")
						|| datakind.equals("oldman_per_medical")
						|| datakind.equals("student_per_teacher")
					) {
				
				if (datakind.equals("tot_one_family")) { 
					vo.setDatakindNm("1인가구변화");
					vo.setSeekCd("stat_house_psn_1_family_cnt");
					vo.setUnit("호");					
				} else if (datakind.equals("old_fmly_cnt")) { 
					vo.setDatakindNm("65세 이상 1인가구 변화");
					vo.setSeekCd("stat_house_age_65_mt1_psn_1_family_cnt");
					vo.setUnit("호");					
				} else if (datakind.equals("old_15_under_cnt")) { 
					vo.setDatakindNm("15세 미만 유소년 인구 변화");
					vo.setSeekCd("stat_age_15_lt0_ppltn_cnt");
					vo.setUnit("명");
				} else if (datakind.equals("old_man_cnt")) { 
					vo.setDatakindNm("65세 이상 고령자 인구 변화");
					vo.setSeekCd("stat_age_65_mt1_ppltn_cnt");
					vo.setUnit("명");
				} else if (datakind.equals("apart_cnt")) { 
					vo.setDatakindNm("아파트");
					vo.setSeekCd("stat_apt_cnt_per"); 
					vo.setUnit("호");
				} else if (datakind.equals("cat_own_cnt")) { 
					vo.setDatakindNm("1인당 자동차 등록대수");
					vo.setSeekCd("elcltyidx_psnby_1_car_reg_cnt"); 
					vo.setUnit("대");
					
				} else if (datakind.equals("oldman_per_medical")) { 
					vo.setDatakindNm("보건시설 1개당 65세이상 노인인구");
					vo.setSeekCd("kosis_hfby_1_age_65_mt1_ppltn_cnt"); 
					vo.setUnit("명");					
				} else if (datakind.equals("student_per_teacher")) { 
					vo.setDatakindNm("교원1인당 학생 수");
					vo.setSeekCd("elcltyidx_faculty_1_psnby_student_cnt"); 
					vo.setUnit("명");					
				}
				vo.setDatakind(datakind);
				setRecData3(vo,subResult);		//남자 여자					
			}  else if (datakind.equals("corp_cnt")) {
				vo.setDatakindNm("사업체수");
				vo.setDatakind("corp_cnt");
				vo.setUnit("명");
				setRecData4(vo,subResult);		//step1 추천지표 첫번째 카테고리 전부 다 가져오기
			}  else if (datakind.equals("employee_cnt")) {
				vo.setDatakindNm("종사자수");
				vo.setDatakind("employee_cnt");
				vo.setUnit("명");				
				setRecData4(vo,subResult);		//step1 추천지표 첫번째 카테고리 전부 다 가져오기
			}
		}
		
		//setRecData2(vo,subResult);		//step2 총가구데이터
		kindResult.put(vo.getBoard2Kind(), subResult);		
		result.put(vo.getRegionCd(), kindResult);
		result.put("errMsg", "Success");
		result.put("errCd", "0");
		
		resultList.add(result);
		return  resultList ;
	}
	
	
	//총인구 데이터 세팅
	private void setRecData1(LvsVO vo, Map<String, Object> subResult, String datakind, String  title, String unit) throws Exception {
		//1.기본정보
		//2.연도별 정보
		//3.상위행정구역에 대한 연도별 정보
		//4.대전,서구,둔산동 등 행정구역별 정보
		//5.하위행정구역별 인구정보 (subDiv)
		
		/// 1. 최근년도 인구통계 기본정보를 가져온다.
		List<Map<String, Object>> infolist = lvsStatsMapper.selectRecIndex_tot_ppltn(vo) ;

		
		Map<String, Object> transData = new HashMap<String,Object>();
		transData.put("infolist",infolist);
		
		//기본정보가 있다면 
		if (infolist.size() >0) {

			/// 2. 인구통계 연도별 정보를 가져온다.
			List<Map<String, Object>> yearListData = lvsStatsMapper.selectCensusRecIndexYear(vo) ;
			transData.put("yearListData",yearListData);			
			
			
			// 3. 인구통계 연도별 정보에 대한 상위행정구역에 대한 정보를 가져온다.
			LvsVO vo2 = vo.clone();
			
			if (vo.getViewCd().equals("sgg") || vo.getViewCd().equals("emdong")) {   //시군구 또는 읍면동 모드라면
				vo2.setRegionCd(vo.getSidoCd());    
			} else if  (vo.getViewCd().equals("sido")) {  //시도라면
				vo2.setRegionCd("00");			
			}
			
			List<Map<String, Object>> yearListUpData = lvsStatsMapper.selectCensusRecIndexYear(vo2) ;
			transData.put("yearListUpData",yearListUpData);			
			
			/// 4. 대전, 서구, 둔산동 등 행정구역별 정보
			System.out.print("lvsStatsMapper.selectRecIndex_tot_ppltn_region");
			System.out.print(vo.toString());			
			List<Map<String, Object>> infoRegionlist = lvsStatsMapper.selectRecIndex_tot_ppltn_region(vo) ;
			
			transData.put("infoRegionlist",infoRegionlist);			
			
			//5. 하위 행정구별 인구데이터 subDiv
			//하위 행정구역에 관한 정보를 가져온다.
			List<Map<String, Object>> censusIndexList = lvsStatsMapper.selectCensusIndex(vo) ;
			transData.put("censusIndexList",censusIndexList);			
		}
		
		setRecData1_sub(transData,subResult, datakind, title, unit);		
		
		//setRecData1_sub(transData,subResult, "tot_family", "총가구","(호)");		
		//setRecData1_sub(transData,subResult, "tot_ppltn", "총인구","(명)");
		
	}
	
	// 지표별로 한번 불러온 데이터를 같이사용한다.
	public void setRecData1_sub(Map<String, Object> transData, Map<String, Object> subResult, String datakind, String  title, String unit) throws Exception {
		List<Map<String, Object>> infolist = (List<Map<String, Object>>) transData.get("infolist");
		Map<String, Object> data = infolist.get(0);

		data.put("name", title.toString());
		data.put("title", title.toString());
		data.put("unit", unit.toString());
		data.put("this_val", Integer.parseInt(String.valueOf(data.get(datakind.toString()+"")))) ;		
				
		//기본정보가 있다면 
		if (infolist.size() >0) {
			/// 2. 인구통계 연도별 정보를 가져온다.
			List<Map<String, Object>> yearListData = (List<Map<String, Object>>) transData.get("yearListData");			
			
			Map<String, Object> data_year = new HashMap<String,Object>();
			
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<yearListData.size(); i++) {
				Map<String, Object> row = yearListData.get(i);
				yearList.add((String) row.get("base_year"));
				tot_data.add(Integer.parseInt(String.valueOf(row.get(datakind.toString()+""))));
			}
			
			data_year.put("category", yearList) ;			
			data_year.put("data", tot_data) ;
			data_year.put("title", title) ;
			
			data.put("yearData", data_year) ;				
			// 3. 인구통계 연도별 정보에 대한 상위행정구역에 대한 정보를 가져온다.
			List<Map<String, Object>> yearListUpData = (List<Map<String, Object>>) transData.get("yearListUpData");		
			
			Map<String, Object> data_year2 = new HashMap<String,Object>();
			
			ArrayList<String> yearList2 = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data2 = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<yearListUpData.size(); i++) {
				Map<String, Object> row = yearListUpData.get(i);
				yearList2.add((String) row.get("base_year"));
				tot_data2.add(Integer.parseInt(String.valueOf(row.get(datakind.toString()+"")))); 
			}
			
			data_year2.put("category", yearList2) ;			
			data_year2.put("data", tot_data2) ;
			data_year2.put("title", title) ;
			
			data.put("yearDataUp", data_year2) ;
			
			/// 4. 대전, 서구, 둔산동 등 행정구역별 정보
			String recent_year = (String)data.get("base_year")  ;
			List<Map<String, Object>> infoRegionlist = (List<Map<String, Object>>) transData.get("infoRegionlist");			
			
			ArrayList<String> regionList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> region_data = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<infoRegionlist.size(); i++) {
				Map<String, Object> row = infoRegionlist.get(i);
				regionList.add((String) row.get("name"));
				region_data.add(Integer.parseInt(String.valueOf(row.get(datakind.toString()+""))));
				
			}
			
			data.put("category", regionList) ;
			data.put("chartData", region_data) ;
			
			//5. 하위 행정구별 인구데이터 subDiv
			//하위 행정구역에 관한 정보를 가져온다.
			List<Map<String, Object>> censusIndexList = (List<Map<String, Object>>) transData.get("censusIndexList");			
			
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<censusIndexList.size(); i++) {
				divList.add(censusIndexList.get(i));
			}
			
			Map<String, Object> data_div_year = new HashMap<String,Object>();
			data_div_year.put(recent_year,divList); 
			
			data.put("subDiv",data_div_year);
		}
		
		/////////////////////////////
		subResult.put(datakind.toString(), data);
		System.out.println("debug");
	}
	

	@Override
	public List<Map<String, Object>> selectRecDataListByYear(LvsVO vo) throws Exception {
		String datakind = vo.getDatakind().toString() ;
		
		if ( vo.getDatakind().equals("tot_ppltn")  ||    //총인구
			 vo.getDatakind().equals("tot_family")  ||   //총가구
			 vo.getDatakind().equals("tot_house") 		//총주택	 
		) { return lvsStatsMapper.selectCensusIndex(vo) ;
		
		} else if (vo.getDatakind().equals("tot_man")  ) {
			vo.setSeekCd("1");
			return lvsStatsMapper.selectRecIndex_tot_man_subdiv(vo) ;   //남자인구,여자인구			
		} else if (vo.getDatakind().equals("tot_woman")  ) {
			vo.setSeekCd("2");
			return lvsStatsMapper.selectRecIndex_tot_man_subdiv(vo) ;   //남자인구,여자인구
		} else if ( datakind.equals("tot_one_family") 
				    || datakind.equals("old_fmly_cnt") 
				    || datakind.equals("old_15_under_cnt") 
				    || datakind.equals("old_man_cnt")
				    || datakind.equals("apart_cnt")
				    || datakind.equals("car_own_cnt")				    
				    ){
			
			vo.setQueryYear(vo.getThisYear());
			if (datakind.equals("tot_one_family")) {vo.setSeekCd("stat_house_psn_1_family_cnt");}  				
			else if (datakind.equals("old_fmly_cnt")) {vo.setSeekCd("stat_house_age_65_mt1_psn_1_family_cnt");}  
			else if (datakind.equals("old_15_under_cnt")) {vo.setSeekCd("stat_age_15_lt0_ppltn_cnt");} 
			else if (datakind.equals("old_man_cnt")) {vo.setSeekCd("stat_age_65_mt1_ppltn_cnt");}
			else if (datakind.equals("apart_cnt")) {vo.setSeekCd("stat_apt_cnt_per");}
			else if (datakind.equals("car_own_cnt")) {vo.setSeekCd("elcltyidx_psnby_1_car_reg_cnt");}			

			return lvsStatsMapper.selectRecIndex_themaMapData_subdiv(vo) ;   //남자인구,여자인구			
		}
		return null;
	}
	
	@Override
	public List<Map<String, Object>> selectCensusIndexList(LvsVO vo) throws Exception {
		// TODO Auto-generated method stub
		return lvsStatsMapper.selectCensusIndex(vo) ;
	}
	
	
	@Override
	public List<Map<String, Object>> selectCensusIndexYearList(LvsVO vo) throws Exception {
		// TODO Auto-generated method stub
		return lvsStatsMapper.selectCensusRecIndexYear(vo) ;
	}
	
	// 추천지표 남자인구 여자인구
	private void setRecData2(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		//1.기본정보
		//2.연도별 정보
		//3.상위행정구역에 대한 연도별 정보
		//4.대전,서구,둔산동 등 행정구역별 정보
		//5.하위행정구역별 인구정보 (subDiv)
		
		/// 1. 최근년도 인구통계 기본정보를 가져온다.
		System.out.print(vo.getDatakind() + "step1");
		System.out.print(vo.toString());
		
		List<Map<String, Object>> infolist = lvsStatsMapper.selectRecIndex_tot_man(vo) ;
		Map<String, Object> data = infolist.get(0);
		

		data.put("unit", vo.getUnit().toString());
		data.put("title", vo.getDatakindNm().toString());
		data.put("name", vo.getDatakindNm().toString());
		data.put("region_cd", vo.getRegionCd());		
		
		
		//기본정보가 있다면

		if (infolist.size() >0) {

			/// 2. 남자인구 여자인구 통계 연도별 정보를 가져온다.   union 시켜야 함.
			System.out.print(vo.getDatakind() + "step2");			
			List<Map<String, Object>> yearListData = lvsStatsMapper.selectRecIndex_tot_manYear(vo) ;  // 다시 쿼리 
			
			Map<String, Object> data_year = new HashMap<String,Object>();
			
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<yearListData.size(); i++) {
				Map<String, Object> row = yearListData.get(i);
				if (row.get("val") == null) continue ;
				yearList.add((String) row.get("base_year"));
				tot_data.add(Integer.parseInt(String.valueOf(row.get("val"))));
			}
			
			data_year.put("category", yearList) ;			
			data_year.put("data", tot_data) ;
			data_year.put("title", vo.getDatakindNm().toString()) ;
			data.put("yearData", data_year) ;
			

			
			// 3. 인구통계 연도별 정보에 대한 상위행정구역에 대한 정보를 가져온다.
			List<Map<String, Object>> yearListUpData = lvsStatsMapper.selectRecIndex_tot_man_updata(vo) ;		
			
			Map<String, Object> data_year2 = new HashMap<String,Object>();
			
			ArrayList<String> yearList2 = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data2 = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<yearListUpData.size(); i++) {
				Map<String, Object> row = yearListUpData.get(i);
				if (row.get("val")==null) continue ;
				yearList2.add((String) row.get("base_year"));
				tot_data2.add(Integer.parseInt(String.valueOf(row.get("val"))));
			}
			
			data_year2.put("category", yearList2) ;			
			data_year2.put("data", tot_data2) ;
			data_year2.put("title", vo.getDatakindNm().toString()) ;
			
			data.put("yearDataUp", data_year2) ;

			
			/// 4. 대전, 서구, 둔산동 등 행정구역별 정보
			System.out.print(vo.getDatakind() + "step4");
			System.out.print(vo.toString());			
			List<Map<String, Object>> infoRegionlist = lvsStatsMapper.selectRecIndex_tot_man_region(vo) ;
			
			ArrayList<String> regionList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> region_data = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<infoRegionlist.size(); i++) {
				Map<String, Object> row = infoRegionlist.get(i);
				if (row.get("val")==null) continue ;				
				regionList.add((String) row.get("name"));
				region_data.add(Integer.parseInt(String.valueOf(row.get("val"))));
			}
			
			data.put("category", regionList) ;
			data.put("chartData", region_data) ;
			
			//5. 하위 행정구별 인구데이터 subDiv
			//하위 행정구역에 관한 정보를 가져온다.
			List<Map<String, Object>> censusIndexList = lvsStatsMapper.selectRecIndex_tot_man_subdiv(vo) ;
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<censusIndexList.size(); i++) {
				divList.add(censusIndexList.get(i));
			}
			
			Map<String, Object> data_div_year = new HashMap<String,Object>();
			String recentYear = vo.getThisYear().toString() ;
			data.put("base_year", recentYear);			
			data_div_year.put(recentYear, divList); 
			data.put("subDiv",data_div_year);
		}
		
		/////////////////////////////
		subResult.put(vo.getDatakind().toString(), data);
		
	}
	
	// 추천지표 
	/* 통계주제도 테마형
	1인 가구 변화
	65세 이상 1인가구 변화
	15세 미만 유소년 인구 변화
	65세 이상 고령자 인구 변화
	*/
	private void setRecData3(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		//1.기본정보
		//2.연도별 정보
		//3.상위행정구역에 대한 연도별 정보
		//4.대전,서구,둔산동 등 행정구역별 정보
		//5.하위행정구역별 인구정보 (subDiv)
		
		/// 1. 최근년도 인구통계 기본정보를 가져온다.
		System.out.print(vo.getDatakind() + "step1");
		System.out.print(vo.toString());
		
		List<Map<String, Object>> infolist = lvsStatsMapper.selectRecIndex_themaMapData(vo) ;
		if (infolist.size()==0) return ;
		
		Map<String, Object> data = infolist.get(0);
		
		data.put("unit", vo.getUnit().toString());
		data.put("title", vo.getDatakindNm().toString());
		data.put("name", vo.getDatakindNm().toString());
		data.put("region_cd", vo.getRegionCd());
		
		String queryYear =   data.get("base_year").toString();
		vo.setQueryYear(queryYear);
		
		//기본정보가 있다면

		if (infolist.size() >0) {

			/// 2. 남자인구 여자인구 통계 연도별 정보를 가져온다.   union 시켜야 함.
			System.out.print(vo.getDatakind() + "step2");			
			List<Map<String, Object>> yearListData = lvsStatsMapper.selectRecIndex_themaMapData_year(vo) ;  // 다시 쿼리 
			
			Map<String, Object> data_year = new HashMap<String,Object>();
			
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			ArrayList<Float> tot_data_float = new ArrayList<>();  //합계데이터			
			
			for(int i=0; i<yearListData.size(); i++) {
				Map<String, Object> row = yearListData.get(i);
				yearList.add((String) row.get("base_year"));
				String num = String.valueOf(row.get("val")) ;
				if (num==null) {
					continue ;					
				} else if (num.indexOf(".")>=0) {
					tot_data_float.add(Float.parseFloat(num));
				} else if (num.indexOf(".")== -1) {
					tot_data.add(Integer.parseInt(num));					
				}
			}
			
			data_year.put("category", yearList) ;
			if (yearList.size() == tot_data.size()) data_year.put("data", tot_data) ;
			if (yearList.size() == tot_data_float.size()) data_year.put("data", tot_data_float) ;			
			
			data_year.put("title", vo.getDatakindNm().toString()) ;
			data.put("yearData", data_year) ;
			
			
			// 3. 인구통계 연도별 정보에 대한 상위행정구역에 대한 정보를 가져온다.
			List<Map<String, Object>> yearListUpData = lvsStatsMapper.selectRecIndex_themaMapData_updata(vo) ;		
			
			Map<String, Object> data_year2 = new HashMap<String,Object>();
			
			ArrayList<String> yearList2 = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data2 = new ArrayList<>();  //합계데이터
			ArrayList<Float> tot_data2_float = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<yearListUpData.size(); i++) {
				Map<String, Object> row = yearListUpData.get(i);
				if (row.get("val")==null) continue ;
				yearList2.add((String) row.get("base_year"));
				String num = String.valueOf(row.get("val")) ;				
				if (num==null) {
					continue ;					
				} else if (num.indexOf(".")>=0) {
					tot_data2_float.add(Float.parseFloat(num));
				} else if (num.indexOf(".")== -1) {
					tot_data2.add(Integer.parseInt(num));					
				}
			}
			
			data_year2.put("category", yearList2) ;
			
			if (yearList2.size() == tot_data2.size()) data_year2.put("data", tot_data2) ;
			if (yearList2.size() == tot_data2_float.size()) data_year2.put("data", tot_data2_float) ;			
			
			data.put("yearDataUp", data_year2) ;
			
			/// 4. 대전, 서구, 둔산동 등 행정구역별 정보
			System.out.print(vo.getDatakind() + "step4");
			System.out.print(vo.toString());			
			List<Map<String, Object>> infoRegionlist = lvsStatsMapper.selectRecIndex_themaMapData_region(vo) ;
			
			ArrayList<String> regionList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> region_data = new ArrayList<>();  //합계데이터
			ArrayList<Float> region_data_float = new ArrayList<>();  //합계데이터			
			
			for(int i=0; i<infoRegionlist.size(); i++) {
				Map<String, Object> row = infoRegionlist.get(i);
				if (row.get("val")==null) continue ;				
				regionList.add((String) row.get("name"));
				
				String num = String.valueOf(row.get("val")) ;				
				if (num==null) {
					continue ;					
				} else if (num.indexOf(".")>=0) {
					region_data_float.add(Float.parseFloat(num));
				} else if (num.indexOf(".")== -1) {
					region_data.add(Integer.parseInt(num));					
				}
				
			}
			
			data.put("category", regionList) ;
			if (regionList.size() == region_data.size()) data.put("chartData", region_data) ;
			if (regionList.size() == region_data_float.size()) data.put("chartData", region_data_float) ;			
			
			//5. 하위 행정구별 인구데이터 subDiv
			//하위 행정구역에 관한 정보를 가져온다.
			List<Map<String, Object>> censusIndexList = lvsStatsMapper.selectRecIndex_themaMapData_subdiv(vo) ;
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<censusIndexList.size(); i++) {
				divList.add(censusIndexList.get(i));
			}
			
			Map<String, Object> data_div_year = new HashMap<String,Object>();
			String recentYear = vo.getThisYear().toString() ;
			data.put("base_year", recentYear);			
			data_div_year.put(recentYear, divList); 
			data.put("subDiv",data_div_year);
		}
		
		/////////////////////////////
		subResult.put(vo.getDatakind().toString(), data);
		
	}
	
	// 추천지표 
	/* 사업체수
	 * 종업원수
	*/
	private void setRecData4(LvsVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		//1.기본정보
		//2.연도별 정보
		//3.상위행정구역에 대한 연도별 정보
		//4.대전,서구,둔산동 등 행정구역별 정보
		//5.하위행정구역별 인구정보 (subDiv)
		
		/// 1. 최근년도  기본정보를 가져온다.
		System.out.print(vo.getDatakind() + "step1");
		System.out.print(vo.toString());
		
		List<Map<String, Object>> infolist = lvsStatsMapper.selectRecIndex_corpcensus_index(vo) ;
		Map<String, Object> data = infolist.get(0);
		
		data.put("unit", vo.getUnit().toString());
		data.put("title", vo.getDatakindNm().toString());
		data.put("name", vo.getDatakindNm().toString());
		data.put("region_cd", vo.getRegionCd());
		
		String queryYear =   data.get("base_year").toString();
		vo.setQueryYear(queryYear);
		
		//기본정보가 있다면

		if (infolist.size() >0) {

			/// 2.  통계 연도별 정보를 가져온다. 
			System.out.print(vo.getDatakind() + "step2");			
			List<Map<String, Object>> yearListData = lvsStatsMapper.selectRecIndex_corpcensus_index_year(vo) ;  // 다시 쿼리 
			
			Map<String, Object> data_year = new HashMap<String,Object>();
			
			ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data = new ArrayList<>();  //합계데이터
			ArrayList<Float> tot_data_float = new ArrayList<>();  //합계데이터			
			
			for(int i=0; i<yearListData.size(); i++) {
				Map<String, Object> row = yearListData.get(i);
				yearList.add((String) row.get("base_year"));
				String num = String.valueOf(row.get("val")) ;
				if (num==null) {
					continue ;					
				} else if (num.indexOf(".")>=0) {
					tot_data_float.add(Float.parseFloat(num));
				} else if (num.indexOf(".")== -1) {
					tot_data.add(Integer.parseInt(num));					
				}
			}
			
			data_year.put("category", yearList) ;
			if (yearList.size() == tot_data.size()) data_year.put("data", tot_data) ;
			else if (yearList.size() == tot_data_float.size()) data_year.put("data", tot_data_float) ;
			
			
			data_year.put("title", vo.getDatakindNm().toString()) ;
			data.put("yearData", data_year) ;
			
			
			// 3.연도별 정보에 대한 상위행정구역에 대한 정보를 가져온다.
			List<Map<String, Object>> yearListUpData = lvsStatsMapper.selectRecIndex_corpcensus_index_updata(vo) ;		
			
			Map<String, Object> data_year2 = new HashMap<String,Object>();
			
			ArrayList<String> yearList2 = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> tot_data2 = new ArrayList<>();  //합계데이터
			ArrayList<Float> tot_data2_float = new ArrayList<>();  //합계데이터
			
			for(int i=0; i<yearListUpData.size(); i++) {
				Map<String, Object> row = yearListUpData.get(i);
				if (row.get("val")==null) continue ;
				yearList2.add((String) row.get("base_year"));
				String num = String.valueOf(row.get("val")) ;				
				if (num==null) {
					continue ;					
				} else if (num.indexOf(".")>=0) {
					tot_data2_float.add(Float.parseFloat(num));
				} else if (num.indexOf(".")== -1) {
					tot_data2.add(Integer.parseInt(num));					
				}
			}
			
			data_year2.put("category", yearList2) ;
			
			if (yearList2.size() == tot_data2.size()) data_year2.put("data", tot_data2) ;
			if (yearList2.size() == tot_data2_float.size()) data_year2.put("data", tot_data2_float) ;			
			
			data.put("yearDataUp", data_year2) ;
			
			/// 4. 대전, 서구, 둔산동 등 행정구역별 정보
			System.out.print(vo.getDatakind() + "step4");
			System.out.print(vo.toString());			
			List<Map<String, Object>> infoRegionlist = lvsStatsMapper.selectRecIndex_corpcensus_index_region(vo) ;
			
			ArrayList<String> regionList = new ArrayList<>();  // 지표리스트
			ArrayList<Integer> region_data = new ArrayList<>();  //합계데이터
			ArrayList<Float> region_data_float = new ArrayList<>();  //합계데이터			
			
			for(int i=0; i<infoRegionlist.size(); i++) {
				Map<String, Object> row = infoRegionlist.get(i);
				if (row.get("val")==null) continue ;				
				regionList.add((String) row.get("name"));
				
				String num = String.valueOf(row.get("val")) ;				
				if (num==null) {
					continue ;					
				} else if (num.indexOf(".")>=0) {
					region_data_float.add(Float.parseFloat(num));
				} else if (num.indexOf(".")== -1) {
					region_data.add(Integer.parseInt(num));					
				}
				
			}
			
			data.put("category", regionList) ;
			if (regionList.size() == region_data.size()) data.put("chartData", region_data) ;
			if (regionList.size() == region_data_float.size()) data.put("chartData", region_data_float) ;			
			
			//5. 하위 행정구별 인구데이터 subDiv
			//하위 행정구역에 관한 정보를 가져온다.
			List<Map<String, Object>> censusIndexList = lvsStatsMapper.selectRecIndex_corpcensus_index_subdiv(vo) ;
			
			ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
			for(int i=0; i<censusIndexList.size(); i++) {
				divList.add(censusIndexList.get(i));
			}
			
			Map<String, Object> data_div_year = new HashMap<String,Object>();
			String recentYear = vo.getThisYear().toString() ;
			data.put("base_year", recentYear);			
			data_div_year.put(recentYear, divList); 
			data.put("subDiv",data_div_year);
		}
		
		/////////////////////////////
		subResult.put(vo.getDatakind().toString(), data);
		
	}
	
	//모든지표보기
	@Override
	public List<Map<String, Object>> selectAllDataList(LvsSeekVO vo) throws Exception {
		
		List<Map<String, Object>> resultList = new ArrayList<>();
		Map<String, Object> result  = new HashMap<String,Object>();
		Map<String, Object> subResult  = new HashMap<String,Object>();
		Map<String, Object> kindResult  = new HashMap<String,Object>();
		
		//코드값마다, 실행하는 함수를 달리함.
		if (vo.getDatakind().equals("oneman_house")){
			vo.setSeekCd("stat_house_psn_1_family_cnt");
			vo.setTitle("1인가구 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("old_oneman")){
			vo.setSeekCd("stat_house_age_65_mt1_psn_1_family_cnt");
			vo.setTitle("65세 이상 1인가구 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_reg")){
			vo.setSeekCd("kosis_rsgst_ppltn_cnt");
			vo.setTitle("주민등록 인구 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_increase")){
			vo.setSeekCd("kosis_nrincrs_cnt_cnt");
			vo.setTitle("인구 자연증가 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_movement")){
			vo.setSeekCd("kosis_nmgr_cnt_cnt");
			vo.setTitle("인구 이동 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("old_age_cnt")){
			vo.setSeekCd("stat_age_65_mt1_ppltn_cnt");
			vo.setTitle("65세이상 고령자 인구변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_foreigner")){
			vo.setSeekCd("kosis_foreign_inhbtnt_cnt");
			vo.setTitle("외국인 주민 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_movement")){
			vo.setSeekCd("kosis_nmgr_cnt_cnt");
			vo.setTitle("인구이동");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_increase")){
			vo.setSeekCd("kosis_nrincrs_cnt_cnt");
			vo.setTitle("인구 자연증가 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("old_oneman")){
			vo.setSeekCd("stat_house_age_65_mt1_psn_1_family_cnt");
			vo.setTitle("65세 이상 1인가구 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("man_per_woman_rt")){
			vo.setSeekCd("kosis_gender_rt");
			vo.setTitle("여자인구 대비 남자인구 비율");
		    setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_foreigner")){
			vo.setSeekCd("kosis_foreign_inhbtnt_cnt");
			vo.setTitle("외국인 주민 현황");
		    setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("newbaby_cnt")){
			vo.setSeekCd("kosis_birth_cnt_cnt");
			vo.setTitle("출생 현황");
		    setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("dead_cnt")){
			vo.setSeekCd("kosis_death_cnt_cnt");
			vo.setTitle("사망 현황");
		    setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("marrige_cnt")){
			vo.setSeekCd("kosis_mrg_cnt_cnt");
			vo.setTitle("혼인 현황");
		    setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("divorce_cnt")){
			vo.setSeekCd("kosis_dvrc_cnt_cnt");
			vo.setTitle("이혼 현황");
		    setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		
		if (vo.getDatakind().equals("country_house_midage")){
			vo.setSeekCd("stat_aglfrs_fhrshs_3049_irds");
			vo.setTitle("지역별 농림어가의 청장년인구 변화");
		    setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("pptln_youngman")){
			vo.setSeekCd("stat_age_15_lt0_ppltn_cnt");
			vo.setTitle("15세 미만 유소년 인구 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("back_farm")){
			vo.setSeekCd("kosis_rtrn_frmhs_cnt");
			vo.setTitle("귀농/귀촌/귀어 인구현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("bicycle_cnt")){
			vo.setSeekCd("kosis_trmnl_bcycl_cnt_per");
			vo.setTitle("공영자전거 운영 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ev_charge")){
			vo.setSeekCd("c15f0ed1-f4cb-45ae-8e98-fa4e8d7c5692");
			vo.setTitle("전기차 충전소(급속) 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("house_per_thousand_ppltn")){
			vo.setSeekCd("stat_psby_1000_house_cnt");
			vo.setTitle("인구 천명당 주택 수 증감 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("ppltn_per_house_rt")){
			vo.setSeekCd("stat_hsby_1_mean_fmember_cnt");
			vo.setTitle("주택당 평균 가구원 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("com_ppltn_insgg")){
			vo.setSeekCd("kosis_samenss_sgg_in_atndf_atndsk_ppltn_cnt_per");
			vo.setTitle("통근통학 인구변화(시군구내)");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("com_ppltn_exsgg")){
			vo.setSeekCd("kosis_in_otr_sgg_atndf_atndsk_ppltn_cnt_per");
			vo.setTitle("통근통학 인구변화(타시군구)");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("com_ppltn_transport")){
			vo.setSeekCd("kosis_tfcmn_atndf_atndsk_ppltn_cnt_per");
			vo.setTitle("통근통학 인구변화(대중교통)");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("parking_own_rt")){
			vo.setSeekCd("kosis_pvt_prkplce_per");
			vo.setTitle("자가주차장 확보율");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("oldhouse_cnt")){
			vo.setSeekCd("stat_spanuathouse_cnt");
			vo.setTitle("30년이상 노후주택 분포현황	통계주제도");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("back_farm")){
			vo.setSeekCd("kosis_rtrn_frmhs_cnt");
			vo.setTitle("귀농 인구 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("back_country")){
			vo.setSeekCd("kosis_rtrn_home_cnt");
			vo.setTitle("귀촌 인구 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("back_fishing")){
			vo.setSeekCd("kosis_rtrn_fhrshs_cnt");
			vo.setTitle("귀어 인구 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("oldman_per_medical")){
			vo.setSeekCd("kosis_hfby_1_age_65_mt1_ppltn_cnt");
			vo.setTitle("보건시설 1개당 65세이상 노인인구");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("child_per_childcare")){
			vo.setSeekCd("kosis_dycrcty_1_age_4_lt1_ppltn_cnt");
			vo.setTitle("보육시설 1개당 어린이 인구");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("disabled_cnt")){
			vo.setSeekCd("kosis_reg_dspsn_cnt");
			vo.setTitle("등록 장애인 수 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("student_per_teacher")){
			vo.setSeekCd("elcltyidx_faculty_1_psnby_student_cnt");
			vo.setTitle("교원1인당 학생 수");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("academy_per_thousand_ppltn")){
			vo.setSeekCd("kosis_ppltn_1000_pvtesbl_instut_cnt");
			vo.setTitle("인구천명당 사설학원수");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("cultural_fac_per_ppltn")){
			vo.setSeekCd("kosis_cfby_1_ppltn_cnt");
			vo.setTitle("문화시설 1개당 인구 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("sports_fac_per_ppltn")){
			vo.setSeekCd("elcltyidx_psnby_100000_sport_fac_cnt");
			vo.setTitle("인구 10만명당 체육시설 수");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("heritage_cnt")){
			vo.setSeekCd("otr_crlts_point");
			vo.setTitle("문화재 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("business_cnt")){
			vo.setSeekCd("stat_biz_cnt");
			vo.setTitle("사업체수 분포 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("employ_cnt")){
			vo.setSeekCd("stat_employee_cnt");
			vo.setTitle("종사자수 분포 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("industry_per_thousand_ppltn")){
			vo.setSeekCd("kosis_psnby_1000_employee_cnt");
			vo.setTitle("인구 천명당 전체산업 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("retail_cnt")){
			vo.setSeekCd("stat_whrtlsal_cnt_per");
			vo.setTitle("도소매업 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("service_cnt")){
			vo.setSeekCd("stat_srv_cnt_per");
			vo.setTitle("서비스업 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("farm_cnt")){
			vo.setSeekCd("stat_nonglim_fishry_cnt_per");
			vo.setTitle("농림어업 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("country_house_cnt")){
			vo.setSeekCd("stat_nongga_family_cnt_irds");
			vo.setTitle("농림어가수 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("financial_indpt_cnt")){
			vo.setSeekCd("elcltyidx_fnidpr");
			vo.setTitle("재정자립도 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("ppltn_per_chicken")){
			vo.setSeekCd("kosis_chicken_rstrt_1_ppltn_cnt");
			vo.setTitle("치킨점 1개당 인구수");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("pc_cnt")){
			vo.setSeekCd("stat_pc_cafe_irds");
			vo.setTitle("PC방 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("supermarket_cnt")){
			vo.setSeekCd("stat_supermarket_irds");
			vo.setTitle("슈퍼마켓 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("bakery_cnt")){
			vo.setSeekCd("stat_bakery_irds");
			vo.setTitle("제과점 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("chicken_cnt")){
			vo.setSeekCd("stat_chicken_rstrt_irds");
			vo.setTitle("치킨전문점 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("cafe_cnt")){
			vo.setSeekCd("stat_coffee_shop_irds");
			vo.setTitle("커피전문점 변화");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("drunken_rt")){
			vo.setSeekCd("elcltyidx_drnkg_per");
			vo.setTitle("음주율 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("smoken_rt")){
			vo.setSeekCd("elcltyidx_smkng_per");
			vo.setTitle("흡연율 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("traffic_accdt_cnt")){
			vo.setSeekCd("otr_inst_transport_acdnt_cnt");
			vo.setTitle("교통사고 건수");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("traffic_accdt_dead_cnt")){
			vo.setSeekCd("otr_inst_transport_acdnt_death_cnt");
			vo.setTitle("교통사고 사망자수");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("cctv_per_lady")){
			vo.setSeekCd("stat_2030_female_pblpic_cnt");
			vo.setTitle("2,30대 1인가구 여성인구와 치안시설 분포현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("childcare_weak_ppltn")){
			vo.setSeekCd("dycrcty_500m_mt_6_age_ppltn_cnt");
			vo.setTitle("보육업체 취약인구");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("oldman_per_medical")){
			vo.setSeekCd("kosis_hfby_1_age_65_mt1_ppltn_cnt");
			vo.setTitle("보건시설 1개당 65세이상 노인인구");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		if (vo.getDatakind().equals("oldman_medical_ppltn")){
			vo.setSeekCd("kosis_ltrs_jdgmnt_ppltn_cnt");
			vo.setTitle("65세 이상 장기요양 급여자 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		

		if (vo.getDatakind().equals("carbon_monoxide_amnt")){
			vo.setSeekCd("otr_cmo_yrymn");
			vo.setTitle("일산화탄소 대기오염도 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("waste_recycle_rt")){
			vo.setSeekCd("elcltyidx_gnl_wste_ruse_rt");
			vo.setTitle("일반폐기물 재활용률");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}

		if (vo.getDatakind().equals("life_waste_cnt")){
			vo.setSeekCd("elcltyidx_psnby_1_domwste_dscamt");
			vo.setTitle("주민 1인당 생활폐기물 배출량");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		

		if (vo.getDatakind().equals("mlti_house")){
			vo.setSeekCd("kosis_multtple_cultures_cnt");
			vo.setTitle("다문화가구 현황");
		   setAllData1(vo,subResult);		//step1 총인구데이터
		}
		
		
		if (vo.getDatakind().equals("tot_ppltn")){
			vo.setTitle("총 인구");
		   setAllData2(vo,subResult);		//step2 총인구데이터
		}
		
		if (vo.getDatakind().equals("avg_age")){
			vo.setTitle("평균 나이");
		   setAllData2(vo,subResult);		//step2평균 나이
		}
		
		if (vo.getDatakind().equals("ppltn_density")){
			vo.setTitle("인구 밀도");
		   setAllData2(vo,subResult);		//step2평균 나이
		}
		
		if (vo.getDatakind().equals("nongga_ppltn")){
			vo.setTitle("농가 인구");
		   setAllData2(vo,subResult);		//step2평균 나이
		}
		
		if (vo.getDatakind().equals("imga_ppltn")){
			vo.setTitle("임가 인구");
		   setAllData2(vo,subResult);		//step2평균 나이
		}
		
		
		
		
		if (vo.getDatakind().equals("tot_man")){
			vo.setTitle("남자 인구");
			vo.setSeekCd("1");
		   setAllData3(vo,subResult);		//step2평균 나이
		}
		
		if (vo.getDatakind().equals("tot_woman")){
			vo.setTitle("여자 인구");
			vo.setSeekCd("2");			
			setAllData3(vo,subResult);		//step2평균 나이
		}
		
		result.put(vo.getRegionCd(), subResult);
		result.put("errMsg", "Success");
		result.put("errCd", "0");
		
		resultList.add(result);
		return  resultList ;
		
	}
	
	//총가구데이터 세팅
	private void setAllData1(LvsSeekVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
		List<Map<String, Object>> infolist =  lvsStatsMapper.select_mng_dt_themamapdata(vo) ;
	    System.out.println(vo.toString());		
		
	    
		ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
		ArrayList<Integer> chart_data = new ArrayList<>();  //합계데이터
		ArrayList<Float> chart_data_float = new ArrayList<>();  //합계데이터
		
		
		boolean is_float = false ;
		for(int i=0; i<infolist.size(); i++) {
			Map<String, Object> row = infolist.get(i);				
			String num =  String.valueOf(row.get("val")) ;
			if (num.contains(".") && isNumeric(num)) {
				is_float = true ;
				break ;
			}
		}			
		
		for(int i=0; i<infolist.size(); i++) {
			Map<String, Object> row = infolist.get(i);
			yearList.add((String) row.get("base_year"));
			if (is_float) chart_data_float.add(Float.parseFloat(String.valueOf(row.get("val")))); 
			else chart_data.add(Integer.parseInt(String.valueOf(row.get("val"))));
			//동모드일때는 자기동에 대한 데이터는 강조red 로 표시 해야 함.
		}
		
		subResult.put("title", vo.getTitle()) ;		
		subResult.put("category", yearList) ;
		if (is_float) subResult.put("data", chart_data_float) ; 
		else subResult.put("data", chart_data) ;
			
		
		if (infolist.size()==0) {
			subResult.put("subDiv", null) ;			
			return ;
		}
	
		LvsSeekVO vo2 = new LvsSeekVO();	
		/* 		title 		seekCd  		regionCd 		queryYear 		borderYear */
		vo2.setTitle(vo.getTitle());
	    vo2.setSeekCd(vo.getSeekCd());
	    vo2.setRegionCd(vo.getViewCd().equals("sido")?vo.getSidoCd():vo.getSidoCd()+vo.getSggCd());
	    vo2.setInfoDiv(vo.getViewCd().equals("sido")?"2":"3");
	    vo2.setViewCd(vo.getViewCd());
	    vo2.setQueryYear(infolist.get(infolist.size()-1).get("base_year").toString());
	    vo2.setBorderYear(vo.getBorderYear());
	    System.out.println(vo2.toString());
	    
	    
	    List<Map<String, Object>> subDivlist =  lvsStatsMapper.select_mng_dt_themamapdata_with_admboard(vo2) ;	    
		ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
		for(int i=0; i<subDivlist.size(); i++) {
			divList.add(subDivlist.get(i));
		}
		subResult.put("subDiv", divList) ;
	}
	
	
	//총인구, 인구밀도, 평균나이
	private void setAllData2(LvsSeekVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
	    
	    
		List<Map<String, Object>> yearlistData =  lvsStatsMapper.select_allstat_srv_dt_census_index_yearlist(vo) ;		
	    
		ArrayList<String> yearList = new ArrayList<>();  // 지표리스트
		String baseYear="" ;
		for(int i=0; i<yearlistData.size(); i++) {
			Map<String, Object> row = yearlistData.get(i);
			yearList.add((String) row.get("base_year"));
			if (i==yearlistData.size()-1) 
				baseYear = (String) row.get("base_year") ;
		}
		
		ArrayList<String> admList = new ArrayList<>();  // 동이름리스트		
		ArrayList<Float> chart_data = new ArrayList<>();  //합계데이터
		
		if (vo.getQueryYear()==null || vo.getQueryYear().equals(""))
			vo.setQueryYear(baseYear);
		
	    if  (vo.getViewCd().equals("sido"))  vo.setInfoDiv("2");
	    else vo.setInfoDiv("3");
	    System.out.println(vo.toString());
		List<Map<String, Object>> infolist =  lvsStatsMapper.select_allstat_srv_dt_census_index(vo) ;
	    
		
		for(int i=0; i<infolist.size(); i++) {
			Map<String, Object> row = infolist.get(i);
			admList.add((String) row.get("adm_nm"));
			chart_data.add(Float.parseFloat(String.valueOf(row.get("val"))));
		}
		
		
		subResult.put("title", vo.getTitle()) ;		
		subResult.put("category", admList) ;
		subResult.put("yearlist", yearList) ;		
		subResult.put("data", chart_data) ;
		subResult.put("tableData", infolist) ;		
		
	    
		ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
		for(int i=0; i<infolist.size(); i++) {
			divList.add(infolist.get(i));
		}
		subResult.put("subDiv", divList) ;
	}
	
	
	//남자인구, 여자인구
	private void setAllData3(LvsSeekVO vo, Map<String, Object> subResult) throws CloneNotSupportedException {
	
		
		ArrayList<String> admList = new ArrayList<>();  // 동이름리스트		
		ArrayList<Float> chart_data = new ArrayList<>();  //합계데이터
		
		if (Integer.parseInt(vo.getBorderYear())<=2021) vo.setLen(7);   //행정코드자리수를 2021이면 7자리
		if (vo.getQueryYear()==null) {
			vo.setQueryYear(vo.getThisYear());
		}
		
	    System.out.println("===================");		
	    System.out.println(vo.toString());
		List<Map<String, Object>> infolist =  lvsStatsMapper.select_allstat_srv_dt_popsreg(vo) ;
		List<Map<String, Object>> infolist2 =  lvsStatsMapper.select_allstat_srv_dt_popsreg_up_area(vo) ;		
				
	    
		for(int i=0; i<infolist.size(); i++) {
			Map<String, Object> row = infolist.get(i);
			admList.add((String) row.get("adm_nm"));
			chart_data.add(Float.parseFloat(String.valueOf(row.get("val"))));
		}
		
		subResult.put("title", vo.getTitle()) ;		
		subResult.put("category", admList) ;
		subResult.put("yearlist", vo.getYearList()) ;		
		subResult.put("data", chart_data) ;
		subResult.put("tableData", infolist) ;
		subResult.put("tableData2", infolist2) ;		
		
	    
		ArrayList<Map<String, Object>> divList = new ArrayList<>();  // 지표리스트
		for(int i=0; i<infolist.size(); i++) {
			divList.add(infolist.get(i));
		}
		subResult.put("subDiv", divList) ;
	}
	
	
	  /***추천데이터 집계구 데이터 **/
		@Override
		public List<Map<String, Object>> selectRecDataListByReg(LvsVO vo) throws Exception {
			// TODO Auto-generated method stub
			System.out.println(vo.toString());

			List<Map<String, Object>> resultList = new ArrayList<>();
			Map<String, Object> result  = new HashMap<String,Object>();
			
			List<Map<String, Object>> subResult = new ArrayList<>();			
			
			if(vo.getDatakind().equals("tot_ppltn") ||
			   vo.getDatakind().equals("tot_man") || 
			   vo.getDatakind().equals("tot_woman")) {
				subResult = lvsStatsMapper.selectRecIndex_popsreg(vo) ;
			} else if (false) {
				//다른 통계들 처리 해야 함.
				
			}
			
			result.put("data", subResult);
			result.put("errMsg", "Success");
			result.put("errCd", "0");
			
			resultList.add(result);
			return  resultList ;
		}
	
}
