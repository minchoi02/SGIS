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
import oracle.gss.util.CharConvBuilder.MappingParser;

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


@Repository("collectMapper")
public class CollectMapper extends EgovAbstractMapper {
	
	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	/**
	 * 주소DB수집현황 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getAddrDBStstList(Map mapParameter) throws SQLException {
		return selectList("collect.getAddrDBStstList", mapParameter);
	}
	
	public List searchAdminSgg(Map mapParameter) throws SQLException {
		return selectList("collect.searchAdminSgg", mapParameter);
	}

	public List searchAdminEmd(Map mapParameter) throws SQLException {
		return selectList("collect.searchAdminEmd", mapParameter);
	}  
	
	public List searchLegSgg(Map mapParameter) throws SQLException {
		return selectList("collect.searchLegSgg", mapParameter);
	} 
	
	public List searchLegEmd(Map mapParameter) throws SQLException {
		return selectList("collect.searchLegEmd", mapParameter);
	}  
	/**
	 * 수집현황 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCollectList(Map mapParameter) throws SQLException {
		return selectList("collect.getCollectList", mapParameter);
	}
	
	public List getCollectKosis(Map mapParameter) throws SQLException{
		return selectList("collect.getCollectKosis", mapParameter);
	}
	
	public int collectKosisNew(Map mapParameter) throws SQLException{
		return insert("collect.collectKosisNew",mapParameter);
	}
	
	public Map collectKosisDetail(Map mapParameter) throws SQLException{
		return selectOne("collect.collectKosisDetail", mapParameter);
	}
	
	public int updateCollectKosis(Map mapParameter) throws SQLException{
		return update("collect.updateCollectKosis", mapParameter);
	}
	
	public void deleteCollect(Map mapParameter) throws SQLException {
		delete("collect.deleteCollect", mapParameter);
	}
	
	public void deleteCollectCareer(Map mapParameter) throws SQLException{
		delete("collect.deleteCollectCareer", mapParameter);
	}
	
	public void deleteCollectCareer2(Map mapParameter) throws SQLException{
		delete("collect.deleteCollectCareer2", mapParameter);
	}
	
	public void deleteCollectCareer3(Map mapParameter) throws SQLException{
		delete("collect.deleteCollectCareer3", mapParameter);
	}
	
	/**
	 * 일자리 자동화현황 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCollectJobSts(Map mapParameter) throws SQLException {
		return selectList("collect.getCollectJobSts", mapParameter);
	}
}