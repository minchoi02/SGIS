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

public class EduSearchAll extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(EduSearchAll.class);
	
	@Resource(name = "eduService")
	private EduService eduService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13610";
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
		List<Map<String,Object>> contentsList = new ArrayList();
		List<Map<String,Object>> tchpgmList = new ArrayList();
		List<Map<String,Object>> withMapList = new ArrayList();
		
		Map result = new HashMap();
		int contentsListCnt = 0;
		int tchpgmListCnt = 0;
		int withMapListCnt = 0;
		List resultContentsList = new ArrayList();
		List resultTchpgmList = new ArrayList();
		List resultWithMapList = new ArrayList();
		
		
		try{
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			eduService.insertSearchCnt(mapParameter);
			//콘텐츠 목록 조회 top 3
			contentsList = eduService.selectSearchContentsList(mapParameter);
			//콘텐츠별 해시태그 조회
			for (Map<String,Object> contents : contentsList) {
				String contents_id = (String) contents.get("contents_id");
				mapParameter.put("contents_id", contents_id);
				List<String> tagList = new ArrayList();
				tagList = eduService.selectEduContentsHashtagList(mapParameter);
				contents.put("tagList", tagList);
				resultContentsList.add(contents);
			}
			
			//교안 목록 조회 top 3
			tchpgmList = eduService.selectSearchTchpgmList(mapParameter);
			//교안별 해시태그 조회
			for (Map<String,Object> thcpgm : tchpgmList) {
				String tchpgm_seq = (String) thcpgm.get("tchpgm_seq");
				mapParameter.put("tchpgm_seq", tchpgm_seq);
				List<String> tagList = new ArrayList();
				tagList = eduService.selectEduTchpgmHashtagList(mapParameter);
				thcpgm.put("tagList", tagList);
				resultTchpgmList.add(thcpgm);
			}
			
			//함께하는지도 목록 조회 top 3
			withMapList = eduService.selectSearchWithMapList(mapParameter);
			for (Map<String,Object> withMap : withMapList) {
				String cmmnty_map_id = withMap.get("cmmnty_map_id")+"";
				mapParameter.put("cmmnty_map_id", cmmnty_map_id);
				List<String> tagList = new ArrayList();
				tagList = eduService.selectEduWithMapListHashtagList(mapParameter);
				withMap.put("tagList", tagList);
				resultWithMapList.add(withMap);
			}
			
			contentsListCnt = eduService.selectSearchContentsListCnt(mapParameter);
			tchpgmListCnt = eduService.selectSearchTchpgmListCnt(mapParameter);
			withMapListCnt = eduService.selectSearchWithMapListCnt(mapParameter);
			
			result.put("contentsList", resultContentsList);
			result.put("tchpgmList", resultTchpgmList);
			result.put("withMapList", resultWithMapList);
			
			result.put("contentsListCnt", contentsListCnt);
			result.put("tchpgmListCnt", tchpgmListCnt);
			result.put("withMapListCnt", withMapListCnt);
			
			return result;
			
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{
		kwrd 
	}
	enum OptionParam{
		all_yn,
		school_grade
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
