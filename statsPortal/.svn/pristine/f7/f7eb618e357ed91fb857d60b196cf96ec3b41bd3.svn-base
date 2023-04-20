package kostat.sop.ServiceAPI.api.edu;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.EduService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class EduTeacherApply extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(EduTeacherApply.class);
	
	@Resource(name = "eduService")
	private EduService eduService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13612";
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
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		Map result = new HashMap();
		Map<String,Object> mapParameter = getParameterMap(req);
		
		try {
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmssS");
			Calendar date = Calendar.getInstance();
			String idDate = df.format(date.getTimeInMillis());
			String apply_seq = StringUtil.getRandomString(32)+ idDate;
			mapParameter.put("apply_seq", apply_seq);
			
			eduService.insertTeacher(mapParameter);
			
			return result;
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{
		member_id,
		school_grade,
		sido_cd,
		subject
		
	}
	enum OptionParam{
		
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
