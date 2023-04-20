package kostat.sop.ServiceAPI.api.catchmentArea;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.sop.ServiceAPI.common.util.StringUtil;

public class ServiceAreaBSCA {
	
	private static final Log logger = LogFactory.getLog( ServiceAreaBSCA.class );
	
	private static final int _bscaRefVal = 3;		// 인구/가구/주택:5, 사업체/종사자:3
	
	public static int getTotalSum(List result, String prefix, int refVal) {
		int tot = 0;
		
		if(result != null && result.size() > 0){
			HashMap rstMap = (HashMap)result.get(0);
			
			//SGIS4_1025_생활권역 시작
			//5가지 key가 존재하지 않는데 리턴값이 0이면 값이 존재하지만 0값을 가진것과 구분이 안되는데, 이미 사용하는곳이 ..
			if(rstMap.containsKey(prefix + "le_org_cnt")
					&& rstMap.containsKey(prefix + "eq_sca_cnt")
					&& rstMap.containsKey(prefix + "le_org_sum")
					&& rstMap.containsKey(prefix + "le_sca_sum")
					&& rstMap.containsKey(prefix + "gt_org_sum")) {
			
				HashMap<String, Object> datan = new HashMap<>();
				datan.put("K", (int)rstMap.get(prefix + "le_org_cnt")); 		// 참값 <= 마스킹 기준값 인 갯수
				datan.put("k", (int)rstMap.get(prefix + "eq_sca_cnt")); 		// 공표값 = 마스킹 기준값 인 갯수
				datan.put("d1", (int)rstMap.get(prefix + "le_org_sum")); 		// 참값 <= 마스킹 기준값 인 참값 합
				datan.put("d2", (int)rstMap.get(prefix + "le_sca_sum")); 		// 참값 <= 마스킹 기준값 인 공표값 합
				datan.put("dd1z", (int)rstMap.get(prefix + "gt_org_sum")); 		// 참값 > 마스킹 기준값 인 참값 합				
				
				tot = ServiceAreaBSCA.bsca(datan, refVal);
			}else {
				tot = -1;
			}
			//SGIS4_1025_생활권역 끝
		}

		return tot;
	}
	
	//SGIS4_1112_추가 시작(대화형통계지도 bsca 관련)
	public static HashMap<String, Object> getTotalSum2(HashMap result, String prefix, int refVal ,String filter) {
		HashMap<String, Object> retrunData = new HashMap<>();
		int tot = 0;
		
		if(result != null){
			HashMap rstMap = result;
			
			//5가지 key가 존재하지 않는데 리턴값이 0이면 값이 존재하지만 0값을 가진것과 구분이 안되는데, 이미 사용하는곳이 ..
			if(rstMap.containsKey(prefix + "le_org_cnt")
					&& rstMap.containsKey(prefix + "eq_sca_cnt")
					&& rstMap.containsKey(prefix + "le_org_sum")
					&& rstMap.containsKey(prefix + "le_sca_sum")
					&& rstMap.containsKey(prefix + "gt_org_sum")) {
			
				HashMap<String, Object> datan = new HashMap<>();
				datan.put("K", (int)rstMap.get(prefix + "le_org_cnt")); 		// 참값 <= 마스킹 기준값 인 갯수
				datan.put("k", (int)rstMap.get(prefix + "eq_sca_cnt")); 		// 공표값 = 마스킹 기준값 인 갯수
				datan.put("d1", (int)rstMap.get(prefix + "le_org_sum")); 		// 참값 <= 마스킹 기준값 인 참값 합
				datan.put("d2", (int)rstMap.get(prefix + "le_sca_sum")); 		// 참값 <= 마스킹 기준값 인 공표값 합
				datan.put("dd1z", (int)rstMap.get(prefix + "gt_org_sum")); 		// 참값 > 마스킹 기준값 인 참값 합				
				
				tot = ServiceAreaBSCA.bsca(datan, refVal);
				
				retrunData.put("adm_cd" , rstMap.get("adm_cd"));
				retrunData.put("adm_nm" , rstMap.get("adm_nm"));
				
				if(filter != null) {
					if("tot".equals(filter)) {
						if("pop_".equals(prefix) || "threef_".equals(prefix)) {
							retrunData.put("statType" , filter);
							retrunData.put("population" , tot);
						}else if("fam_".equals(prefix)){
							retrunData.put("statType" , filter);
							retrunData.put("household_cnt",tot );
						}else if("hou_".equals(prefix)) {
							retrunData.put("statType" , filter);
							retrunData.put("house_cnt",tot );
						}else if("cor_".equals(prefix)) {
							retrunData.put("statType" , filter);
							retrunData.put("corp_cnt",tot );
						}else if("emp_".equals(prefix)) {
							retrunData.put("statType" , filter);
							retrunData.put("employee_cnt",tot );
						}
					}else {
						retrunData.put(filter , tot);
					}
				}else {
					if("pop_".equals(prefix) || "threef_".equals(prefix)) {
						retrunData.put("population" , tot);
					}else if("fam_".equals(prefix)){
						retrunData.put("household_cnt",tot );
					}else if("hou_".equals(prefix)) {
						retrunData.put("house_cnt",tot );
					}else if("cor_".equals(prefix)) {
						retrunData.put("corp_cnt",tot );
					}else if("emp_".equals(prefix)) {
						retrunData.put("tot_worker",tot );
					}
				}
			}else {
				tot = -1;
			}
		}

		return retrunData;
	}
	//SGIS4_1112_추가 끝
	private static int bsca(HashMap dd, int refVal) {
		int B = refVal;
		int K = (int) dd.get("K"); 			// 참값 <= 마스킹 기준값 인 갯수
		int k = (int) dd.get("k"); 			// 공표값 = 마스킹 기준값 인 갯수

		int d1 = (int) dd.get("d1"); 		// 참값 <= 마스킹 기준값 인 참값 합
		int d2 = (int) dd.get("d2"); 		// 참값 <= 마스킹 기준값 인 공표값 합
		int dd1z = (int) dd.get("dd1z");	// 참값 > 마스킹 기준값 인 참값 합

		if (K > 1) {
			int v = k; 						// 최소 기대값
			int w = k + K * (B - 1); 		// 최대 기대값

			int a = (d1 - 1) / B; 			// 참값을 기준값으로 나눈 몫(구간갯수)
			d2 = a * B + B / 2 + 1; 		// 종료구간의 중간값

			int r = a * B + 1; 				// 종료구간의 처음값
			int s = (a + 1) * B; 			// 종료구간의 종료값

			if (a < 0) {
				d2 = 0;
			} else if (r < v) { 			// 종료구간의 처음값이 최소 기대값보다 적은 경우
				d2 = d2 + B;
			} else if (s > w) { 			// 종료구간의 종료값이 최대 기대값보다 큰 경우
				d2 = d2 - B;
			}

			if (d2 > 0 & d2 < B)
				d2 = B;
		}

		d2 = d2 + dd1z;						//마스킹 기준값 미만 공표값의 합 + 마스킹 기준값 이상의 실값의 합 = 기대치 합 
		
		logger.info( ">>> BSCA total : org(" + (d1 + dd1z) + "), bsca(" + d2 + ")");

		return d2;
	}
	
