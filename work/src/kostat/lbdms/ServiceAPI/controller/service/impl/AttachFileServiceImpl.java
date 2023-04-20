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
import kostat.lbdms.ServiceAPI.controller.service.AttachFileService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.AttachFileMapper;

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

@Service("attachFileService")
public class AttachFileServiceImpl extends EgovAbstractServiceImpl implements AttachFileService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AttachFileServiceImpl.class);

	/** CommonDAO */
	@Resource(name="attachFileMapper")
	private AttachFileMapper attachFileMapper;

	/**
	 * 첨부파일을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertAttachFile(Map mapParameter) throws SQLException {
		return attachFileMapper.insertAttachFile(mapParameter);
	}
	
	/**
	 * 첨부파일을 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getAttachFile(Map mapParameter) throws SQLException {
		return attachFileMapper.getAttachFile(mapParameter);
	}
	
	/**
	 * 첨부파일을 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteAttachFile(Map mapParameter) throws SQLException {
		return attachFileMapper.deleteAttachFile(mapParameter);
	}

}