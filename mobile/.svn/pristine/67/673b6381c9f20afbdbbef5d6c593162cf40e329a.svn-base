package egovframework.sgis.cmmn.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import sun.misc.BASE64Encoder;

public class StringUtils {
	private final static Log logger = LogFactory.getLog(StringUtils.class);

	public static final String KOSIS_AUTO_LOGIN = "kosis-sgis-auto-login-check";

	public enum COMM_ERR_CODE{
		SUCCESS (0,"Success"),
		ERR_DEFAULT (-1,"서버에서 처리 중 에러가 발생하였습니다.<br>현상이 반복될 경우 고객센터(042-481-2342)로 문의하시기 바랍니다."),
		NO_RESULT(-100,"데이터가 존재하지 않습니다"),
		ERR_PARAM(-200,"파라미터가 잘못되었습니다"),
		EXECUTE_FAILE (-201,"실패하였습니다"),// 실행(요청)실패.				
		ERR_COORD_CONVERT_FAIL(-202,"좌표 변환을 실패하였습니다"),// 좌표변환실패.				
		ERR_SQL(-400,"데이터 작업하는데 오류가 발생하였습니다"),// DB작업 오류.
		AUTH_FAILE(-401,"권한이 존재하지 않습니다"),//로그인 권한 없음
		KAIROS_TIME_OUT(-402,"KAIROS TIME OUT."),// KAIROS TIME OUT.
		ERR_FORBIDDEN(-403,"권한이 존재하지 않습니다"),//권한 없음
		ERR_ANONYMOUS(-404,"로그인이 필요합니다");//로그인 하지 않았음
		private int code;
		private String message;
		private COMM_ERR_CODE(int errcode,String errmessage){
			code = errcode;
			message = errmessage;
		}
		public int getErrCode(){
			return code;
		}
		public String getErrMsg(){
			return message;
		}
		public static COMM_ERR_CODE getError(Object code){
			if(code==null){
				return COMM_ERR_CODE.ERR_DEFAULT;
			}else{
				if(StringUtils.isNumeric(code.toString())){
					int errCd = Integer.parseInt(code.toString());
					for(COMM_ERR_CODE e : COMM_ERR_CODE.values()){
						if(errCd==e.code){
							return e;
						}
					}
				}
				return COMM_ERR_CODE.ERR_DEFAULT;
			}
		}
	}
	private static final String ILLEGAL_REGEXP = "[:\\\\/%*?:|\"<>]";
	private static final String SCRIPT_REGEXP = "<(no)?script[^>]*>.*?</(no)?script>";
	private static final String STYLE_REGEXP = "<style[^>]*>.*</style>";
	private static final String TAG_REGEXP = "<(\"[^\"]*\"|\'[^\']*\'|[^\'\">])*>";
	private static final String nTAG_REGEXP = "<\\w+\\s+[^<]*\\s*>";
	private static final String ENTITY_REGEXP = "&[^;]+;";
	private static final String WHITESPACE_REGEXP = "\\s\\s+";
	private static final String IMAGE_PATH_REGEXP = "<(?i)img[^>]*(?i)src=[\"']?([^>\"']+)[\"']?[^>]*>";
	/**
	 * 숫자인지 여부
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see #hasText(String)
	 * @return boolean
	 */  
	public static boolean isNumeric(
			String str
			){
		return hasText(str) && str.matches("[0-9]+");
	}


	/**
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see #hasText(String)
	 * @return boolean
	 */  
	public static boolean isBoolean(
			String str
			){
		return hasText(str) && str.toLowerCase().matches("true");
	}

	/**
	 * @description 글자가 있는지 여부
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see #hasText(String)
	 * @return boolean
	 */  
	public static boolean hasText(
			String str
			){
		if(str==null){
			return false;
		}
		return hasText((CharSequence) str);
	}

	/**
	 * @description 글자가 있는지의 여부
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see #hasLength(String)
	 * @return boolean
	 */  
	public static boolean hasText(
			CharSequence str
			){
		if (!hasLength(str)){
			return false;
		}
		int strLen = str.length();
		for (int i = 0; i < strLen; i++){
			if (!Character.isWhitespace(str.charAt(i))){
				return true;
			}
		}
		return false;
	}

