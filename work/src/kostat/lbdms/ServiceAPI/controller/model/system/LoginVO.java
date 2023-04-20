package kostat.lbdms.ServiceAPI.controller.model.system;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
* <pre>
* 로그인 정보
* </pre>
*
* @author        오범용
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========
*
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      오범용                        최초생성
*
*/

public class LoginVO {

	/** 아이디 */
	private String id;
	/** 맴버 정보 */
	private MemberVO member;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public MemberVO getMember() {
		return member;
	}
	public void setMember(MemberVO member) {
		this.member = member;
	}
	@Override
	public String toString() {
		return "LoginVO [id=" + id + ", member=" + member + "]";
	}




}