	/*
	bscaVec함수 
	dataMap : 조회된 데이터의 가상행렬
	keySeries : 조회조건키
	dataMapCd : 격자코드 리스트맵
	B : 마스킹 기준값
	 */
	public static int bscaVecT(HashMap<String[], int[]> dataMap, int refVal, String cl) {
		int K = 0;
		int k = 0;
		int d1 = 0;
		int d2 = 0;
		int dd1z = 0;
		
		//피벗팅된 격자값으로 부터 BSCA함수를 위한 변수값을 구한다.
		for (String[] key100 : dataMap.keySet()) {
			if (!dataMap.containsKey(key100)) continue;
			
			String keySeries = key100[1];
			if (!keySeries.startsWith(cl))  continue;
			
			int[] data = (int[]) dataMap.get(key100);
			int rcount = data[0];

			int sca = data[1];
			if (sca == refVal) {
				k++; 			// 공표값 = 마스킹 기준값 인 갯수
			}

			if (rcount <= refVal) {
				d1 += rcount; 	// 참값 <= 마스킹 기준값 인 참값 합
				d2 += sca;		// 참값 <= 마스킹 기준값 인 공표값 합
				K++; 			// 참값 <= 마스킹 기준값 인 갯수(?)
			} else {
				dd1z += rcount; // 참값 > 마스킹 기준값 인 참값 합
			}
		}

		HashMap<String, Object> datan = new HashMap<>();
		datan.put("K", K); 			// 참값 <= 마스킹 기준값 인 갯수
		datan.put("k", k); 			// 공표값 = 마스킹 기준값 인 갯수
		datan.put("d1", d1); 		// 참값 <= 마스킹 기준값 인 참값 합
		datan.put("d2", d2); 		// 참값 <= 마스킹 기준값 인 공표값 합
		datan.put("dd1z", dd1z); 	// 참값 > 마스킹 기준값 인 참값 합

		// bsca합 계산,
		return ServiceAreaBSCA.bsca(datan, refVal);
	}