	/**
	 * @description 길이가 0보다 크면 true를 반환합니다
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @return boolean
	 */  
	public static boolean hasLength(
			CharSequence str
			){
		return (str != null && str.length() > 0);
	}

	/**
	 * @description 파일의 확장자를 리턴합니다. 없을 시 빈칸으로 리턴합니다.
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @return {@link String}
	 */  
	public static String getExtension(
			String str
			){
		if(str.lastIndexOf(".")>-1){
			return str.substring(str.lastIndexOf(".")+1,str.length());
		}else{
			return "";
		}
	}

	/**
	 * @description 패턴에 해당하는 값을 {@link String} 반환합니다 
	 * <pre>
	 * --------------------------
	 * 예)
	 * String str = "the request was rejected because its size (9759074) exceeds";
	 * findRegexp(str,"size \\(([0-9]*)\\)");
	 * 결과 : "9759074"
	 * --------------------------
	 * </pre>
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param pattern -- {@link String} : 정규표현식
	 * @return {@link String}
	 */  
	public static String findRegexp(
			String str,
			String pattern
			){
		return findRegexpGroup(str,pattern,1);
	}
	
	/**
	 * @description 패턴에 해당하는 값을 {@link String} 반환합니다 
	 * <pre>
	 * --------------------------
	 * 예)
	 * String str = "the request was rejected because its size (9759074) exceeds";
	 * findRegexp(str,"size \\(([0-9]*)\\)");
	 * 결과 : "9759074"
	 * --------------------------
	 * </pre>
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param pattern -- {@link String} : 정규표현식
	 * @param group -- {@link int} : 그룹
	 * @return {@link String}
	 */  
	public static String findRegexpGroup(
			String str,
			String pattern,
			int group
			){
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(str);
		String returnPattern=null;
		if (m.find()){
			returnPattern=m.group(group);
		}
		return returnPattern;
	}
	
	/**
	 * @description 패턴에 해당하는 값을 {@link List}&lt;{@link String}&gt; 반환합니다 
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param pattern -- {@link String} : 정규표현식
	 * @param group -- int : 몇번째 패턴 찾는것인지,-1은 전체 리턴
	 * @return {@link List}&lt;{@link String}&gt;
	 */  
	public static List<String> findRegexp(
			String str,
			String pattern,
			int group
			){
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(str);
		List<String> result = new ArrayList<String>();
		String b = null;
		while(m.find()){
			if(group<0){
				b = m.group();
			}else{
				b = m.group(group);
			}
			result.add(b);
		}
		return result;
	}

	/**
	 * @description 정규표현식에 해당하는 개수를 리턴합니다
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param pattern -- {@link String} : 정규표현식
	 * @return int
	 */  
	public static int regexpCount(
			String str,
			String pattern
			){
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(str);
		int count = 0;
		while(m.find()){
			count++;
		}
		return count;
	}

	/**
	 * @description 문자열에 원하는 패턴이 있는지 없는지 여부를 판단하여 boolean으로 리턴합니다
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param pattern -- {@link String} : 정규표현식 
	 * @param lower -- boolean : 문자열일 소문자로 치환해서 확인 할지 유무
	 * @return boolean
	 */  
	public static boolean hasRegexp(
			String str,
			String pattern,
			boolean lower
			){
		if(!lower){
			str = str.toLowerCase();
		}
		return str.matches(pattern);
	}

	/**
	 * @description html 이미지 태그 찾아서 경로 리턴
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see #findRegexp(String, String, int)
	 * @return {@link List}&lt;{@link String}&gt;
	 */  
	public static List<String> getImagePath(
			String str
			){
		return findRegexp(str,IMAGE_PATH_REGEXP,1);
	}

