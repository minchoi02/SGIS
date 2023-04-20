package kostat.lbdms.ServiceAPI.controller.model.rest;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Data;

/**  
* <pre>
* 실행 이력 관리
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
@Data
public class Execute {
    /** 생존시간 */
	private String alive_time;
	/** 상태 */
	private String state;
	/** 시작상태 */
	private String send_state;
	/** execute 상태 */
	private String exe_state;
	/** 실행설명 */
	private String execute_description;
	/** 예약 */
	private String reserve;
	/** 입력 자원 아이디 */
	private String input_resource_id;
	/** 출력 자원 아이디 */
	private String output_resource_id;
	/** 액션 이름 */
	private String action_name;
	/** 작업디자인 아이디 */
	private String workflow_id;
	/** 데이터 이름 */
	private String data_name;
	/** 사용자 아이디 */
	private String user_id;
	/** 액션종류 */
	private String action_type;
	/** 시작시간 */
	private String start_time;
	/** 관계 실행 아이디 */
	private String relation_execute_id;
	/** 실행 아이디 */
	private String execute_id;
	/** 데이터 저장 종류 */
	private String data_storage_type;
	/** 업무자동화 작업 아이디 */
	private String workflow_execute_id;
	/**스케쥴 아이디  */
	private String schedule_id;
	/** 진행 횟수 */
	private int cur_cnt;
	/** 최대 횟수 */
	private int max_cnt;
	/** 종료 시간 */
	private String end_time;
	/** 액션 아이디 */
	private String action_id;
	
	/** 카테고리1 */
	private String category1;
	/** 카테고리2 */
	private String category2;
	/** 카테고리3 */
	private String category3;
	/** 카테고리4 */
	private String category4;
	/** 분석이력에서 필요한 설명 */
	private String desc_nm;
	
	private String execute_definition;
	
	/**
	 * @brief 현재 날짜와 user ID를 조합해서  ID 생성
	 * @param user
	 * @return
	 */
	public String setGenerateId(String user){
		Date date = new Date();
		long time = date.getTime();
		Timestamp ts = new Timestamp(time);
		long longTime= Long.valueOf(ts.getTime());
		
		this.setExecute_id( new String(longTime+"_"+user) );
		return this.getExecute_id();
	}

}
