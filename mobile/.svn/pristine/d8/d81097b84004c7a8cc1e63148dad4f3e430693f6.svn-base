package egovframework.sgis.m2021.totSurv.service.impl;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2021.totSurv.service.TotSurvService;
import egovframework.sgis.m2021.totSurv.service.mapper.kairos.TotSurvMapper;


@Service("totSurvService")
public class TotSurvServiceImpl extends EgovAbstractServiceImpl implements TotSurvService {
	
	@Resource(name="totSurvMapper")
	private TotSurvMapper totSurvMapper;
	@Override
	public JsonData getSggListJsonList(
		HttpServletRequest request,
		HttpServletResponse response,
		String year, 
		String sido_cd 
	) {
		return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, totSurvMapper.selectSggListJsonList(year, sido_cd));
	}
}
