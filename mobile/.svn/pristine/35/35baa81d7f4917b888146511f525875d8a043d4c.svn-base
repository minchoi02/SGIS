package egovframework.sgis.m2020.view.web;

import java.security.Principal;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.sgis.m2020.map.service.ViewService;//20200831 박은식 지역현안 소통지도 서비스 분리 (로그인처리 구현처리로 분리)
import egovframework.sgis.map.service.CommunityService;
import egovframework.sgis.map.service.HouseService;
import egovframework.sgis.member.service.MemberService;

@Controller
public class ViewController {
	private final String PRODUCES = "application/json; charset=UTF-8;";

	@Resource(name = "communityService")
	private CommunityService communityService;

	@Resource(name = "houseService")
	private HouseService houseService;

	@Resource(name = "memberService")
	private MemberService memberService;

	//20200831 박은식 지역현안 소통지도 서비스 등록 start
	@Resource(name = "viewService")
	private ViewService viewService;
	//20200831 박은식 지역현안 소통지도 서비스 등록 end

	// 통합검색
	@RequestMapping(value = "/m2020/map/search.sgis", method = RequestMethod.GET)
	public String search(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/search";
	}

	// My통계로
	@RequestMapping(value = "/m2020/map/statsMe/statsMeMap.sgis", method = RequestMethod.GET)
	public String statsMeMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		/*
		 *
		 * 생애주기
		 * 	- 영유아/어린이  :: "LFECYCLE_INFANT_CHILD"
		 * 	- 1인가구           :: "LFECYCLE_PSN_1_FAMILY"
		 * 관심분야
		 *  - 먹거리             :: "DSTNC_FD"
		 *  - 살거리             :: "DSTNC_HOUSE"
		 *
		 * /m2020/map/statsMe/statsMeMap.sgis?selParam=LFECYCLE_INFANT_CHILD
		 * ( statsMeMap.jsp 참조 )
		 */
		String selItem = request.getParameter("selParam");
		model.addAttribute("selItem", selItem);

		String stat_data_id = request.getParameter("stat_data_id");
		model.addAttribute("stat_data_id", stat_data_id);

		String stat_data_srv_nm = request.getParameter("stat_data_srv_nm");
		model.addAttribute("stat_data_srv_nm", stat_data_srv_nm);

		// 생애주기
		String lifeCycleItemIdList1 = request.getParameter("lifeCycleItemIdList1");
		String lifeCycleItemIdList2 = request.getParameter("lifeCycleItemIdList2");
		model.addAttribute("lifeCycleItemIdList1", lifeCycleItemIdList1);
		model.addAttribute("lifeCycleItemIdList2", lifeCycleItemIdList2);
		// 관심분야
		String interestRealmItemIdList1 = request.getParameter("interestRealmItemIdList1");
		String interestRealmItemIdList2 = request.getParameter("interestRealmItemIdList2");
		model.addAttribute("interestRealmItemIdList1", interestRealmItemIdList1);
		model.addAttribute("interestRealmItemIdList2", interestRealmItemIdList2);
//		System.out.println("stat_data_id = " + stat_data_id + ",  stat_data_srv_nm = " + stat_data_srv_nm);

