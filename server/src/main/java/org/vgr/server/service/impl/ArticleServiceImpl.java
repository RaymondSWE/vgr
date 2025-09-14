package org.vgr.server.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vgr.server.exception.ArticleNotFoundException;
import org.vgr.server.model.Article;
import org.vgr.server.repository.ArticleRepository;
import org.vgr.server.service.ArticleService;

import java.util.List;
@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }
    @Override
    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
    }

    @Override
    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);

    }

    @Override
    public Article updateArticle(Long id, Article article) {
        Article existingArticle = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));

        existingArticle.setName(article.getName());
        existingArticle.setQuantity(article.getQuantity());
        existingArticle.setUnit(article.getUnit());
        existingArticle.setLowThreshold(article.getLowThreshold());

        return articleRepository.save(existingArticle);
    }

    @Override
    public int updateArticleQuantity(Long id, Integer quantity) {
        Article existingArticle = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));

        existingArticle.setQuantity(quantity);
        Article saved = articleRepository.save(existingArticle);

        return saved.getQuantity();
    }

}
