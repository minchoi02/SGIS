package kostat.lbdms.ServiceAPI.controller.service;

import kostat.lbdms.ServiceAPI.common.web.model.MyDataAnalysis;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONObject;

public interface BufferDataAnalysisService {
	public JSONObject bufferDataAnalysis(MyDataAnalysis data) throws SystemFailException;
}
