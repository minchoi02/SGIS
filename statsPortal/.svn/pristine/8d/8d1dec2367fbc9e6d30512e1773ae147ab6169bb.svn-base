package kostat.sop.ServiceAPI.api.workRoad.viewJobs;


import java.math.BigDecimal;
import java.math.BigInteger;
//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선.
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 구인정보 목록 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.09.13	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectJobInfoList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectJobInfoList.class);

	@Override
	public String getApiId() {
		return "112001";
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
		sido_cd,		// 시도 코드
	}

	enum OptionParam{
		page_num,		// 페이지 번호
		pageSize,		// 페이지 사이즈

		sgg_cd,			// 시군구 코드
		
		INDUSTRY_CLASSIFICATION,	// 산업분류
		JOB_CLASSIFICATION,		// 직종분류
		SALARY_LEVEL,				// 급여수준
//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
		SALARY_LEVEL2,				// 급여수준
//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
		COMPANY_NAME,				// 기업형태
//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
		COMPANY_TYPE,				// 기업형태
		COMPANY_SIZE,				// 회사규모
		EMPLOYMENT_TYPE,			// 고용형태
		WORK_TYPE,			// 근무형태
		ACADEMIC_ABILITY,			// 학력
		CAREER,					// 경력		
//		conditionList,	// [{id, codeList}, {id, codeList}, {id, codeList, wageType} ... ]
//		condition_cd,	// 조건 코드 목록 (콤마로 연결된 문자열)		
//		condition_type,	// 조건 구분 
//						// DESIRED_AREA 희망지역
//						// COMPANY_TYPE 기업형태
//						// INDUSTRY_CLASSIFICATION 산업분류
//						// JOB_CLASSIFICATION 직종분류
//						// SALARY_LEVEL 급여수준
//						// EMPLOYMENT_TYPE 고용형태
//						// ACADEMIC_ABILITY 학력
//						// CAREER 경력
		wageType,		// 임금형태
		
		sortType,		// 정렬 구분 (REG_DT_DESC: 최근 등록순 / CLOS_DT:마감일 오름순 / CLOS_DT_DESC: 마감일 내림순)
		
		mode,			// 데이터 조회 모드 : null - 기본    'POI' - POI 데이터 조회
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			logger.info(">> Parameters =============================== ");
			logger.info("sido_cd : " + req.getParameter("sido_cd"));
			logger.info("sgg_cd : " + req.getParameter("sgg_cd"));
			
			logger.info("INDUSTRY_CLASSIFICATION : " + req.getParameter("INDUSTRY_CLASSIFICATION"));
			logger.info("JOB_CLASSIFICATION : " + req.getParameter("JOB_CLASSIFICATION"));
			logger.info("SALARY_LEVEL : " + req.getParameter("SALARY_LEVEL"));
			logger.info("COMPANY_TYPE : " + req.getParameter("COMPANY_TYPE"));
			logger.info("COMPANY_SIZE : " + req.getParameter("COMPANY_SIZE"));
			logger.info("EMPLOYMENT_TYPE : " + req.getParameter("EMPLOYMENT_TYPE"));
			logger.info("WORK_TYPE : " + req.getParameter("WORK_TYPE"));
			logger.info("ACADEMIC_ABILITY : " + req.getParameter("ACADEMIC_ABILITY"));
			logger.info("CAREER : " + req.getParameter("CAREER"));
			logger.info("wageType : " + req.getParameter("wageType"));			
//			logger.info("conditionList : " + req.getParameter("conditionList"));
//			logger.info("condition_type : " + req.getParameter("condition_type"));
//			logger.info("condition_cd : " + req.getParameter("condition_cd"));
			
			logger.info("sortType : " + req.getParameter("sortType"));
			logger.info("mode : " + req.getParameter("mode"));
			logger.info(">> ========================================== ");
			
			String mode = req.getParameter("mode");
			int pageSize = req.getParameter("pageSize") == null ? 5 : Integer.parseInt(mapParameter.get("pageSize").toString());
			int curPage = req.getParameter("page_num") == null ? 1 : Integer.parseInt(mapParameter.get("page_num").toString());
			
			BigInteger pageSizeBI = BigInteger.valueOf(pageSize);
			BigInteger curPageBI = BigInteger.valueOf(curPage);
			
			BigInteger lastNumBI = pageSizeBI.multiply(curPageBI.subtract(BigInteger.valueOf(1))).add(BigInteger.valueOf(1));
			int lastNum = 0;
			
			//int lastNum = pageSize * (curPage - 1) + 1;
			if (BigInteger.valueOf(Integer.MAX_VALUE).compareTo(lastNumBI) == 1) {
				lastNum = lastNumBI.intValue();
			}
			
			mapParameter.put("page_size", pageSize);
			mapParameter.put("last_num", lastNum);
			mapParameter.put("page_num", curPage);
			
			//----- 콤마로 구분된 조건목록을 배열로 변환 ----------------------------------------
			
			String [] conditionArr = null;
			// 산업분류
			if (mapParameter.containsKey("INDUSTRY_CLASSIFICATION")) {
				conditionArr = ((String) mapParameter.get( "INDUSTRY_CLASSIFICATION" )).split( "," );
				mapParameter.put( "INDUSTRY_CLASSIFICATION", conditionArr );
			}
			// 직종분류
			if (mapParameter.containsKey("JOB_CLASSIFICATION")) {
				conditionArr = ((String) mapParameter.get( "JOB_CLASSIFICATION" )).split( "," );
				mapParameter.put( "JOB_CLASSIFICATION", conditionArr );
			}
			// 급여수준
			if (mapParameter.containsKey("SALARY_LEVEL")) {
				conditionArr = ((String) mapParameter.get( "SALARY_LEVEL" )).split( "," );
				mapParameter.put( "SALARY_LEVEL", conditionArr );
			}
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
			// 급여수준2
			if (mapParameter.containsKey("SALARY_LEVEL2")) {
				conditionArr = ((String) mapParameter.get( "SALARY_LEVEL2" )).split( "," );
				StringBuffer conditionStrBuf = new StringBuffer();
				conditionStrBuf.append("AND ");
				conditionStrBuf.append("( ");
				conditionStrBuf.append("1=2 ");
				List<String> wageTypeList = new ArrayList<String>(); 
				for (String conditionStr : conditionArr) {
					if(conditionStr.lastIndexOf("_") >= 0) {
						String conditionStr1 = conditionStr.substring(0,conditionStr.lastIndexOf("_"));
						String conditionStr2 = conditionStr.substring(conditionStr.lastIndexOf("_")+1);
						if("WAGETY".equals(conditionStr1)) {
							wageTypeList.add(conditionStr2);
						}
						else if(conditionStr1.startsWith("WGTY")) {
							String conditionStr3 = conditionStr1.substring(conditionStr1.lastIndexOf("_")+1);
							if(wageTypeList.contains(conditionStr3)) {
								Map<String,Object> tempParameter = new HashMap<String,Object>();
								tempParameter.put("b_class_cd", conditionStr1);
								tempParameter.put("s_class_cd", conditionStr2);
								Map tempMap = session.selectOne("workRoad.selectCommonCode",tempParameter);
								if(tempMap != null) {
									String lvTempCd = StringUtil.isNullToString(tempMap.get("cd"));
									String lvTempNm = StringUtil.isNullToString(tempMap.get("nm"));
									String lvTempExp = StringUtil.isNullToString(tempMap.get("exp"));
									if(!"".equals(lvTempCd)) {
										BigDecimal lvTempSalaryFromBigDecimal = new BigDecimal(0.0);
										BigDecimal lvTempSalaryToBigDecimal = new BigDecimal(1000000000000.0);
										double lvTempSalaryFromDouble = 0.0;
										double lvTempSalaryToDouble = 1000000000000.0;
										String[] lvTempSalaryList = lvTempExp.split("~");
										if(lvTempSalaryList.length == 1 || lvTempSalaryList.length == 2) {
											lvTempSalaryFromDouble = StringUtil.zeroConvert(lvTempSalaryList[0]);
											lvTempSalaryFromBigDecimal = new BigDecimal(StringUtil.zeroConvert(lvTempSalaryList[0]));
											if(lvTempSalaryList.length == 2 && StringUtil.zeroConvert(lvTempSalaryList[1]) != 0) {
												lvTempSalaryToDouble = StringUtil.zeroConvert(lvTempSalaryList[1]);
												lvTempSalaryToBigDecimal = new BigDecimal(StringUtil.zeroConvert(lvTempSalaryList[1]));
											}
											conditionStrBuf.append("OR ( ");
											conditionStrBuf.append("T.WAGE_TYPE = '"+conditionStr3+"' ");
											conditionStrBuf.append("AND T.SALARY BETWEEN "+lvTempSalaryFromBigDecimal+" AND "+lvTempSalaryToBigDecimal+" ");
											conditionStrBuf.append(") ");
										}
									}
								}
							}
						}
					}
				}
				conditionStrBuf.append(")");
				mapParameter.put( "SALARY_LEVEL2", conditionStrBuf.toString() );
			}
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
			//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
			// 기업명
			if (mapParameter.containsKey("COMPANY_NAME")) {
				String COMPANY_NAME = StringUtil.isNullToString(mapParameter.get("COMPANY_NAME"));
				COMPANY_NAME = COMPANY_NAME.trim();
				COMPANY_NAME = COMPANY_NAME.replaceAll(" ", "%");
				COMPANY_NAME = COMPANY_NAME.replaceAll("\\'", "''");
				mapParameter.put( "COMPANY_NAME", COMPANY_NAME );
			}
			//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
			// 기업형태
			if (mapParameter.containsKey("COMPANY_TYPE")) {
				conditionArr = ((String) mapParameter.get( "COMPANY_TYPE" )).split( "," );
				mapParameter.put( "COMPANY_TYPE", conditionArr );
			}
			// 회사규모
			if (mapParameter.containsKey("COMPANY_SIZE")) {
				conditionArr = ((String) mapParameter.get( "COMPANY_SIZE" )).split( "," );
				mapParameter.put( "COMPANY_SIZE", conditionArr );
			}
			// 고용형태
			if (mapParameter.containsKey("EMPLOYMENT_TYPE")) {
				conditionArr = ((String) mapParameter.get( "EMPLOYMENT_TYPE" )).split( "," );
				mapParameter.put( "EMPLOYMENT_TYPE", conditionArr );
			}
			// 근무형태
			if (mapParameter.containsKey("WORK_TYPE")) {
				conditionArr = ((String) mapParameter.get( "WORK_TYPE" )).split( "," );
				mapParameter.put( "WORK_TYPE", conditionArr );
			}
			// 학력
			if (mapParameter.containsKey("ACADEMIC_ABILITY")) {
				conditionArr = ((String) mapParameter.get( "ACADEMIC_ABILITY" )).split( "," );
				mapParameter.put( "ACADEMIC_ABILITY", conditionArr );
			}
			// 경력
			if (mapParameter.containsKey("CAREER")) {
				conditionArr = ((String) mapParameter.get( "CAREER" )).split( "," );
				mapParameter.put( "CAREER", conditionArr );
			}
			
			//----- End of 콤마로 구분된 조건목록을 배열로 변환 ---------------------------------
			
			
//			if (mapParameter.containsKey("conditionList")) {
//				List<Map> conditionList = (List<Map>) mapParameter.get("conditionList");
//				for (int i = 0; i < conditionList.size(); i++) {
//					Map condition = conditionList.get(i);
//					
//					List<String> codeList = (List<String>)condition.get("codeList");
//					String[] codeArr = codeList.toArray(new String[codeList.size()]);
////					String codeArr = "";
////					for (int j = 0; j < codeList.size(); j++) {
////						if (j == 0) {
////							codeArr = codeList.get(j);
////						} else {
////							codeArr += "," + codeList.get(j);
////						}
////					}
//					mapParameter.put(condition.get("id").toString() + "_CODE", codeArr );
//					
//					if (condition.get("id").toString().equals("WAGE_TYPE")) {
//						mapParameter.put("wage_type", condition.get("wageType")); 
//					}
//				}				
//			}
			
//			if ( mapParameter.containsKey( "condition_type" ) && mapParameter.containsKey( "condition_cd" ))
//			{
//				String [] conditionArr = ((String) mapParameter.get( "condition_cd" )).split( "," );
//				mapParameter.put( OptionParam.condition_cd.name(), conditionArr );
//			}	
			
			// 최신 데이터 작성일 조회
			String latestRegDate = session.selectOne("wrViewJobs.getLatestRegDate");
			mapParameter.put("latest_reg_date", latestRegDate);
			
			if (mode != null && mode.equals("POI")) {
				
				mapParameter.remove("last_num");
				List<Map> jobPOIList = session.selectList("wrViewJobs.selectJobInfoList", mapParameter);
				resultData.put("poiList", jobPOIList);
				
			} else {

				// 선택된 조건의 구인정보 목록 갯수 조회
				mapParameter.put("total_count", "Y");
				List<Map> cntList = session.selectList("wrViewJobs.selectJobInfoList", mapParameter);
				int totalCount = (int) cntList.get(0).get("cnt");
				
				try {
					// 임시: srv_dt_job_sm 테이블에 jo_auth_no 필드가 존재하는지 검사 - 2018.12.26	ywKim	추가
					String jo_auth_no = session.selectOne("wrViewJobs.jo_auth_no_exists", mapParameter);
					mapParameter.put("jo_auth_no_exists", "Y");
				} catch (Exception e) {
					logger.error(e);
				}
				
				// 구인정보 목록 조회
				mapParameter.remove("total_count");
				List<Map> jobInfoList = session.selectList("wrViewJobs.selectJobInfoList", mapParameter);
					
				// 선택된 지역의 구인정보 목록 갯수 조회 (지역이외의 조건 무시)
				mapParameter.put("total_count", "Y");
				mapParameter.remove("jo_auth_no_exists");
				mapParameter.remove("wageType");
				mapParameter.remove("INDUSTRY_CLASSIFICATION");
				mapParameter.remove("JOB_CLASSIFICATION");
				mapParameter.remove("SALARY_LEVEL");
				mapParameter.remove("COMPANY_TYPE");
				mapParameter.remove("COMPANY_SIZE");
				mapParameter.remove("EMPLOYMENT_TYPE");
				mapParameter.remove("WORK_TYPE");
				mapParameter.remove("ACADEMIC_ABILITY");
				mapParameter.remove("CAREER");
				List<Map> areaCntList = session.selectList("wrViewJobs.selectJobInfoList", mapParameter);
				int totalAreaCount = (int) areaCntList.get(0).get("cnt");

				resultData.put("dataList", jobInfoList);
				resultData.put("total_count", totalCount);
				resultData.put("total_area_count", totalAreaCount);
				resultData.put("pageSize", pageSize);
				resultData.put("curPage", curPage);
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
			
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return resultData;
	}
}
