package kostat.lbdms.ServiceAPI.controller.service;

import kostat.lbdms.ServiceAPI.common.web.model.MyDataAnalysis;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONObject;

public interface AreaAnalysisService {
	public JSONObject analyze(MyDataAnalysis data) throws SystemFailException;
}
