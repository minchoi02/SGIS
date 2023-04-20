package kostat.sop.ServiceAPI.api.mn.useCurrentState;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.mn.useCurrentState.mapper.UseCurrentStateDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class UseCurrentState extends AbsAuth<Map>{
	private static final Logger logger = Logger.getLogger(UseCurrentState.class);
	@Resource
	private UseCurrentStateDao useCurrentStateDao;
	@Override
	public String getApiId() {
		return "useCurrentState";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "";
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		Map paramMap=getParameterMap(req);
		System.out.println("start biz logic");
		
		/*
		 * gubun값
		 * totalUseStat : 총괄페이지 뷰
		 *
		*/
		try {

			//총괄페이지 기본 데이터
			if("totUseStat".equals(paramMap.get("gubun"))){
				
				
			    Calendar cDateCal = new GregorianCalendar(Locale.KOREA);
			    
			    SimpleDateFormat fym = new SimpleDateFormat("yyyyMM");
			    SimpleDateFormat fy = new SimpleDateFormat("yyyy");
			    Date date;
				try {
					
					cDateCal.add(Calendar.MONTH, -1);
					
					String yearMonth = fym.format(cDateCal.getTime());
					
					String year = yearMonth.substring(0,4);
					date = fym.parse(yearMonth);

					
					cDateCal.add(Calendar.YEAR, -1);	
					String beforeYearMonth = fym.format(cDateCal.getTime());		//작년동월
					String beforeYear = fy.format(cDateCal.getTime());				//작년
					
					cDateCal.setTime(date);
					cDateCal.add(Calendar.MONTH, -1);	//전월
					String beforeMonth = fym.format(cDateCal.getTime());
					
					paramMap.put("yearMonth", yearMonth);
					paramMap.put("year", year);
					paramMap.put("beforeYearMonth", beforeYearMonth);
					paramMap.put("beforeYear", beforeYear);
					paramMap.put("beforeMonth", beforeMonth);
					
					
				} catch (ParseException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
				
				
				
				
				paramMap = useCurrentStateDao.totUseStat(paramMap);
				return paramMap;
			//총괄페이지 그래프데이터
			}else if("getTotStatView_new".equals(paramMap.get("gubun"))){
				 Calendar cDateCal = new GregorianCalendar(Locale.KOREA);
				    
				    SimpleDateFormat fym = new SimpleDateFormat("yyyyMM");
				    SimpleDateFormat fy = new SimpleDateFormat("yyyy");
				    Date date;
					try {
						
						cDateCal.add(Calendar.MONTH, -1);
						
						String yearMonth = fym.format(cDateCal.getTime());
						
						String year = yearMonth.substring(0,4);
						date = fym.parse(yearMonth);

						
						cDateCal.add(Calendar.YEAR, -1);	
						String beforeYearMonth = fym.format(cDateCal.getTime());		//작년동월
						String beforeYear = fy.format(cDateCal.getTime());				//작년
						
						cDateCal.setTime(date);
						cDateCal.add(Calendar.MONTH, -1);	//전월
						String beforeMonth = fym.format(cDateCal.getTime());
						
						paramMap.put("yearMonth", yearMonth);
						paramMap.put("year", year);
						paramMap.put("beforeYearMonth", beforeYearMonth);
						paramMap.put("beforeYear", beforeYear);
						paramMap.put("beforeMonth", beforeMonth);
						
						
					} catch (ParseException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					
					paramMap = useCurrentStateDao.getTotStatView_new(paramMap);
					return paramMap;
			}else if("getTotPageViewGraph".equals(paramMap.get("gubun"))){
				paramMap = useCurrentStateDao.getTotPageViewGraph(paramMap);
				return paramMap;
			}
			//총괄페이지 팝업검색
			else if("getTotStatPopupView".equals(paramMap.get("gubun"))){
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("yearMonth2", paramMap.get("year2").toString() + paramMap.get("month2").toString()); 
				
				paramMap = useCurrentStateDao.getTotStatPopupView(paramMap);
				return paramMap;
			}
			//서비스별 이용현황
			else if("getServiceUseView".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				
				
				paramMap = useCurrentStateDao.getServiceUseView(paramMap);
				return paramMap;
			}
			
			//서비스별 이용현황2
			else if("getServiceUseView2".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				
				
				paramMap = useCurrentStateDao.getServiceUseView2(paramMap);
				return paramMap;
			}
			
			//대화형통계지도 인기검색조건
			else if("getPopSearchCondiView".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				
				paramMap = useCurrentStateDao.getPopSearchCondiView(paramMap);
				return paramMap;
			}
			
			//통계주제도 이용현황 메뉴별
			else if("getMenuView".equals(paramMap.get("gubun"))){
				
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				
				if("L0".equals(paramMap.get("type"))){
					paramMap.put("type2", "K1");
				}
				
				paramMap = useCurrentStateDao.getMenuView(paramMap);
				
				return paramMap;
			}
			
			//통계주제도 주제도별 이용현황
			else if("getThemaCondi".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getThemaCondi(paramMap);
				return paramMap;
			}
			
			
			//살고싶은 우리동네 이용현황 인기지표
			else if("getPopCondi".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getPopCondi(paramMap);
				return paramMap;
			}
			
			
			
			//살고싶은 우리동네 이용현황 인기지표조합(추천지역찾기)
			else if("getPopCondiMix".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getPopCondiMix(paramMap);
				return paramMap;
			}
			
			
			//살고싶은 우리동네 인기관심지역
			else if("getInterestArea".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getInterestArea(paramMap);
				return paramMap;
			}
			
			//생활업종지도 이용현황 인기검색업종
			else if("getPopSearchTheme".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getPopSearchTheme(paramMap);
				return paramMap;
			}
			
			//통계커뮤니티맵 신규 통계 커뮤니티맵
			else if("getNewStatCommUseStat".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getNewStatCommUseStat(paramMap);
				return paramMap;
			}
			
			
			//대화형통계지도 이용현황
			else if("getIntHighFunUseStat".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getIntHighFunUseStat(paramMap);
				return paramMap;
			}
			
			
			//생활업종지도 인기POI
			else if("getBizStatintPoi".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getBizStatintPoi(paramMap);
				return paramMap;
			}
			
			
			
			//생활업종지도 인기검색조건
			else if("getBizStatIntSear".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getBizStatIntSear(paramMap);
				return paramMap;
			}
			
			
			
			//통계커뮤니티맵 인기커뮤니티맵
			else if("getIntCommMap".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getIntCommMap(paramMap);
				return paramMap;
			}
			
			
			
			//모바일이용현황 통계커뮤니티맵 모바일 이용
			else if("getStatCommMobilUse".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getStatCommMobilUse(paramMap);
				return paramMap;
			}
			
			
			//살고싶은 우리동네 이용현황
			else if("gethousePoiSear".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.gethousePoiSear(paramMap);
				return paramMap;
			}
			
			//SGIS플러스 이용현황 도보기2(일별검색)
			else if("getTotStatPopupView2".equals(paramMap.get("gubun"))){
				
				
				paramMap.put("year", paramMap.get("year").toString().replaceAll("-", "")); 
				paramMap.put("year2", paramMap.get("year2").toString().replaceAll("-", "")); 
				
				paramMap = useCurrentStateDao.getTotStatPopupView2(paramMap);
				return paramMap;
			}
			
			//통계갤러리 이용현황
			else if("getGalleryUseStat".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getGalleryUseStat(paramMap);
				return paramMap;
			}
			
			//정책통계지도 메뉴별이용현황
			else if("getPolicyStaticMapMenu".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getPolicyStaticMapMenu(paramMap);
				
				return paramMap;
			}
			
			
			//정책통계지도 인기 이용현황
			else if("getPopPol".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getPopPol(paramMap);
				return paramMap;
			}
			
			
			//직접호출 이용현황
			else if("getDirectCall".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				paramMap = useCurrentStateDao.getDirectCall(paramMap);
				return paramMap;
			}
			
			
			//mng_s 201710109 lifestyle 추가 leekh
			//라이프스타일 이용현황
			else if("getLifeStyle".equals(paramMap.get("gubun"))){
				
				paramMap.put("yearMonth", paramMap.get("year").toString() + paramMap.get("month").toString()); 
				paramMap.put("year", paramMap.get("year").toString()); 
				
				paramMap = useCurrentStateDao.getLifeStyle(paramMap);
				return paramMap;
			}
			
			//mng_e 201710109 lifestyle 추가 leekh
			
			
			
			return paramMap;
			
			
		}   catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum MustParam{
		gubun
	}
	private enum OptionParam{
		year,
		month,
		year2,
		month2,
		type
	}
}
