package kostat.sop.ServiceAPI.api.communityMap;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 목록<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/01/04  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityList.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100000";
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
		type,
		bnd_year
	}

	enum OptionParam{
		page_num,
		search_word,
		pageSize,
		sido_cd,
		sgg_cd,
		emdong_cd,
		first_sort,
		second_sort,
		last_cmmnty_map_id,
		tags,
		search_type
	}
	
	public String FirstSort( String type ){
		String column = null;
		
		if( type == null || "Default".equals( type ) ){
			column = null;
		} else if( "hot".equals( type ) ){
			column = "IS_HOT DESC";
		} else if( "newest".equals( type ) ){
			column = "IS_NEW DESC";
		} else if( "open".equals( type ) ){
			column = "COMMUNITY_TYPE_SORT_NUMBER ASC";
		} else if( "enclosed".equals( type ) ){
			column = "COMMUNITY_TYPE_SORT_NUMBER DESC";
		} else if( "my".equals( type ) ){
			column = "IS_MINE DESC";
		} else if( "temp".equals( type ) ){
			column = "TEMP_SAVE_YN DESC, IS_MINE DESC";
		} 
		
		return column;
	}
	
	public String SecondSort(String type){
		String column = null;
		
		if( type == null || "Default".equals( type ) ){
			column = "MOD_TS DESC";
		} else if( "title_asc".equals( type ) ){
			column = "CMMNTY_MAP_NM ASC";
		} else if( "data_desc".equals( type ) ){
			column = "POI_CNT DESC";
		} else if( "date_desc".equals( type ) ){
			column = "REG_DATE DESC";
		} else if( "mod_desc".equals( type ) ){
			column = "MOD_TS DESC";
		} 
		
		return column;
	}

	@Override
	public HashMap<String,Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			communityService.dollarQueryReplace(mapParameter);
			
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			
			int totalCount = 0;
			
			List<HashMap<String,Object>> summaryList = new ArrayList<HashMap<String,Object>>();
			
			String original_type = mapParameter.get("type").toString();
			mapParameter.put("type",original_type);
			
			if(mapParameter.get("type").equals("hot")){
				List<HashMap<String,Object>> hotList = session.selectList("communityMap.selectHotCmmntyList", mapParameter);
				
				if(hotList.size()<4){
					mapParameter.put("type","others");
					mapParameter.put("limit",4-hotList.size());
					mapParameter.put("summaryList",hotList);
					mapParameter.put("type2", "with");
					List<HashMap<String,Object>> summaryOthersList = session.selectList("communityMap.selectHotCmmntyList", mapParameter);
					hotList.addAll(summaryOthersList);
					mapParameter.put("type2", "");
				}
				
				summaryList = hotList; 
				totalCount = hotList.size();
			}else{
				totalCount = (int) session.selectOne("communityMap.selectCmmntyCount", mapParameter);
				int pageSize = req.getParameter("pageSize")==null?5:Integer.parseInt(mapParameter.get("pageSize").toString());
				int curPage = req.getParameter("page_num")==null?1:Integer.parseInt(mapParameter.get("page_num").toString());
				
				mapParameter.put("page_size", pageSize);
				mapParameter.put("page_num", curPage);
				
				String firstSortt = FirstSort( mapParameter.get("first_sort") == null ? null : mapParameter.get("first_sort").toString() );
				mapParameter.put("firstSort", firstSortt );
				
				if( "hot".equals( mapParameter.get("first_sort") ) && "Default".equals( mapParameter.get("second_sort") ) ){
					mapParameter.put("secondSort", "POI_CNT DESC, HOT_SORT ASC,JOIN_CNT DESC, CMMNTY_MAP_ID DESC");
				}else{
					String second = SecondSort( mapParameter.get("second_sort") == null ? null : mapParameter.get("second_sort").toString() );
					mapParameter.put("secondSort", second );
				}
				
				int lastNum = 0;
				
				if(curPage > 1){
					if(mapParameter.get("last_cmmnty_map_id")==null){
						lastNum = pageSize*(curPage-1) + 1;
					}else{
						int lastRowNum = (int)session.selectOne("communityMap.selectLastNum", mapParameter);
						lastNum = lastRowNum+1;
					}
				}
				
				mapParameter.put("last_num", lastNum);
				mapParameter.put("type2", "with");
				summaryList = session.selectList("communityMap.selectCmmntyList", mapParameter);
			}

			resultData.put("summaryList", summaryList);
			resultData.put("total_count", totalCount);

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
