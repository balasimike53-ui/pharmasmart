"use client";
import { useState } from "react";
export default function Page(){
  const [role,setRole]=useState("ceo");
  const [cart,setCart]=useState([]);
  const meds=[
    {id:1,name:"Paracetamol 500mg",price:15,stock:120},
    {id:2,name:"Amoxicillin 500mg",price:45,stock:80},
    {id:3,name:"ORS Sachet",price:10,stock:200},
    {id:4,name:"Malaria Test",price:60,stock:50},
    {id:5,name:"Insulin",price:250,stock:30},
  ];
  const total=cart.reduce((s,m)=>s+m.price,0);
  return(
    <div style={{fontFamily:"system-ui",background:"#f5f7fb",minHeight:"100vh"}}>
      <div style={{background:"#0f172a",color:"white",padding:"14px",display:"flex",justifyContent:"space-between"}}>
        <b>PharmaSmart Zambia</b>
        <select value={role} onChange={e=>setRole(e.target.value)} style={{color:"black",padding:"4px",borderRadius:"6px"}}>
          <option value="ceo">CEO</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      <div style={{padding:"12px"}}>
        <h2>{role.toUpperCase()} Dashboard</h2>
        <div style={{background:"white",padding:"12px",borderRadius:"10px",marginBottom:"12px"}}>
          Sales Today: K{total+1240} | Cart: K{total} | Items: {cart.length}
        </div>
        {meds.map(m=>(
          <div key={m.id} style={{background:"white",padding:"12px",borderRadius:"10px",display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
            <div><b>{m.name}</b><br/><small>Stock:{m.stock} K{m.price}</small></div>
            <button onClick={()=>setCart([...cart,m])} style={{background:"#0f172a",color:"white",border:"none",padding:"8px 12px",borderRadius:"8px"}}>Add</button>
          </div>
        ))}
        {cart.length>0 && <button onClick={()=>{alert("Order K"+total); setCart([])}} style={{width:"100%",background:"#16a34a",color:"white",padding:"14px",border:"none",borderRadius:"10px",fontWeight:"bold",marginTop:"10px"}}>Checkout K{total}</button>}
      </div>
    </div>
  );
}
