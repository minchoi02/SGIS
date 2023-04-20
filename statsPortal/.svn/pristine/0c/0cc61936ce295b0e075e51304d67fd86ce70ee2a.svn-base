package kostat.sop.ServiceAPI.api.totSurv.detail;

import java.util.ArrayList;
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

public class GetTotDetailTmsresChartDataList extends AbsQuery<Map>{

private static final Log logger = LogFactory.getLog(GetTotDetailTmsresChartDataList.class);
	
	enum MustParam
	{	
		survId
		, year
		, region_cd
		, item_seq
	}

	enum OptionParam
	{
		itm_cd
		, c1
		, c2
		, c3
		, disp_data_type
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116705";
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

		//HashMap<String, String> subThemaMap =  new HashMap<String, String>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			
			// 차트정보 조회  차트별(상세항목)
			List<Map<String, Object>> itemChartInfoDetailList = session.selectList("totSurvDetail.getTotDetailThemaChartDetailInfoList", mapParameter);
			
			String dispDataType = "";
			List itmDataCd = new ArrayList();
			List c1DataCd = new ArrayList();
			List c2DataCd = new ArrayList();
			List c3DataCd = new ArrayList();
			
			String itm_cd = StringUtil.isNullToString(mapParameter.get("itm_cd"));
			String c1 = StringUtil.isNullToString(mapParameter.get("c1"));
			String c2 = StringUtil.isNullToString(mapParameter.get("c2"));
			String c3 = StringUtil.isNullToString(mapParameter.get("c3"));
			String disp_data_type = StringUtil.isNullToString(mapParameter.get("disp_data_type"));
			
			if(!"".equals(itm_cd) || !"".equals(c1) || !"".equals(c2) || !"".equals(c3)) {
				if(!"".equals(itm_cd)) {
					itmDataCd.add(itm_cd);					
				}
				if(!"".equals(c1)) {
					c1DataCd.add(c1);					
				}
				if(!"".equals(c2)) {
					c2DataCd.add(c2);					
				}
				if(!"".equals(c3)) {
					c3DataCd.add(c3);					
				}
				if(!"".equals(disp_data_type)) {
					dispDataType = disp_data_type;
				}
			} else {
				if(itemChartInfoDetailList != null && itemChartInfoDetailList.size() > 0) {
					for(Map<String, Object> itemChartInfoDetailListMap : itemChartInfoDetailList) {
						dispDataType = StringUtil.isNullToString(itemChartInfoDetailListMap.get("disp_data_type"));
						String dataType = StringUtil.isNullToString(itemChartInfoDetailListMap.get("data_type"));
						String dataCd = StringUtil.isNullToString(itemChartInfoDetailListMap.get("data_cd"));
						String subsumYn = StringUtil.isNullToString(itemChartInfoDetailListMap.get("subsum_yn"));
						
						if("Y".equals(subsumYn) || !dispDataType.equals(dataType)) {
							if("ITM".equals(dataType)) {
								itmDataCd.add(dataCd);
							} else if("C1".equals(dataType)) {
								c1DataCd.add(dataCd);
							} else if("C2".equals(dataType)) {
								c2DataCd.add(dataCd);
							} else if("C3".equals(dataType)) {
								c3DataCd.add(dataCd);
							}						
						}
						
					}
				}
			}
			
			if(itmDataCd.size() > 0) {
				mapParameter.put("itmDataCd", itmDataCd);				
			}
			if(c1DataCd.size() > 0) {
				mapParameter.put("c1DataCd", c1DataCd);				
			}
			if(c2DataCd.size() > 0) {
				mapParameter.put("c2DataCd", c2DataCd);				
			}
			if(c3DataCd.size() > 0) {
				mapParameter.put("c3DataCd", c3DataCd);				
			}
			mapParameter.put("dispDataType", dispDataType);
			
			// 차트정보 조회  차트별(항목)
			List<Map> tmsresData = session.selectList("totSurvDetail.getTotDetailTmsresChartDataList", mapParameter);
			result.put("tmsresData", tmsresData);
			
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
