'use client'
import { useState, useEffect } from 'react'
export default function Page(){
const [t,setT]=useState('ceo')
const [cs,setCs]=useState([])
const [s,setS]=useState('')
const [p,setP]=useState('')
const [l,setL]=useState(false)
const [u,setU]=useState('')
const [d,setD]=useState(7)
const [lk,setLk]=useState(false)
const [n,setN]=useState('')
const [cp,setCp]=useState('')
useEffect(()=>{
try{const a=JSON.parse(localStorage.getItem('c')||'[]');setCs(a);if(a.length>0)setS(a[0].name)}catch(e){}
let x=localStorage.getItem('d');if(!x){x=new Date().toISOString();localStorage.setItem('d',x)}
const diff=Math.floor((Date.now()-new Date(x).getTime())/86400000)
setD(Math.max(0,7-diff));if(diff>=7)setLk(true)
},[])
const add=()=>{if(!n||!cp)return;const a=[...cs,{name:n.toUpperCase(),pin:cp}];setCs(a);localStorage.setItem('c',JSON.stringify(a));setN('');setCp('')}
const go=()=>{if(d<=0){setLk(true);return}if(t==='ceo'){if(p!=='2026')return;setU('CEO')}else{const f=cs.find(c=>c.name===s);if(!f)return;if(p!==f.pin&&p!=='2026')return;setU(f.name)}setL(true)}
if(lk)return <div style={{background:'#0f1720',color:'white',padding:20,textAlign:'center',minHeight:'100vh'}}><h2>Trial Ended</h2><h1 style={{color:'#fbbf24'}}>K100/month</h1><p>Airtel 0772 740194<br/>MTN 0961 102912</p></div>
if(!l)return <div style={{background:'#0f1720',color:'white',padding:20,minHeight:'100vh'}}><h3 style={{textAlign:'center'}}>PHARMASMART ZM</h3><p style={{textAlign:'center',fontSize:12}}>Trial {d} days</p><div style={{background:'#16202d',padding:16,borderRadius:12}}><select value={t} onChange={e=>setT(e.target.value)} style={{width:'100%',padding:12}}><option value="ceo">CEO</option><option value="cashier">Cashier</option></select>{t==='cashier'&&<select value={s} onChange={e=>setS(e.target.value)} style={{width:'100%',padding:12,marginTop:8}}>{cs.length===0?<option>No cashier</option>:cs.map((c,i)=><option key={i} value={c.name}>{c.name}</option>)}</select>}<input value={p} onChange={e=>setP(e.target.value)} type="password" placeholder="PIN 2026" style={{width:'100%',padding:12,marginTop:8}}/><button onClick={go} style={{width:'100%',padding:12,background:'#0e3a2e',color:'#5ee9a8',marginTop:8}}>Login</button><p style={{fontSize:10,textAlign:'center',marginTop:8}}>K100 0772 740194 / 0961 102912</p></div></div>
return <div style={{background:'#0f1720',color:'white',minHeight:'100vh',paddingBottom:60}}><div style={{padding:12,borderBottom:'1px solid #333',display:'flex',justifyContent:'space-between'}}><b>{u}</b><button onClick={()=>location.reload()}>Logout</button></div><div style={{margin:12,padding:12,background:'#16202d',borderRadius:12,textAlign:'center'}}>Trial {d} days - K100 to 0772 740194</div><div style={{margin:12,padding:16,background:'#16202d',borderRadius:12}}><input value={n} onChange={e=>setN(e.target.value)} placeholder="Cashier Name" style={{width:'100%',padding:10}}/><input value={cp} onChange={e=>setCp(e.target.value)} placeholder="PIN" style={{width:'100%',padding:10,marginTop:6}}/><button onClick={add} style={{width:'100%',padding:10,marginTop:6,background:'#0e3a2e',color:'#5ee9a8'}}>+ Add Cashier Unlimited</button>{cs.map((c,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',marginTop:6}}><span>{c.name}</span><span onClick={()=>{const a=cs.filter((_,j)=>j!==i);setCs(a);localStorage.setItem('c',JSON.stringify(a))}} style={{color:'red'}}>Del</span></div>)}</div><div style={{margin:12,padding:12,background:'#16202d',borderRadius:12}}>Pay K100<br/>Airtel 0772 740194<br/>MTN 0961 102912</div></div>
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
