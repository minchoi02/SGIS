package kostat.sop.ServiceAPI.api.technicalBiz;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.technicalBiz.TechnicalBizCntBarChart.MustParam;
import kostat.sop.ServiceAPI.api.technicalBiz.TechnicalBizCntBarChart.OptionParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TechnicalBizMapService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

@SuppressWarnings("rawtypes")
public class TechnicalBizPercentPieChart extends AbsQuery<Map> {

	private static final Log logger = LogFactory.getLog(TechnicalBizPercentPieChart.class);
	
	@Resource(name="technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100643";
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
	
	enum MustParam
	{
		techbiz_class_cd,
		adm_cd,
		year
	}
	
	enum OptionParam
	{
		
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			
			String base_year = (String) mapParameter.get("year");
			if (base_year == null) {
				mapParameter.put("year", Collections.max(Properties.getCompany_year_list()));
			}

			mapParameter.put("techbiz_cd_div", "2");
			Map techRate = technicalBizMapService.selectTechInfo(mapParameter);
			List chartData = technicalBizMapService.selectTechnicalBizCntBarChartAndPercentPieChart(mapParameter);

			resultData.put("techRate", techRate);
			resultData.put("chartData", chartData);
			
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
