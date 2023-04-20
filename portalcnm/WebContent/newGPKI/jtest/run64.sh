rm *.class
javac -classpath ../jar/libgpkiapi_jni.jar *.java
java -d64 -classpath ../jar/libgpkiapi_jni.jar:. Main
