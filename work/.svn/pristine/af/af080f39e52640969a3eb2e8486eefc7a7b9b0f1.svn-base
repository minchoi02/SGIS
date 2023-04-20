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

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.opengis.referencing.FactoryException;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Class Name : CommonService.java
 * @Description : CommonService Class
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
public interface DataCreateService {
    
    public JSONObject getEncoding(MultipartFile file, String[] charsets) throws IOException;

    public String getCharset(MultipartFile file) throws IOException;
    
    public Map createTable(List list,String data_type,String output_table_name,String description,boolean header,String delimiter,String target_agent,String user_id,String encoding_type) throws IOException , SQLException;
    /*public Map createTable(List list,HttpServletResponse response,String data_type,String output_table_name,String description,String header,String delimiter,String target_agent,String user_id,String encoding_type) throws IOException , SQLException;*/
    
    public Map createShpTable(List list,String data_type,String output_table_name,String description,boolean header,String delimiter,String target_agent,String user_id,String encoding_type) throws IOException , SQLException, FactoryException;
    /*public Map createShpTable(List list,String data_type,String output_table_name,String description,String header,String delimiter,String target_agent,String user_id,String encoding_type) throws IOException , SQLException, FactoryException;*/
    
    public List getMetaData(List<MultipartFile> list , String data_type,String delimiter,String charsets)throws IOException;
    
    public void insertMyData(String user_id,String data_storage_type,String data_path,double data_size ,String data_cnt,String category1,String category2,String category3,String category4,String description,String relation_resource_id,String data_name,String action_type,String x_column,String y_column,String pos_column_desc)throws SQLException ;
    
    public void updateMyData(Map map)throws SQLException ;
    
    public Map getMyDataInfo(String data_id,String relation_id)throws SQLException ;
    
    public Map geoCoding(Map paramsMap) throws SQLException ;
    
    public Map addrGeoCoding(List rowList,String[] selectColumns)throws SQLException;
    
    public Map xyReverseGeoCoding(List rowList,String xColumn,String yColumn)throws SQLException;
    
    public Map admGeoCoding(List rowList, String[] selectColumns)throws SQLException;
    
    public void updateTableGeoCoding(Map map);
    
    public boolean existSubjectData(Map map) throws SQLException;
    
    public JSONObject makeColumnInfo(List list) throws JSONException;
    
    public int schemaHsOwn(Map paramMap) throws SQLException;
	public void createSchma(Map paramMap) throws SQLException;
	
	public List getCollectCareerList(Map mapParameter) throws SQLException;
	
	public List getCollectCareerList2(Map mapParameter) throws SQLException;
	
	public List getCollectCareerList3(Map mapParameter) throws SQLException;

	public void deleteCollectCareer(Map mapParameter) throws SQLException;
	
	public void deleteCollectCareer2(Map mapParameter) throws SQLException;
	
	public void deleteCollectCareer3(Map mapParameter) throws SQLException;
}