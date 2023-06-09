package kostat.sop.ServiceAPI.api.thematicMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 1. 기능 : 통계주제도 메뉴에 카타고리 리스트 조회한다.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 * 
 *  <b>History:</b> 
 *     작성자 : 정수영, 1.0, 2015/11/25  초기 작성
 * </pre>
 * 
 * @author 
 * @version 1.0
 * @see <p/>
 */
public class GetMenuCategoryList extends AbsQuery<Map> {
	private static final Log logger = LogFactory
			.getLog(GetMenuCategoryList.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9038";
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
		return null;
	}

	enum MustParam {
		cate_id
	}

	enum OptionParam {
		// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
		sort_type
		// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map mapParameter = getParameterMap(req);

		_checkNullParameterValue(mapParameter);

		Map resultData = new HashMap();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			if(mapParameter.get("sort_type") == null) {
				mapParameter.put("sort_type", "recommend");
			}
			// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
	
//			List categoryList = (List) session.selectList("thematicMap.select.menuList", mapParameter);	
			List categoryList = (List) session.selectList("thematicMap.select.statsMapList", mapParameter);	
			
			resultData.put("categoryList", categoryList);			
			
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