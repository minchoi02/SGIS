package kostat.sop.ServiceAPI.controller.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface KosisApiService {
	
	public Map getData()  throws Exception;

	public List getStblCategory()  throws Exception;

	public List getStblList(Map paramMap) throws Exception;

	public List getStblItmList(HashMap<String, Object> paramMap) throws Exception;

	public Map getTotSurvStatValidateParams(HashMap<String, Object> paramMap) throws Exception;

	public List getTotsurvKosisData(HashMap<String, Object> paramMap) throws Exception;
}
