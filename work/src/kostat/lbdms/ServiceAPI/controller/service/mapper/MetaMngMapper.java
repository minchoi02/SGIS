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
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

/**
 * @Class Name : PrjMngMapper.java
 * @Description : PrjMngMapper Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.7.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2019.7.17
 * @version 1.0
 * @see
 *
 */


@Repository("metaMngMapper")
public class MetaMngMapper extends EgovAbstractMapper {
	
	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	/*------------------------------------------------------------*/
	/*   용어 사전	                                                  */
	/*------------------------------------------------------------*/
	
	/**
	 * 표준용어 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List metaWordList(Map mapParameter) throws SQLException {
		return selectList("metamng.metaWordList", mapParameter);
	}
	
	/**
	 * 표준용어 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map metaWordDetail(Map mapParameter) throws SQLException {
		return selectOne("metamng.metaWordDetail", mapParameter);
	}

	/**
	 * 표준용어를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaWordAdd(Map mapParameter) throws SQLException {
		return insert("metamng.metaWordAdd", mapParameter);
	}

	/**
	 * 표준용어를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaWordEdit(Map mapParameter) throws SQLException {
		return update("metamng.metaWordEdit", mapParameter);
	}

	/**
	 * 표준용어를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaWordDel(Map mapParameter) throws SQLException {
		return delete("metamng.metaWordDel", mapParameter);
	}
	
	/**
	 * 표준용어 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String metaWordID() throws SQLException {
		return selectOne("metamng.metaWordID");
	}

	/*------------------------------------------------------------*/
	/*   도메인	                                                  */
	/*------------------------------------------------------------*/
	
	/**
	 * 도메인 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List metaDomainList(Map mapParameter) throws SQLException {
		return selectList("metamng.metaDomainList", mapParameter);
	}
	
	/**
	 * 도메인 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map metaDomainDetail(Map mapParameter) throws SQLException {
		return selectOne("metamng.metaDomainDetail", mapParameter);
	}

	/**
	 * 도메인을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaDomainAdd(Map mapParameter) throws SQLException {
		return insert("metamng.metaDomainAdd", mapParameter);
	}

	/**
	 * 도메인을 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaDomainEdit(Map mapParameter) throws SQLException {
		return update("metamng.metaDomainEdit", mapParameter);
	}

	/**
	 * 도메인을 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaDomainDel(Map mapParameter) throws SQLException {
		return delete("metamng.metaDomainDel", mapParameter);
	}
	
	/**
	 * 도메인 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String metaDomainID() throws SQLException {
		return selectOne("metamng.metaDomainID");
	}
	
	
	/*------------------------------------------------------------*/
	/*   코드                                                                                               */
	/*------------------------------------------------------------*/
	
	/**
	 * 코드 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List metaCodeList(Map mapParameter) throws SQLException {
		return selectList("metamng.metaCodeList", mapParameter);
	}
	
	/**
	 * 코드 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map metaCodeDetail(Map mapParameter) throws SQLException {
		return selectOne("metamng.metaCodeDetail", mapParameter);
	}

	/**
	 * 코드를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaCodeAdd(Map mapParameter) throws SQLException {
		return insert("metamng.metaCodeAdd", mapParameter);
	}

	/**
	 * 코드를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaCodeEdit(Map mapParameter) throws SQLException {
		return update("metamng.metaCodeEdit", mapParameter);
	}

	/**
	 * 코드를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaCodeDel(Map mapParameter) throws SQLException {
		return delete("metamng.metaCodeDel", mapParameter);
	}
	
	/**
	 * 코드 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String metaCodeID() throws SQLException {
		return selectOne("metamng.metaCodeID");
	}

	/*------------------------------------------------------------*/
	/*   정보시스템                                                                                       */
	/*------------------------------------------------------------*/
	
	/**
	 * 정보시스템 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List metaSysInfoList(Map mapParameter) throws SQLException {
		return selectList("metamng.metaSysInfoList", mapParameter);
	}
	
	/**
	 * 정보시스템 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map metaSysInfoDetail(Map mapParameter) throws SQLException {
		return selectOne("metamng.metaSysInfoDetail", mapParameter);
	}

	/**
	 * 정보시스템을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaSysInfoAdd(Map mapParameter) throws SQLException {
		return insert("metamng.metaSysInfoAdd", mapParameter);
	}

	/**
	 * 정보시스템을 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaSysInfoEdit(Map mapParameter) throws SQLException {
		return update("metamng.metaSysInfoEdit", mapParameter);
	}

	/**
	 * 정보시스템을 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaSysInfoDel(Map mapParameter) throws SQLException {
		return delete("metamng.metaSysInfoDel", mapParameter);
	}
	
	/**
	 * 정보시스템 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String metaSysInfoID() throws SQLException {
		return selectOne("metamng.metaSysInfoID");
	}
	
	/*------------------------------------------------------------*/
	/*   테이블                                                                                            */
	/*------------------------------------------------------------*/
	
	/**
	 * 테이블 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List metaTblList(Map mapParameter) throws SQLException {
		return selectList("metamng.metaTblList", mapParameter);
	}
	
	/**
	 * 테이블 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map metaTblDetail(Map mapParameter) throws SQLException {
		return selectOne("metamng.metaTblDetail", mapParameter);
	}

	/**
	 * 테이블을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaTblAdd(Map mapParameter) throws SQLException {
		return insert("metamng.metaTblAdd", mapParameter);
	}

	/**
	 * 테이블을 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaTblEdit(Map mapParameter) throws SQLException {
		return update("metamng.metaTblEdit", mapParameter);
	}

	/**
	 * 테이블을 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int metaTblDel(Map mapParameter) throws SQLException {
		return delete("metamng.metaTblDel", mapParameter);
	}
	
	/**
	 * 테이블을 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String metaTblID() throws SQLException {
		return selectOne("metamng.metaTblID");
	}
	
}