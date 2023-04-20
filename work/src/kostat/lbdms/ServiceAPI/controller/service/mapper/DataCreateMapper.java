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
 * @Class Name : CommonMapper.java
 * @Description : CommonMapper DAO Class
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


@Repository("dataCreateMapper")
public class DataCreateMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSessionUserDb")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	public int schemaHsOwn(Map paramMap) {
	    return selectOne("UserMapper.schemaHasOwn",paramMap);
	}
	public void createSchma(Map paramMap) {
	    update("UserMapper.createSchema",paramMap);
	}
	
	//회원 데이터 초기화
	public void initData(Map paramMap) throws SQLException {
		update("UserMapper.initData", paramMap);
	}
	
	public List selectColumns(Map paramMap) {
	    return selectList("UserMapper.selectColumns",paramMap);
	}
	public void createTable(Map paramMap) {
	    update("UserMapper.createTable",paramMap);
	}
	
	public void tableOwnChange(Map paramMap) {
	    update("UserMapper.tableOwnChange",paramMap);
	}
	
	public void addRidColumn(Map paramMap) {
	    update("UserMapper.addRidColumn",paramMap);
	}
	
	public void insertRow(Map paramMap) {
		insert("UserMapper.insertRow",paramMap);
	}

	public void createSequence(Map paramMap) {
	    update("UserMapper.createSequence",paramMap);
	}
	
	public List getMyDataInfo(String sql) {
		return selectList("UserMapper.getMyDataInfo",sql);
	}
	
	public List getResourceInfo(Map paramMap) {
	    return selectList("UserMapper.getResourceInfo",paramMap);
	}
	
	public void  tableModify(String querys) {
	    String[] queryArr = querys.split(";");
	    for(int i = 0 ; i < queryArr.length;i++) {
		update("UserMapper.modifyTable",queryArr[i]);
	    }	    
	}
	
	public void geoCodingUpdate(Map paramMap) {
	    update("UserMapper.geoCodingUpdate",paramMap);
	}
	
	//데이터 정보 (리소스 가져오기)
	public List selectResourceInfo(Map map) {
	    return selectList("UserMapper.selectResourceInfo",map);
	}
	
	//geom (리소스 가져오기)
	public List selectResourceGeom(Map map) {
	    return selectList("UserMapper.selectResourceGeom",map);
	}
		
	
	public Map getGeoCodingSuccessResultCount(Map map) {
	    return selectOne("UserMapper.getGeoCodingSuccessResultCount",map);
	}
	
	public void updateRecordColumnData(Map map) {
	    update("UserMapper.updateRecordColumnData",map);
	}
	
	/**
	 * 컬럼데이터 조건 해당 변경
	 * @param mapParameter
	 * @exception Exception
	 */
	public void columnDataModify(Map map) {
	    update("UserMapper.columnDataModify",map);
	}
	/**
	 * 나의데이터 검색
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectConditionList(Map paramMap) {
	    return selectList("UserMapper.selectConditionList",paramMap);
	}
	
	/**
	 * 나의데이터 로우 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public void deleteRow(Map paramMap)throws SQLException{
	    delete("UserMapper.deleteRow",paramMap);
	}
	
	/**
	 * 나의데이터 행  count
	 * @param mapParameter
	 * @exception Exception
	 */
	public int selectRowCount(Map paramMap)throws SQLException{
	    return selectOne("UserMapper.selectRowCount",paramMap);
	}
	
	public List getColumns(Map paramMap) {
	    return selectList("UserMapper.getColumns",paramMap);
	}
	
	/**
	 * 나의데이터 컬럼 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public void dropColumn(Map paramMap)throws SQLException{
	     update("UserMapper.dropColumn",paramMap);
	}
	
	/**
	 * 나의데이터 컬럼 추가
	 * @param mapParameter
	 * @exception Exception
	 */
	public void addColumn(Map paramMap)throws SQLException{
	    update("UserMapper.addColumn",paramMap);
	}
	
	public void dropTable(Map paramMap)throws SQLException{
	    update("UserMapper.dropTable",paramMap);
	}
	

	public List getCollectCareerList(Map mapParameter) throws SQLException{
		return selectList("UserMapper.getCollectCareerList", mapParameter);
	}
	
	public List getCollectCareerList2(Map mapParameter) throws SQLException{
		return selectList("UserMapper.getCollectCareerList2", mapParameter);
	}
	
	public List getCollectCareerList3(Map mapParameter) throws SQLException{
		return selectList("UserMapper.getCollectCareerList3", mapParameter);
	}

	public void deleteCollectCareer(Map mapParameter) throws SQLException{
		delete("UserMapper.deleteCollectCareer", mapParameter);
	}
	
	public void deleteCollectCareer2(Map mapParameter) throws SQLException{
		delete("UserMapper.deleteCollectCareer2", mapParameter);
	}
	
	public void deleteCollectCareer3(Map mapParameter) throws SQLException{
		delete("UserMapper.deleteCollectCareer3", mapParameter);
	}
}