import React from 'react'
import VerifyDetail from '../_component/VerifyDetail';

export default async function VerifyCertificate(props) {
  const params = await props.params;
  const { secret } = params;

 
  return (
    <VerifyDetail secret={secret}/>
  )
}
