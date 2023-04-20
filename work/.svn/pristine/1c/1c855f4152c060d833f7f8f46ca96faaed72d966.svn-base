package kostat.lbdms.ServiceAPI.common.util;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * @Class Name : QueryMakeUtil.java
 * @Description : param값을 이용해 StringBuffer로 Query 반환
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2018.07.16 최초생성
 *
 * @author 최재영
 * @since 2018. 08.09
 * @version 1.0
 * @see
 *
 *      Copyright (C) by NeighborSystem All right reserved.
 */
public class QueryMakeUtil {

    public static String getRelationOperator(String operation) {
	String type = null;
	switch (operation) {
	case "EQUAL_TO":
	    type = " = ";
	    break;
	case "NOT_EQUAL_TO":
	    type = " != ";
	    break;
	case "LESS_THAN":
	    type = " < ";
	    break;
	case "GREATER_THAN":
	    type = " > ";
	    break;
	case "LESS_THAN_OR_EQUAL_TO":
	    type = " <= ";
	    break;
	case "GREATER_THAN_EQUAL_TO":
	    type = " >= ";
	    break;
	case "LIKE":
	    type = " LIKE ";
	    break;
	default:
	    break;
	}

	return type;
    }

    public static String conditionalOperator(String value, String conditionalOperator) {
	String strQuery = "";
	switch (conditionalOperator) {
	case "AND":
	    strQuery += value + " AND ";
	    break;
	case "OR":
	    strQuery += value + "OR ";
	    break;
	case "PARENTHESIS_AND":
	    strQuery += "(" + value + ") AND ";
	    break;
	case "PARENTHESIS_OR":
	    strQuery += "(" + value + ") OR ";
	    break;
	default:
	    break;
	}
	return strQuery;
    }
    
    public static boolean checkColumnType(String dataType) {
	switch (dataType) {
	case "character varying":
	case "text":
	case "char":
		return true;
	case "bigint":
	case "numeric":
	case "integer":
	case "smallint":
	case "double precision":
		return false;
	default:
		return true;
	}
    }
    
    public static String whereMakeQuery(org.json.JSONArray jArray) {
	
	/*{
	    "RANGE":"VALUE",
	    "RELATIONAL_OPERATOR":"EQUAL_TO",
	    "CONDITIONAL_OPERATOR":"AND",
	    "COLUMN":"item4",
	    "DATA_TYPE":"integer",
	    "CONDITION":"100",
	    "MIN":null,
	    "MAX":null
	}*/
	
	/*{
	    "RANGE":"LIMIT",
	    "RELATIONAL_OPERATOR":"EQUAL_TO",
	    "CONDITIONAL_OPERATOR":"AND",
	    "COLUMN":"item3",
	    "DATA_TYPE":"integer",
	    "CONDITION":"7",
	    "MIN":"1000",
	    "MAX":"3000"
	}*/
	
	StringBuffer queryStr = new StringBuffer();
	
	
	for(int i = 0; i < jArray.length(); i++) {
	    StringBuffer strBuffer = new StringBuffer();
	    try {
		JSONObject jObj = jArray.getJSONObject(i);
		
		String column = jObj.getString("COLUMN");
		String conditionalOperator = jObj.getString("RELATIONAL_OPERATOR");
		
		if(jObj.get("RANGE").toString().equalsIgnoreCase("VALUE")) {
		    //값 비교
		    String relationOperator = getRelationOperator(conditionalOperator);
		    
		    if (relationOperator == null) {
			throw new NullPointerException("제약 조건 설정이 잘못되었습니다.");
		    }	
		    strBuffer.append("a." + column);
		    strBuffer.append(" " +relationOperator);
		    
		    // 값 범위 지정
		    String condition = jObj.getString("CONDITION");
		    
		    if(relationOperator.equalsIgnoreCase("LIKE")) {
			strBuffer.append("'%" + condition + "%'");
		    }else {
			if(checkColumnType(jObj.getString("DATA_TYPE"))) {
			    strBuffer.append("'" + condition + "'");
			}else {
			    strBuffer.append(condition);
			}
		    }
		    
		}else {
		 // 범위 지정
		    strBuffer.append(" a." + column + ">" + jObj.getString("MIN").toString() + " AND " + "a." + column + "<" + jObj.getString("MAX").toString());
		}
		if(i < jArray.length()-1) {
		    queryStr.append(conditionalOperator(strBuffer.toString(),jObj.getString("CONDITIONAL_OPERATOR").toString()));
		}else {
		    queryStr.append(strBuffer.toString());
		}
	    } catch (JSONException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	}

	System.out.println("==========================");
	System.out.println(queryStr.toString());
	return queryStr.toString();
    }
    
}
