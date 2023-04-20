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

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.controller.service.CollectService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.CollectMapper;
import kostat.lbdms.ServiceAPI.controller.service.mapper.DataCreateMapper;

/**
 * @Class Name : PrjMngServiceImpl.java
 * @Description : PrjMngServiceImpl Class
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

@Service("collectService")
public class CollectServiceImpl extends EgovAbstractServiceImpl implements CollectService {


	/** CommonDAO */
	@Resource(name="collectMapper")
	private CollectMapper collectMapper;
	
	@Resource(name = "dataCreateMapper")
	private DataCreateMapper		dataCreateMapper;
	
	/**
	 * 주소DB수집현황 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getAddrDBStstList(Map mapParameter) throws SQLException {
		return collectMapper.getAddrDBStstList(mapParameter);
	}
	
	public List searchAdminSgg(Map mapParameter) throws SQLException {
		return collectMapper.searchAdminSgg(mapParameter);
	}

	public List searchAdminEmd(Map mapParameter) throws SQLException {
		return collectMapper.searchAdminEmd(mapParameter);
	}  
	
	public List searchLegSgg(Map mapParameter) throws SQLException {
		return collectMapper.searchLegSgg(mapParameter);
	} 
	
	public List searchLegEmd(Map mapParameter) throws SQLException {
		return collectMapper.searchLegEmd(mapParameter);
	}  
	
	/**
	 * 수집현황 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCollectList(Map mapParameter) throws SQLException {
		return collectMapper.getCollectList(mapParameter);
	}
	
	public List getCollectKosis(Map mapParameter) throws SQLException{
		return collectMapper.getCollectKosis(mapParameter);
	}
	
	public int collectKosisNew(Map mapParameter) throws SQLException{
		return collectMapper.collectKosisNew(mapParameter);
	}
	
	public Map collectKosisDetail(Map mapParameter) throws SQLException{
		return collectMapper.collectKosisDetail(mapParameter);
	}
	
	public int updateCollectKosis(Map mapParameter) throws SQLException{
		return collectMapper.updateCollectKosis(mapParameter);
	}
	
	public void deleteCollect(Map mapParameter) throws SQLException {
		collectMapper.deleteCollect(mapParameter);
	}
	
	public void deleteCollectCareer(Map mapParameter) throws SQLException{
		collectMapper.deleteCollectCareer(mapParameter);
	}
	
	public void deleteCollectCareer2(Map mapParameter) throws SQLException{
		collectMapper.deleteCollectCareer2(mapParameter);
	}
	
	public void deleteCollectCareer3(Map mapParameter) throws SQLException{
		collectMapper.deleteCollectCareer3(mapParameter);
	}
	
	
	
	/**
	 * 일자리 자동화현황을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCollectJobSts(Map mapParameter) throws SQLException {
		return collectMapper.getCollectJobSts(mapParameter);
	}
	
}