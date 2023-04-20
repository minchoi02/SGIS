package kostat.lbdms.ServiceAPI.common.web.core.service;

import java.io.Serializable;
import java.util.List;

import kostat.lbdms.ServiceAPI.common.web.core.IDAO;



/**  
 * <pre>
 * abstract class
 * </pre>
 *
 * @author		Admin
 * @since 		2015. 10. 20. 오후 2:18:53
 * @version 	    1.0
 * @see
 * <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *</pre>
 */
public abstract class BaseService<T, ID extends Serializable > implements IService<T, ID> {
    	protected abstract IDAO<T, ID> getDao();
	
	@Override
	public T findById(ID id) {
		return getDao().selectById(id);
	}

	@Override
	public List<T> findAll() {
		return getDao().selectAll();
	}

	@Override
	public int add(T entity) {
		return getDao().insert( entity );
	}

	@Override
	public int modify(T entity) {
		return getDao().update( entity );
	}

	@Override
	public int remove(T entity) {
		return getDao().delete( entity );
	}

	@Override
	public int removeById(ID id) {
		return getDao().deleteById( id );
	}

	@Override
	public int removeByIds(ID[] ids) {
		return getDao().deleteByIds( ids );
	}
}
