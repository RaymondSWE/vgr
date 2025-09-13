package org.vgr.server.controller;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.vgr.server.dto.ArticleQuantityRequest;
import org.vgr.server.dto.ArticleQuantityResponse;
import org.vgr.server.model.Article;
import org.vgr.server.service.ArticleService;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    //TODO::  implementera error handling med också httpstatuses

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticles(){
        return articleService.getAllArticles();
    }

    @PostMapping
    public Article createArticle(@Valid @RequestBody Article article) {
        return  articleService.saveArticle(article);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
    }

    @GetMapping("/{id}")
    public Article getArticle(@PathVariable Long id) {
        return articleService.getArticleById(id);
    }

    @PutMapping("/{id}")
    public Article updateArticle(@PathVariable Long id, @Valid @RequestBody Article article) {
        return articleService.updateArticle(id, article);
    }

    @PutMapping("/{id}/quantity")
    public ArticleQuantityResponse updateQuantity(@PathVariable Long id, @RequestBody ArticleQuantityRequest request) {
        int newQuantity = articleService.updateArticleQuantity(id, request.getQuantity());
        return new ArticleQuantityResponse(newQuantity);
    }


}