	/* 영역 내 전체 정보 > 사업체 및 종사자 */
	public static List bscaT01(List dataList, int refVal, Map kwMap) {
		//SGIS4_생활권역 시작
		boolean isIncludeTotal = true;	//dataList에 '총합'값이 포함되었는지 구분(주요 소분류에는 포함되어 있고, 대분류 모드는 포함되지 않았고)
		
		ArrayList rst = new ArrayList();
		
		if(dataList != null && dataList.size() > 0) {
			HashMap<String, HashMap<String, Integer>> dataMap = new HashMap<String, HashMap<String, Integer>>();
			HashMap<String, String> nameMap = new HashMap<String, String>();
			
			HashMap rowMap = null;
			HashMap<String, Integer> infoMap = null;
			String key = null;
			String totalKey = "000";
			String totalKeyNm = "전체";
			int corp_cnt = 0;
			int corp_sca = 0;
			int employee_cnt = 0;
			int employee_sca = 0;
			int corp_lk = 0;
			int corp_sk = 0;
			int corp_d1 = 0;
			int corp_d2 = 0;
			int corp_dd1z = 0;
			int employee_lk = 0;
			int employee_sk = 0;
			int employee_d1 = 0;
			int employee_d2 = 0;
			int employee_dd1z = 0;			
			
			String grid_level = StringUtil.isNullToString(kwMap.get("grid_level"));						// 표출용(사용자가 선택한) 격자 크기
			
			HashMap<String, Integer> totMap = null;
			if(!isIncludeTotal) {
				// 전체값 계산에 필요
				totMap = new HashMap<String, Integer>();
				totMap.put("cop_le_org_cnt", 0);
				totMap.put("cop_eq_sca_cnt", 0);
				totMap.put("cop_le_org_sum", 0);
				totMap.put("cop_le_sca_sum", 0);
				totMap.put("cop_gt_org_sum", 0);
				totMap.put("emp_le_org_cnt", 0);
				totMap.put("emp_eq_sca_cnt", 0);
				totMap.put("emp_le_org_sum", 0);
				totMap.put("emp_le_sca_sum", 0);
				totMap.put("emp_gt_org_sum", 0);					
				
				dataMap.put(totalKey, totMap);
				nameMap.put(totalKey, totalKeyNm);			
				// 전체값 계산에 필요
			}

			int loopCnt = dataList.size();
			for(int i = 0; i < loopCnt; i++) {
				rowMap = (HashMap)dataList.get(i);
				
				key = (String)rowMap.get("grp_id");				
				if (!dataMap.containsKey(key)) {
					HashMap<String, Integer> tmpMap = new HashMap<String, Integer>();
					tmpMap.put("cop_le_org_cnt", 0);
					tmpMap.put("cop_eq_sca_cnt", 0);
					tmpMap.put("cop_le_org_sum", 0);
					tmpMap.put("cop_le_sca_sum", 0);
					tmpMap.put("cop_gt_org_sum", 0);
					tmpMap.put("emp_le_org_cnt", 0);
					tmpMap.put("emp_eq_sca_cnt", 0);
					tmpMap.put("emp_le_org_sum", 0);
					tmpMap.put("emp_le_sca_sum", 0);
					tmpMap.put("emp_gt_org_sum", 0);					
					
					dataMap.put(key, tmpMap);
					nameMap.put(key, (String)rowMap.get("grp_nm"));
				}
				
				infoMap = dataMap.get(key);
				
				if("100m".equals(grid_level)) {			
					corp_cnt = (Integer)rowMap.get("corp_cnt");
					corp_sca = (Integer)rowMap.get("corp_sca");
					employee_cnt = (Integer)rowMap.get("employee_cnt");
					employee_sca = (Integer)rowMap.get("employee_sca");

					// 사업체
					if (corp_sca == refVal) {
						infoMap.put("cop_eq_sca_cnt", (infoMap.get("cop_eq_sca_cnt") + 1)); 			// 공표값 = 마스킹 기준값 인 갯수
						if(!isIncludeTotal) {
							totMap.put("cop_eq_sca_cnt", (totMap.get("cop_eq_sca_cnt") + 1));				// 전체
						}
					}
	
					if (corp_cnt <= refVal) {
						infoMap.put("cop_le_org_sum", (infoMap.get("cop_le_org_sum") + corp_cnt));		// 참값 <= 마스킹 기준값 인 참값 합						
						infoMap.put("cop_le_sca_sum", (infoMap.get("cop_le_sca_sum") + corp_sca));		// 참값 <= 마스킹 기준값 인 공표값 합						
						infoMap.put("cop_le_org_cnt", (infoMap.get("cop_le_org_cnt") + 1));				// 참값 <= 마스킹 기준값 인 갯수
						if(!isIncludeTotal) {
							totMap.put("cop_le_org_sum", (totMap.get("cop_le_org_sum") + corp_cnt));		// 전체
							totMap.put("cop_le_sca_sum", (totMap.get("cop_le_sca_sum") + corp_sca));		// 전체
							totMap.put("cop_le_org_cnt", (totMap.get("cop_le_org_cnt") + 1));				// 전체
						}
					} else {
						infoMap.put("cop_gt_org_sum", (infoMap.get("cop_gt_org_sum") + corp_cnt));		// 참값 > 마스킹 기준값 인 참값 합	
						if(!isIncludeTotal) {
							totMap.put("cop_gt_org_sum", (totMap.get("cop_gt_org_sum") + corp_cnt));		// 전체
						}
					}
					
					// 종사자
					if (employee_sca == refVal) {
						infoMap.put("emp_eq_sca_cnt", (infoMap.get("emp_eq_sca_cnt") + 1)); 			// 공표값 = 마스킹 기준값 인 갯수
						if(!isIncludeTotal) {
							totMap.put("emp_eq_sca_cnt", (totMap.get("emp_eq_sca_cnt") + 1));				// 전체
						}
					}
	
					if (employee_cnt <= refVal) {
						infoMap.put("emp_le_org_sum", (infoMap.get("emp_le_org_sum") + employee_cnt));	// 참값 <= 마스킹 기준값 인 참값 합
						infoMap.put("emp_le_sca_sum", (infoMap.get("emp_le_sca_sum") + employee_sca));	// 참값 <= 마스킹 기준값 인 공표값 합
						infoMap.put("emp_le_org_cnt", (infoMap.get("emp_le_org_cnt") + 1));				// 참값 <= 마스킹 기준값 인 갯수
						if(!isIncludeTotal) {
							totMap.put("emp_le_org_sum", (totMap.get("emp_le_org_sum") + employee_cnt));	// 전체
							totMap.put("emp_le_sca_sum", (totMap.get("emp_le_sca_sum") + employee_sca));	// 전체
							totMap.put("emp_le_org_cnt", (totMap.get("emp_le_org_cnt") + 1));				// 전체
						}
					} else {
						infoMap.put("emp_gt_org_sum", (infoMap.get("emp_gt_org_sum") + employee_cnt));	// 참값 > 마스킹 기준값 인 참값 합
						if(!isIncludeTotal) {
							totMap.put("emp_gt_org_sum", (totMap.get("emp_gt_org_sum") + employee_cnt));	// 전체
						}
					}
				}else {
					corp_lk = (Integer)rowMap.get("corp_lk");
					corp_sk = (Integer)rowMap.get("corp_sk");
					corp_d1 = (Integer)rowMap.get("corp_d1");
					corp_d2 = (Integer)rowMap.get("corp_d2");
					corp_dd1z = (Integer)rowMap.get("corp_dd1z");
					employee_lk = (Integer)rowMap.get("employee_lk");
					employee_sk = (Integer)rowMap.get("employee_sk");
					employee_d1 = (Integer)rowMap.get("employee_d1");
					employee_d2 = (Integer)rowMap.get("employee_d2");
					employee_dd1z = (Integer)rowMap.get("employee_dd1z");					

					// 사업체
					infoMap.put("cop_le_org_cnt", (infoMap.get("cop_le_org_cnt") + corp_lk));		// 참값 <= 마스킹 기준값 인 갯수
					infoMap.put("cop_eq_sca_cnt", (infoMap.get("cop_eq_sca_cnt") + corp_sk)); 		// 공표값 = 마스킹 기준값 인 갯수
					infoMap.put("cop_le_org_sum", (infoMap.get("cop_le_org_sum") + corp_d1));		// 참값 <= 마스킹 기준값 인 참값 합
					infoMap.put("cop_le_sca_sum", (infoMap.get("cop_le_sca_sum") + corp_d2));		// 참값 <= 마스킹 기준값 인 공표값 합
					infoMap.put("cop_gt_org_sum", (infoMap.get("cop_gt_org_sum") + corp_dd1z));		// 참값 > 마스킹 기준값 인 참값 합
					if(!isIncludeTotal) {
						totMap.put("cop_le_org_cnt", (totMap.get("cop_le_org_cnt") + corp_lk));			// 전체
						totMap.put("cop_eq_sca_cnt", (totMap.get("cop_eq_sca_cnt") + corp_sk)); 		// 전체
						totMap.put("cop_le_org_sum", (totMap.get("cop_le_org_sum") + corp_d1));			// 전체
						totMap.put("cop_le_sca_sum", (totMap.get("cop_le_sca_sum") + corp_d2));			// 전체
						totMap.put("cop_gt_org_sum", (totMap.get("cop_gt_org_sum") + corp_dd1z));		// 전체
					}
					
					// 종사자
					infoMap.put("emp_le_org_cnt", (infoMap.get("emp_le_org_cnt") + employee_lk));	// 참값 <= 마스킹 기준값 인 갯수
					infoMap.put("emp_eq_sca_cnt", (infoMap.get("emp_eq_sca_cnt") + employee_sk)); 	// 공표값 = 마스킹 기준값 인 갯수
					infoMap.put("emp_le_org_sum", (infoMap.get("emp_le_org_sum") + employee_d1));	// 참값 <= 마스킹 기준값 인 참값 합
					infoMap.put("emp_le_sca_sum", (infoMap.get("emp_le_sca_sum") + employee_d2));	// 참값 <= 마스킹 기준값 인 공표값 합						
					infoMap.put("emp_gt_org_sum", (infoMap.get("emp_gt_org_sum") + employee_dd1z));	// 참값 > 마스킹 기준값 인 참값 합	
					if(!isIncludeTotal) {
						totMap.put("emp_le_org_cnt", (totMap.get("emp_le_org_cnt") + employee_lk));		// 전체
						totMap.put("emp_eq_sca_cnt", (totMap.get("emp_eq_sca_cnt") + employee_sk)); 	// 전체
						totMap.put("emp_le_org_sum", (totMap.get("emp_le_org_sum") + employee_d1));		// 전체
						totMap.put("emp_le_sca_sum", (totMap.get("emp_le_sca_sum") + employee_d2));		// 전체						
						totMap.put("emp_gt_org_sum", (totMap.get("emp_gt_org_sum") + employee_dd1z));	// 전체
					}
				}
			}
			
			// 리턴값 생성
			HashMap<String, Object> dataCop = null;
			HashMap<String, Object> dataEmp = null;
			int totCop = 0;
			int totEmp = 0;
			int totCopForCalc = 0;	// 분포율 계산용
			int totEmpForCalc = 0;	// 분포율 계산용
			for (String kCd : dataMap.keySet()) {
				infoMap = dataMap.get(kCd);

				dataCop = new HashMap<>();
				dataCop.put("K", infoMap.get("cop_le_org_cnt")); 			// 참값 <= 마스킹 기준값 인 갯수
				dataCop.put("k", infoMap.get("cop_eq_sca_cnt")); 			// 공표값 = 마스킹 기준값 인 갯수
				dataCop.put("d1", infoMap.get("cop_le_org_sum")); 			// 참값 <= 마스킹 기준값 인 참값 합
				dataCop.put("d2", infoMap.get("cop_le_sca_sum")); 			// 참값 <= 마스킹 기준값 인 공표값 합
				dataCop.put("dd1z", infoMap.get("cop_gt_org_sum")); 		// 참값 > 마스킹 기준값 인 참값 합				
				totCop = ServiceAreaBSCA.bsca(dataCop, refVal); 
				
				dataEmp = new HashMap<>();
				dataEmp.put("K", infoMap.get("emp_le_org_cnt")); 			// 참값 <= 마스킹 기준값 인 갯수
				dataEmp.put("k", infoMap.get("emp_eq_sca_cnt")); 			// 공표값 = 마스킹 기준값 인 갯수
				dataEmp.put("d1", infoMap.get("emp_le_org_sum")); 			// 참값 <= 마스킹 기준값 인 참값 합
				dataEmp.put("d2", infoMap.get("emp_le_sca_sum")); 			// 참값 <= 마스킹 기준값 인 공표값 합
				dataEmp.put("dd1z", infoMap.get("emp_gt_org_sum")); 		// 참값 > 마스킹 기준값 인 참값 합
				totEmp = ServiceAreaBSCA.bsca(dataEmp, refVal);
				
				HashMap rtMap = new HashMap();
				rtMap.put("name", nameMap.get(kCd));
				rtMap.put("corp_cnt", totCop);
				rtMap.put("employee_cnt", totEmp);
				
				if(!isIncludeTotal) {
					if(!kCd.equals(totalKey)) {
						totCopForCalc = totCopForCalc + totCop;
						totEmpForCalc = totEmpForCalc + totEmp;
					}
				}
				
				rst.add(rtMap);				
			}
			
			if(!isIncludeTotal) {
				HashMap rtMapForCalc = new HashMap();
				rtMapForCalc.put("name", "bsca_전체");
				rtMapForCalc.put("corp_cnt", totCopForCalc);
				rtMapForCalc.put("employee_cnt", totEmpForCalc);
				rst.add(rtMapForCalc);
			}
		}

		return rst;
		//SGIS4_생활권역 끝
	}
	