		return "m2020/map/statsMe/statsMeMap";
	}

	// My통계로 - 데이터보드
	@RequestMapping(value = "/m2020/map/statsMe/statsMeDataboardMap.sgis", method = RequestMethod.GET)
	public String statsMeDataboardMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/statsMe/statsMeDataboardMap";
	}

	// 일자리 맵 - 내 주변 일자리
	@RequestMapping(value = "/m2020/map/workroad/myNeighberhoodJobMap.sgis", method = RequestMethod.GET)
	public String myNeighberhoodJobMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		model.put("params", params);
		return "m2020/map/workroad/myNeighberhoodJobMap";
	}

	// 일자리 맵 - 오늘의 구인현황
	@RequestMapping(value = "/m2020/map/workroad/todayStatusMap.sgis", method = RequestMethod.GET)
	public String todayStatusMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		/** 2020.08.28[한광희] 메인화면 구인업체수/구인자수 클릭시 전국/현재위치에 따른 변수 추가 START */
		String areaType = request.getParameter("areaType");
		model.addAttribute("areaType", areaType);
		/** 2020.08.28[한광희] 메인화면 구인업체수/구인자수 클릭시 전국/현재위치에 따른 변수 추가 END */
		model.put("params", params);
		return "m2020/map/workroad/todayStatusMap";
	}

	// 일자리 맵 - 일자리 통계정보
	@RequestMapping(value = "/m2020/map/workroad/statsAnlsMap.sgis", method = RequestMethod.GET)
	public String statsAnlsMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		model.put("params", params);
		return "m2020/map/workroad/statsAnlsMap";
	}

	// 내 주변 통계
	@RequestMapping(value = "/m2020/map/current/currentMap.sgis", method = RequestMethod.GET)
	public String currentMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model, String id) throws Exception {

		/*
		 *	주요지표 	:: API_0301
		 *	인구 		:: API_0302
		 *	가구		:: API_0305
		 *	주택		:: API_0306
		 *	사업체	:: API_0304
		 *	농림어가	:: API_0310
		 *
		 *	menuIndex :: 0 ~ 4 (상단 메뉴 swiper 위치 조정을 위한 index)
		 *
		 * /m2020/map/current/currentMap.sgis?type=API_0301&menuIndex=0
		 *
		 */

		String type = request.getParameter("type");
		String menuIndex = request.getParameter("menuIndex");
		model.addAttribute("menuType", type);
		model.addAttribute("menuIndex", menuIndex);

		/** 2020.09.02[한광희] 메인화면 내주변주요지표 카드 link 조회 추가 START */
		String tempId = request.getParameter("tempId");
		model.addAttribute("tempId", tempId);
		/** 2020.09.02[한광희] 메인화면 내주변주요지표 카드 link 조회 추가 END */

		model.addAttribute("bookmark",memberService.getBookmark(id));

		return "m2020/map/current/currentMap";
	}

	// 내 주변 통계 - 데이터보드
	@RequestMapping(value = "/m2020/map/current/currentMapDataboardMap.sgis", method = RequestMethod.GET)
	public String currentMapDataboardMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/current/currentMapDataboardMap";
	}

	// 통계주제도
	@RequestMapping(value = "/m2020/map/thematic/thematicMap.sgis", method = RequestMethod.GET)
	public String thematicMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {

		/*
		 * 인구와가구 :: CTGR_001
		 * 주거와교통 :: CTGR_002
		 * 복지와문화 :: CTGR_003
		 * 노동과경제 :: CTGR_004
		 * 환경과안전 :: CTGR_005
		 *
		 * /m2020/map/thematic/thematicMap.sgis?selParam=CTGR_003
		 */
		String selItem = request.getParameter("selParam");
		model.addAttribute("selItem", selItem);
		String menuIndex = request.getParameter("menuIndex");
		model.addAttribute("menuIndex", menuIndex);

		String category = request.getParameter("category");
		model.addAttribute("category", category);
		String id = request.getParameter("id");
		model.addAttribute("id", id);

		return "m2020/map/thematic/thematicMap";
	}

	// 살고싶은 우리동네(추천지역찾기)
	@RequestMapping(value = "/m2020/map/house/recomendHouseMap.sgis", method = RequestMethod.GET)
	public String recomendHouseMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		model.addAttribute("mlsfcLists",houseService.getMlsfcLists());
		model.addAttribute("idealTypeLists",houseService.getIdealTypeLists());
		model.addAttribute("lifeStyle",houseService.selectLifeStyleLists());
		return "m2020/map/house/recomendHouseMap";
	}

	// 살고싶은 우리동네(간편동네찾기)
	@RequestMapping(value = "/m2020/map/house/houseSearchMap.sgis", method = RequestMethod.GET)
	public String houseSearchMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		model.addAttribute("mlsfcLists",houseService.getMlsfcLists());
		model.addAttribute("idealTypeLists",houseService.getIdealTypeLists());
		model.addAttribute("lifeStyle",houseService.selectLifeStyleLists());
		return "m2020/map/house/houseSearchMap";
	}

	// 살고싶은 우리동네(주거현황보기)
	@RequestMapping(value = "/m2020/map/house/houseStatusMap.sgis", method = RequestMethod.GET)
	public String houseStatusMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		/** 2020.09.02[한광희] 메인화면 살고싶은 우리동네 정보 카드 link 추가 START */
		String b_class_idx_id = request.getParameter("b_class_idx_id");
		model.addAttribute("b_class_idx_id", b_class_idx_id);
		/** 2020.09.02[한광희] 메인화면 살고싶은 우리동네 정보 카드 link 추가 END */

		model.addAttribute("mlsfcLists",houseService.getMlsfcLists());
		model.addAttribute("idealTypeLists",houseService.getIdealTypeLists());
		model.addAttribute("lifeStyle",houseService.selectLifeStyleLists());
		return "m2020/map/house/houseStatusMap";
	}

	// 살고싶은 우리동네(우리동네 생활업종)
	@RequestMapping(value = "/m2020/map/biz/bizMap.sgis", method = RequestMethod.GET)
	public String bizMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/biz/bizMap";
	}
	@RequestMapping(value = "/m2020/map/biz/biz2Map.sgis", method = RequestMethod.GET)
	public String biz2Map(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/biz/biz2Map";
	}


	// 지역현안 소통지도
	@RequestMapping(value = "/m2020/map/community/communityMap.sgis", method = RequestMethod.GET)
	public String communityMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/community/communityMap";
	}

	//지역현안 소통지도 게시판 및 등록 페이지
	@RequestMapping(value = "/m2020/map/community/map/communityMap.sgis", method = RequestMethod.GET)
	public String community(
			HttpServletRequest request, //forbiddenCommunityRegist param으로 추가 20200709 박은식
			HttpServletResponse response,
			Principal principal,
			ModelMap model,
			String id) throws Exception {
		//form 페이지에 response model을 map.jsp로 이동 (form으로 보내던 response를 map으로 변경 이유는 마커이미지 정보를 불러오기 위함 20200709 박은식)
		//20200831 박은식 로그인이 필요한 리스트 로직문제로 삭제 start
		//communityService.forbiddenCommunityRegist(request, response, model, principal, id);
		//communityService.getCommunity(response,model,principal,id);
		//20200831 박은식 로그인이 필요한 리스트 로직문제로 삭제 end
		viewService.getCommunityView(response,model,principal,id);//20200831 박은식 viewService 서비스호출 추가
		return "/m2020/map/community/map";
	}

	// 함께하는 지도  mng_s:: djlee 20220607
	@RequestMapping(value = "/m2020/map/withmap/communityMap.sgis", method = RequestMethod.GET)
	public String withmapMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/withmap/communityMap";
	}
	
	// 함께하는지도  게시판 및 등록 페이지
	@RequestMapping(value = "/m2020/map/withmap/map/communityMap.sgis", method = RequestMethod.GET)
	public String withmap(
			HttpServletRequest request, //forbiddenCommunityRegist param으로 추가 20200709 박은식
			HttpServletResponse response,
			Principal principal,
			ModelMap model,
			String id) throws Exception {
		//form 페이지에 response model을 map.jsp로 이동 (form으로 보내던 response를 map으로 변경 이유는 마커이미지 정보를 불러오기 위함 20200709 박은식)
		//20200831 박은식 로그인이 필요한 리스트 로직문제로 삭제 start
		//communityService.forbiddenCommunityRegist(request, response, model, principal, id);
		//communityService.getCommunity(response,model,principal,id);
		//20200831 박은식 로그인이 필요한 리스트 로직문제로 삭제 end
		viewService.getCommunityView(response,model,principal,id);//20200831 박은식 viewService 서비스호출 추가
		return "/m2020/map/withmap/map";
	}
	// 함께하는 지도  mng_e:: djlee 20220607
	

	// 알림마당-SGIS플러스 소개
	@RequestMapping(value = "/m2020/map/board/introduction.sgis", method = RequestMethod.GET)
	public String introduction(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/board/introduction";
	}

	// 알림마당-통계용어 설명
	@RequestMapping(value = "/m2020/map/board/term.sgis", method = RequestMethod.GET)
	public String term(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/board/term";
	}

	// 알림마당-공지사항
	@RequestMapping(value = "/m2020/map/board/notice.sgis", method = RequestMethod.GET)
	public String notice(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/board/notice";
	}

	//20200915 박은식 개선사항 삭제 start
	//20200825 박은식 알림마당-개선사항 추가 start
	/*@RequestMapping(value = "/m2020/map/board/qna.sgis", method = RequestMethod.GET)
	public String qna(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/board/qna";
	}*/
	//20200825 박은식 알림마당-개선사항 추가 end
	//20200915 박은식 개선사항 삭제 end

	// 테스트 화면
	@RequestMapping(value = "/m2020/map/testMap.sgis", method = RequestMethod.GET)
	public String test(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		return "m2020/map/test/testMap";
	}
}
