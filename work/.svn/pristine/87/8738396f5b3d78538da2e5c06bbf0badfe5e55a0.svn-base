package kostat.lbdms.ServiceAPI.common.web.model;

import java.util.HashMap;

import org.apache.commons.lang.StringUtils;

import kostat.lbdms.ServiceAPI.common.web.rest.IConverter;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Category;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.DataStorageTypes;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import lombok.Data;

/**  
* <pre>
* 스크립트 실행결과
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
public class Script implements IConverter {
	/** 자원 아이디 */
	private String resource_id;
	/** 사용자 아이디 */
	private String user_id;
	/** 데이터 저장 종류 */
	private String data_storage_type;
	/** 데이터 이름 */
	private String data_name;
	/** 데이터 저장 경로 */
	private String data_path;
	/** 액션 타입 */
	private String action_type;
	/** 카테고리 1 */
	private String category1;
	/** 카테고리 2 */
	private String category2;
	/** 카테고리 3 */
	private String category3;
	/** 카테고리 4 */
	private String category4;
	/** 데이타 내용 */
	private String data_content;
	/** 설명 */
	private String description;
	/** 응답 */
	private String response;
	
	@Override
	public HashMap<String, Object> toAdderMap() throws SystemFailException {
		
		HashMap<String, Object> map =new HashMap<String, Object>();
		
		map.put("USER_ID", this.getUser_id() );
		map.put("DATA_STORAGE_TYPE", DataStorageTypes.HDFS );
		
		map.put( "DATA_PATH", ConfigUtil.getString("hdfs.prefix")+this.getUser_id()+"/analysis/" + this.getData_name() );
		/*if ( StringUtils.isEmpty( this.getData_path() ) ){
			map.put( "DATA_PATH", ConfigUtil.getString("hdfs.prefix")+this.getUser_id()+"/analysis/" + FileNameUtil.makeFileNameWithDate() );
		}*/
		
		//map.put("DATA_PATH", this.getData_path() );
		
		map.put( "ACTION_TYPE", this.getAction_type() );
		map.put( "CATEGORY1", this.getCategory1() );
		map.put( "CATEGORY2", this.getCategory2() );
		map.put( "CATEGORY3", StringUtils.defaultString( this.getCategory3(), StringUtils.EMPTY ) );
		map.put( "CATEGORY4", Category.ANALYSIS );
		map.put( "DATA_CONTENT", this.getData_content() );
		map.put( "DESCRIPTION", StringUtils.defaultString( this.getDescription(), StringUtils.EMPTY ) );
		map.put( "RESPONSE", "TRUE" );
		
		return map;
	}
	
	@Override
	public HashMap<String, Object> toModifierMap() throws SystemFailException {
		
		HashMap<String,Object> map = new HashMap<String,Object>(); 
		map.put( "RESOURCE_ID", this.getResource_id() );
		map.put( "USER_ID", this.getUser_id() );
		map.put( "DATA_CONTENT", this.getData_content() );
		map.put( "RESPONSE", "TRUE" );
		
		return map;
	}

}