	/* 격자 분포 > 인구, 가구, 주택, 사업체, 종사자 */
	public static Map bscaT02(List dataList, int refVal, Map kwMap, String wFlag) {
		// wFlag : Y-년도별, G-그리드별, A-둘다(Y & G), C-조건별 통계 보기
		// C는 Y와 유사
		
		HashMap rstMap = new HashMap();
		
		if(dataList != null && dataList.size() > 0) {
			HashMap<String, HashMap<String, Integer>> dataMapYear = new HashMap<String, HashMap<String, Integer>>();
			HashMap<String, HashMap<String, Integer>> dataMapGrid = new HashMap<String, HashMap<String, Integer>>();
			
			HashMap rowMap = null;
			HashMap<String, Integer> infoMap = null;
			String key_data_year = null;		// 키_년도 값
			String key_data_gridCd = null;		// 키_격자코드 값 
			
			String col_year = String.valueOf(kwMap.get("kw_year"));			// 년도 컬럼명
			String col_gridCd = String.valueOf(kwMap.get("kw_gridCd"));		// 격자코드 컬럼명
			String col_org = String.valueOf(kwMap.get("kw_org"));			// 참값 컬럼명
			String col_sca = String.valueOf(kwMap.get("kw_sca"));			// sca 적용값 컬럼명			
			String col_lk = StringUtil.isNullToString(kwMap.get("kw_lk"));				// 참값 <= 마스킹 기준값 인 갯수 컬럼명
			if("".equals(col_lk)) {
				col_lk = "lk";
			}
			String col_sk = StringUtil.isNullToString(kwMap.get("kw_sk"));				// 공표값 = 마스킹 기준값 인 갯수 컬럼명
			if("".equals(col_sk)) {
				col_sk = "sk";
			}
			String col_d1 = StringUtil.isNullToString(kwMap.get("kw_d1"));				// 참값 <= 마스킹 기준값 인 참값 합 컬럼명
			if("".equals(col_d1)) {
				col_d1 = "d1";
			}
			String col_d2 = StringUtil.isNullToString(kwMap.get("kw_d2"));				// 참값 <= 마스킹 기준값 인 공표값 합 컬럼명
			if("".equals(col_d2)) {
				col_d2 = "d2";
			}
			String col_dd1z = StringUtil.isNullToString(kwMap.get("kw_dd1z"));			// 참값 > 마스킹 기준값 인 참값 합 컬럼명
			if("".equals(col_dd1z)) {
				col_dd1z = "dd1z";
			}
			String grid_level = StringUtil.isNullToString(kwMap.get("grid_level"));						// 표출용(사용자가 선택한) 격자 크기
			String base_year = StringUtil.isNullToString(kwMap.get("base_year"));						// 선택 년도 
			String rt_col_tot_byGrid = StringUtil.isNullToString(kwMap.get("rt_col_tot_byGrid"));		// 그리드별 총합의 출력 컬럼명
			String rt_col_tot_byYear = StringUtil.isNullToString(kwMap.get("rt_col_tot_byYear"));		// 년도별 총합의 출력 컬럼명
			String rt_col_avg = StringUtil.isNullToString(kwMap.get("rt_col_avg"));						// 년도별 평균의 출력 컬럼명
			String rt_col_tot_byChartr = StringUtil.isNullToString(kwMap.get("rt_col_tot_byChartr"));	// 특성별 총합의 출력 컬럼명
			int grid_num = 1;
			if(kwMap.get("grid_num") != null) {
				grid_num = (Integer)kwMap.get("grid_num");
			}
			double grid_area = 0.0;
			if(kwMap.get("grid_area") != null) {
				grid_area = (Double)kwMap.get("grid_area");
			}
			
			//SGIS4_1025_생활권역 시작
			HashMap<String, String> nameMap = new HashMap<String, String>();
			String key_data_grp_nm = null;		// 키_명(그룹명) 값
			String col_grp_nm = String.valueOf(kwMap.get("kw_grpNm"));			// 그룹명의 컬럼명			
			//SGIS4_1025_생활권역 끝
			
			int loopCnt = dataList.size();
			
			if("100m".equals(grid_level)) {
				int stats_org = 0;					// 통계치_참값
				int stats_sca = 0;					// 통계치_sca 적용값
				
				for(int i = 0; i < loopCnt; i++) {
					rowMap = (HashMap)dataList.get(i);
	
					stats_org = (Integer)rowMap.get(col_org);
					stats_sca = (Integer)rowMap.get(col_sca);
					key_data_year = (String)rowMap.get(col_year);
					//SGIS4_1025_생활권역 시작
					key_data_grp_nm = (String)rowMap.get(col_grp_nm);
					//SGIS4_1025_생활권역 끝
					
					// 년도별 bsca 준비
					if("Y".equals(wFlag) || "A".equals(wFlag) || "C".equals(wFlag)) {
						//key_data_year = (String)rowMap.get(col_year);				
						if (!dataMapYear.containsKey(key_data_year)) {
							HashMap<String, Integer> tmpMap = new HashMap<String, Integer>();
							tmpMap.put("le_org_cnt", 0);
							tmpMap.put("eq_sca_cnt", 0);
							tmpMap.put("le_org_sum", 0);
							tmpMap.put("le_sca_sum", 0);
							tmpMap.put("gt_org_sum", 0);
							
							dataMapYear.put(key_data_year, tmpMap);
							//SGIS4_1025_생활권역 시작
							nameMap.put(key_data_year, key_data_grp_nm);
							//SGIS4_1025_생활권역 끝
						}
						
	//					stats_org = (Integer)rowMap.get(col_org);
	//					stats_sca = (Integer)rowMap.get(col_sca);
						
						infoMap = dataMapYear.get(key_data_year);
		
						if (stats_sca == refVal) {
							infoMap.put("eq_sca_cnt", (infoMap.get("eq_sca_cnt") + 1)); 			// 공표값 = 마스킹 기준값 인 갯수
						}
		
						if (stats_org <= refVal) {
							infoMap.put("le_org_sum", (infoMap.get("le_org_sum") + stats_org));		// 참값 <= 마스킹 기준값 인 참값 합
							infoMap.put("le_sca_sum", (infoMap.get("le_sca_sum") + stats_sca));		// 참값 <= 마스킹 기준값 인 공표값 합
							infoMap.put("le_org_cnt", (infoMap.get("le_org_cnt") + 1));				// 참값 <= 마스킹 기준값 인 갯수(?)
						} else {
							infoMap.put("gt_org_sum", (infoMap.get("gt_org_sum") + stats_org));		// 참값 > 마스킹 기준값 인 참값 합
						}
					}
					
					// 그리드별 bsca 준비
					if("G".equals(wFlag) || "A".equals(wFlag)) {
						if(base_year.equals(key_data_year)) {
							key_data_gridCd = (String)rowMap.get(col_gridCd);
							// 격자 크기가 100m이 아니면, 100m 격자코드를 사용하여 해당 격자코드로 변환해야 한다.
//							if(!"".equals(grid_level) && !"100m".equals(grid_level)) {
//								key_data_gridCd = convertGridCd(key_data_gridCd, grid_level);
//							}						
							
							if (!dataMapGrid.containsKey(key_data_gridCd)) {
								HashMap<String, Integer> tmpMap = new HashMap<String, Integer>();
								tmpMap.put("le_org_cnt", 0);
								tmpMap.put("eq_sca_cnt", 0);
								tmpMap.put("le_org_sum", 0);
								tmpMap.put("le_sca_sum", 0);
								tmpMap.put("gt_org_sum", 0);
								
								dataMapGrid.put(key_data_gridCd, tmpMap);
							}
		
	//						stats_org = (Integer)rowMap.get(col_org);
	//						stats_sca = (Integer)rowMap.get(col_sca);
							
							infoMap = dataMapGrid.get(key_data_gridCd);
		
							if (stats_sca == refVal) {
								infoMap.put("eq_sca_cnt", (infoMap.get("eq_sca_cnt") + 1)); 			// 공표값 = 마스킹 기준값 인 갯수
							}
		
							if (stats_org <= refVal) {
								infoMap.put("le_org_sum", (infoMap.get("le_org_sum") + stats_org));		// 참값 <= 마스킹 기준값 인 참값 합
								infoMap.put("le_sca_sum", (infoMap.get("le_sca_sum") + stats_sca));		// 참값 <= 마스킹 기준값 인 공표값 합
								infoMap.put("le_org_cnt", (infoMap.get("le_org_cnt") + 1));				// 참값 <= 마스킹 기준값 인 갯수(?)
							} else {
								infoMap.put("gt_org_sum", (infoMap.get("gt_org_sum") + stats_org));		// 참값 > 마스킹 기준값 인 참값 합
							}					
						}
					}
				}
			} else {
				int stats_lk = 0;
				int stats_sk = 0;
				int stats_d1 = 0;
				int stats_d2 = 0;
				int stats_dd1z = 0;	
				
				for(int i = 0; i < loopCnt; i++) {
					rowMap = (HashMap)dataList.get(i);
	
					stats_lk = (Integer)rowMap.get(col_lk);
					stats_sk = (Integer)rowMap.get(col_sk);
					stats_d1 = (Integer)rowMap.get(col_d1);
					stats_d2 = (Integer)rowMap.get(col_d2);
					stats_dd1z = (Integer)rowMap.get(col_dd1z);
					key_data_year = (String)rowMap.get(col_year);
					//SGIS4_1025_생활권역 시작
					key_data_grp_nm = (String)rowMap.get(col_grp_nm);
					//SGIS4_1025_생활권역 끝					
					
					// 년도별 bsca 준비
					if("Y".equals(wFlag) || "A".equals(wFlag) || "C".equals(wFlag)) {
						//key_data_year = (String)rowMap.get(col_year);				
						if (!dataMapYear.containsKey(key_data_year)) {
							HashMap<String, Integer> tmpMap = new HashMap<String, Integer>();
							tmpMap.put("le_org_cnt", 0);
							tmpMap.put("eq_sca_cnt", 0);
							tmpMap.put("le_org_sum", 0);
							tmpMap.put("le_sca_sum", 0);
							tmpMap.put("gt_org_sum", 0);
							
							dataMapYear.put(key_data_year, tmpMap);
							//SGIS4_1025_생활권역 시작
							nameMap.put(key_data_year, key_data_grp_nm);
							//SGIS4_1025_생활권역 끝							
						}
						
						infoMap = dataMapYear.get(key_data_year);
		
						infoMap.put("le_org_cnt", (infoMap.get("le_org_cnt") + stats_lk));			// 참값 <= 마스킹 기준값 인 갯수
						infoMap.put("eq_sca_cnt", (infoMap.get("eq_sca_cnt") + stats_sk)); 			// 공표값 = 마스킹 기준값 인 갯수
						infoMap.put("le_org_sum", (infoMap.get("le_org_sum") + stats_d1));			// 참값 <= 마스킹 기준값 인 참값 합
						infoMap.put("le_sca_sum", (infoMap.get("le_sca_sum") + stats_d2));			// 참값 <= 마스킹 기준값 인 공표값 합						
						infoMap.put("gt_org_sum", (infoMap.get("gt_org_sum") + stats_dd1z));		// 참값 > 마스킹 기준값 인 참값 합

					}
					
					// 그리드별 bsca 준비
					if("G".equals(wFlag) || "A".equals(wFlag)) {
						if(base_year.equals(key_data_year)) {
							key_data_gridCd = (String)rowMap.get(col_gridCd);

							if (!dataMapGrid.containsKey(key_data_gridCd)) {
								HashMap<String, Integer> tmpMap = new HashMap<String, Integer>();
								tmpMap.put("le_org_cnt", 0);
								tmpMap.put("eq_sca_cnt", 0);
								tmpMap.put("le_org_sum", 0);
								tmpMap.put("le_sca_sum", 0);
								tmpMap.put("gt_org_sum", 0);
								
								dataMapGrid.put(key_data_gridCd, tmpMap);
							}
							
							infoMap = dataMapGrid.get(key_data_gridCd);
		
							infoMap.put("le_org_cnt", (infoMap.get("le_org_cnt") + stats_lk));			// 참값 <= 마스킹 기준값 인 갯수
							infoMap.put("eq_sca_cnt", (infoMap.get("eq_sca_cnt") + stats_sk)); 			// 공표값 = 마스킹 기준값 인 갯수
							infoMap.put("le_org_sum", (infoMap.get("le_org_sum") + stats_d1));			// 참값 <= 마스킹 기준값 인 참값 합
							infoMap.put("le_sca_sum", (infoMap.get("le_sca_sum") + stats_d2));			// 참값 <= 마스킹 기준값 인 공표값 합						
							infoMap.put("gt_org_sum", (infoMap.get("gt_org_sum") + stats_dd1z));		// 참값 > 마스킹 기준값 인 참값 합					
						}
					}
				}				
			}
			
			// 리턴값 생성
			HashMap<String, Object> rstRowMap = null;
			int totBsca = 0;
			
			// 년도별 bsca 처리
			if("Y".equals(wFlag) || "A".equals(wFlag)) {			
				ArrayList rstYear = new ArrayList();
				for (String kCd : dataMapYear.keySet()) {
					infoMap = dataMapYear.get(kCd);
	
					rstRowMap = new HashMap<>();
					rstRowMap.put("K", infoMap.get("le_org_cnt")); 			// 참값 <= 마스킹 기준값 인 갯수
					rstRowMap.put("k", infoMap.get("eq_sca_cnt")); 			// 공표값 = 마스킹 기준값 인 갯수
					rstRowMap.put("d1", infoMap.get("le_org_sum")); 		// 참값 <= 마스킹 기준값 인 참값 합
					rstRowMap.put("d2", infoMap.get("le_sca_sum")); 		// 참값 <= 마스킹 기준값 인 공표값 합
					rstRowMap.put("dd1z", infoMap.get("gt_org_sum")); 		// 참값 > 마스킹 기준값 인 참값 합				
					totBsca = ServiceAreaBSCA.bsca(rstRowMap, refVal); 
					
					// 기존 통계쿼리와 select절 다르지않게
					HashMap rtMap = new HashMap();
					rtMap.put("base_year", kCd);
					rtMap.put("grid_cnt", grid_num);
					rtMap.put("grid_area", grid_area);
					rtMap.put(rt_col_tot_byYear, totBsca);
					rtMap.put(rt_col_avg, Math.round(((double)totBsca / (double)grid_num)*10)/10.0);
					
					rstYear.add(rtMap);				
				}
				
				rstMap.put("byYear", rstYear);
			}

			// 그리드별 bsca 처리
			if("G".equals(wFlag) || "A".equals(wFlag)) {
				ArrayList rstGrid = new ArrayList();
				for (String kCd : dataMapGrid.keySet()) {
					infoMap = dataMapGrid.get(kCd);
	
					rstRowMap = new HashMap<>();
					rstRowMap.put("K", infoMap.get("le_org_cnt")); 			// 참값 <= 마스킹 기준값 인 갯수
					rstRowMap.put("k", infoMap.get("eq_sca_cnt")); 			// 공표값 = 마스킹 기준값 인 갯수
					rstRowMap.put("d1", infoMap.get("le_org_sum")); 		// 참값 <= 마스킹 기준값 인 참값 합
					rstRowMap.put("d2", infoMap.get("le_sca_sum")); 		// 참값 <= 마스킹 기준값 인 공표값 합
					rstRowMap.put("dd1z", infoMap.get("gt_org_sum")); 		// 참값 > 마스킹 기준값 인 참값 합				
					totBsca = ServiceAreaBSCA.bsca(rstRowMap, refVal); 
					
					// 기존 통계쿼리와 select절 다르지않게
					HashMap rtMap = new HashMap();
					rtMap.put("adm_cd", kCd);
					rtMap.put("adm_nm", kCd);
					rtMap.put(rt_col_tot_byGrid, totBsca);
					rtMap.put("base_year", base_year);		// 사용하는곳 없으면 지울 것
					
					rstGrid.add(rtMap);
				}
	
				rstMap.put("byGrid", rstGrid);
			}
			
			// 조건별 통계 보기(년도별) bsca 처리
			if("C".equals(wFlag)) {	
				ArrayList rstChartr = new ArrayList();
				for (String kCd : dataMapYear.keySet()) {
					infoMap = dataMapYear.get(kCd);
	
					rstRowMap = new HashMap<>();
					rstRowMap.put("K", infoMap.get("le_org_cnt")); 			// 참값 <= 마스킹 기준값 인 갯수
					rstRowMap.put("k", infoMap.get("eq_sca_cnt")); 			// 공표값 = 마스킹 기준값 인 갯수
					rstRowMap.put("d1", infoMap.get("le_org_sum")); 		// 참값 <= 마스킹 기준값 인 참값 합
					rstRowMap.put("d2", infoMap.get("le_sca_sum")); 		// 참값 <= 마스킹 기준값 인 공표값 합
					rstRowMap.put("dd1z", infoMap.get("gt_org_sum")); 		// 참값 > 마스킹 기준값 인 참값 합				
					totBsca = ServiceAreaBSCA.bsca(rstRowMap, refVal); 
					
					// 기존 통계쿼리와 select절 다르지않게
					HashMap rtMap = new HashMap();
					rtMap.put("base_year", kCd);
					//SGIS4_1025_생활권역 시작
					rtMap.put("grp_id", kCd);
					rtMap.put("grp_nm", nameMap.get(kCd));
					//SGIS4_1025_생활권역 끝					
					
					rtMap.put(rt_col_tot_byChartr, totBsca);
					
					rstChartr.add(rtMap);				
				}
				
				rstMap.put("byChartr", rstChartr);
			}			
		}

		return rstMap;
	}
	
	public static String convertGridCd(String gCd, String gLvl) {
		// gCd : 100m 격자 코드
		
		String rstGridCd = gCd;
		if(gCd != null && gCd.length() >= 8) {
			if("500m".equals(gLvl)) {
				rstGridCd = gCd.substring(0,4);
				
				String tmpStr = gCd.substring(4,5);				
				if(tmpStr.matches("[01234]")) {
					rstGridCd = rstGridCd + "a";
				}else{
					rstGridCd = rstGridCd + "b";
				}
				
				rstGridCd = rstGridCd + gCd.substring(5,7);

				tmpStr = gCd.substring(7,8);				
				if(tmpStr.matches("[01234]")) {
					rstGridCd = rstGridCd + "a";
				}else{
					rstGridCd = rstGridCd + "b";
				}				
			}else if("1k".equals(gLvl)) {
				rstGridCd = gCd.substring(0,4) + gCd.substring(5,7);
			}
		}
		
		return rstGridCd;		
	}
}
