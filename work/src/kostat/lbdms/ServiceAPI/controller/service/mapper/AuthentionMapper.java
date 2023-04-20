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
package kostat.lbdms.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.Map;
import java.util.List;

import javax.annotation.Resource;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

/**
 * @Class Name : AuthentionMapper.java
 * @Description : AuthentionMapper DAO Class
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


@Repository("authentionMapper")
public class AuthentionMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	/**
	 * 기관정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getInstitutionList(Map mapParameter) throws SQLException {
		return selectList("account.getInstitutionList", mapParameter);
	}
	
	/**
	 * 아이디 중복확인을 수행한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int getLoginIdCheck(Map mapParameter) throws SQLException {
		return selectOne("account.getLoginIdCheck", mapParameter);
	}
	
	/**
	 * 회원가입을 수행한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertSignUp(Map mapParameter) throws SQLException {
		return insert("account.insertSignUp", mapParameter);
	}

	/**
	 * 로그인 정보를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateLoginInfo(Map mapParameter) throws SQLException {
		return update("account.updateLoginInfo", mapParameter);
	}
	
	/**
	 * 로그인 실패 횟수를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateLoginFailCnt(Map mapParameter) throws SQLException {
		return update("account.updateLoginFailCnt", mapParameter);
	}
	
	/**
	 * 로그인 제한 여부를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateLoginUseInfo(Map mapParameter) throws SQLException {
		return update("account.updateLoginUseInfo", mapParameter);
	}
	
	/**
	 * 로그인 이력을 저장한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map insertLoginHistory(Map mapParameter) throws SQLException {
		return selectOne("account.insertLoginHistory", mapParameter);
	}
	
	/**
	 * 로그인 이력을 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateLoginHistory(Map mapParameter) throws SQLException {
		return update("account.updateLoginHistory", mapParameter);
	}
	
	/**
	 * 아이디를 찾는다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getFindId(Map mapParameter) throws SQLException {
		return selectOne("account.getFindId", mapParameter);
	}
	
	/**
	 * 비밀번호를 찾는다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getFindPwd(Map mapParameter) throws SQLException {
		return selectOne("account.getFindPwd", mapParameter);
	}
	
	/**
	 * UBIS 회원정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getUbisUserInfo(Map mapParameter) throws SQLException {
		return selectOne("account.getUbisUserInfo", mapParameter);
	}
	
	/**
	 * UBIS 회원정보를 체크한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getUbisUserCheck(Map mapParameter) throws SQLException {
		return selectOne("account.getUbisUserCheck", mapParameter);
	}
	
	/**
	 * 아이디로 회원을 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int getFindById(Map mapParameter) throws SQLException {
		return selectOne("account.getFindById", mapParameter);
	}
}