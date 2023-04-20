package kostat.sop.OpenAPI3.search.address;

import java.io.BufferedReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import kostat.sop.OpenAPI3.search.index.GeocodeIndexFieldDefineEnum;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.regex.AbsRegex;

public class AddressDivision extends AbsRegex {
	private static final Log logger = LogFactory.getLog(AddressDivision.class);
	private Map<String, String> hashaddress;// = new HashMap<String, String>();
	private static boolean debugM = false;
	private static ArrayList<String[]> nounsArrAdm = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1011 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1012 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1013 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1014 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1015 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1021 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1022 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1023 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1025 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1024 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1031 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1032 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1033 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1034 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1035 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1041 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1042 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1043 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1044 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1045 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1051 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1052 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1053 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1054 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1055 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1061 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1062 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1063 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1064 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1065 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1071 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1072 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1073 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1074 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1075 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1081 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1082 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1083 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1084 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1085 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1091 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1092 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1093 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1094 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1095 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1101 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1102 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1103 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1104 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1105 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1111 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1112 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1113 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1114 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1115 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1121 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1122 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1123 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1124 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1125 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1131 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1132 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1133 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1134 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1135 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1141 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1142 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1143 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1144 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1145 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1151 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1152 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1153 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1154 = new ArrayList<>();
	private static ArrayList<String[]> nounsArr1155 = new ArrayList<>();

	
	static {
	    try {
	    	loadDic();
	    } catch (Exception e) {
	    	System.err.println("Cannot load the example native code.\nMake sure your LD_LIBRARY_PATH contains \'.\'\n" + e);
	    	System.exit(1);
	    }
	}
	
	/**
	 * @param args
	 */
	@SuppressWarnings({ "unused", "null" })
	public AddressDivision(String strAddress) {
	    try {
	    	if(nounsArr1011 == null || nounsArr1011.size() == 0) loadDic();
	    } catch (Exception e) {
	    	System.err.println("Cannot load the example native code.\nMake sure your LD_LIBRARY_PATH contains \'.\'\n" + e);
	    }	
	    
		/*matchDic matchingDic = null;
		try {
			matchingDic = matchDic.instance();
		} catch (Exception e1) {
			logger.debug(e1.getMessage());
		}*/
	    
		hashaddress = new HashMap<String, String>();
		strAddress = strAddress.trim();
		String strAddress2 = "";
		String[] FindResult = { "", "", "", "", "", "", "", "", "" };
		String[] strArr = strAddress.split(" ");
		String strAddressBak = " ";
		for (int stri=0;stri<strArr.length;stri++) {
			if (
				strArr[stri].indexOf("1") > -1 || strArr[stri].indexOf("2") > -1 || strArr[stri].indexOf("3") > -1 ||
				strArr[stri].indexOf("4") > -1 || strArr[stri].indexOf("5") > -1 || strArr[stri].indexOf("6") > -1 ||
				strArr[stri].indexOf("7") > -1 || strArr[stri].indexOf("8") > -1 || strArr[stri].indexOf("9") > -1 || strArr[stri].indexOf("0") > -1
				) 
			{
				strAddressBak += " " + strArr[stri] + " ";
			} else if (strAddressBak.indexOf(" " + strArr[stri] + " ") == -1) {
				strAddressBak += " " + strArr[stri] + " ";
			}
		}
		strAddress = strAddressBak.replaceAll("  ", " ").trim();
		
		//유의어 추가 해야함(임시)전북 부안군 부안읍 석신길46*28
		strAddress = strAddress.replaceAll("3 15대로", "3.15대로").replaceAll("315대로", "3.15대로").replaceAll("세종특별자치시 세종시", "세종특별자치시").
				replaceAll("상암월드컵", "월드컵").replaceAll("길\\.", "길").
				replaceAll("일곡설죽로", "설죽로").
				replaceAll("[+]", " ").replaceAll("[(]", " ").replaceAll("[)]", " ").
				replaceAll(" :", "").replaceAll("·", "\\.").replaceAll("`",  " `").
				replaceAll("_",  " ").replaceAll(",",  " , ").replaceAll("[？]",  " ").replaceAll("[*]",  " ") + " ";
		strAddress = strAddress.replaceAll("\\s+", " ");
		//replaceAll("[(]", " (").replaceAll("[)]", ") ").
		
		String sigungu = "";
		String sigungu_syn = "";
		String dongNm = "";
		String bonbuNum = "";
		String bonNum = "";
		//String[] rowAddress = strAddress.split(" ");
		
		/*if (
				strAddress.indexOf("길 ") == -1 
				&& strAddress.indexOf("로 ") == -1  
				&& strAddress.indexOf("고개 ") == -1  
				&& strAddress.indexOf("거리 ") == -1  
				&& strAddress.indexOf("동") == -1  
				&& strAddress.indexOf("읍") == -1  
				&& strAddress.indexOf("면") == -1  
				&& strAddress.indexOf("가 ") == -1 
				&& strAddress.indexOf("리 ") == -1
		)
		{
			
			String[] adds = strAddress.split(" ");
			for (int addsi=0;addsi< adds.length;addsi++) {
				//System.out.println(adds[addsi]+">"+adds[addsi].substring(adds[addsi].length()-1));
				if (
						!adds[addsi].substring(adds[addsi].length()-1).equals("시") &&
						!adds[addsi].substring(adds[addsi].length()-1).equals("도") &&
						!adds[addsi].substring(adds[addsi].length()-1).equals("군") &&
						!adds[addsi].substring(adds[addsi].length()-1).equals("구")
				) {
					int reti = 0;
					ArrayList<String[]> addArr = searchAddr(adds[addsi] +"동");
					if (addArr != null && addArr.size() > 0) {
						strAddress = strAddress.replaceAll(adds[addsi], adds[addsi] +"동");
						reti++;
					}
					ArrayList<String[]> addArr2 = searchAddr(adds[addsi] +"읍");
					if (addArr2 != null && addArr2.size() > 0 && reti == 0) {
						strAddress = strAddress.replaceAll(adds[addsi], adds[addsi] +"읍");
						reti++;
					}
					ArrayList<String[]> addArr3= searchAddr(adds[addsi] +"면");
					if (addArr3 != null && addArr3.size() > 0 && reti == 0) {
						strAddress = strAddress.replaceAll(adds[addsi], adds[addsi] +"면");
					}
				}
			}
		}*/
		
		//logger.debug(strAddress);
		if (
				strAddress.indexOf("길 ") == -1 
				&& strAddress.indexOf("로 ") == -1  
				&& strAddress.indexOf("고개 ") == -1  
				&& strAddress.indexOf("거리 ") == -1  
				&& strAddress.indexOf("번지") == -1 		
				&& (
						strAddress.indexOf("동 ") > -1 ||
						strAddress.indexOf("읍 ") > -1 ||
						strAddress.indexOf("면 ") > -1 ||
						strAddress.indexOf("가 ") > -1
				)
		)
		{
			strAddress = strAddress.replaceAll("\\s+", " ");
			if (strAddress.indexOf(" ") > -1) {
				Pattern rpattern = Pattern.compile("[읍면동가]\\s[0-9]{1,5}\\s[0-9]{1,4}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher = rpattern.matcher(strAddress.trim());
				StringBuffer replacedStringr = new StringBuffer();
				while (rmatcher.find()) {
					String matchStr = rmatcher.group();
					String repStr = matchStr.trim().replaceAll(" ", "-");
					rmatcher.appendReplacement(replacedStringr, repStr);
					break;
				}
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
			}
		}
		
		if (strAddress.indexOf(".") > -1) {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,5}\\s\\.\\s[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, " ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		if (strAddress.indexOf("/") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,5}/[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, matchStr.replaceAll("/", "-"));
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		if (strAddress.indexOf("(") > -1 && strAddress.indexOf(")") > -1) {
			int staf = strAddress.indexOf("(");
			int stal = strAddress.indexOf(")");
			String address_1_2 = "";
			if (staf<stal) {
				String str1 = strAddress.substring(0, staf);
				String str2 = "";
				if (stal < strAddress.length()) {
					str2 = strAddress.substring(stal+1, strAddress.length());
					address_1_2 = strAddress.substring(staf+1, strAddress.length() - stal);
				}
				strAddress2 = (str1.trim() + " " + str2.trim()).trim();
			}
		}
		
		if (strAddress.indexOf("~") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,5}~[0-9]{1,4}통", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr,  " ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		

		if (strAddress.indexOf("~") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,5}~[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr,  " ");
				bonbuNum = matchStr;
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			} else {
				strAddress = strAddress.replaceAll("~", " ").replaceAll("\\s+", " ").trim();
			}
		}
		String roNo = "";
		if (strAddress.indexOf("로") > -1) {
			Pattern rpattern = Pattern.compile("로[0-9]{2,4}번길", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				roNo = matchStr;
			}
		}
		if (strAddress.indexOf("로") > -1) {
			Pattern rpattern = Pattern.compile("로[0-9]{2,4}길", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				roNo = matchStr;
			}
		}
		if (strAddress.indexOf("로") > -1) {
				Pattern rpattern = Pattern.compile("로[0-9]{2,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher = rpattern.matcher(strAddress.trim());
				StringBuffer replacedStringr = new StringBuffer();
				String matchStr = "";
				while (rmatcher.find()) {
					matchStr = rmatcher.group();
					if (!roNo.startsWith(matchStr)) {
						String repStr = matchStr.replaceAll("로", "로 ");
						rmatcher.appendReplacement(replacedStringr, repStr);
					} else {
						matchStr = "";
					}
				}
				if (!matchStr.equals("")) {
					rmatcher.appendTail(replacedStringr);
					strAddress = replacedStringr.toString();
					strAddress =strAddress.replaceAll("\\s+", " ").trim();
				}
		}
		if (strAddress.indexOf("리") > -1) {
			Pattern rpattern = Pattern.compile("리[0-9]{2,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("리", "리 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("동") > -1) {
			Pattern rpattern = Pattern.compile("동[0-9-]{3,5}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("동", "동 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		//성수2가 3동 > 성수2가3동
		if (strAddress.indexOf("가") > -1 && strAddress.indexOf("동") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]가\\s?[0-9]동", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			String repStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				repStr = matchStr.replaceAll(" ", "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				ArrayList<String[]> addArr = searchAddr(repStr);
				if (addArr != null && addArr.size() > 0) {
					rmatcher.appendTail(replacedStringr);
					strAddress = replacedStringr.toString();
					strAddress =strAddress.replaceAll("\\s+", " ").trim();
				}
			}
		}		
		if (strAddress.indexOf("가길") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]가길[0-9]", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("가길", "가길 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}	
		if (strAddress.indexOf("가") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]가[0-9]", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("가", "가 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}	
		
		if (strAddress.indexOf("로") > -1) {
			Pattern rpattern = Pattern.compile("로[0-9]{2,4}[가-힣]{2,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			String repStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
			}
			repStr = matchStr;
			if (!matchStr.equals("")) {
				Pattern rpattern2 = Pattern.compile("[0-9]{2,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2 = rpattern2.matcher(repStr.trim());
				String matchStr2 = "";
				while (rmatcher2.find()) {
					matchStr = rmatcher2.group();
					matchStr2 = repStr.replaceAll(matchStr," " + matchStr + " ");
				}
				
				strAddress =strAddress.replaceAll(repStr, matchStr2).trim();
			}
		}
		
		if (strAddress.indexOf("시") > -1 && strAddress.indexOf("면") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣]{1,4}시[가-힣]{1,4}면", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("시", "시 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}	
		
		if (strAddress.indexOf("군") > -1 && strAddress.indexOf("면") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣]{1,4}군[가-힣]{1,4}면", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("군", "군 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}	
		
