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
import kostat.lbdms.ServiceAPI.controller.service.GuideService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.OperationGuideMapper;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : CommonServiceImpl.java
 * @Description : CommonServiceImpl Implement Class
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

@Service("operationGuideService")
public class GuideServiceImpl extends EgovAbstractServiceImpl implements GuideService {

	private static final Logger LOGGER = LoggerFactory.getLogger(GuideServiceImpl.class);

	/** CommonDAO */
	@Resource(name="operationGuideMapper")
	private OperationGuideMapper operationGuideMapper;

	/**
	 * 이용안내 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getGuideList(Map mapParameter) throws SQLException {
		return operationGuideMapper.getGuideList(mapParameter);
	}
	
	/**
	 * 이용안내 상세정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getGuideDetailInfo(Map mapParameter) throws SQLException {
		return operationGuideMapper.getGuideDetailInfo(mapParameter);
	}
	
	/**
	 * 첨부파일 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getFileList(Map mapParameter) throws SQLException {
		return operationGuideMapper.getFileList(mapParameter);
	}
	
	/**
	 * 이용안내 조회수를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateViewCnt(Map mapParameter) throws SQLException {
		return operationGuideMapper.updateViewCnt(mapParameter);
	}
	
}