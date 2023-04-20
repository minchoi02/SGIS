package kostat.sop.ServiceAPI.api.workRoad.statsAnls;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.workRoad.statsAnls.GetSsaDetailPopup.MustParam;
import kostat.sop.ServiceAPI.api.workRoad.statsAnls.GetSsaDetailPopup.OptionParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 일자리 맵 서비스 > 일자리 통계분석 > 일자리증감 조회 <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 손원웅 , 2018.10.25
 *  </pre>
 *  
 * @author 최종 수정자 : 손원웅
 * @version 1.0
 * @see
 * <p/>
 */
public class GetStatsAnlsJobGrowthDetailDataBoard extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GetStatsAnlsJobGrowthDetailDataBoard.class);
	
	@Override
	public String getApiId() {
		return "114215";
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
		Cx,
		Cx_nm,
		Link_id,
		Link_nm,
		SiDo,
		SiDo_nm,
		Title,
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			String linkId = (String) mapParameter.get("Link_id");
			
			List<Map> ssaDetailData = session.selectList("wrStatsAnls.selectSsaJobGrowthDetailDataBoard", mapParameter);
			List<Map> monthCategory = session.selectList("wrStatsAnls.selectDetailCategoryMonth", mapParameter);
			List<Map> yearCategory = session.selectList("wrStatsAnls.selectDetailCategoryYear", mapParameter);
			
			//20190313 손원웅 수정_지표 변경으로 E3224로 사용
			//고용보험증감 max Pre_de를 얻기 위해 변환 필요
//			if(linkId.equals("E3224")){
//				mapParameter.put("Link_id", "E3223");
//			}
			
			List<Map> currentDate = session.selectList("wrStatsAnls.selectCurrendDate", mapParameter);
			//List<Map> saDetailCategory = session.selectList("wrStatsAnls.selectSsaDetailCategory", mapParameter);
			
			result.put("DetailData", ssaDetailData);
			result.put("monthCategory", monthCategory);	//monthCategory
			result.put("yearCategory", yearCategory);	//yearCategory
			result.put("currentDate", currentDate);
			//result.put("Category", saDetailCategory);	//Category

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
		return result;
	}
}
