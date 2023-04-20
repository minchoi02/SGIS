package kostat.lbdms.ServiceAPI.controller.model.core;

import lombok.Data;

/**  
 * <pre>
 * 리스트 타입 결과 클레스
 * </pre>
 *
 * @author		Admin
 * @since 		2015. 10. 20. 오후 2:18:53
 * @version 	    1.0
 * @see
 * <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *</pre>
 */
@Data
public class ListTypeResult<T> {
	/** 전체건수 */
	private int total = 0;
	/** 페이지번호 */
	private int page = 1;
	/** 조회 데이터 */
	private T data;
	/** 성공여부 */
	private boolean success = true;
	/** 실패사유 */
	private String reason;
	
}

