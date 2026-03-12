import { useState, useEffect } from "react";
import PostCard from "./PostCard";

import PostCount from "./PostCount";

import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
   const [sortOrder, setSortOrder] = useState("newest");

  async function fetchPosts() {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

    const data = await res.json();
    setPosts(data.slice(0, 20));
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchPosts();
}, []);

  const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
   )
  .sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#ffffff",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>
      <button
    onClick={fetchPosts}
    disabled={loading}
    style={{
      marginTop: "10px",
      marginBottom: "10px",
      padding: "0.4rem 0.8rem",
      cursor: "pointer",
    }}
  >
    {loading ? "กำลังโหลด..." : "🔄 โหลดใหม่"}
  </button>

      


      <PostCount count={posts.length} />


      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}



      <div style={{ marginBottom: "1rem" }}>
  <button onClick={() => setSortOrder("newest")}>
    ใหม่สุด
  </button>

  <button
    style={{ marginLeft: "10px" }}
    onClick={() => setSortOrder("oldest")}
  >
    เก่าสุด
  </button>
</div>




      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;