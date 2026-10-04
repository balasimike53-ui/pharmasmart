'use client'
import { useState, useEffect } from 'react'

export default function Page() {
  const [accountType, setAccountType] = useState('ceo')
  const [cashiers, setCashiers] = useState<any[]>([])
  const [selectedCashier, setSelectedCashier] = useState('')
  const [pin, setPin] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [role, setRole] = useState('')
  const [tab, setTab] = useState('overview')
  const [cart, setCart] = useState<any[]>([])
  const [newCashierName, setNewCashierName] = useState('')
  const [newCashierPin, setNewCashierPin] = useState('')
  const [trialDaysLeft, setTrialDaysLeft] = useState(7)
  const [showPaywall, setShowPaywall] = useState(false)

  const products = [{name:"AMIDOL/ FEGO",generic:"PARACETAMOL",qty:30,buy:2,sell:5}]

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ps_cashiers')||'[]')
    setCashiers(saved)
    if(saved.length>0) setSelectedCashier(saved[0].name)

    let installDate = localStorage.getItem('ps_install_date')
    if(!installDate){install
