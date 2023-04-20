//2020-08-05 [곽제욱] 
package kostat.sop.ServiceAPI.api.totSurv.common;

import java.util.ArrayList;	// 2020.11.10[한광희] 임업 차트 변경으로 인한 수정
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

public class GetTotSurvData extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotSurvData.class);
	
	enum MustParam
	{
		surv_id,
		surv_year
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
		return "116001";
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
			logger.info("surv_year = " + mapParameter.get("surv_year")); 
			logger.info("sido_cd = " + mapParameter.get("sido_cd"));
			logger.info("sgg_cd = " + mapParameter.get("sgg_cd"));
			logger.info("isAtdrc = " + mapParameter.get("isAtdrc"));
			/** 2020.11.10[한광희] 임업 경영형태별 임가 합계값 추가로 인한 수정 START */
			List<Map> mapData = new ArrayList();
			//20201117 박은식 어가 surv_id 조건 추가 START
			if(mapParameter.get("surv_id").equals("FS0229") || 
			   mapParameter.get("surv_id").equals("FS0526") || 
			   mapParameter.get("surv_id").equals("FS0186") || //내수면 2015
			   mapParameter.get("surv_id").equals("FS0483") || //내수면 2010
			   mapParameter.get("surv_id").equals("FS0124") || //해수면 2015
			   mapParameter.get("surv_id").equals("FS0424") || 
			   mapParameter.get("surv_id").equals("FS0010") || 
			   mapParameter.get("surv_id").equals("FS0312") ||
			   mapParameter.get("surv_id").equals("FS0260") ||
			   mapParameter.get("surv_id").equals("FS0555")) { //해수면 2010
			//20201117 박은식 어가 surv_id 조건 추가 END
				String itm_cd = (String) mapParameter.get("itm_cd");
				String[] itm_cdList = null;
				itm_cdList = itm_cd.split(",");
				mapParameter.put("itm_cdList", itm_cdList);
				mapData = session.selectList("totSurvMain.getTotSurvData_2", mapParameter);
			} else {
				mapData = session.selectList("totSurvMain.getTotSurvData", mapParameter);				
			}
			/** 2020.11.10[한광희] 임업 경영형태별 임가 합계값 추가로 인한 수정 END */
			
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
