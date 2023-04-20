package kostat.sop.ServiceAPI.api.totSurv.detail;

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

import kostat.sop.ServiceAPI.api.totSurv.population.GetTotPopulation;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetTotDetailList extends AbsQuery<Map>{

private static final Log logger = LogFactory.getLog(GetTotPopulation.class);
	
	enum MustParam
	{	
	}

	enum OptionParam
	{
		baseYear,
		subThemaList,
		selYear,
		selAdmCd,
		page,
		orderTypeNm,
		orderType
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116700";
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
			
			// 년도 조회
			if(mapParameter.get("selYear") != null) {
				mapParameter.put("yearLength", mapParameter.get("selYear").toString().length());
			};
			
			// 지역 코드
			if(mapParameter.get("selAdmCd") != null) {
				mapParameter.put("admCdLength", mapParameter.get("selAdmCd").toString().length());
			};
			
			/*  page startNum endNum */
			int page = Integer.parseInt(mapParameter.get("page").toString());  //파라메터 page값을 받는다.
	        if (page==1){
	            mapParameter.put("startNum", "1");
	            mapParameter.put("endNum", "10");
	        }else{
	        	mapParameter.put("startNum", page+(9*(page-1)));
	        	mapParameter.put("endNum", 10);
	        }
			
			// 관심주제 (소제목 테마)
			String subThemaStr = (String) mapParameter.get("subThemaList");
			String[] subThemaList = null;
			if(subThemaStr != null && !subThemaStr.equals("")) {
				subThemaList = subThemaStr.split("@@");
			}
			mapParameter.put("subThemaList", subThemaList);
			
			// 정렬
			String orderTypeNm = (String) mapParameter.get("orderTypeNm");
			String orderType = (String) mapParameter.get("orderType");	// 정렬 방식(DESC/ASC)
			mapParameter.put("orderTypeNm", orderTypeNm);
			mapParameter.put("orderType", orderType);
			
			// 리스트 총목록수 조회
			String totalDataCnt = session.selectOne("totSurvDetail.getTotDetailListCnt", mapParameter);
			// 리스트 목록 조회(paging)
			List<Map> totalData = session.selectList("totSurvDetail.getTotDetailList", mapParameter);
							
			result.put("totalDataCnt", totalDataCnt);
			result.put("totalData", totalData);
			
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
