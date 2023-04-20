package egovframework.sgis.m2020.map.service.impl;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2020.map.service.ViewService;
import egovframework.sgis.map.command.CommonCommand; //20200902 박은식 deleteListJson VO 추가 
import egovframework.sgis.map.model.CommunityVO;
import egovframework.sgis.map.service.mapper.kairos.CommunityApprovalMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityPoiMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityPoiReplyMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityRegistMemberMapper;

/**
 * @Class Name : ViewServiceImpl.java
 * @Description : ViewServiceImpl Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2020.08.31           최초생성
 *
 * @author 
 * @since 2020.08.31
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service("viewService")
@PropertySource("classpath:globals.properties")
public class ViewServiceImpl extends EgovAbstractServiceImpl implements ViewService{
	private final static Log logger = LogFactory.getLog(StringUtils.class);

	@Autowired
	private Environment env;
	@Resource(name="communityMapper")
	private CommunityMapper communityMapper;
	@Resource(name="communityPoiMapper")
	private CommunityPoiMapper communityPoiMapper;
	@Resource(name="communityApprovalMapper")
	private CommunityApprovalMapper communityApprovalMapper;
	@Resource(name="communityPoiReplyMapper")
	private CommunityPoiReplyMapper communityPoiReplyMapper;
	@Resource(name="communityRegistMemberMapper")
	private CommunityRegistMemberMapper communityRegistMemberMapper;
	
	
	private String getMemberId(Principal principal){
		if(principal!=null){
			return principal.getName();
		}
		return null;
	}
	
	/**
	* getCommunityView
	* @param response
	* @param model
	* @param principal
	* @param cmmnty_map_id
	* @see 
	* 	form 팝업 아이콘 조회
	*/
	
	@Override
	public void getCommunityView(
			HttpServletResponse response, 
			ModelMap model, 
			Principal principal,
			String cmmnty_map_id
			) {
		CommunityVO community = this.getCommunityView(response, principal, cmmnty_map_id);
		if(community!=null){
			model.addAttribute("community",community);
			model.addAttribute("customSymbolList",communityMapper.selectCommunityCustomSymbolList(community.getCustom_symbol_group_id()));
		}
	}

	
	private CommunityVO getCommunityView(
			HttpServletResponse response,
			Principal principal,
			String cmmnty_map_id
			){
		CommunityVO community = communityMapper.selectCmmnty(cmmnty_map_id,getMemberId(principal));
		if(community!=null){
			List<EgovMap> map_list = communityMapper.selectMapList(cmmnty_map_id);
			if(map_list!=null){
				community.setMapListJson(map_list);
			}
		}
		if(community==null){
			response.setContentType("text/plain;charset=UTF-8");
			try {
				response.sendError(HttpServletResponse.SC_NOT_FOUND,"해당 소통지도가 존재하지 않습니다");
			} catch (IOException e) {
				logger.error("해당 소통지도가 존재하지 않습니다");
			}
		}
		return community;
	}
	
	//20200902 박은식 의견등록 삭제 로직 추가 start
	@Override
	public String deleteListJson(CommonCommand commonCommand) {
		if(commonCommand.getCmmnty_poi_id() == null || commonCommand.getCmmnty_poi_id().equals("") ){
			return "error";
		} else {
			communityPoiMapper.deletePoiList(commonCommand);
			return "success";
		}
	}
	//20200902 박은식 의견등록 삭제 로직 추가 end

}
