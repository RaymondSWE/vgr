package org.vgr.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vgr.server.model.Article;
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

}