		if (strAddress.indexOf("군") > -1 && strAddress.indexOf("읍") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣]{1,4}군[가-힣]{1,4}읍", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("읍", "읍 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}	
					
		if (strAddress.indexOf("통") > -1 && strAddress.indexOf("반") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,4}통\\s?[0-9]{1,4}반", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}		
		
		if (strAddress.indexOf("통 ") > -1 && strAddress.indexOf("반 ") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,4}통\\s?[0-9]{1,4}반", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}

		//"경기도 안산시 상록구 오목로4길 3, 35통 3"
		if (strAddress.indexOf("통 ") > -1 && strAddress.indexOf("반 ") == -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,10}\\s,\\s[0-9]{1,4}통\\s[0-9]{1,10}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			String matchStr = ""; 
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				strAddress = strAddress.replaceAll(matchStr, matchStr.split(",")[0].trim()).trim();
			}
		}

		//"경기도 용인시 기흥구 사은로64 보라4통 64"
		if (strAddress.indexOf("통 ") > -1 && strAddress.indexOf("반 ") == -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,10}\\s[가-힣]{1,10}[0-9]{1,4}통\\s[0-9]{1,10}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			String matchStr = ""; 
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				strAddress = strAddress.replaceAll(matchStr, matchStr.split(" ")[0].trim()).trim();
			}
		}
		
		if (strAddress.indexOf("통 ") > -1 && strAddress.indexOf("반 ") == -1) {
			Pattern rpattern = Pattern.compile("[가-힣]{1,10}[0-9]{1,4}통\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			String[] addrArray = strAddress.split(" ");
			String matchStr = ""; 
			strAddress = strAddress.replaceAll("\\s+", " ");
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				break;
			}
			
			if (!matchStr.equals("")) {
				for (int adri=0;adri<addrArray.length;adri++) {
					if (addrArray[adri].equals(matchStr)) {
						addrArray[adri] = "";
						if (adri+1 <= addrArray.length && addrArray[adri-1].replaceAll("번지", "").replaceAll("번길", "").replaceAll("번", "").replaceAll("길", "").equals(addrArray[adri+1])) {
							addrArray[adri+1] = "";
							break;
						}
					}
				}
				
				String tmpAddr = "";
				for (int adri=0;adri<addrArray.length;adri++) {
					tmpAddr += addrArray[adri] + " ";
				}		
				strAddress =tmpAddr.replaceAll("\\s+", " ").trim();
			}
		}
		
		if (strAddress.indexOf("통 ") > -1 && strAddress.indexOf("반 ") == -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,10}\\s[0-9]{1,4}통\\s[0-9]{1,10}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			String matchStr = ""; 
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				break;
			}
			
			if (matchStr.equals("")) {
				Pattern rpattern2 = Pattern.compile("\\s[0-9]{1,4}통\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2 = rpattern2.matcher(strAddress.trim());
				String[] addrArray = strAddress.split(" ");
				String matchStr2 = ""; 
				strAddress = strAddress.replaceAll("\\s+", " ");
				while (rmatcher2.find()) {
					matchStr2 = rmatcher2.group().trim();
					break;
				}
				
				for (int adri=0;adri<addrArray.length;adri++) {
					if (addrArray[adri].equals(matchStr2)) {
						addrArray[adri] = "";
						if (adri+1 <= addrArray.length && addrArray[adri-1].replaceAll("번지", "").replaceAll("번길", "").replaceAll("번", "").replaceAll("길", "").equals(addrArray[adri+1])) {
							addrArray[adri+1] = "";
							break;
						}
					}
				}
				
				String tmpAddr = "";
				for (int adri=0;adri<addrArray.length;adri++) {
					tmpAddr += addrArray[adri] + " ";
				}		
				strAddress =tmpAddr.replaceAll("\\s+", " ").trim();
			}
		}
		
		//"서울특별시 노원구 섬밭로 265 , 3 265"
		if (strAddress.indexOf(" , ") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,10}\\s,\\s[0-9]{1,4}\\s[0-9]{1,10}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			String matchStr = ""; 
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				strAddress = strAddress.replaceAll(matchStr, matchStr.split(",")[0].trim()).trim();
			}
		}
		
		if (strAddress.indexOf("-") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,6}-[0-9]{1,6}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String[] matchArr = matchStr.split("-");
				String matchStr2 = Integer.parseInt(matchArr[0]) + "-" +  Integer.parseInt(matchArr[1]);
				String repStr = matchStr.replaceAll(matchStr, " " + matchStr2 + " ");
				bonbuNum = matchStr;
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		} else {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,6}\\s[0-9]{1,6}\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				String[] matchArr = matchStr.split(" ");
				String matchStr2 = Integer.parseInt(matchArr[0]) + " " +  Integer.parseInt(matchArr[1]);
				String repStr = matchStr.replaceAll(matchStr, " " + matchStr + " ");
				bonbuNum = matchStr;
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			} else {
				Pattern rpattern2 = Pattern.compile("\\s[0-9]{1,4}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2 = rpattern2.matcher(strAddress.trim());
				StringBuffer replacedStringr2 = new StringBuffer();
				String matchStr2 = "";
				while (rmatcher2.find()) {
					matchStr2 = rmatcher2.group();
					String repStr = matchStr2.replaceAll(matchStr2, " " + matchStr2 + " ");
					bonNum = matchStr2.trim();
					rmatcher2.appendReplacement(replacedStringr2, repStr);
				}
				if (!matchStr.equals("")) {
					rmatcher2.appendTail(replacedStringr2);
					strAddress = replacedStringr2.toString();
					strAddress =strAddress.replaceAll("\\s+", " ").trim();
				}
			}
		}
		
		if (strAddress.indexOf("층") > -1) {
			Pattern rpattern = Pattern.compile("[12345]층", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr + " ";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString().replaceAll("\\s+", " ").trim();
			}
		}	
		
		if (strAddress.indexOf("번지길") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,5}번지길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("번지길", "번길");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		if (strAddress.indexOf("~") > -1) {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,4}~[0-9]{1,4}\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				break;
			}
			
			if (!matchStr.equals("")) {
				Pattern rpattern2 = Pattern.compile("\\s[0-9]{1,4}-[0-9]{1,4}\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2 = rpattern2.matcher(strAddress.trim());
				StringBuffer replacedStringr2 = new StringBuffer();
				String matchStr2 = "";
				while (rmatcher2.find()) {
					matchStr2 = rmatcher2.group();
					break;
				}
				if (matchStr2.equals(matchStr)) {
					strAddress = strAddress.replaceAll(matchStr2, " ") + " ";
				} else {
					strAddress = strAddress.replaceAll(matchStr, " ") + " ";
				}
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		if (strAddress.indexOf("호") > -1) {
			Pattern rpattern = Pattern.compile("동\\s[0-9]{1,4}호", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, "동 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		
		if (strAddress.indexOf(". ") > -1) {
			Pattern rpattern = Pattern.compile("\\.\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				break;
			}
			String tstrAddress = "";
			if (!matchStr.equals("")) strAddress = strAddress.substring(0, strAddress.indexOf(matchStr)).trim();
			
			/*Pattern rpattern2 = Pattern.compile("[0-9]{1,4}-[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher2 = rpattern2.matcher(tstrAddress);
			StringBuffer replacedStringr2 = new StringBuffer();
			String matchStr2 = "";
			while (rmatcher2.find()) {
				matchStr2 = rmatcher2.group();
				break;
			}
			if (matchStr2.equals("")) {
				strAddress = strAddress.replaceAll("\\.\\s", " ");
			} else {
				strAddress = tstrAddress;
			}*/
		}		
/*			*/	
		
		/*if (strAddress.indexOf("- ") > -1) {
			Pattern rpattern = Pattern.compile("[길|로]\\s[0-9]{1,4}\\s[0-9]{1,4}-[0-9]{1,4}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String[] matchArr = matchStr.split(" ");
				String repStr = matchArr[0] + " " + matchArr[2];
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}	*/	
		
		if (strAddress.indexOf(", ") > -1) {
			Pattern rpattern = Pattern.compile("로\\s?[0-9]{1,4}\\s,\\s[0-9]{1,4}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(",\\s[0-9]{1,4}$", "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}	
/*		if (strAddress.indexOf("-") > -1) {
			Pattern rpattern = Pattern.compile("[^산][0-9]{1,4}\\s?\\-\\s?[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, " " + matchStr.replaceAll(" ", "") + " ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}*/

		/*if (strAddress.indexOf("-") > -1) {
			Pattern rpattern = Pattern.compile("([0-9]{1,4})?\\s-[0-9]{1,4}\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, " " + matchStr.replaceAll(" ", ""));
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}*/
		/*if (strAddress.indexOf("-") > -1) {
			Pattern rpattern = Pattern.compile("-\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, " ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}		*/
		

		if (strAddress.indexOf(" 산 ") > -1) {
			Pattern rpattern = Pattern.compile("\\s산\\s[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("산 ", "산");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("리산") > -1) {
			Pattern rpattern = Pattern.compile("리산\\s?[0-9]{1,4}^길", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("리산", "리 산");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}		
		if (strAddress.indexOf("번지") > -1 && strAddress.indexOf("호") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,4}번지\\s?[0-9]{1,4}호", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("번지 ", "-").replaceAll("호", "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("번지 ") > -1) {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,12}번지\\s[가-힣]{1,20}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.split("번지 ")[0] + "번지";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("번지") > -1) {
			
			//경기도 군포시 곡란로 72번지 1-12
			Pattern rpatternx = Pattern.compile("[길|로]\\s[0-9]{1,4}번지\\s[0-9]{1,4}-[0-9]{1,4}\\s?", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcherx = rpatternx.matcher(strAddress.trim());
			StringBuffer replacedStringrx = new StringBuffer();
			String matchStrx = "";
			while (rmatcherx.find()) {
				matchStrx = rmatcherx.group().trim();
				String[] matchArr = matchStrx.split(" ");
				String repStr = matchArr[0] + " " + matchArr[1].replaceAll("번지", "") + " ";
				rmatcherx.appendReplacement(replacedStringrx, repStr);
			}
			if (!matchStrx.equals("")) {
				rmatcherx.appendTail(replacedStringrx);
				strAddress2 = replacedStringrx.toString();
				strAddress2 =strAddress2.replaceAll("\\s+", " ").trim();
				hashaddress.put("address2", strAddress2);
			} else {
				if (strAddress2.equals("")) hashaddress.put("address2", "");
			}
			
			//숫자+번지로 끝나는
			if (strAddress.trim().endsWith("번지")) {
				Pattern rpattern = Pattern.compile("[0-9]{1,4}번지", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher = rpattern.matcher(strAddress.trim());
				StringBuffer replacedStringr = new StringBuffer();
				while (rmatcher.find()) {
					String matchStr = rmatcher.group();
					String repStr = matchStr.replaceAll("번지", "");
					rmatcher.appendReplacement(replacedStringr, repStr);
				}
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString().replaceAll("\\s+", " ").trim();
			}
			else
			{
				//숫자+번지와 숫자-숫자가 중복의 경우 숫자-숫자를 우선시
				Pattern rpattern = Pattern.compile("[0-9]{1,4}번지", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher = rpattern.matcher(strAddress.trim());
				StringBuffer replacedStringr = new StringBuffer();
				String matchStr = "";
				String matchStr2 = "";
				while (rmatcher.find()) {
					matchStr = rmatcher.group();
					break;
				}
				
				Pattern rpattern2 = Pattern.compile("[0-9]{1,5}-[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2= rpattern2.matcher(strAddress.trim());
				StringBuffer replacedStringr2 = new StringBuffer();
				while (rmatcher2.find()) {
					matchStr2 = rmatcher2.group();
					break;
				}
				
				if (!matchStr.equals("") && !matchStr2.equals("")) {
					String repStr = matchStr.replaceAll(matchStr, " ");
					rmatcher.appendReplacement(replacedStringr, repStr);
					rmatcher.appendTail(replacedStringr);
					strAddress = replacedStringr.toString().replaceAll("\\s+", " ").trim();
				} 
			}
		} 
		
		if (strAddress.indexOf("면") > -1 && strAddress.indexOf("리") > -1) {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,2}리\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(matchStr, matchStr.replaceAll(" ", "") + " ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		if (strAddress.indexOf("면") > -1 && strAddress.indexOf("리") > -1) {
			Pattern rpattern = Pattern.compile("\\s[가-힣]{1,15}리[0-9]{2,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("리", "리 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
				break;
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		if (strAddress.indexOf("읍") > -1 && strAddress.indexOf("리") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣]{1,15}읍[가-힣]{1,15}리\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("읍", "읍 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}

		
		/*if (strAddress.indexOf("리 ") > -1) {
			Pattern rpattern = Pattern.compile("리[0-9]{1,4}[^길|로]", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("리", "리 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}*/		
	
		strAddress =strAddress.replaceAll("\\s+", " ").trim();
		if (strAddress.indexOf("길") > -1 || strAddress.indexOf("로") > -1) {
			Pattern rpattern = Pattern.compile("[길로][0-9\\-?]{1,10}\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				if (strAddress.indexOf("길") > -1) repStr = matchStr.replaceAll("길", "길 ");
				if (repStr.equals("") && strAddress.indexOf("로") > -1) repStr = matchStr.replaceAll("로", "로 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("길") > -1 || strAddress.indexOf("로") > -1) {
			Pattern rpattern = Pattern.compile("[길|로]\\s[0-9\\-?]{1,10}[가-힣]{1,2}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				if (!matchStr.endsWith("길") && !matchStr.endsWith("로") && strAddress.indexOf(matchStr+"번길") > 3) {
					repStr = matchStr.replaceAll(matchStr.substring(0,matchStr.length()-1), matchStr.substring(0,matchStr.length()-1) + " ");
					rmatcher.appendReplacement(replacedStringr, repStr);
				} else {
					/*if (!matchStr.startsWith(" ") && (!matchStr.endsWith("번") && !matchStr.endsWith("길"))) {
						repStr = matchStr.replaceAll(" ", "");
						rmatcher.appendReplacement(replacedStringr, repStr);
					}*/
				}
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.trim().endsWith("길")) strAddress  = (strAddress.trim() + " ").replaceAll(" 길 ", "");
		if (strAddress.indexOf("길") > -1 || strAddress.indexOf("로") > -1) {
			Pattern rpattern = Pattern.compile("로([0-9]{1,4})?\\s[가-힣0-9]{1,12}길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				if (matchStr.indexOf("로구 ") > -1) continue;
				repStr = matchStr.replaceAll(" ", "") + " ";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("길") > -1 && strAddress.indexOf("로") > -1 && strAddress.indexOf("번") > -1) {
			Pattern rpattern = Pattern.compile("로[0-9]{1,12}번\\s[가-힣0-9]{1,12}길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll(" ", "") + " ";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("길") > -1 && strAddress.indexOf("로") > -1 && strAddress.indexOf("번") > -1) {
			Pattern rpattern = Pattern.compile("로\\s[0-9]{1,12}번\\s[가-힣0-9]길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll(" ", "") + " ";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		if (strAddress.indexOf("길") > -1 && strAddress.indexOf("로") > -1 && strAddress.indexOf("번") > -1) {
			Pattern rpattern = Pattern.compile("로[0-9]{1,12}번\\s길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll(" ", "") + " ";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		//경기도 부천시 소사구 경인로 137 번 나길 18
		if (strAddress.indexOf("길 ") > -1 && strAddress.indexOf("로 ") > -1 && strAddress.indexOf("번 ") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣0-9]{1,6}로\\s[0-9\\s]{1,6}번\\s[가-힣0-9]{1,6}?길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll(" ", "") ;
				ArrayList<String[]> addArr = searchAddr(repStr);
				if (addArr != null && addArr.size() > 0) {
					repStr = repStr + " ";
					rmatcher.appendReplacement(replacedStringr, repStr);
				} else {
					matchStr = "";
				}
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		//서울특별시 용산구 이촌로 65 가길 51
		if (strAddress.indexOf("길 ") > -1 && strAddress.indexOf("로 ") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣0-9]{1,6}로\\s[가-힣0-9\\s]{1,6}?길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll(" ", "") ;
				ArrayList<String[]> addArr = searchAddr(repStr);
				if (addArr != null && addArr.size() > 0) {
					repStr = repStr + " ";
					rmatcher.appendReplacement(replacedStringr, repStr);
				} else {
					matchStr = "";
				}
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		if (strAddress.indexOf("로") > -1 &&  strAddress.indexOf("로 ") == -1) {
			Pattern rpattern = Pattern.compile("로[0-9]{1,12}\\s[0-9]{1,12}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				if (strAddress.indexOf(matchStr+"가길")> -1) continue;
				if (strAddress.indexOf(matchStr+"길")> -1) continue;
				if (strAddress.indexOf(matchStr+"번길")> -1) continue;
				repStr = matchStr.replaceAll("로", "로 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("길") > -1 &&  strAddress.indexOf("길 ") == -1) {
			Pattern rpattern = Pattern.compile("길[0-9]{1,12}\\s?", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				if (strAddress.indexOf(matchStr+"로")> -1) continue;
				repStr = matchStr.replaceAll("길", "길 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		if (strAddress.indexOf("길 ") > -1 &&  strAddress.indexOf("로 ") > -1) {
			Pattern rpattern = Pattern.compile("로\\s?[0-9]{1,12}-[가-힣]길", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll("-", "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		if (strAddress.indexOf("길 ") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣]\\s[0-9]{1,4}길", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				if (matchStr.indexOf("읍 ")> -1 || matchStr.indexOf("면 ")> -1 || matchStr.indexOf("동 ")> -1 || matchStr.indexOf("가 ")> -1) continue;
				repStr = matchStr.replaceAll(" ", "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		if (strAddress.indexOf("번길 ") > -1) {
			Pattern rpattern = Pattern.compile("번길\\s,\\s[0-9]{1,5}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll(",", " ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		//강원도 춘천시 동내면 거두 길 95
		if ((strAddress.indexOf("읍 ") > -1 || strAddress.indexOf("면 ") > -1) && (strAddress.indexOf("길 ") > -1 || strAddress.indexOf("로 ") > -1)) {
			Pattern rpattern = Pattern.compile("[읍|면]\\s[가-힣0-9\\s]{1,12}?[길|로]\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr =matchStr.substring(2,matchStr.length()).replaceAll(" ", "");
				
				ArrayList<String[]> addArr = searchAddr(repStr);
				if (addArr != null && addArr.size() > 0) {
					repStr = matchStr.substring(0,2) + repStr + " ";
					rmatcher.appendReplacement(replacedStringr, repStr);
				} else {
					matchStr = "";
				}
			}
			
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		if (strAddress.indexOf("동 ") > -1 && strAddress.indexOf("길 ") > -1) {
			Pattern rpattern = Pattern.compile("동\\s[0-9]{1,3}길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = "";
				repStr = matchStr.replaceAll(" ", "") + " ";
				ArrayList<String[]> addArr = searchAddr(repStr);
				if (addArr != null && addArr.size() > 0) {
					rmatcher.appendReplacement(replacedStringr, repStr);
				} else {
					matchStr = "";
				}
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		if (strAddress.indexOf("로 ") > -1 && strAddress.indexOf("번 ") > -1) {
			Pattern rpattern = Pattern.compile("로\\s[0-9]{1,12}번\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				break;
			}
			
			if (!matchStr.equals("")) {
				Pattern rpattern2 = Pattern.compile("\\s[0-9]{1,4}-[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2 = rpattern2.matcher(strAddress.trim());
				StringBuffer replacedStringr2 = new StringBuffer();
				String matchStr2 = "";
				while (rmatcher2.find()) {
					matchStr2 = rmatcher2.group();
					break;
				}
				if (!matchStr2.equals("")) {
					String repStr = "";
					repStr = matchStr.replaceAll(" ", "") + "길 ";
					rmatcher.appendReplacement(replacedStringr, repStr);
				}
			}
			
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		if (strAddress.indexOf("로 ") > -1 && strAddress.indexOf("번길 ") > -1) {
			Pattern rpattern = Pattern.compile("로\\s[0-9]{1,12}\\s번길\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll(" ", "")+" ";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		
		if (strAddress.indexOf("로") > -1) {
			Pattern rpattern = Pattern.compile("로[0-9]{1,5}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("로", "로 ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
/*		if (strAddress.indexOf("번지 ") > -1) {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,12}번지\\s[0-9]{1,12}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("번지", "번지 , ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}*/
		
		if (strAddress.indexOf("번 ") > -1) {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,12}번\\s[0-9]{1,12}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("번", " , ");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
			
			if (matchStr.equals("")) {
				Pattern rpattern2 = Pattern.compile("\\s[0-9]{1,4}번\\s[가-힣]", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2 = rpattern2.matcher(strAddress.trim());
				StringBuffer replacedStringr2 = new StringBuffer();
				while (rmatcher2.find()) {
					String matchStr2 = rmatcher2.group();
					if (strAddress.indexOf(matchStr2+"길")> -1) continue;
					if (strAddress.indexOf(matchStr2+"로")> -1) continue;
					if (strAddress.indexOf(matchStr2+"지")> -1) continue;
					String repStr = matchStr2.replaceAll("번 ", " ");
					rmatcher2.appendReplacement(replacedStringr2, repStr);
				}
				rmatcher2.appendTail(replacedStringr2);
				strAddress = replacedStringr2.toString();
			}
			
			if (matchStr.equals("")) {
				Pattern rpattern2 = Pattern.compile("\\s[0-9]{1,4}번\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
				Matcher rmatcher2 = rpattern2.matcher(strAddress.trim());
				StringBuffer replacedStringr2 = new StringBuffer();
				while (rmatcher2.find()) {
					String matchStr2 = rmatcher2.group();
					if (strAddress.indexOf(matchStr2+"길")> -1) continue;
					String repStr = matchStr2.replaceAll(matchStr2, " ");
					rmatcher2.appendReplacement(replacedStringr2, repStr);
				}
				rmatcher2.appendTail(replacedStringr2);
				strAddress = replacedStringr2.toString();
			}
		}
		
		if (strAddress.indexOf("로 ") > -1 || strAddress.indexOf("길 ") > -1) {
			Pattern rpattern = Pattern.compile("[가-힣]{1,10}\\s([가-힣0-9]{1,12})?[길|로]\\s", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				String repStr = "";
				
				if (matchStr.indexOf("시 ")>-1 || matchStr.indexOf("군 ")>-1 || matchStr.indexOf("구 ")>-1 || matchStr.indexOf("읍 ")>-1 || matchStr.indexOf("면 ")>-1 || matchStr.indexOf("동 ")>-1 || matchStr.indexOf("리 ")>-1) {
					continue;
				}
				if (strAddress.indexOf("면 ")>-1 || strAddress.indexOf("읍 ")>-1) {
					String[] dongArr = matchStr.split(" ");
					if (dongArr[0].length()<=2) 	continue;
					if (dongArr[1].substring(0, 1).replaceAll("\\d", "").length()>0) 	continue;
				}
				
				repStr = matchStr.replaceAll(" ", "") + " ";
				ArrayList<String[]> addArr = searchAddr(repStr);
				if (addArr != null && addArr.size() > 0) {
					rmatcher.appendReplacement(replacedStringr, repStr);
				} else {
					matchStr = "";
				}
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress = replacedStringr.toString();
				strAddress =strAddress.replaceAll("\\s+", " ").trim();
			}
		}
		
		//강원도 속초시 중앙로419-  10
		if (strAddress.indexOf("- ") > -1) {
			Pattern rpattern = Pattern.compile("[길|로]\\s?[0-9]{1,4}-\\s[0-9]{1,4}$", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group();
				String repStr = matchStr.replaceAll("-\\s[0-9]{1,4}$", "");
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress2 = replacedStringr.toString();
				strAddress2 =strAddress2.replaceAll("\\s+", " ").trim();
				hashaddress.put("address2", strAddress2);
			} else {
				if (strAddress2.equals("")) hashaddress.put("address2", "");
			}
		}
		
		//강원도 춘천시 새롬공원길9번길 6 6-9
		if (strAddress.indexOf("-") > -1) {
			Pattern rpattern = Pattern.compile("[길|로]\\s[0-9]{1,4}\\s[0-9]{1,4}-[0-9]{1,4}\\s?", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				String[] matchArr = matchStr.split(" ");
				String repStr = matchArr[0] + " " + matchArr[2] + " ";
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress2 = replacedStringr.toString();
				strAddress2 =strAddress2.replaceAll("\\s+", " ").trim();
				hashaddress.put("address2", strAddress2);
			} else {
				if (strAddress2.equals("")) hashaddress.put("address2", "");
			}
		}
		
		if (strAddress.indexOf("번지 ") > -1) {
			Pattern rpattern = Pattern.compile("\\s[0-9]{1,12}번지\\s[0-9]{1,12}\\s?", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				String[] matchArr = matchStr.split("번지 ");
				String repStr = " " + matchArr[1];
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress2 = replacedStringr.toString();
				strAddress2 =strAddress2.replaceAll("\\s+", " ").trim();
				hashaddress.put("address2", strAddress2);
			} else {
				if (strAddress2.equals("")) hashaddress.put("address2", "");
			}
		}
		
		//경기도 광명시 광명로 936 번길 936
		if (strAddress.indexOf("번길 ") > -1) {
			Pattern rpattern = Pattern.compile("[길|로]\\s[0-9]{1,4}\\s?번길\\s[0-9]{1,4}", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			String matchStr = "";
			while (rmatcher.find()) {
				matchStr = rmatcher.group().trim();
				String[] matchArr = matchStr.split(" ");
				String repStr = "";
				if (matchStr.indexOf("로 ")>-1) {
					repStr = matchArr[0] + " " + matchArr[1].replaceAll("번길", "")+ " ";
				} else {
					repStr = matchArr[0].replaceAll("로", "로 ").replaceAll("번길", "")+ " ";
				}
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			if (!matchStr.equals("")) {
				rmatcher.appendTail(replacedStringr);
				strAddress2 = replacedStringr.toString();
				strAddress2 =strAddress2.replaceAll("\\s+", " ").trim();
				hashaddress.put("address2", strAddress2);
			} else {
				if (strAddress2.equals("")) hashaddress.put("address2", "");
			}
		}
		
		//( )문자가 있는 경우
		if (strAddress.indexOf("(") > -1 && strAddress.indexOf(")") > -1) {
			String strAddress3 =strAddress.replaceAll("[(]", " ").replaceAll("[)]", " ").replaceAll("\\s+", " ").trim();
			if (strAddress2.equals("")) {
				strAddress2 = strAddress3;
				hashaddress.put("address2", strAddress3);
			}
		}
		
		//,문자가 있는 경우
		if (strAddress.indexOf(",") > -1) {
			String strAddress3 =strAddress.replaceAll(",", " ").replaceAll("\\s+", " ").trim();
			if (strAddress2.equals("")) {
				strAddress2 = strAddress3;
				hashaddress.put("address2", strAddress3);
			}
		}
		if (strAddress2.indexOf(",") > -1) {
			String strAddress3 =strAddress2.replaceAll(",", " ").replaceAll("\\s+", " ").trim();
			if (strAddress2.equals("")) {
				strAddress2 = strAddress3;
				hashaddress.put("address2", strAddress3);
			}
		}
		
		//-문자가 있는 경우
		if (strAddress.indexOf("-") > -1) {
			String strAddress3 =strAddress.replaceAll("-", " ").replaceAll("\\s+", " ").trim();
			if (strAddress2.equals("")) {
				strAddress2 = strAddress3;
				hashaddress.put("address2", strAddress3);
			}
		}
		if (strAddress2.indexOf("-") > -1) {
			String strAddress3 =strAddress2.replaceAll("-", " ").replaceAll("\\s+", " ").trim();
			if (strAddress2.equals("")) {
				strAddress2 = strAddress3;
				hashaddress.put("address2", strAddress3);
			}
		}
		
		if (strAddress.indexOf("구") > -1) {
			Pattern rpattern = Pattern.compile("(포항|고양|성남|수원|안산|안양|용인|전주|창원|천안|청주|고양|창원|전주)[시]?\\s?[가-힣]{1,10}[구]",
					Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String repStr = "";
				if (matchStr.indexOf("시 ") == -1) {
					repStr = matchStr.replaceAll(" ", "시");
				} else {
					repStr = matchStr.replaceAll(" ", "");
				}
				sigungu = repStr;
				sigungu_syn = " " + matchStr;
				if (matchStr.indexOf("시")==2) {
					sigungu_syn += " " + matchStr.replaceAll("시", " ");					
				}
				rmatcher.appendReplacement(replacedStringr, repStr);
			}
			sigungu_syn = sigungu + " " + sigungu_syn.replaceAll(sigungu, "");
			rmatcher.appendTail(replacedStringr);
			strAddress = replacedStringr.toString();
		}
		strAddress = strAddress.replaceAll("\\s+", " ").trim();
		String[] AddrArr = patternMatch(strAddress);
		String gilro = AddrArr[3];
		String emd = AddrArr[2];
		
		GeocodeIndexFieldDefineEnum geocodeindex = null;
		int nodei = 0;
		int tryi = 0;
		boolean roTrue = false;
		boolean noMatchDic = true;
		String bonbun = "";
		String bubun = "";
		String matchX = "";
		String matchY = "";
		strAddress = strAddress.replaceAll("\\s+", " ");
		String strAddressCopy = strAddress;
		
		/*System.out.println("===============================================================================");
		System.out.println("테스트 : 주소파싱 시작 최인섭");
		System.out.println("===============================================================================");*/
		while (true) {
			//도로주소
			if (
					strAddress.indexOf("길 ") > 0 
					|| strAddress.indexOf("로 ") > 0 
					|| strAddress.indexOf("고개 ") > 0 
					|| strAddress.indexOf("거리 ") > 0 
			) {
				int matchi = 99999999;
				int maxMatch = 0;
				String[] splitAddr = strAddress.split(" ");
				String gilrodbl_bf = "";
				String gilrodbl = "";
				int gilrodblI = 0;
				
				//도로주소가 xx긽xx길인 경우 분할했을 때 검색이 안됨.
				try {
					for (int spAdri = 0; spAdri < splitAddr.length; spAdri++) {
						if (
								(
									splitAddr[spAdri].endsWith("길")
									|| splitAddr[spAdri].endsWith("로")
								) &&
								(
									splitAddr[spAdri+1].endsWith("길")
									|| splitAddr[spAdri+1].endsWith("로")
								)
						) {
							gilrodbl_bf = splitAddr[spAdri] + " " + splitAddr[spAdri+1];
							gilrodbl = splitAddr[spAdri] + splitAddr[spAdri+1];
							gilrodblI = 2;
							break;
						}
					}
				} catch(Exception eex) {logger.debug(eex.getMessage());}
				
				if (gilrodblI==2) {
					//사전매칭
					ArrayList<String[]> addArr = searchAddr(gilrodbl);
					if (addArr != null && addArr.size() > 0) {
						if (addArr.size()==1) {
							String[] matchAddr = addArr.get(0);
							String TstrAddress = " " + strAddress;
							if (TstrAddress.indexOf(" " + getValueNe(matchAddr[2])) > -1 
								|| TstrAddress.indexOf(" " + getValueNe(matchAddr[3])) > -1
							) {
								FindResult[0] = getValue(matchAddr[2]);		//시도
								FindResult[1] = getValueNe(matchAddr[3]);		//시군구
								
								if (matchAddr[1].equals("road")) {
									roTrue=true;
									FindResult[2] = getValue(matchAddr[4]);	//읍면동
									FindResult[3] = getValue(matchAddr[0]);	//도로
								} else {
									FindResult[2] = getValue(matchAddr[0]);	//읍면동
									FindResult[3] = "";						//도로
								}
								if (strAddress.indexOf("리 ") > 0)
									FindResult[4] = getValue(matchAddr[5]);		//리
								
								noMatchDic = false;
							}
						} else {
							for (int adri=0;adri<addArr.size();adri++) {
								//도서관길,road,경기도,과천시,,
								int matchc = 0;
								String[] tAddr = addArr.get(adri);
								String TstrAddress = " " + strAddress;
								String[] sidoArr = synSido(tAddr[2]);
								String matchSido = "";
								
								//시도 체크
								for (int sidoI = 0; sidoI < sidoArr.length; sidoI++) {
									if (TstrAddress.indexOf(" " + sidoArr[sidoI] + " ") > -1) matchc++;
								}
								
								//시군구 체크
								if (AddrArr[1]!=null && AddrArr[1].equals(tAddr[3].replaceAll(" ", ""))) {
									matchc++;
								} else {
									if (tAddr[3].length() <= 2 && TstrAddress.indexOf(" " + tAddr[3] + " ") > -1) matchc++;
									else if (tAddr[3].length() > 2) {
										if (tAddr[3].endsWith("시")) {
											if (TstrAddress.indexOf(tAddr[3])>-1) matchc++;
										} else if (tAddr[3].endsWith("군")) {
											if (TstrAddress.indexOf(tAddr[3])>-1) matchc++;
										} else if (tAddr[3].endsWith("구")) {
											if (tAddr[3].indexOf(" ") > -1) {
												String guNm = tAddr[3].split(" ")[1];
												if (TstrAddress.indexOf(getValueNe(guNm) + " ")>-1) matchc++;
											} else if (TstrAddress.indexOf(tAddr[3] + " ")>-1) {
												matchc++;
											}
										}
									}
								}
								
								//동을 찾는다. 
								if (AddrArr[2]!=null && AddrArr[2].equals(tAddr[4])) {
									matchc++;
								} else {
									if (
										TstrAddress.indexOf("읍 ") > -1
										&& tAddr[4] != null
										&& tAddr[4].endsWith("읍")
										&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
									) {
										dongNm = tAddr[4];
										matchc++;
									}
									if (
										TstrAddress.indexOf("면 ") > -1
										&& tAddr[4] != null
										&& tAddr[4].endsWith("면")
										&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
									) {
										dongNm = tAddr[4];
										matchc++;
									}
									if (
										TstrAddress.indexOf("동 ") > -1
										&& tAddr[4] != null
										&& tAddr[4].endsWith("동")
										&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
									) {
										dongNm = tAddr[4];
										matchc++;
									}
									if (
										TstrAddress.indexOf("가 ") > -1
										&& tAddr[4] != null
										&& tAddr[4].endsWith("가")
										&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
									) matchc++;
									if (
										TstrAddress.indexOf("로 ") > -1
										&& tAddr[4] != null
										&& tAddr[4].endsWith("로")
										&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
									) matchc++;
								}
								
								
								if (matchc>=maxMatch) {
									maxMatch = matchc;
									matchi = adri;
								}
							}
							
							if (maxMatch > 1) {
								String[] matchAddr = addArr.get(matchi);
								if (matchAddr[1].equals("road")) {
									FindResult[0] = getValueNe(matchAddr[2]);		//시도
									FindResult[1] = getValueNe(matchAddr[3]);		//시군구
									if (strAddress.indexOf("읍 ") > 0 || strAddress.indexOf("면 ") > 0)
										FindResult[2] = getValueNe(matchAddr[4]);		//읍면동
									FindResult[3] = getValueNe(matchAddr[0]);		//도로
									if (strAddress.indexOf("리 ") > 0)
										FindResult[4] = getValueNe(matchAddr[5]); 	//리
									roTrue=true;
									noMatchDic = false;
								}
							}
						}
					} else {
						gilrodbl = "";
					}
				} 
				
				//분할도로주소를 결합해서 매칭됐을 경우 주소를 보정
				if (!noMatchDic && !gilrodbl.equals("")) {
					strAddress = strAddress.replace(gilrodbl_bf.trim(), gilrodbl);
				}
				
				if (noMatchDic) {
					for (int spAdri = 0; spAdri < splitAddr.length; spAdri++) {
						if (
								splitAddr[spAdri].endsWith("길")
								|| splitAddr[spAdri].endsWith("로")
								|| splitAddr[spAdri].endsWith("고개")
								|| splitAddr[spAdri].endsWith("거리")
						) {
							//사전매칭
							ArrayList<String[]> addArr = searchAddr(splitAddr[spAdri]);
							if ((addArr == null || addArr.size() == 0) && splitAddr[spAdri].indexOf("번길") == -1 && splitAddr[spAdri].endsWith("길")) {
								String tstr = splitAddr[spAdri];
								String tstr2 = tstr.substring(0, tstr.length()-1) + "번길";
								addArr = searchAddr(tstr2);
								//System.out.println( addArr.size());
								if (addArr != null && addArr.size() > 0) strAddress = strAddress.replaceAll(tstr, tstr2);
							}
							if ((addArr == null || addArr.size() == 0) && splitAddr[spAdri].indexOf("로") > -1 && splitAddr[spAdri].endsWith("길")) {
								String tstr = splitAddr[spAdri].trim();
								String tstr2 = tstr.split("로")[0]+"로";
								addArr = searchAddr(tstr2);
								if (addArr != null && addArr.size() > 0) {
									String tstr3 = tstr.split("로")[1].replaceAll("\\D", "");
									if (!tstr3.equals("") && Integer.parseInt(tstr3) > 0) strAddress = strAddress.replaceAll(tstr, tstr2 + " " + tstr3 + " , ");
								}
							}
							if (addArr != null && addArr.size() > 0) {
								if (addArr.size()==1) {
									String[] matchAddr = addArr.get(0);
									String TstrAddress = " " + strAddress;
									//System.out.println(matchAddr[6]);
									if (TstrAddress.indexOf(" " + getValueNe(matchAddr[2])) > -1 
										|| TstrAddress.indexOf(" " + getValueNe(matchAddr[3])) > -1
										|| matchAddr[6].equals("1")
									) {
										FindResult[0] = getValueNe(matchAddr[2]);		//시도
										FindResult[1] = getValueNe(matchAddr[3]);		//시군구
										if (matchAddr[1].equals("road")) {
											roTrue=true;
											FindResult[2] = getValueNe(matchAddr[4]);	//읍면동
											FindResult[3] = getValueNe(matchAddr[0]);	//도로
										} else {
											FindResult[2] = getValueNe(matchAddr[0]);	//읍면동
											FindResult[3] = "";						//도로
										}
										//FindResult[4] = getValueNe(matchAddr[5]);		//리
										
										noMatchDic = false;
									}
								} else {
									for (int adri=0;adri<addArr.size();adri++) {
										//도서관길,road,경기도,과천시,,
										int matchc = 0;
										String[] tAddr = addArr.get(adri);
										String TstrAddress = " " + strAddress;
										String[] sidoArr = synSido(tAddr[2]);
										String matchSido = "";
										/*if (adri==19) {
											System.out.println(tAddr.toString());
											 남성로 시장북로
										}*/
										if (tAddr[6].equals("1") 
												&& !tAddr[0].equals("남성로") 
												&& !tAddr[0].equals("시장북로")
												&& !tAddr[0].equals("세종로")) {
											matchc=2;
										}
										//시도 체크
										for (int sidoI = 0; sidoI < sidoArr.length; sidoI++) {
											if (TstrAddress.indexOf(" " + sidoArr[sidoI] + " ") > -1) {
												matchc++;
											} else {
												if (TstrAddress.indexOf(" " + sidoArr[sidoI].substring(0, sidoArr[sidoI].length()-1) + " ") > -1) matchc++;
											}
										}
										
										//시군구 체크
										if (AddrArr[1]!=null && AddrArr[1].equals(tAddr[3].replaceAll(" ", ""))) {
											matchc++;
										} else {
											if (tAddr[3].length() <= 2 && TstrAddress.indexOf(" " + tAddr[3] + " ") > -1) matchc++;
											else if (tAddr[3].length() > 2) {
												if (tAddr[3].endsWith("시")) {
													if (TstrAddress.indexOf(tAddr[3])>-1) matchc++;
												} else if (tAddr[3].endsWith("군")) {
													if (TstrAddress.indexOf(tAddr[3])>-1) matchc++;
												} else if (tAddr[3].endsWith("구")) {
													if (tAddr[3].indexOf(" ") > -1) {
														String guNm = tAddr[3].split(" ")[1];
														if (TstrAddress.indexOf(getValueNe(guNm) + " ")>-1) matchc++;
													} else if (TstrAddress.indexOf(tAddr[3] + " ")>-1) {
														matchc++;
													}
												}
											}
										}
										
										//동을 찾는다. 
										if (AddrArr[2]!=null && AddrArr[2].equals(tAddr[4])) {
											matchc++;
										} else {
											if (
												TstrAddress.indexOf("읍 ") > -1
												&& tAddr[4] != null
												&& tAddr[4].endsWith("읍")
												&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
											) {
												dongNm = tAddr[4];
												matchc++;
											}
											if (
												TstrAddress.indexOf("면 ") > -1
												&& tAddr[4] != null
												&& tAddr[4].endsWith("면")
												&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
											) {
												dongNm = tAddr[4];
												matchc++;
											}
											if (
												TstrAddress.indexOf("동 ") > -1
												&& tAddr[4] != null
												&& tAddr[4].endsWith("동")
												&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
											) {
												dongNm = tAddr[4];
												matchc++;
											}
											if (
												TstrAddress.indexOf("가 ") > -1
												&& tAddr[4] != null
												&& tAddr[4].endsWith("가")
												&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
											) matchc++;
											if (
												TstrAddress.indexOf("남성로 ") > -1
												&& tAddr[4] != null
												&& tAddr[4].endsWith("로")
												&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
											) {
												strAddress = TstrAddress.replaceAll("남성로 남성로 ", "남성로 ");
												matchc++;
											}
										}
										
										//리를 찾는다. 
										/*if (AddrArr[4]!=null && AddrArr[4].equals(tAddr[5])) {
											matchc++;
										} else {
											if (
												TstrAddress.indexOf("리 ") > -1
												&& tAddr[5] != null
												&& tAddr[5].endsWith("리")
												&& TstrAddress.indexOf(" " + tAddr[4] + " ") > -1
											) matchc++;
										}*/
										
										if (matchc>=maxMatch) {
											maxMatch = matchc;
											matchi = adri;
										}
									}
									
									if (maxMatch > 1) {
										String[] matchAddr = addArr.get(matchi);
										FindResult[0] = getValueNe(matchAddr[2]);		//시도
										FindResult[1] = getValueNe(matchAddr[3]);		//시군구
										
										if (matchAddr[1].equals("road")) {
											roTrue=true;
											if (getValueNe(matchAddr[5]).equals("1")) {
												FindResult[2] = getValueNe(matchAddr[4]);	//읍면동
											} else {
												if (strAddress.indexOf("읍 ") > 0 
														|| strAddress.indexOf("면 ") > 0 
												) {
													if (strAddress.indexOf(matchAddr[4] + " ")>-1) {
														FindResult[2] = getValueNe(matchAddr[4]);	//읍면동
													}
												}
											}
											if (
												matchAddr[0].endsWith("길")  ||
												matchAddr[0].endsWith("로") || 
												matchAddr[0].endsWith("고개") ||
												matchAddr[0].endsWith("거리")
											) {
												FindResult[3] = getValueNe(matchAddr[0]);		//도로
											} else {
												FindResult[3] = "";
											}
										
										} else {
											FindResult[2] = getValueNe(matchAddr[0]);	//읍면동
											FindResult[3] = "";						//도로
										}
										FindResult[4] = ""; //getValueNe(matchAddr[5]); 	//리
										
										noMatchDic = false;
									}
								}
							}
						}
						if (!noMatchDic) break;
					}
				}
			}
			
			//읍면동 주소
			if (
					noMatchDic
					&& (strAddress.indexOf("동 ") > 0 
					|| strAddress.indexOf("읍 ") > 0 
					|| strAddress.indexOf("면 ") > 0 
					|| strAddress.indexOf("가 ") > 0
					|| (strAddress.indexOf("면 ") == -1 && strAddress.indexOf("거리 ") == -1 && strAddress.indexOf("리 ") > 0)
					)
			) {
				int matchi = 99999999;
				int maxMatch = 0;
				int dongMatch = 0;
				String[] splitAddr = strAddress.split(" ");
				
				//사전매칭 
				for (int spAdri = 0; spAdri < splitAddr.length; spAdri++) {
					if (
						strAddress.indexOf("동 ") > 0 
						|| strAddress.indexOf("읍 ") > 0 
						|| strAddress.indexOf("면 ") > 0 
						|| strAddress.indexOf("가 ") > 0
						|| (strAddress.indexOf("면 ") == -1 && strAddress.indexOf("거리 ") == -1 && strAddress.indexOf("리 ") > 0)
					) {
						if (dongMatch>0) break;
						
						//사전매칭
						ArrayList<String[]> addArr = searchAddr(splitAddr[spAdri]);
						if (addArr != null && addArr.size() > 0) {
							dongMatch++;
							if (addArr.size()==1) {
								String[] matchAddr = addArr.get(0);
								String TstrAddress = " " + strAddress;
								if (TstrAddress.indexOf(" " + getValueNe(matchAddr[2])) > -1 
										|| TstrAddress.indexOf(" " + getValueNe(matchAddr[3])) > -1
								) {
									FindResult[0] = getValueNe(matchAddr[2]);		//시도
									FindResult[1] = getValueNe(matchAddr[3]);		//시군구
									FindResult[2] = getValueNe(matchAddr[4]);		//읍면동
									FindResult[3] = "";								//도로
									if (!matchAddr[5].equals("") && (
											strAddress.indexOf("리 ") > 0 || strAddress.indexOf(" " + matchAddr[5].substring(0, matchAddr[5].length()-1) + " ") > 0)
										)
											FindResult[4] = getValueNe(matchAddr[5]);
									roTrue = false;
									noMatchDic = false;
								}
							} else {
								String matchRi = "";
								for (int adri=0;adri<addArr.size();adri++) {
									int matchc = 0;
									String[] tAddr = addArr.get(adri);
									String TstrAddress = " " + strAddress;
									String[] sidoArr = synSido(tAddr[2]);
									
									//시도 체크
									for (int sidoI = 0; sidoI < sidoArr.length; sidoI++) {
										if (TstrAddress.indexOf(sidoArr[sidoI] + " ") > -1) matchc++;
									}
								
									//시군구 체크
									if (AddrArr[1]!=null && AddrArr[1].equals(tAddr[3].replaceAll(" ", ""))) {
										matchc++;
									} else {
										if (tAddr[3].length() <= 2 && TstrAddress.indexOf(" " + tAddr[3] + " ") > -1) matchc++;
										else if (tAddr[3].length() > 2) {
											if (tAddr[3].endsWith("시")) {
												if (TstrAddress.indexOf(tAddr[3])>-1) matchc++;
											} else if (tAddr[3].endsWith("군")) {
												if (TstrAddress.indexOf(tAddr[3])>-1) matchc++;
											} else if (tAddr[3].endsWith("구")) {
												if (tAddr[3].indexOf(" ") > -1) {
													String guNm = tAddr[3].split(" ")[1];
													if (TstrAddress.indexOf(getValueNe(guNm) + " ")>-1) matchc++;
												} else if (TstrAddress.indexOf(tAddr[3] + " ")>-1) {
													matchc++;
												}
											}
										}
									}
									
									//리를 찾는다. 
									if (AddrArr[4]!=null && AddrArr[4].equals(tAddr[5])) {
										matchRi = AddrArr[4];
										matchc++;
									} else {
										if (
											TstrAddress.indexOf("리 ") > -1
											&& tAddr[5] != null
											&& tAddr[5].endsWith("리")
											&& TstrAddress.indexOf(" " + tAddr[5] + " ") > -1
										) {
											matchRi = tAddr[5];
											matchc++;
										} 
										/*else {
											if (
													tAddr[5] != null
													&& tAddr[5].endsWith("리")
												) 
											{
													String riStr = tAddr[5].substring(0, tAddr[5].length()-1);
													if (TstrAddress.indexOf(" " + riStr + " ") > 0) {
														matchRi = riStr;
														matchc++;
													}
											}
										}*/
									}
									
									if (matchc>maxMatch) {
										maxMatch = matchc;
										matchi = adri;
									}
								}
								
								if (maxMatch > 1) {
									String[] matchAddr = addArr.get(matchi);
									FindResult[0] = getValueNe(matchAddr[2]);		//시도
									FindResult[1] = getValueNe(matchAddr[3]);		//시군구
									FindResult[2] = getValueNe(matchAddr[4]);		//읍면동
									FindResult[3] = "";

									if (!matchRi.equals("")) {
										FindResult[4] = getValueNe(matchAddr[5]);
										strAddress = strAddress.replaceAll(" " + matchRi + " ", " " + FindResult[4] + " ");
									}
									roTrue = false;
									noMatchDic = false;
								}
							}
						}
					}
					if (!noMatchDic) break;
				}
			}
			if (noMatchDic) {
				String[] splitAddr = strAddress.split(" ");
				int splI = 0;
				for (int spAdri = 0; spAdri < splitAddr.length; spAdri++) {
						if (
								splitAddr[spAdri].endsWith("길")
								|| splitAddr[spAdri].endsWith("로")
								|| splitAddr[spAdri].endsWith("고개")
								|| splitAddr[spAdri].endsWith("거리")
								|| splitAddr[spAdri].endsWith("읍")
								|| splitAddr[spAdri].endsWith("면")
								|| splitAddr[spAdri].endsWith("동")
								|| splitAddr[spAdri].endsWith("가")
								|| (strAddress.indexOf("면 ") == -1 && strAddress.indexOf("거리 ") == -1 && splitAddr[spAdri].endsWith("리"))
								|| (strAddress.indexOf("면 ") > -1 && splitAddr[spAdri].endsWith("리"))
						) {
							if (splitAddr[spAdri].indexOf("시") >= 2) 
								strAddress = strAddress.replaceAll(splitAddr[spAdri], splitAddr[spAdri].replaceAll("시", "시 "));
							if (splitAddr[spAdri].indexOf("구") >= 2) 
								strAddress = strAddress.replaceAll(splitAddr[spAdri], splitAddr[spAdri].replaceAll("구", "구 "));
							if (splitAddr[spAdri].indexOf("면") >= 2) 
								strAddress = strAddress.replaceAll(splitAddr[spAdri], splitAddr[spAdri].replaceAll("면", "면 "));
							if (splitAddr[spAdri].indexOf("리") >= 2) {
								if ( splitAddr[spAdri].startsWith("(")) {
									splitAddr[spAdri] = splitAddr[spAdri].replaceAll("[(]", "");
									strAddress = strAddress.replaceAll("[(]"," ").replaceAll("[)]"," ").replaceAll("\\s+", " ").trim();
								}
								strAddress = strAddress.replaceAll(splitAddr[spAdri], splitAddr[spAdri].replaceAll("1리", "리").replaceAll("2리", "리"));
							}
							splI++;
							if (splI>1) break;
						} else {
							if (splitAddr[spAdri].indexOf("동") > -1 && !splitAddr[spAdri].endsWith("가")) {
								Pattern rpattern = Pattern.compile("동[0-9]{1,5}\\-?", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
								Matcher rmatcher = rpattern.matcher(strAddress.trim());
								StringBuffer replacedStringr = new StringBuffer();
								while (rmatcher.find()) {
									String matchStr = rmatcher.group();
									String repStr = matchStr.replaceAll("동", "동 ");
									rmatcher.appendReplacement(replacedStringr, repStr);
								}
								rmatcher.appendTail(replacedStringr);
								strAddress = replacedStringr.toString();
							}	
						}
				}
			}
			
			//단어사전 미매칭 경우 예비주소로 매칭
			if (noMatchDic && !strAddress2.equals("")) {
				strAddress = strAddress2;
				strAddress2 = "";
				hashaddress.put("address2", "");
			}
			
			tryi++;
			if (tryi>1) break;
		}	
		
		//(' ')분절이 없는 경우 재구현 예정
		//비정형주소 처리예정
		/*
		 * 읍면동길로 있을 경우 
		 * 둘 이상 있을 경우
		 * 모두 찾는다.
		 * 앞으로 2자, 3자, 4자, 13자까지 대입해가면서
		 * 시도, 시군구 모두 일치하는 게 나타나고 순차적으로 흘러가고
		 * 시도, 시군구, 일렬로 세워서 검색한 읍면동길로와의 사이에 단어가 남아있지 않으면
		 * 멈춘다.
		 * 최대 25,000개정도를 탐색하면 찾게 된다.
		 * 찾고나서 남은 주소에 리가 있을 경우 리앞으로 2자, 3자, 4자, 5자 탐색해서 찾아낼 수 있다.
		 * 다음에 숫자사이를 벌려 본번/부번/지번을 찾아낸다. 
		 * 본번과 지번사이의 숫자는 연속하여 있다.
		 * 숫자와 '동/호'은 동/호명으로 스킵(숫자 + ' ' + 동/호는 붙입처리)
		 * 다닥다닥 붙어있는 경우 건물명을 찾게 되면 주소에 오류를 발생시킬 수 있다.
		 * xx아파트/상가/빌라~동 본번/부번을 찾은 후 최대한 유의어를 생성하여
		 * 전달하여야 한다.
		 */

		
		/*
		//형태소분석기로 구현->복합명사로 분해하는 경우가 자주 발생하며 이에 대한 가중치 조절이 쉽지 않았다.
		HashMap<String, Integer> addrMap0 = new HashMap<>();
		HashMap<String, Integer> addrMap1 = new HashMap<>();
		HashMap<String, Integer> addrMap2 = new HashMap<>();
		HashMap<String, Integer> addrMap3 = new HashMap<>();
		HashMap<String, Integer> addrMap4 = new HashMap<>();
		HashMap<Integer, String> addrMap5 = new HashMap<>();
		HashMap<String, Integer> addrMap7 = new HashMap<>();
		HashMap<Integer, String> nodeNameMap = new HashMap<>();
		Tagger tagger = n/*ew Tagger();
		tagger.parse(strAddress); // 이것을 쓰고 두지 않으면 다음 잘 작동하지 않았다.
		Node node = tagger.parseToNode(strAddress);
		for (;node != null; node = node.getNext()) {
			//System.out.println(node.getSurface() + "\t" + node.getFeature() + "\t" + node.getWcost());

			String nodename = node.getSurface() ;
			int nodecost = node.getWcost();
			if (nodename.equals("*")) continue;
			
			// 시도 분리
			if (nodecost >= -30 && nodecost <= -6) {
				if (FindResult[0].equals("")) {
					FindResult[0] = nodename;
					addrMap0.put(nodename, nodecost);
				} else {
					if (addrMap0.get(FindResult[0]) > nodecost) {
						FindResult[0] = nodename;
						addrMap0.put(nodename, nodecost);
					}
				}
				if (FindResult[0].equals("경기도") && nodename.indexOf("광주") > -1) {
					FindResult[1] = nodename;
					addrMap1.put(nodename, nodecost);
				}
			}

			// 시군구 분리
			else if (nodecost >= -200 && nodecost <= -34) {
				if (FindResult[1].equals("")) {
					FindResult[1] = nodename;
					addrMap1.put(nodename, nodecost);
				} else {
					if (addrMap1.get(FindResult[1]) > nodecost) {
						FindResult[1] = nodename;
						addrMap1.put(nodename, nodecost);
					}
				}
			}

			// 읍면동 법정동 분리
			else if (nodecost >= -800 && nodecost <= -200) {
				// System.out.println(nodename);
				if (!sigungu.equalsIgnoreCase("") && sigungu.indexOf(nodename) > -1 && nodename.length() <= 3
						&& nodename.equals("시동"))
					continue;
				if (FindResult[2].equals("")) {
					FindResult[2] = nodename;
					addrMap2.put(nodename, nodecost);
				} else {
					if (addrMap2.get(FindResult[2]) > nodecost) {
						FindResult[2] = nodename;
						addrMap2.put(nodename, nodecost);
					}
				}
			}

			// 도로 분리
			else if (nodecost >= -30000 && nodecost <= -3200) {
				if (FindResult[3].equals("")) {
					FindResult[3] = nodename;
					addrMap3.put(nodename, nodecost);
				} else {
					if (addrMap3.get(FindResult[3]) > nodecost) {
						FindResult[3] = nodename;
						addrMap3.put(nodename, nodecost);
					}
				}
			}

			// 리 분리
			else if (nodecost >= -3000 && nodecost <= -800) {
				if (!FindResult[2].equals("")) {
					if (FindResult[4].equals("")) {
						if (strAddress.indexOf(nodename+" ") > 3) 
							FindResult[4] = nodename;
						addrMap4.put(FindResult[4], nodecost);
					} else {
						if (addrMap4.get(FindResult[4]) > nodecost) {
							FindResult[4] = nodename;
							addrMap4.put(nodename, nodecost);
						}
					}
				}
			}

			
			 * //건물명 분리 else if (nodecost >= -5000 && nodecost < -4000) { if
			 * (!addrMap7.containsKey(nodename)){ FindResult[7] = nodename;
			 * addrMap7.put(nodename, nodecost); } else { if (addrMap7.get(nodename) >
			 * nodecost) { FindResult[7] = nodename; addrMap7.put(nodename, nodecost); } } }
			 * else { //사용자정의 사전에 포함되지 않는 것들 nodeNameMap.put(nodei, nodename); nodei++; }
			 
		}

		if (!FindResult[1].equals("") && !sigungu.equals("")) {
			if (addrMap1.get(FindResult[1]) > -17000) {
				FindResult[1] = sigungu;
				addrMap1.put(sigungu, -17000);
			}
		}*/


		/*if (!gilro.equals(FindResult[3]) && gilro.endsWith("길") && FindResult[3].endsWith("로")) {
			if (mecab.containsKey(gilro)) {
				FindResult[3] = gilro;
			} else {
				if (mecab.containsKey(gilro.replaceAll("길", "번길"))) {
					FindResult[3] = gilro.replaceAll("길", "번길");
				} else {
					if (mecab.containsKey(gilro.replaceAll("번길", "길"))) FindResult[3] = gilro.replaceAll("번길", "길");
				}
			}
		}
		

		 * String buildNm = ""; if (FindResult[7]!=null && !FindResult[7].endsWith(""))
		 * { buildNm = FindResult [7]; } if (FindResult[2].trim().length() == 0 &&
		 * FindResult[3].trim().length() == 0 && strAddress.indexOf("동") > 0) { for (int
		 * ti = 0;ti < rowAddress.length;ti++) { if
		 * (!rowAddress[ti].trim().substring(0,1).matches("[가-힣]") &&
		 * rowAddress[ti].trim().endsWith("동")) FindResult[2] = rowAddress[ti]; } }
		 */
/*		FindResult[3] = FindResult[3].trim();
		if ((FindResult[2] == null || FindResult[2].equals(""))  && AddrArr[2] != null) FindResult[2] = AddrArr[2];
		if ((FindResult[3] == null || FindResult[3].equals("")) && AddrArr[3] != null && FindResult[4] == null) {
			FindResult[3] = AddrArr[3];
		} else {
			if (AddrArr[3] != null && !FindResult[3].equals(AddrArr[3])) {
				if (AddrArr[3].indexOf(FindResult[3]) > -1 && FindResult[4] == null) {
					FindResult[3] = AddrArr[3];
				} else {
					if (((AddrArr[3]+" ").indexOf("로 ") > -1 || (AddrArr[3]+" ").indexOf("길 ") > -1) 
							&& ((FindResult[3]+" ").indexOf("로 ") > -1 || (FindResult[3]+" ").indexOf("길 ") > -1) 
							&& ((AddrArr[7] != null && AddrArr[7].indexOf(FindResult[3]) > -1) ||
									(AddrArr[7] == null && (AddrArr[3]).indexOf("로") > -1 && (AddrArr[3]+" ").indexOf("길 ") > -1))
					) {
						FindResult[3] = AddrArr[3];
					}
					else if (((AddrArr[3]).indexOf("로") > -1 || (AddrArr[3]+" ").indexOf("길 ") > -1) 
							&& (FindResult[3]+" ").indexOf("로 ") > -1
							) {
						FindResult[3] = AddrArr[3];
					}
					else if (((AddrArr[3]+" ").indexOf("로 ") > -1 || (AddrArr[3]+" ").indexOf("길 ") > -1) 
							&& (FindResult[3].equals("") && AddrArr[4] == null)
							) {
						FindResult[3] = AddrArr[3];
					}
					else if ((AddrArr[3]+" ").indexOf("길 ") > -1 && (FindResult[3]+" ").indexOf("길 ") > -1 
							&& AddrArr[3].length() > FindResult[3].length()) {
						FindResult[3] = AddrArr[3];
					}
				}
			}
		}
		
		if (!FindResult[1].equals(AddrArr[1]) && AddrArr[1] != null) {
			if (AddrArr[1].startsWith(FindResult[1])) {
				FindResult[1] = AddrArr[1];
			} else {
				if (!FindResult[1].endsWith("시") && !FindResult[1].endsWith("군") && !FindResult[1].endsWith("구")) {
					if ((AddrArr[1].endsWith("시") || AddrArr[1].endsWith("군") || AddrArr[1].endsWith("구"))) {
						FindResult[1] = AddrArr[1];
					} 
				}
			}
		} else {
			if (FindResult[1] != null && AddrArr[7] != null && AddrArr[7].indexOf(FindResult[1])>-1) FindResult[1] = "";

		}
		
		if (!FindResult[1].equals("") && AddrArr[1] != null && !FindResult[1].equals(AddrArr[2])) {
			int pos1 = strAddress.indexOf(FindResult[1]);
			int pos2 = strAddress.indexOf(AddrArr[1]);
			if (pos1 > pos2) FindResult[1] = AddrArr[1];
		}
		*/
		
		
		//단어사전으로 매칭을 못할 경우 기존 파서 사용
		//이전에는 복합명사로 분해하는 문제가 있었으나 길로동으로만 명사사전 체크를 해서 없으면 없는 것으로 판단
		if (noMatchDic) {
			FindResult[0] =  AddrArr[0];
			FindResult[1] =  AddrArr[1];
			FindResult[2] =  AddrArr[2];
			FindResult[3] =  AddrArr[3];
			FindResult[4] =  AddrArr[4];
			FindResult[5] =  AddrArr[5];
			FindResult[6] =  AddrArr[6];
			FindResult[7] =  AddrArr[7];
			FindResult[8] =  AddrArr[8];
			if (FindResult[5] != null && FindResult[6] != null && FindResult[5].equals("산") && "123456789".indexOf(FindResult[6].substring(0,1))> -1) {
				FindResult[5] += FindResult[6];
				FindResult[6] = "";
			}
			// 지번주소 '세종로 남성로 시장북로' 처리
			if (FindResult[0] != null && FindResult[0].contains("서울") && FindResult[3] != null
					&& FindResult[3].contains("세종로")) {
				FindResult[2] = FindResult[3];
				FindResult[3] = "";
			}
			if (FindResult[0] != null && FindResult[0].contains("대구") && FindResult[3] != null) {
				if (FindResult[3].contains("남성로")) {FindResult[2] = "남성로"; FindResult[3] = "";}
				if (FindResult[3].contains("시장북로")) {FindResult[2] = "시장북로";FindResult[3] = "";}
			}
			if (FindResult[2] != null && FindResult[2].equals(AddrArr[2]) 
					&& FindResult[3] != null
					&& !FindResult[3].equals("") && AddrArr[3] == null
					&& FindResult[2].startsWith(FindResult[3])) {
				FindResult[3] = "";
			}
			if (FindResult[5] != null && FindResult[5].length() > 0 && FindResult[5].replaceAll("[0-9]*", "").equals("") 
					&& FindResult[7] != null && FindResult[7].length() > 0 && FindResult[7].replaceAll("[0-9]*", "").equals("") 
					&& FindResult[8] != null && FindResult[8].length() > 1 && FindResult[8].replaceAll("[0-9]*", "").equals("-") 
					) {
				strAddress = strAddress.replaceAll(FindResult[7]+FindResult[8], "");
			}
		}
		if (dongNm.equals("")) dongNm = FindResult[2];
		
/*		if (FindResult[2]!=null && !FindResult[2].equals("")) {
			String[] addrArr = strAddress.split(FindResult[2]);
			if (addrArr.length == 3) {
				String t_addr = addrArr[0] + " " + FindResult[2] + " " + addrArr[1] + " " + addrArr[2];
				strAddress = t_addr.replaceAll("\\s+", " ").trim();
				FindResult[7] = FindResult[7].replaceAll(FindResult[2], " ").trim();
			}
			if (addrArr.length == 4) {
				String t_addr = addrArr[0] + " " + FindResult[2] + " " + addrArr[1] + " " + addrArr[2] + " " + addrArr[3];
				strAddress = t_addr.replaceAll("\\s+", " ").trim();
				FindResult[7] = FindResult[7].replaceAll(FindResult[2], " ").trim();
			}
		}*/
		
		for(int fi=0; fi<=8; fi++) {
			if (FindResult[fi] == null) FindResult[fi] = "";
		}
		
		int findPos = 0;
		String strAddress_comp = strAddress + " ";
		if (FindResult[4] != null & FindResult[4].trim().length() > 0 & strAddress_comp.indexOf(FindResult[4].trim() + " ") > -1) {
			if (strAddress_comp.indexOf(FindResult[4].trim()+ " ")>-1) 
				findPos = strAddress_comp.indexOf(FindResult[4].trim() + " ") + FindResult[4].trim().length();
		} 
		if (FindResult[3] != null & FindResult[3].trim().length() > 0) {
			FindResult[4] = "";
			//FindResult[2] = "";
			if (strAddress_comp.indexOf(FindResult[3].trim()+ " ")>-1)  {
				findPos = strAddress_comp.indexOf(FindResult[3].trim()+ " ") + FindResult[3].trim().length();
			} else {
				findPos = strAddress_comp.indexOf(FindResult[3].trim()) + FindResult[3].trim().length();
			}
		} 
		if (findPos == 0 && FindResult[2] != null & FindResult[2].trim().length() > 0) {
			if (strAddress_comp.indexOf(FindResult[2].trim()+ " ")>-1)  {
				findPos = strAddress_comp.indexOf(FindResult[2].trim() + " ") + FindResult[2].trim().length();
			} else {
				findPos = strAddress_comp.indexOf(FindResult[2].trim()) + FindResult[2].trim().length();
			}
		} 
		if (findPos == 0 && FindResult[1] != null & FindResult[1].trim().length() > 0) {
			if (strAddress_comp.indexOf(FindResult[1].trim()+ " ")>-1)  {
				findPos = strAddress_comp.indexOf(FindResult[1].trim() + " ") + FindResult[1].trim().length();
			} else {
				findPos = strAddress_comp.indexOf(FindResult[1].trim()) + FindResult[1].trim().length();
			}
		} 

		// System.out.println(findStep + ">>>" + strAddress.substring(findPos));
		// 읍면동패턴 :
		// ([가-힣·]{1,15}[읍면동가]$|[가-힣]{1,15}[읍면동가]|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]$|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가])\s?([\d-]{1,10})?
		// 길로패턴 :
		// ([가-힣0-9a-zA-Z\.·]+[길로]\s?[가-힣0-9a-zA-Z\.·]+[길로]|[가-힣0-9a-zA-Z\.·]{0,15}[길로][^시군구읍면동리가])\s?([\d-]{1,5}\s?[\d-]{1,5})?
		// 공동주택 :
		// ([가-힣]+[가-힣0-9a-zA-Z·-]{1,20}[아파트|APT|빌라|단지|주택|상가|오피스텔|빌딩|프라자|호텔|모텔|타운|빌|연립|빌리지]\s?[가-힣0-9a-zA-Z-·]{1,10}동)|([가-힣]+[가-힣0-9a-zA-Z-]{1,20}[아파트|APT|빌라|단지|주택|상가|오피스텔|빌딩|프라자|호텔|모텔|타운|빌|연립|빌리지]\s?[가-힝0-9a-zA-Z-]{1,10})

		String etcAddress = " ";
		try {
			etcAddress += strAddress.substring(findPos);
			if (FindResult[0]!=null) etcAddress = etcAddress.replaceAll(FindResult[0]+" ", " ");
			if (FindResult[1]!=null) etcAddress = etcAddress.replaceAll(FindResult[1]+" ", " ");
			if (FindResult[2]!=null) etcAddress = etcAddress.replaceAll(FindResult[2]+" ", " ");
			if (FindResult[3]!=null) etcAddress = etcAddress.replaceAll(FindResult[3]+" ", " ");
			if (etcAddress.trim().equals("") && !bonbuNum.equals("")) etcAddress += bonbuNum;
			if (etcAddress.trim().equals("") && !bonNum.equals("")) etcAddress += bonNum;
			etcAddress = " " + etcAddress.trim();
/*			String[] etcAddrArr = etcAddress.trim().split(" ");
			if (etcAddrArr.length == 3 && etcAddrArr[0] != null && etcAddrArr[0].replaceAll("[0-9]*", "").equals("") 
					&& etcAddrArr[1] != null && etcAddrArr[1].replaceAll("[0-9]*", "").equals("") 
					&& etcAddrArr[2] != null && etcAddrArr[2].replaceAll("[0-9]*", "").equals("-") 
					) {
				strAddress = strAddress.replaceAll(etcAddrArr[1]+etcAddrArr[2], "");
				etcAddress = etcAddress.replaceAll(etcAddrArr[1]+etcAddrArr[2], "");
			}
			if (etcAddrArr.length == 2 && etcAddrArr[0] != null && etcAddrArr[0].replaceAll("[0-9]*", "").equals("") 
					&& etcAddrArr[1] != null && etcAddrArr[1].replaceAll("[0-9]*", "").equals("-") 
					) {
				strAddress = strAddress.replaceAll(" " + etcAddrArr[1], "");
				etcAddress = etcAddress.replaceAll(etcAddrArr[1], "");
			}*/
		} catch(Exception etcEx) {}
		if (ynSido(etcAddress.trim()) || ynSido(strAddress)) {
			FindResult[0] = rtSido(strAddress.trim());
			etcAddress = "";
		}
		if (!etcAddress.equals("") && FindResult[3].equals("") && FindResult[2].equals("")) {
			if (FindResult[2]!=null && !FindResult[2].equals("")) etcAddress =  etcAddress.replaceAll(FindResult[2] + " ", " ") ;
			if (FindResult[3]!=null && !FindResult[3].equals("")) etcAddress =  etcAddress.replaceAll(FindResult[3] + " ", " ") ;
			if (FindResult[4]!=null && !FindResult[4].equals("")) etcAddress =  etcAddress.replaceAll(FindResult[4] + " ", " ") ;
			if (dongNm==null) dongNm = "";
			etcAddress = " " + etcAddress.replaceAll(dongNm.trim() + " ", " ").trim().replaceAll(",", " ") + " ";
			
			String[] fArr = etcAddress.trim().split(" ");
			if (fArr != null && fArr.length > 1) {
				etcAddress = "";
				for (int fai=0; fai <  fArr.length; fai++) {
					if (fArr[fai].endsWith("층") && fai == 0) continue;
					etcAddress += " " + fArr[fai].trim() ;
				}
				etcAddress += " ";
				etcAddress = etcAddress.replaceAll("\\s+", " ");
			}
			
			//etcAddress = " " + etcAddress.trim().replaceAll("-", " ") + " ";
			String RegexStr =  ""
			      	+ "([가-힣·]{1,15}[읍면동가]$|[가-힣]{1,15}[읍면동가]\\s|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]$|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]\\s)?\\s?"							// 3 읍면동
			      	+ "([가-힣0-9a-zA-Z\\.·]{1,15}[길로]\\s?[가-힣0-9a-zA-Z\\.·]{1,15}[길로]\\s?|[가-힣^\\s$0-9a-zA-Z\\.·]{1,15}[길로](?=\\s)|[가-힣^\\s$0-9a-zA-Z\\.·]{1,15}[길로]$)?\\s?" // 4 
			      	+ "([가-힣^\\s$]{1,15}[0-9]*리\\s|[가-힣^\\s$]{1,15}[0-9]*리$)?\\s?"						// 5 리는 한글만 존재
			      	+ "((?![0-9]{1,5}동)산?\\s?[0-9]{0,5}번?지?)?\\-?\\s?"					// 6 건물 본번, 지번 본번
			      	+ "((?![0-9]{1,5}동)[0-9]{1,5}번?지?\\s|(?![0-9]{1,5}동)[0-9]{1,5}번?지?$)?\\s?"							// 7 건물 부번, 지번 부번
			      	+ "(.+?)?"															// 8 건물명
			      	+ "(\\-[0-9]{1,4}호?)?\\s?"											// 8 건물부명
					+ "$";
			
			Pattern pattern0 = Pattern.compile(RegexStr);
			Matcher matcher0 = pattern0.matcher(etcAddress);
			if(matcher0.find()) {
				if (matcher0.group(1) != null) emd = matcher0.group(1);
				if (FindResult[3].equals("") && matcher0.group(2) != null && matcher0.group(2).indexOf(" ") == -1) {
					FindResult[3] = matcher0.group(2);
				}
				if (FindResult[3].equals("") && matcher0.group(2) != null && matcher0.group(2).indexOf(" ") > 0) {
					if (isNumeric(matcher0.group(2).split(" ")[0])) FindResult[5] = matcher0.group(2).split(" ")[0];
				}
				if (FindResult[5].equals("") && matcher0.group(4) != null) FindResult[5] = matcher0.group(4).replaceAll(" ", "");
				if (!FindResult[5].trim().endsWith("번지")) {
					if (FindResult[6].equals("") && matcher0.group(5) != null) FindResult[6] = matcher0.group(5);
				}
				if (FindResult[7].equals("") && matcher0.group(6) != null) {
					FindResult[7] = matcher0.group(6);
				} else {
					if (matcher0.group(6) != null && matcher0.group(6).indexOf(FindResult[7])>-1) FindResult[7] = matcher0.group(6);
				}
				
				if (FindResult[8].equals("") && matcher0.group(7) != null) FindResult[8] = matcher0.group(7);
				
				if (FindResult[3].equals("") && matcher0.group(2) != null && matcher0.group(2).indexOf(" ") > 0) {
					if (isNumeric(matcher0.group(2).split(" ")[0]) && matcher0.group(2).split(" ")[1].endsWith("로")) FindResult[7] = matcher0.group(2).split(" ")[1] + "" + FindResult[7];
				}
				try {
					String san = "";
					if (FindResult[5].trim().startsWith("산")) {
						san = "산";
						FindResult[5] = FindResult[5].trim().substring(1);
					}
					if (FindResult[5].indexOf("-") > -1) {
						String[] bun5 = FindResult[5].split("|");
						FindResult[5] = san + Integer.parseInt(bun5[0].replaceAll("\\D", "")) + "-" + 
						Integer.parseInt(bun5[1].replaceAll("\\D", ""));
					} else {
						FindResult[5] = san + Integer.parseInt(FindResult[5].replaceAll("\\D", ""));
					}
				} catch(Exception ee) {
					FindResult[5] = FindResult[5].replaceAll("\\D", "");
				}
				try {
					FindResult[6] = "" + Integer.parseInt(FindResult[6].trim().replaceAll("\\D", ""));
				} catch(Exception ee) {
					FindResult[6] = FindResult[6].replaceAll("\\D", "");
				}
			}
			if (FindResult[5].equals("") && !bonbuNum.equals("")) {
				if (bonbuNum.indexOf("-")>-1) {
					FindResult[5] = bonbuNum.split("-")[0];
					FindResult[6] = bonbuNum.split("-")[1];
				}
			}
			if (FindResult[5].equals("") && !bonNum.equals("")) {
				FindResult[5] = bonNum;
				FindResult[6] = "";
			}
		} else {
			if (FindResult[2]!=null && !FindResult[2].equals("")) etcAddress =  etcAddress.replaceAll(FindResult[2] + " ", " ") ;
			if (FindResult[3]!=null && !FindResult[3].equals("")) etcAddress =  etcAddress.replaceAll(FindResult[3] + " ", " ") ;
			if (FindResult[4]!=null && !FindResult[4].equals("")) etcAddress =  etcAddress.replaceAll(FindResult[4] + " ", " ") ;
			//etcAddress = " " + etcAddress.trim().replaceAll("-", " ") + " ";
			if (dongNm==null) dongNm = "";
			etcAddress = " " + etcAddress.replaceAll(dongNm.trim() + " ", " ").trim().replaceAll(",", " ") + " ";
			
			String RegexStr =  ""
			      	+ "([가-힣^\\s$]{1,15}[0-9]*리\\s|[가-힣^\\s$]{1,15}[0-9]*리$)?\\s?"						// 5 리는 한글만 존재
			      	+ "((?![0-9]{1,5}동)산?\\s?[0-9]{0,5}번?지?)?\\-?\\s?"					// 6 건물 본번, 지번 본번
			      	+ "((?![0-9]{1,5}동)[0-9]{1,5}번?지?\\s|(?![0-9]{1,5}동)[0-9]{1,5}번?지?$)?\\s?"							// 7 건물 부번, 지번 부번
			      	+ "(.+?)?"															// 8 건물명
			      	+ "(\\-[0-9]{1,4}호?)?\\s?"											// 8 건물부명
					+ "$";
			
			Pattern pattern0 = Pattern.compile(RegexStr);
			Matcher matcher0 = pattern0.matcher(etcAddress);
			if(matcher0.find()) {
				//System.out.println("matcher0.group(1)>"+matcher0.group(1));
				if (matcher0.group(1) != null && matcher0.group(1).trim().endsWith("리")) {
					if (FindResult[4] != null) {
						FindResult[4] = (FindResult[4] + " " + matcher0.group(1)).trim();
					} else {
						FindResult[4] = matcher0.group(1);
					}
				}
				if (FindResult[5].equals("") && matcher0.group(2) != null) FindResult[5] = matcher0.group(2).replaceAll(" ", "");
				if (FindResult[6].equals("") && matcher0.group(3) != null) FindResult[6] = matcher0.group(3);
				if (FindResult[7].equals("") && matcher0.group(4) != null) {
					FindResult[7] = matcher0.group(4);
				} else {
					if (matcher0.group(4) != null && matcher0.group(4).indexOf(FindResult[7])>-1) FindResult[7] = matcher0.group(4);
				}
				if (FindResult[8].equals("") && matcher0.group(5) != null) FindResult[8] = matcher0.group(5);
				try {
					String san = "";
					if (FindResult[5].trim().startsWith("산")) {
						san = "산";
						FindResult[5] = FindResult[5].trim().substring(1);
					}
					if (FindResult[5].indexOf("-") > -1) {
						String[] bun5 = FindResult[5].split("|");
						FindResult[5] = san + Integer.parseInt(bun5[0].replaceAll("\\D", "")) + "-" + 
						Integer.parseInt(bun5[1].replaceAll("\\D", ""));
					} else {
						FindResult[5] = san + Integer.parseInt(FindResult[5].replaceAll("\\D", ""));
					}
				} catch(Exception ee) {
					FindResult[5] = FindResult[5].replaceAll("\\D", "");
				}
				try {
					FindResult[6] = "" + Integer.parseInt(FindResult[6].trim().replaceAll("\\D", ""));
				} catch(Exception ee) {
					FindResult[6] = FindResult[6].replaceAll("\\D", "");
				}
			}
			
			if (FindResult[5].equals("") && !bonbuNum.equals("")) {
				if (bonbuNum.indexOf("-")>-1) {
					FindResult[5] = bonbuNum.split("-")[0];
					FindResult[6] = bonbuNum.split("-")[1];
				}
			}
			if (FindResult[5].equals("") && !bonNum.equals("")) {
				FindResult[5] = bonNum;
				FindResult[6] = "";
			}
		}

		
		//if (FindResult[4].equals("") && AddrArr[4] != null) FindResult[4] = AddrArr[4];
		//if (FindResult[5].equals("") && AddrArr[5] != null) FindResult[5] = AddrArr[5];
		//if (FindResult[6].equals("") && AddrArr[6] != null) FindResult[6] = AddrArr[6];
		//if (FindResult[7].equals("") && AddrArr[7] != null) FindResult[7] = AddrArr[7];
		//if (FindResult[8].equals("") && AddrArr[8] != null) FindResult[8] = AddrArr[8];
		/*
		if (strAddress.indexOf("동") > -1) {
			Pattern rpattern = Pattern.compile("[0-9]{1,4}동", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				if (!FindResult[2].equals(matchStr) && !FindResult[2].endsWith(matchStr)) {
					String repStr = matchStr.replaceAll(matchStr, " " + matchStr);
					rmatcher.appendReplacement(replacedStringr, repStr);
					
					rmatcher.appendTail(replacedStringr);
					strAddress = replacedStringr.toString();
					break;
				}
			}
		}*/
		
		if (strAddress.length() < 6 && !ynSido(strAddress)) {
			if (FindResult[7].startsWith(FindResult[0])) FindResult[0] = "";
			if (FindResult[7].startsWith(FindResult[1])) FindResult[1] = "";
			if (FindResult[7].startsWith(FindResult[2])) FindResult[2] = "";
		}
		
		if (strAddress.length() < 6 && !ynSido(strAddress)) {
			if (FindResult[7].startsWith(FindResult[0]))
				FindResult[0] = "";
			if (FindResult[7].startsWith(FindResult[1]))
				FindResult[1] = "";
			if (FindResult[7].startsWith(FindResult[2]))
				FindResult[2] = "";
		}
		
		// (-)숫자 처리
		if (FindResult[7].indexOf("동") > -1) {
			String dong1 = FindResult[7];
			Pattern rpattern = Pattern.compile("[0-9]{1,5}동", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(FindResult[7]);
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				String matchStr = rmatcher.group();
				String bdNm = dong1.replaceAll(matchStr, " ");
				FindResult[7] = dong1 + " " + bdNm + " " + matchStr;
				break;
			}
			FindResult[7] = getValue(FindResult[7]).replaceAll("\\s+", " ");
		}

		// 건물명에서 괄호안에 들어가 있는것들은 빼자.. 20170712 @hkkim
		// 그냥 빼면 안된다... 앞에 주소에 동명, 건물명이 없으면 넣어주자...
		// if(FindResult[7]!=null)FindResult[7] =
		// FindResult[7].replaceAll("\\([가-힣0-9a-zA-Z/\\\\,·.\\s]+\\)", "");
		if (FindResult[7] != null && !FindResult[7].equals("")) {
			FindResult[7] = FindResult[7].replaceAll("[(]주[)]", " ");
			if (FindResult[7].indexOf('(') > -1 && FindResult[7].indexOf(')') > -1) {
				FindResult[7] = FindResult[7].replaceAll("[(]", " ");
				FindResult[7] = FindResult[7].replaceAll("[)]", " ");
			} 
			if (FindResult[7].indexOf('(') > -1) {
				FindResult[7] = FindResult[7].replaceAll("[(]", " ");
			}
			FindResult[7] = FindResult[7].replaceAll(",", " ").replaceAll(":", " ").replaceAll("  ", " ");
			
			/*int beginIdx = FindResult[7].indexOf('('), endIdx = 0, comaIdx, len;
			while (beginIdx != -1) {
				len = FindResult[7].length();
				endIdx = FindResult[7].indexOf(')', beginIdx);
				// String temp = FindResult[7].substring(beginIdx, endIdx);
				if (endIdx == -1)
					endIdx = len - 1;
				if (FindResult[7].substring(beginIdx, endIdx + 1).matches(".*\\(\\s*\\d*\\s*\\/*\\s*\\d*\\s*\\).*")) // (숫자) 또는 (숫자/숫자)로 이루어진건 통/반이라고 생각하고 그냥 날리자.
					FindResult[7] = FindResult[7].substring(0, beginIdx) + FindResult[7].substring(endIdx + 1, len);
				else {
					comaIdx = FindResult[7].lastIndexOf(',', endIdx); // 콤마가 여러개 혹은 다른 괄호속에 있을수도 있음..
					if (comaIdx < beginIdx)
						comaIdx = -1; // 괄호 말고 이전에 콤마가 있을수도 있다..
					String dongStr = null;
					if (comaIdx != -1) { // 콤마가 있으면 동명과 건물명으로 분리
						dongStr = FindResult[7].substring(beginIdx + 1, comaIdx).trim();
						// bdStr = FindResult[7].substring(comaIdx+1, endIdx).trim();
						// 동명은 지우고 건물명만 놔두자.
						// FindResult[7] = FindResult[7].substring(0, beginIdx) +
						// FindResult[7].substring(comaIdx+1, endIdx);
						FindResult[7] = FindResult[7].substring(0, beginIdx)
								+ FindResult[7].substring(comaIdx + 1, len);
					} else { // 콤마가 없으면 동이나 건물명 밖에 없음.
						String str = FindResult[7].substring(beginIdx + 1, endIdx).trim();
						// 동을 넣으니까 이상해지는것들이 있다... 서울특별시 구로구 가마산로20다길 8-11, 302호 (구로동)
						if (str.equals("세종로") || str.endsWith("동") || str.endsWith("가") || str.endsWith("읍")
								|| str.endsWith("면")) {
							// 동만 있으면 동에다가 넣어주고 해당 괄호 삭제.
							dongStr = str;
							// FindResult[7] = FindResult[7].replaceAll("\\([가-힣0-9a-zA-Z/\\\\,·.\\s]+\\)",
							// "");
							FindResult[7] = FindResult[7].substring(0, beginIdx)
									+ FindResult[7].substring(endIdx + 1, len);
						} // else { // 건물명만 있으면... 그냥 패스 //}
					}
					if (dongStr != null && FindResult[2] == null) { // 기존에 동명이 없었고 새로 괄호내에서 동명을 찾았으면 이 동명으로 대체!
						// 도로명주소에는 넣지 말자..
						if (FindResult[3] == null)
							FindResult[2] = new String(dongStr);
					}
				}
				beginIdx = FindResult[7].indexOf('(', endIdx);
			}*/
		}
		/*
		 * StringBuffer sb = new StringBuffer(); for(int i=0;i<FindResult.length;i++) {
		 * sb.append("["+i+"]"+FindResult[i]); } logger.debug("Regex:"+sb.toString());
		 */

		if (FindResult[2].trim().equals(""))
			FindResult[2] = null;
		if (FindResult[3].trim().equals(""))
			FindResult[3] = null;

		// 시도유의어 검색용
		hashaddress.put(geocodeindex.sido_syn.name(), rtSido(getValue(FindResult[0])));
		// 시군구 유의어 검색용


		//if (strAddress.indexOf(FindResult[1]) == -1) FindResult[1] = "";
		if (FindResult[0]!=null && FindResult[1]!=null && FindResult[0].startsWith("인천") && FindResult[1].equals("남구")) FindResult[1] = "남구 미추홀구";
		if (FindResult[3]!=null && FindResult[3].equals("너브네길")) FindResult[3] = "너브내길";
		if (FindResult[3]!=null && FindResult[3].indexOf("사그네")>-1) FindResult[3] = FindResult[3].replaceAll("사그네","사그내");
		
		sigungu_syn = (getValue(FindResult[1]) + " " + sigungu_syn.replaceAll(getValue(FindResult[1]) , "")).trim();
		if (sigungu_syn.indexOf(" ")>1) {			
			String[] sggSyn = sigungu_syn.split(" ");
			sigungu_syn = "";
			HashMap<String,String> sggSynMap = new HashMap<String,String>();
			for (int sggi = 0; sggi<sggSyn.length; sggi++) {
				if (sggSynMap.isEmpty() || !sggSynMap.containsKey(sggSyn[sggi])) {
					sggSynMap.put(sggSyn[sggi], sggSyn[sggi]);
					sigungu_syn += " " + sggSyn[sggi];
				}
			}
			sigungu_syn = sigungu_syn.trim();
		}
		
		hashaddress.put(geocodeindex.sgg_syn.name(), sigungu_syn);
		if (FindResult[3] != null && FindResult[3].equals("")) FindResult[3] = null;
		// 읍면동 유의어 검색용
//		logger.debug("읍면동 유의어 검색용 : "+FindResult[2].replaceAll(" ", "")+" "+FindResult[3].replaceAll(" ", ""));
		if (FindResult[6] != null &&  !FindResult[6].equals("") && strAddressCopy.indexOf(FindResult[6]+"번지") > 1) FindResult[6] = "";
		if (FindResult[2] != null && FindResult[3] == null) {
			// 지번주소

			if (getValue(emd).indexOf(getValue(FindResult[2])) >= 0) {
				emd = getValue(emd) + " " + getValue(FindResult[2]).replaceAll(" ", "").trim();
			} else {
				emd = getValue(FindResult[2]).replaceAll(" ", "").trim() + " " + getValue(emd);
			}
			
			emd = emd.trim();
			if (emd.indexOf(" ")>1) {			
				String[] emdSyn = emd.split(" ");
				emd = "";
				HashMap<String,String> emdSynMap = new HashMap<String,String>();
				for (int emdi = 0; emdi<emdSyn.length; emdi++) {
					if (emdSynMap.isEmpty() || !emdSynMap.containsKey(emdSyn[emdi])) {
						emdSynMap.put(emdSyn[emdi], emdSyn[emdi]);
						emd += " " + emdSyn[emdi];
					}
				}
				emd = emd.trim();
			}
			hashaddress.put(geocodeindex.emdong_syn.name(), emd);
			String ri_nm = getValue(FindResult[4]);
			if (!ri_nm.equals(getValue(AddrArr[4]))) ri_nm += " " +  getValue(AddrArr[4]);
			hashaddress.put(geocodeindex.ri_syn.name(), ri_nm);
//			hashaddress.put(geocodeindex.pcl.name(), getValue(FindResult[5]+(getValue(FindResult[6]).equals("")?"":"-"+FindResult[6])));
			// hashaddress.put(AddressKind.jibun_bu.toString(),
			// (""+FindResult[6]).replace("null", ""));

			// 2017.01.20 지번 부번이 0인 경우 0을 제거하고 pcl 생성.
			String str_pcl_m = getValue(FindResult[5]);
			String str_pcl_s = getValue(FindResult[6]);

			try {
				str_pcl_m = String.valueOf(Integer.valueOf(str_pcl_m));
				str_pcl_s = String.valueOf(Integer.valueOf(str_pcl_s));
			} catch (NumberFormatException e) {
				// ignore exception
			}

			str_pcl_s = (str_pcl_s.equals("") || str_pcl_s.equals("0")) ? "" : "-" + str_pcl_s;

			hashaddress.put(geocodeindex.pcl.name(), str_pcl_m + str_pcl_s);

			// 초기화를 위한 삽입
			hashaddress.put(geocodeindex.road_nm_main_no.name(), "");
			hashaddress.put(geocodeindex.road_nm_sub_no.name(), "");
			hashaddress.put(geocodeindex.bd_main_nm_syn.name(), getValue(FindResult[7]));
		} else if (FindResult[3] != null) {
			// 도로명 주소
			hashaddress.put(geocodeindex.road_nm.name(), getValue(FindResult[3]).replaceAll(" ", "").trim());
			String addRo1 = "";
			if (FindResult[3].indexOf(".")>-1) addRo1 = " " + getValue(FindResult[3]).replaceAll("\\.", "·");
			if (FindResult[2] != null && (FindResult[2].endsWith("읍") || FindResult[2].endsWith("면"))) {
				hashaddress.put(geocodeindex.emdong_syn.name(), (
						getValue(FindResult[2]).replaceAll(" ", "") 
						+ " " + getValue(FindResult[3]).replaceAll(" ", "")
						+ addRo1
						).trim()
						);
			} else {
				hashaddress.put(geocodeindex.emdong_syn.name(), 
						(
						getValue(FindResult[3]).replaceAll(" ", "")
						+ addRo1
						).trim());
			}
			
			// 초기화를 위한 삽입
			hashaddress.put(geocodeindex.ri_syn.name(), "");
			hashaddress.put(geocodeindex.pcl.name(), "");

			hashaddress.put(geocodeindex.road_nm_main_no.name(), getValue(FindResult[5]).replaceAll("[^0-9]", ""));
			hashaddress.put(geocodeindex.road_nm_sub_no.name(), getValue(FindResult[6]).replaceAll("[^0-9]", ""));
			// 빌딩 메인 네임에는 리가 들어올 수도 있음
			// hashaddress.put(geocodeindex.bd_main_nm_syn.name(), getValue(FindResult[4]+"
			// " +FindResult[7]).trim());
			hashaddress.put(geocodeindex.bd_main_nm_syn.name(), getValue(FindResult[7]).trim());

			//logger.debug("case 3 bd_main_nm_syn=" + hashaddress.get(geocodeindex.bd_main_nm_syn.name()));
		}
		
		
		// 2015.08.17 도로명주소에 읍면동이 포함되었을 경우 검색안되는 문제로 수정.
		// 2017.07.06 경상남도 하동군 정서리 266-1 읍면동 없이 리 가 오는 경우 pcl이 안들어가는 문제 발견... @hkkim
		/*
		 * if( FindResult[2] != null && FindResult[3] != null ) { // 읍면동, 길로 모두 있을 경우...
		 * 건물본번 부번 넣고, 건물명에 '리'명 + 건물명 넣는다.. 이건 뭥미???
		 * 
		 * 
		 * } else if(FindResult[2] != null || (FindResult[2]==null &&
		 * FindResult[3]==null)){ // 읍면동만 있고 길로가 없을 경우... -> '리' 넣고 pcl 넣는다.. 또는 읍면동 길로
		 * 둘다 없을 경우!
		 * 
		 * 
		 * }else { // 읍면동 없고 길로 있을 경우!
		 * 
		 * } else{ // 읍면동 길로 둘다 없을경우, 읍면동 없고 길로 있을 경우.. // 초기화를 위한 삽입
		 * hashaddress.put(geocodeindex.ri_syn.name(), "");
		 * hashaddress.put(geocodeindex.pcl.name(), "");
		 * 
		 * hashaddress.put(geocodeindex.road_nm_main_no.name(),
		 * getValue(FindResult[5])); hashaddress.put(geocodeindex.road_nm_sub_no.name(),
		 * getValue(FindResult[6])); // 빌딩 메인 네임에는 리가 들어올 수도 있음
		 * //hashaddress.put(geocodeindex.bd_main_nm_syn.name(),
		 * getValue(FindResult[4]+" " +FindResult[7]).trim());
		 * hashaddress.put(geocodeindex.bd_main_nm_syn.name(),
		 * getValue(FindResult[7]).trim());
		 * 
		 * logger.debug("case 3 bd_main_nm_syn=" +
		 * hashaddress.get(geocodeindex.bd_main_nm_syn.name()));
		 * 
		 * }
		 */

		if (FindResult[7] != null && !FindResult[7].equals("")) {
			/*if (FindResult[7].trim().indexOf(" ") > -1) {
				String[] bdNs = FindResult[7].trim().split(" ");
				if (!bdNs[1].endsWith("동")) {
					Pattern rpattern = Pattern.compile("[가-힣0-9a-zA-Z]\\s[가-힣]", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
					Matcher rmatcher = rpattern.matcher(FindResult[7].trim());
					StringBuffer replacedStringr = new StringBuffer();
					while (rmatcher.find()) {
						String matchStr = rmatcher.group();
						String repStr = matchStr.replaceAll(" ", "");
						rmatcher.appendReplacement(replacedStringr, repStr);
					}
					rmatcher.appendTail(replacedStringr);
					FindResult[7] = replacedStringr.toString();
				}
				
				bdNs = FindResult[7].trim().split(" ");
				String bdTmp = "";
				for (int bdNsi = 0; bdNsi < bdNs.length; bdNsi++) {
					bdTmp += bdNs[bdNsi] + " ";
					if (bdNsi >= 1)
						break;
				}
				FindResult[7] = bdTmp.trim();
			} */
			
			if (FindResult[7].trim().indexOf(" ") > -1) {
				if (FindResult[7].trim().indexOf(" ") > -1 && !FindResult[7].trim().endsWith("호")) {
					String[] bdNs = FindResult[7].trim().split(" ");
					String bdTmp = "";
					String dongTmp = "";
					int dongNN = 0;
					int gongdongNN = 0;
					for (int bdNsi = 0; bdNsi < bdNs.length; bdNsi++) {
						if (!bdNs[bdNsi].endsWith("호")) 
							bdTmp += bdNs[bdNsi] + " ";
						if (!bdNs[bdNsi].endsWith("동")) 
							dongNN++;
						dongTmp = bdNs[bdNsi];
					}
					FindResult[7] = bdTmp.replaceAll("%", " ").trim();
					/*if (!FindResult[7].equals("") && bdNs.length > 1 && dongNN > 0 && !dongTmp.equals("") && !dongTmp.endsWith("동")) {
						FindResult[7] += " " + dongTmp + "동";
					}*/
				} 
				if (FindResult[7].trim().indexOf(" ") > -1 && FindResult[7].trim().indexOf("동 ") > -1 && FindResult[7].trim().indexOf("호") > -1) {
					String[] bdNs = FindResult[7].trim().split(" ");
					String bdTmp = "";
					String dongTmp = "";
					int dongNN = 0;
					int gongdongNN = 0;
					for (int bdNsi = 0; bdNsi < bdNs.length; bdNsi++) {
						if (bdNs[bdNsi].indexOf("호") == -1) 
							bdTmp += bdNs[bdNsi] + " ";
						if (!bdNs[bdNsi].endsWith("동")) 
							dongNN++;
						dongTmp = bdNs[bdNsi];
					}
					FindResult[7] = bdTmp.replaceAll("%", " ").trim();
					if (!FindResult[7].equals("") && bdNs.length > 1 && dongNN > 0 && !dongTmp.equals("") && !dongTmp.endsWith("동")) {
						FindResult[7] += " " + dongTmp + "동";
					}
				} 
				
				hashaddress.put(geocodeindex.bd_main_nm.name(), getValue(FindResult[7]));
				
				String[] bdSyn = FindResult[7].split(" ");
				String bdJoinStr = " ";
				for (int bdsi =0;bdsi<bdSyn.length;bdsi++){
					if (bdJoinStr.indexOf(" " + bdSyn[bdsi] + " ") == -1) {
						bdJoinStr += bdSyn[bdsi] + " ";
					}
				}
				
				FindResult[7] = getValue(bdJoinStr).replaceAll("\\s+", " ");
			} else {
				hashaddress.put(geocodeindex.bd_main_nm.name(), getValue(FindResult[7]));
				FindResult[7] = FindResult[7].replaceAll("%", "&").trim();
			}
			if (FindResult[8].trim().length() > 0) {
				FindResult[7] = FindResult[7].trim() + " " + FindResult[8].trim();
				hashaddress.put(geocodeindex.bd_sub_nm.name(), getValue(FindResult[8]));
			}
			
			String[] bdSyn = FindResult[7].split(" ");
			String bdJoinStr = "";
			for (int bdsi =0;bdsi<bdSyn.length;bdsi++){
				String bdNum = bdSyn[bdsi].replaceAll("\\D", "");
				if (!bdNum.equals(""))  bdJoinStr = bdNum;
			}
			FindResult[7] = getValue(FindResult[7] + " " +bdJoinStr).replaceAll("\\s+", " ");
			
			hashaddress.put(geocodeindex.bd_main_nm_syn.name(), getValue(FindResult[7]));
		}
		if (FindResult[7].trim().startsWith("(") && FindResult[7].trim().endsWith("(")) {
			FindResult[7] = "";
		}
		
		FindResult[0] = rtSido(FindResult[0]);
		// hashaddress.put(geocodeindex.emdong_syn.name(),
		// getValue(FindResult[2].replaceAll(" ", "")+" "+FindResult[3].replaceAll(" ",
		// "").trim()));
		
		String bd_main_syn = hashaddress.get(geocodeindex.bd_main_nm_syn.name());
		String emdong_syn = hashaddress.get(geocodeindex.emdong_syn.name());
		if (FindResult[3] != null && FindResult[3].indexOf("\\.")>-1) {
			hashaddress.put(geocodeindex.emdong_syn.name(), emdong_syn + " " +
					FindResult[3].replaceAll("\\.", "·"));
		}
		if (FindResult[2] != null && FindResult[2].indexOf("\\.")>-1) {
			hashaddress.put(geocodeindex.emdong_syn.name(), emdong_syn + " " +
					FindResult[2].replaceAll("\\.", "·"));
		}
		if(emdong_syn != null) emdong_syn = emdong_syn.toString();
		if(emdong_syn != null && gilro != null) emdong_syn = (emdong_syn.toString().replaceAll(gilro.trim(), "") + " " + gilro.trim()).trim();
		if (emdong_syn != null
			&& (emdong_syn.indexOf("제1동") > -1
			|| emdong_syn.indexOf("제2동")	> -1	
			|| emdong_syn.indexOf("제3동")	> -1
			|| emdong_syn.indexOf("제4동")	> -1
			|| emdong_syn.indexOf("제5동")	> -1
			|| emdong_syn.indexOf("제6동")	> -1
			|| emdong_syn.indexOf("제7동")	> -1
			|| emdong_syn.indexOf("제8동")	> -1
			|| emdong_syn.indexOf("제9동")	> -1
			)
			) {
			hashaddress.put(geocodeindex.emdong_syn.name(), 
					emdong_syn  + " " +
					emdong_syn.replaceAll("제1동", "1동")
					.replaceAll("제2동", "2동").replaceAll("제3동", "3동").replaceAll("제4동", "4동")
					.replaceAll("제5동", "5동").replaceAll("제6동", "7동").replaceAll("제8동", "8동").replaceAll("제9동", "9동")
					);
		}
		
		
		if (
				bd_main_syn != null && (
				bd_main_syn.indexOf("길 ") > 0 
				|| bd_main_syn.indexOf("로 ") > 0 
				|| bd_main_syn.indexOf("고개 ") > 0 
				|| bd_main_syn.indexOf("거리 ") > 0 
				|| bd_main_syn.indexOf("동 ") > 0 
				|| bd_main_syn.indexOf("읍 ") > 0 
				|| bd_main_syn.indexOf("면 ") > 0 
				|| bd_main_syn.indexOf("가 ") > 0
				|| (bd_main_syn.indexOf("거리 ") == -1 && bd_main_syn.indexOf("리 ") > 0))
		)
		{
			int dongPtrn = 0;
			Pattern rpattern = Pattern.compile("[0-9A-Za-zg호]{1,4}동", Pattern.CASE_INSENSITIVE); // 대소문자 구분 안함
			Matcher rmatcher = rpattern.matcher(strAddress.trim());
			StringBuffer replacedStringr = new StringBuffer();
			while (rmatcher.find()) {
				dongPtrn++;
			}
			
			if (dongPtrn == 0) {
				hashaddress.put(geocodeindex.emdong_syn.name(), 
					emdong_syn  + " " +
						hashaddress.get(geocodeindex.bd_main_nm_syn.name()).toString());
			}
		}

		addSplitAddress(FindResult, hashaddress);
		if (debugM) printJuso(hashaddress, geocodeindex);
		// System.out.println("8 건물명부명 = "+ FindResult[8]); // 9 건물부명
		 
	}

	private void printJuso(Map<String, String> hashaddress2, GeocodeIndexFieldDefineEnum geocodeindex) {
		System.out.println("--------------------------------"); //
		System.out.println("0 시도      = " + hashaddress.get(geocodeindex.sido_syn.name())); // 1. 시도
		System.out.println("1 시군구    = " + hashaddress.get(geocodeindex.sgg_syn.name())); // 2. 시군구
		System.out.println("2 읍면동    = " + hashaddress.get(geocodeindex.emdong_syn.name())); // 3. 읍면동
		System.out.println("3 길로      = " + hashaddress.get(geocodeindex.road_nm.name())); // 4 길로
		System.out.println("4 리        = " + hashaddress.get(geocodeindex.ri_syn.name())); // 5 리는 한글만 존재
		System.out.println("5 지번 		= " + hashaddress.get(geocodeindex.pcl.name()));
		System.out.println("5 건물 본번 = " + hashaddress.get(geocodeindex.road_nm_main_no.name())); // 6 건물 본번, 지번 본번
		System.out.println("6 건물 부번 = " + hashaddress.get(geocodeindex.road_nm_sub_no.name())); // 7 건물 부번, 지번 부번
		System.out.println("7 건물명    = " + hashaddress.get(geocodeindex.bd_main_nm_syn.name())); // 9 건물명
	}
	
	public void addSplitAddress(String[] arr, Map<String, String> map) {
		if (arr == null) {
			return;
		}

		int i, len;
		String strAddr;
		String sidoStr = "";
		String sggStr = "";
		String dongStr = "";
		String riStr = "";
		for (i = 0, len = arr.length; i < len; i++) {
			strAddr = arr[i];
			if (strAddr == null) {
				continue;
			}
			switch (i) {
			case 0:
				map.put("spSido", strAddr);
				sidoStr = strAddr;
				break;
			case 1:
				map.put("spSgg", strAddr);
				sggStr = strAddr;
				break;
			case 2:
				map.put("spEmdong", strAddr);
				dongStr = strAddr;
				break;
			case 3:
				map.put("spRoad", strAddr);
				break;
			case 4:
				map.put("spRi", strAddr);
				riStr = strAddr;
				break;
			case 5:
				map.put("spMainNo", strAddr);
				break;
			case 6:
				map.put("spSubNo", strAddr);
				break;
			case 7:
				map.put("spBuildMainNm", strAddr);
				break;
			case 8:
				map.put("spBuildSubNm", strAddr);
				break;
			}

		}
		try {
			String searchTerm = sidoStr + sggStr + dongStr + riStr;
			
			HashMap<String, String> xyMap = searchAmd(searchTerm);
			if (xyMap!=null) {
				map.put("spGubun", xyMap.get("gubun"));
				map.put("spX", xyMap.get("x"));
				map.put("spY", xyMap.get("y"));
				map.put("spAdmCd", xyMap.get("admcd"));
				map.put("spLegCd", xyMap.get("legcd"));
				map.put("spAdmNm", xyMap.get("admnm"));
			}
		} catch(Exception catchex) {}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.neighborsystem.durian.regex.IRegex#getRegexStr()
	 */
	public String getRegexStr() {

		// 1. 시도 : 정규식에 정의된 이름 안에서만 제공된다
		// 2. 시군구 : 시군구 명을 판단한다.
		// - 아파트, 빌라등 잘 알려진 건물을 지칭하는 단어가 있을 시는 제외한다
		// - 시, 군, 구로 끝나는지 확인
		// - 시도에는 포함되지 않으며 "읍,면,동,길,로"로 끝나는 단어가 아니면 시군구로 체크
		// 3. 읍면동 : 읍면동을 구분한다.
		// - 읍, 면, 동으로 끝나는 단어를 기준으로 한다.
		// - 시도, 시군구에 포함되지 않은 단어를 체크하여 읍면동인지 체크
		// - 읍면동명 사이에는 숫자를 포함할 수 있다.
		// 4. 길로 : 도로명 주소를 확인하기 위한 체계
		// - "로"로 끝나는 주소를 도로명 주소로 체크한다.
		// - "XX길 XX로", "XX로"에 해당하는 패턴을 체크
		// 5. 리 : 리로 끝나는 주소를 체크한다.
		// - 체크 단어가 "리"로 끝나는지 체크한다
		// 6. 건물본번, 지번 본번 : "-"를 기준으로 건물의 본번인지 부번인지 체크한다.
		// - 산이 붙는 경우를 같이 체크한다.
		// - "-"가 있다면 "-" 앞 까지를 본번으로 한다.
		// 7. 건물부번, 지번 부번 : "-"를 기준으로 건물의 본번인지 부번인지 체크한다.
		// - "동"이 "XXX번지 X동"을 체크
		// - "XXX-XX번지"케이스를 체크한다.
		// 8. 건물명 : 건물본번, 부번 체크 이후는 건물명으로 간주한다.
		// - "XX아파트 301동 101호"에서 "XX아파트 301동"을 체크
		// 9. 건물부명 : 건물 부명을 체크한다.
		// - "XX아파트 301동 101호"에서 "101호"를 체크
		/*
		 * String RegexStr =
		 * "^((?=[경전충][남북]$|[경전충][남북]도?\\s)[경전충][남북]|[경강전충][기원상라청][남북]?도?|" +
		 * "(?=[인울부광대][천산주구전][광역시]{0,3}$|[인울부광대][천산주구전][광역시]{0,3}\\s)[인울부광대][천산주구전]광?역?시?|"
		 * + "(?=서울[특별시]{0,3}$|서울[특별시]{0,3}\\s)서울특?별?시?|" +
		 * "(?=세종[특별자치시]{0,5}$|세종[특별자치시]{0,5}\\s)세종[특별자치]{0,4}시?|제주특별자치도|제주도)?\\s?" // 1
		 * 시도 +
		 * "((?![가-힣]+아파트|빌라)[가-힣]*\\s?(?=\\S+[시군구]\\s|\\S+[시군구]$)\\S+[시군구]{1,1})?\\s?"
		 * // 2 시군구 + "(\\S(?=.*[읍면동가]\\s|.*[읍면동가]$)[가-힣]+[0-9,]{0,7}[읍면동가])?\\s?" // 3
		 * 읍면동 + "([가-힣]+로\\s?[0-9]+번?[안가]?길|^?[가-힣]{1,15}[0-9]*로?[안가]?길?)?\\s?" // 4 길로
		 * + "((?=.+리$|.+리\\s)\\S[가-힣^\\s$]+리)?\\s?" // 5 리는 한글만 존재 +
		 * "((?![0-9]{1,5}동)산?[0-9]{0,5}번?지?)?\\-?\\s?" // 6 건물 본번, 지번 본번 +
		 * "((?![0-9]{1,5}동)[0-9]{1,4}번?지?호?)?\\s?" // 7 건물 부번, 지번 부번 + "(.+?)?" // 8
		 * 건물명 + "(\\-[0-9]{1,4}호?)?\\s?" // 8 건물부명 + "$";
		 */
		String RegexStr = "^((?=[경전충][남북]$|[경전충][남북]도?\\s)[경전충][남북]|[경강전충][기원상라청][남북]?도?|"
				+ "(?=인천[광역시]{0,3}$|인천[광역시]{0,3}\\s)인천광?역?시?|" + "(?=부산[광역시]{0,3}$|부산[광역시]{0,3}\\s)부산광?역?시?|"
				+ "(?=[울광대][산주구전][광역시]{0,3}$|[울광대][산주구전][광역시]{0,3}\\s)[울광대][산주구전]광?역?시?|"
				+ "(?=서울[특별시]{0,3}$|서울[특별시]{0,3}\\s)서울특?별?시?|" + "(?=세종[특별자치시]{0,5}$|세종[특별자치시]{0,5}\\s)세종[특별자치]{0,4}시?|"
				+ "(?=제주[특별자치도]{0,5}$|제주[특별자치도]{0,5}\\s)제주[특별자치]{0,4}도?)?\\s?" // 1 시도
				+ "((?![가-힣]+아파트|빌라)[가-힣]*\\s?(?=\\S+[시군구]\\s|\\S+[시군구]$)\\S+[시군구]{1,1})?\\s?" // 2 시군구
//				+ "((?=.*[읍면동가]\\s|.*[읍면동가]$)[가-힣\\s]+[0-9,]{0,7}[읍면동가])?\\s?"							// 3 읍면동
				+ "([가-힣·]{1,15}[읍면동가]$|[가-힣]{1,15}[읍면동가](?=\\s)|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]$|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가](?=\\s))?\\s?" // 3
																																									// 읍면동
//		      	+ "([가-힣]+로\\s?[0-9]+번?길?[번][안가]길|^?[가-힣]{1,15}[0-9]*로?길?[번][안가]길?)?\\s?"					// 4 길로
//		      	+ "([가-힣]+로?\\s?[0-9]+번?[안가]?길|^?[가-힣]{1,15}[0-9]*로?[안가]?길)?\\s?"					// 4 길로

//		      	+ "([가-힣^\\s$]{1,15}[0-9]*번?[안가나다]?[길로]\\s|[가-힣^\\s$]{1,15}[0-9]*번?[안가나다]?[길로]$)?\\s?"					// 4 길로
//		      	+ "([가-힣^\\s$0-9]{1,15}[0-9]*번?[가-힣0-9]?[길로]\\s|[가-힣^\\s$0-9]{1,15}[0-9]*번?[가-힣0-9]?[길로]$)?\\s?"					// 4 길로
//		      	+ "([가-힣^\\s$0-9]{1,15}[길로]\\s|[가-힣^\\s$0-9]{1,15}[길로]$)?\\s?"					// 4 길로
				+ "([가-힣^\\s$]{1,15}[0-9]*번?[안동서가나다라마바사아자차카타파하]?[길로]\\s|[0-9]*[가-힣]{1,15}[0-9]*로?[1-9]*번?[가나다라마바사아자차호]?길|[0-9]{1,3}[가-힣]{1,15}로|[가-힣^\\s$]{1,15}[0-9]*번?[안동서가나다라마바사아자차카타파하]?[길로]$)?\\s?" // 4 길로
																																										// 길로

//		      	+ "((?=.+리$|.+리\\s)\\S[가-힣^\\s$]+리)?\\s?"						// 5 리는 한글만 존재
				+ "([가-힣^\\s$]{1,15}[0-9]*리(?=\\s)|[가-힣^\\s$]{1,15}[0-9]*리$)?\\s?" // 5 리는 한글만 존재
				+ "((?![0-9]{1,5}동)산?\\s*[0-9]{1,5}번?지?)?\\-?\\s?" // 6 건물 본번, 지번 본번
				+ "((?![0-9]{1,5}동)[0-9]{1,4}번?지?호?\\s?|(?![0-9]{1,5}동)[0-9]{1,4}번?지?호?$)?\\s?" // 7 건물 부번, 지번 부번
				+ "(.+?)?" // 8 건물명
				+ "(\\-[0-9]{1,4}호?)?\\s?" // 8 건물부명
				+ "$";

		return RegexStr;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.neighborsystem.durian.regex.IRegex#getRegexStr()
	 */
	public String getRegexStrBak() {

		// 6. 건물본번, 지번 본번 : "-"를 기준으로 건물의 본번인지 부번인지 체크한다.
		// - 산이 붙는 경우를 같이 체크한다.
		// - "-"가 있다면 "-" 앞 까지를 본번으로 한다.
		// 7. 건물부번, 지번 부번 : "-"를 기준으로 건물의 본번인지 부번인지 체크한다.
		// - "동"이 "XXX번지 X동"을 체크
		// - "XXX-XX번지"케이스를 체크한다.
		// 8. 건물명 : 건물본번, 부번 체크 이후는 건물명으로 간주한다.
		// - "XX아파트 301동 101호"에서 "XX아파트 301동"을 체크
		// 9. 건물부명 : 건물 부명을 체크한다.
		// - "XX아파트 301동 101호"에서 "101호"를 체크
		String RegexStr = "" + "(산?\\s?\\d+\\s?번지|산?\\s?\\d+(?=\\-|,|\\s|$))?\\s?(?:\\-)?" // 6 건물 본번, 지번 본번 20170901
				+ "((?<=번지|\\-|번지\\s)\\d+호|(?<=번지|\\-)\\d+\\s?번지|(?<=번지|\\-)\\d+\\s?,|(?<=번지|\\-)\\d+$|(?<=번지|\\-)\\d+\\s)?\\s?" // 7
				+ "(.+?)?" // 8 건물명
				+ "(\\-[0-9]{1,4}호?)?\\s?" // 9 건물부명
				+ "$";

		return RegexStr;
	}

	public String getResultValue(String strKey) {
		return hashaddress.get(strKey);
	}

	public Map<String, String> getResult() {
		// TODO Auto-generated method stub
		return hashaddress;
	}


    private String[] patternMatch(String strAddress) {

		String RegexStr = "^((?=[경전충][남북]$|[경전충][남북]도?\\s)[경전충][남북]|[경강전충][기원상라청][남북]?도?|"
				+ "(?=인천[광역시]{0,3}$|인천[광역시]{0,3}\\s)인천광?역?시?|" + "(?=부산[광역시]{0,3}$|부산[광역시]{0,3}\\s)부산광?역?시?|"
				+ "(?=[울광대][산주구전][광역시]{0,3}$|[울광대][산주구전][광역시]{0,3}\\s)[울광대][산주구전]광?역?시?|"
				+ "(?=서울[특별시]{0,3}$|서울[특별시]{0,3}\\s)서울특?별?시?|" + "(?=세종[특별자치시]{0,5}$|세종[특별자치시]{0,5}\\s)세종[특별자치]{0,4}시?|"
				+ "(?=제주[특별자치도]{0,5}$|제주[특별자치도]{0,5}\\s)제주[특별자치]{0,4}도?)?\\s?" // 1 시도
				+ "((?![가-힣]+아파트|빌라)[가-힣]*\\s?(?=\\S+[시군구]\\s|\\S+[시군구]$)\\S+[시군구]{1,1})?\\s?" // 2 시군구
//				+ "((?=.*[읍면동가]\\s|.*[읍면동가]$)[가-힣\\s]+[0-9,]{0,7}[읍면동가])?\\s?"							// 3 읍면동
				+ "([가-힣·]{1,15}[읍면동가]$|[가-힣]{1,15}[읍면동가]\\s|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]$|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]\\s)?\\s?" // 3
																																							// 읍면동
//		      	+ "([가-힣]+로\\s?[0-9]+번?길?[번][안가]길|^?[가-힣]{1,15}[0-9]*로?길?[번][안가]길?)?\\s?"					// 4 길로
//		      	+ "([가-힣]+로?\\s?[0-9]+번?[안가]?길|^?[가-힣]{1,15}[0-9]*로?[안가]?길)?\\s?"					// 4 길로
				+ "([가-힣^\\s$]{1,15}[0-9]*번?[안동서가나다라마바사아자차카타파하]?[길로]\\s|[0-9]*[가-힣]{1,15}[0-9]*로?[1-9]*번?[가나다라마바사아자차호]?길|[0-9]{1,3}[가-힣]{1,15}로|[가-힣^\\s$]{1,15}[0-9]*번?[안동서가나다라마바사아자차카타파하]?[길로]$)?\\s?" // 4 길로
//		      	+ "((?=.+리$|.+리\\s)\\S[가-힣^\\s$]+리)?\\s?"						// 5 리는 한글만 존재
				+ "([가-힣^\\s$]{1,15}[0-9]*리\\s|[가-힣^\\s$]{1,15}[0-9]*리$)?\\s?" // 5 리는 한글만 존재
				+ "((?![0-9]{1,5}동)산?[0-9]{0,5}번?지?)?\\-?\\s?" // 6 건물 본번, 지번 본번
				+ "((?![0-9]{1,5}동)[0-9]{1,4}번?지?호?\\s|(?![0-9]{1,5}동)[0-9]{1,4}번?지?호?$)?\\s?" // 7 건물 부번, 지번 부번
				+ "(.+?)?" // 8 건물명
				+ "(\\-[0-9]{1,4}호?)?\\s?" // 8 건물부명
				+ "$";

		Pattern pattern = Pattern.compile(RegexStr);

		//System.out.println("Full address =" + strAddress);
		Matcher matcher = pattern.matcher(strAddress.trim());
		String[] retAddr = {"","","","","","","","",""};
		if (matcher.find()) {
			retAddr[0] = matcher.group(1);
			retAddr[1] = matcher.group(2);			
			retAddr[2] = matcher.group(3);
			retAddr[3] = matcher.group(4);
			retAddr[4] = matcher.group(5);
			retAddr[5] = matcher.group(6);
			retAddr[6] = matcher.group(7);
			retAddr[7] = matcher.group(8);
			retAddr[8] = matcher.group(9);

			// System.out.println(new AddressDivision( strAddress[i] ).getResult());
			//System.out.println("");
		}
		return retAddr;
    }
    
	private String getValue(String strValue) {
		return (strValue == null ? "" : strValue.equals("null") ? "" : strValue.replace("null", "")).trim();
	}
    
	private String getValueNe(String strValue) {
		return (strValue == null ? "" : strValue.equals("null") ? "" : strValue.replace("null", "").replace(" ", "")).trim();
	}

	private static boolean ynSido(String sido) {
		String retStr = sido;
		
		if ("전라남도".equals(sido)) return true;
		if ("전남".equals(sido)) return true;
		if ("전라북도".equals(sido)) return true;
		if ("전북".equals(sido)) return true;
		if ("경상남도".equals(sido)) return true;
		if ("경남".equals(sido)) return true;
		if ("경상북도".equals(sido)) return true;
		if ("경북".equals(sido)) return true;
		if ("충청북도".equals(sido)) return true;
		if ("충북".equals(sido)) return true;
		if ("충청남도".equals(sido)) return true;
		if ("충남".equals(sido)) return true;
		if ("강원도".equals(sido)) return true;
		if ("강원".equals(sido)) return true;
		if ("경기도".equals(sido)) return true;
		if ("경기".equals(sido)) return true;
		if ("제주특별자치도".equals(sido)) return true;
		if ("제주".equals(sido)) return true;
		if ("제주시".equals(sido)) return true;
		if ("제주특별자치시".equals(sido)) return true;
		if ("광주광역시".equals(sido)) return true;
		if ("광주".equals(sido)) return true;
		if ("광주시".equals(sido)) return true;
		if ("부산광역시".equals(sido)) return true;
		if ("부산".equals(sido)) return true;
		if ("부산시".equals(sido)) return true;
		if ("대구광역시".equals(sido)) return true;
		if ("대구".equals(sido)) return true;
		if ("대구시".equals(sido)) return true;
		if ("울산광역시".equals(sido)) return true;
		if ("울산".equals(sido)) return true;
		if ("울산시".equals(sido)) return true;
		if ("대전광역시".equals(sido)) return true;
		if ("대전".equals(sido)) return true;
		if ("대전시".equals(sido)) return true;
		if ("세종특별자치시".equals(sido)) return true;
		if ("세종".equals(sido)) return true;
		if ("세종시".equals(sido)) return true;
		if ("인천광역시".equals(sido)) return true;
		if ("인천".equals(sido)) return true;
		if ("인천시".equals(sido)) return true;
		if ("서울특별시".equals(sido)) return true;
		if ("서울".equals(sido)) return true;
		if ("서울시".equals(sido)) return true;
		return false;
	}
	
	private static String rtSido(String sido) {
		if (sido == null) return sido;
		if ("전라남도".equals(sido)) return "전라남도";
		if ("전남".equals(sido)) return "전라남도";
		if ("전라북도".equals(sido)) return "전라북도";
		if ("전북".equals(sido)) return "전라북도";
		if ("경상남도".equals(sido)) return "경상남도";
		if ("경남".equals(sido)) return "경상남도";
		if ("경상북도".equals(sido)) return "경상북도";
		if ("경북".equals(sido)) return "경상북도";
		if ("충청북도".equals(sido)) return "충청북도";
		if ("충북".equals(sido)) return "충청북도";
		if ("충청남도".equals(sido)) return "충청남도";
		if ("충남".equals(sido)) return "충청남도";
		if ("강원도".equals(sido)) return "강원도";
		if ("강원".equals(sido)) return "강원도";
		if ("경기도".equals(sido)) return "경기도";
		if ("경기".equals(sido)) return "경기도";
		if ("제주특별자치도".equals(sido)) return "제주특별자치도";
		if ("제주".equals(sido)) return "제주특별자치도";
		if ("제주시".equals(sido)) return "제주특별자치도";
		if ("제주특별자치시".equals(sido)) return "제주특별자치도";
		if ("광주광역시".equals(sido)) return "광주광역시";
		if ("광주".equals(sido)) return "광주광역시";
		if ("광주시".equals(sido)) return "광주광역시";
		if ("부산광역시".equals(sido)) return "부산광역시";
		if ("부산".equals(sido)) return "부산광역시";
		if ("부산시".equals(sido)) return "부산광역시";
		if ("대구광역시".equals(sido)) return "대구광역시";
		if ("대구".equals(sido)) return "대구광역시";
		if ("대구시".equals(sido)) return "대구광역시";
		if ("울산광역시".equals(sido)) return "울산광역시";
		if ("울산".equals(sido)) return "울산광역시";
		if ("울산시".equals(sido)) return "울산광역시";
		if ("대전광역시".equals(sido)) return "대전광역시";
		if ("대전".equals(sido)) return "대전광역시";
		if ("대전시".equals(sido)) return "대전광역시";
		if ("세종특별자치시".equals(sido)) return "세종특별자치시";
		if ("세종".equals(sido)) return "세종특별자치시";
		if ("세종시".equals(sido)) return "세종특별자치시";
		if ("인천광역시".equals(sido)) return "인천광역시";
		if ("인천".equals(sido)) return "인천광역시";
		if ("인천시".equals(sido)) return "인천광역시";
		if ("서울특별시".equals(sido)) return "서울특별시";
		if ("서울".equals(sido)) return "서울특별시";
		if ("서울시".equals(sido)) return "서울특별시";
		return sido;
	}
	
	private static String[] synSido(String sido) {
		String retStr = sido;
		sido = sido.trim();
		
		if ("전라남도".equals(sido)) retStr = "전라남도 전남";
		if ("전라북도".equals(sido)) retStr = "전라북도 전북";
		if ("경상남도".equals(sido)) retStr = "경상남도 경남";
		if ("경상북도".equals(sido)) retStr = "경상북도 경북";
		if ("충청북도".equals(sido)) retStr = "충청북도 충북";
		if ("충청남도".equals(sido)) retStr = "충청남도 충남";
		if ("강원도".equals(sido)) retStr = "강원도 강원";
		if ("경기도".equals(sido)) retStr = "경기도 경기";
		if ("제주특별자치도".equals(sido)) retStr = "제주특별자치도 제주";
		if ("광주광역시".equals(sido)) retStr = "광주광역시 광주";
		if ("부산광역시".equals(sido)) retStr = "부산광역시 부산";
		if ("대구광역시".equals(sido)) retStr = "대구광역시 대구";
		if ("울산광역시".equals(sido)) retStr = "울산광역시 울산";
		if ("대전광역시".equals(sido)) retStr = "대전광역시 대전";
		if ("세종특별자치시".equals(sido)) retStr = "세종특별자치시 세종";
		if ("인천광역시".equals(sido)) retStr = "인천광역시 인천";
		if ("서울특별시".equals(sido)) retStr = "서울특별시 서울";
		return retStr.split(" ");
	}

	public static void loadDic() throws Exception {
		String dicPath = AddressDivision.class.getResource("").getPath() +"user-dic.txt";
		if (System.getProperty("os.name").toLowerCase().indexOf("win")>= 0) {
			dicPath = "C:/synonym/user-dic.txt";
		}
		System.out.println("==================================================");
		System.out.println("================= DIC LOAD =========================");
		System.out.println("==================================================");
		try (BufferedReader br = Files.newBufferedReader(Paths.get(dicPath), StandardCharsets.UTF_8)) {
			for (String line = null; (line = br.readLine()) != null;) {
		        String[] nounscnt = line.split("\n");
				for (int nc = 0; nc<nounscnt.length; nc++) {
					String[] nouns = nounscnt[nc].split(",", -1);
					//System.out.println( nounscnt[nc] + ">" + nouns.length);
					if (nouns[7].trim().length()>2) {
						nounsArrAdm.add(nouns);
						continue;
					} 
					int nk = chosungCode(nouns[0]);
					int nkLen = nounLen(nouns[0]);
					
					//System.out.println(nouns[0] +">"+ nk);
					//System.out.println(nk);
					switch(nk) {
					case 101:
						if (nkLen == 1) nounsArr1011.add(nouns);
						else if (nkLen == 2) nounsArr1012.add(nouns);
						else if (nkLen == 3) nounsArr1013.add(nouns);
						else if (nkLen == 4) nounsArr1014.add(nouns);
						else nounsArr1015.add(nouns);
						break;
					case 102:
						if (nkLen == 1) nounsArr1021.add(nouns);
						else if (nkLen == 2) nounsArr1022.add(nouns);
						else if (nkLen == 3) nounsArr1023.add(nouns);
						else if (nkLen == 4) nounsArr1024.add(nouns);
						else nounsArr1025.add(nouns);
						break;
					case 103:
						if (nkLen == 1) nounsArr1031.add(nouns);
						else if (nkLen == 2) nounsArr1032.add(nouns);
						else if (nkLen == 3) nounsArr1033.add(nouns);
						else if (nkLen == 4) nounsArr1034.add(nouns);
						else nounsArr1035.add(nouns);
						break;
					case 104:
						if (nkLen == 1) nounsArr1041.add(nouns);
						else if (nkLen == 2) nounsArr1042.add(nouns);
						else if (nkLen == 3) nounsArr1043.add(nouns);
						else if (nkLen == 4) nounsArr1044.add(nouns);
						else nounsArr1045.add(nouns);
						break;
					case 105:
						if (nkLen == 1) nounsArr1051.add(nouns);
						else if (nkLen == 2) nounsArr1052.add(nouns);
						else if (nkLen == 3) nounsArr1053.add(nouns);
						else if (nkLen == 4) nounsArr1054.add(nouns);
						else nounsArr1055.add(nouns);
						break;
					case 106:
						if (nkLen == 1) nounsArr1061.add(nouns);
						else if (nkLen == 2) nounsArr1062.add(nouns);
						else if (nkLen == 3) nounsArr1063.add(nouns);
						else if (nkLen == 4) nounsArr1064.add(nouns);
						else nounsArr1065.add(nouns);
						break;
					case 107:
						if (nkLen == 1) nounsArr1071.add(nouns);
						else if (nkLen == 2) nounsArr1072.add(nouns);
						else if (nkLen == 3) nounsArr1073.add(nouns);
						else if (nkLen == 4) nounsArr1074.add(nouns);
						else nounsArr1075.add(nouns);
						break;
					case 108:
						if (nkLen == 1) nounsArr1081.add(nouns);
						else if (nkLen == 2) nounsArr1082.add(nouns);
						else if (nkLen == 3) nounsArr1083.add(nouns);
						else if (nkLen == 4) nounsArr1084.add(nouns);
						else nounsArr1085.add(nouns);
						break;
					case 109:
						if (nkLen == 1) nounsArr1091.add(nouns);
						else if (nkLen == 2) nounsArr1092.add(nouns);
						else if (nkLen == 3) nounsArr1093.add(nouns);
						else if (nkLen == 4) nounsArr1094.add(nouns);
						else nounsArr1095.add(nouns);
						break;
					case 110:
						if (nkLen == 1) nounsArr1101.add(nouns);
						else if (nkLen == 2) nounsArr1102.add(nouns);
						else if (nkLen == 3) nounsArr1103.add(nouns);
						else if (nkLen == 4) nounsArr1104.add(nouns);
						else nounsArr1105.add(nouns);
						break;
					case 111:
						if (nkLen == 1) nounsArr1111.add(nouns);
						else if (nkLen == 2) nounsArr1112.add(nouns);
						else if (nkLen == 3) nounsArr1113.add(nouns);
						else if (nkLen == 4) nounsArr1114.add(nouns);
						else nounsArr1115.add(nouns);
						break;
					case 112:
						if (nkLen == 1) nounsArr1121.add(nouns);
						else if (nkLen == 2) nounsArr1122.add(nouns);
						else if (nkLen == 3) nounsArr1123.add(nouns);
						else if (nkLen == 4) nounsArr1124.add(nouns);
						else nounsArr1125.add(nouns);
						break;
					case 113:
						if (nkLen == 1) nounsArr1131.add(nouns);
						else if (nkLen == 2) nounsArr1132.add(nouns);
						else if (nkLen == 3) nounsArr1133.add(nouns);
						else if (nkLen == 4) nounsArr1134.add(nouns);
						else nounsArr1135.add(nouns);
						break;
					case 114:
						if (nkLen == 1) nounsArr1141.add(nouns);
						else if (nkLen == 2) nounsArr1142.add(nouns);
						else if (nkLen == 3) nounsArr1143.add(nouns);
						else if (nkLen == 4) nounsArr1144.add(nouns);
						else nounsArr1145.add(nouns);
						break;
					case 115:
						if (nkLen == 1) nounsArr1151.add(nouns);
						else if (nkLen == 2) nounsArr1152.add(nouns);
						else if (nkLen == 3) nounsArr1153.add(nouns);
						else if (nkLen == 4) nounsArr1154.add(nouns);
						else nounsArr1155.add(nouns);
						break;
					}
				}
		    }
		    br.close();
		} catch (Exception e) {
			System.err.println("Cannot load dic\n" + e);
		}
		//System.out.println("==================================================");
		//System.out.println("================ DIC LOAD END =======================");
		//System.out.println("==================================================");
	}

	private static ArrayList<String[]> searchArr(ArrayList<String[]> nounsArr, String term) {
		ArrayList<String[]> tmpArr = new ArrayList<String[]>();
		for(int ni=0;ni<nounsArr.size();ni++) {
			String[] nouns = nounsArr.get(ni);
			
			if (term.trim().equals(nouns[0].trim())) {
				tmpArr.add(nouns);
			}
		}
		return tmpArr;
	}
	
	public HashMap<String, String> searchAmd(String term) {
		term = term.trim();
		ArrayList<String[]> tmpArr = searchArr(nounsArrAdm, term);
		HashMap<String, String> xyMap = new HashMap<>();
		String[] matchAddr = tmpArr.get(0);
		xyMap.put("gubun", matchAddr[1]);
		xyMap.put("x", matchAddr[7]);
		xyMap.put("y", matchAddr[8]);
		xyMap.put("admcd", matchAddr[9]);
		xyMap.put("legcd", matchAddr[10]);
		xyMap.put("admnm", matchAddr[11]);
		return xyMap;
	}
	
	public ArrayList<String[]> searchAddr(String term) {
		ArrayList<String[]> tmpArr = new ArrayList<String[]>();
		term = term.trim();
		try { 
			int nk = chosungCode(term);
			int nkLen = nounLen(term);
			
			switch(nk) {
			case 101:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1011, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1012, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1013, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1014, term);
				else tmpArr = searchArr(nounsArr1015, term);
				break;
			case 102:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1021, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1022, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1023, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1024, term);
				else tmpArr = searchArr(nounsArr1025, term);
				break;
			case 103:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1031, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1032, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1033, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1034, term);
				else tmpArr = searchArr(nounsArr1035, term);
				break;
			case 104:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1041, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1042, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1043, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1044, term);
				else tmpArr = searchArr(nounsArr1045, term);
				break;
			case 105:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1051, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1052, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1053, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1054, term);
				else tmpArr = searchArr(nounsArr1055, term);
				break;
			case 106:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1061, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1062, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1063, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1064, term);
				else tmpArr = searchArr(nounsArr1065, term);
				break;
			case 107:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1071, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1072, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1073, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1074, term);
				else tmpArr = searchArr(nounsArr1075, term);
				break;
			case 108:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1081, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1082, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1083, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1084, term);
				else tmpArr = searchArr(nounsArr1085, term);
				break;
			case 109:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1091, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1092, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1093, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1094, term);
				else tmpArr = searchArr(nounsArr1095, term);
				break;
			case 110:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1101, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1102, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1103, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1104, term);
				else tmpArr = searchArr(nounsArr1105, term);
				break;
			case 111:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1111, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1112, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1113, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1114, term);
				else tmpArr = searchArr(nounsArr1115, term);
				break;
			case 112:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1121, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1122, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1123, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1124, term);
				else tmpArr = searchArr(nounsArr1125, term);
				break;
			case 113:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1131, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1132, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1133, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1134, term);
				else tmpArr = searchArr(nounsArr1135, term);
				break;
			case 114:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1141, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1142, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1143, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1144, term);
				else tmpArr = searchArr(nounsArr1145, term);
				break;
			case 115:
				if (nkLen == 1) tmpArr = searchArr(nounsArr1151, term);
				else if (nkLen == 2) tmpArr = searchArr(nounsArr1152, term);
				else if (nkLen == 3) tmpArr = searchArr(nounsArr1153, term);
				else if (nkLen == 4) tmpArr = searchArr(nounsArr1154, term);
				else tmpArr = searchArr(nounsArr1155, term);
				break;
			}
		} catch(Exception ex) {
		}
		return tmpArr;
	}
	
	private static int chosungCode(String fullStr){
		int reti=115;
		fullStr = fullStr.trim();
		char comVal = (char) (fullStr.charAt(0)-0xAC00);
		if (comVal >= 0 && comVal <= 11172){
			// 한글일경우 
			// 초성만 입력 했을 시엔 초성은 무시해서 List에 추가합니다.
			char uniVal = (char)comVal;
			// 유니코드 표에 맞추어 초성 중성 종성을 분리합니다..
			char cho = (char) ((((uniVal - (uniVal % 28)) / 28) / 21) + 0x1100);
			if(cho!=4519){
				int first = (comVal - 44032 ) / ( 21 * 28 );
		        reti = 175+first;
			}
			
			String choStr = String.valueOf(cho);
			if (choStr.equals("ᄀ") || choStr.equals("ᄁ")) reti = 101;
			if (choStr.equals("ᄂ")) reti = 102;
			if (choStr.equals("ᄃ") || choStr.equals("ᄄ")) reti = 103;
			if (choStr.equals("ᄅ")) reti = 104;
			if (choStr.equals("ᄆ")) reti = 105;
			if (choStr.equals("ᄇ") || choStr.equals("ᄈ")) reti = 106;
			if (choStr.equals("ᄉ") || choStr.equals("ᄊ")) reti = 107;
			if (choStr.equals("ᄋ")) reti = 108;
			if (choStr.equals("ᄌ") || choStr.equals("ᄍ")) reti = 109;
			if (choStr.equals("ᄎ")) reti = 110;
			if (choStr.equals("ᄏ")) reti = 111;
			if (choStr.equals("ᄐ")) reti = 112;
			if (choStr.equals("ᄑ")) reti = 113;
			if (choStr.equals("ᄒ")) reti = 114;
		} else {
			reti = 115;			
		}
		return reti;	
	}


	private static int nounLen(String nn) {
		int nkLen = 1;
		nn = nn.trim();
		if (nn.length()==4) nkLen = 2;
		else if (nn.length()==5 || nn.length()==6) nkLen = 3;
		else if (nn.length()==7 || nn.length()==8) nkLen = 4;
		else if (nn.length()>=9) nkLen = 5;
		return nkLen;
	}
	
	public static void main(String[] args) {
		String strtestPatSido = "*도|*시|경남|경상|경북|서울|세종|전남|전라|전북|충남|충북|충청|제주";
				
		/*System.out.println("능가사로>"+chosungCode("능가사로"));
		System.out.println("도서관길>"+chosungCode("도서관길"));*/

		/*
		 * String RegexStr =
		 * "^((?=[경전충][남북]$|[경전충][남북]도?\\s)[경전충][남북]|[경강전충][기원상라청][남북]?도?|" +
		 * "(?=[인울부광대][천산주구전][광역시]{0,3}$|[인울부광대][천산주구전][광역시]{0,3}\\s)[인울부광대][천산주구전]광?역?시?|"
		 * + "(?=서울[특별시]{0,3}$|서울[특별시]{0,3}\\s)서울특?별?시?|" +
		 * "(?=세종[특별자치시]{0,5}$|세종[특별자치시]{0,5}\\s)세종[특별자치]{0,4}시?|제주특별자치도|제주도)?\\s?" // 1
		 * 시도 +
		 * "((?![가-힣]+아파트|빌라)[가-힣]*\\s?(?=\\S+[시군구]\\s|\\S+[시군구]$)\\S+[시군구]{1,1})?\\s?"
		 * // 2 시군구 + "(\\S(?=.*[읍면동가]\\s|.*[읍면동가]$)[가-힣]+[0-9,]{0,7}[읍면동가])?\\s?" // 3
		 * 읍면동 // +
		 * "([가-힣]+로\\s?[0-9]+번?길?[번][안가]길|^?[가-힣]{1,15}[0-9]*로?길?[번][안가]길?)?\\s?" // 4
		 * 길로 + "([가-힣]+로\\s?[0-9]+번?[안가]?길|^?[가-힣]{1,15}[0-9]*로?[안가]?길?)?\\s?" // 4 길로
		 * + "((?=.+리$|.+리\\s)\\S[가-힣^\\s$]+리)?\\s?" // 5 리는 한글만 존재 +
		 * "((?![0-9]{1,5}동)산?[0-9]{0,5}번?지?)?\\-?\\s?" // 6 건물 본번, 지번 본번 +
		 * "((?![0-9]{1,5}동)[0-9]{1,4}번?지?호?)?\\s?" // 7 건물 부번, 지번 부번 + "(.+?)?" // 8
		 * 건물명 + "(\\-[0-9]{1,4}호?)?\\s?" // 8 건물부명 + "$";
		 */

		String RegexStr = "^((?=[경전충][남북]$|[경전충][남북]도?\\s)[경전충][남북]|[경강전충][기원상라청][남북]?도?|"
				+ "(?=인천[광역시]{0,3}$|인천[광역시]{0,3}\\s)인천광?역?시?|" + "(?=부산[광역시]{0,3}$|부산[광역시]{0,3}\\s)부산광?역?시?|"
				+ "(?=[울광대][산주구전][광역시]{0,3}$|[울광대][산주구전][광역시]{0,3}\\s)[울광대][산주구전]광?역?시?|"
				+ "(?=서울[특별시]{0,3}$|서울[특별시]{0,3}\\s)서울특?별?시?|" + "(?=세종[특별자치시]{0,5}$|세종[특별자치시]{0,5}\\s)세종[특별자치]{0,4}시?|"
				+ "(?=제주[특별자치도]{0,5}$|제주[특별자치도]{0,5}\\s)제주[특별자치]{0,4}도?)?\\s?" // 1 시도
				+ "((?![가-힣]+아파트|빌라)[가-힣]*\\s?(?=\\S+[시군구]\\s|\\S+[시군구]$)\\S+[시군구]{1,1})?\\s?" // 2 시군구
//				+ "((?=.*[읍면동가]\\s|.*[읍면동가]$)[가-힣\\s]+[0-9,]{0,7}[읍면동가])?\\s?"							// 3 읍면동
				+ "([가-힣·]{1,15}[읍면동가]$|[가-힣]{1,15}[읍면동가]\\s|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]$|[가-힣]+\\s?[1-9·,]{0,10}[가-힣·]{0,10}[읍면동가]\\s)?\\s?" // 3
																																							// 읍면동
//		      	+ "([가-힣]+로\\s?[0-9]+번?길?[번][안가]길|^?[가-힣]{1,15}[0-9]*로?길?[번][안가]길?)?\\s?"					// 4 길로
//		      	+ "([가-힣]+로?\\s?[0-9]+번?[안가]?길|^?[가-힣]{1,15}[0-9]*로?[안가]?길)?\\s?"					// 4 길로
				+ "([가-힣^\\s$]{1,15}[0-9]*번?[안동서가나다라마바사아자차카타파하]?[길로]\\s|[0-9]*[가-힣]{1,15}[0-9]*로?[1-9]*번?[가나다라마바사아자차호]?길|[0-9]{1,3}[가-힣]{1,15}로|[가-힣^\\s$]{1,15}[0-9]*번?[안동서가나다라마바사아자차카타파하]?[길로]$)?\\s?" // 4 길로
//		      	+ "((?=.+리$|.+리\\s)\\S[가-힣^\\s$]+리)?\\s?"						// 5 리는 한글만 존재
				+ "([가-힣^\\s$]{1,15}[0-9]*리\\s|[가-힣^\\s$]{1,15}[0-9]*리$)?\\s?" // 5 리는 한글만 존재
				+ "((?![0-9]{1,5}동)산?[0-9]{0,5}번?지?)?\\-?\\s?" // 6 건물 본번, 지번 본번
				+ "((?![0-9]{1,5}동)[0-9]{1,4}번?지?호?\\s|(?![0-9]{1,5}동)[0-9]{1,4}번?지?호?$)?\\s?" // 7 건물 부번, 지번 부번
				+ "(.+?)?" // 8 건물명
				+ "(\\-[0-9]{1,4}호?)?\\s?" // 8 건물부명
				+ "$";

		/*
		 * String RegexStr =
		 * "^((?=[경전충][남북]$|[경전충][남북]도?\\s)[경전충][남북]|[경강전충][기원상라청][남북]?도?|" +
		 * "(?=[인울부광대][천산주구전][광역시]{0,3}$|[인울부광대][천산주구전][광역시]{0,3}\\s)[인울부광대][천산주구전]광?역?시?|"
		 * + "(?=서울[특별시]{0,3}$|서울[특별시]{0,3}\\s)서울특?별?시?|" +
		 * "(?=세종[특별자치시]{0,5}$|세종[특별자치시]{0,5}\\s)세종[특별자치]{0,4}시?|제주특별자치도|제주도)?\\s?" // 1
		 * 시도 +
		 * "((?![가-힣]+아파트|빌라)[가-힣]*\\s?(?=\\S+[시군구]\\s|\\S+[시군구]$)\\S+[시군구]{1,1})?\\s?"
		 * // 2 시군구 + "(\\S(?=.*[읍면동가]\\s|.*[읍면동가]$)[가-힣]+[0-9,]{0,7}[읍면동가])?\\s?" // 3
		 * 읍면동 + "([가-힣]+로\\s?[0-9]+번?길|^?[가-힣]{1,15}[0-9]*로?길?)?\\s?" // 4 길로 +
		 * "((?=.+리$|.+리\\s)\\S[가-힣^\\s$]+리)?\\s?" // 5 리는 한글만 존재 +
		 * "((?![0-9]{1,5}동)산?[0-9]{0,5}번?지?)?\\-?\\s?" // 6 건물 본번, 지번 본번 +
		 * "((?![0-9]{1,5}동)[0-9]{1,4}번?지?)?\\s?" // 7 건물 부번, 지번 부번 + "(.+?)?" // 8 건물명
		 * + "(\\-[0-9]{1,4}호?)?\\s?" // 8 건물부명 + "$";
		 */
		debugM = true;
	//테스트주소
	String[] strAddress = {
			"서울특별시 강북구"
			
				};
	
	/*
	 * 경기도 이천시 중리동 69
	 * 강원도 동해시 망상동 316 0
	 */
	
		Pattern pattern = Pattern.compile(RegexStr);

		for (int i = 0; i < strAddress.length; i++) {
			System.out.println("Full address =" + strAddress[i]);
			Matcher matcher = pattern.matcher(strAddress[i]);
			if (matcher.find()) {
				System.out.println("Index     = " + (i)); //
				System.out.println("0 시도      = " + matcher.group(1)); // 1. 시도
				System.out.println("1 시군구    = " + matcher.group(2)); // 2. 시군구
				System.out.println("2 읍면동    = " + matcher.group(3)); // 3. 읍면동
				System.out.println("3 길로      = " + matcher.group(4)); // 4 길로
				System.out.println("4 리        = " + matcher.group(5)); // 5 리는 한글만 존재
				System.out.println("5 건물 본번 = " + matcher.group(6)); // 6 건물 본번, 지번 본번
				System.out.println("6 건물 부번 = " + matcher.group(7)); // 7 건물 부번, 지번 부번
				// System.out.println("물 = "+ matcher.group(8)); // 8 건물명
				System.out.println("7 건물명    = " + matcher.group(8)); // 9 건물명
				// System.out.println("8 건물명부명 = "+ matcher.group(9)); // 9 건물부명
				// System.out.println("건물부명 = "+ matcher.group(10)); // 9 건물부명
				// System.out.println("건물부명 = "+ matcher.group(11)); // 9 건물부명
				System.out.println();

			}

			
			//long end = System.currentTimeMillis();
			  			
			
			new AddressDivision(strAddress[i]).getResult();
			//System.out.println(new AddressDivision( strAddress[i] ).getResult());
			//System.out.println("");
		}


		// replaceAll("[\\\\+\\-\\!\\(\\)\\:\\^\\]\\{\\}\\~\\*\\?]",
		// "\\\\$0").toLowerCase();
		/*
		 * String aa = "biz-WELL 종로오피스텔";
		 * System.out.println(aa.replaceAll("([a-zA-Z]*)([가-힣]+)", "$1 $2"));
		 * 
		 * for( String s : strAddress) { System.out.println(new AddressDivision( s
		 * ).getResult()); } //aa.substring(beginIndex, endIndex);
		 * System.out.println("유곡면".matches("[가-힣]+[면|읍]$"));
		 */
	}
	
	public static boolean isNumeric(String s) {
		  try {
		      Double.parseDouble(s);
		      return true;
		  } catch(NumberFormatException e) {
		      return false;
		  }
	}
}
