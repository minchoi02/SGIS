package kostat.sop.ServiceAPI.common.util;
/**   
 *
 * @ClassName: Success
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月25日 下午3:12:59    
 * @version V1.0      
 *    
 */
public class Success {
	private boolean success=false;
	private String msg;
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Success() {
	}
	public Success(boolean success, String msg) {
		this.success = success;
		this.msg = msg;
	}
}
