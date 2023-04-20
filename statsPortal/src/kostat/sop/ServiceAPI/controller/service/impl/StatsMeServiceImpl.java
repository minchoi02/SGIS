/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.StatsMeService;
import kostat.sop.ServiceAPI.controller.service.mapper.StatsMeMapper;

/**
 * @Class Name : StatsMeServiceImpl.java
 * @Description : StatsMeServiceImpl DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.10.31   김남민      최초생성
 *
 * @author SGIS+ 스마트플랫폼
 * @since 2018.10.31
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
//@EnableScheduling
@Service("statsMeService")
public class StatsMeServiceImpl extends EgovAbstractServiceImpl implements StatsMeService {

	private static final Logger LOGGER = LoggerFactory.getLogger(StatsMeServiceImpl.class);
	
	@Resource(name="statsMeService")
	private StatsMeService statsMeService;
	
	@Resource(name="statsMeMapper")
	private StatsMeMapper statsMeMapper;
	
	@Resource( name = "stats_defult_bnd_year" )
	private String DEFAULT_BND_YEAR;
	
	//데이터마트 생성 배치 실행 중 여부
	private static String MAKE_SRV_DT_CTLG_DTWRH_BATCH_YN = "N";
	
	/*
	 * 데이터마트 생성 배치
	 * @param 
	 * @exception SQLException
	 */
	//@Scheduled(cron = "0 0 3 * * *") // 매일 새벽 3시
	public void makeSrvDtCtlgDtwrhBatch() throws SQLException {
		//중복실행방지
		if(!"N".equals(MAKE_SRV_DT_CTLG_DTWRH_BATCH_YN)) {
			return;
		}
		//시작
		MAKE_SRV_DT_CTLG_DTWRH_BATCH_YN = "Y";
		
		//데이터마트 생성 (일괄)
		Map<String,Object> params = new HashMap<String,Object>();
		statsMeService.makeSrvDtCtlgDtwrhAll(params);
		
		//종료
		MAKE_SRV_DT_CTLG_DTWRH_BATCH_YN = "N";
	}
	
	/*
	 * 데이터마트 생성 (일괄)
	 * @param data
	 * @exception SQLException
	 */
	public void makeSrvDtCtlgDtwrhAll(Map<String, Object> params) throws SQLException {
		//통계자료 목록 조회
		List<Map<String, Object>> resultList = statsMeMapper.statsMeMap_selectListSrvDtCtlgDataList(params);
		for (Map<String, Object> resultMap : resultList) {
			//데이터마트 생성
			resultMap.put("srv_dt_ctlg_dtwrh_delete_yn", "Y");
			statsMeService.makeSrvDtCtlgDtwrh(resultMap);
		}
	}
	
	/*
	 * 데이터마트 생성 (단건)
	 * @param data
	 * @exception SQLException
	 */
	public void makeSrvDtCtlgDtwrhOne(Map<String, Object> params) throws SQLException {
		//통계자료 목록 조회
		Map<String, Object> resultMap = statsMeMapper.statsMeMap_selectOneSrvDtCtlgDataList(params);
		if(resultMap != null) {
			//데이터마트 생성
			resultMap.put("srv_dt_ctlg_dtwrh_delete_yn", "Y");
			statsMeService.makeSrvDtCtlgDtwrh(resultMap);
		}
	}
	
	/*
	 * 데이터마트 생성
	 * @param data
	 * @exception SQLException
	 */
	public void makeSrvDtCtlgDtwrh(Map<String, Object> data) throws SQLException {
		String stat_data_id = StringUtil.isNullToString(data.get("stat_data_id")); //통계자료코드
		String stat_data_nm = StringUtil.isNullToString(data.get("stat_data_nm")); //통계자료명
		String srv_nm = StringUtil.isNullToString(data.get("srv_nm")); //서비스명
		String menu_nm = StringUtil.isNullToString(data.get("menu_nm")); //메뉴명
		String b_class_nm = StringUtil.isNullToString(data.get("b_class_nm")); //대분류명
		String m_class_nm = StringUtil.isNullToString(data.get("m_class_nm")); //중분류명
		String s_class_nm = StringUtil.isNullToString(data.get("s_class_nm")); //세분류명
		String source = StringUtil.isNullToString(data.get("source")); //출처
		String base_year = StringUtil.isNullToString(data.get("base_year")); //기준년도
		String stat_data_base_year = StringUtil.isNullToString(data.get("stat_data_base_year")); //통계데이터기준년도
		String updt_period = StringUtil.isNullToString(data.get("updt_period")); //갱신주기
		String sido_disp_yn = StringUtil.isNullToString(data.get("sido_disp_yn")); //시도표출여부
		String sgg_disp_yn = StringUtil.isNullToString(data.get("sgg_disp_yn")); //시군구표출여부
		String emdong_disp_yn = StringUtil.isNullToString(data.get("emdong_disp_yn")); //읍면동표출여부
		String tot_reg_disp_yn = StringUtil.isNullToString(data.get("tot_reg_disp_yn")); //집계구표출여부
		String grid_disp_yn = StringUtil.isNullToString(data.get("grid_disp_yn")); //격자표출여부
		String color_disp_yn = StringUtil.isNullToString(data.get("color_disp_yn")); //색상지도표출여부
		String balln_disp_yn = StringUtil.isNullToString(data.get("balln_disp_yn")); //버블지도표출여부
		String tp_disp_yn = StringUtil.isNullToString(data.get("tp_disp_yn")); //열지도표출여부
		String poi_disp_yn = StringUtil.isNullToString(data.get("poi_disp_yn")); //poi지도표출여부
		String srv_yn = StringUtil.isNullToString(data.get("srv_yn")); //서비스여부
		String rank = StringUtil.isNullToString(data.get("rank")); //순위
		String stat_data_exp = StringUtil.isNullToString(data.get("stat_data_exp")); //통계자료설명
		String reg_ts = StringUtil.isNullToString(data.get("reg_ts")); //등록일시
		String reg_manager_id = StringUtil.isNullToString(data.get("reg_manager_id")); //등록관리자id
		String mod_ts = StringUtil.isNullToString(data.get("mod_ts")); //수정일시
		String mod_manager_id = StringUtil.isNullToString(data.get("mod_manager_id")); //수정관리자id
		String exp_rel_tb = StringUtil.isNullToString(data.get("exp_rel_tb")); //설명관련테이블
		String exp_rel_col = StringUtil.isNullToString(data.get("exp_rel_col")); //설명관련컬럼
		String exp_rel_id = StringUtil.isNullToString(data.get("exp_rel_id")); //설명관련아이디
		String srv_dt_ctlg_dtwrh_delete_yn = StringUtil.isNullToString(data.get("srv_dt_ctlg_dtwrh_delete_yn")); //데이터마트 삭제 여부
		
		Map<String,Object> temp_params = new HashMap<String,Object>();
		
		//데이터마트 삭제
		if("Y".equals(srv_dt_ctlg_dtwrh_delete_yn)) {
			temp_params.clear();
			temp_params.put("stat_data_id", stat_data_id);
			statsMeMapper.statsMeMap_deleteListSrvDtCtlgDtwrh(temp_params);
		}
		
		//통계주제도
		if("통계주제도".equals(menu_nm)) {
			
			if("귀농귀촌귀어".equals(stat_data_nm)) stat_data_nm = "귀농/귀촌/귀어 인구 현황";
			else if("인구 이동".equals(stat_data_nm)) stat_data_nm = "인구이동";
			else if("교원 1인당 학생수".equals(stat_data_nm)) stat_data_nm = "교원1인당 학생 수";
			else if("EQ-5D 삶의 질 지표".equals(stat_data_nm)) stat_data_nm = "EQ-5D지표 현황";
			else if("노지과수(사과/배) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지과수&#40;사과/배&#41; 재배면적변화";
			else if("노지과수(포도/복숭아) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지과수&#40;포도/복숭아&#41; 재배면적변화";
			else if("노지채소(마늘/양파) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지채소&#40;마늘/양파&#41; 재배면적변화";
			else if("노지채소(고추/파) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지채소&#40;고추/파&#41; 재배면적변화";
			else if("노지채소(배추/무) 재배면적 변화".equals(stat_data_nm)) stat_data_nm = "노지채소&#40;배추/무&#41; 재배면적 변화";
			
			//통계주제도 조회
			Map<String,Object> params1 = new HashMap<String,Object>();
			params1.put("title", stat_data_nm);
			Map<String,Object> result1 = statsMeMapper.statsMeMap_ThematicMap_selectOneMngDtThemamaplist(params1);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null) {
				temp_params.clear();
				temp_params.put("stat_thema_map_id", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(data).get("stat_thema_map_id")));
				result1 = statsMeMapper.statsMeMap_ThematicMap_selectOneMngDtThemamaplist(temp_params);
			}
			
			if(result1 != null) {
				String stat_thema_map_id = StringUtil.isNullToString(result1.get("stat_thema_map_id"));
				String thema_map_data_id = StringUtil.isNullToString(result1.get("thema_map_data_id"));
				String thema_map_category = StringUtil.isNullToString(result1.get("thema_map_category"));
				String thema_map_type = StringUtil.isNullToString(result1.get("thema_map_type"));
				base_year = StringUtil.isNullToString(result1.get("base_year"));
				String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
				String corp_class_cd = StringUtil.isNullToString(result1.get("corp_class_cd"));
				String left_sep_nm = StringUtil.isNullToString(result1.get("left_sep_nm"));
				String left_sep_unit = StringUtil.isNullToString(result1.get("left_sep_unit"));
				String left_sep_chart_title = StringUtil.isNullToString(result1.get("left_sep_chart_title"));
				String left_sep_ttip_title = StringUtil.isNullToString(result1.get("left_sep_ttip_title"));
				String right_sep_ttip_title = StringUtil.isNullToString(result1.get("right_sep_ttip_title"));
				stat_data_base_year = StringUtil.isNullToString(result1.get("stat_data_base_year2"));
				
				//귀농귀촌귀어 thema_map_data_id 변경 (귀농)
				if("FlM5JUWj0T20181120214718029IpoBrl4UVw".equals(stat_thema_map_id)) {
					thema_map_data_id = "kosis_rtrn_frmhs_cnt";
				}
				
				//응급의료시설 접근현황 thema_map_data_id 변경 (5분)
				if("2qAx0jvYOk20180802165500441EHhhaQZQaK".equals(stat_thema_map_id)) {
					thema_map_data_id = "net_emergency_cnt_5";
				}
				
				//소방시설 접근현황 thema_map_data_id 변경 (5분)
				if("3SnEYaTafC20181127142830568kSyMYbSg3S".equals(stat_thema_map_id)) {
					thema_map_data_id = "net_fire_cnt_5";
				}
				
				/** 2020.05.12[한광희] My통계로 통계주제도 신규 지표 추가 START */
				// 경찰관서 접근현황 thema_map_data_id 변경 (5분)
				if("OuQf1ZhcWo20190822091422257GkbDsfsZHi".equals(stat_thema_map_id)) {
					thema_map_data_id = "net_police_cnt_5";
				}
				
				// 개인 카드 사용금액 현황 thema_map_data_id 변경
				if("onb6f4rRh320190902160751679iQUr3aVwTT".equals(stat_thema_map_id)) {
					thema_map_data_id = "credit_card_amount";
				}
				/** 2020.05.12[한광희] My통계로 통계주제도 신규 지표 추가 END */
				
				//thema_map_type이 07이면 POI 데이터 표출
				if("07".equals(thema_map_type)) {
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("base_year", base_year);
					if(!"".equals(theme_cd)) temp_params.put("theme_cd", theme_cd.split(","));
					if(!"".equals(corp_class_cd)) temp_params.put("corp_class_cd", corp_class_cd.split(","));
					statsMeMapper.statsMeMap_ThematicMap_insertSrvDtCtlgDtwrh_ThematicMap_1(temp_params);
				}
				//thema_map_type이 04이면서 귀농귀촌귀어가 아닌경우 차트데이터 표출 
				else if("04".equals(thema_map_type) && !"FlM5JUWj0T20181120214718029IpoBrl4UVw".equals(stat_thema_map_id)) {
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("thema_map_data_id", thema_map_data_id);
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("unit", "");
					if(left_sep_chart_title.indexOf("(") != -1) {
						temp_params.put("unit", left_sep_chart_title.split("\\(")[1].split("\\)")[0]);
					}
					temp_params.put("unit_nm", "수");
					temp_params.put("tooltip_cn", right_sep_ttip_title);
					statsMeMapper.statsMeMap_ThematicMap_insertSrvDtCtlgDtwrh_ThematicMap_2(temp_params);
				}
				else {
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("thema_map_data_id", thema_map_data_id);
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("unit", left_sep_unit);
					temp_params.put("unit_nm", left_sep_nm);
					temp_params.put("tooltip_cn", left_sep_ttip_title);
					statsMeMapper.statsMeMap_ThematicMap_insertSrvDtCtlgDtwrh_ThematicMap_3(temp_params);
					
					//보육업체 취약인구현황 열지도 조회
					if("mtjKxt2Zkb20171109101132537k7SYSI50kn".equals(stat_thema_map_id)) {
						temp_params.clear();
						temp_params.put("stat_data_id", stat_data_id);
						temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
						temp_params.put("base_year", base_year);
						statsMeMapper.statsMeMap_ThematicMap_insertSrvDtCtlgDtwrh_ThematicMap_4(temp_params);
					}
					
					//도서관 분포현항 POI 조회
					if("yFwtuGMFxt20160629174353420HvLDEFvqyu".equals(stat_thema_map_id)) {
						temp_params.clear();
						temp_params.put("stat_data_id", stat_data_id);
						temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
						statsMeMapper.statsMeMap_ThematicMap_insertSrvDtCtlgDtwrh_ThematicMap_5(temp_params);
					}
					
					//지진발생 분포지역 POI 조회
					if("41d1dhxBgx20180627145739008kXnl0kFaa8".equals(stat_thema_map_id)) {
						temp_params.clear();
						temp_params.put("stat_data_id", stat_data_id);
						temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
						temp_params.put("stat_data_base_year", stat_data_base_year);
						statsMeMapper.statsMeMap_ThematicMap_insertSrvDtCtlgDtwrh_ThematicMap_6(temp_params);
					}
					
					//응급의료시설 접근현황 POI 조회
					if("2qAx0jvYOk20180802165500441EHhhaQZQaK".equals(stat_thema_map_id)) {
						temp_params.clear();
						temp_params.put("stat_data_id", stat_data_id);
						temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
						temp_params.put("stat_data_base_year", stat_data_base_year);
						statsMeMapper.statsMeMap_ThematicMap_insertSrvDtCtlgDtwrh_ThematicMap_7(temp_params);
					}
				}
				
				//adm_nm 업데이트
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
			}
			else {
				data.put("errCd", "-401");
				data.put("errMsg", "통계주제도를 조회하는데 실패하였습니다.");
			}
		}
		else if("정책통계지도".equals(menu_nm)) {
			
			// Select 정책통계지도 조회
			Map<String,Object> params1 = new HashMap<String,Object>();
			params1.put("stat_data_id", stat_data_id);
			List<Map<String, Object>> result1 = statsMeMapper.statsMeMap_PolicyStaticMap_selectPolicyStaticMapList(params1);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null || result1.size() < 2) {
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				temp_params.put("idx_id", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(data).get("idx_id")));
				result1 = statsMeMapper.statsMeMap_PolicyStaticMap_selectPolicyStaticMapList(temp_params);
			}
			
			String idx_id = "";
			// 기준년도 변수 선언 
			String bnd_year = "";
			// 조회 조건인 기준년도 변수 선언
			String stat_data_base_year_1 = "";
			String stat_data_base_year_2 = "";
			// showData column 변수 선언
			String stats_dta_co_1 = "";
			String stats_dta_co_2 = "";
			// 융합관련 변수 선언
			String idx_type = "";
			String nomfrm_cd = "";
			// 인구집계 변수 선언
			String gender = "";
			String age_from = "";
			String age_to = "";
			// 주택집계 변수 선언
			String house_type = "";
			// 가구집계 변수 선언
			String household_type = "";
			// 사업체-테마코드 변수 선언
			String theme_cd = "";
			// 공공데이터 구분 코드 변수 선언
			String div_cd_1 = "";
			String div_cd_2 = "";
			// 사업체 구분 코드 변수 선언
			String ksic_1_cd = "";
			String ksic_5_cd = "";
			// 어가 구분코드 변수 선언
			String oga_div = "";
			// 사업체-산업분류 코드 변수 선언
			String class_code = "";
			
			try {				
				Map<String, Object> temp_result_1 = result1.get(0);
				Map<String, Object> temp_result_2 = result1.get(1);
				JSONObject json1 = null;
				JSONObject json2 = null;
				JSONObject json3 = null;
				JSONObject json4 = null;
				
				idx_id = StringUtil.isNullToString(result1.get(0).get("idx_id"));

				/** 기준년도 변수 설정 START */
		    	json1 = new JSONObject(StringUtil.isNullToString(temp_result_1.get("call_param")));
		    	if(json1.has("year")) stat_data_base_year_1 = StringUtil.isNullToString(json1.get("year"));
				
				json2 = new JSONObject(StringUtil.isNullToString(temp_result_2.get("call_param")));
				if(json2.has("year")) stat_data_base_year_2 = StringUtil.isNullToString(json2.get("year"));
				/** 기준년도 변수 설정 END */
				
				if(!"PS0033".equals(stat_data_id)		// 농가 인구의 변화 
					&& !"PS0034".equals(stat_data_id) 	// 임가 인구의 변화
					&& !"PS0035".equals(stat_data_id)	// 내수면 총어가 인구의 변화
					&& !"PS0036".equals(stat_data_id)	// 해수면 총어가 인구의 변화
					&& !"PS0037".equals(stat_data_id)	// 농가 변화
					&& !"PS0038".equals(stat_data_id)	// 임가 변화
					&& !"PS0039".equals(stat_data_id)	// 내수면 총어가 변화
					&& !"PS0040".equals(stat_data_id)	// 해수면 총어가 변화
					&& !"PS0041".equals(stat_data_id)	// 총사업체 분포 현황
					&& !"PS0042".equals(stat_data_id)	// 도소매업 변화
					&& !"PS0043".equals(stat_data_id)	// 제조업 변화
					&& !"PS0018".equals(stat_data_id)	// 어린이집 분포 현황
					&& !"PS0019".equals(stat_data_id)	// 노인요양시설 분포 현황
					&& !"PS0020".equals(stat_data_id)	// 공공자전거수 대비 보관소 분포 현황
					&& !"PS0022".equals(stat_data_id)	// 인구 대비 도서관 평균 도서 보유 현황
					&& !"PS0023".equals(stat_data_id)	// 도서관 운영
					&& !"PS0024".equals(stat_data_id)	// 박물관/미술관 분포 현황
					&& !"PS0044".equals(stat_data_id)	// 어린이 보호구역 분포 현황
					&& !"PS0045".equals(stat_data_id)	// 재해위험지구 분포 현황
					&& !"PS0046".equals(stat_data_id)	// 민방위대피시설 분포 현황
					&& !"PS0047".equals(stat_data_id)	// 도시공원 분포 현황
					&& !"PS0048".equals(stat_data_id)	// 여성 1인가구 거주현황 대비 CCTV 분포 현황
					&& !"PS0049".equals(stat_data_id)	// 무인민원발급기 설치 현황
					&& !"PS0031".equals(stat_data_id)	// 사업체당 평균 인구 현황
					&& !"PS0032".equals(stat_data_id)	// 사업체당 평균 종사자 수
					) {
					int tempYear1 = Integer.parseInt(stat_data_base_year_1);
					int tempYear2 = Integer.parseInt(stat_data_base_year_2);
					if (tempYear1 <= tempYear2) {
						json1 = new JSONObject(StringUtil.isNullToString(temp_result_2.get("call_param")));
						if(json1.has("year")) stat_data_base_year_2 = StringUtil.isNullToString(json1.get("year"));
						json2 = new JSONObject(StringUtil.isNullToString(temp_result_1.get("call_param")));
				    	if(json2.has("year")) stat_data_base_year_1 = StringUtil.isNullToString(json2.get("year"));
					} else {
				    	if(json1.has("year")) stat_data_base_year_2 = StringUtil.isNullToString(json1.get("year"));
					}
					
					if ("PS0034".equals(stat_data_id)) {
						stat_data_base_year_1 = "2005";
					} else {
						stat_data_base_year_1 = "2000";					
					}
				}
				
				if("PS0031".equals(stat_data_id)	// 사업체당 평균 인구 현황
					&& "PS0032".equals(stat_data_id)	// 사업체당 평균 종사자 수
					) {
					stat_data_base_year_2 = Integer.toString(Integer.parseInt(stat_data_base_year_1) - 1);		
				}
				
				// 기준년도 변수 설정
				if(json1.has("bnd_year")) bnd_year = StringUtil.isNullToString(json1.get("bnd_year"));
				
				// 인구집계 변수 설정
				if(json1.has("gender")) gender = StringUtil.isNullToString(json1.get("gender"));		// 성별
				if(json1.has("age_from")) age_from = StringUtil.isNullToString(json1.get("age_from"));	// 시작 나이
				if(json1.has("age_to")) age_to = StringUtil.isNullToString(json1.get("age_to"));		// 종료 나이
				
				/** showData 변수 설정 START */				
		    	json3 = new JSONObject(StringUtil.isNullToString(temp_result_1.get("map_param")));
		    	if(json3.has("showData")) stats_dta_co_1 = StringUtil.isNullToString(json3.get("showData"));
				
		    	json4 = new JSONObject(StringUtil.isNullToString(temp_result_2.get("map_param")));
		    	if(json4.has("showData")) stats_dta_co_2 = StringUtil.isNullToString(json4.get("showData"));
				/** showData 변수 설정 END */
		    	
		    	// 주택집계 변수 설정
		    	if(json1.has("house_type")) house_type = StringUtil.isNullToString(json1.get("house_type"));	// 주택타입
		    	// 가구집계 변수 설정
		    	if(json1.has("household_type")) household_type = StringUtil.isNullToString(json1.get("household_type"));	// 가구타입
		    	//  사업체-테마코드 변수 설정
		    	if(json1.has("theme_cd")) theme_cd = StringUtil.isNullToString(json1.get("theme_cd"));
		    	// 공공데이터 구분 코드 설정
		    	if(json1.has("div_cd")) div_cd_1 = StringUtil.isNullToString(json1.get("div_cd"));
		    	if(json2.has("div_cd")) div_cd_2 = StringUtil.isNullToString(json2.get("div_cd"));
		    	// 사업체 구분 코드 설정
		    	if(json2.has("ksic_1_cd")) ksic_1_cd = StringUtil.isNullToString(json2.get("ksic_1_cd"));
		    	if(json2.has("ksic_5_cd")) ksic_5_cd = StringUtil.isNullToString(json2.get("ksic_5_cd"));
		    	// 어가 구분 코드 변수 설정
		    	if(json1.has("oga_div")) oga_div = StringUtil.isNullToString(json1.get("oga_div"));
		    	// 사업체-산업분류 코드 변수 설정
		    	if(json1.has("class_code")) class_code = StringUtil.isNullToString(json1.get("class_code"));
		    			    	
				// 융합관련 변수 설정
		    	idx_type = StringUtil.isNullToString(result1.get(0).get("idx_type"));
				nomfrm_cd = StringUtil.isNullToString(result1.get(0).get("nomfrm_cd"));
				
			} catch (JSONException e1) {
				data.put("errCd", "-401");
				data.put("errMsg", "정책통계지도 파라미터 JSON생성에 실패하였습니다.");
			}
			
			temp_params.clear();
			temp_params.put("stat_data_id", stat_data_id);
			temp_params.put("stat_data_nm", stat_data_nm);
			temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
			temp_params.put("stat_data_base_year", stat_data_base_year);
			
			if(!"".equals(bnd_year)) {
				temp_params.put("bnd_year", bnd_year);
			} else {
				temp_params.put("bnd_year", DEFAULT_BND_YEAR);				
			}
			temp_params.put("stats_dta_co_1", stats_dta_co_1);
			temp_params.put("stats_dta_co_2", stats_dta_co_2);
			temp_params.put("stat_data_base_year_1", stat_data_base_year_1);
			temp_params.put("stat_data_base_year_2", stat_data_base_year_2);
			
			/** 총조사주요지표 START */
			// 전체인구의 변화:PS0001
			if("yDMKDIKzyn20170803172737331vsqnssqM1z".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "총인구");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 평균나이의 변화:PS0004
			if("EwwunnFpJK201708031727373316K8vsErJuJ".equals(idx_id)) {
				temp_params.put("unit", "세");
				temp_params.put("unit_nm", "평균만나이");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 인구밀도의 변화:PS0005
			if("onppztzErp20170803172737331z8tyqHzI9w".equals(idx_id)) {
				temp_params.put("unit", "명/㎢");
				temp_params.put("unit_nm", "인구밀도");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 평균 가구원의 변화:PS0006
			if("MLD6xDDuHs20170803172737332wKuuvtvsq4".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "평균가구원수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 노령화지수 변화:PS0013
			if("GnCDxoqD8q201708031727373316EE5yvyDDD".equals(idx_id)) {
				temp_params.put("unit", "명/백명");
				temp_params.put("unit_nm", "노령화지수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 노년부양비 변화:PS0014
			if("wE7JnMvoGu20170803172737332pxynvLs2qF".equals(idx_id)) {
				temp_params.put("unit", "명/백명");
				temp_params.put("unit_nm", "노년부양비");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 종사자 수 분포 변화:PS0025
			if("rsEJy3oJwG20170803172737334I49JoFMEGz".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "종사자수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				temp_params.put("stats_dta_co", "EMPLOYEE_CNT");
				if(Integer.parseInt(stat_data_base_year) >= 2017) {
					temp_params.put("stat_data_base_year_1", "9016");					
				} else {
					temp_params.put("stat_data_base_year_1", "2000");
				}
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_2(temp_params);
			}
			// 농가 인구의 변화:PS0033
			if("wu5oMryvM720170803172737331sJnsFLDrpy".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "농가인구");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 임가 인구의 변화:PS0034
			if("rzzGswqnLv20170803172737332zKLutDGw5E".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "임가인구");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 내수면 총어가 인구의 변화:PS0035
			if("q5MFyLCnFt20170803172737332tGMGtq9Kwn".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "내수면총어가인구");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 해수면 총어가 인구의 변화:PS0036
			if("GFLnoGyFF220170803172737332qMvwFn5v7t".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "해수면총어가인구");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_1(temp_params);
			}
			// 총사업체 분포 변화:PS0041
			if("rH4wnv36It20170803172737334nvKrIEMnzF".equals(idx_id)) {
				temp_params.put("unit", "개");
				temp_params.put("unit_nm", "사업체수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				if(Integer.parseInt(stat_data_base_year) >= 2017) {
					temp_params.put("stat_data_base_year_1", "9016");					
				} else {
					temp_params.put("stat_data_base_year_1", "2000");
				}
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_2(temp_params);
			}
			// 사업체당 평균 인구 현황:PS0031
			if("8292308888201710301617197294119290010".equals(idx_id)) {
				temp_params.put("unit", "명/개");
				temp_params.put("unit_nm", "사업체당 평균 인구");
				temp_params.put("tooltip_cn", "융합데이터");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_3(temp_params);
			}
			// 사업체당 평균 종사자 수:PS0032
			if("3751353392201712061200288355280432955".equals(idx_id)) {
				temp_params.put("unit", "명/개");
				temp_params.put("unit_nm", "사업체당 평균 종사자");
				temp_params.put("tooltip_cn", "융합데이터");
				
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_4(temp_params);
			}
			/** 총조사주요지표 END */
			
			/** 인구집계 START */
			if("2sMtuGwJID20170803172737331rtyMEvKyso".equals(idx_id)		// 남성인구의 변화:PS0002
				|| "xpwJJxztnG20170803172737331HyvJxM3FHs".equals(idx_id)	// 여성인구의 변화:PS0003
				|| "65rvHsrIzu20170803172737332sHJzvzpwJE".equals(idx_id)	// 유아 인구(0~4세) 변화:PS0015
				|| "uHzorzuwyw20170803172737332v7rFoJoL2I".equals(idx_id)	// 65세 이상 고령자 인구 변화:PS0016
				|| "2635651540201711301541034840754001433".equals(idx_id)	// 15세 미만 유소년 인구 변화:PS0021
				) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "인구");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				// 성별 변수 선언
				if(!"0".equals(gender)) {
					temp_params.put("gender", gender);
				}
				// 나이 변수 선언
				if(age_from != "") {
					temp_params.put("age_from", age_from);
				}
				if(age_to != "") {
					temp_params.put("age_to", age_to);
				}
				/** 만나이그룹코드 셋팅 START */
				// 유아 인구(0~4세) 변화:PS0015
				if("65rvHsrIzu20170803172737332sHJzvzpwJE".equals(idx_id)) {
					temp_params.put("age_group_cd", "01".split(","));
				}
				// 15세 미만 유소년 인구 변화:PS0021
				if("2635651540201711301541034840754001433".equals(idx_id)) {
					temp_params.put("age_group_cd", "01,02,03".split(","));
				}
				// 65세 이상 고령자 인구 변화:PS0016
				if("uHzorzuwyw20170803172737332v7rFoJoL2I".equals(idx_id)) {
					temp_params.put("age_group_cd", "14,15,16,17,18,19,20,21".split(","));
				}
				/** 만나이그룹코드 셋팅 END */
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Innersearchpopulation(temp_params);
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Innersearchpopulation(temp_params);
			}
			/** 인구집계 END */
			
			/** 주택집계 START */
			if("ysE4vzDMqx20170803172737333GyKIrExLJF".equals(idx_id)		// 총 주택(호)의 변화:PS0007
				|| "r3KxpDLnz520170803172737333Est1pnrzqx".equals(idx_id)	// 아파트 현황 변화:PS0009
				|| "KsK7HuJ6vL20170803172737333H3osD1tpuE".equals(idx_id)	// 연립 및 다세대 주택 변화:PS0010
				|| "HoMCJ0uHEz20170803172737334KGyGroEKqo".equals(idx_id)	// 단독주택 변화:PS0011
				) {
				temp_params.put("unit", "호");
				temp_params.put("unit_nm", "주택수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				// 주택집계 타입 변수 선언
				if(house_type != "") {
					temp_params.put("house_type", house_type.split(","));
				}
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_House(temp_params);
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_House(temp_params);
			}
			/** 주택집계 END */
			
			/** 가구집계 START */
			if("qqnLo3nzJu20170803172737333sF0GorqFtu".equals(idx_id)		// 1인 가구 변화:PS0008
				|| "0210176233201710301539320124465875560".equals(idx_id)	// 전체가구의 변화:PS0012
				) {
				temp_params.put("unit", "가구");
				temp_params.put("unit_nm", "가구수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				// 주택집계 타입 변수 선언
				if(household_type != "") {
					temp_params.put("household_type", household_type.split(","));
				}
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Household(temp_params);
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Household(temp_params);
			}
			/** 가구집계 END */
			
			/** 사업체-테마코드 START */
			if("xpwJJxztnG20170808142737332HyvJxM3FHs".equals(idx_id)		// PC방 변화:PS0026
				|| "EwwunnFpJK201708081427373326K8vsErJuJ".equals(idx_id)	// 슈퍼마켓 변화:PS0027
				|| "onppztzErp20170808142737333z8tyqHzI9w".equals(idx_id)	// 제과점 변화:PS0028
				|| "pyL5xrpKKF20170808152137332Lu5p9E6DKt".equals(idx_id)	// 치킨전문점 변화:PS0029
				|| "uHzorzuwyw20170808152137332v7rFoJoL2I".equals(idx_id)	// 커피전문점 변화:PS0030
				) {
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				if(Integer.parseInt(stat_data_base_year) >= 2017) {
					temp_params.put("stat_data_base_year", "9016");					
				} else {
					temp_params.put("stat_data_base_year", stat_data_base_year_1);
				}
				temp_params.put("theme_cd", theme_cd);
				statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_1(temp_params);		// 시도/시군구/읍면동/소지역
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_2(temp_params);		// 100k/10k/1k/100m
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				if(Integer.parseInt(stat_data_base_year) >= 2017) {
					temp_params.put("stat_data_base_year", stat_data_base_year);					
				} else {
					temp_params.put("stat_data_base_year", stat_data_base_year_2);
				}
				temp_params.put("theme_cd", theme_cd);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_1(temp_params);		// 시도/시군구/읍면동/소지역
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_2(temp_params);		// 100k/10k/1k/100m
			}
			/** 사업체-테마코드 END */
			
			/** 농가/임가 변화 START */
			if("ntpJEMwwsx20170803172737333xxvMIJ5rGK".equals(idx_id)		// 농가 변화:PS0037
				|| "H1LGyrMIEF20170803172737333DxGrxxtEsr".equals(idx_id)	// 임가 변화:PS0038
				) {
				temp_params.put("unit", "가구");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				String table_nm = "";
				// 농가 변화
				if("ntpJEMwwsx20170803172737333xxvMIJ5rGK".equals(idx_id)) {
					temp_params.put("unit_nm", "농가수");
					table_nm = "SRV_DT_NONGGACENSUS_";
				}
				// 임가 변화
				if("H1LGyrMIEF20170803172737333DxGrxxtEsr".equals(idx_id)) {
					temp_params.put("unit_nm", "임가수");
					table_nm = "SRV_DT_IMGACENSUS_";
				}
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("table_nm", table_nm + stat_data_base_year_1);
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_1(temp_params);
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_2(temp_params);
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("table_nm", table_nm + stat_data_base_year_2);
				temp_params.put("base_year", stat_data_base_year_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_1(temp_params);
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_2(temp_params);
				
			}
			/** 농가/임가 변화 END */
			
			// 65세 이상 1인가구 변화:PS0017
			if("MLD6xDDuHs20170808152137332wKuuvtvsq4".equals(idx_id)) {
				temp_params.put("unit", "가구");
				temp_params.put("unit_nm", "가구수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				// 나이 변수 선언
				if(age_from != "") {
					temp_params.put("age_from", age_from);
				}
				if(age_to != "") {
					temp_params.put("age_to", age_to);
				}
				// 주택집계 타입 변수 선언
				if(household_type != "") {
					temp_params.put("household_type", household_type.split(","));
				}
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Fusionstats_1(temp_params);	// 시도, 시군구, 읍면동, 소지역
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Fusionstats_2(temp_params);	// 격자
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Fusionstats_1(temp_params);	// 시도, 시군구, 읍면동, 소지역
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Fusionstats_2(temp_params);	// 격자
				
			}
			
			// 어린이집 분포 현황:PS0018
			if("9221137705201710301546072662443762660".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "인구");
				temp_params.put("tooltip_cn", "융합데이터");
				// 성별 변수 선언
				if(!"0".equals(gender)) {
					temp_params.put("gender", gender);
				}
				// 나이 변수 선언
				if(age_from != "") {
					temp_params.put("age_from", age_from);
				}
				if(age_to != "") {
					temp_params.put("age_to", age_to);
				}
				// 색상지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Innersearchpopulation(temp_params);
				
				// POI
				temp_params.put("div_cd", div_cd_2);
				temp_params.put("poi_se_nm", "3");		// POI 표현 방식 (3:파란점에 클러스터 4:파란점만)
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPoi(temp_params);
			}
			
			// 노인 요양시설 분포 현황:PS0019
			if("2547676290201710301551567684108432782".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "인구");
				temp_params.put("tooltip_cn", "융합데이터");
				// 성별 변수 선언
				if(!"0".equals(gender)) {
					temp_params.put("gender", gender);
				}
				// 나이 변수 선언
				if(age_from != "") {
					temp_params.put("age_from", age_from);
				}
				if(age_to != "") {
					temp_params.put("age_to", age_to);
				}
				// 만나이 그룹코드 age_from 이 65 이상임.
				temp_params.put("age_group_cd", "14,15,16,17,18,19,20,21".split(","));
				
				// 색상지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Innersearchpopulation(temp_params);
				
				// POI
				temp_params.put("ksic_1_cd", ksic_1_cd);
				temp_params.put("ksic_5_cd", ksic_5_cd);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_CompanyPoi(temp_params);
			}	
			
			// 공공자전거수 대비 보관소 분포 현황:PS0020
			if("2088944725201711211657122621829462177".equals(idx_id)) {
				temp_params.put("tooltip_cn", "융합데이터");
				
				// 색상지도
				temp_params.put("map_ty", "color");
				temp_params.put("div_cd", div_cd_1);
				temp_params.put("poi_se_nm", "3");		// POI 표현 방식 (3:파란점에 클러스터 4:파란점만)
				temp_params.put("base_year", stat_data_base_year);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPolygon(temp_params);
				
				// POI
				temp_params.put("div_cd", div_cd_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPoi(temp_params);
			}
			
			// 인구 대비 도서관 평균 도서 보유 현황:PS0022
			if("3724842547201711201014253871792207583".equals(idx_id)) {
				temp_params.put("unit", "권/명");
				temp_params.put("unit_nm", "인구대비 평균 도서 수");
				temp_params.put("tooltip_cn", "융합데이터");
				
				// 좌측지도 (원래 우측)
				temp_params.put("map_ty", "color2");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Innersearchpopulation(temp_params);
				
				// 우측지도 (원래 좌측)
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year);
				temp_params.put("div_cd", div_cd_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPolygon(temp_params);
			}
			
			// 도서관 운영:PS0023
			if("3458556422201710301554388959489997313".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "인구수");
				temp_params.put("tooltip_cn", "융합데이터");
				
				// 색상지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Innersearchpopulation(temp_params);
				
				// POI
				temp_params.put("div_cd", div_cd_2);
				temp_params.put("poi_se_nm", "3");		// POI 표현 방식 (3:파란점에 클러스터 4:파란점만)
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPoi(temp_params);
			}
			
			if("7960926159201711211700328741236696657".equals(idx_id)		// 박물관/미술관 분포 현황:PS0024
				|| "8547921299201711211707478631593010966".equals(idx_id)	// 도시공원 분포 현황:PS0047
				|| "8599077428201710301634346508152047319".equals(idx_id)	// 무인민원발급기 설치 현황:PS0049
				) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "인구수");
				temp_params.put("tooltip_cn", "융합데이터");
				
				// 색상지도
				temp_params.put("map_ty", "color");
				temp_params.put("stat_data_base_year_1", stat_data_base_year_1);
				temp_params.put("stats_dta_co", stats_dta_co_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_5(temp_params);
				
				// POI
				temp_params.put("div_cd", div_cd_2);
				// 박물관/미술관
				if("7960926159201711211700328741236696657".equals(idx_id)) temp_params.put("poi_se_nm", "3");		// POI 표현 방식 (3:파란점에 클러스터 4:파란점만)
				// 도시공원
				if("8547921299201711211707478631593010966".equals(idx_id)) temp_params.put("poi_se_nm", "3");		// POI 표현 방식 (3:파란점에 클러스터 4:파란점만)
				// 무인민원발급기 설치
				if("8599077428201710301634346508152047319".equals(idx_id)) temp_params.put("poi_se_nm", "3");		// POI 표현 방식 (3:파란점에 클러스터 4:파란점만)
				
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPoi(temp_params);
			}
			
			/** 어가관련 START */
			if("FJMJwwpKvz20170803172737333HtKMuowG7o".equals(idx_id)		// 내수면 총어가 변화:PS0039
				|| "nvsDwtnIMM20170803172737333tzyypxrpuE".equals(idx_id)	// 해수면 총어가 변화:PS0040
				) {
				temp_params.put("unit", "가구");
				temp_params.put("unit_nm", "어가수");
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				temp_params.put("oga_div", oga_div);	// 어가구분코드
				String table_nm = "SRV_DT_OGACENSUS_";
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("table_nm", table_nm + stat_data_base_year_1);
				temp_params.put("base_year", stat_data_base_year_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_1(temp_params);
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_2(temp_params);
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("table_nm", table_nm + stat_data_base_year_2);
				temp_params.put("base_year", stat_data_base_year_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_1(temp_params);
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_FarmForestryhousehold_Fishery_2(temp_params);
			}
			/** 어가관련 END */
			
			/** 사업체조사: 산업분류 START */
			if("DMspq6u4Mv201708031727373349yHup4JG7w".equals(idx_id)		// 도소매업 변화:PS0042
				|| "yDMKDIKzyn20170808142737331vsqnssqM1z".equals(idx_id)	// 제조업 변화:PS0043
				) {
				temp_params.put("tooltip_cn", "융합데이터(증감)");
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				if(Integer.parseInt(stat_data_base_year) >= 2017) {
					temp_params.put("stat_data_base_year", "9016");					
				} else {
					temp_params.put("stat_data_base_year", stat_data_base_year_1);
				}
				temp_params.put("ksic_1_cd", class_code);
				statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_3(temp_params);		// 시도/시군구/읍면동/소지역
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_4(temp_params);		// 100k/10k/1k/100m 
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				if(Integer.parseInt(stat_data_base_year) >= 2017) {
					temp_params.put("stat_data_base_year", stat_data_base_year);					
				} else {
					temp_params.put("stat_data_base_year", stat_data_base_year_2);
				}
				temp_params.put("ksic_1_cd", class_code);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_3(temp_params);		// 시도/시군구/읍면동/소지역
				//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_4(temp_params);		// 100k/10k/1k/100m
				
			}
			/** 사업체조사: 산업분류 END */
			
			// 어린이보호구역 분포 현황:PS0044
			if("4567814844201710301633013080966785401".equals(idx_id)) {
				temp_params.put("unit", "명/개");
				temp_params.put("unit_nm", "인구대비어린이보호구역수");
				temp_params.put("tooltip_cn", "융합데이터");
				
				// 나이 변수 선언
				if(age_from != "") {
					temp_params.put("age_from", age_from);
				}
				if(age_to != "") {
					temp_params.put("age_to", age_to);
				}
								
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Innersearchpopulation(temp_params);
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("base_year", stat_data_base_year);
				temp_params.put("div_cd", div_cd_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPolygon(temp_params);
			}

			if("5075653758201711211705104277120963624".equals(idx_id)		// 재해위험지구 분포 현황:PS0045
				|| "3074823551201711211711119354566751530".equals(idx_id)	// 민방위대피시설 분포 현황:PS0046
				) {
				temp_params.put("unit", "명/개");
				temp_params.put("tooltip_cn", "융합데이터");
				
				// 재해위험지구
				if("5075653758201711211705104277120963624".equals(idx_id)) {
					temp_params.put("unit_nm", "재해위험지구대비인구수");
				}
				// 민방위대피시설
				if("3074823551201711211711119354566751530".equals(idx_id)) {
					temp_params.put("unit_nm", "재해위험지구대비인구수");
				}
				
				// 좌측지도
				temp_params.put("map_ty", "color");
				temp_params.put("stat_data_base_year_1", stat_data_base_year_1);
				temp_params.put("stats_dta_co", stats_dta_co_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_Population_5(temp_params);
				
				// 우측지도
				temp_params.put("map_ty", "color2");
				temp_params.put("base_year", stat_data_base_year);
				temp_params.put("div_cd", div_cd_2);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPolygon(temp_params);
			}
			
			// 여성 1인가구 거주현황 대비 CCTV 분포 현황:PS0048
			if("4846938690201712181802041978059514311".equals(idx_id)) {
				temp_params.put("unit", "명");
				temp_params.put("unit_nm", "인구");
				temp_params.put("tooltip_cn", "융합데이터");
				
				// 색상지도
				temp_params.put("map_ty", "color");
				temp_params.put("base_year", stat_data_base_year);
				temp_params.put("div_cd", div_cd_1);
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPolygon(temp_params);
				
				// POI
				temp_params.put("div_cd", div_cd_2);
				temp_params.put("poi_se_nm", "3");		// POI 표현 방식 (3:파란점에 클러스터 4:파란점만)
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_PolicyStaticMap_insertSrvDtCtlgDtwrh_PolicyStaticMap_LocalGovernmentPoi(temp_params);
			}
			
			// 융합데이터 생성
			fusionSrvDtCtlgDtwrh(stat_data_id, idx_type, nomfrm_cd);
			
			//adm_nm 업데이트
			temp_params.clear();
			temp_params.put("stat_data_id", stat_data_id);
			//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
			
		}
		else if("일자리 맵".equals(menu_nm)) {
			if("일자리 통계분석".equals(srv_nm)) {
				String link_id = "";
				if("고용률".equals(stat_data_nm)) link_id = "I3111";
				else if("실업률".equals(stat_data_nm)) link_id = "I3114";
				else if("청년실업률".equals(stat_data_nm)) link_id = "I3116";
				else if("취업자수".equals(stat_data_nm)) link_id = "I3104";
				else if("실업자수".equals(stat_data_nm)) link_id = "I3112";
				else if("비경제활동인구".equals(stat_data_nm)) link_id = "I3117";
				else if("세대수".equals(stat_data_nm)) link_id = "I3101";
				else if("피보험자 증감".equals(stat_data_nm)) link_id = "E3224";
				else if("취업자 증감".equals(stat_data_nm)) link_id = "E3219";
				else if("구직건수".equals(stat_data_nm)) link_id = "E3218";
				else if("구인인원".equals(stat_data_nm)) link_id = "E3208";
				else if("폐업 수".equals(stat_data_nm)) link_id = "I3207";
				else if("신설 수".equals(stat_data_nm)) link_id = "I3206";
				else if("비정규직 근로자 수".equals(stat_data_nm)) link_id = "I3306";
				else if("비정규직 근로자 비율".equals(stat_data_nm)) link_id = "I3306_1";
				else if("경제성장률".equals(stat_data_nm)) link_id = "I3401";
				else if("지역내총생산".equals(stat_data_nm)) link_id = "I3402";
				//else if("소비자물가지수".equals(stat_data_nm)) link_id = "I3403"; // 데이터가 전국을 SUM해서 1건으로만 넘어와서 지도 표출 불가
				
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				temp_params.put("stat_data_nm", stat_data_nm);
				temp_params.put("link_id", link_id);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));

				String temp_stat_data_base_year = stat_data_base_year.replaceAll("년", "").replaceAll("월", "").replaceAll("Q", "").replaceAll(" ", "");
				
				// 청년실업률 분기별 정보로 인한 조건 변경
				if(link_id == "I3116") {
					if(temp_stat_data_base_year.length() < 6) {
						
						if(temp_stat_data_base_year.substring(4).length() < 2) {
							String tempStatDataBaseYear = temp_stat_data_base_year.substring(0,4);
							String tempStatDataBaseQu = "0" + temp_stat_data_base_year.substring(4);
							
							temp_stat_data_base_year = tempStatDataBaseYear + tempStatDataBaseQu;
						}						
					}
				}
				
				temp_params.put("stat_data_base_year", temp_stat_data_base_year);
				
				String tempStatDataBaseYearOrginl = "";
				if(temp_stat_data_base_year.length() == 4) {
					tempStatDataBaseYearOrginl = stat_data_base_year + "년";
				} else {
					tempStatDataBaseYearOrginl = stat_data_base_year;
				}
				temp_params.put("stat_data_base_year_orginl", tempStatDataBaseYearOrginl);
				
				if(link_id == "E3224") {	// 피보험자 증감 itm_id setting
					temp_params.put("itm_id", "T20");
				} else if(link_id == "E3219") {	// 취업자 증감 itm_id setting
					temp_params.put("itm_id", "T20");
				} else if(link_id == "E3218") {	// 구직건수 itm_id setting
					temp_params.put("itm_id", "T70");
				} else if(link_id == "E3208") {	// 구인인원 itm_id setting
					temp_params.put("itm_id", "T10");
				} else if(link_id == "I3207") {	// 폐업 수 itm_id setting
					temp_params.put("itm_id", "T001");
				} else if(link_id == "I3206") {	// 신설 수 itm_id setting
					temp_params.put("itm_id", "16142T1");
				} else if(link_id == "I3306") {	// 비정규직 근로자 수 itm_id setting
					temp_params.put("itm_id", "T03");
				} else if(link_id == "I3402") {	// 지역내총생산 itm_id setting
					temp_params.put("itm_id", "T1");
				}
				
				if(link_id == "I3306_1") {
					statsMeMapper.statsMeMap_WorkRoad_insertSrvDtCtlgDtwrh_WorkRoad_StatsAnals_2(temp_params);
				} else {
					statsMeMapper.statsMeMap_WorkRoad_insertSrvDtCtlgDtwrh_WorkRoad_StatsAnals_1(temp_params);					
				}
				
				//adm_nm 업데이트
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);				
			} else if("일자리보기".equals(srv_nm)) {
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				temp_params.put("stat_data_nm", stat_data_nm);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				
				// 일자리보기 코드 조회
				Map<String,Object> params1 = new HashMap<String,Object>();
				params1.put("stat_data_id", stat_data_id);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_WorkRoad_selectSrvDtCtlgDtwrh_WorkRoad_JobViewCd(params1);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					temp_params.put("b_class_cd", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(data).get("b_class_cd")));
					temp_params.put("s_class_cd", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(data).get("s_class_cd")));
				}
				else if(result1 != null) {
					String b_class_cd = StringUtil.isNullToString(result1.get("b_class_cd"));
					String s_class_cd = StringUtil.isNullToString(result1.get("s_class_cd"));
					
					temp_params.put("b_class_cd", b_class_cd);
					temp_params.put("s_class_cd", s_class_cd);
				}
				
				statsMeMapper.statsMeMap_WorkRoad_insertSrvDtCtlgDtwrh_WorkRoad_JobView(temp_params);
				
				//adm_nm 업데이트
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);	
			} else {
				data.put("errCd", "-401");
				data.put("errMsg", "일자리 통계분석을 조회하는데 실패하였습니다.");
			}			
		}
		else if("업종통계지도: 생활업종통계지도".equals(menu_nm)) {
			if("시군구별 업종현황".equals(srv_nm)) {
				//테마코드 조회
				Map<String,Object> params1 = new HashMap<String,Object>();
				String b_theme_cd_nm = b_class_nm.split("\\(")[0];
				String s_theme_cd_nm = stat_data_nm;
				if("서비스".equals(b_theme_cd_nm)) b_theme_cd_nm = "생활서비스";
				if("펜션".equals(s_theme_cd_nm)) s_theme_cd_nm = "팬션";
				params1.put("b_theme_cd_nm", b_theme_cd_nm);
				params1.put("s_theme_cd_nm", s_theme_cd_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Lvlh_selectOneCmmCdTheme(params1);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(data);
				}
				
				if(result1 != null) {
					String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
					
					//데이터 (색상 : 시도, 시군구)
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("theme_cd", theme_cd);
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_1(temp_params);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_2(temp_params);
					
					//adm_nm 업데이트
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
				}
				else {
					data.put("errCd", "-401");
					data.put("errMsg", "테마코드를 조회하는데 실패하였습니다.");
				}
			}
			else if("개업현황".equals(srv_nm)) {
				//개업현황 서비스 코드 조회
				Map<String,Object> params1 = new HashMap<String,Object>();
				String service_nm = stat_data_nm.replaceAll("개업현황:", "").replaceAll(" ", "");
				if("개업현황: 숙박업(일반-관광호텔)".equals(stat_data_nm)) service_nm = "숙박업(일반)(관광호텔)";
				else if("개업현황: 일반음식점(정종,대포집,소주방)".equals(stat_data_nm)) service_nm = "일반음식점(정종/대포집/소주방)";
				params1.put("service_nm", service_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Lvlh_selectOneSrvPtLocaldata(params1);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(data);
				}
				
				if(result1 != null) {
					String service_code = StringUtil.isNullToString(result1.get("service_code"));
					
					//데이터 (열지도 : 시도, 시군구, 읍면동)
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("service_code", service_code);
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_6(temp_params);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_7(temp_params);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_8(temp_params);
					
					//데이터 (POI)
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_10(temp_params);
				}
				else {
					data.put("errCd", "-401");
					data.put("errMsg", "개업현황 서비스를 조회하는데 실패하였습니다.");
				}
			}
			else if("업종 밀집도 변화".equals(srv_nm)) {
				//테마코드 조회
				Map<String,Object> params1 = new HashMap<String,Object>();
				String b_theme_cd_nm = b_class_nm.split("\\(")[0];
				String s_theme_cd_nm = stat_data_nm;
				if("서비스".equals(b_theme_cd_nm)) b_theme_cd_nm = "생활서비스";
				if("펜션".equals(s_theme_cd_nm)) s_theme_cd_nm = "팬션";
				params1.put("b_theme_cd_nm", b_theme_cd_nm);
				params1.put("s_theme_cd_nm", s_theme_cd_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Lvlh_selectOneCmmCdTheme(params1);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(data);
				}
				
				if(result1 != null) {
					String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
					
					//데이터 (열지도 : 시도, 시군구, 읍면동)
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("bnd_year", Properties.getDefult_bnd_year());
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("theme_cd", theme_cd);
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_3(temp_params);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_4(temp_params);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_5(temp_params);
					
					//데이터 (POI)
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_9(temp_params);
				}
				else {
					data.put("errCd", "-401");
					data.put("errMsg", "테마코드를 조회하는데 실패하였습니다.");
				}
			}
		}
		else if("업종통계지도: 기술업종통계지도".equals(menu_nm)) {
			//기술업종 코드정의 조회
			Map<String,Object> params1 = new HashMap<String,Object>();
			params1.put("techbiz_m_class_cd_nm", stat_data_nm.replaceAll("업종", ""));
			Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Tchnlgy_selectOneCmmCdTechbizCd(params1);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null) {
				result1 = statsMeService.mappingHardSrvDtCtlgDataList(data);
			}
			
			if(result1 != null) {
				String techbiz_m_class_cd = StringUtil.isNullToString(result1.get("techbiz_m_class_cd"));
				//String techbiz_m_class_cd_nm = StringUtil.isNullToString(result1.get("techbiz_m_class_cd_nm"));
				
				//데이터 (색상 : 시도, 시군구, 읍면동)
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				//base_year가 시도 화면에서는 max 값인데 9016 때문에 잘못 조되회고 있음
				//base_year가 시군구 화면에서는 common.js의 companyDataYear를 사용하고 있는등 일관성이 없음
				//카탈로그에 박혀있는 년도 사용 2019-09-04 기준 2017년 사용 중
				temp_params.put("stat_data_base_year", stat_data_base_year);
				temp_params.put("techbiz_class_cd", techbiz_m_class_cd);
				statsMeMapper.statsMeMap_BizStatsMap_Tchnlgy_insertSrvDtCtlgDtwrh_BizStatsMap_Tchnlgy_1(temp_params);
				
				//adm_nm 업데이트
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
			}
			else {
				data.put("errCd", "-401");
				data.put("errMsg", "기술업종을 조회하는데 실패하였습니다.");
			}
		}
		else if("살고싶은 우리동네".equals(menu_nm)) {
			temp_params.clear();
			temp_params.put("stat_data_id", stat_data_id);
			temp_params.put("stat_data_nm", stat_data_nm);
						
			// 지표 코드 조회
			Map<String,Object> params1 = new HashMap<String,Object>();
			params1.put("stat_data_id", stat_data_id);
			Map<String,Object> result1 = statsMeMapper.statsMeMap_HouseAnalysisMap_selectSrvDtCtlgDtwrh_HouseAnalysisMap_IndexCd(params1);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null) {
				temp_params.put("m_class_idx_id", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(data).get("m_class_idx_id")));
				temp_params.put("b_class_idx_id", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(data).get("b_class_idx_id")));
			}
			else if(result1 != null) {
				String m_class_idx_id = StringUtil.isNullToString(result1.get("m_class_idx_id"));
				String b_class_idx_id = StringUtil.isNullToString(result1.get("b_class_idx_id"));
				
				temp_params.put("m_class_idx_id", m_class_idx_id);
				temp_params.put("b_class_idx_id", b_class_idx_id);
			}
			
			//int disp_level = (int) (result1.get("disp_level"));
			// Insert 카탈로그 데이터마트 살고싶은 우리동네 : 시도
			//if(disp_level >= 1) {
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_HouseAnalysisMap_insertSrvDtCtlgDtwrh_HouseAnalysisMap_Sido(temp_params);
			//}
			// Insert 카탈로그 데이터마트 살고싶은 우리동네 : 시군구
			//if(disp_level >= 2) {
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_HouseAnalysisMap_insertSrvDtCtlgDtwrh_HouseAnalysisMap_Sgg(temp_params);
			//} 
			// Insert 카탈로그 데이터마트 살고싶은 우리동네 : 읍면동
			//if(disp_level >= 3) {
				temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
				statsMeMapper.statsMeMap_HouseAnalysisMap_insertSrvDtCtlgDtwrh_HouseAnalysisMap_Emdong(temp_params);
			//}
			
			//adm_nm 업데이트
			temp_params.clear();
			temp_params.put("stat_data_id", stat_data_id);
			//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
		}
		else if("대화형 통계지도".equals(menu_nm)) {
			if("전국 사업체조사: 산업분류".equals(srv_nm)) {
				//산업체분류 조회
				Map<String,Object> params1 = new HashMap<String,Object>();
				String class_deg = "10";
				String ksic_1_nm = b_class_nm;
				String ksic_2_nm = m_class_nm;
				String ksic_3_nm = s_class_nm;
				String ksic_4_nm = stat_data_nm;
				if("농업,임업 및 어업".equals(ksic_1_nm)) ksic_1_nm = "농업, 임업 및 어업";
				if("수도 , 하수 및 폐기물 처리, 원료 재생업(36~39)".equals(ksic_1_nm)) ksic_1_nm = "수도, 하수 및 폐기물 처리, 원료 재생업(36~39)";
				if("전문, 과학 및 기술서비스업".equals(ksic_1_nm)) ksic_1_nm = "전문, 과학 및 기술 서비스업";
				if("사업시설 관리, 사업 지원 및 임대서비스업".equals(ksic_1_nm)) ksic_1_nm = "사업시설 관리, 사업 지원 및 임대 서비스업";
				if("공공행정, 국방 및 사회보장 행정".equals(ksic_1_nm)) ksic_1_nm = "공공 행정, 국방 및 사회보장 행정";
				if("공공행정, 국방 및 사회보장 행정".equals(ksic_2_nm)) ksic_2_nm = "공공 행정, 국방 및 사회보장 행정";
				params1.put("class_deg", class_deg);
				params1.put("ksic_1_nm", ksic_1_nm);
				params1.put("ksic_2_nm", ksic_2_nm);
				params1.put("ksic_3_nm", ksic_3_nm);
				params1.put("ksic_4_nm", ksic_4_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_InteractiveMap_selectOneCmmCdCorpclass(params1);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(data);
				}
				
				if(result1 != null) {
					String ksic_1_cd = StringUtil.isNullToString(result1.get("ksic_1_cd"));
					String ksic_4_cd = StringUtil.isNullToString(result1.get("ksic_4_cd"));
					
					//데이터 (색상 : 시도, 시군구, 읍면동, 소지역, 100k, 10k, 1k, 100m)
					//2019-11-21 100k, 10k, 1k, 100m 제외
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("ksic_1_cd", ksic_1_cd);
					temp_params.put("ksic_4_cd", ksic_4_cd);
					statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_3(temp_params);
					//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_4(temp_params);
					
					//adm_nm 업데이트
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
				}
				else {
					data.put("errCd", "-401");
					data.put("errMsg", "산업체분류를 조회하는데 실패하였습니다.");
				}
			}
			else if("전국 사업체조사: 테마업종".equals(srv_nm)) {
				//테마코드 조회
				Map<String,Object> params1 = new HashMap<String,Object>();
				String b_theme_cd_nm = b_class_nm.split("\\(")[0];
				String s_theme_cd_nm = stat_data_nm;
				if("펜션".equals(s_theme_cd_nm)) s_theme_cd_nm = "팬션";
				params1.put("b_theme_cd_nm", b_theme_cd_nm);
				params1.put("s_theme_cd_nm", s_theme_cd_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_InteractiveMap_selectOneCmmCdTheme(params1);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(data);
				}
				
				if(result1 != null) {
					String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
					
					//데이터 (색상 : 시도, 시군구, 읍면동, 소지역, 100k, 10k, 1k, 100m)
					//2019-11-21 100k, 10k, 1k, 100m 제외
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("stat_data_base_year", stat_data_base_year);
					temp_params.put("theme_cd", theme_cd);
					statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_1(temp_params);
					//temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_2(temp_params);
					
					//adm_nm 업데이트
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
				}
				else {
					data.put("errCd", "-401");
					data.put("errMsg", "테마업종을 조회하는데 실패하였습니다.");
				}
			}
			else if("e-지방지표".equals(srv_nm)) {
				//별도의 API를 사용하기 때문에 데이터 마트 안씀
				data.put("errCd", "0");
				data.put("errMsg", "");
			}
			else if("인구주택총조사".equals(srv_nm)) {
				if("인구조건".equals(b_class_nm)) {
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("base_year", base_year);
					temp_params.put("stat_data_base_year", stat_data_base_year);
					
					if(stat_data_nm.indexOf("영유아/어린이") >= 0) {
						//13세미만 관련정보
						temp_params.put("age_from", "0");
						temp_params.put("age_to", "12");
					}
					else if(stat_data_nm.indexOf("청소년") >= 0) {
						//13~18세 관련정보
						temp_params.put("age_from", "13");
						temp_params.put("age_to", "18");
					}
					else if(stat_data_nm.indexOf("청년") >= 0) {
						//19~39세 관련정보
						temp_params.put("age_from", "19");
						temp_params.put("age_to", "39");
					}
					else if(stat_data_nm.indexOf("중년") >= 0 || stat_data_nm.indexOf("장년") >= 0) {
						//40~65세 관련정보
						temp_params.put("age_from", "40");
						temp_params.put("age_to", "65");
					}
					else if(stat_data_nm.indexOf("노년") >= 0) {
						//65세 이상 관련정보
						temp_params.put("age_from", "65");
					}
					
					if(stat_data_nm.indexOf("(남자)") >= 0) {
						//남자
						temp_params.put("gender", "1");
					}
					else if(stat_data_nm.indexOf("(여자)") >= 0) {
						//여자
						temp_params.put("gender", "2");
					}
					
					statsMeMapper.statsMeMap_InteractiveMap_PopulationHouseView_insertSrvDtCtlgDtwrh_InteractiveMap_PopulationHouseView_Pop(temp_params);
					
					//adm_nm 업데이트
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
				}
				else if("가구조건".equals(b_class_nm)) {
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("base_year", base_year);
					temp_params.put("stat_data_base_year", stat_data_base_year);
					
					statsMeMapper.statsMeMap_InteractiveMap_PopulationHouseView_insertSrvDtCtlgDtwrh_InteractiveMap_PopulationHouseView_Family(temp_params);
					
					// 격자
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_InteractiveMap_PopulationHouseView_insertSrvDtCtlgDtwrh_InteractiveMap_PopulationHouseView_FamilyGrid(temp_params);
					
					
					//adm_nm 업데이트
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
				}
				else if("주택조건".equals(b_class_nm)) {
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					temp_params.put("base_year", base_year);
					temp_params.put("stat_data_base_year", stat_data_base_year);
					
					statsMeMapper.statsMeMap_InteractiveMap_PopulationHouseView_insertSrvDtCtlgDtwrh_InteractiveMap_PopulationHouseView_House(temp_params);
					
					// 격자
					temp_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(temp_params));
					statsMeMapper.statsMeMap_InteractiveMap_PopulationHouseView_insertSrvDtCtlgDtwrh_InteractiveMap_PopulationHouseView_HouseGrid(temp_params);
					
					//adm_nm 업데이트
					temp_params.clear();
					temp_params.put("stat_data_id", stat_data_id);
					//statsMeMapper.statsMeMap_updateAdmNmSrvDtCtlgDtwrh(temp_params);
				}
			}
		}
		else {
			data.put("errCd", "-401");
			data.put("errMsg", "통계자료 카테고리를 분류하는데 실패하였습니다.");
		}
	}
	
	//정책통계지도 데이터마트 융합
	private void fusionSrvDtCtlgDtwrh(String stat_data_id, String idx_type, String nomfrm_cd) throws SQLException {
		Map<String,Object> fusion_params = new HashMap<String,Object>();
		fusion_params.put("stat_data_id", stat_data_id);
		fusion_params.put("fusion_type", "minus");
		
		//융합전 5 미만 제거
		//statsMeMapper.statsMeMap_deleteFusionSrvDtCtlgDtwrhBefore(fusion_params);
		
		//Select max(base_year) min(base_year) 카탈로그 데이터마트
		Map<String,Object> fusion_result = statsMeMapper.statsMeMap_selectColorYnSrvDtCtlgDataList(fusion_params);
		if(fusion_result != null) {
			//융합 데이터 여부 체크
			String color_yn = StringUtil.isNullToString(fusion_result.get("color_yn"));
			String color2_yn = StringUtil.isNullToString(fusion_result.get("color2_yn"));
			String fusion_type = "";
			if("Y".equals(color_yn) && "Y".equals(color2_yn)) {
				//융합 유형 체크
				if("1".equals(idx_type)) {
					fusion_type = "minus"; //증감
				}
				else if("2".equals(idx_type)) {
					if("1".equals(nomfrm_cd)) {
						fusion_type = "plus"; //더하기
					} else if("2".equals(nomfrm_cd)) {
						fusion_type = "minus"; //빼기
					} else if("3".equals(nomfrm_cd)) {
						fusion_type = "multiplication"; //곱하기
					} else if("4".equals(nomfrm_cd)) {
						fusion_type = "division"; //나누기
					}
				}
				
				//융합
				if(!"".equals(fusion_type)) {
					fusion_params.put("fusion_type", fusion_type);
					
					//Update 융합 카탈로그 데이터마트
					statsMeMapper.statsMeMap_updateFusionSrvDtCtlgDtwrh(fusion_params);
					
					//Insert 융합 카탈로그 데이터마트
					fusion_params.put("stats_dta_sn", statsMeMapper.statsMeMap_selectMaxStatsDtaSnSrvDtCtlgDtwrh(fusion_params));
					statsMeMapper.statsMeMap_insertFusionSrvDtCtlgDtwrh(fusion_params);
					
					//Delete 융합 카탈로그 데이터마트
					statsMeMapper.statsMeMap_deleteFusionSrvDtCtlgDtwrh(fusion_params);
				}
			}
		}
	}
	
	// 통계자료 코드매핑
	public Map<String,Object> mappingSrvDtCtlgDataList(Map<String,Object> params) throws SQLException {
		//Validation
		if(params == null || params.isEmpty()) {
			return params;
		}
		
		//임시 파라미터 선언
		Map<String,Object> temp_params = new HashMap<String,Object>();
		
		//파라미터
		String stat_data_id = StringUtil.isNullToString(params.get("stat_data_id")); //통계자료코드
		String stat_data_nm = StringUtil.isNullToString(params.get("stat_data_nm")); //통계자료명
		String menu_nm = StringUtil.isNullToString(params.get("menu_nm")); //메뉴명
		String srv_nm = StringUtil.isNullToString(params.get("srv_nm")); //서비스명
		String b_class_nm = StringUtil.isNullToString(params.get("b_class_nm")); //대분류명
		String m_class_nm = StringUtil.isNullToString(params.get("m_class_nm")); //중분류명
		String s_class_nm = StringUtil.isNullToString(params.get("s_class_nm")); //세분류명
		
		//5건 미만 포함 여부 체크
		String berow_5_remove_yn = "Y"; // 기본값 : 5 미만 표시 안함.
		berow_5_remove_yn = StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(params).get("berow_5_remove_yn"));
		params.put("berow_5_remove_yn", berow_5_remove_yn);
		
		//통계주제도
		if("통계주제도".equals(menu_nm)) {
			if("귀농귀촌귀어".equals(stat_data_nm)) stat_data_nm = "귀농/귀촌/귀어 인구 현황";
			else if("인구 이동".equals(stat_data_nm)) stat_data_nm = "인구이동";
			else if("교원 1인당 학생수".equals(stat_data_nm)) stat_data_nm = "교원1인당 학생 수";
			else if("EQ-5D 삶의 질 지표".equals(stat_data_nm)) stat_data_nm = "EQ-5D지표 현황";
			else if("노지과수(사과/배) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지과수&#40;사과/배&#41; 재배면적변화";
			else if("노지과수(포도/복숭아) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지과수&#40;포도/복숭아&#41; 재배면적변화";
			else if("노지채소(마늘/양파) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지채소&#40;마늘/양파&#41; 재배면적변화";
			else if("노지채소(고추/파) 재배면적변화".equals(stat_data_nm)) stat_data_nm = "노지채소&#40;고추/파&#41; 재배면적변화";
			else if("노지채소(배추/무) 재배면적 변화".equals(stat_data_nm)) stat_data_nm = "노지채소&#40;배추/무&#41; 재배면적 변화";
			
			//통계주제도 조회
			temp_params.clear();
			temp_params.put("title", stat_data_nm);
			Map<String,Object> result1 = statsMeMapper.statsMeMap_ThematicMap_selectOneMngDtThemamaplist(temp_params);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null) {
				temp_params.clear();
				temp_params.put("stat_thema_map_id", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(params).get("stat_thema_map_id")));
				result1 = statsMeMapper.statsMeMap_ThematicMap_selectOneMngDtThemamaplist(temp_params);
				if(result1 == null) {
					result1 = new HashMap<String,Object>();
				}
			}
			
			String stat_thema_map_id = StringUtil.isNullToString(result1.get("stat_thema_map_id"));
			String thema_map_data_id = StringUtil.isNullToString(result1.get("thema_map_data_id"));
			String thema_map_type = StringUtil.isNullToString(result1.get("thema_map_type"));
			String thema_map_category = StringUtil.isNullToString(result1.get("thema_map_category"));
			String base_year = StringUtil.isNullToString(result1.get("base_year"));
			String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
			String corp_class_cd = StringUtil.isNullToString(result1.get("corp_class_cd"));
			String left_sep_nm = StringUtil.isNullToString(result1.get("left_sep_nm"));
			String left_sep_unit = StringUtil.isNullToString(result1.get("left_sep_unit"));
			String left_sep_chart_title = StringUtil.isNullToString(result1.get("left_sep_chart_title"));
			String left_sep_ttip_title = StringUtil.isNullToString(result1.get("left_sep_ttip_title"));
			String right_sep_ttip_title = StringUtil.isNullToString(result1.get("right_sep_ttip_title"));
			String stat_data_base_year = StringUtil.isNullToString(result1.get("stat_data_base_year2"));
			String atdrc_yn = StringUtil.isNullToString(result1.get("atdrc_yn"));
			
			//귀농귀촌귀어 thema_map_data_id 변경 (귀농)
			if("FlM5JUWj0T20181120214718029IpoBrl4UVw".equals(stat_thema_map_id)) {
				thema_map_data_id = "kosis_rtrn_frmhs_cnt";
			}
			
			//응급의료시설 접근현황 thema_map_data_id 변경 (5분)
			if("2qAx0jvYOk20180802165500441EHhhaQZQaK".equals(stat_thema_map_id)) {
				thema_map_data_id = "net_emergency_cnt_5";
			}
			
			//소방시설 접근현황 thema_map_data_id 변경 (5분)
			if("3SnEYaTafC20181127142830568kSyMYbSg3S".equals(stat_thema_map_id)) {
				thema_map_data_id = "net_fire_cnt_5";
			}
			
			/** 2020.05.12[한광희] My통계로 통계주제도 신규 지표 추가 START */
			// 경찰관서 접근현황 thema_map_data_id 변경 (5분)
			if("OuQf1ZhcWo20190822091422257GkbDsfsZHi".equals(stat_thema_map_id)) {
				thema_map_data_id = "net_police_cnt_5";
			}
			
			// 개인 카드 사용금액 현황 thema_map_data_id 변경
			if("onb6f4rRh320190902160751679iQUr3aVwTT".equals(stat_thema_map_id)) {
				thema_map_data_id = "credit_card_amount";
			}
			/** 2020.05.12[한광희] My통계로 통계주제도 신규 지표 추가 END */
			
			params.put("stat_thema_map_id", stat_thema_map_id);
			params.put("thema_map_data_id", thema_map_data_id);
			params.put("thema_map_type", thema_map_type);
			params.put("thema_map_category", thema_map_category);
			params.put("stat_data_base_year", stat_data_base_year);
			params.put("base_year", base_year);
			params.put("atdrc_yn", atdrc_yn);
			
			//thema_map_type이 07이면 POI 데이터 표출
			if("07".equals(thema_map_type)) {
				if(!"".equals(theme_cd)) params.put("theme_cd", theme_cd.split(","));
				if(!"".equals(corp_class_cd)) params.put("corp_class_cd", corp_class_cd.split(","));
			}
			//thema_map_type이 04이면서 귀농귀촌귀어가 아닌경우 차트데이터 표출 
			else if("04".equals(thema_map_type) && !"FlM5JUWj0T20181120214718029IpoBrl4UVw".equals(stat_thema_map_id)) {
				params.put("unit", "");
				if(left_sep_chart_title.indexOf("(") != -1) {
					params.put("unit", left_sep_chart_title.split("\\(")[1].split("\\)")[0]);
				}
				params.put("unit_nm", "수");
				params.put("tooltip_cn", right_sep_ttip_title);
			}
			else {
				params.put("unit", left_sep_unit);
				params.put("unit_nm", left_sep_nm);
				params.put("tooltip_cn", left_sep_ttip_title);
			}
		}
		else if("정책통계지도".equals(menu_nm)) {
			// Select 정책통계지도 조회
			temp_params.clear();
			temp_params.put("stat_data_id", stat_data_id);
			List<Map<String, Object>> result1 = statsMeMapper.statsMeMap_PolicyStaticMap_selectPolicyStaticMapList(temp_params);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null || result1.size() < 2) {
				temp_params.clear();
				temp_params.put("stat_data_id", stat_data_id);
				temp_params.put("idx_id", StringUtil.isNullToString(statsMeService.mappingHardSrvDtCtlgDataList(params).get("idx_id")));
				result1 = statsMeMapper.statsMeMap_PolicyStaticMap_selectPolicyStaticMapList(temp_params);
			}
			
			if(result1 != null && result1.size() == 2) {
				//파라미터 선언
				Map<String,Object> params1 = result1.get(0);
				Map<String,Object> params2 = result1.get(1);
				
				try {
					JSONObject params1_call_param = new JSONObject(StringUtil.isNullToString(params1.get("call_param")));
					JSONObject params1_map_param = new JSONObject(StringUtil.isNullToString(params1.get("map_param")));
					JSONObject params2_call_param = new JSONObject(StringUtil.isNullToString(params2.get("call_param")));
					JSONObject params2_map_param = new JSONObject(StringUtil.isNullToString(params2.get("map_param")));
					
					Iterator<String> iterator = params1_call_param.keys();
					while (iterator.hasNext()) {
						String key = iterator.next();
						String value = StringUtil.isNullToString(params1_call_param.get(key));
						params1.put(key, value);
					}
					iterator = params1_map_param.keys();
					while (iterator.hasNext()) {
						String key = iterator.next();
						String value = StringUtil.isNullToString(params1_map_param.get(key));
						params1.put(key, value);
					}
					iterator = params2_call_param.keys();
					while (iterator.hasNext()) {
						String key = iterator.next();
						String value = StringUtil.isNullToString(params2_call_param.get(key));
						params2.put(key, value);
					}
					iterator = params2_map_param.keys();
					while (iterator.hasNext()) {
						String key = iterator.next();
						String value = StringUtil.isNullToString(params2_map_param.get(key));
						params2.put(key, value);
					}
					
					String idx_id = StringUtil.isNullToString(params1.get("idx_id"));
					String idx_type = StringUtil.isNullToString(params1.get("idx_type"));
					String nomfrm_base_map_div = StringUtil.isNullToString(params1.get("nomfrm_base_map_div"));
					String nomfrm_cd = StringUtil.isNullToString(params1.get("nomfrm_cd"));
					String params1_call_url = StringUtil.isNullToString(params1.get("call_url"));
					String params2_call_url = StringUtil.isNullToString(params2.get("call_url"));
					
					params.put("idx_id",idx_id);
					params.put("idx_type",idx_type);
					params.put("nomfrm_base_map_div",nomfrm_base_map_div);
					params.put("nomfrm_cd",nomfrm_cd);
					
					//같은 url에서 단순 년도 변화만 비교 하는 경우
					if(params1_call_url.equals(params2_call_url) && "".equals(nomfrm_cd)) {
						params1.put("data_year", "max"); // params1 최대년도
						params2.put("data_year", "min"); // params2 최소년도
						
						String params1_year = StringUtil.isNullToString(params1.get("year"));
						String params2_year = StringUtil.isNullToString(params2.get("year"));
						if("9016".equals(params1_year)) params1_year = "2016";
						if("9016".equals(params2_year)) params2_year = "2016";
						
						//년도 바꾸기 (params1 = 높은 연도, params2 = 낮은 연도)
						if(!"".equals(params1_year) && !"".equals(params2_year) && params1_year.compareTo(params2_year) < 0) {
							String params1_year_temp = StringUtil.isNullToString(params1.get("year"));
							String params2_year_temp = StringUtil.isNullToString(params2.get("year"));
							params1.put("year", params2_year_temp);
							params2.put("year", params1_year_temp);
						}
					}
					
					//융합 여부 (POI 사용하는 경우 융합 안함)
					String fusion_yn = "Y";
					params1.put("map_ty", "color");
					params2.put("map_ty", "color");
					List<String> map_ty_poi_url = new ArrayList<String>();
					map_ty_poi_url.add("/view/map/policyWrite/getCompanyPoiList.do");
					map_ty_poi_url.add("/view/map/policyWrite/getLocalGovernmentPoiList.do");
					if(map_ty_poi_url.contains(params1_call_url)) {
						params1.put("map_ty", "poi");
						fusion_yn = "N";
					}
					if(map_ty_poi_url.contains(params2_call_url)) {
						params2.put("map_ty", "poi");
						fusion_yn = "N";
					}
					params.put("fusion_yn", fusion_yn);
					
					//API : /OpenAPI3/stats/house.json, call_param : house_type 배열 처리
					if("/OpenAPI3/stats/house.json".equals(params1_call_url)) {
						String params1_house_type = StringUtil.isNullToString(params1.get("house_type"));
						if(!"".equals(params1_house_type)) {
							params1.put("house_type", params1_house_type.split(","));
						}
					}
					if("/OpenAPI3/stats/house.json".equals(params2_call_url)) {
						String params2_house_type = StringUtil.isNullToString(params2.get("house_type"));
						if(!"".equals(params2_house_type)) {
							params2.put("house_type", params2_house_type.split(","));
						}
					}
					
					//API : /OpenAPI3/stats/household.json, call_param : household_type 배열 처리
					if("/OpenAPI3/stats/household.json".equals(params1_call_url)) {
						String params1_household_type = StringUtil.isNullToString(params1.get("household_type"));
						if(!"".equals(params1_household_type)) {
							params1.put("household_type", params1_household_type.split(","));
						}
					}
					if("/OpenAPI3/stats/household.json".equals(params2_call_url)) {
						String params2_household_type = StringUtil.isNullToString(params2.get("household_type"));
						if(!"".equals(params2_household_type)) {
							params2.put("household_type", params2_household_type.split(","));
						}
					}
					
					//API : /ServiceAPI/stats/fusionstats.json, call_param : household_type 배열 처리
					if("/ServiceAPI/stats/fusionstats.json".equals(params1_call_url)) {
						String params1_household_type = StringUtil.isNullToString(params1.get("household_type"));
						if(!"".equals(params1_household_type)) {
							params1.put("household_type", params1_household_type.split(","));
						}
					}
					if("/ServiceAPI/stats/fusionstats.json".equals(params2_call_url)) {
						String params2_household_type = StringUtil.isNullToString(params2.get("household_type"));
						if(!"".equals(params2_household_type)) {
							params2.put("household_type", params2_household_type.split(","));
						}
					}
					
					//API : /OpenAPI3/stats/company.json, call_param : class_code 변수 처리
					if("/OpenAPI3/stats/company.json".equals(params1_call_url)) {
						String params1_class_code = StringUtil.isNullToString(params1.get("class_code"));
						if(!"".equals(params1_class_code) && params1_class_code.length() == 1) {
							params1.put( "ksic1", params1_class_code );
							params1.put( "code_length", ""+params1_class_code.length() );
						}
						else if(!"".equals(params1_class_code) && params1_class_code.length() >= 3 && params1_class_code.length() <= 6 )
						{
							params1.put( "ksic1", params1_class_code.substring( 0, 1 ) );
							params1.put( "ksic5", params1_class_code.substring( 1, params1_class_code.length() ) );
							params1.put( "code_length", ""+params1_class_code.length() );
						}
					}
					if("/OpenAPI3/stats/company.json".equals(params2_call_url)) {
						String params2_class_code = StringUtil.isNullToString(params2.get("class_code"));
						if(!"".equals(params2_class_code) && params2_class_code.length() == 1) {
							params2.put( "ksic1", params2_class_code );
							params2.put( "code_length", ""+params2_class_code.length() );
						}
						else if(!"".equals(params2_class_code) && params2_class_code.length() >= 3 && params2_class_code.length() <= 6 )
						{
							params2.put( "ksic1", params2_class_code.substring( 0, 1 ) );
							params2.put( "ksic5", params2_class_code.substring( 1, params2_class_code.length() ) );
							params2.put( "code_length", ""+params2_class_code.length() );
						}
					}
				} catch (JSONException e) {
					
				}
				
				params.put("params1", params1);
				params.put("params2", params2);	
			}
			else {
				params.put("params1", new HashMap<String,Object>());
				params.put("params2", new HashMap<String,Object>());
			}
		}
		else if("일자리 맵".equals(menu_nm)) {
			if("일자리 통계분석".equals(srv_nm)) {
				//하드코딩 매핑
				params.putAll(statsMeService.mappingHardSrvDtCtlgDataList(params));
				
				String link_id = StringUtil.isNullToString(params.get("link_id"));
				String stat_data_base_year = StringUtil.isNullToString(params.get("stat_data_base_year"));
				String temp_stat_data_base_year = stat_data_base_year.replaceAll("년", "").replaceAll("월", "").replaceAll("Q", "").replaceAll(" ", "");
				
				// 청년실업률 분기별 정보로 인한 조건 변경
				if(link_id == "I3116") {
					if(temp_stat_data_base_year.length() < 6) {
						if(temp_stat_data_base_year.substring(4).length() < 2) {
							String tempStatDataBaseYear = temp_stat_data_base_year.substring(0,4);
							String tempStatDataBaseQu = "0" + temp_stat_data_base_year.substring(4);
							temp_stat_data_base_year = tempStatDataBaseYear + tempStatDataBaseQu;
						}						
					}
				}
				params.put("stat_data_base_year", temp_stat_data_base_year);
				String tempStatDataBaseYearOrginl = "";
				if(temp_stat_data_base_year.length() == 4) {
					tempStatDataBaseYearOrginl = stat_data_base_year + "년";
				} else {
					tempStatDataBaseYearOrginl = stat_data_base_year;
				}
				params.put("stat_data_base_year_orginl", tempStatDataBaseYearOrginl);
				
				if(link_id == "E3224") {	// 피보험자 증감 itm_id setting
					params.put("itm_id", "T20");
				} else if(link_id == "E3219") {	// 취업자 증감 itm_id setting
					params.put("itm_id", "T20");
				} else if(link_id == "E3218") {	// 구직건수 itm_id setting
					params.put("itm_id", "T70");
				} else if(link_id == "E3208") {	// 구인인원 itm_id setting
					params.put("itm_id", "T10");
				} else if(link_id == "I3207") {	// 폐업 수 itm_id setting
					params.put("itm_id", "T001");
				} else if(link_id == "I3206") {	// 신설 수 itm_id setting
					params.put("itm_id", "16142T1");
				} else if(link_id == "I3306") {	// 비정규직 근로자 수 itm_id setting
					params.put("itm_id", "T03");
				} else if(link_id == "I3402") {	// 지역내총생산 itm_id setting
					params.put("itm_id", "T1");
				}
			}
			else if("일자리보기".equals(srv_nm)) {
				//하드코딩 매핑
				params.putAll(statsMeService.mappingHardSrvDtCtlgDataList(params));
			}
		}
		else if("업종통계지도: 생활업종통계지도".equals(menu_nm)) {
			if("시군구별 업종현황".equals(srv_nm)) {
				//테마코드 조회
				String b_theme_cd_nm = b_class_nm.split("\\(")[0];
				String s_theme_cd_nm = stat_data_nm;
				if("서비스".equals(b_theme_cd_nm)) b_theme_cd_nm = "생활서비스";
				if("펜션".equals(s_theme_cd_nm)) s_theme_cd_nm = "팬션";
				temp_params.clear();
				temp_params.put("b_theme_cd_nm", b_theme_cd_nm);
				temp_params.put("s_theme_cd_nm", s_theme_cd_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Lvlh_selectOneCmmCdTheme(temp_params);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(params);
				}
				
				String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
				params.put("theme_cd", theme_cd);
				
				//데이터 (색상 : 시도, 시군구)
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_1(temp_params);
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_2(temp_params);
			}
			else if("개업현황".equals(srv_nm)) {
				//개업현황 서비스 코드 조회
				String service_nm = stat_data_nm.replaceAll("개업현황:", "").replaceAll(" ", "");
				if("개업현황: 숙박업(일반-관광호텔)".equals(stat_data_nm)) service_nm = "숙박업(일반)(관광호텔)";
				else if("개업현황: 일반음식점(정종,대포집,소주방)".equals(stat_data_nm)) service_nm = "일반음식점(정종/대포집/소주방)";
				temp_params.clear();
				temp_params.put("service_nm", service_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Lvlh_selectOneSrvPtLocaldata(temp_params);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(params);
				}
				
				String service_code = StringUtil.isNullToString(result1.get("service_code"));
				params.put("service_code", service_code);
				
				//데이터 (열지도 : 시도, 시군구, 읍면동)
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_6(temp_params);
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_7(temp_params);
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_8(temp_params);
				
				//데이터 (POI)
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_10(temp_params);
			}
			else if("업종 밀집도 변화".equals(srv_nm)) {
				//테마코드 조회
				String b_theme_cd_nm = b_class_nm.split("\\(")[0];
				String s_theme_cd_nm = stat_data_nm;
				if("서비스".equals(b_theme_cd_nm)) b_theme_cd_nm = "생활서비스";
				if("펜션".equals(s_theme_cd_nm)) s_theme_cd_nm = "팬션";
				temp_params.clear();
				temp_params.put("b_theme_cd_nm", b_theme_cd_nm);
				temp_params.put("s_theme_cd_nm", s_theme_cd_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Lvlh_selectOneCmmCdTheme(temp_params);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(params);
				}
				
				String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
				params.put("bnd_year", Properties.getDefult_bnd_year());
				params.put("theme_cd", theme_cd);
				
				//데이터 (열지도 : 시도, 시군구, 읍면동)
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_3(temp_params);
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_4(temp_params);
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_5(temp_params);
				
				//데이터 (POI)
				//statsMeMapper.statsMeMap_BizStatsMap_Lvlh_insertSrvDtCtlgDtwrh_BizStatsMap_Lvlh_9(temp_params);
			}
		}
		else if("업종통계지도: 기술업종통계지도".equals(menu_nm)) {
			//기술업종 코드정의 조회
			temp_params.clear();
			temp_params.put("techbiz_m_class_cd_nm", stat_data_nm.replaceAll("업종", ""));
			Map<String,Object> result1 = statsMeMapper.statsMeMap_BizStatsMap_Tchnlgy_selectOneCmmCdTechbizCd(temp_params);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null) {
				result1 = statsMeService.mappingHardSrvDtCtlgDataList(params);
			}
			
			String techbiz_m_class_cd = StringUtil.isNullToString(result1.get("techbiz_m_class_cd"));
			//파라미터 다름 (techbiz_class_cd <> techbiz_m_class_cd)
			params.put("techbiz_class_cd", techbiz_m_class_cd);
			
			//데이터 (색상 : 시도, 시군구, 읍면동)
			//statsMeMapper.statsMeMap_BizStatsMap_Tchnlgy_insertSrvDtCtlgDtwrh_BizStatsMap_Tchnlgy_1(temp_params);
		}
		else if("살고싶은 우리동네".equals(menu_nm)) {
			// 지표 코드 조회
			temp_params.clear();
			temp_params.put("stat_data_id", stat_data_id);
			Map<String,Object> result1 = statsMeMapper.statsMeMap_HouseAnalysisMap_selectSrvDtCtlgDtwrh_HouseAnalysisMap_IndexCd(temp_params);
			
			//조회 실패시 하드코딩으로 조회
			if(result1 == null) {
				result1 = statsMeService.mappingHardSrvDtCtlgDataList(params);
			}
			
			String m_class_idx_id = StringUtil.isNullToString(result1.get("m_class_idx_id"));
			String b_class_idx_id = StringUtil.isNullToString(result1.get("b_class_idx_id"));
			
			params.put("m_class_idx_id", m_class_idx_id);
			params.put("b_class_idx_id", b_class_idx_id);
			// Insert 카탈로그 데이터마트 살고싶은 우리동네 : 시도
			//statsMeMapper.statsMeMap_HouseAnalysisMap_insertSrvDtCtlgDtwrh_HouseAnalysisMap_Sido(temp_params);
			// Insert 카탈로그 데이터마트 살고싶은 우리동네 : 시군구
			//statsMeMapper.statsMeMap_HouseAnalysisMap_insertSrvDtCtlgDtwrh_HouseAnalysisMap_Sgg(temp_params);
			// Insert 카탈로그 데이터마트 살고싶은 우리동네 : 읍면동
			//statsMeMapper.statsMeMap_HouseAnalysisMap_insertSrvDtCtlgDtwrh_HouseAnalysisMap_Emdong(temp_params);
		}
		else if("대화형 통계지도".equals(menu_nm)) {
			if("전국 사업체조사: 산업분류".equals(srv_nm)) {
				//산업체분류 조회
				String class_deg = "10";
				String ksic_1_nm = b_class_nm;
				String ksic_2_nm = m_class_nm;
				String ksic_3_nm = s_class_nm;
				String ksic_4_nm = stat_data_nm;
				if("농업,임업 및 어업".equals(ksic_1_nm)) ksic_1_nm = "농업, 임업 및 어업";
				if("수도 , 하수 및 폐기물 처리, 원료 재생업(36~39)".equals(ksic_1_nm)) ksic_1_nm = "수도, 하수 및 폐기물 처리, 원료 재생업(36~39)";
				if("전문, 과학 및 기술서비스업".equals(ksic_1_nm)) ksic_1_nm = "전문, 과학 및 기술 서비스업";
				if("사업시설 관리, 사업 지원 및 임대서비스업".equals(ksic_1_nm)) ksic_1_nm = "사업시설 관리, 사업 지원 및 임대 서비스업";
				if("공공행정, 국방 및 사회보장 행정".equals(ksic_1_nm)) ksic_1_nm = "공공 행정, 국방 및 사회보장 행정";
				if("공공행정, 국방 및 사회보장 행정".equals(ksic_2_nm)) ksic_2_nm = "공공 행정, 국방 및 사회보장 행정";
				temp_params.clear();
				temp_params.put("class_deg", class_deg);
				temp_params.put("ksic_1_nm", ksic_1_nm);
				temp_params.put("ksic_2_nm", ksic_2_nm);
				temp_params.put("ksic_3_nm", ksic_3_nm);
				temp_params.put("ksic_4_nm", ksic_4_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_InteractiveMap_selectOneCmmCdCorpclass(temp_params);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(params);
				}
				
				String ksic_1_cd = StringUtil.isNullToString(result1.get("ksic_1_cd"));
				String ksic_4_cd = StringUtil.isNullToString(result1.get("ksic_4_cd"));
				params.put("ksic_1_cd", ksic_1_cd);
				params.put("ksic_4_cd", ksic_4_cd);
				
				//데이터 (색상 : 시도, 시군구, 읍면동, 소지역)
				//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_3(temp_params);
			}
			else if("전국 사업체조사: 테마업종".equals(srv_nm)) {
				//테마코드 조회
				String b_theme_cd_nm = b_class_nm.split("\\(")[0];
				String s_theme_cd_nm = stat_data_nm;
				if("펜션".equals(s_theme_cd_nm)) s_theme_cd_nm = "팬션";
				temp_params.clear();
				temp_params.put("b_theme_cd_nm", b_theme_cd_nm);
				temp_params.put("s_theme_cd_nm", s_theme_cd_nm);
				Map<String,Object> result1 = statsMeMapper.statsMeMap_InteractiveMap_selectOneCmmCdTheme(temp_params);
				
				//조회 실패시 하드코딩으로 조회
				if(result1 == null) {
					result1 = statsMeService.mappingHardSrvDtCtlgDataList(params);
				}
				
				String theme_cd = StringUtil.isNullToString(result1.get("theme_cd"));
				params.put("theme_cd", theme_cd);
				
				//데이터 (색상 : 시도, 시군구, 읍면동, 소지역)
				//statsMeMapper.statsMeMap_InteractiveMap_insertSrvDtCtlgDtwrh_InteractiveMap_1(temp_params);
			}
			else if("e-지방지표".equals(srv_nm)) {
				//별도 처리
			}
			else if("인구주택총조사".equals(srv_nm)) {
				if("인구조건".equals(b_class_nm)) {
					//하드코딩 매핑
					params.putAll(statsMeService.mappingHardSrvDtCtlgDataList(params));
				}
				else if("가구조건".equals(b_class_nm)) {
					
				}
				else if("주택조건".equals(b_class_nm)) {
					
				}
				/** 2020.05.14[한광희] My통계로 인구주택총조사 1인가구 지표 추가 START */
				else if("결합조건".equals(b_class_nm)) {
					//하드코딩 매핑
					params.putAll(statsMeService.mappingHardSrvDtCtlgDataList(params));
				}
				/** 2020.05.14[한광희] My통계로 인구주택총조사 1인가구 지표 추가 END */
			}
		}
		
		return params;
	}
	
	// 통계자료 하드코드매핑
	public Map<String,Object> mappingHardSrvDtCtlgDataList(Map<String,Object> params) {
		//파라미터
		String stat_data_id = StringUtil.isNullToString(params.get("stat_data_id")); //통계자료코드
		String menu_nm = StringUtil.isNullToString(params.get("menu_nm")); //메뉴명
		String srv_nm = StringUtil.isNullToString(params.get("srv_nm")); //서비스명
		String b_class_nm = StringUtil.isNullToString(params.get("b_class_nm")); //대분류명
		String m_class_nm = StringUtil.isNullToString(params.get("m_class_nm")); //중분류명
		String s_class_nm = StringUtil.isNullToString(params.get("s_class_nm")); //세분류명
		
		//하드코딩 목록
		@SuppressWarnings({ "unchecked", "rawtypes", "serial" })
		Map<String,Object> mapping_list = new HashMap() {{ 
			//put("", new HashMap() {{ put("", ""); }});
			
			//업종통계지도: 생활업종통계지도 > 시군구별 업종현황
			put("BS0001", new HashMap() {{ put("theme_cd", "5001"); }}); //한식
			put("BS0002", new HashMap() {{ put("theme_cd", "5002"); }}); //중식
			put("BS0003", new HashMap() {{ put("theme_cd", "5003"); }}); //일식
			put("BS0004", new HashMap() {{ put("theme_cd", "5004"); }}); //분식
			put("BS0005", new HashMap() {{ put("theme_cd", "5005"); }}); //서양식
			put("BS0006", new HashMap() {{ put("theme_cd", "5006"); }}); //제과점
			put("BS0007", new HashMap() {{ put("theme_cd", "5007"); }}); //패스트푸드
			put("BS0008", new HashMap() {{ put("theme_cd", "5008"); }}); //치킨
			put("BS0009", new HashMap() {{ put("theme_cd", "5009"); }}); //호프 및 간이주점
			put("BS0010", new HashMap() {{ put("theme_cd", "5010"); }}); //카페
			put("BS0011", new HashMap() {{ put("theme_cd", "5011"); }}); //기타 외국식
			put("BS0012", new HashMap() {{ put("theme_cd", "2001"); }}); //문구점
			put("BS0013", new HashMap() {{ put("theme_cd", "2002"); }}); //서점
			put("BS0014", new HashMap() {{ put("theme_cd", "2003"); }}); //편의점
			put("BS0015", new HashMap() {{ put("theme_cd", "2004"); }}); //식료품점
			put("BS0016", new HashMap() {{ put("theme_cd", "2005"); }}); //휴대폰점
			put("BS0017", new HashMap() {{ put("theme_cd", "2006"); }}); //의류
			put("BS0018", new HashMap() {{ put("theme_cd", "2007"); }}); //화장품/방향제
			put("BS0019", new HashMap() {{ put("theme_cd", "2008"); }}); //철물점
			put("BS0020", new HashMap() {{ put("theme_cd", "2009"); }}); //주유소
			put("BS0021", new HashMap() {{ put("theme_cd", "2010"); }}); //꽃집
			put("BS0022", new HashMap() {{ put("theme_cd", "2011"); }}); //슈퍼마켓
			put("BS0023", new HashMap() {{ put("theme_cd", "1001"); }}); //인테리어
			put("BS0024", new HashMap() {{ put("theme_cd", "1002"); }}); //목욕탕
			put("BS0025", new HashMap() {{ put("theme_cd", "1003"); }}); //교습학원
			put("BS0026", new HashMap() {{ put("theme_cd", "1004"); }}); //어학원
			put("BS0027", new HashMap() {{ put("theme_cd", "1005"); }}); //예체능학원
			put("BS0028", new HashMap() {{ put("theme_cd", "1006"); }}); //부동산중개업
			put("BS0029", new HashMap() {{ put("theme_cd", "1007"); }}); //이발소
			put("BS0030", new HashMap() {{ put("theme_cd", "1008"); }}); //미용실
			put("BS0031", new HashMap() {{ put("theme_cd", "1009"); }}); //세탁소
			put("BS0032", new HashMap() {{ put("theme_cd", "1010"); }}); //PC방
			put("BS0033", new HashMap() {{ put("theme_cd", "1011"); }}); //노래방
			put("BS0034", new HashMap() {{ put("theme_cd", "4001"); }}); //호텔
			put("BS0035", new HashMap() {{ put("theme_cd", "4002"); }}); //여관(모텔포함) 및 여인숙
			put("BS0036", new HashMap() {{ put("theme_cd", "4003"); }}); //펜션

			/*2020.10.20 심창무 업종통계지도: 생활업종통계지도 > 시군구별 업종현황 신규 테마코드 추가 START*/
			put("BS0136", new HashMap() {{ put("theme_cd", "C001"); }}); //가구
			put("BS0137", new HashMap() {{ put("theme_cd", "C002"); }}); //가전제품
			put("BS0138", new HashMap() {{ put("theme_cd", "C003"); }}); //통신판매
			put("BS0139", new HashMap() {{ put("theme_cd", "C004"); }}); //신발
			put("BS0140", new HashMap() {{ put("theme_cd", "D001"); }}); //생활용품임대
			put("BS0141", new HashMap() {{ put("theme_cd", "D002"); }}); //독서실
			put("BS0142", new HashMap() {{ put("theme_cd", "D003"); }}); //생활용품수리
			put("BS0143", new HashMap() {{ put("theme_cd", "D004"); }}); //카센터
			put("BS0144", new HashMap() {{ put("theme_cd", "D005"); }}); //피부/미용
			put("BS0145", new HashMap() {{ put("theme_cd", "D006"); }}); //마사지
			put("BS0146", new HashMap() {{ put("theme_cd", "D007"); }}); //택배/배달
			put("BS0147", new HashMap() {{ put("theme_cd", "F001"); }}); //생활체육시설
			put("BS0148", new HashMap() {{ put("theme_cd", "F002"); }}); //여행사
			put("BS0149", new HashMap() {{ put("theme_cd", "G001"); }}); //민박
			put("BS0150", new HashMap() {{ put("theme_cd", "I001"); }}); //기술직업훈련
			put("BS0151", new HashMap() {{ put("theme_cd", "J001"); }}); //동물병원
			put("BS0152", new HashMap() {{ put("theme_cd", "J002"); }}); //약국
			put("BS0153", new HashMap() {{ put("theme_cd", "J003"); }}); //한방병원
			/*2020.10.20 심창무 업종통계지도: 생활업종통계지도 > 시군구별 업종현황 신규 테마코드 추가 END*/

			//업종통계지도: 생활업종통계지도 > 개업현황
			put("BS0037", new HashMap() {{ put("service_code", "22_09_01_P"); }}); //개업현황: 인터넷 컴퓨터 게임시설 제공업
			put("BS0038", new HashMap() {{ put("service_code", "22_14_01_P"); }}); //개업현황: 청소년 게임 제공업
			put("BS0039", new HashMap() {{ put("service_code", "21_06_01_P"); }}); //개업현황: 노래 연습장업
			put("BS0040", new HashMap() {{ put("service_code", "23_06_01_P"); }}); //개업현황: 체육도장업
			put("BS0041", new HashMap() {{ put("service_code", "23_12_01_P"); }}); //개업현황: 무도 학원업
			put("BS0042", new HashMap() {{ put("service_code", "41_43_01_P"); }}); //개업현황: 숙박업
			put("BS0043", new HashMap() {{ put("service_code", "41_16_01_P"); }}); //개업현황: 숙박업(일반-여관업)
			put("BS0044", new HashMap() {{ put("service_code", "41_17_01_P"); }}); //개업현황: 숙박업(일반-여인숙업)
			put("BS0045", new HashMap() {{ put("service_code", "41_14_01_P"); }}); //개업현황: 숙박업(일반-일반호텔)
			put("BS0046", new HashMap() {{ put("service_code", "41_13_01_P"); }}); //개업현황: 숙박업(일반-관광호텔)
			put("BS0047", new HashMap() {{ put("service_code", "16_19_01_P"); }}); //개업현황: 관광펜션업
			put("BS0048", new HashMap() {{ put("service_code", "24_01_01_P"); }}); //개업현황: 일반음식점(한식)
			put("BS0049", new HashMap() {{ put("service_code", "24_44_01_P"); }}); //개업현황: 휴게음식점(커피숍)
			put("BS0050", new HashMap() {{ put("service_code", "24_20_01_P"); }}); //개업현황: 일반음식점(기타)
			put("BS0051", new HashMap() {{ put("service_code", "24_12_01_P"); }}); //개업현황: 일반음식점(호프/통닭)
			put("BS0052", new HashMap() {{ put("service_code", "24_05_01_P"); }}); //개업현황: 일반음식점(분식)
			put("BS0053", new HashMap() {{ put("service_code", "24_18_01_P"); }}); //개업현황: 일반음식점(식육(숯불구이))
			put("BS0054", new HashMap() {{ put("service_code", "24_03_01_P"); }}); //개업현황: 일반음식점(경양식)
			put("BS0055", new HashMap() {{ put("service_code", "24_42_01_P"); }}); //개업현황: 휴게음식점(편의점)
			put("BS0056", new HashMap() {{ put("service_code", "24_48_01_P"); }}); //개업현황: 제과점영업
			put("BS0057", new HashMap() {{ put("service_code", "24_07_01_P"); }}); //개업현황: 일반음식점(정종,대포집,소주방)
			put("BS0058", new HashMap() {{ put("service_code", "24_04_01_P"); }}); //개업현황: 일반음식점(일식)
			put("BS0059", new HashMap() {{ put("service_code", "24_02_01_P"); }}); //개업현황: 일반음식점(중국식)
			put("BS0060", new HashMap() {{ put("service_code", "24_43_01_P"); }}); //개업현황: 휴게음식점(패스트푸드)
			put("BS0061", new HashMap() {{ put("service_code", "24_16_01_P"); }}); //개업현황: 일반음식점(횟집)
			put("BS0062", new HashMap() {{ put("service_code", "24_32_01_P"); }}); //개업현황: 단란주점영업
			put("BS0063", new HashMap() {{ put("service_code", "24_06_01_P"); }}); //개업현황: 일반음식점(뷔페식)
			put("BS0064", new HashMap() {{ put("service_code", "24_15_01_P"); }}); //개업현황: 일반음식점(김밥(도시락))
			put("BS0065", new HashMap() {{ put("service_code", "24_19_01_P"); }}); //개업현황: 일반음식점(탕류(보신용))
			put("BS0066", new HashMap() {{ put("service_code", "24_45_01_P"); }}); //개업현황: 휴게음식점(전통찻집)
			put("BS0067", new HashMap() {{ put("service_code", "24_81_01_P"); }}); //개업현황: 일반음식점(패밀리레스토랑)
			put("BS0068", new HashMap() {{ put("service_code", "24_76_01_P"); }}); //개업현황: 일반음식점(라이브카페)
			put("BS0069", new HashMap() {{ put("service_code", "24_71_01_P"); }}); //개업현황: 유흥주점영업(노래클럽)
			put("BS0070", new HashMap() {{ put("service_code", "24_68_01_P"); }}); //개업현황: 일반음식점(감성주점)
			put("BS0071", new HashMap() {{ put("service_code", "24_70_01_P"); }}); //개업현황: 일반음식점(냉면집)
			put("BS0072", new HashMap() {{ put("service_code", "24_30_01_P"); }}); //개업현황: 유흥주점영업(간이주점)
			put("BS0073", new HashMap() {{ put("service_code", "41_40_01_P"); }}); //개업현황: 미용업(일반)
			put("BS0074", new HashMap() {{ put("service_code", "41_41_01_P"); }}); //개업현황: 미용업(피부)
			put("BS0075", new HashMap() {{ put("service_code", "41_40_02_P"); }}); //개업현황: 미용업(손톱ㆍ발톱)
			put("BS0076", new HashMap() {{ put("service_code", "41_24_01_P"); }}); //개업현황: 이용업
			put("BS0077", new HashMap() {{ put("service_code", "41_41_02_P"); }}); //개업현황: 미용업(피부/손톱ㆍ발톱)
			put("BS0078", new HashMap() {{ put("service_code", "41_42_01_P"); }}); //개업현황: 미용업(종합)
			put("BS0079", new HashMap() {{ put("service_code", "41_40_04_P"); }}); //개업현황: 미용업(일반/손톱ㆍ발톱)
			put("BS0080", new HashMap() {{ put("service_code", "41_40_09_P"); }}); //개업현황: 미용업(일반/화장ㆍ분장)
			put("BS0081", new HashMap() {{ put("service_code", "41_40_05_P"); }}); //개업현황: 미용업(일반/손톱ㆍ발톱/화장ㆍ분장)
			put("BS0082", new HashMap() {{ put("service_code", "41_40_03_P"); }}); //개업현황: 미용업(손톱ㆍ발톱/화장ㆍ분장)
			put("BS0083", new HashMap() {{ put("service_code", "41_19_01_P"); }}); //개업현황: 목욕장업(공동탕업)
			put("BS0084", new HashMap() {{ put("service_code", "41_41_05_P"); }}); //개업현황: 미용업(화장ㆍ분장)
			put("BS0085", new HashMap() {{ put("service_code", "41_40_06_P"); }}); //개업현황: 미용업(일반/피부)
			put("BS0086", new HashMap() {{ put("service_code", "41_41_03_P"); }}); //개업현황: 미용업(피부/손톱ㆍ발톱/화장ㆍ분장)
			put("BS0087", new HashMap() {{ put("service_code", "41_40_07_P"); }}); //개업현황: 미용업(일반/피부/손톱ㆍ발톱)
			put("BS0088", new HashMap() {{ put("service_code", "41_41_04_P"); }}); //개업현황: 미용업(피부/화장ㆍ분장)
			put("BS0089", new HashMap() {{ put("service_code", "41_40_08_P"); }}); //개업현황: 미용업(일반/피부/화장ㆍ분장)
			put("BS0090", new HashMap() {{ put("service_code", "42_08_05_P"); }}); //개업현황: 석유판매업(주유소)
			put("BS0091", new HashMap() {{ put("service_code", "42_03_01_P"); }}); //개업현황: 석유 및 석유대체연료 판매업체
			put("BS0092", new HashMap() {{ put("service_code", "42_08_04_P"); }}); //개업현황: 석유판매업(일반판매소)
			
			//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화
			put("BS0100", new HashMap() {{ put("theme_cd", "5001"); }}); //한식
			put("BS0101", new HashMap() {{ put("theme_cd", "5002"); }}); //중식
			put("BS0102", new HashMap() {{ put("theme_cd", "5003"); }}); //일식
			put("BS0103", new HashMap() {{ put("theme_cd", "5004"); }}); //분식
			put("BS0104", new HashMap() {{ put("theme_cd", "5005"); }}); //서양식
			put("BS0105", new HashMap() {{ put("theme_cd", "5006"); }}); //제과점
			put("BS0106", new HashMap() {{ put("theme_cd", "5007"); }}); //패스트푸드
			put("BS0107", new HashMap() {{ put("theme_cd", "5008"); }}); //치킨
			put("BS0108", new HashMap() {{ put("theme_cd", "5009"); }}); //호프 및 간이주점
			put("BS0109", new HashMap() {{ put("theme_cd", "5010"); }}); //카페
			put("BS0110", new HashMap() {{ put("theme_cd", "5011"); }}); //기타 외국식
			put("BS0111", new HashMap() {{ put("theme_cd", "2001"); }}); //문구점
			put("BS0112", new HashMap() {{ put("theme_cd", "2002"); }}); //서점
			put("BS0113", new HashMap() {{ put("theme_cd", "2003"); }}); //편의점
			put("BS0114", new HashMap() {{ put("theme_cd", "2004"); }}); //식료품점
			put("BS0115", new HashMap() {{ put("theme_cd", "2005"); }}); //휴대폰점
			put("BS0116", new HashMap() {{ put("theme_cd", "2006"); }}); //의류
			put("BS0117", new HashMap() {{ put("theme_cd", "2007"); }}); //화장품/방향제
			put("BS0118", new HashMap() {{ put("theme_cd", "2008"); }}); //철물점
			put("BS0119", new HashMap() {{ put("theme_cd", "2009"); }}); //주유소
			put("BS0120", new HashMap() {{ put("theme_cd", "2010"); }}); //꽃집
			put("BS0121", new HashMap() {{ put("theme_cd", "2011"); }}); //슈퍼마켓
			put("BS0122", new HashMap() {{ put("theme_cd", "1001"); }}); //인테리어
			put("BS0123", new HashMap() {{ put("theme_cd", "1002"); }}); //목욕탕
			put("BS0124", new HashMap() {{ put("theme_cd", "1003"); }}); //교습학원
			put("BS0125", new HashMap() {{ put("theme_cd", "1004"); }}); //어학원
			put("BS0126", new HashMap() {{ put("theme_cd", "1005"); }}); //예체능학원
			put("BS0127", new HashMap() {{ put("theme_cd", "1006"); }}); //부동산중개업
			put("BS0128", new HashMap() {{ put("theme_cd", "1007"); }}); //이발소
			put("BS0129", new HashMap() {{ put("theme_cd", "1008"); }}); //미용실
			put("BS0130", new HashMap() {{ put("theme_cd", "1009"); }}); //세탁소
			put("BS0131", new HashMap() {{ put("theme_cd", "1010"); }}); //PC방
			put("BS0132", new HashMap() {{ put("theme_cd", "1011"); }}); //노래방
			put("BS0133", new HashMap() {{ put("theme_cd", "4001"); }}); //호텔
			put("BS0134", new HashMap() {{ put("theme_cd", "4002"); }}); //여관(모텔포함) 및 여인숙
			put("BS0135", new HashMap() {{ put("theme_cd", "4003"); }}); //펜션

			/*2020.10.20 심창무 업종통계지도: 생활업종통계지도 > 업종 밀집도 변화 신규 테마코드 추가 START*/
			put("BS0154", new HashMap() {{ put("theme_cd", "C001"); }}); //가구
			put("BS0155", new HashMap() {{ put("theme_cd", "C002"); }}); //가전제품
			put("BS0156", new HashMap() {{ put("theme_cd", "C003"); }}); //통신판매
			put("BS0157", new HashMap() {{ put("theme_cd", "C004"); }}); //신발
			put("BS0158", new HashMap() {{ put("theme_cd", "D001"); }}); //생활용품임대
			put("BS0159", new HashMap() {{ put("theme_cd", "D002"); }}); //독서실
			put("BS0160", new HashMap() {{ put("theme_cd", "D003"); }}); //생활용품수리
			put("BS0161", new HashMap() {{ put("theme_cd", "D004"); }}); //카센터
			put("BS0162", new HashMap() {{ put("theme_cd", "D005"); }}); //피부/미용
			put("BS0163", new HashMap() {{ put("theme_cd", "D006"); }}); //마사지
			put("BS0164", new HashMap() {{ put("theme_cd", "D007"); }}); //택배/배달
			put("BS0165", new HashMap() {{ put("theme_cd", "F001"); }}); //생활체육시설
			put("BS0166", new HashMap() {{ put("theme_cd", "F002"); }}); //여행사
			put("BS0167", new HashMap() {{ put("theme_cd", "G001"); }}); //민박
			put("BS0168", new HashMap() {{ put("theme_cd", "I001"); }}); //기술직업훈련
			put("BS0169", new HashMap() {{ put("theme_cd", "J001"); }}); //동물병원
			put("BS0170", new HashMap() {{ put("theme_cd", "J002"); }}); //약국
			put("BS0171", new HashMap() {{ put("theme_cd", "J003"); }}); //한방병원
			/*2020.10.20 심창무 업종통계지도: 생활업종통계지도 > 업종 밀집도 변화 신규 테마코드 추가 END*/

			//업종통계지도: 기술업종통계지도
			put("BS0093", new HashMap() {{ put("techbiz_m_class_cd", "11"); }}); //첨단기술업종
			put("BS0094", new HashMap() {{ put("techbiz_m_class_cd", "12"); }}); //고기술업종
			put("BS0095", new HashMap() {{ put("techbiz_m_class_cd", "13"); }}); //중기술업종
			put("BS0096", new HashMap() {{ put("techbiz_m_class_cd", "14"); }}); //저기술업종
			put("BS0097", new HashMap() {{ put("techbiz_m_class_cd", "21"); }}); //창의 및 디지털업종
			put("BS0098", new HashMap() {{ put("techbiz_m_class_cd", "22"); }}); //ICT업종
			put("BS0099", new HashMap() {{ put("techbiz_m_class_cd", "23"); }}); //전문서비스업종
			
			//대화형 통계지도 > 전국 사업체조사: 산업분류
			put("CV0001", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0111"); }}); //곡물 및 기타 식량작물 재배업
			put("CV0002", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0112"); }}); //채소, 화훼작물 및 종묘 재배업
			put("CV0003", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0113"); }}); //과실, 음료용 및 향신용 작물 재배업
			put("CV0004", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0114"); }}); //기타 작물 재배업
			put("CV0005", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0115"); }}); //시설작물 재배업
			put("CV0006", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0121"); }}); //소 사육업
			put("CV0007", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0122"); }}); //양돈업
			put("CV0008", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0123"); }}); //가금류 및 조류 사육업
			put("CV0009", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0129"); }}); //기타 축산업
			put("CV0010", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0130"); }}); //작물재배 및 축산 복합농업
			put("CV0011", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0141"); }}); //작물재배 관련 서비스업
			put("CV0012", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0142"); }}); //축산 관련 서비스업
			put("CV0013", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0150"); }}); //수렵 및 관련 서비스업
			put("CV0014", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0201"); }}); //영림업
			put("CV0015", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0202"); }}); //벌목업
			put("CV0016", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0203"); }}); //임산물 채취업
			put("CV0017", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0204"); }}); //임업 관련 서비스업
			put("CV0018", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0311"); }}); //해수면 어업
			put("CV0019", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0312"); }}); //내수면 어업
			put("CV0020", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0321"); }}); //양식 어업
			put("CV0021", new HashMap() {{ put("ksic_1_cd", "A"); put("ksic_4_cd", "0322"); }}); //어업 관련 서비스업
			put("CV0022", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0510"); }}); //석탄 광업
			put("CV0023", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0520"); }}); //원유 및 천연가스 채굴업
			put("CV0024", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0610"); }}); //철 광업
			put("CV0025", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0620"); }}); //비철금속 광업
			put("CV0026", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0711"); }}); //석회석 및 점토 광업
			put("CV0027", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0712"); }}); //석재, 쇄석 및 모래, 자갈 채취업
			put("CV0028", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0721"); }}); //화학용 및 비료 원료용 광물 광업
			put("CV0029", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0722"); }}); //천일염 생산 및 암염 채취업
			put("CV0030", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0729"); }}); //그 외 기타 비금속광물 광업
			put("CV0031", new HashMap() {{ put("ksic_1_cd", "B"); put("ksic_4_cd", "0800"); }}); //광업 지원 서비스업
			put("CV0032", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1011"); }}); //도축업
			put("CV0033", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1012"); }}); //육류 가공 및 저장 처리업
			put("CV0034", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1021"); }}); //수산동물 가공 및 저장 처리업
			put("CV0035", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1022"); }}); //수산식물 가공 및 저장 처리업
			put("CV0036", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1030"); }}); //과실, 채소 가공 및 저장 처리업
			put("CV0037", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1040"); }}); //동물성 및 식물성 유지 제조업
			put("CV0038", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1050"); }}); //낙농제품 및 식용 빙과류 제조업
			put("CV0039", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1061"); }}); //곡물 가공품 제조업
			put("CV0040", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1062"); }}); //전분제품 및 당류 제조업
			put("CV0041", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1071"); }}); //떡, 빵 및 과자류 제조업
			put("CV0042", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1072"); }}); //설탕 제조업
			put("CV0043", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1073"); }}); //면류, 마카로니 및 유사 식품 제조업
			put("CV0044", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1074"); }}); //조미료 및 식품 첨가물 제조업
			put("CV0045", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1075"); }}); //도시락 및 식사용 조리식품 제조업
			put("CV0046", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1079"); }}); //기타 식료품 제조업
			put("CV0047", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1080"); }}); //동물용 사료 및 조제식품 제조업
			put("CV0048", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1111"); }}); //발효주 제조업
			put("CV0049", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1112"); }}); //증류주 및 합성주 제조업
			put("CV0050", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1120"); }}); //비알코올 음료 및 얼음 제조업
			put("CV0051", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1200"); }}); //담배 제조업
			put("CV0052", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1310"); }}); //방적 및 가공사 제조업
			put("CV0053", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1321"); }}); //직물 직조업
			put("CV0054", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1322"); }}); //직물제품 제조업
			put("CV0055", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1330"); }}); //편조 원단 제조업
			put("CV0056", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1340"); }}); //섬유제품 염색, 정리 및 마무리 가공업
			put("CV0057", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1391"); }}); //카펫, 마루덮개 및 유사 제품 제조업
			put("CV0058", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1392"); }}); //끈, 로프, 망 및 끈 가공품 제조업
			put("CV0059", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1399"); }}); //그 외 기타 섬유제품 제조업
			put("CV0060", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1411"); }}); //겉옷 제조업
			put("CV0061", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1412"); }}); //속옷 및 잠옷 제조업
			put("CV0062", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1413"); }}); //한복 제조업
			put("CV0063", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1419"); }}); //기타 봉제의복 제조업
			put("CV0064", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1420"); }}); //모피제품 제조업
			put("CV0065", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1430"); }}); //편조의복 제조업
			put("CV0066", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1441"); }}); //편조 의복 액세서리 제조업
			put("CV0067", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1449"); }}); //기타 의복 액세서리 제조업
			put("CV0068", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1511"); }}); //모피 및 가죽 제조업
			put("CV0069", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1512"); }}); //핸드백, 가방 및 기타 보호용 케이스 제조업
			put("CV0070", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1519"); }}); //기타 가죽제품 제조업
			put("CV0071", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1521"); }}); //신발 제조업
			put("CV0072", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1522"); }}); //신발 부분품 제조업
			put("CV0073", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1610"); }}); //제재 및 목재 가공업
			put("CV0074", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1621"); }}); //박판, 합판 및 강화 목제품 제조업
			put("CV0075", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1622"); }}); //건축용 나무제품 제조업
			put("CV0076", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1623"); }}); //목재 상자, 드럼 및 적재판 제조업
			put("CV0077", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1629"); }}); //기타 나무제품 제조업
			put("CV0078", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1630"); }}); //코르크 및 조물 제품 제조업
			put("CV0079", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1711"); }}); //펄프 제조업
			put("CV0080", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1712"); }}); //종이 및 판지 제조업
			put("CV0081", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1721"); }}); //골판지 및 골판지 가공제품 제조업
			put("CV0082", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1722"); }}); //종이 포대, 판지 상자 및 종이 용기 제조업
			put("CV0083", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1790"); }}); //기타 종이 및 판지 제품 제조업
			put("CV0084", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1811"); }}); //인쇄업
			put("CV0085", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1812"); }}); //인쇄관련 산업
			put("CV0086", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1820"); }}); //기록매체 복제업
			put("CV0087", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1910"); }}); //코크스 및 연탄 제조업
			put("CV0088", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1921"); }}); //원유 정제처리업
			put("CV0089", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "1922"); }}); //석유 정제물 재처리업
			put("CV0090", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2011"); }}); //기초 유기화학 물질 제조업
			put("CV0091", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2012"); }}); //기초 무기화학 물질 제조업
			put("CV0092", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2013"); }}); //무기 안료, 염료, 유연제 및 기타 착색제 제조업
			put("CV0093", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2020"); }}); //합성고무 및 플라스틱 물질 제조업
			put("CV0094", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2031"); }}); //비료 및 질소 화합물 제조업
			put("CV0095", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2032"); }}); //살균ㆍ살충제 및 농약 제조업
			put("CV0096", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2041"); }}); //잉크, 페인트, 코팅제 및 유사제품 제조업
			put("CV0097", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2042"); }}); //세제, 화장품 및 광택제 제조업
			put("CV0098", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2049"); }}); //그 외 기타 화학제품 제조업
			put("CV0099", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2050"); }}); //화학섬유 제조업
			put("CV0100", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2110"); }}); //기초 의약 물질 및 생물학적 제제 제조업
			put("CV0101", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2121"); }}); //완제 의약품 제조업
			put("CV0102", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2122"); }}); //한의약품 제조업
			put("CV0103", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2123"); }}); //동물용 의약품 제조업
			put("CV0104", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2130"); }}); //의료용품 및 기타 의약 관련제품 제조업
			put("CV0105", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2211"); }}); //고무 타이어 및 튜브 생산업
			put("CV0106", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2219"); }}); //기타 고무제품 제조업
			put("CV0107", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2221"); }}); //1차 플라스틱제품 제조업
			put("CV0108", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2222"); }}); //건축용 플라스틱제품 제조업
			put("CV0109", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2223"); }}); //포장용 플라스틱제품 제조업
			put("CV0110", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2224"); }}); //기계장비 조립용 플라스틱제품 제조업
			put("CV0111", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2225"); }}); //플라스틱 발포 성형제품 제조업
			put("CV0112", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2229"); }}); //기타 플라스틱 제품 제조업
			put("CV0113", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2311"); }}); //판유리 및 판유리 가공품 제조업
			put("CV0114", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2312"); }}); //산업용 유리 제조업
			put("CV0115", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2319"); }}); //기타 유리제품 제조업
			put("CV0116", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2321"); }}); //내화 요업제품 제조업
			put("CV0117", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2322"); }}); //비내화 일반 도자기 제조업
			put("CV0118", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2323"); }}); //건축용 비내화 요업제품 제조업
			put("CV0119", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2331"); }}); //시멘트, 석회 및 플라스터 제조업
			put("CV0120", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2332"); }}); //콘크리트, 레미콘 및 기타 시멘트, 플라스터 제품 제조업
			put("CV0121", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2391"); }}); //석제품 제조업
			put("CV0122", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2399"); }}); //그 외 기타 비금속 광물제품 제조업
			put("CV0123", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2411"); }}); //제철, 제강 및 합금철 제조업
			put("CV0124", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2412"); }}); //철강 압연, 압출 및 연신제품 제조업
			put("CV0125", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2413"); }}); //철강관 제조업
			put("CV0126", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2419"); }}); //기타 1차 철강 제조업
			put("CV0127", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2421"); }}); //비철금속 제련, 정련 및 합금 제조업
			put("CV0128", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2422"); }}); //비철금속 압연, 압출 및 연신제품 제조업
			put("CV0129", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2429"); }}); //기타 1차 비철금속 제조업
			put("CV0130", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2431"); }}); //철강 주조업
			put("CV0131", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2432"); }}); //비철금속 주조업
			put("CV0132", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2511"); }}); //구조용 금속제품 제조업
			put("CV0133", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2512"); }}); //산업용 난방 보일러, 금속탱크 및 유사 용기 제조업
			put("CV0134", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2513"); }}); //핵반응기 및 증기보일러 제조업
			put("CV0135", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2520"); }}); //무기 및 총포탄 제조업
			put("CV0136", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2591"); }}); //금속 단조, 압형 및 분말 야금제품 제조업
			put("CV0137", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2592"); }}); //금속 열처리, 도금 및 기타 금속 가공업
			put("CV0138", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2593"); }}); //날붙이, 수공구 및 일반 철물 제조업
			put("CV0139", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2594"); }}); //금속 파스너, 스프링 및 금속선 가공제품 제조업
			put("CV0140", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2599"); }}); //그 외 기타 금속 가공제품 제조업
			put("CV0141", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2611"); }}); //전자집적회로 제조업
			put("CV0142", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2612"); }}); //다이오드, 트랜지스터 및 유사 반도체 소자 제조업
			put("CV0143", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2621"); }}); //표시장치 제조업
			put("CV0144", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2622"); }}); //인쇄회로기판 및 전자부품 실장기판 제조업
			put("CV0145", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2629"); }}); //기타 전자 부품 제조업
			put("CV0146", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2631"); }}); //컴퓨터 제조업
			put("CV0147", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2632"); }}); //기억 장치 및 주변 기기 제조업
			put("CV0148", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2641"); }}); //유선 통신장비 제조업
			put("CV0149", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2642"); }}); //방송 및 무선 통신장비 제조업
			put("CV0150", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2651"); }}); //텔레비전, 비디오 및 기타 영상 기기 제조업
			put("CV0151", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2652"); }}); //오디오, 스피커 및 기타 음향 기기 제조업
			put("CV0152", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2660"); }}); //마그네틱 및 광학 매체 제조업
			put("CV0153", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2711"); }}); //방사선 장치 및 전기식 진단 기기 제조업
			put("CV0154", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2719"); }}); //기타 의료용 기기 제조업
			put("CV0155", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2721"); }}); //측정, 시험, 항해, 제어 및 기타 정밀 기기 제조업
			put("CV0156", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2730"); }}); //사진장비 및 광학기기 제조업
			put("CV0157", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2740"); }}); //시계 및 시계 부품 제조업
			put("CV0158", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2811"); }}); //전동기, 발전기 및 전기 변환장치 제조업
			put("CV0159", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2812"); }}); //전기 공급 및 제어장치 제조업
			put("CV0160", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2820"); }}); //일차전지 및 축전지 제조업
			put("CV0161", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2830"); }}); //절연선 및 케이블 제조업
			put("CV0162", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2841"); }}); //전구 및 램프 제조업
			put("CV0163", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2842"); }}); //조명장치 제조업
			put("CV0164", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2851"); }}); //가정용 전기 기기 제조업
			put("CV0165", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2852"); }}); //가정용 비전기식 조리 및 난방 기구 제조업
			put("CV0166", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2890"); }}); //기타 전기장비 제조업
			put("CV0167", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2911"); }}); //내연기관 및 터빈 제조업; 항공기용 및 차량용 제외
			put("CV0168", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2912"); }}); //유압 기기 제조업
			put("CV0169", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2913"); }}); //펌프 및 압축기 제조업; 탭, 밸브 및 유사 장치 제조 포함
			put("CV0170", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2914"); }}); //베어링, 기어 및 동력 전달장치 제조업
			put("CV0171", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2915"); }}); //산업용 오븐, 노 및 노용 버너 제조업
			put("CV0172", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2916"); }}); //산업용 트럭, 승강기 및 물품 취급장비 제조업
			put("CV0173", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2917"); }}); //냉각, 공기 조화, 여과, 증류 및 가스 발생기 제조업
			put("CV0174", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2918"); }}); //사무용 기계 및 장비 제조업
			put("CV0175", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2919"); }}); //기타 일반 목적용 기계 제조업
			put("CV0176", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2921"); }}); //농업 및 임업용 기계 제조업
			put("CV0177", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2922"); }}); //가공 공작기계 제조업
			put("CV0178", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2923"); }}); //금속 주조 및 기타 야금용 기계 제조업
			put("CV0179", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2924"); }}); //건설 및 광업용 기계장비 제조업
			put("CV0180", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2925"); }}); //음ㆍ식료품 및 담배 가공기계 제조업
			put("CV0181", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2926"); }}); //섬유, 의복 및 가죽 가공기계 제조업
			put("CV0182", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2927"); }}); //반도체 및 디스플레이 제조용 기계 제조업
			put("CV0183", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2928"); }}); //산업용 로봇 제조업
			put("CV0184", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "2929"); }}); //기타 특수 목적용 기계 제조업
			put("CV0185", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3011"); }}); //자동차용 엔진 제조업
			put("CV0186", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3012"); }}); //자동차 제조업
			put("CV0187", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3020"); }}); //자동차 차체 및 트레일러 제조업
			put("CV0188", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3031"); }}); //자동차 엔진용 신품 부품 제조업
			put("CV0189", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3032"); }}); //자동차 차체용 신품 부품 제조업
			put("CV0190", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3033"); }}); //자동차용 신품 동력 전달장치 및 전기장치 제조업
			put("CV0191", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3039"); }}); //자동차용 기타 신품 부품 제조업
			put("CV0192", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3040"); }}); //자동차 재제조 부품 제조업
			put("CV0193", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3111"); }}); //선박 및 수상 부유 구조물 건조업
			put("CV0194", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3112"); }}); //오락 및 스포츠용 보트 건조업
			put("CV0195", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3120"); }}); //철도장비 제조업
			put("CV0196", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3131"); }}); //항공기, 우주선 및 보조장치 제조업
			put("CV0197", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3132"); }}); //항공기용 엔진 및 부품 제조업
			put("CV0198", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3191"); }}); //전투용 차량 제조업
			put("CV0199", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3192"); }}); //모터사이클 제조업
			put("CV0200", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3199"); }}); //그 외 기타 분류 안된 운송장비 제조업
			put("CV0201", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3201"); }}); //침대 및 내장 가구 제조업
			put("CV0202", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3202"); }}); //목재 가구 제조업
			put("CV0203", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3209"); }}); //기타 가구 제조업
			put("CV0204", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3311"); }}); //귀금속 및 관련제품 제조업
			put("CV0205", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3312"); }}); //모조 귀금속 및 모조 장신용품 제조업
			put("CV0206", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3320"); }}); //악기 제조업
			put("CV0207", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3330"); }}); //운동 및 경기용구 제조업
			put("CV0208", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3340"); }}); //인형, 장난감 및 오락용품 제조업
			put("CV0209", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3391"); }}); //간판 및 광고물 제조업
			put("CV0210", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3392"); }}); //사무 및 회화용품 제조업
			put("CV0211", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3393"); }}); //가발, 장식용품 및 전시용 모형 제조업
			put("CV0212", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3399"); }}); //그 외 기타 분류 안된 제품 제조업
			put("CV0213", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3401"); }}); //일반 기계류 수리업
			put("CV0214", new HashMap() {{ put("ksic_1_cd", "C"); put("ksic_4_cd", "3402"); }}); //전기ㆍ전자 및 정밀 기기 수리업
			put("CV0215", new HashMap() {{ put("ksic_1_cd", "D"); put("ksic_4_cd", "3511"); }}); //발전업
			put("CV0216", new HashMap() {{ put("ksic_1_cd", "D"); put("ksic_4_cd", "3512"); }}); //송전 및 배전업
			put("CV0217", new HashMap() {{ put("ksic_1_cd", "D"); put("ksic_4_cd", "3513"); }}); //전기 판매업
			put("CV0218", new HashMap() {{ put("ksic_1_cd", "D"); put("ksic_4_cd", "3520"); }}); //연료용 가스 제조 및 배관공급업
			put("CV0219", new HashMap() {{ put("ksic_1_cd", "D"); put("ksic_4_cd", "3530"); }}); //증기, 냉ㆍ온수 및 공기 조절 공급업
			put("CV0221", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3601"); }}); //생활용수 공급업
			put("CV0222", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3602"); }}); //산업용수 공급업
			put("CV0226", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3701"); }}); //하수 및 폐수 처리업
			put("CV0227", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3702"); }}); //분뇨 처리업
			put("CV0228", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3811"); }}); //지정 외 폐기물 수집, 운반업
			put("CV0229", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3812"); }}); //지정 폐기물 수집, 운반업
			put("CV0230", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3813"); }}); //건설 폐기물 수집, 운반업
			put("CV0231", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3821"); }}); //지정 외 폐기물 처리업
			put("CV0232", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3822"); }}); //지정 폐기물 처리업
			put("CV0233", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3823"); }}); //건설 폐기물 처리업
			put("CV0234", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3824"); }}); //방사성 폐기물 수집, 운반 및 처리업
			put("CV0235", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3831"); }}); //금속류 해체, 선별 및 원료 재생업
			put("CV0236", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3832"); }}); //비금속류 해체, 선별 및 원료 재생업
			put("CV0237", new HashMap() {{ put("ksic_1_cd", "E"); put("ksic_4_cd", "3900"); }}); //환경 정화 및 복원업
			put("CV0238", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4111"); }}); //주거용 건물 건설업
			put("CV0239", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4112"); }}); //비주거용 건물 건설업
			put("CV0240", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4121"); }}); //지반조성 건설업
			put("CV0241", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4122"); }}); //토목 시설물 건설업
			put("CV0242", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4211"); }}); //건물 및 구축물 해체 공사업
			put("CV0243", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4212"); }}); //기반조성 관련 전문공사업
			put("CV0244", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4213"); }}); //시설물 축조 관련 전문공사업
			put("CV0245", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4220"); }}); //건물설비 설치 공사업
			put("CV0246", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4231"); }}); //전기 공사업
			put("CV0247", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4232"); }}); //통신 공사업
			put("CV0248", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4241"); }}); //도장, 도배 및 내장 공사업
			put("CV0249", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4242"); }}); //유리 및 창호 공사업
			put("CV0250", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4249"); }}); //기타 건축 마무리 공사업
			put("CV0251", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4250"); }}); //시설물 유지관리 공사업
			put("CV0252", new HashMap() {{ put("ksic_1_cd", "F"); put("ksic_4_cd", "4260"); }}); //건설장비 운영업
			put("CV0253", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4511"); }}); //자동차 신품 판매업
			put("CV0254", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4512"); }}); //중고 자동차 판매업
			put("CV0255", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4521"); }}); //자동차 신품 부품 및 내장품 판매업
			put("CV0256", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4522"); }}); //자동차 중고 부품 및 내장품 판매업
			put("CV0257", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4530"); }}); //모터사이클 및 부품 판매업
			put("CV0258", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4610"); }}); //상품 중개업
			put("CV0259", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4620"); }}); //산업용 농ㆍ축산물 및 동ㆍ식물 도매업
			put("CV0260", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4631"); }}); //신선 식품 및 단순 가공 식품 도매업
			put("CV0261", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4632"); }}); //가공식품 도매업
			put("CV0262", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4633"); }}); //음료 및 담배 도매업
			put("CV0263", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4641"); }}); //생활용 섬유제품, 의복, 의복 액세서리 및 모피제품 도매업
			put("CV0264", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4642"); }}); //신발 도매업
			put("CV0265", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4643"); }}); //생활용 가구, 조명기구 및 비전기식 생활용기기 도매업
			put("CV0266", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4644"); }}); //의약품, 의료용품 및 화장품 도매업
			put("CV0267", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4645"); }}); //생활용 포장ㆍ위생용품, 문구용품 및 출판 인쇄물 도매업
			put("CV0268", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4646"); }}); //음반 및 비디오물, 악기, 오락 및 경기용품 도매업
			put("CV0269", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4649"); }}); //가방, 시계, 안경 및 기타 생활용품 도매업
			put("CV0270", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4651"); }}); //컴퓨터 및 주변장치, 소프트웨어 도매업
			put("CV0271", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4652"); }}); //가전제품, 통신장비 및 부품 도매업
			put("CV0272", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4653"); }}); //산업용 기계 및 장비 도매업
			put("CV0273", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4659"); }}); //기타 기계 및 장비 도매업
			put("CV0274", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4661"); }}); //일반 건축자재 도매업
			put("CV0275", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4662"); }}); //냉ㆍ난방장치 및 철물, 수공구 도매업
			put("CV0276", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4669"); }}); //기타 건축자재 도매업
			put("CV0277", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4671"); }}); //연료, 연료용 광물 및 관련제품 도매업
			put("CV0278", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4672"); }}); //1차 금속제품 및 금속광물 도매업
			put("CV0279", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4673"); }}); //화학 물질 및 화학제품 도매업
			put("CV0280", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4674"); }}); //방직용 섬유, 실 및 직물 도매업
			put("CV0281", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4675"); }}); //종이 원지, 판지, 종이상자 도매업
			put("CV0282", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4679"); }}); //재생용 재료 및 기타 상품 전문 도매업
			put("CV0283", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4680"); }}); //상품 종합 도매업
			put("CV0284", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4711"); }}); //대형 종합 소매업
			put("CV0285", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4712"); }}); //음ㆍ식료품 위주 종합 소매업
			put("CV0286", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4713"); }}); //면세점
			put("CV0287", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4719"); }}); //그 외 기타 종합 소매업
			put("CV0288", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4721"); }}); //식료품 소매업
			put("CV0289", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4722"); }}); //음료 및 담배 소매업
			put("CV0290", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4731"); }}); //컴퓨터 및 주변장치, 소프트웨어 및 통신기기 소매업
			put("CV0291", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4732"); }}); //가전제품 소매업
			put("CV0292", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4741"); }}); //의복 소매업
			put("CV0293", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4742"); }}); //섬유, 직물 및 의복 액세서리 소매업
			put("CV0294", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4743"); }}); //신발 소매업
			put("CV0295", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4744"); }}); //가방 및 기타 가죽제품 소매업
			put("CV0296", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4751"); }}); //철물, 공구, 창호 및 건설자재 소매업
			put("CV0297", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4752"); }}); //가구 소매업
			put("CV0298", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4759"); }}); //그 외 기타 가정용품 소매업
			put("CV0299", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4761"); }}); //서적 및 문구용품 소매업
			put("CV0300", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4762"); }}); //음반 및 비디오물 소매업
			put("CV0301", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4763"); }}); //운동용품 및 자전거 소매업
			put("CV0302", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4764"); }}); //게임용구, 인형 및 장난감 소매업
			put("CV0303", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4771"); }}); //운송장비용 연료 소매업
			put("CV0304", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4772"); }}); //가정용 연료 소매업
			put("CV0305", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4781"); }}); //의약품, 의료용 기구, 화장품 및 방향제 소매업
			put("CV0306", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4782"); }}); //사무용 기기, 안경, 사진장비 및 정밀기기 소매업
			put("CV0307", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4783"); }}); //시계 및 귀금속 소매업
			put("CV0308", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4784"); }}); //예술품, 기념품 및 장식용품 소매업
			put("CV0309", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4785"); }}); //그 외 기타 상품 전문 소매업
			put("CV0310", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4786"); }}); //중고 상품 소매업
			put("CV0311", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4791"); }}); //통신 판매업
			put("CV0312", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4792"); }}); //노점 및 유사 이동 소매업
			put("CV0313", new HashMap() {{ put("ksic_1_cd", "G"); put("ksic_4_cd", "4799"); }}); //기타 무점포 소매업
			put("CV0314", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "4910"); }}); //철도 운송업
			put("CV0315", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "4921"); }}); //도시 정기 육상 여객 운송업
			put("CV0316", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "4922"); }}); //시외버스 운송업
			put("CV0317", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "4923"); }}); //부정기 육상 여객 운송업
			put("CV0318", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "4930"); }}); //도로 화물 운송업
			put("CV0319", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "4940"); }}); //소화물 전문 운송업
			put("CV0320", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "4950"); }}); //파이프라인 운송업
			put("CV0321", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5011"); }}); //외항 운송업
			put("CV0322", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5012"); }}); //내항 운송업
			put("CV0323", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5013"); }}); //기타 해상 운송업
			put("CV0324", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5020"); }}); //내륙 수상 및 항만 내 운송업
			put("CV0325", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5110"); }}); //항공 여객 운송업
			put("CV0326", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5120"); }}); //항공 화물 운송업
			put("CV0327", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5210"); }}); //보관 및 창고업
			put("CV0328", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5291"); }}); //육상 운송 지원 서비스업
			put("CV0329", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5292"); }}); //수상 운송 지원 서비스업
			put("CV0330", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5293"); }}); //항공 운송 지원 서비스업
			put("CV0331", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5294"); }}); //화물 취급업
			put("CV0332", new HashMap() {{ put("ksic_1_cd", "H"); put("ksic_4_cd", "5299"); }}); //그 외 기타 운송관련 서비스업
			put("CV0333", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5510"); }}); //일반 및 생활 숙박시설 운영업
			put("CV0334", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5590"); }}); //기타 숙박업
			put("CV0335", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5611"); }}); //한식 음식점업
			put("CV0336", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5612"); }}); //외국식 음식점업
			put("CV0337", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5613"); }}); //기관 구내식당업
			put("CV0338", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5614"); }}); //출장 및 이동 음식점업
			put("CV0339", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5619"); }}); //기타 간이 음식점업
			put("CV0340", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5621"); }}); //주점업
			put("CV0341", new HashMap() {{ put("ksic_1_cd", "I"); put("ksic_4_cd", "5622"); }}); //비알코올 음료점업
			put("CV0342", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5811"); }}); //서적 출판업
			put("CV0343", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5812"); }}); //신문, 잡지 및 정기 간행물 출판업
			put("CV0344", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5819"); }}); //기타 인쇄물 출판업
			put("CV0345", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5821"); }}); //게임 소프트웨어 개발 및 공급업
			put("CV0346", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5822"); }}); //시스템ㆍ응용 소프트웨어 개발 및 공급업
			put("CV0347", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5911"); }}); //영화, 비디오물 및 방송 프로그램 제작업
			put("CV0348", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5912"); }}); //영화, 비디오물 및 방송 프로그램 제작 관련 서비스업
			put("CV0349", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5913"); }}); //영화, 비디오물 및 방송 프로그램 배급업
			put("CV0350", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5914"); }}); //영화 및 비디오물 상영업
			put("CV0351", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "5920"); }}); //오디오물 출판 및 원판 녹음업
			put("CV0352", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6010"); }}); //라디오 방송업
			put("CV0353", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6021"); }}); //지상파 방송업
			put("CV0354", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6022"); }}); //유선, 위성 및 기타 방송업
			put("CV0355", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6110"); }}); //공영 우편업
			put("CV0356", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6121"); }}); //유선 통신업
			put("CV0357", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6122"); }}); //무선 및 위성 통신업
			put("CV0358", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6129"); }}); //기타 전기 통신업
			put("CV0359", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6201"); }}); //컴퓨터 프로그래밍 서비스업
			put("CV0360", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6202"); }}); //컴퓨터 시스템 통합 자문, 구축 및 관리업
			put("CV0361", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6209"); }}); //기타 정보 기술 및 컴퓨터 운영 관련 서비스업
			put("CV0362", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6311"); }}); //자료 처리, 호스팅 및 관련 서비스업
			put("CV0363", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6312"); }}); //포털 및 기타 인터넷 정보 매개 서비스업
			put("CV0364", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6391"); }}); //뉴스 제공업
			put("CV0365", new HashMap() {{ put("ksic_1_cd", "J"); put("ksic_4_cd", "6399"); }}); //그 외 기타 정보 서비스업
			put("CV0366", new HashMap() {{ put("ksic_1_cd", "K"); put("ksic_4_cd", "6411"); }}); //중앙은행
			put("CV0367", new HashMap() {{ put("ksic_1_cd", "K"); put("ksic_4_cd", "6412"); }}); //일반은행
			put("CV0368", new HashMap() {{ put("ksic_1_cd", "K"); put("ksic_4_cd", "6413"); }}); //신용조합 및 저축기관
			put("CV0369", new HashMap() {{ put("ksic_1_cd", "K"); put("ksic_4_cd", "6420"); }}); //신탁업 및 집합 투자업
			put("CV0370", new HashMap() {{ put("ksic_1_cd", "K"); put("ksic_4_cd", "6491"); }}); //여신 금융업
			put("CV0371", new HashMap() {{ put("ksic_1_cd", "K"); put("ksic_4_cd", "6499"); }}); //그 외 기타 금융업
			put("CV0372", new HashMap() {{ put("ksic_1_cd", "L"); put("ksic_4_cd", "6811"); }}); //부동산 임대업
			put("CV0373", new HashMap() {{ put("ksic_1_cd", "L"); put("ksic_4_cd", "6812"); }}); //부동산 개발 및 공급업
			put("CV0374", new HashMap() {{ put("ksic_1_cd", "L"); put("ksic_4_cd", "6821"); }}); //부동산 관리업
			put("CV0375", new HashMap() {{ put("ksic_1_cd", "L"); put("ksic_4_cd", "6822"); }}); //부동산 중개, 자문 및 감정 평가업
			put("CV0376", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7011"); }}); //자연과학 연구개발업
			put("CV0377", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7012"); }}); //공학 연구개발업
			put("CV0378", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7013"); }}); //자연과학 및 공학 융합 연구개발업
			put("CV0379", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7020"); }}); //인문 및 사회과학 연구개발업
			put("CV0380", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7110"); }}); //법무관련 서비스업
			put("CV0381", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7120"); }}); //회계 및 세무관련 서비스업
			put("CV0382", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7131"); }}); //광고 대행업
			put("CV0383", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7139"); }}); //기타 광고업
			put("CV0384", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7140"); }}); //시장 조사 및 여론 조사업
			put("CV0385", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7151"); }}); //회사 본부
			put("CV0386", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7153"); }}); //경영 컨설팅 및 공공 관계 서비스업
			put("CV0387", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7160"); }}); //기타 전문 서비스업
			put("CV0388", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7211"); }}); //건축 및 조경 설계 서비스업
			put("CV0389", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7212"); }}); //엔지니어링 서비스업
			put("CV0390", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7291"); }}); //기술 시험, 검사 및 분석업
			put("CV0391", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7292"); }}); //측량, 지질 조사 및 지도 제작업
			put("CV0392", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7310"); }}); //수의업
			put("CV0393", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7320"); }}); //전문 디자인업
			put("CV0394", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7330"); }}); //사진 촬영 및 처리업
			put("CV0395", new HashMap() {{ put("ksic_1_cd", "M"); put("ksic_4_cd", "7390"); }}); //그 외 기타 전문, 과학 및 기술 서비스업
			put("CV0396", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7410"); }}); //사업시설 유지ㆍ관리 서비스업
			put("CV0397", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7421"); }}); //건물 및 산업설비 청소업
			put("CV0398", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7422"); }}); //소독, 구충 및 방제 서비스업
			put("CV0399", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7430"); }}); //조경관리 및 유지 서비스업
			put("CV0400", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7511"); }}); //고용 알선업
			put("CV0401", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7512"); }}); //인력 공급업
			put("CV0402", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7521"); }}); //여행사업
			put("CV0403", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7529"); }}); //기타 여행 보조 및 예약 서비스업
			put("CV0404", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7531"); }}); //경비 및 경호 서비스업
			put("CV0405", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7532"); }}); //보안 시스템 서비스업
			put("CV0406", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7533"); }}); //탐정 및 조사 서비스업
			put("CV0407", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7591"); }}); //사무 지원 서비스업
			put("CV0408", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7599"); }}); //그 외 기타 사업 지원 서비스업
			put("CV0409", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7611"); }}); //자동차 임대업
			put("CV0410", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7619"); }}); //기타 운송장비 임대업
			put("CV0411", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7621"); }}); //스포츠 및 레크리에이션 용품 임대업
			put("CV0412", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7622"); }}); //음반 및 비디오물 임대업
			put("CV0413", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7629"); }}); //기타 개인 및 가정용품 임대업
			put("CV0414", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7631"); }}); //건설 및 토목공사용 기계ㆍ장비 임대업
			put("CV0415", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7632"); }}); //컴퓨터 및 사무용 기계ㆍ장비 임대업
			put("CV0416", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7639"); }}); //기타 산업용 기계 및 장비 임대업
			put("CV0417", new HashMap() {{ put("ksic_1_cd", "N"); put("ksic_4_cd", "7640"); }}); //무형 재산권 임대업
			put("CV0418", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8411"); }}); //일반 공공 행정
			put("CV0419", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8412"); }}); //정부기관 일반 보조 행정
			put("CV0420", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8421"); }}); //사회서비스 관리 행정
			put("CV0421", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8422"); }}); //노동 및 산업 진흥 행정
			put("CV0422", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8431"); }}); //외무 행정
			put("CV0423", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8432"); }}); //국방 행정
			put("CV0424", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8440"); }}); //사법 및 공공 질서 행정
			put("CV0425", new HashMap() {{ put("ksic_1_cd", "O"); put("ksic_4_cd", "8450"); }}); //사회보장 행정
			put("CV0426", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8511"); }}); //유아 교육기관
			put("CV0427", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8512"); }}); //초등학교
			put("CV0428", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8521"); }}); //일반 중등 교육기관
			put("CV0429", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8522"); }}); //특성화 고등학교
			put("CV0430", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8530"); }}); //고등 교육기관
			put("CV0431", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8541"); }}); //특수학교
			put("CV0432", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8542"); }}); //외국인학교
			put("CV0433", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8543"); }}); //대안학교
			put("CV0434", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8550"); }}); //일반 교습학원
			put("CV0435", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8561"); }}); //스포츠 및 레크리에이션 교육기관
			put("CV0436", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8562"); }}); //예술학원
			put("CV0437", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8563"); }}); //외국어학원 및 기타 교습학원
			put("CV0438", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8564"); }}); //사회교육시설
			put("CV0439", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8565"); }}); //직원 훈련기관
			put("CV0440", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8566"); }}); //기술 및 직업 훈련학원
			put("CV0441", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8569"); }}); //그 외 기타 교육기관
			put("CV0442", new HashMap() {{ put("ksic_1_cd", "P"); put("ksic_4_cd", "8570"); }}); //교육 지원 서비스업
			put("CV0443", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8610"); }}); //병원
			put("CV0444", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8620"); }}); //의원
			put("CV0445", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8630"); }}); //공중 보건 의료업
			put("CV0446", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8690"); }}); //기타 보건업
			put("CV0447", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8711"); }}); //노인 거주 복지시설 운영업
			put("CV0448", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8712"); }}); //심신 장애인 거주 복지시설 운영업
			put("CV0449", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8713"); }}); //기타 거주 복지시설 운영업
			put("CV0450", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8721"); }}); //보육시설 운영업
			put("CV0451", new HashMap() {{ put("ksic_1_cd", "Q"); put("ksic_4_cd", "8729"); }}); //기타 비거주 복지 서비스업
			put("CV0452", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9011"); }}); //공연시설 운영업
			put("CV0453", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9012"); }}); //공연단체
			put("CV0454", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9013"); }}); //자영 예술가
			put("CV0455", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9019"); }}); //기타 창작 및 예술관련 서비스업
			put("CV0456", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9021"); }}); //도서관, 기록 보존소 및 독서실 운영업
			put("CV0457", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9022"); }}); //박물관 및 사적지 관리 운영업
			put("CV0458", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9023"); }}); //식물원, 동물원 및 자연공원 운영업
			put("CV0459", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9029"); }}); //기타 유사 여가관련 서비스업
			put("CV0460", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9111"); }}); //경기장 운영업
			put("CV0461", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9112"); }}); //골프장 및 스키장 운영업
			put("CV0462", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9113"); }}); //기타 스포츠시설 운영업
			put("CV0463", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9119"); }}); //기타 스포츠 서비스업
			put("CV0464", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9121"); }}); //유원지 및 테마파크 운영업
			put("CV0465", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9122"); }}); //오락장 운영업
			put("CV0466", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9123"); }}); //수상오락 서비스업
			put("CV0467", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9124"); }}); //사행시설 관리 및 운영업
			put("CV0468", new HashMap() {{ put("ksic_1_cd", "R"); put("ksic_4_cd", "9129"); }}); //그 외 기타 오락관련 서비스업
			put("CV0469", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9411"); }}); //산업 단체
			put("CV0470", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9412"); }}); //전문가 단체
			put("CV0471", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9420"); }}); //노동조합
			put("CV0472", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9491"); }}); //종교 단체
			put("CV0473", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9492"); }}); //정치 단체
			put("CV0474", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9493"); }}); //시민운동 단체
			put("CV0475", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9499"); }}); //그 외 기타 협회 및 단체
			put("CV0476", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9511"); }}); //컴퓨터 및 주변 기기 수리업
			put("CV0477", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9512"); }}); //통신장비 수리업
			put("CV0478", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9521"); }}); //자동차 수리 및 세차업
			put("CV0479", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9522"); }}); //모터사이클 수리업
			put("CV0480", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9531"); }}); //가전제품 수리업
			put("CV0481", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9539"); }}); //기타 개인 및 가정용품 수리업
			put("CV0482", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9611"); }}); //이용 및 미용업
			put("CV0483", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9612"); }}); //욕탕, 마사지 및 기타 신체 관리 서비스업
			put("CV0484", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9691"); }}); //세탁업
			put("CV0485", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9692"); }}); //장례식장 및 관련 서비스업
			put("CV0486", new HashMap() {{ put("ksic_1_cd", "S"); put("ksic_4_cd", "9699"); }}); //그 외 기타 분류 안된 개인 서비스업
			put("CV0487", new HashMap() {{ put("ksic_1_cd", "T"); put("ksic_4_cd", "9700"); }}); //가구 내 고용활동
			put("CV0488", new HashMap() {{ put("ksic_1_cd", "T"); put("ksic_4_cd", "9810"); }}); //자가 소비를 위한 가사 생산 활동
			put("CV0489", new HashMap() {{ put("ksic_1_cd", "T"); put("ksic_4_cd", "9820"); }}); //자가 소비를 위한 가사 서비스 활동
			put("CV0490", new HashMap() {{ put("ksic_1_cd", "U"); put("ksic_4_cd", "9900"); }}); //국제 및 외국기관
			
			//대화형 통계지도 > 전국 사업체조사: 테마업종
			put("CV0491", new HashMap() {{ put("theme_cd", "1001"); }}); //인테리어
			put("CV0492", new HashMap() {{ put("theme_cd", "1002"); }}); //목욕탕
			put("CV0493", new HashMap() {{ put("theme_cd", "1003"); }}); //교습학원
			put("CV0494", new HashMap() {{ put("theme_cd", "1004"); }}); //어학원
			put("CV0495", new HashMap() {{ put("theme_cd", "1005"); }}); //예체능학원
			put("CV0496", new HashMap() {{ put("theme_cd", "1006"); }}); //부동산중개업
			put("CV0497", new HashMap() {{ put("theme_cd", "1007"); }}); //이발소
			put("CV0498", new HashMap() {{ put("theme_cd", "1008"); }}); //미용실
			put("CV0499", new HashMap() {{ put("theme_cd", "1009"); }}); //세탁소
			put("CV0500", new HashMap() {{ put("theme_cd", "1010"); }}); //PC방
			put("CV0501", new HashMap() {{ put("theme_cd", "1011"); }}); //노래방
			put("CV0502", new HashMap() {{ put("theme_cd", "2001"); }}); //문구점
			put("CV0503", new HashMap() {{ put("theme_cd", "2002"); }}); //서점
			put("CV0504", new HashMap() {{ put("theme_cd", "2003"); }}); //편의점
			put("CV0505", new HashMap() {{ put("theme_cd", "2004"); }}); //식료품점
			put("CV0506", new HashMap() {{ put("theme_cd", "2005"); }}); //휴대폰점
			put("CV0507", new HashMap() {{ put("theme_cd", "2006"); }}); //의류
			put("CV0508", new HashMap() {{ put("theme_cd", "2007"); }}); //화장품/방향제
			put("CV0509", new HashMap() {{ put("theme_cd", "2008"); }}); //철물점
			put("CV0510", new HashMap() {{ put("theme_cd", "2009"); }}); //주유소
			put("CV0511", new HashMap() {{ put("theme_cd", "2010"); }}); //꽃집
			put("CV0512", new HashMap() {{ put("theme_cd", "2011"); }}); //슈퍼마켓
			put("CV0513", new HashMap() {{ put("theme_cd", "4001"); }}); //호텔
			put("CV0514", new HashMap() {{ put("theme_cd", "4002"); }}); //여관(모텔포함) 및 여인숙
			put("CV0515", new HashMap() {{ put("theme_cd", "5001"); }}); //한식
			put("CV0516", new HashMap() {{ put("theme_cd", "5002"); }}); //중식
			put("CV0517", new HashMap() {{ put("theme_cd", "5003"); }}); //일식
			put("CV0518", new HashMap() {{ put("theme_cd", "5004"); }}); //분식
			put("CV0519", new HashMap() {{ put("theme_cd", "5005"); }}); //서양식
			put("CV0520", new HashMap() {{ put("theme_cd", "5006"); }}); //제과점
			put("CV0521", new HashMap() {{ put("theme_cd", "5007"); }}); //패스트푸드
			put("CV0522", new HashMap() {{ put("theme_cd", "5008"); }}); //치킨
			put("CV0523", new HashMap() {{ put("theme_cd", "5009"); }}); //호프 및 간이주점
			put("CV0524", new HashMap() {{ put("theme_cd", "5010"); }}); //카페
			put("CV0525", new HashMap() {{ put("theme_cd", "5011"); }}); //기타 외국식
			put("CV0526", new HashMap() {{ put("theme_cd", "3001"); }}); //지하철역
			put("CV0527", new HashMap() {{ put("theme_cd", "3002"); }}); //터미널
			put("CV0528", new HashMap() {{ put("theme_cd", "6001"); }}); //우체국
			put("CV0529", new HashMap() {{ put("theme_cd", "6002"); }}); //행정기관
			put("CV0530", new HashMap() {{ put("theme_cd", "6003"); }}); //경찰/지구대
			put("CV0531", new HashMap() {{ put("theme_cd", "6004"); }}); //소방서
			put("CV0532", new HashMap() {{ put("theme_cd", "7001"); }}); //초등학교
			put("CV0533", new HashMap() {{ put("theme_cd", "7002"); }}); //중학교
			put("CV0534", new HashMap() {{ put("theme_cd", "7003"); }}); //고등학교
			put("CV0535", new HashMap() {{ put("theme_cd", "7004"); }}); //전문대학
			put("CV0536", new HashMap() {{ put("theme_cd", "7005"); }}); //대학교
			put("CV0537", new HashMap() {{ put("theme_cd", "7006"); }}); //대학원
			put("CV0538", new HashMap() {{ put("theme_cd", "7007"); }}); //어린이보육업
			put("CV0546", new HashMap() {{ put("theme_cd", "8008"); }}); //문화/체육
			put("CV0547", new HashMap() {{ put("theme_cd", "9001"); }}); //백화점/중대형마트
			put("CV0548", new HashMap() {{ put("theme_cd", "9002"); }}); //은행
			put("CV0549", new HashMap() {{ put("theme_cd", "9003"); }}); //병원
			put("CV0550", new HashMap() {{ put("theme_cd", "9004"); }}); //극장/영화관
			put("CV0551", new HashMap() {{ put("theme_cd", "9005"); }}); //도서관/박물관
			put("CV0552", new HashMap() {{ put("theme_cd", "4003"); }}); //펜션

			/*2020.10.20 심창무 업종통계지도: 생활업종통계지도 > 시군구별 업종현황 신규 테마코드 추가 START*/
			put("CV0553", new HashMap() {{ put("theme_cd", "C001"); }}); //가구
			put("CV0554", new HashMap() {{ put("theme_cd", "C002"); }}); //가전제품
			put("CV0555", new HashMap() {{ put("theme_cd", "C003"); }}); //통신판매
			put("CV0556", new HashMap() {{ put("theme_cd", "C004"); }}); //신발
			put("CV0557", new HashMap() {{ put("theme_cd", "D001"); }}); //생활용품임대
			put("CV0558", new HashMap() {{ put("theme_cd", "D002"); }}); //독서실
			put("CV0559", new HashMap() {{ put("theme_cd", "D003"); }}); //생활용품수리
			put("CV0560", new HashMap() {{ put("theme_cd", "D004"); }}); //카센터
			put("CV0561", new HashMap() {{ put("theme_cd", "D005"); }}); //피부/미용
			put("CV0562", new HashMap() {{ put("theme_cd", "D006"); }}); //마사지
			put("CV0563", new HashMap() {{ put("theme_cd", "D007"); }}); //택배/배달
			put("CV0564", new HashMap() {{ put("theme_cd", "F001"); }}); //생활체육시설
			put("CV0565", new HashMap() {{ put("theme_cd", "F002"); }}); //여행사
			put("CV0566", new HashMap() {{ put("theme_cd", "G001"); }}); //민박
			put("CV0567", new HashMap() {{ put("theme_cd", "I001"); }}); //기술직업훈련
			put("CV0568", new HashMap() {{ put("theme_cd", "J001"); }}); //동물병원
			put("CV0569", new HashMap() {{ put("theme_cd", "J002"); }}); //약국
			put("CV0570", new HashMap() {{ put("theme_cd", "J003"); }}); //한방병원
			/*2020.10.20 심창무 업종통계지도: 생활업종통계지도 > 시군구별 업종현황 신규 테마코드 추가 END*/

			//대화형 통계지도 > e-지방지표(statsMeMap.js 에서 스크립트 매핑)
			
			//대화형 통계지도 > 인구주택총조사 > 인구조건
			put("PM0010", new HashMap() {{ put("age_from", "0"); put("age_to", "12"); }}); //영유아/어린이
			put("PM0011", new HashMap() {{ put("age_from", "0"); put("age_to", "12"); put("gender", "2"); }}); //영유아/어린이(여자)
			put("PM0012", new HashMap() {{ put("age_from", "0"); put("age_to", "12"); put("gender", "1"); }}); //영유아/어린이(남자)
			put("PM0013", new HashMap() {{ put("age_from", "13"); put("age_to", "18"); }}); //청소년
			put("PM0014", new HashMap() {{ put("age_from", "13"); put("age_to", "18"); put("gender", "2"); }}); //청소년(여자)
			put("PM0015", new HashMap() {{ put("age_from", "13"); put("age_to", "18"); put("gender", "1"); }}); //청소년(남자)
			/** 2020.08.19[한광희] My통계로 청년/장년 기준나이 및 명칭 변경으로 인한 수정 START */
			put("PM0016", new HashMap() {{ put("age_from", "19"); put("age_to", "34"); }}); //청년
			put("PM0017", new HashMap() {{ put("age_from", "19"); put("age_to", "34"); put("gender", "2"); }}); //청년(여자)
			put("PM0018", new HashMap() {{ put("age_from", "19"); put("age_to", "34"); put("gender", "1"); }}); //청년(남자)
			put("PM0019", new HashMap() {{ put("age_from", "35"); put("age_to", "64"); }}); //중장년
			put("PM0020", new HashMap() {{ put("age_from", "35"); put("age_to", "64"); put("gender", "2"); }}); //중장년(여자)
			put("PM0021", new HashMap() {{ put("age_from", "35"); put("age_to", "64"); put("gender", "1"); }}); //중장년(남자)
			/** 2020.08.19[한광희] My통계로 청년/장년 기준나이 및 명칭 변경으로 인한 수정 END */
			put("PM0022", new HashMap() {{ put("age_from", "65"); }}); //노년
			put("PM0023", new HashMap() {{ put("age_from", "65"); put("gender", "2"); }}); //노년(여자)
			put("PM0024", new HashMap() {{ put("age_from", "65"); put("gender", "1"); }}); //노년(남자)
			
			//대화형 통계지도 > 인구주택총조사 > 가구조건
			put("PM0025", new HashMap() {{ put("", ""); }}); //1인가구수
			
			//대화형 통계지도 > 인구주택총조사 > 주택조건
			put("PM0026", new HashMap() {{ put("", ""); }}); //총주택(호)
			
			/** 2020.05.14[한광희] My통계로 인구주택총조사 1인가구 지표 추가 START */
			//대화형 통계지도 > 인구주택총조사 > 결합조건
			put("PM0027", new HashMap() {{ put("gender", "1"); }}); //1인가구(남성) 인구 현황
			put("PM0028", new HashMap() {{ put("gender", "2"); }}); //1인가구(여성) 인구 현황
			/** 2020.05.14[한광희] My통계로 인구주택총조사 1인가구 지표 추가 START */
			
			//살고싶은 우리동네 > 주거현황보기
			put("HA0001", new HashMap() {{ put("m_class_idx_id", "HMM0001"); put("b_class_idx_id", "HML0001"); }}); //대기오염도
			put("HA0002", new HashMap() {{ put("m_class_idx_id", "HMM0002"); put("b_class_idx_id", "HML0001"); }}); //생활날씨
			put("HA0003", new HashMap() {{ put("m_class_idx_id", "HMM0003"); put("b_class_idx_id", "HML0001"); }}); //녹지비율
			put("HA0004", new HashMap() {{ put("m_class_idx_id", "HMM0004"); put("b_class_idx_id", "HML0002"); }}); //공동주택비율
			put("HA0005", new HashMap() {{ put("m_class_idx_id", "HMM0005"); put("b_class_idx_id", "HML0002"); }}); //1인당 주거 연면적
			put("HA0006", new HashMap() {{ put("m_class_idx_id", "HMM0006"); put("b_class_idx_id", "HML0002"); }}); //노후주택비율
			put("HA0007", new HashMap() {{ put("m_class_idx_id", "HMM0007"); put("b_class_idx_id", "HML0002"); }}); //자가점유비율
			put("HA0008", new HashMap() {{ put("m_class_idx_id", "HMM0008"); put("b_class_idx_id", "HML0002"); }}); //면적당아파트가격
			put("HA0009", new HashMap() {{ put("m_class_idx_id", "HMM0035"); put("b_class_idx_id", "HML0002"); }}); //공시지가
			put("HA0010", new HashMap() {{ put("m_class_idx_id", "HMM0111"); put("b_class_idx_id", "HML0002"); }}); //단독주택 비율
			put("HA0011", new HashMap() {{ put("m_class_idx_id", "HMM0009"); put("b_class_idx_id", "HML0003"); }}); //청장년인구비율
			put("HA0012", new HashMap() {{ put("m_class_idx_id", "HMM0010"); put("b_class_idx_id", "HML0003"); }}); //혈연가구비율
			put("HA0013", new HashMap() {{ put("m_class_idx_id", "HMM0011"); put("b_class_idx_id", "HML0003"); }}); //사업체종사자비율
			put("HA0014", new HashMap() {{ put("m_class_idx_id", "HMM0012"); put("b_class_idx_id", "HML0003"); }}); //순유입인구비율
			put("HA0015", new HashMap() {{ put("m_class_idx_id", "HMM0013"); put("b_class_idx_id", "HML0004"); }}); //화재안전
			put("HA0016", new HashMap() {{ put("m_class_idx_id", "HMM0014"); put("b_class_idx_id", "HML0004"); }}); //교통사고안전
			put("HA0017", new HashMap() {{ put("m_class_idx_id", "HMM0028"); put("b_class_idx_id", "HML0004"); }}); //범죄안전
			put("HA0018", new HashMap() {{ put("m_class_idx_id", "HMM0029"); put("b_class_idx_id", "HML0004"); }}); //안전사고
			put("HA0019", new HashMap() {{ put("m_class_idx_id", "HMM0031"); put("b_class_idx_id", "HML0004"); }}); //감염병안전
			put("HA0020", new HashMap() {{ put("m_class_idx_id", "HMM0032"); put("b_class_idx_id", "HML0004"); }}); //자연재해안전
			put("HA0021", new HashMap() {{ put("m_class_idx_id", "HMM0015"); put("b_class_idx_id", "HML0005"); }}); //편의시설수
			put("HA0022", new HashMap() {{ put("m_class_idx_id", "HMM0016"); put("b_class_idx_id", "HML0005"); }}); //쇼핑시설수
			put("HA0023", new HashMap() {{ put("m_class_idx_id", "HMM0017"); put("b_class_idx_id", "HML0005"); }}); //외식시설수
			put("HA0024", new HashMap() {{ put("m_class_idx_id", "HMM0018"); put("b_class_idx_id", "HML0005"); }}); //대중교통이용률
			put("HA0025", new HashMap() {{ put("m_class_idx_id", "HMM0033"); put("b_class_idx_id", "HML0005"); }}); //잡화점수
			put("HA0026", new HashMap() {{ put("m_class_idx_id", "HMM0020"); put("b_class_idx_id", "HML0006"); }}); //교원 1인당 학생수
			put("HA0027", new HashMap() {{ put("m_class_idx_id", "HMM0021"); put("b_class_idx_id", "HML0006"); }}); //고등교육기관수
			put("HA0028", new HashMap() {{ put("m_class_idx_id", "HMM0022"); put("b_class_idx_id", "HML0006"); }}); //학원수
			put("HA0029", new HashMap() {{ put("m_class_idx_id", "HMM0023"); put("b_class_idx_id", "HML0007"); }}); //유치원및보육시설
			put("HA0030", new HashMap() {{ put("m_class_idx_id", "HMM0024"); put("b_class_idx_id", "HML0007"); }}); //병의원및약국
			put("HA0031", new HashMap() {{ put("m_class_idx_id", "HMM0025"); put("b_class_idx_id", "HML0007"); }}); //노인복지시설
			put("HA0032", new HashMap() {{ put("m_class_idx_id", "HMM0026"); put("b_class_idx_id", "HML0007"); }}); //사회복지시설
			put("HA0033", new HashMap() {{ put("m_class_idx_id", "HMM0027"); put("b_class_idx_id", "HML0007"); }}); //문화시설수
			put("HA0034", new HashMap() {{ put("m_class_idx_id", "HMM0034"); put("b_class_idx_id", "HML0007"); }}); //체육시설수
			
			//정책통계지도
			put("PS0001", new HashMap() {{ put("idx_id", "yDMKDIKzyn20170803172737331vsqnssqM1z"); }}); //전체인구의 변화
			put("PS0002", new HashMap() {{ put("idx_id", "2sMtuGwJID20170803172737331rtyMEvKyso"); }}); //남성인구의 변화
			put("PS0003", new HashMap() {{ put("idx_id", "xpwJJxztnG20170803172737331HyvJxM3FHs"); }}); //여성인구의 변화
			put("PS0004", new HashMap() {{ put("idx_id", "EwwunnFpJK201708031727373316K8vsErJuJ"); }}); //평균나이의 변화
			put("PS0005", new HashMap() {{ put("idx_id", "onppztzErp20170803172737331z8tyqHzI9w"); }}); //인구밀도의 변화
			put("PS0006", new HashMap() {{ put("idx_id", "MLD6xDDuHs20170803172737332wKuuvtvsq4"); }}); //평균 가구원의 변화
			put("PS0007", new HashMap() {{ put("idx_id", "ysE4vzDMqx20170803172737333GyKIrExLJF"); }}); //총 주택(호)의 변화
			put("PS0008", new HashMap() {{ put("idx_id", "qqnLo3nzJu20170803172737333sF0GorqFtu"); }}); //1인 가구 변화
			put("PS0009", new HashMap() {{ put("idx_id", "r3KxpDLnz520170803172737333Est1pnrzqx"); }}); //아파트 현황 변화
			put("PS0010", new HashMap() {{ put("idx_id", "KsK7HuJ6vL20170803172737333H3osD1tpuE"); }}); //연립 및 다세대 주택 변화
			put("PS0011", new HashMap() {{ put("idx_id", "HoMCJ0uHEz20170803172737334KGyGroEKqo"); }}); //단독주택 변화
			put("PS0012", new HashMap() {{ put("idx_id", "0210176233201710301539320124465875560"); }}); //전체가구의 변화
			put("PS0013", new HashMap() {{ put("idx_id", "GnCDxoqD8q201708031727373316EE5yvyDDD"); }}); //노령화지수 변화
			put("PS0014", new HashMap() {{ put("idx_id", "wE7JnMvoGu20170803172737332pxynvLs2qF"); }}); //노년부양비 변화
			put("PS0015", new HashMap() {{ put("idx_id", "65rvHsrIzu20170803172737332sHJzvzpwJE"); }}); //유아 인구(0~4세) 변화
			put("PS0016", new HashMap() {{ put("idx_id", "uHzorzuwyw20170803172737332v7rFoJoL2I"); }}); //65세 이상 고령자 인구 변화
			put("PS0017", new HashMap() {{ put("idx_id", "MLD6xDDuHs20170808152137332wKuuvtvsq4"); }}); //65세 이상 1인가구 변화
			put("PS0018", new HashMap() {{ put("idx_id", "9221137705201710301546072662443762660"); }}); //어린이집 분포 현황
			put("PS0019", new HashMap() {{ put("idx_id", "2547676290201710301551567684108432782"); }}); //노인요양시설 분포 현황
			put("PS0020", new HashMap() {{ put("idx_id", "2088944725201711211657122621829462177"); }}); //공공자전거수 대비 보관소 분포 현황
			put("PS0021", new HashMap() {{ put("idx_id", "2635651540201711301541034840754001433"); }}); //15세 미만 유소년 인구 변화
			put("PS0022", new HashMap() {{ put("idx_id", "3724842547201711201014253871792207583"); }}); //인구 대비 도서관 평균 도서 보유 현황
			put("PS0023", new HashMap() {{ put("idx_id", "3458556422201710301554388959489997313"); }}); //도서관 운영
			put("PS0024", new HashMap() {{ put("idx_id", "7960926159201711211700328741236696657"); }}); //박물관/미술관 분포 현황
			put("PS0025", new HashMap() {{ put("idx_id", "rsEJy3oJwG20170803172737334I49JoFMEGz"); }}); //종사자 수 분포 변화
			put("PS0026", new HashMap() {{ put("idx_id", "xpwJJxztnG20170808142737332HyvJxM3FHs"); }}); //PC방 변화
			put("PS0027", new HashMap() {{ put("idx_id", "EwwunnFpJK201708081427373326K8vsErJuJ"); }}); //슈퍼마켓 변화
			put("PS0028", new HashMap() {{ put("idx_id", "onppztzErp20170808142737333z8tyqHzI9w"); }}); //제과점 변화
			put("PS0029", new HashMap() {{ put("idx_id", "pyL5xrpKKF20170808152137332Lu5p9E6DKt"); }}); //치킨전문점 변화
			put("PS0030", new HashMap() {{ put("idx_id", "uHzorzuwyw20170808152137332v7rFoJoL2I"); }}); //커피전문점 변화
			put("PS0031", new HashMap() {{ put("idx_id", "8292308888201710301617197294119290010"); }}); //사업체당 평균 인구 현황
			put("PS0032", new HashMap() {{ put("idx_id", "3751353392201712061200288355280432955"); }}); //사업체당 평균 종사자 수
			put("PS0033", new HashMap() {{ put("idx_id", "wu5oMryvM720170803172737331sJnsFLDrpy"); }}); //농가 인구의 변화
			put("PS0034", new HashMap() {{ put("idx_id", "rzzGswqnLv20170803172737332zKLutDGw5E"); }}); //임가 인구의 변화
			put("PS0035", new HashMap() {{ put("idx_id", "q5MFyLCnFt20170803172737332tGMGtq9Kwn"); }}); //내수면 총어가 인구의 변화
			put("PS0036", new HashMap() {{ put("idx_id", "GFLnoGyFF220170803172737332qMvwFn5v7t"); }}); //해수면 총어가 인구의 변화
			put("PS0037", new HashMap() {{ put("idx_id", "ntpJEMwwsx20170803172737333xxvMIJ5rGK"); }}); //농가 변화
			put("PS0038", new HashMap() {{ put("idx_id", "H1LGyrMIEF20170803172737333DxGrxxtEsr"); }}); //임가 변화
			put("PS0039", new HashMap() {{ put("idx_id", "FJMJwwpKvz20170803172737333HtKMuowG7o"); }}); //내수면 총어가 변화
			put("PS0040", new HashMap() {{ put("idx_id", "nvsDwtnIMM20170803172737333tzyypxrpuE"); }}); //해수면 총어가 변화
			put("PS0041", new HashMap() {{ put("idx_id", "rH4wnv36It20170803172737334nvKrIEMnzF"); }}); //총사업체 분포 변화
			put("PS0042", new HashMap() {{ put("idx_id", "DMspq6u4Mv201708031727373349yHup4JG7w"); }}); //도소매업 변화
			put("PS0043", new HashMap() {{ put("idx_id", "yDMKDIKzyn20170808142737331vsqnssqM1z"); }}); //제조업 변화
			put("PS0044", new HashMap() {{ put("idx_id", "4567814844201710301633013080966785401"); }}); //어린이보호구역 분포 현황
			put("PS0045", new HashMap() {{ put("idx_id", "5075653758201711211705104277120963624"); }}); //재해위험지구 분포 현황
			put("PS0046", new HashMap() {{ put("idx_id", "3074823551201711211711119354566751530"); }}); //민방위대피시설 분포 현황
			put("PS0047", new HashMap() {{ put("idx_id", "8547921299201711211707478631593010966"); }}); //도시공원 분포 현황
			put("PS0048", new HashMap() {{ put("idx_id", "4846938690201712181802041978059514311"); }}); //여성 1인가구 거주현황 대비 CCTV 분포 현황
			put("PS0049", new HashMap() {{ put("idx_id", "8599077428201710301634346508152047319"); }}); //무인민원발급기 설치 현황
			
			//통계주제도
			put("TM0001", new HashMap() {{ put("stat_thema_map_id", "FlM5JUWj0T20181120214718029IpoBrl4UVw"); }}); //귀농귀촌귀어
			put("TM0002", new HashMap() {{ put("stat_thema_map_id", "oqrEJzwryv201601211158069778qDoxqxpMF"); }}); //1인 가구 변화
			put("TM0003", new HashMap() {{ put("stat_thema_map_id", "tzvK4xEuFD20160121115806965LnKnzJtJ7F"); }}); //인구 변화
			put("TM0004", new HashMap() {{ put("stat_thema_map_id", "uwGrLn6xJp20160202203129219tIGyEvtDpH"); }}); //인구 이동
			put("TM0006", new HashMap() {{ put("stat_thema_map_id", "szJnFHvnFv20160202203129221JKtxLLtCLz"); }}); //인구 자연증가 현황
			put("TM0007", new HashMap() {{ put("stat_thema_map_id", "MHHHurosMI20160121115806978ytyDxsuMnt"); }}); //65세 이상 1인가구 변화
			put("TM0008", new HashMap() {{ put("stat_thema_map_id", "qwnF6vrGvI20160121115806975tsn9uJMsrp"); }}); //여자인구 대비 남자인구 비율
			put("TM0009", new HashMap() {{ put("stat_thema_map_id", "4wFxoyx2Lz20160121115806976CJFsM4zzDw"); }}); //15세 미만 유소년 인구 변화
			put("TM0010", new HashMap() {{ put("stat_thema_map_id", "z2yE7ztsvr20160121115806976uJD4LLF0yo"); }}); //65세 이상 고령자 인구 변화
			put("TM0011", new HashMap() {{ put("stat_thema_map_id", "oIuoFJMFrK20160121115806979wKuH6LIx9p"); }}); //시군구별 외국인 주민 현황
			put("TM0012", new HashMap() {{ put("stat_thema_map_id", "JLxq6EqHpF20160202203129207nyyrEo4KzD"); }}); //출생 및 사망 현황
			put("TM0013", new HashMap() {{ put("stat_thema_map_id", "L0DoDvoxLz20160202203129221GoLzt8w7KJ"); }}); //혼인 및 이혼율 현황
			put("TM0014", new HashMap() {{ put("stat_thema_map_id", "z7ypKtDtzG20161109104000136xHMyurFvJE"); }}); //노령화 지수
			put("TM0015", new HashMap() {{ put("stat_thema_map_id", "xH8yvpJLwo20161109104000136nr8oMDo6zu"); }}); //인구 밀도
			put("TM0016", new HashMap() {{ put("stat_thema_map_id", "LvwutMvLst20160629174353420zyJyFwnrs0"); }}); //지역별 농림어가의 청장년인구 변화
			put("TM0017", new HashMap() {{ put("stat_thema_map_id", "pEGKMpJMur20160121115806982swMnroIsrv"); }}); //인구 천명당 주택 수 증감 현황
			put("TM0018", new HashMap() {{ put("stat_thema_map_id", "IpuF2oqH6L20160121115806984w4uCvEzJru"); }}); //주택당 평균 가구원 현황
			put("TM0019", new HashMap() {{ put("stat_thema_map_id", "rLvGnxrtvo20160121115806982pvp4FKMFFn"); }}); //아파트 현황
			put("TM0020", new HashMap() {{ put("stat_thema_map_id", "pJyDuMqvpp20160121115806982JxKIIqoDrM"); }}); //연립 및 다세대 주택 현황
			put("TM0021", new HashMap() {{ put("stat_thema_map_id", "Kz9HJMKHnE20160121115806984ICGFFqFnE8"); }}); //자가주택 거주 현황
			put("TM0022", new HashMap() {{ put("stat_thema_map_id", "qLLuICK5KG20160121115806984FxDJIrqGHJ"); }}); //전월세주택 거주 현황
			put("TM0023", new HashMap() {{ put("stat_thema_map_id", "yrnHGHzLEv20160121115806984LMMoHJMzzM"); }}); //시군구내 통근통학 인구 변화
			put("TM0024", new HashMap() {{ put("stat_thema_map_id", "svsMKFoo4q20160121115806985JrEw5wIJtr"); }}); //타시군구 통근통학 인구 변화
			put("TM0025", new HashMap() {{ put("stat_thema_map_id", "o0o4ywtCFG20160121115806985nHEzwFJLor"); }}); //대중교통 통근통학 인구 변화
			put("TM0026", new HashMap() {{ put("stat_thema_map_id", "ywFKpqIpL820160121115806985M1rtqoFvKq"); }}); //자가주차장 확보율
			put("TM0027", new HashMap() {{ put("stat_thema_map_id", "xxuMu3LoDq20160121115806985JqJMF9MsFp"); }}); //1인당 자동차 등록대수
			put("TM0028", new HashMap() {{ put("stat_thema_map_id", "oov4CDtMIF20161109104000137wsJxHGMLrD"); }}); //노외주차장 현황
			put("TM0029", new HashMap() {{ put("stat_thema_map_id", "tDpFJzEJKt20161109104000137DvvIDyvrpv"); }}); //주택의 매매가격 상승률
			put("TM0030", new HashMap() {{ put("stat_thema_map_id", "zzqotqrsxL20160629174353400oKqKEww6Gn"); }}); //30년이상 노후주택 분포현황
			put("TM0031", new HashMap() {{ put("stat_thema_map_id", "GLGnwoJtG5201606291743534307wnyqwsx03"); }}); //결혼기간 10년이하 가구의 주택 점유형태 지역별 분포
			put("TM0032", new HashMap() {{ put("stat_thema_map_id", "2qAx0jvYOk20180802165500441EHhhaQZQaK"); }}); //응급의료시설 접근현황
			put("TM0033", new HashMap() {{ put("stat_thema_map_id", "mtjKxt2Zkb20171109101132537k7SYSI50kn"); }}); //보육업체 취약인구현황
			put("TM0034", new HashMap() {{ put("stat_thema_map_id", "H3Gn9rLznD20141030095228163Lo1DnuEFuL"); }}); //보건시설 1개당 65세이상 노인인구
			put("TM0035", new HashMap() {{ put("stat_thema_map_id", "KzoL6n1vsK20160127192530684FqFDJMDyF8"); }}); //인구 천명당 의료기관 병상수 및 의사 수
			put("TM0036", new HashMap() {{ put("stat_thema_map_id", "09t6Kpuuw8201601211158069862rKwDFDvsF"); }}); //65세 이상 장기요양 급여자 현황
			put("TM0037", new HashMap() {{ put("stat_thema_map_id", "Mupzt7zwus20160121115806986Gn0IDrJIoz"); }}); //보육시설 1개당 어린이 인구
			put("TM0038", new HashMap() {{ put("stat_thema_map_id", "JtuoHKoFKo20161109104000137nuyInuGLLu"); }}); //어린이집현황/직장 어린이집 현황
			put("TM0039", new HashMap() {{ put("stat_thema_map_id", "8zynJquDL0201608021207076934uwItysoEw"); }}); //보육업체 분포도
			put("TM0040", new HashMap() {{ put("stat_thema_map_id", "LInuFCEn0F20160121115806986CxrsruyxyI"); }}); //등록 장애인 수 현황
			put("TM0041", new HashMap() {{ put("stat_thema_map_id", "yqLxF08Jwy20160121115806987szMIJtHrxL"); }}); //장애인 고용률 현황
			put("TM0042", new HashMap() {{ put("stat_thema_map_id", "1Fz7MFD9tG20160121115806987FxqIvzv6Gr"); }}); //교원 1인당 학생수
			put("TM0043", new HashMap() {{ put("stat_thema_map_id", "FGDLLtDFrL20161109104000137KotKoIzvvG"); }}); //요양기관 수 현황
			put("TM0044", new HashMap() {{ put("stat_thema_map_id", "MHFDHqsqpF20161109104000137FJuILzpJps"); }}); //인구천명당 사설학원수
			put("TM0045", new HashMap() {{ put("stat_thema_map_id", "LMotrswI9s20161109104000138pqsJKDLsyI"); }}); //EQ-5D 삶의 질 지표
			put("TM0046", new HashMap() {{ put("stat_thema_map_id", "zDqtEJsnto20160629174353410zruH9H2Ltu"); }}); //기초생활수급자 분포현황
			put("TM0047", new HashMap() {{ put("stat_thema_map_id", "MG3LIFzD5M20160629174353420xLvuEGvuKu"); }}); //평생교육기관 분포현황
			put("TM0048", new HashMap() {{ put("stat_thema_map_id", "orJwxH8I6z20160121115806987yFL0ovrKrx"); }}); //문화시설 1개당 인구 현황
			put("TM0049", new HashMap() {{ put("stat_thema_map_id", "xDy4znKLot20160121115806987KDvuoKIxru"); }}); //인구 10만명당 체육시설 수
			put("TM0050", new HashMap() {{ put("stat_thema_map_id", "yFwtuGMFxt20160629174353420HvLDEFvqyu"); }}); //도서관 분포현황
			put("TM0051", new HashMap() {{ put("stat_thema_map_id", "xz4MtuyvFJ20160121115806995JysKLvtonK"); }}); //문화재 현황
			put("TM0052", new HashMap() {{ put("stat_thema_map_id", "LoH2vstuwK20160121115806988uq2MvKFwMw"); }}); //사업체수 분포 현황
			put("TM0053", new HashMap() {{ put("stat_thema_map_id", "JouDrDrEIF201601211158069886Mv8uqz22x"); }}); //종사자수 분포 현황
			put("TM0054", new HashMap() {{ put("stat_thema_map_id", "nnxnIHsHuC201601211158069883D4EKponMJ"); }}); //인구천명당 사업체 전체산업 현황
			put("TM0055", new HashMap() {{ put("stat_thema_map_id", "syLE5Hwzrw20160121115806988qypHEIxE6J"); }}); //인구 천명당 전체산업 종사자수
			put("TM0056", new HashMap() {{ put("stat_thema_map_id", "nvIHMoJKMp20160202203129218uFwI5tEFvw"); }}); //취업자수 현황
			put("TM0057", new HashMap() {{ put("stat_thema_map_id", "sGDEEFH4vz20141209192921136EKvH8ppIHD"); }}); //고용률 현황
			put("TM0058", new HashMap() {{ put("stat_thema_map_id", "us09EuJowG20161109104000139MsttEMtuFy"); }}); //실업률 현황
			put("TM0059", new HashMap() {{ put("stat_thema_map_id", "KEuoFGtstv20160121115806989sorsv2JtD2"); }}); //도소매업 현황
			put("TM0060", new HashMap() {{ put("stat_thema_map_id", "FqEr3owFwI20160121115806989FxHKDLqMyE"); }}); //서비스업 현황
			put("TM0061", new HashMap() {{ put("stat_thema_map_id", "HrDxnwCKq420160121115806990JLMtMtqHvs"); }}); //제조업 현황
			put("TM0062", new HashMap() {{ put("stat_thema_map_id", "Hz9MCJqHtF20160121115806991w3toxtDyqv"); }}); //농림어업 현황
			put("TM0063", new HashMap() {{ put("stat_thema_map_id", "EyHz6opvFy20160121115806991FE2wurICww"); }}); //농림어가수 변화
			put("TM0064", new HashMap() {{ put("stat_thema_map_id", "rHCoFFqGGM201601211158069912K5snpIGHz"); }}); //재정자립도 현황
			put("TM0065", new HashMap() {{ put("stat_thema_map_id", "JuFEsCrrKz20141120153720188vLFH5LD65p"); }}); //치킨점 1개당 인구수
			put("TM0066", new HashMap() {{ put("stat_thema_map_id", "IJyrz1KHs320160629174353430yy9MvwHyEL"); }}); //PC방 변화
			put("TM0067", new HashMap() {{ put("stat_thema_map_id", "CsLEy7Fnvv20160629174353420yGr3HzFuMt"); }}); //슈퍼마켓 변화
			put("TM0068", new HashMap() {{ put("stat_thema_map_id", "DusnMJzEwK20160629174353420DEnnKysssv"); }}); //제과점 변화
			put("TM0069", new HashMap() {{ put("stat_thema_map_id", "uLEzExuut720160629174353420vqDsooGytz"); }}); //치킨전문점 변화
			put("TM0070", new HashMap() {{ put("stat_thema_map_id", "DyqDKo9usM20160629174353430EKHJotIJLx"); }}); //커피전문점 변화
			put("TM0071", new HashMap() {{ put("stat_thema_map_id", "41d1dhxBgx20180627145739008kXnl0kFaa8"); }}); //지진발생 분포지역
			put("TM0072", new HashMap() {{ put("stat_thema_map_id", "3SnEYaTafC20181127142830568kSyMYbSg3S"); }}); //소방시설 접근현황
			put("TM0073", new HashMap() {{ put("stat_thema_map_id", "9pyrpJvwHw20160121115806991GvpLyuuwDt"); }}); //미세먼지 대기오염도 현황
			put("TM0074", new HashMap() {{ put("stat_thema_map_id", "EItIIxKpqw20160121115806992KLww5xGJKJ"); }}); //일산화탄소 대기오염도 현황
			put("TM0075", new HashMap() {{ put("stat_thema_map_id", "nrxuHGn8KG20160121115806994pvwvyEy69D"); }}); //음주율
			put("TM0076", new HashMap() {{ put("stat_thema_map_id", "0DF7wo3wvL20160121115806994yFru3zDxr1"); }}); //흡연율
			put("TM0077", new HashMap() {{ put("stat_thema_map_id", "G4yqtLuxwD20161109104000139MoMJECoGFD"); }}); //119안전센터 1개소당 담당 주민수
			put("TM0078", new HashMap() {{ put("stat_thema_map_id", "MvKouErG4t20161109104000139s5pGE9rKLL"); }}); //소년 천명당 소년범죄 발생건수
			put("TM0079", new HashMap() {{ put("stat_thema_map_id", "nzuKLzpyGu20161109104000140GvJ8s8MMnJ"); }}); //노지과수(사과/배) 재배면적변화
			put("TM0080", new HashMap() {{ put("stat_thema_map_id", "vzqsDFL1xz20161109104000140F0wqnHp6xE"); }}); //노지과수(포도/복숭아) 재배면적변화
			put("TM0081", new HashMap() {{ put("stat_thema_map_id", "KJstFqrEus20161109104000140MH4v5FqpzH"); }}); //노지채소(마늘/양파) 재배면적변화
			put("TM0082", new HashMap() {{ put("stat_thema_map_id", "ouEDLsxtDt20161109104000140zGuIuG5LJ4"); }}); //노지채소(고추/파) 재배면적변화
			put("TM0083", new HashMap() {{ put("stat_thema_map_id", "HI3tr6J08s20161109104000140xDzqnnKEFr"); }}); //노지채소(배추/무) 재배면적 변화
			put("TM0084", new HashMap() {{ put("stat_thema_map_id", "o0svprrFIy20160121115806993KII2zGpwwM"); }}); //자동차 천대당 교통사고 발생건수
			put("TM0085", new HashMap() {{ put("stat_thema_map_id", "Jn55orptIx20160202203129219ontqD8uyvF"); }}); //교통사고 현황
			put("TM0086", new HashMap() {{ put("stat_thema_map_id", "DKwow5IqnH20160202203129218uw8DsJoFJK"); }}); //교통사고 건수 및 사망자수
			put("TM0087", new HashMap() {{ put("stat_thema_map_id", "pMJE7uJ8qv20160121115806994DKMH32nD02"); }}); //화재사고 발생건수 증감현황
			put("TM0088", new HashMap() {{ put("stat_thema_map_id", "pIIuvMvosG20160121115806994KLIJwxGsyo"); }}); //인구 천명당 범죄발생 건수
			put("TM0089", new HashMap() {{ put("stat_thema_map_id", "pvKDFvpvrM20160121115806992Ez9tGyLw0J"); }}); //일반폐기물 재활용률
			put("TM0090", new HashMap() {{ put("stat_thema_map_id", "oFDHwonv0M20160121115806992MpKpKq3uwI"); }}); //주민 1인당 생활폐기물 배출량
			put("TM0091", new HashMap() {{ put("stat_thema_map_id", "MqywrvyL8o20160629174353430I41vC0HIrn"); }}); //화학물질 배출현황
			put("TM0092", new HashMap() {{ put("stat_thema_map_id", "MoCznyKvJL20160629174353430nnKqDoDFFv"); }}); //2,30대 1인가구 여성인구와 치안시설 분포현황
			
			/** 2020.05.12[한광희] My통계로 통계주제도 신규 지표 추가 START */
			put("TM0093", new HashMap() {{ put("stat_thema_map_id", "BI2meBGRnw20190903142021291efkOoESqMq"); }}); // 전기차 충전소 현황
			put("TM0094", new HashMap() {{ put("stat_thema_map_id", "onb6f4rRh320190902160751679iQUr3aVwTT"); }}); // 개인 카드 사용금액 현황
			put("TM0095", new HashMap() {{ put("stat_thema_map_id", "l32paP5Cx220190731095908183fyadxR281E"); }}); // 무더위 쉼터 현황
			put("TM0096", new HashMap() {{ put("stat_thema_map_id", "OuQf1ZhcWo20190822091422257GkbDsfsZHi"); }}); // 경찰관서 접근현황
			put("TM0097", new HashMap() {{ put("stat_thema_map_id", "njAEQxrh8y20191024164715457m1pHpdrBMn"); }}); // 전통시장 현황
			put("TM0098", new HashMap() {{ put("stat_thema_map_id", "QNj43PFUT220190612100733746ocaFOXLaj3"); }}); // 생활안전사고 출동건수
			/** 2020.05.12[한광희] My통계로 통계주제도 신규 지표 추가 END */
			
			//일자리 맵 > 일자리보기
			put("WR0001", new HashMap() {{ put("b_class_cd", ""); put("s_class_cd", ""); }}); //희망지역 일자리보기
			put("WR0002", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "01"); }}); //대기업 일자리보기
			put("WR0003", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "02"); }}); //중기업 일자리보기
			put("WR0004", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "03"); }}); //벤처기업 일자리보기
			put("WR0005", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "04"); }}); //공공기관 일자리보기
			put("WR0006", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "05"); }}); //외국계기업 일자리보기
			put("WR0007", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "06"); }}); //중견기업 일자리보기
			put("WR0008", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "07"); }}); //소기업 일자리보기
			put("WR0009", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "08"); }}); //소상공인 일자리보기
			put("WR0010", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "09"); }}); //청년친화강소기업 일자리보기
			put("WR0011", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "10"); }}); //보호대상중견기업 일자리보기
			put("WR0012", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "11"); }}); //한시성중소기업 일자리보기
			put("WR0013", new HashMap() {{ put("b_class_cd", "ENTTYP"); put("s_class_cd", "99"); }}); //판단제외 일자리보기
			put("WR0014", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "01"); }}); //관리직(임원·부서장) 일자리보기
			put("WR0015", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "02"); }}); //경영·행정·사무직 일자리보기
			put("WR0016", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "03"); }}); //금융·보험직 일자리보기
			put("WR0017", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "11"); }}); //인문·사회과학 연구직 일자리보기
			put("WR0018", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "12"); }}); //자연·생명과학 연구직 일자리보기
			put("WR0019", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "13"); }}); //정보통신 연구개발직 및 공학기술직 일자리보기
			put("WR0020", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "14"); }}); //건설·채굴 연구개발직 및 공학기술직 일자리보기
			put("WR0021", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "15"); }}); //제조 연구개발직 및 공학기술직 일자리보기
			put("WR0022", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "21"); }}); //교육직 일자리보기
			put("WR0023", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "22"); }}); //법률직 일자리보기
			put("WR0024", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "23"); }}); //사회복지·종교직 일자리보기
			put("WR0025", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "24"); }}); //경찰·소방·교도직 일자리보기
			put("WR0026", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "25"); }}); //군인 일자리보기
			put("WR0027", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "30"); }}); //보건·의료직 일자리보기
			put("WR0028", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "41"); }}); //예술·디자인·방송직 일자리보기
			put("WR0029", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "42"); }}); //스포츠·레크리에이션직 일자리보기
			put("WR0030", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "51"); }}); //미용·예식 서비스직 일자리보기
			put("WR0031", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "52"); }}); //여행·숙박·오락 서비스직 일자리보기
			put("WR0032", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "53"); }}); //음식 서비스직 일자리보기
			put("WR0033", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "54"); }}); //경호·경비직 일자리보기
			put("WR0034", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "55"); }}); //돌봄 서비스직(간병·육아) 일자리보기
			put("WR0035", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "56"); }}); //청소 및 기타 개인서비스직 일자리보기
			put("WR0036", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "61"); }}); //영업·판매직 일자리보기
			put("WR0037", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "62"); }}); //운전·운송직 일자리보기
			put("WR0038", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "70"); }}); //건설·채굴직 일자리보기
			put("WR0039", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "81"); }}); //기계 설치·정비·생산직 일자리보기
			put("WR0040", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "82"); }}); //금속·재료 설치·정비·생산직(판금·단조·주조·용접·도장 등) 일자리보기
			put("WR0041", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "83"); }}); //전기·전자 설치·정비·생산직 일자리보기
			put("WR0042", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "84"); }}); //정보통신 설치·정비직 일자리보기
			put("WR0043", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "85"); }}); //화학·환경 설치·정비·생산직 일자리보기
			put("WR0044", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "86"); }}); //섬유·의복 생산직 일자리보기
			put("WR0045", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "87"); }}); //식품 가공·생산직 일자리보기
			put("WR0046", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "88"); }}); //인쇄·목재·공예 및 기타 설치·정비·생산직 일자리보기
			put("WR0047", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "89"); }}); //제조 단순직 일자리보기
			put("WR0048", new HashMap() {{ put("b_class_cd", "RCRJSS"); put("s_class_cd", "90"); }}); //농림어업직 일자리보기
			put("WR0050", new HashMap() {{ put("b_class_cd", "EMPTYP"); put("s_class_cd", "4"); }}); //파견근로  일자리보기
			put("WR0051", new HashMap() {{ put("b_class_cd", "EMPTYP"); put("s_class_cd", "10"); }}); //기간의 정함이 없는 근로계약  일자리보기
			put("WR0052", new HashMap() {{ put("b_class_cd", "EMPTYP"); put("s_class_cd", "11"); }}); //기간의 정함이 없는 근로계약(시간(선택)제) 일자리보기
			put("WR0053", new HashMap() {{ put("b_class_cd", "EMPTYP"); put("s_class_cd", "20"); }}); //기간의 정함이 있는 근로계약  일자리보기
			put("WR0054", new HashMap() {{ put("b_class_cd", "EMPTYP"); put("s_class_cd", "21"); }}); //기간의 정함이 있는 근로계약(시간(선택)제) 일자리보기
			put("WR0055", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "00"); }}); //학력무관  일자리보기
			put("WR0056", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "01"); }}); //초졸이하 일자리보기
			put("WR0057", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "02"); }}); //중졸 일자리보기
			put("WR0058", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "03"); }}); //고졸 일자리보기
			put("WR0059", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "04"); }}); //대졸(2~3년) 일자리보기
			put("WR0060", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "05"); }}); //대졸(4년) 일자리보기
			put("WR0061", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "06"); }}); //석사 일자리보기
			put("WR0062", new HashMap() {{ put("b_class_cd", "ACDMCR"); put("s_class_cd", "07"); }}); //박사 일자리보기
			put("WR0063", new HashMap() {{ put("b_class_cd", "CAREER"); put("s_class_cd", "N"); }}); //신입 일자리보기
			put("WR0064", new HashMap() {{ put("b_class_cd", "CAREER"); put("s_class_cd", "E"); }}); //경력 일자리보기
			put("WR0065", new HashMap() {{ put("b_class_cd", "CAREER"); put("s_class_cd", "Z"); }}); //경력관계없음 일자리보기
			put("WR0066", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "A"); }}); //농업, 임업 및 어업 일자리보기
			put("WR0067", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "B"); }}); //광업 일자리보기
			put("WR0068", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "C"); }}); //제조업 일자리보기
			put("WR0069", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "D"); }}); //전기, 가스, 증기 및 공기조절 공급업 일자리보기
			put("WR0070", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "E"); }}); //수도, 하수 및 폐기물 처리, 원료 재생업 일자리보기
			put("WR0071", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "F"); }}); //건설업 일자리보기
			put("WR0072", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "G"); }}); //도매 및 소매업 일자리보기
			put("WR0073", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "H"); }}); //운수 및 창고업 일자리보기
			put("WR0074", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "I"); }}); //숙박 및 음식점업 일자리보기
			put("WR0075", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "J"); }}); //정보통신업 일자리보기
			put("WR0076", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "K"); }}); //금융 및 보험업 일자리보기
			put("WR0077", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "L"); }}); //부동산업 일자리보기
			put("WR0078", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "M"); }}); //전문, 과학 및 기술 서비스업 일자리보기
			put("WR0079", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "N"); }}); //사업시설관리, 사업지원 및 임대 서비스업 일자리보기
			put("WR0080", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "O"); }}); //공공행정, 국방 및 사회보장 행정 일자리보기
			put("WR0081", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "P"); }}); //교육 서비스업 일자리보기
			put("WR0082", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "Q"); }}); //보건업 및 사회복지 서비스업 일자리보기
			put("WR0083", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "R"); }}); //예술, 스포츠 및 여가관련 서비스업 일자리보기
			put("WR0084", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "S"); }}); //협회 및 단체, 수리 및 기타 개인 서비스업 일자리보기
			put("WR0085", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "T"); }}); //가구 내 고용활동 및 달리 분류되지 않은 자가소비 생산활동 일자리보기
			put("WR0086", new HashMap() {{ put("b_class_cd", "INDCLA"); put("s_class_cd", "U"); }}); //국제 및 외국기관 일자리보기
			
			//일자리 맵 > 일자리 통계분석
			put("WR0094", new HashMap() {{ put("link_id", "I3111"); }}); //고용률
			put("WR0095", new HashMap() {{ put("link_id", "I3114"); }}); //실업률
			put("WR0096", new HashMap() {{ put("link_id", "I3116"); }}); //청년실업률
			put("WR0097", new HashMap() {{ put("link_id", "I3104"); }}); //취업자수
			put("WR0098", new HashMap() {{ put("link_id", "I3112"); }}); //실업자수
			put("WR0099", new HashMap() {{ put("link_id", "I3117"); }}); //비경제활동인구
			put("WR0100", new HashMap() {{ put("link_id", "I3101"); }}); //세대수
			put("WR0101", new HashMap() {{ put("link_id", "E3224"); }}); //피보험자 증감
			put("WR0102", new HashMap() {{ put("link_id", "E3219"); }}); //취업자 증감
			put("WR0103", new HashMap() {{ put("link_id", "E3218"); }}); //구직건수
			put("WR0104", new HashMap() {{ put("link_id", "E3208"); }}); //구인인원
			put("WR0105", new HashMap() {{ put("link_id", "I3207"); }}); //폐업 수
			put("WR0106", new HashMap() {{ put("link_id", "I3206"); }}); //신설 수
			put("WR0110", new HashMap() {{ put("link_id", "I3306"); }}); //비정규직 근로자 수
			put("WR0111", new HashMap() {{ put("link_id", "I3306_1"); }}); //비정규직 근로자 비율
			put("WR0114", new HashMap() {{ put("link_id", "I3401"); }}); //경제성장률
			put("WR0115", new HashMap() {{ put("link_id", "I3402"); }}); //지역내총생산
		}};
		
		//5 미만 포함 여부 체크
		String berow_5_remove_yn = "Y"; // 기본값 : 5 미만 표시 안함. 
		//통계주제도 (5 미만 표시함)
		if("통계주제도".equals(menu_nm)) {
			berow_5_remove_yn = "N";
		}
		//정책통계지도 (5 미만 표시함)
		else if("정책통계지도".equals(menu_nm)) {
			berow_5_remove_yn = "N";
		}
		//일자리 맵 > 일자리 통계분석 (5 미만 표시함)
		else if("일자리 맵".equals(menu_nm)) {
			berow_5_remove_yn = "N";
		}
		//업종통계지도: 생활업종통계지도 (운영에서 5 미만 표시함)
		else if("업종통계지도: 생활업종통계지도".equals(menu_nm)) {
			berow_5_remove_yn = "N";
		}
		//업종통계지도: 기술업종통계지도 (운영에서 5 미만 표시함)
		else if("업종통계지도: 기술업종통계지도".equals(menu_nm)) {
			berow_5_remove_yn = "N";
		}
		//살고싶은 우리동네 (운영에서 5 미만 표시함)
		else if("살고싶은 우리동네".equals(menu_nm)) {
			berow_5_remove_yn = "N";
		}
		//대화형 통계지도(전체 5미만 표시 안함)
		else if("대화형 통계지도".equals(menu_nm)) {
			berow_5_remove_yn = "Y";
		}
		params.put("berow_5_remove_yn",berow_5_remove_yn);
		
		//매핑
		if(mapping_list.get(stat_data_id) != null) {
			Map<String,Object> mapping_map = (Map<String, Object>) mapping_list.get(stat_data_id);
			params.putAll(mapping_map);
		}
		
		//리턴
		return params;
	}
}