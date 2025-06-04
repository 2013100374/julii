"use client";

import { facebookComment, googleAnalytics, tawkChat } from '@/store/extensionSlice';
import { fetchSections } from '@/store/frontendSlice';
import { fetchSettings } from '@/store/gsSlice';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function LoadGlobalData() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSettings());
    dispatch(facebookComment());
    dispatch(googleAnalytics());
    dispatch(tawkChat());
    dispatch(fetchSections());
  }, [dispatch]);

  return null;
}
