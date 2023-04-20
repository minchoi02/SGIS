package egovframework.sgis.cmmn.util;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JsonData {
	public JsonData(HttpServletRequest request,HttpServletResponse response,StringUtils.COMM_ERR_CODE errCd,String errMsg,Object result){
		this.errCd = errCd.getErrCode();
		if(errCd==StringUtils.COMM_ERR_CODE.SUCCESS){
			this.errMsg = "Success";
		}else{
			if(StringUtils.hasText(errMsg)){
				this.errMsg = errMsg;
			}else{
				this.errMsg = errCd.getErrMsg();
			}
		}
		this.result = result;
		this.trId = UUID.randomUUID();
		this.ts = request.getHeader("ts");
		String headerKey = "timeStamp:" + this.ts + ";errCd:" + this.errCd + ";trId:" + this.trId + ";";
		response.setHeader("headerKey", StringUtils.toSHA256(headerKey));
	}
	private int errCd;
	private String errMsg;
	private Object result;
	private UUID trId;
	private String ts;
	public int getErrCd() {
		return errCd;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public Object getResult() {
		return result;
	}
	public UUID getTrId() {
		return trId;
	}
	public String getTs() {
		return ts;
	}
}
