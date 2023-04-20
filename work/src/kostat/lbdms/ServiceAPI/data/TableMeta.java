package kostat.lbdms.ServiceAPI.data;

import java.util.ArrayList;

public class TableMeta {
	
	private String tableName;
	private ArrayList<Column> colList;
	private String schema;
	
	
	public TableMeta()
	{
		colList = new ArrayList<Column>();
	}


	public String getTableName() {
		return tableName;
	}


	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
	
	public String getSchema() {
		return schema;
	}


	public void setSchema(String schema) {
		this.schema = schema;
	}


	public ArrayList<Column> getColumnList()
	{
		return this.colList;
	}
	

}
