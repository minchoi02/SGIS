package kostat.sop.ServiceAPI.api.common;

import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsHttpException;

import kostat.sop.ServiceAPI.controller.service.mapper.ThemeCdCommonMapper;


/**
 * @author ParkSangeon
 * @Description 2020년 SGIS고도화 3차(테마코드) <br>: 테마코드 공통기능을 위한 클래스
 */
@Component("themeCdCommon")
public class ThemeCdCommon {
	
	@Resource( name = "ThemeCdCommonMapper" )
	private ThemeCdCommonMapper themeMapper;
	
	private static final Log logger = LogFactory.getLog(ThemeCdCommon.class);
	
	// 테마코드의 대분류를 찾아내어, parameter에  주입하는 메서드 (insertName은 parameter에 대분류 코드를 넣을 때 원하는 이름으로 넣기 위한 파라미터)
	public String bigThemeCdFindInsert( Map< String, String > parameter , String themeCd, String... insertName ) {
		
		String bigThemeCode = null;
		String paramName = "b_theme_cd";
		
		if(themeCd == null || "".equals(themeCd)) {
			try {
				throw new NullPointerException("테마코드(themeCd)를 입력하지 않았습니다.");				
			} catch (NullPointerException e) {
				logger.error(e);
				throw e;
			}
		}
		
		if(insertName.length != 0) {
			paramName = insertName[0];
		}
		
		if(isNew(themeCd)) {
			
			bigThemeCode = themeCd.substring(0, 1);
			parameter.put(paramName, bigThemeCode);
			
		} else if(isOld(themeCd)) {
			
			bigThemeCode = findBigThemeCd(themeCd);
			parameter.put(paramName, bigThemeCode);
			
		} else if(themeCd.equals("0000") || themeCd.equals("0") || themeCd.equals("00")) {	// 예외적으로 예전 숫자형 테마코드이면서 0으로 끝나지만 허용되는  테마코드이다. 
			
			return parameter.put(paramName, "0");
			
		}
		else {
			try {
				throw new ThemeCodeInvalidValueException("지원하지 않는 테마코드 형식입니다  - ThemeCdCommon.java");				
			} catch (ThemeCodeInvalidValueException e) {
				logger.error(e);
				throw e;
			}
			
		}
		
		return bigThemeCode;
	}
	
	/**
	 * 예전 테마코드 대분류를 현재의 테마코드 대분류로 변환하는 "임시" 메서드입니다
	 * @return String
	 * @Description
	 * 예전 테마코드 대분류 (ex: 1000,2000,4000,5000)를 현재의 대분류로 변환하는 메서드입니다.<br>
	 * 이 메서드는 임시이며 외부 요청으로 들어오는 값이 예전의 대분류 테마코드로 더 이상 들어올 경우가 없을 때 지우면 됩니다.
	 */
	@Deprecated
	public String temporaryChangeToNewBigThemeCd( Map< String, String > parameter, String themeCd) {
		String result = themeCd;
		
		if(themeCd == null || "".equals(themeCd)) {
			return themeCd;
		} else if( "1000".equals(themeCd) || "2000".equals(themeCd) || "4000".equals(themeCd) || "5000".equals(themeCd) ) {
			if("5000".equals(themeCd)) { 	// 음식
				themeCd = "H";
			} else if("2000".equals(themeCd)) {	//소매업
				themeCd = "C";
			} else if("1000".equals(themeCd)) {	//생활서비스
				themeCd = "D";
			} else if("4000".equals(themeCd)) {	//숙박
				themeCd = "G";
			}
		} 
		
		if(parameter != null) {
			parameter.put("theme_cd", themeCd);
		}
		
		return result;
	}

	/**
	 * 테마코드가 맞는 형태인지 확인하는 메서드
	 * @return boolean
	 */
	public boolean checkInvalidThemeCd(String themeCd) {
		
		if( isNew(themeCd) 
			|| isOld(themeCd) 
			|| "0000".equals(themeCd) 
			|| "00".equals(themeCd)
			|| "0".equals(themeCd) ) 
		{
			return true;
		} 
		
		return false;
		
	}
	
	
	/**
	 * 들어온 테마코드를 통해서 대분류 코드를 알아내는 메서드
	 * @return List
	 */
	public String findBigThemeCd(String themeCd) {
		return themeMapper.selectBigThemeCd(themeCd);
	}
	
