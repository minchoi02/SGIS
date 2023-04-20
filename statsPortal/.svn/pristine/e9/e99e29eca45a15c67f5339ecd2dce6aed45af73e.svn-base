package kostat.sop.ServiceAPI.api.statsMe.map;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.StatsMeService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : My통계로 > 통계자료 조회  <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김남민 1.0, 2019.08.08	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김남민
 * @version 1.0
 * @see
 * <p/>
 */
public class GetStatsData extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetStatsData.class);
	
	//My통계로 관련 서비스
	@Resource(name="statsMeService")
	private StatsMeService statsMeService;
	
	@Override
	public String getApiId() {
		return "115008";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		stat_data_id
	}

	enum OptionParam{
		sido_cd,
		sgg_cd,
		emdong_cd,
		lifeCycleItemId,
		interestRealmItemId
	}
	
	@Resource( name = "stats_defult_bnd_year" )
	private String DEFAULT_BND_YEAR;
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		Map<String,Object> mapParameter = getParameterMap(req);
		
		//리턴 변수 선언
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		resultData.put("errCd", "0");
		resultData.put("errMsg", "");
		
		//통계자료관리 조회
		Map<String,Object> data = session.selectOne("statsMeMap.selectOneSrvDtCtlgDataList", mapParameter);
		
		if(data != null) {
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
			String main_kwrd = StringUtil.isNullToString(data.get("main_kwrd")); //메인키워드
			
			/*********************************** 키워드 조회 START ***********************************/
			//통계자료관리 키워드 조회
			Map<String,Object> kwrdParams = new HashMap<String,Object>();
			kwrdParams.put("stat_data_id", stat_data_id);			
			List<String> kwrdListString = new ArrayList<>();
			List<Map<String, Object>> kwrdList = session.selectList("statsMeMap.selectListSrvDtCtlgMainKwrdList", kwrdParams);
			data.put("ctlg_main_kwrd_count", 0);
			if(kwrdList != null && kwrdList.size() > 0) {
				for (Map<String, Object> kwrdMap : kwrdList) {
					String tempKwrd = StringUtil.isNullToString(kwrdMap.get("ctlg_main_kwrd"));
					if(!"".equals(tempKwrd) && !kwrdListString.contains(tempKwrd)) {
						kwrdListString.add(tempKwrd);
					}
				}
				int i = 0;
				for (String kwrdString : kwrdListString) {
					i++;
					data.put("ctlg_main_kwrd"+i, kwrdString);
				}
				data.put("ctlg_main_kwrd_count", i);
			}
			//통계자료관리 추천 키워드 조회
			kwrdListString.clear();
			kwrdList = session.selectList("statsMeMap.selectListSrvDtCtlgCycleRecmdKwrd", kwrdParams);
			data.put("recmd_kwrd_count", 0);
			if(kwrdList != null && kwrdList.size() > 0) {
				for (Map<String, Object> kwrdMap : kwrdList) {
					for(int i = 1; i <= 5; i++) {
						String tempKwrd = StringUtil.isNullToString(kwrdMap.get("recmd_kwrd_"+i));
						if(!"".equals(tempKwrd) && !kwrdListString.contains(tempKwrd)) {
							kwrdListString.add(tempKwrd);
						}
					}
				}
				int i = 0;
				for (String kwrdString : kwrdListString) {
					i++;
					data.put("recmd_kwrd"+i, kwrdString);
				}
				data.put("recmd_kwrd_count", i);
			}
			//통계자료관리 유사 키워드 조회 (테이블 삭제됨)
			/*kwrdListString.clear();
			kwrdList = session.selectList("statsMeMap.selectListSrvDtCtlgSimilrKwrdList", kwrdParams);
			data.put("ctlg_similr_kwrd_count", 0);
			if(kwrdList != null && kwrdList.size() > 0) {
				for (Map<String, Object> kwrdMap : kwrdList) {
					String tempKwrd = StringUtil.isNullToString(kwrdMap.get("ctlg_similr_kwrd"));
					if(!"".equals(tempKwrd) && !kwrdListString.contains(tempKwrd)) {
						kwrdListString.add(tempKwrd);
					}
				}
				int i = 0;
				for (String kwrdString : kwrdListString) {
					i++;
					data.put("ctlg_similr_kwrd"+i, kwrdString);
				}
				data.put("ctlg_similr_kwrd_count", i);
			}*/
			/*********************************** 키워드 조회 END ***********************************/
			/*********************************** 추천 서비스 조회 START ***********************************/
			//메인 키워드 없는 경우 세분류 없는 경우 중분류 없는 경우 대분류 순으로 조회
			//추천서비스 변수
			Map<String,Object> recomend_svc_params = new HashMap<String,Object>();
			List<Map<String, Object>> recomend_svc_list = new ArrayList<Map<String,Object>>();
			
			//추천서비스 조회 (메인 키워드)
			recomend_svc_params.clear();
			recomend_svc_params.put("stat_data_id", stat_data_id);
			recomend_svc_params.put("main_kwrd", main_kwrd);
			recomend_svc_list = session.selectList("statsMeMap.selectListSrvDtCtlgDataListRecomendSvc", recomend_svc_params);
			
			//추천서비스 조회 (세분류)
			if(recomend_svc_list == null || recomend_svc_list.size() == 0) {
				recomend_svc_params.clear();
				recomend_svc_params.put("stat_data_id", stat_data_id);
				recomend_svc_params.put("s_class_nm", s_class_nm);
				recomend_svc_list = session.selectList("statsMeMap.selectListSrvDtCtlgDataListRecomendSvc", recomend_svc_params);
			}
			
			//추천서비스 조회 (중분류)
			if(recomend_svc_list == null || recomend_svc_list.size() == 0) {
				recomend_svc_params.clear();
				recomend_svc_params.put("stat_data_id", stat_data_id);
				recomend_svc_params.put("m_class_nm", m_class_nm);
				recomend_svc_list = session.selectList("statsMeMap.selectListSrvDtCtlgDataListRecomendSvc", recomend_svc_params);
			}
			
			//추천서비스 조회 (대분류) (대분류까지 가면 너무 많이나와서 제외)
			/*if(recomend_svc_list == null || recomend_svc_list.size() == 0) {
				recomend_svc_params.clear();
				recomend_svc_params.put("stat_data_id", stat_data_id);
				recomend_svc_params.put("b_class_nm", b_class_nm);
				recomend_svc_list = session.selectList("statsMeMap.selectListSrvDtCtlgDataListRecomendSvc", recomend_svc_params);
			}*/
			data.put("recomend_svc_list", recomend_svc_list);
			/*********************************** 추천 서비스 조회 END ***********************************/
			/*********************************** 데이터 마트 조회 START ***********************************/
			//대화형 통계지도 > e-지방지표는 원래 데이터 마트가 없어서 예외처리
			if("대화형 통계지도".equals(menu_nm) && "e-지방지표".equals(srv_nm)) {
				resultData.put("errCd", "0");
				resultData.put("errMsg", "");
			}
			//일자리 맵 > 일자리보기는 원테이블 조회
			if("일자리 맵".equals(menu_nm) && "일자리보기".equals(srv_nm)) {
				resultData.put("errCd", "0");
				resultData.put("errMsg", "");
			}
			//나머지
			else {
				//데이터 마트 없으면 데이터 생성
				/*String data_yn = session.selectOne("statsMeMap.selectDataYnSrvDtCtlgDtwrh", mapParameter);
				if("N".equals(data_yn)) {
					try {
						statsMeService.makeSrvDtCtlgDtwrh(data);
					} catch (SQLException e) {
						throw new ApiException(StringUtil.getErrMsg());
					}
				}*/
				resultData.put("errCd", "0");
				resultData.put("errMsg", "");
			}
			/*********************************** 데이터 마트 조회 END ***********************************/
			/*********************************** 추가 매핑 START ***********************************/
			//통계주제도
			if("통계주제도".equals(menu_nm)) {
				Map<String, Object> result1 = null;
				try {
					result1 = statsMeService.mappingSrvDtCtlgDataList(data);
				} catch (SQLException e) {
					
				}
				
				if(result1 != null) {
					String stat_thema_map_id = StringUtil.isNullToString(result1.get("stat_thema_map_id"));
					String thema_map_category = StringUtil.isNullToString(result1.get("thema_map_category"));
					String thema_map_type = StringUtil.isNullToString(result1.get("thema_map_type"));
					base_year = StringUtil.isNullToString(result1.get("base_year"));
					stat_data_base_year = StringUtil.isNullToString(result1.get("stat_data_base_year"));
					//비자치구 사용여부
					String atdrc_yn = StringUtil.isNullToString(result1.get("atdrc_yn"));
					if("1".equals(atdrc_yn)) atdrc_yn = "Y";
					
					//링크 URL 매핑
					if("02".endsWith(thema_map_type)) {
						data.put("link_url", "/view/thematicMap/thematicMapMainOld?stat_thema_map_id="+stat_thema_map_id+"&theme="+thema_map_category+"&mapType="+thema_map_type);
					} else {
						data.put("link_url", "/view/thematicMap/thematicMapMain?stat_thema_map_id="+stat_thema_map_id+"&theme="+thema_map_category+"&mapType="+thema_map_type);
					}
					
					//데이터 조회 파라미터 매핑
					data.put("atdrc_yn",atdrc_yn);
					data.put("stat_thema_map_id",stat_thema_map_id);
					data.put("base_year",base_year);
					data.put("stat_data_base_year",stat_data_base_year);
				}
			}
			else if("정책통계지도".equals(menu_nm)) {
				data.put("link_url", "/view/map/policyStaticMap");
			}
			else if("일자리 맵".equals(menu_nm)) {
				if("일자리 통계분석".equals(srv_nm)) {
					data.put("link_url", "/view/workRoad/statsAnls");					
				} else if("일자리보기".equals(srv_nm)) {
					data.put("link_url", "/view/workRoad/viewJobs");
				}
			}
			else if("업종통계지도: 생활업종통계지도".equals(menu_nm)) {
				data.put("link_url", "/view/bizStats/bizStatsMap?biz=0");
				if("시군구별 업종현황".equals(srv_nm)) {
					try {
						data = statsMeService.mappingSrvDtCtlgDataList(data);
					} catch (SQLException e) {
						
					}
				}
				else if("개업현황".equals(srv_nm)) {
					try {
						data = statsMeService.mappingSrvDtCtlgDataList(data);
					} catch (SQLException e) {
						
					}
				}
				else if("업종 밀집도 변화".equals(srv_nm)) {
					try {
						data = statsMeService.mappingSrvDtCtlgDataList(data);
					} catch (SQLException e) {
						
					}
				}
			}
			else if("업종통계지도: 기술업종통계지도".equals(menu_nm)) {
				data.put("link_url", "/view/technicalBiz/technicalBizMap?tec=0");
				try {
					data = statsMeService.mappingSrvDtCtlgDataList(data);
				} catch (SQLException e) {
					
				}
			}
			else if("살고싶은 우리동네".equals(menu_nm)) {
				data.put("link_url", "/view/house/houseAnalysisMap");
				try {
					data = statsMeService.mappingSrvDtCtlgDataList(data);
				} catch (SQLException e) {
					
				}
			}
			else if("대화형 통계지도".equals(menu_nm)) {
				data.put("link_url", "/view/map/interactiveMap/mainIndexView");
				if("전국 사업체조사: 산업분류".equals(srv_nm)) {
					data.put("link_url", "/view/map/interactiveMap/companyView");
					try {
						data = statsMeService.mappingSrvDtCtlgDataList(data);
					} catch (SQLException e) {
						
					}
				}
				else if("전국 사업체조사: 테마업종".equals(srv_nm)) {
					data.put("link_url", "/view/map/interactiveMap/companyView");
					try {
						data = statsMeService.mappingSrvDtCtlgDataList(data);
					} catch (SQLException e) {
						
					}
				}
				else if("e-지방지표".equals(srv_nm)) {
					
				}
				else if("인구주택총조사".equals(srv_nm)) {					
					data.put("b_class_nm", b_class_nm);
					data.put("year", stat_data_base_year);
					data.put("bnd_year", base_year);
					data.put("link_url", "/view/map/interactiveMap/populationHouseView");
				}
			}
			/*********************************** 추가 매핑 START ***********************************/
		}
		else {
			resultData.put("errCd", "-401");
			resultData.put("errMsg", "카탈로그 통계자료관리를 조회하는데 실패하였습니다.");
		}
		
		//조회 결과
		resultData.put("data", data);
		resultData.put("params", mapParameter);
		return resultData;
	}
}