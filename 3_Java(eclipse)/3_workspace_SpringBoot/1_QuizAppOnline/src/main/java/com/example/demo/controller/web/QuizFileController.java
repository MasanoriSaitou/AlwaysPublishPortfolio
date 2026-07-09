package com.example.demo.controller.web;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class QuizFileController {

    private final String UPLOAD_DIR = "quiz-data";

    @GetMapping("/quiz-editor")
    public String quizEditor(Model model) {
    	
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();

        String[] files = dir.list();
        model.addAttribute("files", files);

        return "quiz-editor";
    }

    @PostMapping("/quiz/upload")
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {
    	
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();

        File dest = new File(dir, file.getOriginalFilename());
        file.transferTo(dest);

        return "redirect:/quiz-editor";
    }

    @GetMapping("/quiz/delete/{filename}")
    public String delete(@PathVariable String filename) {
    	
        File file = new File(UPLOAD_DIR, filename);
        if (file.exists()) file.delete();

        return "redirect:/quiz-editor";
    }
}