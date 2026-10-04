'use client'
import { useState, useEffect } from 'react'

export default function Page(){
  const [type,setType]=useState('ceo')
  const [cashiers,setCashiers]=useState<any[]>([])
  const [sel,setSel]=useState('')
  const [pin,setPin]=useState('')
  const [login,setLogin]=useState(false)
  const [user,setUser]=useState('')
  const [role,setRole]=useState('')
  const [tab,setTab]=useState('overview')
  const [name,setName]=useState('')
  const [cpin,setCpin]=useState('')
  const [days,setDays]=useState(7)
  const [lock,setLock]=useState(false)

  useEffect(()=>{
    const s=JSON.parse(localStorage.getItem('ps_c')||'[]')
    setCashiers(s)
    if(s.length>0) setSel(s[0].name)
    let d=localStorage.getItem('ps_d')
    if(!d){d=new Date().toISOString();localStorage.setItem('ps_d',d)}
    const diff=Math.floor((Date.now()-new Date(d).getTime())/86400000)
    const left=Math.max(0,7-diff)
    setDays(left)
    if(diff>=7) setLock(true)
  },[])

  const add=()=>{
    if(!name||!cpin){alert('Enter name PIN');return}
    const u=[...cashiers,{name:name.toUpperCase(),pin:cpin}]
    setCashiers(u);localStorage.setItem('ps_c',JSON.stringify(u))
    setName('');setCpin('');alert('Added '+name)
  }

  const go=()=>{
    if(days<=0){setLock(true);return}
    if(type==='ceo'){if(pin!=='2026'){alert('PIN 2026');return}setUser('CEO');setRole('ceo')}
    else{const f=cashiers.find(c=>c.name===sel);if(!f){alert('No cashier');return}if(pin!==f.pin&&pin!=='2026'){alert('Wrong PIN');return}setUser(f.name);setRole('cashier')}
    setLogin(true)
  }

  if(lock) return <div style={{background:'#0f1720',color:'white',minHeight:'100vh',padding:20,textAlign:'center'}}><h2 style={{marginTop:40}}>Trial Ended</h2><div style={{background:'#3f1a1a',border:'1px solid red',borderRadius:16,padding:20,marginTop:20}}><h1 style={{color:'#fbbf24'}}>K100/month</h1><p>Airtel 0772 740194<br/>MTN 0961 102912<br/>WhatsApp proof</p><button onClick={()=>setLock(false)} style={{width:'100%',padding:14,background:'#222',color:'white',borderRadius:12,marginTop:10}}>Back</button></div></div>

  if(!login) return <div style={{background:'#0f1720',color:'white',minHeight:'100vh',padding:20}}><div style={{maxWidth:400,margin:'20px auto'}}><h2 style={{textAlign:'center'}}>PHARMASMART ZM</h2><p style={{textAlign:'center',color:days>0?'#5ee9a8':'red',fontSize:12}}>{days>0?`Trial ${days} days left`:'Expired'}</p><div style={{background:'#16202d',padding:20,borderRadius:16,marginTop:20}}><select value={type} onChange={e=>setType(e.target.value)} style={{width:'100%',padding:14,background:'#0f1720',color:'white',borderRadius:12}}><option value="ceo">CEO</option><option value="cashier">Cashier</option></select>{type==='cashier'&&<select value={sel} onChange={e=>setSel(e.target.value)} style={{width:'100%',padding:14,background:'#0f1720',color:'white',borderRadius:12,marginTop:8}}>{cashiers.length===0?<option>No cashiers</option>:cashiers.map((c:any)=><option key={c.name} value={c.name}>{c.name}</option>)}</select>}<input value={pin} onChange={e=>setPin(e.target.value)} type="password" placeholder="PIN 2026" style={{width:'100%',padding:14,background:'#0f1720',color:'white',borderRadius:12,marginTop:8}}/><button onClick={go} style={{width:'100%',padding:14,background:'#0e3a2e',color:'#5ee9a8',borderRadius:12,border:'none',fontWeight:'bold',marginTop:8}}>Sign in</button><p style={{textAlign:'center',fontSize:11,color:'#64748b',marginTop:10}}>7 Days Free<br/>Then K100<br/>0772 740194 / 0961 102912</p></div></div></div>

  return <div style={{background:'#0f1720',color:'white',minHeight:'100vh',paddingBottom:80}}><div style={{padding:16,display:'flex',justifyContent:'space-between',borderBottom:'1px solid #333'}}><b>{tab}</b><span style={{fontSize:11}}>{user}<button onClick={()=>location.reload()} style={{marginLeft:8}}>Logout</button></span></div><div style={{background:'#16202d',margin:12,padding:12,borderRadius:12,textAlign:'center',border:'1px solid #5ee9a8'}}>{days>0?`Trial ${days} days - K100 to 0772 740194 / 0961 102912`:'Pay K100 0772 740194'}</div>{tab==='overview'&&<><div style={{background:'#16202d',margin:12,padding:20,borderRadius:16}}>Sales K 0.00</div>{role==='ceo'&&<div style={{background:'#16202d',margin:12,padding:20,borderRadius:16}}><small>CEO ADD CASHIER UNLIMITED</small><input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" style={{width:'100%',padding:12,marginTop:8}}/><input value={cpin} onChange={e=>setCpin(e.target.value)} placeholder="PIN" style={{width:'100%',padding:12,marginTop:8}}/><button onClick={add} style={{width:'100%',padding:12,background:'#0e3a2e',color:'#5ee9a8',marginTop:8}}>+ Add</button>{cashiers.map((c:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',marginTop:8}}><span>{c.name}</span><span onClick={()=>{const u=cashiers.filter((_,idx)=>idx!==i);setCashiers(u);localStorage.setItem('ps_c',JSON.stringify(u))}} style={{color:'red'}}>Del</span></div>)}</div>}<div style={{background:'#16202d',margin:12,padding:20,borderRadius:16}}>Pay K100<br/>Airtel 0772 740194<br/>MTN 0961 102912</div></>}{tab==='products'&&<div style={{background:'#16202d',margin:12,padding:20,borderRadius:16}}>Total Stock K 60<br/>30 units x K2<br/>AMIDOL/FEGO</div>}{tab==='sell'&&<div style={{background:'#16202d',margin:12,padding:20,borderRadius:16}}><button style={{width:'100%',padding:12}}>Sell AMIDOL K5</button></div>}<div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0f1720',display:'flex',justifyContent:'space-around',padding:10,borderTop:'1px solid #333'}}>{['overview','products','sell'].map(t=><div key={t} onClick={()=>setTab(t)} style={{color:tab===t?'#5ee9a8':'#64748b'}}>{t}</div>)}{role==='ceo'&&['reports'].map(t=><div key={t} onClick={()=>setTab(t)} style={{color:tab===t?'#5ee9a8':'#64748b'}}>{t}</div>)}</div></div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
