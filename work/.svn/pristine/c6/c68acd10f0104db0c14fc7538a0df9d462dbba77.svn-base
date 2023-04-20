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
package kostat.lbdms.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @Class Name : MemberService.java
 * @Description : MemberService Class
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
public interface MemberService {

	/**
	 * 사용자 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getMemberInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 대시보드 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getMemberDashBoardInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 그룹멤버 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getGroupMemberList(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 정보를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 패스워드 정보를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberPw(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 정보를 삭제 탈퇴한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteMemberInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 비밀번호를 변경한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateMemberPwd(Map mapParameter) throws SQLException;
	
	/**
	 * 사용자 키를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateUserKey(Map mapParameter) throws SQLException;
	
}