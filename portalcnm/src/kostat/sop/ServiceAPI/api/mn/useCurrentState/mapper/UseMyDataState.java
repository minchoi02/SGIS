package kostat.sop.ServiceAPI.api.mn.useCurrentState.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;



public class UseMyDataState extends AbsAuth<Map>{
	
	private static final Logger logger = Logger.getLogger(UseMyDataState.class);
//	@Autowired
//	@Qualifier("sqlSession2")
	@Resource
	private UseMyDataStateDao useMyDataStateDao;
	@Override
	public String getApiId() {
		return "useMyDataStateDao";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "";
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		Map paramMap=getParameterMap(req);
		
		/*
		 * gubun값
		 * totalUseStat : 총괄페이지 뷰
		 *
		*/
		try {
			
			//총괄페이지 기본 데이터
			if("totUseStat".equals(paramMap.get("gubun"))){
				
				paramMap = useMyDataStateDao.getMyData2(paramMap);
				return paramMap;
			}
			
			
			
			return paramMap;
			
			
		}   catch (AbsAPIException e) {
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
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	private enum MustParam{
		gubun
	}
	private enum OptionParam{
		year,
		month
	}
}
