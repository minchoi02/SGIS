package kostat.lbdms.ServiceAPI.controller.model.rest;

import kostat.lbdms.ServiceAPI.common.web.rest.IConverter;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Category;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import lombok.Data;
import net.sf.json.JSONArray;
import java.util.HashMap;
import org.apache.commons.lang.StringUtils;

/**  
* <pre>
* 작업 흐름 정보
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
public class Workflow implements IConverter{
    	/** 작업흐름 아이디 */
	private String workflow_id;
	/** 작업흐름 이름 */
	private String workflow_name;
	/** 작업흐름 설명 */
	private String workflow_description;
	/** 액션 리스트 */
	private String action_list;
	/** 액션 JSONArray 형태 */
	private JSONArray actions;
	/** 사용자 아아디 */
	private String user_id;
	/** 새 카테고리 1 */
	private String category1;
	/** 새 카테고리 2 */
	private String category2;
	/** 새 카테고리 3 */
	private String category3;
	/** 새 카테고리 4 */
	private String category4;
	/** 사용 여부 */
	private String use_yn;
	/** 제출일 */
	private String submit_time;
	
	/** 스케쥴 시간 */
	private String schedule_time;
	/** 스케쥴 아이디 */
	private String schedule_id;
	/** 타겟 작업 코드 */
	private String trget_job_cd;
	
	/** 업무자동화 종류 */
	private String workflow_type;
	
	private String type;
	
	@Override
	public HashMap<String,Object> toAdderMap(){
		HashMap<String,Object> map = new HashMap<String,Object>();
		
		map.put("WORKFLOW_NAME", this.getWorkflow_name() );
		map.put("WORKFLOW_DESCRIPTION", StringUtils.defaultString( this.getWorkflow_description(), StringUtils.EMPTY ) );
		map.put("ACTION_LIST", StringUtils.defaultString( this.getAction_list(), StringUtils.EMPTY ) );
		map.put("USER_ID", this.getUser_id() );
				
		map.put( "CATEGORY1", this.getCategory1() );
		map.put( "CATEGORY2", this.getCategory2() );
		map.put( "CATEGORY3", StringUtils.defaultString( this.getCategory3(), StringUtils.EMPTY ) );
		map.put( "CATEGORY4", Category.WORKFLOW );
		map.put( "TRGET_JOB_CD", Command.WORKFLOW);
		
		map.put("WORKFLOW_TYPE", StringUtils.defaultString( this.getWorkflow_type(), "ACT" ) );
		
		map.put( "USE_YN", this.getUse_yn() );
		
		return map;
	}

	@Override
	public HashMap<String, Object> toModifierMap() {
		
		HashMap<String,Object> map = this.toAdderMap(); 
		map.put("WORKFLOW_ID", this.getWorkflow_id() );		
		return map;
	}
}
