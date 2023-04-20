package kostat.sop.ServiceAPI.api.workRoad.viewJobs;


import java.math.BigInteger;
//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
import java.math.BigDecimal;
import java.util.ArrayList;
//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
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
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기  <p>
 * 			시도별, 시군구별 구인건수 조회
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2019.01.25	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class GetJobCount extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetJobCount.class);

	@Override
	public String getApiId() {
		return "112011";
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
	}

	enum OptionParam{
		sido_cd,		// 시도 코드
		today,			// 최신 데이터 작성일
//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
		sgg_cd,			// 시군구 코드
		
		INDUSTRY_CLASSIFICATION,	// 산업분류
		JOB_CLASSIFICATION,		// 직종분류
		SALARY_LEVEL,				// 급여수준
		SALARY_LEVEL2,				// 급여수준
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
		
		/* 안쓰는데 공통 파라미터라서 추가 */
		page_num,		// 페이지 번호
		pageSize,		// 페이지 사이즈
		
		sortType,		// 정렬 구분 (REG_DT_DESC: 최근 등록순 / CLOS_DT:마감일 오름순 / CLOS_DT_DESC: 마감일 내림순)
		
		mode			// 데이터 조회 모드 : null - 기본    'POI' - POI 데이터 조회
//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
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
			logger.info("today : " + req.getParameter("today"));
			logger.info(">> ========================================== ");

			String sido = req.getParameter("sido_cd");
			String latestRegDate = req.getParameter("today");
			
			// 최신 데이터 작성일 조회
			if (latestRegDate == null) {
				latestRegDate = session.selectOne("wrViewJobs.getLatestRegDate");
			}
			mapParameter.put("latest_reg_date", latestRegDate);
			
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
			// 기업명
			if (mapParameter.containsKey("COMPANY_NAME")) {
				String COMPANY_NAME = StringUtil.isNullToString(mapParameter.get("COMPANY_NAME"));
				COMPANY_NAME = COMPANY_NAME.trim();
				COMPANY_NAME = COMPANY_NAME.replaceAll(" ", "%");
				COMPANY_NAME = COMPANY_NAME.replaceAll("\\'", "''");
				mapParameter.put( "COMPANY_NAME", COMPANY_NAME );
			}
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
			
			List<Map> dataList = null;
			
			if (sido == null || "all".equals(sido)) {
				dataList = session.selectList("wrViewJobs.selectSidoJobCount", mapParameter);
			} else {
				dataList = session.selectList("wrViewJobs.selectSggJobCount", mapParameter);
			}
			
			resultData.put("dataList", dataList);
			
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
