package kostat.lbdms.ServiceAPI.common.web.model;

import lombok.Data;
import net.sf.json.JSONObject;

/**  
* <pre>
* 통계 분석
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
public class StatsAnalysis {
	
	/**통계분석*/
	/** resource_id */
	private int resource_id;
	/** resource_id ex) 1,4,6 */
	private String resource_ids;
	
	/** resource 소유자 */
	private String resource_user_id;
	
	/** 데이터명 */
	private String data_name;
	/** 차트명 */
	private String chart_name;
	/** 그룹시작 태그 */
	private String group;
	/** 그룹 변수 true/false */
	private String exists; 
	/** 그룹 변수 컬럼 (exists가 tre일 경우 필수) */
	private String column; 
	/** 사용자 아이디 */
	private String user_id;
	/** 리터 받은 테이블 명 */
	private String data_table;
	/** 리턴 받은 테이블 스키마 명 */
	private String data_table_schema;
	/** 저장할 테이블 명 */
	private String result_table_name;
	/** 저장한 테이블 명 */
	private String result_table;
	/** 저장할 테이블의 스키마 명 */
	private String result_table_schema;
	/** 분석 변수 */
	private String variable;
	/** resource 설명 */
	private String description; 
	/** 출처 */
	private String category1; 
	/** 테마 */
	private String category2; 
	/** 태그 */
	private String category3; 
	/** 단계 */
	private String category4; 
	/** 통계선택변수(MIN,MAX,....) */
	private String statistics;
	/** 조건리스트 JSONArray 문자열 */
	private String condition;
	/** chart svg */
	private String svg;

	/************보고서***************/
	/** 보고서명 */
	private String rpt_name; 
	/** 보고서 설명 */
	private String rpt_description; 
	/** 보고서 출처 */
	private String rpt_category1; 
	/** 보고서 테마 */
	private String rpt_category2; 
	/** 보고서 태그 */
	private String rpt_category3;
	/** 보고서 태그 */
	private String rpt_category4;
	/** 보고서 데이터 */
	private JSONObject table;
}
