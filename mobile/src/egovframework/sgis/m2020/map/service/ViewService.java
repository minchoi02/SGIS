package egovframework.sgis.m2020.map.service;

import java.security.Principal;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap; 

import egovframework.sgis.map.command.CommonCommand; //20200902 박은식 deleteListJson VO 추가
/**
 * @Class Name : ViewService.java
 * @Description : ViewService Class
 * @
 * @  수정일           수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2020.08.31  박은식            최초생성
 *
 * @author 
 * @since 2020.08.31
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

public interface ViewService {
	
	public void getCommunityView(
			HttpServletResponse response,
			ModelMap model,
			Principal principal,
			String cmmnty_map_id
			);
	
	//20200902 박은식 삭제 서비스등록  start
	public String deleteListJson(
			CommonCommand commonCommand
			);
	//20200902 박은식 삭제 서비스등록 end
}
