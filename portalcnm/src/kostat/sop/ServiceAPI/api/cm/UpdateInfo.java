package kostat.sop.ServiceAPI.api.cm;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.cm.mapper.MyPageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;


/**   
 * 
 * @ClassName: UpdateInfo
 * @Description： 
 * Copyright (c) 2014 by NeighborSystem    
 * @author xuliguo   
 * @date：2014年10月12日 下午11:12:42    
 * @version V1.0      
 *  
 * Modification  History:
 * Date         Author        Version        Discription
 * -----------------------------------------------------------------------------------
 * 2014年10月12日      xuliguo        1.0             
 */
public class UpdateInfo extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateInfo.class);
	@Resource
	private MyPageDao myPageDao;
	@Override
	public String getApiId() {
		return "mypage_updateinfo";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap= getParameterMap(req);
			Boolean flag = paramMap.get("DEPT").toString().getBytes().length < 20 && paramMap.get("JOB_POS").toString().getBytes().length < 20;
			flag = flag && paramMap.get("TEL_NO").toString().getBytes().length < 100 && paramMap.get("EXT_NO").toString().getBytes().length < 100;
			flag = flag && paramMap.get("CP_NO").toString().getBytes().length < 100 && paramMap.get("EMAIL").toString().getBytes().length < 150;
			if(!flag) throw new ApiException("입력값을 체크 해 주세요");
			paramMap.put("MANAGER_ID", getSession(req, "manager_id"));
			return 	myPageDao.updateInfo(paramMap);
		} catch (AbsAPIException e) {
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
		return null;
	}
	private enum OptionParam{
		
	}
	private enum MustParam{
		DEPT,
		JOB_POS,
		TEL_NO,
		EXT_NO,
		CP_NO,
		EMAIL
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}
   
}