	/**
	 * 생활업종 대분류 테마코드를 List로 받습니다.
	 * @return List
	 */
	public List<String> bigThemeCdList() {
		return themeMapper.selectBigThemeCdList();
	}
	
	/**
	 * 생활업종에서 사용하는 테마코드 대분류 정보를 조회한다.
	 * @return List
	 */
	public List<Map<String, Object>> selectBigThemeInfo() {
		return themeMapper.selectBigThemeInfo();
	}
	
	/**
	 * 소분류에 대한 세세한 정보 조회
	 * @return List
	 */
	public List<Map<String, Object>> selectSmallThemeDetail() {
		return themeMapper.selectSmallThemeDetail();
	}
	
	
	/**
	 * 생활업종에서 사용하는 특정 대분류의 소분류 테마코드 정보를 조회한다.
	 * @return List
	 */
	public List<Map<String, Object>> selectSmallThemeInfo(String b_theme_cd) {
		return themeMapper.selectSmallThemeInfo(b_theme_cd);
	}
	
	/**
	 * 대분류 테마코드와 소분류 테마코드를 한번에 조회하는 메서드
	 * @return List
	 */
	public List<Map<String, Object>> selectAllThemeCdInfo() {
		List<Map<String, Object>> bigList = selectBigThemeInfo();
		
		for(int i = 0 ; i < bigList.size() ; i++) {
			Map<String, Object> param = bigList.get(i);
			List<Map<String, Object>> smallList = selectSmallThemeInfo((String)param.get("b_theme_cd"));
			bigList.get(i).put("s_theme_list", smallList);
		}
		
		return bigList;
	}
	
	
	/**
	 * 대분류 테마코드와 소분류 테마코드를 한번에 조회하는 메서드
	 * @return boolean
	 * @Description
	 * 새로운 테마코드의 형태는 "알파벳 1자리 + 숫자 3자리"가 오는 형태이다. (ex: C001)
	 * <br>이러한 새로운 테마코드는 2020년 SGIS 고도화에 의해서 만들어졌다.
	 * <br>경우에 따라서는  알파벳 한자리만 올 수도 있다.
	 */
	public boolean isNew(String themeCd) {			
		String pattern = "^[A-Z]{1}[0-9]{0,3}$"; 
        return Pattern.matches(pattern, themeCd);
	}
	
	public boolean isBigThemeCd(String themeCd) {
		if(themeCd == null || "".equals(themeCd)) {
			try {
				throw new ThemeCodeInvalidValueException("대분류 테마코드 입력 방식을 확인해주세요 - ThemeCdCommon.java");
			} catch (ThemeCodeInvalidValueException e) {
				logger.error(e);
				throw e;
			}
		}
		return themeMapper.selectBigThemeCdList().contains(themeCd);
	}
	
	/**
	 * 예전 테마코드가 맞는 형식인지 확인하는 메서드
	 * @return boolean
	 * @Description
	 * 예전 테마코드의 맞는 형식은 다음과 같다.
	 * <br>1. 4자리 중 뒤의 3자리가 000이면 안된다. ex: 1000 (X).
	 * <br>2. 반드시 4자리의 숫자여야 한다. 2자리만 짤라서 들어오는 것은 안된다. ex: 1002 (O) / 10 (X)
	 * <br>   참고: 2자리의 숫자는 예전 방식으로 대분류를 선별하는 방식이다.
	 * <br>   예전에는 대분류로 음식이면 안에 있는 테마코드는 1001,1002,1003... 이어서 앞에 2자리 "10"을 대분류로 사용이 가능했다 
	 */
	public boolean isOld(String themeCd) {
		
		if(themeCd == null || "".equals(themeCd)) {
			return false;
		}
		
		if(themeCd.length() != 4) {
			return false;
		}

		if(themeCd.substring(1).equals("000")) {
			return false;
		}
		
		
		String pattern = "^[1-9]{1}[0-9]{3}$"; 
        return Pattern.matches(pattern, themeCd);
	}
	
