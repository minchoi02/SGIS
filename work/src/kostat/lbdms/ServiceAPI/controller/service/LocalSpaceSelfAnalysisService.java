package kostat.lbdms.ServiceAPI.controller.service;

import kostat.lbdms.ServiceAPI.common.web.model.DenseAnalysis;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface LocalSpaceSelfAnalysisService {
	
	public JSONObject analyze(DenseAnalysis data, JSONArray conditions) throws SystemFailException;
}