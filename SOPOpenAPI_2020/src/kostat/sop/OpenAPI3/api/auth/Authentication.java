package kostat.sop.OpenAPI3.api.auth;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.OpenAPI3.common.controller.AbsQuery;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;

/**
* 인증 API
* 발급된 인증키를 통한 인증단계를 처리하는 API
* <pre>
* input : authentication.json/xml
* output : json/xml
* Table : TB_API_AUTH_INFO
* </pre>
*
* <pre>
* <b>History:</b> 
* 심홍헌, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 심홍헌
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Authentication extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(Authentication.class);
	private String srv_id = null;
	
	@Override
	public String getApiId() {
		return "API_0101";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		Map accestoken =null;
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			String strFormat =_getViewType(req,res);
			
			if(!(strFormat.equals("json")||strFormat.equals("xml"))){
				throw new NotSupportFormatException("Not Support Format[" + strFormat + "]");
			}
			
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String consumer_key = (String) mapParameter.get(MustParam.consumer_key.name());
			String consumer_secret = (String) mapParameter.get(MustParam.consumer_secret.name());
			
			if(20<consumer_key.getBytes().length){
				throw new ApiException("consumer_key는 20바이트까지만 가능합니다", COMM_ERR_CODE.AUTH_FAILE);
			}
			if(64<consumer_secret.getBytes().length){
				throw new ApiException("consumer_secret는 64바이트까지만 가능합니다", COMM_ERR_CODE.AUTH_FAILE);
			}

//			String authcount = (String) session.selectOne("auth.getAuthentication", mapParameter);
			List consumer_secret_list = session.selectList("auth.getAuthentication", mapParameter);
//			System.out.println("srv_id : "+srv_id);
			if(consumer_secret_list.size()==0){
				throw new ApiException("인증정보가 존재하지 않습니다", COMM_ERR_CODE.AUTH_FAILE);
			} 
			
			for(int i=0 ; i< consumer_secret_list.size(); i++){
				String secret_key = (String) consumer_secret_list.get(i);
				if(secret_key.equals(consumer_secret)){
					srv_id = consumer_key;
				}
			}
			
			if(srv_id==null){
				throw new ApiException("인증정보가 존재하지 않습니다", COMM_ERR_CODE.AUTH_FAILE);
			}
			
//			long currentTimeMillis =System.currentTimeMillis();
//			String lastauthtime = String.valueOf(System.currentTimeMillis());
			String token = getToken();
			mapParameter.put("accessToken", token);
//			mapParameter.put("regdate", TimeUtil.getTokenTimeStamp(currentTimeMillis));
			session.insert("auth.setAccestokenInfo", mapParameter);
			
			accestoken= new HashMap();
			accestoken.put("accessToken", token);
			accestoken.put("accessTimeout", String.valueOf(System.currentTimeMillis()+600000));

			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
//			throw new ParameterException("입력값을 체크 해 주세요");
			throw new ApiException("입력값을 체크 해 주세요",COMM_ERR_CODE.ERR_PARAM);
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.",COMM_ERR_CODE.EXECUTE_FAILE);
		}
		return accestoken;
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
		consumer_key, consumer_secret		
	}
	
	enum OptionParam
	{	
	}
	
	private String getToken() {
		return UUID.randomUUID().toString();
	}

	@Override
	public String checkAuth(Map mapParameter) {
		return null;
	}
	
	public void successExecute(SqlSession session, String srv_id, NFData datas) throws AbsException {
		
		if(this.srv_id==null){
			logger.debug("srv_id is null");
			return;
		}
		HashMap<String,String> loginfomap = new HashMap<String,String>();
		loginfomap.put("srv_id", this.srv_id);
		loginfomap.put("succ_yn", "Y");
		loginfomap.put("api_id", datas.getString(CommonTag.id.name()));
		loginfomap.put("tr_id", datas.getString(CommonTag.trId.name()));
		insertlog(session, loginfomap);
		this.srv_id=null;
	}


}
