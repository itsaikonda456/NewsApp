import React, { useState, useEffect } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  category = "general",
  country = "in",
  pageSizes = 8,
  setprogress,
}) => {
  document.title = `${category} - NewsMonkey`;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Load API key from .env
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  // 🔥 WORKING endpoint for free plan
  const buildUrl = (pageNumber) => {
    return `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&apiKey=${apiKey}&page=${pageNumber}&pageSize=${pageSizes}`;
  };

  const updateNews = async () => {
    if (!apiKey) {
      console.error("❌ API Key missing in .env");
      setLoading(false);
      return;
    }

    try {
      setprogress(20);
      setLoading(true);

      const url = buildUrl(1);
      const response = await fetch(url);

      setprogress(50);
      const data = await response.json();

      if (data.status !== "ok") {
        console.error("API Error:", data);
        setLoading(false);
        return;
      }

      setprogress(75);
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }

    setLoading(false);
    setprogress(100);
  };

  // 🔥 Runs when category changes
  useEffect(() => {
    setPage(1);
    updateNews();
    // eslint-disable-next-line
  }, [category]);

  const fetchMoreData = async () => {
    if (!apiKey) return;

    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const url = buildUrl(nextPage);
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== "ok") {
        console.error("Pagination Error:", data);
        return;
      }

      setArticles((prev) => [...prev, ...data.articles]);
    } catch (error) {
      console.error("❌ Pagination fetch error:", error);
    }
  };

  return (
    <>
      <h1 className="text-center mb-5" style={{ marginTop: "90px" }}>
        NewsMonkey – Top {category} Headlines
      </h1>

      {!apiKey ? (
        <div className="container text-center mt-4">
          <div className="alert alert-danger">
            <h4>API Key Missing!</h4>
            <p>Add <b>REACT_APP_NEWS_API_KEY</b> in your .env file.</p>
          </div>
        </div>
      ) : loading && articles.length === 0 ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <b>You've seen all articles.</b>
            </p>
          }
        >
          <div className="container" style={{ maxWidth: "1200px" }}>
            <div className="row">
              {articles.map((article, index) => (
                <div
                  className="col-lg-3 col-md-6 mb-4"
                  key={article.url || index}
                >
                  <NewsItem
                    title={article.title?.slice(0, 45) || ""}
                    description={article.description?.slice(0, 88) || ""}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source?.name || "Unknown"}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSizes: PropTypes.number,
  category: PropTypes.string,
  setprogress: PropTypes.func,
};

export default News;
