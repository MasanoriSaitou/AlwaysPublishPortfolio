package com.example.demo.controller.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  //アノテーションがRestコントローラーの場合、そのメソッドの戻り値は文字列として返す
public class HelloController {

    @GetMapping("/hello")
    public String hello(String name) {
    	
        return "Hello " + "こにちは" + "!";
    }
}