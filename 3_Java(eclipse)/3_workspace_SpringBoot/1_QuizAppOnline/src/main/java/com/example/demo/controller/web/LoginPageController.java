package com.example.demo.controller.web;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller   //アノテーションがコントローラの場合、そのメソッドの戻り値はテンプレート(=html)を返す
public class LoginPageController {

    @GetMapping("/login")
    public String showLoginPage() {
        return "login";   // ← login.html を返す
    }
    
    @GetMapping("/admin-login")
    public String adminLogin(HttpServletRequest request) {

        // admin ユーザーを強制的に認証済みにする
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken("admin", null,
                        List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));

        SecurityContextHolder.getContext().setAuthentication(auth);
        
        // ★ 認証情報を SecurityContext にセット
        SecurityContextHolder.getContext().setAuthentication(auth);

        // ★ セッションに SecurityContext を保存（これが超重要）
        request.getSession().setAttribute(
                "SPRING_SECURITY_CONTEXT",
                SecurityContextHolder.getContext()
        );

        return "redirect:/dashboard";
    }
}