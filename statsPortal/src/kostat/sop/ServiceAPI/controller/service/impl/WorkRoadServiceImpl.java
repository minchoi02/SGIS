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
package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.WorkRoadService;
import kostat.sop.ServiceAPI.controller.service.mapper.WorkRoadMapper;

/**
 * @Class Name : WorkRoadServiceImpl.java
 * @Description : WorkRoadServiceImpl DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2018.10.01           최초생성
 *
 * @author SGIS+ 스마트플랫폼
 * @since 2018. 10.01
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */

@Service("workRoadService")
public class WorkRoadServiceImpl extends EgovAbstractServiceImpl implements WorkRoadService {

	private static final Logger LOGGER = LoggerFactory.getLogger(WorkRoadServiceImpl.class);
	
	@Resource(name="workRoadMapper")
	private WorkRoadMapper workRoadMapper;
	
	/*
	 * 공통 코드 조회
	 * 
	 * @param mapParameter
	 *				b_class_cd : 분류코드 (nullable)
	 *				s_class_cd : 코드 (nullable)
	 *				s_class_cd_len : 코드길이 (nullable)
	 * @exception Exception
	 */
	public List selectCommonCode(Map<String, Object> mapParameter) throws SQLException {
		return workRoadMapper.selectCommonCode(mapParameter);
	}
	
}