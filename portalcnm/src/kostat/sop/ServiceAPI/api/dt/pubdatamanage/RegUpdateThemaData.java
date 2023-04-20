package kostat.sop.ServiceAPI.api.dt.pubdatamanage;


import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.dt.pubdatamanage.mapper.PubDataManageDao;
import kostat.sop.ServiceAPI.api.dt.themamapmanage.mapper.ThemaMapManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class RegUpdateThemaData extends AbsGridQuery<Map>{

	private static final Logger logger = Logger.getLogger(RegUpdateThemaData.class);

	@Resource
	private PubDataManageDao pubDataManageDao;

	@Override
	public String getApiId() {
		return "themamapmanage_regupdatethemadata";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		try {
			Map paramMap = getParameterMap(req);
			String SEARCH_WORD = (String) paramMap.get("SEARCH_WORD");
			if(SEARCH_WORD !=null){
				paramMap.put("SEARCH_WORD", "%"+SEARCH_WORD+"%");
			}
			_transPagging(paramMap);
			return pubDataManageDao.getRegThemaID(paramMap);
		}  catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}

	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum MustParam{
		rows,page,THEMA_MAP_DATA_ID
	}
	private enum OptionParam{
		SEARCH_WORD
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}

}
