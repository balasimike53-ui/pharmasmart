"use client";
import { useState } from "react";
type Med = { id:number; name:string; price:number; stock:number; cat:string };
const MEDS: Med[] = [
  {id:1,name:"Paracetamol 500mg",price:15,stock:120,cat:"Pain"},
  {id:2,name:"Amoxicillin 500mg",price:45,stock:80,cat:"Antibiotic"},
  {id:3,name:"ORS Sachet",price:10,stock:200,cat:"Rehydration"},
  {id:4,name:"Malaria Rapid Test",price:60,stock:50,cat:"Diagnostic"},
  {id:5,name:"Insulin",price:250,stock:30,cat:"Diabetes"},
];
export default function Page(){
  const [role,setRole]=useState("ceo");
  const [cart,setCart]=useState<Med[]>([]);
  const [tab,setTab]=useState("Overview");
  const addToCart=(m:Med)=>{ setCart([...cart,m]); alert(m.name+" added!") };
  const total = cart.reduce((s,m)=>s+m.price,0);
  const tabs = role==="ceo" ? ["Overview","Finance","Inventory","Staff","AI Alerts"] : role==="pharmacist" ? ["Dispense","Inventory","Prescriptions"] : ["Shop","Cart","Orders"];
  return (
    <div style={{fontFamily:"system-ui", background:"#f5f7fb", minHeight:"100vh"}}>
      <div style={{background:"#0f172a", color:"white", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <b>PharmaSmart Zambia</b>
        <select value={role} onChange={e=>setRole(e.target.value)} style={{padding:"6px", borderRadius:"8px", color:"black"}}>
          <option value="ceo">CEO</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      <div style={{display:"flex", gap:"8px", padding:"12px", overflowX:"auto"}}>
        {tabs.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 14px", borderRadius:"20px", border:"none", background:tab===t?"#0f172a":"white", color:tab===t?"white":"black", fontWeight:"bold"}}>{t}</button>
        ))}
      </div>
      <div style={{padding:"12px"}}>
        {tab==="Overview" && (
          <div>
            <h2>CEO Overview</h2>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
              <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><small>Today Sales</small><h2>K {total+1240}</h2></div>
              <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><small>Low Stock</small><h2>3 items</h2></div>
            </div>
          </div>
        )}
        {(tab==="Shop" || tab==="Dispense" || tab==="Inventory") && (
          <div>
            {MEDS.map(m=>(
              <div key={m.id} style={{background:"white", padding:"12px", borderRadius:"12px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px"}}>
                <div><b>{m.name}</b><br/><small>{m.cat} | Stock: {m.stock} | K{m.price}</small></div>
                <button onClick={()=>addToCart(m)} style={{background:"#0f172a", color:"white", border:"none", padding:"8px 12px", borderRadius:"8px"}}>Add</button>
              </div>
            ))}
          </div>
        )}
        {tab==="Cart" && (
          <div>
            <h2>Cart - K{total}</h2>
            {cart.map((c,i)=><div key={i} style={{background:"white", padding:"10px", marginBottom:"6px", borderRadius:"8px"}}>{c.name} - K{c.price}</div>)}
            {cart.length>0 && <button onClick={()=>{alert("Order placed K"+total); setCart([])}} style={{width:"100%", background:"#16a34a", color:"white", padding:"12px", borderRadius:"10px", border:"none", fontWeight:"bold"}}>Checkout</button>}
          </div>
        )}
      </div>
    </div>
  );
        }
