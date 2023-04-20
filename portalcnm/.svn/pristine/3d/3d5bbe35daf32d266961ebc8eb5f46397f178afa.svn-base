package kostat.sop.ServiceAPI.api.common;

import java.util.HashMap;

import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.jdbc.support.JdbcUtils;

public class StastisticsCamelcase extends HashMap<String, Object>{
	
	/** 직렬화 */
	private static final long serialVersionUID = -1797500763412891193L;

	/**
     * key 에 대하여 카멜표기법으로 변환하여 super.put
     * (ListOrderedMap) 을 호출한다.
     * @param key
     *        - '_' 가 포함된 변수명
     * @param value
     *        - 명시된 key 에 대한 값 (변경 없음)
     * @return previous value associated with specified
     *         key, or null if there was no mapping for
     *         key
     */
    public Object put(String key, Object value) {
        return super.put(JdbcUtils.convertUnderscoreNameToPropertyName((String) key), value);
    }
}
