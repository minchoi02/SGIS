package kostat.sop.ServiceAPI.api.thematicMap;

import java.util.ArrayList;
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

public class GetThemaMapKosisData extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GetThemaMapKosisData.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9049";
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
		base_year, thema_map_data_id, adm_cd, chart_type
	}
	
	enum OptionParam
	{
		
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map mapParameter= getParameterMap(req);
		
		_checkNullParameterValue(mapParameter);
		
		Map resultData = new HashMap();

		List detailInfo = new ArrayList();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			String chartType = (String) mapParameter.get("chart_type");
			if("detail1".equals(chartType))
				detailInfo = (List) session.selectList("thematicMap.select.getThemaMapKosisData", mapParameter);
			else if("detail2".equals(chartType)) {
				String dataMapId = (String) mapParameter.get("thema_map_data_id");
				switch(dataMapId) {
					case "kosis_rtrn_frmhs_cnt" :
						mapParameter.put("thema_map_data_id", "01");
						break;
					case "kosis_rtrn_fhrshs_cnt" :
						mapParameter.put("thema_map_data_id", "02");
						break;
					case "kosis_rtrn_home_cnt" :
						mapParameter.put("thema_map_data_id", "03");
						break;
					default :
						mapParameter.put("thema_map_data_id", "00");
						break;
				}
				detailInfo = (List) session.selectList("thematicMap.select.getThemaMapKosisData2", mapParameter);
			}
			
			resultData.put("detailInfo", detailInfo);
			
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