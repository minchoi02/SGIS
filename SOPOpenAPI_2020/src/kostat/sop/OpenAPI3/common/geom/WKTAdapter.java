/*
* @(#)WKTAdapter.java   1.0 2005/06/18
*
* Copyright ��2004 by �ѱ����߾ӿ�����. All rights reserved.
* http://www.aks.ac.kr
*
* This software is the confidential and proprietary information of AKS.
* You shall not disclose such Confidential Information and
* shall use it only in accordance with the terms of the license agreement
* you entered into with AKS.
*/

package kostat.sop.OpenAPI3.common.geom;

import java.io.*;
import java.text.DecimalFormat;
import java.util.ArrayList;

public class WKTAdapter {

  public WKTAdapter() {
  }

  public static Geometry wktToGeometry(String wellKnownText) throws
      ParseException {
    String wkt = makeWellKnownText(wellKnownText);
//    System.out.println(wkt);
    StringReader reader = new StringReader(wkt);
    Geometry geometry;
    try {
      geometry = read(reader);
    }
    finally {
      reader.close();
    }
    return geometry;
  }

  public static String geometryToWKT(Geometry geom) {
    Writer sw = new StringWriter();
    try {
      writeFormatted(geom, sw);
    }
    catch (Exception ex) {}
    return sw.toString();
  }

  public static Geometry read(Reader reader) throws ParseException {
    StreamTokenizer tokenizer;
    try {

      tokenizer = new StreamTokenizer(reader);
      tokenizer.eolIsSignificant(true);
      return readGeometryTaggedText(tokenizer);
    }
    catch (Exception e) {
      throw new ParseException(e.toString());
    }

  }

  private static Geometry readGeometryTaggedText(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String type = getNextWord(tokenizer);
    if (type.equals("POINT"))
      return readPointText(tokenizer);
    if (type.equals("LINESTRING"))
      return readLineStringText(tokenizer);
    if (type.equals("POLYGON"))
      return readPolygonText(tokenizer);
    if (type.equals("MULTIPOINT"))
      return readMultiPointText(tokenizer);
    if (type.equals("MULTILINESTRING"))
      return readMultiLineStringText(tokenizer);
    if (type.equals("MULTIPOLYGON"))
      return readMultiPolygonText(tokenizer);
    else
      throw new ParseException("Unknown type: " + type);
  }

  private static String getNextWord(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    int type = tokenizer.nextToken();
    switch (tokenizer.ttype) {
      case -1:
        throw new ParseException("Expected word but encountered end of stream");

      case 10: // '\n'
        throw new ParseException("Expected word but encountered end of line");

      case -2:
        throw new ParseException("Expected word but encountered number: " +
                                 tokenizer.nval);

      case -3:
        return tokenizer.sval.toUpperCase();

      case 40: // '('
        return "(";

      case 41: // ')'
        return ")";

      case 44: // ','
        return ",";
    }
    return null;
  }

  private static Point readPointText(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String nextToken = getNextEmptyOrOpener(tokenizer);
    GeometryFactory gF = new GeometryFactory();
    if (nextToken.equals("EMPTY")) {
      return gF.createPoint( (CoordPoint)null);
    }
    else {
      Point point = gF.createPoint(getCoord(tokenizer));
      getNextCloser(tokenizer);
      return point;
    }
  }

  private static LineString readLineStringText(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    GeometryFactory gF = new GeometryFactory();
    return gF.createLineString(getCoords(tokenizer));
  }

  private static Polygon readPolygonText(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String nextToken = getNextEmptyOrOpener(tokenizer);
    GeometryFactory gF = new GeometryFactory();
    if (nextToken.equals("EMPTY"))
      return gF.createPolygon(gF.createLineString(new CoordPoint[0]),
                              new LineString[0]);
    ArrayList holes = new ArrayList();
    LineString shell = readLineStringText(tokenizer);
    for (nextToken = getNextCloserOrComma(tokenizer); nextToken.equals(",");
         nextToken = getNextCloserOrComma(tokenizer)) {
      LineString hole = readLineStringText(tokenizer);
      holes.add(hole);
    }

    LineString array[] = new LineString[holes.size()];
    return gF.createPolygon(shell, (LineString[]) holes.toArray(array));
  }

