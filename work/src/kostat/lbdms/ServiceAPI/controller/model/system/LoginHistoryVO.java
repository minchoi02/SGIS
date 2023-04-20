package kostat.lbdms.ServiceAPI.controller.model.system;

import lombok.Data;

@Data
public class LoginHistoryVO {
    /** 히스토리 번호 */
	private int history_no;
	/** 사용자 아이디 */
	private String user_id;
	/** 로그인 시간 */
	private String login_ts;
	/** 로그인 상태 */
	private String login_sts;
	/** 아이피 */
	private String ip;
	/** 로그아웃 시간 */
	private String logout_time;
}
