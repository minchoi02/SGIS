package kostat.sop.ServiceAPI.quiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class SurveyList extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(SurveyList.class);

	@Override
	public String getApiId() {
		return "919101";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam
	{
		page_num,
		page_size
	}

	enum OptionParam
	{
		seq, sex, name, tel_no
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {

		httpSession = req.getSession();

		Map resultData = new HashMap();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);


			int totalCount = (int) session.selectOne("survey.totCnt", mapParameter);
			int page_size  = Integer.parseInt((String)mapParameter.get(MustParam.page_size.name()));
			int curPage    = Integer.parseInt((String)mapParameter.get(MustParam.page_num.name()));

			int totalPage = ((totalCount - 1) / page_size) + 1;
			int lastNum = page_size * curPage ;
			int firstNum = lastNum - page_size + 1 ;

			mapParameter.put("page_size", page_size);
			mapParameter.put("last_num", lastNum);
			mapParameter.put("firstNum", firstNum);
			mapParameter.put("page_num", curPage);

			List surveyList;

			surveyList = (List) session.selectList("survey.list", mapParameter);

			resultData.put("surveyList" , surveyList);
			resultData.put("total_count", totalCount);
			resultData.put("page_size"  , page_size);
			resultData.put("curPage"    , curPage);

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
		return resultData;
	}
	
	@Test
	public void listTest(){
		System.out.println("\n\n***** 테스트");
		System.out.println(logger);
	}
	
}