  private static MultiPoint readMultiPointText(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    GeometryFactory gF = new GeometryFactory();
    return gF.createMultiPoint(toPoints(getCoords(tokenizer)));
  }

  private static MultiLineString readMultiLineStringText(StreamTokenizer
      tokenizer) throws IOException, ParseException {
    String nextToken = getNextEmptyOrOpener(tokenizer);
    GeometryFactory gF = new GeometryFactory();
    if (nextToken.equals("EMPTY"))
      return gF.createMultiLineString(new LineString[0]);
    ArrayList lineStrings = new ArrayList();
    LineString lineString = readLineStringText(tokenizer);
    lineStrings.add(lineString);
    for (nextToken = getNextCloserOrComma(tokenizer); nextToken.equals(",");
         nextToken = getNextCloserOrComma(tokenizer)) {
      lineString = readLineStringText(tokenizer);
      lineStrings.add(lineString);
    }

    LineString array[] = new LineString[lineStrings.size()];
    return gF.createMultiLineString( (LineString[]) lineStrings.toArray(array));
  }

  private static MultiPolygon readMultiPolygonText(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String nextToken = getNextEmptyOrOpener(tokenizer);
    GeometryFactory gF = new GeometryFactory();
    if (nextToken.equals("EMPTY"))
      return gF.createMultiPolygon(new Polygon[0]);
    ArrayList polygons = new ArrayList();
    Polygon polygon = readPolygonText(tokenizer);
    polygons.add(polygon);
    for (nextToken = getNextCloserOrComma(tokenizer); nextToken.equals(",");
         nextToken = getNextCloserOrComma(tokenizer)) {
      polygon = readPolygonText(tokenizer);
      polygons.add(polygon);
    }

    Polygon array[] = new Polygon[polygons.size()];
    return gF.createMultiPolygon( (Polygon[]) polygons.toArray(array));
  }

  private static Point[] toPoints(CoordPoint coordinates[]) {
    ArrayList points = new ArrayList();
    GeometryFactory gF = new GeometryFactory();
    for (int i = 0; i < coordinates.length; i++)
      points.add(gF.createPoint(coordinates[i]));

    return (Point[]) points.toArray(new Point[0]);
  }

  private static String getNextEmptyOrOpener(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String nextWord = getNextWord(tokenizer);
    if (nextWord.equals("EMPTY") || nextWord.equals("("))
      return nextWord;
    else
      throw new ParseException("Expected 'EMPTY' or '(' but encountered '" +
                               nextWord + "'");
  }

  private static CoordPoint getCoord(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    CoordPoint coord = new CoordPoint();
    coord.setX(getNextNumber(tokenizer));
    coord.setY(getNextNumber(tokenizer));
    return coord;
  }

  private static CoordPoint[] getCoords(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String nextToken = getNextEmptyOrOpener(tokenizer);
    if (nextToken.equals("EMPTY"))
      return new CoordPoint[0];
    ArrayList coordinates = new ArrayList();
    coordinates.add(getCoord(tokenizer));
    for (nextToken = getNextCloserOrComma(tokenizer); nextToken.equals(",");
         nextToken = getNextCloserOrComma(tokenizer))
      coordinates.add(getCoord(tokenizer));

    CoordPoint array[] = new CoordPoint[coordinates.size()];
    return (CoordPoint[]) coordinates.toArray(array);
  }

  private static double getNextNumber(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    int type = tokenizer.nextToken();
    switch (type) {
      case -1:
        throw new ParseException(
            "Expected number but encountered end of stream");

      case 10: // '\n'
        throw new ParseException("Expected number but encountered end of line");

      case -2:
        return tokenizer.nval;

      case -3:
        throw new ParseException("Expected number but encountered word: " +
                                 tokenizer.sval);

      case 40: // '('
        throw new ParseException("Expected number but encountered '('");

      case 41: // ')'
        throw new ParseException("Expected number but encountered ')'");

      case 44: // ','
        throw new ParseException("Expected number but encountered ','");
    }
    return 0.0D;
  }

  private static boolean isNumberNext(StreamTokenizer tokenizer) throws
      IOException {
    boolean flag;
    try {
      flag = tokenizer.nextToken() == -2;
    }
    finally {
      tokenizer.pushBack();
    }
    return flag;
  }

