package kostat.sop.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.WorkRoadTodayStatusService;
import kostat.sop.ServiceAPI.controller.service.WorkRoadViewJobsService;


/**
 * 1. 기능 : 일자리 맵 > 일자리 보기 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     2018.09.01	ywKim	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/workRoad/viewJobs")
public class WorkRoadViewJobsController {
	private final Log logger = LogFactory.getLog(WorkRoadViewJobsController.class);
	@Resource(name="workRoadViewJobsService")
	private WorkRoadViewJobsService workRoadViewJobsService;
	/**
	 * 일자리 맵 > 프레임 > Map
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjMap
	 */
	@RequestMapping(value="/vjMap")
	public ModelAndView vjMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjMap");
	}

	/**
	 * 일자리 맵 > 프레임 > 우측 데이터보드
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjDataboard
	 */
	@RequestMapping(value="/vjDataBoard")
	public ModelAndView vjDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjDataBoard");
	}
	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건목록 (서브메뉴)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjConditionList
	 */
	@RequestMapping(value="/vjConditionList")
	public ModelAndView ConditionList(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjConditionList");
	}
	
	//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 통합검색 (팝업창)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectDesiredArea
	 */
	@RequestMapping(value="/vjSelectAll")
	public ModelAndView SelectAll(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectAll");
	}
	//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 희망지역 선택 (팝업창)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectDesiredArea
	 */
	@RequestMapping(value="/vjSelectDesiredArea")
	public ModelAndView SelectDesiredArea(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectDesiredArea");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 기업형태 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectCompanyType
	 */
	@RequestMapping(value="/vjSelectCompanyType")
	public ModelAndView SelectCompanyType(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectCompanyType");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 회사규모 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectCompanySize
	 */
	@RequestMapping(value="/vjSelectCompanySize")
	public ModelAndView SelectCompanySize(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectCompanySize");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 산업분류 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjIndustryClassification
	 */
	@RequestMapping(value="/vjSelectIndustryClassification")
	public ModelAndView SelectIndustryClassification(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectIndustryClassification");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 직종분류 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectJobClassification
	 */
	@RequestMapping(value="/vjSelectJobClassification")
	public ModelAndView SelectJobClassification(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectJobClassification");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 급여수준 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectSalaryLevel
	 */
	@RequestMapping(value="/vjSelectSalaryLevel")
	public ModelAndView SelectSalaryLevel(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectSalaryLevel");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 고용형태 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectEmploymentType
	 */
	@RequestMapping(value="/vjSelectEmploymentType")
	public ModelAndView SelectEmploymentType(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectEmploymentType");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 근무형태 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectWorkingType
	 */
	@RequestMapping(value="/vjSelectWorkingType")
	public ModelAndView SelectWorkingType(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectWorkingType");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 학력 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectAcademicAbility
	 */
	@RequestMapping(value="/vjSelectAcademicAbility")
	public ModelAndView SelectAcademicAbility(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectAcademicAbility");
	}	
	/**
	 * 일자리 맵 > 일자리 보기  > 조건: 경력 선택
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjSelectCareer
	 */
	@RequestMapping(value="/vjSelectCareer")
	public ModelAndView SelectCareer(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjSelectCareer");
	}


	/**
	 * 일자리 맵 > 일자리 보기  > 구인정보 목록 (Layer)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjJobInfoList
	 */
	@RequestMapping(value="/vjJobInfoList")
	public ModelAndView JobInfoList(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjJobInfoList");
	}
	
	/**
	 * 일자리 맵 > 일자리 보기  > 구인정보 상세 (in Databoard)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjJobInfoDetail
	 */
	@RequestMapping(value="/vjJobInfoDetail")
	public ModelAndView JobInfoDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		//로그인 여부 확인
//		HttpSession session = request.getSession();
//		String member_id = (String)session.getAttribute("member_id");
//		
//		if (member_id != null) {
			try {
				Map<String, Object> mapParameter = new HashMap<String, Object>();
				
				logger.info("jo_no: " + request.getParameter("jo_no"));
				logger.info("base_year: " + request.getParameter("base_year"));
				
				mapParameter.put("jo_no", (String)request.getParameter("jo_no"));
				mapParameter.put("base_year", (String)request.getParameter("base_year"));				
				
				// 최신 데이터 작성일 조회
				String latestRegDate = (String)workRoadViewJobsService.selectToday(mapParameter);
				mapParameter.put("latest_reg_date", latestRegDate);
				try {
					// 임시: srv_dt_job_sm 테이블에 jo_auth_no 필드가 존재하는지 검사 - 2018.12.26	ywKim	추가
					String jo_auth_no = (String)workRoadViewJobsService.jo_auth_no_exists(mapParameter);
					mapParameter.put("jo_auth_no_exists", "Y");
				} catch (Exception e) {
					logger.error(e);
				}
				Map<String, Object> jobInfoDetail = workRoadViewJobsService.selectJobInfoDetail(mapParameter);
				model.addAttribute("data", jobInfoDetail);
			} catch (SQLException e) {
				logger.error(e);
			}
//		}

		return new ModelAndView("workRoad/viewJobs/vjJobInfoDetail");
	}
	
	/**
	 * 일자리 맵 > 일자리 보기  > 대졸자 첫 일자리 통계 (in Databoard)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjFirstCollegeGraduateJobStat
	 */
	@RequestMapping(value="/vjFirstCollegeGraduateJobStat")
	public ModelAndView FirstCollegeGraduateJobStat(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjFirstCollegeGraduateJobStat");
	}
	
	/**
	 * 일자리 맵 > 일자리 보기  > 직업전망 (in Databoard)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjJobProspectingInfo
	 */
	@RequestMapping(value="/vjJobProspectingInfo")
	public ModelAndView JobProspectingInfo(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjJobProspectingInfo");
	}
	
	/**
	 * 일자리 맵 > 일자리 보기  > 직업훈련(핵심직무 기반) (in Databoard)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjJobTraining
	 */
	@RequestMapping(value="/vjJobTrainingInfo")
	public ModelAndView JobTrainingInfo(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjJobTrainingInfo");
	}
	
	/**
	 * 일자리 맵 > 일자리 보기  > 생활환경 종합 (Layer)
	 * @param request
	 * @param response
	 * @return workRoad/viewJobs/vjLivingEnvironment
	 */
	@RequestMapping(value="/vjLivingEnvironment")
	public ModelAndView LivingEnvironment(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/viewJobs/vjLivingEnvironment");
	}
}
