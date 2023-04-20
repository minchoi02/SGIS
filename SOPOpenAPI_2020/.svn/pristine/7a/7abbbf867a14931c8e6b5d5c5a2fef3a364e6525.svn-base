package kostat.sop.OpenAPI3.common.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;

import kostat.sop.OpenAPI3.common.util.StringUtil;
import kostat.sop.OpenAPI3.common.util.TimeUtil;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;


public abstract class AbsAuthAPI<T> extends AbsQuery<T> {
	private static final Log logger = LogFactory.getLog( AbsAuthAPI.class );
	
	/**
	 *  Class 에서 파라미터 가공 및 최적화 위한 함수
	 */
	abstract protected void optimizeParameterMap(Map mapParameter)
			throws Exception; 
	


	public String checkAuth(Map mapParameter) throws AbsException {
		// TODO Auto-generated method stub
		
//		Map mapParameter = getParameterMap(req);
		String accessToken = (String) mapParameter.get("accessToken");
		
		// 공공데이터포털 게이트웨이를 통해서 요청이 왔을 경우.
		if( accessToken.equals( "KDATA" )) {
			return Properties.getData_portal_service_key();
		}
		
		if(accessToken==null||accessToken.equals("")){
			throw new ApiException("accessToken check", COMM_ERR_CODE.AUTH_FAILE);
		}
		
//		인증쪽 간편화 키 상용화 되었으므로 주석처리
//		if(accessToken.equals("1111")){
//			return "test_service1";
//		}
		
		//2017.07.25 [개발팀] by pass 기능 추가
		if (accessToken.equals("BYPASS")) {
			return null;
		}
		
		Map accessTokendata = new HashMap();
		accessTokendata.put("accessToken", accessToken);
		String srv_id=null;
		String regdate=null;
		
		Map authMap=null;
		for(int i = 0 ; i < 3 ; i ++ ){
			authMap =  (Map) session.selectOne("auth.getAccessTokenData",accessTokendata);
			if(authMap==null){
				try {
					Thread.sleep(100);
				} catch (Exception e) {
					
				}
			}else{
				break;
			}
		}
		if(authMap==null){
			throw new ApiException("인증 정보가 존재하지 않습니다", COMM_ERR_CODE.AUTH_FAILE);
		}
		regdate = (String) authMap.get("lately_use_ts");
		srv_id = (String) authMap.get("srv_id");
		
		
		long dbinserttime = 0; 
		long currentauthtime = System.currentTimeMillis();
			try {
				dbinserttime = TimeUtil.getDateTime(regdate);
				logger.debug("current Time : "+TimeUtil.getTokenTimeStamp(currentauthtime));
			} catch (Exception e) {
				throw new ApiException("서버 타임체크에러", COMM_ERR_CODE.AUTH_FAILE);
			}
			
//				if((currentauthtime-dbinserttime)>86400000){
			if((currentauthtime-dbinserttime)>7200000){
				logger.debug((currentauthtime-dbinserttime)+" time out");
				session.delete("auth.deleteAccessToken", accessTokendata);
				throw new ApiException("커넥션 타임이 만료되었습니다. 다시 인증해 주세요.", COMM_ERR_CODE.AUTH_FAILE);
			}else{
				logger.debug((currentauthtime-dbinserttime)+" time");
				//accesstoken 만료기간 연장
//				accessTokendata.put("regdate", TimeUtil.getTokenTimeStamp(currentauthtime));
				//session.update("auth.updateAccessTokentime",accessTokendata);
			}
		return srv_id;
	}

//	public void successExecute(String srv_id, NFData datas) throws AbsException {
//		// TODO Auto-generated method stub
//		logger.info("API SECCESS API_ID ["+getApiId()+"] ["+srv_id+"]");
////		super.successExecute(req, res, datas);
//	}
	
	public void userareackeck(Map mapParameter) throws AbsException {
		String area = (String) mapParameter.get("area");
		if(area == null){
			throw new ApiException("좌표데이터를 입력하세요", COMM_ERR_CODE.ERR_PARAM);
		}
		String area_kind = null;
		String round = null;
		
		
		
		if(area.toUpperCase().contains("CIRCLE")){
			area_kind="POINT";
			area = area.toUpperCase().replace("CIRCLE(", "");
			area = area.replace(")", "");
			
			String circle_list[] = area.split(",");
			
			mapParameter.put("round", circle_list[1]);
			mapParameter.put("area","POINT("+circle_list[0]+")");
			
			round = (String) session.selectOne("boundary.cercleuserareacheck", mapParameter);
//			logger.info("area size : "+round);
		}else if(area.toUpperCase().contains("RECTANGLE")){
			area_kind="RECTANGLE";
			round = (String) session.selectOne("boundary.rectuserareacheck", mapParameter);
//			logger.info("area size : "+round);
		}else if(area.toUpperCase().contains("POLYGON")){
			area_kind="POLYGON";
			round = (String) session.selectOne("boundary.polygonuserareacheck", mapParameter);
//			logger.info("area size : "+round);
		}else if(area.toUpperCase().contains("LINE")){
			
			area_kind="LINE";
			area = area.replace("LINE(", "");
			String circle_list[] = area.split("\\),");
			round="50000";
			if(circle_list.length==2){
				mapParameter.put("area","linestring"+circle_list[0]+")");
				area = circle_list[1].replace(")", "");
			}else{
				throw new ApiException("좌표데이터를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}
			circle_list=null;
			circle_list = area.split(",");
			
			if(circle_list.length==2){
				String data_round=circle_list[0];
				String direction=circle_list[1];
				
				if(!StringUtil.NumberChk(data_round)){
					throw new ApiException("round는 1부터 100까지의 정수형만 가능합니다.", COMM_ERR_CODE.ERR_PARAM);
				}
				if(1>Integer.parseInt(data_round)||100<Integer.parseInt(data_round)){
					throw new ApiException("round는 1부터 100까지의 정수형만 가능합니다.", COMM_ERR_CODE.ERR_PARAM);
				}
				if(!(direction.equals("both")||direction.equals("left")||direction.equals("right"))){
					throw new ApiException("방향설정은 left/right/both만 가능합니다.", COMM_ERR_CODE.ERR_PARAM);
				}
				
				mapParameter.put("round", data_round);
				mapParameter.put("direction", direction);
			}else{
				throw new ApiException("좌표데이터를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}
//			logger.info("area size : "+round);
		}else{
			throw new ApiException("좌표데이터를 입력하세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		if(Double.valueOf(round)>80000000){
			throw new ApiException("영역 사이즈가 기준보다 큽니다", COMM_ERR_CODE.ERR_PARAM);
		}
		
		if(Double.valueOf(round)<20000){
			throw new ApiException("영역 사이즈가 기준보다 작습니다", COMM_ERR_CODE.ERR_PARAM);
		}
		
		mapParameter.put("area_kind", area_kind);
	}
	
	//클라이언트 IP 확인
	protected String getClientIp(HttpServletRequest req) {
		String clientIp = req.getHeader("Proxy-Client-IP");
		if (clientIp == null) {
			clientIp = req.getHeader("WL-Proxy-Client-IP");
		if (clientIp == null) {
			clientIp = req.getHeader("X-Forwarded-For");
			if (clientIp == null) {
				clientIp = req.getRemoteAddr(); 
			}
		}
	}

		  return clientIp;
	}

}
