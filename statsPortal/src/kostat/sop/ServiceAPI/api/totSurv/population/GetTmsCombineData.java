package kostat.sop.ServiceAPI.api.totSurv.population;

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

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetTmsCombineData extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTmsCombineData.class);
	
	enum MustParam
	{
		surv_id,
		start_year,
		end_year
	}

	enum OptionParam
	{
		map_ty,
		area_bndry_se,
		sido_cd,
		sgg_cd,
		emdong_cd,
		itm_cd,
		c1,
		c2,
		isAtdrc
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116152";
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
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();	
		HashMap<String, Object> result =  new HashMap<String, Object>();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			logger.info("surv_id = " + mapParameter.get("surv_id"));
			logger.info("start_year = " + mapParameter.get("start_year")); 
			logger.info("end_year = " + mapParameter.get("end_year"));
			logger.info("sido_cd = " + mapParameter.get("sido_cd"));
			logger.info("sgg_cd = " + mapParameter.get("sgg_cd"));
			logger.info("isAtdrc = " + mapParameter.get("isAtdrc"));
			List<Map> mapData = session.selectList("totSurvPopulation.getTmsCombineData", mapParameter);
			
			result.put("mapData", mapData);
			
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

