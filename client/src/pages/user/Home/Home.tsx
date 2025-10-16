import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchArticles } from "../../../store/features/articleSlice";
import { fetchCategories } from "../../../store/features/categorySlice";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import styles from "./Home.module.scss";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import CardPost from "../../../components/CardPost/CardPost";

export default function Home() {
  const dispatch = useAppDispatch();
  const { articles, loading: articleLoading } = useAppSelector(
    (state) => state.article
  );
  const { categories, loading: categoryLoading } = useAppSelector(
    (state) => state.category
  );
  const { keyword } = useAppSelector((state) => state.search);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchCategories());
  }, [dispatch]);

  const getCategoryName = (id?: number) => {
    const found = categories.find((c) => c.id === id);
    return found ? found.name : "Uncategorized";
  };

  const recentPosts = articles;

  const filteredPosts = articles.filter((p) => {
    const matchCategory =
      selectedCategory === "All" ||
      getCategoryName(p.entryId) === selectedCategory;

    const matchKeyword =
      !keyword ||
      p.title.toLowerCase().includes(keyword.toLowerCase()) ||
      p.content.toLowerCase().includes(keyword.toLowerCase());

    return matchCategory && matchKeyword;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, keyword]);

  return (
    <div>
      <Header />

      <div className={styles.homeContainer}>
        <section className={styles.recentSection}>
          <h2>Recent blog posts</h2>

          {articleLoading ? (
            <p>Loading articles...</p>
          ) : recentPosts.length > 0 ? (
            <div className={styles.postsGrid}>
              <Link
                to={`/detail/${recentPosts[0].id}`}
                className={styles.leftPost}
              >
                <img src={recentPosts[0].image} alt={recentPosts[0].title} />
                <div className={styles.postInfo}>
                  <p className={styles.date}>Date: {recentPosts[0].date}</p>
                  <h3>{recentPosts[0].title}</h3>
                  <p className={styles.desc}>{recentPosts[0].content}</p>
                  <p className={styles.category}>
                    {getCategoryName(recentPosts[0].entryId)}
                  </p>
                </div>
              </Link>

              <div className={styles.rightPosts}>
                {recentPosts.slice(1, 3).map((post) => (
                  <Link
                    to={`/detail/${post.id}`}
                    className={styles.smallPost}
                    key={post.id}
                  >
                    <img src={post.image} alt={post.title} />
                    <div className={styles.postInfo}>
                      <p className={styles.date}>Date: {post.date}</p>
                      <h3>{post.title}</h3>
                      <p className={styles.desc}>{post.content}</p>
                      <p className={styles.category}>
                        {getCategoryName(post.entryId)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p>No articles found.</p>
          )}
        </section>

        <section className={styles.allBlogs}>
          <div className={styles.topNav}>
            <Link to="" className={styles.active}>
              All blog posts
            </Link>
            <Link to="/mypost">All my posts</Link>
          </div>

          <div className={styles.categories}>
            <span
              onClick={() => setSelectedCategory("All")}
              className={
                selectedCategory === "All" ? styles.activeCategory : ""
              }
            >
              All
            </span>

            {!categoryLoading &&
              categories.map((cat) => (
                <span
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={
                    selectedCategory === cat.name ? styles.activeCategory : ""
                  }
                >
                  {cat.name}
                </span>
              ))}
          </div>

          <div className={styles.blogCards}>
            {currentPosts.map(
              (post) =>
                post.status === "public" && (
                  <CardPost
                    key={post.id}
                    id={String(post.id)}
                    image={post.image}
                    date={post.date}
                    title={post.title}
                    desc={post.content}
                    category={getCategoryName(post.entryId)}
                    categoryColor="blue"
                  />
                )
            )}

            {filteredPosts.length === 0 && (
              <p className={styles.noResult}>No posts found.</p>
            )}
          </div>

          {/* {filteredPosts.length > itemsPerPage && ( */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          {/* )} */}
        </section>
      </div>

      <Footer />
    </div>
  );
}
