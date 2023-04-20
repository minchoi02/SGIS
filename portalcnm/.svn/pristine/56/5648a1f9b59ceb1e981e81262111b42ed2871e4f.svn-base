/*
 * Copyright 2008-2009 MOPAS(MINISTRY OF SECURITY AND PUBLIC ADMINISTRATION).
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
package kostat.sop.ServiceAPI.api.common.filter;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class HTMLTagFilterRequestWrapper extends HttpServletRequestWrapper {

	public HTMLTagFilterRequestWrapper(HttpServletRequest request) {
		super(request);
	}

	@Override
	public String getParameter(String parameter) {
		return cleanXSS(super.getParameter(parameter));
	}

	@Override
	public String[] getParameterValues(String parameter) {
		String[] returnArr = super.getParameterValues(parameter);
		int loop = 0;
		for (String value : returnArr) {
			returnArr[loop++] = cleanXSS(value);
		}
		return returnArr;
	}
	
	@Override
	public Map<String,String[]> getParameterMap() {
		Map<String,String[]> paramMap = super.getParameterMap();
	    Map<String,String[]> resultMap = new HashMap<String, String[]>();
	    for(String key : paramMap.keySet()){
	        for(String value : (String[])paramMap.get(key)) {
	        	resultMap.put(key, new String[]{cleanXSS(value)});
	        }   
	    }
		return resultMap;
	}
	
	/**
	 * @param value
	 * @return
	 */
	public static String cleanXSS(String value) {
		if(value == null)return null;
		StringBuffer sb = new StringBuffer();
		for (char c : value.toCharArray()) {
			switch (c) {
			case '<':
				sb.append("&lt;");
				break;
			case '>':
				sb.append("&gt;");
				break;
			case '&':
				sb.append("&amp;");
				break;
			case '"':
				sb.append("&quot;");
				break;
			case '\'':
				sb.append("&apos;");
				break;
			default:
				sb.append(c);
				break;
			}
		}
		return sb.toString();
	}

}