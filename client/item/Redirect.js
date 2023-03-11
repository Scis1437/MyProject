
import React from 'react'
import { useState , useEffect } from 'react'
import { useRouter } from "next/router";

function Redirect({ to, studentCode ,array}) {
  const router = useRouter();
  console.log(studentCode);
  useEffect(() => {
    router.push({
      pathname: to,
      query: {studentCode},
    });
  }, [to, studentCode]);
  return null;
}
export default Redirect ;