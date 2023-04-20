package kostat.sop.ServiceAPI.api.workRoad.statusAnls;

import java.util.ArrayList;
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
import kostat.sop.ServiceAPI.common.util.DateUtil; //2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetStatusAnlsWageType extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(GetStatusAnlsWageType.class);
	
	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		adm_cd,
		gender,
		low_search,
		area,
		age_from,
		age_to,
		edu_level,
		mrg_state,
		accessToken,
		bnd_year,
		area_type,
		zoom, //mng_s
		bnd_grid, //mng_s 20180220
		today,
		sido_cd,
		sgg_cd,
		detail_type,
		term,
		wageType,
		resultType,
		salary,
		//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 START
		wagety2, // 임금수준 (복수처리 문자열)
		//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 END
		coor_x,		// 2018.11.13	ywKim - 이곳에서는 사용하지 않고 Callback 함수에서 사용됨	
		coor_y,
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "113005";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();	
		List result =  new ArrayList();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			//2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START
			String today = StringUtil.isNullToString(mapParameter.get("today"));
			String term = StringUtil.isNullToString(mapParameter.get("term"));
			String term_from = "";
			String term_to = "";
			if(term.indexOf("D") >= 0) {
				int termNum = StringUtil.zeroConvert(term.replaceAll("D", ""));
				term_from = DateUtil.addDay(today, -(termNum));
				term_to = today;
				today = "";
			}
			else if (term.indexOf("W") >= 0) {
				int termNum = StringUtil.zeroConvert(term.replaceAll("W", ""));
				term_from = DateUtil.addDay(today, -(termNum*7));
				term_to = today;
				today = "";
			}
			else if (term.indexOf("M") >= 0) {
				int termNum = StringUtil.zeroConvert(term.replaceAll("M", ""));
				term_from = DateUtil.addMonth(today, -(termNum));
				term_to = today;
				today = "";
			}
			else if (term.indexOf("Y") >= 0) {
				int termNum = StringUtil.zeroConvert(term.replaceAll("Y", ""));
				term_from = DateUtil.addYear(today, -(termNum));
				term_to = today;
				today = "";
			}
			if(!"".equals(term_from)) mapParameter.put("term_from", term_from);
			if(!"".equals(term_to)) mapParameter.put("term_to", term_to);
			mapParameter.put("today", today);
			//2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END
			
			//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 START
			String lvWagety2 = StringUtil.isNullToString(mapParameter.get("wagety2"));
			mapParameter.put("wagety2",""); //변수초기화
			if (!"".equals(lvWagety2)) {
				String[] conditionArr = lvWagety2.split( "," );
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
								String lvTempSalary = "";
								//시급 하드코딩 맵핑
								if("H".equals(conditionStr3)) {
									if("01".equals(conditionStr2)) lvTempSalary = "6900";
									else if("02".equals(conditionStr2)) lvTempSalary = "7000";
									else if("03".equals(conditionStr2)) lvTempSalary = "8000";
									else if("04".equals(conditionStr2)) lvTempSalary = "9000";
									else if("05".equals(conditionStr2)) lvTempSalary = "10000";
								}
								//일급 하드코딩 맵핑
								else if("D".equals(conditionStr3)) {
									if("01".equals(conditionStr2)) lvTempSalary = "59000";
									else if("02".equals(conditionStr2)) lvTempSalary = "60000";
									else if("03".equals(conditionStr2)) lvTempSalary = "70000";
									else if("04".equals(conditionStr2)) lvTempSalary = "80000";
									else if("05".equals(conditionStr2)) lvTempSalary = "90000";
									else if("06".equals(conditionStr2)) lvTempSalary = "100000";
									/*<option value="59000">6만원 미만</option>
		                        	<option value="60000">6 ~ 7만원 미만</option>
		                        	<option value="70000">7 ~ 8만원 미만</option>
		                        	<option value="80000">8 ~ 9만원 미만</option>
		                        	<option value="90000">9 ~ 10만원 미만</option>
		                        	<option value="100000">10만원 이상</option>*/
								}
								//월급 하드코딩 맵핑
								else if("M".equals(conditionStr3)) {
									if("01".equals(conditionStr2)) lvTempSalary = "840000";
									else if("02".equals(conditionStr2)) lvTempSalary = "850000";
									else if("03".equals(conditionStr2)) lvTempSalary = "1500000";
									else if("04".equals(conditionStr2)) lvTempSalary = "2500000";
									else if("05".equals(conditionStr2)) lvTempSalary = "3500000";
									else if("06".equals(conditionStr2)) lvTempSalary = "4500000";
									else if("07".equals(conditionStr2)) lvTempSalary = "5500000";
									else if("08".equals(conditionStr2)) lvTempSalary = "6500000";
									else if("09".equals(conditionStr2)) lvTempSalary = "8000000";
									else if("10".equals(conditionStr2)) lvTempSalary = "10000000";
									/*<option value="840000">85만원 미만</option>
		                        	<option value="850000">85 ~ 150만원 미만</option>
		                        	<option value="1500000">150 ~ 250만원 미만</option>
		                        	<option value="2500000">250 ~ 350만원 미만</option>
		                        	<option value="3500000">350 ~ 450만원 미만</option>
		                        	<option value="4500000">450 ~ 550만원 미만</option>
		                        	<option value="5500000">550 ~ 650만원 미만</option>
		                        	<option value="6500000">650 ~ 800만원 미만</option>
		                        	<option value="8000000">800 ~ 1,000만원 미만</option>
		                        	<option value="10000000">1,000만원 이상</option>*/
								}
								//연봉 하드코딩 맵핑
								else if("Y".equals(conditionStr3)) {
									if("01".equals(conditionStr2)) lvTempSalary = "14000000";
									else if("02".equals(conditionStr2)) lvTempSalary = "15000000";
									else if("03".equals(conditionStr2)) lvTempSalary = "20000000";
									else if("04".equals(conditionStr2)) lvTempSalary = "25000000";
									else if("05".equals(conditionStr2)) lvTempSalary = "30000000";
									else if("06".equals(conditionStr2)) lvTempSalary = "35000000";
									else if("07".equals(conditionStr2)) lvTempSalary = "40000000";
									else if("08".equals(conditionStr2)) lvTempSalary = "50000000";
									else if("09".equals(conditionStr2)) lvTempSalary = "60000000";
									else if("10".equals(conditionStr2)) lvTempSalary = "80000000";
									else if("11".equals(conditionStr2)) lvTempSalary = "100000000";
									/*<option value="14000000">1500만원 미만</option>
		                        	<option value="15000000">1500 ~ 2000만원 미만</option>
		                        	<option value="20000000">2000 ~ 2500만원 미만</option>
		                        	<option value="25000000">2500 ~ 3000만원 미만</option>
		                        	<option value="30000000">3000 ~ 3500만원 미만</option>
		                        	<option value="35000000">3500 ~ 4000만원 미만</option>
		                        	<option value="40000000">4000 ~ 5000만원 미만</option>
		                        	<option value="50000000">5000 ~ 6000만원 미만</option>
		                        	<option value="60000000">6000 ~ 8000만원 미만</option>                        	
		                        	<option value="80000000">8000 ~ 1억 미만</option>
		                        	<option value="100000000">1억 이상</option>*/
								}
								conditionStrBuf.append("OR ( ");
								conditionStrBuf.append("wage_type = '"+conditionStr3+"' ");
								conditionStrBuf.append("AND salary = '"+lvTempSalary+"' ");
								conditionStrBuf.append(") ");
							}
						}
					}
				}
				conditionStrBuf.append(")");
				mapParameter.put( "wagety2", conditionStrBuf.toString() );
			}
			//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 END
			
			// 임금형태 배열 생성
			/*String wageType = (String) mapParameter.get(OptionParam.wageType.name());
			String [] wageTypeList = null;
			if(wageType != null && !wageType.equals("")){
				wageTypeList = wageType.split(",");
			}			
			mapParameter.put("wageTypeList", wageTypeList);*/
			
			// 임금구간 배열 생성
			/*String salary = (String) mapParameter.get(OptionParam.salary.name());
			String [] salaryList = null;
			if(salary != null && !salary.equals("")){
				salaryList = salary.split(",");
			}			
			mapParameter.put("salaryList", salaryList);*/
			
			
			result = session.selectList("wrStatusAnls.getStatusAnlsWageType", mapParameter);
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
		return result;
	}
	
}
