package kostat.lbdms.ServiceAPI.controller.model.system;

import java.util.HashMap;

import kostat.lbdms.ServiceAPI.common.util.QueryUtil;
import lombok.Getter;
import lombok.Setter;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * <pre>
 * 데이터 수정(테이블)관련 VO 클레스
 * </pre>
 *
 * @author Admin
 * @since 2015. 10. 20. 오후 2:18:53
 * @version 1.0
 * @see
 * 
 *      <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *      </pre>
 */
public class DataModifyVO {
	@Getter @Setter
	private String login_id;

	/** 테이블명 */
	@Getter @Setter
	private String table_name;
	/** schema */
	@Getter @Setter
	private String schema;
	/** 합칠테이블명 */
	@Getter @Setter
	private String combine_table_name;
	/** 다른이름으로저장테이블명 */
	@Getter @Setter
	private String new_table_name;

	/** 데이터수정할컬럼명 */
	@Getter @Setter
	private String modify_column_name;
	/** 삭제할컬럼명 */
	@Getter @Setter
	private String drop_column_name;

	/** 컬럼명 */
	@Getter @Setter
	private String column_name;
	/** 데이터타입 */
	@Getter @Setter
	private String data_type;
	/** 최대길이 */
	@Getter @Setter
	private String column_length;
	/** 데이터타입udt */
	@Getter @Setter
	private String column_type;
	/** 코멘트 */
	@Getter @Setter
	private String column_comment;
	/** 스키마+테이블 or 스키마+테이블+컬럼 */
	@Getter @Setter
	private String target;
	/** 새로운 타겟 */
	@Getter @Setter
	private String new_target;
	/** 변경할컬럼명 */
	@Getter @Setter
	private String new_column_name;
	/** 변경할컬럼타입 */
	@Getter @Setter
	private String new_data_type;
	/** 변경할컬럼코멘트 */
	@Getter @Setter
	private String new_column_comment;
	/** 수정할데이터조건 */
	@Getter @Setter
	private String where;
	/** 수정할데이터 */
	@Getter @Setter
	private String modify_text;

	/** json 문자열 */
	@Getter @Setter
	private String json_str;

	/** rid */
	@Getter @Setter
	private String rid;

	/** update문 set에 들어갈 key = value */
	@Getter @Setter
	private String query;
	/** 테이블합치기 테이블 삭제여부 */
	@Getter @Setter
	private boolean drop_table;

	/** 테이블합치기 합칠 테이블 컬럼 */
	@Getter @Setter
	private String combine_columns;
	/** 테이블합치기 테이블 컬럼 */
	@Getter @Setter
	private String columns;
	/** 시도 / 시군구 코드 타입 */
	@Getter @Setter
	private String codeType;

	/**
	 * <pre>
	 * 데이터 조건 =>> SQL WHERE조건으로 변경
	 * </pre>
	 * 
	 * @param JSONArray
	 *            condition_list
	 * @return where
	 */
	public static String whereMake(JSONArray condition_list) {
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("EQUAL_TO", "=");
		map.put("NOT_EQUAL_TO", "!=");
		map.put("LESS_THAN", "<");
		map.put("GREATER_THAN", ">");
		map.put("LESS_THAN_OR_EQUAL_TO", "<=");
		map.put("GREATER_THAN_EQUAL_TO", ">=");
		map.put("LIKE", "LIKE");

		String where = "";
		final String SPACE = " ";

		boolean parenthesis = false;

		for (int i = 0; i < condition_list.size(); i++) {
			JSONObject item = condition_list.getJSONObject(i);

			String column = QueryUtil.cleanStr(item.getString("COLUMN"));
			String data_type = QueryUtil.cleanStr(item.getString("DATA_TYPE"));
			String condition = QueryUtil.cleanStr((item.has("CONDITION") ? item.getString("CONDITION") : ""));
			String relational_operator = QueryUtil.cleanStr(item.getString("RELATIONAL_OPERATOR"));
			String conditional = QueryUtil.cleanStr(item.getString("CONDITIONAL_OPERATOR"));

			if (item.getString("RANGE").equalsIgnoreCase("VALUE")) {

				if (data_type.equalsIgnoreCase("number") && (condition == null || condition.isEmpty())) {
					condition = "0";
				}

				if (relational_operator.equalsIgnoreCase("LIKE")) {
					where += "CAST(" + column + " AS TEXT)";
					where += SPACE + "LIKE" + SPACE + "'%'||";
				} else {
					where += column;
					where += SPACE + map.get(relational_operator);
				}

				where += SPACE + "'" + QueryUtil.cleanStr(condition) + "'";

				if (relational_operator.equalsIgnoreCase("LIKE")) {
					where += SPACE + "||'%'";
				}

			} else {
				where += column;

				String min = (item.has("MIN") ? item.getString("MIN") : "0");
				String max = (item.has("MAX") ? item.getString("MAX") : "0");

				if (!(isStringDouble(min))) {
					min = "0";
				}

				if (!(isStringDouble(max))) {
					max = "0";
				}

				where += SPACE + "BETWEEN";
				where += SPACE + QueryUtil.cleanStr(min) + SPACE + "AND" + SPACE + QueryUtil.cleanStr(max);
			}

			if (conditional.equalsIgnoreCase("PARENTHESIS_AND") || conditional.equalsIgnoreCase("PARENTHESIS_OR")) {

				String andor = conditional.replaceAll("PARENTHESIS_", "");

				if (condition_list.size() != (i + 1)) {
					where += ")" + SPACE + andor + SPACE + "(";
				}

				parenthesis = true;

			} else {
				if (condition_list.size() != (i + 1)) {
					where += SPACE + conditional + SPACE;
				}
			}
		}

		if (parenthesis) {
			where = "(" + QueryUtil.cleanStr(where) + ")";
		}

		return where;
	}

	/**
	 * <pre>
	 * 문자열이 숫자형인지 체크
	 * </pre>
	 * 
	 * @param String
	 *            s
	 * @return boolean
	 */
	public static boolean isStringDouble(String s) {
		try {
			Double.parseDouble(s);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}

	@Override
	public String toString() {
		return "DataModifyVO [login_id=" + login_id + ", table_name=" + table_name + ", schema=" + schema
				+ ", combine_table_name=" + combine_table_name + ", new_table_name=" + new_table_name
				+ ", modify_column_name=" + modify_column_name + ", drop_column_name=" + drop_column_name
				+ ", column_name=" + column_name + ", data_type=" + data_type + ", column_length=" + column_length
				+ ", column_type=" + column_type + ", column_comment=" + column_comment + ", target=" + target
				+ ", new_target=" + new_target + ", new_column_name=" + new_column_name + ", new_data_type="
				+ new_data_type + ", new_column_comment=" + new_column_comment + ", where=" + where + ", modify_text="
				+ modify_text + ", json_str=" + json_str + ", rid=" + rid + ", query=" + query + ", drop_table="
				+ drop_table + ", combine_columns=" + combine_columns + ", columns=" + columns + ", codeType="
				+ codeType + "]";
	}
}
