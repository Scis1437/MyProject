/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // redirects : async() => {
  //   return [
  //     {
  //       source : '/login' ,
  //       destination : '/menu' ,
  //       parament : true ,
  //     }
  //   ]
  // }
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}

module.exports = nextConfig
