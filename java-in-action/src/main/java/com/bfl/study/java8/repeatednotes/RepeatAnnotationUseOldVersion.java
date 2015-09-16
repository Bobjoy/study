/**
 * http://my.oschina.net/benhaile/blog/180932
 */

package com.bfl.study.java8.repeatednotes;

public class RepeatAnnotationUseOldVersion {

	/**
	 * java 8之前也有重复使用注解的解决方案，但可读性不是很好
	 */
	@Authorities({@Authority(role="Admin"),@Authority(role="Manager")})
	private void doSomeThing() {

	}
	
	/**
	 * 由另一个注解来存储重复注解，在使用时候，用存储注解Authorities来扩展重复注解
	 */
	@Authority(role="Admin")
	@Authority(role="Manager")
	private void doSomeThing2() {

	}
}
