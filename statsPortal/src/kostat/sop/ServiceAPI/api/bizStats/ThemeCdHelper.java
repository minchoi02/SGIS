package kostat.sop.ServiceAPI.api.bizStats;

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

import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * @author ParkSangeon
 * @Description 테마코드 공통기능 호출용 API 클래스 작성
 */
public class ThemeCdHelper extends AbsQuery<List>{
	private static final Log logger = LogFactory.getLog(ThemeCdHelper.class);
	
	@Resource( name = "themeCdCommon")
	private ThemeCdCommon themeCdCommon;
	
	@Override
	public String getApiId() {
		return "20001"; // 미정
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		service 		// 테마코드 공통기능에서 어떤 기능을 원하는지 결정하는 문자열
	}
	
	enum OptionParam
	{
		theme_cd		// 소분류 테마코드
		, b_theme_cd	// 대분류 테마코드
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			@SuppressWarnings("unchecked")
			Map<String,Object> parameter = getParameterMap(req);
			_checkNullParameterValue(parameter);

			HashMap<String, Object> resultMap = new HashMap<>();
			String service = (String)parameter.get("service"); 
			String theme_cd = (String)parameter.get("theme_cd");
			String b_theme_cd = (String)parameter.get("b_theme_cd");
			
			if(service == null) {
				throw new IllegalArgumentException();
			}
			
			
			if(service.equals("selectAllThemeCdInfo")) {		// 대분류와 테마코드에 대한 모든 데이터를 조회한다.
				result = themeCdCommon.selectAllThemeCdInfo();	
			} else if(service.equals("selectBigThemeInfo")) {
				result = themeCdCommon.selectBigThemeInfo();
			} else if(service.equals("selectSmallThemeDetail")) {
				result = themeCdCommon.selectSmallThemeDetail();
			} else if(service.equals("findBigThemeCd")) {
				if(theme_cd == null) {
					throw new ThemeCdCommon.ThemeCodeInvalidValueException("테마코드를 값이 없습니다.");
				}
				resultMap.put("b_theme_cd",themeCdCommon.findBigThemeCd(theme_cd));
				result.add(resultMap);
			} else if(service.equals("selectCensusInfoGroupedByBigThemeCd")) {
				result = themeCdCommon.selectCensusInfoGroupedByBigThemeCd(b_theme_cd);
			} else if(service.equals("selectAllCensusThemeInfo")) {
				result = themeCdCommon.selectAllCensusThemeInfo();
			} else if(service.equals("selectBigCensusThemeInfo")) {
				result = themeCdCommon.selectBigCensusThemeInfo();
			} else if(service.equals("selectSmallCensusThemeDetail")) {
				result = themeCdCommon.selectSmallCensusThemeDetail();
			}
			
			
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
		return result;
	}

}
