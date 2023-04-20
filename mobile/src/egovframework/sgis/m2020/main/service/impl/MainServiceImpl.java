package egovframework.sgis.m2020.main.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2020.main.service.MainService;
import egovframework.sgis.m2020.main.service.mapper.kairos.MainMapper;

@Service("mainService")
@PropertySource("classpath:globals.properties")
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService{
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Resource(name="mainMapper")
	private MainMapper mainMapper;
	
	// 메인화면 공지사항 조회
	@Override
	public JsonData getMainBoard(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			List<Map<String, Object>> summaryList = mainMapper.selectMainBoardList(params);
			
			result.put("summaryList", summaryList);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 메인화면 통계주제도 조회
	@Override
	public JsonData getMainThematicList(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
						
			List<Map<String, Object>> themeMapInfoList = mainMapper.selectMainThematicList(params);
			
			result.put("themeMapInfoList", themeMapInfoList);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 메인화면 생활환경종합 조회
	@Override
	public JsonData getMainLivingEnvironment(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
						
			// 생활환경 정보(전국)
			Map<String, Object> tempParams = new HashMap<String,Object>();
			List<Map<String, Object>> lvResultList0 = mainMapper.selectMainLivingEnvironment(tempParams);
			result.put("lvResultList0", lvResultList0);
			// 생활환경 정보(지역)
			List<Map<String, Object>> lvResultList1 = mainMapper.selectMainLivingEnvironment(params);
			result.put("lvResultList1", lvResultList1);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
}
