package kostat.lbdms.ServiceAPI.common.web.model;

import java.util.HashMap;

import org.apache.commons.lang.StringUtils;

import kostat.lbdms.ServiceAPI.common.web.rest.IConverter;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Category;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.DataStorageTypes;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.TargetAgent;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import lombok.Data;

/**  
* <pre>
* 스크립트 행동
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
public class ScriptAction implements IConverter {
	/** 액션 아이디 */
	private String action_id;
	/** 데이터 이름 */
	private String data_name;
	/** 데이터 경로 */
	private String data_path;
	/** 자원 아이디 */
	private String resource_id;
	/** 액션 이름 */
	private String action_name;
	/** 액션 설명 */
	private String action_description;
	/** 사용자 아이디 */
	private String user_id;
	/** 타겟 에이전트 */
	private String target_agent;
	/** 카테고리 1 */
	private String category1;
	/** 카테고리 2 */
	private String category2;
	/** 카테고리 3 */
	private String category3;
	/** 카테고리 4 */
	private String category4;
	/** 액션 타입 */
	private String action_type;
	/** 데이터 저장 타입 */
	private String data_storage_type;
	/** 업로드 경로 */
	private String upload_path;
	/** 제출일 */
	private String submit_time;
	
	@Override
	public HashMap<String, Object> toAdderMap() throws SystemFailException {
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put( "ACTION_NAME", this.getAction_name() );
		map.put( "ACTION_DESCRIPTION", StringUtils.defaultString( this.getAction_description(), StringUtils.EMPTY ) );
		map.put( "USER_ID", this.getUser_id() );
	
		map.put( "CATEGORY1", this.getCategory1() );
		map.put( "CATEGORY2", this.getCategory2() );
		map.put( "CATEGORY3", StringUtils.defaultString( this.getCategory3(), StringUtils.EMPTY ) );
		map.put( "CATEGORY4", Category.ANALYSIS );
		
		map.put( "ACTION_TYPE", this.getAction_type() );
		
		// ACTION_TYPE == R이면 SOP04로 전송 
		if ( StringUtils.equalsIgnoreCase( this.getAction_type(), "R_SCRIPT") ){
			//map.put( "TARGET_AGENT", TargetAgent.SOP04 );
			map.put( "TARGET_AGENT", TargetAgent.NAMENODE2 );	// 2015.12.11 수정 ( R도 NAMENODE2 )
		} else {
			map.put( "TARGET_AGENT", TargetAgent.NAMENODE2 );
		}
		
		map.put("DATA_STORAGE_TYPE", DataStorageTypes.HDFS );
		
		if( this.getUpload_path() != null ){
			map.put("UPLOAD_PATH", this.getUpload_path() ); 
		}
		
		map.put( "RESOURCE_ID", this.getResource_id() );
		
		return map;
	}
	
	@Override
	public HashMap<String, Object> toModifierMap() throws SystemFailException {
		
		HashMap<String,Object> map = this.toAdderMap(); 
		map.put("ACTION_ID", this.getAction_id() );
		return map;
	}

}
