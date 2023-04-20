/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.controller.service.MemberService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.MemberMapper;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : MemberServiceImpl.java
 * @Description : MemberServiceImpl Implement Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.21
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */

@Service("memberService")
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);

	/** MemberMapperDAO */
	@Resource(name="memberMapper")
	private MemberMapper memberMapper;
	
	/**
	 * 사용자 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getMemberInfo(Map mapParameter) throws SQLException {
		return memberMapper.getMemberInfo(mapParameter);
	}
	
	/**
	 * 사용자 대시보드 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getMemberDashBoardInfo(Map mapParameter) throws SQLException {
		return memberMapper.getMemberDashBoardInfo(mapParameter);
	}
	
	/**
	 * 사용자 그룹멤버 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getGroupMemberList(Map mapParameter) throws SQLException {
		return memberMapper.getGroupMemberList(mapParameter);
	}
	
	/**
	 * 사용자 정보를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberInfo(Map mapParameter) throws SQLException {
		return memberMapper.updateMemberInfo(mapParameter);
	}
	
	
	/**
	 * 사용자 패스워드를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberPw(Map mapParameter) throws SQLException {
		return memberMapper.updateMemberPw(mapParameter);
	}
	
	
	/**
	 * 사용자 정보를 삭제 탈퇴한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteMemberInfo(Map mapParameter) throws SQLException {
		return memberMapper.deleteMemberInfo(mapParameter);
	}
	
	
	/**
	 * 사용자 비밀번호를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberPwd(Map mapParameter) throws SQLException {
		return memberMapper.updateMemberPwd(mapParameter);
	}
	
	/**
	 * 사용자 키를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateUserKey(Map mapParameter) throws SQLException {
		return memberMapper.updateUserKey(mapParameter);
	}
}