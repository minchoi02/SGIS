package kostat.lbdms.ServiceAPI.common.web.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.poi.ss.formula.functions.T;


public class CommonUtil {
    /**
	 * List<HashMap>을 List<Class>로 변환
	 * 
	 * @param clazz: Class.class
	 * @param list: List<HashMap<String, Object>>
	 * @return rows: List<Class>
	 * 
	 * 강태경
	 * 2018.05.21
	 */
	@SuppressWarnings("unused")
	public static List<T> hashToClassTypeList(Class clazz, List<HashMap<String, Object>> list) {
			
			List rows = new ArrayList();
			
			Class classReflector = null;
			Object reflectedInstance = null;
			classReflector = clazz;
			
			List<Method> fullMethods = new ArrayList<Method>();
			List<Field> fullProps = new ArrayList<Field>();
			
			Field[] props = classReflector.getDeclaredFields(); // 필드 가져오기
			Method[] methods = classReflector.getDeclaredMethods(); // 메소드 가져오기
			
			Field[] superProps = classReflector.getSuperclass().getDeclaredFields(); // super 필드 가져오기
			Method[] superMethods = classReflector.getSuperclass().getDeclaredMethods(); // super 메소드 가져오기
			
			List<String> methodLists = new ArrayList<String>();
			List<String> propLists = new ArrayList<String>();
			
			// 메소드명 리스트화
			for (Method method : methods) {
				String methodName = method.getName();
				String lowerMethodName = methodName.toLowerCase();
				
				methodLists.add(lowerMethodName);
				fullMethods.add(method);
			}
			
			// 필드명 리스트화
			for (Field prop : props) {
				String propName = prop.getName();
				String lowerPropName = propName.toLowerCase();
				
				propLists.add("set" + lowerPropName);
				fullProps.add(prop);
			}
			
			// super 클래스가 있을 경우 메소드 추가
			if (superMethods.length > 0) {
				for (Method method : superMethods) {
					String methodName = method.getName();
					String lowerMethodName = methodName.toLowerCase();
					
					methodLists.add(lowerMethodName);
					fullMethods.add(method);
				}
			}
			
			// super 클래스가 있을 경우 필드명 추가
			if (superProps.length > 0) {
				for (Field prop : superProps) {
					String propName = prop.getName();
					String lowerPropName = propName.toLowerCase();
					
					propLists.add("set" + lowerPropName);
					fullProps.add(prop);
				}
			}
			
			for (int i = 0; i < list.size(); i++) {
				HashMap<String, Object> item = list.get(i);
				
				// Action 클래스 리플렉션
				try {
					reflectedInstance = classReflector.newInstance(); // 클래스 인스턴스 생성
					
					for (int j = 0; j < propLists.size(); j++) {
						String propItem = propLists.get(j);
						int methodIndex = methodLists.indexOf(propItem); // 필드명과 동일한 index를 가진 메소드명 리스트 번호 추출
					
						// 메소드명 리스트 번호로 메소드명 invoke
						Method m = fullMethods.get(methodIndex);
						Field p = fullProps.get(j);
						String pname = p.getName();
						
						if (item.get(pname) != null) {
							m.invoke(reflectedInstance, item.get(pname));
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				rows.add(reflectedInstance);
			}
			
			return rows;
		}
}
