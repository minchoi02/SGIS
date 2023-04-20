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
import java.util.Map;

import javax.annotation.Resource;

import kostat.lbdms.ServiceAPI.controller.service.SrvLogWriteService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.SrvLogWriteServiceMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : SrvLogWriteServiceImpl.java
 * @Description : SrvLogWriteServiceImpl Implement Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.05.30           최초생성
 *
 * @author SGIS+ 운영팀
 * @since 2019. 05.30
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */

@Service("SrvLogWriteService")
public class SrvLogWriteServiceImpl extends EgovAbstractServiceImpl implements SrvLogWriteService {

	private static final Logger LOGGER = LoggerFactory.getLogger(SrvLogWriteServiceImpl.class);

	/** CommonDAO */
	@Resource(name="SrvLogWriteMapper")
	private SrvLogWriteServiceMapper srvLogWriteMapper;

	/**
	 * 공지사항 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map SrvLogWrite(Map mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return srvLogWriteMapper.insertSrvLog(mapParameter);
	}
}