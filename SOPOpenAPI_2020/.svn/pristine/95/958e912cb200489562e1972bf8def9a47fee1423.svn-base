package kostat.sop.OpenAPI3.search.index;

import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.document.Field.Store;

import com.neighborsystem.lucene.index.handler.IIndexFieldDefine;

/**
 * 
 * @author neighbor21
 *
 */
public enum POIIndexFieldDefineEnum implements IIndexFieldDefine
{	
	nm				(0, TextField.class),  
	syn				(1, TextField.class), 
	addr_syn		(2, TextField.class),   
	theme_cd		(3, TextField.class),  
	theme_nm		(4, TextField.class),  
	category		(5, TextField.class),  
	category_nm		(6, TextField.class),  
	data_type		(7, TextField.class),  
	adm_cd			(8, TextField.class),  
	road_cd			(9, TextField.class),  
	adm_addr		(10, TextField.class),  
	naddr			(11, TextField.class),  
	base_year		(12, TextField.class),  
	ed_no			(13, TextField.class),  
	corp_no			(14, TextField.class),  
	sufid			(15, TextField.class),  
	dev_figure_yn	(16, TextField.class),  
	route_cd		(17, TextField.class),  
	route_nm		(18, TextField.class),  
	x				(19, TextField.class),  
	y				(20, TextField.class);
		
	private int fieldIndex;
	private Store fieldStore;
	private Class<? extends Field> fieldClass;
	
	private Class fieldValueType;
	
	private POIIndexFieldDefineEnum( int index )
	{
		this(index, Field.Store.YES, StringField.class, String.class);
	}
	
	private POIIndexFieldDefineEnum( int index, Class<? extends Field> clz)
	{
		this(index, Field.Store.YES, clz, String.class);
	}
	
	private POIIndexFieldDefineEnum( int index, Store store, Class<? extends Field> clz, Class valueType )
	{
		this.fieldIndex = index;
		this.fieldStore = store;
		this.fieldClass = clz;
		this.fieldValueType = valueType;
	}
	
	@Override
	public int columIndex()
	{
		return fieldIndex;
	}

	@Override
	public String fieldName()
	{
		return name();
	}

	@Override
	public Store fieldStore()
	{
		return fieldStore;
	}

	@Override
	public Class<? extends Field> fieldClass()
	{
		return fieldClass;
	}

	@Override
	public Class fieldValueType()
	{
		return fieldValueType;
	}

}
