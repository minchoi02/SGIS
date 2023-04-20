package kostat.lbdms.ServiceAPI.common.web.rest.constant;

/**  
* <pre>
* Category Key 관리 클래스
* </pre>
*
* @author        Admin
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
* </pre>
*/

public interface Category {
    	String COLLECT = "COLLECT";
	
	String MODIFY = "MODIFY";
	
	String ANALYSIS = "ANALYSIS";

	String WORKFLOW = "WORKFLOW";
	
	String STORAGE = "STORAGE";

	public interface AddressWorkflow {
		
		/* 주소 디비 관리 워크플로우 ( 도로명 ) */
		String ROAD_NAME = "WORKFLOW_ADDR_RN";
		
		/* 주소 디비 관리 워크플로우 ( 지번 ) */
		String JIBUN = "WORKFLOW_ADDR_JIBUN";
		
		/* 주소 디비 관리 워크플로우 ( 주소인덱스 ) */
		String ADDRESS_INDEX = "WORKFLOW_ADDR_IDX";
	}
}
