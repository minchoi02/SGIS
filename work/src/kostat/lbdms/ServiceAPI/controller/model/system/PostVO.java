package kostat.lbdms.ServiceAPI.controller.model.system;

import java.util.List;

import lombok.Data;

/**  
* <pre>
* 첨부 목록
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
public class PostVO{
	/**게시물번호*/
	private int id;
	/**게시물번호*/
	private int post_no;
	/**로우번호*/
	private int row;
	/**사용자아이디*/
	private String user_id;
	/**등록자명*/
	private String user_nm;
	/**제목*/
	private String title;
	/**내용*/
	private String content;
	/**내용 줄바꿈*/
	private String content_br;
	/**조회수*/
	private int view_cnt;
	/**첨부파일 개수*/
	private int file_cnt;
	/**등록일*/
	private String reg_ts;
	/**정렬번호*/
	private int order_no;
	/**첨부파일(attach,attach,attach...)*/
	private String attach;
	
	/** 답변 */
	/**답변여부*/
	private String ans_yn;
	/**답변자아이디*/
	private String ans_id;
	/**답변자명*/
	private String ans_nm;
	/**사용자 e-mail*/
	private String email;
	/**답변내용*/
	private String comment;
	/**답변내용 줄바꿈*/
	private String comment_br;
	/**답변등록일*/
	private String ans_ts;
	/**답변수정일*/
	private String ans_mod_ts;
	/**답변삭제여부*/
	private boolean ans_del_yn;
	
	/**정렬증가여부*/
	private boolean plus_yn;
	
	/** 첨부파일 List */
	private List<FileVO> attachments;
	/** 삭제 Array */
	private String[] delArray;
	
	/**로그인 사용자 아이디*/
	private String login_id;
	
	
	// 팝업공지 start ------------------------
	/**사용여부*/
	private String use_yn;
	/**일시_ts*/
	private String dt_ts;
	/**등록자ID*/
	private String reg_user_id;
	/**수정일시*/
	private String mod_dt;
	/**수정자ID*/
	private String mod_user_id;
	/**수정자명*/
	private String mod_user_nm;
	/**공지시작일시*/
	private String notice_start_dt;
	/**공지종료일시*/
	private String notice_end_dt;
	/**팝업높이*/
	private int popup_hight;
	/**팝업가로*/
	private int popup_width;
	/**팝업x위치*/
	private int popup_x_pos;
	/**팝업y위치*/
	private int popup_y_pos;
	/**이미지파일경로명*/
	private String image_file_path_nm;
	// 팝업공지 end ------------------------
	
}