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

public class EduContentsList extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(EduContentsList.class);
	
	@Resource(name = "eduService")
	private EduService eduService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13602";
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
		List resultList = new ArrayList();
		List resultTagList = new ArrayList();
		Map result = new HashMap();
		
		try{
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			int totalCount = eduService.selectEduContentsListCount(mapParameter);
			String index = (String) mapParameter.get( "currentPageIndex" );
			int pageSize = 6;
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
			
			resultList = eduService.selectEduContentsList(mapParameter);
			
			result.put("resultList", resultList);
			result.put("totalCount", totalCount);
			
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{thema_id}
	enum OptionParam{
		main_yn	, currentPageIndex
		
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
