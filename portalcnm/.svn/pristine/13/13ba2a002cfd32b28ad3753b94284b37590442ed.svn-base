package kostat.sop.ServiceAPI.api.dt.workRoadStatsInfoSm.mapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringEscapeUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

import kostat.sop.ServiceAPI.common.util.DateUtil;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.common.util.Success;

/**
 * 
 * @ClassName: WorkRoadStatsInfoSmDao
 * @Description：일자리 통계정보 집계
 * 
 * @author 김남민 @date：2019.07.31
 * @version V1.0
 * 
 */
@Component
public class WorkRoadStatsInfoSmDao extends SqlSessionDaoSupport {

	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	// 일자리 통계정보 집계 목록
	public Map searchWorkRoadStatsInfoSm(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("total", getSqlSession().selectList("WorkRoadStatsInfoSm.getSearchWorkRoadStatsInfoSmCount", paramMap));
		resultMap.put("rows", getSqlSession().selectList("WorkRoadStatsInfoSm.getSearchWorkRoadStatsInfoSm", paramMap));
		return resultMap;
	}

	// 일자리 통계정보 집계 조회
	public Map selectSearchWorkRoadStatsInfoSm(Map paramMap) {
		Map resultMap = new HashMap();
		resultMap.put("rows", getSqlSession().selectList("WorkRoadStatsInfoSm.selectSearchWorkRoadStatsInfoSm", paramMap));
		return resultMap;
	}

