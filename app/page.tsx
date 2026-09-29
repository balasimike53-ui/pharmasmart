"use client";
import {useState,useMemo} from "react";
type Med={id:number;name:string;price:number;stock:number;expiry:string;batch:string};
type Sale={id:number;items:{name:string;qty:number;price:number}[];total:number;date:string;cashier:string};
const initialMeds:Med[]=[
{id:1,name:"Paracetamol 500mg",price:15,stock:120,expiry:"2026-12-01",batch:"B001"},
{id:2,name:"Amoxicillin 500mg",price:45,stock:80,expiry:"2026-08-15",batch:"B002"},
{id:3,name:"Artemether 80mg",price:120,stock:45,expiry:"2026-06-30",batch:"B003"},
{id:4,name:"ORS Sachet",price:10,stock:200,expiry:"2027-01-10",batch:"B004"},
];
export default function Page(){
const [role,setRole]=useState<"ceo"|"cashier"|null>(null);
const [pin,setPin]=useState("");
const [meds,setMeds]=useState(initialMeds);
const [cart,setCart]=useState<{name:string;qty:number;price:number}[]>([]);
const [sales,setSales]=useState<Sale[]>([]);
const [expenses,setExpenses]=useState<{desc:string;amt:number;date:string}[]>([{desc:"Rent",amt:5000,date:"2026-09-01"}]);
const [tab,setTab]=useState("Overview");
const totalStockValue=useMemo(()=>meds.reduce((s,m)=>s+m.price*m.stock,0),[meds]);
const todaySales=useMemo(()=>sales.reduce((s,x)=>s+x.total,0),[sales]);
const login=()=>{if(pin==="1234"){setRole("ceo")}else if(pin==="0000"){setRole("cashier")}else alert("Use 1234=CEO, 0000=Cashier")};
if(!role)return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}><div style={{background:"white",padding:24,borderRadius:16,width:"100%",maxWidth:360,boxShadow:"0 8px 24px rgba(0,0,0,.1)"}}><h2>PharmaSmart Login</h2><p>CEO PIN: 1234 | Cashier PIN: 0000</p><input value={pin} onChange={e=>setPin(e.target.value)} type="password" placeholder="Enter PIN" style={{width:"100%",padding:12,borderRadius:8,border:"1px solid #ccc",marginTop:8}}/><button onClick={login} style={{width:"100%",marginTop:12,padding:12,background:"#0ea5e9",color:"white",border:0,borderRadius:8,fontWeight:700}}>Login</button></div></div>;
const addToCart=(m:Med)=>{if(m.stock<=0)return;setCart(c=>{const f=c.find(x=>x.name===m.name);return f?c.map(x=>x.name===m.name?{...x,qty:x.qty+1}:x):[...c,{name:m.name,qty:1,price:m.price}]});setMeds(ms=>ms.map(x=>x.id===m.id?{...x,stock:x.stock-1}:x))};
const checkout=()=>{if(!cart.length)return;const total=cart.reduce((s,i)=>s+i.price*i.qty,0);setSales(s=>[{id:Date.now(),items:cart,total,date:new Date().toLocaleString(),cashier:role},...s]);setCart([]);alert("Sale K"+total+" saved!")};
const tabs=role==="ceo"?["Overview","Sell","Inventory","Sales","Expenses","Analytics"]:["Sell","Sales"];
return <div style={{display:"flex",minHeight:"100vh"}}>
<div style={{width:160,background:"#0f172a",color:"white",padding:16}}><h3 style={{margin:0}}>PharmaSmart</h3><p style={{fontSize:12,opacity:.7}}>{role.toUpperCase()} • Lusaka</p>{tabs.map(t=><div key={t} onClick={()=>setTab(t)} style={{padding:"10px 8px",marginTop:6,borderRadius:8,cursor:"pointer",background:tab===t?"#0ea5e9":"transparent"}}>{t}</div>)}<div onClick={()=>setRole(null)} style={{marginTop:20,color:"#f87171",cursor:"pointer"}}>Logout</div></div>
<div style={{flex:1,padding:16}}>
{tab==="Overview"&&<div><h2>CEO Overview</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Card title="Total Stock Value" val={"K "+totalStockValue.toLocaleString()}/><Card title="Today Sales" val={"K "+todaySales}/><Card title="Total Products" val={meds.length}/><Card title="Low Stock" val={meds.filter(m=>m.stock<20).length}/></div><div style={{marginTop:16,background:"white",padding:12,borderRadius:12}}><h4>Stock Level</h4>{meds.map(m=><div key={m.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #eee"}}><span>{m.name}</span><span style={{width:80,background:"#e2e8f0",borderRadius:8}}><span style={{display:"block",width:Math.min(100,m.stock)+"%",background:m.stock<20?"#ef4444":"#22c55e",height:8,borderRadius:8}}></span></span><span>{m.stock}</span></div>)}</div></div>}
{tab==="Sell"&&<div><h2>Point of Sale</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div>{meds.map(m=><div key={m.id} onClick={()=>addToCart(m)} style={{background:"white",padding:10,borderRadius:10,marginBottom:8,cursor:"pointer",display:"flex",justifyContent:"space-between"}}><span>{m.name}<br/><small>K{m.price} • Stock {m.stock}</small></span><span>+</span></div>)}</div><div style={{background:"white",padding:12,borderRadius:12,height:"fit-content"}}><h4>Cart ({cart.length})</h4>{cart.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between"}}><span>{c.name} x{c.qty}</span><span>K{c.price*c.qty}</span></div>)}{cart.length>0&&<><hr/><div style={{display:"flex",justifyContent:"space-between",fontWeight:700}}><span>Total</span><span>K{cart.reduce((s,i)=>s+i.price*i.qty,0)}</span></div><button onClick={checkout} style={{width:"100%",marginTop:10,padding:12,background:"#0ea5e9",color:"white",border:0,borderRadius:8}}>Checkout & Print Receipt</button></>}</div></div></div>}
{tab==="Inventory"&&<div><h2>Inventory • Total Value K{totalStockValue.toLocaleString()}</h2><div style={{background:"white",borderRadius:12,overflow:"hidden"}}>{meds.map(m=><div key={m.id} style={{padding:12,borderBottom:"1px solid #eee",display:"flex",justifyContent:"space-between"}}><span>{m.name}<br/><small>Batch {m.batch} • Exp {m.expiry}</small></span><span>K{m.price} • {m.stock} pcs</span></div>)}</div></div>}
{tab==="Sales"&&<div><h2>Sales History</h2>{sales.length===0&&<p>No sales yet</p>}{sales.map(s=><div key={s.id} style={{background:"white",padding:10,borderRadius:10,marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between"}}><b>K{s.total}</b><small>{s.date}</small></div><small>{s.items.map(i=>i.name+" x"+i.qty).join(", ")}</small></div>)}</div>}
{tab==="Expenses"&&<div><h2>Expenses</h2><div style={{background:"white",padding:12,borderRadius:12}}>{expenses.map((e,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span>{e.desc}</span><span>K{e.amt}</span></div>)}<div style={{marginTop:10,fontWeight:700}}>Total: K{expenses.reduce((s,e)=>s+e.amt,0)}</div></div></div>}
{tab==="Analytics"&&<div><h2>Analytics</h2><div style={{background:"white",padding:12,borderRadius:12}}><p>Sales Trend (Bar = K)</p>{sales.slice(0,5).map(s=><div key={s.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><small style={{width:80}}>{s.date.slice(0,5)}</small><div style={{height:16,width:Math.min(200,s.total/2),background:"#0ea5e9",borderRadius:4}}></div><small>K{s.total}</small></div>)}{sales.length===0&&<p>Make a sale in Sell tab to see graph</p>}</div></div>}
</div></div></div>;
}
function Card({title,val}:{title:string;val:any}){return <div style={{background:"white",padding:14,borderRadius:12}}><small>{title}</small><div style={{fontSize:20,fontWeight:800}}>{val}</div></div>}
