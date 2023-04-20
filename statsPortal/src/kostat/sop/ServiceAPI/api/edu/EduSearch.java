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

public class EduSearch extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(EduSearch.class);
	
	@Resource(name = "eduService")
	private EduService eduService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13611";
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
		

		int totalCount = eduService.selectEduContentsListCount(mapParameter);
		String index = (String) mapParameter.get( "currentPageIndex" );
		int pageSize = 9;
		int pageNum = Integer.parseInt(index);
		int count = totalCount;
		int pageCount = (int) Math.ceil((double)count/(double)5);
		int startPage = (pageNum-1)/pageSize * pageSize+1;
		int endPage = startPage + pageSize -1;
		
		if(endPage > pageCount){
			endPage = pageCount;
		}
		
		int startRow = ((pageNum -1) * pageSize)+1;
		int endRow = startRow + pageSize -1;
		
		mapParameter.put("startRow", Integer.toString(startRow));
		mapParameter.put("endRow", Integer.toString(endRow));
		
		try{
			eduService.insertSearchCnt(mapParameter);
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			if("class".equals(mapParameter.get("search_type"))){
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
				result.put("contentsList", resultContentsList);
				
			}
			if("tchpgm".equals(mapParameter.get("search_type"))){
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
				result.put("tchpgmList", resultTchpgmList);
			}
			if("withMap".equals(mapParameter.get("search_type"))){
				withMapList = eduService.selectSearchWithMapList(mapParameter);
				
				for (Map<String,Object> withMap : withMapList) {
					String cmmnty_map_id = withMap.get("cmmnty_map_id")+"";
					mapParameter.put("cmmnty_map_id", cmmnty_map_id);
					List<String> tagList = new ArrayList();
					tagList = eduService.selectEduWithMapListHashtagList(mapParameter);
					withMap.put("tagList", tagList);
					resultWithMapList.add(withMap);
				}
				result.put("withMapList", resultWithMapList);
			}
			
			contentsListCnt = eduService.selectSearchContentsListCnt(mapParameter);
			result.put("contentsListCnt", contentsListCnt);

			withMapListCnt = eduService.selectSearchWithMapListCnt(mapParameter);
			result.put("withMapListCnt", withMapListCnt);
			
			tchpgmListCnt = eduService.selectSearchTchpgmListCnt(mapParameter);
			result.put("tchpgmListCnt", tchpgmListCnt);
			
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
		school_grade,
		search_type,
		currentPageIndex
		
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
