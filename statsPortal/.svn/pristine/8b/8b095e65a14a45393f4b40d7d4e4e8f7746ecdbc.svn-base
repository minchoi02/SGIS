package kostat.sop.ServiceAPI.api.workRoad.statusAnls;

import java.util.ArrayList;
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

public class GetStatusAnlsCareerLevel extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(GetStatusAnlsCareerLevel.class);
	
	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		adm_cd,
		gender,
		low_search,
		area,
		age_from,
		age_to,
		edu_level,
		mrg_state,
		accessToken,
		bnd_year,
		area_type,
		zoom, //mng_s
		bnd_grid, //mng_s 20180220
		today,
		sido_cd,
		sgg_cd,
		detail_type,
		term,
		careerLevel,
		resultType,
		coor_x,		// 2018.11.13	ywKim - 이곳에서는 사용하지 않고 Callback 함수에서 사용됨	
		coor_y,		
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "113007";
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
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();	
		List result =  new ArrayList();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			String careerLevel = (String) mapParameter.get(OptionParam.careerLevel.name());
			String [] careerLevelList = null;
			if(careerLevel != null && !careerLevel.equals("")){
				careerLevelList = careerLevel.split(",");
			}			
			mapParameter.put("careerLevelList", careerLevelList);
			result = session.selectList("wrStatusAnls.getStatusAnlsCareerLevel", mapParameter);
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