  private static String getNextCloser(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String nextWord = getNextWord(tokenizer);
    if (nextWord.equals(")"))
      return nextWord;
    else
      throw new ParseException("Expected ')' but encountered '" + nextWord +
                               "'");
  }

  private String offset(String s, CoordPoint coordinate) throws IOException {
    String s1 = "";
    StreamTokenizer streamtokenizer = new StreamTokenizer(new StringReader(s));
    boolean flag = false;
    for (int i = streamtokenizer.nextToken(); i != -1;
         i = streamtokenizer.nextToken()) {
      s1 = s1 + " ";
      switch (i) {
        case -2:
          flag = !flag;
          s1 = s1 + offsetNumber(streamtokenizer.nval, coordinate, flag);
          break;

        case -3:
          s1 = s1 + streamtokenizer.sval;
          break;

        case 40: // '('
          s1 = s1 + "(";
          break;

        case 41: // ')'
          s1 = s1 + ")";
          break;

        case 44: // ','
          s1 = s1 + ",";
          break;
      }
    }

    return s1;
  }

  private double offsetNumber(double d, CoordPoint coordinate, boolean flag) {
    return d - (flag ? coordinate.m_x : coordinate.m_y);
  }

  private static String makeWellKnownText(String wkt) {
    int n = wkt.indexOf('(', 0);
    int length = wkt.length();
    String reWKT = "";
    if (wkt.charAt(n - 1) != ' ')
      return reWKT = wkt.substring(0, n) + " " + wkt.substring(n, length);
    else
      return reWKT.trim();
  }

  private static String getNextCloserOrComma(StreamTokenizer tokenizer) throws
      IOException, ParseException {
    String nextWord = getNextWord(tokenizer);
    if (nextWord.equals(",") || nextWord.equals(")"))
      return nextWord;
    else
      throw new ParseException("Expected ')' or ',' but encountered '" +
                               nextWord + "'");
  }

  private static void writeFormatted(Geometry geometry, Writer writer) throws
      Exception {
    formatter = new DecimalFormat("0.00");
    appendGeometryTaggedText(geometry, writer);
  }

  private static void appendGeometryTaggedText(Geometry geometry, Writer writer) throws
      IOException {
    if (geometry instanceof Point) {
      Point point = (Point) geometry;
      appendPointTaggedText(point.getCoordPoint(), writer);
    }
    else
    if (geometry instanceof LineString)
      appendLineStringTaggedText( (LineString) geometry, writer);
    else
    if (geometry instanceof Polygon)
      appendPolygonTaggedText( (Polygon) geometry, writer);
    else
    if (geometry instanceof MultiPoint)
      appendMultiPointTaggedText( (MultiPoint) geometry, writer);
    else
    if (geometry instanceof MultiLineString)
      appendMultiLineStringTaggedText( (MultiLineString) geometry, writer);
    else
    if (geometry instanceof MultiPolygon)
      appendMultiPolygonTaggedText( (MultiPolygon) geometry, writer);
    else
    if (geometry instanceof GeometryCollection)
      appendGeometryCollectionTaggedText( (GeometryCollection) geometry, writer);
  }

  public static String stringOfChar(char ch, int count) {
    StringBuffer buf = new StringBuffer();
    for (int i = 0; i < count; i++)
      buf.append(ch);

    return buf.toString();
  }

  private static void appendPointTaggedText(CoordPoint coordinate,
                                            Writer writer) throws IOException {
    writer.write("POINT ");
    appendPointText(coordinate, writer);
  }

  private static void appendPointText(CoordPoint coordinate, Writer writer) throws
      IOException {
    if (coordinate == null) {
      writer.write("EMPTY");
    }
    else {
      writer.write("(");
      appendCoordinate(coordinate, writer);
      writer.write(")");
    }
  }

  private static void appendCoordinate(CoordPoint coordinate, Writer writer) throws
      IOException {
    writer.write(writeNumber(coordinate.getX()) + " " +
                 writeNumber(coordinate.getY()));
  }

  private static String writeNumber(double d) {
    return formatter.format(d);
  }

  private static void appendLineStringTaggedText(LineString lineString,
                                                 Writer writer) throws
      IOException {
    writer.write("LINESTRING ");
    appendLineStringText(lineString, writer);
  }

  private static void appendPolygonTaggedText(Polygon polygon, Writer writer) throws
      IOException {
    writer.write("POLYGON ");
    appendPolygonText(polygon, writer);
  }

