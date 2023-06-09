package kostat.sop.ServiceAPI.api.edu_gallery;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.edu_gallery.InsertGalleryPollVoteInfo.MustParam;
import kostat.sop.ServiceAPI.api.edu_gallery.InsertGalleryPollVoteInfo.OptionParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.EduGalleryService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

@SuppressWarnings("rawtypes")
public class UpdateGalleryData extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(UpdateGalleryData.class);
	
	@Resource(name="eduGalleryService")
	private EduGalleryService galleryService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13512";
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
		return null;
	}
	
	enum MustParam
	{
		data_id,
		title,
		content,
		imgList,
		iconList,
		//srv_type,
		teach_pwd,
		open_yn,
		
	}
	
	enum OptionParam
	{
		tag,
		surveyduplication,
		survey_surv_end_dt,
		survey,
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
				
		
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();	
			if(login_id == null){
				throw new ApiException("로그인한 사용자만 사용할 수 있습니다");
			}
			mapParameter.put("member_id", login_id);
			
			galleryService.updateGalleryData(mapParameter);
			resultData.put("api_id", this.getApiId());
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return resultData;
	}
}
