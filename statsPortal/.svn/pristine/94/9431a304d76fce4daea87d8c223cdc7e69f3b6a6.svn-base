package kostat.sop.ServiceAPI.api.thematicMap;

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

/**

 */
@SuppressWarnings("unchecked")
public class GetChildcare extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(GetChildcare.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9047";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.GET;
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

	enum MustParam {

	}

	enum OptionParam {
		accessToken,
		type,
		sido_cd,
		sgg_cd,
		year,
		bnd_year,
		data_type,
		adm_cd,
		area
	}

	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException 
	{
		httpSession = req.getSession();

		List result = null;
		List< Map< String, Object > > listTemp = null; //2017.03.24 String -> Object 
		Map< String, Object > mapTemp = null;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			String type = "";
			if ( mapParameter.get( "type" ) != null ) {
				type =  (String) mapParameter.get( "type" );
			}
			
			if(type.equals("pg")) {
				result = (List) session.selectList("thematicMap.select.childcareList", mapParameter);
			} else if (type.equals("pt")) {
				result = (List) session.selectList("thematicMap.select.childcarePTList", mapParameter);
			} else if (type.equals("pi")) {
				result = (List) session.selectList("thematicMap.select.childcarePIList", mapParameter);
			} 
			logger.info("END Query - TXID[" + getApiId() + "] ");
		} catch (AbsAPIException e) {
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