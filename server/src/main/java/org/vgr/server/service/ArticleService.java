package org.vgr.server.service;

import org.vgr.server.model.Article;

import java.util.List;

public interface ArticleService {

    List<Article> getAllArticles();
    Article getArticleById(Long id);
    Article saveArticle(Article article);
    void deleteArticle(Long id);
    Article updateArticle(Long id, Article article);

}
