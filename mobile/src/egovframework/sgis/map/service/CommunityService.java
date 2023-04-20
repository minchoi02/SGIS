package egovframework.sgis.map.service;

import java.security.Principal;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;

import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.map.command.CommonCommand;
import egovframework.sgis.map.command.CommunityPoiCommand;
import egovframework.sgis.map.model.CommunityPoiVO;

public interface CommunityService {
	public JsonData getCommunityJsonList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command
			);
	public CommonCommand getCommunityList(
			Principal principal,
			CommonCommand command
			);
	public void forbiddenCommunityRegist(
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model,
			Principal principal,
			String cmmnty_map_id
			);
	public void getCommunity(
			HttpServletResponse response,
			ModelMap model,
			Principal principal,
			String cmmnty_map_id
			);
	public JsonData getCmmntyPoiListJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command
			);
	public JsonData getCmmntyPoiJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command
			);
	public CommonCommand getCmmntyPoiList(
			Principal principal,
			CommonCommand command
			);
	public JsonData registCommunityPoiFormJson(
			HttpServletRequest request,
			HttpServletResponse response,
			BindingResult result,
			Principal principal,
			CommunityPoiCommand command
			);
	public JsonData joinJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			String cmmnty_map_id
			);
	public JsonData dropuserJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			String cmmnty_map_id
			);
	public JsonData registReplyJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			String cmmnty_map_id,
			String cmmnty_poi_id,
			String reply_content
			);
	public JsonData updateReplyJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			);
	public JsonData deleteReplyJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal
			);
	/** 2020.09.16[한광희] 메인 지역현안 소통지도 수정 START */
	public JsonData getMainCommunityJsonList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command
			);
	/** 2020.09.16[한광희] 메인 지역현안 소통지도 수정 END */

	public HashMap<String, Object> idPwCheck( String login_id
			, CommunityPoiVO poiVO
			, CommonCommand command ) throws Exception;
}
