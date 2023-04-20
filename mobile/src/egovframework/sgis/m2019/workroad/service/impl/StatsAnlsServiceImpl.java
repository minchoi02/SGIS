package egovframework.sgis.m2019.workroad.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2019.workroad.service.StatsAnlsService;
import egovframework.sgis.m2019.workroad.service.mapper.kairos.StatsAnlsMapper;


@Service("statsAnlsService")
@PropertySource("classpath:globals.properties")
public class StatsAnlsServiceImpl extends EgovAbstractServiceImpl implements StatsAnlsService {
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Autowired
	private Environment env;
	
	@Resource(name="statsAnlsMapper")
	private StatsAnlsMapper statsAnlsMapper;
	
	/**
	 * 업종선택
	 * @date 2019. 07. 01.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectStatsAnalsTypeOfIndustry(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("resultList", statsAnlsMapper.selectStatsAnalsTypeOfIndustry(params));
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 업종선택(중분류)
	 * @date 2019. 07. 16.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectStatsAnalsTypeOfIndustryMiddleClassification(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("resultList", statsAnlsMapper.selectStatsAnalsTypeOfIndustryMiddleClassification(params));
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 사업체수&종사자수 조회
	 * @date 2019. 07. 01.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectStatsAnalsMapDataCount(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("resultList", statsAnlsMapper.selectStatsAnalsMapDataCount(params));
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
		
	/**
	 * 일자리 추이 조회
	 * @date 2019. 6. 28.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectStatsAnalsJobTransition(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("statsAnalsJobTransition", statsAnlsMapper.selectStatsAnalsJobTransition(params));
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 일자리 만족도 조회
	 * @date 2019. 6. 26.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectStatsAnalsJobSatisfactionDegree(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("statsAnalsJobSatisfactionDegree", statsAnlsMapper.selectStatsAnalsJobSatisfactionDegree(params));
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
}	