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

public class GetTotDetailTableDataList extends AbsQuery<Map>{

private static final Log logger = LogFactory.getLog(GetTotDetailTableDataList.class);
	
	enum MustParam
	{	
		survId
		, year
		, region_cd
		, item_seq
	}

	enum OptionParam
	{
		isAtdrc
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116707";
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
			
			// 차트정보 조회  차트별(상세항목)
			List<Map<String, Object>> itemChartInfoDetailList = session.selectList("totSurvDetail.getTotDetailThemaChartDetailInfoList", mapParameter);
			
			List<Map<String, Object>> totSurvInfo = session.selectList("getDetailTotSurvInfo", mapParameter);
			String tms_provd_cnt = StringUtil.isNullToString(totSurvInfo.get(0).get("tms_provd_cnt"));
			mapParameter.put("tms_provd_cnt", tms_provd_cnt);
			
			String dispDataType = "";
			List itmDataCd = new ArrayList();
			List c1DataCd = new ArrayList();
			List c2DataCd = new ArrayList();
			List c3DataCd = new ArrayList();
			
			if(itemChartInfoDetailList != null && itemChartInfoDetailList.size() > 0) {
				for(Map<String, Object> itemChartInfoDetailListMap : itemChartInfoDetailList) {
					dispDataType = StringUtil.isNullToString(itemChartInfoDetailListMap.get("disp_data_type"));
					String dataType = StringUtil.isNullToString(itemChartInfoDetailListMap.get("data_type"));
					String dataCd = StringUtil.isNullToString(itemChartInfoDetailListMap.get("data_cd"));
					String subsumYn = StringUtil.isNullToString(itemChartInfoDetailListMap.get("subsum_yn"));
					
					if("N".equals(subsumYn)) {
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
			
			// 연도 설정
			List yearList = new ArrayList();
			int start_year = Integer.parseInt(StringUtil.isNullToString(totSurvInfo.get(0).get("start_year")));
			int end_year = Integer.parseInt(mapParameter.get("year").toString());
			String updt_cycle = StringUtil.isNullToString(totSurvInfo.get(0).get("updt_cycle"));
			int tempupdtCycle = 1;
			if(updt_cycle.equals("년")){
				tempupdtCycle = 1;
			} else if(updt_cycle.equals("5년")){
				tempupdtCycle = 5;
			}
			for(int i=end_year; i>=start_year; i=i-tempupdtCycle) {
				yearList.add(i);
			}
			mapParameter.put("yearList", yearList);
			
			String regionGb = mapParameter.get("region_cd").toString();
			String level = "sido";			
			if(regionGb.length()==2) {
				level = "sido";
			} else if(regionGb.length()==5) {
				level = "sgg";
			} 
			mapParameter.put("level", level);
			
			List<Map<String, Object>> dataList = session.selectList("totSurvDetail.getTotDetailTableDataList", mapParameter);
						
			result.put("dataList", dataList);
			result.put("yearList", yearList);
			
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