	// 일자리 통계정보 집계 등록
	public Success addSearchWorkRoadStatsInfoSm(Map paramMap) {
		Success success = new Success(false, Prompt.ADDFAIL);
		int a = (int) getSqlSession().selectOne("WorkRoadStatsInfoSm.checkSearchWorkRoadStatsInfoSm", paramMap);
		if (a > 0) {
			success.setMsg("이미 사용중인 등록ID 입니다");
		} else if ((int) getSqlSession().insert("WorkRoadStatsInfoSm.addSearchWorkRoadStatsInfoSm", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}

	// 일자리 통계정보 집계 수정
	public Success updateSearchWorkRoadStatsInfoSm(Map paramMap) {
		Success success = new Success(false, Prompt.UPDATEFAIL);
		String REG_ID_ORIGIN = StringUtil.isNullToString(paramMap.get("REG_ID_ORIGIN"));
		String REG_ID = StringUtil.isNullToString(paramMap.get("REG_ID"));
		Map tempMap = new HashMap();
		tempMap.put("REG_ID", REG_ID);
		int a = 0;
		if(!REG_ID.equals(REG_ID_ORIGIN)) {
			a = (int) getSqlSession().selectOne("WorkRoadStatsInfoSm.checkSearchWorkRoadStatsInfoSm", tempMap);
		}
		if (a > 0) {
			success.setMsg("이미 사용중인 등록ID 입니다");
		} else if ((int) getSqlSession().update("WorkRoadStatsInfoSm.updateSearchWorkRoadStatsInfoSm", paramMap) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.UPDATESUCCESS);
		}
		return success;
	}

	// 일자리 통계정보 집계 삭제
	public Success delSearchWorkRoadStatsInfoSm(String[] list) {
		Success success = new Success(false, Prompt.DELETEFAIL);
		if ((int) getSqlSession().delete("WorkRoadStatsInfoSm.delSearchWorkRoadStatsInfoSm", list) > 0) {
			success.setSuccess(true);
			success.setMsg(Prompt.DELETESUCCESS);
		}
		return success;
	}
	
	// 일자리 통계정보 집계 처리
	public Success callSearchWorkRoadStatsInfoSm(Map paramMap) {
		Success success = new Success(false, Prompt.REQFAIL);
		
		//데이터 조회
		Map<String, Object> resultData = (Map<String, Object>) getSqlSession().selectOne("WorkRoadStatsInfoSm.selectSearchWorkRoadStatsInfoSm", paramMap);
		if(resultData != null) {
			String REG_ID = StringUtil.isNullToString(resultData.get("REG_ID"));
			String LINK_ID = StringUtil.isNullToString(resultData.get("LINK_ID"));
			String CONECT_URL = StringUtil.isNullToString(resultData.get("CONECT_URL"));
			String UPDT_CYCLE = StringUtil.isNullToString(resultData.get("UPDT_CYCLE"));
			
			// &amp; => & 치환
			CONECT_URL = StringEscapeUtils.unescapeHtml3(CONECT_URL);
			
			List<Map<String, Object>> insertList = new ArrayList<Map<String, Object>>();
			
			try{
				insertList = callSearchWorkRoadStatsInfoSmUrlToList(LINK_ID, CONECT_URL);
			}
			//DATA 오류
			catch(ClassCastException e) {
				success.setSuccess(false);
				success.setMsg(Prompt.REQFAIL);
				return success;
			}
			//URL 오류
			catch(IOException e) {
				success.setSuccess(false);
				success.setMsg(Prompt.REQFAIL);
				return success;
			}
			
			if(insertList != null && insertList.size() > 0){
				// Validation PRD_DE 체크
				List<String> PRD_DE_LIST = new ArrayList<String>();
				for (Map<String, Object> insertData : insertList) {
					String PRD_DE = StringUtil.isNullToString(insertData.get("PRD_DE"));
					if(!"".equals(PRD_DE) && !PRD_DE_LIST.contains(PRD_DE)) {
						PRD_DE_LIST.add(PRD_DE);
					}
				}
				//PRD_DE 없음
				if(PRD_DE_LIST.size() == 0) {
					success.setSuccess(false);
					success.setMsg("오류 : PRD_DE가 없습니다.");
					return success;
				}
				//PRD_DE 여러개
				if(PRD_DE_LIST.size() > 1) {
					success.setSuccess(false);
					success.setMsg("오류 : PRD_DE가 여러개 입니다.");
					return success;
				}
				
				// Validation 날짜 체크
				String PRD_DE = PRD_DE_LIST.get(0);
				Map<String, Object> tempParams = new HashMap<String, Object>();
				tempParams.put("LINK_ID", LINK_ID);
				Map<String, Object> maxData = (Map<String, Object>) getSqlSession().selectOne("WorkRoadStatsInfoSm.selectSrvDtKosisDataMaxData", tempParams);
				String MAX_PRD_DE = "";
				String MAX_LINK_ID_SEQ = "";
				if(maxData != null) {
					MAX_PRD_DE = StringUtil.isNullToString(maxData.get("PRD_DE"));
					MAX_LINK_ID_SEQ = StringUtil.isNullToString(maxData.get("LINK_ID_SEQ"));
					if(!"".equals(MAX_PRD_DE) && StringUtil.zeroConvert(MAX_PRD_DE) >= StringUtil.zeroConvert(PRD_DE)) {
						success.setSuccess(false);
						success.setMsg("이미 최신 데이터 입니다.");
						return success;
					}
				}
				
				//2020-04-22 [곽제욱] 신규 KOSIS 연계건의 경우 집계시 과거 데이터 전부 가져오기 START
				//과거 데이터가 1건도 존재하지 않는 경우
				if("".equals(MAX_PRD_DE) && CONECT_URL.indexOf("newEstPrdCnt=1") >= 0) {
					boolean DATE_FLAG = true;
					int DATE_COUNT = -1;
					// 갱신주기에 따른 집계시작시점 설정
					if("01".equals(UPDT_CYCLE)) {
						MAX_PRD_DE = "201901";
					} else if("02".equals(UPDT_CYCLE)) {
						MAX_PRD_DE = "201701";
					} else if("03".equals(UPDT_CYCLE)) {
						MAX_PRD_DE = "201301";
					} else if("04".equals(UPDT_CYCLE)) {
						MAX_PRD_DE = "2011";
					} 
					while(DATE_FLAG == true && StringUtil.zeroConvert(MAX_PRD_DE) < StringUtil.zeroConvert(callSearchWorkRoadStatsInfoSmPrdDeBeforfe(PRD_DE, UPDT_CYCLE, DATE_COUNT))) {
						try {
							List<Map<String, Object>> tempList = callSearchWorkRoadStatsInfoSmUrlToList(LINK_ID, CONECT_URL.replace("newEstPrdCnt=1", "startPrdDe="+callSearchWorkRoadStatsInfoSmPrdDeBeforfe(PRD_DE, UPDT_CYCLE, DATE_COUNT)));
							//과거데이터 있음 (진행)
							if(tempList != null && tempList.size() > 0) {
								insertList.addAll(0,tempList);
							}
							//과거데이터 없음 (멈춤)
							else {
								DATE_FLAG = false;
							}
						}
						//DATA 오류 (더이상 과거데이터가 없다고 판단하고 멈춤)
						catch(ClassCastException e) {
							DATE_FLAG = false;
						}
						//URL 오류 (더이상 과거데이터가 없다고 판단하고 멈춤)
						catch(IOException e) {
							DATE_FLAG = false;
						}
						DATE_COUNT--;
					}
				} 
				//2020-04-22 [곽제욱] 신규 KOSIS 연계건의 경우 집계시 과거 데이터 전부 가져오기 END
				// 과거 데이터 체크 후 있는 경우 불러오기
				//UPDT_CYCLE		VARCHAR	10	N	명10	01:월 02:분기 03:반기 04:년	
				//2020-04-22 [곽제욱] 신규 KOSIS 연계건의 경우 집계시 과거 데이터 전부 가져오기 START
				else if(!"".equals(MAX_PRD_DE) && CONECT_URL.indexOf("newEstPrdCnt=1") >= 0 && StringUtil.zeroConvert(MAX_PRD_DE) < StringUtil.zeroConvert(PRD_DE)) {
				//2020-04-22 [곽제욱] 신규 KOSIS 연계건의 경우 집계시 과거 데이터 전부 가져오기 END
					boolean DATE_FLAG = true;
					int DATE_COUNT = -1;
					while(DATE_FLAG == true && StringUtil.zeroConvert(MAX_PRD_DE) < StringUtil.zeroConvert(callSearchWorkRoadStatsInfoSmPrdDeBeforfe(PRD_DE, UPDT_CYCLE, DATE_COUNT))) {
						try {
							List<Map<String, Object>> tempList = callSearchWorkRoadStatsInfoSmUrlToList(LINK_ID, CONECT_URL.replace("newEstPrdCnt=1", "startPrdDe="+callSearchWorkRoadStatsInfoSmPrdDeBeforfe(PRD_DE, UPDT_CYCLE, DATE_COUNT)));
							//과거데이터 있음 (진행)
							if(tempList != null && tempList.size() > 0) {
								insertList.addAll(0,tempList);
							}
							//과거데이터 없음 (멈춤)
							else {
								DATE_FLAG = false;
							}
						}
						//DATA 오류 (더이상 과거데이터가 없다고 판단하고 멈춤)
						catch(ClassCastException e) {
							DATE_FLAG = false;
						}
						//URL 오류 (더이상 과거데이터가 없다고 판단하고 멈춤)
						catch(IOException e) {
							DATE_FLAG = false;
						}
						DATE_COUNT--;
					}
				}
				
				// 데이터 입력
				int LINK_ID_SEQ_INT = 1;
				/** 2019-04-08 [곽제욱] KOSIS 연계중 E3307 인 경우 변수선언 START */
				int LINK_ID_SEQ_INT2 = 1;
				String MAX_LINK_ID_SEQ2 = "";
				Map<String, Object> maxData2 = null;
				/** 2019-04-08 [곽제욱] KOSIS 연계중 E3307 인 경우 변수선언 END */
				if(!"".equals(MAX_LINK_ID_SEQ)) {
					LINK_ID_SEQ_INT = StringUtil.zeroConvert(MAX_LINK_ID_SEQ.replace(LINK_ID, ""))+1;
					/** 2019-04-08 [곽제욱] KOSIS 연계중 E3307 인 경우 SEQ 채번 START */
					if("E3307".equals(LINK_ID)) {
						tempParams.put("LINK_ID", "E3307");
						maxData2 = (Map<String, Object>) getSqlSession().selectOne("WorkRoadStatsInfoSm.selectSrvDtKosisDataMaxData", tempParams);
						MAX_LINK_ID_SEQ2 = StringUtil.isNullToString(maxData2.get("LINK_ID_SEQ"));
						if(!"".equals(MAX_LINK_ID_SEQ2)) {
							LINK_ID_SEQ_INT2 = StringUtil.zeroConvert(MAX_LINK_ID_SEQ2.replace("E3307", "")+1);
						}
						
					}
					/** 2019-04-08 [곽제욱] KOSIS 연계중 E3307 인 경우 SEQ 채번 END */
				}
				for (Map<String, Object> insertData : insertList) {
					insertData.put("LINK_ID_SEQ", LINK_ID+String.format("%06d", LINK_ID_SEQ_INT++));
					
					//C1 없으면 00에 전체로 넣기
					String C1 = StringUtil.isNullToString(insertData.get("C1"));
					String C1_NM = StringUtil.isNullToString(insertData.get("C1_NM"));
					if("".equals(C1)) {
						insertData.put("C1", "00");
						insertData.put("C1_NM", "전체");
					}
					
					String UNIT_NM = StringUtil.isNullToString(insertData.get("UNIT_NM"));
					//E3501 지니계수 하드코딩
					if("E3501".equals(LINK_ID)) {
						insertData.put("TBL_ID", "TBL_E3501");
						insertData.put("TBL_NM", "지니계수");
						insertData.put("ITM_ID", "T10");
						insertData.put("ITM_NM", "지니계수");
						insertData.remove("ITM_NM_ENG");
						insertData.put("C1", "00");
						insertData.put("C1_NM", "전체");
						insertData.put("UNIT_NM", "계수");
						insertData.remove("PRD_SE");
						insertData.remove("C2");
						insertData.remove("C2_NM");
						insertData.remove("C2_NM_ENG");
						insertData.remove("C2_OBJ_NM");
						insertData.remove("C2_OBJ_NM_ENG");
					}
					//E3502 상대적빈곤율 UNIT_NM 하드코딩
					if("E3502".equals(LINK_ID)) {
						insertData.put("TBL_ID", "TBL_E3502");
						insertData.put("TBL_NM", "상대적");
						insertData.put("ITM_ID", "T20");
						insertData.put("ITM_NM", "상대적");
						insertData.remove("ITM_NM_ENG");
						insertData.put("C1", "00");
						insertData.put("C1_NM", "전체");
						insertData.put("UNIT_NM", "%");
						insertData.remove("PRD_SE");
						insertData.remove("C2");
						insertData.remove("C2_NM");
						insertData.remove("C2_NM_ENG");
						insertData.remove("C2_OBJ_NM");
						insertData.remove("C2_OBJ_NM_ENG");
					}
					
					//I3404 생활물가지수인 경우 UNIT_NM, UNIT_NM_ENG 입력 안함
					if("I3404".equals(LINK_ID)) {
						insertData.remove("UNIT_NM");
						insertData.remove("UNIT_NM_ENG");
					}
					
					/** 2019-04-08 [곽제욱] KOSIS 연계를 위한 분기처리 START */
					String ITM_ID = StringUtil.isNullToString(insertData.get("ITM_ID"));
					//E3307 인 경우 c1(지역코드) 를 공통코드로 변경
					if("E3307".equals(LINK_ID)) {
						// 평균임금총액 삭제, 총 근로시간 E3307만
						insertData.put("LINK_ID_SEQ", LINK_ID+String.format("%06d", LINK_ID_SEQ_INT2++));
						
						if( C1 != null && !"".equals(C1) ){
							if( C1.indexOf("zone_") >= 0 ){
								if("zone_0".equals(C1)) {
									insertData.put("C1", "00");
								} else if("zone_1".equals(C1)) {
									insertData.put("C1", "11");
									insertData.put("C1_NM", "서울특별시");
								} else if("zone_2".equals(C1)) {
									insertData.put("C1", "21");
									insertData.put("C1_NM", "부산광역시");
								} else if("zone_3".equals(C1)) {
									insertData.put("C1", "22");
									insertData.put("C1_NM", "대구광역시");
								} else if("zone_4".equals(C1)) {
									insertData.put("C1", "23");
									insertData.put("C1_NM", "인천광역시");
								} else if("zone_5".equals(C1)) {
									insertData.put("C1", "24");
									insertData.put("C1_NM", "광주광역시");
								} else if("zone_6".equals(C1)) {
									insertData.put("C1", "25");
									insertData.put("C1_NM", "대전광역시");
								} else if("zone_7".equals(C1)) {
									insertData.put("C1", "26");
									insertData.put("C1_NM", "울산광역시");
								} else if("zone_8".equals(C1)) {
									insertData.put("C1", "31");
									insertData.put("C1_NM", "경기도");
								} else if("zone_9".equals(C1)) {
									insertData.put("C1", "32");
									insertData.put("C1_NM", "강원도");
								} else if("zone_10".equals(C1)) {
									insertData.put("C1", "33");
									insertData.put("C1_NM", "충청북도");
								} else if("zone_11".equals(C1)) {
									insertData.put("C1", "34");
									insertData.put("C1_NM", "충청남도");
								} else if("zone_12".equals(C1)) {
									insertData.put("C1", "35");
									insertData.put("C1_NM", "전라북도");
								} else if("zone_13".equals(C1)) {
									insertData.put("C1", "36");
									insertData.put("C1_NM", "전라남도");
								} else if("zone_14".equals(C1)) {
									insertData.put("C1", "37");
									insertData.put("C1_NM", "경상북도");
								} else if("zone_15".equals(C1)) {
									insertData.put("C1", "38");
									insertData.put("C1_NM", "경상남도");
								} else if("zone_16".equals(C1)) {
									insertData.put("C1", "39");
									insertData.put("C1_NM", "제주특별자치도");
								} 
							} else if( C1.indexOf("zone17_") >= 0 ){ //21.02.18 zone17 추가
								if("zone17_0".equals(C1)) {
									insertData.put("C1", "00");
								} else if("zone17_1".equals(C1)) {
									insertData.put("C1", "11");
									insertData.put("C1_NM", "서울특별시");
								} else if("zone17_2".equals(C1)) {
									insertData.put("C1", "21");
									insertData.put("C1_NM", "부산광역시");
								} else if("zone17_3".equals(C1)) {
									insertData.put("C1", "22");
									insertData.put("C1_NM", "대구광역시");
								} else if("zone17_4".equals(C1)) {
									insertData.put("C1", "23");
									insertData.put("C1_NM", "인천광역시");
								} else if("zone17_5".equals(C1)) {
									insertData.put("C1", "24");
									insertData.put("C1_NM", "광주광역시");
								} else if("zone17_6".equals(C1)) {
									insertData.put("C1", "25");
									insertData.put("C1_NM", "대전광역시");
								} else if("zone17_7".equals(C1)) {
									insertData.put("C1", "26");
									insertData.put("C1_NM", "울산광역시");
								} else if("zone17_8".equals(C1)) {
									insertData.put("C1", "29");
									insertData.put("C1_NM", "세종특별자치시");
								} else if("zone17_9".equals(C1)) {
									insertData.put("C1", "31");
									insertData.put("C1_NM", "경기도");
								} else if("zone17_10".equals(C1)) {
									insertData.put("C1", "32");
									insertData.put("C1_NM", "강원도");
								} else if("zone17_11".equals(C1)) {
									insertData.put("C1", "33");
									insertData.put("C1_NM", "충청북도");
								} else if("zone17_12".equals(C1)) {
									insertData.put("C1", "34");
									insertData.put("C1_NM", "충청남도");
								} else if("zone17_13".equals(C1)) {
									insertData.put("C1", "35");
									insertData.put("C1_NM", "전라북도");
								} else if("zone17_14".equals(C1)) {
									insertData.put("C1", "36");
									insertData.put("C1_NM", "전라남도");
								} else if("zone17_15".equals(C1)) {
									insertData.put("C1", "37");
									insertData.put("C1_NM", "경상북도");
								} else if("zone17_16".equals(C1)) {
									insertData.put("C1", "38");
									insertData.put("C1_NM", "경상남도");
								} else if("zone17_17".equals(C1)) {
									insertData.put("C1", "39");
									insertData.put("C1_NM", "제주특별자치도");
								} 
							}
						}
					}
					//I3404 인 경우 c1(지역코드) 를 공통코드로 변경
					if("I3404".equals(LINK_ID)) {
						if("T10".equals(C1)) {
							insertData.put("C1", "00");
						} else if("T11".equals(C1)) {
							insertData.put("C1", "11");
						} else if("T12".equals(C1)) {
							insertData.put("C1", "21");
						} else if("T13".equals(C1)) {
							insertData.put("C1", "22");
						} else if("T14".equals(C1)) {
							insertData.put("C1", "23");
						} else if("T15".equals(C1)) {
							insertData.put("C1", "24");
						} else if("T16".equals(C1)) {
							insertData.put("C1", "25");
						} else if("T17".equals(C1)) {
							insertData.put("C1", "26");
						} else if("T21".equals(C1)) {
							insertData.put("C1", "31");
						} else if("T31".equals(C1)) {
							insertData.put("C1", "32");
						} else if("T41".equals(C1)) {
							insertData.put("C1", "33");
						} else if("T51".equals(C1)) {
							insertData.put("C1", "34");
						} else if("T61".equals(C1)) {
							insertData.put("C1", "35");
						} else if("T71".equals(C1)) {
							insertData.put("C1", "36");
						} else if("T81".equals(C1)) {
							insertData.put("C1", "37");
						} else if("T90".equals(C1)) {
							insertData.put("C1", "38");
						} else if("T96".equals(C1)) {
							insertData.put("C1", "39");
						} 
					}
					
					//I3405(수출), I3406(수입) 인 경우 UNIT_NM (100만달러 -> 백만달러) 변경
					if("I3405".equals(LINK_ID)||"I3406".equals(LINK_ID)) {
						insertData.put("UNIT_NM", "백만달러");
					}
					
					//D3502(산업분류별 일자리) 인 경우 맵핑을 위하여 C1_NM 변경
					if("D3502".equals(LINK_ID)) {
						if("313".equals(C1)) {
							insertData.put("C1_NM", "고무 및 플라스틱제품 제조업");
						}
					}
					
					/** 2019-04-08 [곽제욱] KOSIS 연계를 위한 분기처리 END */
					
					/** 2020-07-24 [곽제욱] I3308 고용보험 가입율 unit_nm = %%p 를 % 로 변경처리 START */
					if("I3308".equals(LINK_ID)) {
						if("%%p".equals(UNIT_NM)) {
							insertData.put("UNIT_NM", "%");
							insertData.put("UNIT_NM_ENG", "%");
						}
					}
					/** 2020-07-24 [곽제욱] I3308 고용보험 가입율 unit_nm = %%p 를 % 로 변경처리 END */
					
					//mng_s 20210129 이진호
					//관리자 > 일자리맵 > 통계정보 집계
					//18.시도 신설법인수
					// itm_id 를 '16142T1' 으로 치환하여 등록
					if("I3206".equals(LINK_ID)){
						insertData.put("ITM_ID", "16142T1");
					}
					
					//16. 청년실업률
					// itm_id 를 'T10' 으로 치환하여 등록
					if("I3116".equals(LINK_ID)){
						insertData.put("ITM_ID", "T10");
					}
					//mng_e 20210129 이진호
				
					
					//등록
					getSqlSession().insert("insertSrvDtKosisData", insertData);
				}
				
				//평균임금총액 [ E3307 index5+index8 ] 더한 값을[ E3301 index6 ]으로 저장
				getSqlSession().insert("insertSrvDtKosisDataTAWA");
				
				
				//resultMsg = "자료 수신이 완료 되었습니다.[total:"+total+"]";
			}else{
				//resultMsg = "공급자로 부터 수신된 자료가 없읍니다. 잠시 후 다시 시도바랍니다.";
			}
			
			success.setSuccess(true);
			success.setMsg(Prompt.REQSUCCESS);
		}
		return success;
	}
	
	private String callSearchWorkRoadStatsInfoSmPrdDeBeforfe(String PRD_DE, String UPDT_CYCLE, int add) {
		//UPDT_CYCLE		VARCHAR	10	N	명10	01:월 02:분기 03:반기 04:년
		//월
		if("01".equals(UPDT_CYCLE) && PRD_DE.length() == 6) {
			int year = StringUtil.zeroConvert(PRD_DE.substring(0,4));
			int month = StringUtil.zeroConvert(PRD_DE.substring(4));
			month += add; 
			while(month < 1) {
				month += 12;
				year -= 1;
			}
			while(month > 12) {
				month -= 12;
				year += 1;
			}
			PRD_DE = StringUtil.isNullToString(year+String.format("%02d", month));
		}
		//분기
		if("02".equals(UPDT_CYCLE) && PRD_DE.length() == 6) {
			int year = StringUtil.zeroConvert(PRD_DE.substring(0,4));
			int month = StringUtil.zeroConvert(PRD_DE.substring(4));
			month += add; 
			while(month < 1) {
				month += 4;
				year -= 1;
			}
			while(month > 4) {
				month -= 4;
				year += 1;
			}
			PRD_DE = StringUtil.isNullToString(year+String.format("%02d", month));
		}
		//반기
		if("03".equals(UPDT_CYCLE) && PRD_DE.length() == 6) {
			int year = StringUtil.zeroConvert(PRD_DE.substring(0,4));
			int month = StringUtil.zeroConvert(PRD_DE.substring(4));
			month += add; 
			while(month < 1) {
				month += 2;
				year -= 1;
			}
			while(month > 2) {
				month -= 2;
				year += 1;
			}
			PRD_DE = StringUtil.isNullToString(year+String.format("%02d", month));
		}
		//년
		if("04".equals(UPDT_CYCLE) && PRD_DE.length() == 4) {
			int year = StringUtil.zeroConvert(PRD_DE);
			PRD_DE = StringUtil.isNullToString(year+add);
		}
		return PRD_DE;
	}
	
	private List<Map<String, Object>> callSearchWorkRoadStatsInfoSmUrlToList(String LINK_ID, String CONECT_URL) throws ClassCastException, IOException {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		StringBuffer RESULT_DATA = new StringBuffer();
		
		//URL 연결
		URL url = new URL(CONECT_URL);			
		URLConnection conn = url.openConnection();		
		conn.setRequestProperty("accept-language", "ko");		
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
		
		//DATA 받기
		RESULT_DATA.append("{\"data\":");
	    //data = "{\"data\":";
        String msg = "";
        while((msg = br.readLine())!=null)
        {
        	RESULT_DATA.append(msg);
        	//data += msg;	        	           
        }
        RESULT_DATA.append("}");
        
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> tempMap = mapper.readValue(RESULT_DATA.toString(), new TypeReference<Map<String, Object>>(){});
        resultList = (List<Map<String, Object>>) tempMap.get("data");
        if(resultList != null && resultList.size() > 0) {
        	for (Map<String, Object> resultMap : resultList) {
        		resultMap.put("LINK_ID", LINK_ID);
        		resultMap.put("CREATE_DT", DateUtil.getToday());
        		
				String C1 = StringUtil.isNullToString(resultMap.get("C1"));
				String C1_NM = StringUtil.isNullToString(resultMap.get("C1_NM"));
				if("26".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "21";
					resultMap.put("C1", C1);
				}
				if("27".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "22";
					resultMap.put("C1", C1);
				}
				if("28".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "23";
					resultMap.put("C1", C1);
				}
				if("29".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "24";
					resultMap.put("C1", C1);
				}
				if("30".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "25";
					resultMap.put("C1", C1);
				}
				if("31".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "26";
					resultMap.put("C1", C1);
				}
				if("36".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "29";
					resultMap.put("C1", C1);
				}
				if("41".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "31";
					resultMap.put("C1", C1);
				}
				if("42".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "32";
					resultMap.put("C1", C1);
				}
				if("43".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "33";
					resultMap.put("C1", C1);
				}
				if("44".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "34";
					resultMap.put("C1", C1);
				}
				if("45".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "35";
					resultMap.put("C1", C1);
				}
				if("46".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "36";
					resultMap.put("C1", C1);
				}
				if("47".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "37";
					resultMap.put("C1", C1);
				}
				if("48".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "38";
					resultMap.put("C1", C1);
				}
				if("50".equals(C1) && ("I3101".equals(LINK_ID) || "I3102".equals(LINK_ID) || "I3103".equals(LINK_ID))) {
					C1 = "39";
					resultMap.put("C1", C1);
				}
				
				if("A04".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "32";
					resultMap.put("C1", C1);
				}
				if("A03".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "31";
					resultMap.put("C1", C1);
				}
				if("A16".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "38";
					resultMap.put("C1", C1);
				}
				if("A13".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "37";
					resultMap.put("C1", C1);
				}
				if("A09".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "24";
					resultMap.put("C1", C1);
				}
				if("A12".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "22";
					resultMap.put("C1", C1);
				}
				if("A05".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "25";
					resultMap.put("C1", C1);
				}
				if("A14".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "21";
					resultMap.put("C1", C1);
				}
				if("A01".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "11";
					resultMap.put("C1", C1);
				}
				if("A08".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "29";
					resultMap.put("C1", C1);
				}
				if("A15".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "26";
					resultMap.put("C1", C1);
				}
				if("A02".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "23";
					resultMap.put("C1", C1);
				}
				if("A11".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "36";
					resultMap.put("C1", C1);
				}
				if("A10".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "35";
					resultMap.put("C1", C1);
				}
				if("A17".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "39";
					resultMap.put("C1", C1);
				}
				if("A07".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "34";
					resultMap.put("C1", C1);
				}
				if("A06".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "33";
					resultMap.put("C1", C1);
				}
				if("A00".equals(C1) && "I3207".equals(LINK_ID)) {
					C1 = "00";
					resultMap.put("C1", C1);
				}
				
				//mng_s 20220118 세종시가 생활물가지수에서 지도에 않나와서 추가함.
				if("T18".equals(C1) && "I3404".equals(LINK_ID)) {
					C1 = "29";
					resultMap.put("C1", C1);
				}
				
				if("강원".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "32";
					resultMap.put("C1", C1);
				}
				if("경기".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "31";
					resultMap.put("C1", C1);
				}
				if("경남".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "38";
					resultMap.put("C1", C1);
				}
				if("경북".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "37";
					resultMap.put("C1", C1);
				}
				if("광주".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "24";
					resultMap.put("C1", C1);
				}
				if("대구".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "22";
					resultMap.put("C1", C1);
				}
				if("대전".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "25";
					resultMap.put("C1", C1);
				}
				if("부산".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "21";
					resultMap.put("C1", C1);
				}
				if("서울".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "11";
					resultMap.put("C1", C1);
				}
				if("세종".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "29";
					resultMap.put("C1", C1);
				}
				if("울산".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "26";
					resultMap.put("C1", C1);
				}
				if("인천".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "23";
					resultMap.put("C1", C1);
				}
				if("전국".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "00";
					resultMap.put("C1", C1);
				}
				if("전남".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "36";
					resultMap.put("C1", C1);
				}
				if("전북".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "35";
					resultMap.put("C1", C1);
				}
				if("제주".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "39";
					resultMap.put("C1", C1);
				}
				if("충남".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "34";
					resultMap.put("C1", C1);
				}
				if("충북".equals(C1_NM) && "I3206".equals(LINK_ID)) {
					C1 = "33";
					resultMap.put("C1", C1);
				}
			}
        }
        
		return resultList;
	}
	
}