	/**
	 * @description 문자열에 정규표현식에 해당하는 것은 제거합니다.
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param pattern -- {@link String} : 정규 표현식
	 * @return {@link String}
	 */  
	public static String removeRegexp(
			String str,
			String pattern
			){
		Pattern p = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE); 
		Matcher m = p.matcher(str); 
		str = m.replaceAll(""); 
		return str;
	}

	/**
	 * @description 문자열에 모든 html 태그 제거합니다.
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see {@value #SCRIPT_REGEXP}
	 * @see {@value #STYLE_REGEXP}
	 * @see {@value #TAG_REGEXP}
	 * @see {@value #nTAG_REGEXP}
	 * @see {@value #ENTITY_REGEXP}
	 * @see {@value #WHITESPACE_REGEXP}
	 * @return {@link String}
	 */  
	public static String removeHtmlTag(
			String str
			){
		List<Pattern> patternList = new ArrayList<Pattern>();
		patternList.add(Pattern.compile(SCRIPT_REGEXP, Pattern.DOTALL));
		patternList.add(Pattern.compile(STYLE_REGEXP, Pattern.DOTALL));
		patternList.add(Pattern.compile(TAG_REGEXP));
		patternList.add(Pattern.compile(nTAG_REGEXP));
		patternList.add(Pattern.compile(ENTITY_REGEXP));
		patternList.add(Pattern.compile(WHITESPACE_REGEXP));

		Iterator<Pattern> iter = patternList.iterator();
		while(iter.hasNext()){
			Pattern pattern = iter.next();
			str = pattern.matcher(str).replaceAll(""); 
		}
		return str; 
	}

	/**
	 * @description 문자열에 html 코드가 존재하면 특수문자로 변경합니다.
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see #hasText(String)
	 * @return {@link String}
	 */  
	public static String escapeHtmlTag(
			String str
			){
		if(hasText(str)){
			if(str.indexOf("&") != -1) str = str.replaceAll("&", "&amp;");
			if(str.indexOf(">") != -1) str = str.replaceAll(">", "&gt;");
			if(str.indexOf("<") != -1) str = str.replaceAll("<", "&lt;");
			if(str.indexOf("'") != -1) str = str.replaceAll("'", "&#39;");
			if(str.indexOf("\"") != -1) str = str.replaceAll("\"", "&quot;");
		}
		return str;
	}

	/**
	 * 문자열에 html 특수문자를 코드로 변경합니다.
	 * 
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @see #hasText(String)
	 * @return {@link String}
	 */  
	public static String insertHtmlTag(
			String str
			){
		if(hasText(str)){
			if(str.indexOf("&amp;") != -1) str = str.replaceAll("&amp;", "&");
			if(str.indexOf("&gt;") != -1) str = str.replaceAll("&gt;", ">");
			if(str.indexOf("&lt;") != -1) str = str.replaceAll("&lt;", "<");
			if(str.indexOf("&#39;") != -1) str = str.replaceAll("&#39;", "'");
			if(str.indexOf("&quot;") != -1) str = str.replaceAll("&quot;", "\"");
			if(str.indexOf("\r\n") != -1) str = str.replaceAll("\r\n", "<br/>");
			if(str.indexOf("\n") != -1) str = str.replaceAll("\n", "<br/>");
			if(str.indexOf("\r") != -1) str = str.replaceAll("\r", "<br/>");
		}
		return str;
	}

	/**
	 * @description 원하는 자릿수 만큼 앞에 텍스트를 붙여 {@link String}으로 리턴합니다
	 * <pre>
	 * --------------------------
	 * 예)
	 * fillString("0", "23", 5);
	 * 결과값 : "00023"
	 * --------------------------
	 * </pre>
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param fillStr -- {@link String} : 채울 문자
	 * @param str -- {@link String} : 문자열
	 * @param digit -- int : 채울 자릿수
	 * @return {@link String}
	 */  
	public static String fillString(
			String fillStr,
			String str, 
			int digit
			){
		String result = "";
		for(int i=1;i<=(digit-str.length());i++){
			result = result+fillStr;
		}
		return result + str;
	} 

	/**
	 * @description List에 중복된 값을 제거합니다.
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param list -- {@link List}&lt;?&gt; : 중복 제거할 리스트
	 * @return {@link List}&lt;?&gt;
	 */  
	public static List<?> removeDuplicateObject(
			List<?> list
			){
		return new ArrayList<Object>(new HashSet<Object>(list));
	}

	/**
	 * @description String 을 byte 길이반큼 잘라서 리턴 해줍니다
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param byteLength -- int : 원하는 바이트
	 * @param lastStr -- {@link String} : 자른문자열 뒤에 붙여줄 문자
	 * @see #hasText(String)
	 * @return {@link String}
	 */  
	public static String substringBytes(
			String str, 
			int byteLength, 
			String lastStr
			){
		if(hasText(str)){
			int length = str.length();
			int retLength = 0;
			int tempSize = 0;
			int asc;
			String jums="";

			if(byteLength < str.length() && hasText(lastStr)){
				jums=lastStr;
			}
			for (int i = 1; i <= length; i++){
				asc = (int)str.charAt(i-1);
				if (asc>127){
					if (byteLength>=tempSize+2){
						tempSize+=2;
						retLength++;
					} else {
						return str.substring(0, retLength)+jums;
					}
				} else {
					if (byteLength>tempSize){
						tempSize++;
						retLength++;
					}
				}
			}

			return str.substring(0, retLength)+jums;
		}
		return str;
	}

	/**
	 * @description 파일 이름이 유효 유무를 체크해서 boolean으로 리턴해줍니다.
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param fileName -- {@link String} : 확장자를 포함한 파일 이름
	 * @see #hasText(String)
	 * @return boolean
	 */  
	public static boolean isValidFileName(
			String fileName
			){
		if(hasText(fileName)){
			return false;
		}
		return !Pattern.compile(ILLEGAL_REGEXP).matcher(fileName).find();
	}

	/**
	 * @description 파일 이름에 사용할 수 없는 캐릭터를 바꿔서 유효한 파일로 만듭니다.
	 * 파일 이름에는 {@value #ILLEGAL_REGEXP} 가 존재해서는 안됩니다.
	 * 그래서 {@link #isValidFileName(String)}를 사용하여 false이면 
	 * {@value #ILLEGAL_REGEXP}의 값에 해당하는 문자를 두번째 파라미터의 문자로 치환해줍니다.
	 * 만약 두번째 파라미터가 존재하지 않거나 유효하지 않을 시 "_" 문자로 치환해줍니다.
	 * @date 2015. 1. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param fileName -- {@link String} : 확장자를 포함한 파일 이름
	 * @param replaceStr -- {@link String} : 변경 될 문자
	 * @see #isValidFileName(String)
	 * @see #hasText(String)
	 * @return {@link String}
	 */  
	public static String makeValidFileName(
			String fileName, 
			String replaceStr
			){
		if(isValidFileName(fileName)){
			return fileName;
		}else{
			if(!hasText(fileName)){
				return String.valueOf(System.currentTimeMillis());  
			}
			if(!hasText(replaceStr)||!isValidFileName(replaceStr)){
				replaceStr = "_";
			}
			return fileName.replaceAll(ILLEGAL_REGEXP, replaceStr);
		}
	}
	/**
	 * @description Object를 HashMap으로 리턴
	 * @date 2015. 1. 26.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param obj
	 * @param publicOnly
	 * @return
	 */  
	public static HashMap<String, Object> getFieldNamesAndValues(
			final Object obj, 
			boolean publicOnly
			){
		HashMap<String, Object> map = new HashMap<String, Object>();
		try {
			Class<? extends Object> c1 = obj.getClass();
			Field[] fields = c1.getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				String name = fields[i].getName();
				if (publicOnly) {
					if(Modifier.isPublic(fields[i].getModifiers())) {
						Object value;
						value = fields[i].get(obj);
						map.put(name, value);
					}
				}
				else {
					fields[i].setAccessible(true);
					Object value = fields[i].get(obj);
					map.put(name, value);
				}
			}
		} catch (IllegalArgumentException e) {
			logger.error(e);
		} catch (IllegalAccessException e) {
			logger.error(e);
		}
		return map;
	}
	/**
	 * @description 배열에 추가 데이터 넣는 메소드
	 * @date 2015. 2. 5.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param arr -- {@link String}[] : 배열
	 * @param element -- {@link String}[] : 배열
	 * @return
	 */  
	public static String[] arrayAppend(
			String[] arr, 
			String[] element
			) {
		if(arr!=null){
			String[] copyArray = Arrays.copyOf(arr, arr.length + element.length);
			for(int i=arr.length;i<arr.length + element.length;i++){
				copyArray[i] = element[i-arr.length];
			}
			return copyArray;
		}else{
			return element;
		}
	}
	/**
	 * @description 배열에 추가 데이터 넣는 메소드
	 * @date 2015. 2. 5.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param arr -- {@link String}[] : 배열
	 * @param element -- {@link String} : 추가할 문자
	 * @return 문자가 추가 된 배열
	 */  
	public static String[] arrayAppend(
			String[] arr, 
			String element
			) {
		if(arr!=null){
			final int N = arr.length;
			arr = Arrays.copyOf(arr, N + 1);
			arr[N] = element;
			return arr;
		}else{
			String[] ree = {element};
			return ree;
		}
	}
	/**
	 * @description 홈페이지에 자바스크립트로 alert 띄우기 위한 메소드
	 * @date 2015. 2. 25.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request -- {@link HttpServletRequest}
	 * @param response -- {@link HttpServletResponse}
	 * @param message -- {@link String} : alert값에 표시해 줄 문자
	 * @param url -- {@link String} : alert 띄운 후 다음으로 갈 url, 없으면 이전 페이지로 이동함
	 * @return
	 */  
	public static String htmlAlterRedirectPage(
			HttpServletRequest request,
			HttpServletResponse response,
			String message,
			String url
			){
		PrintWriter out;
		try {
			response.setContentType("text/html; charset=UTF-8");
			request.setCharacterEncoding("UTF-8");
			if(!hasText(url)){
				url = request.getHeader("Referer");
			}
			if(hasText(message)){
				message = "alert(\""+message+"\");";
			}else{
				message = "";
			}
			out = response.getWriter();
			out.println("<html><head><meta charset=\"utf-8\"><script>"+message+"location.href=\""+url+"\";</script></head><body></body></html>");
			out.flush();
			out.close();
		} catch (IOException e) {
			logger.error(e);
		}
		return null;
	}

	/**
	 * @description 문자열에 html 태그가 있다면 삭제하고 세번째 파라미터(highlight)가 true 면 span class highlight 강조 표시 넣기
	 * @date 2015. 4. 17.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str -- {@link String} : 문자열
	 * @param search -- {@link String} : 찾을 문자
	 * @param highlight -- {@link String} : span태그에 class로 highlight 강조 넣을지 유무
	 * @return
	 */  
	public static String searchText(
			String str,
			String search,
			boolean highlight
			){
		StringBuffer sb = new StringBuffer();
		if(highlight){
			str = removeHtmlTag(str);
			for(String fb:str.split(search)){
				sb.append(fb+"<span class=\"highlight\">"+search+"</span>");
			}
		}else{
			sb.append(str);
		}
		return sb.toString();
	}

	/**
	 * @description 일,시,분,초 전인가 나타냄 30일 이상은 원하는 포맷으로 출력
	 * @date 2015. 9. 17.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param date -- {@link Date} : 날짜
	 * @param format -- {@link String} : 며칠전보다 높을때 표시할 날짜 포맷
	 * @return 몇(일,시,분,초) 전
	 */
	public static String calculateTime(
			Date date,
			String format
			){
		int SEC = 60;
		int MIN = 60;
		int HOUR = 24;
		int DAY = 30;

		long curTime = System.currentTimeMillis();
		long regTime = date.getTime();
		long diffTime = (curTime - regTime) / 1000;

		String msg = null;

		if (diffTime < SEC){
			msg = diffTime + "초전";
		}else if ((diffTime /= SEC) < MIN){
			msg = diffTime + "분전";
		}else if ((diffTime /= MIN) < HOUR){
			msg = (diffTime ) + "시간전";
		}else if ((diffTime /= HOUR) < DAY){
			msg = (diffTime ) + "일전";
		}else{
			SimpleDateFormat simpleFormat = new SimpleDateFormat(format);
			msg = simpleFormat.format(date);
		}

		return msg;
	}
	/**
	 * @description 원하는 문자열을 잘라 해당 값이 있는지 판단
	 * @date 2015. 9. 24.
	 * @author kwangheum
	 * @param str -- {@link String} : 문자열
	 * @param splitStr -- {@link String} : 자를 문자
	 * @param compareStr -- {@link String} : 비교 문자
	 * @return
	 */
	public static boolean splitToContains(
			String str,
			String splitStr,
			String compareStr
			){
		String[] strArray = str.split(splitStr);
		for(String c : strArray){
			if(compareStr.equals(c)){
				return true;
			}
		}
		return false;
	}

	public static String addText(String str1, String str2){
		return str1+str2;
	}
	/**
	 * @description sha256
	 * @date 2016. 3. 29.
	 * @author kwangheum
	 * @param str -- {@link String} : 문자열
	 * @return
	 */
	public static String toSHA256(String str) {
		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(str.getBytes());
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16)
						.substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			SHA = null;
		}
		return SHA;
	}
	/**
	 * @description 서버에 저장된 이미지 base64로 변환
	 * @date 2016. 3. 29.
	 * @author kwangheum
	 * @param filepath -- {@link String} : 파일 위치
	 * @return
	 */
	public static String serverImageEncodeToString(String filepath) {
		String imageString = null;
		String imageType = filepath.substring(filepath.lastIndexOf("0")+1);
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			BufferedImage image = ImageIO.read(new File(filepath));

			try {
				ImageIO.write(image, imageType, bos);
				byte[] imageBytes = bos.toByteArray();

				BASE64Encoder encoder = new BASE64Encoder();
				imageString = encoder.encode(imageBytes);

				bos.close();
			} catch (IOException e) {
				logger.error(e);
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return imageString;
	}

	/**
	 * @description json 형태로 변환
	 * @date 2016. 3. 29.
	 * @author kwangheum
	 * @param obj -- {@link Object}
	 * @return
	 */
	public static String convertJson(Object obj){
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			logger.error(e);
			return "json 변환을 실패하였습니다";
		}
	}
	/**
	 * @description 쿠키값 셋팅
	 * @date 2016. 7. 12.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param name
	 * @param value
	 * @param day
	 */
	public static void setCookie(HttpServletRequest request,HttpServletResponse response, String cookieName, String value,int day) {
		removeCookie(request, cookieName);
		try {
			value = java.net.URLEncoder.encode(value,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			logger.error(e);
		}
		Cookie cookie = new Cookie(cookieName, value);
		cookie.setPath("/");
		cookie.setMaxAge(60*60*24*day);
		cookie.setSecure(true); //mng_s 20201124 일자리맵에서 지역 선택시 오류로 인하여 추가함
		response.addCookie(cookie);
	}

	/**
	 * @description 쿠키값 얻기
	 * @date 2016. 7. 12.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param cookieName
	 * @return
	 */
	public static String getCookie(HttpServletRequest request, String cookieName) {
		Cookie [] cookies = request.getCookies();
		String value = "";
		for(int i=0;i<cookies.length;i++) {
			if(cookieName.equals(cookies[i].getName())) {
				try {
					value = java.net.URLDecoder.decode(cookies[i].getValue(),"UTF-8");
				} catch (UnsupportedEncodingException e) {
					logger.error(e);
				}
				break;
			}
		}
		return value;
	}
	/**
	 * @description 쿠키 삭제
	 * @date 2016. 7. 12.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param cookieName
	 * @return
	 */
	public static String removeCookie(HttpServletRequest request, String cookieName) {
		Cookie [] cookies = request.getCookies();
		String value = "";
		for(int i=0;i<cookies.length;i++) {
			if(cookieName.equals(cookies[i].getName())) {
				cookies[i].setMaxAge(0);
			}
		}
		return value;
	}
	/**
	 * @description lastIndexOf
	 * @date 2016. 9. 19.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str
	 * @param find
	 * @return
	 */
	public static int lastIndexOf(String str,String find){
		return str.lastIndexOf(find);
	}
	/**
	 * @description matches
	 * @date 2016. 9. 19.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param str
	 * @param regexp
	 * @return
	 */
	public static boolean matches(String str,String regexp){
		return str.matches(regexp);
	}
	/**
	 * @description 종성에 따라서 뒤에 붙을꺼 변경
	 * 사용법
	 * 
	 	String name = "나광흠";
	 	String name1=StringUtils.getComleteWordByJongsung(name,"을","를");
		String name2=StringUtils.getComleteWordByJongsung(name,"이","가");
		String name3=StringUtils.getComleteWordByJongsung(name,"은","는");
	 * @date 2016. 9. 21.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param name
	 * @param firstValue
	 * @param secondValue
	 * @return
	 */
	public static final String getComleteWordByJongsung(String name, String firstValue, String secondValue) {
		char lastName = name.charAt(name.length() - 1);
		// 한글의 제일 처음과 끝의 범위밖일 경우는 오류
		if (lastName < 0xAC00 || lastName > 0xD7A3) {
			return name;
		}
		String seletedValue = (lastName - 0xAC00) % 28 > 0 ? firstValue : secondValue;
		return name+seletedValue;
	}
}
