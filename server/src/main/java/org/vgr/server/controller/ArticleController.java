package org.vgr.server.controller;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vgr.server.dto.ArticleQuantityRequest;
import org.vgr.server.dto.ArticleQuantityResponse;
import org.vgr.server.model.Article;
import org.vgr.server.service.ArticleService;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles(){
        List<Article> articles = articleService.getAllArticles();

        return ResponseEntity.ok(articles);
    }

    @PostMapping
    public ResponseEntity<Article>  createArticle(@Valid @RequestBody Article article) {
        Article savedArticle =  articleService.saveArticle(article);
        return  ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Long id) {
        Article article = articleService.getArticleById(id);
        return ResponseEntity.ok(article);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @Valid @RequestBody Article article) {
        Article updatedArticle = articleService.updateArticle(id, article);
        return ResponseEntity.ok(updatedArticle);
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<ArticleQuantityResponse> updateQuantity(@PathVariable Long id, @RequestBody ArticleQuantityRequest request) {
        int newQuantity = articleService.updateArticleQuantity(id, request.getQuantity());
        ArticleQuantityResponse articleQuantityResponse = new ArticleQuantityResponse(newQuantity);
        return ResponseEntity.ok(articleQuantityResponse);
    }


}
