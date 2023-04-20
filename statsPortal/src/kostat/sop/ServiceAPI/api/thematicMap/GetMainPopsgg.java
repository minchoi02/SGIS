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

public class GetMainPopsgg extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GetMainPopsgg.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9044";
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
		sido_cd, data_year, sgg_cd
	}
	
	enum OptionParam
	{
		bord_year //2019-03-13 박길섭 수정
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
						
			detailInfo = (List) session.selectList("thematicMap.select.GetMainPopsgg", mapParameter);
			resultData.put("detailInfo", detailInfo);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			//logger.error(e);
			//e.printStackTrace();
			System.out.println("처리중 에러가 발생하였습니다.");
			throw e;
		} catch (IllegalArgumentException e) {
			//logger.error(e);
			//e.printStackTrace();
			System.out.println("처리중 에러가 발생하였습니다.");
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			//logger.error(e);
			//e.printStackTrace();
			System.out.println("처리중 에러가 발생하였습니다.");
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}
}