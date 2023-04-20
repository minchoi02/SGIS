package egovframework.sgis.map.service.impl;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.cmmn.exception.ValidExceptionToJson;
import egovframework.sgis.cmmn.util.FileUtils;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.PagedListHolder;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.map.command.CommonCommand;
import egovframework.sgis.map.command.CommunityPoiCommand;
import egovframework.sgis.map.model.CommunityPoiVO;
import egovframework.sgis.map.model.CommunityVO;
import egovframework.sgis.map.service.CommunityService;
import egovframework.sgis.map.service.mapper.kairos.CommunityApprovalMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityPoiMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityPoiReplyMapper;
import egovframework.sgis.map.service.mapper.kairos.CommunityRegistMemberMapper;


@Service("communityService")
@PropertySource("classpath:globals.properties")
public class CommunityServiceImpl extends EgovAbstractServiceImpl implements CommunityService {
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
	
	/**
	 * 로그인 아이디 얻기 로그인 안했으면 null 리턴
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param principal
	 * @return
	 */
	private String getMemberId(Principal principal){
		if(principal!=null){
			return principal.getName();
		}
		return null;
	}
	/**
	 * 소통지도 정보
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param response
	 * @param principal
	 * @param cmmnty_map_id
	 * @return
	 */
	private CommunityVO getCommunity(
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
	/**
	 * 댓글 등록 권한 체크
	 * @date 2016. 4. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param result
	 * @param principal
	 * @param cmmnty_poi_id
	 * @param id
	 * @param pw
	 * @return
	 */
	private CommunityPoiVO forbiddenReplyCheck(
			HttpServletRequest request,
			HttpServletResponse response, 
			HashMap<String,Object> result,
			Principal principal,
			String cmmnty_poi_id,
			String id,
			String pw){
		
		CommonCommand command = new CommonCommand();
		command.setId(cmmnty_poi_id);
		command.setMember_id(getMemberId(principal));
		
		CommunityPoiVO poi = communityPoiMapper.selectCmmntyPoi(command);
		
		if(poi==null){
			result.put("errCd", StringUtils.COMM_ERR_CODE.NO_RESULT.getErrCode());
			result.put("errMsg","존재하지 않는 POI 입니다");
		}else{
			CommunityVO community = this.forbiddenCommunityRegistCheck(request, response, null, principal, poi.getCmmnty_map_id(),result,true);
			result.put("community", community);
			
			if( result.get("errCd").equals( StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode() ) ){
				if(community.getCmmnty_partcptn_grant_yn().equals("M")){
					this.mtypecommunityforbidden( community.getCmmnty_map_id(), id, pw, result, command.getMember_id(), false);
					
				}else if(community.getCmmnty_partcptn_grant_yn().equals("P")){
					this.ptypecommunityforbidden( community,request.getParameter("id"), pw, result, command.getMember_id(), false );
					
				}else if(community.getCmmnty_partcptn_grant_yn().equals("A")){
					this.validation( community, id, pw, result, command.getMember_id(), false );
					
				}
			}
		}
		return poi;
	}
	/**
	 * 해당 댓글이 자기것인지 체크
	 * @date 2016. 4. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param result
	 * @param principal
	 * @param poi_reply_id
	 * @param pw
	 * @return
	 */
	private CommunityPoiVO forbiddenReplyMineCheck(
			HttpServletRequest request,
			HttpServletResponse response,
			HashMap<String,Object> result,
			Principal principal,
			String poi_reply_id,
			String pw){
		CommunityPoiVO poi = null;
		EgovMap reply = communityPoiReplyMapper.selectPoiReply(poi_reply_id);
		result.put("reply", reply);
		if(reply==null){
			result.put("errCd", StringUtils.COMM_ERR_CODE.NO_RESULT.getErrCode());
			result.put("errMsg","존재하지 않는 댓글 입니다");
		}else{
			poi = this.forbiddenReplyCheck(request, response, result, principal, reply.get("cmmntyPoiId").toString(),reply.get("usrId").toString(),pw);
			CommunityVO community = (CommunityVO)result.get("community");
			if(!community.getCmmnty_partcptn_grant_yn().matches("M|P|A")){
				if(!reply.get("usrId").equals(principal.getName())){
					result.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
					result.put("errMsg","권한이 존재하지 않습니다");
				}
			}else{
				if("A".equals(community.getCmmnty_partcptn_grant_yn())){
					String replyPassword = communityPoiReplyMapper.selectPoiReplyPassword(poi_reply_id);
					BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
					if(!bcrypt.matches(pw,replyPassword)){
						result.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
						result.put("errMsg","비밀번호를 확인해주세요");
					}
				}
			}
		}
		return poi;
	}
	/**
	 * 소통지도 등록 페이지에서 소통지도 정보를 보내주고 등록 권한이 업으면 403페이지로 exception 나도록 함
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param model
	 * @param principal
	 * @param cmmnty_map_id
	 * @param isJson
	 * @return
	 */
	private CommunityVO forbiddenCommunityRegistCheck(
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model,
			Principal principal,
			String cmmnty_map_id,
			HashMap<String,Object> hm,
			boolean isJson
			) {
		CommunityVO community = this.getCommunity(response, principal, cmmnty_map_id);
		if(community!=null){
			if(!community.getRegist_yn().equals("Y")){
				String message = "\""+community.getCmmnty_map_nm()+"\" 소통지도에 등록권한이 존재하지 않습니다";
				if(isJson){
					hm.put("errCd",StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
					hm.put("errMsg",message);
				}else{
					response.setContentType("text/plain;charset=UTF-8");
					try {
						response.sendError(HttpServletResponse.SC_FORBIDDEN,message);
					} catch (IOException e) {
						logger.error(e);
					}
				}
			}else{
				if(isJson){
					hm.put("errCd",StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode());
				}
				if(model!=null){
					if(principal==null&&!community.getCmmnty_partcptn_grant_yn().matches("M|P|A")){
						try {
							response.sendRedirect(request.getContextPath()+"/choose/login.sgis?returnPage="+URLEncoder.encode("/map/community/form.sgis?id="+cmmnty_map_id,"UTF-8"));
						} catch (IOException e) {
							logger.error(e);
						}
					}
					model.addAttribute("community",community);
					model.addAttribute("customSymbolList",communityMapper.selectCommunityCustomSymbolList(community.getCustom_symbol_group_id()));
				}
			}
		}
		return community;
	}
	/**
	 * 소통지도 리스트
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @param command
	 * @return
	 */
	@Override
	public JsonData getCommunityJsonList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command
			) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			if(!StringUtils.hasText(command.getType())){
				command.setType("all");
			}
			if(command.getType().equals("all")||command.getType().equals("hot")||principal!=null){
				CommonCommand community = this.getCommunityList(principal,command);
				result.put("list", community.getSource());
				result.put("total", community.getTotal());
			}
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * 소통지도 리스트를 {@link PagedListHolder}를 확장한 {@link CommonCommand }에 total과 source에 값을 셋팅
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param principal
	 * @param command
	 * @return
	 */
	@Override
	public CommonCommand getCommunityList(
			Principal principal,
			CommonCommand command
			) {
		command.setMember_id(getMemberId(principal));
		command.setTotal(communityMapper.selectCmmntyCount(command));
		/** 2020.09.16[한광희] 지역현안 소통지도 수정 START */
		/*List<CommunityVO> communityList = communityMapper.selectCmmntyList(command);*/
		List<CommunityVO> communityList = communityMapper.selectCommunityList(command);
		/*if(command.getType().equals("hot")){
			if(communityList.size()<4){
				communityList.addAll(communityMapper.selectCmmntyRemainderHotList(command.getType(),command.getMember_id(),communityList));
			}
			command.setTotal(communityList.size());
		}*/
		/** 2020.09.16[한광희] 지역현안 소통지도 수정 START */
		command.setSource(communityList);
		return command;
	}
	/**
	 * POI 등록 권한 체크
	 * @date 2016. 4. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param model
	 * @param principal
	 * @param cmmnty_map_id
	 */
	@Override
	public void forbiddenCommunityRegist(
			HttpServletRequest request,
			HttpServletResponse response, 
			ModelMap model, 
			Principal principal,
			String cmmnty_map_id) {
		this.forbiddenCommunityRegistCheck(request, response, model, principal, cmmnty_map_id, null, false);
	}
	/**
	 * 소통지도 정보
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param response
	 * @param model
	 * @param principal
	 * @param cmmnty_map_id
	 */
	@Override
	public void getCommunity(
			HttpServletResponse response,
			ModelMap model,
			Principal principal,
			String cmmnty_map_id
			) {
		CommunityVO community = this.getCommunity(response, principal, cmmnty_map_id);
		if(community!=null){
			model.addAttribute("community",community);
		}
	}
	/**
	 * POI 리스트
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param principal
	 * @param command
	 * @return
	 */
	@Override
	public CommonCommand getCmmntyPoiList(
			Principal principal,
			CommonCommand command 
			) {
		command.setMember_id(getMemberId(principal));
		command.setReplace_member_id("Y");
		command.setTotal(communityPoiMapper.selectCmmntyPoiCount(command));
		List<CommunityPoiVO> poiList = communityPoiMapper.selectCmmntyPoiList(command);
		if("markers".equals(command.getType())){
			List<EgovMap> fileList = communityPoiMapper.selectPoiAtchImageListForCommunity(command.getId());
			Iterator<CommunityPoiVO> iter = poiList.iterator();
			while(iter.hasNext()){
				CommunityPoiVO poi = iter.next();
				Iterator<EgovMap> fileIter = fileList.iterator();
				List<EgovMap> putFileList = new ArrayList<EgovMap>();
				while(fileIter.hasNext()){
					EgovMap file = fileIter.next();
					if(poi.getCmmnty_poi_id().equals(file.get("cmmntyPoiId").toString())){
						putFileList.add(file);
					}
				}
				poi.setImage_list(putFileList);
				fileList.removeAll(putFileList);
			}
		}
		command.setSource(poiList);
		return command;
	}
	/**
	 * POI 리스트 
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @param command
	 * @return json
	 */
	@Override
	public JsonData getCmmntyPoiListJson(
			HttpServletRequest request, 
			HttpServletResponse response,
			Principal principal,
			CommonCommand command 
			) {
		try{
			CommonCommand community = this.getCmmntyPoiList(principal,command);
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("list", community.getSource());
			result.put("total", community.getTotal());
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * POI 상세정보
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @param cmmnty_poi_id
	 * @return json
	 */
	@Override
	public JsonData getCmmntyPoiJson(
			HttpServletRequest request, 
			HttpServletResponse response,
			Principal principal,
			CommonCommand command
			) {
		try{
			command.setMember_id(getMemberId(principal));
			command.setReplace_member_id("Y");
			CommunityPoiVO poi = communityPoiMapper.selectCmmntyPoi(command);
			if(poi==null){
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.NO_RESULT, null, null);
			}else{
				HashMap<String,Object> poiResult = new HashMap<String,Object>();
				poiResult.put("info",poi);
				CommunityVO community = communityMapper.selectCmmnty(poi.getCmmnty_map_id(), command.getMember_id());
				if(!"P".equals(community.getCmmnty_partcptn_grant_yn())||community.getUsr_id().equals(command.getMember_id())){
					command.setReplace_member_id("N");
				}
				poiResult.put("reply",communityPoiReplyMapper.selectPoiReplyList(command));
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, poiResult);
			}
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * poi등록/수정
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param result
	 * @param principal
	 * @param command
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Override
	public JsonData registCommunityPoiFormJson(HttpServletRequest request,HttpServletResponse response,
			BindingResult result,Principal principal,CommunityPoiCommand command) {
		
		try{
			Enumeration params = request.getParameterNames();
			while(params.hasMoreElements()){
				String name = (String)params.nextElement();
				logger.error("#####====================================" + name +  " : " + request.getParameter(name) );
				System.out.println(name +  " : " + request.getParameter(name));
			}
			
			HashMap<String,Object> hm = new HashMap<String,Object>();
			CommunityVO community = this.forbiddenCommunityRegistCheck(request, response, null, principal, command.getCmmnty_map_id(),hm,true);
			
			String login_id = getMemberId( principal );
			boolean is_master = community.getUsr_id().equals( login_id );
			
			if( community.getCmmnty_partcptn_grant_yn().matches("M|P|A") ){
				if( is_master ){
					command.setUsr_id( login_id );
					command.setId( login_id );
				} else {
					command.setUsr_id( command.getId() );
				}
			} else {
				command.setUsr_id( login_id );
				command.setId( login_id );
			}
			
			logger.error("=================== is_master >>> " + is_master);
			logger.error("=================== command map_id >>> " + command.getCmmnty_map_id());
			logger.error("=================== command id >>> " + command.getId());
			logger.error("=================== command pw >>> " + command.getPw());
			
			if( "M".equals( community.getCmmnty_partcptn_grant_yn()) ){
				this.mtypecommunityforbidden( command.getCmmnty_map_id(), command.getId(), command.getPw(), hm, login_id, is_master );
				
			} else if( "A".equals( community.getCmmnty_partcptn_grant_yn() ) ){
				this.validation( community, command.getId(), command.getPw(), hm, login_id, is_master );
				
			} else if( "P".equals( community.getCmmnty_partcptn_grant_yn() ) ){
				this.ptypecommunityforbidden( community, command.getId(), command.getPw(), hm, login_id, is_master );
				
			}
			
			boolean modify = false;
			if( command.getCmmnty_poi_id() != null && !"".equals( command.getCmmnty_poi_id() ) ){
				modify = true;
			}
			
			if( hm.get("errCd").equals( StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode() ) ){
				MultipartRequest multiReq = (MultipartRequest) request;
				long fileSize = 0;
				List<MultipartFile> files = multiReq.getFiles("file");
				Iterator<MultipartFile> iter = files.iterator();
				
				while (iter.hasNext()) {
					MultipartFile file = iter.next();
					fileSize+=file.getSize();
				}
				
				if(fileSize>104857600){
					result.addError(new FieldError("command", "file", "파일은 최대 100MB 까지 업로드 하실 수 있습니다"));
				}else if(files.size()>6){
					result.addError(new FieldError("command", "file", "이미지는 최대 5개까지 등록하실 수 있습니다."));
				}
				
				if(result.hasErrors()){
					try {
						throw new ValidExceptionToJson(request,response,result);

					} catch (ValidExceptionToJson e) {
						e.printStackTrace();
						logger.error("community regist validation error");
					}
				}else{
					command.setGeom( "Point("+command.getLoc_x()+" "+command.getLoc_y()+")" );
					
					int cnt1 = 0;
					int cnt2 = 0;
					
					CommunityPoiVO communityPoiVO = new CommunityPoiVO();
					
					if( modify ){
						CommonCommand commonCommand = new CommonCommand();
						commonCommand.setId( command.getCmmnty_poi_id() );
						commonCommand.setMember_id( login_id );
						
						communityPoiVO = communityPoiMapper.selectCmmntyPoi( commonCommand );
						
						communityPoiVO.setX_loc( command.getLoc_x() );
						communityPoiVO.setY_loc( command.getLoc_y() );
						cnt1 = communityPoiMapper.updatePoiPoint( communityPoiVO );
					} else {
						cnt1 = communityPoiMapper.insertPoiPoint( command );
					}
					
					if(  cnt1 > 0 ){
						if( "A".equals( community.getCmmnty_partcptn_grant_yn() ) ){
							BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
							command.setPw( bcrypt.encode( command.getPw() ) );
						}else{
							command.setPw(null);
						}
						
						if( modify ){
							command.setCmmnty_usr_data_pt_id( communityPoiVO.getCmmnty_usr_data_pt_id() );
							cnt2 = communityPoiMapper.updatePoi( command );
						} else {
							cnt2 = communityPoiMapper.insertPoi( command );
						}
						
						if( cnt2 > 0 ){
							if( modify ){
								String delList = request.getParameter("deleteFileList");
								
								if( delList != null ){
									String[] deleteFileList = delList.split(",");
								
									HashMap<String,Object> deleteImage = new HashMap<String,Object>();
									deleteImage.put("cmmnty_poi_id", communityPoiVO.getCmmnty_poi_id());
									deleteImage.put("cmmnty_usr_data_pt_id", communityPoiVO.getCmmnty_usr_data_pt_id());
									
									for (int i = 0; i < deleteFileList.length; i++) {
										deleteImage.put("poi_atch_image_id", deleteFileList[i] );
										communityPoiMapper.deletePoiImage( deleteImage );
									}
								}
							}
							
							if(fileSize>0){
								String filePath = env.getProperty("Globals.File.Base.Path")+env.getProperty("Globals.File.Path");
								String savePath = "community"+File.separator+"poimg";
								HashMap<String,Object> fileResult = FileUtils.fileUpload(filePath,"WHITE","(jpe?g|png|gif|bmf)$",savePath,files);
								
								if(!(Boolean)fileResult.get("error")){
									for(HashMap<String,Object> fileResultHashMap : (List<HashMap<String,Object>>) fileResult.get("fileList")){
										HashMap<String,Object> image = new HashMap<String,Object>();
										
										image.put("cmmnty_usr_data_pt_id",command.getCmmnty_usr_data_pt_id()); 
										image.put("cmmnty_poi_id",command.getCmmnty_poi_id());
										image.put("path_nm", env.getProperty("Globals.File.Path")+File.separator+savePath+File.separator+fileResultHashMap.get("savePath"));
										image.put("file_nm", fileResultHashMap.get("originalName").toString());
										image.put("ori_file_nm", fileResultHashMap.get("originalFilename").toString());
										image.put("save_file_nm", fileResultHashMap.get("saveFilename").toString());
										image.put("file_extn", fileResultHashMap.get("extension").toString());
										image.put("file_type", fileResultHashMap.get("contentType").toString());
										
										communityPoiMapper.insertPoiImage(image);
									}
								}else{
									result.addError(new FieldError("command", "file", fileResult.get("message").toString()));
								}
							}
							
							hm.put( "result", command );
						}
						
					}
				}
			}
			
			return new JsonData( request, response, StringUtils.COMM_ERR_CODE.getError(hm.get("errCd")), hm.get("errMsg")!=null?hm.get("errMsg").toString():null, hm.get("result") );
		}catch(Exception e){
			logger.error(e);
			e.printStackTrace();
			return new JsonData( request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null );
		}
	}
	/**
	 * 소통지도 참여
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @param cmmnty_map_id
	 * @return
	 */
	@Override
	public JsonData joinJson(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Principal principal,
			String cmmnty_map_id
			) {
		try{
			if(principal==null){
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_ANONYMOUS, null, null);
			}else{
				if(communityApprovalMapper.selectCmmntyApprovalFromMemberCount(cmmnty_map_id, "D", principal.getName())>0){
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, "반려된 사용자입니다", null);
				}else{
					boolean hasMember = communityApprovalMapper.selectCmmntyApprovalFromMemberCount(cmmnty_map_id, null, principal.getName())>0;
					int registCount = 0;
					if(hasMember){
						registCount = communityApprovalMapper.updateCmmntyApprovalDistinct(cmmnty_map_id, "WA", principal.getName());
					}else{
						registCount = communityApprovalMapper.insertCmmntyApprovalAccessWait(cmmnty_map_id, principal.getName());
					}
					if(registCount>0){
						return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
					}else{
						return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
					}
				}
			}
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * 소통지도 탈퇴
	 * @date 2016. 4. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @param cmmnty_map_id
	 * @return
	 */
	@Override
	public JsonData dropuserJson(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Principal principal,
			String cmmnty_map_id) {
		try{
			if(principal==null){
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_ANONYMOUS, null, null);
			}else{
				if(communityApprovalMapper.selectCmmntyApprovalFromMemberCount(cmmnty_map_id, "D", principal.getName())>0){
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, "반려된 사용자입니다", null);
				}else{
					boolean hasMember = communityApprovalMapper.selectCmmntyApprovalFromMemberCount(cmmnty_map_id, null, principal.getName())>0;
					if(hasMember){
						if(communityApprovalMapper.updateCmmntyApprovalDistinct(cmmnty_map_id, "WS", principal.getName())>0){
							return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
						}else{
							return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, "탈퇴를 실패하였습니다", null);
						}
					}else{
						return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, "소통지도에 가입하지 않았습니다", null);
					}
				}
			}
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * 댓글 등록
	 * @date 2016. 4. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @param cmmnty_map_id
	 * @param cmmnty_poi_id
	 * @param reply_content
	 * @return json
	 */
	@Override
	public JsonData registReplyJson(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Principal principal,
			String cmmnty_map_id, 
			String cmmnty_poi_id, 
			String reply_content) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			CommunityPoiVO poi = this.forbiddenReplyCheck(request, response, result, principal, cmmnty_poi_id,request.getParameter("id"),request.getParameter("pw"));
			if(poi!=null&&result.get("errCd").equals(StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode())){
				CommunityVO community = (CommunityVO)result.get("community");
				String id;
				String pw = null;
				if(community.getCmmnty_partcptn_grant_yn().matches("M|P|A")){
					id = request.getParameter("id");
					if("A".equals(community.getCmmnty_partcptn_grant_yn())){
						BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
						pw = bcrypt.encode(request.getParameter("pw"));
					}
				}else{
					id = getMemberId(principal);
				}
				if(communityPoiReplyMapper.insertPoiReply(cmmnty_poi_id, poi.getCmmnty_usr_data_pt_id(), reply_content, id, pw)>0){
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
				}else{
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, "등록을 실패하였습니다", null);
				}
			}else{
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.getError(result.get("errCd")), result.get("errMsg")!=null?result.get("errMsg").toString():null, null);
			}
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * 댓글 수정
	 * @date 2016. 4. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @return json
	 */
	@Override
	public JsonData updateReplyJson(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Principal principal) {
		try{
			String poi_reply_id = request.getParameter("poi_reply_id");
			String reply_content = request.getParameter("content");
			HashMap<String,Object> result = new HashMap<String,Object>();
			CommunityPoiVO poi = this.forbiddenReplyMineCheck(request, response, result, principal, poi_reply_id,request.getParameter("pw"));
			if(poi!=null&&result.get("errCd").equals(StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode())){
				CommunityVO community = (CommunityVO)result.get("community");
				String id;
				if(community.getCmmnty_partcptn_grant_yn().equals("P")){
					EgovMap reply = (EgovMap)result.get("reply");
					id = reply.get("usrId").toString();
					if(!request.getParameter("id").equals(id)){
						return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN, "아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요", null);
					}
				}else if(community.getCmmnty_partcptn_grant_yn().matches("M|A")){
					EgovMap reply = (EgovMap)result.get("reply");
					id = reply.get("usrId").toString();
				}else{
					id = getMemberId(principal);
				}
				if(communityPoiReplyMapper.updatePoiReply(poi_reply_id, reply_content, id)>0){
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
				}else{
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, "수정을 실패하였습니다", null);
				}
			}else{
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.getError(result.get("errCd")), result.get("errMsg")!=null?result.get("errMsg").toString():null, null);
			}
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * 댓글 삭제
	 * @date 2016. 4. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param principal
	 * @return json
	 */
	@Override
	public JsonData deleteReplyJson(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Principal principal) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			String poi_reply_id = request.getParameter("poi_reply_id");
			CommunityPoiVO poi = this.forbiddenReplyMineCheck(request, response, result, principal, poi_reply_id,request.getParameter("pw"));
			if(poi!=null&&result.get("errCd").equals(StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode())){
				CommunityVO community = (CommunityVO)result.get("community");
				String id;
				if(community.getCmmnty_partcptn_grant_yn().equals("P")){
					EgovMap reply = (EgovMap)result.get("reply");
					id = reply.get("usrId").toString();
					if(!request.getParameter("id").equals(id)){
						return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN, "아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요", null);
						
					}
				}else if(community.getCmmnty_partcptn_grant_yn().matches("M|A")){
					EgovMap reply = (EgovMap)result.get("reply");
					id = reply.get("usrId").toString();
				}else{
					id = getMemberId(principal);
				}
				if(communityPoiReplyMapper.deletePoiReply(poi_reply_id, id)>0){
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
				}else{
					return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, "삭제를 실패하였습니다", null);
				}
			}else{
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.getError(result.get("errCd")), result.get("errMsg")!=null?result.get("errMsg").toString():null, null);
			}
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/**
	 * @description 회원 관리 따로하는 소통지도의 권한 체크
	 * @date 2016. 6. 27.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param cmmnty_map_id
	 * @param id
	 * @param pw
	 * @param hm
	 */
	private void mtypecommunityforbidden(
			String cmmnty_map_id,
			String id,
			String pw,
			HashMap<String,Object> hm,
			String login_id,
			boolean is_master
			){
		
		logger.error("====================mtypevalidation id : " + id + ", pw : " + pw + ", map_id : " + cmmnty_map_id );
		
		if(!StringUtils.hasText(id)){
			hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			hm.put("errMsg","아이디를 입력해주세요");
		}else if(!StringUtils.hasText(pw) && !is_master ){
			hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			hm.put("errMsg","비밀번호를 입력해주세요");
		}else{
			if( !is_master ){
				if(mtypeforbidden(cmmnty_map_id, id, pw)){
					hm.put("errCd", StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode());
				}else{
					hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
					hm.put("errMsg","아이디 또는 비밀번호를 확인해주세요");
				}
			}
		}
	}
	/**
	 * @description 회원 관리 따로하는 소통지도의 권한 체크
	 * @date 2016. 6. 27.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param cmmnty_map_id
	 * @param id
	 * @param pw
	 * @return
	 */
	private boolean mtypeforbidden( String cmmnty_map_id, String id, String pw ){
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("cmmnty_map_id", cmmnty_map_id);
		param.put("id", id);
		
		logger.error("=============================== param map_id >> " + param.get("cmmnty_map_id"));
		logger.error("=============================== param id >> " + param.get("id"));
		
		EgovMap member = communityRegistMemberMapper.selectCmmntyMapRegMber( param );
		if(member==null){
			return false;
		}else{
			BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
			return bcrypt.matches(pw,member.get("pw").toString());
		}
	}
	/**
	 * @description 아이디 비밀번호 체크
	 * @date 2016. 9. 21.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param community
	 * @param id
	 * @param pw
	 * @param hm
	 * @return
	 */
	private boolean validation(
			CommunityVO community,
			String id,
			String pw,
			HashMap<String,Object> hm,
			String login_id,
			boolean is_master
			){
		String idName = "아이디";
		if(community.getCmmnty_partcptn_grant_yn().equals("A")){
			idName = "별명";
		}
		
		if(!StringUtils.hasText(id)){
			hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			hm.put("errMsg",StringUtils.getComleteWordByJongsung(idName, "을", "를")+" 입력해주세요");
			return false;
		}else if(!StringUtils.hasText(pw) && !is_master ){
			hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			hm.put("errMsg","비밀번호를 입력해주세요");
			return false;
		}else if(id.length()<5){
			//hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			//hm.put("errMsg",StringUtils.getComleteWordByJongsung(idName, "은", "는")+" 5글자 이상으로 등록해주세요");
			return true;
		}else if(id.length()>30){
			hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			hm.put("errMsg",StringUtils.getComleteWordByJongsung(idName, "은", "는")+" 30글자 이하으로 등록해주세요");
			return false;
		}else if(!id.matches("[a-z|A-Z|0-9]+")){
			//hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			//hm.put("errMsg",StringUtils.getComleteWordByJongsung(idName, "은", "는")+" 영문 또는 숫자만 사용하실 수 있습니다");
			return true;
		}else if( community.getUsr_id().equals( id ) && !is_master ){
			hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
			hm.put("errMsg","개설자 아이디는 사용하실 수 없습니다");
			return false;
		}else{
			return true;
		}
	}
	/**
	 * @description 패스워드 소통지도의 권한 체크
	 * @date 2016. 7. 5.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param community
	 * @param id
	 * @param pw
	 * @param hm
	 */
	private void ptypecommunityforbidden(
			CommunityVO community,
			String id,
			String pw,
			HashMap<String,Object> hm,
			String login_id,
			boolean is_master
			){
		
		if( this.validation( community, id, pw, hm, login_id, is_master )){
			if( !is_master ){
				if( ptypeforbidden (community.getCmmnty_map_id(), id, pw ) ){
					hm.put("errCd", StringUtils.COMM_ERR_CODE.SUCCESS.getErrCode());
				}else{
					hm.put("errCd", StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode());
					hm.put("errMsg","아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요");
				}
			}
		}
	}
	/**
	 * @description 패스워드 소통지도의 권한 체크
	 * @date 2016. 7. 5.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param cmmnty_map_id
	 * @param id
	 * @param pw
	 * @return
	 */
	private boolean ptypeforbidden(
			String cmmnty_map_id, 
			String id,
			String pw){
		String communityPassword = communityMapper.selectCommunityPassword(cmmnty_map_id);
		if(communityPassword==null){
			return false;
		}else{
			BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
			return bcrypt.matches(pw,communityPassword);
		}
	}
	
	/** 2020.09.16[한광희] 메인 지역현안 소통지도 수정 START */
	/**
	 * 메인 소통지도 리스트
	 * @date 2020.09.16
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param principal
	 * @param command
	 * @return
	 */
	@Override
	public JsonData getMainCommunityJsonList(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			CommonCommand command
			) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			if(!StringUtils.hasText(command.getType())){
				command.setType("all");
			}
			if(command.getType().equals("all")||command.getType().equals("hot")||principal!=null){
				List<CommunityVO> communityList = communityMapper.selectMainCommunityList(command);
				result.put("list", communityList);
			}
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/** 2020.09.16[한광희] 메인 지역현안 소통지도 수정 END */
	
	
	public HashMap<String, Object> idPwCheck( String login_id
			, CommunityPoiVO poiVO
			, CommonCommand command ) throws Exception{
		return idPwValidation( login_id, poiVO, command );
	}
	
	private HashMap<String, Object> idPwValidation( String login_id
			, CommunityPoiVO poiVO
			, CommonCommand command ) throws Exception{
		
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		
		CommunityPoiVO communityPoi = communityPoiMapper.selectCmmntyPoi( command );
		CommunityVO community = communityMapper.selectCmmnty( communityPoi.getCmmnty_map_id(), login_id );
		
		String pw = poiVO.getPw();
		String usr_id = community.getUsr_id();
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+communityPoi.getCmmnty_map_id());
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+command.getId());
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+poiVO.getUsr_id());
		
		if( community.getCmmnty_partcptn_grant_yn().equals("M") && !usr_id.equals( login_id ) ){
			
			HashMap<String, Object> param = new HashMap<String, Object>();
			
			System.out.println("=================== id >>>>>>>>>>> " + command.getId());
			
			param.put("cmmnty_map_id", communityPoi.getCmmnty_map_id());
			param.put("id", poiVO.getUsr_id() );
			
			EgovMap mber = communityRegistMemberMapper.selectCmmntyMapRegMber( param );
			
			System.out.println("===============================@@@@@@@@@@@@@@@@@ pw >> " + pw);
			System.out.println("===============================@@@@@@@@@@@@@@@@@ mber pw >> " + mber.get("pw"));
			
			if( mber == null || !bcrypt.matches( pw, mber.get("pw").toString() ) ){
				success = false;
				msg = "아이디 또는 비밀번호를 확인해주세요";
			}else{
				if( !communityPoi.getUsr_id().equals( poiVO.getUsr_id() ) ){
					success = false;
					msg = "권한이 존재하지 않습니다";
				}
			}
			
		}else if( community.getCmmnty_partcptn_grant_yn().equals("P") && !usr_id.equals( login_id )){
			
			if( poiVO.getUsr_id() == null || usr_id.equals( poiVO.getUsr_id() )
					|| !communityPoi.getUsr_id().equals( poiVO.getUsr_id() ) ){
				success = false;
				msg = "아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요";
			}else{
				String value = communityPoi.getCmmnty_map_id()+"";
				String communityPw = communityMapper.selectCmmntyMapPassword( value );
				
				if(!bcrypt.matches( pw, communityPw )){
					success = false;
					msg = "아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요";
				}
			}
		}else if( community.getCmmnty_partcptn_grant_yn().equals("A") && !usr_id.equals( login_id ) ){
			if( poiVO.getUsr_id() == null || usr_id.equals( poiVO.getUsr_id() ) 
					|| !communityPoi.getUsr_id().equals( poiVO.getUsr_id() ) ){
				success = false;
				msg = "아이디 또는 비밀번호를 확인해주세요";
			}else{
				String poiPw = null;
				
				if( communityPoi.getPw() != null ){
					poiPw = communityPoi.getPw().toString();
				}
				if( !bcrypt.matches( pw,poiPw ) ){
					success = false;
					msg = "아이디 또는 비밀번호를 확인해주세요";
				}
			}
		}else{
			if( login_id == null ){
				success = false;
				msg = "로그인 후 작성가능합니다";
			}else if( !communityPoi.getUsr_id().equals( login_id ) ){
				success = false;
				msg = "권한이 존재하지 않습니다";
			}
		}
		
		result.put("success", success);
		result.put("msg", msg);
		
		return result;
	}
}