  private static void appendPolygonText(Polygon polygon, Writer writer) throws
      IOException {
    if (polygon.isEmpty()) {
      writer.write("EMPTY");
    }
    else {
      writer.write("(");
      appendLineStringText(polygon.getExteriorRing(), writer);
      for (int i = 0; i < polygon.getNumInteriorRings(); i++) {
        writer.write(", ");
        appendLineStringText(polygon.getInteriorRingN(i), writer);
      }

      writer.write(")");
    }
  }

  private static void appendMultiPointTaggedText(MultiPoint multipoint,
                                                 Writer writer) throws
      IOException {
    writer.write("MULTIPOINT ");
    appendMultiPointText(multipoint, writer);
  }

  private static void appendMultiPointText(MultiPoint multiPoint, Writer writer) throws
      IOException {
    if (multiPoint.isEmpty()) {
      writer.write("EMPTY");
    }
    else {
      writer.write("(");
      for (int i = 0; i < multiPoint.getNumGeometries(); i++) {
        if (i > 0)
          writer.write(", ");
        appendCoordinate( ( (Point) multiPoint.getGeometryN(i)).getCoordPoint(),
                         writer);
      }

      writer.write(")");
    }
  }

  private static void appendMultiLineStringTaggedText(MultiLineString
      multiLineString, Writer writer) throws IOException {
    writer.write("MULTILINESTRING ");
    appendMultiLineStringText(multiLineString, writer);
  }

  private static void appendMultiLineStringText(MultiLineString multiLineString,
                                                Writer writer) throws
      IOException {
    if (multiLineString.isEmpty()) {
      writer.write("EMPTY");
    }
    else {
      writer.write("(");
      for (int i = 0; i < multiLineString.getNumGeometries(); i++) {
        if (i > 0)
          writer.write(", ");
        appendLineStringText( (LineString) multiLineString.getGeometryN(i),
                             writer);
      }

      writer.write(")");
    }
  }

  private static void appendMultiPolygonTaggedText(MultiPolygon multiPolygon,
      Writer writer) throws IOException {
    writer.write("MULTIPOLYGON ");
    appendMultiPolygonText(multiPolygon, writer);
  }

  private static void appendMultiPolygonText(MultiPolygon multiPolygon,
                                             Writer writer) throws IOException {
    if (multiPolygon.isEmpty()) {
      writer.write("EMPTY");
    }
    else {
      boolean doIndent = false;
      writer.write("(");
      for (int i = 0; i < multiPolygon.getNumGeometries(); i++) {
        if (i > 0)
          writer.write(", ");
        appendPolygonText( (Polygon) multiPolygon.getGeometryN(i), writer);
      }

      writer.write(")");
    }
  }

  private static void appendGeometryCollectionTaggedText(GeometryCollection
      geometryCollection, Writer writer) throws IOException {
    writer.write("GEOMETRYCOLLECTION ");
    appendGeometryCollectionText(geometryCollection, writer);
  }

  private static void appendGeometryCollectionText(GeometryCollection
      geometryCollection, Writer writer) throws IOException {
    if (geometryCollection.isEmpty()) {
      writer.write("EMPTY");
    }
    else {
      writer.write("(");
      for (int i = 0; i < geometryCollection.getNumGeometries(); i++) {
        if (i > 0)
          writer.write(", ");
        appendGeometryTaggedText(geometryCollection.getGeometryN(i), writer);
      }

      writer.write(")");
    }
  }

  private static void appendLineStringText(LineString lineString, Writer writer) throws
      IOException {
    if (lineString.isEmpty()) {
      writer.write("EMPTY");
    }
    else {
      writer.write("(");
      for (int i = 0; i < lineString.getNumPoints(); i++) {
        if (i > 0)
          writer.write(", ");
        appendCoordinate(lineString.getPointN(i), writer);
      }

      writer.write(")");
    }
  }

  public static final byte wktPoint = 1;
  public static final byte wktLineString = 2;
  public static final byte wktPolygon = 3;
  public static final byte wktMultiPoint = 4;
  public static final byte wktMultiLineString = 5;
  public static final byte wktMultiPolygon = 6;
  public static final byte wktGeometryCollection = 7;
  private static DecimalFormat formatter;
}