	@SuppressWarnings( "serial" )
	@ResponseStatus( value = HttpStatus.UNPROCESSABLE_ENTITY, reason = "허용된 테마코드를 입력하세요." )
	public static class ThemeCodeInvalidValueException extends AbsHttpException{

		public ThemeCodeInvalidValueException( String message )
		{
			super( message );
		}
		
	}
	
	
	/**
	 * 대분류 테마코드를 통해서 소분류 테마코드를 뽑아내고, 해당 소분류와 매핑되는 사업체분류 코드를<br>CMM_CD_CORPCLASS 테이블에서 조회한다.
	 * <br>[ { 하나의 소분류 + [ 소분류에 해당하는 사업체분류 코드 ] }, .. , .. ] 의 형태로 데이터를 반환한다.   
	 * @return List
	 */
	public List<Map<String, Object>> selectCensusInfoGroupedByBigThemeCd(String b_theme_cd) {
		List<Map<String, Object>> list = themeMapper.selectSmallThemeDetailGroupByBigThemeCd(b_theme_cd);
		
		// 데이터를 조회했는데, 10차 산업과 매핑되는 데이터가 0 개 일 때가 있다. 이것은 지우도록 하겠다.
		for(int i = list.size()-1 ; i >= 0; i--) {	// ArrayList이기 때문에 거꾸로 지운다.
			String theme_cd = (String)list.get(i).get("theme_cd");
			List<Map<String, Object>> censusList =  themeMapper.selectCensusCdAndNmByThemeCd(theme_cd);
			if(censusList.size() !=  0) {
				list.get(i).put("censusList",censusList);
			} else {
				list.remove(i);
			}
		}
		return list;
	}
	
	/**
	 * 10차 산업분류에서 사용하는 테마코드, 즉  CMM_CD_THEME 테이블에서 LIFEBIZ_YN = 'Y' 인 로우 뿐만아니라 <br>
	 * CMM_CD_THEME 테이블에 있는 (기타를 제외한) 대분류 데이터를 조회하는 메소드이다.<br>
	 * @return List
	 */
	public List<Map<String, Object>> selectCensusBigThemeInfo() {
		return themeMapper.selectCensusBigThemeInfo();
	}
	
	/**
	 * 10차 산업분류에서 사용하는 테마코드, 즉  CMM_CD_THEME 테이블에서 LIFEBIZ_YN = 'Y' 인 로우 뿐만아니라 <br>
	 * CMM_CD_THEME 테이블에 있는 (기타를 제외한) 소분류 관련 데이터를 조회하는 메소드이다.<br>
	 * @return List
	 */
	public List<Map<String, Object>> selectCensusSmallThemeInfo(String b_theme_cd) {
		return themeMapper.selectCensusSmallThemeInfo(b_theme_cd);
	}
	
	/**
	 * 10차 산업분류에서 사용하는 테마코드, 즉  CMM_CD_THEME 테이블에서 LIFEBIZ_YN = 'Y' 인 로우 뿐만아니라 <br>
	 * CMM_CD_THEME 테이블에 있는 (기타를 제외한) 모든 로우를 읽어오는 메소드이다.<br>
	 * @return List
	 * @Description 읽어온 데이터를 대분류를 기준으로 묶어서 조회한다.
	 */
	public List<Map<String, Object>> selectAllCensusThemeInfo() {
		List<Map<String, Object>> bigList = selectCensusBigThemeInfo();
		
		for(int i = 0 ; i < bigList.size() ; i++) {
			//System.out.println(bigList.get(i));
			Map<String, Object> param = bigList.get(i);
			List<Map<String, Object>> smallList = selectCensusSmallThemeInfo((String)param.get("b_theme_cd"));
			bigList.get(i).put("s_theme_list", smallList);
		}
		
		return bigList;
	}

	/**
	 * 생활업종에서 사용하는 테마코드 대분류 정보를 조회한다.
	 * @return List
	 */
	public List<Map<String, Object>> selectBigCensusThemeInfo() {
		return themeMapper.selectBigCensusThemeInfo();
	}
	
	/**
	 * 소분류에 대한 세세한 정보 조회
	 * @return List
	 */
	public List<Map<String, Object>> selectSmallCensusThemeDetail() {
		return themeMapper.selectSmallCensusThemeDetail();
	}
}
