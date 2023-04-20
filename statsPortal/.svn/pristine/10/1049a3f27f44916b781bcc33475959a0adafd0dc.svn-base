package kostat.sop.ServiceAPI.api.map.interactive;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 총조사 주요지표를 조회하기 위한 북마크 정보 조회 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 이경현, 1.0, 2019/09/06  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 이경현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class BookMarkSearch extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BookMarkSearch.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10800";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.GET;
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
		return null;
	}
	
	enum MustParam
	{
		hist_id
	}
	
	enum OptionParam
	{	
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String hist_id = req.getParameter("hist_id");
			
			hist_id = Security.cleanXss(hist_id);
			hist_id = Security.sqlInjectionCheck(hist_id);
			
			
			mapParameter.put("hist_id", hist_id);
			
			List bookmarkList = session.selectList("member.selectStatistcsHistoryParamInfo", mapParameter);
			
			JSONArray tmpbookmarkList = new JSONArray();
			JSONObject bookmarkInfo;
			for (int i=0; i<bookmarkList.size(); i++) {
				HashMap tmpBookmarkInfo = (HashMap)bookmarkList.get(i);
				bookmarkInfo = new JSONObject();
				bookmarkInfo.put("hist_type",tmpBookmarkInfo.get("hist_type"));
				bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
				bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("hist_nm"));
				bookmarkInfo.put("map_type",tmpBookmarkInfo.get("map_type"));
				bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
				bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
				bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
				bookmarkInfo.put("paramInfo",tmpBookmarkInfo.get("param_info"));
				tmpbookmarkList.put(bookmarkInfo.toString());
			}
			
			resultData.put("paramObj", tmpbookmarkList.toString());
			
			
			
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
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