//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석)
package kostat.sop.ServiceAPI.api.workRoad.statusAnls;

import java.math.BigDecimal;
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
import kostat.sop.ServiceAPI.common.util.DateUtil;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetStatusAnlsAll extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(GetStatusAnlsAll.class);
	
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
		industClass,
		industClassAllYn,
		jobClass,
		jobClassAllYn,
		enterpriseType,
		enterpriseTypeAllYn,
		employmentType,
		employmentTypeAllYn,
		wagetyType,
		wagetyTypeAllYn,
		educationLevel,
		educationLevelAllYn,
		careerLevel,
		careerLevelAllYn,
		resultType,
		coor_x,	//20181112 추가_손원웅
		coor_y
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "113008";
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
			
			//업종
			String industClass = (String) mapParameter.get(OptionParam.industClass.name());
			String [] industClassList = null;
			if(industClass != null && !industClass.equals("")){
				industClassList = industClass.split(",");
			}			
			mapParameter.put("industClassList", industClassList);
			
			//직종
			String jobClass = (String) mapParameter.get(OptionParam.jobClass.name());
			String [] jobClassList = null;
			if(jobClass != null && !jobClass.equals("")){
				jobClassList = jobClass.split(",");
			}			
			mapParameter.put("jobClassList", jobClassList);
			
			//기업형태
			String enterpriseType = (String) mapParameter.get(OptionParam.enterpriseType.name());
			String [] enterpriseTypeList = null;
			if(enterpriseType != null && !enterpriseType.equals("")){
				enterpriseTypeList = enterpriseType.split(",");
			}			
			mapParameter.put("enterpriseTypeList", enterpriseTypeList);
			
			//고용형태
			String employmentType = (String) mapParameter.get(OptionParam.employmentType.name());
			String [] employmentTypeList = null;
			if(employmentType != null && !employmentType.equals("")){
				employmentTypeList = employmentType.split(",");
			}			
			mapParameter.put("employmentTypeList", employmentTypeList);
			
			//임금수준
			String lvWagetyType = StringUtil.isNullToString(mapParameter.get("wagetyType"));
			mapParameter.put("wagetyType",""); //변수초기화
			if (!"".equals(lvWagetyType)) {
				String[] conditionArr = lvWagetyType.split( "," );
				StringBuffer conditionStrBuf = new StringBuffer();
				conditionStrBuf.append("and ");
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
									//String lvTempNm = StringUtil.isNullToString(tempMap.get("nm"));
									String lvTempExp = StringUtil.isNullToString(tempMap.get("exp"));
									if(!"".equals(lvTempCd)) {
										BigDecimal lvTempSalaryFromBigDecimal = new BigDecimal(0.0);
										BigDecimal lvTempSalaryToBigDecimal = new BigDecimal(1000000000000.0);
										//double lvTempSalaryFromDouble = 0.0;
										//double lvTempSalaryToDouble = 1000000000000.0;
										String[] lvTempSalaryList = lvTempExp.split("~");
										if(lvTempSalaryList.length == 1 || lvTempSalaryList.length == 2) {
											//lvTempSalaryFromDouble = StringUtil.zeroConvert(lvTempSalaryList[0]);
											lvTempSalaryFromBigDecimal = new BigDecimal(StringUtil.zeroConvert(lvTempSalaryList[0]));
											if(lvTempSalaryList.length == 2 && StringUtil.zeroConvert(lvTempSalaryList[1]) != 0) {
												//lvTempSalaryToDouble = StringUtil.zeroConvert(lvTempSalaryList[1]);
												lvTempSalaryToBigDecimal = new BigDecimal(StringUtil.zeroConvert(lvTempSalaryList[1]));
											}
											conditionStrBuf.append("or ( ");
											conditionStrBuf.append("a.wage_type = '"+conditionStr3+"' ");
											conditionStrBuf.append("and a.salary between "+lvTempSalaryFromBigDecimal+" and "+lvTempSalaryToBigDecimal+" ");
											conditionStrBuf.append(") ");
										}
									}
								}
							}
						}
					}
				}
				conditionStrBuf.append(")");
				mapParameter.put( "wagetyType", conditionStrBuf.toString() );
			}
			
			//요구학력
			String educationLevel = (String) mapParameter.get(OptionParam.educationLevel.name());
			String [] educationLevelList = null;
			if(educationLevel != null && !educationLevel.equals("")){
				educationLevelList = educationLevel.split(",");
			}			
			mapParameter.put("educationLevelList", educationLevelList);
			
			//요구경력
			String careerLevel = (String) mapParameter.get(OptionParam.careerLevel.name());
			String [] careerLevelList = null;
			if(careerLevel != null && !careerLevel.equals("")){
				careerLevelList = careerLevel.split(",");
			}			
			mapParameter.put("careerLevelList", careerLevelList);
			
			//기간
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
			
			result = session.selectList("wrStatusAnls.getStatusAnlsAll", mapParameter);
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
