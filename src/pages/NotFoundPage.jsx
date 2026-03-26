import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "6rem", color: "#e53e3e", margin: "0 0 1rem 0", lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ color: "#2d3748", marginBottom: "2rem" }}>
        ไม่พบหน้าที่คุณต้องการ
      </h2>
      
      <Link
        to="/"
        style={{
          display: "inline-block",
          backgroundColor: "#1e40af",
          color: "white",
          padding: "10px 20px",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          transition: "background-color 0.2s",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;