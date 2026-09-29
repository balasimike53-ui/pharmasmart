"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleString());
    setInterval(() => setTime(new Date().toLocaleString()), 1000);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .hand { font-family: 'Caveat', cursive; }
      `}</style>

      <div className="hand" style={{minHeight:"100vh", background:"#f8fafc", padding:"20px"}}>
        
        <div style={{background:"#0f172a", color:"white", padding:"20px", borderRadius:"16px", textAlign:"center"}}>
          <h1 style={{fontSize:"38px", margin:0}}>PharmaSmart</h1>
          <p style={{fontSize:"20px", opacity:0.8, margin:"5px 0"}}>by Mike Balasi - Pharmacist</p>
        </div>

        <div style={{background:"white", border:"3px solid #0f172a", borderRadius:"16px", padding:"20px", marginTop:"20px", textAlign:"center"}}>
          <h2 style={{fontSize:"32px", color:"#16a34a"}}>✅ Deployment Success!</h2>
          <p style={{fontSize:"22px"}}>CEO | Pharmacist | Customer dashboard</p>
          <p style={{fontSize:"18px", background:"#f1f5f9", padding:"10px", borderRadius:"10px"}}>{time}</p>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px", marginTop:"20px"}}>
          <div style={{background:"white", padding:"15px", borderRadius:"12px", border:"2px solid #e2e8f0", textAlign:"center"}}>
            <h3 style={{fontSize:"22px"}}>CEO</h3>
            <p>Reports</p>
          </div>
          <div style={{background:"white", padding:"15px", borderRadius:"12px", border:"2px solid #e2e8f0", textAlign:"center"}}>
            <h3 style={{fontSize:"22px"}}>Pharmacist</h3>
            <p>Dispense</p>
          </div>
          <div style={{background:"white", padding:"15px", borderRadius:"12px", border:"2px solid #e2e8f0", textAlign:"center"}}>
            <h3 style={{fontSize:"22px"}}>Customer</h3>
            <p>Orders</p>
          </div>
        </div>

        <p style={{textAlign:"center", marginTop:"30px", fontSize:"18px", color:"#64748b"}}>
          This is temporary Mike Balasi font - we will replace with your REAL handwriting later
        </p>

      </div>
    </>
  );
}
