package kostat.sop.ServiceAPI.api.statsMe.map;

import java.util.HashMap;
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
import kostat.sop.ServiceAPI.controller.service.StatsMeService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : SGIS 포털 > My통계로 카탈로그 목록 조회  <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 한광희 1.0, 2020.04.02	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 한광희
 * @version 1.0
 * @see
 * <p/>
 */
public class GetPotalStatsMeCatalogList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetStatsDataOne.class);
	
	//My통계로 관련 서비스
	@Resource(name="statsMeService")
	private StatsMeService statsMeService;
	
	@Override
	public String getApiId() {
		return "115100";
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
		
	}

	enum OptionParam{
		searchword,
		resultCnt,
		pagenum
	}
	
	@Override
	public HashMap<String, Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		//리턴 변수 선언
		HashMap<String, Object> resultData = new HashMap<String,Object>();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);

			// 현재 요청된 데이터의 페이지
			if (!mapParameter.containsKey("pagenum")) {
				resultData.put("currentPage", 0);
				mapParameter.put("pagenum", 1);
			} else {
				resultData.put("currentPage",
						Integer.parseInt(mapParameter.get("pagenum").toString()));
				int pagenum = Integer.valueOf(mapParameter.get("pagenum").toString())
						* Integer.valueOf(mapParameter.get("resultCnt")
								.toString()) + 1;
				mapParameter.put("pagenum", pagenum);
			}
			
			if (!mapParameter.containsKey("resultCnt")) {
				mapParameter.put("resultCnt", 10);
			}
			// 결과 목록
			resultData.put("statsMeCatalogList", session.selectList("statsMeMap.selectPotalStatsMeCatalogList", mapParameter));
			// 결과 목록 갯수
			resultData.put("statsMeCatalogCount",(Integer)session.selectOne("statsMeMap.selectPotalStatsMeCatalogCount", mapParameter));

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