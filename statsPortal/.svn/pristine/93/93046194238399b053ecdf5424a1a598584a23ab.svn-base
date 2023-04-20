package kostat.sop.ServiceAPI.api.edu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.EduService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class EduHighMainContentsList extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(EduHighMainContentsList.class);
	
	@Resource(name = "eduService")
	private EduService eduService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13607";
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
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		
		Map<String,Object> mapParameter = getParameterMap(req);
		List<Map<String, Object>> themaList = new ArrayList();
		List<Map<String, Object>> resultThemaList = new ArrayList();
		List kwrdList = new ArrayList();

		//메인 section2
		List<Map<String, Object>> resultTchpgmList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> tchpgmList = new ArrayList<Map<String, Object>>();

		//메인 section3
		List<Map<String, Object>> resultwithList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> withList = new ArrayList<Map<String, Object>>();
		
		//메인 section4
		List<Map<String, Object>> board12List = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> board13List = new ArrayList<Map<String, Object>>();

		Map result = new HashMap();
		
		try{
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			// section 1 : 인기검색어
			themaList = eduService.selectEduThemaList(mapParameter);
			
			for (Map<String,Object> thema : themaList) {
				String thema_id = (String) thema.get("thema_id");
				mapParameter.put("thema_id", thema_id);
				kwrdList = eduService.selectPopularSrchwrdGroupByThema(mapParameter);
				thema.put("kwrdList", kwrdList);
				resultThemaList.add(thema);
			}
			
			result.put("resultThemaList", resultThemaList);
			
			
			// section 2 : 배우는지도(교안) 목록
			tchpgmList = eduService.selectEduTchpgmList(mapParameter);
			
			for (Map<String,Object> tchpgm : tchpgmList) {
				List tagList = new ArrayList();
				String tchpgm_seq = (String) tchpgm.get("tchpgm_seq");
				mapParameter.put("tchpgm_seq", tchpgm_seq);
				tagList = eduService.selectEduTchpgmHashtagList(mapParameter);
				tchpgm.put("tagList", tagList);
				resultTchpgmList.add(tchpgm);
			}
				
			result.put("resultTchpgmList", resultTchpgmList);
			
			
			// section 3 : 함께하는지도 목록
			withList = eduService.selectEduWithMapList(mapParameter);
			
			for (Map<String,Object> withMap : withList) {
				List tagList = new ArrayList();
				String cmmnty_map_id = withMap.get("cmmnty_map_id")+"";
				mapParameter.put("cmmnty_map_id", cmmnty_map_id);
				tagList = eduService.selectEduWithMapListHashtagList(mapParameter);
				withMap.put("tagList", tagList);
				resultwithList.add(withMap);
			}
				
			result.put("resultWithMapList", resultwithList);
			

			//section 4 : 게시판 목록
			mapParameter.put("board_cd", "BOARD_013");
			board13List = eduService.selectMainBoardList(mapParameter);
			result.put("resultBoard13List", board13List);
			
			mapParameter.put("board_cd", "BOARD_012");
			board12List = eduService.selectMainBoardList(mapParameter);
			result.put("resultBoard12List", board12List);
			
			
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{}
	enum OptionParam{
		main_yn, 
		school_grade
		
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
