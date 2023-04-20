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

/**
*
* @ClassName GetStatusAnlsMnby
* @Description 일자리 월별 집계 조회
*
* @author hjh
* @date 2021.06.10
* @version V1.0
*
*/
@SuppressWarnings("rawtypes")
public class GetStatusAnlsMnby extends AbsQuery<List> {

	private static final Log logger = LogFactory.getLog(GetStatusAnlsMnby.class);

	enum MustParam {
		year
	}

	enum OptionParam {
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
		industClass,
		resultType,
		coor_x,	//20181112 추가_손원웅
		coor_y,
		regDtMonth	// 2020.04.23[한광희] 월평균자료 조회 기능 추가로 인한 변수 추가
	}

	@Override
	public String getApiId() {
		return "113009";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
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

	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		List result = new ArrayList();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			result = session.selectList("wrStatusAnls.getStatusAnlsMnby", mapParameter);
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