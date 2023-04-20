package kostat.lbdms.ServiceAPI.data;

public class Column {
	
	private String type;
	private String label;
	private int columnLength;
	
	public Column()
	{
		type = "";
		label = "";
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public int getColumnLength() {
		return columnLength;
	}

	public void setColumnLength(int columnLength) {
		this.columnLength = columnLength;
	}

	public boolean isString()
	{
		if (type.startsWith("char")) return true;
		if (type.equals("string")) return true;
		if (type.startsWith("varchar")) return true;
		
		return false;
	}
	
	
	public static boolean IsCanConvertTypeHiveToKairos(String type)
	{
		if (type.equals("BOOLEAN")) return false;
		if (type.equals("BINARY")) return false;
		if (type.equals("DECIMAL")) return false;
		
		return true;
	}
	
	public void checkHiveToKairosType()
	{
		if (type.equals("string")) type = "varchar(255)";
		
	}
	
	public void checkPgToKairosType() {
		//kairos data Type : char, varchar, byte, varbyte, tinyint, smallint, int, bigint, float, double, numeric
		//money, smallmoney, date, time, timestamp, bit,varbit, st_point, st_pointZ, st_linestring, st_polygon
		if (type.equals("float8") || type.equals("decimal")) {
			type = "float";
		} else if (type.equals("timestamp without time zone") || type.equals("timestamp with time zone") || type.equals("time with time zone") || type.equals("timestamp")) {
			type = "timestamp"; 
		} else if (type.equals("bpchar") || type.equals("text") || type.equals("varchar")) {
			type = "varchar(255)";
		} else if (type.equals("int2") || type.equals("int4") || type.equals("bigserial") || type.equals("serial") || type.equals("integer") ) {
			type = "int"; 
		} else if (type.equals("date")) {
			type = "date"; 
		} else if (type.equals("int8")) {
			type = "bigint"; 
		} else if (type.equals("double precision") || type.equals("real")) {
			type = "double"; 
		} else if (type.equals("bigserial")) {
			type = "bigint"; 
		} else {
			type = "varchar(255)";
		}
		//bigint : int8, bigserial : bigserial, char : bpchar, double precision : float8, float : float8, integer : int4, smallint : int2, date : date, timestamp : timestamp, varchar : varchar
				
	}
	
	public static boolean IsCanConvertTypeKairosToHive(String type)
	{
//		if (type.equals("BOOLEAN")) return false;
//		if (type.equals("BINARY")) return false;
//		if (type.equals("DECIMAL")) return false;
		
		return true;
	}
	
	// 카이로스에서 하이브로 내릴 때 타입 안맞아서 오류 나는것들 타입 변경해주기
	public void checkKairosToHiveType()
	{
		if (type.startsWith("VARCHAR")) type = "STRING";
		if (type.startsWith("INTEGER")) type = "INT";
		if (type.startsWith("NUMBER")) type = "INT";
		if (type.startsWith("VSTRING")) type = "STRING";
		if (type.startsWith("CHAR")) type = "STRING";
	}
	// 카이로스에서 피지로 내릴 때 타입 안맞아서 오류 나는것들 타입 변경해주기
	public void chekKairosToPgType() {
		if(type.equals("CHAR")) {
			type = "CHAR";
		} else if (type.equals("NUMBER")) {
			type = "double precision";
		} else if (type.equals("VSTRING")) {
			type = "VARCHAR";
		} else if (type.equals("tinyint") || type.equals("smallint") || type.equals("bigint")) {
			type = "int";
		} else if (type.equals("byte") || type.equals("varbyte")) {
			type = "bytea";
		} else if(type.equals("data") || type.equals("timestamp")) {
			type = "timestamp with time zone";
		} else {
			type = "VARCHAR";
		}
		
	}
}
