"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleString());
  }, []);

  return (
    <div style={{padding:"20px", fontFamily:"cursive", minHeight:"100vh", background:"#f8fafc"}}>
      <div style={{background:"#0f172a", color:"white", padding:"20px", borderRadius:"16px", textAlign:"center"}}>
        <h1 style={{fontSize:"36px", margin:0}}>PharmaSmart</h1>
        <p style={{fontSize:"18px", opacity:0.8}}>by Mike Balasi - Pharmacist</p>
      </div>

      <div style={{background:"white", border:"3px solid #0f172a", borderRadius:"16px", padding:"20px", marginTop:"20px", textAlign:"center"}}>
        <h2 style={{fontSize:"28px", color:"#16a34a"}}>✅ Deployment Success!</h2>
        <p>CEO | Pharmacist | Customer dashboard</p>
        <p style={{background:"#f1f5f9", padding:"10px", borderRadius:"10px", fontSize:"14px"}}>{time}</p>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginTop:"20px"}}>
        <div style={{background:"white", padding:"12px", borderRadius:"12px", border:"2px solid #e2e8f0", textAlign:"center"}}>CEO</div>
        <div style={{background:"white", padding:"12px", borderRadius:"12px", border:"2px solid #e2e8f0", textAlign:"center"}}>Pharmacist</div>
        <div style={{background:"white", padding:"12px", borderRadius:"12px", border:"2px solid #e2e8f0", textAlign:"center"}}>Customer</div>
      </div>

      <p style={{textAlign:"center", marginTop:"20px", color:"#64748b"}}>Temporary round font - real Mike Balasi font coming next</p>
    </div>
  );
}
