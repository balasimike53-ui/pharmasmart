'use client'
import { useState, useEffect } from 'react'

export default function Page(){
  const [type,setType]=useState('ceo')
  const [cashiers,setCashiers]=useState([])
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
    try{
      const s=JSON.parse(localStorage.getItem('ps_c')||'[]')
      setCashiers(s)
      if(s.length>0) setSel(s[0].name)
    }catch(e){}
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
    setCashiers(u)
    localStorage.setItem('ps_c',JSON.stringify(u))
    setName('');setCpin('')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }
