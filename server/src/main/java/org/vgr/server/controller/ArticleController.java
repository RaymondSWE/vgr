package org.vgr.server.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vgr.server.service.ArticleService;

@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {
    //TODO::  implementera ArticleServiceImpl först innan detta

    @Autowired
    private ArticleService articleService;

}
